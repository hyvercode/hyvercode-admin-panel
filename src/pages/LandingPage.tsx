import React from 'react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-1100">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100">
          Welcome to the Admin Panel
        </h1>
        <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
          A powerful and feature-rich dashboard built with modern web technologies to manage your application with ease.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button to="/dashboard" size="default">Go to Dashboard</Button>
          <Button to="/sample/products" variant="secondary" size="default">View Sample Pages</Button>
        </div>
      </div>
      
      {/* Feature Section */}
      <div className="bg-neutral-0 dark:bg-neutral-1000 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl text-primary mb-4"><i className="bi bi-speedometer2"></i></div>
              <h3 className="text-xl font-semibold">Fast & Responsive</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">Optimized for performance on all devices.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-4"><i className="bi bi-palette-fill"></i></div>
              <h3 className="text-xl font-semibold">Customizable UI</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">Includes a rich component library with dark mode.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-4"><i className="bi bi-shield-lock-fill"></i></div>
              <h3 className="text-xl font-semibold">Secure by Design</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">Built with security best practices in mind.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
