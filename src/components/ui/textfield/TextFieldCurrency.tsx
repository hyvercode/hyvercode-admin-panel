import React from 'react';
import TextFieldGroup from './TextFieldGroup';

interface TextFieldCurrencyProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  currencySymbol?: string;
  error?: string;
}

const TextFieldCurrency: React.FC<TextFieldCurrencyProps> = ({ currencySymbol = '$', ...props }) => {
  return (
    <TextFieldGroup
      addonLeft={currencySymbol}
      type="number"
      step="0.01"
      {...props}
    />
  );
};

export default TextFieldCurrency;