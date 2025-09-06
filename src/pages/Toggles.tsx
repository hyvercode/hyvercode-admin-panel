
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Toggle from '../components/ui/toggle/Toggle';
import ToggleCard from '../components/ui/toggle/ToggleCard';
import ToggleGroup from '../components/ui/toggle/ToggleGroup';
import { useForm } from '../hooks/useForm';
import Button from '../components/ui/Button';

const Toggles: React.FC = () => {

     const handleSubmit = (values: any) => {
        alert('Settings saved! Check console.');
        console.log('Toggle Settings:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
        {
            emailNotifications: true,
            pushNotifications: false,
            smsNotifications: false,
            darkMode: true,
            autoSave: false,
        },
        () => ({}), // No validation
        handleSubmit
    );

    return (
        <div>
            <PageHeader
                title="Toggles & Switches"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Toggles', path: '/admin/components/toggles' }]}
            />
            <Card>
                <Card.Header><h3 className="font-semibold">Notification Settings</h3></Card.Header>
                <Card.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ToggleGroup label="Standard Toggles">
                                <Toggle
                                    label="Email Notifications"
                                    description="Receive updates via email."
                                    {...getFieldProps('emailNotifications')}
                                />
                                <Toggle
                                    label="Push Notifications"
                                    description="Get real-time alerts on your devices."
                                    {...getFieldProps('pushNotifications')}
                                />
                                <Toggle
                                    label="SMS Notifications"
                                    description="Receive critical alerts via text."
                                    {...getFieldProps('smsNotifications')}
                                />
                                <Toggle
                                    label="Disabled Option"
                                    description="This option cannot be changed."
                                    id="disabled-toggle"
                                    disabled
                                />
                            </ToggleGroup>

                            <ToggleGroup label="Toggle Cards">
                                <ToggleCard
                                    icon={<i className="bi bi-moon-stars-fill"></i>}
                                    title="Enable Dark Mode"
                                    description="Switch to a darker, eye-friendly interface."
                                    {...getFieldProps('darkMode')}
                                />
                                 <ToggleCard
                                    icon={<i className="bi bi-save-fill"></i>}
                                    title="Auto-Save Drafts"
                                    description="Automatically save your work in the background."
                                    {...getFieldProps('autoSave')}
                                />
                            </ToggleGroup>
                        </div>
                        <div className="flex justify-end mt-8 pt-4 border-t dark:border-neutral-800">
                            <Button type="submit">Save Preferences</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Toggles;
