import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface DecorativeHairlineProps {
  className?: string;
  width?: number | string;
  animated?: boolean;
}

/**
 * Antique gold ornamental hairline divider with central diamond and soft taper.
 */
export const DecorativeHairline: React.FC<DecorativeHairlineProps> = ({
  className = '',
  width = 240,
  animated = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div
      className={`relative flex items-center justify-center my-4 ${className}`}
      style={{ width }}
      aria-hidden="true"
    >
      <motion.div
        className="w-full flex items-center justify-center"
        variants={animated ? lineVariants : undefined}
        initial={animated ? 'hidden' : false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        style={{ transformOrigin: 'center' }}
      >
        <svg
          width="100%"
          height="16"
          viewBox="0 0 240 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Hairline with taper */}
          <line
            x1="10"
            y1="8"
            x2="108"
            y2="8"
            stroke="url(#hairlineGradLeft)"
            strokeWidth="1"
          />

          {/* Central Auspicious Diamond Motif */}
          <g transform="translate(120, 8)">
            <circle cx="0" cy="0" r="1.5" fill="#C9A227" />
            <path
              d="M0 -5 L5 0 L0 5 L-5 0 Z"
              stroke="#C9A227"
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="-12" cy="0" r="1" fill="#C9A227" opacity="0.6" />
            <circle cx="12" cy="0" r="1" fill="#C9A227" opacity="0.6" />
          </g>

          {/* Right Hairline with taper */}
          <line
            x1="132"
            y1="8"
            x2="230"
            y2="8"
            stroke="url(#hairlineGradRight)"
            strokeWidth="1"
          />

          <defs>
            <linearGradient id="hairlineGradLeft" x1="10" y1="8" x2="108" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
              <stop offset="100%" stopColor="#C9A227" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="hairlineGradRight" x1="132" y1="8" x2="230" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="1" />
              <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};
