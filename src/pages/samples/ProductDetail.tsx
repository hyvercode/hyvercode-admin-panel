import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PRODUCTS_DATA, REVIEWS_DATA } from '../../constants';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import Image from '../../components/ui/image/Image';
import Button from '../../components/ui/Button';
import Carousel from '../../components/ui/content/Carousel';
import Tabs from '../../components/ui/navigation/Tabs';
import CommentThread from '../../components/ui/CommentThread';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const product = PRODUCTS_DATA.find(p => p.id === parseInt(productId || ''));
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { addToast } = useToast();

    if (!product) {
        return <Navigate to="/sample/products" replace />;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        addToast(`${quantity} x ${product.name} added to cart!`, 'success');
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <PageHeader
                title={product.name}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Products', path: '/sample/products' },
                    { name: product.name, path: `/sample/products/${product.id}` },
                ]}
            />
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                    {/* Image Carousel */}
                    <div>
                        <Carousel>
                            <Image src={product.imageUrl} alt={product.name} aspectRatio="4/3" />
                            <Image src={`https://picsum.photos/seed/product${product.id}-2/400/300`} alt={`${product.name} view 2`} aspectRatio="4/3" />
                            <Image src={`https://picsum.photos/seed/product${product.id}-3/400/300`} alt={`${product.name} view 3`} aspectRatio="4/3" />
                        </Carousel>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-sm text-neutral-500 mt-1">{product.category}</p>
                        <div className="flex items-center mt-2">
                             <i className="bi bi-star-fill text-warning-dark mr-1"></i>
                             <span className="font-semibold">{product.rating}</span>
                             <span className="text-sm text-neutral-500 ml-2">({product.reviewCount} reviews)</span>
                        </div>
                        <p className="text-3xl font-bold my-4">${product.price.toFixed(2)}</p>
                        <p className="text-neutral-700 dark:text-neutral-300">{product.description}</p>
                        
                        <div className="flex items-center gap-4 mt-6">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                className="w-20 text-center border rounded py-2 bg-neutral-100 dark:bg-neutral-900"
                                min="1"
                            />
                            <Button onClick={handleAddToCart} fullWidth>Add to Cart</Button>
                        </div>
                    </div>
                </div>
                
                <div className="border-t dark:border-neutral-800 p-4">
                    <Tabs tabs={[
                        {id: 'desc', label: 'Description'},
                        {id: 'specs', label: 'Specifications'},
                        {id: 'reviews', label: 'Reviews'}
                    ]}>
                        {(activeTab) => (
                           <div>
                                {activeTab === 'desc' && <p>{product.description}</p>}
                                {activeTab === 'specs' && (
                                    <ul className="list-disc pl-5">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <li key={key}><strong>{key}:</strong> {value}</li>
                                        ))}
                                    </ul>
                                )}
                                {activeTab === 'reviews' && (
                                    <CommentThread
                                        comments={REVIEWS_DATA}
                                        onCommentSubmit={(text, parentId) => console.log({text, parentId})}
                                    />
                                )}
                           </div>
                        )}
                    </Tabs>
                </div>
            </Card>
        </div>
    );
};

export default ProductDetail;
