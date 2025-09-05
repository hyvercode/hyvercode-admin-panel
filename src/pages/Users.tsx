import React, { useState, useMemo } from 'react';
import { USERS_DATA } from '../constants';
import { User } from '../types';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Table, { Column } from '../components/ui/table/Table';
import Pagination from '../components/ui/navigation/Pagination';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/avatar/Avatar';
import Modal from '../components/ui/overlay/Modal';
import { useForm, FormErrors } from '../hooks/useForm';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useToast } from '../contexts/ToastContext';

// --- User Form ---
const validateUser = (values: Partial<User>): FormErrors => {
    const errors: FormErrors = {};
    if (!values.name) errors.name = "Name is required.";
    if (!values.email) {
        errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address.';
    }
    return errors;
}

const UserForm: React.FC<{ user: Partial<User>; onSave: (user: User) => void; onCancel: () => void }> = ({ user, onSave, onCancel }) => {
    const { getFieldProps, handleSubmit } = useForm(
        user,
        validateUser,
        (values) => onSave(values as User)
    );
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" {...getFieldProps('name')} />
            <Input label="Email" type="email" {...getFieldProps('email')} />
            <Select label="Role" {...getFieldProps('role')} options={[{value: 'Admin', label: 'Admin'}, {value: 'Editor', label: 'Editor'}, {value: 'Viewer', label: 'Viewer'}]} />
            <Select label="Status" {...getFieldProps('status')} options={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} />
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save User</Button>
            </div>
        </form>
    );
}

const ITEMS_PER_PAGE = 5;

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>(USERS_DATA);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { addToast } = useToast();

    const handleNewUser = () => {
        setEditingUser({ name: '', email: '', role: 'Viewer', status: 'active' });
        setModalOpen(true);
    };

    const handleSaveUser = (userToSave: User) => {
        const isNew = !userToSave.id;
        if (isNew) {
            const newUser = { ...userToSave, id: Date.now() };
            setUsers(prev => [newUser, ...prev]);
            addToast("User created successfully", "success");
        } else {
            setUsers(prev => prev.map(u => u.id === userToSave.id ? userToSave : u));
            addToast("User updated successfully", "success");
        }
        setModalOpen(false);
    };
    
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return users.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [users, currentPage]);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    const userColumns: Column<User>[] = [
        {
            id: 'name',
            header: 'Name',
            accessor: (item) => item.name,
            cell: (item) => (
                <div className="flex items-center">
                    <Avatar name={item.name} size="sm" src={`https://picsum.photos/40/40?random=${item.id}`} />
                    <span className="ml-3 font-medium text-neutral-900 dark:text-neutral-100">{item.name}</span>
                </div>
            )
        },
        { id: 'email', header: 'Email', accessor: (item) => item.email },
        { id: 'role', header: 'Role', accessor: (item) => item.role },
        {
            id: 'status',
            header: 'Status',
            accessor: (item) => item.status,
            cell: (item) => (
                <Badge variant={item.status === 'active' ? 'success' : 'neutral'}>
                    {item.status}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            accessor: (item) => item.id,
            cell: (item) => (
                <Button variant="subtle" size="sm" to={`/profile/${item.id}`}>
                    View Profile
                </Button>
            )
        }
    ];

    return (
        <div>
            <PageHeader
                title="Users Management"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Users', path: '/users' }]}
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>} onClick={handleNewUser}>Add User</Button>}
            />
            <Table
                columns={userColumns}
                data={paginatedUsers}
                getRowId={(item) => item.id}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-4 flex justify-end" />
            
            {editingUser && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingUser.id ? 'Edit User' : 'Create User'}>
                    <UserForm user={editingUser} onSave={handleSaveUser} onCancel={() => setModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
};

export default Users;