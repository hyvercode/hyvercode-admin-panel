import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { TASKS_DATA, USERS_DATA, REVIEWS_DATA } from '../constants';
import { Task } from '../types';
import Card from '../components/ui/card/Card';
import Avatar from '../components/ui/avatar/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/overlay/Modal';
import { useForm, FormErrors } from '../hooks/useForm';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Tabs from '../components/ui/navigation/Tabs';
import CommentThread from '../components/ui/CommentThread';

const TaskCard: React.FC<{ task: Task; onClick: () => void }> = ({ task, onClick }) => {
  const assignee = USERS_DATA.find(u => u.id === task.assigneeId);
  
  const priorityColors = {
    High: 'danger',
    Medium: 'warning',
    Low: 'primary',
  } as const;

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
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

const validateTask = (values: { title: string }): FormErrors => {
    const errors: FormErrors = {};
    if (!values.title) errors.title = "Title is required.";
    return errors;
};

const EditTaskForm: React.FC<{ task: Task, onSave: (values: any) => void, onCancel: () => void }> = ({ task, onSave, onCancel }) => {
    const { getFieldProps, handleSubmit } = useForm(
        task,
        validateTask,
        onSave
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Title" {...getFieldProps('title')} />
            <Select label="Status" options={['To Do', 'In Progress', 'Completed'].map(s => ({value: s, label: s}))} {...getFieldProps('status')} />
            <Select label="Priority" options={['Low', 'Medium', 'High'].map(s => ({value: s, label: s}))} {...getFieldProps('priority')} />
            <Input label="Due Date" type="date" {...getFieldProps('dueDate')} />
            <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    );
}


const Tasks: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleCardClick = (task: Task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };
    
    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedTask(null);
    }
    
    const handleSaveTask = (values: any) => {
        console.log("Saving task:", values);
        handleModalClose();
    }

    const columns = {
        'To Do': TASKS_DATA.filter(t => t.status === 'To Do'),
        'In Progress': TASKS_DATA.filter(t => t.status === 'In Progress'),
        'Completed': TASKS_DATA.filter(t => t.status === 'Completed'),
    };

    return (
        <div>
            <PageHeader
                title="Tasks Board"
                breadcrumbs={[{ name: 'Home', path: '/dashboard' }, { name: 'Tasks', path: '/tasks' }]}
                actions={<Button>Create Task</Button>}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(columns).map(([status, tasks]) => (
                    <div key={status}>
                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 px-2">{status} ({tasks.length})</h3>
                        <div className="space-y-4">
                            {tasks.map(task => <TaskCard key={task.id} task={task} onClick={() => handleCardClick(task)} />)}
                        </div>
                    </div>
                ))}
            </div>

            {selectedTask && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose} title={selectedTask.title}>
                   <Tabs tabs={[{id: 'details', label: 'Details'}, {id: 'comments', label: 'Comments'}]}>
                       {(activeTab) => (
                           <div>
                            {activeTab === 'details' && (
                                <EditTaskForm task={selectedTask} onSave={handleSaveTask} onCancel={handleModalClose} />
                            )}
                            {activeTab === 'comments' && (
                                <CommentThread 
                                    // FIX: Added parentId to satisfy the CommentThread component's props type.
                                    comments={REVIEWS_DATA.map(r => ({ ...r, parentId: null }))} // Using reviews data as mock comments
                                    onCommentSubmit={(text, parentId) => console.log({text, parentId})}
                                />
                            )}
                           </div>
                       )}
                   </Tabs>
                </Modal>
            )}
        </div>
    );
};

export default Tasks;