'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-container-high/40 ${className}`}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-semibold disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed"
        type="button"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = currentPage === pageNum;
          return (
            <button
              key={idx}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary text-xs font-semibold disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed"
        type="button"
      >
        Next
      </button>
    </div>
  );
}
