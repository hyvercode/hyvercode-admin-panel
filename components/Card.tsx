
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: string;
  colorClass: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white dark:bg-dark rounded-lg shadow-md p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
      <div className={`text-4xl rounded-full p-4 ${colorClass}`}>
        <i className={`bi ${icon}`}></i>
      </div>
    </div>
  );
};

export default Card;
