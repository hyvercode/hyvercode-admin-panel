import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Link, To } from 'react-router-dom';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

interface DropdownProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  menuClassName?: string;
}

const Dropdown: React.FC<DropdownProps> & { Item: typeof DropdownItem } = ({ trigger, children, menuClassName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clonedTrigger = React.cloneElement(trigger as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
          // Allow trigger to have its own onClick
          // FIX: The props of a generic ReactElement are unknown. Cast to `any` to safely
          // check for and call an existing onClick handler on the trigger element.
          if (trigger.props && typeof (trigger.props as any).onClick === 'function') {
            (trigger.props as any).onClick(e);
          }
      },
  });

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        {clonedTrigger}
        {isOpen && (
          <div
            className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-neutral-0 dark:bg-neutral-1000 ring-1 ring-black ring-opacity-5 focus:outline-none z-20 ${menuClassName || ''}`}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1" role="none">
              {children}
            </div>
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

// Item sub-component
interface DropdownItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  to?: To;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, icon, to, onClick }) => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('DropdownItem must be used within a Dropdown');
    }

    const { setIsOpen } = context;

    const handleClick = () => {
        if (onClick) onClick();
        setIsOpen(false);
    };

    const classes = "group flex items-center w-full px-4 py-2 text-sm text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900";
    const iconClasses = "mr-3 h-5 w-5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200";

    const content = (
        <>
            {icon && <span className={iconClasses}>{icon}</span>}
            {children}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={classes} role="menuitem" onClick={handleClick}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={handleClick} className={classes} role="menuitem">
            {content}
        </button>
    );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
