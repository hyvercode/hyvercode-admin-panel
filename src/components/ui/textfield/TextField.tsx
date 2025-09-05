import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, id, error, ...props }) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-2 sm:text-sm";
  const lightClasses = "bg-neutral-100 text-neutral-900";
  const darkClasses = "dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-white";
  
  const errorClasses = "border-danger text-danger-dark dark:text-danger-light focus:ring-danger focus:border-danger";
  const normalClasses = "border-neutral-300 dark:border-neutral-800 focus:ring-primary focus:border-transparent";
  
  const inputClassName = `${baseClasses} ${props.className || ''} ${lightClasses} ${darkClasses} ${error ? errorClasses : normalClasses}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={inputClassName}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextField;