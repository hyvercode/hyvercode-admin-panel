import React from 'react';
import { useParams } from 'react-router-dom';
import { USERS_DATA } from '../constants';
import Avatar from '../components/ui/avatar/Avatar';
import Card from '../components/ui/card/Card';
import Tabs from '../components/ui/navigation/Tabs';
import Button from '../components/ui/Button';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  // In a real app, you'd fetch this data. We'll use our mock data.
  const user = USERS_DATA.find(u => u.id === parseInt(userId || '1'));

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <Card className="mb-8">
        <div className="h-32 bg-primary-background" />
        <Card.Body>
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5 -mt-16">
            <Avatar name={user.name} src={`https://picsum.photos/200/200?random=${user.id}`} size="xl" />
            <div className="mt-4 sm:mt-0 flex-grow">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{user.name}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{user.role}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button>Edit Profile</Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Tabs tabs={[{id: 'overview', label: 'Overview'}, {id: 'activity', label: 'Activity'}]}>
            {(activeTab) => (
                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2">About</h3>
                            <p className="text-neutral-700 dark:text-neutral-300">{user.bio || 'No biography provided.'}</p>
                            <hr className="my-6 border-neutral-200 dark:border-neutral-800" />
                            <h3 className="font-semibold text-lg mb-2">Details</h3>
                            <ul className="space-y-2 text-sm">
                                <li><strong>Email:</strong> {user.email}</li>
                                <li><strong>Status:</strong> {user.status}</li>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'activity' && (
                        <div>
                            <p>Recent activity will be shown here.</p>
                        </div>
                    )}
                </div>
            )}
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
