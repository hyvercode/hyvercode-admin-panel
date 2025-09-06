
import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/overlay/Modal';
import Drawer from '../components/ui/overlay/Drawer';
import Tooltip from '../components/ui/Tooltip';
import { useToast } from '../contexts/ToastContext';

const Overlays: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { addToast } = useToast();

    return (
        <div>
            <PageHeader
                title="Overlays"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Overlays', path: '/admin/components/overlays' }]}
            />
            <Card>
                <Card.Header><h3 className="font-semibold">Overlay Components</h3></Card.Header>
                <Card.Body className="space-y-6">
                    {/* Modal */}
                    <div>
                        <h4 className="font-medium mb-2">Modal</h4>
                        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            title="Terms of Service"
                            footer={
                                <>
                                    <Button variant="secondary" onClick={() => setModalOpen(false)}>Decline</Button>
                                    <Button onClick={() => setModalOpen(false)}>Accept</Button>
                                </>
                            }
                        >
                            <p>This is the content of the modal. You can put any React components here.</p>
                        </Modal>
                    </div>

                     {/* Drawer */}
                    <div>
                        <h4 className="font-medium mb-2">Drawer</h4>
                        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
                        <Drawer
                            isOpen={isDrawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            title="Notifications"
                        >
                            <p>This is the content of the drawer. Perfect for side panels, settings, or notifications.</p>
                        </Drawer>
                    </div>

                    {/* Toasts */}
                     <div>
                        <h4 className="font-medium mb-2">Toasts (Notifications)</h4>
                        <div className="flex flex-wrap gap-2">
                            <Button onClick={() => addToast('This is an info toast.', 'info')}>Info Toast</Button>
                            <Button onClick={() => addToast('Action successful!', 'success')} variant="secondary">Success Toast</Button>
                            <Button onClick={() => addToast('Something might be wrong.', 'warning')} variant="secondary">Warning Toast</Button>
                            <Button onClick={() => addToast('An error occurred.', 'danger')} variant="danger">Error Toast</Button>
                        </div>
                    </div>
                    
                    {/* Tooltips */}
                    <div>
                        <h4 className="font-medium mb-2">Tooltips</h4>
                         <div className="flex flex-wrap gap-4">
                            <Tooltip content="Tooltip on top"><Button>Top</Button></Tooltip>
                            <Tooltip content="Tooltip on bottom" position="bottom"><Button>Bottom</Button></Tooltip>
                            <Tooltip content="Tooltip on left" position="left"><Button>Left</Button></Tooltip>
                            <Tooltip content="Tooltip on right" position="right"><Button>Right</Button></Tooltip>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Overlays;
