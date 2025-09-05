import { User, Task, CalendarEvent, Product, POSProduct, Review, BlogPost, Conversation, Message, Course } from './types';

export const NAV_ITEMS = [
  { path: '/dashboard', name: 'Dashboard', icon: 'bi-grid-1x2-fill' },
  {
    name: 'Management',
    icon: 'bi-briefcase-fill',
    items: [
      { path: '/users', name: 'Users' },
      { path: '/tasks', name: 'Tasks' },
      { path: '/appointments', name: 'Appointments' },
    ],
  },
  {
    name: 'Content',
    icon: 'bi-file-earmark-text-fill',
    items: [
      { path: '/editor', name: 'Editor' },
      { path: '/feedback', name: 'Feedback' },
      { path: '/calendar', name: 'Calendar' },
    ],
  },
  {
    name: 'Component Demos',
    icon: 'bi-layers-fill',
    items: [
      { path: '/documentation', name: 'Docs Index' },
      { path: '/avatars', name: 'Avatars' },
      { path: '/content', name: 'Content' },
      { path: '/forms', name: 'Forms' },
      { path: '/advanced-selects', name: 'Advanced Selects' },
      { path: '/icons', name: 'Icons' },
      { path: '/images', name: 'Images' },
      { path: '/loaders', name: 'Loaders' },
      { path: '/navigation', name: 'Navigation' },
      { path: '/overlays', name: 'Overlays' },
      { path: '/tables', name: 'Tables' },
      { path: '/text-fields', name: 'Text Fields' },
      { path: '/toggles', name: 'Toggles' },
    ],
  },
  {
    name: 'Sample Pages',
    icon: 'bi-window-stack',
    items: [
        { path: '/sample/products', name: 'Products' },
        { path: '/sample/chat', name: 'Chat' },
        { path: '/sample/blog', name: 'Blog' },
        { path: '/sample/pos', name: 'Point of Sale' },
        { path: '/sample/course', name: 'Online Course' },
    ]
  }
];

export const USERS_DATA: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'active', lastLogin: '2024-07-21 10:00 AM', bio: 'Administrator with full access. Diana is a seasoned web developer with over 10 years of experience in building scalable and maintainable applications. She is passionate about clean code, modern JavaScript frameworks, and sharing her knowledge with the community. As the instructor for this course, she brings a wealth of practical experience from her time at several top tech companies.' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Editor', status: 'active', lastLogin: '2024-07-21 09:30 AM', bio: 'Content editor and writer.' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-07-19 02:00 PM', bio: 'Standard viewer account.' },
  { id: 4, name: 'Diana Prince', email: 'diana.prince@example.com', role: 'Editor', status: 'active', lastLogin: '2024-07-20 11:00 AM', bio: 'Responsible for marketing content.' },
];

export const TASKS_DATA: Task[] = [
    { id: 1, title: "Deploy new feature", status: "In Progress", priority: "High", dueDate: "2024-08-01", assigneeId: 1, tags: ["Frontend", "Deployment"] },
    { id: 2, title: "Write blog post", status: "To Do", priority: "Medium", dueDate: "2024-07-25", assigneeId: 2, tags: ["Content"] },
    { id: 3, title: "Update documentation", status: "Completed", priority: "Low", dueDate: "2024-07-20", assigneeId: 4, tags: ["Docs"] },
    { id: 4, title: "Fix login bug", status: "In Progress", priority: "High", dueDate: "2024-07-23", assigneeId: 1, tags: ["Backend", "Bug"] },
];

export const REVIEWS_DATA: Review[] = [
    { id: 1, authorId: 2, content: "This is a great product, highly recommend!", timestamp: "2 days ago" },
    { id: 2, authorId: 3, content: "Could be better, the color is slightly off.", timestamp: "3 days ago" },
];

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
    { id: 1, title: 'Team Meeting', date: new Date().toISOString().slice(0, 10), category: 'primary' },
    { id: 2, title: 'Project Deadline', date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().slice(0, 10), category: 'danger' },
    { id: 3, title: 'Feature Launch', date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().slice(0, 10), category: 'success' },
];

export const COUNTRIES_DATA = [
    { value: 'USA', label: 'United States' },
    { value: 'CAN', label: 'Canada' },
    { value: 'GBR', label: 'United Kingdom' },
    { value: 'AUS', label: 'Australia' },
];

