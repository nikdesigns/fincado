'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { getConsentState } from '@/lib/consent';

const GOOGLE_ANALYTICS_ID = 'G-KQJ4P0CM5Q';
const CLARITY_PROJECT_ID = 'pby2eqwxp8';
const ADSENSE_CLIENT_ID = 'ca-pub-6648091987919638';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export default function ScriptManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [consent, setConsent] = useState<{ advertising: boolean }>(() => {
    if (typeof window !== 'undefined') {
      const state = getConsentState();
      return {
        advertising: state?.advertising ?? false,
      };
    }
    return { advertising: false };
  });

  // Configure AdSense personalization mode based on consent
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.adsbygoogle = window.adsbygoogle || [];
    (
      window.adsbygoogle as unknown as { requestNonPersonalizedAds?: 0 | 1 }
    ).requestNonPersonalizedAds = consent.advertising ? 0 : 1;
  }, [consent.advertising]);

  // Track page views on navigation
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GOOGLE_ANALYTICS_ID,
    });

    if (IS_DEVELOPMENT) {
      console.log('📍 GA4 page_view:', url);
    }
  }, [pathname, searchParams]);

  // Listen for consent updates (keep analytics always granted; ads based on preference)
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      const state = event.detail;
      setConsent({ advertising: state.advertising });

      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: state.advertising ? 'granted' : 'denied',
          ad_user_data: state.advertising ? 'granted' : 'denied',
          ad_personalization: state.advertising ? 'granted' : 'denied',
        });
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
      {/* Google Analytics (official gtag setup) */}
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
              send_page_view: true
            });
          `,
        }}
      />

      {/* Microsoft Clarity */}
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
