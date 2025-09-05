import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Button from '../components/ui/Button';
import Image from '../components/ui/image/Image';
import Carousel from '../components/ui/content/Carousel';
import Badge from '../components/ui/Badge';
// FIX: Import the `Link` component to resolve the 'Cannot find name' error.
import Link from '../components/ui/navigation/Link';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const Content: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Content Components"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Content', path: '/content' }]}
      />
      
      <ComponentSection title="Enhanced Cards">
        <p className="mb-4">Cards now support `Header`, `Body`, and `Footer` sub-components for more complex layouts.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Simple Card */}
            <Card>
                <Card.Body>
                    <h4 className="font-bold text-lg">Simple Card</h4>
                    <p>This card only uses the Body component.</p>
                </Card.Body>
            </Card>
            {/* Card with Header/Footer */}
            <Card>
                <Card.Header>
                    <h4 className="font-bold text-lg">Card with Header & Footer</h4>
                </Card.Header>
                <Card.Body>
                    <p>This is the main content area of the card.</p>
                </Card.Body>
                <Card.Footer className="flex justify-end">
                    <Button size="sm">Learn More</Button>
                </Card.Footer>
            </Card>
            {/* Complex Card */}
             <Card>
                 <Image src="https://picsum.photos/seed/tech/400/200" alt="Tech" />
                 <Card.Body>
                    <Badge variant="primary">New Feature</Badge>
                    <h4 className="font-bold text-lg mt-2">Image Card</h4>
                    <p className="text-sm mt-1">This card integrates an image with a header, body and footer for a complete content block.</p>
                 </Card.Body>
                 <Card.Footer>
                    <Link to="#" className="text-sm font-semibold text-primary">Read article <i className="bi bi-arrow-right"></i></Link>
                 </Card.Footer>
            </Card>
        </div>
      </ComponentSection>
      
      <ComponentSection title="Carousel / Slider">
        <p className="mb-4">A slideshow component for cycling through elements like images or cards.</p>
        <div className="max-w-xl mx-auto">
            <Carousel>
                <Image src="https://picsum.photos/seed/carousel1/800/450" alt="Slide 1" aspectRatio="16/9"/>
                <Image src="https://picsum.photos/seed/carousel2/800/450" alt="Slide 2" aspectRatio="16/9"/>
                <Image src="https://picsum.photos/seed/carousel3/800/450" alt="Slide 3" aspectRatio="16/9"/>
            </Carousel>
        </div>
      </ComponentSection>

    </div>
  );
};

export default Content;
