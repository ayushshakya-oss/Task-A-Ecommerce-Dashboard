"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter } from "lucide-react";
import { Product, SortOrder } from "@/types";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductSortDropdown } from "./ProductSortDropdown";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Pagination } from "@/components/ui/Pagination";

interface Props {
  initialProducts: Product[];
  categories: string[];
  currentSort: SortOrder;
}

export function ProductCatalogView({
  initialProducts,
  categories,
  currentSort,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Dynamic maximum price ceiling based on the actual catalog items
  const maxPriceLimit = useMemo(() => {
    if (initialProducts.length === 0) return 1000;
    const highest = Math.max(...initialProducts.map((p) => p.price));
    return Math.ceil(highest / 500) * 500 || 1000;
  }, [initialProducts]);

  // URL Search Params
  const selectedCategory = searchParams.get("category") || "all";
  const urlSearch = searchParams.get("search") || "";
  const maxPriceParam = searchParams.get("maxPrice");
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : maxPriceLimit;
  const minRating = Number(searchParams.get("minRating")) || 0;

  // Local state for the search input for responsive typing
  const [search, setSearch] = useState(urlSearch);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // Dynamic pageSize: 8 items for <= 1280px, 9 items for > 1280px
  const [pageSize, setPageSize] = useState<number>(9);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, urlSearch, maxPriceParam, minRating, currentSort]);

  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileFiltersOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileFiltersOpen]);

  // mobile drawer auto-close and responsive pageSize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileFiltersOpen(false);
      }
      setPageSize(window.innerWidth <= 1280 ? 8 : 9);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute category item counts from initial products
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((product) => {
      const key = product.category.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  // URL updater  preserves all active query parameters
  const updateUrlParam = (
    updates: Record<string, string | number | null | undefined>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (key === "category" && value === "all") ||
        (key === "minRating" && Number(value) <= 0) ||
        (key === "maxPrice" && Number(value) >= maxPriceLimit)
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    updateUrlParam({ category: cat });
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    updateUrlParam({ search: val.trim() || null });
  };

  const handleMaxPriceChange = (price: number) => {
    updateUrlParam({ maxPrice: price });
  };

  const handleMinRatingChange = (rating: number) => {
    updateUrlParam({ minRating: rating });
  };

  const handleSortChange = (newSort: SortOrder) => {
    updateUrlParam({ sort: newSort });
    if (typeof window !== "undefined" && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    const params = new URLSearchParams();
    if (currentSort) params.set("sort", currentSort);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    if (typeof window !== "undefined" && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Multi-attribute client-side filtering and sorting
  const filteredProducts = useMemo(() => {
    const list = initialProducts.filter((product) => {
      const matchesSearch =
        !search.trim() ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesPrice =
        maxPrice >= maxPriceLimit ? true : product.price <= maxPrice;
      const rate =
        typeof product.rating === "object" && product.rating !== null
          ? product.rating.rate
          : Number(product.rating || 0);
      const matchesRating = rate >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    return [...list].sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      if (currentSort === "desc") {
        return priceB - priceA;
      }
      return priceA - priceB;
    });
  }, [
    initialProducts,
    search,
    selectedCategory,
    maxPrice,
    maxPriceLimit,
    minRating,
    currentSort,
  ]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search.trim()) count++;
    if (selectedCategory !== "all") count++;
    if (maxPrice < maxPriceLimit) count++;
    if (minRating > 0) count++;
    return count;
  }, [search, selectedCategory, maxPrice, maxPriceLimit, minRating]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Ensure currentPage does not exceed totalPages if pageSize changes on screen resize
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  return (
    <div className="w-full">
      {/* Sub-Header Status & Breadcrumbs Bar */}
      <div className="w-full bg-surface-container-lowest shadow-sm mb-space-lg border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-3 min-[400px]:px-4 min-[425px]:px-6 md:px-margin py-space-md flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm text-on-surface-variant">
            <Breadcrumbs items={[{ label: "Products" }]} />
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <div className="inline-flex items-center gap-1 text-xs bg-surface-container px-space-sm py-0.5 rounded-full text-on-surface font-medium">
              <span>Showing</span>
              <span className="font-bold text-primary">
                {filteredProducts.length === 0
                  ? 0
                  : `${(currentPage - 1) * pageSize + 1}–${Math.min(
                      currentPage * pageSize,
                      filteredProducts.length,
                    )}`}
              </span>
              <span>of {filteredProducts.length} items</span>
            </div>
          </div>

          <div className="flex items-center gap-2 min-[400px]:gap-space-sm max-[740px]:w-full max-[740px]:justify-end">
            {/* Filter Drawer Toggle Button for < 1024px */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-1 min-[400px]:gap-1.5 px-2.5 min-[400px]:px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
              type="button"
              aria-label="Open product filters"
            >
              <Filter className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 rounded-full bg-primary text-on-primary text-[9px] min-[400px]:text-[10px] font-bold flex items-center justify-center shrink-0">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <ProductSortDropdown
              currentSort={currentSort}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-margin w-full pb-space-xl">
        <div className="flex flex-col lg:flex-row gap-space-xl items-start">
          {/* Reusable Filters Sidebar */}
          <ProductFilters
            search={search}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
            categoryCounts={categoryCounts}
            totalProductsCount={initialProducts.length}
            maxPrice={maxPrice}
            maxPriceLimit={maxPriceLimit}
            onMaxPriceChange={handleMaxPriceChange}
            minRating={minRating}
            onMinRatingChange={handleMinRatingChange}
            activeFiltersCount={activeFiltersCount}
            onResetFilters={handleResetFilters}
            className="hidden lg:flex"
          />

          {/* Product Grid & Pagination */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-space-lg">
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-xl p-12 text-center border border-surface-container shadow-sm">
                <h4 className="font-semibold text-on-surface text-base">
                  No Products Match Your Criteria
                </h4>
                <p className="text-xs text-outline mt-1.5 max-w-sm mx-auto">
                  Try clearing your search query, increasing maximum price, or
                  adjusting category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-primary-container text-on-primary rounded-lg text-xs font-semibold hover:bg-primary transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide-Over Drawer (< 1024px) */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Filter products"
        >
          {/* Backdrop with fade-in and blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFiltersOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div className="relative w-full max-w-[320px] sm:max-w-sm h-full bg-surface-container-lowest shadow-2xl flex flex-col z-10 overflow-y-auto">
            <ProductFilters
              search={search}
              onSearchChange={handleSearchChange}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categories={categories}
              categoryCounts={categoryCounts}
              totalProductsCount={initialProducts.length}
              maxPrice={maxPrice}
              maxPriceLimit={maxPriceLimit}
              onMaxPriceChange={handleMaxPriceChange}
              minRating={minRating}
              onMinRatingChange={handleMinRatingChange}
              activeFiltersCount={activeFiltersCount}
              onResetFilters={handleResetFilters}
              className="w-full h-full border-none rounded-none shadow-none"
              onClose={() => setIsMobileFiltersOpen(false)}
              resultsCount={filteredProducts.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
