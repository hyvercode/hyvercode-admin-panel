import { User, CalendarEvent, Product, BlogPost, Review, POSProduct, OnlineCourse, KanbanTask, Conversation, Message } from './types';

export const USERS_DATA: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', bio: 'Lead developer and project manager.' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', bio: 'Content editor for the main blog.' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'inactive', bio: 'Intern, learning the ropes.' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'active', bio: 'Marketing specialist.' },
];

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
    { id: '1', title: 'Team Meeting', date: '2024-07-20', category: 'primary' },
    { id: '2', title: 'Project Deadline', date: '2024-07-22', category: 'danger' },
    { id: '3', title: 'Client Call', date: '2024-07-22', category: 'warning' },
    { id: '4', title: 'Deploy v2.0', date: '2024-07-28', category: 'success' },
];

export const PRODUCTS_DATA: Product[] = [
    { id: 1, name: 'Wireless Headphones', description: 'High-fidelity wireless headphones with noise-cancellation.', price: 199.99, category: 'Electronics', rating: 4.8, reviewCount: 120, imageUrl: 'https://picsum.photos/seed/product1/400/300', specs: { 'Connectivity': 'Bluetooth 5.0', 'Battery Life': '20 hours' } },
    { id: 2, name: 'Smart Watch', description: 'Track your fitness and stay connected on the go.', price: 249.50, category: 'Wearables', rating: 4.6, reviewCount: 95, imageUrl: 'https://picsum.photos/seed/product2/400/300', specs: { 'Display': 'OLED', 'Water Resistance': '50m' } },
    { id: 3, name: 'Mechanical Keyboard', description: 'Clicky and responsive keyboard for coders and gamers.', price: 120.00, category: 'Peripherals', rating: 4.9, reviewCount: 250, imageUrl: 'https://picsum.photos/seed/product3/400/300', specs: { 'Switches': 'Cherry MX Blue', 'Backlight': 'RGB' } },
    { id: 4, name: '4K Monitor', description: 'Ultra-HD monitor with vibrant colors and sharp details.', price: 450.00, category: 'Monitors', rating: 4.7, reviewCount: 150, imageUrl: 'https://picsum.photos/seed/product4/400/300', specs: { 'Resolution': '3840x2160', 'Refresh Rate': '60Hz' } },
    { id: 5, name: 'Ergonomic Mouse', description: 'Comfortable mouse designed for long hours of use.', price: 79.99, category: 'Peripherals', rating: 4.5, reviewCount: 180, imageUrl: 'https://picsum.photos/seed/product5/400/300', specs: { 'DPI': '16000', 'Buttons': '6 programmable' } },
    { id: 6, name: 'Webcam Pro', description: '1080p webcam with a built-in ring light.', price: 99.00, category: 'Peripherals', rating: 4.6, reviewCount: 110, imageUrl: 'https://picsum.photos/seed/product6/400/300', specs: { 'Resolution': '1080p', 'Frame Rate': '30fps' } },
];

export const REVIEWS_DATA: Review[] = [
    { id: 1, authorId: 2, content: 'Excellent product, the sound quality is amazing!', timestamp: '2 days ago', parentId: null },
    { id: 2, authorId: 4, content: 'Good value for the price. The noise cancellation could be a bit better though.', timestamp: '1 week ago', parentId: null },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
    { id: 1, title: 'Getting Started with React Hooks', excerpt: 'A deep dive into useState, useEffect, and other essential React hooks for modern web development.', imageUrl: 'https://picsum.photos/seed/blog1/800/400', category: 'Tutorials', authorId: 1, publishDate: 'July 15, 2024' },
    { id: 2, title: 'UI/UX Design Trends in 2024', excerpt: 'Explore the latest trends in user interface and user experience design, from glassmorphism to AI-driven interfaces.', imageUrl: 'https://picsum.photos/seed/blog2/800/400', category: 'Design', authorId: 4, publishDate: 'July 10, 2024' },
];

export const COUNTRIES_DATA = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'AUS', label: 'Australia' },
];

export const POS_PRODUCTS_DATA: POSProduct[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product #${i + 1}`,
    price: parseFloat((Math.random() * 20 + 5).toFixed(2)),
    imageUrl: `https://picsum.photos/seed/pos${i + 1}/200/200`,
}));

export const ONLINE_COURSE_DATA: OnlineCourse = {
    id: 1,
    title: 'Modern Web Development Bootcamp',
    description: 'A comprehensive course covering everything you need to know to become a full-stack web developer in 2024.',
    instructorId: 1,
    modules: [
        { id: 'm1', title: 'Introduction to HTML & CSS', lectures: [{ id: 'l1-1', title: 'Basic Structure', duration: '10:32' }, { id: 'l1-2', title: 'Styling with CSS', duration: '15:45' }] },
        { id: 'm2', title: 'JavaScript Fundamentals', lectures: [{ id: 'l2-1', title: 'Variables and Data Types', duration: '12:05' }, { id: 'l2-2', title: 'Functions and Scope', duration: '18:20' }] },
    ]
};

export const KANBAN_TASKS_DATA: KanbanTask[] = [
  { id: 'task-1', title: 'Design new dashboard layout', description: 'Create mockups in Figma', status: 'todo', assigneeId: 4 },
  { id: 'task-2', title: 'Develop login page component', description: 'Use React and TypeScript', status: 'inprogress', assigneeId: 1 },
  { id: 'task-3', title: 'Setup CI/CD pipeline', description: 'Use GitHub Actions', status: 'done', assigneeId: 1 },
  { id: 'task-4', title: 'Write API documentation', description: 'Use Swagger/OpenAPI spec', status: 'todo' },
];

export const CONVERSATIONS_DATA: Conversation[] = [
    { id: 1, participantId: 1, lastMessage: 'Hey, are you free for a quick call?', lastMessageTimestamp: '10:30 AM', unreadCount: 0 },
    { id: 2, participantId: 2, lastMessage: 'I have finished the report. I will send it over.', lastMessageTimestamp: 'Yesterday', unreadCount: 2 },
    { id: 3, participantId: 4, lastMessage: 'Great, thanks!', lastMessageTimestamp: '3 days ago', unreadCount: 0 },
];

export const MESSAGES_DATA: Message[] = [
    { id: 1, conversationId: 2, senderId: 2, content: 'Hi, just wanted to follow up on the design mockups.', timestamp: '9:15 AM' },
    { id: 2, conversationId: 2, senderId: 0, content: 'Hey! Yes, I am almost done. Will share them by EOD.', timestamp: '9:16 AM' },
    { id: 3, conversationId: 2, senderId: 2, content: 'I have finished the report. I will send it over.', timestamp: '9:18 AM' },
];