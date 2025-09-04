import React from 'react';

interface AlertProps {
  variant?: 'danger' | 'success' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children }) => {
  const variantConfig = {
    danger: {
      bg: 'bg-danger/10',
      text: 'text-danger-800 dark:text-danger-200',
      icon: 'bi-exclamation-triangle-fill',
      iconColor: 'text-danger',
    },
    success: {
      bg: 'bg-success/10',
      text: 'text-success-800 dark:text-success-200',
      icon: 'bi-check-circle-fill',
      iconColor: 'text-success',
    },
    warning: {
      bg: 'bg-warning/10',
      text: 'text-warning-800 dark:text-warning-200',
      icon: 'bi-exclamation-triangle-fill',
      iconColor: 'text-warning',
    },
    info: {
      bg: 'bg-info/10',
      text: 'text-info-800 dark:text-info-200',
      icon: 'bi-info-circle-fill',
      iconColor: 'text-info',
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
