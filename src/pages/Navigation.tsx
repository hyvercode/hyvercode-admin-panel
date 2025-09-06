
import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Breadcrumbs from '../components/ui/navigation/Breadcrumbs';
import Pagination from '../components/ui/navigation/Pagination';
import Accordion from '../components/ui/navigation/Accordion';
import ListGroup from '../components/ui/navigation/ListGroup';
import { Link as RouterLink } from 'react-router-dom';
import Link from '../components/ui/navigation/Link';

const Navigation: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>
            <PageHeader
                title="Navigation"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Navigation', path: '/admin/components/navigation' }]}
            />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="space-y-6">
                    <Card>
                        <Card.Header><h3 className="font-semibold">Breadcrumbs</h3></Card.Header>
                        <Card.Body>
                            <Breadcrumbs items={[
                                { name: 'Home', path: '#' },
                                { name: 'Products', path: '#' },
                                { name: 'Laptops', path: '#' }
                            ]} />
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header><h3 className="font-semibold">Pagination</h3></Card.Header>
                        <Card.Body className="flex justify-center">
                            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header><h3 className="font-semibold">Links</h3></Card.Header>
                        <Card.Body className="space-x-4">
                           <Link to="#">Primary Link</Link>
                           <Link to="#" variant="subtle">Subtle Link</Link>
                        </Card.Body>
                    </Card>
                 </div>
                 <div className="space-y-6">
                    <Card>
                        <Card.Header><h3 className="font-semibold">Accordion</h3></Card.Header>
                        <Card.Body>
                            <Accordion defaultOpenIndex={0}>
                                <Accordion.Item title="What is React?">
                                    React is a free and open-source front-end JavaScript library for building user interfaces based on components.
                                </Accordion.Item>
                                <Accordion.Item title="What is Tailwind CSS?">
                                    Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Card>

                     <Card>
                        <Card.Header><h3 className="font-semibold">List Group</h3></Card.Header>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item as="Link" to="#" active>Dashboard</ListGroup.Item>
                                <ListGroup.Item as="button" onClick={() => alert('Clicked Profile')}>Profile</ListGroup.Item>
                                <ListGroup.Item as="Link" to="#">Settings</ListGroup.Item>
                                <ListGroup.Item disabled>Integrations (soon)</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                 </div>
             </div>
        </div>
    );
};

export default Navigation;
