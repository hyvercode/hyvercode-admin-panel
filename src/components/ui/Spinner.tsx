import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-current border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;