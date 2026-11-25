import React from 'react';
import { motion } from 'framer-motion';

interface DiyaSvgProps {
  isLit: boolean;
  onToggle: () => void;
  index: number;
  size?: number;
}

/**
 * Traditional brass clay Diya (Deepak).
 * Features:
 * - Hand-crafted brass base with etched motifs
 * - Cotton wick tip
 * - Dynamic warm flame with radial glow & flickering animation when lit
 * - Minimum 48x48px accessible touch target
 */
export const DiyaSvg: React.FC<DiyaSvgProps> = ({
  isLit,
  onToggle,
  index,
  size = 64,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group relative flex flex-col items-center justify-end p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full transition-transform active:scale-95 cursor-pointer touch-manipulation"
      aria-label={`Sacred Diya ${index + 1}: ${isLit ? 'Lit and glowing' : 'Unlit. Tap to light divine lamp'}`}
      aria-pressed={isLit}
      style={{ minWidth: 56, minHeight: 72 }}
    >
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 80 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Flame Radiant Glow Filter */}
          <filter id={`flameGlow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Flame Gradient */}
          <linearGradient id={`flameGrad-${index}`} x1="40" y1="8" x2="40" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF8D6" />
            <stop offset="35%" stopColor="#FFA64D" />
            <stop offset="75%" stopColor="#F28C28" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>

          {/* Inner Flame Core */}
          <linearGradient id={`flameCore-${index}`} x1="40" y1="18" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF2A3" />
            <stop offset="100%" stopColor="#F28C28" />
          </linearGradient>

          {/* Diya Brass Gradient */}
          <linearGradient id="brassGrad" x1="16" y1="46" x2="64" y2="78" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0BC45" />
            <stop offset="50%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8C6A12" />
          </linearGradient>
        </defs>

        {/* Ambient Halo Behind Flame When Lit */}
        {isLit && (
          <motion.circle
            cx="40"
            cy="30"
            r="28"
            fill="url(#flameGrad-${index})"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.25, 0.4, 0.25], scale: [0.95, 1.08, 0.95] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="pointer-events-none"
          />
        )}

        {/* The Animated Flame */}
        {isLit ? (
          <g className="flame-active" filter={`url(#flameGlow-${index})`}>
            {/* Outer Flame Teardrop */}
            <path
              d="M40 8 C48 20 54 32 49 42 C46 48 34 48 31 42 C26 32 32 20 40 8 Z"
              fill={`url(#flameGrad-${index})`}
            />
            {/* Bright Inner Heart of Flame */}
            <path
              d="M40 18 C44 26 47 34 45 39 C43 43 37 43 35 39 C33 34 36 26 40 18 Z"
              fill={`url(#flameCore-${index})`}
            />
            {/* Subtle blue base for realistic oil flame */}
            <ellipse cx="40" cy="44" rx="4.5" ry="2" fill="#5E8FFF" opacity="0.65" />
          </g>
        ) : (
          /* Unlit cotton wick tip */
          <g>
            <path
              d="M40 40 Q41 35 43 32"
              stroke="#554433"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Tiny faint hint of readiness */}
            <circle cx="43" cy="32" r="1.5" fill="#C9A227" opacity="0.6" className="group-hover:opacity-100 transition-opacity" />
          </g>
        )}

        {/* The Brass Diya Vessel */}
        <g>
          {/* Upper Rim Lip */}
          <ellipse
            cx="40"
            cy="47"
            rx="28"
            ry="7"
            fill="url(#brassGrad)"
            stroke="#C9A227"
            strokeWidth="1"
          />
          {/* Oil Well Depression */}
          <ellipse
            cx="40"
            cy="47"
            rx="23"
            ry="4.5"
            fill="#5E1224"
            opacity="0.85"
          />
          {/* Diya Bowl Body */}
          <path
            d="M12 47 C14 66 26 76 40 76 C54 76 66 66 68 47 Z"
            fill="url(#brassGrad)"
            stroke="#C9A227"
            strokeWidth="1.2"
          />
          {/* Decorative Hairline Inlay on Bowl */}
          <path
            d="M20 54 Q40 66 60 54"
            stroke="#FAF6EE"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.7"
          />
          <path
            d="M26 62 Q40 70 54 62"
            stroke="#FFE27A"
            strokeWidth="0.8"
            opacity="0.6"
          />
          {/* Round Pedestal Base */}
          <path
            d="M30 76 L26 84 C26 86 54 86 54 84 L50 76 Z"
            fill="#8C6A12"
            stroke="#C9A227"
            strokeWidth="1"
          />
        </g>
      </svg>

      {/* Touch indicator / status hint */}
      <span
        className={`text-[10px] tracking-widest uppercase font-body mt-1 transition-colors ${
          isLit ? 'text-gold font-medium' : 'text-gray-400 group-hover:text-gold/75'
        }`}
      >
        {isLit ? 'Lit' : 'Light'}
      </span>
    </button>
  );
};
