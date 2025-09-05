// Base user structure
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  avatarUrl?: string;
  bio?: string;
}

// For the calendar component
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'primary' | 'success' | 'danger' | 'warning';
}

// For comment threads
export interface Comment {
    id: number;
    authorId: number;
    content: string;
    timestamp: string;
    parentId: number | null;
    replies?: Comment[];
}

export type Review = Omit<Comment, 'replies'>;


// For product catalog
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    specs: Record<string, string>;
}

// For blog
export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    category: string;
    authorId: number;
    publishDate: string;
}

// For POS
export interface POSProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface POSCartItem extends POSProduct {
    quantity: number;
}

// For Online Course
export interface CourseLecture {
    id: string;
    title: string;
    duration: string;
}

export interface CourseModule {
    id: string;
    title: string;
    lectures: CourseLecture[];
}

export interface OnlineCourse {
    id: number;
    title: string;
    description: string;
    instructorId: number;
    modules: CourseModule[];
}


// For forms
export interface Option {
    value: string;
    label: string;
}

// For invoice form table
export interface LineItem {
    id: number;
    description: string;
    quantity: number;
    price: number;
}

// For Kanban board
export interface KanbanTask {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'inprogress' | 'done';
    assigneeId?: number;
}
export type KanbanStatus = 'todo' | 'inprogress' | 'done';


// For Chat
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

// For AI Chat Assistant
export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}