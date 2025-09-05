import React from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { useForm, FormErrors } from '../hooks/useForm';

const validate = (values: Record<string, string>): FormErrors => {
  const errors: FormErrors = {};
  if (!values.fullName) {
    errors.fullName = 'Full name is required.';
  }
  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }
  if (values.newPassword && values.newPassword.length < 6) {
    errors.newPassword = 'New password must be at least 6 characters.';
  }
  return errors;
};

const Settings: React.FC = () => {
  const handleSettingsSubmit = (values: Record<string, string>) => {
    // In a real app, you would make an API call here.
    console.log('Form submitted successfully:', values);
    alert('Settings saved!');
  };

  const { getFieldProps, handleSubmit } = useForm(
    {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'Administrator and lead developer.',
      currentPassword: '',
      newPassword: '',
    },
    validate,
    handleSettingsSubmit
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Settings</h2>

      <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Settings */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">Profile Information</h3>
            </div>
            <Input
              label="Full Name"
              type="text"
              {...getFieldProps('fullName')}
            />
            <Input
              label="Email Address"
              type="email"
              {...getFieldProps('email')}
            />
            <div className="md:col-span-2">
               <Textarea
                  label="Biography"
                  rows={4}
                  {...getFieldProps('bio')}
                />
            </div>

            {/* Security Settings */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">Security</h3>
            </div>
             <Input
              label="Current Password"
              type="password"
              {...getFieldProps('currentPassword')}
            />
             <Input
              label="New Password"
              type="password"
              {...getFieldProps('newPassword')}
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