"use client";
import React, { useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Tag } from "lucide-react";
import { Options } from "nuqs";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface Props {
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  minPrice: string;
  className?: string;
}

const PriceFilter = ({
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={clsx('text-base font-normal justify-between', className)}>
          <span className="text-muted-foreground">Price</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-80 w-[50vw] z-[99999]">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="min-price">
                Minimum
              </Label>
              <Input
                id="min-price"
                value={minPrice ?? ""}
                type="number"
                onChange={(e) => handleMinPrice(e.target.value)}
                className={cn(
                  "w-full md:max-w-sm h-9 bg-white",
                )}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="max-price">
                Maximum
              </Label>
              <Input
                id="max-price"
                type="number"
                value={maxPrice ?? ""}
                onChange={(e) => handleMaxPrice(e.target.value)}
                className={cn(
                  "w-full md:max-w-sm h-9 bg-white",
                )}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PriceFilter;
