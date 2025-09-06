
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Image from '../components/ui/image/Image';

const Images: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Images"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Images', path: '/admin/components/images' }]}
            />
            <div className="space-y-6">
                <Card>
                    <Card.Header><h3 className="font-semibold">Aspect Ratios</h3></Card.Header>
                    <Card.Body className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Image src="https://picsum.photos/seed/aspect1/800/800" alt="1:1" aspectRatio="1/1" />
                        <Image src="https://picsum.photos/seed/aspect2/800/600" alt="4:3" aspectRatio="4/3" />
                        <Image src="https://picsum.photos/seed/aspect3/1280/720" alt="16:9" aspectRatio="16/9" />
                        <Image src="https://picsum.photos/seed/aspect4/1680/720" alt="21:9" aspectRatio="21/9" />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header><h3 className="font-semibold">Shapes & Captions</h3></Card.Header>
                    <Card.Body className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                        <Image 
                            src="https://picsum.photos/seed/shape1/400/400" 
                            alt="Rounded MD"
                            rounded="md"
                        />
                         <Image 
                            src="https://picsum.photos/seed/shape2/400/400" 
                            alt="Rounded LG"
                            rounded="lg"
                        />
                         <Image 
                            src="https://picsum.photos/seed/shape3/400/400" 
                            alt="Rounded Full"
                            rounded="full"
                            aspectRatio="1/1"
                        />
                        <Image 
                            src="https://picsum.photos/seed/shape4/400/300" 
                            alt="With Caption"
                            caption="This is a sample image caption."
                        />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Images;
