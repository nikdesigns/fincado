// src/types/global.d.ts

declare global {
  interface Window {
    // ✅ Google AdSense
    adsbygoogle: Array<{
      push?: (params?: unknown) => void;
      requestNonPersonalizedAds?: number;
      loaded?: boolean;
    }>;

    // ✅ Google Analytics
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;

    // ✅ Microsoft Clarity
    clarity?: (...args: unknown[]) => void;
  }
}

export {};
