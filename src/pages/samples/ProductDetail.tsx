import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PRODUCTS_DATA, REVIEWS_DATA, USERS_DATA } from '../../constants';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import Image from '../../components/ui/image/Image';
import Carousel from '../../components/ui/content/Carousel';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Tabs from '../../components/ui/navigation/Tabs';
import CommentThread from '../../components/ui/CommentThread';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = PRODUCTS_DATA.find(p => p.id === parseInt(productId || ''));

  if (!product) {
    return <Navigate to="/sample/products" replace />;
  }
  
  // Use REVIEWS_DATA as mock comments for this product
  const productReviews = REVIEWS_DATA.map(review => ({ ...review, parentId: null }));

  return (
    <div className="container mx-auto px-6 py-8">
      <PageHeader
        title={product.name}
        breadcrumbs={[
            { name: 'Home', path: '/' }, 
            { name: 'Products', path: '/sample/products' },
            { name: product.name, path: `/sample/products/${product.id}` }
        ]}
      />
      <Card>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Carousel */}
            <div>
              <Carousel>
                <Image src={product.imageUrl} alt={product.name} aspectRatio="1/1" />
                <Image src={`${product.imageUrl}&grayscale`} alt={`${product.name} alternate view`} aspectRatio="1/1" />
                <Image src={`${product.imageUrl}&blur=2`} alt={`${product.name} detail view`} aspectRatio="1/1" />
              </Carousel>
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="success">In Stock</Badge>
              <h1 className="text-3xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">{product.name}</h1>
              <div className="flex items-center my-3">
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                  <i className="bi bi-star-fill text-warning-dark mr-1"></i>
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              </div>
              <p className="text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">${product.price.toFixed(2)}</p>
              <p className="text-neutral-700 dark:text-neutral-300 mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-6">
                <Select label="Color" id="color" options={[{value: 'black', label: 'Midnight Black'}]} />
                <Select label="Size" id="size" options={[{value: 'm', label: 'Medium'}]} />
              </div>

              <div className="flex items-center gap-4">
                  <Button size="default" leftIcon={<i className="bi bi-cart-plus-fill"></i>}>Add to Cart</Button>
                  <Button to="/sample/checkout" size="default" variant="secondary">Buy Now</Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      {/* Tabs for Description, Specs, Reviews */}
      <Card className="mt-8">
        <Tabs tabs={[{id: 'desc', label: 'Description'}, {id: 'specs', label: 'Specifications'}, {id: 'reviews', label: `Reviews (${productReviews.length})`}]}>
            {(activeTab) => (
                <div className="p-4">
                    {activeTab === 'desc' && <p>{product.description}</p>}
                    {activeTab === 'specs' && (
                        <ul className="list-disc pl-5">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <li key={key}><strong>{key}:</strong> {value}</li>
                            ))}
                        </ul>
                    )}
                    {activeTab === 'reviews' && (
                        <CommentThread 
                            comments={productReviews}
                            onCommentSubmit={(text, parentId) => console.log('New review:', { text, parentId })}
                        />
                    )}
                </div>
            )}
        </Tabs>
      </Card>
    </div>
  );
};

export default ProductDetail;
