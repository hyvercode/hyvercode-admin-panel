import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string | number; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, id, options, ...props }) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm";
  const lightClasses = "bg-neutral-100 border-neutral-300 text-neutral-900";
  const darkClasses = "dark:bg-neutral-900 dark:border-neutral-800 dark:placeholder-neutral-500 dark:text-white";
  
  const selectClassName = `${baseClasses} ${props.className || ''} ${lightClasses} ${darkClasses}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          {...props}
          className={selectClassName}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
           <i className="bi bi-chevron-down text-xs"></i>
        </div>
      </div>
    </div>
  );
};

export default Select;