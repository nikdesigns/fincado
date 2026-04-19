'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { getConsentState } from '@/lib/consent';
import {
  ADSENSE_PUBLISHER_ID,
  CLARITY_PROJECT_ID,
  GOOGLE_ANALYTICS_ID,
} from '@/lib/adConfig';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export default function ScriptManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() ?? '';
  const lastTrackedUrlRef = useRef<string | null>(null);

  const [consent, setConsent] = useState<{
    advertising: boolean;
    analytics: boolean;
  }>(() => {
    if (typeof window !== 'undefined') {
      const state = getConsentState();
      return {
        advertising: state?.advertising ?? false,
        analytics: state?.analytics ?? false,
      };
    }
    return { advertising: false, analytics: false };
  });

  // Keep AdSense and Consent Mode in sync with saved preferences.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.adsbygoogle = window.adsbygoogle || [];
    (
      window.adsbygoogle as unknown as { requestNonPersonalizedAds?: 0 | 1 }
    ).requestNonPersonalizedAds = consent.advertising ? 0 : 1;

    const applyGtagConsent = () => {
      if (!window.gtag) return false;

      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.advertising ? 'granted' : 'denied',
        ad_user_data: consent.advertising ? 'granted' : 'denied',
        ad_personalization: consent.advertising ? 'granted' : 'denied',
      });

      return true;
    };

    // gtag may not be available on the first client tick.
    if (applyGtagConsent()) return;

    const retryTimers = [300, 1000, 2500].map((delay) =>
      window.setTimeout(applyGtagConsent, delay),
    );

    return () => {
      retryTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [consent.advertising, consent.analytics]);

  // Track page views on navigation
  useEffect(() => {
    if (!consent.analytics) return;

    const url =
      pathname + (searchParamsString ? `?${searchParamsString}` : '');

    const emitPageView = () => {
      if (typeof window === 'undefined' || !window.gtag) return false;
      if (lastTrackedUrlRef.current === url) return true;

      window.gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GOOGLE_ANALYTICS_ID,
      });
      lastTrackedUrlRef.current = url;

      if (IS_DEVELOPMENT) {
        console.log('📍 GA4 page_view:', url);
      }

      return true;
    };

    if (emitPageView()) return;

    const retryTimers = [300, 1000, 2500].map((delay) =>
      window.setTimeout(emitPageView, delay),
    );

    return () => {
      retryTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname, searchParamsString, consent.analytics]);

  // Listen for consent updates.
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      const state = event.detail;
      setConsent({
        advertising: Boolean(state.advertising),
        analytics: Boolean(state.analytics),
      });
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
      {/* Google Analytics (analytics-consent gated) */}
      {consent.analytics && (
        <>
          <Script
            id="google-analytics-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('consent', 'default', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  analytics_storage: 'granted',
                  functionality_storage: 'granted',
                  personalization_storage: 'denied',
                  security_storage: 'granted'
                });
                gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                  send_page_view: false
                });
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity (analytics-consent gated) */}
      {consent.analytics && (
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
      )}

      {/* Google AdSense - always loaded; personalization controlled by consent */}
      <Script
        id="google-adsense"
        strategy="afterInteractive"
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
      />
    </>
  );
}
