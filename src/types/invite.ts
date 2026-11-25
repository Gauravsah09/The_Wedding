export interface ShlokaConfig {
  devanagariLine1: string;
  devanagariLine2: string;
  englishMeaning: string;
}

export interface ParentsConfig {
  father: string;
  mother: string;
}

export interface CoupleConfig {
  bride: string;
  groom: string;
  brideInitial: string;
  groomInitial: string;
}

export interface EventConfig {
  title: string;
  dateDisplay: string;
  dateIso: string; // ISO string e.g. "2026-12-18T10:00:00+05:30" or placeholder "[DATE_ISO]"
  timeDisplay: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  calendarSummary: string;
  calendarDescription: string;
}

export interface RsvpConfig {
  whatsappNumber: string;
  prefilledMessage: string;
}

export interface ShareConfig {
  title: string;
  text: string;
  url: string;
}

export interface DiyaBlessingConfig {
  instruction: string;
  devaMantra: string;
  blessingText: string;
}

export interface InviteConfig {
  shloka: ShlokaConfig;
  eldersBlessing: string;
  parents: ParentsConfig;
  invitationLead: string;
  couple: CoupleConfig;
  companyLead: string;
  event: EventConfig;
  diya: DiyaBlessingConfig;
  rsvp: RsvpConfig;
  share: ShareConfig;
  familyClosing: string;
  audio: {
    src: string;
    label: string;
  };
}
