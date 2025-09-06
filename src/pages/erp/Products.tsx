
import React from 'react';
import { ERP_PRODUCTS_DATA } from '../../constants';
import { ERPProduct } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table, { Column } from '../../components/ui/table/Table';
import Badge from '../../components/ui/Badge';

const Products: React.FC = () => {

    const columns: Column<ERPProduct>[] = [
        { id: 'sku', header: 'SKU', accessor: (item) => item.sku },
        { id: 'name', header: 'Name', accessor: (item) => item.name },
        { id: 'category', header: 'Category', accessor: (item) => item.category },
        { id: 'price', header: 'Price', accessor: (item) => `$${item.price.toFixed(2)}` },
        { id: 'stock', header: 'Stock', accessor: (item) => item.stock, cell: (item) => (
            <Badge variant={item.stock > 100 ? 'success' : item.stock > 0 ? 'warning' : 'danger'}>
                {item.stock} in stock
            </Badge>
        )},
        {
            id: 'actions',
            header: 'Actions',
            accessor: (item) => item.id,
            cell: (item) => (
                <Button variant="subtle" size="sm">Manage</Button>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="ERP Products"
                breadcrumbs={[{ name: 'ERP', path: '#' }, { name: 'Products', path: '/admin/erp/products' }]}
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>}>Add Product</Button>}
            />
            <Table<ERPProduct> columns={columns} data={ERP_PRODUCTS_DATA} getRowId={(item) => item.id} />
        </div>
    );
};

export default Products;
