import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface UserAvatarProps {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  showOnlineBadge?: boolean;
  className?: string;
  ringColor?: string;
}

const sizeClasses: Record<AvatarSize, { container: string; text: string; badge: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]', badge: 'w-2 h-2' },
  sm: { container: 'w-8 h-8', text: 'text-xs', badge: 'w-2.5 h-2.5' },
  md: { container: 'w-10 h-10', text: 'text-sm', badge: 'w-3 h-3' },
  lg: { container: 'w-16 h-16', text: 'text-xl', badge: 'w-3.5 h-3.5' },
  xl: { container: 'w-24 h-24', text: 'text-2xl', badge: 'w-4 h-4' },
};

export function UserAvatar({
  src,
  name = '',
  size = 'md',
  showOnlineBadge = false,
  className = '',
  ringColor = 'ring-primary/20',
}: UserAvatarProps) {
  const { container, text, badge } = sizeClasses[size];

  const getInitials = (str: string) => {
    if (!str.trim()) return 'U';
    const parts = str.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${container}`}>
      <div
        className={`w-full h-full rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center font-bold text-primary ring-1 ${ringColor} ${className}`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name || 'User avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={text}>{getInitials(name)}</span>
        )}
      </div>

      {showOnlineBadge && (
        <span
          className={`absolute bottom-0.5 right-0.5 ${badge} rounded-full bg-secondary border-2 border-surface-container-lowest`}
        />
      )}
    </div>
  );
}
