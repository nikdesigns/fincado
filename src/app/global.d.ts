// src/types/global.d.ts

declare global {
  interface Window {
    // ✅ Google AdSense
    adsbygoogle: Array<{
      push?: (params?: unknown) => void;
      requestNonPersonalizedAds?: number;
      loaded?: boolean;
    }>;

    // ✅ Google Analytics (GA4)
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;

    // ✅ Microsoft Clarity
    clarity?: (...args: unknown[]) => void;
  }

  // ✅ Explicit gtag function type with Consent Mode V2 support
  function gtag(
    command: 'config' | 'event' | 'js' | 'set' | 'consent',
    targetId: string | Date | 'default' | 'update',
    config?: {
      // Standard GA4 parameters
      page_path?: string;
      page_title?: string;
      page_location?: string;
      anonymize_ip?: boolean;
      send_page_view?: boolean;

      // ✅ Consent Mode V2 parameters
      ad_storage?: 'granted' | 'denied';
      ad_user_data?: 'granted' | 'denied';
      ad_personalization?: 'granted' | 'denied';
      analytics_storage?: 'granted' | 'denied';
      functionality_storage?: 'granted' | 'denied';
      personalization_storage?: 'granted' | 'denied';
      security_storage?: 'granted' | 'denied';
      wait_for_update?: number;

      [key: string]: unknown;
    },
  ): void;
}

export {};
