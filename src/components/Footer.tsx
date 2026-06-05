import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Mail, ExternalLink, ArrowUp, Check, ShieldCheck, Leaf } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [subEmail, setSubEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Scroll smooth to top helper
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Newsletter simulated loop
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) return;

    setSubSuccess(true);
    setTimeout(() => {
      setSubEmail('');
      setSubSuccess(false);
    }, 4000);
  };

  // Copy app link to clipboard (using the runtime page URL)
  const handleCopyShareLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    });
  };

  return (
    <footer className="w-full py-24 bg-surface-container dark:bg-surface-container-high border-t border-surface-container-lowest relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="font-serif text-3xl font-bold text-primary block leading-none">
                Walk n Woods
              </span>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-secondary font-bold block">
                Where Great Food Meets Nature
              </span>
            </div>

            <p className="font-sans text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Experience an immersive culinary escape designed around organic minimalism, dapped forest lights, and the crackle of wood hearthest fires.
            </p>

            {/* Quick social sharing action sheet */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyShareLink}
                className="w-10 h-10 rounded-xl bg-surface border border-primary-container/10 flex items-center justify-center text-secondary hover:text-white hover:bg-secondary transition-all cursor-pointer shadow-sm relative group"
                aria-label="Copy tasting menu share link"
              >
                {shareSuccess ? <Check className="w-4 h-4 text-green-600 group-hover:text-white" /> : <Share2 className="w-4 h-4" />}
                
                {/* Micro tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-10">
                  {shareSuccess ? 'Copied Link!' : 'Share Menu Link'}
                </span>
              </button>

              <button
                onClick={() => {
                  window.location.href = 'mailto:reservations@walknwoods.com?subject=Inquiry';
                }}
                className="w-10 h-10 rounded-xl bg-surface border border-primary-container/10 flex items-center justify-center text-secondary hover:text-white hover:bg-primary transition-all cursor-pointer shadow-sm group relative"
                aria-label="Mailing support"
              >
                <Mail className="w-4 h-4" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-10">
                  Email Concierge
                </span>
              </button>
            </div>

            {/* Premium interactive subscription */}
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm mt-2">
              <span className="block font-sans text-xs uppercase tracking-wider font-bold text-primary">
                Join the Sanctuary Mailing List
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="Enter email for announcements"
                  className="flex-1 text-xs bg-surface border border-primary-container/10 focus:ring-1 focus:ring-secondary focus:border-secondary rounded-xl px-4 py-2.5 focus:outline-none placeholder-outline/80"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-secondary text-white font-sans text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-xl cursor-pointer shadow transition-all duration-300"
                >
                  Join
                </button>
              </div>

              <AnimatePresence>
                {subSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-[11px] font-sans font-semibold text-secondary flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> Securely Subscribed. Check your inbox for opening events.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Quick links list */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-widest font-bold text-primary block">
              Links
            </span>
            <div className="flex flex-col gap-3 text-sm text-on-surface-variant font-medium">
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer w-fit"
              >
                Our Sourcing Philosophy
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="hover:text-primary hover:translate-y-[-1px] transition-all text-left cursor-pointer w-fit"
              >
                Signature Pizzas & Pastas
              </button>
              <button
                onClick={() => onNavigate('reservations')}
                className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer w-fit"
              >
                Table Seats Booking
              </button>
              <a
                href="#reservations"
                className="hover:text-primary hover:translate-x-1 transition-all text-left flex items-center gap-1 cursor-pointer w-fit"
              >
                Careers Opportunities <ExternalLink className="w-3.5 h-3.5 text-secondary" />
              </a>
              <a
                href="#about"
                className="hover:text-primary hover:translate-y-[-1px] transition-all text-left flex items-center gap-1 cursor-pointer w-fit"
              >
                Sustainability Action <Leaf className="w-3.5 h-3.5 text-secondary" />
              </a>
            </div>
          </div>

          {/* Restaurant Coordinates */}
          <div className="md:col-span-4 flex flex-col gap-4 text-sm text-on-surface-variant">
            <span className="font-sans text-xs uppercase tracking-widest font-bold text-primary block">
              Restaurant Location
            </span>
            <div className="space-y-4">
              <p className="leading-relaxed font-sans max-w-xs">
                <span className="text-primary font-bold block"> 2nd FLOOR, CENNET TOWER, Sahastradhara Rd,</span>
                Green View Apartment, Aman Vihar, Dehradun, Uttarakhand 248001
              </p>

              <p className="leading-relaxed font-sans">
                <span className="text-primary font-bold block">Operating Hours</span>
                Monday - Sunday, 11:00 AM - 11:00 PM <br />
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and scrolling indicator */}
        <div className="mt-16 pt-8 border-t border-primary-container/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-outline text-center sm:text-left">
            © 2026 Walk n Woods. All rights reserved. 
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-primary hover:text-secondary hover:underline font-sans text-xs font-bold uppercase tracking-wider cursor-pointer group"
          >
            Back to Top <ArrowUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
