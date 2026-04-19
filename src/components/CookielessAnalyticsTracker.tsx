'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  getCookielessEndpoint,
  trackCookielessEvent,
  trackCookielessPageView,
} from '@/lib/cookielessAnalytics';

const METRIC_SENT = new Set<string>();

const trackNavigationMetrics = (): void => {
  if (typeof performance === 'undefined') return;

  const entry = performance.getEntriesByType(
    'navigation',
  )[0] as PerformanceNavigationTiming | undefined;
  if (!entry) return;

  const metrics: Array<{ name: string; value: number }> = [
    { name: 'ttfb_ms', value: Math.max(0, entry.responseStart - entry.requestStart) },
    {
      name: 'dom_content_loaded_ms',
      value: Math.max(0, entry.domContentLoadedEventEnd - entry.startTime),
    },
    { name: 'load_time_ms', value: Math.max(0, entry.loadEventEnd - entry.startTime) },
  ];

  metrics.forEach((metric) => {
    if (METRIC_SENT.has(metric.name)) return;
    METRIC_SENT.add(metric.name);
    trackCookielessEvent('web_performance', metric);
  });
};

export default function CookielessAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() ?? '';
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!getCookielessEndpoint()) return;

    const url = pathname + (searchParamsString ? `?${searchParamsString}` : '');
    if (lastTrackedUrlRef.current === url) return;

    lastTrackedUrlRef.current = url;
    trackCookielessPageView(url);
  }, [pathname, searchParamsString]);

  useEffect(() => {
    if (!getCookielessEndpoint()) return;

    const metricsTimer = window.setTimeout(trackNavigationMetrics, 800);
    return () => window.clearTimeout(metricsTimer);
  }, []);

  return null;
}
