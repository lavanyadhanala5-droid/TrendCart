import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { ProductDetailsView } from './components/ProductDetailsView';
import { CartView } from './components/CartView';
import { WishlistView } from './components/WishlistView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { activePage } = useStore();

  return (
    <main className="min-h-[calc(100vh-72px)] flex flex-col justify-between">
      <div className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'catalog' && <CatalogView />}
        {activePage === 'product-details' && <ProductDetailsView />}
        {activePage === 'cart' && <CartView />}
        {activePage === 'wishlist' && <WishlistView />}
        {activePage === 'checkout' && <CheckoutView />}
        {activePage === 'order-confirmation' && <OrderConfirmationView />}
        {activePage === 'contact' && <ContactView />}
      </div>
      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col selection:bg-stone-900 selection:text-white">
        <Navbar />
        <MainContent />
        <AuthModal />
        <ToastContainer />
      </div>
    </StoreProvider>
  );
}
