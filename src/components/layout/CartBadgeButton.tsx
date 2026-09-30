"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface CartBadgeButtonProps {
  totalItems: number;
  mounted?: boolean;
  className?: string;
}

export function CartBadgeButton({
  totalItems,
  mounted = true,
  className = "",
}: CartBadgeButtonProps) {
  const count = mounted ? totalItems : 0;
  const hasItems = count > 0;

  return (
    <Link
      className={`group relative flex items-center gap-2 px-3 py-1.5 min-[425px]:py-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface border border-surface-container/70 hover:border-primary/30 shadow-xs hover:shadow-sm transition-all duration-200 shrink-0 ${className}`}
      href="/cart"
      aria-label={`Shopping cart with ${count} items`}
    >
      {/* Icon Container with Floating Badge */}
      <div className="relative flex items-center justify-center">
        <ShoppingBag className="w-4 h-4 text-primary transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3" />

        {/* Floating Notification Badge */}
        <span
          className={`absolute -top-1.5 -right-2 grid place-items-center min-w-4 h-4 px-1 rounded-full text-[9px] font-semibold tabular-nums leading-none transition-all duration-300 ring-2 ring-surface-container-low group-hover:ring-surface-container-high shrink-0 select-none ${
            hasItems
              ? 'bg-gradient-to-tr from-primary via-indigo-600 to-surface-tint text-white shadow-[0_1px_4px_rgba(53,37,205,0.35)] scale-100 group-hover:scale-105'
              : 'bg-surface-container text-on-surface-variant/80 font-medium scale-90'
          }`}
        >
          <span className="flex items-center justify-center text-center leading-none">
            {count}
          </span>
        </span>
      </div>

      <span className="hidden min-[425px]:inline text-xs font-semibold text-on-surface group-hover:text-primary transition-colors pl-1">
        Cart
      </span>
    </Link>
  );
}
