import type { NavItem, User, Task, CalendarEvent, Comment, Option } from './types';

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
    path: '/tasks',
    name: 'Tasks',
    icon: 'bi-check2-square',
  },
   {
    path: '/calendar',
    name: 'Calendar',
    icon: 'bi-calendar-event-fill',
  },
  {
    path: '/appointments',
    name: 'Appointments',
    icon: 'bi-clock-history',
  },
  {
    path: '/forms',
    name: 'Forms',
    icon: 'bi-input-cursor-text',
  },
  {
    path: '/advanced-selects',
    name: 'Advanced Selects',
    icon: 'bi-menu-button-wide-fill',
  },
  {
    path: '/feedback',
    name: 'Feedback',
    icon: 'bi-chat-quote-fill',
  },
  {
    path: '/editor',
    name: 'Editor',
    icon: 'bi-pencil-square',
  },
  {
    path: '/text-fields',
    name: 'Text Fields',
    icon: 'bi-input-cursor',
  },
  {
    path: '/toggles',
    name: 'Toggles',
    icon: 'bi-toggle-on',
  },
  {
    path: '/avatars',
    name: 'Avatars',
    icon: 'bi-person-bounding-box',
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

export const COUNTRIES_DATA: Option[] = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'MEX', label: 'Mexico' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'DEU', label: 'Germany' },
  { value: 'FRA', label: 'France' },
  { value: 'JPN', label: 'Japan' },
  { value: 'AUS', label: 'Australia' },
  { value: 'IND', label: 'India' },
];

export const TASKS_DATA: Task[] = [
  { id: 1, title: 'Design homepage mockups', project: 'Website Redesign', assigneeId: 2, status: 'In Progress', priority: 'High', dueDate: '2024-08-01' },
  { id: 2, title: 'Develop user authentication', project: 'Website Redesign', assigneeId: 5, status: 'To Do', priority: 'Urgent', dueDate: '2024-08-05' },
  { id: 3, title: 'Write documentation for API', project: 'API Development', assigneeId: 4, status: 'Done', priority: 'Medium', dueDate: '2024-07-25' },
  { id: 4, title: 'Fix bug #1234 - Login button', project: 'Mobile App', assigneeId: 1, status: 'In Progress', priority: 'High', dueDate: '2024-07-30' },
  { id: 5, title: 'Plan Q4 marketing campaign', project: 'Marketing', assigneeId: 2, status: 'Cancelled', priority: 'Low', dueDate: '2024-09-15' },
  { id: 6, title: 'Set up new CI/CD pipeline', project: 'Infrastructure', assigneeId: 5, status: 'To Do', priority: 'High', dueDate: '2024-08-10' },
  { id: 7, title: 'Review user feedback from survey', project: 'User Research', assigneeId: 4, status: 'Done', priority: 'Medium', dueDate: '2024-07-28' },
  { id: 8, title: 'Onboard new team member', project: 'HR', assigneeId: 1, status: 'To Do', priority: 'Medium', dueDate: '2024-08-02' },
];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
    { id: 1, title: 'Team Meeting', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-02`, category: 'primary' },
    { id: 2, title: 'Product Launch', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-05`, category: 'success' },
    { id: 3, title: 'Design Review', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-05`, category: 'primary' },
    { id: 4, title: 'Server Maintenance', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-10`, category: 'danger' },
    { id: 5, title: 'Quarterly Report Due', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`, category: 'warning' },
    { id: 6, title: 'All-Hands Meeting', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-22`, category: 'primary' },
];

export const COMMENTS_DATA: Omit<Comment, 'replies'>[] = [
  { id: 1, taskId: 1, authorId: 1, parentId: null, content: "Great start on the mockups, Bob! Can we explore a version with a darker color palette?", timestamp: "2 hours ago" },
  { id: 2, taskId: 1, authorId: 2, parentId: 1, content: "Absolutely, Alice. I'll work on a dark-themed version and share it by EOD.", timestamp: "1 hour ago" },
  { id: 3, taskId: 1, authorId: 4, parentId: null, content: "Looking forward to seeing the final designs. Let me know if you need any copy suggestions.", timestamp: "3 hours ago" },
  { id: 4, taskId: 2, authorId: 5, parentId: null, content: "The authentication flow is more complex than initially thought. We need to account for OAuth providers.", timestamp: "1 day ago" },
  { id: 5, taskId: 1, authorId: 1, parentId: 2, content: "Perfect, thanks Bob!", timestamp: "30 minutes ago" },
];