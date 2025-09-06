
import { User, Product, Comment, BlogPost, Task, KanbanColumn, Conversation, Message, POSProduct, ERPProduct, ERPOrder, ERPCustomer, OnlineCourse, CalendarEvent, TimelineEvent, HierarchicalData } from './types';

export interface NavStructure {
    to: string;
    label: string;
    icon: string;
}

export interface NavGroup {
    title: string;
    icon: string;
    items: NavStructure[];
}

export const NAV_ITEMS: (NavStructure | NavGroup)[] = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    {
        title: 'Management',
        icon: 'bi-people-fill',
        items: [
            { to: '/admin/users', label: 'Users', icon: 'bi-people' },
            { to: '/admin/tasks', label: 'Tasks', icon: 'bi-check2-square' },
            { to: '/admin/boards', label: 'Kanban Board', icon: 'bi-kanban' },
        ],
    },
    {
        title: 'ERP',
        icon: 'bi-briefcase-fill',
        items: [
            { to: '/admin/erp/products', label: 'Products', icon: 'bi-box-seam' },
            { to: '/admin/erp/orders', label: 'Orders', icon: 'bi-receipt' },
            { to: '/admin/erp/customers', label: 'Customers', icon: 'bi-person-rolodex' },
        ],
    },
    {
        title: 'Scheduling',
        icon: 'bi-calendar-event',
        items: [
            { to: '/admin/calendar', label: 'Calendar', icon: 'bi-calendar3' },
            { to: '/admin/appointments', label: 'Appointments', icon: 'bi-calendar-check' },
        ],
    },
    {
        title: 'UI Components',
        icon: 'bi-collection-fill',
        items: [
            { to: '/admin/components/forms', label: 'Forms', icon: 'bi-input-cursor-text' },
            { to: '/admin/components/tables', label: 'Tables', icon: 'bi-table' },
            { to: '/admin/components/text-fields', label: 'Text Fields', icon: 'bi-fonts' },
            { to: '/admin/components/advanced-selects', label: 'Advanced Selects', icon: 'bi-menu-button-wide' },
            { to: '/admin/components/toggles', label: 'Toggles', icon: 'bi-toggle-on' },
            { to: '/admin/components/feedback', label: 'Feedback', icon: 'bi-chat-right-dots' },
            { to: '/admin/components/navigation', label: 'Navigation', icon: 'bi-compass' },
            { to: '/admin/components/overlays', label: 'Overlays', icon: 'bi-front' },
            { to: '/admin/components/content', label: 'Content', icon: 'bi-file-richtext' },
            { to: '/admin/components/loaders', label: 'Loaders', icon: 'bi-arrow-repeat' },
            { to: '/admin/components/avatars', label: 'Avatars', icon: 'bi-person-circle' },
            { to: '/admin/components/icons', label: 'Icons', icon: 'bi-gem' },
            { to: '/admin/components/images', label: 'Images', icon: 'bi-image' },
            { to: '/admin/components/editor', label: 'Editor', icon: 'bi-textarea-t' },
        ],
    },
    { to: '/admin/documentation', label: 'Documentation', icon: 'bi-file-earmark-code-fill' },
    {
        title: 'Sample Pages',
        icon: 'bi-window-stack',
        items: [
             { to: '/', label: 'Landing Page', icon: 'bi-house-door' },
             { to: '/sample/products', label: 'Product Catalog', icon: 'bi-shop' },
             { to: '/sample/blog', label: 'Blog', icon: 'bi-journal-richtext' },
             { to: '/sample/chat', label: 'Chat', icon: 'bi-chat-dots' },
             { to: '/sample/pos', label: 'Point of Sale', icon: 'bi-cash-register' },
             { to: '/sample/course', label: 'Online Course', icon: 'bi-book' },
             { to: '/sample/ai-assistant', label: 'AI Assistant', icon: 'bi-robot' },
        ]
    }
];

