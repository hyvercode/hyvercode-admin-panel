import React, { useState, useMemo } from 'react';
import PageHeader from '../components/ui/PageHeader';
import KanbanBoard from '../components/ui/kanban/KanbanBoard';
import { TASKS_DATA, USERS_DATA } from '../constants';
import { Task, KanbanColumn } from '../types';
import Button from '../components/ui/Button';
import Table, { Column } from '../components/ui/table/Table';
import Pagination from '../components/ui/navigation/Pagination';
import Badge from '../components/ui/Badge';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import Modal from '../components/ui/overlay/Modal';
import { useForm, FormErrors } from '../hooks/useForm';
import { useToast } from '../contexts/ToastContext';

// --- Kanban Setup ---
const initialColumns: Record<string, KanbanColumn> = {
  'Todo': { id: 'Todo', title: 'To Do', taskIds: TASKS_DATA.filter(t => t.status === 'Todo').map(t => t.id) },
  'In Progress': { id: 'In Progress', title: 'In Progress', taskIds: TASKS_DATA.filter(t => t.status === 'In Progress').map(t => t.id) },
  'Done': { id: 'Done', title: 'Done', taskIds: TASKS_DATA.filter(t => t.status === 'Done').map(t => t.id) },
};

const tasksMap = TASKS_DATA.reduce((acc, task) => {
  acc[task.id] = task;
  return acc;
}, {} as Record<string, Task>);

// --- Task Form ---
// FIX: Define a specific type for the form data to avoid type conflicts with Task.assigneeIds (number[]).
type TaskFormData = Pick<Task, 'title' | 'description' | 'status' | 'priority'>;

const validateTask = (values: Partial<TaskFormData>): FormErrors => {
    const errors: FormErrors = {};
    if (!values.title) errors.title = "Title is required.";
    return errors;
}

const EditTaskForm: React.FC<{ task: Partial<Task>; onSave: (task: Task) => void; onCancel: () => void }> = ({ task, onSave, onCancel }) => {
    // FIX: Initialize the form with only the fields that are being edited.
    // This prevents the `assigneeIds: number[]` from Task from causing type errors
    // in the `getFieldProps` return value for simple inputs.
    const { getFieldProps, handleSubmit } = useForm(
        {
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'Todo',
            priority: task.priority || 'Medium',
        },
        validateTask,
        (values) => {
            // Combine original task data with form values on save.
            onSave({ ...task, ...values } as Task);
        }
    );
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Title" {...getFieldProps('title')} />
            <Input label="Description" {...getFieldProps('description')} />
            <Select label="Status" {...getFieldProps('status')} options={[{value: 'Todo', label: 'To Do'}, {value: 'In Progress', label: 'In Progress'}, {value: 'Done', label: 'Done'}]} />
            <Select label="Priority" {...getFieldProps('priority')} options={[{value: 'Low', label: 'Low'}, {value: 'Medium', label: 'Medium'}, {value: 'High', label: 'High'}]} />
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Task</Button>
            </div>
        </form>
    );
}

