import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Icon from '../components/ui/icon/Icon';
import IconTile from '../components/ui/icon/IconTile';
import IconObject from '../components/ui/icon/IconObject';
import Button from '../components/ui/Button';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const Icons: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Icon Components"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Icons', path: '/icons' }]}
      />

      <ComponentSection title="Basic Icons">
        <p className="mb-4">Use the <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded">Icon</code> component with any name from the Bootstrap Icons library.</p>
        <div className="flex flex-wrap items-center gap-4 text-2xl text-neutral-800 dark:text-neutral-200">
          <Icon name="gear-fill" />
          <Icon name="check-circle-fill" className="text-success" />
          <Icon name="exclamation-triangle-fill" className="text-warning-dark" />
          <Icon name="shield-lock-fill" className="text-primary" />
          <Icon name="trash-fill" className="text-danger" />
        </div>
      </ComponentSection>

      <ComponentSection title="Icon Tiles">
        <p className="mb-4">The <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded">IconTile</code> component places an icon within a styled container.</p>
        <h4 className="font-semibold mb-2">Variants</h4>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <IconTile iconName="grid-1x2-fill" variant="primary" />
          <IconTile iconName="check-all" variant="success" />
          <IconTile iconName="exclamation-diamond-fill" variant="warning" />
          <IconTile iconName="x-octagon-fill" variant="danger" />
          <IconTile iconName="info-circle-fill" variant="info" />
        </div>
        <h4 className="font-semibold mb-2">Shapes & Sizes</h4>
        <div className="flex flex-wrap items-center gap-3">
          <IconTile iconName="gear-fill" variant="primary" size="sm" shape="circle" />
          <IconTile iconName="gear-fill" variant="primary" size="md" shape="circle" />
          <IconTile iconName="gear-fill" variant="primary" size="lg" shape="circle" />
          <IconTile iconName="people-fill" variant="success" size="sm" shape="square" />
          <IconTile iconName="people-fill" variant="success" size="md" shape="square" />
          <IconTile iconName="people-fill" variant="success" size="lg" shape="square" />
        </div>
      </ComponentSection>

      <ComponentSection title="Icon Object Layout">
        <p className="mb-4">The <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded">IconObject</code> component is perfect for feature lists.</p>
        <div className="space-y-4 max-w-md">
          <IconObject
            iconTileProps={{ iconName: 'shield-check', variant: 'success', shape: 'circle' }}
            title="Advanced Security"
            description="Your data is protected with end-to-end encryption."
          />
          <IconObject
            iconTileProps={{ iconName: 'cloud-arrow-up-fill', variant: 'primary', shape: 'circle' }}
            title="Cloud Backups"
            description="All changes are automatically saved to the cloud."
          >
            <Button size="sm" variant="secondary">Configure</Button>
          </IconObject>
        </div>
      </ComponentSection>
    </div>
  );
};

export default Icons;