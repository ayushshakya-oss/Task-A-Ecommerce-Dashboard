'use client';

import React from 'react';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'sm',
  className = '',
}: QuantityStepperProps) {
  const isSm = size === 'sm';
  const btnSize = isSm ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm';
  const textWidth = isSm ? 'w-8 text-sm' : 'w-12 text-sm';

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={`flex items-center bg-surface-container-low rounded-lg p-0.5 shrink-0 ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className={`${btnSize} flex items-center justify-center rounded bg-surface-container-lowest text-on-surface font-semibold hover:bg-surface-container transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className={`${textWidth} text-center text-on-surface font-bold`}>
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className={`${btnSize} flex items-center justify-center rounded bg-surface-container-lowest text-on-surface font-semibold hover:bg-surface-container transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
