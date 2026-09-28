import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/types";

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number = 1) => {
        if (quantity <= 0) return;
        const { items } = get();
        const existingIndex = items.findIndex((item) => item.id === product.id);

        if (existingIndex > -1) {
          const updated = items.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updated });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },

      removeItem: (productId: number) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const total = get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return Number(total.toFixed(2));
      },
    }),
    {
      name: "ecommerce-cart-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
    }
  )
);
