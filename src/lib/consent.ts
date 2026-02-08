/**
 * Cookie consent management system
 * Controls loading of tracking scripts based on user consent
 */

export type ConsentType = 'analytics' | 'advertising' | 'functional';

export interface ConsentState {
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'fincado_consent_preferences';
const CONSENT_VERSION = '1.0'; // Increment when privacy policy changes

/**
 * Get current consent state
 */
export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    // Check if consent is still valid (version check)
    if (parsed.version !== CONSENT_VERSION) {
      return null; // Request consent again if version changed
    }

    return parsed.state as ConsentState;
  } catch {
    return null;
  }
}

/**
 * Save consent preferences
 */
export function saveConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        state,
        version: CONSENT_VERSION,
        timestamp: Date.now(),
      }),
    );

    // Dispatch custom event for script loading
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: state }));
  } catch (error) {
    console.error('Error saving consent:', error);
  }
}

/**
 * Accept all cookies (convenience method)
 */
export function acceptAll(): void {
  saveConsent({
    analytics: true,
    advertising: true,
    functional: true,
    timestamp: Date.now(),
  });
}

/**
 * Reject all non-essential cookies
 */
export function rejectAll(): void {
  saveConsent({
    analytics: false,
    advertising: false,
    functional: true, // Functional cookies are essential
    timestamp: Date.now(),
  });
}

/**
 * Check if user has given consent for a specific type
 */
export function hasConsent(type: ConsentType): boolean {
  const state = getConsentState();
  if (!state) return false;
  return state[type] === true;
}

/**
 * Clear all consent preferences
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing consent:', error);
  }
}
