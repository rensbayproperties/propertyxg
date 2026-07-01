"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { useState } from "react";
import { cn, formatMoney, getTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Maximize, Phone } from "lucide-react";
import useListing from "@/hooks/useListing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter } from "@/constant/data";
import LocationProjectSearchDropdown from "@/components/LocationProjectSearchDropdown";
import usePublicAlert from "@/hooks/usePublicAlert";
import PropertyCategoryList from "@/components/PropertyCategoryList";
import ExtraFilterList from "@/components/search/ExtraFilterList";
import PriceFilterList from "@/components/search/PriceFilterList";
import AmenityFilterList from "@/components/search/AmenityFilterList";
import ListingProjectShowcase from "@/components/ListingProjectShowcase";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useCategories from "@/hooks/useCategories";
import useAmenities from "@/hooks/useAmenities";
import {
  FilterCountBadge,
  LISTING_SEARCH_TYPE_OPTIONS,
  SearchTypeRadioGroup,
} from "@/lib/listingFilters";
import type { SearchType } from "@/lib/buildListingSearchUrl";
import RecentSearchDropdown from "@/components/search/RecentSearchDropdown";

interface PageProps {
  searchParams: { dealType?: string; top_category?: string };
}

const PageWrap = ({ searchParams }: PageProps) => {
  const {
    listings,
    gettingListings,
    isDialogOpen,
    setIsDialogOpen,
    setSelectedListingId,
    form,
    isPendingPropertyContact,
    onSubmit,
    selectedListing,
    isLoadingSelectedListing,
    location,
    setLocation,
    projectId,
    setProject,
    setlistingCategoryId,
    listingCategoryId,
    setMaxPrice,
    setMinPrice,
    maxPrice,
    minPrice,
    setBedroom,
    setBathroom,
    bedroom,
    bathroom,
    listType,
    setDealTypeFromSearchType,
    listingsRecommendations,
    resetFilters,
    activeFilterCount,
    setCurrentPage,
    currentPage,
    selectedAmenityIds,
    setSelectedAmenityIds,
    isFurnished,
    setIsFurnished,
    projectData,
    gettingprojectData,
    promptForm,
    onPromptSubmit,
    isPendingAiSearch,
    recentSearches,
    clearRecentSearches,
  } = useListing("", { dealType: searchParams.dealType || "" });

  const { allcategories, isLoadingCategory } = useCategories();
  const { amenities, isLoadingAmenities } = useAmenities();

  const { formAlert, onSubmitAlert, isPending } = usePublicAlert();

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    {},
  );

  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false);
  const [linkLocationTitle, setLinkLocationTitle] = useState("");

  const [pageGroup, setPageGroup] = useState(0);
  const pagesPerGroup = 10;

  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(
    startPage + pagesPerGroup - 1,
    listings?.data?.meta?.totalPages,
  );

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const next = (id: string, length: number) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % length,
    }));
  };

  const prev = (id: string, length: number) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? length - 1 : (prev[id] || 0) - 1,
    }));
  };

  const usefulLinksSections = [
    // {
    //   title: "Locations",
    //   links:
    //     listingsRecommendations?.suggestedLocations?.map(
    //       (location: string) => ({
    //         label: `Properties in ${location}`,
    //         href: `/search?location=${location}`,
    //       }),
    //     ) || [],
    // },

    {
      title: "Bedrooms",
      links:
        listingsRecommendations?.suggestedBedrooms?.map((bedroom: string) => ({
          label: `${bedroom} Bedroom ${listingsRecommendations?.suggestedCategories?.[0] || "Properties"
            } in ${linkLocationTitle || "Dubai"}`,
          href: location
            ? `/search?bedroom=${bedroom}&locationId=${location}`
            : `/search?bedroom=${bedroom}`,
        })) || [],
    },

    {
      title: "Bathrooms",
      links:
        listingsRecommendations?.suggestedBathrooms?.map(
          (bathroom: string) => ({
            label: `${bathroom} Bathroom Properties in ${linkLocationTitle || "Dubai"
              }`,
            href: location
              ? `/search?bathroom=${bathroom}?locationId=${location}`
              : `/search?bathroom=${bathroom}`,
          }),
        ) || [],
    },
  ];

  const [popupInfo, setpopupInfo] = useState("");

  const contactInfo = listings?.data?.data?.filter(
    (info: any) => info.id === popupInfo,
  );

  const searchType: SearchType = listType === "RENT" ? "rent" : "sale";

  const selectedLocationDefault = linkLocationTitle
    ? {
      id: projectId || location,
      title: linkLocationTitle,
      type: projectId ? ("project" as const) : ("location" as const),
    }
    : undefined;

  const handleLocationSelect = (selectedItem: {
    type: "location" | "project";
    id: string;
    title: string;
  }) => {
    if (selectedItem.type === "project") {
      promptForm.setValue("project", String(selectedItem.id));
      promptForm.setValue("location", "");
      void setProject(String(selectedItem.id));
      void setLocation(null);
    } else {
      promptForm.setValue("location", String(selectedItem.id));
      promptForm.setValue("project", "");
      void setLocation(String(selectedItem.id));
      void setProject(null);
    }
    setLinkLocationTitle(selectedItem.title);
  };

  const handleLocationClear = () => {
    promptForm.setValue("location", "");
    promptForm.setValue("project", "");
    void setLocation(null);
    void setProject(null);
    setLinkLocationTitle("");
  };

  const handleClearAllFilters = () => {
    handleLocationClear();
    resetFilters();
  };

  const handleSeeProperties = async () => {
    await setCurrentPage(1);
    setSheetOpen(false);
  };

  if (gettingListings || isPendingAiSearch)
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-purple-200"></div>

            <div className="absolute h-12 w-12 rounded-full border-4 border-t-purple-600 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-700 tracking-wide">
              PropertyXg
            </h1>
            <p className="text-sm text-purple-400 mt-1 animate-pulse">
              {isPendingAiSearch
                ? "Xg AI is thinking..."
                : "Loading amazing listings..."}
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="bg-gray-200">
        <Container>
          <div className="py-2">
            <BreadCrumbs />
            <div className="font-bold text-xl md:text-2xl mt-4">Properties for sale in Dubai</div>
          </div>
        </Container>
      </div>
      <section className="sticky top-0 border-b shadow-[0_3px_5px_-3px_rgba(0,0,0,0.1)] z-[20] py-2 space-y-2 bg-white">
        <Container className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 w-full">
            <Form {...promptForm}>
              <form
                onSubmit={promptForm.handleSubmit(onPromptSubmit)}
                className="flex-1 min-w-[200px]"
              >
                <FormField
                  control={promptForm.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RecentSearchDropdown
                          recentSearches={recentSearches}
                          open={recentOpen}
                          onOpenChange={setRecentOpen}
                          onSelect={(query) => field.onChange(query)}
                          onClear={clearRecentSearches}
                        >
                          <Input
                            {...field}
                            placeholder="Furnished 1 bedroom apartment around Business Bay"
                            className="h-10"
                            disabled={isPendingAiSearch}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !isPendingAiSearch) {
                                e.preventDefault();
                                e.currentTarget.form?.requestSubmit();
                              }
                            }}
                          />
                        </RecentSearchDropdown>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <div className="w-full max-w-xs">
              <LocationProjectSearchDropdown
                key={`${location}-${projectId}`}
                defaultValue={selectedLocationDefault}
                inputClassName="h-10"
                onLocationSelect={handleLocationSelect}
                onClear={handleLocationClear}
              />
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant={"outline"} className="gap-2">
                  <i className="bi-filter"></i> All Filters
                  <FilterCountBadge count={activeFilterCount} />
                </Button>
              </SheetTrigger>
              <SheetContent className="z-[99999] px-0" side={"left"}>
                <div className="relative w-full flex flex-col h-full space-y-5 overflow-y-scroll justify-between gap-6">
                  <div className="space-y-6">
                    <div className="sticky top-0 left-0 grid grid-cols-2 gap-2 mt-auto w-full bg-background/90 backdrop-blur px-4 py-2 md:px-6 z-[999999] border-b">
                      <div className="flex flex-col items-start justify-between shrink-0">
                        <h2 className="text-lg lg:text-2xl font-bold flex gap-2 items-center">
                          All Filters
                          <FilterCountBadge count={activeFilterCount} />
                        </h2>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-center w-full px-4 md:px-6">
                      <div className="grid grid-cols-1 w-[100%] gap-6">
                        <SearchTypeRadioGroup
                          idPrefix="search-sheet"
                          value={searchType}
                          onValueChange={(value) =>
                            setDealTypeFromSearchType(value as "sale" | "rent")
                          }
                          options={LISTING_SEARCH_TYPE_OPTIONS}
                          className="flex items-center bg-white rounded-full p-1 shadow-sm w-full justify-between gap-1 border"
                        />

                        <div className="space-y-2">
                          <Label>Location</Label>
                          <LocationProjectSearchDropdown
                            key={`sheet-${location}-${projectId}`}
                            defaultValue={selectedLocationDefault}
                            onLocationSelect={handleLocationSelect}
                            onClear={handleLocationClear}
                          />
                        </div>

                        <div className="space-y-2 flex flex-col w-full">
                          <ExtraFilterList
                            beds={bedroom}
                            baths={bathroom}
                            setBeds={setBedroom}
                            setBaths={setBathroom}
                          />
                        </div>

                        <div className="space-y-2 flex flex-col w-full">
                          <Label>Price</Label>
                          <PriceFilterList
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Category</Label>
                          <PropertyCategoryList
                            options={allcategories || []}
                            setFilterValue={setlistingCategoryId}
                            filterValue={listingCategoryId}
                            isLoading={isLoadingCategory}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Amenities</Label>
                          <AmenityFilterList
                            options={amenities || []}
                            value={selectedAmenityIds}
                            onChange={setSelectedAmenityIds}
                            isLoading={isLoadingAmenities}
                          />
                        </div>

                        <div className="flex items-center justify-between rounded border p-3 bg-zinc-200">
                          <Label>Furnished</Label>
                          <Switch
                            checked={isFurnished}
                            onCheckedChange={setIsFurnished}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sticky bottom-0 left-0 grid grid-cols-2 gap-2 w-full bg-background/90 backdrop-blur border-t p-4 items-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={handleClearAllFilters}
                    >
                      Clear all
                    </Button>

                    <Button
                      type="button"
                      variant="brand"
                      onClick={handleSeeProperties}
                    >
                      See Properties
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button role="button" variant={"light"} className="p-0 rounded-full w-10 h-10 border border-zinc-500 shadow" onClick={() => setOpen(true)}><i className="bi-bell text-lg"></i></Button>
            <Button variant={"brand"}>Save search</Button>
          </div>
        </Container>
      </section>

      {projectId && !gettingprojectData && (
        <section className="min-h-[50vh] py-8">
          <ListingProjectShowcase
            data={projectData}
            launchPrice="AED 700K"
            paymentPlan="70/30"
            onRegisterInterest={() => {
              console.log("Interested");
            }}
          />
        </section>
      )}

      <section className="min-h-[80vh]">
        <div>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 py-4">
              <div className="space-y-4">
                <div className="space-y-4">
                  {listings && listings?.data?.data?.length < 1 ? (
                    <div className="text-brand bg-purple-50 border border-brand rounded flex justify-center items-center p-5">
                      Sorry, no listing match your search
                    </div>
                  ) : (
                    listings?.data?.data?.map((listing: any) => {
                      const images =
                        (listing?.images || [])
                          .map((img: any) => img?.url)
                          .filter(Boolean) || [];

                      const activeIndex = activeIndexes[listing.id] || 0;
                      return (
                        <div
                          className="rounded-xl overflow-hidden border bg-white shadow-sm relative"
                          key={`propp__${listing.id}`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0">
                            <div className="relative min-h-[260px] md:h-full">
                              {images.length === 0 ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-muted-foreground text-sm gap-2">
                                  <i className="bi-image"></i> No Image
                                </div>
                              ) : (
                                <Image
                                  src={images[activeIndex] || images[0]}
                                  alt="Property"
                                  fill
                                  className="object-cover"
                                />
                              )}

                              <div className="absolute top-3 right-3">
                                <div className="capitalize text-xs">
                                  <span
                                    className={cn(
                                      `px-2 py-0.5 rounded-full`,
                                      listing.dealType.toLowerCase() === "sale" &&
                                      "bg-purple-200 text-purple-800",
                                      listing.dealType.toLowerCase() === "rent" &&
                                      "bg-pink-200 text-pink-800",
                                    )}
                                  >{`for ${listing.dealType.toLowerCase()}`}</span>
                                </div>
                              </div>

                              {images.length > 1 && (
                                <>
                                  <button
                                    onClick={() =>
                                      prev(listing.id, images.length)
                                    }
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                                  >
                                    ‹
                                  </button>
                                  <button
                                    onClick={() =>
                                      next(listing.id, images.length)
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                                  >
                                    ›
                                  </button>
                                </>
                              )}

                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                                {images.map((_: any, i: number) => (
                                  <span
                                    key={i}
                                    className={cn(
                                      "w-2 h-2 rounded-full",
                                      i === activeIndex
                                        ? "bg-white"
                                        : "bg-white/50",
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="p-4 flex flex-col justify-between gap-3">
                              <Link
                                href={`/search/${listing.id}`}
                              // className="absolute top-0 left-0 w-full h-full bgr/10 inset-0"
                              >
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>
                                      {listing.created_on
                                        ? `Listed ${getTimeAgo(listing.created_on)}`
                                        : ""}
                                    </span>
                                    <Image
                                      src={listing?.company?.logo || ""}
                                      width={50}
                                      height={50}
                                      alt=""
                                    />
                                  </div>

                                  <div className="text-2xl font-bold">
                                    {formatMoney(Number(listing?.price))}
                                  </div>

                                  <div className="text-sm text-muted-foreground">
                                    {listing.title}
                                  </div>
                                  <div className="flex gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                    {(listing?.property_bedroom && (
                                      <div className="flex gap-2 items-center">
                                        <BedDouble size={14} />
                                        <div className="capitalize">
                                          {listing.property_bedroom}
                                        </div>
                                      </div>
                                    )) || <></>}
                                    {(listing?.property_bathroom && (
                                      <div className="flex gap-2 items-center border-l pl-2">
                                        <Bath size={14} />
                                        <div>{listing.property_bathroom}</div>
                                      </div>
                                    )) || <></>}
                                    {(listing?.property_size && (
                                      <div className="flex gap-2 items-center border-l pl-2">
                                        <Maximize
                                          size={14}
                                          className="opacity-50 leading-relaxed"
                                        />
                                        <div className="capitalize">
                                          {listing?.property_size?.toLocaleString() +
                                            " sqft"}
                                        </div>
                                      </div>
                                    )) || <></>}
                                    {(listing?.completionStatus && (
                                      <div className="flex gap-2 items-center border-l pl-2">
                                        {listing?.completionStatus?.toLowerCase() ===
                                          "off_plan" ? (
                                          <i className="bi-building-exclamation opacity-50"></i>
                                        ) : listing?.completionStatus?.toLowerCase() ===
                                          "ready" ? (
                                          <i className="bi bi-check-circle opacity-50"></i>
                                        ) : (
                                          <></>
                                        )}
                                        <div className="capitalize">
                                          {listing?.completionStatus
                                            ?.toLowerCase()
                                            .replace(/_/g, " ")}
                                        </div>
                                      </div>
                                    )) || <></>}
                                    {(listing?.furnished && (
                                      <div className="flex gap-2 items-center border-l pl-2">
                                        <i className="bi-house-check opacity-50"></i>
                                        <div className="capitalize">
                                          Furnished
                                        </div>
                                      </div>
                                    )) || <></>}
                                    {(listing?.distres && (
                                      <div className="flex gap-2 items-center border-l pl-2">
                                        <i className="bi bi-exclamation-triangle"></i>
                                        <div className="capitalize">Distress</div>
                                      </div>
                                    )) || <></>}
                                    {(listing?.category && (
                                      <div className="flex gap-2 items-center border-l pl-2">
                                        <i className="bi bi-buildings"></i>
                                        <div className="capitalize">
                                          {listing?.category?.name}
                                        </div>
                                      </div>
                                    )) || <></>}
                                  </div>

                                  <div className="flex gap-1 items-center text-xs text-muted-foreground truncate mt-2 font-semibold">
                                    <div>
                                      {[
                                        listing?.project?.project_name_en,
                                        listing?.location?.name,
                                      ]
                                        .filter(Boolean)
                                        .join(", ")}
                                    </div>
                                  </div>
                                </div>
                              </Link>

                              <hr />
                              <div className="grid grid-cols-1 space-y-3 md:grid-cols-2">
                                <div className="flex w-full items-center gap-2">
                                  <Avatar className="h-8 w-8 rounded-full shadow border">
                                    <AvatarImage src={listing?.uploader?.image} />
                                    <AvatarFallback className="rounded-full">
                                      {getFirstLetter(
                                        listing.uploader.first_name,
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="text-xs">
                                    <div>Super Agent</div>
                                    <div className="font-semibold capitalize gap-1">
                                      {listing.uploader.first_name}{" "}
                                      {listing.uploader.last_name}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 sm:justify-end">
                                  <Button
                                    variant="outline"
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 shadow-none border-none relative z-10"
                                    size={"sm"}
                                    onClick={() => {
                                      (setOpenContact(true),
                                        setpopupInfo(listing.id));
                                    }}
                                  >
                                    <i className="bi-telephone"></i>
                                    Call
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-green-100 text-green-800 hover:bg-green-200 border-none"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const fullName =
                                        `${listing.uploader.first_name || ""} ${listing.uploader.last_name || ""
                                          }`.trim();

                                      const phone = String(
                                        listing.uploader.whatsapp || "",
                                      ).replace(/\D/g, "");

                                      const message = encodeURIComponent(
                                        `Hi ${fullName},
  
                                         I am interested in the following property:
                                  
                                         Property: ${listing?.title || ""},
                                         Location: ${listing?.location?.name || ""},
                                         Price: ${formatMoney(listing?.price)},
                                  
                                         Could you please provide additional information regarding availability and viewing arrangements?
                                  
                                         Thank you and I look forward to your response.
                                  
                                         Kind regards,`,
                                      );

                                      window.open(
                                        `https://wa.me/${phone}?text=${message}`,
                                        "_blank",
                                      );
                                    }}
                                  >
                                    <i className="bi-whatsapp"></i>
                                    WhatsApp
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="flex items-center justify-center pt-5 gap-2 flex-wrap">
                  {pageGroup > 0 && (
                    <button
                      onClick={() => setPageGroup((prev) => prev - 1)}
                      className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
                    >
                      Prev
                    </button>
                  )}

                  {visiblePages.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-11 w-11 rounded-md border transition font-medium ${currentPage === page
                        ? "bg-purple-50 text-purple-700 border-purple-500"
                        : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  {endPage < listings?.data?.meta?.totalPages && (
                    <button
                      onClick={() => setPageGroup((prev) => prev + 1)}
                      className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
              <div>
                <div className="sticky top-20 space-y-4">
                  {/* <div className="text-center space-y-3 card">
                  <p className="font-medium">
                    Be the first to hear about new properties
                  </p>
                  <div>
                    <Button
                      onClick={() => setOpen(true)}
                      className="w-full flex flex-wrap items-center text-xs"
                      variant={"outline_brand"}
                    >
                      <i className="bi-bell-fill"></i>
                      <p>ALERT ME OF NEW PROPERTIES</p>
                    </Button>
                  </div>
                </div> */}
                  <div className="space-y-4">
                    {usefulLinksSections.map((section, index) => {
                      return (
                        <div key={index} className="card !p-0 overflow-hidden">
                          <div className="bg-gradient-to-r from-gray-50 to-white border-b px-4 py-3">
                            <h3 className="text-sm font-semibold text-gray-800">
                              {section.title}
                            </h3>
                          </div>

                          <div className="p-4 flex flex-col gap-2">
                            {section.links.map((link: any, linkIndex: number) => (
                              <a
                                key={linkIndex}
                                href={link.href}
                                className="text-[13px] text-gray-600 hover:text-blue-600 transition-colors duration-200 leading-relaxed"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </section>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open: boolean) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedListingId(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl overflow-hidden border border-primary/20 bg-gradient-to-b from-background via-background/95 to-card">
          <DialogHeader className="pt-0 pb-2">
            <DialogTitle className="flex items-center justify-between text-lg font-semibold tracking-tight">
              <div className="flex gap-2">
                <i className="bi-whatsapp text-green-800"></i>
                <span className="block text-lg font-extrabold text-green-800">
                  Contact Agent
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          {isLoadingSelectedListing ? (
            <div className="py-6 text-sm text-muted-foreground">...</div>
          ) : !selectedListing ? (
            <div className="py-6 text-sm text-muted-foreground">
              No information available.
            </div>
          ) : (
            <ScrollArea className="max-h-[80vh] overflow-scroll p-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Notes</FormLabel> */}
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Message"
                              rows={10}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <Button
                        type="submit"
                        loading={isPendingPropertyContact}
                        className="w-full bg-green-800 hover:bg-green-800 text-green-100 shadow-md"
                      >
                        {isPendingPropertyContact
                          ? "Please wait..."
                          : "Continue"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      <Dialog onOpenChange={setOpenContact} open={openContact}>
        <DialogContent
          className="sm:max-w-[420px] bg-white rounded-xl p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="pt-0 pb-2">
            <DialogTitle className="flex items-center justify-between text-lg font-semibold tracking-tight"></DialogTitle>
          </DialogHeader>

          <div>
            {listings &&
              contactInfo?.map((listing: any) => {
                return (
                  <div className="bg-white rounded-lg max-w-md mx-auto flex flex-col justify-center items-center space-y-3">
                    <h2 className="text-center text-2xl font-semibold">
                      Contact Us
                    </h2>

                    <Image
                      src={listing?.company?.logo || ""}
                      width={70}
                      height={70}
                      alt=""
                      className="object-cover"
                    />

                    <div className="flex items-center justify-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>

                      <a
                        href={`tel:${listing?.uploader?.phone}`}
                        className="text-xl font-semibold text-brand hover:underline"
                      >
                        {listing?.uploader?.phone}
                      </a>
                    </div>

                    <hr />

                    <div className="text-center">
                      <span className="text-gray-500">Agent: </span>
                      <span className="font-medium">
                        {listing?.uploader?.first_name}{" "}
                        {listing?.uploader?.last_name}
                      </span>
                    </div>

                    <hr />

                    <div className="text-center">
                      <p className="text-md">Please quote property reference</p>
                      <p className="font-bold text-lg">
                        PropertyXg - {listing?.ref}
                      </p>
                      <p className="text-md">when calling us.</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent
          className="sm:max-w-[420px] bg-white rounded-xl p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Create Property Alert
            </DialogTitle>
            <p className="text-sm text-gray-500">
              Enter your email to get updates for properties for sale in UAE.
            </p>
          </DialogHeader>

          <div className="mt-4">
            <Form {...formAlert}>
              <form
                onSubmit={formAlert.handleSubmit((values) =>
                  onSubmitAlert(values, {
                    bathroom,
                    bedroom,
                    maxPrice,
                    minPrice,
                    listingCategoryId,
                    location,
                  }),
                )}
                className="space-y-4"
              >
                <FormField
                  control={formAlert.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isPending}
                          {...field}
                          placeholder="Enter your email"
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-2">
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11"
                    >
                      Cancel
                    </Button>
                  </DialogTrigger>

                  <Button
                    type="submit"
                    loading={isPending}
                    className="w-full h-11 text-white"
                    variant="brand"
                  >
                    {isPending ? "Please wait..." : "Create Alert"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageWrap;
