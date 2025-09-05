import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Link, To } from 'react-router-dom';

const DropdownContext = createContext<{ closeDropdown: () => void }>({
  closeDropdown: () => {},
});

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  to?: To;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick, icon, to }) => {
  const { closeDropdown } = useContext(DropdownContext);
  
  const handleClick = () => {
    if(onClick) onClick();
    closeDropdown();
  };

  const content = (
    <>
      {icon && <span className="mr-3 text-lg w-5 text-center">{icon}</span>}
      <span className="flex-1">{children}</span>
    </>
  );

  const classes = "flex items-center w-full px-4 py-2 text-sm text-left text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors";

  if (to) {
    return <Link to={to} className={classes} onClick={handleClick}>{content}</Link>;
  }

  return <button onClick={handleClick} className={classes}>{content}</button>;
};


interface DropdownProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> & { Item: typeof DropdownItem } = ({ trigger, children }) => {
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

  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ closeDropdown }}>
      <div className="relative" ref={dropdownRef}>
        {React.cloneElement(trigger as any, { onClick: () => setIsOpen(!isOpen) })}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 p-2 z-50">
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