const Tasks: React.FC = () => {
  const [view, setView] = useState<'board' | 'table'>('board');
  const [tasks, setTasks] = useState<Record<string, Task>>(tasksMap);
  const [columns, setColumns] = useState(initialColumns);
  const { addToast } = useToast();

  // Modal State
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);

  // Table State
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: '', status: 'All' });
  const ITEMS_PER_PAGE = 10;

  const handleTaskMove = (taskId: string, sourceColumnId: string, destColumnId: string) => {
      const sourceColumn = columns[sourceColumnId];
      const destColumn = columns[destColumnId];
      const sourceTaskIds = [...sourceColumn.taskIds];
      const destTaskIds = [...destColumn.taskIds];
      
      sourceTaskIds.splice(sourceTaskIds.indexOf(taskId), 1);
      destTaskIds.push(taskId);

      setColumns({
          ...columns,
          [sourceColumnId]: { ...sourceColumn, taskIds: sourceTaskIds },
          [destColumnId]: { ...destColumn, taskIds: destTaskIds },
      });
      setTasks(prev => ({...prev, [taskId]: {...prev[taskId], status: destColumn.id }}));
      addToast(`Task moved to ${destColumn.title}`, 'info');
  };

  const handleEditTask = (task: Task) => {
      setEditingTask(task);
      setModalOpen(true);
  }

  const handleNewTask = () => {
      setEditingTask({ title: '', description: '', status: 'Todo', priority: 'Medium', assigneeIds: [] });
      setModalOpen(true);
  }
  
  const handleSaveTask = (taskToSave: Task) => {
    const isNew = !taskToSave.id;
    const newId = isNew ? `task-${Date.now()}` : taskToSave.id;
    const updatedTask = { ...taskToSave, id: newId };
    
    setTasks(prev => ({ ...prev, [newId]: updatedTask }));

    if (isNew) {
        setColumns(prev => ({
            ...prev,
            [updatedTask.status]: {
                ...prev[updatedTask.status],
                taskIds: [...prev[updatedTask.status].taskIds, newId],
            }
        }));
        addToast("Task created successfully", "success");
    } else {
        addToast("Task updated successfully", "success");
    }

    setModalOpen(false);
    setEditingTask(null);
  };


  // Table filtering and pagination logic
  const filteredTasks = useMemo(() => {
    return Object.values(tasks).filter(task => {
      const searchMatch = task.title.toLowerCase().includes(filters.search.toLowerCase());
      const statusMatch = filters.status === 'All' || task.status === filters.status;
      return searchMatch && statusMatch;
    });
  }, [tasks, filters]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTasks, currentPage]);
  
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  const taskColumns: Column<Task>[] = [
    { id: 'title', header: 'Title', accessor: (item) => item.title },
    { id: 'status', header: 'Status', cell: item => <Badge variant={item.status === 'Done' ? 'success' : item.status === 'In Progress' ? 'primary' : 'neutral'}>{item.status}</Badge>, accessor: item => item.status },
    { id: 'priority', header: 'Priority', cell: item => <Badge variant={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'success'}>{item.priority}</Badge>, accessor: item => item.priority },
    { id: 'actions', header: 'Actions', accessor: item => item.id, cell: item => <Button size="sm" variant="subtle" onClick={() => handleEditTask(item)}>Edit</Button> }
  ];

  return (
    <div>
      <PageHeader
        title="Tasks"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Tasks', path: '/tasks' }]}
        actions={
            <div className="flex items-center gap-2">
                <div className="flex items-center rounded-md bg-neutral-200 dark:bg-neutral-800 p-1">
                    <Button size="sm" variant={view === 'board' ? 'primary' : 'secondary'} onClick={() => setView('board')} className="!shadow-none"><i className="bi bi-kanban-fill"></i></Button>
                    <Button size="sm" variant={view === 'table' ? 'primary' : 'secondary'} onClick={() => setView('table')} className="!shadow-none"><i className="bi bi-table"></i></Button>
                </div>
                <Button leftIcon={<i className="bi bi-plus-lg"></i>} onClick={handleNewTask}>New Task</Button>
            </div>
        }
      />
      
      {view === 'board' ? (
        <KanbanBoard
            tasks={tasks}
            columns={columns}
            columnOrder={['Todo', 'In Progress', 'Done']}
            onTaskMove={handleTaskMove}
        />
      ) : (
        <div className="space-y-4">
             <div className="flex items-center gap-4">
                <Input id="search" label="" placeholder="Search tasks..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} className="max-w-xs" />
                <Select id="statusFilter" label="" options={[{value: 'All', label: 'All Statuses'}, {value: 'Todo', label: 'To Do'}, {value: 'In Progress', label: 'In Progress'}, {value: 'Done', label: 'Done'}]} value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} />
             </div>
             <Table columns={taskColumns} data={paginatedTasks} getRowId={item => item.id} />
             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
      
      {editingTask && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingTask.id ? 'Edit Task' : 'Create Task'}>
            <EditTaskForm task={editingTask} onSave={handleSaveTask} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Tasks;