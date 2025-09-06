
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import { useForm, FormErrors } from '../hooks/useForm';
import AsyncSelect from '../components/ui/select/AsyncSelect';
import CreatableSelect from '../components/ui/select/CreatableSelect';
import MultiSelect from '../components/ui/select/MultiSelect';
import CountrySelect from '../components/ui/select/CountrySelect';
import AutocompleteSelect from '../components/ui/select/AutocompleteSelect';
import RadioSelect from '../components/ui/select/RadioSelect';
import Button from '../components/ui/Button';
import { COUNTRIES_DATA, USERS_DATA } from '../constants';

const userOptions = USERS_DATA.map(user => ({ value: String(user.id), label: user.name }));

// Mock API call for async select
const loadUserOptions = (): Promise<{ value: string; label: string }[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(userOptions);
        }, 1000);
    });
};

const validate = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.asyncUser) errors.asyncUser = 'Please select a user.';
    if (values.assignedUsers.length === 0) errors.assignedUsers = 'Assign at least one user.';
    return errors;
};

const AdvancedSelects: React.FC = () => {
     const handleSubmit = (values: any) => {
        alert('Form submitted! Check console.');
        console.log('Advanced Selects Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit, setValues, values } = useForm(
        {
            asyncUser: '',
            newTag: '',
            assignedUsers: [],
            country: 'USA',
            searchUser: '',
            priority: 'medium',
        },
        validate,
        handleSubmit
    );

    return (
        <div>
            <PageHeader
                title="Advanced Selects"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Advanced Selects', path: '/admin/components/advanced-selects' }]}
            />
            <Card>
                <Card.Header><h3 className="font-semibold">Advanced Select Examples</h3></Card.Header>
                <Card.Body>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <AsyncSelect
                            label="Asynchronous Select"
                            id="asyncUser"
                            loadOptions={loadUserOptions}
                            {...getFieldProps('asyncUser')}
                        />

                        <MultiSelect
                            label="Multi-Select"
                            id="assignedUsers"
                            options={userOptions}
                            selectedValues={values.assignedUsers}
                            onChange={(selected) => setValues(prev => ({...prev, assignedUsers: selected}))}
                            error={getFieldProps('assignedUsers').error}
                        />

                        <CountrySelect
                            label="Country Select"
                            {...getFieldProps('country')}
                        />

                        <RadioSelect
                            label="Radio Select"
                            options={[
                                { value: 'low', label: 'Low Priority' },
                                { value: 'medium', label: 'Medium Priority' },
                                { value: 'high', label: 'High Priority' },
                            ]}
                            {...getFieldProps('priority')}
                        />
                        
                        <AutocompleteSelect
                            label="Autocomplete Input"
                            id="searchUser"
                            options={userOptions}
                             {...getFieldProps('searchUser')}
                        />

                        <CreatableSelect
                            label="Creatable Select (Tags)"
                            id="newTag"
                            options={[{value: 'bug', label: 'Bug'}, {value: 'feature', label: 'Feature'}]}
                            onCreate={(newValue) => alert(`Created new tag: ${newValue}`)}
                            {...getFieldProps('newTag')}
                        />
                        
                        <div className="flex justify-end pt-4 border-t dark:border-neutral-800">
                           <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdvancedSelects;
