import React from 'react';

interface RangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Range: React.FC<RangeProps> = ({ label, id, error, ...props }) => {
  const value = props.value || 0;
  const min = props.min || 0;
  const max = props.max || 100;
  
  // Custom styles for range input are notoriously tricky and often require CSS.
  // Here we use a wrapper for layout and basic styling on the input.
  const rangeStyle: React.CSSProperties = {
    '--value': value,
    '--min': min,
    '--max': max,
  } as React.CSSProperties;

  return (
    <div style={rangeStyle}>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300">
          {label}
        </label>
        <span className="text-sm font-semibold text-primary bg-primary-background px-2 py-0.5 rounded-md">
            {value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        {...props}
        className={`
          w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:bg-primary
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          dark:[&::-webkit-slider-thumb]:border-neutral-900
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:active:scale-110
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-neutral-1000
        `}
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

export default Range;