'use client';

import { useEffect, useState, useCallback } from 'react';
import Script from 'next/script';
import { getConsentState } from '@/lib/consent';

// ========================================
// 🔧 CONFIGURATION
// ========================================
const GOOGLE_ANALYTICS_ID = 'G-KQJ4P0CM5Q';
const CLARITY_PROJECT_ID = 'uriyp76yk8';
const IS_DEVELOPMENT = false;

export default function ScriptManager() {
  // ✅ FIX: Initialize consent state directly from getConsentState
  const [consent, setConsent] = useState<{
    analytics: boolean;
    advertising: boolean;
  }>(() => {
    // This runs only once during component mount
    const state = getConsentState();
    return {
      analytics: state?.analytics ?? false,
      advertising: state?.advertising ?? false,
    };
  });

  const [scriptsLoaded, setScriptsLoaded] = useState({
    analytics: false,
    clarity: false,
  });

  const [scriptErrors, setScriptErrors] = useState({
    analytics: false,
    clarity: false,
  });

  // ✅ Define updateGoogleConsent using useCallback BEFORE using it
  const updateGoogleConsent = useCallback(
    (analytics: boolean, advertising: boolean) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: analytics ? 'granted' : 'denied',
          ad_storage: advertising ? 'granted' : 'denied',
          ad_user_data: advertising ? 'granted' : 'denied',
          ad_personalization: advertising ? 'granted' : 'denied',
        });

        if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
          console.log('✅ Google Consent Mode updated:', {
            analytics_storage: analytics ? 'granted' : 'denied',
            ad_storage: advertising ? 'granted' : 'denied',
          });
        }
      }
    },
    [],
  );

  // ✅ Listen for consent updates (no setState on mount)
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      const state = event.detail;
      setConsent({
        analytics: state.analytics,
        advertising: state.advertising,
      });

      // Update Google Consent Mode
      updateGoogleConsent(state.analytics, state.advertising);
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
  }, [updateGoogleConsent]);

  // ✅ Google Consent Mode V2 Implementation
  useEffect(() => {
    if (scriptsLoaded.analytics && !scriptErrors.analytics) {
      try {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];

        // Define gtag function
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        };

        window.gtag('js', new Date());

        // ✅ Set default consent state BEFORE GA4 initialization
        // All tracking starts in 'denied' state (cookieless mode)
        window.gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted', // Essential cookies always granted
          personalization_storage: 'denied',
          security_storage: 'granted', // Security cookies always granted
          wait_for_update: 500, // Wait 500ms for consent banner interaction
        });

        // Initialize GA4
        window.gtag('config', GOOGLE_ANALYTICS_ID, {
          page_path: window.location.pathname,
          anonymize_ip: true,
          send_page_view: true,
        });

        // If user already consented (returning visitor), update immediately
        const state = getConsentState();
        if (state) {
          updateGoogleConsent(state.analytics, state.advertising);

          if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
            console.log('✅ GA4 initialized with existing consent:', state);
          }
        } else {
          if (IS_DEVELOPMENT || process.env.NODE_ENV === 'development') {
            console.log(
              '✅ GA4 initialized in cookieless mode (awaiting consent)',
            );
          }
        }
      } catch (error) {
        console.error('Failed to initialize Google Analytics:', error);
      }
    }
  }, [scriptsLoaded.analytics, scriptErrors.analytics, updateGoogleConsent]);

  return (
    <>
      {/* ✅ Google Analytics - ALWAYS LOADS (Consent Mode V2) */}
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
          console.error('❌ Google Analytics script failed to load');
        }}
      />

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
