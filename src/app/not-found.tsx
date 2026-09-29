import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-margin py-16 bg-background">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center font-black text-2xl">
          404
        </div>

        <h1 className="text-xl font-bold text-on-surface mb-2">
          Page Not Found
        </h1>

        <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
          The product, category, or page you were looking for does not exist or has been moved to a new location.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl text-xs font-semibold transition-all border border-surface-container"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
