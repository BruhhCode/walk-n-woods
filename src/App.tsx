import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { MenuItem, CartItem } from './types';

// Importing beautiful components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lookupTrigger, setLookupTrigger] = useState(false);

  // Load cart from localStorage on first boot
  useEffect(() => {
    const savedCart = localStorage.getItem('wnw_cart_items');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart items:', err);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('wnw_cart_items', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (item: MenuItem) => {
    const existingIndex = cart.findIndex((c) => c.menuItem.id === item.id);
    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCartToStorage(updated);
    } else {
      saveCartToStorage([...cart, { menuItem: item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    const existingIndex = cart.findIndex((c) => c.menuItem.id === item.id);
    if (existingIndex !== -1) {
      const updated = [...cart];
      if (updated[existingIndex].quantity > 1) {
        updated[existingIndex].quantity -= 1;
        saveCartToStorage(updated);
      } else {
        const filtered = cart.filter((c) => c.menuItem.id !== item.id);
        saveCartToStorage(filtered);
      }
    }
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
    setIsCartOpen(false);
  };

  // Smooth scroll handler targeting components
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Booking Lookup switch block
  const handleOpenBookingsLookup = () => {
    setLookupTrigger(true);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-inverse-primary/30 selection:text-primary">
      {/* Dynamic Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        onOpenBookingsLookup={handleOpenBookingsLookup}
      />

      {/* Hero cinematic intro segment */}
      <Hero onNavigate={scrollToSection} />

      {/* Deep sensory story module */}
      <About onNavigate={scrollToSection} />

      {/* Featured menu category bento sections */}
      <MenuSection
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
