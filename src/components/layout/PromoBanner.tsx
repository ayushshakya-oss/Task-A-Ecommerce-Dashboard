import React from 'react';
import Link from 'next/link';

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
    <div className={`bg-surface-container-low py-space-xs px-margin ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
        <span>
          Flash Sale: Up to {discount} off high-performance hardware & accessories with code{' '}
          <strong className="text-primary font-semibold">{code}</strong>
        </span>
        <div className="hidden sm:flex items-center gap-space-lg">
          <Link className="hover:text-on-surface transition-colors" href="#">
            Track Order
          </Link>
          <Link className="hover:text-on-surface transition-colors" href="#">
            Support 24/7
          </Link>
          <span className="text-outline-variant">|</span>
          <span>USD ($)</span>
        </div>
      </div>
    </div>
  );
}
