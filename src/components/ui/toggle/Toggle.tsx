import React from 'react';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  id: string;
  description?: string;
  error?: string;
}

const Toggle: React.FC<ToggleProps> = ({ label, id, description, error, className, ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            className="sr-only peer"
            aria-describedby={description ? `${id}-description` : undefined}
            aria-invalid={!!error}
            {...props}
          />
          <div className="
            w-10 h-6
            bg-neutral-300 dark:bg-neutral-700
            rounded-full
            peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary dark:peer-focus:ring-offset-neutral-1000
            peer-checked:bg-primary
            transition-colors
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
          "></div>
          <div className="
            absolute left-1 top-1
            w-4 h-4
            bg-white
            rounded-full
            transition-transform
            peer-checked:translate-x-4
          "></div>
        </div>
        <div className="ml-3 text-sm">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            {label}
          </span>
          {description && (
            <p id={`${id}-description`} className="text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      </label>
      {error && (
        <p className="mt-1.5 text-xs text-danger pl-12">
          {error}
        </p>
      )}
    </div>
  );
};

export default Toggle;
