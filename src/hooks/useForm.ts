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
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
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
  
  const getFieldProps = (name: keyof T) => ({
      name: String(name),
      id: String(name),
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[name as string] ? errors[name as string] : undefined,
  });

  return {
    values,
    setValues,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isValid: Object.values(errors).every(error => error === undefined),
  };
};