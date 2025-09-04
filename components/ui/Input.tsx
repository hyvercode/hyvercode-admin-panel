import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm";
  const lightClasses = "border-gray-300";
  const darkClasses = "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
  
  // Combine classes for the input element
  const inputClassName = `${baseClasses} ${props.className || ''} ${lightClasses} ${darkClasses}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          {...props}
          className={inputClassName}
        />
      </div>
    </div>
  );
};

export default Input;
