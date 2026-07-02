"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/Container";
import HomeServiceCards from "@/components/home/HomeServiceCards";
import HomeNewProjectsSection from "@/components/home/HomeNewProjectsSection";
import HomeRecommendations from "@/components/home/HomeRecommendations";
import HomeMortgageSection from "@/components/home/HomeMortgageSection";
import HomeSeoDirectory from "@/components/home/HomeSeoDirectory";
import LocationProjectSearchDropdown from "@/components/LocationProjectSearchDropdown";
import PropertyCategoryList from "@/components/PropertyCategoryList";
import ExtraFilterList from "@/components/search/ExtraFilterList";
import PriceFilterList from "@/components/search/PriceFilterList";
import AmenityFilterList from "@/components/search/AmenityFilterList";
import useListingSearch from "@/hooks/useListingSearch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatedPlaceholderTextarea } from "@/components/AnimatedPlaceholderTextarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableFilter } from "@/components/ui/table/data-table-filter";
import useCategories from "@/hooks/useCategories";
import useAmenities from "@/hooks/useAmenities";
import { buildListingSearchUrl, type SearchType } from "@/lib/buildListingSearchUrl";
import RecentSearchDropdown from "@/components/search/RecentSearchDropdown";
import {
  countAgentFilters,
  countSelectedFilters,
  FilterCountBadge,
  SearchTypeRadioGroup,
} from "@/lib/listingFilters";

