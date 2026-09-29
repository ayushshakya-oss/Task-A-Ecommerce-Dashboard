"use client";

import React, { useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import { SortOrder } from "@/types";

interface ProductSortDropdownProps {
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  className?: string;
}

export function ProductSortDropdown({
  currentSort,
  onSortChange,
  className = "",
}: ProductSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (sort: SortOrder) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-space-sm bg-surface-container-low hover:bg-surface-container px-space-md py-space-sm rounded-lg text-xs text-on-surface font-medium transition-all shadow-sm cursor-pointer"
        type="button"
      >
        <span className="text-on-surface-variant">Sort by:</span>
        <span className="font-semibold text-primary capitalize">
          {currentSort === "asc"
            ? "Price / ID (Ascending)"
            : "Price / ID (Descending)"}
        </span>
        <ArrowUpDown className="w-3.5 h-3.5 text-outline" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-space-xs w-56 rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container z-30 p-1">
          <button
            onClick={() => handleSelect("asc")}
            className="w-full text-left px-space-md py-2 rounded-lg text-xs hover:bg-surface-container-low text-on-surface font-semibold flex items-center justify-between cursor-pointer"
            type="button"
          >
            Ascending
            {currentSort === "asc" && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </button>
          <button
            onClick={() => handleSelect("desc")}
            className="w-full text-left px-space-md py-2 rounded-lg text-xs hover:bg-surface-container-low text-on-surface font-semibold flex items-center justify-between cursor-pointer"
            type="button"
          >
            Descending
            {currentSort === "desc" && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
