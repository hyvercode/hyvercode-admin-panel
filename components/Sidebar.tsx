import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed lg:relative inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64 bg-dark text-white flex-shrink-0 transition-transform duration-300 ease-in-out z-30 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white"><i className="bi bi-shield-lock-fill mr-2 text-primary"></i>Admin Panel</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <i className={`bi ${item.icon} text-xl w-6 text-center`}></i>
              <span className="ml-4 font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={logout} className="w-full flex items-center text-gray-300 hover:text-white">
            <i className="bi bi-box-arrow-left text-xl w-6 text-center"></i>
            <span className="ml-4 font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;