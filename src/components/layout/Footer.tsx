import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { NewsletterSignup } from './NewsletterSignup';
import { PaymentMethodBadges } from './PaymentMethodBadges';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Shopping & Catalog',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Categories', href: '/products' },
      { label: 'Daily Deals & Bundles', href: '#' },
      { label: 'Order History', href: '#' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Returns & Warranties', href: '#' },
      { label: 'Shipping Rates & Policies', href: '#' },
      { label: 'Security & Fraud Shield', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] mt-space-xl border-t border-surface-container">
      {/* Newsletter Signup Header */}
      <NewsletterSignup />

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-margin py-space-xl grid grid-cols-2 md:grid-cols-4 gap-space-xl">
        {/* Brand Information Column */}
        <div className="space-y-space-md">
          <BrandLogo size="sm" />
          <p className="text-xs leading-relaxed text-on-surface-variant">
            Enterprise digital marketplace curated for high-velocity commerce and next-gen retail enthusiasts.
          </p>
        </div>

        {/* Dynamic Navigation Columns */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-space-sm">
            <h5 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              {section.title}
            </h5>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-on-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Payment Methods Badges */}
        <PaymentMethodBadges />
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto px-margin py-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant text-xs border-t border-surface-container">
        <p>© 2026 V-STORE Commerce Global Inc. All rights reserved.</p>
        <div className="flex items-center gap-space-lg">
          <Link className="hover:text-on-surface transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-on-surface transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="hover:text-on-surface transition-colors" href="#">
            System Status
          </Link>
        </div>
      </div>
    </footer>
  );
}
