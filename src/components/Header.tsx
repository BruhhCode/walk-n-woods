import  { useState, useEffect } from 'react';
import { Menu, X, Instagram, MapPin, MessageCircle } from 'lucide-react';
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
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex justify-between items-center text-white tracking-tight leading-[1.1] drop-shadow-md select-none">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-inverse-primary shadow-inner group-hover:scale-105 transition-all duration-300">
              <img src="https://res.cloudinary.com/dlimc6j71/image/upload/v1780811213/W_-_1_1_kwd3la.png" alt="Walk In Woods" className="w-15 h-15 object-contain" />
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold text-primary tracking-wide block leading-none text-white tracking-tight leading-[1.1] drop-shadow-md select-none">
                Walk In Woods
              </span>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-white font-semibold block mt-1 text-white tracking-tight leading-[1.1] drop-shadow-md select-none: text-white/90">
               EST. 2011
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 font-sans font-medium text-sm">
            <button
              onClick={() => handleLinkClick('hero')}
              className="text-white hover:text-secondary tracking-tight leading-[1.1] select-none transition-all cursor-pointer font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-secondary after:transition-all"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-white hover:text-secondary tracking-tight leading-[1.1] select-none transition-all cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-secondary after:transition-all"
            >
              Our Story
            </button>
            <button
              onClick={() => handleLinkClick('menu')}
              className="text-white hover:text-secondary tracking-tight leading-[1.1] select-none transition-all cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-secondary after:transition-all"
            >
              Menu
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open('https://api.whatsapp.com/send?phone=+917895423317&text=Hi%20Walk%20In%20Woods%2C%20I%20would%20like%20to%20learn%20more.', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-2 bg-[#25D366] text-slate-950 font-semibold px-4 py-2 rounded-full hover:bg-[#1DA851] transition-all"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => window.open('https://www.instagram.com/walkinwoodsfinedine/', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-2 bg-white text-slate-950 font-semibold px-4 py-2 rounded-full hover:bg-slate-100 transition-all"
                aria-label="Open Instagram"
              >
                <Instagram className="w-4 h-4" />
                Insta
              </button>
              <button
                onClick={() => window.open('https://maps.app.goo.gl/NmZg9TTS9Jwvz4Vr7', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-2 bg-white text-slate-950 font-semibold px-4 py-2 rounded-full hover:bg-slate-100 transition-all"
                aria-label="Open location"
              >
                <MapPin className="w-4 h-4" />
                Location
              </button>
            </div>
          </div>


            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-secondary transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
                className="py-3 text-white border-b border-primary-container/10 hover:text-secondary "
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick('about')}
                className="py-3 text-white border-b border-primary-container/10 hover:text-secondary"
              >
                Our Story
              </button>
              <button
                onClick={() => handleLinkClick('menu')}
                className="py-3 text-white border-b border-primary-container/10 hover:text-secondary"
              >
                Menu
              </button>
              <button
                onClick={() => handleLinkClick('reservations')}
                className="py-3 text-white border-b border-primary-container/10 hover:text-secondary"
              >
                Reservations
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingsLookup();
                }}
                className="py-3 text-white hover:text-secondary transition-colors font-semibold"
              >
                My Bookings Lookup
              </button>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open('https://api.whatsapp.com/send?phone=+919876543210&text=Hi%20Walk%20In%20Woods%2C%20I%20would%20like%20to%20learn%20more.', '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-slate-950 font-semibold py-3 rounded-full hover:bg-[#1DA851] transition-all"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open('https://www.instagram.com/walkinwoodsfinedine/', '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-slate-950 font-semibold py-3 rounded-full hover:bg-slate-100 transition-all"
                  aria-label="Open Instagram"
                >
                  <Instagram className="w-5 h-5" />
                  Insta
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open('https://maps.app.goo.gl/NmZg9TTS9Jwvz4Vr7', '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-slate-950 font-semibold py-3 rounded-full hover:bg-slate-100 transition-all"
                  aria-label="Open location"
                >
                  <MapPin className="w-5 h-5" />
                  Location
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
