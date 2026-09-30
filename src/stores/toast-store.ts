'use client';

import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const timerMap = new Map<string, NodeJS.Timeout>();

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message: string, type: ToastType = 'success', duration = 3500) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const effectiveDuration = typeof duration === 'number' ? duration : 3500;

    set((state) => ({
      // Keep up to 5 most recent toasts to prevent unbounded stacking
      toasts: [...state.toasts.slice(-4), { id, message, type, duration: effectiveDuration }],
    }));

    if (effectiveDuration > 0) {
      const timer = setTimeout(() => {
        timerMap.delete(id);
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, effectiveDuration);
      timerMap.set(id, timer);
    }
  },
  removeToast: (id: string) => {
    const timer = timerMap.get(id);
    if (timer) {
      clearTimeout(timer);
      timerMap.delete(id);
    }
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  clearAll: () => {
    timerMap.forEach((timer) => clearTimeout(timer));
    timerMap.clear();
    set({ toasts: [] });
  },
}));

export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'success', duration),
  error: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'error', duration),
  info: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'info', duration),
};

if (typeof window !== 'undefined') {
  (window as unknown as { toast?: typeof toast }).toast = toast;
}
