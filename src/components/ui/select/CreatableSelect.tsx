import React from 'react';
import Input from '../Input';
import Button from '../Button';
import { Option } from '../../../types';

interface CreatableSelectProps {
  label: string;
  id: string;
  options: Option[];
  value: string; // The text value from the input
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreate: (newValue: string) => void;
  error?: string;
  [key: string]: any; // For other props like onBlur, name etc.
}

const CreatableSelect: React.FC<CreatableSelectProps> = ({
  label,
  id,
  options,
  value,
  onChange,
  onCreate,
  error,
  ...props
}) => {
  const handleCreateClick = () => {
    if (value && value.trim()) {
      onCreate(value.trim());
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div className="flex items-start gap-2">
        <div className="flex-grow">
          <Input
            label=""
            id={id}
            value={value}
            list={`${id}-datalist`}
            onChange={onChange}
            {...props}
          />
          <datalist id={`${id}-datalist`}>
            {options.map(option => (
              <option key={option.value} value={option.label} />
            ))}
          </datalist>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCreateClick}
          disabled={!value || !value.trim()}
          className="mt-px" // Align with input
        >
          Create
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
};

export default CreatableSelect;