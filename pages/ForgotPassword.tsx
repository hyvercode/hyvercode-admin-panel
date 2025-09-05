import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

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
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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