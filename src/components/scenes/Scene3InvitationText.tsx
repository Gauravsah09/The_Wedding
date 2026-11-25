import React from 'react';
import { motion } from 'framer-motion';
import { MarigoldGarland } from '../illustrations/MarigoldGarland';
import { DecorativeHairline } from '../illustrations/DecorativeHairline';
import { inviteConfig } from '../../config/invite';

/**
 * Scene 3: The Invitation Text
 * - Ivory background (#FAF6EE)
 * - Centered serif text revealing line by line on scroll:
 *   "With the blessings of Lord Ganesha and our elders,"
 *   "[FATHER_NAME] & [MOTHER_NAME]"
 *   "joyfully invite you to celebrate the wedding of"
 * - Hairline gold rule draws beneath
 * - Marigold garland SVGs sway gently at top corners (subtle, 6s loop)
 */
export const Scene3InvitationText: React.FC = () => {
  const { eldersBlessing, parents, invitationLead } = inviteConfig;

  return (
    <section
      id="invitation-text"
      className="scene-snap relative min-h-screen min-h-[100dvh] w-full bg-ivory text-maroon flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
      aria-label="Formal Invitation from the Family"
    >
      {/* Top Left Swaying Marigold Garland */}
      <div className="absolute top-0 left-0 z-10">
        <MarigoldGarland orientation="left" size={130} />
      </div>

      {/* Top Right Swaying Marigold Garland */}
      <div className="absolute top-0 right-0 z-10">
        <MarigoldGarland orientation="right" size={130} />
      </div>

      {/* Centered Invitation Body */}
      <div className="max-w-lg text-center z-10 space-y-6">
        {/* Subtle auspicious symbol */}
        <motion.div
          className="text-gold text-lg select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          ✦ &nbsp; ॐ &nbsp; ✦
        </motion.div>

        {/* Line 1: Blessings */}
        <motion.p
          className="font-display italic text-lg md:text-xl text-maroon/80 tracking-wide font-normal leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          {eldersBlessing}
        </motion.p>

        {/* Line 2: Host Parents (Larger Serif Display) */}
        <motion.div
          className="space-y-1 py-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-maroon tracking-wider">
            {parents.father} <span className="text-gold font-normal">&amp;</span> {parents.mother}
          </h2>
        </motion.div>

        {/* Line 3: Invitation Lead */}
        <motion.p
          className="font-display text-base md:text-lg text-maroon/80 tracking-widest uppercase font-light"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          {invitationLead}
        </motion.p>

        {/* Hairline Gold Rule Draws Beneath */}
        <div className="flex justify-center pt-2">
          <DecorativeHairline width={220} animated={true} />
        </div>
      </div>
    </section>
  );
};
