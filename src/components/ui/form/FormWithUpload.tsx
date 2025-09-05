import React from 'react';
import { useForm, FormErrors } from '../../../hooks/useForm';
import Input from '../Input';
import Textarea from '../Textarea';
import ImageUpload from '../ImageUpload';
import Button from '../Button';

const validate = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.productName) errors.productName = 'Product name is required.';
    if (!values.price || values.price <= 0) errors.price = 'Please enter a valid price.';
    if (!values.productImage) errors.productImage = 'A product image is required.';
    return errors;
};

const FormWithUpload: React.FC = () => {
    const handleSubmit = (values: any) => {
        alert('Form with upload submitted! Check console.');
        console.log('Form with Upload Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit, setValues, values } = useForm(
        {
            productName: '',
            description: '',
            price: 0,
            productImage: null as File | null,
        },
        validate,
        handleSubmit
    );

    return (
        <form onSubmit={handleFormSubmit} className="space-y-4">
            <Input label="Product Name" {...getFieldProps('productName')} />
            <Input label="Price" type="number" {...getFieldProps('price')} />
            <Textarea label="Description (Optional)" {...getFieldProps('description')} rows={3} />
            <ImageUpload
                id="productImage"
                label="Product Image"
                onFileChange={(file) => setValues(prev => ({ ...prev, productImage: file }))}
                error={getFieldProps('productImage').error}
            />
            <div className="flex justify-end pt-2">
                <Button type="submit">Create Product</Button>
            </div>
        </form>
    );
};

export default FormWithUpload;