export const USERS_DATA: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin', status: 'active', bio: 'Lead developer and project manager.' },
    { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', role: 'Developer', status: 'active', bio: 'Frontend specialist with a passion for UX.' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Designer', status: 'inactive', bio: 'Creative designer focusing on modern aesthetics.' },
    { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', role: 'Developer', status: 'active', bio: 'Backend engineer and database architect.' },
    { id: 5, name: 'Ethan Garcia', email: 'ethan.g@example.com', role: 'Tester', status: 'active', bio: 'QA specialist ensuring product quality.' },
    { id: 6, name: 'Fiona Davis', email: 'fiona.d@example.com', role: 'Support', status: 'active', bio: 'Customer support lead, dedicated to helping users.' },
];

export const PRODUCTS_DATA: Product[] = [
    { id: 1, name: 'Quantum Laptop', category: 'Electronics', price: 1200, rating: 4.8, reviewCount: 250, imageUrl: 'https://picsum.photos/seed/laptop/400/300', description: 'High-performance laptop for professionals.', specs: { 'CPU': 'Intel i9', 'RAM': '32GB', 'Storage': '1TB SSD' } },
    { id: 2, name: 'Acoustic Guitar', category: 'Music', price: 450, rating: 4.5, reviewCount: 120, imageUrl: 'https://picsum.photos/seed/guitar/400/300', description: 'Handcrafted guitar with rich tones.', specs: { 'Wood': 'Spruce', 'Strings': 'Steel' } },
    { id: 3, name: 'Ergonomic Chair', category: 'Furniture', price: 350, rating: 4.9, reviewCount: 400, imageUrl: 'https://picsum.photos/seed/chair/400/300', description: 'Supports your back for long work hours.', specs: { 'Material': 'Mesh', 'Adjustment': 'Full' } },
    { id: 4, name: 'Smart Watch', category: 'Electronics', price: 299, rating: 4.7, reviewCount: 512, imageUrl: 'https://picsum.photos/seed/watch/400/300', description: 'Stay connected and track your fitness.', specs: { 'Display': 'OLED', 'Compatibility': 'iOS/Android' } },
    { id: 5, name: 'Coffee Maker', category: 'Home Goods', price: 89, rating: 4.6, reviewCount: 320, imageUrl: 'https://picsum.photos/seed/coffee/400/300', description: 'Brew the perfect cup every morning.', specs: { 'Capacity': '12-cup', 'Type': 'Drip' } },
    { id: 6, name: 'Wireless Headphones', category: 'Electronics', price: 199, rating: 4.8, reviewCount: 890, imageUrl: 'https://picsum.photos/seed/headphones/400/300', description: 'Immersive sound with noise cancellation.', specs: { 'Connectivity': 'Bluetooth 5.2', 'Battery': '30 hours' } },
    { id: 7, name: 'Mechanical Keyboard', category: 'Electronics', price: 150, rating: 4.9, reviewCount: 650, imageUrl: 'https://picsum.photos/seed/keyboard/400/300', description: 'Tactile and responsive for typing and gaming.', specs: { 'Switches': 'Cherry MX Brown', 'Backlight': 'RGB' } },
    { id: 8, name: 'Yoga Mat', category: 'Fitness', price: 40, rating: 4.7, reviewCount: 1200, imageUrl: 'https://picsum.photos/seed/yogamat/400/300', description: 'Non-slip and cushioned for your practice.', specs: { 'Material': 'TPE', 'Thickness': '6mm' } },
];


export const COMMENTS_DATA: Comment[] = [
    { id: 1, authorId: 2, content: 'This is a great point! I hadn\'t considered that perspective.', timestamp: '2 days ago', parentId: null },
    { id: 2, authorId: 4, content: 'Thanks for sharing. Very insightful.', timestamp: '2 days ago', parentId: null },
    { id: 3, authorId: 1, content: 'I agree with Bob. We should explore this further in the next meeting.', timestamp: '1 day ago', parentId: 1 },
    { id: 4, authorId: 2, content: 'Absolutely. I\'ll prepare a brief for it.', timestamp: '1 day ago', parentId: 3 },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  { id: 1, title: 'Unlocking the Power of React Hooks', authorId: 1, category: 'Technology', excerpt: 'Dive deep into useState, useEffect, and custom hooks to streamline your component logic...', imageUrl: 'https://picsum.photos/seed/react/800/600', publishDate: '2023-10-26' },
  { id: 2, title: 'A Guide to Modern UI/UX Design Principles', authorId: 3, category: 'Design', excerpt: 'Learn the core principles that guide effective and beautiful user interface design in today\'s digital landscape.', imageUrl: 'https://picsum.photos/seed/design/800/600', publishDate: '2023-10-22' },
  { id: 3, title: 'Backend Development Trends to Watch in 2024', authorId: 4, category: 'Technology', excerpt: 'From serverless architectures to the rise of Rust, here are the backend trends you need to know.', imageUrl: 'https://picsum.photos/seed/backend/800/600', publishDate: '2023-10-18' },
];

