import React, { useState, useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import ProgressBar from '../components/ui/loading/ProgressBar';
import Skeleton from '../components/ui/loading/Skeleton';
import Spinner from '../components/ui/loading/Spinner';
import AvatarSkeleton from '../components/ui/avatar/AvatarSkeleton';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const Loaders: React.FC = () => {
    const [progress, setProgress] = useState(25);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(oldProgress => {
                if (oldProgress >= 100) return 0;
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <PageHeader
                title="Loading Components"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Loaders', path: '/loaders' }]}
            />

            <ComponentSection title="Spinners">
                <p className="mb-4">Simple, animated spinners for indicating loading states.</p>
                <div className="flex items-center gap-6">
                    <Spinner size="sm" />
                    <Spinner size="md" className="text-primary" />
                    <Spinner size="lg" className="text-danger" />
                </div>
            </ComponentSection>

            <ComponentSection title="Progress Bars">
                <p className="mb-4">Use progress bars to show completion of a task. The progress below animates automatically for demonstration.</p>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2">Primary</h4>
                        <ProgressBar progress={progress} variant="primary" showLabel />
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Success</h4>
                        <ProgressBar progress={progress} variant="success" />
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Transparent</h4>
                        <ProgressBar progress={progress} variant="transparent" size="sm" />
                    </div>
                </div>
            </ComponentSection>

            <ComponentSection title="Skeletons">
                <p className="mb-4">Skeletons are used to create placeholders for content that is still loading, improving perceived performance.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Skeletons */}
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Basic Shapes</h4>
                        <Skeleton shape="circle" width="80px" height="80px" />
                        <Skeleton shape="box" height="100px" />
                        <Skeleton shape="line" />
                        <Skeleton shape="line" width="80%" />
                    </div>
                    {/* Composed Skeleton */}
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Composed Example</h4>
                        <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg">
                            <AvatarSkeleton size="lg" showText />
                            <div className="mt-4 space-y-2">
                                <Skeleton shape="line" />
                                <Skeleton shape="line" />
                                <Skeleton shape="line" width="60%" />
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentSection>
        </div>
    );
};

export default Loaders;