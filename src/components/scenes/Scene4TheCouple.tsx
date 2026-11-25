import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { AmpersandSvg } from '../illustrations/AmpersandSvg';
import { inviteConfig } from '../../config/invite';

/**
 * Scene 4: The Couple (Hero Moment)
 * - Names set very large in Cormorant Garamond:
 *     - "[BRIDE_NAME]" on one line (whitespace-nowrap)
 *     - Animated gold ampersand (&) in the middle
 *     - "[GROOM_NAME]" below
 * - Letters reveal with soft upward mask
 * - Faint oversized interlocking monogram rotates on scroll
 * - Below: "request the pleasure of your company."
 */
export const Scene4TheCouple: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { couple, companyLead } = inviteConfig;

  // Scroll rotation for oversized background monogram (1 degree per scroll segment)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const monogramRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  // Framer Motion staggered letter reveal
  const getContainerVariants = (delay: number) => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.035,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  });

  const letterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const renderName = (name: string, delay: number) => (
    <motion.div
      className="inline-flex justify-center whitespace-nowrap overflow-hidden py-1 px-2 max-w-full"
      variants={getContainerVariants(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {name.split('').map((char, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block font-display text-3xl sm:text-4xl md:text-5xl font-normal text-maroon tracking-wider"
            variants={letterVariants}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );

  return (
    <section
      ref={containerRef}
      id="the-couple"
      className="scene-snap relative min-h-screen min-h-[100dvh] w-full bg-ivory text-maroon flex flex-col items-center justify-center px-4 sm:px-6 py-16 overflow-hidden select-none"
      aria-label="The Bride and Groom"
    >
      {/* Faint Oversized Interlocking Monogram in Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] text-gold"
        style={{ rotate: shouldReduceMotion ? 0 : monogramRotate }}
        aria-hidden="true"
      >
        <span className="font-display text-[200px] md:text-[300px] font-light tracking-tighter leading-none select-none">
          {couple.brideInitial}
          <span className="text-[120px] md:text-[180px] font-thin">&</span>
          {couple.groomInitial}
        </span>
      </motion.div>

      {/* Decorative hairline outer oval */}
      <div
        className="absolute w-[300px] h-[460px] md:w-[440px] md:h-[580px] rounded-[50%] border border-gold/15 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">
        {/* Bride's Name on ONE line */}
        <h1 className="w-full text-center overflow-x-hidden">
          {renderName(couple.bride, 0.1)}
        </h1>

        {/* Animated Gold Ampersand in the Middle */}
        <div className="my-2 sm:my-3">
          <AmpersandSvg size={54} />
        </div>

        {/* Groom's Name on ONE line */}
        <h1 className="w-full text-center overflow-x-hidden">
          {renderName(couple.groom, 0.45)}
        </h1>

        {/* Closing Line */}
        <motion.p
          className="font-display italic text-base md:text-lg text-maroon/80 font-normal tracking-wide mt-6 max-w-xs md:max-w-md"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {companyLead}
        </motion.p>
      </div>
    </section>
  );
};
