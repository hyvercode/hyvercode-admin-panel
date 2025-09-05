import React, { useState, useMemo, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { USERS_DATA } from '../constants';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

const activityFeed = [
    { icon: 'bi-file-earmark-plus-fill', color: 'text-success', action: 'Created a new report', details: 'Q3 Financials', time: '2 hours ago' },
    { icon: 'bi-check-circle-fill', color: 'text-primary', action: 'Completed a task', details: 'Update User Documentation', time: '5 hours ago' },
    { icon: 'bi-person-fill-gear', color: 'text-info', action: 'Updated profile settings', details: 'Changed avatar', time: '1 day ago' },
    { icon: 'bi-chat-left-dots-fill', color: 'text-neutral-700', action: 'Commented on an issue', details: '#1234 - UI Bug', time: '2 days ago' },
    { icon: 'bi-exclamation-triangle-fill', color: 'text-warning-dark', action: 'Reported a security concern', details: 'Suspicious login attempt', time: '3 days ago' },
];

const fullActivityLog = [
    { date: '2024-07-21', type: 'Report', details: 'Generated Q3 Financials report.' },
    { date: '2024-07-21', type: 'Task', details: 'Completed task: Update User Documentation.' },
    { date: '2024-07-20', type: 'Profile', details: 'Updated profile settings: Changed avatar.' },
    { date: '2024-07-19', type: 'Comment', details: 'Commented on issue #1234 - UI Bug.' },
    { date: '2024-07-18', type: 'Security', details: 'Reported a security concern: Suspicious login attempt.' },
    { date: '2024-07-17', type: 'Login', details: 'Successfully logged in from new device.' },
    { date: '2024-07-16', type: 'Project', details: 'Created new project: "Website Redesign".' },
    { date: '2024-07-15', type: 'Task', details: 'Assigned task "Create Mockups" to Bob Smith.' },
    { date: '2024-07-14', type: 'File Upload', details: 'Uploaded "final-logo.svg".' },
    { date: '2024-07-13', type: 'Settings', details: 'Enabled two-factor authentication.' },
    { date: '2024-07-12', type: 'Login', details: 'Successfully logged in.' },
    { date: '2024-07-11', type: 'Project', details: 'Archived project: "Legacy System Migration".' },
];

const ITEMS_PER_LOG_PAGE = 5;

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [currentLogPage, setCurrentLogPage] = useState(1);
  const user = USERS_DATA.find(u => u.id === parseInt(userId || ''));

  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const { paginatedLogData, totalLogPages, totalLogItems } = useMemo(() => {
    const totalItems = fullActivityLog.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_LOG_PAGE);
    const paginatedData = fullActivityLog.slice(
      (currentLogPage - 1) * ITEMS_PER_LOG_PAGE,
      currentLogPage * ITEMS_PER_LOG_PAGE
    );
    return { paginatedLogData: paginatedData, totalLogPages: totalPages, totalLogItems: totalItems };
  }, [currentLogPage]);

  if (!user) {
    return <Navigate to="/users" replace />;
  }
  
  const avatarSrc = avatar || `https://picsum.photos/200/200?random=${user.id}`;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card & About Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 group">
               <Avatar src={avatarSrc} name={user.name} size="xl" />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarUpload} 
                className="hidden" 
                accept="image/*"
              />
              <button 
                onClick={triggerFileUpload}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Upload new avatar"
              >
                <i className="bi bi-camera-fill text-white text-3xl"></i>
              </button>
            </div>
            
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{user.name}</h3>
            <p className="text-neutral-700 dark:text-neutral-400">{user.role}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">{user.email}</p>
            
            <div className="flex justify-around mt-6 border-t dark:border-neutral-800 pt-4">
              <div>
                <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">22</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Projects</p>
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">15</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Tasks</p>
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">7</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Reports</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-6">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 border-b dark:border-neutral-800 pb-2 mb-4">About Me</h4>
            <p className="text-neutral-800 dark:text-neutral-300 text-sm">{user.bio || 'No biography available.'}</p>
          </div>
        </div>

        {/* Right Column: Activity Feed & Log */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-6">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent Activity</h4>
            <ul className="space-y-2">
              {activityFeed.map((item, index) => (
                <li key={index} className="flex items-start p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 ${item.color}`}>
                    <i className={`bi ${item.icon} text-xl`}></i>
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">{item.action}</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">{item.details}</p>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-shrink-0">{item.time}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Activity Log Table */}
          <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900">
            <h4 className="p-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100 border-b dark:border-neutral-800">Activity Log</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-neutral-600 dark:text-neutral-400">
                <thead className="text-xs text-neutral-800 uppercase bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Date</th>
                    <th scope="col" className="px-6 py-3 font-medium">Action Type</th>
                    <th scope="col" className="px-6 py-3 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogData.map((log, index) => (
                    <tr key={index} className="bg-neutral-0 dark:bg-neutral-1000 border-b dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                      <td className="px-6 py-4 whitespace-nowrap">{log.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-background text-primary-dark">{log.type}</span>
                      </td>
                      <td className="px-6 py-4">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalLogPages > 1 && (
               <div className="flex justify-between items-center px-6 py-3 bg-neutral-100 dark:bg-neutral-900/50 border-t dark:border-neutral-800 rounded-b-lg">
                 <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Showing <span className="font-semibold">{((currentLogPage - 1) * ITEMS_PER_LOG_PAGE) + 1}</span> to <span className="font-semibold">{Math.min(currentLogPage * ITEMS_PER_LOG_PAGE, totalLogItems)}</span> of <span className="font-semibold">{totalLogItems}</span> entries
                 </span>
                 <div className="inline-flex items-center space-x-2">
                   <Button
                     variant="secondary"
                     size="sm"
                     onClick={() => setCurrentLogPage(prev => Math.max(prev - 1, 1))}
                     disabled={currentLogPage === 1}
                     aria-label="Previous page"
                   >
                     Previous
                   </Button>
                   <Button
                     variant="secondary"
                     size="sm"
                     onClick={() => setCurrentLogPage(prev => Math.min(prev + 1, totalLogPages))}
                     disabled={currentLogPage === totalLogPages}
                     aria-label="Next page"
                   >
                     Next
                   </Button>
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;