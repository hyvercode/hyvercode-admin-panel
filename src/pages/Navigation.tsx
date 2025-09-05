import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Accordion from '../components/ui/navigation/Accordion';
import Breadcrumbs from '../components/ui/navigation/Breadcrumbs';
import Link from '../components/ui/navigation/Link';
import ListGroup from '../components/ui/navigation/ListGroup';
import Pagination from '../components/ui/navigation/Pagination';
import Tabs from '../components/ui/navigation/Tabs';
import Dropdown from '../components/ui/navigation/Dropdown';
import Button from '../components/ui/Button';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const Navigation: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(3);

  return (
    <div>
      <PageHeader
        title="Navigation Components"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Navigation', path: '/navigation' }]}
      />

      <ComponentSection title="Breadcrumbs">
        <Breadcrumbs items={[
          { name: 'Home', path: '/' },
          { name: 'Users', path: '/users' },
          { name: 'Profile', path: '/profile/1' },
        ]} />
      </ComponentSection>
      
      <ComponentSection title="Pagination">
        <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
      </ComponentSection>

      <ComponentSection title="Tabs">
        <Tabs tabs={[{id: 'a', label: 'Profile'}, {id: 'b', label: 'Settings'}]}>
          {(activeTab) => <p>Content for tab: {activeTab}</p>}
        </Tabs>
      </ComponentSection>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ComponentSection title="Accordion">
          <Accordion>
            <Accordion.Item title="What is this?">This is an accordion component.</Accordion.Item>
            <Accordion.Item title="How do I use it?">Just pass Accordion.Item components as children.</Accordion.Item>
            <Accordion.Item title="Can multiple be open?">Yes, with the `allowMultiple` prop.</Accordion.Item>
          </Accordion>
        </ComponentSection>
        
        <ComponentSection title="Dropdown">
            <Dropdown trigger={<Button rightIcon={<i className="bi bi-chevron-down"></i>}>Open Dropdown</Button>}>
                <Dropdown.Item icon={<i className="bi bi-gear-fill"></i>}>Settings</Dropdown.Item>
                <Dropdown.Item icon={<i className="bi bi-person-circle"></i>}>Profile</Dropdown.Item>
                <Dropdown.Item icon={<i className="bi bi-box-arrow-left"></i>}>Logout</Dropdown.Item>
            </Dropdown>
        </ComponentSection>
      </div>

       <ComponentSection title="List Group">
          <div className="max-w-sm">
            <ListGroup>
                <ListGroup.Item as="Link" to="/settings" active>Settings</ListGroup.Item>
                <ListGroup.Item as="button" onClick={() => alert('Profile clicked!')}>Profile</ListGroup.Item>
                <ListGroup.Item>Notifications</ListGroup.Item>
                <ListGroup.Item disabled>API (Disabled)</ListGroup.Item>
            </ListGroup>
          </div>
        </ComponentSection>

    </div>
  );
};

export default Navigation;
