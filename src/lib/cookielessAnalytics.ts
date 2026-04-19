type CookielessEventName = 'page_view' | 'consent_choice' | 'web_performance';

type CookielessPayload = {
  event: CookielessEventName;
  site: string;
  ts: string;
  page_path: string;
  page_title: string;
  referrer_host: string;
  locale: string;
  viewport: string;
  screen: string;
  tz_offset_min: number;
  data?: Record<string, unknown>;
};

const getSiteId = (): string =>
  process.env.NEXT_PUBLIC_COOKILESS_ANALYTICS_SITE?.trim() || 'fincado.com';

export const getCookielessEndpoint = (): string => {
  const endpoint = process.env.NEXT_PUBLIC_COOKILESS_ANALYTICS_ENDPOINT?.trim();
  return endpoint && endpoint.length > 0 ? endpoint : '';
};

const getReferrerHost = (): string => {
  if (typeof document === 'undefined' || !document.referrer) return '';
  try {
    return new URL(document.referrer).host;
  } catch {
    return '';
  }
};

const getCurrentPath = (): string => {
  if (typeof window === 'undefined') return '/';
  return `${window.location.pathname}${window.location.search}`;
};

const buildPayload = (
  event: CookielessEventName,
  data?: Record<string, unknown>,
): CookielessPayload | null => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  return {
    event,
    site: getSiteId(),
    ts: new Date().toISOString(),
    page_path: getCurrentPath(),
    page_title: document.title || '',
    referrer_host: getReferrerHost(),
    locale: navigator.language || 'en',
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen: `${window.screen.width}x${window.screen.height}`,
    tz_offset_min: new Date().getTimezoneOffset(),
    data,
  };
};

const postPayload = (endpoint: string, payload: CookielessPayload): boolean => {
  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    return navigator.sendBeacon(endpoint, blob);
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Best-effort telemetry only.
  });

  return true;
};

export const trackCookielessEvent = (
  event: CookielessEventName,
  data?: Record<string, unknown>,
): boolean => {
  const endpoint = getCookielessEndpoint();
  if (!endpoint) return false;

  const payload = buildPayload(event, data);
  if (!payload) return false;

  return postPayload(endpoint, payload);
};

export const trackCookielessPageView = (url: string): boolean =>
  trackCookielessEvent('page_view', { url });

export const trackCookielessConsentChoice = (
  choice: 'all' | 'recommended' | 'essential_only' | 'custom',
  analytics: boolean,
  advertising: boolean,
): boolean =>
  trackCookielessEvent('consent_choice', {
    choice,
    analytics,
    advertising,
  });
