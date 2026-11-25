import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GaneshaLineArtProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  duration?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

/**
 * Geometric, minimal, single-weight gold line art of Lord Ganesha
 * Featuring: Mukut (crown), wide ears, curved trunk, Ekadanta (tusk),
 * sacred forehead Tilak, and small Modak.
 *
 * Strict reverence adherence:
 * Single continuous stroke visual balance, unobstructed and noble.
 */
export const GaneshaLineArt: React.FC<GaneshaLineArtProps> = ({
  size = 220,
  className = '',
  animated = false,
  duration = 2.5,
  strokeColor = '#C9A227',
  strokeWidth = 1.75,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If animated is requested and motion is not reduced, animate stroke draw
  const pathVariants: Record<string, any> = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : duration,
        ease: [0.45, 0.05, 0.55, 0.95],
      },
    },
  };

  const simpleFadeVariants: Record<string, any> = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      role="img"
      aria-label="Sacred line-art illustration of Lord Ganesha"
    >
      <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Mukuta (Sacred Crown) Top Kalasha */}
        <motion.path
          d="M100 16 L100 24 M96 22 L104 22"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
        />

        {/* Crown Tri-Tier Geometry */}
        <motion.path
          d="M100 24 L114 42 L86 42 Z"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 0.2 : 0 }}
        />
        <motion.path
          d="M82 42 Q100 38 118 42 L124 54 Q100 49 76 54 Z"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 0.4 : 0 }}
        />

        {/* Forehead Sacred Arch & Tilak */}
        <motion.path
          d="M74 54 Q100 50 126 54"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 0.6 : 0 }}
        />
        {/* Auspicious Trishul / Tilak mark */}
        <motion.path
          d="M100 58 L100 78 M95 65 Q100 70 105 65"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 0.7 : 0 }}
        />
        <motion.circle
          cx="100"
          cy="84"
          r="2.2"
          fill={strokeColor}
          variants={animated ? simpleFadeVariants : undefined}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.0 : 0 }}
        />

        {/* Left Ear (Spacious, elegant curve) */}
        <motion.path
          d="M76 54 C50 56 34 76 34 102 C34 126 52 142 76 138 C80 137 84 133 86 128"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 0.8 : 0 }}
        />
        {/* Left Inner Ear Fold */}
        <motion.path
          d="M52 86 C46 96 46 112 56 122"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.1 : 0 }}
        />

        {/* Right Ear (Graceful symmetric balance) */}
        <motion.path
          d="M124 54 C150 56 166 76 166 102 C166 126 148 142 124 138 C120 137 116 133 114 128"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 0.8 : 0 }}
        />
        {/* Right Inner Ear Fold */}
        <motion.path
          d="M148 86 C154 96 154 112 144 122"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.1 : 0 }}
        />

        {/* Head Contours and Brow Curves */}
        <motion.path
          d="M76 80 C84 76 92 84 96 92"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.0 : 0 }}
        />
        <motion.path
          d="M124 80 C116 76 108 84 104 92"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.0 : 0 }}
        />

        {/* The Sacred Trunk (Vakratunda sweeping majestically) */}
        <motion.path
          d="M96 92 C95 116 88 136 78 152 C68 168 62 178 72 192 C80 202 96 204 108 198 C116 193 118 182 112 176 C105 170 95 174 95 180"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.2 : 0 }}
        />
        <motion.path
          d="M104 92 C106 114 104 132 100 148 C96 160 90 166 94 172"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.4 : 0 }}
        />

        {/* Sacred Tusks: Ekadanta on Right (broken/scholar tusk), Complete on Left */}
        <motion.path
          d="M84 126 L76 130 L84 133"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.5 : 0 }}
        />
        <motion.path
          d="M116 126 L121 129"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.5 : 0 }}
        />

        {/* The Sweet Modak (delicate geometric delicacy) */}
        <motion.path
          d="M126 174 C122 170 122 163 128 158 C134 153 140 156 142 163 C144 170 138 176 132 176 Z"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.7 : 0 }}
        />
        <motion.path
          d="M128 162 L132 154 L136 162"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.8 : 0 }}
        />

        {/* Subtle base lotus pedestal hairline */}
        <motion.path
          d="M60 212 C80 208 120 208 140 212"
          variants={animated ? pathVariants : simpleFadeVariants}
          initial={animated ? 'hidden' : false}
          animate="visible"
          transition={{ delay: animated ? 1.9 : 0 }}
        />
      </g>
    </svg>
  );
};
