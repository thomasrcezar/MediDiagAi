// src/components/Common/Button.tsx
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'warning' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  // Generate variant-specific styles using CSS variables
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: '1px solid var(--primary)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--secondary)',
          color: 'white',
          border: '1px solid var(--secondary)',
        };
      case 'accent':
        return {
          backgroundColor: 'var(--accent)',
          color: 'white',
          border: '1px solid var(--accent)',
        };
      case 'warning':
        return {
          backgroundColor: 'var(--warning)',
          color: 'white',
          border: '1px solid var(--warning)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--danger)',
          color: 'white',
          border: '1px solid var(--danger)',
        };
      default:
        return {
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: '1px solid var(--primary)',
        };
    }
  };

  // Generate size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      case 'md':
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const variantStyles = getVariantStyles();
  const sizeClasses = getSizeClasses();

  return (
    <button
      className={`
        font-family: var(--font-sans);
        rounded-md transition-all duration-200 
        inline-flex items-center justify-center
        ${sizeClasses}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}
        ${className || ''}
      `}
      style={{
        ...variantStyles,
        fontFamily: 'var(--font-sans)',
      }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>
  );
};