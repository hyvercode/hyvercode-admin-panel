
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import Card from '../../components/ui/card/Card';
import FormSimple from '../../components/ui/form/FormSimple';
import Button from '../../components/ui/Button';

const Checkout: React.FC = () => {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    return (
        <div className="bg-neutral-100 dark:bg-neutral-1100 py-8">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-1 order-last lg:order-first">
                        <Card>
                             <Card.Header><h2 className="font-semibold text-lg">Order Summary</h2></Card.Header>
                             <Card.Body>
                                <ul className="divide-y dark:divide-neutral-800">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="py-3 flex justify-between text-sm">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t dark:border-neutral-800 mt-4 pt-4 space-y-2">
                                    <div className="flex justify-between"><p>Subtotal:</p> <p>${subtotal.toFixed(2)}</p></div>
                                    <div className="flex justify-between"><p>Tax:</p> <p>${tax.toFixed(2)}</p></div>
                                    <div className="flex justify-between font-bold text-lg"><p>Total:</p> <p>${total.toFixed(2)}</p></div>
                                </div>
                             </Card.Body>
                        </Card>
                    </div>

                    {/* Shipping and Payment */}
                    <div className="lg:col-span-2">
                         <Card>
                             <Card.Header><h2 className="font-semibold text-lg">Shipping & Payment</h2></Card.Header>
                             <Card.Body>
                                <FormSimple />
                                <div className="mt-6 border-t pt-6 dark:border-neutral-800">
                                    <Button fullWidth size="default">Place Order</Button>
                                </div>
                             </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
