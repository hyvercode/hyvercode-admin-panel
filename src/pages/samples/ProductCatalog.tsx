import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../../constants';
import { Product } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import Image from '../../components/ui/image/Image';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Pagination from '../../components/ui/navigation/Pagination';
import Range from '../../components/ui/range/Range';
import StarRating from '../../components/ui/range/StarRating';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Card>
        <Image src={product.imageUrl} alt={product.name} aspectRatio="4/3" rounded="none" />
        <Card.Body>
            <Badge variant="neutral">{product.category}</Badge>
            <h3 className="font-bold text-lg mt-2 truncate">{product.name}</h3>
            <div className="flex items-center justify-between mt-2">
                <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">${product.price.toFixed(2)}</p>
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                    <i className="bi bi-star-fill text-warning-dark mr-1"></i>
                    <span>{product.rating} ({product.reviewCount})</span>
                </div>
            </div>
        </Card.Body>
        <Card.Footer>
            {/* FIX: Removed the unsupported 'as' prop. The 'to' prop is sufficient. */}
            <Button to={`/sample/products/${product.id}`} fullWidth>View Details</Button>
        </Card.Footer>
    </Card>
);

const ITEMS_PER_PAGE = 6;

const ProductCatalog: React.FC = () => {
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        price: 1000,
        rating: 0,
        sortBy: 'rating-desc',
    });
    const [currentPage, setCurrentPage] = useState(1);

    const handleFilterChange = (key: keyof typeof filters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredAndSortedProducts = useMemo(() => {
        let items = PRODUCTS_DATA.filter(p => {
            return (
                p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
                (filters.category === 'All' || p.category === filters.category) &&
                p.price <= filters.price &&
                p.rating >= filters.rating
            );
        });

        items.sort((a, b) => {
            switch (filters.sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'rating-desc': return b.rating - a.rating;
                default: return 0;
            }
        });
        return items;
    }, [filters]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredAndSortedProducts, currentPage]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
    const categories = ['All', ...Array.from(new Set(PRODUCTS_DATA.map(p => p.category)))];

    return (
        <div className="container mx-auto px-6 py-8">
            <PageHeader title="Product Catalog" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <Card>
                        <Card.Header><h3 className="font-bold">Filters</h3></Card.Header>
                        <Card.Body className="space-y-6">
                            <Input label="Search" id="search" placeholder="Search products..." value={filters.search} onChange={e => handleFilterChange('search', e.target.value)} />
                            <Select label="Category" id="category" options={categories.map(c => ({ value: c, label: c }))} value={filters.category} onChange={e => handleFilterChange('category', e.target.value)} />
                            <Range label="Max Price" id="price" min={0} max={1000} value={filters.price} onChange={e => handleFilterChange('price', Number(e.target.value))} />
                            <StarRating label="Minimum Rating" id="rating" value={filters.rating} onChange={value => handleFilterChange('rating', value)} />
                        </Card.Body>
                    </Card>
                </aside>

                {/* Products Grid */}
                <main className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products</p>
                        <Select label="" id="sort" options={[{ value: 'rating-desc', label: 'Best Rating' }, { value: 'price-asc', label: 'Price: Low to High' }, { value: 'price-desc', label: 'Price: High to Low' }]} value={filters.sortBy} onChange={e => handleFilterChange('sortBy', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductCatalog;
