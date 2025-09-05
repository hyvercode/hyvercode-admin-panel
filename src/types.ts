import { NavLinkProps } from 'react-router-dom';

export interface NavItem {
  path: string;
  name: string;
  icon: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  bio?: string;
}

export interface Task {
  id: number;
  title: string;
  project: string;
  assigneeId: number;
  status: 'To Do' | 'In Progress' | 'Done' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'primary' | 'success' | 'danger' | 'warning';
}

export interface Comment {
  id: number;
  taskId: number;
  authorId: number;
  parentId: number | null;
  content: string;
  timestamp: string;
  replies?: Comment[];
}
