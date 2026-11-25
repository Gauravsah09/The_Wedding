# Scroll-Driven Digital Wedding Invitation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, mobile-first, scroll-driven digital wedding invitation with Lord Ganesha as the guiding motif, covering ONE event only (the wedding day), with all copy configurable in a single file `src/config/invite.ts`, verified at 390x844 and 1440x900 viewports.

**Architecture:** A lightweight client-only Vite + React + TypeScript + Tailwind CSS application using Framer Motion for scroll-driven and interaction animations (strictly animating only `transform` and `opacity`, respecting `prefers-reduced-motion`). The app features hand-authored inline gold line art SVGs, clean component modularity (one component per scene), 100dvh safe-area support, scroll-snap with proximity, a client-side ICS calendar generator, interactive diya lighting with haptics, Web Share with fallback, and automated OG image generation.

**Tech Stack:** Vite, React 19 / TypeScript, Tailwind CSS, Framer Motion, Sharp (OG image generation build script).

**Spec:** User prompt requirements:
- Theme: Modern, minimal, aesthetic, Lord Ganesha guiding motif, ONE event only (The Wedding Day).
- Tokens: `[BRIDE_NAME]`, `[GROOM_NAME]`, `[FATHER_NAME]`, `[MOTHER_NAME]`, `[PLACE]`, `[DATE]`, `[DATE_ISO]`, `[MAPS_LINK]`.
- Palette: Ivory `#FAF6EE`, Deep Maroon `#4A0E1C`, Marigold Saffron `#F28C28`, Antique Gold `#C9A227`, Midnight Indigo `#12122B`.
- Typography: Cormorant Garamond (display), Inter (body), Noto Serif Devanagari (Hindi).
- Reverence Rule: Ganesha displayed strictly in Scene 0, Scene 2, and Scene 6 (centred & unobstructed).

## Global Constraints

- SINGLE CONFIG FILE: Every piece of copy, names, dates, links, and contact numbers MUST come exclusively from `src/config/invite.ts`.
- EXACT PLACEHOLDERS: Visible token placeholders `[BRIDE_NAME]`, `[GROOM_NAME]`, `[FATHER_NAME]`, `[MOTHER_NAME]`, `[PLACE]`, `[DATE]` must be preserved and listed in the README.
- SAFE DATE_ISO: If `[DATE_ISO]` is a placeholder or invalid ISO date, countdown timer hides gracefully without rendering NaN or crashing.
- PERFORMANCE & ASSETS: 0 external stock images/remote clipart. All illustrations are inline SVGs. Only Google Fonts and optional local `public/audio/ambient.mp3`.
- HARDWARE-ACCELERATED ANIMATION: Strictly animate `transform` and `opacity` only. All animations respect `prefers-reduced-motion` with soft fade fallbacks.
- RESPONSIVE LAYOUT: 390px mobile-first width; on desktop (>=768px/1440px), content is clamped to max 520px within a centered frame over an extended aesthetic backdrop. 0 horizontal scroll.
- REVERENCE RULE: Lord Ganesha SVGs must appear ONLY in Scene 0, Scene 2, and Scene 6, centered and unobstructed.

## Review Focus

1. **Placeholder ISO Date Handling**: When `[DATE_ISO]` contains the literal string `"[DATE_ISO]"` or an invalid date string, the countdown component must hide gracefully without throwing or displaying `NaN`.
2. **Audio Missing Graceful Fallback**: When `public/audio/ambient.mp3` does not exist or fails to load, the audio toggle button must hide silently without unhandled errors or console warnings.
3. **Preloader to Content Transition (Audio Policy Unlock)**: Clicking "Open Invitation" in Scene 0 must initiate curtain parting in Scene 1 and unlock HTML5 audio playback context safely.
4. **Touch Target Sizing & iOS dvh / Safe Area**: All interactive buttons, diya tap targets, and toggles must meet minimum 44x44px touch targets and work with `100dvh` / `env(safe-area-inset-*)`.
5. **Interactive Diya Lighting State**: Each of the 5 diyas can be individually tapped (with haptic feedback); once all 5 are lit, trigger the celebratory golden petal cascade and reveal the blessing.

