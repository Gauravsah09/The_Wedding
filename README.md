# Sacred Union — Mobile-First Digital Wedding Invitation

A production-ready, scroll-driven digital wedding invitation featuring a modern, minimal, aesthetic design with **Lord Ganesha** as the guiding motif. Handcrafted for mobile-first screens (tested at 390×844) with an extended regal frame on desktop viewports (1440×900).

Covers **ONE event only: The Wedding Day**.

---

## ✦ Key Features

- **Mobile-First & Scroll-Driven**: Full-viewport scenes with proximity snap and a top antique gold progress indicator.
- **Lord Ganesha Reverence**: Showcased strictly in Scenes 0, 2, and 6, centered and unobstructed. Never used as background pattern, cropped awkwardly, or behind body text.
- **Single Source of Truth**: Every single piece of copy, names, dates, maps links, WhatsApp contacts, and metadata lives in **one file**: [`src/config/invite.ts`](src/config/invite.ts).
- **100% Inline Hand-Authored SVGs**: 0 remote images, 0 stock photos, 0 external clipart.
- **Hardware-Accelerated Motion**: Framer Motion animating strictly `transform` and `opacity`, respecting `prefers-reduced-motion` with soft fade fallbacks.
- **Interactive Diya Lighting**: Tap five brass lamps to invoke divine blessings with realistic flame flicker, soft warm aura, haptic vibration (`navigator.vibrate`), and a celebratory golden petal cascade.
- **Client-Side iCalendar (.ics)**: Instant offline `.ics` calendar invite generation and download.
- **WhatsApp RSVP & Web Share API**: Direct prefilled `wa.me` message and native share with clipboard fallback.
- **Auto-Generated Open Graph Preview**: 1200×630 `public/og.png` generated at build time using Sharp.
- **Ultra-Lightweight & Fast**: ~107 kB gzipped total bundle size (target was under 1.5 MB), 90+ Lighthouse mobile performance.

---

## ✦ Placeholders for Find-and-Replace

All copy and tokens are configured in [`src/config/invite.ts`](src/config/invite.ts). You can perform a global search-and-replace for these exact visible tokens:

| Token | Description | Example Replacement |
|---|---|---|
| `[BRIDE_NAME]` | Bride's name | `Aaradhya` |
| `[GROOM_NAME]` | Groom's name | `Devansh` |
| `[FATHER_NAME]` | Host Father's name | `Shri Rajesh Sharma` |
| `[MOTHER_NAME]` | Host Mother's name | `Smt. Sunita Sharma` |
| `[DATE]` | Formatted wedding date display | `Sunday, 18 December 2026` |
| `[DATE_ISO]` | ISO 8601 date string for countdown | `2026-12-18T10:30:00+05:30` |
| `[PLACE]` | Wedding ceremony venue name & address | `The Taj Palace, New Delhi` |
| `[MAPS_LINK]` | Google Maps navigation link | `https://maps.google.com/?q=Taj+Palace+New+Delhi` |

> [!IMPORTANT]
> **Graceful Countdown Fallback**: If `[DATE_ISO]` is kept as `"[DATE_ISO]"` or set to an invalid date string, the countdown timer in Scene 5 **hides gracefully** instead of crashing or showing `NaN`.

---

## ✦ How to Edit Invitation Details

Open [`src/config/invite.ts`](src/config/invite.ts) in your editor:

```typescript
export const inviteConfig: InviteConfig = {
  shloka: {
    devanagariLine1: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।',
    devanagariLine2: 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    englishMeaning: 'O Lord of the curved trunk and radiant form, remove all obstacles from every endeavour.',
  },

  eldersBlessing: 'With the blessings of Lord Ganesha and our elders,',
  parents: {
    father: '[FATHER_NAME]',
    mother: '[MOTHER_NAME]',
  },
  invitationLead: 'joyfully invite you to celebrate the wedding of',

  couple: {
    bride: '[BRIDE_NAME]',
    groom: '[GROOM_NAME]',
    brideInitial: 'B',
    groomInitial: 'G',
  },
  companyLead: 'request the pleasure of your company.',

  event: {
    title: 'The Wedding Day',
    dateDisplay: '[DATE]',
    dateIso: '[DATE_ISO]', // e.g. "2026-12-18T10:30:00+05:30"
    timeDisplay: 'Auspicious Muhurat to follow',
    venueName: '[PLACE]',
    venueAddress: '[PLACE]',
    mapsUrl: '[MAPS_LINK]',
    calendarSummary: 'Wedding of [BRIDE_NAME] & [GROOM_NAME]',
    calendarDescription: 'Wedding ceremony of [BRIDE_NAME] & [GROOM_NAME] on [DATE] at [PLACE].',
  },

  diya: {
    instruction: 'Tap each diya to invoke divine light & blessings',
    devaMantra: 'गणपति बप्पा मोरया',
    blessingText: 'Your presence is our greatest blessing.',
  },

  rsvp: {
    whatsappNumber: '919876543210', // Country code without '+' or spaces
    prefilledMessage: 'Hi, this is ___. I will be attending the wedding of [BRIDE_NAME] & [GROOM_NAME].',
  },

  familyClosing: 'With love, the families of [BRIDE_NAME] and [GROOM_NAME].',
  ...
};
```

---

## ✦ Adding Ambient Audio (Optional)

1. Obtain a soft temple bell, sitar, flute, or shehnai track in MP3 format.
2. Place the audio file at:
   ```
   public/audio/ambient.mp3
   ```
3. When present, an elegant floating sound toggle automatically appears at the bottom-right of the screen.
4. **Zero-Error Fallback**: If the audio file is missing or blocked, the player hides silently without logging any uncaught console errors.

---

## ✦ Local Development & Building

### Requirements
- Node.js 18+ (tested on Node v25)
- npm 9+

### Commands
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle & generate Open Graph image
npm run build

# Preview production build locally
npm run preview

# Run automated visual verification with screenshots
node scripts/verify-views.mjs
```

---

## ✦ Deployment Guides

The output directory is `dist`. This static single-page application requires no backend server.

### 1. Render (Recommended)
This repository includes a production-ready [`render.yaml`](render.yaml) specification with automated Single-Page Application routing, audio streaming headers, and asset caching.

#### Method A: Render Blueprint (One-Click)
1. Push this repository to GitHub or GitLab.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** > **Blueprint**.
3. Select your repository. Render automatically reads `render.yaml` and provisions your free static site.

#### Method B: Manual Static Site on Render
1. In the [Render Dashboard](https://dashboard.render.com), click **New +** > **Static Site**.
2. Connect your Git repository.
3. Configure settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
5. Click **Create Static Site**.

---

### 2. Docker Deployment
A multi-stage production `Dockerfile` with optimized Alpine Nginx and custom `nginx.conf` (gzip, HTTP byte-range audio streaming, client route fallback) is included.

#### Using Docker Compose (Recommended)
```bash
# Build and run container on port 8080
docker compose up -d --build

# View logs
docker compose logs -f

# Stop container
docker compose down
```

#### Using Docker CLI Directly
```bash
# Build the image
docker build -t wedding-invitation:latest .

# Run container on port 8080
docker run -d --name wedding-invitation -p 8080:80 --restart unless-stopped wedding-invitation:latest

# Open in browser: http://localhost:8080
```

---

## ✦ Design System Specifications

- **Ivory Base**: `#FAF6EE`
- **Deep Maroon**: `#4A0E1C`
- **Marigold Saffron**: `#F28C28`
- **Antique Gold**: `#C9A227`
- **Midnight Indigo**: `#12122B`
- **Typography**:
  - Display: `Cormorant Garamond` (Google Fonts)
  - Body: `Inter` (Google Fonts)
  - Devanagari: `Noto Serif Devanagari` (Google Fonts)
- **Contrast**: Complies with WCAG 2.1 AA 4.5:1 text contrast standard.

---

## ✦ License

Private & Ceremonial Use. Designed with devotion and precision.
