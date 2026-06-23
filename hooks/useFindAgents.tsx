"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { searchParams } from "@/lib/searchParams";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";
import { toast } from "sonner";
import { formatMoney } from "@/lib/utils";
import { ListingsColumns } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { propertyContactSchema } from "@/lib/schemas";

type FormData = z.infer<typeof propertyContactSchema>;

const useFindAgents = (opt: string = "") => {
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [whatsappData, setWhatsappData] = useState<any>(null);
  const [PDFData, setPDFData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [viewMode, setViewMode] = useState<"table" | "card">(() => {
    const savedViewMode = localStorage.getItem("propViewMode");
    return savedViewMode === "card" ? "card" : "table";
  });
  const [filterStatus, setFilterStatus] = useQueryState(
    "status",
    searchParams.status
      .withOptions({ shallow: false })
      .withDefault("companylisting"),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null,
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.setItem("propViewMode", viewMode);
  }, [viewMode]);

  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [assignedTo, setAssignedTo] = useQueryState(
    "assigned",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );
  const [minPrice, setMinPrice] = useQueryState(
    "min",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "max",
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

      const [language, setLanguage] = useQueryState(
        "language",
        searchParams.status.withOptions({ shallow: false }).withDefault(""),
      );

  const [listType, setListType] = useQueryState(
    "dealType",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );

  const [filterType, setFilterType] = useQueryState(
    "entity",
    searchParams.status.withOptions({ shallow: false }).withDefault("agents"),
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
    setListType(null);
    setMinPrice(null);
    setMaxPrice(null);
    setBedroom(null);
    setBathroom(null);
    setAssignedTo(null);
    setProject(null);
    setLanguage(null);
    setCurrentPage(null);
  }, [setSearchQuery, setlistingCategoryId]);

  const dealTypeOptions = [
    { value: "RENT", label: "Rent" },
    { value: "SALE", label: "Sale" },
  ];

  const agentsTypeOptions = [
    { value: "agents", label: "Agents" },
    { value: "agencies", label: "Agencies" },
  ];

  const isAnyFilterActive = useMemo(() => {
    return (
      !!currentPage ||
      !!projectId ||
      !!language ||
      !!searchQuery ||
      !!listingCategoryId ||
      !!listingCategoryId ||
      !!location ||
      !!listType ||
      !!bedroom ||
      !!bathroom ||
      !!minPrice ||
      !!assignedTo ||
      !!maxPrice
    );
  }, [
    currentPage,
    projectId,
    language,
    searchQuery,
    listingCategoryId,
    listingCategoryId,
    location,
    listType,
    minPrice,
    maxPrice,
    bedroom,
    bathroom,
    assignedTo,
  ]);

  const { data: findAgentsDetails, isLoading: gettingagentsDetails } = useQuery({
    queryKey: [
      "companyDetails",
      {
        currentPage,
        pageSize,
        searchQuery,
        location,
        listType,
        listingCategoryId,
        language,
        filterType
      },
    ],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `/listing/browse?limit=${pageSize}&page=${currentPage}&search=${searchQuery}&locationId=${location}&dealType=${listType}&entity=${filterType}&category=${listingCategoryId}&language=${language}`,
      );
      const result = response.data.data;
      console.log("filterType", result)
      return result;
    },
  });

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axiosAuth.get(`/locations`);
      const results = res.data.data.locations;
      const modifiedData = results?.map((o: any) => ({
        value: o.slug,
        label: o.name,
      }));
      return modifiedData;
    },
  });


  const { isLoading: isLoadingCategory, data: allcategories } = useQuery({
    queryFn: async () => {
      const response = await axiosAuth.get("/listing-category");
      const results = response.data.data;
      return results;
    },
    queryKey: ["categories"],
  });


    const availableLanguages = [
    { value: "arabic", label: "Arabic" },
    { value: "english", label: "English" },
    { value: "farsi", label: "Farsi" },
    { value: "french", label: "French" },
    { value: "hindi", label: "Hindi" },
    { value: "italian", label: "Italian" },
    { value: "russian", label: "Russian" },
    { value: "spanish", label: "Spanish" },
    { value: "urdu", label: "Urdu" },
    { value: "others", label: "Others" },
  ];

  useEffect(() => {
    if (!openShare) {
      setWhatsappData(null);
    }
  }, [openShare]);

  return {
    availableLanguages,
    projectId,
    setProject,
    language,
    setLanguage,
    resetFilters,
    isAnyFilterActive,
    listingCategoryId,
    setlistingCategoryId,
    location,
    setLocation,
    listType,
    setListType,
    searchQuery,
    setSearchQuery,
    findAgentsDetails,
    gettingagentsDetails,
    open,
    setOpen,
    currentPage,
    setPageSize,
    pageSize,
    setCurrentPage,
    locations,
    isLoadingLocations,
    rowSelection,
    setRowSelection,
    setOpenShare,
    openShare,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
    whatsappData,
    copied,
    PDFData,
    bedroom,
    setBedroom,
    bathroom,
    setBathroom,
    assignedTo,
    setAssignedTo,
    viewMode,
    filterStatus,
    setFilterStatus,
    selectedListingId,
    setSelectedListingId,
    isDialogOpen,
    setIsDialogOpen,
    openNotify,
    setOpenNotify,
    dealTypeOptions,
    allcategories,
    isLoadingCategory,
    filterType,
    setFilterType,
    agentsTypeOptions
    
  };
};

export default useFindAgents;
