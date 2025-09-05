import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dropdown from './ui/Dropdown';
import Avatar from './ui/Avatar';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  
  return (
    <header className="relative h-16 bg-neutral-0 dark:bg-neutral-1000 shadow-sm border-b border-neutral-300 dark:border-neutral-900 z-10">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-neutral-800 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open sidebar"
        >
          <i className="bi bi-list text-2xl"></i>
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="bi bi-search text-neutral-600"></i>
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 border-neutral-300 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search..."
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="bi bi-sun-fill text-xl"></i>
            ) : (
              <i className="bi bi-moon-fill text-xl"></i>
            )}
          </button>
          
          <button className="relative text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary">
            <i className="bi bi-bell-fill text-xl"></i>
            <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-danger rounded-full">3</span>
          </button>

          <Dropdown
            trigger={
              <button className="flex items-center space-x-2">
                <Avatar name={user?.name || 'User'} src="https://picsum.photos/50/50" />
              </button>
            }
          >
            <div className="p-2 text-sm text-neutral-800 dark:text-neutral-300">
              Signed in as <br/>
              <strong className="text-neutral-900 dark:text-neutral-100">{user?.email}</strong>
            </div>
            <hr className="border-neutral-200 dark:border-neutral-800"/>
            <Dropdown.Item icon={<i className="bi bi-person-circle"></i>} to={`/profile/${user?.id || 1}`}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item icon={<i className="bi bi-gear-fill"></i>} to="/settings">
              Settings
            </Dropdown.Item>
            <hr className="border-neutral-200 dark:border-neutral-800"/>
            <Dropdown.Item icon={<i className="bi bi-box-arrow-left"></i>} onClick={logout}>
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;