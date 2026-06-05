"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FilterBoxProps {
  title: string;
  options: FilterOption[];
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  delimiter?: string;
  className?: string;
}

export function DataTableFilterBox({
  title,
  options,
  filterValue,
  setFilterValue,
  isLoading,
  delimiter = ".",
  className,
}: FilterBoxProps) {
  const selectedValuesSet = React.useMemo(() => {
    if (!filterValue) return new Set<string>();
    return new Set(filterValue.split(delimiter).filter(Boolean));
  }, [filterValue, delimiter]);

  const handleSelect = (value: string) => {
    const newSet = new Set(selectedValuesSet);

    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }

    setFilterValue(Array.from(newSet).join(delimiter));
  };

  const resetFilter = () => setFilterValue("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <span className="text-xs">{title}</span>

          {selectedValuesSet.size > 0 && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="secondary" className="rounded-sm font-normal">
                {selectedValuesSet.size}
              </Badge>
            </>
          )}

          <i className="bi-chevron-down" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0 z-[99999]" align="start">
        {isLoading ? (
          <div className="p-2 text-sm">Loading...</div>
        ) : (
          <Command>
            <CommandInput placeholder={title} />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                {options.map((option, i) => (
                  <CommandItem
                    key={`lang_opt_${i}`}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValuesSet.has(option.value)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>

                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}

                    <span>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              {selectedValuesSet.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={resetFilter}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}