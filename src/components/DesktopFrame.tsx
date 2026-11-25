import React from 'react';

interface DesktopFrameProps {
  children: React.ReactNode;
}

/**
 * DesktopFrame:
 * Mobile-first architecture (designed at 390px).
 * On desktop viewports (>= 768px / 1440px), cleanly centres a 520px max content column
 * over an extended aesthetic backdrop featuring subtle antique gold corner filigrees.
 */
export const DesktopFrame: React.FC<DesktopFrameProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-[#EDE5D6] flex justify-center selection:bg-gold selection:text-white">
      {/* Desktop Extended Decorative Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none hidden md:block overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle royal pattern backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EDE5D6] via-[#E4D9C3] to-[#DDD1B8] opacity-90" />

        {/* Ambient mandala filigrees on desktop outer wings */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full border border-gold/15 pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full border border-gold/15 pointer-events-none" />

        {/* Subtle desktop framing labels */}
        <div className="absolute top-8 left-8 text-[11px] font-display tracking-widest uppercase text-maroon/40">
          Shubh Vivah ✦ Sacred Union
        </div>
        <div className="absolute bottom-8 right-8 text-[11px] font-display tracking-widest uppercase text-maroon/40">
          ॥ ॐ श्री गणेशाय नमः ॥
        </div>
      </div>

      {/* Main Invitation Column (max-w-[520px] on desktop) */}
      <main className="relative w-full max-w-[520px] min-h-screen min-h-[100dvh] bg-ivory shadow-[0_0_60px_rgba(74,14,28,0.12)] md:border-x md:border-gold/30 flex flex-col z-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};
