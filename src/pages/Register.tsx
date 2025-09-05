import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm, FormErrors } from '../hooks/useForm';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const validate = (values: Record<string, string>): FormErrors => {
  const errors: FormErrors = {};
  if (!values.name) {
    errors.name = 'Full name is required.';
  }
  if (!values.email) {
    errors.email = 'Email address is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }
  return errors;
};

const Register: React.FC = () => {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegisterSubmit = async (values: Record<string, string>) => {
    setApiError('');
    setIsLoading(true);
    try {
      await register(values.name, values.email, values.password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setApiError(err.message || 'Failed to create an account.');
    } finally {
      setIsLoading(false);
    }
  };

  const { getFieldProps, handleSubmit } = useForm(
    { name: '', email: '', password: '' },
    validate,
    handleRegisterSubmit
  );

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Create a new account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        <Input
          label="Full Name"
          type="text"
          autoComplete="name"
          {...getFieldProps('name')}
        />
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          {...getFieldProps('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          {...getFieldProps('password')}
        />
        <div>
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth={true}
          >
            Create account
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="font-medium text-primary hover:text-primary-light"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </>
  );
};

export default Register;