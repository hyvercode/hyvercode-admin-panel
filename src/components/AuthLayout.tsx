import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-1100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-4xl font-bold items-center text-neutral-900 dark:text-neutral-100">
            <i className="bi bi-shield-lock-fill mr-3 text-primary"></i>
            <h1>Admin Panel</h1>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-neutral-0 dark:bg-neutral-1000 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-neutral-200 dark:border-neutral-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;