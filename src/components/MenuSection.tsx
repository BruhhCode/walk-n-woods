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
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary tracking-tight">Visual Gallery</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed mt-2">A curated gallery of our signature dishes — tap any image to view full size.</p>
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {MENU_ITEMS.map((item) => (
            <motion.div key={item.id} layout onClick={() => setSelected(item)} className="cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-primary-container/10 bg-surface-container">
              <div className="relative h-44 sm:h-52 lg:h-56">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif text-sm text-inverse-primary font-bold">{item.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />

              <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} transition={{ duration: 0.25 }} className="relative bg-surface-container rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-primary-container/10">
                <div className="relative h-80">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-white/90 text-primary rounded-full w-9 h-9 flex items-center justify-center shadow">✕</button>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl text-primary font-bold mb-2">{selected.name}</h3>
                  {selected.description && <p className="text-on-surface-variant text-sm">{selected.description}</p>}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
