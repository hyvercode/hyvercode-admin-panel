import React from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md' }) => {
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
    </div>
  );
};

export default Avatar;