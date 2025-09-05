import React from 'react';
import { USERS_DATA } from '../constants';
import { User } from '../types';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Table, { Column } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/avatar/Avatar';
import { Link } from 'react-router-dom';

const Users: React.FC = () => {
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
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>Add User</Button>}
            />
            <Table
                columns={userColumns}
                data={USERS_DATA}
                getRowId={(item) => item.id}
            />
        </div>
    );
};

export default Users;
