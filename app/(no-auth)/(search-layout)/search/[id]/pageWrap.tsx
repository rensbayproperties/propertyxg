"use client";
import React, { useState, useMemo, useEffect } from "react";
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
import useListingTrend from "@/hooks/useListingTrend";
import { toast } from "sonner";
import useSimilarListing from "@/hooks/useSimilarListing";

const PageWrap = ({ id }: { id: string }) => {
  const {
    listings,
    gettingListings,
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
  } = useListing(id);

  const {
    setLocation,
    setListType,
    similarListings,
    gettingSimilarListings,
    setPrice,
  } = useSimilarListing(id);

  useEffect(() => {
    if (!gettingListings) {
      setListType(listings?.data?.dealType);
      setPrice(listings?.data?.price);
      setLocation(listings?.data?.locationId);
    }
  }, [!gettingListings]);

  const [currentImage, setCurrentImage] = useState(0);

  const trendOpt: string = listings?.data?.location.name;

  const { TrendData, gettingTrendData, HistoryData, gettingHistoryData } =
    useListingTrend(trendOpt);

  const [share, setShare] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openWhatsappModal, setShowWhatsappModal] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  if (gettingListings)
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
              Loading listing...
            </p>
          </div>
        </div>
      </div>
    );

  const images = listings?.data?.images?.map((img: any) => img.url) || [];

  //   {
  //     date: "25 Apr 2026",
  //     duration: "12 months",
  //     area: 714,
  //     rent: "AED 40,000",
  //   },
  //   {
  //     date: "6 Apr 2026",
  //     duration: "12 months",
  //     area: 514,
  //     rent: "AED 40,000",
  //   },
  //   {
  //     date: "5 Apr 2026",
  //     duration: "12 months",
  //     area: 771,
  //     rent: "AED 50,000",
  //   },
  //   {
  //     date: "1 Apr 2026",
  //     duration: "12 months",
  //     area: 822,
  //     rent: "AED 42,500",
  //   },
  //   {
  //     date: "15 Mar 2026",
  //     duration: "12 months",
  //     area: 825,
  //     rent: "AED 42,000",
  //   },
  //   {
  //     date: "8 Mar 2026",
  //     duration: "12 months",
  //     area: 868,
  //     rent: "AED 45,000",
  //   },
  // ];

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
          } in ${listings?.data?.location?.name || "Dubai"}`,
          href: listings?.data?.location
            ? `/search?bedroom=${bedroom}&locationId=${listings?.data?.location?.id}`
            : `/search?bedroom=${bedroom}`,
        })) || [],
    },

    {
      title: "Bathrooms",
      links:
        listingsRecommendations?.suggestedBathrooms?.map(
          (bathroom: string) => ({
            label: `${bathroom} Bathroom Properties in ${
              listings?.data?.location?.name || "Dubai"
            }`,
            href: listings?.data?.location
              ? `/search?bathroom=${bathroom}?locationId=${listings?.data?.location?.id}`
              : `/search?bathroom=${bathroom}`,
          }),
        ) || [],
    },
  ];

  const shareUrl = `https://www.propertyxg.com/search/${id}`;
  const shareText = `Check out this property I found on RensPro 🏡\n\n${listings?.data?.title}\n\n${shareUrl}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
      "_blank",
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  const shareWhatsapp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  const shareGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
        "Property Recommendation",
      )}&body=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      "Property Recommendation",
    )}&body=${encodeURIComponent(shareText)}`;
  };

  const nativeShare = async () => {
    try {
      await navigator.share({
        title: listings?.data?.title,
        text: "Check out this property on PropertyXg",
        url: shareUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="page-form">
      <div className="flexs flex-col gap-2 min-h-screen px-4">
        <div className="w-full">
          {/* MOBILE */}
          <div className="lg:hidden">
            <div
              className="
        flex
        overflow-x-auto
        snap-x
        snap-mandatory
        scroll-smooth
        scrollbar-hide
        rounded-xl
      "
              onScroll={(e) => {
                const container = e.currentTarget;
                const index = Math.round(
                  container.scrollLeft / container.offsetWidth,
                );
                setCurrentImage(index);
              }}
            >
              {images.map((img: string, i: number) => (
                <div
                  key={i}
                  className="
            relative
            w-full
            min-w-full
            h-[260px]
            snap-center
            flex-shrink-0
            overflow-hidden
            rounded-xl
            cursor-pointer
            scrollbar-hide
          "
                  onClick={() => setOpenGallery(true)}
                >
                  <Image src={img} alt="" fill className="object-fill" />

                  {/* Total Images */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2">
                    <Camera size={16} />
                    {images.length}
                  </div>

                  {/* Swipe Hint */}
                  {i === 0 && images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                      Swipe →
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {images.map((_: any, index: number) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-2 rounded-full transition-all ${
                      currentImage === index
                        ? "w-6 bg-brand"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:grid grid-cols-3 gap-3">
            <div
              className="col-span-2 h-[450px] relative rounded-xl overflow-hidden cursor-pointer"
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {formatMoney(Number(listings?.data?.price))}
                </p>

                <p className="text-lg font-semibold gap-1.5 flex items-center">
                  <MapPin size={14} /> {listings?.data?.location?.name}
                </p>

                <p className="text-gray-600">{listings?.data?.title}</p>
              </div>

              <div className="relative">
                <Button
                  onClick={() => {
                    if (
                      typeof navigator !== "undefined" &&
                      "share" in navigator
                    ) {
                      nativeShare();
                    } else {
                      setShare((prev) => !prev);
                    }
                  }}
                >
                  Share
                </Button>

                {share && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-56 z-20">
                    <div
                      onClick={handleCopyLink}
                      className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer"
                    >
                      Copy Link
                    </div>

                    <div
                      onClick={shareFacebook}
                      className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer"
                    >
                      <FacebookSVG /> Facebook
                    </div>

                    <div
                      onClick={shareTwitter}
                      className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer"
                    >
                      <TwitterSVG /> Twitter / X
                    </div>

                    <div
                      onClick={shareWhatsapp}
                      className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer"
                    >
                      <WhatsappSVG /> WhatsApp
                    </div>

                    <div
                      onClick={shareGmail}
                      className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer"
                    >
                      <GmailSVG /> Gmail
                    </div>

                    <div
                      onClick={shareEmail}
                      className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer"
                    >
                      <EmailSVG /> Email
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 text-sm">
              {(listings?.data?.property_bedroom && (
                <div className="flex gap-2 items-center">
                  <BedDouble size={14} />
                  <div className="capitalize">
                    {listings?.data?.property_bedroom}
                  </div>
                </div>
              )) || <></>}
              {(listings?.data?.property_bathroom && (
                <div className="flex gap-2 items-center">
                  <Bath size={14} />
                  <div>{listings?.data?.property_bathroom}</div>
                </div>
              )) || <></>}
              {(listings?.data?.property_size && (
                <div className="flex gap-2 items-center">
                  <Maximize size={14} className="opacity-50 leading-relaxed" />
                  <div className="capitalize">
                    {listings?.data?.property_size?.toLocaleString() + " sqft"}
                  </div>
                </div>
              )) || <></>}
              {(listings?.data?.completionStatus && (
                <div className="flex gap-2 items-center">
                  {listings?.data?.completionStatus?.toLowerCase() ===
                  "off_plan" ? (
                    <i className="bi-building-exclamation opacity-50"></i>
                  ) : listings?.data?.completionStatus?.toLowerCase() ===
                    "ready" ? (
                    <i className="bi bi-check-circle opacity-50"></i>
                  ) : (
                    <></>
                  )}
                  <div className="capitalize">
                    {listings?.data?.completionStatus
                      ?.toLowerCase()
                      .replace(/_/g, " ")}
                  </div>
                </div>
              )) || <></>}
              {(listings?.data?.furnished && (
                <div className="flex gap-2 items-center">
                  <i className="bi-house-check opacity-50"></i>
                  <div className="capitalize">Furnished</div>
                </div>
              )) || <></>}
              {(listings?.data?.distres && (
                <div className="flex gap-2 items-center">
                  <i className="bi bi-exclamation-triangle"></i>
                  <div className="capitalize">Distress</div>
                </div>
              )) || <></>}
              {(listings?.data?.category && (
                <div className="flex gap-2 items-center">
                  <i className="bi bi-buildings"></i>
                  <div className="capitalize">
                    {listings?.data?.category?.name}
                  </div>
                </div>
              )) || <></>}
            </div>

            <ExpandableContent
              content={
                listings?.data?.description ||
                "Experience modern living in the heart of Dubai with this beautifully designed property, offering spacious interiors, premium finishes, and easy access to key city attractions."
              }
            />

            <div className="bg-white p-6 rounded-xl border">
              <h2 className="font-semibold text-lg mb-4">
                Property Information
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Type: {listings?.data?.category?.name}</div>
                <div>Purpose: {listings?.data?.dealType}</div>
                <div>Ref: {listings?.data?.ref}</div>
                <div>Furnished: {listings?.data?.furnished ? "Yes" : "No"}</div>
                <div>Parking: {listings?.data?.has_parking ? "Yes" : "No"}</div>
                <div>
                  Negotiable: {listings?.data?.negotiable ? "Yes" : "No"}
                </div>
                <div>Distress: {listings?.data?.distress ? "Yes" : "No"}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <h2 className="font-semibold text-lg mb-4">Amenities</h2>

              <div className="flex flex-wrap gap-2 pl-4">
                {listings?.data?.amenities?.map((a: any) => (
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
                <CheckCircle className="text-brand" size={20} />
              </div>

              <p className="text-gray-600 text-sm">
                {listings?.data?.property_bedroom} Bedroom Apartments in{" "}
                {listings?.data?.title}
              </p>

              <div className="flex gap-2 flex-wrap">
                <div className="px-4 py-2 rounded border border-brand text-brand bg-purple-50 text-md h-8 flex items-center">
                  {listings?.data?.location?.name}
                </div>
              </div>

              <div className="border-b">
                <button className="text-brand border-b-2 border-brand pb-2 text-sm font-semibold">
                  SALE
                </button>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-500 text-left">
                    <tr className="border-b">
                      <th className="py-3">DATE</th>
                      <th>DURATION</th>
                      <th>AREA (sqft)</th>
                      <th className="text-right">{listings?.data?.dealType}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {HistoryData?.map((item: any, i: any) => (
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
            </div>

            <div>
              <ListingTrend
                data={TrendData}
                label={`Trends in ${listings?.data?.location?.name}`}
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-semibold text-lg mb-4">
                Recommended for you
              </h2>
              <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scrollbar-hide md:flex-wrap md:overflow-visible">
                {similarListings?.data?.map((property: any, i: any) => (
                  <div key={`propp_${i}`} className="flex-shrink-0 snap-start">
                    <SearchPropertyCard property={property} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-5 space-y-4">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border flex flex-col items-center justify-center">
                <div className="flex justify-center items-center bg-gradient-to-r from-gray-50 to-white h-32">
                  <div>
                    <Avatar className="h-28 w-28 rounded-full shadow border">
                      <AvatarImage src={listings?.data?.uploader?.image} />
                      <AvatarFallback className="rounded-full">
                        {getFirstLetter(listings?.data?.uploader?.first_name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="text-center flex justify-center gap-1 mt-2">
                  <h2 className="font-semibold">
                    {listings?.data?.uploader?.first_name}
                  </h2>
                  <h2 className="font-semibold">
                    {listings?.data?.uploader?.last_name}
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 px-4">
                  <Button
                    size="sm"
                    className="w-full bg-[#e5f0ff] px-4 py-2 rounded flex gap-2"
                    onClick={() => {
                      const subject = encodeURIComponent(
                        `Inquiry about ${listings?.data?.title || "your property"}`,
                      );

                      const body = encodeURIComponent(
                        `Hello,

                           I am interested in the following property:

                           Property: ${listings?.data?.title || ""}
                           Location: ${listings?.data?.location?.name || ""}
                           Price: ${formatMoney(listings?.data?.price)}

                           Could you please provide additional information regarding availability and viewing arrangements?

                           Thank you and I look forward to your response.

                           Kind regards,`,
                      );

                      window.location.href = `mailto:${listings?.data?.uploader?.email}?subject=${subject}&body=${body}`;
                    }}
                  >
                    <Mail size={18} />
                    Email
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-blue-100 hover:bg-blue-200  px-6 shadow-none border-none relative z-10"
                    size={"sm"}
                    onClick={() => setOpenContact(true)}
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
                        `${listings?.data?.uploader?.first_name || ""} ${
                          listings?.data?.uploader?.last_name || ""
                        }`.trim();

                      const phone = String(
                        listings?.data?.uploader?.whatsapp || "",
                      ).replace(/\D/g, "");

                      const message = encodeURIComponent(
                        `Hi ${fullName},

                                       I am interested in the following property:
                                
                                       Property: ${listings?.data?.title || ""},
                                       Location: ${listings?.data?.location?.name || ""},
                                       Price: ${formatMoney(listings?.data?.price)},
                                
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

                <div className="p-4 border-t mt-4 text-sm flex justify-between items-center w-full">
                  <div>
                    <Image
                      src={listings?.data?.company?.logo || ""}
                      width={50}
                      height={50}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <Link href={`/profile/${listings?.data?.company?.id}`}>
                    <button className="text-brand">View profile →</button>
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
            {listings && listings?.data && (
              <div className="bg-white rounded-lg max-w-md mx-auto flex flex-col justify-center items-center space-y-3">
                <h2 className="text-center text-2xl font-semibold">
                  Contact Us
                </h2>

                <Image
                  src={listings?.data?.company?.logo || ""}
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
                    href={`tel:${listings?.data?.uploader?.phone}`}
                    className="text-xl font-semibold text-brand hover:underline"
                  >
                    {listings?.data?.uploader?.phone}
                  </a>
                </div>

                <hr />

                <div className="text-center">
                  <span className="text-gray-500">Agent: </span>
                  <span className="font-medium">
                    {listings?.data?.uploader?.first_name}{" "}
                    {listings?.data?.uploader?.last_name}
                  </span>
                </div>

                <hr />

                <div className="text-center">
                  <p className="text-md">Please quote property reference</p>
                  <p className="font-bold text-lg">
                    PropertyXg - {listings?.data?.ref}
                  </p>
                  <p className="text-md">when calling us.</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* MODALS */}
      <GalleryModal
        open={openGallery}
        setOpen={setOpenGallery}
        images={images}
      />
    </Container>
  );
};

export default PageWrap;
