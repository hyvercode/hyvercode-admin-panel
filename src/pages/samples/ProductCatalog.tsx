import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../../constants';
import { Product } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import Image from '../../components/ui/image/Image';
import Pagination from '../../components/ui/navigation/Pagination';
import Input from '../../components/ui/Input';
import Range from '../../components/ui/range/Range';
import StarRating from '../../components/ui/range/StarRating';
import Button from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductGridItem: React.FC<{ product: Product, onAddToCart: () => void }> = ({ product, onAddToCart }) => (
    <Card>
        <Link to={`/sample/products/${product.id}`}>
            <Image src={product.imageUrl} alt={product.name} aspectRatio="4/3" />
        </Link>
        <Card.Body>
            <p className="text-xs text-neutral-500">{product.category}</p>
            <h3 className="font-semibold truncate">{product.name}</h3>
            <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                <div className="flex items-center text-xs">
                    <i className="bi bi-star-fill text-warning-dark mr-1"></i>
                    {product.rating} ({product.reviewCount})
                </div>
            </div>
        </Card.Body>
        <Card.Footer>
            <Button fullWidth onClick={onAddToCart}>Add to Cart</Button>
        </Card.Footer>
    </Card>
);

const ProductListItem: React.FC<{ product: Product, onAddToCart: () => void }> = ({ product, onAddToCart }) => (
    <Card>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
             <Link to={`/sample/products/${product.id}`}>
                <Image src={product.imageUrl} alt={product.name} aspectRatio="4/3" rounded="none" className="rounded-l-lg" />
            </Link>
        </div>
        <div className="md:w-3/4 flex flex-col">
            <Card.Body className="flex-grow">
                 <p className="text-xs text-neutral-500">{product.category}</p>
                 <h3 className="font-semibold text-lg">{product.name}</h3>
                 <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
                 <div className="flex items-center text-xs mt-2">
                    <i className="bi bi-star-fill text-warning-dark mr-1"></i>
                    {product.rating} ({product.reviewCount} reviews)
                </div>
            </Card.Body>
            <Card.Footer className="flex items-center justify-between">
                <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                <Button onClick={onAddToCart}>Add to Cart</Button>
            </Card.Footer>
        </div>
      </div>
    </Card>
);


const ITEMS_PER_PAGE = 6;

const ProductCatalog: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        price: 500,
        rating: 0,
    });
    
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const handleAddToCart = (product: Product) => {
        addToCart(product, 1);
        addToast(`${product.name} added to cart!`, 'success');
    };

    const categories = ['All', ...Array.from(new Set(PRODUCTS_DATA.map(p => p.category)))];

    const filteredProducts = useMemo(() => {
        return PRODUCTS_DATA.filter(p => {
            return (
                p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
                (filters.category === 'All' || p.category === filters.category) &&
                p.price <= filters.price &&
                p.rating >= filters.rating
            );
        });
    }, [filters]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    return (
        <div className="container mx-auto px-6 py-8">
            <PageHeader title="Product Catalog" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters */}
                <aside className="lg:col-span-1">
                    <Card>
                        <Card.Header><h3 className="font-bold">Filters</h3></Card.Header>
                        <Card.Body className="space-y-6">
                            <Input id="search" label="Search" placeholder="Search products..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button key={cat} onClick={() => setFilters({...filters, category: cat})} className={`px-3 py-1 text-xs rounded-full ${filters.category === cat ? 'bg-primary text-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}>{cat}</button>
                                    ))}
                                </div>
                            </div>
                             <Range
                                label="Max Price"
                                id="price"
                                min={0}
                                max={500}
                                step={10}
                                value={filters.price}
                                onChange={e => setFilters({...filters, price: parseInt(e.target.value, 10)})}
                             />
                             <StarRating
                                label="Minimum Rating"
                                id="rating"
                                value={filters.rating}
                                onChange={rating => setFilters({...filters, rating})}
                             />
                        </Card.Body>
                    </Card>
                </aside>

                {/* Product Grid/List */}
                <main className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Showing {paginatedProducts.length} of {filteredProducts.length} results</p>
                        <div className="flex items-center rounded-md bg-neutral-200 dark:bg-neutral-800 p-1">
                            <Button size="sm-icon" variant={view === 'grid' ? 'primary' : 'secondary'} onClick={() => setView('grid')} className="!shadow-none"><i className="bi bi-grid-3x3-gap-fill"></i></Button>
                            <Button size="sm-icon" variant={view === 'list' ? 'primary' : 'secondary'} onClick={() => setView('list')} className="!shadow-none"><i className="bi bi-list-ul"></i></Button>
                        </div>
                    </div>
                    {view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                           {paginatedProducts.map(p => <ProductGridItem key={p.id} product={p} onAddToCart={() => handleAddToCart(p)} />)}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {paginatedProducts.map(p => <ProductListItem key={p.id} product={p} onAddToCart={() => handleAddToCart(p)} />)}
                        </div>
                    )}
                    <div className="mt-8 flex justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductCatalog;
