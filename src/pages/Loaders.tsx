
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Spinner from '../components/ui/loading/Spinner';
import ProgressBar from '../components/ui/loading/ProgressBar';
import Skeleton from '../components/ui/loading/Skeleton';
import AvatarSkeleton from '../components/ui/avatar/AvatarSkeleton';

const Loaders: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Loaders & Skeletons"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Loaders', path: '/admin/components/loaders' }]}
            />
            <div className="space-y-6">
                <Card>
                    <Card.Header><h3 className="font-semibold">Spinners</h3></Card.Header>
                    <Card.Body className="flex items-center gap-8">
                        <Spinner size="sm" className="text-primary" />
                        <Spinner size="md" className="text-success" />
                        <Spinner size="lg" className="text-danger" />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header><h3 className="font-semibold">Progress Bars</h3></Card.Header>
                    <Card.Body className="space-y-6">
                        <ProgressBar progress={30} />
                        <ProgressBar progress={60} variant="success" showLabel />
                        <ProgressBar progress={90} variant="transparent" size="sm" />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header><h3 className="font-semibold">Skeleton Loaders</h3></Card.Header>
                    <Card.Body className="space-y-6">
                        <div className="space-y-3">
                            <Skeleton shape="line" width="80%" />
                            <Skeleton shape="line" width="60%" />
                            <Skeleton shape="line" width="90%" />
                        </div>
                         <div className="flex items-center gap-4">
                            <Skeleton shape="circle" width="50px" height="50px" />
                            <Skeleton shape="box" width="200px" height="80px" />
                        </div>
                         <div>
                            <h4 className="font-medium mb-3">Card Skeleton</h4>
                            <div className="border p-4 rounded-lg">
                                <AvatarSkeleton size="lg" showText />
                                <div className="space-y-2 mt-4">
                                    <Skeleton shape="line" />
                                    <Skeleton shape="line" />
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Loaders;
