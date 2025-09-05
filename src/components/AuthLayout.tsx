import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from './ui/image/Logo';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-1100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <Logo variant="full" />
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