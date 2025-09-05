import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import KanbanBoard from '../components/ui/kanban/KanbanBoard';
import { TASKS_DATA } from '../constants';
import { Task } from '../types';
import Button from '../components/ui/Button';

// Organize tasks into columns for the Kanban board
const initialColumns = {
  'Todo': {
    id: 'Todo',
    title: 'To Do',
    taskIds: TASKS_DATA.filter(t => t.status === 'Todo').map(t => t.id),
  },
  'In Progress': {
    id: 'In Progress',
    title: 'In Progress',
    taskIds: TASKS_DATA.filter(t => t.status === 'In Progress').map(t => t.id),
  },
  'Done': {
    id: 'Done',
    title: 'Done',
    taskIds: TASKS_DATA.filter(t => t.status === 'Done').map(t => t.id),
  },
};

const tasksMap = TASKS_DATA.reduce((acc, task) => {
  acc[task.id] = task;
  return acc;
}, {} as Record<string, Task>);


const Tasks: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Tasks"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Tasks' , path: '/tasks' }]}
        actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>New Task</Button>}
      />
      <p className="mb-6 text-neutral-700 dark:text-neutral-400">
        This is a demonstration Kanban board. Drag and drop functionality is not implemented in this sample.
      </p>
      <KanbanBoard
        initialTasks={tasksMap}
        initialColumns={initialColumns}
        columnOrder={['Todo', 'In Progress', 'Done']}
      />
    </div>
  );
};

export default Tasks;
