import React from 'react';
import Dropdown from './Dropdown';
import Button from './Button';

interface SplitButtonProps {
  onClick: () => void;
  label: React.ReactNode;
  children: React.ReactNode; // Should be Dropdown.Item elements
  variant?: 'primary' | 'secondary' | 'danger' | 'subtle';
  disabled?: boolean;
}

const SplitButton: React.FC<SplitButtonProps> = ({
  onClick,
  label,
  children,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <div
      className="
        inline-flex shadow-sm
        [&>*:not(:first-child)]:-ml-px
        [&>*]:rounded-none
        [&>*:first-child]:rounded-l-md
        /* Targets the button inside the Dropdown's wrapper div */
        [&>div:last-child>*]:rounded-r-md
        [&>*]:focus:z-10
      "
    >
      <Button
        onClick={onClick}
        variant={variant}
        disabled={disabled}
      >
        {label}
      </Button>
      <Dropdown
        trigger={
          <Button
            variant={variant}
            size="icon"
            disabled={disabled}
            aria-label="More options"
          >
            <i className="bi bi-chevron-down text-sm"></i>
          </Button>
        }
      >
        {children}
      </Dropdown>
    </div>
  );
};

export default SplitButton;
