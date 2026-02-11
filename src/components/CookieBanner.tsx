'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, CheckCircle2, Shield } from 'lucide-react';
import {
  getConsentState,
  saveConsent,
  acceptAll,
  rejectAll,
  ConsentState,
} from '@/lib/consent';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>({
    analytics: true,
    advertising: true,
    functional: true,
    // eslint-disable-next-line react-hooks/purity
    timestamp: Date.now(),
  });

  // ✅ Define handlers using useCallback BEFORE using them
  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setShow(false);

    // Track consent event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'consent_granted', {
        consent_type: 'all',
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ User accepted all cookies');
    }
  }, []);

  const handleRejectAll = useCallback(() => {
    rejectAll();
    setShow(false);

    if (process.env.NODE_ENV === 'development') {
      console.log('❌ User rejected all cookies');
    }
  }, []);

  const handleSavePreferences = useCallback(() => {
    saveConsent(preferences);
    setShow(false);

    // Track consent preferences
    if (preferences.analytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'consent_granted', {
        consent_type: 'custom',
        analytics: preferences.analytics,
        advertising: preferences.advertising,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('⚙️ User saved custom preferences:', preferences);
    }
  }, [preferences]);

  // Check initial consent state
  useEffect(() => {
    const consent = getConsentState();

    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
        if (process.env.NODE_ENV === 'development') {
          console.log('🍪 Cookie banner shown (no previous consent)');
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Previous consent found:', consent);
      }
    }
  }, []);

  // Auto-accept after 30 seconds if user doesn't interact
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      const currentState = getConsentState();

      if (!currentState) {
        handleAcceptAll();

        if (process.env.NODE_ENV === 'development') {
          console.log('⏰ Auto-accepted cookies after 30s (user inactive)');
        }
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [show, handleAcceptAll]);

  const togglePreference = (key: keyof ConsentState) => {
    if (key === 'timestamp') return;
    if (key === 'functional') return;

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!show) return null;

  // Settings view
  if (showSettings) {
    return (
      <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Settings className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-slate-600">
                  Manage your privacy settings
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Essential Cookies */}
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-900">
                    Essential Cookies
                  </h4>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                    Always Active
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Required for the website to function. These cookies enable
                  core functionality like security, network management, and
                  accessibility. They cannot be disabled.
                </p>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
              <div className="shrink-0">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={preferences.analytics}
                  onChange={() => togglePreference('analytics')}
                  className="w-5 h-5 mt-1 text-emerald-600 rounded focus:ring-emerald-500"
                />
              </div>
              <label htmlFor="analytics" className="flex-1 cursor-pointer">
                <h4 className="font-semibold text-slate-900 mb-1">
                  Analytics Cookies
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Help us understand how visitors interact with our website. We
                  use Google Analytics and Microsoft Clarity to improve user
                  experience. All data is anonymized.
                </p>
              </label>
            </div>

            {/* Advertising Cookies */}
            <div className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
              <div className="shrink-0">
                <input
                  type="checkbox"
                  id="advertising"
                  checked={preferences.advertising}
                  onChange={() => togglePreference('advertising')}
                  className="w-5 h-5 mt-1 text-emerald-600 rounded focus:ring-emerald-500"
                />
              </div>
              <label htmlFor="advertising" className="flex-1 cursor-pointer">
                <h4 className="font-semibold text-slate-900 mb-1">
                  Advertising Cookies
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Allow us to show relevant ads. We use Google AdSense to keep
                  our calculators free. These cookies don&apos;t track you
                  across other websites.
                </p>
              </label>
            </div>

            {/* Privacy Promise */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm text-slate-900 mb-1">
                    Our Privacy Promise
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We never sell your data. All tracking is anonymized and used
                    solely to improve our service. Read our{' '}
                    <Link
                      href="/privacy-policy/"
                      className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSavePreferences}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-semibold"
              >
                Save Preferences
              </Button>
              <Button
                onClick={() => setShowSettings(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default banner view
  return (
    <div className="fixed bottom-4 left-4 right-4 z-100 flex justify-center no-print">
      <div className="max-w-4xl w-full bg-slate-900/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-slate-700/50 animate-in slide-in-from-bottom-10 fade-in duration-700">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-slate-800 rounded-xl shrink-0 text-emerald-400">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg">We value your privacy 🍪</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                We use cookies to enhance your experience, analyze traffic, and
                keep our tools free with ads. You control your data.{' '}
                <Link
                  href="/privacy-policy/"
                  className="text-white underline decoration-emerald-500 underline-offset-2 hover:text-emerald-400 transition-colors font-medium"
                >
                  Learn more
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Button
              onClick={handleAcceptAll}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-5 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/20"
            >
              Accept All
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold px-6 py-5 rounded-xl"
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10 font-medium"
            >
              Reject All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
