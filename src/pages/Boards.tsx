import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import KanbanBoard from '../components/ui/kanban/KanbanBoard';
import { KANBAN_TASKS_DATA } from '../constants';
import Button from '../components/ui/Button';

const Boards: React.FC = () => {
    return (
        // The main layout provides padding, so we might want a full-width container here.
        // Let's assume the default padding is fine for now.
        <div>
            <PageHeader 
                title="Project Board"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Boards', path: '/boards' }]}
                actions={<Button>Add Task</Button>}
            />
            <KanbanBoard tasks={KANBAN_TASKS_DATA} />
        </div>
    );
};

export default Boards;
