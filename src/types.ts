export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  bio?: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'primary' | 'success' | 'danger' | 'warning';
}

export interface Comment {
  id: number;
  authorId: number;
  content: string;
  timestamp: string;
  parentId: number | null;
  replies?: Comment[];
}

export interface LineItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export interface Option {
  value: string | number;
  label: string;
}

export interface Task {
  id: number;
  title: string;
  assigneeId: number;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'To Do';
  tags: string[];
}
