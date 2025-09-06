
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Table, { Column } from '../components/ui/table/Table';
import TableExpandable from '../components/ui/table/TableExpandable';
import TableNesting from '../components/ui/table/TableNesting';
import { USERS_DATA, ERP_PRODUCTS_DATA, HIERARCHICAL_TABLE_DATA } from '../constants';
import { User, ERPProduct, HierarchicalData } from '../types';
import Badge from '../components/ui/Badge';
import Tabs from '../components/ui/navigation/Tabs';

const userColumns: Column<User>[] = [
    { id: 'name', header: 'Name', accessor: (item) => item.name },
    { id: 'email', header: 'Email', accessor: (item) => item.email },
    { id: 'role', header: 'Role', accessor: (item) => item.role },
];

const productColumns: Column<ERPProduct>[] = [
    { id: 'name', header: 'Product Name', accessor: (item) => item.name },
    { id: 'sku', header: 'SKU', accessor: (item) => item.sku },
    { id: 'stock', header: 'Stock', accessor: (item) => item.stock, cell: (item) => (
        <Badge variant={item.stock > 100 ? 'success' : 'warning'}>{item.stock} units</Badge>
    )},
    { id: 'price', header: 'Price', accessor: (item) => `$${item.price.toFixed(2)}` },
];

const hierarchicalColumns: Column<HierarchicalData>[] = [
    { id: 'name', header: 'Name', accessor: (item) => item.name },
    { id: 'type', header: 'Type', accessor: (item) => item.type },
    { id: 'status', header: 'Status', accessor: (item) => item.status },
];

const Tables: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Tables"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Tables', path: '/admin/components/tables' }]}
            />
            <Tabs
                tabs={[
                    { id: 'simple', label: 'Simple' },
                    { id: 'expandable', label: 'Expandable' },
                    { id: 'nesting', label: 'Nesting' },
                ]}
            >
                {(activeTab) => (
                    <div>
                        {activeTab === 'simple' && (
                             <Card>
                                <Card.Header><h3 className="font-semibold">Simple Table</h3></Card.Header>
                                <Table<User> columns={userColumns} data={USERS_DATA} getRowId={(item) => item.id} />
                            </Card>
                        )}
                        {activeTab === 'expandable' && (
                             <Card>
                                <Card.Header><h3 className="font-semibold">Expandable Rows Table</h3></Card.Header>
                                <TableExpandable<ERPProduct>
                                    columns={productColumns}
                                    data={ERP_PRODUCTS_DATA}
                                    getRowId={(item) => item.id}
                                    renderExpandedRow={(item) => (
                                        <div className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded">
                                            <strong>Category:</strong> {item.category}
                                        </div>
                                    )}
                                />
                            </Card>
                        )}
                        {activeTab === 'nesting' && (
                             <Card>
                                <Card.Header><h3 className="font-semibold">Nesting/Hierarchical Table</h3></Card.Header>
                                <TableNesting<HierarchicalData>
                                    columns={hierarchicalColumns}
                                    data={HIERARCHICAL_TABLE_DATA}
                                />
                            </Card>
                        )}
                    </div>
                )}
            </Tabs>
        </div>
    );
};

export default Tables;
