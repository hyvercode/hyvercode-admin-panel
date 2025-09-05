import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FormErrors } from '../hooks/useForm';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const validate = (values: { email: string }): FormErrors => {
  const errors: FormErrors = {};
  if (!values.email) {
    errors.email = 'Email address is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }
  return errors;
};

const ForgotPassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotSubmit = () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };
  
  const { getFieldProps, handleSubmit } = useForm(
    { email: '' },
    validate,
    handleForgotSubmit
  );

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Reset your password
      </h2>
      {isSubmitted ? (
        <div className="text-center">
          <p className="text-neutral-700 dark:text-neutral-300">
            If an account with that email exists, we have sent a password reset link to it. Please check your inbox.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            {...getFieldProps('email')}
          />
          <div>
            <Button
              type="submit"
              isLoading={isLoading}
              fullWidth={true}
            >
              Send Password Reset Link
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="font-medium text-primary hover:text-primary-light"
        >
          Return to sign in
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;