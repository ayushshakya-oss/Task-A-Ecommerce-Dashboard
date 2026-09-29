import React from 'react';
import { ComingSoonView } from '@/components/ui/ComingSoonView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category Directory',
  description:
    'Explore curated product collections, hierarchical tagging, and category directories coming soon on V-STORE.',
  openGraph: {
    title: 'Category Directory | V-STORE',
    description: 'Explore curated product collections and category directories on V-STORE.',
    url: '/categories',
    type: 'website',
  },
  alternates: {
    canonical: '/categories',
  },
};

export default function CategoriesPage() {
  return (
    <ComingSoonView
      title="Category Directory"
      subtitle="A curated deep-dive visual category directory with hierarchical tagging, multi-level filters, and curated collection spotlights."
      iconType="categories"
      eta="v1.1 Release"
    />
  );
}
