import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from './ui/image/Logo';
import { useCart } from '../contexts/CartContext';
import Button from './ui/Button';

const PublicHeader: React.FC = () => {
    const { cartItems, openCart } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="bg-neutral-0 dark:bg-neutral-1000 shadow-sm sticky top-0 z-20">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/"><Logo variant="full" /></Link>
                <div className="flex items-center gap-4">
                    <Link to="/sample/products" className="text-sm font-medium hover:text-primary">Catalog</Link>
                    <Link to="/sample/blog" className="text-sm font-medium hover:text-primary">Blog</Link>
                    <Button
                        onClick={openCart}
                        variant="subtle"
                        className="relative"
                    >
                        <i className="bi bi-cart-fill text-xl"></i>
                        {itemCount > 0 && (
                             <span className="absolute -top-1 -right-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-danger rounded-full">{itemCount}</span>
                        )}
                    </Button>
                     <Button to="/login">Admin Login</Button>
                </div>
            </nav>
        </header>
    );
};

const PublicFooter: React.FC = () => (
    <footer className="bg-neutral-0 dark:bg-neutral-1000 border-t dark:border-neutral-900">
        <div className="container mx-auto px-6 py-4 text-center text-neutral-600 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Admin Panel. All Rights Reserved.
        </div>
    </footer>
);


const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-1100">
        <PublicHeader />
        <main className="flex-grow">
            <Outlet />
        </main>
        <PublicFooter />
    </div>
  );
};

export default PublicLayout;
