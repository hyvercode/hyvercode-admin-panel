
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import TextField from '../components/ui/textfield/TextField';
import TextFieldIcon from '../components/ui/textfield/TextFieldIcon';
import TextFieldGroup from '../components/ui/textfield/TextFieldGroup';
import TextFieldImage from '../components/ui/textfield/TextFieldImage';
import TextFieldNumber from '../components/ui/textfield/TextFieldNumber';
import TextFieldCurrency from '../components/ui/textfield/TextFieldCurrency';

const TextFields: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Text Fields"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Text Fields', path: '/admin/components/text-fields' }]}
            />
             <Card>
                <Card.Header><h3 className="font-semibold">Text Field Variants</h3></Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TextField id="standard" label="Standard" placeholder="Enter text..." />
                        
                        <TextFieldIcon 
                            id="iconLeft" 
                            label="With Left Icon" 
                            placeholder="Search..." 
                            iconLeft={<i className="bi bi-search"></i>}
                        />

                        <TextFieldIcon 
                            id="iconRight" 
                            label="With Right Icon" 
                            type="password"
                            placeholder="Enter password..." 
                            iconRight={<i className="bi bi-eye-slash"></i>}
                        />
                        
                        <TextFieldGroup
                            id="groupLeft"
                            label="Input Group (Left)"
                            addonLeft="@"
                            placeholder="username"
                        />
                        
                        <TextFieldGroup
                            id="groupRight"
                            label="Input Group (Right)"
                            addonRight=".com"
                            placeholder="domain"
                        />
                        
                        <TextFieldGroup
                            id="groupBoth"
                            label="Input Group (Both)"
                            addonLeft="https://"
                            addonRight=".com"
                            placeholder="subdomain"
                        />
                        
                        <TextFieldImage
                            id="image"
                            label="With Image"
                            placeholder="Enter username..."
                            imageUrl="https://i.pravatar.cc/40?u=test"
                            altText="User avatar"
                        />
                        
                        <TextFieldNumber id="number" label="Number Input" defaultValue="10" />

                        <TextFieldCurrency id="currency" label="Currency Input" placeholder="0.00" />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TextFields;
