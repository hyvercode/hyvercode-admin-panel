import React from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Settings: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Settings</h2>

      <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-8">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Settings */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">Profile Information</h3>
            </div>
            <Input
              label="Full Name"
              id="fullName"
              type="text"
              defaultValue="John Doe"
            />
            <Input
              label="Email Address"
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
            />
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block mb-1 text-sm font-medium text-neutral-800 dark:text-neutral-300">Biography</label>
              <textarea 
                id="bio" 
                rows={4} 
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white"
                defaultValue="Administrator and lead developer."
              ></textarea>
            </div>

            {/* Security Settings */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">Security</h3>
            </div>
             <Input
              label="Current Password"
              id="currentPassword"
              type="password"
            />
             <Input
              label="New Password"
              id="newPassword"
              type="password"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="button" variant="secondary" className="mr-4">
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;