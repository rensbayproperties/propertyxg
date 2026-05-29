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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter } from "@/constant/data";
import LocationProjectSearchDropdown from "@/components/LocationProjectSearchDropdown";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { Bell } from "lucide-react";
import usePublicAlert from "@/hooks/usePublicAlert";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import PropertyCategoryDropdown from "@/components/PropertyCategoryFilter";
import ListingProjectShowcase from "@/components/ListingProjectShowcase";
import { DataTableFilter } from "@/components/ui/table/data-table-filter";
import ExtraFilter from "@/components/search/ExtraFilter";
import PriceFilter from "@/components/search/PriceFilter";

const PageWrap = () => {
  const {
    availableLanguages,
    language,
    setLanguage,
    listings,
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
    location,
    setLocation,
    projectId,
    setProject,
    pType,
    setlistingCategoryId,
    listingCategoryId,
    gettingCategory,
    setMaxPrice,
    setMinPrice,
    maxPrice,
    minPrice,
    setBedroom,
    setBathroom,
    bedroom,
    bathroom,
    setListType,
    listType,
    dealTypeOptions,
    listingsRecommendations,
    gettingRecommendations,
    resetFilters,
    isAnyFilterActive,
    allcategories,
    isLoadingCategory,
  } = useListing();

  const { formAlert, onSubmitAlert, isPending } = usePublicAlert();

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    {},
  );

  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(false);
  const [LinkLocation, setLinkLocation] = useState("");

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
            } in ${LinkLocation || "Dubai"}`,
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
            label: `${bathroom} Bathroom Properties in ${LinkLocation || "Dubai"
              }`,
            href: location
              ? `/search?bathroom=${bathroom}?locationId=${location}`
              : `/search?bathroom=${bathroom}`,
          }),
        ) || [],
    },
  ];

  return (
    <div className="bg-gradient-to-ts from-gray-50 to-white bg-background">
      {/* <Container className="pt-8 space-y-2">
        <div>
          <span className="border rounded px-2 py-0.5 border-gray-300 inline-flex items-center gap-2 bg-white text-xs"><i className="bi-stars text-brand"></i> <span className="font-medium">Marketplace</span></span>
        </div>
        <div className="text-2xl font-semibold">
          Properties for sale in Dubai
        </div>
        <div className="opacity-60">Explore Dubai properties for sale, rent.</div>
      </Container> */}
      <section className="border-b sticky top-0 shadow-[0_3px_5px_-3px_rgba(0,0,0,0.1)] z-[20] py-4 space-y-2 bg-white">
        <Container className="flex flex-wrap items-center gap-2 w-full">
          <DataTableFilter
            filterKey="listType"
            title="Purpose"
            options={dealTypeOptions || []}
            setFilterValue={setListType}
            filterValue={listType}
          />

          <div className="w-full max-w-md">
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

          <ExtraFilter
            setBeds={setBedroom}
            setBaths={setBathroom}
            beds={bedroom}
            baths={bathroom}
          />
          {/* <DataTableFilterBox
            filterKey="language"
            title="Language"
            options={availableLanguages || []}
            setFilterValue={setLanguage}
            filterValue={language}
          /> */}
          {/* <DataTableResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          /> */}
          <Button
            className="ml-auto"
            variant={"outline"}
            type="button"
            onClick={() => setFilters(true)}
          >
            <i className="bi-filter"></i> All filters
          </Button>
        </Container>
      </section>

      {/* <section className="min-h-[50vh] py-8">
        <ListingProjectShowcase
          title="Empire Gardens"
          category="Apartments"
          status="Under Construction"
          developer="Empire Developments"
          launchPrice="AED 700K"
          paymentPlan="56 / 44"
          handover="Q4 2028"
          description="Empire Gardens will be a residential development located in Dubai Land Residence (DLRC), offering a well-connected community setting. Developed by Empire Developments, the off-plan project will feature apartments designed with efficient layouts and premium finishes."
          mainImage="https://renspro-uploads.s3.eu-north-1.amazonaws.com/offplan-uploads/7408626d-b6b8-4176-bf35-2d62f3d09efc"
          topImage="https://renspro-uploads.s3.eu-north-1.amazonaws.com/offplan-uploads/0e8c686f-e698-4c74-8b32-394132c4f444"
          bottomImage="https://renspro-uploads.s3.eu-north-1.amazonaws.com/offplan-uploads/890e93df-63c4-4b14-b63e-2ca248c6b4ec"
          onRegisterInterest={() => {
            console.log("Interest registered");
          }}
        />
      </section> */}

      <section className="min-h-[50vh] py-2">
        <Container>
          {/* <div className="text-muted-foreground">22,000 listed</div> */}
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 py-4">
            <div className="space-y-4">
              {listings &&
                listings?.data?.data?.map((listing: any) => {
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
                                  i === activeIndex
                                    ? "bg-white"
                                    : "bg-white/50",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <Link
                          href={`/search/${listing.id}`}
                        // className="absolute top-0 left-0 w-full h-full bgr/10 inset-0"
                        >
                          <div className="p-4 flex flex-col justify-between gap-3">
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
                                {/* <div className="capitalize text-xs">
                                <span
                                  className={cn(
                                    `px-2 py-0.5 rounded-full`,
                                    listing.dealType.toLowerCase() === "sale" &&
                                      "bg-purple-200 text-purple-800",
                                    listing.dealType.toLowerCase() === "rent" &&
                                      "bg-pink-200 text-pink-800",
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

                            <div className="grid grid-cols-1 md:grid-cols-2">
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
            <div>
              <div className="sticky top-20 space-y-4">
                <div className="text-center space-y-3 card">
                  <p className="font-medium">
                    Be the first to hear about new properties
                  </p>

                  <Button
                    onClick={() => setOpen(true)}
                    className="w-full"
                    variant={"outline_brand"}
                  >
                    <i className="bi-bell-fill"></i>
                    ALERT ME OF NEW PROPERTIES
                  </Button>
                </div>

                {/* <div className="bg-white border shadow-md rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-white to-background border-b px-4 py-3 font-semibold text-gray-800">
                    Useful Links
                  </div>

                  <div className="p-4 space-y-1">
                    {links?.map((link: any, index: any) => (
                      <p
                        key={index}
                        className="text-xs text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200 truncate"
                        title={link}
                      >
                        {link}
                      </p>
                    ))}
                  </div>
                </div> */}

                <div className="space-y-4">
                  {usefulLinksSections.map((section, index) => {
                    // if (!section.links.length) return null;

                    return (
                      <div key={index} className="card !p-0 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-white border-b px-4 py-3">
                          <h3 className="text-sm font-semibold text-gray-800">
                            {section.title}
                          </h3>
                        </div>

                        {/* Links */}
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

                {/* Buttons */}
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

      <Dialog open={filters} onOpenChange={setFilters}>
        <DialogContent
          className="
      w-[95vw]
      max-w-6xl
      h-[60vh]
      rounded-3xl
      bg-white
      p-0
      overflow-hidden
      border-0
      flex
      flex-col
    "
          onInteractOutside={(e) => e.preventDefault()}
        >

          <div className="flex items-center justify-between px-8 py-6 border-b shrink-0">
            <div>
              <DialogTitle className="text-3xl font-semibold text-gray-900">
                More Filters
              </DialogTitle>

              <p className="text-sm text-gray-500 mt-1">
                Refine your property search with more advanced filters
              </p>
            </div>
          </div>


          <div
            className="flex-1 overflow-y-auto overflow-x-visible px-8 py-6"
          >
            <div className="grid grid-cols-1 gap-8">

              <div
                className="
            rounded-2xl
            border
            p-6
            overflow-visible
            relative
            z-10
          "
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Price (AED)
                  </h3>

                  <div className="text-sm text-emerald-600 font-medium">
                    Flexible
                  </div>
                </div>

                <div className="overflow-visible relative z-20">
                  <PriceFilter
                    setMaxPrice={setMaxPrice}
                    setMinPrice={setMinPrice}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                  />
                </div>
              </div>

              <div
                className="
            rounded-2xl
            border
            p-6
            overflow-visible
            relative
            z-10
          "
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-5">
                  Property Details
                </h3>

                <div className="overflow-visible relative z-20">
                  <ExtraFilter
                    setBeds={setBedroom}
                    setBaths={setBathroom}
                    beds={bedroom}
                    baths={bathroom}
                  />
                </div>
              </div>

              <div
                className="
            rounded-2xl
            border
            p-6
            overflow-visible
            relative
            z-30
          "
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-5">
                  Language
                </h3>

                <div className="overflow-visible relative z-40 h-auto">
                  <DataTableFilterBox
                    filterKey="language"
                    title="Language"
                    options={availableLanguages || []}
                    setFilterValue={setLanguage}
                    filterValue={language}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t px-8 py-5 bg-white">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-14 px-8 rounded-2xl text-base"
              >
                Reset
              </Button>

              <Button
                type="submit"
                className="flex-1 h-14 rounded-2xl text-base font-semibold bg-brand hover:bg-brand text-white"
              >
                See properties
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageWrap;
