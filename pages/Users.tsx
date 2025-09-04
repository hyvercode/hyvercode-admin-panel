import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { USERS_DATA } from '../constants';
import type { User } from '../types';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';

type SortableKeys = 'name' | 'role' | 'status';

const ITEMS_PER_PAGE = 3;

const StatusBadge: React.FC<{ status: 'Active' | 'Inactive' }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full';
  const activeClasses = 'bg-success/20 text-success-800 dark:text-success-300';
  const inactiveClasses = 'bg-secondary/20 text-secondary-800 dark:text-secondary-300';
  
  return (
    <span className={`${baseClasses} ${status === 'Active' ? activeClasses : inactiveClasses}`}>
      {status}
    </span>
  );
};

const generatePagination = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }
  if (currentPage > totalPages - 4) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

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

  const { paginatedUsers, totalPages, totalUsers } = useMemo(() => {
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
    
    const totalUsers = filteredUsers.length;
    const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

    const paginatedUsers = filteredUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return { paginatedUsers, totalPages, totalUsers };
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
  
  const getSortIcon = (key: SortableKeys) => {
    if (sortConfig.key !== key) {
      return <i className="bi bi-arrow-down-up ml-2 text-gray-400"></i>;
    }
    if (sortConfig.direction === 'ascending') {
      return <i className="bi bi-sort-up ml-2 text-primary"></i>;
    }
    return <i className="bi bi-sort-down ml-2 text-primary"></i>;
  };

  const paginationNumbers = generatePagination(currentPage, totalPages);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Users Management</h2>
        <Button leftIcon={<i className="bi bi-plus-lg"></i>}>
          Add User
        </Button>
      </div>

      <div className="bg-white dark:bg-dark p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
           <Input
              label="Search"
              id="text"
              name="text"
              placeholder="Filter by name or email..."
              value={filters.text}
              onChange={handleFilterChange}
              className="bg-gray-50 dark:bg-gray-700"
            />
          <Select
            label="Role"
            id="role"
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            options={uniqueRoles.map(role => ({ value: role, label: role }))}
            className="bg-gray-50 dark:bg-gray-700"
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
            className="bg-gray-50 dark:bg-gray-700"
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

      <div className="bg-white dark:bg-dark rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <button onClick={() => requestSort('name')} className="flex items-center hover:text-gray-900 dark:hover:text-white">
                    Name {getSortIcon('name')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button onClick={() => requestSort('role')} className="flex items-center hover:text-gray-900 dark:hover:text-white">
                    Role {getSortIcon('role')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button onClick={() => requestSort('status')} className="flex items-center hover:text-gray-900 dark:hover:text-white">
                    Status {getSortIcon('status')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">Last Login</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                <tr key={user.id} className="bg-white dark:bg-dark border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <Link to={`/profile/${user.id}`} className="flex items-center hover:underline">
                      <img className="w-10 h-10 rounded-full object-cover mr-4" src={`https://picsum.photos/50/50?random=${user.id}`} alt={user.name}/>
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                  <td className="px-6 py-4">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center space-x-1">
                      <Button variant="ghost" size="icon" className="text-primary" title="Edit">
                         <i className="bi bi-pencil-square text-base"></i>
                      </Button>
                       <Button variant="ghost" size="icon" className="text-danger" title="Delete" onClick={() => handleDeleteClick(user)}>
                         <i className="bi bi-trash text-base"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 px-6">
                    <Alert variant="info">
                      No users found matching your criteria.
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
           <div className="flex justify-between items-center px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
             <span className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-semibold">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, totalUsers)}</span> of <span className="font-semibold">{totalUsers}</span> results
             </span>
             <div className="inline-flex items-center -space-x-px">
                <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-r-none"
                    aria-label="Previous page"
                >
                    <i className="bi bi-chevron-left"></i>
                </Button>
               
               {paginationNumbers.map((page, index) => 
                typeof page === 'number' ? (
                  <Button
                    key={index}
                    size="sm"
                    variant={currentPage === page ? 'primary' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    disabled={currentPage === page}
                    className="rounded-none"
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={index} className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 dark:bg-dark dark:border-gray-600 dark:text-gray-300">
                    ...
                  </span>
                )
               )}
                <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-l-none"
                    aria-label="Next page"
                >
                    <i className="bi bi-chevron-right"></i>
                </Button>
             </div>
           </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete the user <span className="font-bold">{userToDelete?.name}</span>? This action cannot be undone.
        </p>
      </Modal>

    </div>
  );
};

export default Users;