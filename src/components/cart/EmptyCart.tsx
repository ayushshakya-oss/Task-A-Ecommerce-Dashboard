import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

interface EmptyCartProps {
  className?: string;
}

export function EmptyCart({ className = '' }: EmptyCartProps) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-2xl p-16 text-center border border-surface-container shadow-sm max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-4 text-primary">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h2 className="text-lg font-bold text-on-surface">Your Cart is Empty</h2>
      <p className="text-xs text-on-surface-variant mt-1 mb-6">
        Looks like you haven&apos;t added any products to your cart yet.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center justify-center gap-2 px-space-lg py-2.5 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:bg-primary-container transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Start Shopping
      </Link>
    </div>
  );
}
