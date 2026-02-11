'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getConsentState } from '@/lib/consent';

// ========================================
// 🔧 CONFIGURATION - Replace these values
// ========================================
const GOOGLE_ANALYTICS_ID = 'G-KQJ4P0CM5Q';
const CLARITY_PROJECT_ID = 'uriyp76yk8';
const IS_DEVELOPMENT = false; // Set to true for debugging logs

export default function ScriptManager() {
  const [consent, setConsent] = useState<{
    analytics: boolean;
    advertising: boolean;
  }>({
    analytics: false,
    advertising: false,
  });

  const [scriptsLoaded, setScriptsLoaded] = useState({
    analytics: false,
    clarity: false,
  });

  const [scriptErrors, setScriptErrors] = useState({
    analytics: false,
    clarity: false,
  });

  useEffect(() => {
    // Check initial consent state
    const state = getConsentState();
    if (state) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent({
        analytics: state.analytics,
        advertising: state.advertising,
      });
    }

    // Listen for consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      const state = event.detail;
      setConsent({
        analytics: state.analytics,
        advertising: state.advertising,
      });
    };

    window.addEventListener(
      'consentUpdated',
      handleConsentUpdate as EventListener,
    );

    return () => {
      window.removeEventListener(
        'consentUpdated',
        handleConsentUpdate as EventListener,
      );
    };
  }, []);

  // Google Analytics initialization
  useEffect(() => {
    if (
      consent.analytics &&
      scriptsLoaded.analytics &&
      !scriptErrors.analytics
    ) {
      try {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];

        // ✅ FIX: Changed from 'arguments' to rest parameters '...args'
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        };

        // Initialize GA4
        window.gtag('js', new Date());
        window.gtag('config', GOOGLE_ANALYTICS_ID, {
          page_path: window.location.pathname,
          anonymize_ip: true,
          send_page_view: true,
        });

        if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
          console.log(
            `✅ Google Analytics initialized with ID: ${GOOGLE_ANALYTICS_ID}`,
          );
        }
      } catch (error) {
        console.error('Failed to initialize Google Analytics:', error);
      }
    }
  }, [consent.analytics, scriptsLoaded.analytics, scriptErrors.analytics]);

  return (
    <>
      {/* Google Analytics - Load only with analytics consent */}
      {consent.analytics && !scriptErrors.analytics && (
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          onLoad={() => {
            setScriptsLoaded((prev) => ({ ...prev, analytics: true }));
            if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
              console.log('✅ Google Analytics script loaded');
            }
          }}
          onError={() => {
            setScriptErrors((prev) => ({ ...prev, analytics: true }));
            if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
              console.error('❌ Google Analytics script failed to load');
            }
          }}
        />
      )}

      {/* Microsoft Clarity - Load only with analytics consent */}
      {consent.analytics && !scriptErrors.clarity && (
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          onLoad={() => {
            setScriptsLoaded((prev) => ({ ...prev, clarity: true }));
            if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
              console.log('✅ Microsoft Clarity loaded');
            }
          }}
          onError={() => {
            setScriptErrors((prev) => ({ ...prev, clarity: true }));
            if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Microsoft Clarity failed to load');
            }
          }}
        >
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
    </>
  );
}
