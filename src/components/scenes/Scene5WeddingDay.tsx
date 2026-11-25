import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CalendarPlus, Navigation } from 'lucide-react';
import { inviteConfig } from '../../config/invite';
import { useCountdown } from '../../hooks/useCountdown';
import { generateIcsFile } from '../../utils/calendar';

/**
 * Animated soft flip digit component for countdown
 */
const FlipDigit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-ivory-light border border-gold/30 rounded px-2.5 py-1.5 min-w-[50px] shadow-sm flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            className="font-display text-2xl md:text-3xl font-semibold text-maroon"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] md:text-[11px] font-body uppercase tracking-widest text-maroon/70 mt-1.5 font-medium">
        {label}
      </span>
    </div>
  );
};

/**
 * Scene 5: The Wedding Day & Venue Card
 * - Refined card on ivory with gold hairline border
 * - "The Wedding Day"
 * - Huge date numeral treatment for [DATE]
 * - [PLACE] beneath
 * - Buttons: "Get Directions" and "Add to Calendar" (.ics download)
 * - Soft-flipping live countdown (hidden gracefully if [DATE_ISO] is placeholder)
 */
export const Scene5WeddingDay: React.FC = () => {
  const { event } = inviteConfig;
  const countdown = useCountdown(event.dateIso);

  const handleDownloadCalendar = () => {
    generateIcsFile({
      title: event.calendarSummary,
      description: event.calendarDescription,
      location: event.venueAddress,
      dateIso: event.dateIso,
    });
  };

  return (
    <section
      id="wedding-day"
      className="scene-snap relative min-h-screen min-h-[100dvh] w-full bg-ivory text-maroon flex flex-col items-center justify-center px-4 py-16"
      aria-label="Event Details and Venue"
    >
      {/* Refined Wedding Card */}
      <motion.div
        className="relative w-full max-w-md bg-ivory-light border border-gold/45 rounded-sm p-6 sm:p-8 md:p-10 shadow-maroon-deep flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Double Gold Hairline Corner Flourishes */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/70" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/70" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/70" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/70" />

        {/* Section Header */}
        <span className="text-xs md:text-sm font-display tracking-ceremonial uppercase text-gold font-semibold mb-2">
          Save the Date
        </span>
        <h2 className="font-display text-2xl md:text-3xl text-maroon font-semibold tracking-wide mb-6">
          {event.title}
        </h2>

        {/* Huge Date Numeral Treatment for [DATE] */}
        <div className="my-3 py-3 px-6 border-y border-gold/30 w-full flex flex-col items-center">
          <p className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-maroon tracking-wider">
            {event.dateDisplay}
          </p>
          {event.timeDisplay && (
            <p className="font-body text-xs md:text-sm text-maroon/70 tracking-widest uppercase mt-2">
              {event.timeDisplay}
            </p>
          )}
        </div>

        {/* Venue Information [PLACE] */}
        <div className="my-4 flex items-center justify-center gap-2 text-maroon/90">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
          <p className="font-display text-lg md:text-xl font-medium tracking-wide">
            {event.venueName}
          </p>
        </div>

        {/* Action Buttons: Get Directions & Add to Calendar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4 mb-2">
          {/* Get Directions Button */}
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-maroon text-ivory text-xs md:text-sm font-body tracking-wider uppercase border border-gold/50 shadow-sm hover:bg-maroon-light transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
            aria-label={`Get directions to ${event.venueName}`}
          >
            <Navigation className="w-3.5 h-3.5 text-gold" />
            <span>Get Directions</span>
          </a>

          {/* Add to Calendar Button */}
          <button
            type="button"
            onClick={handleDownloadCalendar}
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-ivory text-maroon text-xs md:text-sm font-body tracking-wider uppercase border border-gold hover:bg-gold/10 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
            aria-label="Add wedding to personal calendar"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-gold" />
            <span>Add to Calendar</span>
          </button>
        </div>

        {/* Live Countdown: Only displayed if [DATE_ISO] is a valid date */}
        {countdown.isValid && !countdown.isPast && (
          <div className="mt-8 pt-6 border-t border-gold/20 w-full flex flex-col items-center">
            <span className="text-[11px] font-display uppercase tracking-widest text-gold font-semibold mb-3">
              Counting Down to the Auspicious Day
            </span>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <FlipDigit value={countdown.days} label="Days" />
              <span className="text-xl font-display text-gold/60 -mt-4">:</span>
              <FlipDigit value={countdown.hours} label="Hours" />
              <span className="text-xl font-display text-gold/60 -mt-4">:</span>
              <FlipDigit value={countdown.minutes} label="Minutes" />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
