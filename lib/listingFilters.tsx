"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SearchType } from "@/lib/buildListingSearchUrl";

export const CATEGORY_DELIMITER = ".";

export function countSelectedFilters({
  location,
  projectId,
  bedroom,
  bathroom,
  minPrice,
  maxPrice,
  categoryIds,
  amenityIds,
  furnished,
}: {
  location: string;
  projectId: string | null;
  bedroom: string;
  bathroom: string;
  minPrice: string;
  maxPrice: string;
  categoryIds: string[];
  amenityIds: string[];
  furnished: boolean;
}) {
  let count = 0;
  if (location || projectId) count++;
  if (bedroom) count++;
  if (bathroom) count++;
  if (minPrice) count++;
  if (maxPrice) count++;
  count += categoryIds.length;
  count += amenityIds.length;
  if (furnished) count++;
  return count;
}

export function countAgentFilters({
  location,
  projectId,
  agentName,
  language,
  minPrice,
  maxPrice,
  dealType,
}: {
  location: string;
  projectId: string | null;
  agentName: string;
  language: string;
  minPrice: string;
  maxPrice: string;
  dealType: string;
}) {
  let count = 0;
  if (location || projectId) count++;
  if (agentName) count++;
  if (language) count++;
  if (minPrice) count++;
  if (maxPrice) count++;
  if (dealType) count++;
  return count;
}

export const SEARCH_TYPE_OPTIONS = [
  { value: "sale", label: "For sale" },
  { value: "rent", label: "For rent" },
  { value: "agents", label: "Agents" },
] as const;

export const LISTING_SEARCH_TYPE_OPTIONS = [
  { value: "sale", label: "For sale" },
  { value: "rent", label: "For rent" },
] as const;

export function FilterCountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="text-base bg-brand text-white min-w-6 h-6 px-1 rounded-full flex items-center justify-center leading-none font-semibold">
      {count}
    </span>
  );
}

export function SearchTypeRadioGroup({
  idPrefix,
  value,
  onValueChange,
  className,
  options = SEARCH_TYPE_OPTIONS,
}: {
  idPrefix: string;
  value: SearchType;
  onValueChange: (value: SearchType) => void;
  className?: string;
  options?: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onValueChange(v as SearchType)}
      className={
        className ??
        "flex items-center bg-white rounded-full p-1 shadow-sm max-w-sm w-full justify-between gap-1"
      }
    >
      {options.map((option) => (
        <div key={option.value} className="flex-1">
          <RadioGroupItem
            value={option.value}
            id={`${idPrefix}-${option.value}`}
            className="peer sr-only"
          />
          <Label
            htmlFor={`${idPrefix}-${option.value}`}
            className="flex items-center justify-center cursor-pointer text-center text-sm font-medium rounded-full py-1.5 px-3 transition-all text-slate-900 dark:text-slate-100 peer-data-[state=checked]:bg-[#EBE2F9] peer-data-[state=checked]:text-purple-950 hover:bg-slate-50"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
