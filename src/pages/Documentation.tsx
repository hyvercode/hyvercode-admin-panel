import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Button from '../components/ui/Button';

const Documentation: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Documentation"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Documentation', path: '/documentation' }]}
            />

            <Card>
                <Card.Header>
                    <h2 className="text-xl font-bold">Welcome to the Admin Panel Documentation</h2>
                </Card.Header>
                <Card.Body className="space-y-4 text-neutral-800 dark:text-neutral-300">
                    <p>
                        This documentation provides an overview of the components and features available within this application.
                        It serves as a guide for developers and users to understand how to use and extend the admin panel.
                    </p>
                    
                    <h3 className="text-lg font-semibold pt-4 border-t dark:border-neutral-800">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Dashboard:</strong> A central hub for monitoring key metrics and activities.</li>
                        <li><strong>User Management:</strong> Tools to add, edit, and manage user accounts.</li>
                        <li><strong>Task Board:</strong> A Kanban-style board to track project tasks and progress.</li>
                        <li><strong>Component Library:</strong> A rich set of reusable UI components for building consistent interfaces.</li>
                        <li><strong>Authentication:</strong> Secure login and registration flows.</li>
                    </ul>

                    <h3 className="text-lg font-semibold pt-4 border-t dark:border-neutral-800">Getting Started</h3>
                    <p>
                        Explore the sidebar to navigate through the different sections of the application. Each page demonstrates a set of related functionalities or components.
                        The code is structured to be modular and easy to understand. You can find all components under the <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded">src/components</code> directory.
                    </p>
                </Card.Body>
                <Card.Footer>
                    <Button 
                        to="https://github.com" 
                        target="_blank" 
                        variant="secondary"
                        leftIcon={<i className="bi bi-github"></i>}
                    >
                        View on GitHub
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Documentation;
