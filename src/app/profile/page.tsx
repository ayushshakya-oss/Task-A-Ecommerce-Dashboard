'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User as UserIcon,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  CreditCard,
  Coins,
  Shield,
  LogOut,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { toast } from '@/stores/toast-store';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Badge } from '@/components/ui/Badge';
import { DataSectionCard } from '@/components/profile/DataSectionCard';

export default function ProfilePage() {
  const router = useRouter();
  const { user, fullUser, isAuthenticated, logout, fetchFullProfile } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      fetchFullProfile();
    }
  }, [isAuthenticated, fetchFullProfile]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-background py-space-xl px-margin flex items-center justify-center">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-space-xl text-center">
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4 text-outline">
            <UserIcon className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-on-surface">Sign In Required</h2>
          <p className="text-xs text-on-surface-variant mt-2 mb-6">
            You need to be logged in to view your user profile and account details.
          </p>
          <Link href="/login">
            <Button variant="primary" size="md">
              Sign In with Demo Account
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Display either the rich full user profile data or fallback to login response
  const profile = fullUser || {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    gender: user.gender,
    image: user.image,
    role: 'admin',
  };

  const fullName = `${profile.firstName} ${profile.lastName}`;

  const handleLogout = () => {
    logout();
    toast.info('You have logged out.');
    router.push('/products');
  };

  return (
    <main className="min-h-screen bg-background py-space-lg px-margin pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Breadcrumbs */}
        <div className="mb-space-lg flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Products', href: '/products' },
              { label: 'User Profile' },
            ]}
          />
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-container transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>

        {/* User Hero Banner */}
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-space-lg md:p-space-xl relative overflow-hidden mb-space-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-space-lg justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-space-md text-center sm:text-left">
              <UserAvatar
                src={profile.image}
                name={fullName}
                size="xl"
                showOnlineBadge
                ringColor="ring-4 ring-primary-fixed"
                className="shadow-md"
              />

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-xl md:text-2xl font-bold text-on-surface">
                    {fullName}
                  </h1>
                  <Badge variant="primary">{profile.role || 'Member'}</Badge>
                  <Badge
                    variant="secondary"
                    icon={<CheckCircle className="w-3 h-3 text-secondary" />}
                  >
                    Verified
                  </Badge>
                </div>

                <p className="text-xs text-on-surface-variant font-medium">
                  @{profile.username} · ID: #{profile.id}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    {profile.email}
                  </span>
                  {profile.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-secondary" />
                      {profile.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="danger"
                size="md"
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed User Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {/* Card 1: Personal Details */}
          <DataSectionCard
            title="Personal Information"
            icon={<UserIcon className="w-4 h-4" />}
            accentColor="primary"
            items={[
              { label: 'Gender', value: profile.gender || 'N/A', valueClassName: 'capitalize' },
              { label: 'Age', value: profile.age ? `${profile.age} years` : 'N/A' },
              { label: 'Birth Date', value: profile.birthDate || 'N/A' },
              { label: 'Blood Group', value: profile.bloodGroup || 'N/A' },
              {
                label: 'Height / Weight',
                value: `${profile.height ? `${profile.height} cm` : '—'} / ${profile.weight ? `${profile.weight} kg` : '—'}`,
              },
              {
                label: 'Eye & Hair',
                value: `${profile.eyeColor || '—'} Eyes · ${profile.hair?.color || ''} ${profile.hair?.type || ''}`,
              },
            ]}
          />

          {/* Card 2: Company & Employment */}
          <DataSectionCard
            title="Company & Education"
            icon={<Briefcase className="w-4 h-4" />}
            accentColor="primary"
            items={[
              {
                label: 'Company',
                value: profile.company?.name || 'Dooley, Kozey and Cronin',
                valueClassName: 'truncate max-w-[180px]',
              },
              {
                label: 'Job Title',
                value: profile.company?.title || 'Sales Manager',
                valueClassName: 'text-primary',
              },
              { label: 'Department', value: profile.company?.department || 'Engineering' },
              {
                label: 'University',
                value: profile.university || 'University of Wisconsin--Madison',
                valueClassName: 'truncate max-w-[180px]',
              },
              {
                label: 'Work Location',
                value: `${profile.company?.address?.city || 'San Francisco'}, ${profile.company?.address?.state || 'WI'}`,
              },
            ]}
          />

          {/* Card 3: Address & Location */}
          <DataSectionCard
            title="Shipping Address"
            icon={<MapPin className="w-4 h-4" />}
            accentColor="secondary"
            items={[
              { label: 'Street Address', value: profile.address?.address || '626 Main Street' },
              {
                label: 'City, State',
                value: `${profile.address?.city || 'Phoenix'}, ${profile.address?.state || 'Mississippi'}`,
              },
              { label: 'Postal Code', value: profile.address?.postalCode || '29112' },
              { label: 'Country', value: profile.address?.country || 'United States' },
              {
                label: 'Coordinates',
                isMono: true,
                value: profile.address?.coordinates
                  ? `${profile.address.coordinates.lat.toFixed(2)}, ${profile.address.coordinates.lng.toFixed(2)}`
                  : 'N/A',
              },
            ]}
          />

          {/* Card 4: Financial & Card Info */}
          <DataSectionCard
            title="Payment & Banking"
            icon={<CreditCard className="w-4 h-4" />}
            accentColor="primary"
            items={[
              { label: 'Card Type', value: profile.bank?.cardType || 'Elo' },
              {
                label: 'Card Number',
                isMono: true,
                value: `•••• •••• •••• ${profile.bank?.cardNumber ? profile.bank.cardNumber.slice(-4) : '815'}`,
              },
              { label: 'Expires', value: profile.bank?.cardExpire || '03/26' },
              { label: 'Currency', value: profile.bank?.currency || 'USD' },
              {
                label: 'IBAN',
                isMono: true,
                value: profile.bank?.iban || 'YPUXISOBI7TTHPK2BR3HAIXL',
                valueClassName: 'truncate max-w-[160px]',
              },
            ]}
          />

          {/* Card 5: Crypto Assets */}
          <DataSectionCard
            title="Crypto Wallet"
            icon={<Coins className="w-4 h-4" />}
            accentColor="secondary"
            items={[
              {
                label: 'Coin',
                value: profile.crypto?.coin || 'Bitcoin',
                valueClassName: 'text-secondary',
              },
              { label: 'Network', value: profile.crypto?.network || 'Ethereum (ERC20)' },
              {
                label: 'Wallet Address',
                fullWidth: true,
                value: profile.crypto?.wallet || '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
              },
            ]}
          />

          {/* Card 6: Account Security & Metadata */}
          <DataSectionCard
            title="Security & Session"
            icon={<Shield className="w-4 h-4" />}
            accentColor="primary"
            items={[
              {
                label: 'Role',
                value: profile.role || 'Admin',
                valueClassName: 'text-primary capitalize',
              },
              { label: 'IP Address', isMono: true, value: profile.ip || '42.48.100.32' },
              { label: 'MAC Address', isMono: true, value: profile.macAddress || '47:fa:41:18:ec:eb' },
              {
                label: 'EIN / SSN',
                isMono: true,
                value: `${profile.ein || '977-175'} / •••-••-0289`,
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
