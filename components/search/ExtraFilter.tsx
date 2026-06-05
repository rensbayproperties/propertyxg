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

interface Props {
  setBaths: React.Dispatch<React.SetStateAction<string>>;
  setBeds: React.Dispatch<React.SetStateAction<string>>;
  baths: string;
  beds: string;
  className?: string;
}

const ExtraFilter = ({
  beds,
  baths,
  setBaths,
  setBeds,
  className,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <span className="text-muted-foreground">Bed / Bath</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="md:w-80 w-[50vw] z-[99999]">
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Beds */}
            <div className="space-y-1">
              <Label htmlFor="beds" className="mb-1">
                Beds
              </Label>

              <BedroomBathroomSelect
                value={beds}
                onUpdate={setBeds}
                options={["studio", "0", "1", "2", "3", "4", "5", "6", "7", "8"]}
              />
            </div>

            {/* Baths */}
            <div className="space-y-1">
              <Label htmlFor="baths" className="mb-1">
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
      </PopoverContent>
    </Popover>
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
    <div className="relative z-[99999999]">
      <Select onValueChange={onUpdate} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent className="z-[999999999]">
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

export default ExtraFilter;