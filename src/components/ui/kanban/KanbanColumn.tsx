import React, { useState } from 'react';
import { KanbanColumn as KanbanColumnType, Task } from '../../../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: Task[];
  onTaskMove: (taskId: string, sourceColumnId: string, destColumnId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onTaskMove }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    if (taskId && sourceColumnId !== column.id) {
        onTaskMove(taskId, sourceColumnId, column.id);
    }
    setIsDraggingOver(false);
  };
  
  const onDragEnter = () => setIsDraggingOver(true);
  const onDragLeave = () => setIsDraggingOver(false);

  return (
    <div 
      className="flex flex-col w-72 bg-neutral-100 dark:bg-neutral-900/50 rounded-lg flex-shrink-0"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <div className="p-3 border-b-2 border-neutral-200 dark:border-neutral-800">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{column.title} <span className="text-sm text-neutral-500">{tasks.length}</span></h3>
      </div>
      <div className={`p-3 flex-grow overflow-y-auto transition-colors ${isDraggingOver ? 'bg-primary-background' : ''}`}>
        {tasks.map(task => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;