export const KANBAN_TASKS_DATA: Record<string, Task> = {
    'task-1': { id: 'task-1', title: 'Design new dashboard layout', description: 'Create mockups in Figma', status: 'Todo', priority: 'High', assigneeIds: [3] },
    'task-2': { id: 'task-2', title: 'Develop login page component', description: 'Implement form and validation', status: 'In Progress', priority: 'High', assigneeIds: [2, 4] },
    'task-3': { id: 'task-3', title: 'Set up CI/CD pipeline', description: 'Use GitHub Actions', status: 'Done', priority: 'Medium', assigneeIds: [1] },
    'task-4': { id: 'task-4', title: 'Write API documentation', description: 'Use Swagger/OpenAPI', status: 'Todo', priority: 'Medium', assigneeIds: [4] },
    'task-5': { id: 'task-5', title: 'Test user registration flow', description: 'Cover all edge cases', status: 'In Progress', priority: 'Low', assigneeIds: [5] },
};

export const KANBAN_COLUMNS_DATA: Record<string, KanbanColumn> = {
    'Todo': { id: 'Todo', title: 'To Do', taskIds: ['task-1', 'task-4'] },
    'In Progress': { id: 'In Progress', title: 'In Progress', taskIds: ['task-2', 'task-5'] },
    'Done': { id: 'Done', title: 'Done', taskIds: ['task-3'] },
};

export const KANBAN_COLUMN_ORDER_DATA: string[] = ['Todo', 'In Progress', 'Done'];

export const CONVERSATIONS_DATA: Conversation[] = [
    { id: 1, participantId: 2, lastMessage: 'Hey, did you see the latest PR?', lastMessageTimestamp: '10:45 AM', unreadCount: 0 },
    { id: 2, participantId: 3, lastMessage: 'The new mockups are ready for review.', lastMessageTimestamp: '9:30 AM', unreadCount: 2 },
    { id: 3, participantId: 4, lastMessage: 'Database migration was successful.', lastMessageTimestamp: 'Yesterday', unreadCount: 0 },
];

export const MESSAGES_DATA: Message[] = [
    { id: 1, conversationId: 2, senderId: 3, content: 'Hey, I\'ve finished the new dashboard mockups.', timestamp: '9:28 AM' },
    { id: 2, conversationId: 2, senderId: 3, content: 'Let me know what you think when you have a moment.', timestamp: '9:29 AM' },
    { id: 3, conversationId: 2, senderId: 0, content: 'Awesome! I\'ll take a look right now.', timestamp: '9:30 AM' },
];

export const POS_PRODUCTS_DATA: POSProduct[] = [
  { id: 101, name: 'Espresso', price: 3.50, imageUrl: 'https://picsum.photos/seed/espresso/150/150' },
  { id: 102, name: 'Latte', price: 4.50, imageUrl: 'https://picsum.photos/seed/latte/150/150' },
  { id: 103, name: 'Croissant', price: 2.75, imageUrl: 'https://picsum.photos/seed/croissant/150/150' },
  { id: 104, name: 'Muffin', price: 3.00, imageUrl: 'https://picsum.photos/seed/muffin/150/150' },
];

export const ERP_PRODUCTS_DATA: ERPProduct[] = [
  { id: 'p1', name: 'Quantum Laptop', category: 'Electronics', price: 1200, stock: 50, sku: 'QL-I9-32-1TB' },
  { id: 'p2', name: 'Ergonomic Chair', category: 'Furniture', price: 350, stock: 120, sku: 'EC-MESH-BLK' },
  { id: 'p3', name: 'Smart Watch', category: 'Electronics', price: 299, stock: 200, sku: 'SW-OLED-V2' },
  { id: 'p4', name: 'Acoustic Guitar', category: 'Music', price: 450, stock: 75, sku: 'AG-SPR-STL' },
  { id: 'p5', name: 'Coffee Maker', category: 'Home Goods', price: 89, stock: 300, sku: 'CM-12C-DRP' },
];

