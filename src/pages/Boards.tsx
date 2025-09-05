import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import KanbanBoard from '../components/ui/kanban/KanbanBoard';
import { TASKS_DATA, TIMELINE_DATA } from '../constants';
// FIX: Import the KanbanColumn type to resolve type errors.
import { Task, KanbanColumn } from '../types';
import Timeline from '../components/ui/Timeline';
import Card from '../components/ui/card/Card';

// This is the same data setup as Tasks.tsx for demonstration
// FIX: Explicitly type initialColumns to ensure it conforms to Record<string, KanbanColumn>.
const initialColumns: Record<string, KanbanColumn> = {
  'Todo': { id: 'Todo', title: 'To Do', taskIds: TASKS_DATA.filter(t => t.status === 'Todo').map(t => t.id) },
  'In Progress': { id: 'In Progress', title: 'In Progress', taskIds: TASKS_DATA.filter(t => t.status === 'In Progress').map(t => t.id) },
  'Done': { id: 'Done', title: 'Done', taskIds: TASKS_DATA.filter(t => t.status === 'Done').map(t => t.id) },
};
const tasksMap = TASKS_DATA.reduce((acc, task) => {
  acc[task.id] = task;
  return acc;
}, {} as Record<string, Task>);

const iconMap = {
    task_completed: { icon: <i className="bi bi-check-lg" />, bg: 'bg-success' },
    task_moved: { icon: <i className="bi bi-arrow-right" />, bg: 'bg-primary' },
    user_added: { icon: <i className="bi bi-person-plus-fill" />, bg: 'bg-info' },
}

const Boards: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Boards & Timeline"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Boards', path: '/boards' }]}
        actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>New Board</Button>}
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
            <KanbanBoard
                tasks={tasksMap}
                columns={initialColumns}
                columnOrder={['Todo', 'In Progress', 'Done']}
                onTaskMove={() => alert("Drag and drop is for demonstration on the main Tasks page.")}
            />
        </div>
        <div className="xl:col-span-1">
          <Card>
            <Card.Header><h3 className="font-bold">Recent Activity Timeline</h3></Card.Header>
            <Card.Body>
              <Timeline>
                  {TIMELINE_DATA.map(event => (
                      <Timeline.Item
                          key={event.id}
                          icon={iconMap[event.type as keyof typeof iconMap].icon}
                          iconBgClass={iconMap[event.type as keyof typeof iconMap].bg}
                          title={event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          timestamp={event.timestamp}
                      >
                          <p>{event.description}</p>
                      </Timeline.Item>
                  ))}
              </Timeline>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Boards;