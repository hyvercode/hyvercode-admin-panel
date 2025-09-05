import React from 'react';

interface ToggleCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ToggleCard: React.FC<ToggleCardProps> = ({ id, icon, title, description, ...props }) => {
  return (
    <label
      htmlFor={id}
      className={`
        relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors
        bg-neutral-0 dark:bg-neutral-1000
        peer-checked:bg-primary-background peer-checked:border-primary
        peer-disabled:opacity-60 peer-disabled:cursor-not-allowed
        border-neutral-200 dark:border-neutral-800
        hover:border-neutral-400 dark:hover:border-neutral-600
      `}
    >
      {/* Invisible input that the label controls */}
      <input id={id} type="checkbox" className="sr-only peer" {...props} />

      <div className="flex-shrink-0 text-2xl text-neutral-700 dark:text-neutral-300">
        {icon}
      </div>
      <div className="ml-4 flex-grow">
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
      
      {/* Visual representation of the toggle switch, controlled by the peer input */}
      <div className="relative pointer-events-none">
          <div className="
            w-10 h-6
            bg-neutral-300 dark:bg-neutral-700
            rounded-full
            transition-colors
            peer-checked:bg-primary
          "></div>
          <div className="
            absolute left-1 top-1
            w-4 h-4
            bg-white
            rounded-full
            transition-transform
            peer-checked:translate-x-4
          "></div>
      </div>
    </label>
  );
};

export default ToggleCard;
