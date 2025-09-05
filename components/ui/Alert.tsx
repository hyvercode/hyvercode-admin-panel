import React from 'react';

interface AlertProps {
  variant?: 'danger' | 'success' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children }) => {
  const variantConfig = {
    danger: {
      bg: 'bg-danger-background',
      text: 'text-danger-dark dark:text-danger-light',
      icon: 'bi-exclamation-triangle-fill',
      iconColor: 'text-danger',
    },
    success: {
      bg: 'bg-success-background',
      text: 'text-success-dark dark:text-success',
      icon: 'bi-check-circle-fill',
      iconColor: 'text-success',
    },
    warning: {
      bg: 'bg-warning-background',
      text: 'text-warning-dark dark:text-warning',
      icon: 'bi-exclamation-triangle-fill',
      iconColor: 'text-warning-dark',
    },
    info: {
      bg: 'bg-primary-background',
      text: 'text-primary-dark dark:text-primary-light',
      icon: 'bi-info-circle-fill',
      iconColor: 'text-primary',
    },
  };

  const config = variantConfig[variant];

  return (
    <div className={`p-4 rounded-lg flex ${config.bg} ${config.text}`} role="alert">
      <div className={`flex-shrink-0 mr-3 ${config.iconColor}`}>
        <i className={`bi ${config.icon} text-xl`}></i>
      </div>
      <div>
        {title && <h3 className="font-bold">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

export default Alert;