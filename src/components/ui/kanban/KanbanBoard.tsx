import React from 'react';
import { Task, KanbanColumn as KanbanColumnType } from '../../../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  initialTasks: Record<string, Task>;
  initialColumns: Record<string, KanbanColumnType>;
  columnOrder: string[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialTasks, initialColumns, columnOrder }) => {
  // In a real app, this state would be managed with React state and context/reducers.
  // For this demo, we are just rendering the initial state.
  const tasks = initialTasks;
  const columns = initialColumns;

  return (
    <div className="flex space-x-4 overflow-x-auto p-2">
      {columnOrder.map(columnId => {
        const column = columns[columnId];
        const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
        return <KanbanColumn key={column.id} column={column} tasks={columnTasks} />;
      })}
    </div>
  );
};

export default KanbanBoard;
