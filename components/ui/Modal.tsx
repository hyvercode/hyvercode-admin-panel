import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
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

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-neutral-0 dark:bg-neutral-1000 w-full max-w-lg rounded-lg shadow-xl transform transition-all border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-neutral-800">
            <h3 id="modal-title" className="text-lg font-semibold text-neutral-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-neutral-500 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-neutral-800 dark:hover:text-white"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg w-5 h-5"></i>
            </button>
          </div>
          <div className="p-6 space-y-6">
            {children}
          </div>
          {footer && (
            <div className="flex items-center p-6 space-x-2 border-t border-neutral-200 rounded-b dark:border-neutral-800 justify-end">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;