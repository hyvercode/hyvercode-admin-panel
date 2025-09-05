import React from 'react';
import { KanbanTask, KanbanStatus } from '../../../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  tasks: KanbanTask[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const columns: { title: string; status: KanbanStatus }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'inprogress' },
    { title: 'Done', status: 'done' },
  ];

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {columns.map(col => (
        <KanbanColumn
          key={col.status}
          title={col.title}
          tasks={tasks.filter(t => t.status === col.status)}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
