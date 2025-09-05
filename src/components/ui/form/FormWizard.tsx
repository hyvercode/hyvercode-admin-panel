import React, { useState } from 'react';
import { useForm, FormErrors } from '../../../hooks/useForm';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

const steps = [
    { id: 1, name: 'Account Setup' },
    { id: 2, name: 'Personal Details' },
    { id: 3, name: 'Confirmation' },
];

const validate = (values: any, step: number): FormErrors => {
    const errors: FormErrors = {};
    if (step === 1) {
        if (!values.email) errors.email = 'Email is required.';
        if (!values.password) errors.password = 'Password is required.';
        else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters.';
    }
    if (step === 2) {
        if (!values.fullName) errors.fullName = 'Full name is required.';
        if (!values.country) errors.country = 'Country is required.';
    }
    return errors;
};

const FormWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    
    const handleFinalSubmit = (values: any) => {
        alert('Wizard completed! Check console for data.');
        console.log('Wizard Form Data:', values);
    };

    const { getFieldProps, handleSubmit, setTouched, values, errors, isValid } = useForm(
        { email: '', password: '', fullName: '', country: 'USA' },
        (formValues) => validate(formValues, currentStep),
        handleFinalSubmit
    );

    const handleNext = () => {
        // Manually touch fields of the current step to show errors
        if (currentStep === 1) setTouched({ email: true, password: true });
        if (currentStep === 2) setTouched({ fullName: true, country: true });

        if (isValid) {
            if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
            }
        }
    };
    
    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            {/* Stepper */}
            <div className="mb-8">
                <ol className="flex items-center w-full">
                    {steps.map((step, index) => (
                        <li key={step.id} className={`flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${currentStep > step.id ? 'after:border-primary' : 'after:border-neutral-200 dark:after:border-neutral-700'}`}>
                            <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${currentStep >= step.id ? 'bg-primary text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
                                {currentStep > step.id ? <i className="bi bi-check"></i> : step.id}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
            
            <form onSubmit={handleSubmit}>
                {/* Step 1: Account Setup */}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">{steps[0].name}</h3>
                        <Input label="Email Address" type="email" {...getFieldProps('email')} />
                        <Input label="Password" type="password" {...getFieldProps('password')} />
                    </div>
                )}
                {/* Step 2: Personal Details */}
                {currentStep === 2 && (
                    <div className="space-y-4">
                         <h3 className="font-semibold text-lg">{steps[1].name}</h3>
                        <Input label="Full Name" {...getFieldProps('fullName')} />
                        <Select label="Country" {...getFieldProps('country')} options={[{value: 'USA', label: 'United States'}, {value: 'CAN', label: 'Canada'}]} />
                    </div>
                )}
                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{steps[2].name}</h3>
                        <p>Please review your information before submitting:</p>
                        <ul className="list-disc pl-5 pt-2 text-sm bg-neutral-100 dark:bg-neutral-900 p-4 rounded-md">
                           <li><strong>Email:</strong> {values.email}</li>
                           <li><strong>Full Name:</strong> {values.fullName}</li>
                           <li><strong>Country:</strong> {values.country}</li>
                        </ul>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-4 border-t dark:border-neutral-800">
                    <Button type="button" variant="secondary" onClick={handlePrev} disabled={currentStep === 1}>
                        Previous
                    </Button>
                    {currentStep < steps.length ? (
                        <Button type="button" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button type="submit">
                           Submit
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormWizard;