import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '21/9';
  rounded?: 'none' | 'md' | 'lg' | 'full';
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, caption, aspectRatio, rounded = 'lg', className = '' }) => {
  const roundedClasses = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const aspectRatioClasses = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '21/9': 'aspect-[21/9]',
  };

  const imageClasses = `
    w-full h-full object-cover 
    ${roundedClasses[rounded]}
  `;

  const containerClasses = `
    ${aspectRatio ? aspectRatioClasses[aspectRatio] : ''} 
    ${aspectRatio ? `w-full ${roundedClasses[rounded]} overflow-hidden` : 'inline-block'}
  `;
  
  const finalClassName = `${containerClasses} ${className}`;

  if (caption) {
    return (
      <figure className={finalClassName}>
        <img src={src} alt={alt} className={imageClasses} />
        <figcaption className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <div className={finalClassName}>
      <img src={src} alt={alt} className={imageClasses} />
    </div>
  );
};

export default Image;