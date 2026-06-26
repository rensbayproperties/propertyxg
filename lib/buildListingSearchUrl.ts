export type SearchType = "sale" | "rent" | "agents";

type ListingSearchFilters = {
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
