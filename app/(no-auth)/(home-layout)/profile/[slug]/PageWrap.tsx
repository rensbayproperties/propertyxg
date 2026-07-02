"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn, formatMoney, formatToReadableDate, getTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  Bath,
  Maximize,
  Heart,
  Phone,
  ChevronLeft,
  ChevronRight,
  Ruler,
  MapPin,
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
import ProfileForm from "@/components/ProfileForm";
import Link from "next/link";

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  const rentScrollRef = useRef<HTMLDivElement>(null);
  const saleScrollRef = useRef<HTMLDivElement>(null);

  const scrollListings = (
    direction: "left" | "right",
    type: "rent" | "sale",
  ) => {
    const ref = type === "rent" ? rentScrollRef.current : saleScrollRef.current;

    if (!ref) return;

    ref.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

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
      <Container>
        <section className="bg-white mt-5 border border-slate-200 rounded-2xl shadow-sm p-4 md:p-5">
          <div className="grid lg:grid-cols-[220px_1fr] gap-5">
            <div className="flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-slate-200 pb-5 lg:pb-0 lg:pr-5">
              <img
                src={
                  "https://renspro-uploads.s3.eu-north-1.amazonaws.com/media/d35fd297-7993-4201-aaa5-ed7e3e77365e.webp"
                }
                alt=""
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border"
              />

              <h2 className="mt-3 text-lg font-bold text-slate-900">
                D . a . M . i
              </h2>

              <div className="mt-3 flex flex-col justify-center items-center gap-2">
                <img
                  src={companyDetails?.company?.logo || ""}
                  width={50}
                  height={50}
                  alt=""
                  className="object-cover"
                />
                <p className="text-xs font-medium text-slate-800">
                  Realty Advisors {companyDetails?.company?.name}
                </p>

                <p className="text-xs text-blue-600 mt-1">
                  Member of {companyDetails?.company?.name}
                </p>

                <Link href={`/company/${companyDetails?.company?.id}`}>
                  <button className="text-brand text-xs">View all listings →</button>
                </Link>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="font-semibold">5.0 ⭐</span>

                <span className="text-blue-600">257 reviews</span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Recent Sales
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => scroll("left")}
                    className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={() => scroll("right")}
                    className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="
          flex
          gap-3
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          scrollbar-hide
          pb-2
        "
              >
                {companyDetails?.listings?.data?.map((listing: any) => (
                  <div
                    key={listing.id}
                    className="
              shrink-0
              w-[235px]
              bg-white
              border
              border-slate-200
              rounded-xl
              overflow-hidden
              shadow-sm
              snap-start
            "
                  >
                    <div className="relative h-32">
                      <img
                        src={listing.images?.[0]?.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute top-2 left-2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-full font-medium">
                        Buyer
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="text-base font-bold text-slate-900">
                        AED {listing.price?.toLocaleString()}
                      </h4>

                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <BedDouble size={12} />
                          {listing.property_bedroom}
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                          <Bath size={12} />
                          {listing.property_bathroom}
                        </span>

                        <span>•</span>

                        <span>
                          {Number(listing.property_size).toLocaleString()}
                          sqft
                        </span>
                      </div>

                      <div className="mt-1 text-xs text-slate-500 truncate">
                        {listing.location?.name}
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />

                        <span className="font-medium">Sold</span>

                        <span className="text-slate-500">2 months ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-slate-900">4</h4>

                  <p className="text-[11px] text-slate-500 mt-1">
                    Sales last 12 months
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-bold text-slate-900">111</h4>

                  <p className="text-[11px] text-slate-500 mt-1">Total sales</p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-bold text-slate-900">
                    $115K-$1.9M
                  </h4>

                  <p className="text-[11px] text-slate-500 mt-1">Price range</p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-bold text-slate-900">$755K</h4>

                  <p className="text-[11px] text-slate-500 mt-1">
                    Average price
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <section className="min-h-[50vh] bg-white py-4">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[69%_30%] gap-3">
            <div className="flex flex-col gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      About the Company
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Company information and market presence
                    </p>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                    Verified Agency
                  </div>
                </div>

                {/* About */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-sm leading-7 text-slate-600">
                    {companyDetails?.company?.profile?.about}
                  </p>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="rounded-xl border border-slate-200 p-4 text-center bg-white">
                    <p className="text-xl font-bold text-slate-900">
                      {companyDetails?.listingStats?.rent || 0}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">For Rent</p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4 text-center bg-white">
                    <p className="text-xl font-bold text-slate-900">
                      {companyDetails?.listingStats?.sale || 0}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">For Sale</p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4 text-center bg-white">
                    <p className="text-xl font-bold text-slate-900">
                      {companyDetails?.listingStats?.offPlan || 0}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Off Plan</p>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-white rounded-xl mt-6">
                  <div className="grid md:grid-cols-2">
                    {/* Property Types */}
                    <div className="p-4 border-b md:border-r border-slate-100">
                      <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                        Property Types
                      </p>

                      <p className="text-sm text-slate-800 leading-6">
                        {companyDetails?.company?.profile?.propertyTypes}
                      </p>
                    </div>

                    {/* Service Areas */}
                    <div className="p-4 border-b border-slate-100">
                      <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                        Service Areas
                      </p>

                      <p className="text-sm text-slate-800 leading-6">
                        {companyDetails?.company?.profile?.serviceAreas}
                      </p>
                    </div>

                    {/* RERA */}
                    <div className="p-4 md:border-r border-slate-100">
                      <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                        RERA Registration
                      </p>

                      <p className="text-sm text-slate-800">
                        {companyDetails?.company?.profile?.reraRegistration ||
                          "N/A"}
                      </p>
                    </div>

                    {/* Active Listings */}
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                        Active Listings
                      </p>

                      <p className="text-sm text-slate-800">
                        {(companyDetails?.listingStats?.rent || 0) +
                          (companyDetails?.listingStats?.sale || 0) +
                          (companyDetails?.listingStats?.offPlan || 0)}{" "}
                        Properties
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                      For Rent (
                      {
                        companyDetails?.listings?.data?.filter(
                          (listing: any) => listing.dealType === "RENT",
                        ).length
                      }
                      )
                    </h2>

                    <div className="flex gap-2">
                      <button
                        onClick={() => scrollListings("left", "rent")}
                        className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        onClick={() => scrollListings("right", "rent")}
                        className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={rentScrollRef}
                    className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
                  >
                    {companyDetails?.listings?.data
                      ?.filter((listing: any) => listing.dealType === "RENT")
                      ?.map((listing: any) => (
                        <Link href={`/search/${listing.id}`}>
                          <div
                            key={listing.id}
                            className="shrink-0 w-[220px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                          >
                            <div className="relative h-28">
                              <img
                                src={listing.images?.[0]?.url}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                              />

                              <span className="absolute top-2 left-2 bg-slate-800/90 text-white text-[10px] px-2 py-1 rounded-full font-medium">
                                For Rent
                              </span>
                            </div>

                            <div className="p-3">
                              <h3 className="text-lg font-bold text-slate-900 truncate">
                                AED {Number(listing.price).toLocaleString()}
                              </h3>

                              <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                                <div className="flex items-center gap-1">
                                  <BedDouble size={12} />
                                  <span>{listing.property_bedroom}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Bath size={12} />
                                  <span>{listing.property_bathroom}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Ruler size={12} />
                                  <span>
                                    {Number(
                                      listing.property_size,
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-1 mt-2">
                                <MapPin
                                  size={12}
                                  className="text-slate-400 mt-0.5 shrink-0"
                                />

                                <p className="text-[11px] text-slate-500 line-clamp-2 leading-4">
                                  {listing.location?.name}
                                </p>
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-100">
                                <span className="text-[11px] text-slate-500">
                                  {listing.category?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                      For Sale (
                      {
                        companyDetails?.listings?.data?.filter(
                          (listing: any) => listing.dealType === "SALE",
                        ).length
                      }
                      )
                    </h2>

                    <div className="flex gap-2">
                      <button
                        onClick={() => scrollListings("left", "sale")}
                        className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        onClick={() => scrollListings("right", "sale")}
                        className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={saleScrollRef}
                    className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
                  >
                    {companyDetails?.listings?.data
                      ?.filter((listing: any) => listing.dealType === "SALE")
                      ?.map((listing: any) => (
                        <Link href={`/search/${listing.id}`}>
                          <div
                            key={listing.id}
                            className="shrink-0 w-[220px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                          >
                            <div className="relative h-28">
                              <img
                                src={listing.images?.[0]?.url}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                              />

                              <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full font-medium">
                                For Sale
                              </span>
                            </div>

                            <div className="p-3">
                              <h3 className="text-lg font-bold text-slate-900 truncate">
                                AED {Number(listing.price).toLocaleString()}
                              </h3>

                              <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                                <div className="flex items-center gap-1">
                                  <BedDouble size={12} />
                                  <span>{listing.property_bedroom}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Bath size={12} />
                                  <span>{listing.property_bathroom}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Ruler size={12} />
                                  <span>
                                    {Number(
                                      listing.property_size,
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-1 mt-2">
                                <MapPin
                                  size={12}
                                  className="text-slate-400 mt-0.5 shrink-0"
                                />

                                <p className="text-[11px] text-slate-500 line-clamp-2 leading-4">
                                  {listing.location?.name}
                                </p>
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-100">
                                <span className="text-[11px] text-slate-500">
                                  {listing.category?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </section>
            </div>

            <div>
              <div className="sticky top-[20px] space-y-4">
                <ProfileForm />
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
