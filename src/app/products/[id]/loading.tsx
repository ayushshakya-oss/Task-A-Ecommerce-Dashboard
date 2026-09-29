import React from 'react';

export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen bg-background py-6">
      <div className="max-w-7xl mx-auto px-margin w-full">
        {/* Breadcrumb Skeleton */}
        <div className="h-5 w-64 bg-surface-container-high rounded mb-6 animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-start">
          {/* Gallery Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-surface-container-lowest rounded-2xl border border-surface-container flex items-center justify-center p-8">
              <div className="w-3/4 h-3/4 bg-surface-container-low rounded-xl animate-pulse" />
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 bg-surface-container-lowest rounded-xl border border-surface-container animate-pulse" />
              ))}
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-6 sm:p-8 flex flex-col gap-5">
            <div className="h-6 w-28 bg-surface-container-high rounded-full animate-pulse" />
            <div className="h-8 w-4/5 bg-surface-container-high rounded animate-pulse" />
            <div className="h-5 w-40 bg-surface-container-low rounded animate-pulse" />
            <div className="h-10 w-32 bg-surface-container-high rounded animate-pulse" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-surface-container-low rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-surface-container-low rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-surface-container-low rounded animate-pulse" />
            </div>
            <div className="pt-4 flex gap-3">
              <div className="h-11 w-32 bg-surface-container-low rounded-xl animate-pulse" />
              <div className="h-11 flex-1 bg-surface-container-high rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
