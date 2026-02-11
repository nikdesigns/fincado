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
    gtag: (...args: unknown[]) => void; // ⚠️ REMOVED optional (?) - must be required

    // ✅ Microsoft Clarity
    clarity?: (...args: unknown[]) => void;
  }

  // ✅ Explicitly declare gtag function type for better type safety
  function gtag(
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: {
      page_path?: string;
      page_title?: string;
      page_location?: string;
      anonymize_ip?: boolean;
      send_page_view?: boolean;
      [key: string]: unknown;
    },
  ): void;
}

export {};
