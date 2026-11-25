import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GaneshaLineArt } from '../illustrations/GaneshaLineArt';
import { DiyaSvg } from '../illustrations/DiyaSvg';
import { PetalRain } from '../illustrations/PetalRain';
import { inviteConfig } from '../../config/invite';
import { triggerHaptic } from '../../utils/haptics';

/**
 * Scene 6: Light a Diya (Interactive Finale)
 * - Midnight indigo background (#12122B)
 * - Small Ganesha line-art at top (reverence rule honored)
 * - Five unlit diyas along bottom
 * - Each tap lights one with warm flicker, soft glow, and subtle haptic (navigator.vibrate)
 * - When all 5 are lit:
 *     - Golden petals rain gently
 *     - "गणपति बप्पा मोरया" fades in
 *     - "Your presence is our greatest blessing."
 */
export const Scene6LightDiya: React.FC = () => {
  const { diya } = inviteConfig;
  const [litState, setLitState] = useState<boolean[]>([false, false, false, false, false]);

  const allLit = litState.every(Boolean);

  const handleToggleDiya = (index: number) => {
    triggerHaptic(40);
    setLitState((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      // If this action lights the final unlit diya, trigger celebratory double haptic
      if (next.every(Boolean) && !prev.every(Boolean)) {
        setTimeout(() => triggerHaptic([50, 60, 50]), 200);
      }
      return next;
    });
  };

  const handleLightAll = () => {
    triggerHaptic([40, 50, 40]);
    setLitState([true, true, true, true, true]);
  };

  return (
    <section
      id="light-a-diya"
      className="scene-snap relative min-h-screen min-h-[100dvh] w-full bg-indigo text-ivory flex flex-col items-center justify-between px-4 py-12 md:py-16 select-none overflow-hidden"
      aria-label="Interactive Diya Lighting Blessing"
    >
      {/* Golden Petal Rain active when all five diyas are lit */}
      <PetalRain active={allLit} count={32} />

      {/* Top: Small Ganesha Line-Art (Reverence rule honored: centered, unobstructed) */}
      <div className="flex flex-col items-center z-10 pt-2">
        <div className="opacity-90 drop-shadow-[0_0_12px_rgba(201,162,39,0.35)]">
          <GaneshaLineArt size={90} strokeColor="#C9A227" strokeWidth={1.75} />
        </div>
        <p className="font-devanagari text-xs text-gold/80 tracking-widest mt-1">
          ॥ ॐ गं गणपतये नमः ॥
        </p>
      </div>

      {/* Middle: Blessing reveal OR instructional invitation */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 max-w-md px-4 py-6">
        {allLit ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          >
            {/* Sacred Victory Chanting */}
            <motion.h3
              className="font-devanagari text-2xl sm:text-3xl md:text-4xl font-semibold text-gold tracking-wide leading-relaxed drop-shadow-[0_0_15px_rgba(201,162,39,0.4)]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {diya.devaMantra}
            </motion.h3>

            <motion.p
              className="font-display italic text-lg sm:text-xl text-ivory/95 font-light leading-relaxed max-w-sm mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              &ldquo;{diya.blessingText}&rdquo;
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-display tracking-widest uppercase text-gold">
              Divine Offering
            </span>
            <p className="font-display italic text-base sm:text-lg text-ivory/80 font-light">
              {diya.instruction}
            </p>
            <p className="text-[11px] font-body text-ivory/50 tracking-wider">
              ({litState.filter(Boolean).length} of 5 lamps illuminated)
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom: Five Interactive Diyas */}
      <div className="w-full flex flex-col items-center z-10 pb-4">
        <div
          className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 px-2 py-4"
          role="group"
          aria-label="Five sacred lamps"
        >
          {litState.map((isLit, idx) => (
            <DiyaSvg
              key={idx}
              index={idx}
              isLit={isLit}
              onToggle={() => handleToggleDiya(idx)}
              size={56}
            />
          ))}
        </div>

        {/* Quick helper button to light all lamps */}
        {!allLit && (
          <button
            type="button"
            onClick={handleLightAll}
            className="mt-2 text-[11px] font-display uppercase tracking-widest text-gold/70 hover:text-gold transition-colors focus:outline-none focus-visible:underline cursor-pointer"
          >
            Light all at once ✦
          </button>
        )}
      </div>
    </section>
  );
};
