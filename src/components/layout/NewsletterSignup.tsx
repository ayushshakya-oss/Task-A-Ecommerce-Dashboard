'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className={`bg-surface-container-low py-space-xl px-margin ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div>
          <h4 className="text-sm font-semibold text-on-surface">
            Join the V-STORE Insider Club
          </h4>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Get priority access to drops, member-only pricing, and digital tech receipts.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex w-full md:w-auto items-center gap-space-sm"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full md:w-80 px-space-md py-2 rounded-lg bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-surface-tint/20 border border-surface-container"
          />
          <button
            type="submit"
            className="px-space-lg py-2 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            {subscribed ? (
              <>
                <Check className="w-3.5 h-3.5" /> Subscribed
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
