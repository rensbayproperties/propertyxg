import "server-only";
import { headers } from "next/headers";
import { getWebsiteApiBaseUrl, type PublicWebsiteData } from "@/lib/websiteApi";

type Envelope<T> =
  | { status: "success"; message: string; data: T; error: null }
  | { status: "error"; message: string; data: null; error: string };

/**
 * Platform root domain for subdomain sites (`<sub>.<root>`), e.g. from
 * `GET /website/domains` → `rootDomain`. Set per environment — not hardcoded.
 */
export const getWebsiteRootDomain = (): string =>
  process.env.NEXT_PUBLIC_WEBSITE_ROOT_DOMAIN?.trim() || "";

const RESERVED_SUBDOMAINS = new Set(["www", "app", "admin", "api"]);
const IPV4 = /^\d{1,3}(?:\.\d{1,3}){3}$/;

/**
 * Hostname sent to the API for tenant resolution (contract §3.12).
 *
 * - Production subdomain: browser host is already `<sub>.<your-root>` → use as-is.
 * - Custom domain: browser host is e.g. `www.brand.ae` → use as-is.
 * - Local dev only: rewrite `sub.lvh.me` → `sub.<NEXT_PUBLIC_WEBSITE_ROOT_DOMAIN>`
 *   when that env is set (so the API can resolve the tenant).
 */
export const normalizeHostForApi = (raw: string): string | null => {
  const first = raw.split(",")[0].trim();
  const hostname = first.split(":")[0].toLowerCase();
  const rootDomain = getWebsiteRootDomain();

  if (rootDomain && hostname.endsWith(`.${rootDomain}`)) {
    return hostname;
  }

  const isLocalhost = hostname === "localhost";
  const isIp = IPV4.test(hostname);
  const isLocalDev =
    isLocalhost ||
    isIp ||
    hostname.endsWith(".lvh.me") ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".nip.io") ||
    hostname.endsWith(".sslip.io");

  if (!isLocalDev) {
    return hostname;
  }

  if (isLocalhost || isIp) return null;

  const parts = hostname.split(".");
  if (parts.length >= 3 && !RESERVED_SUBDOMAINS.has(parts[0]) && rootDomain) {
    return `${parts[0]}.${rootDomain}`;
  }

  return null;
};

const resolveRequestHost = (): string | null => {
  const h = headers();
  return h.get("x-forwarded-host") || h.get("host");
};

const resolveForwardedProto = (): string => {
  const h = headers();
  return h.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
};

/**
 * Calls `GET /public/website` on the API origin (e.g. Railway).
 *
 * We must NOT set HTTP `Host` to the tenant hostname when the API lives on a
 * different domain — TLS validates against the API cert (*.railway.app, etc.).
 * Tenant is passed via `X-Forwarded-Host` (Nest trust proxy / gateway should
 * map this to the same logic as the contract's `Host` rule).
 */
const requestPublicWebsiteJson = async (
  apiBase: string,
  tenantHost: string,
): Promise<{ statusCode: number; body: string }> => {
  const url = `${apiBase.replace(/\/+$/, "")}/public/website?host=${tenantHost}`;

  // const res = await fetch(url, { cache: "no-store" });
  const res = await fetch(url);
  return { statusCode: res.status, body: await res.text() };
};

/** Dev-only: force tenant host when testing on localhost (see WEBSITE_PUBLIC_DEV_TENANT_HOST). */
const resolveTenantHost = (rawHost: string): string | null => {
  const normalized = normalizeHostForApi(rawHost);
  if (normalized) return normalized;

  const devOverride = process.env.WEBSITE_PUBLIC_DEV_TENANT_HOST?.trim();
  if (process.env.NODE_ENV === "development" && devOverride) {
    return devOverride.split(",")[0].trim().split(":")[0].toLowerCase();
  }

  return null;
};

export type PublicWebsiteFetchFailure =
  | "missing_api_url"
  | "missing_host"
  | "unresolvable_host"
  | "network_error"
  | "invalid_json"
  | "api_error"
  | "not_found";

export type PublicWebsiteResult =
  | { ok: true; data: PublicWebsiteData }
  | { ok: false; reason: PublicWebsiteFetchFailure; detail?: string };

export const fetchPublicWebsite = async (): Promise<PublicWebsiteResult> => {
  const base = getWebsiteApiBaseUrl();
  if (!base) {
    return { ok: false, reason: "missing_api_url" };
  }

  const rawHost = resolveRequestHost();
  if (!rawHost) {
    return { ok: false, reason: "missing_host" };
  }

  const tenantHost = resolveTenantHost(rawHost);

  if (!tenantHost) {
    return {
      ok: false,
      reason: "unresolvable_host",
      detail: rawHost,
    };
  }

  try {
    const { statusCode, body } = await requestPublicWebsiteJson(base, tenantHost);

    let parsed: unknown;
    try {
      parsed = JSON.parse(body) as unknown;
    } catch {
      return {
        ok: false,
        reason: "invalid_json",
        detail: `HTTP ${statusCode}`,
      };
    }

    const envelope = parsed as Envelope<PublicWebsiteData>;
    if (!envelope || typeof envelope !== "object") {
      return { ok: false, reason: "invalid_json" };
    }
    // console.log('envelope', envelope);

    if (envelope.status === "error") {
      if (envelope.error === "NOT_FOUND") {
        return {
          ok: false,
          reason: "not_found",
          detail: envelope.message,
        };
      }
      return {
        ok: false,
        reason: "api_error",
        detail: envelope.message || envelope.error,
      };
    }

    if (envelope.status !== "success" || envelope.data == null) {
      return { ok: false, reason: "api_error", detail: "Malformed success payload" };
    }

    return { ok: true, data: envelope.data };
  } catch (err) {
    return {
      ok: false,
      reason: "network_error",
      detail: err instanceof Error ? err.message : String(err),
    };
  }
};

export const getPublicWebsite = async (): Promise<PublicWebsiteData | null> => {
  const result = await fetchPublicWebsite();
  return result.ok ? result.data : null;
};
