
import React from 'react';
import { useParams } from 'react-router-dom';
import { USERS_DATA, TIMELINE_EVENTS_DATA } from '../constants';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Avatar from '../components/ui/avatar/Avatar';
import Button from '../components/ui/Button';
import Timeline from '../components/ui/Timeline';

const iconMap: Record<string, { icon: React.ReactNode, bg: string }> = {
    comment: { icon: <i className="bi bi-chat-dots-fill"></i>, bg: 'bg-primary' },
    upload: { icon: <i className="bi bi-upload"></i>, bg: 'bg-success' },
    user: { icon: <i className="bi bi-person-plus-fill"></i>, bg: 'bg-info' }
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = USERS_DATA.find(u => u.id === parseInt(userId || '1'));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <PageHeader
        title="User Profile"
        breadcrumbs={[{ name: 'Users', path: '/admin/users' }, { name: 'Profile', path: `/admin/profile/${user.id}` }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Body className="flex flex-col items-center text-center">
              <Avatar name={user.name} src={`https://i.pravatar.cc/150?u=${user.email}`} size="xl" />
              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{user.role}</p>
              <p className="mt-4 text-sm">{user.bio}</p>
              <Button className="mt-6" fullWidth>Follow</Button>
            </Card.Body>
          </Card>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <h3 className="font-semibold">Activity Timeline</h3>
            </Card.Header>
            <Card.Body>
              <Timeline>
                {TIMELINE_EVENTS_DATA.map(event => (
                  <Timeline.Item 
                    key={event.id}
                    icon={iconMap[event.type].icon}
                    iconBgClass={iconMap[event.type].bg}
                    title={event.user}
                    timestamp={event.timestamp}
                  >
                    <p>{event.description}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
