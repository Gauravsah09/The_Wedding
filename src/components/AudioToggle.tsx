import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { UseAudioReturn } from '../hooks/useAudio';

interface AudioToggleProps {
  audio: UseAudioReturn;
}

/**
 * Floating mute/unmute button fixed at bottom-right.
 * Silently hidden if audio file is not available.
 */
export const AudioToggle: React.FC<AudioToggleProps> = ({ audio }) => {
  if (!audio.isAvailable) return null;

  return (
    <button
      type="button"
      onClick={audio.toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-ivory/90 backdrop-blur-md border border-gold/40 shadow-lg text-maroon hover:border-gold hover:bg-ivory transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
      aria-label={audio.isPlaying ? 'Mute sacred ambient audio' : 'Play sacred ambient audio'}
    >
      {audio.isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-gold animate-pulse" />
          <span className="text-xs font-display tracking-widest uppercase text-maroon font-medium">
            Sound On
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-maroon/60" />
          <span className="text-xs font-display tracking-widest uppercase text-maroon/80 font-medium">
            Sound Off
          </span>
        </>
      )}
    </button>
  );
};
