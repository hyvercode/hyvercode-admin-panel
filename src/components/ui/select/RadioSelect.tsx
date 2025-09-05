import React, { useState, useRef, useEffect } from 'react';
import Radio from '../radio/Radio';
import { Option } from '../../../types';

interface RadioSelectProps {
  label: string;
  id: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  error?: string;
  disabled?: boolean;
}

const RadioSelect: React.FC<RadioSelectProps> = ({ label, id, name, options, value, onChange, onBlur, error, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const selectedLabel = options.find(opt => opt.value === value)?.label || 'Select an option...';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setIsOpen(false); // Close dropdown on selection
  };

  return (
    <div ref={wrapperRef}>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          id={id}
          name={name}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={onBlur}
          className={`
            appearance-none block w-full px-3 py-2 border rounded-md shadow-sm text-left
            focus:outline-none focus:ring-2 sm:text-sm
            bg-neutral-100 dark:bg-neutral-900 
            ${error ? 'border-danger focus:ring-danger' : 'border-neutral-300 dark:border-neutral-800 focus:ring-primary'}
            ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          <span className={`truncate ${value ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}>
            {selectedLabel}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <i className="bi bi-chevron-down text-neutral-500"></i>
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-neutral-0 dark:bg-neutral-1000 shadow-lg rounded-md border dark:border-neutral-800 max-h-60 overflow-auto">
            <div className="p-2 space-y-1" role="radiogroup">
              {options.map(option => (
                <Radio
                  key={option.value}
                  id={`${id}-${option.value}`}
                  name={name}
                  label={option.label}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
};

export default RadioSelect;