export const PRODUCTS_DATA: Product[] = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, rating: 4.5, reviewCount: 150, imageUrl: 'https://picsum.photos/seed/product1/400/300', description: 'High-quality sound and long battery life.', specs: { 'Color': 'Black', 'Battery': '20 hours' } },
    { id: 2, name: 'Running Shoes', category: 'Apparel', price: 120.00, rating: 4.8, reviewCount: 210, imageUrl: 'https://picsum.photos/seed/product2/400/300', description: 'Lightweight and comfortable for daily runs.', specs: { 'Material': 'Mesh', 'Weight': '250g' } },
    { id: 3, name: 'Coffee Maker', category: 'Home Goods', price: 75.50, rating: 4.3, reviewCount: 80, imageUrl: 'https://picsum.photos/seed/product3/400/300', description: 'Brews up to 12 cups of delicious coffee.', specs: { 'Capacity': '1.5L', 'Power': '900W' } },
    { id: 4, name: 'Ergonomic Keyboard', category: 'Electronics', price: 150.00, rating: 4.9, reviewCount: 95, imageUrl: 'https://picsum.photos/seed/product4/400/300', description: 'Comfortable typing experience for long hours.', specs: { 'Connectivity': 'Bluetooth', 'Layout': 'Split' } },
    { id: 5, name: 'Yoga Mat', category: 'Fitness', price: 40.00, rating: 4.6, reviewCount: 120, imageUrl: 'https://picsum.photos/seed/product5/400/300', description: 'Non-slip and eco-friendly.', specs: { 'Thickness': '6mm', 'Material': 'TPE' } },
    { id: 6, name: 'Smart Watch', category: 'Electronics', price: 250.00, rating: 4.7, reviewCount: 300, imageUrl: 'https://picsum.photos/seed/product6/400/300', description: 'Track your fitness and stay connected.', specs: { 'Display': 'AMOLED', 'Water Resistance': '5ATM' } },
    { id: 7, name: 'Winter Jacket', category: 'Apparel', price: 200.00, rating: 4.9, reviewCount: 180, imageUrl: 'https://picsum.photos/seed/product7/400/300', description: 'Waterproof and insulated for cold weather.', specs: { 'Insulation': 'Down', 'Pockets': '5' } },
];

export const POS_PRODUCTS_DATA: POSProduct[] = PRODUCTS_DATA.map(p => ({ ...p, stock: Math.floor(Math.random() * 100)}));

export const BLOG_POSTS_DATA: BlogPost[] = [
    { id: 1, title: 'Getting Started with React Hooks', category: 'Technology', authorId: 1, publishDate: 'July 20, 2024', imageUrl: 'https://picsum.photos/seed/blog1/800/450', excerpt: 'A deep dive into useState, useEffect, and other essential React Hooks.' },
    { id: 2, title: 'Top 5 Design Trends for 2024', category: 'Design', authorId: 4, publishDate: 'July 18, 2024', imageUrl: 'https://picsum.photos/seed/blog2/800/450', excerpt: 'Discover the latest trends shaping the future of web and mobile design.' },
    { id: 3, title: 'Our Company\'s Journey', category: 'Business', authorId: 2, publishDate: 'July 15, 2024', imageUrl: 'https://picsum.photos/seed/blog3/800/450', excerpt: 'A look back at our achievements and what lies ahead.' },
];

export const CONVERSATIONS_DATA: Conversation[] = [
    { id: 1, participantId: 1, lastMessage: "Yes, I'll get that done.", lastMessageTimestamp: "10:30 AM", unreadCount: 0 },
    { id: 2, participantId: 2, lastMessage: "Can you review this document?", lastMessageTimestamp: "Yesterday", unreadCount: 2 },
    { id: 3, participantId: 4, lastMessage: "Sounds good!", lastMessageTimestamp: "3:15 PM", unreadCount: 0 },
];

export const MESSAGES_DATA: Message[] = [
    { id: 1, conversationId: 2, senderId: 2, content: "Hey, can you take a look at the latest design mockups?", timestamp: "9:00 AM" },
    { id: 2, conversationId: 2, senderId: 0, content: "Sure, sending my feedback now.", timestamp: "9:05 AM" },
    { id: 3, conversationId: 2, senderId: 2, content: "Thanks!", timestamp: "9:06 AM" },
    { id: 4, conversationId: 2, senderId: 0, content: "Can you review this document?", timestamp: "9:10 AM" },
];

export const ONLINE_COURSE_DATA: Course = {
    id: 1,
    title: 'Advanced React and TypeScript',
    instructorId: 4,
    description: 'Take your React skills to the next level by mastering TypeScript. This course covers advanced patterns, performance optimization, and building a complete, type-safe application from scratch. You will learn how to leverage TypeScript’s powerful features to write more robust and maintainable React code.',
    modules: [
        {
            id: 'm1',
            title: 'Introduction to TypeScript with React',
            lectures: [
                { id: 'l1-1', title: 'Course Overview', duration: '3:45' },
                { id: 'l1-2', title: 'Setting up the Development Environment', duration: '8:12' },
                { id: 'l1-3', title: 'Basic Types and Interfaces', duration: '12:30' },
            ]
        },
        {
            id: 'm2',
            title: 'Advanced Components and Props',
            lectures: [
                { id: 'l2-1', title: 'Typing Functional Components', duration: '9:55' },
                { id: 'l2-2', title: 'Generics with Components', duration: '15:20' },
                { id: 'l2-3', title: 'Render Props and Higher-Order Components', duration: '18:05' },
            ]
        },
        {
            id: 'm3',
            title: 'State Management',
            lectures: [
                { id: 'l3-1', title: 'Typing useState and useReducer', duration: '11:40' },
                { id: 'l3-2', title: 'Context API with TypeScript', duration: '14:00' },
                { id: 'l3-3', title: 'Integrating with Redux Toolkit', duration: '22:15' },
            ]
        }
    ]
};