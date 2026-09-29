"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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

  // Dynamic maximum price based on the actual catalog items
  const maxPriceLimit = useMemo(() => {
    if (initialProducts.length === 0) return 1000;
    const highest = Math.max(...initialProducts.map((p) => p.price));
    return Math.ceil(highest / 500) * 500 || 1000;
  }, [initialProducts]);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all",
  );
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const param = searchParams.get("maxPrice");
    return param ? Number(param) : maxPriceLimit;
  });
  const [minRating, setMinRating] = useState<number>(
    Number(searchParams.get("minRating")) || 0,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  // Compute category item counts from initial products
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((product) => {
      const key = product.category.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  // Sync state to URL search params
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentSort) params.set("sort", currentSort);
    if (search.trim()) params.set("search", search.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (maxPrice < maxPriceLimit) params.set("maxPrice", maxPrice.toString());
    if (minRating > 0) params.set("minRating", minRating.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    search,
    selectedCategory,
    maxPrice,
    minRating,
    currentSort,
    pathname,
    router,
  ]);

  // Multi-attribute client-side filtering
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        !search.trim() ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesPrice = product.price <= maxPrice;
      const rate =
        typeof product.rating === "object" && product.rating !== null
          ? product.rating.rate
          : Number(product.rating || 0);
      const matchesRating = rate >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [
    initialProducts,
    search,
    selectedCategory,
    maxPrice,
    maxPriceLimit,
    minRating,
  ]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search.trim()) count++;
    if (selectedCategory !== "all") count++;
    if (maxPrice < maxPriceLimit) count++;
    if (minRating > 0) count++;
    return count;
  }, [search, selectedCategory, maxPrice, minRating]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  const handleSortChange = (newSort: SortOrder) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`);
    if (typeof window !== "undefined" && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setMaxPrice(maxPriceLimit);
    setMinRating(0);
    setCurrentPage(1);
    if (typeof window !== "undefined" && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Sub-Header Status & Breadcrumbs Bar */}
      <div className="w-full bg-surface-container-lowest shadow-sm mb-space-lg border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-margin py-space-md flex flex-wrap items-center justify-between gap-space-md">
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

          <ProductSortDropdown
            currentSort={currentSort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-margin w-full pb-space-xl">
        <div className="flex flex-col lg:flex-row gap-space-xl items-start">
          {/* Reusable Filters Sidebar */}
          <ProductFilters
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            categories={categories}
            categoryCounts={categoryCounts}
            totalProductsCount={initialProducts.length}
            maxPrice={maxPrice}
            onMaxPriceChange={(price) => {
              setMaxPrice(price);
              setCurrentPage(1);
            }}
            minRating={minRating}
            onMinRatingChange={(rating) => {
              setMinRating(rating);
              setCurrentPage(1);
            }}
            activeFiltersCount={activeFiltersCount}
            onResetFilters={handleResetFilters}
          />

          {/* Product Grid & Pagination */}
          <div className="flex-1 w-full flex flex-col gap-space-lg">
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
    </div>
  );
}
