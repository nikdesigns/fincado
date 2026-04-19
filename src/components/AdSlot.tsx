/* src/components/AdSlot.tsx */
'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adConfig';

type AdType =
  | 'leaderboard'
  | 'banner'
  | 'box'
  | 'in-article'
  | 'rectangle'
  | 'square'
  | 'skyscraper';

type AdSlotProps = {
  id?: string;
  type?: AdType;
  adSlot?: string;
  label?: string;
  lazyLoad?: boolean;
  className?: string;
};

type DeviceType = 'desktop' | 'mobile';
type RouteType =
  | 'home'
  | 'calculator'
  | 'guideHub'
  | 'guideArticle'
  | 'default';
type SlotBucket = 'top' | 'afterCalc' | 'mid' | 'bottom' | 'sidebar' | 'other';

type SlotRecord = {
  slotKey: string;
  bucket: SlotBucket;
  priority: number;
  mountedAt: number;
};

type RouteSlotState = {
  slots: Map<string, SlotRecord>;
};

type RoutePolicy = {
  maxAds: number;
  bucketLimits: Record<SlotBucket, number>;
};

const ROUTE_SLOT_EVENT = 'fincado:route-slot-update';

// Prevent duplicate adsbygoogle push calls for the same rendered slot.
const pushedSlots = new Set<string>();

// Route-level ad slot registry for prioritization.
const routeSlotRegistry = new Map<string, RouteSlotState>();
let slotMountCounter = 0;

const HORIZONTAL_FALLBACK_SLOT = '3492850342';
const RECTANGLE_FALLBACK_SLOT = '6372673867';

const firstFilled = (...values: Array<string | undefined>): string | undefined =>
  values.find((value) => Boolean(value && value.trim().length > 0))?.trim();

const BUCKET_SLOT_IDS: Record<SlotBucket, string> = {
  top:
    firstFilled(
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER,
    ) ?? HORIZONTAL_FALLBACK_SLOT,
  afterCalc:
    firstFilled(
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_CALC,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTERCALC,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID,
    ) ?? RECTANGLE_FALLBACK_SLOT,
  mid:
    firstFilled(
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
    ) ?? RECTANGLE_FALLBACK_SLOT,
  bottom:
    firstFilled(
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID,
    ) ?? HORIZONTAL_FALLBACK_SLOT,
  sidebar:
    firstFilled(
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_RAIL,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID,
    ) ?? RECTANGLE_FALLBACK_SLOT,
  other:
    firstFilled(
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID,
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
    ) ?? RECTANGLE_FALLBACK_SLOT,
};

const createBucketLimits = (
  overrides: Partial<Record<SlotBucket, number>>,
): Record<SlotBucket, number> => ({
  top: 0,
  afterCalc: 0,
  mid: 0,
  bottom: 0,
  sidebar: 0,
  other: 0,
  ...overrides,
});

const HOME_DESKTOP_POLICY: RoutePolicy = {
  maxAds: 2,
  bucketLimits: createBucketLimits({ top: 1, mid: 1 }),
};

const HOME_MOBILE_POLICY: RoutePolicy = {
  maxAds: 2,
  bucketLimits: createBucketLimits({ top: 1, mid: 1 }),
};

const CALCULATOR_DESKTOP_POLICY: RoutePolicy = {
  maxAds: 4,
  bucketLimits: createBucketLimits({
    top: 1,
    afterCalc: 1,
    mid: 1,
    sidebar: 1,
    bottom: 1,
  }),
};

const CALCULATOR_MOBILE_POLICY: RoutePolicy = {
  maxAds: 3,
  bucketLimits: createBucketLimits({
    top: 1,
    afterCalc: 1,
    mid: 1,
    bottom: 1,
  }),
};

const GUIDE_HUB_DESKTOP_POLICY: RoutePolicy = {
  maxAds: 3,
  bucketLimits: createBucketLimits({ top: 1, mid: 1, bottom: 1 }),
};

const GUIDE_HUB_MOBILE_POLICY: RoutePolicy = {
  maxAds: 2,
  bucketLimits: createBucketLimits({ top: 1, mid: 1 }),
};

const GUIDE_ARTICLE_DESKTOP_POLICY: RoutePolicy = {
  maxAds: 5,
  bucketLimits: createBucketLimits({ top: 1, mid: 2, bottom: 1, sidebar: 1 }),
};

const GUIDE_ARTICLE_MOBILE_POLICY: RoutePolicy = {
  maxAds: 3,
  bucketLimits: createBucketLimits({ top: 1, mid: 1, bottom: 1 }),
};

const DEFAULT_DESKTOP_POLICY: RoutePolicy = {
  maxAds: 3,
  bucketLimits: createBucketLimits({ top: 1, mid: 1, sidebar: 1, bottom: 1 }),
};

const DEFAULT_MOBILE_POLICY: RoutePolicy = {
  maxAds: 2,
  bucketLimits: createBucketLimits({ top: 1, mid: 1, bottom: 1 }),
};

const BASE_PRIORITY: Record<RouteType, Record<SlotBucket, number>> = {
  home: {
    top: 100,
    afterCalc: 82,
    mid: 92,
    bottom: 84,
    sidebar: 72,
    other: 68,
  },
  calculator: {
    top: 100,
    afterCalc: 97,
    mid: 90,
    bottom: 78,
    sidebar: 86,
    other: 64,
  },
  guideHub: {
    top: 98,
    afterCalc: 86,
    mid: 92,
    bottom: 82,
    sidebar: 74,
    other: 62,
  },
  guideArticle: {
    top: 100,
    afterCalc: 88,
    mid: 95,
    bottom: 87,
    sidebar: 84,
    other: 66,
  },
  default: {
    top: 96,
    afterCalc: 90,
    mid: 86,
    bottom: 80,
    sidebar: 76,
    other: 68,
  },
};

const normalizeSlotId = (slotId?: string): string => (slotId ?? '').toLowerCase();

const getTrailingIndex = (normalizedSlotId: string): number | null => {
  const match = normalizedSlotId.match(/(?:-|_)(\d{1,2})$/);
  if (!match) return null;

  const parsed = Number.parseInt(match[1], 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const detectRouteType = (pathname: string | null): RouteType => {
  const path = (pathname ?? '/').toLowerCase();

  if (path === '/' || path === '/hi') return 'home';

  const isGuidePath =
    path === '/guides' ||
    path.startsWith('/guides/') ||
    path === '/hi/guides' ||
    path.startsWith('/hi/guides/');

  if (isGuidePath) {
    if (
      path === '/guides' ||
      path === '/hi/guides' ||
      path.startsWith('/guides/category/') ||
      path.startsWith('/hi/guides/category/')
    ) {
      return 'guideHub';
    }

    return 'guideArticle';
  }

  const calculatorLikePaths = new Set([
    '/credit-score',
    '/hi/credit-score',
    '/sukanya-samriddhi',
    '/hi/sukanya-samriddhi',
    '/bank-emi'
  ]);

  if (
    path.includes('calculator') ||
    path === '/calculators' ||
    path.startsWith('/calculators/') ||
    path === '/hi/calculators' ||
    path.startsWith('/hi/calculators/') ||
    path.startsWith('/bank-emi/') ||
    calculatorLikePaths.has(path)
  ) {
    return 'calculator';
  }

  return 'default';
};

const getRoutePolicy = (routeType: RouteType, deviceType: DeviceType): RoutePolicy => {
  if (routeType === 'home') {
    return deviceType === 'mobile' ? HOME_MOBILE_POLICY : HOME_DESKTOP_POLICY;
  }

  if (routeType === 'calculator') {
    return deviceType === 'mobile'
      ? CALCULATOR_MOBILE_POLICY
      : CALCULATOR_DESKTOP_POLICY;
  }

  if (routeType === 'guideHub') {
    return deviceType === 'mobile'
      ? GUIDE_HUB_MOBILE_POLICY
      : GUIDE_HUB_DESKTOP_POLICY;
  }

  if (routeType === 'guideArticle') {
    return deviceType === 'mobile'
      ? GUIDE_ARTICLE_MOBILE_POLICY
      : GUIDE_ARTICLE_DESKTOP_POLICY;
  }

  return deviceType === 'mobile' ? DEFAULT_MOBILE_POLICY : DEFAULT_DESKTOP_POLICY;
};

const getRouteKey = (pathname: string | null, deviceType: DeviceType): string =>
  `${pathname ?? '/'}::${deviceType}`;

const detectSlotBucket = (slotId: string | undefined, type: AdType): SlotBucket => {
  const normalized = normalizeSlotId(slotId);

  if (normalized.includes('sidebar') || type === 'skyscraper') {
    return 'sidebar';
  }

  if (
    normalized.includes('after-calc') ||
    normalized.includes('after_calc') ||
    normalized.includes('aftercalc')
  ) {
    return 'afterCalc';
  }

  if (normalized.includes('anchor')) {
    return 'bottom';
  }

  if (normalized.includes('top') || normalized.includes('hero')) {
    return 'top';
  }

  if (normalized.includes('bottom')) {
    return 'bottom';
  }

  if (
    normalized.includes('mid') ||
    normalized.includes('before-faq') ||
    normalized.includes('in-content') ||
    normalized.includes('incontent') ||
    normalized.includes('infeed') ||
    normalized.includes('with') ||
    normalized.includes('rect') ||
    normalized.includes('banner')
  ) {
    return 'mid';
  }

  const trailingIndex = getTrailingIndex(normalized);
  if (trailingIndex !== null) {
    if (trailingIndex <= 1) return 'top';
    if (trailingIndex <= 3) return 'mid';
    return 'bottom';
  }

  if (type === 'leaderboard' || type === 'banner') return 'mid';
  if (type === 'box' || type === 'rectangle' || type === 'square' || type === 'in-article') {
    return 'mid';
  }

  return 'other';
};

const getSlotPriority = (
  routeType: RouteType,
  bucket: SlotBucket,
  slotId?: string,
): number => {
  const normalized = normalizeSlotId(slotId);
  let score = BASE_PRIORITY[routeType][bucket];

  if (normalized.includes('after-calc')) score += 6;
  if (normalized.includes('before-faq')) score += 4;
  if (normalized.includes('sidebar-top')) score += 4;
  if (normalized.includes('sidebar-bottom')) score -= 4;
  if (normalized.includes('bottom')) score -= 2;
  if (normalized.includes('top')) score += 3;

  const trailingIndex = getTrailingIndex(normalized);
  if (trailingIndex !== null) {
    score += Math.max(0, 12 - trailingIndex * 2);
  }

  return score;
};

const emitRouteSlotUpdate = (routeKey: string): void => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<{ routeKey: string }>(ROUTE_SLOT_EVENT, {
      detail: { routeKey },
    }),
  );
};

const registerRouteSlot = (routeKey: string, slot: SlotRecord): void => {
  const state = routeSlotRegistry.get(routeKey) ?? { slots: new Map() };
  state.slots.set(slot.slotKey, slot);
  routeSlotRegistry.set(routeKey, state);
};

const unregisterRouteSlot = (routeKey: string, slotKey: string): void => {
  const state = routeSlotRegistry.get(routeKey);
  if (!state) return;

  state.slots.delete(slotKey);
  if (state.slots.size === 0) {
    routeSlotRegistry.delete(routeKey);
    return;
  }

  routeSlotRegistry.set(routeKey, state);
};

const getAllowedSlotKeys = (
  routeKey: string,
  routeType: RouteType,
  deviceType: DeviceType,
): Set<string> => {
  const state = routeSlotRegistry.get(routeKey);
  if (!state) return new Set();

  const policy = getRoutePolicy(routeType, deviceType);
  const selected = new Set<string>();
  const bucketCounts = createBucketLimits({});

  const sortedSlots = Array.from(state.slots.values()).sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.mountedAt - b.mountedAt;
  });

  for (const slot of sortedSlots) {
    if (selected.size >= policy.maxAds) break;

    const limit = policy.bucketLimits[slot.bucket] ?? 0;
    if (limit <= 0) continue;
    if (bucketCounts[slot.bucket] >= limit) continue;

    selected.add(slot.slotKey);
    bucketCounts[slot.bucket] += 1;
  }

  return selected;
};

