import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  labelAction?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightElement,
      containerClassName = '',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={id}
              className="block text-xs font-semibold text-on-surface"
            >
              {label}
            </label>
            {props.labelAction}
          </div>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-outline pointer-events-none flex items-center justify-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className={`w-full bg-surface-container-lowest text-on-surface text-xs rounded-lg shadow-sm border transition-all placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent ${
              leftIcon ? 'pl-10' : 'pl-3.5'
            } ${rightElement ? 'pr-10' : 'pr-3.5'} py-2.5 ${
              error
                ? 'border-error ring-1 ring-error/50'
                : 'border-surface-container'
            } ${className}`}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-2.5 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1 text-[11px] text-error">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-[11px] text-on-surface-variant">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
