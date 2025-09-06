
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../../constants';
import Button from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import Breadcrumbs from '../../components/ui/navigation/Breadcrumbs';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  
  const product = PRODUCTS_DATA.find(p => p.id === parseInt(productId || ''));

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`${quantity} x ${product.name} added to cart!`, 'success');
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-1100 py-8">
      <div className="container mx-auto px-6">
         <Breadcrumbs 
            className="mb-6"
            items={[
                { name: 'Home', path: '/' },
                { name: 'Catalog', path: '/sample/products' },
                { name: product.name, path: `/sample/products/${product.id}` }
            ]}
         />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">{product.category}</p>
            <p className="text-3xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>

            <div className="flex items-center mb-6">
              <span className="text-yellow-500 mr-2">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
              <span className="text-sm text-neutral-500">({product.reviewCount} reviews)</span>
            </div>

            <p className="mb-6">{product.description}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border rounded-md py-2 bg-neutral-0 dark:bg-neutral-1000"
                min="1"
              />
              <Button onClick={handleAddToCart} size="default" className="flex-grow" leftIcon={<i className="bi bi-cart-plus-fill"></i>}>
                Add to Cart
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Specifications</h3>
              <ul className="list-disc pl-5 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
