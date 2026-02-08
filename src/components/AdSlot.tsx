/* src/components/AdSlot.tsx */
'use client';

import { useEffect, useRef, useState } from 'react';

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

export default function AdSlot({
  id,
  type = 'banner',
  adSlot,
  label,
  lazyLoad = false,
  className = '',
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazyLoad);

  // ✅ YOUR REAL ADSENSE IDs
  const ADSENSE_IDS = {
    HORIZONTAL: '3492850342',
    SQUARE: '6372673867',
  };

  // ✅ Auto-select the correct ID based on ad type
  const getSlotId = () => {
    if (adSlot) return adSlot;

    switch (type) {
      case 'leaderboard':
      case 'banner':
        return ADSENSE_IDS.HORIZONTAL;
      case 'box':
      case 'rectangle':
      case 'square':
      case 'in-article':
      case 'skyscraper':
        return ADSENSE_IDS.SQUARE;
      default:
        return ADSENSE_IDS.HORIZONTAL;
    }
  };

  const finalSlotId = getSlotId();
  const PUBLISHER_ID = 'ca-pub-6648091987919638';

  // ✅ Lazy Loading with Intersection Observer
  useEffect(() => {
    if (!lazyLoad) return;

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
  }, [lazyLoad]);

  // ✅ Load AdSense when visible
  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      if (!adRef.current) return;
      if (isAdLoaded) return;

      // Check if AdSense already filled this slot
      const insElement = adRef.current.querySelector('ins.adsbygoogle');
      if (insElement && insElement.getAttribute('data-adsbygoogle-status')) {
        return;
      }

      try {
        // Ensure adsbygoogle array exists
        window.adsbygoogle = window.adsbygoogle || [];

        // Push ad request to AdSense
        if (window.adsbygoogle[0]?.push) {
          window.adsbygoogle[0].push({});
        } else {
          (
            window.adsbygoogle as Array<{ push?: (config: object) => void }>
          ).push({});
        }

        setIsAdLoaded(true);

        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ AdSense ad requested: ${id || type}`);
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('AdSense push failed:', e);
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [isVisible, isAdLoaded, id, type]);

  // ✅ Sizing Logic (Prevents Layout Shift)
  const minHeightMap: Record<AdType, number> = {
    leaderboard: 90,
    banner: 90,
    box: 250,
    'in-article': 250,
    rectangle: 250,
    square: 250,
    skyscraper: 600,
  };

  const minWidthMap: Record<AdType, string> = {
    leaderboard: '300px',
    banner: '300px',
    box: '250px',
    'in-article': '250px',
    rectangle: '300px',
    square: '250px',
    skyscraper: '300px',
  };

  // ✅ AdSense Format Mapping
  const formatMap: Record<AdType, string> = {
    leaderboard: 'horizontal',
    banner: 'horizontal',
    box: 'rectangle',
    'in-article': 'rectangle',
    rectangle: 'rectangle',
    square: 'rectangle',
    skyscraper: 'vertical',
  };

  // ✅ Show skeleton loader while lazy loading
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
            minWidth: minWidthMap[type],
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
      {/* Label above ad (Google policy compliant) */}
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
          minWidth: minWidthMap[type],
          width: '100%',
          position: 'relative',
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={finalSlotId}
          data-ad-format={formatMap[type]}
          data-full-width-responsive="true"
          suppressHydrationWarning={true}
        />
      </div>
    </div>
  );
}

// ✅ NO GLOBAL DECLARATION HERE - It's in global.d.ts
