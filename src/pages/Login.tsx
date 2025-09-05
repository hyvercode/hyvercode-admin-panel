import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm, FormErrors } from '../hooks/useForm';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const validate = (values: { email: string; password: string }): FormErrors => {
  const errors: FormErrors = {};
  if (!values.email) {
    errors.email = 'Email address is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  }
  return errors;
};


const Login: React.FC = () => {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLoginSubmit = async (values: {email: string, password: string}) => {
    setApiError('');
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setApiError(err.message || 'Failed to log in.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const { getFieldProps, handleSubmit } = useForm(
    { email: '', password: '' },
    validate,
    handleLoginSubmit
  );

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Sign in to your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          {...getFieldProps('email')}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="password"
          {...getFieldProps('password')}
        />
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link to="/forgot-password"className="font-medium text-primary hover:text-primary-light">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth={true}
          >
            Sign in
          </Button>
        </div>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-0 dark:bg-neutral-1000 text-neutral-600 dark:text-neutral-400">
              Don't have an account?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/register"
            className="w-full inline-flex items-center justify-center border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm border-neutral-400 text-neutral-800 bg-neutral-0 hover:bg-neutral-100 focus:ring-primary dark:bg-neutral-1000 dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-900 shadow-sm"
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;