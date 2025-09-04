import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'icon';
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
  const baseClasses = 'inline-flex items-center justify-center border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200';
  
  const sizeClasses = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    icon: 'p-2',
  };

  const variantClasses = {
    primary: 'border-transparent text-white bg-primary hover:bg-blue-600 focus:ring-primary shadow-sm',
    secondary: 'border-transparent text-secondary-800 bg-secondary/20 hover:bg-secondary/30 focus:ring-secondary dark:text-secondary-300 shadow-sm',
    danger: 'border-transparent text-white bg-danger hover:bg-red-600 focus:ring-danger shadow-sm',
    outline: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary dark:bg-dark dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 shadow-sm',
    ghost: 'border-transparent bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-primary shadow-none',
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