import React from 'react';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'surface'
  | 'success'
  | 'error'
  | 'outline';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-fixed text-on-primary-fixed-variant',
  secondary: 'bg-secondary-fixed/40 text-on-secondary-fixed-variant',
  surface: 'bg-surface-container text-primary',
  success: 'bg-secondary text-on-secondary',
  error: 'bg-error-container text-on-error-container',
  outline: 'border border-surface-container-high text-on-surface-variant',
};

export function Badge({
  children,
  variant = 'primary',
  dot = false,
  pulse = false,
  icon,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider select-none ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full bg-secondary ${
            pulse ? 'animate-pulse' : ''
          }`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
