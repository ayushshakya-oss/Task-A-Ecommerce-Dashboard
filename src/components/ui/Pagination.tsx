'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
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

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div
      className={`bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-wrap items-center justify-between gap-space-md border border-surface-container-high/40 ${className}`}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-semibold disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
        type="button"
      >
        Previous
      </button>

      <div className="flex items-center gap-1 flex-wrap justify-center mx-auto sm:mx-0">
        {pages.map((page, idx) => {
          if (typeof page === 'string') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-xs text-outline font-bold select-none"
              >
                ...
              </span>
            );
          }

          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary text-xs font-semibold disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
        type="button"
      >
        Next
      </button>
    </div>
  );
}
