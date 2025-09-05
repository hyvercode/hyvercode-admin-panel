import React from 'react';
import Select from '../Select';
import { COUNTRIES_DATA } from '../../../constants';

interface CountrySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  error?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = (props) => {
  return (
    <Select
      {...props}
      options={COUNTRIES_DATA}
    />
  );
};

export default CountrySelect;