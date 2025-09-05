import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/table/Table';
import { USERS_DATA } from '../constants';
import { User } from '../types';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Users: React.FC = () => {
    const navigate = useNavigate();

    const columns = [
        {
            id: 'name',
            header: 'Name',
            accessor: (item: User) => item.name,
            cell: (item: User) => (
                <div className="flex items-center">
                    <img src={`https://picsum.photos/40/40?random=${item.id}`} alt={item.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                        <div className="font-medium text-neutral-900 dark:text-neutral-100">{item.name}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">{item.email}</div>
                    </div>
                </div>
            )
        },
        { id: 'role', header: 'Role', accessor: (item: User) => item.role },
        {
            id: 'status',
            header: 'Status',
            accessor: (item: User) => item.status,
            cell: (item: User) => (
                <Badge variant={
                    item.status === 'active' ? 'success' : item.status === 'inactive' ? 'neutral' : 'warning'
                }>
                    {item.status}
                </Badge>
            )
        },
        { id: 'lastLogin', header: 'Last Login', accessor: (item: User) => item.lastLogin },
        {
            id: 'actions',
            header: 'Actions',
            accessor: (item: User) => item.id,
            cell: (item: User) => (
                <Button variant="subtle" size="sm" onClick={() => navigate(`/profile/${item.id}`)}>
                    View Profile
                </Button>
            )
        }
    ];

    return (
        <div>
            <PageHeader
                title="User Management"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Users', path: '/users' }]}
                actions={<Button>Add User</Button>}
            />
            <Table columns={columns} data={USERS_DATA} getRowId={(item) => item.id} />
        </div>
    );
};

export default Users;
