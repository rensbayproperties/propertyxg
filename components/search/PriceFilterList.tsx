"use client";
import React, { useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  minPrice: string;
  className?: string;
}

const PriceFilterList = ({
  minPrice,
  maxPrice,
  setMaxPrice,
  setMinPrice,
  className
}: Props) => {
  const handleMinPrice = (value: string) => {
    setMinPrice(value);
  };

  const handleMaxPrice = (value: string) => {
    setMaxPrice(value);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4 items-center">
        <div className="space-y-1">
          {/* <Label htmlFor="min-price">
            Minimum
          </Label> */}
          <Input
            id="min-price"
            value={minPrice ?? ""}
            type="number"
            placeholder="Min Price"
            onChange={(e) => handleMinPrice(e.target.value)}
            className={cn(
              "w-full md:max-w-sm h-9 bg-white",
            )}
          />
        </div>
        <div><i className="bi-dash"></i></div>
        <div className="space-y-1">
          {/* <Label htmlFor="max-price">
            Maximum
          </Label> */}
          <Input
            id="max-price"
            type="number"
            placeholder="Max Price"
            value={maxPrice ?? ""}
            onChange={(e) => handleMaxPrice(e.target.value)}
            className={cn(
              "w-full md:max-w-sm h-9 bg-white",
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilterList;
