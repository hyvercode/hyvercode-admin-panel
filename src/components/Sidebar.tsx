import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Tooltip from './ui/Tooltip';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  const { logout } = useAuth();
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-neutral-1000 bg-opacity-50 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed lg:relative inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 bg-neutral-1000 text-neutral-200 flex-shrink-0 transition-all duration-300 ease-in-out z-30 flex flex-col ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`h-16 flex items-center border-b border-neutral-900 ${sidebarCollapsed ? 'justify-center' : 'px-4'}`}>
            {sidebarCollapsed ? (
                <i className="bi bi-shield-lock-fill text-3xl text-primary"></i>
            ) : (
                <h1 className="text-2xl font-bold text-neutral-0 whitespace-nowrap"><i className="bi bi-shield-lock-fill mr-2 text-primary"></i>Admin Panel</h1>
            )}
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => (
            <Tooltip key={item.path} content={item.name} position="right" disabled={!sidebarCollapsed}>
              <NavLink
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center rounded-md transition-colors duration-200 ${
                    sidebarCollapsed ? 'justify-center h-12' : 'px-4 py-2.5'
                  } ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`
                }
              >
                <i className={`bi ${item.icon} text-lg shrink-0`}></i>
                <span className={`ml-4 font-medium text-sm whitespace-nowrap transition-opacity ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>{item.name}</span>
              </NavLink>
            </Tooltip>
          ))}
        </nav>

        <div className="p-2 border-t border-neutral-900">
          {/* Collapse button for desktop */}
          <Tooltip content={sidebarCollapsed ? 'Expand' : 'Collapse'} position="right" disabled={!sidebarCollapsed}>
            <button 
              onClick={toggleCollapse} 
              className={`hidden lg:flex w-full items-center text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md transition-all duration-200 ${sidebarCollapsed ? 'justify-center h-12' : 'px-4 py-2.5'}`}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
             >
              <i className={`bi ${sidebarCollapsed ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar-inset-reverse'} text-lg shrink-0`}></i>
              <span className={`ml-4 font-medium text-sm whitespace-nowrap transition-opacity ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>Collapse</span>
            </button>
          </Tooltip>
           
          {/* Logout button */}
          <Tooltip content="Logout" position="right" disabled={!sidebarCollapsed}>
            <button onClick={logout} className={`w-full flex items-center text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md transition-all duration-200 mt-1 ${sidebarCollapsed ? 'justify-center h-12' : 'px-4 py-2.5'}`}>
              <i className="bi bi-box-arrow-left text-lg shrink-0"></i>
              <span className={`ml-4 font-medium text-sm whitespace-nowrap transition-opacity ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>Logout</span>
            </button>
          </Tooltip>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;