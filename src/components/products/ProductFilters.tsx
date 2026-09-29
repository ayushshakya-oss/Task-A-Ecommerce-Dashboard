'use client';

import React from 'react';
import { Search, Filter, RotateCcw, Star } from 'lucide-react';

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  categoryCounts: Record<string, number>;
  totalProductsCount: number;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  activeFiltersCount: number;
  onResetFilters: () => void;
  className?: string;
}

export function ProductFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  categoryCounts,
  totalProductsCount,
  maxPrice,
  onMaxPriceChange,
  minRating,
  onMinRatingChange,
  activeFiltersCount,
  onResetFilters,
  className = '',
}: ProductFiltersProps) {
  const scrollToTopIfNeeded = () => {
    if (typeof window !== 'undefined' && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    scrollToTopIfNeeded();
  };

  const handleCategorySelect = (category: string) => {
    if (category !== selectedCategory) {
      onCategoryChange(category);
      scrollToTopIfNeeded();
    }
  };

  const handlePriceChange = (price: number) => {
    onMaxPriceChange(price);
    scrollToTopIfNeeded();
  };

  const handleRatingSelect = (rating: number) => {
    if (rating !== minRating) {
      onMinRatingChange(rating);
      scrollToTopIfNeeded();
    }
  };

  const handleReset = () => {
    onResetFilters();
    scrollToTopIfNeeded();
  };

  return (
    <aside
      className={`w-full lg:w-[280px] shrink-0 bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-lg border border-surface-container-high/50 ${className}`}
    >
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-on-surface">Filters</h3>
        </div>
        <span className="text-[11px] bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-semibold">
          Active: {activeFiltersCount}
        </span>
      </div>

      {/* Filter Search Input */}
      <div className="relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-2">
        <Search className="w-4 h-4 text-outline mr-2 shrink-0" />
        <input
          className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
          placeholder="Search products..."
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Section: Categories Checklist */}
      <div className="flex flex-col gap-space-sm">
        <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
          Category
        </span>
        <div className="space-y-1">
          <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === 'all'}
                onChange={() => handleCategorySelect('all')}
                className="accent-primary cursor-pointer"
              />
              <span className="text-xs text-on-surface font-medium group-hover:text-primary transition-colors">
                All Categories
              </span>
            </div>
            <span className="text-[11px] bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-bold">
              {totalProductsCount}
            </span>
          </label>

          {categories.map((cat) => {
            const count = categoryCounts[cat.toLowerCase()] ?? 0;
            return (
              <label
                key={cat}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                    onChange={() => handleCategorySelect(cat)}
                    className="accent-primary cursor-pointer"
                  />
                  <span className="text-xs capitalize text-on-surface-variant group-hover:text-on-surface font-medium transition-colors">
                    {cat}
                  </span>
                </div>
                {count > 0 && (
                  <span className="text-[11px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-surface-container"></div>

      {/* Section: Price Range Filter */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
            Price Range
          </span>
          <span className="text-xs text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-md">
            Up to ${maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
          <span>$10</span>
          <span>$1000</span>
        </div>
      </div>

      <div className="h-px bg-surface-container"></div>

      {/* Section: Rating Filter */}
      <div className="flex flex-col gap-space-sm">
        <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">
          Minimum Rating
        </span>
        <div className="space-y-1">
          <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={minRating === 4}
              onChange={() => handleRatingSelect(4)}
              className="accent-primary cursor-pointer"
            />
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs text-on-surface font-semibold">& above</span>
          </label>

          <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={minRating === 3}
              onChange={() => handleRatingSelect(3)}
              className="accent-primary cursor-pointer"
            />
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs text-on-surface-variant font-medium">& above</span>
          </label>

          <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => handleRatingSelect(0)}
              className="accent-primary cursor-pointer"
            />
            <span className="text-xs text-on-surface-variant font-medium">All Ratings</span>
          </label>
        </div>
      </div>

      <div className="h-px bg-surface-container"></div>

      {/* Clear / Reset Filter Action */}
      <button
        onClick={handleReset}
        className="w-full py-2 flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-error text-xs font-medium rounded-lg hover:bg-error-container/20 transition-all cursor-pointer"
        type="button"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>
    </aside>
  );
}
