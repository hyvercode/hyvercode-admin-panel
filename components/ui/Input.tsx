import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm";
  const lightClasses = "bg-neutral-100 border-neutral-300 text-neutral-900";
  const darkClasses = "dark:bg-neutral-900 dark:border-neutral-800 dark:placeholder-neutral-500 dark:text-white";
  
  const inputClassName = `${baseClasses} ${props.className || ''} ${lightClasses} ${darkClasses}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={inputClassName}
      />
    </div>
  );
};

export default Input;