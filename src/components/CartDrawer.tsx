import { motion } from 'motion/react';
import { X, Trash2, CalendarCheck, HelpCircle, ShoppingBag, ArrowRight, Leaf } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onClearCart: () => void;
  onNavigateToBooking: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onNavigateToBooking,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalCost = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const tax = Number((totalCost * 0.0825).toFixed(2));
  const premiumWellnessFee = Number((totalCost * 0.1).toFixed(2)); // Wellness sustainability commission fee typical of CA luxury restaurants
  const totalSummary = (totalCost + tax + premiumWellnessFee).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/45 backdrop-blur-xs cursor-pointer"
      />

      {/* Slide-over panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-md h-full bg-surface shadow-2xl z-20 flex flex-col justify-between border-l border-primary-container/10"
      >
        {/* Sliding Header block */}
        <div className="p-6 border-b border-primary-container/10 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-secondary" />
            <h3 className="font-serif text-lg font-bold text-primary">Tasting Menu selection</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-outline hover:text-primary transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Items Scroller */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length > 0 ? (
            <>
              <div className="flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-outline">
                <span>Selected course</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="divide-y divide-primary-container/5 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex justify-between items-start gap-4 pt-4 first:pt-0"
                  >
                    {/* Tiny thumbnail frame */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-inner flex-shrink-0 border border-primary-container/5">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta labels */}
                    <div className="flex-1 space-y-1">
                      <h4 className="font-serif text-sm font-bold text-primary leading-snug">
                        {item.menuItem.name}
                      </h4>
                      <p className="font-sans text-xs text-secondary font-bold">
                        ${item.menuItem.price} <span className="text-outline">/ unit</span>
                      </p>

                      {/* Quantity controls inside Drawer */}
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => onRemoveFromCart(item.menuItem)}
                          className="w-6 h-6 rounded-lg bg-surface-container-high hover:bg-surface-dim hover:scale-105 active:scale-95 text-primary text-xs font-bold flex items-center justify-center cursor-pointer shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-sans text-xs font-black text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item.menuItem)}
                          className="w-6 h-6 rounded-lg bg-surface-container-high hover:bg-surface-dim hover:scale-105 active:scale-95 text-primary text-xs font-bold flex items-center justify-center cursor-pointer shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Single Course subtotal cost */}
                    <span className="font-serif text-sm font-bold text-primary">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sourcing warning note */}
              <div className="bg-primary-container/5 p-4 rounded-xl border border-secondary/10 flex items-start gap-2 text-xs text-on-surface-variant leading-relaxed">
                <Leaf className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <p>
                  Any tasting courses pre-orders selected are fully organic and prepared at correct temperature windows relative to your scheduled arrival.
                </p>
              </div>
            </>
          ) : (
            // Empty Cart frame
            <div className="text-center py-20 font-sans space-y-4">
              <ShoppingBag className="w-12 h-12 text-outline mx-auto stroke-1" />
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-primary">Pre-order basket Empty</h4>
                <p className="text-xs text-outline max-w-xs mx-auto">
                  Browse the Culinary Immersion Menu and add exquisite courses to construct your tasting experience.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-primary hover:bg-secondary text-white font-sans text-xs uppercase tracking-wider font-bold py-2.5 px-6 rounded-xl cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>

        {/* Pricing calculations total list & Call actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-primary-container/10 bg-surface-container-low space-y-4">
            <div className="space-y-2 text-sm font-sans text-on-surface-variant">
              <div className="flex justify-between">
                <span>Courses Subtotal</span>
                <span className="font-semibold text-primary">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-outline">
                <span>State Dinner Tax (8.25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-outline">
                <span>Kitchen Wellness Commission (10%)</span>
                <span className="flex items-center gap-1">
                  ${premiumWellnessFee.toFixed(2)} <HelpCircle className="w-3 h-3 text-secondary" />
                </span>
              </div>
              <div className="flex justify-between font-serif text-base font-bold text-primary pt-2 border-t border-primary-container/5">
                <span>Estimated Total Cost</span>
                <span className="text-secondary">${totalSummary}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToBooking();
                }}
                className="w-full bg-primary hover:bg-secondary text-white py-3.5 px-4 rounded-xl font-sans text-xs uppercase tracking-wider font-bold shadow hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-inverse-primary" /> Bond with Reservation Table
              </button>
              <button
                onClick={onClose}
                className="w-full text-center text-xs font-sans font-bold text-outline hover:text-primary py-2 cursor-pointer flex items-center justify-center gap-1 group"
              >
                Continue Selecting <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
