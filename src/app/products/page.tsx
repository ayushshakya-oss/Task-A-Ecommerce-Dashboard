import { Suspense } from 'react';
import { api } from '@/lib/api/client';
import { SortOrder } from '@/types';
import { ProductCatalogView } from '@/components/products/ProductCatalogView';

interface PageProps {
  searchParams: Promise<{
    sort?: SortOrder;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const sort = resolvedParams.sort === 'desc' ? 'desc' : 'asc';

  const [products, categories] = await Promise.all([
    api.getProducts(sort),
    api.getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-background pt-6">
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
