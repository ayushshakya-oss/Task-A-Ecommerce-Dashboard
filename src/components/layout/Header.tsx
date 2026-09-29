'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { api } from '@/lib/api/client';
import { PromoBanner } from './PromoBanner';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { HeaderSearchBar } from './HeaderSearchBar';
import { CartBadgeButton } from './CartBadgeButton';
import { UserProfileDropdown } from './UserProfileDropdown';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
    api
      .getCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data.slice(0, 20));
        }
      })
      .catch(() => {});
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (headerSearch.trim()) params.set('search', headerSearch.trim());
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    router.push(`/products?${params.toString()}`);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (headerSearch.trim()) params.set('search', headerSearch.trim());
    if (category !== 'all') params.set('category', category);
    router.push(`/products?${params.toString()}`);
  };

  const isNavActive = (href: string) => {
    if (href === '/products') {
      return pathname === '/' || pathname.startsWith('/products');
    }
    return pathname === href;
  };

  const navLinks = [
    { label: 'Catalog', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Deals', href: '/deals' },
    { label: 'Orders', href: '/orders' },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      {/* Top Notification Banner */}
      <PromoBanner />

      {/* Main Navbar Bar */}
      <div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between gap-space-lg">
        {/* Brand & Primary Navigation */}
        <div className="flex items-center gap-space-lg shrink-0">
          <BrandLogo />

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isNavActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-space-md py-space-sm rounded-lg text-xs transition-all ${
                    active
                      ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                      : 'font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Search Bar with Dynamic Category Selector */}
        <HeaderSearchBar
          search={headerSearch}
          onSearchChange={setHeaderSearch}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          categories={categories}
          onSubmit={handleSearchSubmit}
        />

        {/* Right Section: Cart Badge & Profile Dropdown */}
        <div className="flex items-center gap-space-md shrink-0">
          <CartBadgeButton totalItems={totalItems} mounted={mounted} />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}
