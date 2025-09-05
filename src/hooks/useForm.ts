import { useState, useEffect, useCallback } from 'react';

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormTouched {
  [key: string]: boolean | undefined;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => FormErrors,
  onSubmit: (values: T) => void,
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const validateCallback = useCallback((currentValues: T) => {
    return validate(currentValues);
  }, [validate]);

  useEffect(() => {
    const validationErrors = validateCallback(values);
    setErrors(validationErrors);
  }, [values, validateCallback]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // The 'checked' property is only on HTMLInputElement
    const isCheckbox = type === 'checkbox' && 'checked' in e.target;
    const newValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    setValues(prevValues => ({ ...prevValues, [name]: newValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prevTouched => ({ ...prevTouched, [name]: true, }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {} as FormTouched);
    setTouched(allTouched);

    const validationErrors = validateCallback(values);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every(error => error === undefined)) {
        onSubmit(values);
    }
  };
  
  const getFieldProps = (name: keyof T) => {
    const commonProps = {
      name: String(name),
      id: String(name),
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[name as string] ? errors[name as string] : undefined,
    };

    const value = values[name];
    
    // Check if the value is a boolean to determine if it's a checkbox
    if (typeof value === 'boolean') {
      return {
        ...commonProps,
        checked: value,
      };
    }

    // For other input types like text, select, textarea
    return {
      ...commonProps,
      value: value ?? '', // Ensure value is not null/undefined for controlled components
    };
  };

  // FIX: Expose `setTouched` to allow the FormWizard component to manually trigger validation on step changes.
  return {
    values,
    setValues,
    errors,
    touched,
    setTouched,
    handleSubmit,
    getFieldProps,
    isValid: Object.values(errors).every(error => error === undefined),
  };
};
