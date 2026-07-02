import siteData from "@/constant/site";
import type { DxbProject } from "@/types";

export type EmirateId =
  | "dubai"
  | "abu-dhabi"
  | "sharjah"
  | "ajman"
  | "ras-al-khaimah"
  | "umm-al-quwain";

export type EmirateTab = {
  id: EmirateId;
  label: string;
  apiEnabled: boolean;
};

export const EMIRATE_TABS: EmirateTab[] = [
  { id: "dubai", label: "Dubai", apiEnabled: true },
  { id: "abu-dhabi", label: "Abu Dhabi", apiEnabled: false },
  { id: "sharjah", label: "Sharjah", apiEnabled: false },
  { id: "ajman", label: "Ajman", apiEnabled: false },
  { id: "ras-al-khaimah", label: "Ras Al Khaimah", apiEnabled: false },
  { id: "umm-al-quwain", label: "Umm Al Quwain", apiEnabled: false },
];

export function getProjectImage(images: string | null): string {
  if (!images) return siteData.defaultPropertyImage;

  const first = images
    .split(",")
    .map((img) => img.trim())
    .find(Boolean);

  return first || siteData.defaultPropertyImage;
}

export function formatHandover(date: string | null): string {
  if (!date) return "TBA";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "TBA";

  const quarter = Math.floor(parsed.getMonth() / 3) + 1;
  return `Q${quarter} ${parsed.getFullYear()}`;
}

export function inferPropertyType(project: DxbProject): string {
  if (project.no_of_villas > 0 && project.no_of_units === 0) return "Villas";
  if (project.no_of_villas > 0) return "Villas";
  if (project.no_of_buildings > 0 && project.no_of_units === 0) return "Buildings";
  if (project.no_of_units > 0) return "Apartments";
  return "Properties";
}

export function formatLaunchPrice(_project: DxbProject): string {
  return "Ask for price";
}

export function buildProjectLocation(project: DxbProject): string {
  return [project.project_name_en, project.master_project_en, "Dubai"]
    .filter(Boolean)
    .join(", ");
}

export function buildRegisterInterestUrl(projectName: string): string {
  const phone = siteData.whatsappNumberFormated.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hi, I'm interested in ${projectName}. Please share more details.`,
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export function getEmirateTab(id: EmirateId): EmirateTab | undefined {
  return EMIRATE_TABS.find((tab) => tab.id === id);
}
