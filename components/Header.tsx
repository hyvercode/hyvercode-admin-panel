import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, theme, toggleTheme }) => {
  const { user } = useAuth();
  
  return (
    <header className="relative h-16 bg-white dark:bg-dark shadow-md z-10">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-500 dark:text-gray-300 focus:outline-none focus:text-gray-700 dark:focus:text-gray-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open sidebar"
        >
          <i className="bi bi-list text-2xl"></i>
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="bi bi-search text-gray-400"></i>
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search..."
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="bi bi-sun-fill text-xl"></i>
            ) : (
              <i className="bi bi-moon-fill text-xl"></i>
            )}
          </button>
          
          <button className="relative text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
            <i className="bi bi-bell-fill text-xl"></i>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-danger rounded-full">3</span>
          </button>

          <div className="relative">
            <button className="flex items-center space-x-2">
              <img className="h-9 w-9 rounded-full object-cover" src="https://picsum.photos/50/50" alt="User" />
              <span className="hidden md:inline text-gray-700 dark:text-gray-200 font-medium">{user?.name || 'User'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;