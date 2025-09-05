import React from 'react';
import { useCart } from '../contexts/CartContext';
import Drawer from './ui/overlay/Drawer';
import Button from './ui/Button';
import Image from './ui/image/Image';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Drawer isOpen={isCartOpen} onClose={closeCart} title="Shopping Cart">
      {cartItems.length > 0 ? (
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto -mx-4 px-4">
            <ul className="divide-y dark:divide-neutral-800">
              {cartItems.map(item => (
                <li key={item.id} className="py-4 flex">
                  <Image src={item.imageUrl} alt={item.name} className="w-16 h-16" rounded="md" />
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-neutral-900 dark:text-neutral-100">
                        <h3><Link to={`/sample/products/${item.id}`}>{item.name}</Link></h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                        className="w-16 text-center border rounded py-1 bg-neutral-100 dark:bg-neutral-900"
                      />
                      <div className="flex">
                        <Button variant="link" onClick={() => removeFromCart(item.id)}>Remove</Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 px-4 -mx-4">
            <div className="flex justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-neutral-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              {/* FIX: Removed unsupported 'as' prop. The 'to' prop correctly renders a Link component. */}
              <Button to="/sample/checkout" fullWidth onClick={closeCart}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <i className="bi bi-cart-x text-6xl text-neutral-400"></i>
            <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
            <p className="mt-1 text-sm text-neutral-500">Looks like you haven't added anything to your cart yet.</p>
            {/* FIX: Removed unsupported 'as' prop. The 'to' prop correctly renders a Link component. */}
            <Button to="/sample/products" className="mt-6" onClick={closeCart}>
                Continue Shopping
            </Button>
        </div>
      )}
    </Drawer>
  );
};

export default CartDrawer;
