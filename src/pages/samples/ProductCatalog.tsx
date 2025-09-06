
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../../constants';
import Card from '../../components/ui/card/Card';
import Button from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import Image from '../../components/ui/image/Image';

const ProductCatalog: React.FC = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-1100">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Product Catalog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS_DATA.map(product => (
            <Card key={product.id}>
              <Link to={`/sample/products/${product.id}`}>
                <Image src={product.imageUrl} alt={product.name} aspectRatio="4/3" />
              </Link>
              <Card.Body>
                <h2 className="font-bold text-lg truncate">{product.name}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    <i className="bi bi-cart-plus-fill mr-2"></i>
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
