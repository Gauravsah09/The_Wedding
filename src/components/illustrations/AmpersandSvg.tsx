import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AmpersandSvgProps {
  size?: number;
  className?: string;
  strokeColor?: string;
}

/**
 * Calligraphic antique gold Ampersand (&)
 * Smooth self-drawing stroke animation using Framer Motion.
 */
export const AmpersandSvg: React.FC<AmpersandSvgProps> = ({
  size = 54,
  className = '',
  strokeColor = '#C9A227',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const drawVariants: Record<string, any> = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: shouldReduceMotion ? 0.2 : 1.0, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size * 1.1}
        viewBox="-4 -4 68 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <motion.path
          d="M44 50 C38 54 31 54 24 49 C17 44 14 35 17 25 C19 15 28 8 36 12 C43 16 41 26 33 33 L18 47 C24 52 34 52 42 45 C47 41 49 35 48 31"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={drawVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        />
        {/* Terminal flourish dot */}
        <motion.circle
          cx="48"
          cy="31"
          r="2"
          fill={strokeColor}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: shouldReduceMotion ? 0.1 : 0.9, duration: 0.3 }}
        />
      </svg>
    </div>
  );
};
