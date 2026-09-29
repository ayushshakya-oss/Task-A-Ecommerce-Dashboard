import React from 'react';

const DEFAULT_METHODS = ['VISA', 'Mastercard', 'AMEX', 'Apple Pay'];

interface PaymentMethodBadgesProps {
  methods?: string[];
  description?: string;
  className?: string;
}

export function PaymentMethodBadges({
  methods = DEFAULT_METHODS,
  description = 'Encrypted multi-currency checkout certified by PCI-DSS Level 1.',
  className = '',
}: PaymentMethodBadgesProps) {
  return (
    <div className={`space-y-space-sm ${className}`}>
      <h5 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
        Payment Methods
      </h5>
      <p className="text-xs text-on-surface-variant mb-space-sm">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5 text-on-surface-variant">
        {methods.map((method) => (
          <span
            key={method}
            className="px-2 py-1 bg-surface-container-low rounded text-[10px] font-semibold"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}
