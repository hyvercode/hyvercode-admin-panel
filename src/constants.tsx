import { User, Product, Review, BlogPost, CalendarEvent, Task, Conversation, Message, POSProduct, ERPProduct, ERPOrder, ERPCustomer, OnlineCourse, TimelineEvent, HierarchicalData } from './types';

// --- NAVIGATION ---
interface NavItem {
  to: string;
  icon: string;
  label: string;
}
interface NavGroup {
  title: string;
  icon: string;
  items: NavItem[];
}
export type NavStructure = (NavItem | NavGroup)[];

export const NAV_ITEMS: NavStructure = [
  { to: '/admin/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
  {
    title: 'Management',
    icon: 'bi-briefcase-fill',
    items: [
      { to: '/admin/users', icon: 'bi-people-fill', label: 'Users' },
      { to: '/admin/tasks', icon: 'bi-check2-square', label: 'Tasks' },
    ],
  },
  {
    title: 'ERP',
    icon: 'bi-building-fill',
    items: [
      { to: '/admin/erp/products', icon: 'bi-box-seam-fill', label: 'Products' },
      { to: '/admin/erp/orders', icon: 'bi-receipt-cutoff', label: 'Orders' },
      { to: '/admin/erp/customers', icon: 'bi-person-badge-fill', label: 'Customers' },
    ],
  },
  {
    title: 'Component Demos',
    icon: 'bi-puzzle-fill',
    items: [
      { to: '/admin/documentation', icon: 'bi-file-earmark-text-fill', label: 'Docs Home' },
      { to: '/admin/boards', icon: 'bi-kanban-fill', label: 'Boards & Timeline' },
      { to: '/admin/forms', icon: 'bi-input-cursor-text', label: 'Forms' },
      { to: '/admin/tables', icon: 'bi-table', label: 'Tables' },
      { to: '/admin/content', icon: 'bi-card-heading', label: 'Content' },
      { to: '/admin/overlays', icon: 'bi-front', label: 'Overlays' },
      { to: '/admin/navigation', icon: 'bi-compass-fill', label: 'Navigation' },
    ],
  },
  {
    title: 'Sample Pages',
    icon: 'bi-file-earmark-richtext-fill',
    items: [
      { to: '/admin/sample/pos', icon: 'bi-printer-fill', label: 'Point of Sale' },
      { to: '/admin/sample/course', icon: 'bi-book-fill', label: 'Online Course' },
      { to: '/admin/sample/chat', icon: 'bi-chat-dots-fill', label: 'Chat' },
      { to: '/admin/sample/ai-chat', icon: 'bi-robot', label: 'AI Assistant' },
      { to: '/sample/products', icon: 'bi-shop', label: 'Product Catalog' },
      { to: '/sample/checkout', icon: 'bi-credit-card-fill', label: 'Checkout' },
      { to: '/sample/blog', icon: 'bi-journal-richtext', label: 'Blog' },
    ]
  }
];


// --- MOCK DATA ---
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
];

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
    { id: '1', title: 'Team Sync', date: new Date().toISOString().split('T')[0], category: 'primary' },
    { id: '2', title: 'Project Deadline', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], category: 'danger' },
];

export const TASKS_DATA: Task[] = [
    { id: 'task-1', title: 'Design new dashboard layout', description: 'Create mockups in Figma.', status: 'In Progress', priority: 'High', assigneeIds: [4] },
    { id: 'task-2', title: 'Develop authentication flow', description: 'Implement JWT-based auth.', status: 'Todo', priority: 'High', assigneeIds: [1] },
    { id: 'task-3', title: 'Write API documentation', description: 'Use Swagger for documentation.', status: 'Done', priority: 'Medium', assigneeIds: [2] },
    { id: 'task-4', title: 'Fix bug in reporting module', description: 'CSV export is failing.', status: 'In Progress', priority: 'Medium', assigneeIds: [1] },
    { id: 'task-5', title: 'Plan Q4 marketing campaign', description: 'Coordinate with the marketing team.', status: 'Todo', priority: 'Low', assigneeIds: [4, 2] },
];

