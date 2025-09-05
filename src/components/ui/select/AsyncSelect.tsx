import React, { useState, useEffect } from 'react';
import Select from '../Select';
import { Option } from '../../../types';
import Spinner from '../Spinner';

interface AsyncSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  id: string;
  loadOptions: () => Promise<Option[]>;
  error?: string;
}

const AsyncSelect: React.FC<AsyncSelectProps> = ({ label, id, loadOptions, error, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    loadOptions().then(loadedOptions => {
      if (isMounted) {
        setOptions(loadedOptions);
        setIsLoading(false);
      }
    }).catch(console.error);
    return () => { isMounted = false; };
  }, [loadOptions]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300">
          {label}
        </label>
         {isLoading && <Spinner size="sm" />}
      </div>
      <Select
        id={id}
        label="" // Hide inner label
        options={options}
        disabled={isLoading || props.disabled}
        error={error}
        {...props}
      />
    </div>
  );
};

export default AsyncSelect;