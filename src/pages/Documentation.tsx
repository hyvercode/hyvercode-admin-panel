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

      {/* Buttons */}
      <ComponentSection title="Buttons">
        <div className="space-x-2 space-y-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="link">Link</Button>
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <CodeBlock>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="subtle">Subtle</Button>
<Button variant="link">Link</Button>
<Button variant="primary" isLoading>Loading</Button>
<Button variant="primary" disabled>Disabled</Button>`}</CodeBlock>
      </ComponentSection>

      {/* Inputs */}
      <ComponentSection title="Inputs & Selects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email Address" id="doc-email" placeholder="email@example.com" />
          <Select label="Project" id="doc-project" options={[{value: 'jira', label: 'Jira'}, {value: 'confluence', label: 'Confluence'}]} />
        </div>
        <CodeBlock>{`<Input label="Email Address" id="doc-email" />
<Select label="Project" id="doc-project" options={[...]} />`}</CodeBlock>
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