"use client";

import React, { useEffect, useRef } from "react";

interface RecentSearchDropdownProps {
  recentSearches: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (query: string) => void;
  onClear?: () => void;
  children: React.ReactElement;
}

const RecentSearchDropdown = ({
  recentSearches,
  open,
  onOpenChange,
  onSelect,
  onClear,
  children,
}: RecentSearchDropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  const child = React.Children.only(children);

  const mergedChild = React.cloneElement(child, {
    onFocus: (e: React.FocusEvent) => {
      child.props.onFocus?.(e);
      onOpenChange(true);
    },
    onBlur: (e: React.FocusEvent) => {
      child.props.onBlur?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      child.props.onKeyDown?.(e);
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    },
  });

  const handleClear = () => {
    onClear?.();
    onOpenChange(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {mergedChild}

      {open && recentSearches.length > 0 && (
        <div className="absolute bg-white border mt-1 rounded-xl shadow-lg z-[9999] max-h-80 overflow-auto w-full">
          <div className="flex items-center justify-between px-3 py-2 border-b sticky top-0 bg-white">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Recent searches
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors flex gap-2 items-center"
                aria-label="Close recent searches"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onOpenChange(false)}
              >
                <span className="text-xs bg-zinc-400 text-white px-1">ESC</span>
                <i className="bi-x-lg text-sm" />
              </button>
            </div>
          </div>
          <ul className="p-2">
            {onClear && (
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
              >
                Clear All
              </button>
            )}
            {recentSearches.map((query) => (
              <li
                key={query}
                className="p-3 cursor-pointer hover:bg-gray-100 rounded-lg text-sm transition-all truncate"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(query);
                  onOpenChange(false);
                }}
              >
                {query}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecentSearchDropdown;
