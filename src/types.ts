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
  price: number;
  category: 'Electronics' | 'Apparel' | 'Books' | 'Home Goods';
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  specs: Record<string, string>;
}

export interface Review extends Omit<Comment, 'parentId' | 'replies'> {
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  authorId: number;
  publishDate: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  content: string; 
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
    senderId: number; // 0 for current user, otherwise participantId
    content: string;
    timestamp: string;
}
