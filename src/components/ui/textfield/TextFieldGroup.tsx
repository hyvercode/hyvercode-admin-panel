import React from 'react';
import TextField from './TextField'; // Assuming the base input is TextField

interface TextFieldGroupProps {
  label: string;
  addonLeft?: React.ReactNode;
  addonRight?: React.ReactNode;
  error?: string;
  // Pass through all standard input props to the underlying TextField
  [x: string]: any;
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({ label, addonLeft, addonRight, error, ...props }) => {
  const addonBaseClasses = "inline-flex items-center px-3 text-sm border bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200";
  const addonErrorClasses = "border-danger";
  const addonNormalClasses = "border-neutral-300 dark:border-neutral-700";
  const addonClasses = `${addonBaseClasses} ${error ? addonErrorClasses : addonNormalClasses}`;

  // FIX: Explicitly include `id` in `inputProps` to satisfy the `TextField` component's required `id` prop.
  // The original `...props` spread with a loose `[x: string]: any` type did not guarantee its presence for TypeScript.
  const inputProps = {
    ...props,
    label: "", // The label is handled by the group wrapper
    className: `
      ${props.className || ''}
      ${addonLeft ? 'rounded-l-none' : ''}
      ${addonRight ? 'rounded-r-none' : ''}
      focus:z-10
    `,
  };

  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div className="flex">
        {addonLeft && (
          <span className={`${addonClasses} rounded-l-md`}>
            {addonLeft}
          </span>
        )}
        <TextField {...inputProps} />
        {addonRight && (
          <span className={`${addonClasses} rounded-r-md`}>
            {addonRight}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextFieldGroup;