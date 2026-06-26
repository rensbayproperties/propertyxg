"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import clsx from "clsx";

interface Props {
  setBaths: React.Dispatch<React.SetStateAction<string>>;
  setBeds: React.Dispatch<React.SetStateAction<string>>;
  baths: string;
  beds: string;
  className?: string;
}

const ExtraFilterList = ({
  beds,
  baths,
  setBaths,
  setBeds,
  className,
}: Props) => {
  return (
    <div className="">
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">

          {/* Beds */}
          <div className="space-y-2">
            <Label htmlFor="beds">
              Beds
            </Label>

            <BedroomBathroomSelect
              value={beds}
              onUpdate={setBeds}
              options={["studio", "0", "1", "2", "3", "4", "5", "6", "7", "8"]}
            />
          </div>

          {/* Baths */}
          <div className="space-y-2">
            <Label htmlFor="baths">
              Baths
            </Label>

            <BedroomBathroomSelect
              value={baths}
              onUpdate={setBaths}
              options={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const BedroomBathroomSelect = ({
  value,
  onUpdate,
  options,
}: {
  value: string;
  onUpdate: (value: string) => void;
  options: string[];
}) => {
  return (
    <div className="relative">
      <Select onValueChange={onUpdate} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent className="z-[99999]">
          {options.map((s) => (
            <SelectItem value={s} key={s} className="capitalize">
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExtraFilterList;