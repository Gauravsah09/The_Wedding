import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PetalRainProps {
  active: boolean;
  count?: number;
}

interface Petal {
  id: number;
  xStart: number; // percentage 0-100
  xEndDelta: number; // horizontal drift px
  delay: number;
  duration: number;
  rotateStart: number;
  rotateEnd: number;
  scale: number;
  color: string;
}

/**
 * Lightweight golden petal shower animation.
 * Hardware-accelerated (animating only transform & opacity).
 * Golden and saffron rose/marigold petals gently drifting downward.
 */
export const PetalRain: React.FC<PetalRainProps> = ({ active, count = 28 }) => {
  const shouldReduceMotion = useReducedMotion();

  const petals: Petal[] = useMemo(() => {
    const colors = ['#F28C28', '#FFE27A', '#C9A227', '#FFA64D', '#E5A93B'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      xStart: Math.random() * 96 + 2,
      xEndDelta: (Math.random() - 0.5) * 80,
      delay: Math.random() * 2.5,
      duration: 3.5 + Math.random() * 3,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
      scale: 0.6 + Math.random() * 0.7,
      color: colors[i % colors.length],
    }));
  }, [count]);

  if (!active) return null;

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-30 bg-gold/10 transition-opacity duration-1000 opacity-100" />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${petal.xStart}%`,
            width: 18,
            height: 24,
          }}
          initial={{
            y: -40,
            x: 0,
            opacity: 0,
            rotate: petal.rotateStart,
            scale: petal.scale,
          }}
          animate={{
            y: '105vh',
            x: petal.xEndDelta,
            opacity: [0, 0.9, 0.9, 0],
            rotate: petal.rotateEnd,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <svg
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          >
            {/* Curved organic petal shape */}
            <path
              d="M12 2 C18 6 22 14 20 22 C18 28 12 30 8 28 C4 24 2 16 6 8 C8 4 10 2 12 2 Z"
              fill={petal.color}
              opacity={0.88}
            />
            {/* Subtle inner vein */}
            <path
              d="M12 4 Q12 16 10 26"
              stroke="#FFFFFF"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
