'use client';

import React from 'react';
import { Search, ChevronDown, Command } from 'lucide-react';

interface HeaderSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categories: string[];
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export function HeaderSearchBar({
  search,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categories,
  onSubmit,
  className = '',
}: HeaderSearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex-1 max-w-2xl hidden md:flex items-center gap-space-sm ${className}`}
    >
      <div className="relative flex-1 flex items-center bg-surface-container-low rounded-lg px-space-md py-2 focus-within:ring-2 focus-within:ring-surface-tint/20 transition-all border border-transparent focus-within:border-primary/20">
        <Search className="w-4 h-4 text-outline mr-2 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products, brands, categories..."
          className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
        />
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-on-surface-variant bg-surface-container-highest shrink-0">
          <Command className="w-3 h-3" />K
        </kbd>
      </div>

      {/* Styled Dynamic Category Selector */}
      <div className="relative shrink-0">
        <select
          value={selectedCategory}
          onChange={(e) => onCategorySelect(e.target.value)}
          className="appearance-none bg-surface-container-low text-xs text-on-surface-variant font-medium py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-surface-tint/20 hover:text-on-surface cursor-pointer max-w-[170px] truncate border border-transparent hover:border-surface-container transition-all"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
              className="capitalize bg-surface-container-lowest text-on-surface"
            >
              {cat.replace(/-/g, ' ')}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-outline absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </form>
  );
}
