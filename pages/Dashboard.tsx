
import React from 'react';
import Card from '../components/Card';
import SampleChart from '../components/SampleChart';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Total Sales" value="$24,780" icon="bi-cart-check-fill" colorClass="bg-primary/20 text-primary" />
        <Card title="New Users" value="1,204" icon="bi-person-plus-fill" colorClass="bg-success/20 text-success" />
        <Card title="Open Tickets" value="32" icon="bi-ticket-detailed-fill" colorClass="bg-warning/20 text-warning" />
        <Card title="Bounce Rate" value="47.5%" icon="bi-graph-down-arrow" colorClass="bg-danger/20 text-danger" />
      </div>

      {/* Chart and other info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SampleChart />
        </div>
        <div className="bg-white dark:bg-dark rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-info/20 text-info flex items-center justify-center">
                  <i className="bi bi-file-earmark-zip-fill"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-800 dark:text-gray-100">New report generated</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <img className="w-10 h-10 rounded-full object-cover" src="https://picsum.photos/50/51" alt="User"/>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-800 dark:text-gray-100">Sarah completed a task</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
              </div>
            </li>
             <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-danger/20 text-danger flex items-center justify-center">
                   <i className="bi bi-exclamation-triangle-fill"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-800 dark:text-gray-100">Server #3 requires attention</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
