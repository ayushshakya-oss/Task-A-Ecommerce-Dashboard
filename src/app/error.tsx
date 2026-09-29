'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-margin py-16 bg-background">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-error-container/20 text-error flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h1 className="text-xl font-bold text-on-surface mb-2">
          Something went wrong
        </h1>

        <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
          {error.message ||
            'We encountered an unexpected issue while loading this page. Please try again or return to the catalog.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm active:scale-95"
            type="button"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl text-xs font-semibold transition-all border border-surface-container"
          >
            <Home className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
