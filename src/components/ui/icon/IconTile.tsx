import React from 'react';
import Icon from './Icon';

type Variant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

interface IconTileProps {
  iconName: string;
  variant?: Variant;
  shape?: 'square' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const IconTile: React.FC<IconTileProps> = ({
  iconName,
  variant = 'primary',
  shape = 'square',
  size = 'md',
  className = '',
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: 'bg-primary-background text-primary',
    success: 'bg-success-background text-success',
    danger: 'bg-danger-background text-danger',
    warning: 'bg-warning-background text-warning-dark',
    info: 'bg-info/20 text-info',
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  };
  
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div
      className={`
        inline-flex items-center justify-center flex-shrink-0
        ${sizeClasses[size]}
        ${shapeClass}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <Icon name={iconName} />
    </div>
  );
};

export default IconTile;