const isSlotAllowed = (
  routeKey: string,
  slotKey: string,
  routeType: RouteType,
  deviceType: DeviceType,
): boolean => getAllowedSlotKeys(routeKey, routeType, deviceType).has(slotKey);

export default function AdSlot({
  id,
  type = 'banner',
  adSlot,
  label,
  lazyLoad = true,
  className = '',
}: AdSlotProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLDivElement>(null);
  const telemetryStateRef = useRef<'shown' | 'suppressed' | null>(null);
  const reactId = useId();

  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [, setSelectionVersion] = useState(0);

  const slotBucket = useMemo(() => detectSlotBucket(id, type), [id, type]);

  const finalSlotId = useMemo(() => {
    if (adSlot && adSlot.trim().length > 0) return adSlot.trim();

    const bucketSlotId = BUCKET_SLOT_IDS[slotBucket];
    if (bucketSlotId) return bucketSlotId;

    if (type === 'leaderboard' || type === 'banner') {
      return HORIZONTAL_FALLBACK_SLOT;
    }

    return RECTANGLE_FALLBACK_SLOT;
  }, [adSlot, slotBucket, type]);

  const publisherId = ADSENSE_PUBLISHER_ID;
  const fallbackId = id ?? reactId.replace(/:/g, '');

  // Stable ID for this instance in route-level selection
  const uniqueAdId = `${finalSlotId}-${fallbackId}`;
  const routeType = useMemo(() => detectRouteType(pathname), [pathname]);
  const routeKey = useMemo(
    () => getRouteKey(pathname, deviceType),
    [pathname, deviceType],
  );
  const slotPriority = useMemo(
    () => getSlotPriority(routeType, slotBucket, id),
    [routeType, slotBucket, id],
  );

  // Track desktop/mobile breakpoint for per-device ad policy.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const applyDeviceType = () => {
      setDeviceType(mediaQuery.matches ? 'mobile' : 'desktop');
    };

    applyDeviceType();
    mediaQuery.addEventListener('change', applyDeviceType);

    return () => mediaQuery.removeEventListener('change', applyDeviceType);
  }, []);

  // Subscribe to slot selection updates for this route.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleRouteSlotUpdate = (event: Event) => {
      const detail = (event as CustomEvent<{ routeKey?: string }>).detail;
      if (!detail?.routeKey || detail.routeKey === routeKey) {
        setSelectionVersion((current) => current + 1);
      }
    };

    window.addEventListener(
      ROUTE_SLOT_EVENT,
      handleRouteSlotUpdate as EventListener,
    );

    return () =>
      window.removeEventListener(
        ROUTE_SLOT_EVENT,
        handleRouteSlotUpdate as EventListener,
      );
  }, [routeKey]);

  // Register this slot in the route-level priority pool.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    registerRouteSlot(routeKey, {
      slotKey: uniqueAdId,
      bucket: slotBucket,
      priority: slotPriority,
      mountedAt: ++slotMountCounter,
    });
    emitRouteSlotUpdate(routeKey);

    return () => {
      unregisterRouteSlot(routeKey, uniqueAdId);
      emitRouteSlotUpdate(routeKey);
    };
  }, [routeKey, uniqueAdId, slotBucket, slotPriority]);

  const isSuppressed = !isSlotAllowed(
    routeKey,
    uniqueAdId,
    routeType,
    deviceType,
  );

  // Telemetry for slot admission decisions.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const decision: 'shown' | 'suppressed' = isSuppressed
      ? 'suppressed'
      : 'shown';
    const policy = getRoutePolicy(routeType, deviceType);
    const retryDelays = [180, 600, 1600];
    let retryIndex = 0;
    let telemetryTimer: number | null = null;

    const sendTelemetry = () => {
      if (telemetryStateRef.current === decision) return;

      if (!window.gtag) {
        if (retryIndex < retryDelays.length - 1) {
          retryIndex += 1;
          telemetryTimer = window.setTimeout(sendTelemetry, retryDelays[retryIndex]);
        }
        return;
      }

      window.gtag('event', 'ad_slot_decision', {
        event_category: 'ads',
        ad_decision: decision,
        route_type: routeType,
        slot_bucket: slotBucket,
        device_type: deviceType,
        slot_id: fallbackId,
        page_path: pathname ?? '/',
        slot_priority: slotPriority,
        policy_max_ads: policy.maxAds,
      });
      telemetryStateRef.current = decision;
    };

    telemetryTimer = window.setTimeout(sendTelemetry, retryDelays[retryIndex]);

    return () => {
      if (telemetryTimer !== null) {
        window.clearTimeout(telemetryTimer);
      }
    };
  }, [
    isSuppressed,
    routeType,
    slotBucket,
    deviceType,
    fallbackId,
    pathname,
    slotPriority
  ]);

  // Lazy-load ad when near viewport.
  useEffect(() => {
    if (isSuppressed || !lazyLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '400px',
        threshold: 0.01,
      },
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad, isSuppressed]);

  // Load AdSense only for selected and visible slots.
  useEffect(() => {
    if (isSuppressed) return;
    if (!isVisible) return;
    if (isAdLoaded) return;

    if (pushedSlots.has(uniqueAdId)) return;

    const timeout = setTimeout(() => {
      if (!adRef.current) return;

      const insElement = adRef.current.querySelector('ins.adsbygoogle');
      if (!insElement) return;

      const alreadyProcessed = insElement.getAttribute('data-adsbygoogle-status');
      if (alreadyProcessed) return;

      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          pushedSlots.add(uniqueAdId);

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setIsAdLoaded(true);
        }
      } catch (error) {
        pushedSlots.delete(uniqueAdId);

        if (process.env.NODE_ENV === 'development') {
          console.warn('AdSense push failed for slot:', finalSlotId, error);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      pushedSlots.delete(uniqueAdId);
    };
  }, [isVisible, isAdLoaded, finalSlotId, uniqueAdId, isSuppressed]);

  // Reserve space to minimize layout shift.
  const minHeightMap: Record<AdType, number> = {
    leaderboard: 90,
    banner: 90,
    box: 250,
    'in-article': 250,
    rectangle: 250,
    square: 250,
    skyscraper: 600,
  };

  // AdSense format mapping.
  const formatMap: Record<AdType, string> = {
    leaderboard: 'horizontal',
    banner: 'horizontal',
    box: 'rectangle',
    'in-article': 'rectangle',
    rectangle: 'rectangle',
    square: 'rectangle',
    skyscraper: 'vertical',
  };

  if (isSuppressed) return null;

  // Loading skeleton for lazy slots.
  if (lazyLoad && !isVisible) {
    return (
      <div
        ref={adRef}
        className={`flex flex-col items-center my-8 ${className}`}
      >
        {label && (
          <span className="self-end text-[10px] text-gray-400 uppercase tracking-wider mb-1 mr-1">
            {label}
          </span>
        )}
        <div
          className="ad-container flex justify-center items-center bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg overflow-hidden animate-pulse"
          style={{
            minHeight: minHeightMap[type],
            width: '100%',
          }}
        >
          <span className="text-xs text-gray-400">Loading ad...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center my-8 ${className}`}>
      {label && (
        <span className="self-end text-[10px] text-gray-400 uppercase tracking-wider mb-1 mr-1">
          {label}
        </span>
      )}

      <div
        ref={adRef}
        id={id}
        className="ad-container flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden"
        suppressHydrationWarning={true}
        style={{
          minHeight: minHeightMap[type],
          width: '100%',
          position: 'relative',
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={publisherId}
          data-ad-slot={finalSlotId}
          data-ad-format={formatMap[type]}
          data-full-width-responsive="true"
          suppressHydrationWarning={true}
        />
      </div>
    </div>
  );
}
