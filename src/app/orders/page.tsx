import React from 'react';
import { ComingSoonView } from '@/components/ui/ComingSoonView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Tracking & History',
  description:
    'Live parcel dispatch milestones, tax invoices, and shipment tracking features coming soon to V-STORE.',
  openGraph: {
    title: 'Order Tracking & History | V-STORE',
    description: 'Track your shipments and order history on V-STORE.',
    url: '/orders',
    type: 'website',
  },
  alternates: {
    canonical: '/orders',
  },
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
