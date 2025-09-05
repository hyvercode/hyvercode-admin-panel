import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './ui/image/Logo';
import Tooltip from './ui/Tooltip';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const mainNavLinks = [
  { to: '/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
  { to: '/users', icon: 'bi-people-fill', label: 'Users' },
  { to: '/tasks', icon: 'bi-check2-square', label: 'Tasks' },
  { to: '/boards', icon: 'bi-kanban-fill', label: 'Boards' },
  { to: '/calendar', icon: 'bi-calendar-event-fill', label: 'Calendar' },
  { to: '/appointments', icon: 'bi-calendar-plus-fill', label: 'Appointments' },
];

const componentsNavLinks = [
  { to: '/documentation', icon: 'bi-file-earmark-text-fill', label: 'Documentation' },
  { to: '/forms', icon: 'bi-input-cursor-text', label: 'Forms' },
  { to: '/tables', icon: 'bi-table', label: 'Tables' },
  { to: '/content', icon: 'bi-card-heading', label: 'Content' },
  { to: '/overlays', icon: 'bi-front', label: 'Overlays' },
  { to: '/navigation', icon: 'bi-compass-fill', label: 'Navigation' },
];

const NavItem: React.FC<{ to: string, icon: string, label: string, collapsed: boolean }> = ({ to, icon, label, collapsed }) => {
    const location = useLocation();
    const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));

    const linkContent = (
      <>
        <i className={`bi ${icon} text-lg`}></i>
        <span className={`ml-3 transition-opacity duration-200 ${collapsed ? 'lg:opacity-0' : ''}`}>{label}</span>
      </>
    );

    const commonClasses = `flex items-center p-2 rounded-md transition-colors w-full`;
    const activeClasses = `bg-primary text-white`;
    const inactiveClasses = `text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800`;

    return (
        <li>
            <Tooltip content={label} position="right" disabled={!collapsed}>
                <NavLink to={to} className={`${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                   {linkContent}
                </NavLink>
            </Tooltip>
        </li>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-neutral-0 dark:bg-neutral-1000 border-r border-neutral-200 dark:border-neutral-900 z-30 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} lg:translate-x-0`}>
        <div className={`flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-900 flex-shrink-0`}>
          <Logo variant={sidebarCollapsed ? 'icon' : 'full'} />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-600 dark:text-neutral-300">
             <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
                <h3 className={`text-xs font-semibold uppercase text-neutral-500 mb-2 transition-opacity duration-200 ${sidebarCollapsed ? 'lg:opacity-0 text-center' : ''}`}>Main</h3>
                <ul className="space-y-1">
                    {mainNavLinks.map(link => <NavItem key={link.to} {...link} collapsed={sidebarCollapsed} />)}
                </ul>
            </div>
             <div>
                <h3 className={`text-xs font-semibold uppercase text-neutral-500 mb-2 transition-opacity duration-200 ${sidebarCollapsed ? 'lg:opacity-0 text-center' : ''}`}>Components</h3>
                <ul className="space-y-1">
                    {componentsNavLinks.map(link => <NavItem key={link.to} {...link} collapsed={sidebarCollapsed} />)}
                </ul>
            </div>
        </nav>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-900">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 w-full"
          >
            <i className={`bi ${sidebarCollapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'}`}></i>
            <span className={`ml-3 transition-opacity duration-200 ${sidebarCollapsed ? 'lg:opacity-0' : ''}`}>Collapse</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
