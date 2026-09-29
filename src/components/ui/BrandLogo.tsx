import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md';
  href?: string;
  className?: string;
}

export function BrandLogo({
  size = 'md',
  href = '/products',
  className = '',
}: BrandLogoProps) {
  const isSm = size === 'sm';
  const boxClass = isSm
    ? 'w-6 h-6 rounded-md text-xs'
    : 'w-8 h-8 rounded-lg text-sm shadow-xs';
  const textClass = isSm
    ? 'text-base font-bold'
    : 'text-lg font-bold tracking-tight';

  const content = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`${boxClass} bg-primary flex items-center justify-center text-on-primary font-black shrink-0`}
      >
        V
      </div>
      <span className={`${textClass} text-primary`}>V-STORE</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
