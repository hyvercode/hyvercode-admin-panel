
import React from 'react';
import { ERP_ORDERS_DATA } from '../../constants';
import { ERPOrder, OrderStatus } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table, { Column } from '../../components/ui/table/Table';
import Badge from '../../components/ui/Badge';

const statusColors: Record<OrderStatus, 'success' | 'primary' | 'warning' | 'neutral'> = {
    Delivered: 'success',
    Shipped: 'primary',
    Pending: 'warning',
    Cancelled: 'neutral',
};

const Orders: React.FC = () => {
    const columns: Column<ERPOrder>[] = [
        { id: 'id', header: 'Order ID', accessor: (item) => item.id.toUpperCase() },
        { id: 'customerName', header: 'Customer', accessor: (item) => item.customerName },
        { id: 'date', header: 'Date', accessor: (item) => item.date },
        {
            id: 'status',
            header: 'Status',
            accessor: (item) => item.status,
            cell: (item) => <Badge variant={statusColors[item.status]}>{item.status}</Badge>
        },
        { id: 'total', header: 'Total', accessor: (item) => `$${item.total.toFixed(2)}` },
        {
            id: 'actions',
            header: 'Actions',
            accessor: (item) => item.id,
            cell: (item) => <Button variant="subtle" size="sm">View Details</Button>
        },
    ];

    return (
        <div>
            <PageHeader
                title="ERP Orders"
                breadcrumbs={[{ name: 'ERP', path: '#' }, { name: 'Orders', path: '/admin/erp/orders' }]}
                actions={<Button leftIcon={<i className="bi bi-upload"></i>}>Import Orders</Button>}
            />
            <Table<ERPOrder> columns={columns} data={ERP_ORDERS_DATA} getRowId={(item) => item.id} />
        </div>
    );
};

export default Orders;
