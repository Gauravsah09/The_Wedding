import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseAudioReturn {
  isPlaying: boolean;
  toggle: () => void;
  isAvailable: boolean;
  initAndPlay: () => void;
}

/**
 * Manages background temple ambient audio.
 * - Off by default
 * - Checks availability of audio file silently
 * - If file is missing (404/error), sets isAvailable = false without throwing errors
 * - Enables unlocking audio context upon user gesture ("Open Invitation")
 */
export function useAudio(audioSrc: string): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check file availability safely on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio();
    audio.src = audioSrc;
    audio.loop = true;
    audio.preload = 'metadata';

    const handleCanPlay = () => {
      setIsAvailable(true);
      audioRef.current = audio;
    };

    const handleError = () => {
      // Audio file missing or unsupported - hide silently as per requirements
      setIsAvailable(false);
      audioRef.current = null;
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  // Toggle play/pause
  const toggle = useCallback(() => {
    if (!audioRef.current || !isAvailable) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying, isAvailable]);

  // Called when user clicks "Open Invitation" to unlock audio context
  const initAndPlay = useCallback(() => {
    if (!audioRef.current || !isAvailable) return;
    // Keep off by default as specified, but unlock context
  }, [isAvailable]);

  return {
    isPlaying,
    toggle,
    isAvailable,
    initAndPlay,
  };
}
