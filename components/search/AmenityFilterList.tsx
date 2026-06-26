"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Amenity {
  id: string | number;
  name: string;
  icon?: string;
}

interface AmenityFilterListProps {
  options: Amenity[];
  value: string[];
  onChange: (ids: string[]) => void;
  isLoading?: boolean;
}

const RenderIcon = ({ icon }: { icon?: string }) => {
  const iconClass = icon?.startsWith("bi-")
    ? icon
    : icon
      ? `bi-${icon}`
      : "bi-building";
  return <i className={`bi ${iconClass} text-3xl shrink-0`} />;
};

const INITIAL_VISIBLE_COUNT = 12;

const AmenityFilterList = ({
  options,
  value,
  onChange,
  isLoading,
}: AmenityFilterListProps) => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return options;
    return options.filter((item) => item.name.toLowerCase().includes(query));
  }, [options, searchQuery]);

  const visibleOptions =
    searchQuery.trim() || showAll
      ? filteredOptions
      : filteredOptions.slice(0, INITIAL_VISIBLE_COUNT);

  const remainingCount = filteredOptions.length - INITIAL_VISIBLE_COUNT;

  const handleSelect = (id: string) => {
    onChange(
      value.includes(id) ? value.filter((item) => item !== id) : [...value, id],
    );
  };

  return (
    <div className="border border-input-border rounded-md bg-zinc-200">
      {isLoading ? (
        <div className="py-4 text-center text-sm">Loading amenities...</div>
      ) : (
        <div className="px-2 pb-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search amenities..."
            className="bg-white h-9 mt-2"
          />
          {visibleOptions.length === 0 ? (
            <div className="py-4 text-center text-sm text-muted-foreground">
              No amenities found.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 pt-2">
              {visibleOptions.map((item) => {
                const id = String(item.id);
                const isActive = value.includes(id);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelect(id)}
                    className={cn(
                      "flex flex-col justify-center items-center gap-3 border rounded-lg px-3 py-3 transition-all bg-white opacity-90",
                      isActive
                        ? "border-brand bg-brand/10"
                        : "border-input-border hover:border-zinc-500",
                    )}
                  >
                    <RenderIcon icon={item.icon} />
                    <div
                      className={cn(
                        "text-sm leading-tight line-clamp-1",
                        isActive ? "text-brand" : "",
                      )}
                    >
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {!searchQuery.trim() &&
            filteredOptions.length > INITIAL_VISIBLE_COUNT &&
            !showAll && (
              <Button
                type="button"
                variant="ghost"
                className="w-full mt-3 text-sm text-brand"
                onClick={() => setShowAll(true)}
              >
                Show more ({remainingCount} remaining)
              </Button>
            )}
        </div>
      )}
    </div>
  );
};

export default AmenityFilterList;
