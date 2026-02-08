/**
 * Ad consent and preference management utility
 * Provides centralized control over ad block notice preferences
 */

export type DismissalType = 'session' | 'temporary' | 'permanent' | null;

export interface AdConsentState {
  dismissed: DismissalType;
  lastDismissed: number | null;
  whitelisted: boolean;
}

const STORAGE_KEYS = {
  DISMISSED: 'adblock_notice_dismissed',
  LAST_DISMISSED: 'adblock_notice_last_dismissed',
  WHITELISTED: 'adblock_whitelisted',
} as const;

/**
 * Get current ad consent state
 */
export function getAdConsentState(): AdConsentState {
  try {
    const dismissed = localStorage.getItem(
      STORAGE_KEYS.DISMISSED,
    ) as DismissalType;
    const lastDismissed = localStorage.getItem(STORAGE_KEYS.LAST_DISMISSED);
    const whitelisted =
      localStorage.getItem(STORAGE_KEYS.WHITELISTED) === 'true';

    return {
      dismissed,
      lastDismissed: lastDismissed ? parseInt(lastDismissed) : null,
      whitelisted,
    };
  } catch {
    return {
      dismissed: null,
      lastDismissed: null,
      whitelisted: false,
    };
  }
}

/**
 * Check if notice should be shown based on user preferences
 */
export function shouldShowAdNotice(): boolean {
  const state = getAdConsentState();

  // Permanent dismissal or whitelisted
  if (state.dismissed === 'permanent' || state.whitelisted) {
    return false;
  }

  // Session dismissal (cleared on new browser session)
  if (state.dismissed === 'session') {
    return false;
  }

  // Temporary dismissal (7 days)
  if (state.lastDismissed) {
    const daysSince =
      (Date.now() - state.lastDismissed) / (1000 * 60 * 60 * 24);
    return daysSince >= 7;
  }

  return true;
}

/**
 * Save user's dismissal preference
 */
export function saveAdDismissal(type: DismissalType): void {
  try {
    if (type === 'permanent') {
      localStorage.setItem(STORAGE_KEYS.DISMISSED, 'permanent');
      localStorage.setItem(STORAGE_KEYS.WHITELISTED, 'true');
    } else if (type === 'session') {
      sessionStorage.setItem(STORAGE_KEYS.DISMISSED, 'session');
    } else if (type === 'temporary') {
      localStorage.setItem(STORAGE_KEYS.LAST_DISMISSED, Date.now().toString());
      localStorage.removeItem(STORAGE_KEYS.DISMISSED);
    }
  } catch (error) {
    console.error('Error saving ad dismissal preference:', error);
  }
}

/**
 * Clear all ad consent data (for user preference reset)
 */
export function clearAdConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.DISMISSED);
    localStorage.removeItem(STORAGE_KEYS.LAST_DISMISSED);
    localStorage.removeItem(STORAGE_KEYS.WHITELISTED);
    sessionStorage.removeItem(STORAGE_KEYS.DISMISSED);
  } catch (error) {
    console.error('Error clearing ad consent:', error);
  }
}
