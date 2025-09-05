import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import ReactDOM from 'react-dom';

type ToastVariant = 'success' | 'danger' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextType {
  addToast: (message: string, variant: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastComponent: React.FC<{ toast: Toast; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  const variantConfig = {
    danger: { bg: 'bg-danger-background', text: 'text-danger-dark dark:text-danger-light', icon: 'bi-exclamation-triangle-fill', iconColor: 'text-danger' },
    success: { bg: 'bg-success-background', text: 'text-success-dark dark:text-success', icon: 'bi-check-circle-fill', iconColor: 'text-success' },
    warning: { bg: 'bg-warning-background', text: 'text-warning-dark dark:text-warning', icon: 'bi-exclamation-triangle-fill', iconColor: 'text-warning-dark' },
    info: { bg: 'bg-primary-background', text: 'text-primary-dark dark:text-primary-light', icon: 'bi-info-circle-fill', iconColor: 'text-primary' },
  };
  const config = variantConfig[toast.variant];

  return (
    <div className={`flex items-center w-full max-w-xs p-4 my-2 text-gray-500 rounded-lg shadow-lg ${config.bg} ${config.text}`} role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${config.iconColor}`}>
            <i className={`bi ${config.icon} text-xl`}></i>
        </div>
        <div className="ml-3 text-sm font-normal">{toast.message}</div>
        <button type="button" onClick={onDismiss} className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-black/10" aria-label="Close">
            <i className="bi bi-x-lg"></i>
        </button>
    </div>
  );
};

const ToastContainer: React.FC<{ toasts: Toast[]; removeToast: (id: number) => void }> = ({ toasts, removeToast }) => {
  return ReactDOM.createPortal(
    <div className="fixed top-5 right-5 z-[100]">
      {toasts.map(toast => (
        <ToastComponent key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>,
    document.body
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    setToasts(prevToasts => [
      ...prevToasts,
      { id: Date.now(), message, variant },
    ]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
