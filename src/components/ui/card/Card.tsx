import React from 'react';

// Sub-components for better structure
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-neutral-200 dark:border-neutral-800 ${className}`}>{children}</div>
);

const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 border-t border-neutral-200 dark:border-neutral-800 ${className}`}>{children}</div>
);

// Main Card component
// FIX: Extended React.HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardComponent extends React.FC<CardProps> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

const Card: CardComponent = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
