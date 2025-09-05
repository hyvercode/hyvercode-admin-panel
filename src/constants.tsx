import type { User, CalendarEvent, Task, Comment } from './types';

export const NAV_ITEMS = [
  { path: '/', name: 'Dashboard', icon: 'bi-grid-1x2-fill' },
  { path: '/users', name: 'Users', icon: 'bi-people-fill' },
  { path: '/tasks', name: 'Tasks', icon: 'bi-check2-square' },
  { path: '/calendar', name: 'Calendar', icon: 'bi-calendar-event-fill' },
  { path: '/tables', name: 'Tables', icon: 'bi-table' },
  { path: '/forms', name: 'Forms', icon: 'bi-card-list' },
  { path: '/navigation', name: 'Navigation', icon: 'bi-compass-fill' },
  { path: '/overlays', name: 'Overlays', icon: 'bi-front' },
  { path: '/content', name: 'Content', icon: 'bi-file-richtext-fill' },
  { path: '/loaders', name: 'Loaders', icon: 'bi-arrow-clockwise' },
  { path: '/components', name: 'Components', icon: 'bi-grid-fill' ,
    subItems: [
        { path: '/text-fields', name: 'Text Fields' },
        { path: '/toggles', name: 'Toggles' },
        { path: '/advanced-selects', name: 'Selects' },
        { path: '/feedback', name: 'Feedback' },
        { path: '/appointments', name: 'Appointments' },
        { path: '/editor', name: 'Editor' },
        { path: '/avatars', name: 'Avatars' },
        { path: '/icons', name: 'Icons' },
        { path: '/images', name: 'Images' },
    ]
  },
  { path: '/documentation', name: 'Documentation', icon: 'bi-file-earmark-code-fill' },
];

export const USERS_DATA: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', lastLogin: '2024-07-21', bio: 'Administrator and lead developer focusing on backend systems.' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', status: 'active', lastLogin: '2024-07-20', bio: 'Frontend developer with a passion for user experience and design.' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Designer', status: 'inactive', lastLogin: '2024-06-15', bio: 'UI/UX Designer creating intuitive and beautiful user interfaces.' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Project Manager', status: 'active', lastLogin: '2024-07-21', bio: 'Project Manager ensuring projects are delivered on time and within budget.' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Developer', status: 'pending', lastLogin: '2024-07-18', bio: 'Full-stack developer specializing in cloud infrastructure.' },
    { id: 6, name: 'Fiona Glenanne', email: 'fiona@example.com', role: 'QA Tester', status: 'active', lastLogin: '2024-07-19', bio: 'QA Tester with a keen eye for detail and a knack for breaking things.' },
];

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
  { id: 1, title: 'Team Sync', date: '2024-07-22', category: 'primary' },
  { id: 2, title: 'Project Deadline', date: '2024-07-25', category: 'danger' },
  { id: 3, title: 'Client Meeting', date: '2024-07-25', category: 'primary' },
  { id: 4, title: 'Product Launch', date: '2024-08-01', category: 'success' },
  { id: 5, title: 'Q3 Review', date: '2024-08-05', category: 'warning' },
];

export const TASKS_DATA: Task[] = [
    { id: 1, title: 'Design homepage mockups', assigneeId: 3, dueDate: '2024-07-28', priority: 'High', status: 'In Progress', tags: ['UI', 'Design'] },
    { id: 2, title: 'Develop login functionality', assigneeId: 2, dueDate: '2024-07-30', priority: 'High', status: 'To Do', tags: ['Frontend', 'Auth'] },
    { id: 3, title: 'Set up database schema', assigneeId: 1, dueDate: '2024-07-26', priority: 'Completed', tags: ['Backend', 'DB'] },
    { id: 4, title: 'Write API documentation', assigneeId: 5, dueDate: '2024-08-05', priority: 'Low', status: 'To Do', tags: ['Docs'] },
    { id: 5, title: 'Test user registration flow', assigneeId: 6, dueDate: '2024-08-02', priority: 'Medium', status: 'In Progress', tags: ['QA', 'Testing'] },
];

export const COMMENTS_DATA: Omit<Comment, 'replies'>[] = [
    { id: 1, authorId: 2, content: "Great work on the new feature! It's looking really polished.", timestamp: "2 days ago", parentId: null },
    { id: 2, authorId: 1, content: "Thanks! I'm glad you like it. I'll be pushing the final changes tomorrow.", timestamp: "2 days ago", parentId: 1 },
    { id: 3, authorId: 4, content: "Let's make sure the documentation is updated before the release.", timestamp: "1 day ago", parentId: 1 },
    { id: 4, authorId: 3, content: "I've started on the new icons for the dashboard.", timestamp: "3 hours ago", parentId: null },
];

export const COUNTRIES_DATA = [
    { value: 'USA', label: 'United States' },
    { value: 'CAN', label: 'Canada' },
    { value: 'GBR', label: 'United Kingdom' },
    { value: 'AUS', label: 'Australia' },
    { value: 'DEU', label: 'Germany' },
    { value: 'FRA', label: 'France' },
];
