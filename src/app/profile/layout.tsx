import type { Metadata } from 'next';
import React from 'react';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo/site-config';

export const metadata: Metadata = {
  title: 'My Profile & Account',
  description:
    'Manage your profile details, shipping addresses, company info, and bank details on V-STORE.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `User Profile | ${SITE_CONFIG.name}`,
    description: 'Manage your personal account settings on V-STORE.',
    url: `${SITE_URL}/profile`,
    type: 'website',
  },
  alternates: {
    canonical: '/profile',
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
