import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Calendar from '../components/ui/Calendar';
import { CALENDAR_EVENTS_DATA } from '../constants';
import Badge from '../components/ui/Badge';

const upcomingEvents = CALENDAR_EVENTS_DATA.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
}).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);


const CalendarPage: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Calendar"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Calendar', path: '/calendar' }]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <Calendar events={CALENDAR_EVENTS_DATA} />
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">Upcoming Events</h3>
                        <ul className="space-y-4">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map(event => (
                                    <li key={event.id}>
                                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">{event.title}</p>
                                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                            <i className="bi bi-calendar-event mr-2"></i>
                                            <span>{new Date(event.date).toLocaleDateString('default', { month: 'long', day: 'numeric' })}</span>
                                            <Badge variant={event.category} >{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</Badge>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">No upcoming events.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;