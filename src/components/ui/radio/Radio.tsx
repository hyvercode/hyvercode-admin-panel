import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  id: string;
}

const Radio: React.FC<RadioProps> = ({ label, id, ...props }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <input
        id={id}
        type="radio"
        className="sr-only peer"
        {...props}
      />
      <div className="
        flex items-center justify-center
        w-4 h-4
        shrink-0
        rounded-full
        border-2 border-neutral-400 dark:border-neutral-600
        bg-neutral-0 dark:bg-neutral-900
        transition-colors
        peer-checked:border-primary
        peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary dark:peer-focus:ring-offset-neutral-1000
        peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
      ">
        <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
      </div>
      <span className="ml-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
        {label}
      </span>
    </label>
  );
};

export default Radio;