export const CONVERSATIONS_DATA: Conversation[] = [
    { id: 1, participantId: 1, lastMessage: "Hey, can we sync up about the new designs?", lastMessageTimestamp: "10:30 AM", unreadCount: 0 },
    { id: 2, participantId: 2, lastMessage: "The blog post draft is ready for your review.", lastMessageTimestamp: "9:45 AM", unreadCount: 2 },
];

export const MESSAGES_DATA: Message[] = [
    { id: 1, conversationId: 2, senderId: 2, content: "The blog post draft is ready for your review.", timestamp: "9:45 AM" },
    { id: 2, conversationId: 2, senderId: 0, content: "Awesome, I'll take a look now.", timestamp: "9:46 AM" },
];

export const POS_PRODUCTS_DATA: POSProduct[] = [
    { id: 1, name: 'Espresso', price: 3.50, imageUrl: 'https://picsum.photos/seed/coffee1/200/200' },
    { id: 2, name: 'Latte', price: 4.50, imageUrl: 'https://picsum.photos/seed/coffee2/200/200' },
    { id: 3, name: 'Croissant', price: 2.75, imageUrl: 'https://picsum.photos/seed/pastry1/200/200' },
    { id: 4, name: 'Muffin', price: 3.00, imageUrl: 'https://picsum.photos/seed/pastry2/200/200' },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  { id: 1, type: 'task_completed', user: 'Bob Smith', description: "Marked 'Write API documentation' as done.", timestamp: '2 hours ago' },
  { id: 2, type: 'task_moved', user: 'Diana Prince', description: "Moved 'Design new dashboard layout' to In Progress.", timestamp: '5 hours ago' },
  { id: 3, type: 'user_added', user: 'Alice Johnson', description: 'Added a new user: Charlie Brown.', timestamp: '1 day ago' },
];

export const ERP_PRODUCTS_DATA: ERPProduct[] = [
  { id: 'prod-001', name: 'Wireless Headphones', category: 'Electronics', price: 199.99, stock: 150, sku: 'WH-1000XM4' },
  { id: 'prod-002', name: 'Mechanical Keyboard', category: 'Peripherals', price: 129.50, stock: 80, sku: 'MK-87' },
  { id: 'prod-003', name: 'Ergonomic Mouse', category: 'Peripherals', price: 79.00, stock: 250, sku: 'EM-MX3' },
];

export const ERP_ORDERS_DATA: ERPOrder[] = [
  { id: 'ORD-2024-001', customerName: 'Alice Johnson', date: '2024-05-20', status: 'Delivered', total: 199.99, itemCount: 1 },
  { id: 'ORD-2024-002', customerName: 'Bob Smith', date: '2024-05-22', status: 'Shipped', total: 208.50, itemCount: 2 },
  { id: 'ORD-2024-003', customerName: 'Charlie Brown', date: '2024-05-23', status: 'Pending', total: 79.00, itemCount: 1 },
];

export const ERP_CUSTOMERS_DATA: ERPCustomer[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', lifetimeValue: 1250.75, lastOrder: '2024-05-20' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901', lifetimeValue: 875.50, lastOrder: '2024-05-22' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012', lifetimeValue: 320.00, lastOrder: '2024-05-23' },
];

export const COUNTRIES_DATA = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
  { value: 'JPN', label: 'Japan' },
];

export const ONLINE_COURSE_DATA: OnlineCourse = {
    id: 1,
    title: 'Advanced React Development',
    description: 'Take your React skills to the next level with this advanced course covering hooks, performance, and state management.',
    instructorId: 1, // Alice Johnson
    modules: [
        {
            id: 'm1',
            title: 'Module 1: Deep Dive into Hooks',
            lectures: [
                { id: 'l1-1', title: 'useState and useEffect In-Depth', duration: '15:30' },
                { id: 'l1-2', title: 'useContext for Global State', duration: '12:45' },
                { id: 'l1-3', title: 'useReducer for Complex State', duration: '20:10' },
            ]
        },
        {
            id: 'm2',
            title: 'Module 2: Performance Optimization',
            lectures: [
                { id: 'l2-1', title: 'Memoization with useMemo and useCallback', duration: '18:00' },
                { id: 'l2-2', title: 'Code Splitting with React.lazy', duration: '14:25' },
            ]
        }
    ]
};
