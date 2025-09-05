import React, { useState, useMemo } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Table, { Column } from '../components/ui/table/Table';
import TableExpandable from '../components/ui/table/TableExpandable';
import TableNesting from '../components/ui/table/TableNesting';
import { USERS_DATA } from '../constants';
import { User } from '../types';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/card/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Pagination from '../components/ui/navigation/Pagination';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

// Basic table columns
const userColumns: Column<User>[] = [
  { id: 'name', header: 'Name', accessor: (item) => item.name },
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
];

// Data for nested table
const nestedData = [
  {
    id: 'folder-1',
    name: 'Documents',
    type: 'Folder',
    size: '1.2 GB',
    children: [
      { id: 'file-1', name: 'report.docx', type: 'File', size: '2.5 MB' },
      { id: 'file-2', name: 'presentation.pptx', type: 'File', size: '10.1 MB' },
    ],
  },
  {
    id: 'folder-2',
    name: 'Images',
    type: 'Folder',
    size: '500 MB',
    children: [
      { id: 'image-1', name: 'vacation.jpg', type: 'File', size: '5 MB' },
      { id: 'image-2', name: 'logo.png', type: 'File', size: '150 KB' },
    ],
  },
];
const fileColumns: Column<(typeof nestedData)[0]>[] = [
    { id: 'name', header: 'Name', accessor: (item) => item.name },
    { id: 'type', header: 'Type', accessor: (item) => item.type },
    { id: 'size', header: 'Size', accessor: (item) => item.size },
]

const ITEMS_PER_PAGE = 5;

const Tables: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: '', status: 'all' });

  const filteredUsers = useMemo(() => {
    return USERS_DATA.filter(user => {
        const searchMatch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            user.email.toLowerCase().includes(filters.search.toLowerCase());
        const statusMatch = filters.status === 'all' || user.status === filters.status;
        return searchMatch && statusMatch;
    });
  }, [filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <PageHeader
        title="Table Components"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Tables', path: '/tables' }]}
      />

      <ComponentSection title="Standard Table with Filters & Pagination">
        <div className="flex items-center gap-4 mb-4">
            <Input 
                id="user-search"
                label=""
                placeholder="Search by name or email..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="max-w-xs"
            />
            <Select
                id="status-filter"
                label=""
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                ]}
            />
        </div>
        <Table columns={userColumns} data={paginatedUsers} getRowId={(item) => item.id} />
        <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-4 flex justify-end"
        />
      </ComponentSection>

      <ComponentSection title="Expandable Rows Table">
        <TableExpandable
          columns={userColumns}
          data={USERS_DATA.slice(0, 3)}
          getRowId={(item) => item.id}
          renderExpandedRow={(item) => (
            <Card>
                <Card.Body>
                    <h4 className="font-bold">User Details</h4>
                    <p className="text-sm mt-2"><strong>Bio:</strong> {item.bio || 'No bio available.'}</p>
                </Card.Body>
            </Card>
          )}
        />
      </ComponentSection>

      <ComponentSection title="Nested Table">
        <TableNesting columns={fileColumns} data={nestedData} />
      </ComponentSection>
    </div>
  );
};

export default Tables;