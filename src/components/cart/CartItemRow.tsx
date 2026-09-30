'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { QuantityStepper } from '@/components/ui/QuantityStepper';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  className?: string;
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  className = '',
}: CartItemRowProps) {
  const img = item.image || item.thumbnail || '';

  return (
    <div
      className={`p-3 sm:p-space-lg flex gap-3 sm:gap-space-md sm:items-center ${className}`}
    >
      {/* Product Image Thumbnail */}
      <div className="relative w-20 h-20 bg-surface-container-low rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-surface-container self-start sm:self-auto">
        {img ? (
          <Image
            src={img}
            alt={item.title}
            fill
            sizes="80px"
            className="object-contain"
          />
        ) : (
          <span className="text-[10px] text-outline">No image</span>
        )}
      </div>

      {/* Content Area: Horizontal grid / flex on mobile & single row on desktop */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-space-md justify-between">
        {/* Info Header: Category, Title, Price, and Mobile Trash */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block text-[10px] bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="text-xs sm:text-sm font-semibold text-on-surface line-clamp-1 mt-1">
                {item.title}
              </h3>
            </div>

            {/* Mobile Remove Button */}
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="sm:hidden text-outline hover:text-error transition-colors p-1 rounded-lg hover:bg-error-container/20 cursor-pointer shrink-0"
              aria-label={`Remove ${item.title} from cart`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-on-surface-variant font-medium mt-0.5">
            ${item.price.toFixed(2)} each
          </div>
        </div>

        {/* Stepper, Total, and Desktop Remove Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-space-md mt-1 sm:mt-0 pt-2 sm:pt-0 border-t border-surface-container/50 sm:border-t-0">
          {/* Quantity Stepper */}
          <QuantityStepper
            value={item.quantity}
            onChange={(newQ) => onUpdateQuantity(item.id, newQ)}
            min={1}
            size="sm"
          />

          {/* Item Total */}
          <div className="text-right shrink-0 min-w-[70px]">
            <div className="text-[10px] text-on-surface-variant font-medium sm:hidden">
              Total
            </div>
            <div className="text-sm font-bold text-on-surface">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>

          {/* Desktop Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="hidden sm:inline-flex text-outline hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error-container/20 cursor-pointer shrink-0"
            aria-label={`Remove ${item.title} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
