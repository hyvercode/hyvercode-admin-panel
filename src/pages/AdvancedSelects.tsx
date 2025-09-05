import React, { useState, useCallback } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { useForm, FormErrors } from '../hooks/useForm';
import { Option } from '../types';

import AsyncSelect from '../components/ui/select/AsyncSelect';
import CreatableSelect from '../components/ui/select/CreatableSelect';
import MultiSelect from '../components/ui/select/MultiSelect';
import CountrySelect from '../components/ui/select/CountrySelect';
import RadioSelect from '../components/ui/select/RadioSelect';
import AutocompleteSelect from '../components/ui/select/AutocompleteSelect';
import Modal from '../components/ui/overlay/Modal';
import Select from '../components/ui/Select';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

// --- Mock Data & Functions ---
const initialTags: Option[] = [
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
];
const projectOptions: Option[] = [
    { value: 'proj-a', label: 'Project Alpha' },
    { value: 'proj-b', label: 'Project Beta' },
    { value: 'proj-c', label: 'Project Charlie' },
];
const loadUsers = (): Promise<Option[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { value: '1', label: 'Alice Johnson' },
                { value: '2', label: 'Bob Smith' },
                { value: '4', label: 'Diana Prince' },
            ]);
        }, 1500);
    });
};

// --- Page Component ---
const AdvancedSelects: React.FC = () => {
  const [tags, setTags] = useState<Option[]>(initialTags);
  const [isPopupSelectOpen, setPopupSelectOpen] = useState(false);

  // Form 1: Async and Creatable
  const { 
    getFieldProps: getFieldProps1, 
    handleSubmit: handleSubmit1, 
    setValues: setValues1,
    values: values1
  } = useForm(
    { assignee: '', tag: '' },
    (values): FormErrors => {
      const errors: FormErrors = {};
      if (!values.assignee) errors.assignee = 'An assignee is required.';
      if (!values.tag) errors.tag = 'A tag is required.';
      return errors;
    },
    (values) => {
      alert('Form 1 Submitted! Check console.');
      console.log('Form 1 Data:', values);
    }
  );

  const handleCreateTag = (newTagLabel: string) => {
    const newTagValue = newTagLabel.toLowerCase().replace(/\s+/g, '-');
    if (!tags.some(t => t.value === newTagValue)) {
      const newTag = { value: newTagValue, label: newTagLabel };
      setTags(prev => [...prev, newTag]);
      // Set the newly created tag as the selected value
      setValues1(prev => ({ ...prev, tag: newTagLabel }));
    }
  };
  
  // Form 2: Multi-select
   const { 
    getFieldProps: getFieldProps2, 
    handleSubmit: handleSubmit2,
    setValues: setValues2,
    values: values2
  } = useForm(
    { teamMembers: [] as string[] },
    (values): FormErrors => {
      const errors: FormErrors = {};
      if (values.teamMembers.length < 2) errors.teamMembers = 'Select at least two team members.';
      return errors;
    },
    (values) => {
      alert('Form 2 Submitted! Check console.');
      console.log('Form 2 Data:', values);
    }
  );
  
  // Form 3: Country and Radio Select
  const { getFieldProps: getFieldProps3, handleSubmit: handleSubmit3, values: values3 } = useForm(
    { country: 'USA', priority: '' },
    (values): FormErrors => {
        const errors: FormErrors = {};
        if (!values.priority) errors.priority = 'Priority is required.';
        return errors;
    },
    (values) => {
        alert('Form 3 Submitted! Check console.');
        console.log('Form 3 Data:', values);
    }
  );

  return (
    <div>
      <PageHeader
        title="Advanced Selects"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Advanced Selects', path: '/advanced-selects' }]}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ComponentSection title="Async & Creatable Select">
          <form onSubmit={handleSubmit1} className="space-y-4">
            <AsyncSelect 
              label="Assignee"
              id="assignee"
              loadOptions={useCallback(loadUsers, [])}
              {...getFieldProps1('assignee')}
            />
            {/* FIX: Explicitly pass `value` to CreatableSelect to satisfy its props interface,
                as `getFieldProps` returns a union type that TypeScript cannot fully resolve when spread. */}
            <CreatableSelect
              label="Tag"
              id="tag"
              options={tags}
              onCreate={handleCreateTag}
              {...getFieldProps1('tag')}
              value={values1.tag}
            />
            <div className="flex justify-end pt-2">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </ComponentSection>

        <ComponentSection title="Multi-Select (Checkbox)">
           <form onSubmit={handleSubmit2} className="space-y-4">
             <MultiSelect
                label="Team Members"
                id="teamMembers"
                options={projectOptions}
                selectedValues={values2.teamMembers}
                onChange={(selected) => setValues2(prev => ({ ...prev, teamMembers: selected }))}
                error={getFieldProps2('teamMembers').error}
             />
             <div className="flex justify-end pt-2">
              <Button type="submit">Save Team</Button>
            </div>
           </form>
        </ComponentSection>

        <ComponentSection title="Country & Radio Select">
            <form onSubmit={handleSubmit3} className="space-y-4">
                <CountrySelect label="Location" {...getFieldProps3('country')} />
                {/* FIX: Explicitly pass `value` to RadioSelect to satisfy its props interface,
                    as `getFieldProps` returns a union type that TypeScript cannot fully resolve when spread. */}
                <RadioSelect
                    label="Priority"
                    options={[
                        {value: 'low', label: 'Low'},
                        {value: 'medium', label: 'Medium'},
                        {value: 'high', label: 'High'},
                    ]}
                    {...getFieldProps3('priority')}
                    value={values3.priority}
                />
                 <div className="flex justify-end pt-2">
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </ComponentSection>

        <ComponentSection title="Autocomplete & Popup Select">
            <div className="space-y-4">
                <AutocompleteSelect
                    label="Search Project (Autocomplete)"
                    id="autocomplete-project"
                    placeholder="Type to search..."
                    options={projectOptions}
                />
                <div>
                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">Popup Select</label>
                    <Button variant="secondary" onClick={() => setPopupSelectOpen(true)}>Open Select in Modal</Button>
                </div>
                 <Modal isOpen={isPopupSelectOpen} onClose={() => setPopupSelectOpen(false)} title="Select an Option">
                    <Select
                        label="Project Status"
                        id="popup-status"
                        options={[
                            {value: 'active', label: 'Active'},
                            {value: 'archived', label: 'Archived'},
                        ]}
                    />
                </Modal>
            </div>
        </ComponentSection>
      </div>
    </div>
  );
};

export default AdvancedSelects;
