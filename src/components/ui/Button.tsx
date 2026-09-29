import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'surface'
  | 'danger'
  | 'outline'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-container hover:bg-primary text-on-primary shadow-sm hover:shadow active:scale-[0.99]',
  secondary:
    'bg-secondary hover:bg-secondary-fixed-dim text-on-secondary shadow-sm hover:shadow active:scale-[0.99]',
  surface:
    'bg-surface-container hover:bg-surface-container-high text-on-surface active:scale-[0.99]',
  danger:
    'bg-error-container/30 hover:bg-error-container text-error active:scale-[0.99]',
  outline:
    'bg-transparent border border-surface-container text-on-surface hover:bg-surface-container-low active:scale-[0.99]',
  ghost:
    'bg-transparent hover:bg-surface-container-low text-on-surface',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-[11px] font-semibold rounded',
  md: 'px-4 py-2 text-xs font-semibold rounded-lg',
  lg: 'py-3 px-4 text-xs font-semibold rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
