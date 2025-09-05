import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TASKS_DATA, USERS_DATA } from '../constants';
import type { Task, User } from '../types';
import { useForm, FormErrors } from '../hooks/useForm';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/ui/PageHeader';
import Table, { Column } from '../components/ui/Table';

const getUserById = (id: number): User | undefined => USERS_DATA.find(u => u.id === id);

type SortableKeys = 'title' | 'status' | 'priority' | 'dueDate';

const ITEMS_PER_PAGE = 5;

const priorityVariantMap: { [key in Task['priority']]: 'danger' | 'warning' | 'primary' | 'neutral' } = {
  'Urgent': 'danger',
  'High': 'warning',
  'Medium': 'primary',
  'Low': 'neutral',
};

const statusVariantMap: { [key in Task['status']]: 'success' | 'primary' | 'neutral' | 'warning' } = {
  'Done': 'success',
  'In Progress': 'primary',
  'To Do': 'neutral',
  'Cancelled': 'warning',
};

const validateTask = (values: Omit<Task, 'id'>): FormErrors => {
  const errors: FormErrors = {};
  if (!values.title) errors.title = 'Task title is required.';
  if (!values.project) errors.project = 'Project name is required.';
  if (!values.dueDate) errors.dueDate = 'Due date is required.';
  else if (isNaN(Date.parse(values.dueDate))) errors.dueDate = 'Please enter a valid date.';
  return errors;
};

