"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Share, Camera, Mail, Phone } from "lucide-react";
import { BedDouble, Bath, Maximize, Heart } from "lucide-react";
import {
  FacebookSVG,
  TwitterSVG,
  WhatsappSVG,
  GmailSVG,
  EmailSVG,
} from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import GalleryModal from "@/components/modal/gallerymodal";
import { CallModal } from "@/components/modal/ContactModal";
import ExpandableContent from "@/components/ExpandableContent";
import useListing from "@/hooks/useListing";
import { formatMoney } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter } from "@/constant/data";
import { CheckCircle } from "lucide-react";
import { SearchPropertyCard } from "@/components/PropertyListings";
import SearchPropertyCardSkeleton from "@/components/SearchPropertyCardSkeleton";
import Container from "@/components/Container";
import { MapPin } from "lucide-react";
import ListingTrend from "@/components/ListingTrend";
import Link from "next/link";

const PageWrap = ({ id }: { id: string }) => {
  const {
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
    listingsRecommendations,
  } = useListing();

  const [share, openShare] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openWhatsappModal, setShowWhatsappModal] = useState(false);

  const listing = useMemo(() => {
    return listings?.data?.data?.find((item: any) => item.id === id);
  }, [listings, id]);

  if (!listing) return <p className="p-10">Loading...</p>;

  const images = listing?.images?.map((img: any) => img.url) || [];
  const name = "D . a . M . i _ D . a . M . i";

  console.log("id", id);

  const transactions = [
    {
      date: "25 Apr 2026",
      duration: "12 months",
      area: 714,
      rent: "AED 40,000",
    },
    {
      date: "6 Apr 2026",
      duration: "12 months",
      area: 514,
      rent: "AED 40,000",
    },
    {
      date: "5 Apr 2026",
      duration: "12 months",
      area: 771,
      rent: "AED 50,000",
    },
    {
      date: "1 Apr 2026",
      duration: "12 months",
      area: 822,
      rent: "AED 42,500",
    },
    {
      date: "15 Mar 2026",
      duration: "12 months",
      area: 825,
      rent: "AED 42,000",
    },
    {
      date: "8 Mar 2026",
      duration: "12 months",
      area: 868,
      rent: "AED 45,000",
    },
  ];

  // const links = [
  //   `Properties for ${listing?.dealType} in Dubai`,
  //   `Properties for ${listing?.dealType} in ${listing?.location?.name}`,
  //   `${listing?.property_bedroom} Bedroom Apartments for ${listing?.dealType} in Dubai`,
  //   `${listing?.property_bedroom} Bedroom Apartments for ${listing?.dealType} in ${listing?.location?.name}`,
  //   `Studio Apartments in ${listing?.location?.name || "Dubai"}`,
  //   `Off-Plan Properties in ${listing?.location?.name || "Dubai"}`,
  //   `New Projects in ${listing?.location?.name || "Dubai"}`,
  //   `Properties with Payment Plan in ${listing?.location?.name || "Dubai"}`,
  // ];

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
          label: `${bedroom} Bedroom ${
            listingsRecommendations?.suggestedCategories?.[0] || "Properties"
          } in ${listing?.location?.name || "Dubai"}`,
          href: listing?.location
            ? `/search?bedroom=${bedroom}&locationId=${listing?.location?.id}`
            : `/search?bedroom=${bedroom}`,
        })) || [],
    },

    {
      title: "Bathrooms",
      links:
        listingsRecommendations?.suggestedBathrooms?.map(
          (bathroom: string) => ({
            label: `${bathroom} Bathroom Properties in ${
              listing?.location?.name || "Dubai"
            }`,
            href: listing?.location
              ? `/search?bathroom=${bathroom}?locationId=${listing?.location?.id}`
              : `/search?bathroom=${bathroom}`,
          }),
        ) || [],
    },
  ];

  const trendData = [
    { month: "May", price: 2850000 },
    { month: "Jun", price: 2050000 },
    { month: "Jul", price: 2500000 },
    { month: "Aug", price: 2480000 },
    { month: "Sept", price: 2380000 },
    { month: "Oct", price: 2500000 },
    { month: "Nov", price: 2900000 },
    { month: "Dec", price: 3250000 },
    { month: "Jan", price: 3550000 },
    { month: "Feb", price: 3520000 },
    { month: "Mar", price: 3560000 },
  ];

  return (
    <Container className="page-form">
      <div className="flexs flex-col gap-2 min-h-screen px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div
            className="lg:col-span-2 h-[300px] md:h-[450px] relative rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setOpenGallery(true)}
          >
            <Image src={images[0]} alt="" fill className="object-cover" />

            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2">
              <Camera size={16} />
              {images.length}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {images.slice(1, 4).map((img: string, i: number) => (
              <div
                key={i}
                className="relative h-[140px] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setOpenGallery(true)}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {formatMoney(Number(listing?.price))}
                </p>

                <p className="text-lg font-semibold gap-1.5 flex items-center">
                  <MapPin size={14} /> {listing?.location?.name}
                </p>

                <p className="text-gray-600">{listing?.title}</p>
              </div>

              {/* SHARE */}
              <div className="relative">
                <button
                  onClick={() => openShare(!share)}
                  className="flex items-center gap-2 bg-[#e5f0ff] px-4 py-2 rounded-md"
                >
                  <Share size={18} />
                  Share
                </button>

                {share && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-56 z-20">
                    <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                      <FacebookSVG /> Facebook
                    </div>
                    <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                      <TwitterSVG /> Twitter
                    </div>
                    <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                      <WhatsappSVG /> Whatsapp
                    </div>
                    <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                      <GmailSVG /> Gmail
                    </div>
                    <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                      <EmailSVG /> Email
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 text-sm">
              {(listing?.property_bedroom && (
                <div className="flex gap-2 items-center">
                  <BedDouble size={14} />
                  <div className="capitalize">{listing.property_bedroom}</div>
                </div>
              )) || <></>}
              {(listing?.property_bathroom && (
                <div className="flex gap-2 items-center">
                  <Bath size={14} />
                  <div>{listing.property_bathroom}</div>
                </div>
              )) || <></>}
              {(listing?.property_size && (
                <div className="flex gap-2 items-center">
                  <Maximize size={14} className="opacity-50 leading-relaxed" />
                  <div className="capitalize">
                    {listing?.property_size?.toLocaleString() + " sqft"}
                  </div>
                </div>
              )) || <></>}
              {(listing?.completionStatus && (
                <div className="flex gap-2 items-center">
                  {listing?.completionStatus?.toLowerCase() === "off_plan" ? (
                    <i className="bi-building-exclamation opacity-50"></i>
                  ) : listing?.completionStatus?.toLowerCase() === "ready" ? (
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
                <div className="flex gap-2 items-center">
                  <i className="bi-house-check opacity-50"></i>
                  <div className="capitalize">Furnished</div>
                </div>
              )) || <></>}
              {(listing?.distres && (
                <div className="flex gap-2 items-center">
                  <i className="bi bi-exclamation-triangle"></i>
                  <div className="capitalize">Distress</div>
                </div>
              )) || <></>}
              {(listing?.category && (
                <div className="flex gap-2 items-center">
                  <i className="bi bi-buildings"></i>
                  <div className="capitalize">{listing?.category?.name}</div>
                </div>
              )) || <></>}
            </div>

            <ExpandableContent
              content={
                listing?.description ||
                "Experience modern living in the heart of Dubai with this beautifully designed property, offering spacious interiors, premium finishes, and easy access to key city attractions."
              }
            />

            <div className="bg-white p-6 rounded-xl border">
              <h2 className="font-semibold text-lg mb-4">
                Property Information
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Type: {listing?.category?.name}</div>
                <div>Purpose: {listing?.dealType}</div>
                <div>Ref: {listing?.ref}</div>
                <div>Furnished: {listing?.furnished ? "Yes" : "No"}</div>
                <div>Parking: {listing?.has_parking ? "Yes" : "No"}</div>
                <div>Negotiable: {listing?.negotiable ? "Yes" : "No"}</div>
                <div>Distress: {listing?.distress ? "Yes" : "No"}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <h2 className="font-semibold text-lg mb-4">Amenities</h2>

              <div className="flex flex-wrap gap-2 pl-4">
                {listing?.amenities?.map((a: any) => (
                  <span
                    key={a}
                    className="bg-gray-100 rounded text-sm flex flex-col justify-center items-center p-4"
                  >
                    <i className={`bi bi-${a?.icon}`}></i>
                    {a?.name?.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  Similar Property Transactions
                </h2>
                <CheckCircle className="text-green-500" size={20} />
              </div>

              <p className="text-gray-600 text-sm">
                {listing?.property_bedroom} Bedroom Apartments in{" "}
                {listing?.title}
              </p>

              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  className="px-4 py-2 rounded border text-gray-600 bg-gray-50"
                >
                  {listing?.location?.name}
                </Button>

                <Button
                  size="sm"
                  className="px-4 py-2 rounded border border-green-500 text-green-600 bg-green-50"
                >
                  {listing?.title}
                </Button>
              </div>

              <div className="border-b">
                <button className="text-green-600 border-b-2 border-green-600 pb-2 text-sm font-semibold">
                  {listing?.dealType}
                </button>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-500 text-left">
                    <tr className="border-b">
                      <th className="py-3">DATE</th>
                      <th>DURATION</th>
                      <th>AREA (sqft)</th>
                      <th className="text-right">{listing?.dealType}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((item, i) => (
                      <tr key={i} className="border-b last:border-none">
                        <td className="py-4">{item.date}</td>

                        <td>
                          <div className="flex items-center gap-2">
                            {item.duration}
                            <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded">
                              NEW
                            </span>
                          </div>
                        </td>

                        <td>{item.area}</td>

                        <td className="text-right font-medium">{item.rent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <button className="text-teal-600 text-sm font-medium flex items-center gap-1 hover:underline">
                  View transactions for {listing?.property_bedroom} Bedroom
                  Apartments in {listing?.location?.name}
                  <span>›</span>
                </button>
              </div>
            </div>

            <div>
              <ListingTrend
                data={trendData}
                label={`Trends in ${listing?.location?.name}`}
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-semibold text-lg mb-4">
                Recommended for you
              </h2>
              <SimilarProperties
                slug={listing.id}
                filters={listing?.location?.name}
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="sticky top-5 space-y-4">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
                <div className="flex justify-center items-center border-b bg-gradient-to-br from-white to-background h-32">
                  <div>
                    <Avatar className="h-28 w-28 rounded-full shadow border">
                      <AvatarImage src={listing?.uploader?.image} />
                      <AvatarFallback className="rounded-full">
                        {getFirstLetter(listing?.uploader?.first_name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="text-center flex justify-center gap-1 mt-2">
                  <h2 className="font-semibold">
                    {listing?.uploader?.first_name}
                  </h2>
                  <h2 className="font-semibold">
                    {listing?.uploader?.last_name}
                  </h2>
                </div>

                <div className="flex justify-center gap-3 mt-4 px-4">
                  <Button
                    size={"sm"}
                    className="w-full bg-[#e5f0ff] px-4 py-2 rounded flex gap-2"
                  >
                    <Mail size={18} /> Email
                  </Button>

                  <Button
                    size={"sm"}
                    onClick={() => setShowWhatsappModal(true)}
                    className="w-full bg-[#e5f0ff] px-4 py-2 rounded flex gap-2"
                  >
                    <Phone size={18} /> Call
                  </Button>

                  <Button
                    size={"sm"}
                    onClick={() => contactAgent(listing.id)}
                    className="w-full bg-green-200 hover:bg-green-200 text-green-800"
                  >
                    <i className="bi-whatsapp"></i>WhatsApp
                  </Button>
                </div>

                <div className="p-4 border-t mt-4 text-sm flex justify-between items-center">
                  <div>
                      <Image
                        src={listing?.company?.logo || ""}
                        width={50}
                        height={50}
                        alt=""
                        className="object-cover"
                      />
                  </div>
                  <Link href={`/company/${listing.company.id}`}>
                    <button className="text-blue-600">
                      View all listings →
                    </button>
                  </Link>
                </div>
              </div>

                <div className="space-y-4">
                  {usefulLinksSections.map((section, index) => {
                    // if (!section.links.length) return null;

                    return (
                      <div
                        key={index}
                        className="bg-white border shadow-md rounded-xl overflow-hidden"
                      >
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
      </div>

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

      {/* MODALS */}
      <GalleryModal
        open={openGallery}
        setOpen={setOpenGallery}
        images={images}
        id={listing.id}
        user={listing?.user || name}
      />
      <CallModal open={openWhatsappModal} setOpen={setShowWhatsappModal} />
    </Container>
  );
};

function SimilarProperties({
  slug,
  filters,
}: {
  slug: string;
  filters: { location?: string };
}) {
  // fetch property listings
  const { gettingListings, listings } = useListing();
  const theListing = listings?.data?.data?.filter(
    (property: any) => property.id !== slug,
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {gettingListings
        ? Array.from({ length: 6 }).map((_, index) => (
            <SearchPropertyCardSkeleton key={index} />
          ))
        : theListing
            ?.filter((property: any) => property.location.name === filters)
            .map((property: any, i: any) => (
              <SearchPropertyCard key={`propp_${i}`} property={property} />
            ))}
    </div>
  );
}

export default PageWrap;
