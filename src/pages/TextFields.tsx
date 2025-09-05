import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { useForm, FormErrors } from '../hooks/useForm';

import TextField from '../components/ui/textfield/TextField';
import TextFieldIcon from '../components/ui/textfield/TextFieldIcon';
import TextFieldGroup from '../components/ui/textfield/TextFieldGroup';
import TextFieldImage from '../components/ui/textfield/TextFieldImage';
import TextFieldNumber from '../components/ui/textfield/TextFieldNumber';
import TextFieldCurrency from '../components/ui/textfield/TextFieldCurrency';

const validate = (values: any): FormErrors => {
  const errors: FormErrors = {};
  if (!values.email) errors.email = 'Email with icon is required.';
  if (!values.website) errors.website = 'Website URL is required.';
  if (!values.username) errors.username = 'GitHub username is required.';
  if (!values.message) errors.message = 'Message is required.';
  if (!values.quantity || values.quantity <= 0) errors.quantity = 'Quantity must be greater than 0.';
  if (!values.price || values.price <= 0) errors.price = 'Price must be greater than 0.';
  return errors;
};

const TextFields: React.FC = () => {
  const handleSubmit = (values: any) => {
    alert('Form submitted! Check console for data.');
    console.log('Text Fields Form Data:', values);
  };

  const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
    {
      email: '',
      website: '',
      username: '',
      message: '',
      quantity: 1,
      price: 0,
    },
    validate,
    handleSubmit
  );

  return (
    <div>
      <PageHeader
        title="Text Field Components"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Text Fields', path: '/text-fields' }]}
      />

      <div className="bg-neutral-0 dark:bg-neutral-1000 p-8 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <TextFieldIcon
              label="Email (with left icon)"
              iconLeft={<i className="bi bi-envelope-fill"></i>}
              placeholder="you@example.com"
              {...getFieldProps('email')}
            />
            
            <TextFieldIcon
              label="Search (with right icon)"
              iconRight={<i className="bi bi-search"></i>}
              id="search"
              name="search"
              placeholder="Search..."
            />

            <TextFieldGroup
              label="Website URL (with group addon)"
              addonLeft="https://"
              placeholder="example.com"
              {...getFieldProps('website')}
            />
            
            <TextFieldGroup
              label="GitHub (with icon addon)"
              addonLeft={<i className="bi bi-github"></i>}
              placeholder="your-username"
              {...getFieldProps('username')}
            />

            <TextFieldImage
              label="Message To (with image)"
              imageUrl="https://picsum.photos/50/50?random=1"
              altText="Alice Johnson"
              placeholder="Your message..."
              {...getFieldProps('message')}
            />

            <TextField
                label="Basic Text Field (for reference)"
                id="basic"
                name="basic"
                placeholder="Standard input field"
            />
            
            <TextFieldNumber
              label="Quantity"
              min={1}
              {...getFieldProps('quantity')}
            />

            <TextFieldCurrency
              label="Price"
              currencySymbol="$"
              placeholder="0.00"
              {...getFieldProps('price')}
            />
          </div>

          <div className="pt-4 flex justify-end border-t dark:border-neutral-800">
            <Button type="submit">
              Submit Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextFields;