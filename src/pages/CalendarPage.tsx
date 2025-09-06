
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Calendar from '../components/ui/Calendar';
import { CALENDAR_EVENTS_DATA } from '../constants';
import Card from '../components/ui/card/Card';
import Badge from '../components/ui/Badge';

const CalendarPage: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Calendar"
                breadcrumbs={[{ name: 'Dashboard', path: '/admin/dashboard' }, { name: 'Calendar', path: '/admin/calendar' }]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3">
                    <Card>
                        <Card.Header>
                            <h3 className="font-semibold">Legend</h3>
                        </Card.Header>
                        <Card.Body className="space-y-3">
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-primary mr-2"></span> Team Sync</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-success mr-2"></span> Milestone</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-danger mr-2"></span> Deadline</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-warning-dark mr-2"></span> Review</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-info mr-2"></span> Personal</div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="lg:col-span-9">
                     <Calendar events={CALENDAR_EVENTS_DATA} />
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
