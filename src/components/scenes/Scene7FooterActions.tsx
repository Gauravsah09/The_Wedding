import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, MessageCircle, Check, Copy } from 'lucide-react';
import { inviteConfig } from '../../config/invite';
import { shareInvitation } from '../../utils/share';
import { DecorativeHairline } from '../illustrations/DecorativeHairline';

/**
 * Scene 7: Footer & RSVP Actions
 * - Ivory canvas (#FAF6EE)
 * - "Share this invitation" (Web Share API with copy-link fallback & toast feedback)
 * - "Confirm your presence on WhatsApp" (wa.me link with prefilled RSVP message)
 * - Config field for the WhatsApp number
 * - Closing line: "With love, the families of [BRIDE_NAME] and [GROOM_NAME]."
 */
export const Scene7FooterActions: React.FC = () => {
  const { share, rsvp, familyClosing } = inviteConfig;
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const result = await shareInvitation({
      title: share.title,
      text: share.text,
      url: typeof window !== 'undefined' ? window.location.href : share.url,
    });

    if (result.method === 'copy' && result.success) {
      setToastMessage('Invitation link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // WhatsApp wa.me link URL-encoded
  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(
    rsvp.prefilledMessage
  )}`;

  return (
    <footer
      id="rsvp-actions"
      className="scene-snap relative min-h-screen min-h-[100dvh] w-full bg-ivory text-maroon flex flex-col items-center justify-between px-6 py-16"
      aria-label="RSVP and Sharing"
    >
      {/* Top Hairline Separator */}
      <div className="w-full flex justify-center pt-2">
        <DecorativeHairline width={220} animated={false} />
      </div>

      {/* Main Action Block */}
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-4 my-auto">
        <span className="text-xs font-display tracking-widest uppercase text-gold font-semibold">
          Warmest Welcome
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-maroon mb-2">
          Join Our Celebration
        </h3>

        {/* WhatsApp RSVP Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#1F6E43] text-white font-body text-sm font-medium tracking-wide shadow-md hover:bg-[#1A5C38] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
          aria-label="Confirm your attendance on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Confirm your presence on WhatsApp</span>
        </a>

        {/* Share Invitation Button */}
        <button
          type="button"
          onClick={handleShare}
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-maroon text-ivory font-body text-sm font-medium tracking-wide border border-gold/50 shadow-md hover:bg-maroon-light active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
          aria-label="Share this wedding invitation"
        >
          <Share2 className="w-4 h-4 text-gold" />
          <span>Share this invitation</span>
        </button>

        {/* Copy Link Direct Helper */}
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-maroon/70 hover:text-gold transition-colors focus:outline-none focus-visible:underline pt-1 cursor-pointer"
        >
          <Copy className="w-3 h-3" />
          <span>Or copy invitation link</span>
        </button>
      </div>

      {/* Closing Family Line */}
      <div className="text-center z-10 space-y-2 pb-6">
        <p className="font-display italic text-base md:text-lg text-maroon font-medium tracking-wide">
          {familyClosing}
        </p>
        <p className="font-display text-xs tracking-widest uppercase text-gold font-light">
          ॥ ॐ तत् सत् ॥
        </p>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon text-ivory text-xs font-body shadow-xl border border-gold/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-live="polite"
          >
            <Check className="w-4 h-4 text-gold" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
