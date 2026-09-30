import React from 'react';

interface PromoBannerProps {
  code?: string;
  discount?: string;
  className?: string;
}

export function PromoBanner({
  code = 'VSTORE40',
  discount = '40%',
  className = '',
}: PromoBannerProps) {
  return (
    <div
      className={`bg-surface-container-low py-1.5 px-4 min-[800px]:px-margin border-b border-surface-container/40 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center text-[11px] text-on-surface-variant font-medium">
        <span>
          Flash Sale: Up to {discount} off{' '}
          <span className="hidden sm:inline">
            high-performance hardware &amp; accessories{' '}
          </span>
          with code{' '}
          <strong className="text-primary font-semibold tracking-wide bg-primary/10 px-1.5 py-0.5 rounded text-[10px] ml-0.5">
            {code}
          </strong>
        </span>
      </div>
    </div>
  );
}

