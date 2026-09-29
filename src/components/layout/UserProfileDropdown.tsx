'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 pl-space-sm p-1.5 rounded-lg hover:bg-surface-container-low transition-all cursor-pointer text-left"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-bold text-primary shrink-0 ring-1 ring-primary/20">
          AM
        </div>
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs font-semibold text-on-surface leading-tight">
            Alex M.
          </span>
          <span className="text-[10px] text-on-surface-variant">Verified Buyer</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Flyout Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
          {/* User Info Header */}
          <div className="p-3 bg-surface-container-low rounded-lg mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-on-primary shrink-0">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface truncate">
                  Alex Mitchell
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-secondary shrink-0" />
              </div>
              <p className="text-[11px] text-on-surface-variant truncate">
                alex.m@example.com
              </p>
              <span className="inline-block mt-1 text-[10px] font-semibold text-secondary bg-surface-container px-1.5 py-0.2 rounded">
                Verified Buyer
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5 text-xs">
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-medium"
            >
              <User className="w-4 h-4 text-outline" />
              <span>My Profile</span>
            </Link>

            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-medium"
            >
              <Package className="w-4 h-4 text-outline" />
              <span>Orders & Tracking</span>
            </Link>

            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-medium"
            >
              <Heart className="w-4 h-4 text-outline" />
              <span>Wishlist</span>
            </Link>

            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-medium"
            >
              <Settings className="w-4 h-4 text-outline" />
              <span>Account Settings</span>
            </Link>
          </div>

          <div className="h-px bg-surface-container my-1.5" />

          {/* Sign Out Action */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              // placeholder sign-out handler
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-error hover:bg-error-container/20 transition-colors text-xs font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
