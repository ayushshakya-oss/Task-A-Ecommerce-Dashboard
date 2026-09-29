'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

interface CartBadgeButtonProps {
  totalItems: number;
  mounted?: boolean;
  className?: string;
}

export function CartBadgeButton({
  totalItems,
  mounted = true,
  className = '',
}: CartBadgeButtonProps) {
  return (
    <Link
      className={`relative flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-all ${className}`}
      href="/cart"
    >
      <ShoppingBag className="w-4 h-4 text-primary" />
      <span className="text-xs font-semibold">Cart</span>
      <span className="inline-flex items-center justify-center px-1.5 min-w-[20px] h-5 rounded-full bg-primary text-[11px] text-on-primary font-bold">
        {mounted ? totalItems : 0}
      </span>
    </Link>
  );
}
