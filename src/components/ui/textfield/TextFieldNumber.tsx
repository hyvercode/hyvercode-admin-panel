import React from 'react';
import TextField from './TextField';

interface TextFieldNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
  error?: string;
}

const TextFieldNumber: React.FC<TextFieldNumberProps> = (props) => {
  return (
    <TextField
      type="number"
      {...props}
    />
  );
};

export default TextFieldNumber;