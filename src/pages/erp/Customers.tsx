import React, { useState, useMemo } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table, { Column } from '../../components/ui/table/Table';
import Pagination from '../../components/ui/navigation/Pagination';
import Input from '../../components/ui/Input';
import { ERP_CUSTOMERS_DATA } from '../../constants';
import { ERPCustomer } from '../../types';
import Avatar from '../../components/ui/avatar/Avatar';

const ErpCustomers: React.FC = () => {
    const [customers, setCustomers] = useState(ERP_CUSTOMERS_DATA);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const ITEMS_PER_PAGE = 10;

    const filteredCustomers = useMemo(() => {
        return customers.filter(c => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            c.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [customers, searchTerm]);

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredCustomers, currentPage]);

    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

    const customerColumns: Column<ERPCustomer>[] = [
        { id: 'name', header: 'Name', cell: item => (
            <div className="flex items-center">
                <Avatar name={item.name} size="sm" src={`https://picsum.photos/40/40?random=${item.id}`} />
                <span className="ml-3 font-medium">{item.name}</span>
            </div>
        ), accessor: item => item.name },
        { id: 'email', header: 'Email', accessor: (item) => item.email },
        { id: 'phone', header: 'Phone', accessor: (item) => item.phone },
        { id: 'lifetimeValue', header: 'Lifetime Value', cell: item => `$${item.lifetimeValue.toFixed(2)}`, accessor: item => item.lifetimeValue },
        { id: 'lastOrder', header: 'Last Order', accessor: (item) => item.lastOrder },
        { id: 'actions', header: 'Actions', accessor: item => item.id, cell: item => <Button size="sm" variant="subtle">View Profile</Button> }
    ];

    return (
        <div>
            <PageHeader
                title="Customers"
                // FIX: Added missing 'path' property to breadcrumb item to match BreadcrumbItem type.
                breadcrumbs={[{ name: 'ERP', path: '/erp/customers' }, { name: 'Customers', path: '/erp/customers' }]}
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>Add Customer</Button>}
            />
            <div className="space-y-4">
                <Input id="search" label="" placeholder="Search by name or email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-xs" />
                <Table columns={customerColumns} data={paginatedCustomers} getRowId={item => item.id} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default ErpCustomers;