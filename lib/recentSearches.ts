export const RECENT_SEARCHES_KEY = "propertyxg:recent-searches";
export const MAX_RECENT_SEARCHES = 5;

export function readRecentSearches(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function writeRecentSearches(searches: string[]): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
}

export function addRecentSearch(query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed) return readRecentSearches();

  const existing = readRecentSearches();
  const normalized = trimmed.toLowerCase();
  const deduped = existing.filter(
    (item) => item.toLowerCase() !== normalized,
  );
  const updated = [trimmed, ...deduped].slice(0, MAX_RECENT_SEARCHES);

  writeRecentSearches(updated);
  return updated;
}

export function clearRecentSearches(): void {
  writeRecentSearches([]);
}
