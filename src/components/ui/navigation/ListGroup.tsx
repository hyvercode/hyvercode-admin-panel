import React from 'react';
import { Link } from 'react-router-dom';

interface ListItemProps {
    children: React.ReactNode;
    as?: 'li' | 'Link' | 'button';
    to?: string;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ children, as = 'li', to, onClick, active, disabled }) => {
    const baseClasses = `block w-full p-3 text-left transition-colors duration-150`;
    const stateClasses = active 
      ? 'bg-primary text-white' 
      : disabled 
        ? 'bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500 cursor-not-allowed'
        : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary';

    const commonProps = {
        className: `${baseClasses} ${stateClasses}`,
        disabled,
        onClick,
    };

    if (as === 'Link' && to) {
        return <Link to={to} {...commonProps}>{children}</Link>;
    }
    if (as === 'button') {
        return <button type="button" {...commonProps}>{children}</button>;
    }
    return <li className={`${baseClasses} ${stateClasses}`}>{children}</li>;
};


interface ListGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ListGroup: React.FC<ListGroupProps> & { Item: typeof ListItem } = ({ children, className }) => {
    return (
        <div className={`border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden ${className}`}>
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {children}
            </ul>
        </div>
    );
};

ListGroup.Item = ListItem;

export default ListGroup;
