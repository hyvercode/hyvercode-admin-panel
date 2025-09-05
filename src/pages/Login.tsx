import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Sign in to your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <Alert variant="danger">{error}</Alert>}
        <Input
          label="Email address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
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