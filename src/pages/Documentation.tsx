import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const ComponentCard: React.FC<{ title: string; description: string; to: string }> = ({ title, description, to }) => (
    <Card>
        <Card.Header>
            <h3 className="text-lg font-bold">{title}</h3>
        </Card.Header>
        <Card.Body>
            <p className="text-sm text-neutral-700 dark:text-neutral-400">{description}</p>
        </Card.Body>
        <Card.Footer>
            {/* FIX: Removed the unsupported 'as' prop. The 'to' prop is sufficient. */}
            <Button to={to} variant="subtle">View Components</Button>
        </Card.Footer>
    </Card>
);

const Documentation: React.FC = () => {
    const componentGroups = [
        { title: 'Avatars', description: 'Components for displaying user profile images and presence.', to: '/avatars' },
        { title: 'Content', description: 'Components for displaying primary content like cards and carousels.', to: '/content' },
        { title: 'Forms', description: 'A comprehensive suite of form layouts and inputs.', to: '/forms' },
        { title: 'Icons', description: 'Components for rendering icons and icon-based layouts.', to: '/icons' },
        { title: 'Images & Logos', description: 'Components for displaying images and brand assets.', to: '/images' },
        { title: 'Loaders', description: 'Spinners, progress bars, and skeletons for loading states.', to: '/loaders' },
        { title: 'Navigation', description: 'Components for app navigation like accordions and pagination.', to: '/navigation' },
        { title: 'Overlays', description: 'Modals, drawers, and toasts for overlaying content.', to: '/overlays' },
        { title: 'Tables', description: 'A powerful set of components for displaying tabular data.', to: '/tables' },
    ];
    
    return (
        <div>
            <PageHeader
                title="Documentation"
                breadcrumbs={[{ name: 'Home', path: '/dashboard' }, { name: 'Documentation', path: '/documentation' }]}
            />

            <Card className="mb-8">
                <Card.Body className="space-y-4 text-neutral-800 dark:text-neutral-300">
                    <p>
                        Welcome! This page serves as an index for the reusable UI components available in this admin panel. Each section below links to a dedicated page with live, interactive demonstrations.
                    </p>
                </Card.Body>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {componentGroups.map(group => (
                    <ComponentCard key={group.to} {...group} />
                ))}
            </div>
        </div>
    );
};

export default Documentation;
