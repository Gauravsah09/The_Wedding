import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GaneshaLineArt } from '../illustrations/GaneshaLineArt';
import { MandalaHalo } from '../illustrations/MandalaHalo';
import { inviteConfig } from '../../config/invite';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

/**
 * Scene 2: Sacred Invocation (Midnight Indigo Scene)
 * - Midnight indigo background (#12122B)
 * - Large Ganesha line-art centred
 * - Rotating mandala halo behind Ganesha (60s loop)
 * - Tiny upward drifting gold dust particles
 * - Line-by-line Devanagari shloka reveal with italic English meaning
 * - Dissolves smoothly into Ivory Scene 3
 */
export const Scene2Invocation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { shloka } = inviteConfig;

  // Tiny upward drifting gold dust particles
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: (i * 5.5) + (i % 3) * 2,
      size: 1.5 + (i % 3) * 0.75,
      duration: 6 + (i % 4) * 2,
      delay: (i % 5) * 1.2,
    }));
  }, []);

  return (
    <section
      id="invocation"
      className="scene-snap relative min-h-screen min-h-[100dvh] w-full bg-indigo text-ivory flex flex-col items-center justify-center px-6 py-16 overflow-hidden select-none"
      aria-label="Sacred Invocation of Lord Ganesha"
    >
      {/* Upward Drifting Gold Dust Particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-gold/75"
              style={{
                left: `${p.x}%`,
                bottom: '-20px',
                width: p.size,
                height: p.size,
                boxShadow: '0 0 6px #C9A227',
              }}
              animate={{
                y: ['0vh', '-110vh'],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Centered Composition: Mandala Halo + Ganesha */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Slowly Rotating Mandala Halo (60s loop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="mandala-spin-slow">
            <MandalaHalo size={340} opacity={0.35} strokeColor="#C9A227" strokeWidth={0.85} />
          </div>
        </div>

        {/* Sacred Ganesha Line Art (Centred and unobstructed) */}
        <div className="relative z-10 drop-shadow-[0_0_15px_rgba(201,162,39,0.25)]">
          <GaneshaLineArt size={190} strokeColor="#C9A227" strokeWidth={1.8} />
        </div>
      </div>

      {/* Sacred Shloka: Line-by-line reveal */}
      <div className="max-w-xl text-center space-y-4 z-10 px-2">
        {/* Shloka Line 1 */}
        <motion.p
          className="font-devanagari text-xl md:text-2xl lg:text-3xl font-medium tracking-wide leading-relaxed text-ivory/95"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          {shloka.devanagariLine1}
        </motion.p>

        {/* Shloka Line 2 */}
        <motion.p
          className="font-devanagari text-xl md:text-2xl lg:text-3xl font-medium tracking-wide leading-relaxed text-ivory/95"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          {shloka.devanagariLine2}
        </motion.p>

        {/* Thin Gold Hairline Accent */}
        <motion.div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-4 opacity-75"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* English Translation in Italic */}
        <motion.p
          className="font-display italic text-sm md:text-base text-gold/90 tracking-wide font-light max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.0, delay: 0.9 }}
        >
          &ldquo;{shloka.englishMeaning}&rdquo;
        </motion.p>
      </div>

      {/* Smooth Transition Out: Dissolves into ivory scene 3 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-ivory pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
};
