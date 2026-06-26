type ListingSearchFilters = {
  locationId?: string;
  projectId?: string;
  bedroom?: string;
  bathroom?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  amenities?: string;
  dealType?: string;
};

export function buildListingSearchUrl(filters: ListingSearchFilters): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}
