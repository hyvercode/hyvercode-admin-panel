import React from 'react';
import Icon from '../icon/Icon';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className }) => {
  const baseClasses = `flex items-center font-bold ${className || ''}`;

  if (variant === 'icon') {
    return (
      <div className={baseClasses}>
        <Icon name="shield-lock-fill" className="text-3xl text-primary" />
      </div>
    );
  }

  return (
    <div className={`${baseClasses} text-2xl text-neutral-900 dark:text-neutral-0`}>
      <Icon name="shield-lock-fill" className="mr-2 text-primary" />
      <h1 className="whitespace-nowrap">Admin Panel</h1>
    </div>
  );
};

export default Logo;