import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface LinkProps extends RouterLinkProps {
  children: React.ReactNode;
  variant?: 'primary' | 'subtle';
}

const Link: React.FC<LinkProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = 'font-medium transition-colors duration-200';
  const variantClasses = {
    primary: 'text-primary hover:text-primary-light hover:underline',
    subtle: 'text-neutral-800 dark:text-neutral-200 hover:text-primary',
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className || ''}`;

  return (
    <RouterLink className={finalClassName} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;
