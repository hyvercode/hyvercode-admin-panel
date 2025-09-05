import React from 'react';

type Presence = 'online' | 'offline' | 'away' | 'busy';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  presence?: Presence;
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md', presence }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-32 h-32 text-4xl',
  };
  
  const presenceClasses = {
    online: 'bg-success',
    offline: 'bg-neutral-500',
    away: 'bg-warning',
    busy: 'bg-danger',
  };
  
  const presenceSizeClasses = {
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border',
    lg: 'w-3.5 h-3.5 border-2',
    xl: 'w-8 h-8 border-4',
  }

  return (
    <div className={`relative inline-block ${sizeClasses[size]}`}>
      {src ? (
        <img
          className="w-full h-full rounded-full object-cover ring-2 ring-offset-2 ring-offset-neutral-0 dark:ring-offset-neutral-1000 ring-neutral-200 dark:ring-neutral-800"
          src={src}
          alt={name}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white font-bold ring-2 ring-offset-2 ring-offset-neutral-0 dark:ring-offset-neutral-1000 ring-neutral-200 dark:ring-neutral-800">
          <span>{getInitials(name)}</span>
        </div>
      )}
      {presence && (
         <span className={`absolute bottom-0 right-0 block rounded-full border-white dark:border-neutral-1000 ${presenceClasses[presence]} ${presenceSizeClasses[size]}`}></span>
      )}
    </div>
  );
};

export default Avatar;