"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";

const useCategories = () => {
  const axiosAuth = useAxiosAuth();

  const { isLoading: isLoadingCategory, data: allcategories } = useQuery({
    queryFn: async () => {
      const response = await axiosAuth.get("/listing-category");
      const results = response.data.data;
      return results;
    },
    queryKey: ["categories"],
  });

  return {
    allcategories,
    isLoadingCategory,
  };
};

export default useCategories;
