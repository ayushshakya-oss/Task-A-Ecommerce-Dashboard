import React from 'react';
import { ComingSoonView } from '@/components/ui/ComingSoonView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deals & Discounts Coming Soon | V-STORE',
  description: 'Exclusive flash sales, discount coupons, and daily deals coming soon.',
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
