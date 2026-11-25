import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MandalaHalo } from '../illustrations/MandalaHalo';

interface Scene1OpeningProps {
  isOpen: boolean;
}

/**
 * Scene 1: The Grand Opening Curtain
 * - Twin deep maroon (#4A0E1C) panels with fine gold mandala motifs
 * - Part left and right across ~1.4s with smooth ease-in-out
 * - Subtle parallax & gold edge border
 * - Scroll cue with bobbing chevron reveals at 1.5s
 */
export const Scene1Opening: React.FC<Scene1OpeningProps> = ({ isOpen }) => {
  const shouldReduceMotion = useReducedMotion();
  const [showScrollCue, setShowScrollCue] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowScrollCue(true), 1500);

      const handleScroll = () => {
        if (window.scrollY > 80) {
          setShowScrollCue(false);
        } else {
          setShowScrollCue(true);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isOpen]);

  const transitionConfig = {
    duration: shouldReduceMotion ? 0.3 : 1.4,
    ease: [0.65, 0.0, 0.35, 1.0], // smooth ease-in-out
  };

  return (
    <>
      {/* Grand Opening Panels (Left and Right) */}
      <div
        className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Left Maroon Panel */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-1/2 bg-maroon flex items-center justify-end overflow-hidden border-r border-gold/40 shadow-2xl"
          initial={{ x: 0 }}
          animate={{ x: isOpen ? '-102%' : 0 }}
          transition={transitionConfig}
        >
          {/* Half Mandala Line Art on edge */}
          <div className="absolute -right-44 transform scale-125 opacity-25">
            <MandalaHalo size={360} strokeColor="#C9A227" strokeWidth={1} />
          </div>
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-80" />
        </motion.div>

        {/* Right Maroon Panel */}
        <motion.div
          className="absolute top-0 right-0 bottom-0 w-1/2 bg-maroon flex items-center justify-start overflow-hidden border-l border-gold/40 shadow-2xl"
          initial={{ x: 0 }}
          animate={{ x: isOpen ? '102%' : 0 }}
          transition={transitionConfig}
        >
          {/* Half Mandala Line Art on edge */}
          <div className="absolute -left-44 transform scale-125 opacity-25">
            <MandalaHalo size={360} strokeColor="#C9A227" strokeWidth={1} />
          </div>
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-80" />
        </motion.div>
      </div>

      {/* Floating Scroll Cue at bottom */}
      {isOpen && showScrollCue && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none select-none text-maroon/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] font-display tracking-widest uppercase mb-1 font-semibold text-gold">
            Scroll to begin
          </span>
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 6, 0],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="w-4 h-4 text-gold stroke-[2.5]" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
