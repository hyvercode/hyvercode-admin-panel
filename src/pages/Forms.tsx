
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import FormSimple from '../components/ui/form/FormSimple';
import FormComplex from '../components/ui/form/FormComplex';
import FormWithUpload from '../components/ui/form/FormWithUpload';
import FormWithDetailTable from '../components/ui/form/FormWithDetailTable';
import FormWizard from '../components/ui/form/FormWizard';
import FormTabs from '../components/ui/form/FormTabs';
import Tabs from '../components/ui/navigation/Tabs';

const Forms: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Forms"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Forms', path: '/admin/components/forms' }]}
            />
             <Tabs
                tabs={[
                    { id: 'simple', label: 'Simple & Complex' },
                    { id: 'layouts', label: 'Advanced Layouts' },
                ]}
            >
                {(activeTab) => (
                    <div>
                        {activeTab === 'simple' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <Card.Header><h3 className="font-semibold">Simple Form</h3></Card.Header>
                                    <Card.Body><FormSimple /></Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header><h3 className="font-semibold">Complex Form</h3></Card.Header>
                                    <Card.Body><FormComplex /></Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header><h3 className="font-semibold">Form with Image Upload</h3></Card.Header>
                                    <Card.Body><FormWithUpload /></Card.Body>
                                </Card>
                                 <Card>
                                    <Card.Header><h3 className="font-semibold">Form with Detail Table</h3></Card.Header>
                                    <Card.Body><FormWithDetailTable /></Card.Body>
                                </Card>
                            </div>
                        )}
                         {activeTab === 'layouts' && (
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <Card.Header><h3 className="font-semibold">Form Wizard</h3></Card.Header>
                                    <Card.Body><FormWizard /></Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header><h3 className="font-semibold">Tabbed Form</h3></Card.Header>
                                    <Card.Body><FormTabs /></Card.Body>
                                </Card>
                            </div>
                         )}
                    </div>
                )}
            </Tabs>
        </div>
    );
};

export default Forms;
