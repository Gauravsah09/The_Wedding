/**
 * Safe haptic vibration utility for interactive elements (such as Diya lighting).
 * Gracefully no-ops on desktop or unsupported devices.
 */
export function triggerHaptic(pattern: number | number[] = 30): void {
  try {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Silently ignore environments with strict permission policies
  }
}
