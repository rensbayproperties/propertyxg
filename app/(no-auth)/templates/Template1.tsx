"use client";
import React, { useState, useEffect } from "react";
import {
  Share,
  Camera,
  Mail,
  Phone,
  MessageCircle,
  Microwave,
} from "lucide-react";
import {
  FacebookSVG,
  TwitterSVG,
  WhatsappSVG,
  GmailSVG,
  EmailSVG,
} from "@/components/icons";

import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

import GalleryModal from "@/components/modal/gallerymodal";
import useEditCampaigns from "@/hooks/useEditCampaigns";
import NotFound from "@/app/not-found";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { CallModal } from "@/components/modal/ContactModal";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import ExpandableContent from "@/components/ExpandableContent";

export default function Template1() {
  const axiosAuth = useAxiosAuth();

  const { data: amenities } = useQuery({
    queryKey: ["amenity"],
    queryFn: async () => {
      const res = await axiosAuth.get(`/amenity`);
      return res.data?.data;
    },
  });

  const { campaign, isLoading } = useEditCampaigns();
  const [expanded, setExpanded] = useState(false);
  const [share, openShare] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [openWhatsappModal, setShowWhatsappModal] = useState(false);

  const matchedAmenities =
    campaign?.amenities
      ?.map((name: string) =>
        amenities?.find(
          (a: any) => a.name.toLowerCase() === name.toLowerCase(),
        ),
      )
      .filter(Boolean) || [];

  useEffect(() => {
    if (!isLoading && !campaign) {
      setShowNotFound(true);
    }
  }, [isLoading, campaign]);

  if (showNotFound) {
    return (
      <NotFound
        heading="Campaign not found"
        subheading="Sorry, this campaign could not be found."
      />
    );
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="w-full overflow-x-hidden">
        {/* Top spacing */}
        <div className="h-10" />

        {/* Page Container */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 ">
          {/* IMAGE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <div
              className="lg:col-span-2 h-[300px] md:h-[450px] bedroom rounded-md relative  cursor-pointer"
              onClick={() => setOpenGallery(true)}
            >
              <div className="overlay"></div>
            </div>

            {/* Side Images */}
            <div className="flex flex-col gap-4">
              <div
                className="h-[200px] parlour rounded-md relative cursor-pointer"
                onClick={() => setOpenGallery(true)}
              >
                <div className="overlay"></div>
              </div>

              <div
                className="h-[120px] outside rounded-md relative  cursor-pointer"
                onClick={() => setOpenGallery(true)}
              >
                <div className="overlay"></div>
              </div>

              <div
                className="h-[120px] building rounded-md relative  cursor-pointer"
                onClick={() => setOpenGallery(true)}
              >
                <div className="overlay"></div>

                <div
                  onClick={() => setOpenGallery(true)}
                  className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 text-white px-4 py-1 rounded-full cursor-pointer"
                >
                  <Camera size={16} />
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* Price Section */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-3xl font-semibold">
                    AED {campaign?.starting_price}
                  </p>

                  <p className="text-lg font-semibold">
                    Mudon Al Ranim 4, Mudon, Dubai
                  </p>

                  <p className="text-lg font-semibold">
                    Park Backing | Central Location
                  </p>
                </div>

                {/* Share */}
                <div className="relative">
                  <button
                    onClick={() => openShare(!share)}
                    className="flex items-center gap-2 bg-[#e5f0ff] px-4 py-2 rounded-md"
                  >
                    <Share className="text-blue-500" size={18} />
                    <span className="text-blue-500 font-semibold">Share</span>
                  </button>

                  {share && (
                    <div className="absolute pt-2 right-0 mt-2 bg-white border rounded-md shadow-md w-56 z-20">
                      <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                        <FacebookSVG /> Share on Facebook
                      </div>
                      <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                        <TwitterSVG /> Share on Twitter
                      </div>
                      <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                        <WhatsappSVG /> Share on Whatsapp
                      </div>
                      <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                        <GmailSVG /> Send via Gmail
                      </div>
                      <div className="p-3 hover:bg-gray-100 flex gap-3 cursor-pointer">
                        <EmailSVG /> Send via Email
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="max-w-xl mt-6">
                <ExpandableContent content={campaign?.content} />
              </div>

              {/* Property Sections */}
              <div className="space-y-8">
                {/* Property Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-6">
                    Property Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left column */}
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Type</span>
                        <span className="font-semibold">Apartment</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Purpose</span>
                        <span className="font-semibold">For Sale</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Reference no.</span>
                        <span className="font-semibold">
                          Bayut - 101526-iLiLpGh
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-semibold">Off-Plan</span>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Furnishing</span>
                        <span className="font-semibold">Furnished</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">TruCheck™ on</span>
                        <span className="font-semibold">6 March 2026</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Added on</span>
                        <span className="font-semibold">6 March 2026</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Handover date</span>
                        <span className="font-semibold">Q1 2028</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Validated Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-xl font-semibold">
                      Validated Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left column */}
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Developer</span>
                        <span className="font-semibold">
                          DUBAI HILLS ESTATE L.L.C
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Ownership</span>
                        <span className="font-semibold">Freehold</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Built-up Area</span>
                        <span className="font-semibold">750 sqft</span>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Usage</span>
                        <span className="font-semibold">Residential</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Balcony Size</span>
                        <span className="font-semibold">74 sqft</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Parking Availability
                        </span>
                        <span className="font-semibold">Yes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <AmenitiesSection
                  variant="features"
                  amenities={matchedAmenities}
                />
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:sticky lg:top-20 h-fit">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
                <div className="h-28 bg-[#0166ff]"></div>

                <div className="flex justify-center -mt-12">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                </div>

                <div className="text-center mt-2">
                  <h2 className="font-semibold">Victor Sadygov</h2>
                </div>

                <div className="flex justify-center gap-2 mt-3 flex-wrap px-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded">
                    💎 Quality Lister
                  </span>

                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded">
                    ✨ Responsive Broker
                  </span>
                </div>

                <div className="flex justify-center gap-3 mt-4 px-4">
                  <button className="bg-[#e5f0ff] px-4 py-2 rounded flex justify-center items-center gap-2">
                    <Mail size={18} className="inline text-blue-500" />{" "}
                    <span className="text-blue-500 font-semibold">Email</span>
                  </button>

                  <button
                    className="bg-[#e5f0ff] px-4 py-2 rounded flex justify-center items-center gap-2"
                    onClick={() => {
                      setShowWhatsappModal(true);
                    }}
                  >
                    <Phone size={18} className="inline text-blue-500" />{" "}
                    <span className="text-blue-500 font-semibold">Call</span>
                  </button>

                  <button className="bg-[#e5f0ff] pl-7 pr-7 rounded">
                    <WhatsappSVG />
                  </button>
                </div>

                <div className="flex justify-between p-4 border-t mt-4 text-sm">
                  <span className="text-gray-400">NIHA ESTATE</span>
                  <button className="text-teal-600">
                    View all properties →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page FOOTER */}

        <footer className="relative text-white mt-20 w-full overflow-hidden">
          {/* Background */}
          <div className="bg-gradient-to-br from-[#0166ff] via-[#0153cc] to-[#013a99] py-12 px-6 md:px-16 ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
              {/* Left Section */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <a className="hover:underline cursor-pointer">ABOUT US</a>
                  <span>|</span>
                  <a className="hover:underline cursor-pointer">CAREERS</a>
                  <span>|</span>
                  <a className="hover:underline cursor-pointer">CONTACT US</a>
                </div>

                <p className="text-sm hover:underline cursor-pointer">
                  TERMS & PRIVACY POLICY
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">COUNTRY:</span>
                  <span>🇦🇪 United Arab Emirates</span>
                </div>

                <p className="font-semibold text-white/80 mt-4">
                  © 2026 PropertyXg
                </p>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-start md:items-end gap-6">
                {/* Social Icons */}
                <div className="flex gap-4">
                  <div className="social-icon hover:text-blue-600">
                    <FaFacebookF />
                  </div>

                  <div className="social-icon hover:text-black">
                    <FaXTwitter />
                  </div>

                  <div className="social-icon hover:text-blue-500">
                    <FaLinkedinIn />
                  </div>

                  <div className="social-icon hover:text-pink-500">
                    <FaInstagram />
                  </div>

                  <div className="social-icon hover:text-red-600">
                    <FaYoutube />
                  </div>
                </div>

                {/* App Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <img
                    src="/appstore.png"
                    alt="App Store"
                    className="h-10 object-contain"
                  />

                  <img
                    src="/googleplay.png"
                    alt="Google Play"
                    className="h-10 object-contain"
                  />

                  <img
                    src="/appgallery.png"
                    alt="App Gallery"
                    className="h-10 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll to top */}
          <div>
            <button className="absolute right-6 bottom-6 bg-white text-[#0166ff] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
              ↑
            </button>
          </div>
        </footer>

        {/* Gallery Modal */}
        {/* {<GalleryModal open={openGallery} setOpen={setOpenGallery} />} */}

        {<CallModal open={openWhatsappModal} setOpen={setShowWhatsappModal} />}
      </div>
    </>
  );
}
