"use client";

import Image from "next/image";
import { Info } from "lucide-react";
import Container from "./Container";

type ListingProjectShowcaseProps = {
  title: string;
  category: string;
  status: string;
  developer: string;

  launchPrice: string;
  paymentPlan: string;
  handover: string;

  description: string;

  mainImage: string;
  topImage: string;
  bottomImage: string;

  onRegisterInterest?: () => void;
};

export default function ListingProjectShowcase({
  title,
  category,
  status,
  developer,
  launchPrice,
  paymentPlan,
  handover,
  description,
  mainImage,
  topImage,
  bottomImage,
  onRegisterInterest,
}: ListingProjectShowcaseProps) {
  return (
    <Container>
      <div className="grid grid-cols-1 border lg:grid-cols-[50%_50%] gap-4 bg-gray-50 rounded-2xl p-4 mx-auto overflow-hidden">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between min-w-0">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
              {title}
            </h1>

            <p className="text-base mt-1">{category}</p>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="bg-[#7e3af2] text-white text-xs font-semibold px-3 py-1 rounded-md">
                {status}
              </span>

              <span className="text-sm">•</span>

              <p className="text-sm">
                By <span className="font-semibold">{developer}</span>
              </p>
            </div>
          </div>

          {/* INFO CARD */}
          <div className="bg-white rounded-xl border mt-4 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3">
              {/* PRICE */}
              <div className="p-3 border-r">
                <p className="opacity-80 text-xs">Launch Price</p>

                <h3 className="text-xl font-bold mt-1 text-[#111827]">
                  {launchPrice}
                </h3>

                <button className="text-gray-500 font-semibold text-xs mt-2 hover:underline">
                  View unit types
                </button>
              </div>

              {/* PAYMENT */}
              <div className="p-3 border-r">
                <p className="opacity-80 text-xs">Payment Plan</p>

                <div className="flex items-center gap-1 mt-1">
                  <h3 className="text-xl font-bold text-[#111827]">
                    {paymentPlan}
                  </h3>

                  <Info size={13} className="text-gray-400" />
                </div>

                <button className="text-gray-500 font-semibold text-xs mt-2 hover:underline">
                  View complete plan
                </button>
              </div>

              {/* HANDOVER */}
              <div className="p-3">
                <p className="opacity-80 text-xs">Handover</p>

                <h3 className="text-xl font-bold mt-1 text-[#111827]">
                  {handover}
                </h3>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t px-4 py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-500">
                <i className="bi bi-person-heart text-sm"></i>

                <p className="font-medium text-xs">
                  Express your interest in this project
                </p>
              </div>

              <button
                onClick={onRegisterInterest}
                className="bg-brand hover:bg-blue-600 transition-all text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
              >
                <i className="bi bi-whatsapp text-sm"></i>
                Register Interest
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">
            <p className="text-sm leading-7 text-gray-700 line-clamp-4">
              {description}
            </p>

            <button className="mt-2 text-gray-500 font-semibold text-sm hover:underline">
              Read more
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[95%]">
          <div className="grid grid-cols-[60%_40%] gap-3 h-full min-w-0">
            {/* MAIN IMAGE */}
            <div className="relative h-full w-full rounded-xl overflow-hidden">
              <Image
                src={mainImage}
                alt={title}
                fill
                className="object-cover"
                sizes="100%"
              />
            </div>

            {/* SIDE IMAGES */}
            <div className="grid grid-rows-2 gap-3 h-full">
              <div className="relative h-full w-full rounded-xl overflow-hidden">
                <Image
                  src={topImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="100%"
                />
              </div>

              <div className="relative h-full w-full rounded-xl overflow-hidden">
                <Image
                  src={bottomImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
