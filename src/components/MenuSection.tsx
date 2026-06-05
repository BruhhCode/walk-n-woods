import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Info, Filter, Search, Sparkles, AlertCircle, ShoppingBag, Leaf, Heart } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onOpenCart: () => void;
}

export default function MenuSection({ cart, onAddToCart, onRemoveFromCart, onOpenCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAllergenFilter, setActiveAllergenFilter] = useState<string>('all');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle favorite dish
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Categories lookup
  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'chefsChoice', label: "Chef's Curations" },
    { id: 'main', label: 'Signature Mains' },
    { id: 'pizza-pasta', label: 'Stone Hearth & Pasta' },
    { id: 'salad', label: 'Foraged Salads' },
    { id: 'dessert', label: 'Sweet Finishes' },
  ];

  // Filters logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory === 'chefsChoice' && !item.isChefsChoice) return false;
      if (
        selectedCategory !== 'all' &&
        selectedCategory !== 'chefsChoice' &&
        item.category !== selectedCategory
      ) {
        return false;
      }

      // Allergen restriction toggle
      if (activeAllergenFilter === 'vegan' && !item.isVegan) return false;
      if (activeAllergenFilter === 'vegetarian' && !item.isVegetarian && !item.isVegan) return false;
      if (activeAllergenFilter === 'nutFree' && item.allergens.some((all) => all.includes('Nut'))) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIng;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, activeAllergenFilter]);

  // Check quantities in cart helper
  const getItemQtyInCart = (id: string) => {
    const item = cart.find((c) => c.menuItem.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="py-24 md:py-32 bg-surface-container-low relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Title Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-sans text-xs text-secondary uppercase tracking-[0.25em] font-bold block">
            The Menu
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary tracking-tight">
            Seasonal Signature Plates
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Browse our chef-curated visual menu, designed to showcase each dish with elegant imagery and refined naming.
          </p>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="bg-surface border border-primary-container/10 rounded-2xl p-6 mb-12 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category horizontal scroller */}
            <div className="flex items-center gap-2 overflow-x-auto scroller-hidden pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex-shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* In-situ search box */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, courses..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-surface-container border border-primary-container/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary placeholder-outline/80"
              />
            </div>
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-primary-container/5 text-xs font-semibold">
            <span className="text-on-surface-variant flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-secondary" /> Dietary Notes:
            </span>
            <button
              onClick={() => setActiveAllergenFilter(activeAllergenFilter === 'all' ? 'all' : 'all')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeAllergenFilter === 'all'
                  ? 'border-secondary/40 bg-secondary/10 text-secondary'
                  : 'border-primary-container/10 hover:border-primary-container/30 text-on-surface-variant'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveAllergenFilter(activeAllergenFilter === 'vegan' ? 'all' : 'vegan')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                activeAllergenFilter === 'vegan'
                  ? 'border-secondary bg-primary-container text-white'
                  : 'border-primary-container/10 hover:border-primary-container/30 text-on-surface-variant'
              }`}
            >
              <Leaf className="w-3 h-3 text-secondary" /> Vegan Only
            </button>
            <button
              onClick={() => setActiveAllergenFilter(activeAllergenFilter === 'vegetarian' ? 'all' : 'vegetarian')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeAllergenFilter === 'vegetarian'
                  ? 'border-secondary bg-primary-container text-white'
                  : 'border-primary-container/10 hover:border-primary-container/30 text-on-surface-variant'
              }`}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setActiveAllergenFilter(activeAllergenFilter === 'nutFree' ? 'all' : 'nutFree')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeAllergenFilter === 'nutFree'
                  ? 'border-secondary bg-primary-container text-white'
                  : 'border-primary-container/10 hover:border-primary-container/30 text-on-surface-variant'
              }`}
            >
              No Nut Allergens
            </button>
          </div>
        </div>

        {/* Menu Grid - With Bento Card logic representing Pizza centerpiece */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => {
            const isCenterpiece = item.id === 'm2'; // Pizza is centerpiece spanning 2 columns
            const inCartQty = getItemQtyInCart(item.id);

            return (
              <motion.div
                layout
                key={item.id}
                onClick={() => setSelectedMenuItem(item)}
                className={`bg-surface rounded-2xl overflow-hidden shadow-sm group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-primary-container/5 relative cursor-pointer flex flex-col justify-between ${
                  isCenterpiece ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div>
                  {/* Dish Image Wrapper */}
                  <div className={`relative overflow-hidden bg-[#f7f4eb] ${isCenterpiece ? 'h-72 lg:h-[420px]' : 'h-64'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {item.isChefsChoice && (
                        <span className="bg-primary/95 text-xs text-inverse-primary border border-inverse-primary/30 font-sans tracking-wide uppercase font-bold py-1.5 px-3.5 rounded-full shadow-lg flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-secondary" /> Chef's Choice
                        </span>
                      )}
                      {item.isVegan && (
                        <span className="bg-primary-container/95 text-xs text-white font-sans tracking-wider font-bold py-1 px-3 rounded-full flex items-center gap-1 shadow-md">
                          <Leaf className="w-3.5 h-3.5 text-secondary" /> Organic Vegan
                        </span>
                      )}
                    </div>

                    {/* Top Right Favorites & Info triggers */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-primary hover:text-white hover:bg-secondary cursor-pointer shadow transition-all duration-300"
                        aria-label="Add to favorites list"
                      >
                        <Heart
                          className={`w-4.5 h-4.5 ${
                            favorites.includes(item.id) ? 'fill-secondary text-secondary hover:text-white' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMenuItem(item);
                        }}
                        className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-primary hover:text-white hover:bg-primary cursor-pointer shadow transition-all duration-300"
                        aria-label="Details on ingredients"
                      >
                        <Info className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    {/* Glass backdrop blur label representing total added on image bottom */}
                    {inCartQty > 0 && (
                      <div className="absolute bottom-4 right-4 bg-primary/90 text-inverse-primary text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg border border-inverse-primary/25">
                        Selected: <span className="text-white font-sans">{inCartQty}</span>
                      </div>
                    )}
                  </div>

                  {/* Text Details Area */}
                  <div className={`p-6 ${isCenterpiece ? 'lg:p-10' : ''}`}>
                    <div className="mb-2">
                      <h3 className={`font-serif tracking-tight text-primary font-bold ${isCenterpiece ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className={`p-6 pt-0 flex items-center justify-between border-t border-primary-container/5 ${isCenterpiece ? 'lg:p-10 lg:pt-0' : ''}`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMenuItem(item);
                    }}
                    className="text-xs font-sans tracking-widest text-primary uppercase font-bold hover:text-secondary group flex items-center gap-1.5 cursor-pointer"
                  >
                    Sourcing story <Info className="w-3.5 h-3.5 text-secondary group-hover:scale-105 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {inCartQty > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFromCart(item);
                        }}
                        className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-dim hover:scale-105 transition-all text-primary font-bold text-sm cursor-pointer flex items-center justify-center shadow-inner"
                      >
                        -
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="inline-flex items-center gap-1 bg-primary-container hover:bg-primary hover:scale-105 text-white py-2 px-4 rounded-xl text-xs font-sans font-bold shadow hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-inverse-primary" /> Select Dish
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty state visualizer */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-surface border border-primary-container/10 rounded-2xl max-w-md mx-auto mt-6"
          >
            <AlertCircle className="w-12 h-12 text-secondary mx-auto mb-4 animate-bounce" />
            <h4 className="font-serif text-lg font-bold text-primary mb-1">No Matching Course</h4>
            <p className="font-sans text-sm text-on-surface-variant max-w-xs mx-auto">
              We couldn't locate dishes matching your specifications. Try loosening filters or typing another ingredient.
            </p>
          </motion.div>
        )}

        {/* Tasting Menu floating helper bar */}
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-lg bg-primary-container text-white py-4 px-6 rounded-2xl flex items-center justify-between shadow-2xl border border-white/15"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary text-secondary">
                <ShoppingBag className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="font-sans text-xs text-inverse-primary block font-bold tracking-wider uppercase">
                  Forest Tasting Basket
                </span>
                <span className="text-sm font-serif font-bold text-white">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} Selected Classes
                </span>
              </div>
            </div>
            
            <button
              onClick={onOpenCart}
              className="bg-surface text-primary border border-white hover:bg-inverse-primary font-sans text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-xl hover:scale-105 transition-all cursor-pointer"
            >
              Verify Pre-selection
            </button>
          </motion.div>
        )}

        {/* Detailed Modal Panel Slider */}
        <AnimatePresence>
          {selectedMenuItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dim backdrop */}
              <motion.div
                initial={{ opacity: 0 }}  
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMenuItem(null)}
                className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
              />

              {/* Modal window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-surface rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl z-10 border border-primary-container/10"
              >
                {/* Big full-bleed header image */}
                <div className="relative h-64 md:h-80 w-full">
                  <img
                    src={selectedMenuItem.image}
                    alt={selectedMenuItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/25" />
                  
                  {/* Top Close trigger */}
                  <button
                    onClick={() => setSelectedMenuItem(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-primary flex items-center justify-center font-bold font-sans hover:bg-primary hover:text-white cursor-pointer shadow transition-all duration-300"
                  >
                    ✕
                  </button>
                </div>

                {/* Content Block */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Title & Price heading */}
                  <div className="flex md:items-center justify-between gap-4 flex-col md:flex-row pb-4 border-b border-primary-container/10">
                    <div>
                      <h4 className="font-serif text-3xl font-bold text-primary tracking-tight">
                        {selectedMenuItem.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        {selectedMenuItem.isChefsChoice && (
                          <span className="bg-primary/10 text-primary text-[10px] font-sans tracking-wide uppercase font-bold py-1 px-2.5 rounded-full">
                            Chef's Pick
                          </span>
                        )}
                        {selectedMenuItem.isVegan && (
                          <span className="bg-primary-container/10 text-on-surface-variant text-[10px] font-sans font-bold py-0.5 px-2.5 rounded-full">
                            Vegan
                          </span>
                        )}
                        {selectedMenuItem.isVegetarian && (
                          <span className="bg-primary-container/10 text-on-surface-variant text-[10px] font-sans font-bold py-0.5 px-2.5 rounded-full">
                            Vegetarian
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-sans text-2xl font-bold text-secondary">
                      ${selectedMenuItem.price}
                    </span>
                  </div>

                  {/* Core Description */}
                  <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                    {selectedMenuItem.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Ingredients detail */}
                    <div className="space-y-2 bg-surface-container-low p-4 rounded-2xl border border-primary-container/5">
                      <h5 className="font-serif font-bold text-sm text-primary flex items-center gap-1.5">
                        <Leaf className="w-4 h-4 text-secondary" /> Organic Ingredients
                      </h5>
                      <ul className="space-y-1.5 text-xs text-on-surface-variant">
                        {selectedMenuItem.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0" /> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sourcing and Allergens detail */}
                    <div className="space-y-4">
                      {/* Allergens warning */}
                      <div className="space-y-2 bg-error-container/10 p-4 rounded-2xl border border-error/5">
                        <h5 className="font-serif font-bold text-sm text-primary flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-error" /> Allergens Warning
                        </h5>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {selectedMenuItem.allergens.length > 0
                            ? `Contains: ${selectedMenuItem.allergens.join(', ')}.`
                            : 'No core allergens declared. Please inform staff of any sensitive dietary needs.'}
                        </p>
                      </div>

                      {/* Add directly to Tasting loop inside Modal */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onAddToCart(selectedMenuItem);
                            setSelectedMenuItem(null);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl text-sm font-sans font-bold shadow hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-inverse-primary" /> Add to Order selection
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Local Sourcing Story */}
                  <div className="bg-primary/5 p-5 rounded-2xl border border-secondary/10 space-y-2">
                    <span className="font-sans text-[10px] tracking-wider text-secondary uppercase font-bold block">
                      The Wild Sourcing Narrative
                    </span>
                    <p className="font-sans text-xs text-primary leading-relaxed">
                      {selectedMenuItem.sourcing}
                    </p>
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
