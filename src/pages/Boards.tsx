import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import KanbanBoard from '../components/ui/kanban/KanbanBoard';
import { TASKS_DATA } from '../constants';
import { Task } from '../types';
import Timeline from '../components/ui/Timeline';
import Card from '../components/ui/card/Card';

// This is the same data setup as Tasks.tsx for demonstration
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

const Boards: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Project Board"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Boards', path: '/boards' }]}
        actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>New Board</Button>}
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
            <KanbanBoard
                initialTasks={tasksMap}
                initialColumns={initialColumns}
                columnOrder={['Todo', 'In Progress', 'Done']}
            />
        </div>
        <div className="xl:col-span-1">
          <Card>
            <Card.Header><h3 className="font-bold">Recent Activity</h3></Card.Header>
            <Card.Body>
              <Timeline>
                <Timeline.Item
                  icon={<i className="bi bi-check-lg" />}
                  iconBgClass="bg-success"
                  title="Task Completed"
                  timestamp="2 hours ago"
                >
                  <p>'Write API documentation' was marked as done by Bob Smith.</p>
                </Timeline.Item>
                <Timeline.Item
                  icon={<i className="bi bi-arrow-right" />}
                  iconBgClass="bg-primary"
                  title="Task Moved"
                  timestamp="5 hours ago"
                >
                  <p>'Design new dashboard layout' was moved to 'In Progress'.</p>
                </Timeline.Item>
                <Timeline.Item
                  icon={<i className="bi bi-plus-lg" />}
                  iconBgClass="bg-info"
                  title="New Task Added"
                  timestamp="1 day ago"
                >
                  <p>'Plan Q4 marketing campaign' was created.</p>
                </Timeline.Item>
              </Timeline>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Boards;
