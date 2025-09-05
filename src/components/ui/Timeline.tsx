import React from 'react';

interface TimelineItemProps {
    icon: React.ReactNode;
    iconBgClass: string;
    title: string;
    timestamp: string;
    children: React.ReactNode;
    isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ icon, iconBgClass, title, timestamp, children, isLast }) => {
    return (
        <li className={`relative ${!isLast ? 'pb-8' : ''}`}>
            {!isLast && <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-neutral-200 dark:bg-neutral-800" />}
            <div className="relative flex items-start space-x-3">
                <div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${iconBgClass}`}>
                        {icon}
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <div>
                        <div className="text-sm">
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">{title}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{timestamp}</p>
                    </div>
                    <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                        {children}
                    </div>
                </div>
            </div>
        </li>
    );
};

interface TimelineProps {
    children: React.ReactNode;
    className?: string;
}

const Timeline: React.FC<TimelineProps> & { Item: typeof TimelineItem } = ({ children, className }) => {
    const items = React.Children.toArray(children);
    return (
        <div className={`flow-root ${className}`}>
            <ul>
                {items.map((child, index) =>
                    React.isValidElement(child)
                        // FIX: Use Object.assign to safely merge props. The spread operator `...`
                        // can cause a "Spread types may only be created from object types" error
                        // if TypeScript cannot guarantee that child.props is an object.
                        ? React.cloneElement(child, Object.assign({}, child.props, { isLast: index === items.length - 1 }))
                        : child
                )}
            </ul>
        </div>
    );
};

Timeline.Item = TimelineItem;

export default Timeline;