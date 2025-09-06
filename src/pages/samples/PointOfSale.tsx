
import React, { useState } from 'react';
import { POS_PRODUCTS_DATA } from '../../constants';
import { POSCartItem } from '../../types';
import Card from '../../components/ui/card/Card';
import Button from '../../components/ui/Button';
import Image from '../../components/ui/image/Image';

const PointOfSale: React.FC = () => {
    const [cart, setCart] = useState<POSCartItem[]>([]);
    const [input, setInput] = useState('');

    const handleAddToCart = (product: typeof POS_PRODUCTS_DATA[0]) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
         <div className="h-screen bg-neutral-100 dark:bg-neutral-1100 font-sans flex">
            {/* Main Content */}
            <div className="flex-grow p-4 grid grid-cols-3 gap-4">
                 {/* Product Grid */}
                <div className="col-span-2">
                     <div className="grid grid-cols-4 gap-4">
                        {POS_PRODUCTS_DATA.map(product => (
                            <Card key={product.id} onClick={() => handleAddToCart(product)} className="cursor-pointer hover:border-primary">
                                <Image src={product.imageUrl} alt={product.name} aspectRatio="1/1" />
                                <Card.Body className="text-center p-2">
                                    <p className="font-semibold text-sm">{product.name}</p>
                                    <p className="text-xs text-neutral-500">${product.price.toFixed(2)}</p>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
                 {/* Keypad */}
                <div className="col-span-1">
                    <Card>
                        <Card.Body>
                             <input type="text" value={input} readOnly className="w-full text-right text-2xl p-2 mb-2 bg-neutral-100 dark:bg-neutral-900 rounded" />
                            <div className="grid grid-cols-3 gap-2">
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '.'].map(key => (
                                    <Button key={key} onClick={() => key === 'C' ? setInput('') : setInput(input + key)} variant="secondary" className="text-xl h-16">{key}</Button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Cart / Checkout Sidebar */}
            <div className="w-80 bg-neutral-0 dark:bg-neutral-1000 flex flex-col shadow-lg">
                <div className="p-4 border-b dark:border-neutral-800">
                    <h2 className="font-bold text-lg">Current Order</h2>
                </div>
                <div className="flex-grow overflow-y-auto p-2">
                    {cart.map(item => (
                         <div key={item.id} className="flex items-center p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
                            <Image src={item.imageUrl} alt={item.name} className="w-10 h-10" />
                            <div className="ml-2 flex-grow">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-neutral-500">${item.price.toFixed(2)} x {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t dark:border-neutral-800 space-y-2">
                     <div className="flex justify-between text-sm"><p>Subtotal:</p> <p>${subtotal.toFixed(2)}</p></div>
                    <div className="flex justify-between text-sm"><p>Tax:</p> <p>${tax.toFixed(2)}</p></div>
                    <div className="flex justify-between font-bold text-xl"><p>Total:</p> <p>${total.toFixed(2)}</p></div>
                    <Button fullWidth className="mt-2 h-12 text-lg">Charge</Button>
                </div>
            </div>
        </div>
    );
};

export default PointOfSale;
