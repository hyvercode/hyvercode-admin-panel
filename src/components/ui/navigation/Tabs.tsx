import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  children: (activeTab: string) => React.ReactNode;
  defaultTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      <div className="border-b border-neutral-300 dark:border-neutral-800">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:border-neutral-500'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {children(activeTab)}
      </div>
    </div>
  );
};

export default Tabs;
