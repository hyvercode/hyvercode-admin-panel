import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { useForm, FormErrors } from '../hooks/useForm';

import Toggle from '../components/ui/toggle/Toggle';
import ToggleCard from '../components/ui/toggle/ToggleCard';
import ToggleGroup from '../components/ui/toggle/ToggleGroup';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);


const Toggles: React.FC = () => {
    const handleSubmit = (values: any) => {
        alert('Toggle settings saved! Check console.');
        console.log('Toggle Form Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
        {
            darkMode: true,
            autoSave: false,
            emailNotifications: true,
            pushNotifications: false,
            notificationGroup: null, // Dummy field for group-level error
        },
        (values: any): FormErrors => {
            const errors: FormErrors = {};
            if (values.emailNotifications === false && values.pushNotifications === false) {
                errors.notificationGroup = "At least one notification method must be enabled.";
            }
            return errors;
        },
        handleSubmit
    );

    return (
        <div>
            <PageHeader
                title="Toggle & Switch Components"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Toggles', path: '/toggles' }]}
            />

            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ComponentSection title="Standard Toggles">
                        <ToggleGroup label="General Settings">
                            <Toggle
                                label="Dark Mode"
                                description="Enable the dark theme."
                                {...getFieldProps('darkMode')}
                            />
                            <Toggle
                                label="Auto-Save"
                                description="Automatically save your changes."
                                {...getFieldProps('autoSave')}
                            />
                            <Toggle
                                label="Disabled Toggle"
                                description="This option is currently unavailable."
                                id="disabled-toggle"
                                name="disabled-toggle"
                                disabled
                            />
                        </ToggleGroup>
                    </ComponentSection>

                    <ComponentSection title="Toggle Cards">
                        <ToggleGroup label="Notification Preferences" error={getFieldProps('notificationGroup').error}>
                            <ToggleCard
                                icon={<i className="bi bi-envelope-fill"></i>}
                                title="Email Notifications"
                                description="Receive updates in your inbox."
                                {...getFieldProps('emailNotifications')}
                            />
                            <ToggleCard
                                icon={<i className="bi bi-phone-fill"></i>}
                                title="Push Notifications"
                                description="Get alerts on your mobile device."
                                {...getFieldProps('pushNotifications')}
                            />
                        </ToggleGroup>
                    </ComponentSection>
                </div>
                <div className="mt-8 flex justify-end">
                    <Button type="submit">Save Preferences</Button>
                </div>
            </form>
        </div>
    );
};

export default Toggles;
