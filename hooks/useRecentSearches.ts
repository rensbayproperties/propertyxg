"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addRecentSearch as addRecentSearchToStorage,
  clearRecentSearches as clearRecentSearchesFromStorage,
  readRecentSearches,
} from "@/lib/recentSearches";

const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(readRecentSearches());
  }, []);

  const addRecentSearch = useCallback((query: string) => {
    const updated = addRecentSearchToStorage(query);
    setRecentSearches(updated);
  }, []);

  const clearRecentSearches = useCallback(() => {
    clearRecentSearchesFromStorage();
    setRecentSearches([]);
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  };
};

export default useRecentSearches;
