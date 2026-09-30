'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  User as UserIcon,
  Package,
  Heart,
  LogOut,
  ShieldCheck,
  LogIn,
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from '@/stores/toast-store';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Badge } from '@/components/ui/Badge';
import { DropdownMenuItem } from './DropdownMenuItem';

export function UserProfileDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    toast.info('You have signed out successfully.');
    router.push('/products');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-surface-container-highest animate-pulse" />
    );
  }

  // Not authenticated: Show Sign In button
  if (!isAuthenticated || !user) {
    return (
      <Link href="/login" className="shrink-0">
        <Button
          variant="surface"
          size="md"
          className="px-2.5 min-[425px]:px-4 py-1.5 min-[425px]:py-2 text-[11px] min-[425px]:text-xs gap-1.5 min-[425px]:gap-2 whitespace-nowrap"
          leftIcon={<LogIn className="w-3.5 h-3.5 text-primary shrink-0" />}
        >
          <span>Sign In</span>
        </Button>
      </Link>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 min-[425px]:gap-2 pl-2 min-[425px]:pl-space-sm p-1.5 rounded-lg hover:bg-surface-container-low transition-all cursor-pointer text-left"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserAvatar
          src={user.image}
          name={fullName}
          size="sm"
          ringColor="ring-primary/20"
        />
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs font-semibold text-on-surface leading-tight truncate max-w-[100px]">
            {user.firstName}
          </span>
          <span className="text-[10px] text-secondary font-medium">Signed In</span>
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
            <UserAvatar
              src={user.image}
              name={fullName}
              size="md"
              ringColor="ring-2 ring-primary-fixed"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface truncate">
                  {fullName}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-secondary shrink-0" />
              </div>
              <p className="text-[11px] text-on-surface-variant truncate">
                {user.email}
              </p>
              <Badge variant="surface" className="mt-1">
                @{user.username}
              </Badge>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5 text-xs">
            <DropdownMenuItem
              href="/profile"
              icon={<UserIcon className="w-4 h-4" />}
              label="My Profile"
              onClick={() => setIsOpen(false)}
            />

            <DropdownMenuItem
              href="/cart"
              icon={<Package className="w-4 h-4" />}
              label="Shopping Cart"
              onClick={() => setIsOpen(false)}
            />

            <DropdownMenuItem
              href="/products"
              icon={<Heart className="w-4 h-4" />}
              label="Browse Catalog"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="h-px bg-surface-container my-1.5" />

          {/* Sign Out Action */}
          <DropdownMenuItem
            icon={<LogOut className="w-4 h-4" />}
            label="Sign Out"
            onClick={handleLogout}
            isDanger
          />
        </div>
      )}
    </div>
  );
}
