import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  // FIX: Add 'info' to the list of accepted variants to match usage in CalendarPage.
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';

  const variantClasses = {
    neutral: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
    primary: 'bg-primary-background text-primary-dark',
    success: 'bg-success-background text-success-dark',
    warning: 'bg-warning-background text-warning-dark',
    danger: 'bg-danger-background text-danger-dark',
    // FIX: Add styles for the new 'info' variant, consistent with other components.
    info: 'bg-info/20 text-info',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