---

### Task 1: Project Scaffolding, Dependencies, and Configuration

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`
- Create: `src/config/invite.ts`
- Create: `src/types/invite.ts`
- Create: `src/index.css`
- Create: `src/main.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces: `inviteConfig: InviteConfig` from `src/config/invite.ts`

- [ ] **Step 1: Initialize Vite React TypeScript project with Tailwind CSS, Framer Motion, and Sharp**
- [ ] **Step 2: Configure `tailwind.config.js` with exact design tokens (`ivory`, `maroon`, `saffron`, `gold`, `indigo`) and font families (`display`, `body`, `devanagari`)**
- [ ] **Step 3: Setup `index.html` with Google Fonts links (Cormorant Garamond, Inter, Noto Serif Devanagari), viewport-fit=cover, theme-color `#FAF6EE`, and inline SVG favicon**
- [ ] **Step 4: Create `src/types/invite.ts` and `src/config/invite.ts` containing all placeholders, copy, WhatsApp link, maps link, and metadata**
- [ ] **Step 5: Verify build with `npm run build`**

---

### Task 2: Hand-Authored Inline SVG Motifs and Visual Assets

**Files:**
- Create: `src/components/illustrations/GaneshaLineArt.tsx`
- Create: `src/components/illustrations/MandalaHalo.tsx`
- Create: `src/components/illustrations/MarigoldGarland.tsx`
- Create: `src/components/illustrations/DiyaSvg.tsx`
- Create: `src/components/illustrations/AmpersandSvg.tsx`
- Create: `src/components/illustrations/DecorativeHairline.tsx`
- Create: `src/components/illustrations/PetalRain.tsx`

**Interfaces:**
- Consumes: Design system color tokens (`#C9A227`, `#FAF6EE`, `#4A0E1C`, etc.)
- Produces:
  - `<GaneshaLineArt size={...} animated={boolean} strokeWidth={number} className={...} />`
  - `<MandalaHalo size={...} className={...} />`
  - `<MarigoldGarland orientation="left" | "right" className={...} />`
  - `<DiyaSvg isLit={boolean} onToggle={...} index={number} />`
  - `<AmpersandSvg animated={boolean} />`
  - `<PetalRain active={boolean} />`

- [ ] **Step 1: Author `GaneshaLineArt.tsx` with single-weight gold line art geometric crown, trunk, ears, tusk, and modak using Framer Motion path animation**
- [ ] **Step 2: Author `MandalaHalo.tsx` with concentric sacred geometry rings and delicate petals for smooth 60s rotation loop**
- [ ] **Step 3: Author `MarigoldGarland.tsx` with layered marigold flower blossoms and subtle swaying motion**
- [ ] **Step 4: Author `DiyaSvg.tsx` featuring brass base, oil reservoir, flickering flame glow filter, and pulse animation**
- [ ] **Step 5: Author `AmpersandSvg.tsx` with self-drawing antique gold calligraphic stroke**
- [ ] **Step 6: Author `PetalRain.tsx` lightweight golden flower petal drop animation**

---

### Task 3: Core Hooks, Utilities, and Helpers

**Files:**
- Create: `src/utils/calendar.ts`
- Create: `src/utils/share.ts`
- Create: `src/utils/haptics.ts`
- Create: `src/hooks/useCountdown.ts`
- Create: `src/hooks/useAudio.ts`
- Create: `src/hooks/useReducedMotion.ts`

**Interfaces:**
- Consumes: `inviteConfig` from `src/config/invite.ts`
- Produces:
  - `generateIcsFile(event: CalendarEvent): void`
  - `shareInvitation(data: ShareData): Promise<boolean>`
  - `triggerHaptic(pattern?: number | number[]): void`
  - `useCountdown(targetDateIso: string): { days, hours, minutes, seconds, isValid, isPast }`
  - `useAudio(audioPath: string): { isPlaying, toggle, isAvailable }`

