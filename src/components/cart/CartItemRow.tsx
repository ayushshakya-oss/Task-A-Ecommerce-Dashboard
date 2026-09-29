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
      className={`p-space-md sm:p-space-lg flex flex-col sm:flex-row items-center gap-space-md ${className}`}
    >
      <div className="relative w-20 h-20 bg-surface-container-low rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-surface-container">
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

      <div className="flex-1 w-full text-center sm:text-left">
        <span className="text-[10px] bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-semibold uppercase">
          {item.category}
        </span>
        <h3 className="text-xs sm:text-sm font-semibold text-on-surface line-clamp-1 mt-1">
          {item.title}
        </h3>
        <div className="text-xs text-on-surface-variant font-medium mt-0.5">
          ${item.price.toFixed(2)} each
        </div>
      </div>

      {/* Quantity Stepper */}
      <QuantityStepper
        value={item.quantity}
        onChange={(newQ) => onUpdateQuantity(item.id, newQ)}
        min={1}
        size="sm"
      />

      {/* Item Total */}
      <div className="text-right shrink-0 min-w-[70px]">
        <div className="text-sm font-bold text-on-surface">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="text-outline hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error-container/20 cursor-pointer"
        aria-label={`Remove ${item.title} from cart`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
