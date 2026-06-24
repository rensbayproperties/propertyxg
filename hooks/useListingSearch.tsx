"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { searchParams } from "@/lib/searchParams";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { aiSearchSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof aiSearchSchema>;

const useListingSearch = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [filterStatus, setFilterStatus] = useQueryState(
    "status",
    searchParams.status.withOptions({ shallow: false }).withDefault("listing"),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useQueryState(
    "title",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [bedroom, setBedroom] = useQueryState(
    "bedroom",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [bathroom, setBathroom] = useQueryState(
    "bathroom",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [listingCategoryId, setlistingCategoryId] = useQueryState(
    "category",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );
  const [location, setLocation] = useQueryState(
    "locationId",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );
  const [projectId, setProject] = useQueryState(
    "projectId",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions({ shallow: false, history: "push" })
      .withDefault(50),
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setlistingCategoryId(null);
    setLocation(null);
    setMinPrice(null);
    setMaxPrice(null);
    setBedroom(null);
    setBathroom(null);
    setCurrentPage(null)
  }, [setSearchQuery, setlistingCategoryId]);

  const dealTypeOptions = [
    { value: "RENT", label: "Rent" },
    { value: "SALE", label: "Sale" },
  ];

  const isAnyFilterActive = useMemo(() => {
    return (
      !!currentPage ||
      !!projectId ||
      !!searchQuery ||
      !!listingCategoryId ||
      !!listingCategoryId ||
      !!location ||
      !!bedroom ||
      !!bathroom ||
      !!minPrice ||
      !!maxPrice
    );
  }, [
    currentPage,
    projectId,
    searchQuery,
    listingCategoryId,
    listingCategoryId,
    location,
    minPrice,
    maxPrice,
    bedroom,
    bathroom,
  ]);

  const form = useForm<FormData>({
    resolver: zodResolver(aiSearchSchema),
    defaultValues: {
      query: "",
    },
  });

  const { mutateAsync: submit, isPending } =
    useMutation({
      mutationFn: (credentials: any) =>
        axiosAuth.post("/ai/crm-parse", credentials),
      onSuccess: (res, req) => {
        if (res?.data?.success && res?.data?.data) {
          const data = res?.data?.data
          const url = `/rent?bed=${data?.bedroom}&bath=${data?.bathroom}&minPrice=${data?.minPrice}&maxPrice=${data?.maxPrice}&location=${data?.location}`
          router.push(url)
        } else {
          toast.error("Error", {
            description: res?.data?.message || "An error occured",
          });
        }
      },
    });

  const onSubmit = async (values: any) => {
    try {
      await submit(values);
    } catch (err) {
      toast("Failed", {
        description: "Something went wrong. Please try again later",
      });
    }
  };

  return {
    resetFilters,
    isAnyFilterActive,
    listingCategoryId,
    setlistingCategoryId,
    location,
    setLocation,
    projectId,
    setProject,
    searchQuery,
    setSearchQuery,
    open,
    setOpen,
    currentPage,
    setPageSize,
    pageSize,
    setCurrentPage,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
    bedroom,
    setBedroom,
    bathroom,
    setBathroom,
    filterStatus,
    setFilterStatus,
    selectedListingId,
    setSelectedListingId,
    isDialogOpen,
    setIsDialogOpen,
    onSubmit,
    form,
    isPending,
    openNotify,
    setOpenNotify,
    dealTypeOptions,
  };
};

export default useListingSearch;
