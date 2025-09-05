import React from 'react';
import Input from '../Input';
import { Option } from '../../../types';

interface AutocompleteSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  options: Option[];
  error?: string;
}

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({ label, id, options, error, ...props }) => {
  return (
    <div>
      <Input
        label={label}
        id={id}
        error={error}
        list={`${id}-datalist`}
        {...props}
      />
      <datalist id={`${id}-datalist`}>
        {options.map(option => (
          <option key={option.value} value={option.label} />
        ))}
      </datalist>
    </div>
  );
};

export default AutocompleteSelect;