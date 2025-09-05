import React from 'react';
import Avatar from './Avatar';
import { User } from '../../../types';

interface AvatarItemProps {
  avatarProps: {
    name: string;
    src?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    presence?: 'online' | 'offline' | 'away' | 'busy';
  };
  name: string;
  description: string;
  children?: React.ReactNode;
}

const AvatarItem: React.FC<AvatarItemProps> = ({ avatarProps, name, description, children }) => {
  return (
    <div className="flex items-center">
      <Avatar {...avatarProps} />
      <div className="ml-4 flex-grow">
        <div className="font-semibold text-neutral-900 dark:text-neutral-100">{name}</div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">{description}</div>
      </div>
      {children && <div className="ml-4 flex-shrink-0">{children}</div>}
    </div>
  );
};

export default AvatarItem;