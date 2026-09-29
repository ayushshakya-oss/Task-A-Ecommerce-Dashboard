import React from 'react';
import { ComingSoonView } from '@/components/ui/ComingSoonView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Tracking Coming Soon | V-STORE',
  description: 'Live order tracking and fulfillment history coming soon.',
};

export default function OrdersPage() {
  return (
    <ComingSoonView
      title="Orders & Tracking"
      subtitle="Track your shipments in real-time, download tax invoices, view parcel dispatch milestones, and manage returns effortlessly."
      iconType="orders"
      eta="Upcoming Sprint"
    />
  );
}
