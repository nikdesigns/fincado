'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getConsentState } from '@/lib/consent';

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
    adsense: false,
  });

  const [scriptErrors, setScriptErrors] = useState({
    analytics: false,
    clarity: false,
    adsense: false,
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

  // Google Analytics initialization (only with consent)
  useEffect(() => {
    if (
      consent.analytics &&
      scriptsLoaded.analytics &&
      !scriptErrors.analytics
    ) {
      try {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', 'G-KQJ4P0CM5Q', {
          page_path: window.location.pathname,
          anonymize_ip: true,
        });
      } catch (error) {
        console.error('Failed to initialize Google Analytics:', error);
      }
    }
  }, [consent.analytics, scriptsLoaded.analytics, scriptErrors.analytics]);

  // ✅ Handle personalized vs non-personalized ads based on consent
  useEffect(() => {
    if (scriptsLoaded.adsense && typeof window !== 'undefined') {
      try {
        // Ensure adsbygoogle array exists
        window.adsbygoogle = window.adsbygoogle || [];

        // If user gave consent, enable personalized ads
        if (consent.advertising) {
          // Remove non-personalized flag to allow personalized ads
          if (window.adsbygoogle[0]) {
            window.adsbygoogle[0].requestNonPersonalizedAds = 0;
          }
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Personalized ads enabled (user consent given)');
          }
        } else {
          // Keep non-personalized ads (default)
          if (window.adsbygoogle[0]) {
            window.adsbygoogle[0].requestNonPersonalizedAds = 1;
          }
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Non-personalized ads active (GDPR compliant)');
          }
        }
      } catch (error) {
        console.warn('AdSense personalization setting failed:', error);
      }
    }
  }, [consent.advertising, scriptsLoaded.adsense]);

  return (
    <>
      {/* ========================================
          ✅ GOOGLE ADSENSE - ALWAYS LOAD
          Uses non-personalized ads by default (GDPR compliant)
          Upgrades to personalized if user gives consent
          ======================================== */}
      {!scriptErrors.adsense && (
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6648091987919638"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          data-ad-client="ca-pub-6648091987919638"
          onLoad={() => {
            setScriptsLoaded((prev) => ({ ...prev, adsense: true }));

            // Set non-personalized ads by default (GDPR)
            try {
              window.adsbygoogle = window.adsbygoogle || [];
              if (window.adsbygoogle[0]) {
                window.adsbygoogle[0].requestNonPersonalizedAds = 1;
              }
            } catch (e) {
              console.warn('Could not set ad preferences:', e);
            }

            if (process.env.NODE_ENV === 'development') {
              console.log(
                '✅ AdSense loaded successfully (non-personalized mode)',
              );
            }
          }}
          onError={() => {
            setScriptErrors((prev) => ({ ...prev, adsense: true }));
            if (process.env.NODE_ENV === 'development') {
              console.warn(
                '⚠️ AdSense failed to load. Common causes:\n' +
                  '  • Ad blocker enabled\n' +
                  '  • AdSense account not yet approved\n' +
                  '  • Testing on localhost (ads only work on live domain)\n' +
                  '  • Network/DNS issues\n' +
                  '\nIf account is approved and testing on live domain, check:\n' +
                  '  • https://adsense.google.com for account status\n' +
                  '  • Browser console for additional errors',
              );
            }
          }}
        />
      )}

      {/* ========================================
          GOOGLE ANALYTICS - Consent Required
          ======================================== */}
      {consent.analytics && !scriptErrors.analytics && (
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KQJ4P0CM5Q"
          onLoad={() => {
            setScriptsLoaded((prev) => ({ ...prev, analytics: true }));
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Google Analytics loaded');
            }
          }}
          onError={() => {
            setScriptErrors((prev) => ({ ...prev, analytics: true }));
            if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Google Analytics failed to load');
            }
          }}
        />
      )}

      {/* ========================================
          MICROSOFT CLARITY - Consent Required
          ======================================== */}
      {consent.analytics && !scriptErrors.clarity && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          onLoad={() => {
            setScriptsLoaded((prev) => ({ ...prev, clarity: true }));
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Microsoft Clarity loaded');
            }
          }}
          onError={() => {
            setScriptErrors((prev) => ({ ...prev, clarity: true }));
            if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Microsoft Clarity failed to load');
            }
          }}
        >
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "unxeapj33d");
          `}
        </Script>
      )}
    </>
  );
}

// ✅ NO GLOBAL DECLARATION HERE - It's in global.d.ts