const AVAILABLE_LANGUAGES = [
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

const PageWrap = () => {
  const router = useRouter();

  const {
    allcategories,
    isLoadingCategory,
  } = useCategories()

  const {
    amenities,
    isLoadingAmenities,
  } = useAmenities()

  const {
    form,
    onSubmit,
    isPending,
    location,
    setLocation,
    projectId,
    setProject,
    setlistingCategoryId,
    listingCategoryId,
    selectedCategoryIds,
    setMaxPrice,
    maxPrice,
    minPrice,
    bedroom,
    bathroom,
    selectedAmenityIds,
    resetFilters,
    dealTypeOptions,
    recentSearches,
    clearRecentSearches,
  } = useListingSearch()

  const [searchType, setSearchType] = useState<SearchType>("sale");
  const [recentOpen, setRecentOpen] = useState(false);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempBedroom, setTempBedroom] = useState(bedroom);
  const [tempBathroom, setTempBathroom] = useState(bathroom);
  const [tempAmenities, setTempAmenities] = useState<string[]>(selectedAmenityIds);
  const [tempAgentName, setTempAgentName] = useState("");
  const [tempLanguage, setTempLanguage] = useState("");
  const [tempDealType, setTempDealType] = useState("");
  const [tempFurnished, setTempFurnished] = useState(false);
  const [LinkLocation, setLinkLocation] = useState("");

  const appliedFilterCount = useMemo(
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
        furnished: false,
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
    ],
  );

  const tempFilterCount = useMemo(() => {
    if (searchType === "agents") {
      return countAgentFilters({
        location,
        projectId,
        agentName: tempAgentName,
        language: tempLanguage,
        minPrice: tempMinPrice,
        maxPrice: tempMaxPrice,
        dealType: tempDealType,
      });
    }

    return countSelectedFilters({
      location,
      projectId,
      bedroom: tempBedroom,
      bathroom: tempBathroom,
      minPrice: tempMinPrice,
      maxPrice: tempMaxPrice,
      categoryIds: selectedCategoryIds,
      amenityIds: tempAmenities,
      furnished: tempFurnished,
    });
  }, [
    searchType,
    location,
    projectId,
    tempAgentName,
    tempLanguage,
    tempDealType,
    tempBedroom,
    tempBathroom,
    tempMinPrice,
    tempMaxPrice,
    selectedCategoryIds,
    tempAmenities,
    tempFurnished,
  ]);

  const setTempDealTypeFilter = useCallback(
    (value: string | ((old: string) => string | null) | null) => {
      if (value === null) {
        setTempDealType("");
      } else if (typeof value === "function") {
        setTempDealType((prev) => value(prev) ?? "");
      } else {
        setTempDealType(value);
      }
      return Promise.resolve(new URLSearchParams());
    },
    [],
  );

  const handleClearAllFilters = () => {
    setTempMinPrice("");
    setTempMaxPrice("");
    setTempBedroom("");
    setTempBathroom("");
    setTempAmenities([]);
    setTempAgentName("");
    setTempLanguage("");
    setTempDealType("");
    setTempFurnished(false);
    handleLocationClear();
    resetFilters();
  };

  const handleSeeProperties = () => {
    if (searchType === "agents") {
      router.push(
        buildListingSearchUrl("agents", {
          locationId: location || undefined,
          projectId: projectId || undefined,
          search: tempAgentName || undefined,
          language: tempLanguage || undefined,
          min: tempMinPrice || undefined,
          max: tempMaxPrice || undefined,
          dealType: tempDealType || undefined,
        }),
      );
      return;
    }

    router.push(
      buildListingSearchUrl(searchType, {
        locationId: location || undefined,
        projectId: projectId || undefined,
        bedroom: tempBedroom || undefined,
        bathroom: tempBathroom || undefined,
        minPrice: tempMinPrice || undefined,
        maxPrice: tempMaxPrice || undefined,
        category: listingCategoryId || undefined,
        amenities: tempAmenities.length ? tempAmenities.join(",") : undefined,
        furnished: tempFurnished ? "true" : undefined,
      }),
    );
  };

  const handleLocationSelect = (selectedItem: {
    type: "location" | "project";
    id: string;
    title: string;
  }) => {
    if (selectedItem.type === "project") {
      form.setValue("project", String(selectedItem.id));
      form.setValue("location", "");
      setProject(String(selectedItem.id));
      setLocation("");
    } else {
      form.setValue("location", String(selectedItem.id));
      form.setValue("project", "");
      setLocation(String(selectedItem.id));
      setProject("");
    }
    setLinkLocation(selectedItem.title);
  };

  const handleLocationClear = () => {
    form.setValue("location", "");
    form.setValue("project", "");
    setLocation("");
    setProject("");
    setLinkLocation("");
  };

  const selectedLocationDefault = LinkLocation
    ? {
      id: projectId || location,
      title: LinkLocation,
      type: projectId ? ("project" as const) : ("location" as const),
    }
    : undefined;

  if (isPending) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="relative flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-4 border-purple-200"></div>

            <div className="absolute h-8 w-8 rounded-full border-4 border-t-purple-600 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
          </div>

          <div className="text-center">
            <h1 className="text-lg font-bold text-purple-700 tracking-wide animate-pulse">
              Xg AI is Thinking...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative flex items-center justify-center w-full">
        <div className="w-full">
          <div className="flex flex-col gap-4 md:gap-6 min-h-[40vh] w-full items-center justify-center py-10 md:py-24 relative bg-black">
            <div
              className="absolute left-0 top-0 h-full w-full bg-cover bg-center z-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url('/assets/images/hero/2.webp')]"
            ></div>
            <div className="flex flex-col leading-[1.2] justify-center items-center w-full gap-2 z-10 px-4 text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white max-sm:max-w-xs">The Smarter Way to Find Home</div>
              <div className="text-xl text-white">Find properties to rent, buy or invest.<span className="text-brand">.</span></div>
            </div>
            <div className="z-10 w-full">
              <Container size="sm">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((values) => onSubmit(values, searchType))}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-center">
                      <SearchTypeRadioGroup
                        idPrefix="hero"
                        value={searchType}
                        onValueChange={setSearchType}
                      />
                    </div>
                    <div className="flex flex-wrap items-center w-full bg-brand rounded-3xl p-2 gap-2">
                      <div className="w-full flex flex-col relative bg-white rounded-2xl">
                        <div className="w-full">
                          <FormField
                            control={form.control}
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
                                    <AnimatedPlaceholderTextarea
                                      {...field}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                          e.preventDefault();
                                          if (!isPending) {
                                            e.currentTarget.form?.requestSubmit();
                                          }
                                        }
                                      }}
                                      placeholders={[
                                        "Furnished 1 bedroom apartment around Business Bay",
                                        "Apartments with a gym in Palm Jumeriah",
                                        "2 bedroom near Burj Khalifah under 2k",
                                        "Studio apartment for rent in Downtown Dubai",
                                        "Pet friendly homes in Damac Hills",
                                      ]}
                                      className="p-3 text-lg border-none !ring-transparent focus:!ring-transparent rounded-2xl"
                                    />
                                  </RecentSearchDropdown>
                                </FormControl>
                                {/* <FormMessage /> */}
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-2 p-2 items-end">
                          <FormField
                            control={form.control}
                            name="location"
                            render={() => (
                              <FormItem className="w-full max-w-xs">
                                <FormControl>
                                  <LocationProjectSearchDropdown
                                    key={`${location}-${projectId}`}
                                    defaultValue={selectedLocationDefault}
                                    inputClassName="!border-transparent ring-offset-transparent focus-visible:ring-1 focus-visible:ring-transparent rounded-xl py-0 h-8 pl-7 w-full"
                                    onLocationSelect={handleLocationSelect}
                                    onClear={handleLocationClear}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <button className="p-0 ml-auto"><i className="bi-arrow-right-circle-fill rounded-full text-3xl md:text-4xl text-brand"></i></button>
                        </div>
                      </div>
                      <div className="flex justify-between gap-2 w-full px-2">
                        <div className="flex items-center gap-2 font-semibold">
                          <i className="bi-stars text-yellow-400"></i>
                          <span className="text-white">AI Powered search</span>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <Sheet>
                            <SheetTrigger>
                              <div className="font-normal rounded-lg px-3 bg-white text-sm h-8 inline-flex items-center gap-2">
                                <i className="bi-filter"></i> All Filters
                                <FilterCountBadge count={tempFilterCount} />
                              </div>
                            </SheetTrigger>
                            <SheetContent className="z-[99999] px-0" side={"left"}>
                              <div className="relative w-full flex flex-col h-full space-y-5 overflow-y-scroll justify-between gap-6">
                                <div className="space-y-6">
                                  <div className="sticky top-0 left-0 grid grid-cols-2 gap-2 mt-auto w-full bg-background/90 backdrop-blur px-4 py-2 md:px-6 z-[999999] border-b">
                                    <div className="flex flex-col items-start justify-between shrink-0">
                                      <h2 className="text-lg lg:text-2xl font-bold flex gap-2 items-center">
                                        All Filters
                                        <FilterCountBadge count={tempFilterCount} />
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-between items-center w-full px-4 md:px-6">
                                    <div className="grid grid-cols-1 w-[100%] gap-6">
                                      <SearchTypeRadioGroup
                                        idPrefix="sheet"
                                        value={searchType}
                                        onValueChange={setSearchType}
                                        className="flex items-center bg-white rounded-full p-1 shadow-sm w-full justify-between gap-1 border"
                                      />

                                      <div className="space-y-2">
                                        <Label>Location</Label>
                                        <LocationProjectSearchDropdown
                                          key={`${location}-${projectId}`}
                                          defaultValue={selectedLocationDefault}
                                          onLocationSelect={handleLocationSelect}
                                          onClear={handleLocationClear}
                                        />
                                      </div>

                                      {searchType === "agents" ? (
                                        <>
                                          <div className="space-y-2">
                                            <Label>Agent name</Label>
                                            <Input
                                              value={tempAgentName}
                                              onChange={(e) => setTempAgentName(e.target.value)}
                                              placeholder="Search agents..."
                                            />
                                          </div>

                                          <div className="space-y-2">
                                            <Label>Language</Label>
                                            <DataTableFilterBox
                                              title="Language"
                                              options={AVAILABLE_LANGUAGES}
                                              filterValue={tempLanguage}
                                              setFilterValue={setTempLanguage}
                                              className="w-full p-2 flex justify-between items-center"
                                            />
                                          </div>

                                          <div className="space-y-2 flex flex-col w-full">
                                            <Label>Price</Label>
                                            <PriceFilterList
                                              minPrice={tempMinPrice}
                                              maxPrice={tempMaxPrice}
                                              setMinPrice={setTempMinPrice}
                                              setMaxPrice={setTempMaxPrice}
                                            />
                                          </div>

                                          <div className="space-y-2">
                                            <Label>Buying or selling</Label>
                                            <DataTableFilter
                                              filterKey="dealType"
                                              title="Purpose"
                                              options={dealTypeOptions || []}
                                              setFilterValue={setTempDealTypeFilter}
                                              filterValue={tempDealType}
                                              className="w-full p-2 flex justify-between items-center"
                                            />
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="space-y-2 flex flex-col w-full">
                                            <ExtraFilterList
                                              beds={tempBedroom}
                                              baths={tempBathroom}
                                              setBeds={setTempBedroom}
                                              setBaths={setTempBathroom}
                                            />
                                          </div>

                                          <div className="space-y-2 flex flex-col w-full">
                                            <Label>Price</Label>
                                            <PriceFilterList
                                              minPrice={tempMinPrice}
                                              maxPrice={tempMaxPrice}
                                              setMinPrice={setTempMinPrice}
                                              setMaxPrice={setTempMaxPrice}
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
                                              value={tempAmenities}
                                              onChange={setTempAmenities}
                                              isLoading={isLoadingAmenities}
                                            />
                                          </div>

                                          <div className="flex items-center justify-between rounded border p-3 bg-zinc-200">
                                            <Label>Furnished</Label>
                                            <Switch
                                              checked={tempFurnished}
                                              onCheckedChange={setTempFurnished}
                                            />
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="sticky bottom-0 left-0 grid grid-cols-2 gap-2 w-full bg-background/90 backdrop-blur border-t p-4 items-center">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                    onClick={handleClearAllFilters}
                                  >Clear all</Button>

                                  <Button
                                    type="button"
                                    variant="brand"
                                    onClick={handleSeeProperties}
                                  >
                                    {searchType === "agents" ? "See Agents" : "See Properties"}
                                  </Button>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <HomeServiceCards />
      <HomeRecommendations />
      <HomeNewProjectsSection />
      <HomeMortgageSection />
      <HomeSeoDirectory />
      {/* <div className="bg-gradient-to-b from-white to-brand/20 py-20 md:py-26">
        <Container>
          <div className="flex flex-col gap-y-2">
            <div className="text-3xl md:text-4xl text-center leading-[1.2] mx-auto font-bold">
              Your home search starts here<span className="text-brand">.</span>
            </div>
            <div className="flex items-center justify-center text-lg text-center leading-[1.2] max-w-lg mx-auto opacity-60">Join hundreds of agencies and property managers who run their operations smarter with PortalXg</div>
            <div className="flex gap-3 items-center justify-center mt-4">
              <Link href="" passHref>
                <Button variant={"brand"} size={"lg"}>Get Started Free</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div> */}
    </div>
  );
};

export default PageWrap;
