
import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { KANBAN_TASKS_DATA, KANBAN_COLUMNS_DATA, KANBAN_COLUMN_ORDER_DATA } from '../constants';
import KanbanBoard from '../components/ui/kanban/KanbanBoard';
import { Task, KanbanColumn } from '../types';

const Boards: React.FC = () => {
    const [tasks, setTasks] = useState<Record<string, Task>>(KANBAN_TASKS_DATA);
    const [columns, setColumns] = useState<Record<string, KanbanColumn>>(KANBAN_COLUMNS_DATA);
    const [columnOrder] = useState<string[]>(KANBAN_COLUMN_ORDER_DATA);

    const handleTaskMove = (taskId: string, sourceColumnId: string, destColumnId: string) => {
        // Update task status
        const movedTask = { ...tasks[taskId], status: destColumnId as Task['status'] };
        const newTasks = { ...tasks, [taskId]: movedTask };
        setTasks(newTasks);

        // Update columns
        const sourceColumn = columns[sourceColumnId];
        const destColumn = columns[destColumnId];

        const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== taskId);
        const newDestTaskIds = [...destColumn.taskIds, taskId];
        
        const newColumns = {
            ...columns,
            [sourceColumnId]: {
                ...sourceColumn,
                taskIds: newSourceTaskIds,
            },
            [destColumnId]: {
                ...destColumn,
                taskIds: newDestTaskIds,
            }
        };
        setColumns(newColumns);
    };

    return (
        // The container needs specific styling to allow for horizontal scrolling of the board
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <PageHeader
                title="Kanban Board"
                breadcrumbs={[{ name: 'Dashboard', path: '/admin/dashboard' }, { name: 'Boards', path: '/admin/boards' }]}
            />
            <div className="flex-grow overflow-x-auto">
                <KanbanBoard 
                    tasks={tasks}
                    columns={columns}
                    columnOrder={columnOrder}
                    onTaskMove={handleTaskMove}
                />
            </div>
        </div>
    );
};

export default Boards;
