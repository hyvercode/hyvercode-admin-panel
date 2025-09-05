// src/types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  bio?: string;
}

export interface Task {
  id: number;
  title: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  assigneeId: number;
  tags: string[];
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

export interface Review {
    id: number;
    authorId: number;
    content: string;
    timestamp: string;
}

export interface LineItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export interface Option {
  value: string;
  label: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  specs: Record<string, string>;
}

export interface POSProduct extends Product {
    stock: number;
}

export interface POSCartItem extends POSProduct {
    quantity: number;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  authorId: number;
  publishDate: string;
  imageUrl: string;
  excerpt: string;
}

export interface Conversation {
  id: number;
  participantId: number;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

export interface Message {
  id: number;
  conversationId: number;
  senderId: number; // 0 for current user
  content: string;
  timestamp: string;
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Course {
  id: number;
  title: string;
  instructorId: number;
  description: string;
  modules: Module[];
}