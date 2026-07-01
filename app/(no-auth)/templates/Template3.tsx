"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Mail, Phone, Share } from "lucide-react";
import ShareModal from "@/components/modal/ShareModal";
import ImageCarousel from "@/components/ImageCarousel";
import { WhatsappSVG, ShareSVG } from "@/components/icons";
import fivestars from "@/public/assets/images/5stars.png";
import ExpandableContent from "@/components/ExpandableContent";
import { AmenitiesDiv } from "@/components/AmenitiesDiv";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import GalleryModal from "@/components/modal/gallerymodal";
import { CallModal } from "@/components/modal/ContactModal";
import { AmenitiesDivtwo } from "@/components/AmenitiesDivtwo";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { Button } from "@/components/ui/button";

function Template3() {
  const [share, openShare] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const campaigns = [
    { id: 1, name: "Gazebo" },
    { id: 2, name: "Pool" },
    { id: 3, name: "Gazebo" },
    { id: 4, name: "Pool" },
    { id: 5, name: "Gazebo" },
    { id: 6, name: "Pool" },
    { id: 7, name: "Gazebo" },
    { id: 8, name: "Pool" },
    { id: 9, name: "Gazebo" },
    { id: 10, name: "Pool" },
    { id: 11, name: "Gazebo" },
    { id: 12, name: "Pool" },
    { id: 13, name: "Gazebo" },
    { id: 14, name: "Pool" },
    { id: 15, name: "Gazebo" },
    { id: 16, name: "Pool" },
    { id: 17, name: "Gazebo" },
    { id: 18, name: "Pool" },
  ];

  return (
    <>
      <div className="w-full h-fit overflow-hidden">
        <div className="w-full h-fit flex flex-col items-center mt-4 ">
          <div className="w-[87%] h-[530px]">
            <ImageCarousel variant="single" />
          </div>

          <div className="w-[87%] h-fit grid grid-cols-1 lg:grid-cols-[65%_35%] gap-5 mt-5">
            {/* Left Section */}
            <div className="w-full  h-full max-sm:order-2">
              <div className="flex flex-col gap-y-3">
                <p className="text-xl sm:text-lg">
                  1 bedroom Apartment Nas3 Off-Plan
                </p>

                <p>
                  <span className="text-2xl sm:text-3xl font-bold text-blue-500">
                    AED
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold ml-3">
                    2,300,489
                  </span>
                </p>

                <p className="flex flex-wrap gap-2 text-sm sm:text-base md:text-sm font-medium">
                  <span>OFF PLAN</span>
                  <span>|</span>
                  <span>FURNISHED</span>
                  <span>|</span>
                  <span>FULLY EXTENDED</span>
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border mt-4">
                <div className="flex gap-3 justify-between">
                  <span>🛁 3 Beds</span>
                  <span>🛁 4 Baths</span>
                  <span>⬜ 2,217 sqft</span>
                </div>
              </div>

              <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border ">
                <ExpandableContent
                  content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nisi voluptate veritatis odit commodi maxime iure sint est itaque possimus? Facilis commodi id inventore sunt eveniet, possimus nisi! Nostrum cum vel accusantium voluptatem voluptate esse tempora? Aspernatur, tempora est. Nam explicabo iure aperiam ducimus enim fuga quis architecto beatae quisquam necessitatibus culpa labore veniam, esse ex facere ullam natus ad atque possimus qui! Sit, sint quaerat, adipisci dolorem saepe eveniet veritatis quae voluptatum numquam sapiente vel sed officiis consequuntur reiciendis totam libero explicabo perferendis minima tempora doloremque quibusdam cum, ab ut? Impedit consequatur praesentium rerum voluptate suscipit nihil inventore expedita.`}
                />
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border mt-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-6">
                  Property Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="opacity-60">Type</span>
                      <span className="font-semibold">Apartment</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="opacity-60">Purpose</span>
                      <span className="font-semibold">For Sale</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="opacity-60">Reference no.</span>
                      <span className="font-semibold text-right">
                        Bayut - 101526-iLiLpGh
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-60">Completion</span>
                      <span className="font-semibold">Off-Plan</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="opacity-60">Furnishing</span>
                      <span className="font-semibold">Furnished</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="opacity-60">TruCheck™ on</span>
                      <span className="font-semibold">6 March 2026</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="opacity-60">Added on</span>
                      <span className="font-semibold">6 March 2026</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-60">Handover date</span>
                      <span className="font-semibold">Q1 2028</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border mt-6">
                <AmenitiesSection variant="double" amenities={campaigns} />
              </div>

              {/* Property Info */}
              <div className="space-y-8 mt-8">
                {/* Validated Info */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Validated Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="opacity-60">Developer</span>
                        <span className="font-semibold text-right">
                          DUBAI HILLS ESTATE L.L.C
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="opacity-60">Ownership</span>
                        <span className="font-semibold">Freehold</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="opacity-60">Built-up Area</span>
                        <span className="font-semibold">750 sqft</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="opacity-60">Usage</span>
                        <span className="font-semibold">Residential</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="opacity-60">Balcony Size</span>
                        <span className="font-semibold">74 sqft</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="opacity-60">Parking Availability</span>
                        <span className="font-semibold">Yes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border mt-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-6">
                    Regulatory Information
                  </h2>

                  <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="opacity-60">Permit number</span>
                        <span className="font-semibold">71536969958</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="opacity-60">Registered Agency</span>
                        <span className="font-semibold text-right">
                          NIKA ESTATE HOMES PROPERTIES
                        </span>
                      </div>

                      <div className="flex justify-between border-b">
                        <span className="opacity-60">RERA</span>
                        <span className="font-semibold">29893</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-b">
                      <span className="opacity-60">BRN</span>
                      <span className="font-semibold">53092</span>
                    </div>

                    <div className="flex justify-between pb-2">
                      <span className="opacity-60">Zonal name</span>
                      <span className="font-semibold">
                        Hadaeq Sheikh Mohammed Bin Rashid
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full flex flex-col gap-y-5 max-sm:order-1">
              <div className="w-full h-auto rounded-[10px]  border p-5 flex flex-col gap-y-5">
                <div className="flex gap-x-5">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white"
                  />

                  <div className="pt-3 sm:pt-5">
                    <p className="text-lg sm:text-[18px] font-semibold">
                      JOHN DAVE LANGMAN
                    </p>
                    <p>Senior Sales Agent</p>
                    <img src={fivestars.src} alt="" />
                  </div>
                </div>

                <div className="w-full h-auto flex flex-col sm:flex-row gap-3">
                  <button className="w-full sm:w-[48%] h-[50px] bg-[#e5f0ff] rounded-[5px] flex items-center justify-center gap-x-2">
                    <WhatsappSVG />
                    <span className="text-blue-500 text-[15px] font-semibold">
                      Whatsapp
                    </span>
                  </button>

                  <button className="w-full sm:w-[48%] h-[50px] bg-[#e5f0ff] rounded-[5px] flex items-center justify-center gap-x-2">
                    <Mail size={18} className="inline text-blue-500" />
                    <span className="text-blue-500 font-semibold">
                      Send a Message
                    </span>
                  </button>
                </div>

                <button className="w-full h-[50px] rounded-[5px] bg-[#e5f0ff]">
                  <Phone size={18} className="inline text-blue-500" />
                  <span className="text-blue-500 font-semibold ml-2">
                    Let's Talk Via Phone
                  </span>
                </button>

                <div className="w-full text-center text-sm opacity-70">
                  <p>Quick Responses in 5 minutes</p>
                </div>
              </div>

              <div className="card space-y-3">
                <div className="text-lg font-bold text-blue-700">
                  WANT A CLOSER LOOK?
                </div>

                <p className="">
                  Schedule a guided walkthrough and get a feel for the layout,
                  features, and surroundings. discover the space, its flow, and
                  its unique details with a dedicated expert guiding you through
                  each highlight
                </p>

                <Button className=" w-full" variant={"brand"}>
                  <Phone size={18} className="inline text-white" />
                  <span className="text-white font-semibold ml-2">
                    Book an In-person Tour
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative text-white w-full mt-4">
          <div className="bg-gradient-to-br from-[#0166ff] via-[#0153cc] to-[#013a99] py-12 px-6 md:px-16 ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
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

              <div className="flex flex-col items-start md:items-end gap-6">
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

          <div>
            <button className="absolute right-6 bottom-6 bg-white text-[#0166ff] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
              ↑
            </button>
          </div>
        </footer>
      </div>

      {/* {<GalleryModal open={openGallery} setOpen={setOpenGallery} />} */}

      {<ShareModal open={share} setOpen={openShare} />}

      {<CallModal open={openCall} setOpen={setOpenCall} />}
    </>
  );
}

export default Template3;
