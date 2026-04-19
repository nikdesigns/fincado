'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adConfig';

const DISMISS_KEY = 'fincado_mobile_anchor_dismissed';

const firstFilled = (
  ...values: Array<string | undefined>
): string | undefined =>
  values.find((value) => Boolean(value && value.trim().length > 0))?.trim();

const ANCHOR_SLOT_ID =
  firstFilled(
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR,
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  ) ?? '3492850342';

const isCalculatorRoute = (pathname: string | null): boolean => {
  const path = (pathname ?? '').toLowerCase();
  if (!path) return false;

  if (
    path.includes('calculator') ||
    path === '/calculators' ||
    path.startsWith('/calculators/') ||
    path === '/hi/calculators' ||
    path.startsWith('/hi/calculators/') ||
    path === '/credit-score' ||
    path === '/hi/credit-score' ||
    path === '/sukanya-samriddhi' ||
    path === '/hi/sukanya-samriddhi' ||
    path === '/bank-emi' ||
    path.startsWith('/bank-emi/')
  ) {
    return true;
  }

  return false;
};

export default function MobileStickyAnchorAd() {
  const pathname = usePathname();
  const adRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 1023px)').matches;
  });
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  });

  const shouldRender = useMemo(
    () => isMobile && !dismissed && isCalculatorRoute(pathname),
    [isMobile, dismissed, pathname],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (shouldRender) {
      document.body.classList.add('has-mobile-anchor-ad');
      return () => document.body.classList.remove('has-mobile-anchor-ad');
    }

    document.body.classList.remove('has-mobile-anchor-ad');
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    const loadTimer = window.setTimeout(() => {
      if (!adRef.current) return;

      const insElement = adRef.current.querySelector('ins.adsbygoogle');
      if (!insElement) return;

      const alreadyProcessed = insElement.getAttribute(
        'data-adsbygoogle-status',
      );
      if (alreadyProcessed) return;

      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Anchor ad push failed:', error);
        }
      }
    }, 350);

    return () => window.clearTimeout(loadTimer);
  }, [shouldRender, pathname]);

  const handleDismiss = () => {
    setDismissed(true);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(DISMISS_KEY, '1');
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-10px_25px_-12px_rgba(2,6,23,0.4)] backdrop-blur lg:hidden">
      <div className="mx-auto w-full max-w-xl px-2 pt-1 pb-[calc(env(safe-area-inset-bottom)+4px)]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
            Advertisement
          </span>
          <button
            type="button"
            aria-label="Close sticky ad"
            onClick={handleDismiss}
            className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div
          ref={adRef}
          className="min-h-12.5 overflow-hidden rounded-md border border-slate-100 bg-slate-50"
        >
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={ADSENSE_PUBLISHER_ID}
            data-ad-slot={ANCHOR_SLOT_ID}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
            suppressHydrationWarning={true}
          />
        </div>
      </div>
    </div>
  );
}
