import React from 'react';
import Avatar from './Avatar';

interface AvatarGroupProps {
  users: {
    name: string;
    src?: string;
  }[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users, max = 3, size = 'md' }) => {
  const displayedUsers = users.slice(0, max);
  const hiddenCount = users.length - max;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className="flex -space-x-3">
      {displayedUsers.map((user, index) => (
        <Avatar key={index} name={user.name} src={user.src} size={size} />
      ))}
      {hiddenCount > 0 && (
        <div className={`relative inline-flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs ring-2 ring-offset-2 ring-offset-neutral-0 dark:ring-offset-neutral-1000 ring-neutral-200 dark:ring-neutral-800 ${sizeClasses[size]}`}>
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;