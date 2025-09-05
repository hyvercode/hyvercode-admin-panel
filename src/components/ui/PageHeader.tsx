import React from 'react';
import Breadcrumbs, { BreadcrumbItem } from './navigation/Breadcrumbs';

interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

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
