"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { useState } from "react";
import { cn, formatMoney, formatToReadableDate, getTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  Bath,
  Maximize,
  Heart,
  Phone,
  Languages,
} from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { RadioTab, RadioTabs } from "@/components/ui/radio-tab-group";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter } from "@/constant/data";
import ExtraFilter from "@/components/search/ExtraFilter";
import PriceFilter from "@/components/search/PriceFilter";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCompany from "@/hooks/useCompany";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import PropertyCategoryDropdown from "@/components/PropertyCategoryFilter";
import { DataTableFilter } from "@/components/ui/table/data-table-filter";
import LocationProjectSearchDropdown from "@/components/LocationProjectSearchDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import useFindAgents from "@/hooks/useFindAgents";
import FindAgentsSearch from "@/components/findAgentsSearch";

const PageWrap = () => {
  const {
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
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
    bedroom,
    setBedroom,
    bathroom,
    setBathroom,
    setSelectedListingId,
    isDialogOpen,
    setIsDialogOpen,
    dealTypeOptions,
    allcategories,
    isLoadingCategory,
    filterType,
    setFilterType,
    agentsTypeOptions,
  } = useFindAgents();

  const router = useRouter();

  const [pageGroup, setPageGroup] = useState(0);

  const pagesPerGroup = 10;

  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(
    startPage + pagesPerGroup - 1,
    findAgentsDetails?.meta.totalPages,
  );

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    {},
  );

  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  const [tempBedroom, setTempBedroom] = useState(bedroom);
  const [tempBathroom, setTempBathroom] = useState(bathroom);

  const [tempLanguage, setTempLanguage] = useState(language);

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

  const [filters, setFilters] = useState(false);

  const [showAllLocations, setShowAllLocations] = useState(false);

  const initialLocations = findAgentsDetails?.topLocations?.slice(0, 3) || [];

  const hiddenLocations = findAgentsDetails?.topLocations?.slice(3) || [];

  const [openContact, setOpenContact] = useState(false);

  const [openAgent, setOpenAgent] = useState(false);

  const [popupAgent, setpopupAgent] = useState("");

  const contactAgentInfo = findAgentsDetails?.data?.filter(
    (info: any) => info.id === popupAgent,
  );

  if (gettingagentsDetails)
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-4 border-purple-200"></div>

            <div className="absolute h-16 w-16 rounded-full border-4 border-t-purple-600 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-700 tracking-wide">
              PropertyXg
            </h1>
            <p className="text-sm text-purple-400 mt-1 animate-pulse">
              Loading Agents...
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <section className="min-h-[50vh] bg-white py-4">
        <Container>
          <div className="gap-4 p-4">
            {findAgentsDetails && filterType === "agencies" ? (
              <div className="space-y-4">
                <div className="bg-white sticky top-[0.1px] z-[20]">
                  <section className="border-b shadow-[0_3px_5px_-3px_rgba(0,0,0,0.1)] py-4 flex flex-wrap gap-4 justify-start items-center">
                    <DataTableFilter
                      filterKey="entity"
                      title="Find"
                      options={agentsTypeOptions || []}
                      setFilterValue={setFilterType}
                      filterValue={filterType}
                    />

                    <div className="w-full max-w-md">
                      <FindAgentsSearch
                        type="agencies"
                        agenciesData={findAgentsDetails?.data}
                        setSearchQuery={setSearchQuery}
                      />
                    </div>
                    <LocationProjectSearchDropdown
                      onLocationSelect={(selectedItem) => {
                        if (selectedItem.type === "project") {
                          setProject(String(selectedItem.id));
                          setLocation(null);
                        } else {
                          setLocation(String(selectedItem.id));
                          setProject(null);
                        }
                      }}
                    />
                    <DataTableFilterBox
                      title="Language"
                      options={availableLanguages || []}
                      filterValue={language}
                      setFilterValue={setLanguage}
                      className="p-2 flex justify-between items-center"
                    />

                    <DataTableResetFilter
                      isFilterActive={isAnyFilterActive}
                      onReset={resetFilters}
                    />
                  </section>
                </div>

                <div className="border rounded-xl overflow-hidden bg-white">
                  <div className="flex items-center flex-wrap">
                    {initialLocations.map((location: any) => (
                      <button
                        key={location.locationId}
                        className="flex-1 min-w-[220px] px-5 py-4 text-left hover:bg-gray-50 transition"
                        onClick={() => setLocation(String(location.locationId))}
                      >
                        <span className="text-black/70 font-medium text-sm">
                          {location.name}
                        </span>

                        <span className="text-gray-500 ml-1">
                          ({location.count})
                        </span>
                      </button>
                    ))}

                    <button
                      onClick={() => setShowAllLocations(!showAllLocations)}
                      className="ml-auto px-5 py-4 text-black/70 font-semibold"
                    >
                      {showAllLocations ? "SHOW LESS" : "VIEW ALL LOCATIONS"}
                    </button>
                  </div>

                  {showAllLocations && (
                    <div className="border-t grid md:grid-cols-3 lg:grid-cols-4">
                      {hiddenLocations.map((location: any) => (
                        <button
                          key={location.locationId}
                          className="px-5 py-4 text-left hover:bg-gray-50 border-b"
                        >
                          <span className="text-black/70 font-medium text-sm">
                            {location.name}
                          </span>

                          <span className="text-gray-500 ml-1">
                            ({location.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {findAgentsDetails && findAgentsDetails?.data?.length < 1 ? (
                  <div className="text-brand bg-purple-50 border border-brand rounded flex justify-center items-center p-5 mt-5">
                    Sorry, no listing match your search
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-5">
                    {findAgentsDetails.data?.map((agency: any) => (
                      <div
                        key={agency?.id}
                        className="border rounded-lg overflow-hidden bg-white w-[300px] cursor-pointer"
                        onClick={() => router.push(`/company/${agency?.id}`)}
                      >
                        <div className="h-32 flex items-center justify-center border-b bg-white">
                          <Image
                            src={agency?.logo}
                            alt={agency?.name}
                            width={80}
                            height={80}
                            className="object-contain max-h-28"
                          />
                        </div>

                        <div className="px-5 py-3 border-b text-center">
                          <h3 className="text-[18px] font-medium text-gray-900">
                            {agency?.name}
                          </h3>
                        </div>

                        <div className="py-3 border-b flex justify-center items-center gap-2 text-sm">
                          <i className="bi bi-house-door-fill text-xs"></i>
                          <span>{agency?.propertyCount} Properties</span>
                        </div>

                        <div className="px-5 py-5 min-h-[90px]">
                          <p className="text-sm leading-7 text-gray-800">
                            <span className="font-semibold">
                              Service Areas:
                            </span>{" "}
                            {agency?.serviceAreas?.join(", ")}
                          </p>
                        </div>

                        <div className="px-5 pb-5">
                          <Button
                            className="h-10 w-full rounded-xl bg-purple-50 text-purple-700 border border-purple-500 transition flex items-center justify-center gap-2 font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${agency?.email}`;
                            }}
                          >
                            <i className="bi bi-envelope-fill"></i>
                            Email
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white sticky top-[0.1px] z-[20]">
                  <section className="border-b shadow-[0_3px_5px_-3px_rgba(0,0,0,0.1)] py-4 flex flex-wrap gap-4 justify-start items-center">
                    <DataTableFilter
                      filterKey="entity"
                      title="Find"
                      options={agentsTypeOptions || []}
                      setFilterValue={setFilterType}
                      filterValue={filterType}
                    />

                    <div className="flex gap-4">
                      <FindAgentsSearch
                        type="agents"
                        agentsData={findAgentsDetails?.data}
                        setSearchQuery={setSearchQuery}
                      />
                      <LocationProjectSearchDropdown
                        onLocationSelect={(selectedItem) => {
                          if (selectedItem.type === "project") {
                            setProject(String(selectedItem.id));
                            setLocation(null);
                          } else {
                            setLocation(String(selectedItem.id));
                            setProject(null);
                          }
                        }}
                      />
                    </div>

                    <PropertyCategoryDropdown
                      options={allcategories || []}
                      setFilterValue={setlistingCategoryId}
                      filterValue={listingCategoryId}
                      isLoading={isLoadingCategory}
                    />

                    {/* <DataTableFilter
                      filterKey="listType"
                      title="Purpose"
                      options={dealTypeOptions || []}
                      setFilterValue={setListType}
                      filterValue={listType}
                    /> */}

                    <div>
                      <Sheet>
                        <SheetTrigger>
                          <Button className="ml-auto" variant={"outline"}>
                            <i className="bi-filter"></i> All filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="z-[99999]">
                          <div className="relative w-full flex flex-col justify-between h-full space-y-5">
                            <div className="flex flex-col items-start justify-between py-6 border-b shrink-0">
                              <h2 className="text-lg lg:text-lg font-bold text-gray-900">
                                More Filters
                              </h2>

                              <p className="text-sm text-gray-500 mt-2">
                                Refine your property search with advanced
                                filters
                              </p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-full h-full">
                              <div className="grid grid-cols-1 w-[100%] gap-6 z-[999999]">
                                <DataTableFilterBox
                                  title="Language"
                                  options={availableLanguages || []}
                                  filterValue={tempLanguage}
                                  setFilterValue={setTempLanguage}
                                  className="w-full p-2 flex justify-between items-center"
                                />
                              </div>

                              <div className="flex flex-col sm:flex-row items-center gap-4 pt-5">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="w-full sm:w-auto h-12 px-8 rounded-2xl text-base"
                                >
                                  <DataTableResetFilter
                                    isFilterActive={isAnyFilterActive}
                                    onReset={resetFilters}
                                  />
                                </Button>

                                <Button
                                  type="button"
                                  className="w-full flex-1 h-12 rounded-2xl text-base font-semibold bg-brand hover:bg-brand text-white"
                                  onClick={async () => {
                                    const updates: Promise<any>[] = [];

                                    if (tempMinPrice)
                                      updates.push(setMinPrice(tempMinPrice));
                                    if (tempMaxPrice)
                                      updates.push(setMaxPrice(tempMaxPrice));
                                    if (tempBedroom)
                                      updates.push(setBedroom(tempBedroom));
                                    if (tempBathroom)
                                      updates.push(setBathroom(tempBathroom));
                                    if (tempLanguage)
                                      updates.push(setLanguage(tempLanguage));

                                    await Promise.all(updates);

                                    setFilters(false);
                                  }}
                                >
                                  See Properties
                                </Button>
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                    <DataTableResetFilter
                      isFilterActive={isAnyFilterActive}
                      onReset={resetFilters}
                    />
                  </section>
                </div>

                <div className="border rounded-xl overflow-hidden bg-white">
                  <div className="flex items-center flex-wrap">
                    {initialLocations.map((location: any) => (
                      <button
                        key={location.locationId}
                        className="flex-1 min-w-[220px] px-5 py-4 text-left hover:bg-gray-50 transition"
                        onClick={() => setLocation(String(location.locationId))}
                      >
                        <span className="text-black/70 font-medium text-sm">
                          {location.name}
                        </span>

                        <span className="text-gray-500 ml-1">
                          ({location.count})
                        </span>
                      </button>
                    ))}

                    <button
                      onClick={() => setShowAllLocations(!showAllLocations)}
                      className="ml-auto px-5 py-4 text-black/70 font-semibold"
                    >
                      {showAllLocations ? "SHOW LESS" : "VIEW ALL LOCATIONS"}
                    </button>
                  </div>

                  {showAllLocations && (
                    <div className="border-t grid md:grid-cols-3 lg:grid-cols-4">
                      {hiddenLocations.map((location: any) => (
                        <button
                          key={location.locationId}
                          className="px-5 py-4 text-left hover:bg-gray-50 border-b"
                        >
                          <span className="text-black/70 font-medium text-sm">
                            {location.name}
                          </span>

                          <span className="text-gray-500 ml-1">
                            ({location.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5">
                  {findAgentsDetails &&
                    findAgentsDetails?.data.map((agent: any) => {
                      return (
                        <div
                          key={`propp__${agent.id}`}
                          className="rounded-xl overflow-hidden border bg-white shadow-sm relative cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() =>
                            router.push(
                              `/company/${agent?.company?.id}/${agent.id}`,
                            )
                          }
                        >
                          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0">
                            <div className="relative min-h-[200px] md:h-full">
                              <Image
                                src={agent?.image || ""}
                                alt="Agent"
                                fill
                                className="object-fill"
                              />
                            </div>

                            <div className="p-4 flex flex-col justify-between h-full">
                              <div className="flex flex-col gap-8">
                                <div className="flex w-full items-center justify-between gap-2">
                                  <div>
                                    <div className="text-lg font-semibold capitalize">
                                      {agent?.first_name} {agent?.last_name}
                                    </div>
                                    <div className="text-xs">Super Agent</div>
                                  </div>

                                  <Image
                                    src={agent?.companyLogo || ""}
                                    width={50}
                                    height={50}
                                    alt=""
                                    className="object-cover"
                                  />
                                </div>

                                <div className="bg-gray-50 rounded-lg px-3 py-3 border flex flex-col gap-2">
                                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                    <i className="bi bi-buildings text-gray-500"></i>
                                    <span>
                                      {agent?.listingStats?.total} Listings
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                                      <i className="bi bi-key"></i>
                                      For Rent ({agent?.listingStats?.rent})
                                    </span>

                                    <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">
                                      <i className="bi bi-house-check"></i>
                                      For Sale ({agent?.listingStats?.sale})
                                    </span>

                                    <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-md font-medium">
                                      <i className="bi bi-building-add"></i>
                                      Off-Plan ({agent?.listingStats?.offPlan})
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 shadow-none border-none"
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    setOpenAgent(true);
                                    setpopupAgent(agent.id);
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
                                      `${agent?.first_name || ""} ${agent?.last_name || ""}`.trim();

                                    const phone = String(
                                      agent?.whatsapp || "",
                                    ).replace(/\D/g, "");

                                    const message = encodeURIComponent(
                                      `Hi ${fullName},

I came across your profile on PropertyXG and I'm interested in discussing my property requirements with you.

I would appreciate any guidance you can provide regarding suitable properties, pricing, availability, and the next steps.

Looking forward to hearing from you.

Thank you.`,
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
                      );
                    })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 py-3 flex-wrap mt-10">
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
                  className={`h-11 w-11 rounded-md border transition font-medium ${
                    currentPage === page
                      ? "bg-purple-50 text-purple-700 border-purple-500"
                      : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

              {endPage < findAgentsDetails?.meta.totalPages && (
                <button
                  onClick={() => setPageGroup((prev) => prev + 1)}
                  className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Dialog onOpenChange={setOpenAgent} open={openAgent}>
        <DialogContent
          className="sm:max-w-[220px] bg-white rounded-xl p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="pt-0 pb-2">
            <DialogTitle className="flex items-center justify-between text-lg font-semibold tracking-tight"></DialogTitle>
          </DialogHeader>

          <div>
            {findAgentsDetails &&
              contactAgentInfo?.map((listing: any) => {
                return (
                  <div className="bg-white rounded-lg max-w-md mx-auto flex flex-col justify-center items-center space-y-3">
                    <h2 className="text-center text-2xl font-semibold">
                      Contact Us
                    </h2>

                    <Image
                      src={listing?.companyLogo || ""}
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
                        href={`tel:${listing?.phone}`}
                        className="text-xl font-semibold text-brand hover:underline"
                      >
                        {listing?.phone}
                      </a>
                    </div>

                    <div className="text-center">
                      <span className="text-gray-500">Agent: </span>
                      <span className="font-medium">
                        {listing.first_name} {listing.last_name}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageWrap;
