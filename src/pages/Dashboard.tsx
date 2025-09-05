import React from 'react';
import Card from '../components/Card';
import SampleChart from '../components/SampleChart';
import Avatar from '../components/ui/avatar/Avatar';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Total Sales" value="$24,780" icon="bi-cart-check-fill" colorClass="bg-primary-background text-primary" />
        <Card title="New Users" value="1,204" icon="bi-person-plus-fill" colorClass="bg-success-background text-success" />
        <Card title="Open Tickets" value="32" icon="bi-ticket-detailed-fill" colorClass="bg-warning-background text-warning-dark" />
        <Card title="Bounce Rate" value="47.5%" icon="bi-graph-down-arrow" colorClass="bg-danger-background text-danger" />
      </div>

      {/* Chart and other info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SampleChart />
        </div>
        <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-info/20 text-info flex items-center justify-center">
                  <i className="bi bi-file-earmark-zip-fill"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">New report generated</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Avatar name="Sarah" src="https://picsum.photos/50/51" />
              </div>
              <div className="ml-4">
                <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">Sarah completed a task</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">5 hours ago</p>
              </div>
            </li>
             <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-danger-background text-danger flex items-center justify-center">
                   <i className="bi bi-exclamation-triangle-fill"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">Server #3 requires attention</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">1 day ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;