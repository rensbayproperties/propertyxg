"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";

const useAmenities = () => {
  const axiosAuth = useAxiosAuth();

  const { isLoading: isLoadingAmenities, data: amenities } = useQuery({
    queryKey: ["amenity"],
    queryFn: async () => {
      const res = await axiosAuth.get("/amenity");
      return res.data?.data;
    },
  });

  return {
    amenities,
    isLoadingAmenities,
  };
};

export default useAmenities;
