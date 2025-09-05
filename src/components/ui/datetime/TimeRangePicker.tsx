import React from 'react';

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

interface TimeRangePickerProps {
  label: string;
  startFieldProps: FieldProps;
  endFieldProps: FieldProps;
  rangeError?: string; 
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ label, startFieldProps, endFieldProps, rangeError }) => {
  const getInputClassName = (fieldError?: string) => `
    appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-2 sm:text-sm
    bg-neutral-100 text-neutral-900
    dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-white
    ${fieldError || rangeError ? 
      'border-danger focus:ring-danger' : 
      'border-neutral-300 dark:border-neutral-800 focus:ring-primary'}
  `;

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
           <input type="time" {...startFieldProps} className={getInputClassName(startFieldProps.error)} aria-label="Start time" />
           {startFieldProps.error && <p className="mt-1.5 text-xs text-danger">{startFieldProps.error}</p>}
        </div>
        <div>
           <input type="time" {...endFieldProps} className={getInputClassName(endFieldProps.error)} aria-label="End time" />
           {endFieldProps.error && <p className="mt-1.5 text-xs text-danger">{endFieldProps.error}</p>}
        </div>
      </div>
      {rangeError && (
        <p className="mt-1.5 text-xs text-danger">{rangeError}</p>
      )}
    </div>
  );
};

export default TimeRangePicker;