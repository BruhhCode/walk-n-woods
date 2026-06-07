import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuSectionProps {
  cart?: any[];
  onAddToCart?: (item: MenuItem) => void;
  onRemoveFromCart?: (item: MenuItem) => void;
  onOpenCart?: () => void;
}

export default function MenuSection(_: MenuSectionProps) {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <section id="menu" className="py-24 md:py-32 bg-surface-container-low relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="font-sans text-xs text-secondary uppercase tracking-[0.25em] font-bold block">The Menu</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary tracking-tight">Curated Culinary Collection</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed mt-2">An exclusive showcase of signature dishes, handcrafted drinks, and indulgent desserts that capture the essence of fine dining at Walk N Woods.</p>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MENU_ITEMS.map((item) => (
            <motion.div key={item.id} layout onClick={() => setSelected(item)} className="cursor-pointer rounded-3xl overflow-hidden shadow-lg border border-primary-container/10 bg-surface-container transition-transform hover:-translate-y-1">
              <div className="relative h-56 sm:h-64 lg:h-72">
                <img
                  src={item.image || 'https://res.cloudinary.com/dlimc6j71/image/upload/v1780679323/drankss_xhxzlc.png'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-base sm:text-lg text-inverse-primary font-bold">{item.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />

              <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} transition={{ duration: 0.25 }} className="relative bg-surface-container rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.18)] border border-primary-container/15">
                <div className="relative h-96 sm:h-[520px]">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-white/90 text-primary rounded-full w-10 h-10 flex items-center justify-center shadow">✕</button>
                </div>

                <div className="p-8 md:p-10 grid gap-6">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-primary font-bold mb-4">{selected.name}</h3>
                    {selected.description && <p className="text-on-surface-variant text-base leading-relaxed max-w-3xl">{selected.description}</p>}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