const initialFormValues = {
  title: '',
  project: '',
  assigneeId: USERS_DATA[0]?.id || 1,
  status: 'To Do' as Task['status'],
  priority: 'Medium' as Task['priority'],
  dueDate: '',
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(TASKS_DATA);
  const [filters, setFilters] = useState({ text: '', status: 'All', priority: 'All' });
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' }>({ key: 'dueDate', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleSaveTask = (formValues: Omit<Task, 'id'>) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...editingTask, ...formValues } : t));
    } else {
      const newTask = { ...formValues, id: Date.now() };
      setTasks([newTask, ...tasks]);
    }
    setFormModalOpen(false);
    setEditingTask(null);
  };
  
  const {
    values,
    setValues,
    getFieldProps,
    handleSubmit,
    isValid
  } = useForm(initialFormValues, validateTask, handleSaveTask);

  useEffect(() => {
    if (isFormModalOpen) {
      const initialData = editingTask ? { ...editingTask } : { ...initialFormValues };
      // Omit id as it's not part of the form values type
      const { id, ...formData } = initialData as Task;
      setValues(formData);
    }
  }, [isFormModalOpen, editingTask, setValues]);


  const { paginatedTasks, totalPages } = useMemo(() => {
    let filteredTasks = tasks.filter(task => {
      const textMatch = filters.text === '' ||
        task.title.toLowerCase().includes(filters.text.toLowerCase()) ||
        task.project.toLowerCase().includes(filters.text.toLowerCase());
      
      const statusMatch = filters.status === 'All' || task.status === filters.status;
      const priorityMatch = filters.priority === 'All' || task.priority === filters.priority;

      return textMatch && statusMatch && priorityMatch;
    });

    if (sortConfig.key) {
      filteredTasks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
    const paginatedTasks = filteredTasks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return { paginatedTasks, totalPages };
  }, [tasks, filters, sortConfig, currentPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };
  
  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleAddTaskClick = () => {
    setEditingTask(null);
    setFormModalOpen(true);
  };

  const handleEditTaskClick = (task: Task) => {
    setEditingTask(task);
    setFormModalOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(t => t.id !== taskToDelete.id));
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const columns: Column<Task>[] = [
    {
      header: 'Task',
      accessor: (task) => (
        <div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100">{task.title}</div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">{task.project}</div>
        </div>
      ),
      sortKey: 'title',
    },
    {
      header: 'Assignee',
      accessor: (task) => {
        const user = getUserById(task.assigneeId);
        return user ? (
          <Link to={`/profile/${user.id}`} className="flex items-center group">
            <Avatar name={user.name} src={`https://picsum.photos/50/50?random=${user.id}`} size="md" />
            <div className="ml-3">
              <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary">{user.name}</span>
            </div>
          </Link>
        ) : 'Unassigned';
      },
    },
    { 
      header: 'Status', 
      accessor: (task) => <Badge variant={statusVariantMap[task.status]}>{task.status}</Badge>,
      sortKey: 'status',
    },
    { 
      header: 'Priority', 
      accessor: (task) => <Badge variant={priorityVariantMap[task.priority]}>{task.priority}</Badge>,
      sortKey: 'priority',
    },
    { header: 'Due Date', accessor: 'dueDate', sortKey: 'dueDate' },
    {
      header: 'Actions',
      accessor: (task) => (
         <div className="flex justify-end items-center space-x-1">
            <Button variant="subtle" size="sm-icon" className="text-primary" title="Edit" onClick={() => handleEditTaskClick(task)}>
                <i className="bi bi-pencil-square text-base"></i>
            </Button>
            <Button variant="subtle" size="sm-icon" className="text-danger" title="Delete" onClick={() => handleDeleteClick(task)}>
                <i className="bi bi-trash text-base"></i>
            </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Tasks Management"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Tasks', path: '/tasks' }]}
        actions={
          <Button leftIcon={<i className="bi bi-plus-lg"></i>} onClick={handleAddTaskClick}>
            Add Task
          </Button>
        }
      />

      <div className="bg-neutral-0 dark:bg-neutral-1000 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
           <Input
              label="Search by title or project"
              id="text" name="text"
              placeholder="Filter tasks..."
              value={filters.text} onChange={handleFilterChange}
            />
          <Select
            label="Status" id="status" name="status"
            value={filters.status} onChange={handleFilterChange}
            options={[ 'All', 'To Do', 'In Progress', 'Done', 'Cancelled' ].map(s => ({ value: s, label: s }))}
          />
          <Select
            label="Priority" id="priority" name="priority"
            value={filters.priority} onChange={handleFilterChange}
            options={[ 'All', 'Low', 'Medium', 'High', 'Urgent' ].map(p => ({ value: p, label: p }))}
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={paginatedTasks}
        sortConfig={sortConfig}
        onSort={requestSort}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyState={<Alert variant="info">No tasks found matching your criteria.</Alert>}
      />
      
       {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setFormModalOpen(false)}
          title={editingTask ? 'Edit Task' : 'Add New Task'}
          footer={
            <>
              <Button variant="secondary" onClick={() => setFormModalOpen(false)}>Cancel</Button>
              <Button type="submit" form="task-form" disabled={!isValid}>{editingTask ? 'Save Changes' : 'Create Task'}</Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} id="task-form" className="space-y-4">
             <Input label="Task Title" {...getFieldProps('title')} />
             <Input label="Project" {...getFieldProps('project')} />
             <Select label="Assignee" {...getFieldProps('assigneeId')}
               options={USERS_DATA.map(u => ({ value: u.id, label: u.name }))}
             />
             <div className="grid grid-cols-2 gap-4">
                <Select label="Status" {...getFieldProps('status')}
                  options={['To Do', 'In Progress', 'Done', 'Cancelled'].map(s => ({ value: s, label: s }))}
                />
                <Select label="Priority" {...getFieldProps('priority')}
                  options={['Low', 'Medium', 'High', 'Urgent'].map(p => ({ value: p, label: p }))}
                />
             </div>
             <Input label="Due Date" type="date" {...getFieldProps('dueDate')} />
          </form>
        </Modal>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-neutral-800 dark:text-neutral-300">
          Are you sure you want to delete the task: <span className="font-bold">{taskToDelete?.title}</span>? This action cannot be undone.
        </p>
      </Modal>

    </div>
  );
};

export default Tasks;