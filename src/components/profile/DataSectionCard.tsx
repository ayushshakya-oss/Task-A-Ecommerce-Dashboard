import React from 'react';

export interface DataItem {
  label: string;
  value: React.ReactNode;
  isMono?: boolean;
  fullWidth?: boolean;
  valueClassName?: string;
}

export interface DataSectionCardProps {
  title: string;
  icon: React.ReactNode;
  items: DataItem[];
  accentColor?: 'primary' | 'secondary';
  className?: string;
}

export function DataSectionCard({
  title,
  icon,
  items,
  accentColor = 'primary',
  className = '',
}: DataSectionCardProps) {
  const iconColor =
    accentColor === 'secondary' ? 'text-secondary' : 'text-primary';

  return (
    <div
      className={`bg-surface-container-lowest rounded-xl border border-surface-container p-space-md shadow-sm ${className}`}
    >
      <div
        className={`flex items-center gap-2 pb-3 mb-3 border-b border-surface-container ${iconColor}`}
      >
        <span className="shrink-0">{icon}</span>
        <h2 className="text-xs font-bold uppercase tracking-wider text-on-surface">
          {title}
        </h2>
      </div>

      <dl className="space-y-2 text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (item.fullWidth) {
            return (
              <div key={item.label} className={isLast ? 'pt-1' : 'py-1 border-b border-surface-container-low'}>
                <dt className="text-outline mb-1">{item.label}</dt>
                <dd
                  className={`font-mono text-[10px] bg-surface-container-low p-2 rounded break-all text-on-surface ${
                    item.valueClassName || ''
                  }`}
                >
                  {item.value}
                </dd>
              </div>
            );
          }

          return (
            <div
              key={item.label}
              className={`flex items-center justify-between py-1 ${
                isLast ? '' : 'border-b border-surface-container-low'
              }`}
            >
              <dt className="text-outline">{item.label}</dt>
              <dd
                className={`font-semibold text-right ${
                  item.isMono ? 'font-mono text-[11px]' : ''
                } ${item.valueClassName || 'text-on-surface'}`}
              >
                {item.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
