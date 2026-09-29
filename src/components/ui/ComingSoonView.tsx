'use client';

import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Bell,
  Clock,
  Layers,
  Flame,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { toast } from '@/stores/toast-store';

export interface ComingSoonViewProps {
  title: string;
  subtitle?: string;
  iconType?: 'categories' | 'deals' | 'orders' | 'default';
  eta?: string;
}

export function ComingSoonView({
  title,
  subtitle,
  iconType = 'default',
  eta = 'v1.1 Release',
}: ComingSoonViewProps) {
  const getIcon = () => {
    switch (iconType) {
      case 'categories':
        return <Layers className="w-8 h-8 text-primary" />;
      case 'deals':
        return <Flame className="w-8 h-8 text-secondary" />;
      case 'orders':
        return <Package className="w-8 h-8 text-primary" />;
      default:
        return <Rocket className="w-8 h-8 text-primary" />;
    }
  };

  const defaultSubtitle =
    subtitle ||
    `We are actively crafting the ${title.toLowerCase()} experience to bring you advanced tooling, automated tracking, and exclusive perks.`;

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center py-space-xl px-margin relative overflow-hidden bg-background">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-fixed/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl w-full mx-auto text-center relative z-10">
        <div className="mb-space-md flex justify-center">
          <Breadcrumbs
            items={[
              { label: 'Catalog', href: '/products' },
              { label: title },
            ]}
          />
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-space-lg md:p-space-xl flex flex-col items-center">
          {/* Animated Icon Container */}
          <div className="w-16 h-16 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-center mb-space-md shadow-inner relative group">
            {getIcon()}
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-secondary rounded-full animate-ping pointer-events-none" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-secondary rounded-full pointer-events-none" />
          </div>

          <Badge variant="surface" dot className="mb-space-xs">
            In Active Development
          </Badge>

          <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mt-2">
            {title} Coming Soon
          </h1>

          <p className="text-xs md:text-sm text-on-surface-variant max-w-md mt-space-xs leading-relaxed">
            {defaultSubtitle}
          </p>

          <div className="mt-space-md p-3 bg-surface-container-low rounded-xl border border-surface-container w-full max-w-sm flex items-center justify-between text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Target Schedule
            </span>
            <span className="font-semibold text-on-surface">{eta}</span>
          </div>

          <div className="mt-space-lg flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-sm">
            <Link href="/products" className="w-full">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Browse Catalog
              </Button>
            </Link>

            <Button
              variant="surface"
              size="md"
              className="w-full"
              leftIcon={<Bell className="w-4 h-4" />}
              onClick={() => {
                toast.success(`You will be notified when ${title} launches!`);
              }}
            >
              Notify Me
            </Button>
          </div>
        </div>

        <div className="mt-space-md flex items-center justify-center gap-6 text-[11px] text-on-surface-variant font-medium">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Enterprise Ready
          </span>
          <span>·</span>
          <span>DummyJSON API Integration</span>
        </div>
      </div>
    </main>
  );
}
