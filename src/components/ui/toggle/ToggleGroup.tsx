import React from 'react';

interface ToggleGroupProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ label, children, error, className }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-2">
        {label}
      </label>
      <div role="group" className="space-y-4">
        {children}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default ToggleGroup;
