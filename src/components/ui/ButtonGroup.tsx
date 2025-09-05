import React from 'react';

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
  return (
    <div
      className={`
        inline-flex shadow-sm
        [&>*:not(:first-child)]:-ml-px
        [&>*]:rounded-none
        [&>*:first-child]:rounded-l-md
        [&>*:last-child]:rounded-r-md
        [&>*]:focus:z-10
        ${className || ''}
      `}
      role="group"
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
