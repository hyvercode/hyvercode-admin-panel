import { User, Product, Review, BlogPost, CalendarEvent, Task, KanbanColumn, Conversation, Message, POSProduct } from './types';

export const USERS_DATA: User[] = [
  { id: 0, name: 'Current User', email: 'me@example.com', role: 'Admin', status: 'active', bio: 'The current logged in user.' },
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', bio: 'Lead administrator and project manager.' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', bio: 'Content editor and writer.' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'inactive', bio: 'Has read-only access.' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'active', bio: 'UX/UI designer and front-end developer.' },
];

export const PRODUCTS_DATA: Product[] = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 249.99, rating: 4.8, reviewCount: 1204, imageUrl: 'https://picsum.photos/seed/product1/400/300', description: 'Immerse yourself in sound with these premium noise-cancelling headphones.', specs: { 'Connectivity': 'Bluetooth 5.0', 'Battery Life': '30 hours' } },
  { id: 2, name: 'Smartwatch with GPS', category: 'Wearables', price: 199.50, rating: 4.6, reviewCount: 876, imageUrl: 'https://picsum.photos/seed/product2/400/300', description: 'Track your fitness and stay connected with this sleek smartwatch.', specs: { 'Display': 'AMOLED', 'Water Resistance': '5 ATM' } },
  { id: 3, name: 'Mechanical Keyboard', category: 'Peripherals', price: 120.00, rating: 4.9, reviewCount: 952, imageUrl: 'https://picsum.photos/seed/product3/400/300', description: 'A tactile and responsive keyboard for coders and gamers.', specs: { 'Switches': 'Cherry MX Brown', 'Backlight': 'RGB' } },
  { id: 4, name: '4K Ultra HD Monitor', category: 'Electronics', price: 450.00, rating: 4.7, reviewCount: 653, imageUrl: 'https://picsum.photos/seed/product4/400/300', description: 'Experience stunning visuals with this 27-inch 4K monitor.', specs: { 'Resolution': '3840x2160', 'Panel Type': 'IPS' } },
  { id: 5, name: 'Ergonomic Office Chair', category: 'Furniture', price: 320.00, rating: 4.5, reviewCount: 541, imageUrl: 'https://picsum.photos/seed/product5/400/300', description: 'Stay comfortable during long work sessions.', specs: { 'Material': 'Mesh', 'Adjustability': 'Fully adjustable' } },
  { id: 6, name: 'Portable SSD 1TB', category: 'Storage', price: 130.00, rating: 4.8, reviewCount: 1500, imageUrl: 'https://picsum.photos/seed/product6/400/300', description: 'Fast and reliable storage on the go.', specs: { 'Read Speed': '1050MB/s', 'Interface': 'USB-C' } },
  { id: 7, name: 'Webcam Pro', category: 'Peripherals', price: 99.99, rating: 4.6, reviewCount: 789, imageUrl: 'https://picsum.photos/seed/product7/400/300', description: 'Crystal clear video for your meetings and streams.', specs: { 'Resolution': '1080p 60fps', 'Field of View': '90 degrees' } },
];

export const REVIEWS_DATA: Review[] = [
    { id: 1, authorId: 2, content: "This is a great product, highly recommended!", timestamp: "2 days ago", parentId: null },
    { id: 2, authorId: 4, content: "I agree, the build quality is excellent.", timestamp: "1 day ago", parentId: 1 },
    { id: 3, authorId: 1, content: "Thanks for the feedback!", timestamp: "1 day ago", parentId: 2 },
    { id: 4, authorId: 3, content: "Had some issues with shipping, but the product itself is good.", timestamp: "3 days ago", parentId: null },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
    { id: 1, title: 'Getting Started with Our New API', authorId: 1, category: 'Technology', excerpt: 'Learn how to integrate our powerful new API into your applications.', imageUrl: 'https://picsum.photos/seed/blog1/800/450', publishDate: 'October 26, 2023' },
    { id: 2, title: '10 Tips for Better Project Management', authorId: 4, category: 'Productivity', excerpt: 'Boost your team\'s efficiency with these proven strategies.', imageUrl: 'https://picsum.photos/seed/blog2/800/450', publishDate: 'October 24, 2023' },
    { id: 3, title: 'UI/UX Design Trends of 2024', authorId: 4, category: 'Design', excerpt: 'A look into the future of user interface and experience design.', imageUrl: 'https://picsum.photos/seed/blog3/800/450', publishDate: 'October 22, 2023' },
];

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
    { id: '1', title: 'Team Sync', date: new Date().toISOString().split('T')[0], category: 'primary' },
    { id: '2', title: 'Project Deadline', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], category: 'danger' },
    { id: '3', title: 'Client Meeting', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], category: 'success' },
];

