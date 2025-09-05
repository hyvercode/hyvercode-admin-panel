import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Icon: React.FC<IconProps> = ({ name, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  return <i className={`bi bi-${name} ${sizeClasses[size]} ${className}`} />;
};

export default Icon;