'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { toast } from '@/stores/toast-store';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummary } from '@/components/cart/CartSummary';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems());
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClearCart = () => {
    clearCart();
    toast.info('All items cleared from your cart');
  };

  const handleRemoveItem = (id: number) => {
    const itemToRemove = items.find((i) => i.id === id);
    removeItem(id);
    toast.info(
      itemToRemove
        ? `Removed "${itemToRemove.title}" from cart`
        : 'Item removed from cart'
    );
  };

  const handleCheckout = () => {
    toast.success(`Proceeding to checkout! Total: $${orderTotal.toFixed(2)}`);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-margin text-center text-on-surface-variant text-sm">
          Loading cart...
        </div>
      </main>
    );
  }

  const subtotal = getTotalPrice;
  const shipping = subtotal > 100 || items.length === 0 ? 0 : 9.99;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const orderTotal = Number((subtotal + shipping + tax).toFixed(2));

  return (
    <main className="min-h-screen bg-background py-space-lg">
      <div className="max-w-7xl mx-auto px-4 min-[425px]:px-6 md:px-margin w-full">
        {/* Cart Page Header */}
        <div className="flex items-center justify-between mb-space-lg">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Review and manage your selected items
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              type="button"
              className="text-xs text-error hover:bg-error-container/20 px-3 py-1.5 rounded-lg transition-all font-medium cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
              <div className="divide-y divide-surface-container">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Cart Footer Actions */}
              <div className="p-space-md bg-surface-container-low border-t border-surface-container flex items-center justify-between">
                <Link
                  href="/products"
                  className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
                </Link>
                <span className="text-xs text-on-surface-variant">
                  {getTotalItems} items in cart
                </span>
              </div>
            </div>

            {/* Cart Order Summary Sidebar */}
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              orderTotal={orderTotal}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </main>
  );
}
