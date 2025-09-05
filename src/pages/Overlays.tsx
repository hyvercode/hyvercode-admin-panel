import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Modal from '../components/ui/overlay/Modal';
import Drawer from '../components/ui/overlay/Drawer';
import { useToast } from '../contexts/ToastContext';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const Overlays: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { addToast } = useToast();

  return (
    <div>
      <PageHeader
        title="Overlay Components"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Overlays', path: '/overlays' }]}
      />

      <ComponentSection title="Modal / Dialog">
        <p className="mb-4">A classic modal dialog that appears over the page content.</p>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => { setModalOpen(false); addToast('Action confirmed!', 'success'); }}>Confirm</Button>
            </>
          }
        >
          <p className="text-neutral-800 dark:text-neutral-300">
            This is the main content of the modal. You can put any React components here.
          </p>
        </Modal>
      </ComponentSection>

      <ComponentSection title="Drawer / Side Panel">
        <p className="mb-4">A panel that slides in from the side of the screen.</p>
        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Navigation"
        >
          <p className="text-neutral-800 dark:text-neutral-300">
            Drawers are great for navigation, settings, or forms that shouldn't interrupt the main flow.
          </p>
          <Button fullWidth className="mt-4">Some Action</Button>
        </Drawer>
      </ComponentSection>
      
       <ComponentSection title="Toast / Snackbar Notifications">
        <p className="mb-4">Use the `useToast` hook to trigger non-intrusive notifications.</p>
        <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => addToast('This is an info toast.', 'info')}>
                Show Info Toast
            </Button>
             <Button variant="secondary" onClick={() => addToast('Your changes were saved.', 'success')}>
                Show Success Toast
            </Button>
             <Button variant="secondary" onClick={() => addToast('Please check your input.', 'warning')}>
                Show Warning Toast
            </Button>
            <Button variant="secondary" onClick={() => addToast('Failed to connect to server.', 'danger')}>
                Show Error Toast
            </Button>
        </div>
      </ComponentSection>

    </div>
  );
};

export default Overlays;
