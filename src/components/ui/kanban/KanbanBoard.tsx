import React from 'react';
import { Task, KanbanColumn as KanbanColumnType } from '../../../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Record<string, Task>;
  columns: Record<string, KanbanColumnType>;
  columnOrder: string[];
  onTaskMove: (taskId: string, sourceColumnId: string, destColumnId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, columns, columnOrder, onTaskMove }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-2">
      {columnOrder.map(columnId => {
        const column = columns[columnId];
        const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
        return <KanbanColumn key={column.id} column={column} tasks={columnTasks} onTaskMove={onTaskMove} />;
      })}
    </div>
  );
};

export default KanbanBoard;