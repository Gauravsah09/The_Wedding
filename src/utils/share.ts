export interface SharePayload {
  title: string;
  text: string;
  url?: string;
}

/**
 * Invokes native Web Share API where available,
 * otherwise falls back cleanly to copying link to clipboard.
 * Returns true if shared via native or copied to clipboard.
 */
export async function shareInvitation(payload: SharePayload): Promise<{
  method: 'share' | 'copy';
  success: boolean;
}> {
  const shareUrl = payload.url || (typeof window !== 'undefined' ? window.location.href : '');

  // 1. Try Native Web Share
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: shareUrl,
      });
      return { method: 'share', success: true };
    } catch (err: unknown) {
      // If user cancelled, don't fallback to clipboard
      if (err instanceof Error && err.name === 'AbortError') {
        return { method: 'share', success: false };
      }
      // Otherwise proceed to clipboard fallback
    }
  }

  // 2. Clipboard Fallback
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      return { method: 'copy', success: true };
    } catch {
      // Fall through to manual textarea copy
    }
  }

  // 3. Fallback for older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return { method: 'copy', success: successful };
  } catch {
    return { method: 'copy', success: false };
  }
}
