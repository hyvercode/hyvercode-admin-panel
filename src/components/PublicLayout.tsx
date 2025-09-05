import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Logo from './ui/image/Logo';

const PublicLayout: React.FC = () => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-1100 min-h-screen flex flex-col">
      <header className="bg-neutral-0 dark:bg-neutral-1000 shadow-sm border-b border-neutral-200 dark:border-neutral-900 sticky top-0 z-20">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-4">
            <NavLink to="/" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-primary' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary'}`}>Home</NavLink>
            <NavLink to="/sample/products" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-primary' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary'}`}>Products</NavLink>
            <NavLink to="/sample/blog" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-primary' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary'}`}>Blog</NavLink>
            <NavLink to="/login" className="text-sm font-medium text-primary hover:text-primary-dark">Admin Login</NavLink>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-neutral-0 dark:bg-neutral-1000 border-t border-neutral-200 dark:border-neutral-900">
         <div className="container mx-auto px-6 py-4 text-center text-neutral-600 dark:text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Admin Panel. All Rights Reserved.
         </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
