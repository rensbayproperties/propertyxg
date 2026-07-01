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
import { propertyContactSchema, aiSearchSchema } from "@/lib/schemas";
import {
  CATEGORY_DELIMITER,
  countSelectedFilters,
} from "@/lib/listingFilters";
import {
  extractListingFiltersFromAiParse,
  type SearchType,
} from "@/lib/buildListingSearchUrl";
import useRecentSearches from "./useRecentSearches";

type FormData = z.infer<typeof propertyContactSchema>;
type PromptFormData = z.infer<typeof aiSearchSchema>;

type ListingDefaults = {
  dealType?: string
}

const useListing = (opt: string = "", defaults: ListingDefaults = {}) => {
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [whatsappData, setWhatsappData] = useState<any>(null);
  const [PDFData, setPDFData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [viewMode, setViewMode] = useState<"table" | "card">(() => {
    const savedViewMode = localStorage
      ? localStorage.getItem("propViewMode")
      : "card";
    return savedViewMode === "card" ? "card" : "table";
  });
  const [filterStatus, setFilterStatus] = useQueryState(
    "status",
    searchParams.status.withOptions({ shallow: false }).withDefault("listing"),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null,
  );
  const queryClient = useQueryClient();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  const toggleView = () => {
    setViewMode((prevMode) => (prevMode === "table" ? "card" : "table"));
  };
  useEffect(() => {
    localStorage.setItem("propViewMode", viewMode);
  }, [viewMode]);

  const [searchQuery, setSearchQuery] = useQueryState(
    "title",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [assignedTo, setAssignedTo] = useQueryState(
    "assigned",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
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
  const [amenities, setAmenities] = useQueryState(
    "amenities",
    searchParams.amenities
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const { mutateAsync: deleteInventory, isPending } = useMutation({
    mutationFn: (id: any) => {
      const res = axiosAuth.delete(`/list/${id}`);
      return res;
    },
    onSuccess: () => {
      toast("Success", {
        description: "Inventory deleted successfully.",
      });
    },
  });
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

  const [listType, setListType] = useQueryState(
    "dealType",
    searchParams.status.withOptions({ shallow: false }).withDefault(defaults?.dealType || ""),
  );

  const [language, setLanguage] = useQueryState(
    "language",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );

  const [furnished, setFurnished] = useQueryState(
    "furnished",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );

  const [promptQuery, setPromptQuery] = useQueryState(
    "search",
    searchParams.search.withOptions({ shallow: false }).withDefault(""),
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
    setAmenities(null);
    setAssignedTo(null);
    setProject(null);
    setLanguage(null);
    setFurnished(null);
    setPromptQuery(null);
    setCurrentPage(null);
  }, [
    setSearchQuery,
    setlistingCategoryId,
    setLocation,
    setListType,
    setMinPrice,
    setMaxPrice,
    setBedroom,
    setBathroom,
    setAmenities,
    setAssignedTo,
    setProject,
    setLanguage,
    setFurnished,
    setPromptQuery,
    setCurrentPage,
  ]);

  const selectedCategoryIds = useMemo(
    () =>
      listingCategoryId
        ? listingCategoryId.split(CATEGORY_DELIMITER).filter(Boolean)
        : [],
    [listingCategoryId],
  );

  const selectedAmenityIds = useMemo(
    () => (amenities ? amenities.split(",").filter(Boolean) : []),
    [amenities],
  );

  const isFurnished = furnished === "true";

  const setSelectedAmenityIds = useCallback(
    (ids: string[]) => {
      void setAmenities(ids.length ? ids.join(",") : null);
    },
    [setAmenities],
  );

  const setIsFurnished = useCallback(
    (checked: boolean) => {
      void setFurnished(checked ? "true" : null);
    },
    [setFurnished],
  );

  const setDealTypeFromSearchType = useCallback(
    (searchType: "sale" | "rent") => {
      void setListType(searchType === "rent" ? "RENT" : "SALE");
    },
    [setListType],
  );

  const activeFilterCount = useMemo(
    () =>
      countSelectedFilters({
        location,
        projectId,
        bedroom,
        bathroom,
        minPrice,
        maxPrice,
        categoryIds: selectedCategoryIds,
        amenityIds: selectedAmenityIds,
        furnished: isFurnished,
      }),
    [
      location,
      projectId,
      bedroom,
      bathroom,
      minPrice,
      maxPrice,
      selectedCategoryIds,
      selectedAmenityIds,
      isFurnished,
    ],
  );

  const dealTypeOptions = [
    { value: "RENT", label: "Rent" },
    { value: "SALE", label: "Sale" },
  ];

  const isAnyFilterActive = useMemo(() => {
    return (
      !!projectId ||
      !!language ||
      !!searchQuery ||
      !!promptQuery ||
      !!listingCategoryId ||
      !!location ||
      !!listType ||
      !!bedroom ||
      !!bathroom ||
      !!amenities ||
      !!minPrice ||
      !!assignedTo ||
      !!maxPrice ||
      !!furnished
    );
  }, [
    projectId,
    language,
    searchQuery,
    promptQuery,
    listingCategoryId,
    location,
    listType,
    minPrice,
    maxPrice,
    bedroom,
    bathroom,
    amenities,
    assignedTo,
    furnished,
  ]);

  const { data: pType, isLoading: gettingCategory } = useQuery({
    queryKey: ["listCategories"],
    queryFn: async () => {
      const response = await axiosAuth.get("/list/categories/all");
      const result = response.data.data.categories_with_adtypes;

      const modifiedData = result?.map((o: any) => ({
        value: o.slug,
        label: o.name,
      }));
      return modifiedData;
    },
    enabled: false,
  });

  const { data: projectData, isLoading: gettingprojectData } = useQuery({
    queryKey: [
      "project",
      {
        projectId,
      },
    ],
    queryFn: async () => {
      const response = await axiosAuth.get(`/dxb-projects/${projectId}`);
      const result = response?.data?.data;
      return result;
    },
  });

  const { data: listings, isLoading: gettingListings } = useQuery({
    queryKey: [
      "listings",
      {
        currentPage,
        pageSize,
        searchQuery,
        location,
        listType,
        listingCategoryId,
        minPrice,
        maxPrice,
        bedroom,
        bathroom,
        language,
        projectId,
        amenities,
        furnished,
        opt
      },
    ],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `/listing/${opt}?limit=${pageSize}&page=${currentPage}&locationId=${location}&projectId=${projectId}&dealType=${listType}&language=${language}&category=${listingCategoryId}&minPrice=${Number(minPrice)}&maxPrice=${Number(maxPrice)}&bedroom=${bedroom}&bathroom=${bathroom}&amenities=${amenities}${furnished ? `&furnished=${furnished}` : ""}`,
      );
      const result = response.data;
      return result;
    },
  });

  const { data: listingsRecommendations, isLoading: gettingRecommendations } =
    useQuery({
      queryKey: [
        "recommendations",
        {
          location,
          listType,
          listingCategoryId,
          minPrice,
          maxPrice,
          bedroom,
          bathroom,
        },
      ],
      queryFn: async () => {
        const response = await axiosAuth.get(
          `/listing/recommendations?locationId=${location}&dealType=${listType}&category=${listingCategoryId}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedroom=${bedroom}&bathroom=${bathroom}`,
        );
        const result = response?.data?.data;
        return result;
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

  const { mutateAsync: exportListings, isPending: isPendingExport } =
    useMutation({
      mutationFn: async () => {
        // const url = `/contacts/export${invOpt}?name=${searchQuery}&client_type=${type}`;
        const res = await axiosAuth.get(
          `/listing/${opt}?limit=${pageSize}&page=${currentPage}&title=${searchQuery}&location=${location}&dealType=${listType}&category=${listingCategoryId}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedroom=${bedroom}&bathroom=${bathroom}&assigned=${assignedTo}`,
        );
        return res.data?.data?.url;
      },
      onSuccess: (url) => {
        if (!url) return;

        toast("Success", {
          description: "Inventories exported successfully.",
        });
        const link = document.createElement("a");
        link.href = url;
        link.download = "inventories.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

  const handleInventoryDelete = async (id: any) => {
    try {
      await deleteInventory(id);
      setOpen(false);
    } catch (err: any) {
      toast("Failed", {
        description: "Something went wrong. Please try again later",
      });
    }
  };

  const selectedRows = Object.keys(rowSelection).map(
    (index) => listings?.data?.list[parseInt(index)],
  );
  const selectedIds = selectedRows.map((row) => row?.id);

  const { mutateAsync: whatsApp, isPending: isPendingWhatsApp } = useMutation({
    mutationFn: () => {
      const res = axiosAuth.post(`/list/generate/whatsapp`, {
        items: selectedIds,
      });
      res.then((modifiedData: any) => {
        if (modifiedData.data.status === "success") {
          setWhatsappData(modifiedData.data.data.data);
        } else {
          toast("Failed", {
            description: "Something went wrong. Please try again later",
          });
        }

        return modifiedData;
      });
      return res;
    },
  });
  const { mutateAsync: pdf, isPending: isPendingPdf } = useMutation({
    mutationFn: () => {
      const res = axiosAuth.post(`/list/generate/pdf`, {
        items: selectedIds,
      });
      res.then((modifiedData: any) => {
        if (modifiedData.data.status === "success") {
          // setPDFData(modifiedData.data.data.data);
        } else {
          toast("Failed", {
            description: "Something went wrong. Please try again later",
          });
        }

        return modifiedData;
      });
      return res;
    },
  });
  const handleWhatsapp = async () => {
    try {
      const res: any = await whatsApp();
    } catch (err: any) {
      toast("Failed", {
        description: "Something went wrong. Please try again later",
      });
    }
  };
  const handlePDF = async () => {
    try {
      await pdf();
    } catch (err: any) {
      toast("Failed", {
        description: "Something went wrong. Please try again later",
      });
    }
  };
  const copyTextToClipboard = async () => {
    const validListings = whatsappData?.filter(
      (item: any) =>
        item.title != null &&
        item.price != null &&
        item.location?.name != null &&
        item.slug != null,
    );

    let message = "Hello! Here are our current property listings:\n\n";

    validListings.forEach((item: any) => {
      message += `Inventory Title: ${item.title}\n`;
      message += `Inventory Price: ${formatMoney(item?.price)}\n`;
      if (item.permit_number) {
        message += `Permit Number: ${item.permit_number}\n`;
      }
      message += `Location: ${item.location.name}\n`;
      message += `Inventory Url: https://rensproperties.vercel.app/listings/${item.slug}\n`;
      message += "----------------------------\n\n";
    });
    if ("clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy url: ", err);
      }
    }
  };

  const { data: selectedListing, isLoading: isLoadingSelectedListing } =
    useQuery<ListingsColumns | null>({
      queryKey: ["property-contact", selectedListingId],
      enabled: !!selectedListingId && isDialogOpen,
      queryFn: async () => {
        if (!selectedListingId) return null;

        const response = await axiosAuth.get(`/listing/${selectedListingId}`);
        return response?.data?.data ?? null;
      },
      refetchOnWindowFocus: false,
    });

  const contactAgent = (id: string) => {
    setSelectedListingId(id);
    setIsDialogOpen(true);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(propertyContactSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    form.reset({
      message: `Hello, I would like to check the availability for Listing #${selectedListing?.ref}.\n\nLocation: ${selectedListing?.location?.name} \nStarting Price: ${formatMoney(selectedListing?.price || 0)}. \n\nThank you!`,
    });
  }, [selectedListing]);

  const { mutateAsync: submit, isPending: isPendingPropertyContact } =
    useMutation({
      mutationFn: (credentials: any) =>
        axiosAuth.post("/property-contact/request", credentials),
      onSuccess: (res, req) => {
        if (res?.data?.success) {
          toast("Success", { description: "Agent contacted successfully." });
          setIsDialogOpen(false);
          setSelectedListingId(null);
          queryClient.invalidateQueries({
            queryKey: [
              "listings",
              {
                currentPage,
                pageSize,
                searchQuery,
                location,
                listType,
                listingCategoryId,
                minPrice,
                maxPrice,
                bedroom,
                bathroom,
              },
            ],
          });

          window.open(
            `https://api.whatsapp.com/send/?phone=2349065055593&text=${req?.message?.replace("\n", "")}`,
            "_blank",
          );
        } else {
          toast.error("Error", {
            description: res?.data?.message || "An error occured",
          });
        }
      },
    });

  const onSubmit = async (values: any) => {
    try {
      await submit({ ...values, listingId: selectedListing?.id });
    } catch (err) {
      toast("Failed", {
        description: "Something went wrong. Please try again later",
      });
    }
  };

  useEffect(() => {
    if (!openShare) {
      setWhatsappData(null);
    }
  }, [openShare]);

  const promptForm = useForm<PromptFormData>({
    resolver: zodResolver(aiSearchSchema),
    defaultValues: {
      query: "",
      location: "",
      project: "",
    },
  });

  useEffect(() => {
    promptForm.setValue("query", promptQuery || "");
  }, [promptQuery, promptForm]);

  useEffect(() => {
    promptForm.setValue("location", location || "");
    promptForm.setValue("project", projectId || "");
  }, [location, projectId, promptForm]);

  const applyParsedFilters = useCallback(
    async (
      filters: ReturnType<typeof extractListingFiltersFromAiParse>,
    ) => {
      const updates: Promise<unknown>[] = [
        setListType(filters.dealType),
        setBedroom(filters.bedroom ?? null),
        setBathroom(filters.bathroom ?? null),
        setMinPrice(filters.minPrice ?? null),
        setMaxPrice(filters.maxPrice ?? null),
        setlistingCategoryId(filters.category ?? null),
        setAmenities(filters.amenities ?? null),
        setFurnished(filters.furnished ?? null),
        setCurrentPage(1),
      ];

      if (filters.projectId) {
        updates.push(setProject(filters.projectId), setLocation(null));
      } else {
        updates.push(setProject(null));
        updates.push(setLocation(filters.locationId ?? null));
      }

      await Promise.all(updates);
    },
    [
      setListType,
      setBedroom,
      setBathroom,
      setMinPrice,
      setMaxPrice,
      setlistingCategoryId,
      setAmenities,
      setFurnished,
      setCurrentPage,
      setProject,
      setLocation,
    ],
  );

  const { mutateAsync: submitAiParse, isPending: isPendingAiSearch } =
    useMutation({
      mutationFn: (credentials: PromptFormData) =>
        axiosAuth.post("/ai/crm-parse", credentials),
      onSuccess: async (res, req) => {
        if (res?.data?.success && res?.data?.data) {
          const uiSearchType: SearchType =
            listType === "RENT" ? "rent" : "sale";
          const filters = extractListingFiltersFromAiParse(
            res.data.data,
            req,
            {
              location,
              projectId,
              bedroom,
              bathroom,
              minPrice,
              maxPrice,
              listingCategoryId,
              amenities,
            },
            uiSearchType,
          );
          await applyParsedFilters(filters);
          await setPromptQuery(req.query);
        } else {
          toast.error("Error", {
            description: res?.data?.message || "An error occured",
          });
        }
      },
    });

  const onPromptSubmit = async (values: PromptFormData) => {
    try {
      if (values.query.trim()) {
        addRecentSearch(values.query);
      }
      await submitAiParse({
        query: values.query,
        location: values.location || location || undefined,
        project: values.project || projectId || undefined,
      });
    } catch {
      toast("Failed", {
        description: "Something went wrong. Please try again later",
      });
    }
  };

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

  return {
    availableLanguages,
    language,
    setLanguage,
    isPendingExport,
    exportListings,
    resetFilters,
    isAnyFilterActive,
    activeFilterCount,
    selectedCategoryIds,
    selectedAmenityIds,
    isFurnished,
    setSelectedAmenityIds,
    setIsFurnished,
    setDealTypeFromSearchType,
    listingCategoryId,
    setlistingCategoryId,
    location,
    setLocation,
    projectId,
    setProject,
    listType,
    setListType,
    searchQuery,
    setSearchQuery,
    pType,
    listings,
    gettingListings,
    handleInventoryDelete,
    open,
    setOpen,
    isPending,
    currentPage,
    setPageSize,
    pageSize,
    setCurrentPage,
    gettingCategory,
    locations,
    isLoadingLocations,
    rowSelection,
    setRowSelection,
    selectedIds,
    setOpenShare,
    openShare,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
    handleWhatsapp,
    isPendingWhatsApp,
    whatsappData,
    copyTextToClipboard,
    copied,
    isPendingPdf,
    handlePDF,
    PDFData,
    bedroom,
    setBedroom,
    bathroom,
    setBathroom,
    amenities,
    setAmenities,
    furnished,
    setFurnished,
    assignedTo,
    setAssignedTo,
    viewMode,
    toggleView,
    filterStatus,
    setFilterStatus,
    selectedListingId,
    setSelectedListingId,
    isDialogOpen,
    setIsDialogOpen,
    selectedListing,
    isLoadingSelectedListing,
    contactAgent,
    onSubmit,
    form,
    isPendingPropertyContact,
    openNotify,
    setOpenNotify,
    dealTypeOptions,
    listingsRecommendations,
    gettingRecommendations,
    allcategories,
    isLoadingCategory,
    projectData,
    gettingprojectData,
    promptForm,
    onPromptSubmit,
    isPendingAiSearch,
    promptQuery,
    setPromptQuery,
    recentSearches,
    clearRecentSearches,
  };
};

export default useListing;
