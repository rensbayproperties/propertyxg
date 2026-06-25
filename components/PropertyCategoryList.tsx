"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ListingCategory {
  id: string;
  name: string;
  description?: string;
  listingCategoryId?: string | null;
}

interface MainCategory {
  id: string;
  name: string;
  description?: string;
  listingCategories: ListingCategory[];
}

interface PropertyCategoryListProps {
  options: MainCategory[];
  filterValue?: string;
  setFilterValue: (value: string) => void;
  className?: string;
  isLoading?: boolean;
  delimiter?: string;
}

const PropertyCategoryList = ({
  options,
  filterValue,
  setFilterValue,
  className,
  isLoading,
  delimiter = ".",
}: PropertyCategoryListProps) => {
  const [activeTab, setActiveTab] = useState("Residential");
  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    return (
      options?.filter((item) => item.name.toLowerCase() !== "legacy land") || []
    );
  }, [options]);

  const currentTab = useMemo(() => {
    return filteredOptions?.find(
      (item) => item.name.toLowerCase() === activeTab.toLowerCase(),
    );
  }, [activeTab, filteredOptions]);

  const appliedValues = useMemo(() => {
    if (!filterValue) return [];
    return filterValue.split(delimiter).filter(Boolean);
  }, [filterValue, delimiter]);

  const [tempSelected, setTempSelected] = useState<string[]>(appliedValues);

  useEffect(() => {
    if (open) {
      setTempSelected(appliedValues);
    }
  }, [open]);

  const selectedCategories = useMemo(() => {
    return filteredOptions
      ?.flatMap((item) => item.listingCategories)
      ?.filter((item) => tempSelected.includes(item.id));
  }, [tempSelected, filteredOptions]);

  const handleSelect = (id: string) => {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleReset = () => {
    setTempSelected([]);
  };

  const handleDone = () => {
    setFilterValue(tempSelected.join(delimiter));
    setOpen(false);
  };

  return (
    <div>
      {/* <div className="truncate">
        {selectedCategories.length > 0
          ? selectedCategories.length > 2
            ? `${selectedCategories.length} selected`
            : selectedCategories.map((item) => item.name).join(", ")
          : activeTab || "Category"}
      </div> */}

      <div className="border border-input-border rounded-md bg-zinc-50">
        <div className="flex items-center border-b mb-4">
          {filteredOptions?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "flex-1 py-2 px-3 text-sms font-medium transition-all border-b text-left",
                activeTab === tab.name
                  ? "border-zinc-400 text-brand"
                  : "border-transparent",
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="py-4 text-center text-sm">
            Loading categories...
          </div>
        ) : (
          <div className="px-2 pb-2">
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1">
              {currentTab?.listingCategories?.map((item) => {
                const isActive = tempSelected.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={cn(
                      "flex items-center gap-3 border rounded-lg px-3 py-3 transition-all",
                      isActive
                        ? "border-brand bg-brand/10"
                        : "border-input-border hover:border-zinc-500",
                    )}
                  >
                    {/* <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                        isActive ? "border-brand" : "border-gray-300",
                      )}
                    >
                      {isActive && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                      )}
                    </div> */}

                    <div
                      className={cn(
                        "text-sm font-medium leading-none text-center w-full",
                        isActive ? "text-brand" : "",
                      )}
                    >
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* <div className="flex gap-3 mt-5">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1 h-10 rounded-xl border-brand text-brand"
              >
                Reset
              </Button>

              <Button
                type="button"
                onClick={handleDone}
                className="flex-1 h-10 rounded-xl text-white bg-brand hover:bg-brand"
              >
                Done
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCategoryList;
