import { motion } from 'motion/react';
import { ArrowDown, Flame, Compass, Instagram, Mail, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden bg-surface"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dlimc6j71/image/upload/v1780679317/ChatGPT_Image_Apr_30_2026_02_48_28_PM_ksdve9.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dynamic Forest Fog Tint Overlay (subtle) */}
      <div className="absolute inset-0 bg-primary/12 backdrop-blur-sm pointer-events-none" />

      {/* Hero content card */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-8 bg-surface-container/95 rounded-[3rem] p-10 shadow-2xl border border-primary-container/20">
        {/* Established badge with delicate leaf line */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl font-bold text-primary tracking-tight leading-[1.1] select-none"
        >
          <span className="w-8 h-[1px] bg-primary/20 mx-auto mb-3 block" />
          <span className="font-sans text-[11px] md:text-xs text-secondary font-bold tracking-[0.3em] uppercase">
            Est. 2011
          </span>
          <span className="w-8 h-[1px] bg-primary/20 mx-auto mt-3 block" />
        </motion.div>

        {/* Cinematic headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl text-white font-bold tracking-tight leading-[1.1] select-none"
        >
          Where Every Meal  <br />
          <span className="font-serif text-white/90 italic font-light tracking-wide">
            Becomes a Memory
          </span>
        </motion.h1>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
        >
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center justify-center gap-2 bg-primary text-white font-sans font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-forest-deep hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          >
            <Compass className="w-4 h-4 text-inverse-primary group-hover:rotate-45 transition-transform duration-500" />
            Explore Menu
          </button>
          <div className="flex items-center gap-3 sm:ml-2">
            <button
              onClick={() => window.open('https://instagram.com/walknwoods', '_blank')}
              aria-label="Open socials"
              title="Follow us"
              className="w-10 h-10 flex items-center justify-center bg-surface/80 text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              aria-label="Contact us"
              title="Contact"
              className="w-10 h-10 flex items-center justify-center bg-surface/80 text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('location')}
              aria-label="Find us"
              title="Location"
              className="w-10 h-10 flex items-center justify-center bg-surface/80 text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>
          </motion.div>

        {/* Scroll cues */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          onClick={() => onNavigate('about')}
          className="mt-12 text-primary/80 hover:text-primary cursor-pointer flex flex-col items-center gap-2"
          aria-label="Scroll to narrative story"
        >
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
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
