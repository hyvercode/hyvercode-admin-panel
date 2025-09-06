
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Button from '../components/ui/Button';

const Documentation: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Documentation"
        breadcrumbs={[{ name: 'Dashboard', path: '/admin/dashboard' }, { name: 'Documentation', path: '/admin/documentation' }]}
      />
      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Panel Documentation</h2>
          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            This documentation provides a comprehensive guide to using and customizing the admin panel. Here you'll find information about the project structure, available UI components, and how to integrate your own backend services.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Getting Started</h3>
          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            The application is built with React, TypeScript, and Tailwind CSS. To get started, clone the repository and install the dependencies using your favorite package manager.
          </p>
          <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-md text-sm text-neutral-800 dark:text-neutral-200 overflow-x-auto">
            <code>
              {`git clone <repository-url>\ncd <project-folder>\nnpm install\nnpm run dev`}
            </code>
          </pre>

          <h3 className="text-lg font-semibold mt-6 mb-2">UI Component Library</h3>
          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            We provide a rich library of pre-built UI components to accelerate your development. You can find examples of all components under the "UI Components" section in the sidebar. These components are fully themeable and support dark mode out of the box.
          </p>
          
          <div className="mt-8">
            <Button href="https://github.com" target="_blank" variant="secondary" leftIcon={<i className="bi bi-github"></i>}>
              View on GitHub
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Documentation;
