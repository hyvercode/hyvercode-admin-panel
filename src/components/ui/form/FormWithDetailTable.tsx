import React, { useState, useMemo } from 'react';
import { useForm, FormErrors } from '../../../hooks/useForm';
import { LineItem } from '../../../types';
import Input from '../Input';
import Button from '../Button';
import DatePicker from '../datetime/DatePicker';

const validate = (values: { clientName: string; invoiceDate: string }): FormErrors => {
    const errors: FormErrors = {};
    if (!values.clientName) errors.clientName = 'Client name is required.';
    if (!values.invoiceDate) errors.invoiceDate = 'Invoice date is required.';
    return errors;
};

const FormWithDetailTable: React.FC = () => {
    const [lineItems, setLineItems] = useState<LineItem[]>([
        { id: 1, description: 'Web Development Services', quantity: 20, price: 100 },
    ]);

    const handleSubmit = (values: any) => {
        if (lineItems.length === 0) {
            alert('Please add at least one line item.');
            return;
        }
        const finalData = { ...values, items: lineItems, total: totalAmount };
        alert('Invoice form submitted! Check console.');
        console.log('Invoice Data:', finalData);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
        { clientName: '', invoiceDate: new Date().toISOString().split('T')[0] },
        validate,
        handleSubmit
    );

    const addLineItem = () => {
        const newItem: LineItem = {
            id: Date.now(),
            description: '',
            quantity: 1,
            price: 0,
        };
        setLineItems([...lineItems, newItem]);
    };

    const removeLineItem = (id: number) => {
        setLineItems(lineItems.filter(item => item.id !== id));
    };

    const handleItemChange = (id: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
        setLineItems(lineItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const totalAmount = useMemo(() =>
        lineItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [lineItems]);

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Client Name" {...getFieldProps('clientName')} />
                <DatePicker label="Invoice Date" {...getFieldProps('invoiceDate')} />
            </div>

            <div className="overflow-x-auto border rounded-lg dark:border-neutral-800">
                <table className="w-full text-sm">
                    <thead className="bg-neutral-100 dark:bg-neutral-900">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold">Description</th>
                            <th className="px-4 py-2 text-left font-semibold w-24">Qty</th>
                            <th className="px-4 py-2 text-left font-semibold w-32">Price</th>
                            <th className="px-4 py-2 text-left font-semibold w-32">Total</th>
                            <th className="w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-neutral-800">
                        {lineItems.map(item => (
                            <tr key={item.id}>
                                <td className="px-4 py-2"><Input id={`desc-${item.id}`} label="" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} /></td>
                                <td className="px-4 py-2"><Input id={`qty-${item.id}`} label="" type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)} /></td>
                                <td className="px-4 py-2"><Input id={`price-${item.id}`} label="" type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} /></td>
                                <td className="px-4 py-2 font-medium">${(item.quantity * item.price).toFixed(2)}</td>
                                <td className="px-4 py-2 text-center"><Button type="button" variant="subtle" size="sm-icon" onClick={() => removeLineItem(item.id)}><i className="bi bi-trash text-danger"></i></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button type="button" variant="secondary" onClick={addLineItem} leftIcon={<i className="bi bi-plus-lg"></i>}>
                Add Item
            </Button>
            
            <div className="flex justify-end items-center pt-4 border-t dark:border-neutral-800">
                 <div className="text-right">
                    <p className="text-neutral-600 dark:text-neutral-400">Total Amount</p>
                    <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit">Create Invoice</Button>
            </div>
        </form>
    );
};

export default FormWithDetailTable;