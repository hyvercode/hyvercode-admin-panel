import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', disabled = false }) => {
  if (disabled) {
    return children;
  }
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-flex group">
      {children}
      <div
        className={`absolute whitespace-nowrap bg-neutral-900 text-white text-xs rounded-md py-1 px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10 ${positionClasses[position]}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;