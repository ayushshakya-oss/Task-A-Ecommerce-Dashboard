import React from 'react';
import { ComingSoonView } from '@/components/ui/ComingSoonView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flash Deals & Discounts',
  description:
    'Exclusive flash sales, discount coupons, clearance specials, and daily deals coming soon to V-STORE.',
  openGraph: {
    title: 'Flash Deals & Discounts | V-STORE',
    description: 'Exclusive flash sales, discount coupons, and daily deals coming soon.',
    url: '/deals',
    type: 'website',
  },
  alternates: {
    canonical: '/deals',
  },
};

export default function DealsPage() {
  return (
    <ComingSoonView
      title="Flash Deals & Offers"
      subtitle="Limited-time promotions, bundle savings, exclusive holiday coupons, and personalized discounts will be available right here."
      iconType="deals"
      eta="Upcoming Sprint"
    />
  );
}
