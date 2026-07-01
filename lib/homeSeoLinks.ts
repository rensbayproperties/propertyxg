import { buildListingSearchUrl } from "@/lib/buildListingSearchUrl";

export type SeoLink = {
  label: string;
  href: string;
};

export type SeoLinkSection = {
  title: string;
  links: SeoLink[];
  collapsible?: boolean;
};

export const propertyTypeLinks = {
  apartments: { label: "apartments", href: buildListingSearchUrl("rent", {}) },
  villas: { label: "villas", href: buildListingSearchUrl("rent", {}) },
  townhouses: { label: "townhouses", href: buildListingSearchUrl("rent", {}) },
  penthouses: { label: "penthouses", href: buildListingSearchUrl("rent", {}) },
} as const;

export const topApartmentSearches: SeoLink[] = [
  { label: "Dubai Marina Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Business Bay Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Downtown Dubai Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Jumeirah Village Circle Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Palm Jumeirah Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Dubai Hills Estate Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Jumeirah Lake Towers Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Al Barsha Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Dubai Creek Harbour Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Arabian Ranches Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Motor City Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Dubai Silicon Oasis Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Al Furjan Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Arjan Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Meydan Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Dubai Sports City Apartments", href: buildListingSearchUrl("rent", {}) },
];

export const villaTownhouseRentals: SeoLink[] = [
  { label: "Villas for rent Near Me", href: buildListingSearchUrl("rent", {}) },
  { label: "Villas for rent in Dubai Hills", href: buildListingSearchUrl("rent", {}) },
  { label: "Villas for rent in Arabian Ranches", href: buildListingSearchUrl("rent", {}) },
  { label: "Villas for rent in Palm Jumeirah", href: buildListingSearchUrl("rent", {}) },
  { label: "Villas for rent in Emirates Hills", href: buildListingSearchUrl("rent", {}) },
  { label: "Villas for rent in Jumeirah", href: buildListingSearchUrl("rent", {}) },
  { label: "Townhouses for rent in Dubai", href: buildListingSearchUrl("rent", {}) },
  { label: "Townhouses for rent in Arabian Ranches", href: buildListingSearchUrl("rent", {}) },
  { label: "Townhouses for rent in DAMAC Hills", href: buildListingSearchUrl("rent", {}) },
  { label: "Townhouses for rent in Mudon", href: buildListingSearchUrl("rent", {}) },
  { label: "Townhouses for rent in Reem", href: buildListingSearchUrl("rent", {}) },
  { label: "Townhouses for rent in JVC", href: buildListingSearchUrl("rent", {}) },
  { label: "Penthouses for rent in Dubai Marina", href: buildListingSearchUrl("rent", {}) },
  { label: "Penthouses for rent in Downtown Dubai", href: buildListingSearchUrl("rent", {}) },
  { label: "Penthouses for rent in Palm Jumeirah", href: buildListingSearchUrl("rent", {}) },
  { label: "Penthouses for rent in Business Bay", href: buildListingSearchUrl("rent", {}) },
  { label: "Penthouses for rent in DIFC", href: buildListingSearchUrl("rent", {}) },
];

export const rentalsByEmirate: SeoLink[] = [
  { label: "Dubai Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Abu Dhabi Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Sharjah Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Ajman Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Ras Al Khaimah Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Fujairah Apartments", href: buildListingSearchUrl("rent", {}) },
  { label: "Umm Al Quwain Apartments", href: buildListingSearchUrl("rent", {}) },
];

export const houseRentals: SeoLink[] = [
  { label: "Homes for sale in Dubai", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Abu Dhabi", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Sharjah", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Dubai Marina", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Business Bay", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Downtown Dubai", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Palm Jumeirah", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Dubai Hills", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in JVC", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Arabian Ranches", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in JLT", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Al Barsha", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Creek Harbour", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Motor City", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Meydan", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Sports City", href: buildListingSearchUrl("sale", {}) },
  { label: "Homes for sale in Silicon Oasis", href: buildListingSearchUrl("sale", {}) },
];

export const seoLinkSections: SeoLinkSection[] = [
  {
    title: "Top Apartment Searches",
    links: topApartmentSearches,
    collapsible: true,
  },
  {
    title: "House Rentals",
    links: houseRentals,
  },
  {
    title: "Villa & Townhome Rentals",
    links: villaTownhouseRentals,
  },
  {
    title: "Rentals by Emirate",
    links: rentalsByEmirate,
  },
];

export const COLLAPSED_LINK_COUNT = 8;
