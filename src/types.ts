// --- Generic / Utility Types ---
export interface Option {
  value: string;
  label: string;
}


// --- Core Data Models ---
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  bio: string;
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

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  authorId: number;
  content: string;
  timestamp: string;
  parentId: number | null;
  replies?: Review[];
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

export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    category: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}


// --- Task Management / Kanban ---
export type TaskStatus = 'Todo' | 'In Progress' | 'Done';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeIds: number[];
}

export interface KanbanColumn {
    id: string;
    title: string;
    taskIds: string[];
}


// --- Chat / Messaging ---
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
    senderId: number;
    content: string;
    timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}


// --- E-commerce / POS ---
export interface POSProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface POSCartItem extends POSProduct {
    quantity: number;
}

export interface LineItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}


// --- ERP System ---
export interface ERPProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface ERPOrder {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
}

export interface ERPCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  lifetimeValue: number;
  lastOrder: string;
}


// --- Education / Courses ---
export interface OnlineCourse {
    id: number;
    title: string;
    description: string;
    instructorId: number;
    modules: {
        id: string;
        title: string;
        lectures: {
            id: string;
            title: string;
            duration: string;
        }[];
    }[];
}

// Commenting for Blog/Posts
export interface Comment {
  id: number;
  authorId: number;
  content: string;
  timestamp: string;
  parentId: number | null;
  replies?: Comment[];
}

// Timeline
export interface TimelineEvent {
    id: number;
    type: string;
    user: string;
    description: string;
    timestamp: string;
}

// Hierarchical Data for Nested Table
export interface HierarchicalData {
  id: string | number;
  name: string;
  children?: HierarchicalData[];
  [key: string]: any;
}
