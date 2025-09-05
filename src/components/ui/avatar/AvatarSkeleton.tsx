import React from 'react';

interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({ size = 'md', showText = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-32 h-32',
  };

  return (
    <div className="flex items-center animate-pulse">
      <div className={`${sizeClasses[size]} rounded-full bg-neutral-200 dark:bg-neutral-800`}></div>
      {showText && (
        <div className="ml-4 space-y-2">
          <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800"></div>
          <div className="h-2 w-32 rounded bg-neutral-200 dark:bg-neutral-800"></div>
        </div>
      )}
    </div>
  );
};

export default AvatarSkeleton;