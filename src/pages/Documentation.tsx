import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import Avatar from '../components/ui/Avatar';
import Tooltip from '../components/ui/Tooltip';
import Table, { Column } from '../components/ui/Table';
import ButtonGroup from '../components/ui/ButtonGroup';
import SplitButton from '../components/ui/SplitButton';
import Dropdown from '../components/ui/Dropdown';
import Calendar from '../components/ui/Calendar';
import Checkbox from '../components/ui/Checkbox';
import { CALENDAR_EVENTS_DATA } from '../constants';

const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
  <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg mt-4 text-sm text-neutral-800 dark:text-neutral-200 overflow-x-auto">
    <code>{children.trim()}</code>
  </pre>
);

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const tableData = [
  { id: 1, name: 'Confluence', type: 'Software', status: 'Active' },
  { id: 2, name: 'Jira', type: 'Software', status: 'Active' },
  { id: 3, name: 'Bitbucket', type: 'Service', status: 'Inactive' },
];
const tableColumns: Column<(typeof tableData)[0]>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Status', accessor: item => <Badge variant={item.status === 'Active' ? 'success' : 'neutral'}>{item.status}</Badge> }
];


const Documentation: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Component Documentation"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Documentation', path: '/documentation' }]}
      />

       {/* Buttons - REVISED SECTION */}
      <ComponentSection title="Buttons">
        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Variants</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="link">Link</Button>
        </div>
        <CodeBlock>{`<Button variant="primary">Primary</Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">With Icons</h4>
         <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" leftIcon={<i className="bi bi-star-fill"></i>}>Left Icon</Button>
            <Button variant="secondary" rightIcon={<i className="bi bi-arrow-right"></i>}>Right Icon</Button>
        </div>
        <CodeBlock>{`<Button leftIcon={<i />} rightIcon={<i />}>...</Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Icon-only Buttons</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip content="Add Item">
            <Button variant="primary" size="icon" aria-label="Add Item"><i className="bi bi-plus-lg"></i></Button>
          </Tooltip>
          <Tooltip content="Settings">
            <Button variant="secondary" size="icon" aria-label="Settings"><i className="bi bi-gear-fill"></i></Button>
          </Tooltip>
          <Tooltip content="Delete">
            <Button variant="danger" size="icon" aria-label="Delete"><i className="bi bi-trash-fill"></i></Button>
          </Tooltip>
        </div>
        <CodeBlock>{`<Button size="icon" aria-label="..."><i /></Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Link Buttons</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Button to="/settings" variant="primary">Internal Link</Button>
          <Button href="https://google.com" target="_blank" variant="secondary">External Link</Button>
        </div>
        <CodeBlock>{`<Button to="/internal">...</Button>
<Button href="https://..." target="_blank">...</Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">States</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <CodeBlock>{`<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>`}</CodeBlock>
      </ComponentSection>

      {/* ButtonGroup and SplitButton */}
       <ComponentSection title="Button Groups & Split Buttons">
          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Button Group</h4>
          <ButtonGroup>
            <Button variant="secondary">Years</Button>
            <Button variant="secondary">Months</Button>
            <Button variant="secondary">Days</Button>
          </ButtonGroup>
          <CodeBlock>{`<ButtonGroup>
  <Button>...</Button>
  <Button>...</Button>
</ButtonGroup>`}</CodeBlock>

          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Split Button</h4>
          <SplitButton label="Primary Action" onClick={() => alert('Primary action!')}>
              <Dropdown.Item>Action One</Dropdown.Item>
              <Dropdown.Item>Action Two</Dropdown.Item>
              <Dropdown.Item>Another Action</Dropdown.Item>
          </SplitButton>
          <CodeBlock>{`<SplitButton label="Primary Action" onClick={...}>
  <Dropdown.Item>...</Dropdown.Item>
  <Dropdown.Item>...</Dropdown.Item>
</SplitButton>`}</CodeBlock>
      </ComponentSection>

      {/* Calendar */}
      <ComponentSection title="Calendar">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">A component to display events in a monthly view.</p>
        <Calendar events={CALENDAR_EVENTS_DATA.slice(0, 3)} />
        <CodeBlock>{`const myEvents = [
  { id: 1, title: 'Team Meeting', date: '2024-08-02', category: 'primary' },
  { id: 2, title: 'Product Launch', date: '2024-08-05', category: 'success' },
];
<Calendar events={myEvents} />`}</CodeBlock>
      </ComponentSection>

      {/* Form Controls */}
      <ComponentSection title="Form Controls">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Email Address" id="doc-email" placeholder="email@example.com" />
          <Select label="Project" id="doc-project" options={[{value: 'jira', label: 'Jira'}, {value: 'confluence', label: 'Confluence'}]} />
        </div>
        <div className="mt-6 space-y-4">
            <Checkbox id="doc-check-1" label="Default Checkbox" />
            <Checkbox id="doc-check-2" label="With Description" description="This is some helper text for the checkbox." />
            <Checkbox id="doc-check-3" label="Pre-checked" defaultChecked />
            <Checkbox id="doc-check-4" label="Disabled" disabled />
            <Checkbox id="doc-check-5" label="With Error" error="This field is required." />
        </div>
        <CodeBlock>{`{/* Input */}
<Input label="Email Address" id="doc-email" />

{/* Select */}
<Select label="Project" id="doc-project" options={[...]} />

{/* Checkbox */}
<Checkbox id="unique-id" label="My Label" />
<Checkbox id="desc-id" label="With Description" description="..." />
<Checkbox id="checked-id" label="Pre-checked" defaultChecked />
<Checkbox id="disabled-id" label="Disabled" disabled />
<Checkbox id="error-id" label="With Error" error="This field is required." />`}</CodeBlock>
      </ComponentSection>

      {/* Alerts & Badges */}
      <ComponentSection title="Alerts & Badges">
        <div className="space-y-4 mb-6">
            <Alert variant="info">This is an informational message.</Alert>
            <Alert variant="success">Your action was successful.</Alert>
            <Alert variant="warning">Please be aware of this warning.</Alert>
            <Alert variant="danger">An error occurred.</Alert>
        </div>
        <div className="space-x-2">
            <Badge variant="neutral">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
        </div>
        <CodeBlock>{`<Alert variant="info">...</Alert>
<Badge variant="success">Success</Badge>`}</CodeBlock>
      </ComponentSection>

       {/* Modal */}
      <ComponentSection title="Modal">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}>Confirm</Button></>}
        >
          <p>This is the content of the modal. You can put any React components here.</p>
        </Modal>
        <CodeBlock>{`<Modal isOpen={...} onClose={...} title="Sample Modal">...
</Modal>`}</CodeBlock>
      </ComponentSection>

      {/* Table */}
      <ComponentSection title="Table">
        <Table columns={tableColumns} data={tableData} />
        <CodeBlock>{`const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Type', accessor: 'type' },
  { header: 'Status', accessor: item => <Badge ... /> }
];
<Table columns={columns} data={data} />`}</CodeBlock>
      </ComponentSection>
      
      {/* Other Components */}
      <ComponentSection title="Other Components">
        <div className="flex items-center space-x-8">
            <div className="text-center"><p className="mb-2 text-sm">Avatar</p><Avatar name="Admin User" src="https://picsum.photos/100" /></div>
            <div className="text-center"><p className="mb-2 text-sm">Spinner</p><Spinner size="lg" /></div>
            <div className="text-center"><p className="mb-2 text-sm">Tooltip</p><Tooltip content="This is a tooltip!"><Button variant="subtle">Hover Me</Button></Tooltip></div>
        </div>
         <CodeBlock>{`<Avatar name="Admin User" />
<Spinner size="lg" />
<Tooltip content="..."><Button>...</Button></Tooltip>`}</CodeBlock>
      </ComponentSection>

      {/* Tabs */}
      <ComponentSection title="Tabs">
          <Tabs tabs={[{id: 'tab1', label: 'Tab One'}, {id: 'tab2', label: 'Tab Two'}]}>
              {(activeTab) => (
                  <div>
                      {activeTab === 'tab1' && <p>Content for Tab One.</p>}
                      {activeTab === 'tab2' && <p>Content for Tab Two.</p>}
                  </div>
              )}
          </Tabs>
          <CodeBlock>{`<Tabs tabs={[...]}>
  {(activeTab) => (
    //... render content based on activeTab
  )}
</Tabs>`}</CodeBlock>
      </ComponentSection>
      
    </div>
  );
};

export default Documentation;
