export type SearchType = "sale" | "rent" | "agents";

export type ListingSearchFilters = {
  locationId?: string;
  projectId?: string;
  bedroom?: string;
  bathroom?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  amenities?: string;
  furnished?: string;
};

type AgentSearchFilters = {
  locationId?: string;
  projectId?: string;
  search?: string;
  language?: string;
  min?: string;
  max?: string;
  dealType?: string;
};

const BASE_PATHS: Record<SearchType, string> = {
  sale: "/buy",
  rent: "/rent",
  agents: "/find-agents",
};

function buildQueryString(params: Record<string, string | undefined>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) searchParams.set(key, value);
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

const CATEGORY_DELIMITER = ".";

type AiParseLocation = {
  name?: string;
  locationId?: string | null;
  projectId?: string | null;
};

export type AiParseResponseData = {
  location?: AiParseLocation | null;
  listingCategory?: Array<{ id: string }> | null;
  bedroom?: string | null;
  bathroom?: string | null;
  dealType?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  search?: string | null;
  language?: string | null;
  amenities?: Array<{ id: string }> | null;
  isFurnished?: boolean | null;
};

type AiParseFormData = {
  query: string;
  location?: string;
  project?: string;
};

type FilterFallbacks = {
  location?: string;
  projectId?: string;
  bedroom?: string;
  bathroom?: string;
  minPrice?: string;
  maxPrice?: string;
  listingCategoryId?: string;
  amenities?: string;
};

function hasKey<T extends object>(obj: T, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function toOptionalString(
  value: string | number | null | undefined,
): string | undefined {
  if (value == null || value === "") return undefined;
  return String(value);
}

function pickStringField(
  data: AiParseResponseData,
  key: "bedroom" | "bathroom" | "search" | "language" | "dealType",
  fallback: string | undefined,
): string | undefined {
  if (hasKey(data, key)) {
    return toOptionalString(data[key]);
  }
  return fallback || undefined;
}

function pickPriceField(
  data: AiParseResponseData,
  key: "minPrice" | "maxPrice",
  fallback: string | undefined,
): string | undefined {
  if (hasKey(data, key)) {
    return toOptionalString(data[key]);
  }
  return fallback || undefined;
}

function pickLocationId(
  data: AiParseResponseData,
  req: AiParseFormData,
  fallback: string | undefined,
): string | undefined {
  if (hasKey(data, "location")) {
    return toOptionalString(data.location?.locationId);
  }
  return req.location || fallback || undefined;
}

function pickProjectId(
  data: AiParseResponseData,
  req: AiParseFormData,
  fallback: string | undefined,
): string | undefined {
  if (hasKey(data, "location")) {
    return toOptionalString(data.location?.projectId);
  }
  return req.project || fallback || undefined;
}

function pickCategory(
  data: AiParseResponseData,
  fallback: string | undefined,
): string | undefined {
  if (hasKey(data, "listingCategory")) {
    if (!data.listingCategory?.length) return undefined;
    return data.listingCategory.map((c) => c.id).join(CATEGORY_DELIMITER);
  }
  return fallback || undefined;
}

function pickAmenities(
  data: AiParseResponseData,
  fallback: string | undefined,
): string | undefined {
  if (hasKey(data, "amenities")) {
    if (!data.amenities?.length) return undefined;
    return data.amenities.map((a) => a.id).join(",");
  }
  return fallback || undefined;
}

function pickFurnished(data: AiParseResponseData): string | undefined {
  if (hasKey(data, "isFurnished")) {
    return data.isFurnished === true ? "true" : undefined;
  }
  return undefined;
}

function resolveSearchType(
  data: AiParseResponseData,
  uiSearchType: SearchType = "sale",
): SearchType {
  if (hasKey(data, "dealType")) {
    if (data.dealType === "RENT") return "rent";
    if (data.dealType === "SALE") return "sale";
  }
  if (uiSearchType === "agents") return "agents";
  return uiSearchType;
}

export function buildUrlFromAiParseResponse(
  data: AiParseResponseData,
  req: AiParseFormData,
  fallbacks: FilterFallbacks,
  uiSearchType: SearchType = "sale",
): string {
  const searchType = resolveSearchType(data, uiSearchType);
  const locationId = pickLocationId(data, req, fallbacks.location);
  const projectId = pickProjectId(data, req, fallbacks.projectId);

  if (searchType === "agents") {
    return buildListingSearchUrl("agents", {
      locationId,
      projectId,
      search: pickStringField(data, "search", req.query),
      language: pickStringField(data, "language", undefined),
      min: pickPriceField(data, "minPrice", fallbacks.minPrice),
      max: pickPriceField(data, "maxPrice", fallbacks.maxPrice),
      dealType: pickStringField(data, "dealType", undefined),
    });
  }

  return buildListingSearchUrl(searchType, {
    locationId,
    projectId,
    bedroom: pickStringField(data, "bedroom", fallbacks.bedroom),
    bathroom: pickStringField(data, "bathroom", fallbacks.bathroom),
    minPrice: pickPriceField(data, "minPrice", fallbacks.minPrice),
    maxPrice: pickPriceField(data, "maxPrice", fallbacks.maxPrice),
    category: pickCategory(data, fallbacks.listingCategoryId),
    amenities: pickAmenities(data, fallbacks.amenities),
    furnished: pickFurnished(data),
  });
}

export function extractListingFiltersFromAiParse(
  data: AiParseResponseData,
  req: AiParseFormData,
  fallbacks: FilterFallbacks,
  uiSearchType: SearchType = "sale",
): ListingSearchFilters & { dealType: "SALE" | "RENT" } {
  const searchType = resolveSearchType(data, uiSearchType);
  const locationId = pickLocationId(data, req, fallbacks.location);
  const projectId = pickProjectId(data, req, fallbacks.projectId);

  return {
    dealType: searchType === "rent" ? "RENT" : "SALE",
    locationId,
    projectId,
    bedroom: pickStringField(data, "bedroom", fallbacks.bedroom),
    bathroom: pickStringField(data, "bathroom", fallbacks.bathroom),
    minPrice: pickPriceField(data, "minPrice", fallbacks.minPrice),
    maxPrice: pickPriceField(data, "maxPrice", fallbacks.maxPrice),
    category: pickCategory(data, fallbacks.listingCategoryId),
    amenities: pickAmenities(data, fallbacks.amenities),
    furnished: pickFurnished(data),
  };
}

export function buildListingSearchUrl(
  searchType: SearchType,
  filters: ListingSearchFilters | AgentSearchFilters,
): string {
  const basePath = BASE_PATHS[searchType];

  if (searchType === "agents") {
    const f = filters as AgentSearchFilters;
    return `${basePath}${buildQueryString({
      locationId: f.locationId,
      projectId: f.projectId,
      search: f.search,
      language: f.language,
      min: f.min,
      max: f.max,
      dealType: f.dealType,
    })}`;
  }

  const f = filters as ListingSearchFilters;
  return `${basePath}${buildQueryString({
    locationId: f.locationId,
    projectId: f.projectId,
    bedroom: f.bedroom,
    bathroom: f.bathroom,
    minPrice: f.minPrice,
    maxPrice: f.maxPrice,
    category: f.category,
    amenities: f.amenities,
    furnished: f.furnished,
  })}`;
}