- [ ] **Step 1: Implement `generateIcsFile` client-side .ics file generation and download**
- [ ] **Step 2: Implement `shareInvitation` with Web Share API and clipboard copy fallback**
- [ ] **Step 3: Implement `useCountdown` with strict detection of placeholder string `[DATE_ISO]` and invalid dates**
- [ ] **Step 4: Implement `useAudio` checking audio element load status without console error pollution**
- [ ] **Step 5: Implement `triggerHaptic` safely checking `navigator.vibrate`**

---

### Task 4: Scene 0 & Scene 1 (The Seal Preloader and The Grand Opening Curtain)

**Files:**
- Create: `src/components/scenes/Scene0Preloader.tsx`
- Create: `src/components/scenes/Scene1Opening.tsx`
- Create: `src/components/AudioToggle.tsx`
- Create: `src/components/ScrollProgress.tsx`

**Interfaces:**
- Consumes: `inviteConfig`, `GaneshaLineArt`, `useAudio`
- Produces:
  - `<Scene0Preloader onOpen={handleOpen} />`
  - `<Scene1Opening isOpen={isOpen} onRevealComplete={...} />`
  - `<AudioToggle audioState={...} />`
  - `<ScrollProgress />`

- [ ] **Step 1: Build `Scene0Preloader.tsx` with ivory backdrop, 2.5s stroke-dashoffset drawing of Ganesha, Devanagari "॥ श्री गणेशाय नमः ॥" fade-in, and pulsing "Open Invitation" pill button**
- [ ] **Step 2: Build `Scene1Opening.tsx` with twin deep-maroon panels featuring gold mandala line-work parting left and right in 1.4s with smooth ease-in-out**
- [ ] **Step 3: Build animated scroll indicator with gentle bobbing chevron appearing after 1.5s**
- [ ] **Step 4: Build floating `AudioToggle.tsx` at bottom-right, silently hidden if audio file is absent**
- [ ] **Step 5: Build fixed antique gold `ScrollProgress.tsx` bar at viewport top**

---

### Task 5: Scene 2 & Scene 3 (Invocation and Invitation Text)

**Files:**
- Create: `src/components/scenes/Scene2Invocation.tsx`
- Create: `src/components/scenes/Scene3InvitationText.tsx`

**Interfaces:**
- Consumes: `inviteConfig`, `GaneshaLineArt`, `MandalaHalo`, `MarigoldGarland`
- Produces:
  - `<Scene2Invocation />`
  - `<Scene3InvitationText />`

- [ ] **Step 1: Build `Scene2Invocation.tsx` with `#12122B` midnight indigo background, large centered Ganesha, 60s rotating mandala halo, upward floating gold dust particles**
- [ ] **Step 2: Render two-line Sanskrit shloka with staggered line-by-line reveal and italicized English translation beneath**
- [ ] **Step 3: Build smooth transition dissolve from indigo to ivory**
- [ ] **Step 4: Build `Scene3InvitationText.tsx` on ivory background with centered Cormorant Garamond typography displaying blessings of Ganesha, elders, and host parents `[FATHER_NAME] & [MOTHER_NAME]`**
- [ ] **Step 5: Add drawing gold hairline rule beneath host text and subtle swaying marigold garlands in top corners**

---

### Task 6: Scene 4 & Scene 5 (The Couple and The Wedding Day Card)

**Files:**
- Create: `src/components/scenes/Scene4TheCouple.tsx`
- Create: `src/components/scenes/Scene5WeddingDay.tsx`

**Interfaces:**
- Consumes: `inviteConfig`, `AmpersandSvg`, `useCountdown`, `generateIcsFile`
- Produces:
  - `<Scene4TheCouple />`
  - `<Scene5WeddingDay />`

