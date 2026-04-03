'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { getConsentState } from '@/lib/consent';

// ========================================
// 🔧 CONFIGURATION
// ========================================
const GOOGLE_ANALYTICS_ID = 'G-KQJ4P0CM5Q';
const CLARITY_PROJECT_ID = 'pby2eqwxp8';
const ADSENSE_CLIENT_ID = 'ca-pub-6648091987919638';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export default function ScriptManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [consent, setConsent] = useState<{
    analytics: boolean;
    advertising: boolean;
  }>(() => {
    if (typeof window !== 'undefined') {
      const state = getConsentState();
      return {
        analytics: state?.analytics ?? false,
        advertising: state?.advertising ?? false,
      };
    }
    return { analytics: false, advertising: false };
  });

  const [scriptsLoaded, setScriptsLoaded] = useState({
    analytics: false,
  });

  // ✅ Configure AdSense personalization mode based on consent
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.adsbygoogle = window.adsbygoogle || [];
    // 1 = non-personalized ads, 0 = personalized ads
    (
      window.adsbygoogle as unknown as { requestNonPersonalizedAds?: 0 | 1 }
    ).requestNonPersonalizedAds = consent.advertising ? 0 : 1;
  }, [consent.advertising]);

  // ✅ Initialize GA4 once script loads
  useEffect(() => {
    if (!scriptsLoaded.analytics) return;

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];

      if (!window.gtag) {
        window.gtag = function (...args: unknown[]) {
          window.dataLayer.push(args);
        };
      }

      // Initialize GA4
      window.gtag('js', new Date());

      // Set Default Consent (BEFORE config)
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted',
        wait_for_update: 500,
      });

      // Configure GA4
      window.gtag('config', GOOGLE_ANALYTICS_ID, {
        page_path: pathname,
        send_page_view: true,
      });

      // Apply saved consent if exists
      const state = getConsentState();
      if (state) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: state.advertising ? 'granted' : 'denied',
          ad_user_data: state.advertising ? 'granted' : 'denied',
          ad_personalization: state.advertising ? 'granted' : 'denied',
        });
      }

      if (IS_DEVELOPMENT) {
        console.log('✅ GA4 initialized');
      }
    }
  }, [scriptsLoaded.analytics, pathname]);

  // ✅ Track page views on navigation
  useEffect(() => {
    if (scriptsLoaded.analytics && window.gtag) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      window.gtag('config', GOOGLE_ANALYTICS_ID, {
        page_path: url,
      });

      if (IS_DEVELOPMENT) {
        console.log('📍 Page View:', url);
      }
    }
  }, [pathname, searchParams, scriptsLoaded.analytics]);

  // ✅ Listen for consent updates
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      const state = event.detail;
      setConsent({
        analytics: state.analytics,
        advertising: state.advertising,
      });

      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: state.advertising ? 'granted' : 'denied',
          ad_user_data: state.advertising ? 'granted' : 'denied',
          ad_personalization: state.advertising ? 'granted' : 'denied',
        });

        if (IS_DEVELOPMENT) {
          console.log('✅ Consent updated:', state);
        }
      }
    };

    window.addEventListener(
      'consentUpdated',
      handleConsentUpdate as EventListener,
    );

    return () =>
      window.removeEventListener(
        'consentUpdated',
        handleConsentUpdate as EventListener,
      );
  }, []);

  return (
    <>
      {/* Google Analytics */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        onLoad={() => {
          setScriptsLoaded((prev) => ({ ...prev, analytics: true }));
        }}
      />

      {/* Microsoft Clarity - Only if analytics consent granted */}
      <Script
        id="microsoft-clarity"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
        }}
      />
      {/* Google AdSense - always loaded; personalization controlled by consent */}
      <Script
        id="google-adsense"
        strategy="afterInteractive"
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      />
    </>
  );
}