export const ERP_ORDERS_DATA: ERPOrder[] = [
  { id: 'o1', customerName: 'Alice Johnson', date: '2023-10-26', status: 'Shipped', total: 1499, itemCount: 2 },
  { id: 'o2', customerName: 'Bob Williams', date: '2023-10-25', status: 'Delivered', total: 350, itemCount: 1 },
  { id: 'o3', customerName: 'Fiona Davis', date: '2023-10-27', status: 'Pending', total: 299, itemCount: 1 },
  { id: 'o4', customerName: 'Diana Miller', date: '2023-10-20', status: 'Cancelled', total: 1200, itemCount: 1 },
];

export const ERP_CUSTOMERS_DATA: ERPCustomer[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-0101', lifetimeValue: 5400, lastOrder: '2023-10-26' },
    { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', phone: '555-0102', lifetimeValue: 2100, lastOrder: '2023-10-25' },
    { id: 6, name: 'Fiona Davis', email: 'fiona.d@example.com', phone: '555-0106', lifetimeValue: 1800, lastOrder: '2023-10-27' },
];

export const ONLINE_COURSE_DATA: OnlineCourse = {
    id: 1,
    title: 'Advanced React Patterns',
    description: 'Master advanced techniques like render props, higher-order components, and state management.',
    instructorId: 1,
    modules: [
        { id: 'm1', title: 'Introduction', lectures: [{ id: 'l1', title: 'Course Overview', duration: '5:30' }, { id: 'l1a', title: 'Setting up the Environment', duration: '8:15' }] },
        { id: 'm2', title: 'Higher-Order Components', lectures: [{ id: 'l2', title: 'Creating HOCs', duration: '12:45' }, { id: 'l2a', title: 'Practical Examples', duration: '15:00' }] },
        { id: 'm3', title: 'Render Props', lectures: [{ id: 'l3', title: 'Understanding Render Props', duration: '10:20' }] },
    ]
};

const today = new Date();
const getDateString = (offset: number) => {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    return date.toISOString().split('T')[0];
};


export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
  { id: '1', title: 'Team Sync', date: getDateString(0), category: 'primary' },
  { id: '2', title: 'Project Deadline', date: getDateString(2), category: 'danger' },
  { id: '3', title: 'Design Review', date: getDateString(-5), category: 'warning' },
  { id: '4', title: 'Personal Appointment', date: getDateString(-5), category: 'info' },
  { id: '5', title: 'Release v2.0', date: getDateString(10), category: 'success' },
];

export const COUNTRIES_DATA = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
  { value: 'JPN', label: 'Japan' },
];

export const TIMELINE_EVENTS_DATA: TimelineEvent[] = [
    { id: 1, type: 'comment', user: 'Bob Williams', description: 'commented on the "New Dashboard" task.', timestamp: '2 hours ago' },
    { id: 2, type: 'upload', user: 'Charlie Brown', description: 'uploaded a new asset "logo-v2.svg".', timestamp: '5 hours ago' },
    { id: 3, type: 'user', user: 'Admin', description: 'added Ethan Garcia to the project.', timestamp: '1 day ago' },
];

export const HIERARCHICAL_TABLE_DATA: HierarchicalData[] = [
    { id: 1, name: 'Project Alpha', type: 'Project', status: 'In Progress', children: [
        { id: '1-1', name: 'Frontend Tasks', type: 'Epic', status: 'In Progress', children: [
            { id: '1-1-1', name: 'Implement Login Page', type: 'Task', status: 'Done' },
            { id: '1-1-2', name: 'Create User Profile Component', type: 'Task', status: 'In Progress' }
        ] },
        { id: '1-2', name: 'Backend Tasks', type: 'Epic', status: 'To Do' }
    ]},
    { id: 2, name: 'Project Beta', type: 'Project', status: 'Done' }
];
