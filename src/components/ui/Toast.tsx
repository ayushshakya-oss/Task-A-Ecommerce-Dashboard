'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore, ToastType } from '@/stores/toast-store';

function ToastIcon({ type }: { type?: ToastType }) {
  switch (type) {
    case 'error':
      return <AlertCircle className="w-4 h-4 text-error shrink-0" />;
    case 'info':
      return <Info className="w-4 h-4 text-primary shrink-0" />;
    case 'success':
    default:
      return <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />;
  }
}

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((item) => (
        <div
          key={item.id}
          role="status"
          className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-md border border-surface-container shadow-xl rounded-xl p-3.5 flex items-center gap-3 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <ToastIcon type={item.type} />
          <p className="text-xs font-semibold text-on-surface flex-1 leading-snug">
            {item.message}
          </p>
          <button
            type="button"
            onClick={() => removeToast(item.id)}
            className="text-outline hover:text-on-surface p-1 rounded-md hover:bg-surface-container-low transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
}
