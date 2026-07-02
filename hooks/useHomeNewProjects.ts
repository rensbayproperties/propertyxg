"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";
import type { DxbProject } from "@/types";
import type { EmirateId } from "@/lib/homeNewProjects";
import { getEmirateTab } from "@/lib/homeNewProjects";

const useHomeNewProjects = (emirate: EmirateId) => {
  const axiosAuth = useAxiosAuth();
  const tab = getEmirateTab(emirate);
  const enabled = tab?.apiEnabled ?? false;

  const { data, isLoading, isError, refetch } = useQuery<DxbProject[]>({
    queryKey: ["home-new-projects", emirate],
    queryFn: async () => {
      const response = await axiosAuth.get("/dxb-projects?limit=12&page=1");
      return response?.data?.data?.data || [];
    },
    enabled,
    refetchOnWindowFocus: false,
  });

  return {
    projects: data ?? [],
    isLoading: enabled && isLoading,
    isError: enabled && isError,
    refetch,
    isApiEnabled: enabled,
  };
};

export default useHomeNewProjects;
