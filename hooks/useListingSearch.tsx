"use client";
import { useState, useCallback, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { aiSearchSchema } from "@/lib/schemas";

type FormData = z.infer<typeof aiSearchSchema>;

const CATEGORY_DELIMITER = ".";

const useListingSearch = () => {
  const [open, setOpen] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [filterStatus, setFilterStatus] = useState("listing");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [listingCategoryId, setlistingCategoryId] = useState("");
  const [amenities, setAmenities] = useState("");

  const selectedAmenityIds = useMemo(() => {
    if (!amenities) return [];
    return amenities.split(",").filter(Boolean);
  }, [amenities]);

  const selectedCategoryIds = useMemo(() => {
    if (!listingCategoryId) return [];
    return listingCategoryId.split(CATEGORY_DELIMITER).filter(Boolean);
  }, [listingCategoryId]);
  const [location, setLocation] = useState("");
  const [projectId, setProject] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setlistingCategoryId("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setBedroom("");
    setBathroom("");
    setAmenities("");
    setProject("");
    setFilterStatus("listing");
    setCurrentPage(1);
  }, []);

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
      !!location ||
      !!bedroom ||
      !!bathroom ||
      !!minPrice ||
      !!maxPrice ||
      !!amenities
    );
  }, [
    currentPage,
    projectId,
    searchQuery,
    listingCategoryId,
    location,
    minPrice,
    maxPrice,
    bedroom,
    bathroom,
    amenities,
  ]);

  const form = useForm<FormData>({
    resolver: zodResolver(aiSearchSchema),
    defaultValues: {
      query: "",
      location: "",
      project: "",
    },
  });

  const { mutateAsync: submit, isPending } =
    useMutation({
      mutationFn: (credentials: FormData) =>
        axiosAuth.post("/ai/crm-parse", credentials),
      onSuccess: (res, req) => {
        if (res?.data?.success && res?.data?.data) {
          const data = res?.data?.data
          const url = `/rent?bed=${data?.bedroom}&bath=${data?.bathroom}&minPrice=${data?.minPrice}&maxPrice=${data?.maxPrice}&location=${data?.location?.locationId || form.getValues('location') || ""}&project=${data?.location?.locationId || form.getValues('location') || ""}`
          console.log(url)
          // isFurnished
          // router.push(url)
        } else {
          toast.error("Error", {
            description: res?.data?.message || "An error occured",
          });
        }
      },
    });

  const onSubmit = async (values: FormData) => {
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
    selectedCategoryIds,
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
    amenities,
    setAmenities,
    selectedAmenityIds,
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
