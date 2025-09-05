import React from 'react';

interface TextFieldIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
}

const TextFieldIcon: React.FC<TextFieldIconProps> = ({ label, id, iconLeft, iconRight, error, ...props }) => {
  const baseClasses = "appearance-none block w-full border rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-2 sm:text-sm py-2";
  const lightClasses = "bg-neutral-100 text-neutral-900";
  const darkClasses = "dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-white";
  
  const errorClasses = "border-danger text-danger-dark dark:text-danger-light focus:ring-danger focus:border-danger";
  const normalClasses = "border-neutral-300 dark:border-neutral-800 focus:ring-primary focus:border-transparent";
  
  const paddingClasses = `${iconLeft ? 'pl-10' : 'pl-3'} ${iconRight ? 'pr-10' : 'pr-3'}`;
  
  const inputClassName = `${baseClasses} ${paddingClasses} ${lightClasses} ${darkClasses} ${error ? errorClasses : normalClasses}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div className="relative">
        {iconLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-600 dark:text-neutral-400">
            {iconLeft}
          </div>
        )}
        <input
          id={id}
          {...props}
          className={inputClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {iconRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-600 dark:text-neutral-400">
            {iconRight}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextFieldIcon;