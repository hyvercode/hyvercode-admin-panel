import React from 'react';

interface ProgressBarProps {
  progress: number;
  variant?: 'primary' | 'success' | 'transparent';
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const normalizedProgress = Math.max(0, Math.min(100, progress));

  const containerClasses = `w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden ${className}`;
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  const barVariantClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    transparent: 'bg-neutral-400 dark:bg-neutral-600',
  };

  const barClasses = `
    ${barVariantClasses[variant]}
    ${sizeClasses[size]}
    rounded-full
    transition-all duration-500 ease-out
  `;

  return (
    <div>
      <div className={`${containerClasses} ${sizeClasses[size]}`}>
        <div
          className={barClasses}
          style={{ width: `${normalizedProgress}%` }}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      {showLabel && (
        <p className="text-sm text-right mt-1 text-neutral-700 dark:text-neutral-300">
          {Math.round(normalizedProgress)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;