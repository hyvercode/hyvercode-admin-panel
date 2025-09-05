import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Link, To } from 'react-router-dom';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

// Dropdown Item
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

  const handleClick = () => {
    if (onClick) onClick();
    context.setIsOpen(false);
  };

  const itemClasses = "flex items-center w-full px-4 py-2 text-sm text-left text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900";

  const content = (
    <>
      {icon && <span className="mr-3 text-lg">{icon}</span>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={itemClasses} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={itemClasses}>
      {content}
    </button>
  );
};

// Main Dropdown Component
interface DropdownProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

interface DropdownComponent extends React.FC<DropdownProps> {
  Item: typeof DropdownItem;
}

const Dropdown: DropdownComponent = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block" ref={wrapperRef}>
        {React.cloneElement(trigger, { onClick: toggleDropdown, 'aria-haspopup': true, 'aria-expanded': isOpen })}

        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-56 origin-top-right bg-neutral-0 dark:bg-neutral-1000 divide-y divide-neutral-100 dark:divide-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
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

Dropdown.Item = DropdownItem;

export default Dropdown;
