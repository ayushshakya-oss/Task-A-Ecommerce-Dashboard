import React from 'react';

export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Subheader skeleton */}
      <div className="w-full bg-surface-container-lowest shadow-sm mb-space-lg border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-margin py-space-md flex items-center justify-between">
          <div className="h-6 w-48 bg-surface-container-high rounded animate-pulse" />
          <div className="h-8 w-36 bg-surface-container-high rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-margin w-full pb-space-xl">
        <div className="flex flex-col lg:flex-row gap-space-xl items-start">
          {/* Desktop Filter Sidebar Skeleton */}
          <aside className="hidden lg:flex w-[280px] shrink-0 bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex-col gap-space-lg border border-surface-container-high/50">
            <div className="h-6 w-24 bg-surface-container-high rounded animate-pulse" />
            <div className="h-9 w-full bg-surface-container-low rounded-lg animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-5 w-full bg-surface-container-low rounded animate-pulse" />
              ))}
            </div>
            <div className="h-10 w-full bg-surface-container-low rounded-lg animate-pulse" />
          </aside>

          {/* Product Grid Skeleton */}
          <div className="flex-1 min-w-0 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md border border-surface-container-high/40 flex flex-col gap-3"
                >
                  <div className="w-full aspect-square bg-surface-container-low rounded-lg animate-pulse" />
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-surface-container-high rounded animate-pulse" />
                    <div className="h-4 w-14 bg-surface-container-high rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-surface-container-low rounded animate-pulse" />
                  <div className="mt-auto pt-3 flex gap-2">
                    <div className="h-8 w-20 bg-surface-container-low rounded-lg animate-pulse" />
                    <div className="h-8 flex-1 bg-surface-container-high rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
