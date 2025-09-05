import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './ui/image/Logo';
import Tooltip from './ui/Tooltip';
import { NAV_ITEMS, NavStructure } from '../constants';
import Dropdown from './ui/navigation/Dropdown';
import Button from './ui/Button';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

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

const NavGroup: React.FC<{ title: string; icon: string; items: any[]; collapsed: boolean }> = ({ title, icon, items, collapsed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isGroupActive = items.some(item => location.pathname.startsWith(item.to));

    if (collapsed) {
        return (
            <li>
                <Dropdown
                    menuClassName="!left-full !-top-2 !ml-3"
                    trigger={
                        <Tooltip content={title} position="right">
                            <Button variant="subtle" size="icon" className="w-full">
                               <i className={`bi ${icon} text-lg text-neutral-700 dark:text-neutral-400`}></i>
                            </Button>
                        </Tooltip>
                    }
                >
                    <div className="p-1">
                        <span className="px-3 py-1 text-xs font-semibold text-neutral-500">{title}</span>
                        {items.map(item => (
                             <Dropdown.Item key={item.to} to={item.to} icon={<i className={`bi ${item.icon}`}></i>}>
                                {item.label}
                            </Dropdown.Item>
                        ))}
                    </div>
                </Dropdown>
            </li>
        );
    }

    return (
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-2 rounded-md text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
                <span className={`flex items-center text-left ${isGroupActive ? 'text-primary' : ''}`}>
                    <i className={`bi ${icon} mr-3 text-lg`}></i>
                    <span className="text-xs font-semibold uppercase">{title}</span>
                </span>
                <i className={`bi bi-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="space-y-1 pt-2 pl-4">
                    {items.map(link => <NavItem key={link.to} {...link} collapsed={collapsed} />)}
                </ul>
            </div>
        </div>
    )
}

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

        <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {NAV_ITEMS.map((nav, index) => {
                  if ('items' in nav) {
                      return <NavGroup key={index} {...nav} collapsed={sidebarCollapsed} />
                  }
                  return <NavItem key={index} {...nav} collapsed={sidebarCollapsed} />
              })}
            </ul>
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