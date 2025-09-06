
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Icon from '../components/ui/icon/Icon';
import IconTile from '../components/ui/icon/IconTile';
import IconObject from '../components/ui/icon/IconObject';
import Button from '../components/ui/Button';

const iconList = ['house-door-fill', 'search', 'person-circle', 'gear-fill', 'bell-fill', 'chat-dots-fill', 'trash-fill', 'pencil-fill', 'check-circle-fill', 'x-circle-fill', 'info-circle-fill', 'exclamation-triangle-fill'];

const Icons: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Icons"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Icons', path: '/admin/components/icons' }]}
            />
            <div className="space-y-6">
                <Card>
                    <Card.Header><h3 className="font-semibold">Icon Library (Bootstrap Icons)</h3></Card.Header>
                    <Card.Body className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                        {iconList.map(icon => (
                            <div key={icon} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-center">
                                <Icon name={icon} size="xl" />
                                <span className="text-xs mt-2 text-neutral-600 dark:text-neutral-400 break-all">{icon}</span>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                 <Card>
                    <Card.Header><h3 className="font-semibold">Icon Tiles</h3></Card.Header>
                    <Card.Body className="flex items-center flex-wrap gap-4">
                        <IconTile iconName="check-circle-fill" variant="success" size="lg" />
                        <IconTile iconName="exclamation-triangle-fill" variant="danger" size="lg" shape="circle" />
                        <IconTile iconName="info-circle-fill" variant="info" size="md" />
                        <IconTile iconName="lightbulb-fill" variant="warning" size="md" shape="circle" />
                        <IconTile iconName="shield-lock-fill" variant="primary" size="sm" />
                    </Card.Body>
                </Card>

                 <Card>
                    <Card.Header><h3 className="font-semibold">Icon Objects</h3></Card.Header>
                    <Card.Body className="space-y-4">
                        <IconObject 
                            iconTileProps={{ iconName: 'file-earmark-bar-graph-fill', variant: 'primary' }}
                            title="New Report Generated"
                            description="A new sales report for Q4 is now available."
                        />
                         <IconObject 
                            iconTileProps={{ iconName: 'server', variant: 'danger', shape: 'circle' }}
                            title="Server Overload"
                            description="High CPU usage detected on server #5."
                        >
                            <Button size="sm" variant="secondary">Investigate</Button>
                        </IconObject>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Icons;
