import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to create an account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Create a new account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <Alert variant="danger">{error}</Alert>}
        <Input
          label="Full Name"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          className="font-medium text-primary hover:text-blue-500"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </>
  );
};

export default Register;