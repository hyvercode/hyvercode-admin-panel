import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  id: string;
  description?: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, description, error, className, ...props }) => {
  return (
    <div className={className}>
      <div className="flex items-start">
        <label htmlFor={id} className="flex cursor-pointer items-start">
            <input
                id={id}
                type="checkbox"
                className="sr-only peer"
                aria-describedby={description ? `${id}-description` : undefined}
                aria-invalid={!!error}
                {...props}
            />
            <div className="
                flex items-center justify-center 
                w-4 h-4 
                mt-0.5 
                shrink-0 
                rounded 
                border-2 border-neutral-400 dark:border-neutral-600 
                bg-neutral-0 dark:bg-neutral-900 
                transition-colors 
                peer-checked:bg-primary peer-checked:border-primary 
                peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary dark:peer-focus:ring-offset-neutral-1000
                peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            ">
                <i className="bi bi-check text-white text-[12px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
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
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger pl-7">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
