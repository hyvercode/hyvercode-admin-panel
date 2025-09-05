import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'subtle' | 'link';
  size?: 'default' | 'sm' | 'sm-icon' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200';
  
  const sizeClasses = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    'sm-icon': 'p-1.5',
    icon: 'p-2',
  };

  const variantClasses = {
    primary: 'border-transparent text-white bg-primary hover:bg-primary-dark shadow-sm',
    secondary: 'border-transparent text-neutral-900 dark:text-neutral-100 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-sm',
    danger: 'border-transparent text-white bg-danger hover:bg-danger-dark shadow-sm',
    subtle: 'border-transparent bg-transparent text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 shadow-none',
    link: 'border-transparent bg-transparent text-primary hover:underline shadow-none p-0',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabled = props.disabled || isLoading;

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${props.className || ''}`}
    >
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <>
          {leftIcon && <span className={children ? 'mr-2' : ''}>{leftIcon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;