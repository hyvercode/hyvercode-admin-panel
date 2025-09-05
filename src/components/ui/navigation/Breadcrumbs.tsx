import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => (
  <nav aria-label="breadcrumb" className={className}>
    <ol className="flex items-center space-x-2 text-sm text-neutral-700 dark:text-neutral-400">
      {items.map((item, index) => (
        <li key={item.path} className="flex items-center">
          {index > 0 && <i className="bi bi-chevron-right mx-2 text-xs"></i>}
          {index === items.length - 1 ? (
             <span className="font-medium text-neutral-800 dark:text-neutral-200">{item.name}</span>
          ) : (
            <Link to={item.path} className="hover:underline hover:text-primary">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
