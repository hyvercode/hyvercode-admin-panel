
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import { KANBAN_TASKS_DATA, USERS_DATA } from '../constants';
import Card from '../components/ui/card/Card';
import AvatarGroup from '../components/ui/avatar/AvatarGroup';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Tasks: React.FC = () => {
  const tasks = Object.values(KANBAN_TASKS_DATA);

  const priorityColors = {
    High: 'danger',
    Medium: 'warning',
    Low: 'success',
  } as const;

  return (
    <div>
      <PageHeader
        title="Task List"
        breadcrumbs={[{ name: 'Dashboard', path: '/admin/dashboard' }, { name: 'Tasks', path: '/admin/tasks' }]}
        actions={
            <Button as={Link} to="/admin/boards">View Board</Button>
        }
      />

      <Card>
        <Card.Body>
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {tasks.map(task => {
              const assignees = USERS_DATA.filter(user => task.assigneeIds.includes(user.id));
              return (
                <li key={task.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-grow">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{task.title}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-6 mt-3 md:mt-0">
                    <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
                    <Badge variant="neutral">{task.status}</Badge>
                    <AvatarGroup users={assignees} size="sm" max={3} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Tasks;
