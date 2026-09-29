import type { Metadata } from 'next';
import React from 'react';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo/site-config';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description:
    'Review your chosen products, modify quantities, and proceed through our fast, secure checkout on V-STORE.',
  openGraph: {
    title: `Shopping Cart | ${SITE_CONFIG.name}`,
    description: 'Review your selected items and proceed to checkout.',
    url: `${SITE_URL}/cart`,
    type: 'website',
  },
  alternates: {
    canonical: '/cart',
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
