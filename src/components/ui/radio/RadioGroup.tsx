import React from 'react';
import Radio from './Radio';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  options: RadioOption[];
  direction?: 'vertical' | 'horizontal';
  error?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  direction = 'vertical',
  error,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-2">
        {label}
      </label>
      <div
        role="radiogroup"
        className={`flex ${
          direction === 'vertical'
            ? 'flex-col space-y-2'
            : 'flex-row flex-wrap gap-x-4 gap-y-2'
        }`}
      >
        {options.map(option => (
          <Radio
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            label={option.label}
            value={option.value}
            checked={props.value === option.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            disabled={props.disabled}
          />
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;