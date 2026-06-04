import { motion } from 'motion/react';
import { ArrowDown, Flame, Compass } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dynamic Forest Fog Tint Overlay */}
      <div className="absolute inset-0 bg-primary/45 backdrop-blur-[1px]" />

      {/* Hero content card */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Established badge with delicate leaf line */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="w-8 h-[1px] bg-inverse-primary/60" />
          <span className="font-sans text-[11px] md:text-xs text-inverse-primary font-bold tracking-[0.3em] uppercase">
            Est. 2024
          </span>
          <span className="w-8 h-[1px] bg-inverse-primary/60" />
        </motion.div>

        {/* Cinematic headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-md select-none"
        >
          Where Great Food <br />
          <span className="font-serif italic font-light text-inverse-primary tracking-wide">
            Meets Nature
          </span>
        </motion.h1>

        {/* Elegant narrative intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-sans text-base md:text-lg text-surface-container-low max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium"
        >
          Experience a sensory escape where organic minimalism meets culinary excellence. Discover
          flavors crafted from the earth, served in a sanctuary of quiet luxury.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
        >
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center justify-center gap-2 bg-surface text-primary font-sans font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-surface-container hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer shadow-lg group"
          >
            <Compass className="w-4 h-4 text-secondary group-hover:rotate-45 transition-transform duration-500" />
            Explore Menu
          </button>
          <button
            onClick={() => onNavigate('reservations')}
            className="flex items-center justify-center gap-2 border-2 border-surface hover:border-inverse-primary text-white font-sans font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          >
            <Flame className="w-4 h-4 text-inverse-primary group-hover:scale-110 transition-transform" />
            Reserve a Table
          </button>
        </motion.div>

        {/* Scroll cues */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          onClick={() => onNavigate('about')}
          className="mt-12 text-inverse-primary hover:text-white cursor-pointer flex flex-col items-center gap-2"
          aria-label="Scroll to narrative story"
        >
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60">
            Our Story
          </span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </div>

      {/* Forest bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  );
}
