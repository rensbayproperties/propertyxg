"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { useState } from "react";
import { cn, formatMoney, formatToReadableDate, getTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Maximize, Heart, Phone } from "lucide-react";
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

const PageWrap = ({ slug }: { slug: string }) => {
  const {
    companyDetails,
    gettingcompanyDetails,
    isDialogOpen,
    setIsDialogOpen,
    setSelectedListingId,
    selectedListingId,
    contactAgent,
    form,
    isPendingPropertyContact,
    onSubmit,
    selectedListing,
    isLoadingSelectedListing,
    setLocation,
    setlistingCategoryId,
    listingCategoryId,
    allcategories,
    isLoadingCategory,
    setMaxPrice,
    setMinPrice,
    maxPrice,
    minPrice,
    setBedroom,
    setBathroom,
    bedroom,
    bathroom,
    setCurrentPage,
    currentPage,
    listType,
    setListType,
    dealTypeOptions,
    resetFilters,
    isAnyFilterActive,
    availableLanguages,
    projectId,
    setProject,
    language,
    setLanguage,
  } = useCompany(slug);

  const router = useRouter();

  const [pageGroup, setPageGroup] = useState(0);

  const pagesPerGroup = 10;

  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(
    startPage + pagesPerGroup - 1,
    companyDetails?.listings?.meta.totalPages,
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

  const [filterStatus, setFilterStatus] = useState("companylisting");

  const [filters, setFilters] = useState(false);

  // const handleTabChange = (value: string) => {
  //   setFilterStatus(value as "companylisting" | "companyagents");
  //   setCurrentPage(1);
  // };

  const handleTabChange = (value: string) => {
    setFilterStatus(value);
    // setCurrentPage(1);
  };

  const [showAll, setShowAll] = useState(false);

  const serviceAreas = companyDetails?.company?.profile?.service_areas;

  const [openContact, setOpenContact] = useState(false);

  const [popupInfo, setpopupInfo] = useState("");

  const [openAgent, setOpenAgent] = useState(false);

  const [popupAgent, setpopupAgent] = useState("");

  const contactInfo = companyDetails?.listings?.data?.filter(
    (info: any) => info.id === popupInfo,
  );

  const contactAgentInfo = companyDetails?.agents?.filter(
    (info: any) => info.id === popupAgent,
  );

  if (gettingcompanyDetails)
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
              Loading company listings...
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <section className="top-0 z-[20] py-4 space-y-2">
        <Container className="pt-4 ">
          {/* <div className="page-heading-secondary">Properties for sale in Dubai</div> */}
          <div className="flex p-4 gap-4 ">
            <Image
              src={companyDetails?.company?.logo || ""}
              width={150}
              height={150}
              alt=""
              className="object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm">{companyDetails?.company?.name}</span>
              <span className="text-sm">
                Properties - {companyDetails?.totalPublicListings}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="min-h-[50vh] bg-white py-4">
        <Container>
          {/* <div className="text-muted-foreground">22,000 listed</div> */}
          <div>
            <Tabs
              value={filterStatus}
              onValueChange={handleTabChange}
              className="w-full border-b justify-center items-center pb-5"
            >
              <TabsList className="gap-4">
                <TabsTrigger value="companylisting" className="gap-2">
                  <div className="text-lg flex items-center justify-center rounded text-brand w-6 h-6">
                    <i className="bi-buildings"></i>
                  </div>
                  Listings
                </TabsTrigger>
                <TabsTrigger value="companyagents" className="gap-2">
                  <div className="text-lg flex items-center justify-center rounded text-brand w-6 h-6">
                    <i className="bi-people"></i>
                  </div>
                  Agents
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 p-4">
            {filterStatus === "companylisting" ? (
              <div className="space-y-4">
                <div className="bg-white sticky top-[0.1px] z-[20]">
                  <section className="border-b shadow-[0_3px_5px_-3px_rgba(0,0,0,0.1)] py-4 flex flex-wrap gap-2 justify-start items-center">
                    <DataTableFilter
                      filterKey="listType"
                      title="Purpose"
                      options={dealTypeOptions || []}
                      setFilterValue={setListType}
                      filterValue={listType}
                    />

                    <div>
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
                              <div className="grid grid-cols-1 w-[100%] gap-6">
                                <div className="rounded-3xl border bg-white shadow-sm overflow-visible relative z-10 flex p-4 justify-between items-center">
                                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                                    Price (AED)
                                  </h3>

                                  <PriceFilter
                                    minPrice={tempMinPrice}
                                    maxPrice={tempMaxPrice}
                                    setMinPrice={setTempMinPrice}
                                    setMaxPrice={setTempMaxPrice}
                                    className="w-[50%] p-2 flex justify-between items-center"
                                  />
                                </div>

                                <div className="rounded-3xl border bg-white p-4 shadow-sm overflow-visible relative z-10 flex justify-between items-center">
                                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                                    Bed & Bath
                                  </h3>

                                  <ExtraFilter
                                    beds={tempBedroom}
                                    baths={tempBathroom}
                                    setBeds={setTempBedroom}
                                    setBaths={setTempBathroom}
                                    className="w-[60%] p-2 flex justify-between items-center"
                                  />
                                </div>

                                <div className="rounded-3xl border bg-white p-4 shadow-sm overflow-visible relative z-30 flex justify-between items-center">
                                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                                    Language
                                  </h3>

                                  <DataTableFilterBox
                                    title="Language"
                                    options={availableLanguages || []}
                                    filterValue={tempLanguage}
                                    setFilterValue={setTempLanguage}
                                    className="w-[70%] p-2 flex justify-between items-center"
                                  />
                                </div>
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

                {companyDetails &&
                companyDetails?.listings?.data?.length < 1 ? (
                  <div className="text-brand bg-purple-50 border border-brand rounded flex justify-center items-center p-5">
                    Sorry, no listing match your search
                  </div>
                ) : (
                  companyDetails?.listings?.data?.map((listing: any) => {
                    const images =
                      (listing?.images || [])
                        .map((img: any) => img?.url)
                        .filter(Boolean) || [];

                    const activeIndex = activeIndexes[listing.id] || 0;

                    return (
                      <div
                        key={`propp__${listing.id}`}
                        className="rounded-xl overflow-hidden border bg-white shadow-sm relative cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => router.push(`/search/${listing.id}`)}
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    prev(listing.id, images.length);
                                  }}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                                >
                                  ‹
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    next(listing.id, images.length);
                                  }}
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
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                  {listing.created_on
                                    ? `Listed ${getTimeAgo(listing.created_on)}`
                                    : ""}
                                </span>
                                {/* <div className="capitalize text-xs">
                                  <span
                                    className={cn(
                                      `px-2 py-0.5 rounded-full`,
                                      listing.dealType.toLowerCase() ===
                                        "sale" &&
                                        "bg-purple-200 text-purple-800",
                                      listing.dealType.toLowerCase() ===
                                        "rent" && "bg-pink-200 text-pink-800",
                                    )}
                                  >{`for ${listing.dealType.toLowerCase()}`}</span>
                                </div> */}
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
                                    <div className="capitalize">Furnished</div>
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenContact(true);
                                    setpopupInfo(listing.id);
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
                                      `${listing.uploader.first_name || ""} ${
                                        listing.uploader.last_name || ""
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

                <div className="flex items-center justify-center gap-2 py-3 flex-wrap">
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

                  {endPage < companyDetails?.listings?.meta.totalPages && (
                    <button
                      onClick={() => setPageGroup((prev) => prev + 1)}
                      className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {companyDetails &&
                  companyDetails?.agents.map((agent: any) => {
                    return (
                      <div
                        key={`propp__${agent.id}`}
                        className="rounded-xl overflow-hidden border bg-white shadow-sm relative cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() =>
                          router.push(`/company/${slug}/${agent.id}`)
                        }
                      >
                        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0">
                          {/* IMAGE */}
                          <div className="relative min-h-[200px] md:h-full">
                            <Image
                              src={agent?.image || ""}
                              alt="Agent"
                              fill
                              className="object-fill"
                            />
                          </div>

                          {/* CONTENT */}
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

                            {/* ACTIONS */}
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
            )}
            <div>
              <div className="sticky top-[20px] space-y-4">
                <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
                  <h2 className="text-lg font-semibold text-gray-900">About</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {companyDetails?.company?.profile?.about}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Property Types</p>
                      <p className="text-sm text-gray-800">
                        {companyDetails?.company?.profile?.propertyTypes}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Service Areas</p>
                      <p className="text-sm text-gray-800">
                        {companyDetails?.company?.profile?.serviceAreas}
                      </p>
                      {/* <button
                        onClick={() => setShowAll((prev) => !prev)}
                        className="text-blue-600 text-xs mt-1 hover:underline"
                      >
                        {showAll ? "Show less" : "See all areas"}
                      </button> */}
                    </div>
                    <div>
                      <p className="text-gray-500">Properties</p>
                      <p className="text-sm text-gray-800">
                        For Rent{" "}
                        <span className="text-gray-600">
                          {companyDetails?.listingStats?.rent}
                        </span>{" "}
                        • For Sale{" "}
                        <span className="text-gray-600">
                          {companyDetails?.listingStats?.sale}
                        </span>{" "}
                        • Off-Plan{" "}
                        <span className="text-gray-600">
                          {companyDetails?.listingStats?.offPlan}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">RERA Registration</p>
                      <p className="texm-sm text-gray-800">
                        {" "}
                        {companyDetails?.company?.profile?.reraRegistration}
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4 flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      ✔ Trusted Agency
                    </span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      🏆 Top Performer
                    </span>
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                      💼 Verified Listings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
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
          className="sm:max-w-[220px] bg-white rounded-xl p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="pt-0 pb-2">
            <DialogTitle className="flex items-center justify-between text-lg font-semibold tracking-tight"></DialogTitle>
          </DialogHeader>

          <div>
            {companyDetails &&
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
            {companyDetails &&
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
