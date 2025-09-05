import React from 'react';
import { Link, To } from 'react-router-dom';
import Spinner from './Spinner';

// Omit 'children' from element attributes as we handle it explicitly
type ButtonElementProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
type AnchorElementProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>;

interface ButtonProps extends ButtonElementProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'subtle' | 'link';
  size?: 'default' | 'sm' | 'sm-icon' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: To;
  href?: string;
  // FIX: Added to support target attribute for links, resolving an error in Documentation.tsx
  target?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  to,
  href,
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

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${props.className || ''}`;

  const content = (
    <>
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <>
          {leftIcon && <span className={children ? 'mr-2' : ''}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={children ? 'ml-2' : ''}>{rightIcon}</span>}
        </>
      )}
    </>
  );

  if (to) {
    // Note: React Router's Link doesn't have a 'disabled' prop in the same way a button does.
    // We can prevent navigation using styles and by stopping the event, but for simplicity,
    // we rely on the disabled styles to indicate its state.
    // FIX: Corrected type casting to resolve type incompatibility between Button and Anchor props.
    return (
      <Link to={to} className={className} {...(props as unknown as AnchorElementProps)} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  if (href) {
    // FIX: Corrected type casting to resolve type incompatibility between Button and Anchor props.
    return (
      <a href={href} className={className} {...(props as unknown as AnchorElementProps)} aria-disabled={disabled}>
        {content}
      </a>
    );
  }

  return (
    <button
      {...(props as ButtonElementProps)}
      disabled={disabled}
      className={className}
    >
      {content}
    </button>
  );
};

export default Button;