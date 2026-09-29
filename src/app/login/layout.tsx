import type { Metadata } from 'next';
import React from 'react';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo/site-config';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your V-STORE account to track orders, manage your profile, and access exclusive member deals.',
  openGraph: {
    title: `Sign In | ${SITE_CONFIG.name}`,
    description: 'Sign in to access your V-STORE account and orders.',
    url: `${SITE_URL}/login`,
    type: 'website',
  },
  alternates: {
    canonical: '/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
