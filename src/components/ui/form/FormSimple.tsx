import React from 'react';
import { useForm, FormErrors } from '../../../hooks/useForm';
import Input from '../Input';
import Button from '../Button';
import Textarea from '../Textarea';

const validate = (values: { name: string; email: string }): FormErrors => {
    const errors: FormErrors = {};
    if (!values.name) errors.name = 'Name is required.';
    if (!values.email) {
        errors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address.';
    }
    return errors;
};

const FormSimple: React.FC = () => {
    const handleSubmit = (values: any) => {
        alert('Form submitted successfully! Check console for data.');
        console.log('Simple Form Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
        { name: '', email: '', message: '' },
        validate,
        handleSubmit
    );

    return (
        <form onSubmit={handleFormSubmit} className="space-y-4">
            <Input label="Full Name" {...getFieldProps('name')} />
            <Input label="Email Address" type="email" {...getFieldProps('email')} />
            <Textarea label="Message (Optional)" {...getFieldProps('message')} rows={4} />
            <div className="flex justify-end pt-2">
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
};

export default FormSimple;