'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/stores/cart-store';
import { RatingStars } from '@/components/ui/RatingStars';
import { QuantityStepper } from '@/components/ui/QuantityStepper';

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const imageUrl = product.image || product.thumbnail || '';
  const rate =
    typeof product.rating === 'object' && product.rating !== null
      ? product.rating.rate
      : Number(product.rating || 0);

  const count =
    typeof product.rating === 'object' && product.rating !== null
      ? product.rating.count
      : product.reviews?.length || 0;

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col p-space-md group relative border border-surface-container-high/40">
      <Link
        className="relative w-full aspect-square bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center p-space-md mb-space-md"
        href={`/products/${product.id}`}
      >
        <span className="absolute top-2 left-2 z-10 text-[11px] leading-[14px] bg-secondary text-on-secondary px-2 py-0.5 rounded font-bold uppercase tracking-wider">
          In Stock
        </span>
        <div className="relative w-full h-full">
          {imageUrl ? (
            <Image
              alt={product.title}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={imageUrl}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-outline text-xs">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] leading-[14px] bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-medium capitalize">
            {product.category}
          </span>
          <RatingStars rate={rate} count={count} size="sm" />
        </div>

        <Link href={`/products/${product.id}`}>
          <h4 className="text-sm font-semibold text-on-surface line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
            {product.title}
          </h4>
        </Link>

        <div className="mt-space-md pt-space-xs flex items-baseline justify-between">
          <div>
            <span className="text-[11px] leading-[14px] text-outline-variant uppercase">
              Price
            </span>
            <div className="text-xl text-on-surface font-bold leading-none">
              ${product.price.toFixed(2)}
            </div>
          </div>
          <span className="text-[11px] text-secondary bg-surface-container px-2 py-0.5 rounded font-semibold">
            Free Express
          </span>
        </div>

        <div className="mt-space-md pt-space-sm flex items-center gap-space-xs">
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            size="sm"
          />

          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 px-space-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all text-xs cursor-pointer ${
              added
                ? 'bg-secondary text-on-secondary'
                : 'bg-primary-container hover:bg-primary text-on-primary'
            }`}
            type="button"
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
