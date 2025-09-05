import React from 'react';
import { KanbanColumn as KanbanColumnType, Task } from '../../../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks }) => {
  return (
    <div className="flex flex-col w-72 bg-neutral-100 dark:bg-neutral-1100 rounded-lg">
      <div className="p-3 border-b-2 border-neutral-200 dark:border-neutral-900">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{column.title} <span className="text-sm text-neutral-500">{tasks.length}</span></h3>
      </div>
      <div className="p-3 flex-grow overflow-y-auto">
        {tasks.map(task => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
