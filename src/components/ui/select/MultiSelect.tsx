import React, { useState, useRef, useEffect } from 'react';
import Checkbox from '../Checkbox';
import { Option } from '../../../types';

interface MultiSelectProps {
  label: string;
  id: string;
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, id, options, selectedValues, onChange, error, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const selectedLabels = options
    .filter(opt => selectedValues.includes(opt.value))
    .map(opt => opt.label)
    .join(', ');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
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
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            appearance-none block w-full px-3 py-2 border rounded-md shadow-sm text-left
            focus:outline-none focus:ring-2 sm:text-sm
            bg-neutral-100 dark:bg-neutral-900 
            ${error ? 'border-danger focus:ring-danger' : 'border-neutral-300 dark:border-neutral-800 focus:ring-primary'}
            ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          <span className={`truncate ${selectedLabels ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}>
            {selectedLabels || 'Select options...'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <i className="bi bi-chevron-down text-neutral-500"></i>
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-neutral-0 dark:bg-neutral-1000 shadow-lg rounded-md border dark:border-neutral-800 max-h-60 overflow-auto">
            <ul className="p-2 space-y-1">
              {options.map(option => (
                <li key={option.value}>
                  <Checkbox
                    id={`${id}-${option.value}`}
                    label={option.label}
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
};

export default MultiSelect;