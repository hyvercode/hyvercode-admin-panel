import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: string;
  colorClass: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm p-6 flex items-center justify-between border border-neutral-200 dark:border-neutral-900">
      <div>
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
      </div>
      <div className={`text-3xl rounded-full p-4 ${colorClass}`}>
        <i className={`bi ${icon}`}></i>
      </div>
    </div>
  );
};

export default Card;