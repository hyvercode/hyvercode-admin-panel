import React from 'react';
import { useForm, FormErrors } from '../../../hooks/useForm';
import Tabs from '../navigation/Tabs';
import Input from '../Input';
import Checkbox from '../Checkbox';
import Button from '../Button';

const validate = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.fullName) errors.fullName = 'Full name is required.';
    if (!values.email) errors.email = 'Email is required.';
    if (values.newPassword && values.newPassword.length < 6) errors.newPassword = 'New password must be at least 6 characters.';
    return errors;
};

const formTabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
];

const FormTabs: React.FC = () => {
    const handleSubmit = (values: any) => {
        alert('Tabbed form submitted! Check console for data.');
        console.log('Tabbed Form Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
        {
            fullName: 'Demo User',
            email: 'demo@example.com',
            currentPassword: '',
            newPassword: '',
            emailNotifications: true,
            pushNotifications: false,
        },
        validate,
        handleSubmit
    );

    return (
        <form onSubmit={handleFormSubmit}>
            <Tabs tabs={formTabs}>
                {(activeTab) => (
                    <div>
                        {activeTab === 'profile' && (
                            <div className="space-y-4">
                                <Input label="Full Name" {...getFieldProps('fullName')} />
                                <Input label="Email Address" type="email" {...getFieldProps('email')} />
                            </div>
                        )}
                        {activeTab === 'password' && (
                            <div className="space-y-4">
                                <Input label="Current Password" type="password" {...getFieldProps('currentPassword')} />
                                <Input label="New Password" type="password" {...getFieldProps('newPassword')} />
                            </div>
                        )}
                         {activeTab === 'notifications' && (
                            <div className="space-y-4">
                               <Checkbox label="Email Notifications" description="Receive updates via email." {...getFieldProps('emailNotifications')} />
                               <Checkbox label="Push Notifications" description="Get real-time alerts." {...getFieldProps('pushNotifications')} />
                            </div>
                        )}
                    </div>
                )}
            </Tabs>
            <div className="flex justify-end mt-6 pt-4 border-t dark:border-neutral-800">
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    );
};

export default FormTabs;
