import { User, Task, CalendarEvent, Option, Product, Review, BlogPost, Conversation, Message } from './types';

export const NAV_ITEMS = [
  { path: '/dashboard', name: 'Dashboard', icon: 'bi-grid-1x2-fill' },
  { path: '/users', name: 'Users', icon: 'bi-people-fill' },
  { path: '/tasks', name: 'Tasks', icon: 'bi-card-checklist' },
  { path: '/calendar', name: 'Calendar', icon: 'bi-calendar-event-fill' },
  {
    name: 'Component Demos',
    icon: 'bi-stack',
    items: [
      { path: '/avatars', name: 'Avatars' },
      { path: '/content', name: 'Content' },
      { path: '/forms', name: 'Forms' },
      { path: '/icons', name: 'Icons' },
      { path: '/images', name: 'Images & Logos' },
      { path: '/loaders', name: 'Loaders' },
      { path: '/navigation', name: 'Navigation' },
      { path: '/overlays', name: 'Overlays' },
      { path: '/tables', name: 'Tables' },
    ]
  },
  {
    name: 'Sample Pages',
    icon: 'bi-file-earmark-richtext-fill',
    items: [
      { path: '/sample/products', name: 'Product Catalog' },
      { path: '/sample/products/1', name: 'Product Detail' },
      { path: '/sample/checkout', name: 'Checkout' },
      { path: '/sample/blog', name: 'Blog Page' },
      { path: '/sample/chat', name: 'Chat App' },
      { path: '/', name: 'Landing Page' },
    ]
  },
  { path: '/settings', name: 'Settings', icon: 'bi-gear-fill' },
  { path: '/documentation', name: 'Documentation', icon: 'bi-file-earmark-text-fill' },
];

export const USERS_DATA: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active', lastLogin: '2024-07-20', bio: 'Administrator and lead developer.' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'active', lastLogin: '2024-07-21', bio: 'Content editor and marketer.' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-06-15' },
    { id: 4, name: 'Mary Johnson', email: 'mary.johnson@example.com', role: 'Editor', status: 'pending', lastLogin: 'N/A' },
    { id: 5, name: 'David Williams', email: 'david.williams@example.com', role: 'Viewer', status: 'active', lastLogin: '2024-07-21' },
];

export const TASKS_DATA: Task[] = [
    { id: 1, title: 'Design new dashboard layout', status: 'In Progress', priority: 'High', dueDate: '2024-08-01', assigneeId: 1, tags: ['UI', 'Design'] },
    { id: 2, title: 'Develop user authentication', status: 'To Do', priority: 'High', dueDate: '2024-08-05', assigneeId: 2, tags: ['Backend', 'Security'] },
    { id: 3, title: 'Write documentation for API', status: 'Completed', priority: 'Medium', dueDate: '2024-07-20', assigneeId: 1, tags: ['Docs'] },
    { id: 4, title: 'Fix bug in reporting module', status: 'To Do', priority: 'Low', dueDate: '2024-07-28', assigneeId: 3, tags: ['Bugfix'] },
    { id: 5, title: 'Review marketing copy', status: 'In Progress', priority: 'Medium', dueDate: '2024-07-25', assigneeId: 2, tags: ['Marketing'] },
];

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
    { id: 1, title: 'Team Meeting', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], category: 'primary' },
    { id: 2, title: 'Project Deadline', date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], category: 'danger' },
    { id: 3, title: 'Client Call', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], category: 'success' },
    { id: 4, title: 'Product Launch', date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0], category: 'warning' },
];

export const COUNTRIES_DATA: Option[] = [
    { value: 'USA', label: 'United States' },
    { value: 'CAN', label: 'Canada' },
    { value: 'MEX', label: 'Mexico' },
    { value: 'GBR', label: 'United Kingdom' },
    { value: 'DEU', label: 'Germany' },
];

export const REVIEWS_DATA: Review[] = [
  { id: 101, authorId: 2, content: "Absolutely fantastic product! The quality exceeded my expectations.", timestamp: "2 days ago", rating: 5 },
  { id: 102, authorId: 3, content: "Good value for the price, but the setup was a bit tricky.", timestamp: "1 week ago", rating: 4 },
  { id: 103, authorId: 4, content: "It's okay. Does the job but nothing special.", timestamp: "3 weeks ago", rating: 3 },
];

