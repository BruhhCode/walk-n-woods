import  { useState, useEffect } from 'react';
import { Menu, X, Calendar, ShoppingBag, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenBookingsLookup: () => void;
}

export default function Header({ cart, onOpenCart, onNavigate, onOpenBookingsLookup }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-surface/90 backdrop-blur-md shadow-md py-4 border-b border-primary-container/5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-inverse-primary shadow-inner group-hover:scale-105 transition-all duration-300">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold text-primary tracking-wide block leading-none">
                Walk n Woods
              </span>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-secondary font-semibold block mt-1">
                FINE EST. 2024
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm">
            <button
              onClick={() => handleLinkClick('hero')}
              className="text-primary hover:text-secondary hover:translate-y-[-1px] transition-all cursor-pointer font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-secondary after:transition-all"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-on-surface-variant hover:text-primary hover:translate-y-[-1px] transition-all cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all"
            >
              Our Story
            </button>
            <button
              onClick={() => handleLinkClick('menu')}
              className="text-on-surface-variant hover:text-primary hover:translate-y-[-1px] transition-all cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all"
            >
              Menu
            </button>
            <button
              onClick={() => handleLinkClick('reservations')}
              className="text-on-surface-variant hover:text-primary hover:translate-y-[-1px] transition-all cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all"
            >
              Reservations
            </button>
            <button
              onClick={onOpenBookingsLookup}
              className="text-secondary hover:text-primary hover:translate-y-[-1px] transition-all cursor-pointer relative font-semibold"
            >
              Find Booking
            </button>
          </div>

          {/* Right Action Icons & Button */}
          <div className="flex items-center gap-4">
            {/* Pre-order Basket Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-primary hover:text-secondary hover:scale-105 transition-all cursor-pointer"
              aria-label="Tasting Pre-order basket"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-sans shadow">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Book A Table Premium Button */}
            <button
              onClick={() => handleLinkClick('reservations')}
              className="hidden md:flex items-center gap-2 bg-primary-container hover:bg-primary text-white font-sans text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-inverse-primary" />
              Book A Table
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary hover:text-secondary transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pt-24 pb-8 px-6 bg-surface z-40 md:hidden flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6 font-sans text-lg font-medium text-center">
              <button
                onClick={() => handleLinkClick('hero')}
                className="py-3 text-primary border-b border-primary/5 hover:text-secondary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick('about')}
                className="py-3 text-primary border-b border-primary/5 hover:text-secondary transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => handleLinkClick('menu')}
                className="py-3 text-primary border-b border-primary/5 hover:text-secondary transition-colors"
              >
                Culinary Immersion Menu
              </button>
              <button
                onClick={() => handleLinkClick('reservations')}
                className="py-3 text-primary border-b border-primary/5 hover:text-secondary transition-colors"
              >
                Book Reservations
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingsLookup();
                }}
                className="py-3 text-secondary hover:text-primary transition-colors font-semibold"
              >
                My Bookings Lookup
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
