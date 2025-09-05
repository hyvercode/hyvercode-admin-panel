import React from 'react';
import { useForm, FormErrors } from '../../../hooks/useForm';
import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';
import Checkbox from '../Checkbox';
import Button from '../Button';

const validate = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.firstName) errors.firstName = 'First name is required.';
    if (!values.lastName) errors.lastName = 'Last name is required.';
    if (!values.email) errors.email = 'Email is required.';
    if (!values.country) errors.country = 'Country is required.';
    if (!values.terms) errors.terms = 'You must accept the terms.';
    return errors;
};

const FormComplex: React.FC = () => {
    const handleSubmit = (values: any) => {
        alert('Complex form submitted! Check console.');
        console.log('Complex Form Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
        {
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            country: 'USA',
            bio: '',
            terms: false
        },
        validate,
        handleSubmit
    );

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
                <h4 className="text-md font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input label="First Name" {...getFieldProps('firstName')} />
                    <Input label="Last Name" {...getFieldProps('lastName')} />
                    <Input label="Email Address" type="email" {...getFieldProps('email')} className="md:col-span-2" />
                    <Input label="Company (Optional)" {...getFieldProps('company')} className="md:col-span-2" />
                </div>
            </div>

            <div>
                 <h4 className="text-md font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">Profile Details</h4>
                 <div className="grid grid-cols-1 gap-4 mt-4">
                    <Select
                        label="Country"
                        {...getFieldProps('country')}
                        options={[
                            { value: 'USA', label: 'United States' },
                            { value: 'CAN', label: 'Canada' },
                            { value: 'MEX', label: 'Mexico' },
                        ]}
                    />
                    <Textarea label="Biography (Optional)" {...getFieldProps('bio')} rows={3} />
                 </div>
            </div>

             <Checkbox
                label="I accept the terms and conditions"
                description="You agree to our privacy policy."
                {...getFieldProps('terms')}
            />

            <div className="flex justify-end pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <Button type="submit">Save Profile</Button>
            </div>
        </form>
    );
};

export default FormComplex;