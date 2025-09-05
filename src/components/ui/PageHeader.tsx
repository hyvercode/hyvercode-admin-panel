import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <nav aria-label="breadcrumb">
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

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, actions }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
      <div>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
          {title}
        </h1>
      </div>
      {actions && <div className="mt-4 md:mt-0">{actions}</div>}
    </div>
  );
};

export default PageHeader;