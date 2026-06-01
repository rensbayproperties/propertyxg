"use client";

import React from "react";
import Image from "next/image";
import { Bath, Bed, MapPin, Maximize, Square } from "lucide-react";
import Link from "next/link";
import SearchPropertyCardSkeleton from "./SearchPropertyCardSkeleton";
import { formatMoney } from "@/lib/utils";

export const SearchPropertyCard = ({ property }: any) => {
  const images = property?.images?.map((img: any) => img.url) || [];
  return (
    <Link href={`/search/${property.id}`}>
      <div className="w-[160px] overflow-hidden rounded-md bg-white shadow-sm border">
        {/* Image */}
        <div className="relative h-[100px] w-full">
          <Image
            src={images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-2">
          {/* Price */}
          <p className="text-[14px] font-semibold text-gray-900">
            {formatMoney(property?.price)}
          </p>

          {/* Location */}
          <p className="mt-1 text-[11px] text-gray-500 line-clamp-1">
            {property?.location?.name}
          </p>

          <p className="mt-1 text-[11px] text-gray-500 line-clamp-1">
            {property?.category?.name}
          </p>

          {/* Features */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-600 gap-2">
            <div className="flex items-center gap-1">
              <Bed size={12} />
              <span>{property?.property_bedroom}</span>
            </div>

            <div className="flex items-center gap-1">
              <Bath size={12} />
              <span>{property?.property_bathroom}</span>
            </div>

            <div className="flex items-center gap-1">
              <Maximize size={12} />
              <span>{property?.property_size?.toLocaleString() + " sqft"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
