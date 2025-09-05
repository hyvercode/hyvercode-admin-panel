import React from 'react';

interface TimelineItemProps {
    icon: React.ReactNode;
    title: string;
    timestamp: string;
    children: React.ReactNode;
    isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ icon, title, timestamp, children, isLast }) => {
    return (
        <li className="relative flex gap-x-4">
            {!isLast && <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                <div className="w-px bg-neutral-200 dark:bg-neutral-800"></div>
            </div>}
            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-full">
                {icon}
            </div>
            <div className="flex-auto pb-6">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
                    <time className="flex-none py-0.5 text-xs leading-5 text-neutral-500">{timestamp}</time>
                </div>
                <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{children}</div>
            </div>
        </li>
    );
};


interface TimelineProps {
    children: React.ReactElement<TimelineItemProps>[] | React.ReactElement<TimelineItemProps>;
}

const Timeline: React.FC<TimelineProps> & { Item: typeof TimelineItem } = ({ children }) => {
    const items = React.Children.toArray(children) as React.ReactElement<TimelineItemProps>[];
    return (
        <ul>
            {items.map((child, index) =>
                React.cloneElement(child, {
                    isLast: index === items.length - 1,
                })
            )}
        </ul>
    );
};

Timeline.Item = TimelineItem;

export default Timeline;
