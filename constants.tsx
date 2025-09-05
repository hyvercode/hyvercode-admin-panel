import type { NavItem, User } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'bi-grid-fill',
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'bi-people-fill',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'bi-gear-fill',
  },
   {
    path: '/documentation',
    name: 'Documentation',
    icon: 'bi-book-fill',
  },
];

export const USERS_DATA: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-20 10:00 AM', bio: 'Lead administrator with a passion for clean UIs and efficient workflows.' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-07-20 09:45 AM', bio: 'Content editor and strategist, focused on creating engaging user experiences.' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-07-15 03:20 PM', bio: 'A casual viewer who occasionally checks in on project progress.' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-07-20 11:30 AM', bio: 'An editor with a keen eye for detail and a commitment to quality.' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-19 08:00 AM', bio: 'System administrator responsible for security and infrastructure.' },
];