export const TASKS_DATA: Task[] = [
    { id: 'task-1', title: 'Design new dashboard layout', description: 'Create mockups in Figma.', status: 'In Progress', priority: 'High', assigneeIds: [4] },
    { id: 'task-2', title: 'Develop authentication flow', description: 'Implement JWT-based auth.', status: 'Todo', priority: 'High', assigneeIds: [1] },
    { id: 'task-3', title: 'Write API documentation', description: 'Use Swagger for documentation.', status: 'Done', priority: 'Medium', assigneeIds: [2] },
    { id: 'task-4', title: 'Fix bug in reporting module', description: 'CSV export is failing.', status: 'In Progress', priority: 'Medium', assigneeIds: [1] },
    { id: 'task-5', title: 'Plan Q4 marketing campaign', description: 'Coordinate with the marketing team.', status: 'Todo', priority: 'Low', assigneeIds: [4, 2] },
];

export const COUNTRIES_DATA = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
];

export const CONVERSATIONS_DATA: Conversation[] = [
    { id: 1, participantId: 1, lastMessage: "Hey, can we sync up about the new designs?", lastMessageTimestamp: "10:30 AM", unreadCount: 0 },
    { id: 2, participantId: 2, lastMessage: "The blog post draft is ready for your review.", lastMessageTimestamp: "9:45 AM", unreadCount: 2 },
    { id: 3, participantId: 4, lastMessage: "I've pushed the latest changes to the staging branch.", lastMessageTimestamp: "Yesterday", unreadCount: 0 },
];

export const MESSAGES_DATA: Message[] = [
    { id: 1, conversationId: 2, senderId: 2, content: "The blog post draft is ready for your review.", timestamp: "9:45 AM" },
    { id: 2, conversationId: 2, senderId: 2, content: "Let me know what you think!", timestamp: "9:45 AM" },
    { id: 3, conversationId: 2, senderId: 0, content: "Awesome, I'll take a look now.", timestamp: "9:46 AM" },
];

export const POS_PRODUCTS_DATA: POSProduct[] = [
    { id: 1, name: 'Espresso', price: 3.50, imageUrl: 'https://picsum.photos/seed/coffee1/200/200' },
    { id: 2, name: 'Latte', price: 4.50, imageUrl: 'https://picsum.photos/seed/coffee2/200/200' },
    { id: 3, name: 'Cappuccino', price: 4.50, imageUrl: 'https://picsum.photos/seed/coffee3/200/200' },
    { id: 4, name: 'Americano', price: 3.75, imageUrl: 'https://picsum.photos/seed/coffee4/200/200' },
    { id: 5, name: 'Croissant', price: 2.75, imageUrl: 'https://picsum.photos/seed/pastry1/200/200' },
    { id: 6, name: 'Muffin', price: 3.00, imageUrl: 'https://picsum.photos/seed/pastry2/200/200' },
    { id: 7, name: 'Bagel', price: 3.25, imageUrl: 'https://picsum.photos/seed/pastry3/200/200' },
    { id: 8, name: 'Iced Tea', price: 3.00, imageUrl: 'https://picsum.photos/seed/drink1/200/200' },
];

export const ONLINE_COURSE_DATA = {
    title: 'Introduction to Modern React',
    description: 'Learn the fundamentals of React, including hooks, components, and state management.',
    instructorId: 4,
    modules: [
        { id: 'm1', title: 'Module 1: Getting Started', lectures: [{id: 'l1-1', title: 'Course Introduction', duration: '5:30'}, {id: 'l1-2', title: 'Setting up your environment', duration: '12:15'}] },
        { id: 'm2', title: 'Module 2: Core Concepts', lectures: [{id: 'l2-1', title: 'Understanding JSX', duration: '8:45'}, {id: 'l2-2', title: 'Components and Props', duration: '15:00'}] },
    ]
};
