import React from 'react';
import PageHeader from '../components/ui/PageHeader';

import FormSimple from '../components/ui/form/FormSimple';
import FormComplex from '../components/ui/form/FormComplex';
import FormWithUpload from '../components/ui/form/FormWithUpload';
import FormWithDetailTable from '../components/ui/form/FormWithDetailTable';
import FormWizard from '../components/ui/form/FormWizard';
import FormTabs from '../components/ui/form/FormTabs';
import RadioGroup from '../components/ui/radio/RadioGroup';
import { useForm, FormErrors } from '../hooks/useForm';
import Button from '../components/ui/Button';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

// --- RadioForm logic moved outside component ---
const validateRadioForm = (values: { plan: string }): FormErrors => {
    const errors: FormErrors = {};
    if (!values.plan) {
        errors.plan = 'Please select a subscription plan.';
    }
    return errors;
};

const handleRadioSubmit = (values: { plan: string }) => {
    alert(`Selected Plan: ${values.plan}`);
    console.log(values);
};

const RadioForm: React.FC = () => {
    const { getFieldProps, handleSubmit } = useForm(
        { plan: 'free' },
        validateRadioForm,
        handleRadioSubmit
    );

    return (
        <form onSubmit={handleSubmit}>
            <RadioGroup
                label="Subscription Plan"
                options={[
                    { value: 'free', label: 'Free Tier' },
                    { value: 'basic', label: 'Basic Plan ($10/mo)' },
                    { value: 'pro', label: 'Pro Plan ($25/mo)' },
                ]}
                {...getFieldProps('plan')}
            />
            <div className="flex justify-end mt-4">
                <Button type="submit">Subscribe</Button>
            </div>
        </form>
    );
};


const Forms: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Form Layouts"
        breadcrumbs={[{ name: 'Home', path: '/admin/dashboard' }, { name: 'Forms', path: '/admin/forms' }]}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
            <ComponentSection title="Wizard Form">
                <FormWizard />
            </ComponentSection>
        </div>

        <ComponentSection title="Simple Form">
            <FormSimple />
        </ComponentSection>

        <ComponentSection title="Form with Tabs">
            <FormTabs />
        </ComponentSection>
        
        <ComponentSection title="Form with Radio Group">
            <RadioForm />
        </ComponentSection>

        <ComponentSection title="Form with Image Upload">
            <FormWithUpload />
        </ComponentSection>

        <div className="lg:col-span-2">
            <ComponentSection title="Complex Form (Multi-Column)">
                <FormComplex />
            </ComponentSection>
        </div>

         <div className="lg:col-span-2">
            <ComponentSection title="Form with Detail Table (Dynamic Rows)">
                <FormWithDetailTable />
            </ComponentSection>
        </div>

      </div>
    </div>
  );
};

export default Forms;