- [ ] **Step 1: Build `Scene4TheCouple.tsx` featuring very large Cormorant Garamond names `[BRIDE_NAME]`, animated self-drawing gold ampersand, and `[GROOM_NAME]`**
- [ ] **Step 2: Add letter-by-letter reveal with upward soft mask and faint oversized interlocking monogram rotating on scroll**
- [ ] **Step 3: Build `Scene5WeddingDay.tsx` refined ivory card with double gold hairline border, "The Wedding Day" title, large numeral treatment for `[DATE]`, and `[PLACE]` venue**
- [ ] **Step 4: Implement "Get Directions" (linking to `[MAPS_LINK]`) and "Add to Calendar" (.ics download button)**
- [ ] **Step 5: Integrate flip-digit live countdown timer, verifying it gracefully hides if `[DATE_ISO]` is placeholder**

---

### Task 7: Scene 6 & Scene 7 (Interactive Diya Finale and Footer Actions)

**Files:**
- Create: `src/components/scenes/Scene6LightDiya.tsx`
- Create: `src/components/scenes/Scene7FooterActions.tsx`

**Interfaces:**
- Consumes: `inviteConfig`, `GaneshaLineArt`, `DiyaSvg`, `PetalRain`, `shareInvitation`, `triggerHaptic`
- Produces:
  - `<Scene6LightDiya />`
  - `<Scene7FooterActions />`

- [ ] **Step 1: Build `Scene6LightDiya.tsx` on midnight indigo background with centered small Ganesha line-art at top**
- [ ] **Step 2: Render five unlit interactive brass diyas along the bottom with tap states, warm flame glow, and haptic feedback**
- [ ] **Step 3: Trigger golden petal rain shower upon lighting all five diyas and fade in "गणपति बप्पा मोरया" and "Your presence is our greatest blessing."**
- [ ] **Step 4: Build `Scene7FooterActions.tsx` on ivory background with "Share this invitation" (Web Share API + copy link fallback with toast)**
- [ ] **Step 5: Implement "Confirm your presence on WhatsApp" prefilled wa.me button with bride/groom placeholder names and closing family line**

---

### Task 8: Layout Frame, Open Graph Generator, and Accessibility

**Files:**
- Create: `src/components/DesktopFrame.tsx`
- Create: `src/App.tsx`
- Create: `scripts/generate-og.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: All scenes, `inviteConfig`
- Produces: Fully integrated application, generated `public/og.png`

- [ ] **Step 1: Build `DesktopFrame.tsx` centering 390px-520px content column with extended ivory/maroon decorative borders on desktop viewports**
- [ ] **Step 2: Assemble all scenes into `App.tsx` with scroll-snap proximity and smooth scene transitions**
- [ ] **Step 3: Author `scripts/generate-og.ts` using Sharp to produce high-resolution 1200x630 `public/og.png` from an SVG template**
- [ ] **Step 4: Verify full accessibility (ARIA labels, 4.5:1 text contrast, semantic headings, keyboard focus styles)**
- [ ] **Step 5: Run `npm run build` to confirm production bundle builds without errors**

---

### Task 9: Browser Verification at 390x844 and 1440x900, Screenshot Captures, Polish, and README

**Files:**
- Create: `scripts/verify-views.mjs` (automated headless screenshot verification script)
- Create: `README.md`

- [ ] **Step 1: Start local dev server and run screenshot verification at mobile 390x844 and desktop 1440x900 for every scene**
- [ ] **Step 2: Inspect screenshots for any layout overflow, font rendering, text contrast, or animation hitches; apply fixes if needed**
- [ ] **Step 3: Create comprehensive `README.md` with exact placeholder list, instructions for editing `src/config/invite.ts`, adding ambient audio, and deployment guides for Netlify, Vercel, and Cloudflare Pages**
- [ ] **Step 4: Produce final walkthrough report with scene screenshots and verification summary**
