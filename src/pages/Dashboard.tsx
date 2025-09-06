
import React from 'react';
import Card from '../components/ui/card/Card';
import SampleChart from '../components/SampleChart';
import Avatar from '../components/ui/avatar/Avatar';
import IconTile from '../components/ui/icon/IconTile';
import SamplePieChart from '../components/SamplePieChart';

const DashboardCard: React.FC<{ title: string; value: string; icon: string; colorClass: string; }> = ({ title, value, icon, colorClass }) => {
  return (
    <Card>
      <Card.Body className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
        </div>
        <div className={`text-3xl rounded-full p-4 ${colorClass}`}>
          <i className={`bi ${icon}`}></i>
        </div>
      </Card.Body>
    </Card>
  );
};


const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Sales" value="$24,780" icon="bi-cart-check-fill" colorClass="bg-primary-background text-primary" />
        <DashboardCard title="New Users" value="1,204" icon="bi-person-plus-fill" colorClass="bg-success-background text-success" />
        <DashboardCard title="Open Tickets" value="32" icon="bi-ticket-detailed-fill" colorClass="bg-warning-background text-warning-dark" />
        <DashboardCard title="Bounce Rate" value="47.5%" icon="bi-graph-down-arrow" colorClass="bg-danger-background text-danger" />
      </div>

      {/* Chart and other info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SampleChart />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <IconTile iconName="file-earmark-zip-fill" variant="info" shape="circle" />
                <div className="ml-4">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">New report generated</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <Avatar name="Sarah" src="https://picsum.photos/50/51" />
                <div className="ml-4">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">Sarah completed a task</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">5 hours ago</p>
                </div>
              </li>
               <li className="flex items-start">
                <IconTile iconName="exclamation-triangle-fill" variant="danger" shape="circle" />
                <div className="ml-4">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">Server #3 requires attention</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>
          <SamplePieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
