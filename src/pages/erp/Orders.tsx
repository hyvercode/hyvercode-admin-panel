import React, { useState, useMemo } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table, { Column } from '../../components/ui/table/Table';
import Pagination from '../../components/ui/navigation/Pagination';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { ERP_ORDERS_DATA } from '../../constants';
import { ERPOrder } from '../../types';

const ErpOrders: React.FC = () => {
    const [orders, setOrders] = useState(ERP_ORDERS_DATA);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const ITEMS_PER_PAGE = 10;

    const filteredOrders = useMemo(() => {
        return orders.filter(o => 
            o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            o.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

    const statusVariantMap = {
        Pending: 'warning',
        Shipped: 'primary',
        Delivered: 'success',
        Cancelled: 'danger',
    } as const;

    const orderColumns: Column<ERPOrder>[] = [
        { id: 'id', header: 'Order ID', accessor: (item) => item.id },
        { id: 'customerName', header: 'Customer', accessor: (item) => item.customerName },
        { id: 'date', header: 'Date', accessor: (item) => item.date },
        { id: 'status', header: 'Status', cell: item => <Badge variant={statusVariantMap[item.status]}>{item.status}</Badge>, accessor: item => item.status },
        { id: 'total', header: 'Total', cell: item => `$${item.total.toFixed(2)}`, accessor: item => item.total },
        { id: 'actions', header: 'Actions', accessor: item => item.id, cell: item => <Button size="sm" variant="subtle">View Details</Button> }
    ];

    return (
        <div>
            <PageHeader
                title="Orders"
                // FIX: Added missing 'path' property to breadcrumb item to match BreadcrumbItem type.
                breadcrumbs={[{ name: 'ERP', path: '/erp/orders' }, { name: 'Orders', path: '/erp/orders' }]}
                actions={<Button leftIcon={<i className="bi bi-download"></i>}>Export</Button>}
            />
            <div className="space-y-4">
                <Input id="search" label="" placeholder="Search by Order ID or Customer..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-xs" />
                <Table columns={orderColumns} data={paginatedOrders} getRowId={item => item.id} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default ErpOrders;