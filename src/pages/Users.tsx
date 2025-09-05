import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { USERS_DATA } from '../constants';
import type { User } from '../types';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';
import Avatar from '../components/ui/avatar/Avatar';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/ui/PageHeader';
import Table, { Column } from '../components/ui/Table';

type SortableKeys = 'name' | 'role' | 'status';

const ITEMS_PER_PAGE = 3;

const Users: React.FC = () => {
  const [filters, setFilters] = useState({
    text: '',
    role: 'All',
    status: 'All',
  });
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' }>({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const uniqueRoles = ['All', ...Array.from(new Set(USERS_DATA.map(user => user.role)))];

  const { paginatedUsers, totalPages } = useMemo(() => {
    let filteredUsers = USERS_DATA.filter(user => {
      const textMatch = filters.text === '' ||
        user.name.toLowerCase().includes(filters.text.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.text.toLowerCase());
      
      const roleMatch = filters.role === 'All' || user.role === filters.role;
      const statusMatch = filters.status === 'All' || user.status === filters.status;

      return textMatch && roleMatch && statusMatch;
    });

    if (sortConfig.key) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const paginatedUsers = filteredUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return { paginatedUsers, totalPages };
  }, [filters, sortConfig, currentPage]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ text: '', role: 'All', status: 'All' });
    setCurrentPage(1);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (userToDelete) {
      console.log(`Deleting user: ${userToDelete.name}`);
      // Here you would typically call an API to delete the user
      // For now, we'll just close the modal
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };
  
  const columns: Column<User>[] = [
    {
      header: 'Name',
      accessor: (user) => (
         <Link to={`/profile/${user.id}`} className="flex items-center group">
            <Avatar name={user.name} src={`https://picsum.photos/50/50?random=${user.id}`} size="md" />
            <div className="ml-3">
              <div className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary">{user.name}</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">{user.email}</div>
            </div>
          </Link>
      ),
      sortKey: 'name',
    },
    { header: 'Role', accessor: 'role', sortKey: 'role' },
    { 
      header: 'Status', 
      accessor: (user) => <Badge variant={user.status === 'Active' ? 'success' : 'neutral'}>{user.status}</Badge>,
      sortKey: 'status',
    },
    { header: 'Last Login', accessor: 'lastLogin' },
    {
      header: 'Actions',
      accessor: (user) => (
         <div className="flex justify-end items-center space-x-1">
            <Button variant="subtle" size="sm-icon" className="text-primary" title="Edit">
                <i className="bi bi-pencil-square text-base"></i>
            </Button>
            <Button variant="subtle" size="sm-icon" className="text-danger" title="Delete" onClick={() => handleDeleteClick(user)}>
                <i className="bi bi-trash text-base"></i>
            </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Users Management"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Users', path: '/users' }]}
        actions={
          <Button leftIcon={<i className="bi bi-plus-lg"></i>}>
            Add User
          </Button>
        }
      />

      <div className="bg-neutral-0 dark:bg-neutral-1000 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
           <Input
              label="Search"
              id="text"
              name="text"
              placeholder="Filter by name or email..."
              value={filters.text}
              onChange={handleFilterChange}
            />
          <Select
            label="Role"
            id="role"
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            options={uniqueRoles.map(role => ({ value: role, label: role }))}
          />
          <Select
            label="Status"
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={[
              { value: 'All', label: 'All Statuses' },
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
          />
           <Button 
             variant="secondary"
             onClick={resetFilters}
             leftIcon={<i className="bi bi-arrow-counterclockwise"></i>}
            >
             Reset
           </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={paginatedUsers}
        sortConfig={sortConfig}
        onSort={requestSort}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyState={
          <Alert variant="info">
            No users found matching your criteria.
          </Alert>
        }
      />
      
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
          Are you sure you want to delete the user <span className="font-bold">{userToDelete?.name}</span>? This action cannot be undone.
        </p>
      </Modal>

    </div>
  );
};

export default Users;