// src/types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  bio?: string;
}

export interface Product {
    id: number;
    name:string;
    category: string;
    price: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    description: string;
    specs: { [key: string]: string };
}

export interface Review {
    id: number;
    authorId: number;
    content: string;
    timestamp: string;
    parentId: number | null;
}

export interface BlogPost {
    id: number;
    title: string;
    authorId: number;
    category: string;
    excerpt: string;
    imageUrl: string;
    publishDate: string;
}

export interface Comment extends Omit<Review, 'authorId'> {
  authorId: number;
  replies?: Comment[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface CalendarEvent {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    category: 'primary' | 'success' | 'danger' | 'warning';
}

export interface POSProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface POSCartItem extends POSProduct {
    quantity: number;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'Todo' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    assigneeIds: number[];
}

export interface KanbanColumn {
    id: 'Todo' | 'In Progress' | 'Done';
    title: string;
    taskIds: string[];
}

export interface Option {
    value: string;
    label: string;
}

export interface LineItem {
    id: number;
    description: string;
    quantity: number;
    price: number;
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
