import React, { useState } from 'react';
import { POS_PRODUCTS_DATA } from '../../constants';
import { POSProduct, POSCartItem } from '../../types';
import Card from '../../components/ui/card/Card';
import Image from '../../components/ui/image/Image';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import PageHeader from '../../components/ui/PageHeader';
import { useToast } from '../../contexts/ToastContext';

const ProductGridItem: React.FC<{ product: POSProduct; onAddToCart: (product: POSProduct) => void }> = ({ product, onAddToCart }) => (
    <Card onClick={() => onAddToCart(product)} className="cursor-pointer hover:border-primary transition-colors">
        <Image src={product.imageUrl} alt={product.name} aspectRatio="1/1" rounded="none" />
        <Card.Body className="text-center p-2">
            <p className="font-semibold text-sm truncate">{product.name}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">${product.price.toFixed(2)}</p>
        </Card.Body>
    </Card>
);

const PointOfSale: React.FC = () => {
    const [cart, setCart] = useState<POSCartItem[]>([]);
    const { addToast } = useToast();

    const addToCart = (product: POSProduct) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };
    
    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    }
    
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prev => prev.map(item => item.id === productId ? {...item, quantity} : item));
    }

    const handlePayment = () => {
        addToast('Payment successful!', 'success');
        setCart([]);
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <PageHeader title="Point of Sale" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-[calc(100vh-180px)]">
                {/* Product Grid */}
                <div className="lg:col-span-7 h-[50vh] lg:h-full overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {POS_PRODUCTS_DATA.map(product => (
                            <ProductGridItem key={product.id} product={product} onAddToCart={addToCart} />
                        ))}
                    </div>
                </div>

                {/* Cart/Checkout Panel */}
                <div className="lg:col-span-5">
                    <Card className="h-full flex flex-col">
                        <Card.Header><h3 className="font-bold">Current Order</h3></Card.Header>
                        <Card.Body className="flex-grow overflow-y-auto">
                            {cart.length > 0 ? (
                                <ul className="divide-y dark:divide-neutral-800">
                                    {cart.map(item => (
                                        <li key={item.id} className="py-3 flex items-center">
                                            <Image src={item.imageUrl} alt={item.name} className="w-12 h-12" rounded="md"/>
                                            <div className="ml-3 flex-grow">
                                                <p className="font-semibold text-sm">{item.name}</p>
                                                <p className="text-xs text-neutral-500">${item.price.toFixed(2)}</p>
                                            </div>
                                            <Input type="number" id={`qty-${item.id}`} label="" value={item.quantity} onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 0)} className="w-16 text-center" />
                                            <Button variant="subtle" size="sm-icon" onClick={() => removeFromCart(item.id)} className="ml-2"><i className="bi bi-trash text-danger"></i></Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <p className="text-neutral-500">Cart is empty</p>
                                </div>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                                <div className="flex justify-between font-bold text-lg border-t dark:border-neutral-800 pt-2 mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
                            </div>
                            <Button fullWidth className="mt-4" onClick={handlePayment} disabled={cart.length === 0}>Charge ${total.toFixed(2)}</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PointOfSale;