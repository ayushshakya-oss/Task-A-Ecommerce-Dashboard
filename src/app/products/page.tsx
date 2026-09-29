import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/lib/api/client";
import { SortOrder } from "@/types";
import { ProductCatalogView } from "@/components/products/ProductCatalogView";
import { SITE_CONFIG, SITE_URL } from "@/lib/seo/site-config";
import {
  JsonLd,
  generateBreadcrumbJsonLd,
  generateItemListJsonLd,
} from "@/lib/seo/json-ld";

interface PageProps {
  searchParams: Promise<{
    sort?: SortOrder;
    category?: string;
    search?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category, search } = await searchParams;

  let pageTitle = "Product Catalog";
  let pageDesc =
    "Explore our complete catalog of trending electronics, modern apparel, home decor, and beauty essentials on V-STORE.";

  if (category && category !== "all") {
    const formattedCat =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");
    pageTitle = `${formattedCat} Collection`;
    pageDesc = `Shop top-rated ${formattedCat.toLowerCase()} items at competitive prices with fast express shipping on V-STORE.`;
  } else if (search && search.trim()) {
    pageTitle = `Search Results for "${search.trim()}"`;
    pageDesc = `Discover matching products for "${search.trim()}" with user reviews, price filtering, and exclusive offers.`;
  }

  const canonicalUrl = category && category !== "all"
    ? `/products?category=${encodeURIComponent(category.toLowerCase())}`
    : "/products";

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: `${pageTitle} | ${SITE_CONFIG.name}`,
      description: pageDesc,
      url: `${SITE_URL}${canonicalUrl}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${SITE_CONFIG.name}`,
      description: pageDesc,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const sort = resolvedParams.sort === "desc" ? "desc" : "asc";

  const [products, categories] = await Promise.all([
    api.getProducts(sort),
    api.getCategories(),
  ]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);
  const itemListJsonLd = generateItemListJsonLd(products);

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-margin py-12 text-center text-on-surface-variant text-sm">
            Loading products...
          </div>
        }
      >
        <ProductCatalogView
          categories={categories}
          currentSort={sort}
          initialProducts={products}
        />
      </Suspense>
    </main>
  );
}
