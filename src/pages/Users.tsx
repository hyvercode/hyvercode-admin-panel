
import React from 'react';
import { USERS_DATA } from '../constants';
import Table, { Column } from '../components/ui/table/Table';
import { User } from '../types';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import AvatarItem from '../components/ui/avatar/AvatarItem';

const Users: React.FC = () => {
  const columns: Column<User>[] = [
    {
      id: 'name',
      header: 'Name',
      accessor: (user) => user.name,
      cell: (user) => (
        <AvatarItem 
            avatarProps={{ name: user.name, src: `https://i.pravatar.cc/40?u=${user.email}` }}
            name={user.name}
            description={user.email}
        />
      ),
    },
    { id: 'role', header: 'Role', accessor: (user) => user.role },
    {
      id: 'status',
      header: 'Status',
      accessor: (user) => user.status,
      cell: (user) => (
        <Badge variant={user.status === 'active' ? 'success' : 'neutral'}>
          {user.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessor: (user) => user.id,
      cell: (user) => (
        <div className="flex items-center space-x-2">
          <Button to={`/admin/profile/${user.id}`} variant="subtle" size="sm-icon" aria-label={`Edit ${user.name}`}>
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="subtle" size="sm-icon" className="text-danger" aria-label={`Delete ${user.name}`}>
             <i className="bi bi-trash"></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        breadcrumbs={[{ name: 'Dashboard', path: '/admin/dashboard' }, { name: 'Users', path: '/admin/users' }]}
        actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>Add User</Button>}
      />
      <Table<User> columns={columns} data={USERS_DATA} getRowId={(user) => user.id} />
    </div>
  );
};

export default Users;
