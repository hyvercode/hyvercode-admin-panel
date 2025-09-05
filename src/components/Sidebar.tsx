import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './ui/image/Logo';
import Tooltip from './ui/Tooltip';
import Dropdown from './ui/navigation/Dropdown';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const navItems = [
    {
        heading: 'Management',
        items: [
            { to: '/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
            { to: '/users', icon: 'bi-people-fill', label: 'Users' },
            { to: '/tasks', icon: 'bi-check2-square', label: 'Tasks' },
            { to: '/calendar', icon: 'bi-calendar-event-fill', label: 'Calendar' },
        ]
    },
    {
        heading: 'Content',
        items: [
            { to: '/editor', icon: 'bi-pencil-square', label: 'Editor' },
            { to: '/feedback', icon: 'bi-chat-quote-fill', label: 'Feedback' },
            { to: '/appointments', icon: 'bi-calendar-plus-fill', label: 'Appointments' },
        ]
    },
    {
        heading: 'Component Demos',
        items: [
            { to: '/documentation', icon: 'bi-file-earmark-text-fill', label: 'Docs' },
            { to: '/boards', icon: 'bi-kanban-fill', label: 'Boards & Timeline' },
            { to: '/forms', icon: 'bi-input-cursor-text', label: 'Forms' },
            { to: '/text-fields', icon: 'bi-textarea-t', label: 'Text Fields' },
            { to: '/advanced-selects', icon: 'bi-menu-button-wide-fill', label: 'Advanced Selects' },
            { to: '/toggles', icon: 'bi-toggle-on', label: 'Toggles' },
            { to: '/avatars', icon: 'bi-person-badge-fill', label: 'Avatars' },
            { to: '/icons', icon: 'bi-gem', label: 'Icons' },
            { to: '/images', icon: 'bi-image-fill', label: 'Images' },
            { to: '/loaders', icon: 'bi-arrow-repeat', label: 'Loaders' },
            { to: '/navigation', icon: 'bi-signpost-split-fill', label: 'Navigation' },
            { to: '/overlays', icon: 'bi-front', label: 'Overlays' },
            { to: '/tables', icon: 'bi-table', label: 'Tables' },
            { to: '/content', icon: 'bi-file-richtext-fill', label: 'Content' },
        ]
    },
    {
        heading: 'Sample Pages',
        items: [
            { to: '/sample/products', icon: 'bi-box-seam-fill', label: 'E-commerce' },
            { to: '/sample/pos', icon: 'bi-printer-fill', label: 'Point of Sale' },
            { to: '/sample/chat', icon: 'bi-chat-dots-fill', label: 'Chat' },
            { to: '/sample/ai-chat', icon: 'bi-robot', label: 'AI Assistant' },
            { to: '/sample/blog', icon: 'bi-journal-richtext', label: 'Blog' },
            { to: '/sample/course', icon: 'bi-book-half', label: 'Online Course' },
        ]
    },
    {
        heading: 'Admin',
        items: [
            { to: '/settings', icon: 'bi-gear-fill', label: 'Settings' },
            { to: '/profile/1', icon: 'bi-person-circle', label: 'Profile' },
        ]
    }
];

const NavItem: React.FC<{ item: any; sidebarCollapsed: boolean; closeMobileSidebar: () => void }> = ({ item, sidebarCollapsed, closeMobileSidebar }) => (
    <li>
        <Tooltip content={item.label} position="right" disabled={!sidebarCollapsed}>
            <NavLink
                to={item.to}
                end
                className={({ isActive }) => `
                    flex items-center p-3 my-1 rounded-lg transition-colors
                    ${isActive ? 'bg-primary-background text-primary' : 'hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-300'}
                    ${sidebarCollapsed ? 'justify-center' : ''}
                `}
                onClick={closeMobileSidebar}
            >
                <i className={`bi ${item.icon} text-lg`}></i>
                {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">{item.label}</span>}
            </NavLink>
        </Tooltip>
    </li>
);

const NavGroup: React.FC<{ group: any; sidebarCollapsed: boolean; closeMobileSidebar: () => void; }> = ({ group, sidebarCollapsed, closeMobileSidebar }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (sidebarCollapsed) {
        return (
            <Dropdown
                trigger={<button className="w-full my-1 p-3 rounded-lg flex justify-center hover:bg-neutral-100 dark:hover:bg-neutral-900"><i className={`bi ${group.items[0].icon} text-lg`}></i></button>}
                menuClassName="-right-2 top-0 translate-x-full"
            >
                <div className="p-2 font-bold text-sm">{group.heading}</div>
                {group.items.map((item: any) => (
                    <Dropdown.Item key={item.to} to={item.to} icon={<i className={`bi ${item.icon}`}></i>}>{item.label}</Dropdown.Item>
                ))}
            </Dropdown>
        );
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 my-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
                <span className="px-1 text-xs font-bold uppercase text-neutral-500 tracking-wider">{group.heading}</span>
                <i className={`bi bi-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isOpen && (
                <ul className="pl-4">
                    {group.items.map((item: any) => (
                        <NavItem key={item.to} item={item} sidebarCollapsed={sidebarCollapsed} closeMobileSidebar={closeMobileSidebar} />
                    ))}
                </ul>
            )}
        </div>
    );
};


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
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul>
            {navItems.map(group => (
                <li key={group.heading}>
                    <NavGroup group={group} sidebarCollapsed={sidebarCollapsed} closeMobileSidebar={() => setSidebarOpen(false)} />
                </li>
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