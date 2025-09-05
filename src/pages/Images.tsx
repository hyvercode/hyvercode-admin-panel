import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Image from '../components/ui/image/Image';
import Logo from '../components/ui/image/Logo';

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const Images: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Image & Logo Components"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Images & Logos', path: '/images' }]}
      />

      <ComponentSection title="Standard Image">
        <div className="max-w-md">
          <Image
            src="https://picsum.photos/seed/city/600/400"
            alt="A cityscape"
            caption="This is a standard image with a caption."
          />
        </div>
      </ComponentSection>

      <ComponentSection title="Aspect Ratios">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Image src="https://picsum.photos/seed/food/400/400" alt="Food" aspectRatio="1/1" caption="1:1 (Square)" />
          <Image src="https://picsum.photos/seed/nature/800/600" alt="Nature" aspectRatio="4/3" caption="4:3 (Landscape)" />
          <Image src="https://picsum.photos/seed/tech/1280/720" alt="Tech" aspectRatio="16/9" caption="16:9 (Widescreen)" />
          <Image src="https://picsum.photos/seed/arch/1050/450" alt="Architecture" aspectRatio="21/9" caption="21:9 (Cinematic)" />
        </div>
      </ComponentSection>

      <ComponentSection title="Rounded Corners">
        <div className="flex flex-wrap items-center gap-4">
          <Image src="https://picsum.photos/seed/animal/200/200" alt="Animal" rounded="md" className="w-48" />
          <Image src="https://picsum.photos/seed/people/200/200" alt="Person" rounded="lg" className="w-48" />
          <Image src="https://picsum.photos/seed/car/200/200" alt="Car" rounded="full" className="w-48" />
        </div>
      </ComponentSection>

      <ComponentSection title="Logo Variants">
        <div className="flex flex-col items-start gap-6">
          <Logo variant="full" />
          <div className="p-4 bg-neutral-1000 dark:bg-neutral-0 rounded-md">
            <Logo variant="full" />
          </div>
          <Logo variant="icon" />
        </div>
      </ComponentSection>
    </div>
  );
};

export default Images;