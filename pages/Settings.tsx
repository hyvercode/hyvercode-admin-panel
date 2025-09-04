import React from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Settings: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Settings</h2>

      <div className="bg-white dark:bg-dark rounded-lg shadow-md p-8">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Settings */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">Profile Information</h3>
            </div>
            <Input
              label="Full Name"
              id="fullName"
              type="text"
              defaultValue="John Doe"
              className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            <Input
              label="Email Address"
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
              className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Biography</label>
              <textarea id="bio" rows={4} className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="Administrator and lead developer."></textarea>
            </div>

            {/* Security Settings */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">Security</h3>
            </div>
             <Input
              label="Current Password"
              id="currentPassword"
              type="password"
              className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
             <Input
              label="New Password"
              id="newPassword"
              type="password"
              className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="button" variant="outline" className="mr-4">
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
