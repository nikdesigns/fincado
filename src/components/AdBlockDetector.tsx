'use client';

import { useState, useEffect } from 'react';
import { useAdBlocker } from '@/hooks/useAdBlocker';
import { X, HeartHandshake, Info, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdBlockDetector() {
  const isAdBlockEnabled = useAdBlocker({
    delayMs: 3000, // Wait 3 seconds before checking
    checkAttempts: 3, // Try 3 times to be sure
    retryInterval: 1000, // Wait 1 second between attempts
  });

  const [isClosed, setIsClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check if user prefers reduced motion (accessibility)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check if user has previously dismissed
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('adblock_notice_dismissed');
      const lastDismissed = localStorage.getItem(
        'adblock_notice_last_dismissed',
      );

      if (dismissed === 'permanent') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClosed(true);
      } else if (dismissed === 'session') {
        // Session dismiss - only show once per browser session
        setIsClosed(true);
      } else if (lastDismissed) {
        // Temporary dismiss - show again after 7 days
        const daysSince =
          (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24);
        if (daysSince < 7) {
          setIsClosed(true);
        } else {
          // Clear expired temporary dismissal
          localStorage.removeItem('adblock_notice_dismissed');
          localStorage.removeItem('adblock_notice_last_dismissed');
        }
      }
    } catch (error) {
      console.error('Error checking ad block dismissal:', error);
    }
  }, []);

  const handleClose = (type: 'session' | 'temporary' | 'permanent') => {
    setIsClosed(true);

    try {
      if (type === 'permanent') {
        localStorage.setItem('adblock_notice_dismissed', 'permanent');
        localStorage.setItem('adblock_whitelisted', 'true');
      } else if (type === 'session') {
        sessionStorage.setItem('adblock_notice_dismissed', 'session');
      } else if (type === 'temporary') {
        localStorage.setItem(
          'adblock_notice_last_dismissed',
          Date.now().toString(),
        );
      }
    } catch (error) {
      console.error('Error saving ad block dismissal:', error);
    }

    // Track dismissal (optional - only if you use Google Analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'adblock_notice_dismissed', {
        dismiss_type: type,
      });
    }
  };

  // Don't render if ad block not detected or user closed it
  if (!isAdBlockEnabled || isClosed) return null;

  // Minimized state - small floating button
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-100 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 no-print hover:scale-110"
        aria-label="Show ad blocker notice"
        title="Support Free Tools"
      >
        <HeartHandshake className="w-5 h-5" />
      </button>
    );
  }

  // Animation class based on user preference
  const animationClass = prefersReducedMotion
    ? ''
    : 'animate-in slide-in-from-bottom-8 fade-in duration-700';

  return (
    <div
      className={`fixed bottom-4 right-4 z-100 w-full max-w-md px-4 sm:px-0 no-print ${animationClass}`}
      role="dialog"
      aria-labelledby="adblock-title"
      aria-describedby="adblock-description"
      aria-live="polite"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="flex gap-4 relative z-10">
          {/* Icon Area */}
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 ring-1 ring-emerald-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 pt-0.5">
            <h3
              id="adblock-title"
              className="font-bold text-slate-900 text-base mb-2"
            >
              Support Free Financial Tools 🙏
            </h3>

            <p
              id="adblock-description"
              className="text-sm text-slate-600 leading-relaxed mb-4"
            >
              We&apos;ve noticed you&apos;re using an ad blocker. That&apos;s
              okay! But ads help us keep these premium calculators completely
              free for everyone.
            </p>

            {/* Privacy Promise Box */}
            <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">
                    We respect your privacy:
                  </strong>
                  <br />
                  No tracking ads • No data selling • No pop-ups
                  <br />
                  Just contextual, static ads.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={() => handleClose('permanent')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm shadow-sm"
                aria-label="I will whitelist Fincado"
              >
                I&apos;ll whitelist Fincado ✓
              </Button>

              <div className="flex gap-2">
                <Button
                  onClick={() => setIsMinimized(true)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  aria-label="Minimize this notice"
                >
                  <Minimize2 className="w-3 h-3 mr-1" />
                  Minimize
                </Button>
                <Button
                  onClick={() => handleClose('temporary')}
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                  aria-label="Remind me in 7 days"
                >
                  Remind me later
                </Button>
              </div>
            </div>
          </div>

          {/* Top Right Close Button */}
          <button
            onClick={() => handleClose('session')}
            className="absolute top-2 right-2 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
            aria-label="Close this message for this session"
            title="Close (this session only)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
