"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
  onCheckout?: () => void;
  className?: string;
}

export function CartSummary({
  subtotal,
  shipping,
  tax,
  orderTotal,
  onCheckout,
  className = "",
}: CartSummaryProps) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-space-lg space-y-space-md ${className}`}
    >
      <h2 className="text-sm font-bold text-on-surface">Order Summary</h2>

      <div className="space-y-2 text-xs text-on-surface-variant border-b border-surface-container pb-space-md">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-on-surface">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-secondary">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-on-surface">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex justify-between text-base font-extrabold text-on-surface">
        <span>Total</span>
        <span className="text-primary">${orderTotal.toFixed(2)}</span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="w-full py-3 bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <CheckCircle2 className="w-4 h-4" /> Proceed to Checkout
      </button>
    </div>
  );
}
