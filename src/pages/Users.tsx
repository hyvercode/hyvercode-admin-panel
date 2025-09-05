import React, { useState, useMemo } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Table, { Column } from '../components/ui/Table';
import { USERS_DATA } from '../constants';
import { User } from '../types';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import AvatarItem from '../components/ui/avatar/AvatarItem';
import Input from '../components/ui/Input';
import Pagination from '../components/ui/navigation/Pagination';

const userColumns: Column<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: (item) => item.name,
    cell: (item) => (
      <AvatarItem
        avatarProps={{ name: item.name, src: `https://picsum.photos/40/40?random=${item.id}` }}
        name={item.name}
        description={item.email}
      />
    ),
  },
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
          <Button variant="subtle" size="sm">Edit</Button>
      )
  }
];

const ITEMS_PER_PAGE = 5;

const Users: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        return USERS_DATA.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  return (
    <div>
      <PageHeader
        title="Users"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Users', path: '/users' }]}
        actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>Add User</Button>}
      />

        <div className="bg-neutral-0 dark:bg-neutral-1000 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-6">
            <Input id="user-search" label="" placeholder="Search users by name or email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

      <Table columns={userColumns} data={paginatedUsers} getRowId={(item) => item.id} />
      
      <div className="mt-6 flex justify-end">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

    </div>
  );
};

export default Users;
