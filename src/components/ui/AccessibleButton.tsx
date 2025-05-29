'use client';

import React from 'react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  description,
  icon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const { announceMessage } = useAccessibility();
  const buttonRef = useKeyboardNavigation({
    onEnter: () => {
      if (!disabled && !loading && onClick) {
        onClick(new MouseEvent('click') as any);
        announceMessage(label);
      }
    },
  });

  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent',
    outline: 'border-2 border-primary text-primary hover:bg-primary-light focus:ring-primary',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      ref={buttonRef as any}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={label}
      aria-description={description}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="mr-2" aria-hidden="true">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
      {label}
    </button>
  );
};

export default AccessibleButton; 