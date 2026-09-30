'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore, ToastType } from '@/stores/toast-store';

function ToastIcon({ type }: { type?: ToastType }) {
  switch (type) {
    case 'error':
      return (
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/60 text-error flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
      );
    case 'info':
      return (
        <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
          <Info className="w-4 h-4" />
        </div>
      );
    case 'success':
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-secondary flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      );
  }
}

export function Toaster() {
  const [mounted, setMounted] = useState(false);
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-5 right-4 sm:right-6 z-[99999] flex flex-col gap-2.5 max-w-[calc(100vw-2rem)] sm:max-w-md w-full pointer-events-none"
    >
      {toasts.map((item) => (
        <div
          key={item.id}
          role="status"
          className="pointer-events-auto bg-surface-container-lowest text-on-surface border border-surface-container-high shadow-2xl rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 animate-toast backdrop-blur-md"
        >
          <ToastIcon type={item.type} />
          <p className="text-xs sm:text-sm font-medium text-on-surface flex-1 leading-snug">
            {item.message}
          </p>
          <button
            type="button"
            onClick={() => removeToast(item.id)}
            className="text-outline hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </aside>
  );
}
