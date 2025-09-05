import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { USERS_DATA } from '../constants';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Avatar from '../components/ui/avatar/Avatar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Tabs from '../components/ui/navigation/Tabs';

const Profile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const user = USERS_DATA.find(u => u.id === parseInt(userId || ''));

    if (!user) {
        return <Navigate to="/users" replace />;
    }

    return (
        <div>
            <PageHeader
                title="User Profile"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Users', path: '/users' },
                    { name: user.name, path: `/profile/${user.id}` }
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <Card>
                        <Card.Body className="flex flex-col items-center text-center">
                            <Avatar name={user.name} size="xl" src={`https://picsum.photos/200/200?random=${user.id}`} />
                            <h2 className="text-xl font-bold mt-4">{user.name}</h2>
                            <p className="text-neutral-600 dark:text-neutral-400">{user.role}</p>
                            <Badge variant={user.status === 'active' ? 'success' : 'neutral'} >
                                {user.status}
                            </Badge>
                            <p className="text-sm mt-4 text-neutral-700 dark:text-neutral-300">{user.bio}</p>
                            <Button className="mt-4" fullWidth>Edit Profile</Button>
                        </Card.Body>
                    </Card>
                </div>

                {/* Details and Activity */}
                <div className="lg:col-span-2">
                    <Card>
                        <Tabs tabs={[{ id: 'activity', label: 'Activity' }, { id: 'details', label: 'Details' }]}>
                            {(activeTab) => (
                                <div className="p-4">
                                    {activeTab === 'activity' && (
                                        <p>User activity feed would be displayed here.</p>
                                    )}
                                    {activeTab === 'details' && (
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex justify-between"><span className="font-semibold">Full Name:</span> <span>{user.name}</span></li>
                                            <li className="flex justify-between"><span className="font-semibold">Email:</span> <span>{user.email}</span></li>
                                            <li className="flex justify-between"><span className="font-semibold">Role:</span> <span>{user.role}</span></li>
                                            <li className="flex justify-between"><span className="font-semibold">Status:</span> <span>{user.status}</span></li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
