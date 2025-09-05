import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import FormWizard from '../../components/ui/form/FormWizard';
import { useForm, FormErrors } from '../../hooks/useForm';
import Input from '../../components/ui/Input';
import CountrySelect from '../../components/ui/select/CountrySelect';
import Image from '../../components/ui/image/Image';
import { PRODUCTS_DATA } from '../../constants';

const Checkout: React.FC = () => {
    const cartItem = PRODUCTS_DATA[0];

    return (
        <div className="container mx-auto px-6 py-8">
            <PageHeader title="Checkout" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card>
                        <Card.Header><h3 className="font-bold">Order Summary</h3></Card.Header>
                        <Card.Body>
                            <div className="flex items-center space-x-4 mb-4">
                                <Image src={cartItem.imageUrl} alt={cartItem.name} className="w-20" />
                                <div>
                                    <p className="font-semibold">{cartItem.name}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Qty: 1</p>
                                </div>
                                <p className="ml-auto font-semibold">${cartItem.price.toFixed(2)}</p>
                            </div>
                            <div className="border-t dark:border-neutral-800 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>${cartItem.price.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>$5.00</span></div>
                                <div className="flex justify-between font-bold text-base"><span>Total</span><span>${(cartItem.price + 5).toFixed(2)}</span></div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <Card.Body>
                            <FormWizard />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
