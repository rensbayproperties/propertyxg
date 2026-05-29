"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { useState } from "react";
import { cn, formatMoney, formatToReadableDate, getTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Maximize, Heart } from "lucide-react";
import useListing from "@/hooks/useListing";
import usePropertyContactReview from "@/hooks/usePropertyContactReview";
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
import LocationSearchDropdown from "@/components/LocationSearchDropdown";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCompany from "@/hooks/useCompany";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import PropertyCategoryDropdown from "@/components/PropertyCategoryFilter";
import ExtraFilter from "@/components/search/ExtraFilter";
import PriceFilter from "@/components/search/PriceFilter";

const PageWrap = ({ slug }: { slug: string }) => {
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
  } = useCompany(slug);

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    {},
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

  const [filterStatus, setFilterStatus] = useState("companylisting");

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

  const visibleAreas = showAll ? serviceAreas : serviceAreas?.slice(0, 6);

  return (
    <div>
      <section className="border-b top-0 shadow-[0_3px_5px_-3px_rgba(0,0,0,0.1)] bg-gray-50 z-[20] py-4 space-y-2">
        <Container className="pt-4 ">
          {/* <div className="page-heading-secondary">Properties for sale in Dubai</div> */}
          <div className="flex p-4 gap-4 ">
            <Image
              src={
                companyDetails?.company?.logo ||
                ""
              }
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
              className="w-full border-b justify-center items-center"
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
                <section className="border-b sticky top-0 shadow-[0_3px_5px_-3px_rgba(0,0,0,0.1)] bg-white z-[20] py-4 space-y-2">
                  <Container className="flex flex-wrap items-center gap-2 w-full">
                    <div className="max-w-md">
                      <LocationSearchDropdown
                        onLocationSelect={(selectedLocation) => {
                          setLocation(String(selectedLocation.id));
                        }}
                      />
                    </div>
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
                      className="rounded-full"
                    />
                    <ExtraFilter
                      setBeds={setBedroom}
                      setBaths={setBathroom}
                      beds={bedroom}
                      baths={bathroom}
                      className="rounded-full"
                    />
                    <DataTableResetFilter
                      isFilterActive={isAnyFilterActive}
                      onReset={resetFilters}
                    />
                  </Container>
                </section>
                {companyDetails &&
                  companyDetails?.listings?.data?.map((listing: any) => {
                    const agentName = "Abdul Alli";
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

                          <Link href={`/search/${listing.id}`}>
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
                                  <div>{listing?.location?.name}</div>
                                </div>
                              </div>

                              <hr />

                              <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="flex w-full items-center gap-2">
                                  <Avatar className="h-8 w-8 rounded-full shadow border">
                                    <AvatarImage
                                      src={listing?.uploader?.image}
                                    />
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
                                <div className="flex gap-2 justify-end">
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
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="space-y-4">
                {companyDetails &&
                  companyDetails?.agents.map((agent: any) => {
                    // const agentName = "Dami Semhar";
                    // const images =
                    //   " https://renspro-uploads.s3.eu-north-1.amazonaws.com/0f2dfe87-9678-47a2-9599-de37f28d29b6";

                    return (
                      <div
                        className="rounded-xl overflow-hidden border bg-white shadow-sm relative"
                        key={`propp__${agent.id}`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-0 h-[250px]">
                          <div className="relative min-h-[200px] md:h-full">
                            <Image
                              src={agent?.image || ""}
                              alt="Property"
                              fill
                              className="object-fit"
                            />
                          </div>
                          <div className="p-4 flex flex-col justify-between space-y-3">
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
                              {/* TOTAL */}
                              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                <i className="bi bi-buildings text-gray-500"></i>
                                <span>
                                  {agent?.listingStats?.total} Listings
                                </span>
                              </div>

                              {/* BREAKDOWN */}
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

                            {/* <hr /> */}

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
                                onClick={() => contactAgent(agent.id)}
                                className="bg-green-100 hover:bg-green-200 text-green-800 px-6 shadow-none border-none relative z-10"
                              >
                                <i className="bi-whatsapp"></i>WhatsApp
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Link
                          href={`/company/${slug}/${agent.id}`}
                          className="absolute top-0 left-0 w-full h-full bgr/10 inset-0"
                        ></Link>
                      </div>
                    );
                  })}
              </div>
            )}
            <div>
              <div className="sticky top-2 space-y-4">
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
    </div>
  );
};

export default PageWrap;
