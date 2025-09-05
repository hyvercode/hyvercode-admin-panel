import React from 'react';
import { KanbanTask } from '../../../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  tasks: KanbanTask[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks }) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-1100 rounded-lg p-4 w-72 flex-shrink-0">
      <h3 className="font-bold text-md mb-4">{title} ({tasks.length})</h3>
      <div>
        {tasks.map(task => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
