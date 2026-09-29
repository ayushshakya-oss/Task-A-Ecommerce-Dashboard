import React from 'react';
import { ComingSoonView } from '@/components/ui/ComingSoonView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories Coming Soon | V-STORE',
  description: 'Explore categorized product collections coming soon.',
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
