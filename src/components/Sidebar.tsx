import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './ui/image/Logo';
import Tooltip from './ui/Tooltip';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { to: '/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
  { to: '/users', icon: 'bi-people-fill', label: 'Users' },
  { to: '/tasks', icon: 'bi-check2-square', label: 'Tasks' },
  { to: '/boards', icon: 'bi-kanban-fill', label: 'Boards' },
  { to: '/calendar', icon: 'bi-calendar-event-fill', label: 'Calendar' },
  { heading: 'Sample Pages' },
  { to: '/sample/products', icon: 'bi-box-seam-fill', label: 'Products' },
  { to: '/sample/chat', icon: 'bi-chat-dots-fill', label: 'Chat' },
  { heading: 'Settings' },
  { to: '/settings', icon: 'bi-gear-fill', label: 'Settings' },
  { to: '/profile/1', icon: 'bi-person-circle', label: 'Profile' },
  { to: '/documentation', icon: 'bi-file-earmark-text-fill', label: 'Documentation' },
];


const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  const sidebarClasses = `
    absolute lg:relative z-30 lg:z-auto h-screen
    bg-neutral-0 dark:bg-neutral-1000 
    border-r border-neutral-200 dark:border-neutral-900 
    flex-col flex-shrink-0
    transition-all duration-300 ease-in-out
    ${sidebarCollapsed ? 'w-20' : 'w-64'}
    ${sidebarOpen ? 'flex' : 'hidden lg:flex'}
  `;

  return (
    <aside className={sidebarClasses}>
      {/* Header */}
      <div className={`flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-900 flex-shrink-0 ${sidebarCollapsed ? 'justify-center' : ''}`}>
        <Logo variant={sidebarCollapsed ? 'icon' : 'full'} />
        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <ul>
          {navItems.map((item, index) => (
            item.heading ? (
              <li key={index} className={`px-3 py-2 text-xs font-bold uppercase text-neutral-500 tracking-wider ${sidebarCollapsed ? 'text-center' : ''} ${index > 0 ? 'mt-4' : ''}`}>
                {sidebarCollapsed ? item.heading.substring(0,1) : item.heading}
              </li>
            ) : (
              <li key={item.to}>
                <Tooltip content={item.label || ''} position="right" disabled={!sidebarCollapsed}>
                  <NavLink
                    to={item.to || '#'}
                    end
                    className={({ isActive }) => `
                      flex items-center p-3 my-1 rounded-lg transition-colors
                      ${isActive ? 'bg-primary-background text-primary' : 'hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-300'}
                      ${sidebarCollapsed ? 'justify-center' : ''}
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon && <i className={`bi ${item.icon} text-lg`}></i>}
                    {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">{item.label}</span>}
                  </NavLink>
                </Tooltip>
              </li>
            )
          ))}
        </ul>
      </nav>

      {/* Footer / Collapse Toggle */}
      <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-900">
        <Tooltip content={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'} position="right" disabled={!sidebarCollapsed}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`flex items-center p-3 my-1 rounded-lg w-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <i className={`bi ${sidebarCollapsed ? 'bi-arrow-right-square-fill' : 'bi-arrow-left-square-fill'} text-lg`}></i>
            {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">Collapse</span>}
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
