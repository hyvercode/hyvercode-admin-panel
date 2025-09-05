import React, { useState, useMemo } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table, { Column } from '../../components/ui/table/Table';
import Pagination from '../../components/ui/navigation/Pagination';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/overlay/Modal';
import { useForm, FormErrors } from '../../hooks/useForm';
import { useToast } from '../../contexts/ToastContext';
import { ERP_PRODUCTS_DATA } from '../../constants';
import { ERPProduct } from '../../types';

const validateProduct = (values: Partial<ERPProduct>): FormErrors => {
    const errors: FormErrors = {};
    if (!values.name) errors.name = "Product name is required.";
    if (!values.sku) errors.sku = "SKU is required.";
    if (!values.price || values.price <= 0) errors.price = "Price must be greater than 0.";
    if (values.stock === undefined || values.stock < 0) errors.stock = "Stock cannot be negative.";
    return errors;
}

const ProductForm: React.FC<{ product: Partial<ERPProduct>; onSave: (product: ERPProduct) => void; onCancel: () => void }> = ({ product, onSave, onCancel }) => {
    const { getFieldProps, handleSubmit } = useForm(
        product,
        validateProduct,
        (values) => onSave(values as ERPProduct)
    );
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Product Name" {...getFieldProps('name')} />
            <Input label="SKU" {...getFieldProps('sku')} />
            <Input label="Category" {...getFieldProps('category')} />
            <div className="grid grid-cols-2 gap-4">
                <Input label="Price" type="number" step="0.01" {...getFieldProps('price')} />
                <Input label="Stock" type="number" {...getFieldProps('stock')} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Product</Button>
            </div>
        </form>
    );
}

const ErpProducts: React.FC = () => {
    const [products, setProducts] = useState(ERP_PRODUCTS_DATA);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Partial<ERPProduct> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToast } = useToast();
    const ITEMS_PER_PAGE = 10;

    const handleNewProduct = () => {
        setEditingProduct({ name: '', category: '', price: 0, stock: 0, sku: '' });
        setModalOpen(true);
    };

    const handleEditProduct = (product: ERPProduct) => {
        setEditingProduct(product);
        setModalOpen(true);
    };
    
    const handleSaveProduct = (productToSave: ERPProduct) => {
        const isNew = !productToSave.id;
        if (isNew) {
            const newProduct = { ...productToSave, id: `prod-${Date.now()}` };
            setProducts(prev => [newProduct, ...prev]);
            addToast("Product created successfully", "success");
        } else {
            setProducts(prev => prev.map(p => p.id === productToSave.id ? productToSave : p));
            addToast("Product updated successfully", "success");
        }
        setModalOpen(false);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const productColumns: Column<ERPProduct>[] = [
        { id: 'name', header: 'Product Name', accessor: (item) => item.name },
        { id: 'sku', header: 'SKU', accessor: (item) => item.sku },
        { id: 'category', header: 'Category', accessor: (item) => item.category },
        { id: 'price', header: 'Price', cell: item => `$${item.price.toFixed(2)}`, accessor: item => item.price },
        { id: 'stock', header: 'Stock', accessor: (item) => item.stock },
        { id: 'actions', header: 'Actions', accessor: item => item.id, cell: item => <Button size="sm" variant="subtle" onClick={() => handleEditProduct(item)}>Edit</Button> }
    ];

    return (
        <div>
            <PageHeader
                title="Products"
                // FIX: Added missing 'path' property to breadcrumb item to match BreadcrumbItem type.
                breadcrumbs={[{ name: 'ERP', path: '/erp/products' }, { name: 'Products', path: '/erp/products' }]}
                actions={<Button leftIcon={<i className="bi bi-plus-lg"></i>} onClick={handleNewProduct}>Add Product</Button>}
            />
            <div className="space-y-4">
                <Input id="search" label="" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-xs" />
                <Table columns={productColumns} data={paginatedProducts} getRowId={item => item.id} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
            
            {editingProduct && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingProduct.id ? 'Edit Product' : 'Create Product'}>
                    <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={() => setModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
};

export default ErpProducts;