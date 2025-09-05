import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import { TASKS_DATA, USERS_DATA } from '../constants';
import { Task } from '../types';
import Card from '../components/ui/card/Card';
import Avatar from '../components/ui/avatar/Avatar';
import Badge from '../components/ui/Badge';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const assignee = USERS_DATA.find(u => u.id === task.assigneeId);
  
  const priorityColors = {
    High: 'danger',
    Medium: 'warning',
    Low: 'primary',
  } as const;

  return (
    <Card>
      <Card.Body>
        <div className="flex justify-between items-start">
            <h4 className="font-bold text-md text-neutral-900 dark:text-neutral-100">{task.title}</h4>
            <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Due: {task.dueDate}</p>
        <div className="flex justify-between items-end mt-4">
            <div className="flex items-center space-x-1">
                {task.tags.map(tag => <Badge key={tag} variant="neutral">{tag}</Badge>)}
            </div>
            {assignee && <Avatar name={assignee.name} src={`https://picsum.photos/40/40?random=${assignee.id}`} size="sm" />}
        </div>
      </Card.Body>
    </Card>
  );
};

const Tasks: React.FC = () => {
    const columns = {
        'To Do': TASKS_DATA.filter(t => t.status === 'To Do'),
        'In Progress': TASKS_DATA.filter(t => t.status === 'In Progress'),
        'Completed': TASKS_DATA.filter(t => t.status === 'Completed'),
    };

    return (
        <div>
            <PageHeader
                title="Tasks Board"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Tasks', path: '/tasks' }]}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(columns).map(([status, tasks]) => (
                    <div key={status}>
                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 px-2">{status} ({tasks.length})</h3>
                        <div className="space-y-4">
                            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
