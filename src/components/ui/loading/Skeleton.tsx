import React from 'react';

interface SkeletonProps {
  shape?: 'line' | 'box' | 'circle';
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  shape = 'line',
  width,
  height,
  className = '',
}) => {
  const baseClasses = 'animate-pulse bg-neutral-200 dark:bg-neutral-800';

  const shapeClasses = {
    line: 'h-4 rounded-md',
    box: 'h-24 rounded-lg',
    circle: 'rounded-full',
  };

  const style = {
    width: width || (shape === 'line' ? '100%' : '6rem'), // default width for box/circle
    height: height || (shape === 'circle' ? '6rem' : undefined), // default height for circle
  };

  return (
    <div
      className={`${baseClasses} ${shapeClasses[shape]} ${className}`}
      style={style}
    ></div>
  );
};

export default Skeleton;