"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { useState } from "react";
import { cn, formatMoney, getTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Maximize, Heart, Phone } from "lucide-react";
import useListing from "@/hooks/useListing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter } from "@/constant/data";
import ExtraFilter from "@/components/search/ExtraFilter";
import PriceFilter from "@/components/search/PriceFilter";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import useCompany from "@/hooks/useCompany";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import PropertyCategoryDropdown from "@/components/PropertyCategoryFilter";
import { DataTableFilter } from "@/components/ui/table/data-table-filter";
import LocationProjectSearchDropdown from "@/components/LocationProjectSearchDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

const PageWrap = ({ id }: { id: string }) => {
  const {
    companyDetails,
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
    agentDetails,
    gettingagentDetails,
    availableLanguages,
    projectId,
    setProject,
    language,
    setLanguage,
  } = useCompany(id);

  const router = useRouter();

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    {},
  );
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState(false);

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

  const [openContact, setOpenContact] = useState(false);
  const [openAgent, setOpenAgent] = useState(false);
  const [popupInfo, setpopupInfo] = useState("");

  const contactInfo = agentDetails?.listings?.data?.filter(
    (info: any) => info.id === popupInfo,
  );

  return (
    <div className="bg-gray-50">
      <Container className="py-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative w-40 h-40 rounded-xl overflow-hidden">
            <Image
              src={agentDetails?.agent?.image || ""}
              alt="agent"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {agentDetails?.agent?.first_name}{" "}
                  {agentDetails?.agent?.last_name}
                </h2>
                <div className="flex gap-2">
                  <p className="text-sm text-gray-500">Super Agent</p>
                  <div className="text-gray-500">•</div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    Speaks{" "}
                    <span className="font-semibold text-xs text-gray-500 gap-1 flex">
                      {agentDetails?.agent?.profile?.language?.map(
                        (lang: string) => (
                          <p className="text-gray-800 font-medium" key={lang}>
                            {lang}
                          </p>
                        ),
                      )}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-center md:justify-start">
                <Button
                  variant="outline"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 shadow-none border-none relative z-10"
                  size={"sm"}
                  onClick={() => setOpenAgent(true)}
                >
                  <i className="bi-telephone"></i>
                  Call
                </Button>
                <Button
                  size="sm"
                  className="bg-green-100 text-green-800 hover:bg-green-200 border-none"
                  onClick={() => {
                    const fullName =
                      `${agentDetails?.agent?.first_name || ""} ${
                        agentDetails?.agent?.last_name || ""
                      }`.trim();

                    const phone = String(
                      agentDetails?.agent?.whatsapp || "",
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

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Image
                src={agentDetails?.company?.logo || ""}
                width={40}
                height={40}
                alt=""
              />
              <span className="text-sm text-gray-700 font-medium">
                {agentDetails?.company?.name}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg px-3 py-3 border flex gap-2 w-fit mx-auto md:mx-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <i className="bi bi-buildings text-gray-500"></i>
                <span>{agentDetails?.listingStats?.total} Listings</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                  <i className="bi bi-key"></i> Rent (
                  {agentDetails?.listingStats?.rent})
                </span>
                <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md">
                  <i className="bi bi-house-check"></i> Sale (
                  {agentDetails?.listingStats?.sale})
                </span>
                <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-md">
                  <i className="bi bi-building-add"></i> Off-plan (
                  {agentDetails?.listingStats?.offPlan})
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="bg-white py-6">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6">
            <div className="space-y-4">
              <div className="border-b sticky top-[0.1px] bg-white z-20 py-4">
                <div className="flex flex-wrap gap-2">
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
                        {/* <Menu size={24} /> */}
                        <Button className="ml-auto" variant={"outline"}>
                          <i className="bi-filter"></i> All filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="z-[99999]">
                        <div className="relative w-full flex flex-col space-y-5">
                          <div className="flex flex-col items-start justify-between py-6 border-b shrink-0">
                            <h2 className="text-lg lg:text-lg font-bold text-gray-900">
                              More Filters
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                              Refine your property search with advanced filters
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-6">
                            <div className="rounded-3xl border bg-white shadow-sm overflow-visible relative z-10 flex flex-col sm:flex-row sm:p-6 space-y-3 justify-between items-center">
                              <h3 className="text-sm font-semibold text-gray-900">
                                Price (AED)
                              </h3>

                              <PriceFilter
                                setMaxPrice={setMaxPrice}
                                setMinPrice={setMinPrice}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                              />
                            </div>

                            <div className="rounded-3xl border bg-white p-6 shadow-sm overflow-visible relative z-10 flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-gray-900">
                                Property Details
                              </h3>

                              <ExtraFilter
                                setBeds={setBedroom}
                                setBaths={setBathroom}
                                beds={bedroom}
                                baths={bathroom}
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
                              onClick={() => setFilters(false)}
                              type="button"
                              className="w-full flex-1 h-12 rounded-2xl text-base font-semibold bg-brand hover:bg-brand text-white"
                            >
                              See Properties
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                  <DataTableResetFilter
                    isFilterActive={isAnyFilterActive}
                    onReset={resetFilters}
                  />
                </div>
              </div>
              {filters && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6">
                  {/* MODAL */}
                  <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl border flex flex-col">
                    {/* HEADER */}
                    <div className="flex items-start justify-between px-8 py-6 border-b shrink-0">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                          More Filters
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                          Refine your property search with advanced filters
                        </p>
                      </div>

                      {/* CLOSE BUTTON */}
                      <button
                        onClick={() => setFilters(false)}
                        type="button"
                        className="h-10 w-10 rounded border flex items-center justify-center hover:bg-gray-100 transition-all"
                      >
                        <i className="bi bi-x-lg text-sm"></i>
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="rounded-3xl border bg-white p-6 shadow-sm overflow-visible relative z-10">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Price (AED)
                            </h3>

                            <PriceFilter
                              setMaxPrice={setMaxPrice}
                              setMinPrice={setMinPrice}
                              minPrice={minPrice}
                              maxPrice={maxPrice}
                            />
                          </div>
                        </div>

                        <div className="rounded-3xl border bg-white p-6 shadow-sm overflow-visible relative z-10 flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Property Details
                          </h3>

                          <ExtraFilter
                            setBeds={setBedroom}
                            setBaths={setBathroom}
                            beds={bedroom}
                            baths={bathroom}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t bg-white px-6 py-5 shrink-0">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
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
                          onClick={() => setFilters(false)}
                          type="button"
                          className="w-full flex-1 h-12 rounded-2xl text-base font-semibold bg-brand hover:bg-brand text-white"
                        >
                          See Properties
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {agentDetails?.listings?.data.map((listing: any) => {
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="bg-white/80 p-2 rounded-full"
                          >
                            <Heart size={16} />
                          </button>
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
                                i === activeIndex ? "bg-white" : "bg-white/50",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col justify-between gap-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {listing.created_on
                              ? `Listed ${getTimeAgo(listing.created_on)}`
                              : ""}
                          </span>
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
                        <hr />
                        <div className="flex gap-2">
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
                            size={"sm"}
                            onClick={(e) => {
                              e.stopPropagation();
                              contactAgent(listing.id);
                            }}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-6 shadow-none border-none relative z-10"
                          >
                            <i className="bi-whatsapp"></i>WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="sticky top-[20px] bg-white border rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  About {agentDetails?.agent?.first_name}{" "}
                  {agentDetails?.agent?.last_name}
                </h2>

                <div className="divide-y">
                  {/* Expertise */}
                  <div className="py-3 grid grid-cols-2 gap-4 text-xs">
                    <p className="text-gray-500">Expertise</p>
                    <p className="text-gray-800 font-medium">
                      {agentDetails?.agent?.profile?.expertise}
                    </p>
                  </div>

                  {/* Service Areas */}
                  <div className="py-3 grid grid-cols-2 gap-4 text-xs">
                    <p className="text-gray-500">Service Areas</p>
                    <p className="text-gray-800 font-medium">
                      {agentDetails?.agent?.profile?.service_areas}
                    </p>
                  </div>

                  {/* Properties */}
                  <div className="py-3 grid grid-cols-2 gap-4 text-xs">
                    <p className="text-gray-500">Properties</p>
                    <div className="text-gray-800 font-medium space-y-1">
                      <p>{agentDetails?.listingStats?.sale} For Sale</p>
                      <p>{agentDetails?.listingStats?.rent} For Rent</p>
                    </div>
                  </div>

                  {/* BRN */}
                  <div className="py-3 grid grid-cols-2 gap-4 items-center text-xs">
                    <p className="text-gray-500 flex items-center gap-1">
                      BRN
                      <i className="bi bi-info-circle text-xs text-gray-400"></i>
                    </p>
                    <p className="text-gray-800 font-medium">
                      {agentDetails?.agent?.profile?.brn}
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="py-3 grid grid-cols-2 gap-4 text-xs">
                    <p className="text-gray-500">Experience</p>
                    <p className="text-gray-800 font-medium">
                      {agentDetails?.agent?.profile?.experience} years
                    </p>
                  </div>

                  {/* Languages */}
                  <div className="py-3 grid grid-cols-2 gap-4 text-xs">
                    <p className="text-gray-500">Languages</p>
                    <div className="flex items-center gap-1">
                      {agentDetails?.agent?.profile?.language?.map(
                        (lang: string) => (
                          <p className="text-gray-800 font-medium" key={lang}>
                            {lang}
                          </p>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="py-3 grid grid-cols-2 gap-4 text-xs">
                    <p className="text-gray-500">Specialties</p>
                    <p className="text-gray-800 font-medium">
                      {agentDetails?.agent?.profile?.specialties}
                    </p>
                  </div>
                </div>

                {/* Tags / Badges */}
                <div className="pt-4 flex flex-wrap gap-2 border-t">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    ✔ RERA Certified
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
            {agentDetails &&
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
            {agentDetails && (
              <div className="bg-white rounded-lg max-w-md mx-auto flex flex-col justify-center items-center space-y-3">
                <h2 className="text-center text-2xl font-semibold">
                  Contact Us
                </h2>

                <Image
                  src={agentDetails?.agent?.company?.logo || ""}
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
                    href={`tel:${agentDetails?.agent?.phone}`}
                    className="text-xl font-semibold text-brand hover:underline"
                  >
                    {agentDetails?.agent?.phone}
                  </a>
                </div>

                <div className="text-center">
                  <span className="text-gray-500">Agent: </span>
                  <span className="font-medium">
                    {agentDetails?.agent.first_name}{" "}
                    {agentDetails?.agent.last_name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageWrap;
