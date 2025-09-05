import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import { KANBAN_TASKS_DATA, USERS_DATA } from '../constants';
import Card from '../components/ui/card/Card';
import Checkbox from '../components/ui/Checkbox';
import Avatar from '../components/ui/avatar/Avatar';
import Tooltip from '../components/ui/Tooltip';
import Button from '../components/ui/Button';

const Tasks: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="My Tasks"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Tasks', path: '/tasks' }]}
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>New Task</Button>}
            />

            <Card>
                <Card.Body>
                    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {KANBAN_TASKS_DATA.map(task => {
                            const assignee = USERS_DATA.find(u => u.id === task.assigneeId);
                            return (
                                <li key={task.id} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Checkbox id={`task-${task.id}`} label="" checked={task.status === 'done'} onChange={() => {}} />
                                        <div className="ml-3">
                                            <p className={`font-medium ${task.status === 'done' ? 'line-through text-neutral-500' : ''}`}>{task.title}</p>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{task.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {assignee && (
                                            <Tooltip content={`Assigned to ${assignee.name}`} position="top">
                                                <Avatar name={assignee.name} size="sm" src={`https://picsum.photos/40/40?random=${assignee.id}`} />
                                            </Tooltip>
                                        )}
                                        <Button variant="subtle" size="sm-icon"><i className="bi bi-pencil"></i></Button>
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
