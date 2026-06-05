import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Award, Compass, ArrowRight, Sun, Sparkles, MapPin } from 'lucide-react';
import { ABOUT_IMAGE, STORIES } from '../data';

interface AboutProps {
  onNavigate: (sectionId: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [activeTab, setActiveTab] = useState(0);

  const icons = [
    <Leaf className="w-5 h-5 text-inverse-primary" />,
    <Sparkles className="w-5 h-5 text-inverse-primary" />,
    <Sun className="w-5 h-5 text-inverse-primary" />,
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-surface overflow-hidden text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Narrative Image Layout with decorative floating features */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[450px] md:h-[550px]"
            >
              <img
                src={ABOUT_IMAGE}
                alt="Walk n Woods sunlit rustic corner table detailing organic minimalism"
                className="w-full h-full object-cover tracking-tight hover:scale-105 transition-transform duration-1000"
              />
              {/* Internal Glassmorphism Overlay representing dappled sunlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rouned-xl glass-panel space-y-2 rounded-xl">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="font-sans text-xs uppercase tracking-widest font-bold text-black">
                    The Fireplace Alcove
                  </span>
                </div>
                <p className="font-sans text-xs text-black/80 leading-relaxed">
                  Our raw oak hardwood tables sit alongside handcrafted stone fireplaces and living forest moss installations.
                </p>
              </div>
            </motion.div>

            {/* Float badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-6 -right-6 lg:-right-10 bg-primary shadow-xl rounded-2xl p-5 border border-primary-container flex flex-col items-center gap-1 max-w-[140px] text-center hidden sm:flex : text-white tracking-tight leading-[1.1] drop-shadow-md select-none"
            >
              <Award className="w-8 h-8 text-inverse-primary animate-pulse : text-black tracking-tight leading-[1.1] drop-shadow-md select-none" />
              <span className="font-serif text-sm font-semibold text-black">Top Fine Dining</span>
              <span className="font-sans text-[9px] text-inverse-primary tracking-widest uppercase font-bold : text-black tracking-tight leading-[1.1] drop-shadow-md select-none">
                Dehradun 2011
              </span>
            </motion.div>
          </div>

          {/* Interactive Storyteller & Tab Navigator */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="space-y-3">
              <span className="font-sans text-xs text-white uppercase tracking-[0.25em] font-bold block tracking-tight leading-[1.1] drop-shadow-md select-none">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight tracking-tight leading-[1.1] drop-shadow-md select-none">
                A Sanctuary for the Senses
              </h2>
            </div>

            <p className="font-sans text-base md:text-lg text-white leading-relaxed tracking-tight leading-[1.1] drop-shadow-md select-none">
              At Walk n Woods, we believe that dining should be an immersive experience that grounds you
              in the present moment. Born from a desire to bring the serenity of the fine dining experience to the table,
              our restaurant offers a quiet retreat from the urban bustle.
            </p>

            {/* Interactive Story Tabs */}
            <div className="space-y-6">
              {/* Tab Selector buttons */}
              <div className="flex border-b border-primary-container/10 pb-2 gap-4 overflow-x-auto scroller-hidden">
                {STORIES.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => setActiveTab(idx)}
                    className={`pb-3 font-sans text-xs uppercase tracking-wider font-bold transition-all relative cursor-pointer flex-shrink-0 ${
                      activeTab === idx ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {story.title}
                    {activeTab === idx && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Window */}
              <div className="min-h-[140px] bg-surface-container-low/60 rounded-xl p-6 border border-primary-container/5 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                      {icons[activeTab]}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg font-bold text-white">
                        {STORIES[activeTab].title}
                      </h4>
                      <p className="font-sans text-sm text-white/80 leading-relaxed">
                        {STORIES[activeTab].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Secondary Sourcing / Story CTA */}
            <div className="flex flex-col sm:flex-row gap-6 mt-2 pt-4 border-t border-primary-container/5 items-start sm:items-center">
              <button
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 text-white font-bold font-sans text-sm tracking-wider hover:gap-3 transition-all group cursor-pointer"
              >
                <span>Discover the Menu</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('reservations')}
                className="inline-flex items-center gap-2 text-white font-bold font-sans text-sm tracking-wider hover:gap-3 transition-all group cursor-pointer"
              >
                <span>Reserve Cozy Corner</span>
                <Compass className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