export const PRODUCTS_DATA: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', rating: 4.5, reviewCount: 120, imageUrl: 'https://picsum.photos/seed/product1/600/600', description: 'Experience immersive sound with these noise-cancelling wireless headphones.', specs: { 'Connectivity': 'Bluetooth 5.2', 'Battery Life': '30 hours', 'Color': 'Midnight Black' } },
  { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics', rating: 4.8, reviewCount: 250, imageUrl: 'https://picsum.photos/seed/product2/600/600', description: 'Stay connected and track your fitness goals with this sleek smartwatch.', specs: { 'Display': '1.4" AMOLED', 'Water Resistance': '5 ATM', 'Sensors': 'Heart Rate, GPS' } },
  { id: 3, name: 'Organic Cotton T-Shirt', price: 24.99, category: 'Apparel', rating: 4.2, reviewCount: 88, imageUrl: 'https://picsum.photos/seed/product3/600/600', description: 'A comfortable and stylish t-shirt made from 100% organic cotton.', specs: { 'Material': 'Organic Cotton', 'Fit': 'Modern', 'Origin': 'Sustainably Sourced' } },
  { id: 4, name: 'Modern Coffee Table', price: 149.50, category: 'Home Goods', rating: 4.6, reviewCount: 45, imageUrl: 'https://picsum.photos/seed/product4/600/600', description: 'A minimalist coffee table that adds a touch of elegance to any living room.', specs: { 'Material': 'Solid Oak Wood', 'Dimensions': '40" x 20" x 18"', 'Finish': 'Natural Wax' } },
  { id: 5, name: 'The Art of Programming', price: 45.00, category: 'Books', rating: 4.9, reviewCount: 312, imageUrl: 'https://picsum.photos/seed/product5/600/600', description: 'A must-read for any aspiring software developer. Covers fundamental concepts.', specs: { 'Author': 'Dev Coder', 'Pages': '550', 'Format': 'Hardcover' } },
  { id: 6, name: 'LED Desk Lamp', price: 39.99, category: 'Home Goods', rating: 4.3, reviewCount: 95, imageUrl: 'https://picsum.photos/seed/product6/600/600', description: 'Illuminate your workspace with this adjustable, multi-temperature LED lamp.', specs: { 'Brightness': '800 Lumens', 'Color Temp': '2700K - 6500K', 'Power': 'USB-C' } },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  { id: 1, title: 'Getting Started with Our Platform', authorId: 1, publishDate: 'July 15, 2024', category: 'Tutorials', excerpt: 'A beginner\'s guide to setting up your first project and navigating the key features of our powerful admin panel.', imageUrl: 'https://picsum.photos/seed/blog1/800/400', content: '...' },
  { id: 2, title: 'Advanced Features You Should Know', authorId: 2, publishDate: 'July 10, 2024', category: 'Productivity', excerpt: 'Unlock the full potential of our tools with these tips and tricks for power users. Learn about advanced configurations.', imageUrl: 'https://picsum.photos/seed/blog2/800/400', content: '...' },
  { id: 3, title: 'Our Vision for the Future', authorId: 1, publishDate: 'July 1, 2024', category: 'Company News', excerpt: 'A look at our roadmap, what new features are coming next, and our long-term vision for the platform.', imageUrl: 'https://picsum.photos/seed/blog3/800/400', content: '...' },
];

export const CONVERSATIONS_DATA: Conversation[] = [
    { id: 1, participantId: 2, lastMessage: 'Sure, I will get that done.', lastMessageTimestamp: '10:40 AM', unreadCount: 0 },
    { id: 2, participantId: 3, lastMessage: 'Can you check the latest report?', lastMessageTimestamp: '9:30 AM', unreadCount: 2 },
    { id: 3, participantId: 4, lastMessage: 'Thanks for the update!', lastMessageTimestamp: 'Yesterday', unreadCount: 0 },
];

export const MESSAGES_DATA: Message[] = [
    { id: 1, conversationId: 2, senderId: 3, content: 'Hey, how is the project going?', timestamp: '9:25 AM' },
    { id: 2, conversationId: 2, senderId: 0, content: 'Going well! We are on track.', timestamp: '9:28 AM' },
    { id: 3, conversationId: 2, senderId: 3, content: 'Great to hear. Can you check the latest report?', timestamp: '9:30 AM' },
];
