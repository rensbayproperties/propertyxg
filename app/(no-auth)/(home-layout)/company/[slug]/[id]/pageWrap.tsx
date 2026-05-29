"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { useState } from "react";
import { cn, formatMoney, getTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Maximize, Heart } from "lucide-react";
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
import LocationSearchDropdown from "@/components/LocationSearchDropdown";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import useCompany from "@/hooks/useCompany";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import PropertyCategoryDropdown from "@/components/PropertyCategoryFilter";
import PriceFilter from "@/components/search/PriceFilter";
import ExtraFilter from "@/components/search/ExtraFilter";

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
  } = useCompany(id);

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    {},
  );
  const [showAll, setShowAll] = useState(false);

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

  const areas = [
    "Al Barsha",
    "Jumeirah Village Triangle (JVT)",
    "DAMAC Lagoons",
    "Downtown Dubai",
    "Dubai South",
    "Nad Al Sheba",
    "Business Bay",
    "Dubai Marina",
    "Palm Jumeirah",
    "Arabian Ranches",
  ];

  const visibleAreas = showAll ? areas : areas.slice(0, 6);

  const agentName = "Dami Semhar";

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
                <Button className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                  <i className="bi-telephone"></i> Call
                </Button>
                <Button
                  onClick={() => contactAgent("agent")}
                  className="bg-green-100 text-green-800 hover:bg-green-200 border-none"
                >
                  <i className="bi-whatsapp"></i> WhatsApp
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
              <div className="border-b sticky top-0 bg-white z-20 py-4">
                <div className="flex flex-wrap gap-2">
                  <LocationSearchDropdown
                    onLocationSelect={(loc) => setLocation(String(loc.id))}
                  />
                  <DataTableFilterBox
                    filterKey="listType"
                    title="Deal Type"
                    options={dealTypeOptions || []}
                    // isLoading={isLoadingAdTypes}
                    setFilterValue={setListType}
                    filterValue={listType}
                    className="rounded-full"
                  />
                  <PropertyCategoryDropdown
                    options={allcategories || []}
                    setFilterValue={setlistingCategoryId}
                    filterValue={listingCategoryId}
                    isLoading={isLoadingCategory}
                  />
                  <PriceFilter
                    setMaxPrice={setMaxPrice}
                    setMinPrice={setMinPrice}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                  />
                  <ExtraFilter
                    setBeds={setBedroom}
                    setBaths={setBathroom}
                    beds={bedroom}
                    baths={bathroom}
                  />
                  <DataTableResetFilter
                    isFilterActive={isAnyFilterActive}
                    onReset={resetFilters}
                  />
                </div>
              </div>

              {agentDetails?.listings?.data.map((listing: any) => {
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
                          <button className="bg-white/80 p-2 rounded-full">
                            <Heart size={16} />
                          </button>
                        </div>

                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() => prev(listing.id, images.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                            >
                              ‹
                            </button>
                            <button
                              onClick={() => next(listing.id, images.length)}
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
                        <div className="space-y-2">
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
                        </div>

                        <div className="mt-auto space-y-2">
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
                            <div>{listing?.location?.name}</div>
                          </div>
                        </div>

                        <hr />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 shadow-none border-none relative z-10"
                            size={"sm"}
                          >
                            <i className="bi-telephone"></i>
                            Call
                          </Button>
                          <Button
                            size={"sm"}
                            onClick={() => contactAgent(listing.id)}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-6 shadow-none border-none relative z-10"
                          >
                            <i className="bi-whatsapp"></i>WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/search/${listing.id}`}
                      className="absolute top-0 left-0 w-full h-full bgr/10 inset-0"
                    ></Link>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="sticky top-4 bg-white border rounded-2xl p-6 shadow-sm space-y-4">
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
    </div>
  );
};

export default PageWrap;
