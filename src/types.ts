
export interface NavItem {
  path: string;
  name: string;
  icon: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  bio?: string;
}