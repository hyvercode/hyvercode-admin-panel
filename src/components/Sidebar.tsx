import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Tooltip from './ui/Tooltip';
import Logo from './ui/image/Logo';

interface NavItem {
    path: string;
    name: string;
    icon?: string;
}

interface NavGroup {
    name: string;
    icon: string;
    items: NavItem[];
}

const isNavGroup = (item: NavItem | NavGroup): item is NavGroup => {
    return 'items' in item;
};

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  const { logout } = useAuth();
  const location = useLocation();
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(() => {
    // Keep dropdown open on page refresh if the current path is within that group
    const currentGroup = NAV_ITEMS.find(item => 
      isNavGroup(item) && item.items.some(subItem => location.pathname.startsWith(subItem.path))
    );
    return currentGroup ? currentGroup.name : null;
  });

  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const renderNavItem = (item: NavItem | NavGroup) => {
    if (isNavGroup(item)) {
        const isOpen = openDropdown === item.name;
        return (
            <div key={item.name}>
                <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`w-full flex items-center rounded-md transition-colors duration-200 text-neutral-300 hover:bg-neutral-900 hover:text-white ${sidebarCollapsed ? 'justify-center h-12' : 'px-4 py-2.5'}`}
                >
                    <i className={`bi ${item.icon} text-lg shrink-0`}></i>
                    <span className={`flex-1 text-left ml-4 font-medium text-sm whitespace-nowrap transition-opacity ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>{item.name}</span>
                    {!sidebarCollapsed && <i className={`bi bi-chevron-down shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen && !sidebarCollapsed ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="pt-1 pl-8 pr-2 space-y-1">
                        {item.items.map(subItem => (
                            <NavLink
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) => `block px-4 py-2 text-sm rounded-md ${isActive ? 'bg-primary text-white' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
                            >
                                {subItem.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Tooltip key={item.path} content={item.name} position="right" disabled={!sidebarCollapsed}>
            <NavLink
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center rounded-md transition-colors duration-200 ${sidebarCollapsed ? 'justify-center h-12' : 'px-4 py-2.5'} ${isActive ? 'bg-primary text-white shadow-sm' : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'}`}
            >
                <i className={`bi ${item.icon} text-lg shrink-0`}></i>
                <span className={`ml-4 font-medium text-sm whitespace-nowrap transition-opacity ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>{item.name}</span>
            </NavLink>
        </Tooltip>
    );
  };


  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-neutral-1000 bg-opacity-50 z-20 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed lg:relative inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-neutral-1000 text-neutral-200 flex-shrink-0 transition-all duration-300 ease-in-out z-30 flex flex-col ${sidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className={`h-16 flex items-center border-b border-neutral-900 ${sidebarCollapsed ? 'justify-center' : 'px-4'}`}>
            <Logo variant={sidebarCollapsed ? 'icon' : 'full'} />
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map(renderNavItem)}
        </nav>

        <div className="p-2 border-t border-neutral-900">
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
