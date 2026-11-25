import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GaneshaLineArt } from '../illustrations/GaneshaLineArt';

interface Scene0PreloaderProps {
  onOpen: () => void;
  isOpen: boolean;
}

/**
 * Scene 0: Preloader / Sacred Seal
 * - Ivory canvas
 * - Thin gold line draws the Ganesha outline (~2.5s stroke-dashoffset)
 * - "॥ श्री गणेशाय नमः ॥" fades in beneath
 * - Softly pulsing "Open Invitation" pill button
 */
export const Scene0Preloader: React.FC<Scene0PreloaderProps> = ({ onOpen, isOpen }) => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Reveal sacred chant after stroke draw starts
    const timer1 = setTimeout(() => setShowText(true), 1800);
    // Reveal button as drawing completes
    const timer2 = setTimeout(() => setShowButton(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.section
        key="scene0-seal"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory px-6 text-center select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        aria-label="Welcome and Sacred Invocation"
      >
        {/* Subtle decorative outer hairline border frame */}
        <div className="absolute inset-4 md:inset-8 border border-gold/25 pointer-events-none rounded-sm">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />
        </div>

        {/* Centered Sacred Ganesha Drawing */}
        <div className="relative mb-6 flex items-center justify-center">
          <GaneshaLineArt size={200} animated={true} duration={2.4} strokeWidth={1.8} />
        </div>

        {/* Sacred Devanagari Inscription */}
        <div className="min-h-[48px] flex items-center justify-center mb-8">
          {showText && (
            <motion.p
              className="font-devanagari text-xl md:text-2xl text-maroon tracking-widest font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
            >
              ॥ श्री गणेशाय नमः ॥
            </motion.p>
          )}
        </div>

        {/* Softly Pulsing Pill Button */}
        <div className="min-h-[56px] flex items-center justify-center">
          {showButton && (
            <motion.button
              type="button"
              onClick={onOpen}
              className="group relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-maroon text-ivory font-display text-lg tracking-widest uppercase border border-gold/60 shadow-lg cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                boxShadow: [
                  '0 4px 15px rgba(74, 14, 28, 0.2)',
                  '0 6px 25px rgba(201, 162, 39, 0.35)',
                  '0 4px 15px rgba(74, 14, 28, 0.2)',
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Open wedding invitation"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Open Invitation</span>
                <span className="text-gold text-sm transition-transform group-hover:translate-x-0.5">
                  ✦
                </span>
              </span>
            </motion.button>
          )}
        </div>
      </motion.section>
    </AnimatePresence>
  );
};
