import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rate: number;
  count?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
  countLabel?: string;
  className?: string;
}

export function RatingStars({
  rate,
  count,
  size = 'sm',
  showCount = true,
  countLabel,
  className = '',
}: RatingStarsProps) {
  const isSm = size === 'sm';
  const iconSize = isSm ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textClass = isSm ? 'text-xs' : 'text-sm font-bold';

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Star className={`${iconSize} fill-amber-500 text-amber-500 shrink-0`} />
      <span className={`font-semibold text-on-surface ${textClass}`}>
        {rate.toFixed(1)}
      </span>
      {showCount && typeof count === 'number' && (
        <span className="text-xs text-outline">
          {countLabel ? `(${count} ${countLabel})` : `(${count})`}
        </span>
      )}
    </div>
  );
}
