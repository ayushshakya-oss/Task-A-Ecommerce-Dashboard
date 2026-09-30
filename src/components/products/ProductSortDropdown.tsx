"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (sort: SortOrder) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left shrink-0 ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-1.5 min-[400px]:gap-space-sm bg-surface-container-low hover:bg-surface-container px-2.5 min-[400px]:px-space-md py-1.5 min-[400px]:py-space-sm rounded-lg text-xs text-on-surface font-medium transition-all shadow-sm cursor-pointer whitespace-nowrap"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Under 400px*/}
        <span className="min-[400px]:hidden flex items-center gap-1">
          <span className="text-on-surface-variant">Sort:</span>
          <span className="font-semibold text-primary">
            Price {currentSort === "asc" ? "↑" : "↓"}
          </span>
        </span>

        {/* 400px and above*/}
        <span className="hidden min-[400px]:inline-flex items-center gap-1.5">
          <span className="text-on-surface-variant">Sort by:</span>
          <span className="font-semibold text-primary">
            {currentSort === "asc" ? "Price (Ascending)" : "Price (Descending)"}
          </span>
          <ArrowUpDown className="w-3.5 h-3.5 text-outline shrink-0 ml-0.5" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-space-xs w-48 min-[400px]:w-56 rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container z-30 p-1">
          <button
            onClick={() => handleSelect("asc")}
            className="w-full text-left px-3 min-[400px]:px-space-md py-2 rounded-lg text-xs hover:bg-surface-container-low text-on-surface font-semibold flex items-center justify-between cursor-pointer"
            type="button"
          >
            <span>Price: Low to High</span>
            {currentSort === "asc" && (
              <Check className="w-4 h-4 text-primary shrink-0" />
            )}
          </button>
          <button
            onClick={() => handleSelect("desc")}
            className="w-full text-left px-3 min-[400px]:px-space-md py-2 rounded-lg text-xs hover:bg-surface-container-low text-on-surface font-semibold flex items-center justify-between cursor-pointer"
            type="button"
          >
            <span>Price: High to Low</span>
            {currentSort === "desc" && (
              <Check className="w-4 h-4 text-primary shrink-0" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
