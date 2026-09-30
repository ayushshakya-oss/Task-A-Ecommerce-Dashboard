"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Layers, Sparkles, Package } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { api } from "@/lib/api/client";
import { PromoBanner } from "./PromoBanner";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { HeaderSearchBar } from "./HeaderSearchBar";
import { CartBadgeButton } from "./CartBadgeButton";
import { UserProfileDropdown } from "./UserProfileDropdown";

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
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

  const isNavActive = (href: string) => {
    if (href === "/products") {
      return pathname === "/" || pathname.startsWith("/products");
    }
    return pathname === href;
  };

  const navLinks = [
    { label: "Catalog", href: "/products", icon: LayoutGrid },
    { label: "Categories", href: "/categories", icon: Layers },
    { label: "Deals", href: "/deals", icon: Sparkles },
    { label: "Orders", href: "/orders", icon: Package },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      {/* Top Notification Banner */}
      <PromoBanner />

      {/* Main Navbar Bar */}
      <div className="h-16 min-[425px]:h-20 max-w-7xl mx-auto px-3 min-[425px]:px-6 md:px-margin flex items-center justify-between gap-2 min-[425px]:gap-space-lg">
        {/* Brand & Primary Navigation */}
        <div className="flex items-center gap-space-lg shrink-0">
          <BrandLogo />

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isNavActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-space-md py-space-sm rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-primary-container text-on-primary font-semibold shadow-sm"
                      : "font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      active
                        ? "text-on-primary"
                        : link.label === "Deals"
                          ? "text-amber-500"
                          : "text-on-surface-variant"
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Search Bar with Dynamic Category Selector wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="flex-1 max-w-2xl hidden md:block h-9 bg-surface-container-low rounded-lg animate-pulse" />
          }
        >
          <HeaderSearchBar categories={categories} />
        </Suspense>

        {/* Right Section: Cart Badge & Profile Dropdown */}
        <div className="flex items-center gap-1.5 min-[425px]:gap-space-md shrink-0">
          <CartBadgeButton totalItems={totalItems} mounted={mounted} />
          <UserProfileDropdown />
        </div>
      </div>

      <nav
        aria-label="Mobile and Tablet Navigation"
        className="xl:hidden w-full border-t border-surface-container/60 bg-surface-container-lowest/90 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-3 min-[425px]:px-6 md:px-margin py-2 flex items-center justify-start min-[425px]:justify-center sm:justify-start overflow-x-auto no-scrollbar gap-1.5 min-[425px]:gap-2">
          {navLinks.map((link) => {
            const active = isNavActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                  active
                    ? "bg-primary-container text-on-primary font-semibold shadow-xs"
                    : "font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    active
                      ? "text-on-primary"
                      : link.label === "Deals"
                        ? "text-amber-500"
                        : "text-on-surface-variant"
                  }`}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
