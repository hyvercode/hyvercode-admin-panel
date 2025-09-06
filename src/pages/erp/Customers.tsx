
import React from 'react';
import { ERP_CUSTOMERS_DATA } from '../../constants';
import { ERPCustomer } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table, { Column } from '../../components/ui/table/Table';

const Customers: React.FC = () => {
    const columns: Column<ERPCustomer>[] = [
        { id: 'id', header: 'Customer ID', accessor: (item) => item.id },
        { id: 'name', header: 'Name', accessor: (item) => item.name },
        { id: 'email', header: 'Email', accessor: (item) => item.email },
        { id: 'phone', header: 'Phone', accessor: (item) => item.phone },
        { id: 'lastOrder', header: 'Last Order', accessor: (item) => item.lastOrder },
        { id: 'lifetimeValue', header: 'Lifetime Value', accessor: (item) => `$${item.lifetimeValue.toFixed(2)}` },
        {
            id: 'actions',
            header: 'Actions',
            accessor: (item) => item.id,
            cell: (item) => <Button variant="subtle" size="sm">View Profile</Button>
        },
    ];

    return (
        <div>
            <PageHeader
                title="ERP Customers"
                breadcrumbs={[{ name: 'ERP', path: '#' }, { name: 'Customers', path: '/admin/erp/customers' }]}
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>Add Customer</Button>}
            />
            <Table<ERPCustomer> columns={columns} data={ERP_CUSTOMERS_DATA} getRowId={(item) => item.id} />
        </div>
    );
};

export default Customers;
