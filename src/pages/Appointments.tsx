
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Button from '../components/ui/Button';
import { USERS_DATA } from '../constants';
import Avatar from '../components/ui/avatar/Avatar';
import DatePicker from '../components/ui/datetime/DatePicker';

const appointments = [
    { time: '9:00 AM', user: USERS_DATA[1], service: 'Frontend Consultation' },
    { time: '11:00 AM', user: USERS_DATA[3], service: 'Backend Architecture Review' },
    { time: '2:00 PM', user: USERS_DATA[2], service: 'UI/UX Design Sync' },
];

const Appointments: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Appointments"
                breadcrumbs={[{ name: 'Scheduling', path: '#' }, { name: 'Appointments', path: '/admin/appointments' }]}
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>New Appointment</Button>}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <Card.Header>
                            <h3 className="font-semibold">Today's Schedule</h3>
                        </Card.Header>
                        <Card.Body>
                            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {appointments.map(appt => (
                                    <li key={appt.time} className="py-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="font-mono text-sm bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-md">{appt.time}</span>
                                            <div className="ml-4">
                                                <p className="font-semibold">{appt.service}</p>
                                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                                    <Avatar name={appt.user.name} size="sm" src={`https://i.pravatar.cc/40?u=${appt.user.email}`} />
                                                    <span className="ml-2">{appt.user.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="subtle" size="sm">Details</Button>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card>
                        <Card.Header>
                           <h3 className="font-semibold">Check Availability</h3>
                        </Card.Header>
                        <Card.Body className="space-y-4">
                            <DatePicker id="appointment-date" label="Select a Date" defaultValue={new Date().toISOString().split('T')[0]} />
                            <Button fullWidth>Find Slots</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
