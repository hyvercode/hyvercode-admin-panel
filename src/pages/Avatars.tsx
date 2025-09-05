import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Avatar from '../components/ui/avatar/Avatar';
import AvatarGroup from '../components/ui/avatar/AvatarGroup';
import AvatarItem from '../components/ui/avatar/AvatarItem';
import AvatarSkeleton from '../components/ui/avatar/AvatarSkeleton';
import Button from '../components/ui/Button';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const userList = [
    { name: 'Alice Johnson', src: 'https://picsum.photos/50/50?random=1' },
    { name: 'Bob Smith', src: 'https://picsum.photos/50/50?random=2' },
    { name: 'Charlie Brown' },
    { name: 'Diana Prince', src: 'https://picsum.photos/50/50?random=4' },
    { name: 'Ethan Hunt', src: 'https://picsum.photos/50/50?random=5' },
];

const Avatars: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Avatar Components"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Avatars', path: '/avatars' }]}
            />

            <ComponentSection title="Standard Avatars">
                <div className="flex flex-wrap items-center gap-4">
                    <Avatar name="Alice Johnson" src="https://picsum.photos/200/200?random=1" size="xl" />
                    <Avatar name="Bob Smith" src="https://picsum.photos/200/200?random=2" size="lg" />
                    <Avatar name="Charlie Brown" size="md" />
                    <Avatar name="Diana Prince" src="https://picsum.photos/200/200?random=4" size="sm" />
                </div>
            </ComponentSection>
            
            <ComponentSection title="Avatars with Presence">
                <div className="flex flex-wrap items-center gap-4">
                    <Avatar name="Alice Johnson" src="https://picsum.photos/200/200?random=1" size="lg" presence="online" />
                    <Avatar name="Bob Smith" src="https://picsum.photos/200/200?random=2" size="lg" presence="away" />
                    <Avatar name="Charlie Brown" size="lg" presence="busy" />
                    <Avatar name="Diana Prince" src="https://picsum.photos/200/200?random=4" size="lg" presence="offline" />
                </div>
            </ComponentSection>

            <ComponentSection title="Avatar Group">
                <div className="flex flex-wrap items-center gap-8">
                    <AvatarGroup users={userList} size="lg" />
                    <AvatarGroup users={userList} max={4} size="md" />
                    <AvatarGroup users={userList.slice(0, 2)} size="sm" />
                </div>
            </ComponentSection>
            
            <ComponentSection title="Avatar Item Layout">
                <div className="space-y-4 max-w-md">
                   <AvatarItem
                        avatarProps={{ name: 'Alice Johnson', src: 'https://picsum.photos/50/50?random=1', size: 'lg', presence: 'online' }}
                        name="Alice Johnson"
                        description="alice@example.com"
                    >
                        <Button size="sm" variant="secondary">Message</Button>
                    </AvatarItem>
                    <AvatarItem
                        avatarProps={{ name: 'Charlie Brown', size: 'lg' }}
                        name="Charlie Brown"
                        description="Lead Developer"
                    />
                </div>
            </ComponentSection>

            <ComponentSection title="Avatar Skeleton (Loading State)">
                 <div className="space-y-6 max-w-md">
                    <AvatarSkeleton size="lg" showText />
                    <AvatarSkeleton size="md" showText />
                    <AvatarSkeleton size="sm" />
                 </div>
            </ComponentSection>
        </div>
    );
};

export default Avatars;