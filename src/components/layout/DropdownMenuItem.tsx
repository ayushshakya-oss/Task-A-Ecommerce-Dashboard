import React from 'react';
import Link from 'next/link';

export interface DropdownMenuItemProps {
  href?: string;
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  isDanger?: boolean;
  className?: string;
}

export function DropdownMenuItem({
  href,
  icon,
  label,
  onClick,
  isDanger = false,
  className = '',
}: DropdownMenuItemProps) {
  const baseClasses = `flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-xs font-medium cursor-pointer w-full text-left ${
    isDanger
      ? 'text-error hover:bg-error-container/20 font-semibold'
      : 'text-on-surface hover:bg-surface-container-low'
  } ${className}`;

  const content = (
    <>
      {icon && (
        <span
          className={`shrink-0 ${isDanger ? 'text-error' : 'text-outline'}`}
        >
          {icon}
        </span>
      )}
      <span className="truncate">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
