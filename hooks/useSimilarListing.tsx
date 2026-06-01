"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { searchParams } from "@/lib/searchParams";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";

const useSimilarListing = (opt: string = "") => {
  const axiosAuth = useAxiosAuth();

  const queryClient = useQueryClient();

  const [price, setPrice] = useQueryState(
    "price",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [location, setLocation] = useQueryState(
    "location",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );

  const [listType, setListType] = useQueryState(
    "dealType",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );

  const dealTypeOptions = [
    { value: "RENT", label: "Rent" },
    { value: "SALE", label: "Sale" },
  ];

  const { data: similarListings, isLoading: gettingSimilarListings } = useQuery({
    queryKey: [
      "similarlistings",
      {
        location,
        listType,
        price,
        opt
      },
    ],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `/listing/similar?location=${location}&dealType=${listType}&price=${Number(price)}&listingId=${opt}`,
      );
      const result = response?.data?.data;
      return result;
    },
  });


  return {
    setLocation,
    setListType,
    similarListings,
    gettingSimilarListings,
    setPrice,
  };
};

export default useSimilarListing;
