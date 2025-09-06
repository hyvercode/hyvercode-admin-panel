
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Avatar from '../components/ui/avatar/Avatar';
import AvatarGroup from '../components/ui/avatar/AvatarGroup';
import AvatarItem from '../components/ui/avatar/AvatarItem';
import AvatarSkeleton from '../components/ui/avatar/AvatarSkeleton';
import { USERS_DATA } from '../constants';
import Button from '../components/ui/Button';

const Avatars: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Avatars"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Avatars', path: '/admin/components/avatars' }]}
            />

            <div className="space-y-6">
                <Card>
                    <Card.Header><h3 className="font-semibold">Sizes & Presence</h3></Card.Header>
                    <Card.Body className="flex items-center gap-6">
                        <Avatar name="Alice Johnson" size="sm" presence="online" src="https://i.pravatar.cc/150?u=a" />
                        <Avatar name="Bob Williams" size="md" presence="away" />
                        <Avatar name="Charlie Brown" size="lg" presence="busy" src="https://i.pravatar.cc/150?u=c" />
                        <Avatar name="Diana Miller" size="xl" presence="offline" />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header><h3 className="font-semibold">Avatar Group</h3></Card.Header>
                    <Card.Body>
                         <AvatarGroup users={USERS_DATA} size="md" max={4} />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header><h3 className="font-semibold">Avatar Item</h3></Card.Header>
                    <Card.Body className="space-y-4">
                        <AvatarItem
                            avatarProps={{ name: USERS_DATA[0].name, src: `https://i.pravatar.cc/150?u=${USERS_DATA[0].email}`, presence: 'online' }}
                            name={USERS_DATA[0].name}
                            description={USERS_DATA[0].role}
                        >
                            <Button size="sm">Message</Button>
                        </AvatarItem>
                        <AvatarItem
                            avatarProps={{ name: USERS_DATA[1].name, presence: 'away' }}
                            name={USERS_DATA[1].name}
                            description={USERS_DATA[1].role}
                        >
                            <Button size="sm" variant="secondary">View Profile</Button>
                        </AvatarItem>
                    </Card.Body>
                </Card>
                
                 <Card>
                    <Card.Header><h3 className="font-semibold">Skeleton Loaders</h3></Card.Header>
                    <Card.Body className="flex items-center gap-8">
                        <AvatarSkeleton size="md" />
                        <AvatarSkeleton size="lg" showText />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Avatars;
