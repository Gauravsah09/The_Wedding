import { InviteConfig } from '../types/invite';

/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: WEDDING INVITATION CONFIGURATION
 * ============================================================================
 * All texts, dates, venue coordinates, WhatsApp contacts, and audio parameters
 * live exclusively in this file.
 *
 * TOKEN PLACEHOLDERS (Keep exact casing for automated find-and-replace):
 * - Ritu Kumari
 * - Gaurav Sah
 * - [FATHER_NAME]
 * - [MOTHER_NAME]
 * - Hotel Valentino Hi-Way
 * - [DATE]
 * - [DATE_ISO]
 * - [MAPS_LINK]
 *
 * NOTE: If [DATE_ISO] is kept as "[DATE_ISO]" or is invalid, the countdown
 * timer in Scene 5 will hide gracefully without breaking or throwing errors.
 * Example of real date: "2026-12-18T10:30:00+05:30"
 * ============================================================================
 */
export const inviteConfig: InviteConfig = {
  // Scene 2: Sacred Invocation (Midnight Indigo Scene)
  shloka: {
    devanagariLine1: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।',
    devanagariLine2: 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    englishMeaning:
      'O Lord of the curved trunk and radiant form, remove all obstacles from every endeavour.',
  },

  // Scene 3: The Invitation Text (Ivory Scene)
  eldersBlessing: 'With the blessings of Lord Ganesha and our elders,',
  parents: {
    father: 'Late Sri Bijay Kumar',
    mother: 'Smt. Kavita Devi',
  },
  invitationLead: 'Joyfully Invite You To Celebrate The Wedding of',

  // Scene 4: The Couple (Hero Moment)
  couple: {
    bride: 'Ritu Kumari',
    groom: 'Gaurav Sah',
    brideInitial: 'R',
    groomInitial: 'G',
  },
  companyLead: 'Request The Pleasure of Your Company.',

  // Scene 5: The Wedding Day & Venue
  event: {
    title: 'The Wedding Day',
    dateDisplay: 'Monday, 30 November 2026',
    // Live countdown target: 30th Nov 2026 at 6:00 PM IST
    dateIso: '2026-11-30T18:00:00+05:30',
    timeDisplay: '6:00 PM onwards',
    venueName: 'Hotel Valentino Hi-Way',
    venueAddress: 'Hotel & Banquet, NH-57, Darbhanga 4 Lane, Muzaffarpur',
    mapsUrl: 'https://maps.app.goo.gl/QAiUzxwN2JML9nTV8',
    calendarSummary: 'Wedding of Ritu Kumari & Gaurav Sah',
    calendarDescription:
      'Wedding ceremony of Ritu Kumari & Gaurav Sah on Monday, 30 November 2026 at 6:00 PM at Hotel Valentino Hi-Way. With blessings of Lord Ganesha.',
  },

  // Scene 6: Interactive Diya Finale
  diya: {
    instruction: 'Tap each diya to invoke divine light & blessings',
    devaMantra: 'गणपति बप्पा मोरया',
    blessingText: 'Your presence is our greatest blessing.',
  },

  // Scene 7: Footer & RSVP Actions
  rsvp: {
    // International format without '+' or spaces, or a placeholder number
    whatsappNumber: '919876543210',
    prefilledMessage:
      'Hi, this is ___. I will be attending the wedding of Ritu Kumari & Gaurav Sah.',
  },

  share: {
    title: 'Ritu Kumari & Gaurav Sah - Wedding Invitation',
    text: 'With the blessings of Lord Ganesha, we joyfully invite you to celebrate the wedding of Ritu Kumari & Gaurav Sah on Monday, 30 November 2026 at Hotel Valentino Hi-Way.',
    url: typeof window !== 'undefined' ? window.location.href : 'https://wedding-invitation.example.com/',
  },

  familyClosing: 'With love, the families of Ritu Kumari and Gaurav Sah.',

  // Optional background music: looks for public/audio/ambient.mp3
  // Silently hidden if audio file is missing or fails to play.
  audio: {
    src: '/audio/sahilmadan-wedding-invitation-421393.mp3',
    label: 'Sacred Temple Ambience',
  },
};
