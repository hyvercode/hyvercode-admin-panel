import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-4 font-medium text-left text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <i className={`bi bi-chevron-down w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
        </button>
      </h2>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
          {children}
        </div>
      </div>
    </div>
  );
};


interface AccordionProps {
    children: React.ReactElement<AccordionItemProps> | React.ReactElement<AccordionItemProps>[];
    allowMultiple?: boolean;
    defaultOpenIndex?: number | number[];
}
  
const Accordion: React.FC<AccordionProps> = ({ children, allowMultiple = false, defaultOpenIndex = [] }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>(Array.isArray(defaultOpenIndex) ? defaultOpenIndex : [defaultOpenIndex]);

    const handleToggle = (index: number) => {
        setOpenIndexes(prev => {
            if (allowMultiple) {
                return prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
            }
            return prev.includes(index) ? [] : [index];
        });
    };

    return (
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
        {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
            isOpen: openIndexes.includes(index),
            onToggle: () => handleToggle(index),
            })
        )}
        </div>
    );
};

// Attaching Item to Accordion for Accordion.Item syntax
(Accordion as any).Item = AccordionItem;

export default Accordion as React.FC<AccordionProps> & { Item: React.FC<AccordionItemProps> };
