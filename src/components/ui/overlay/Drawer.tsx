import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, position = 'right' }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = {
    left: 'left-0 transform translate-x-0',
    right: 'right-0 transform translate-x-0',
  };
  const hiddenPositionClasses = {
    left: 'left-0 transform -translate-x-full',
    right: 'right-0 transform translate-x-full',
  };

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      {/* Drawer */}
      <div
        className={`fixed top-0 h-full w-80 bg-neutral-0 dark:bg-neutral-1000 z-50 shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? positionClasses[position] : hiddenPositionClasses[position]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-neutral-800">
          <h3 id="drawer-title" className="text-lg font-semibold text-neutral-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="text-neutral-500 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <i className="bi bi-x-lg w-5 h-5"></i>
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Drawer;
