import React from 'react';
import IconTile from './IconTile';

interface IconObjectProps {
  iconTileProps: React.ComponentProps<typeof IconTile>;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const IconObject: React.FC<IconObjectProps> = ({ iconTileProps, title, description, children }) => {
  return (
    <div className="flex items-center">
      <IconTile {...iconTileProps} />
      <div className="ml-4 flex-grow">
        <div className="font-semibold text-neutral-900 dark:text-neutral-100">{title}</div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">{description}</div>
      </div>
      {children && <div className="ml-4 flex-shrink-0">{children}</div>}
    </div>
  );
};

export default IconObject;