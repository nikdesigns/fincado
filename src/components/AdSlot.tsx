/* src/components/AdSlot.tsx */
'use client';

import { useEffect, useRef, useState } from 'react';

type AdType =
  | 'leaderboard'
  | 'banner'
  | 'box'
  | 'in-article'
  | 'rectangle'
  | 'square';

type AdSlotProps = {
  id?: string;
  type?: AdType;
  adSlot?: string;
  label?: string;
};

export default function AdSlot({
  id,
  type = 'banner',
  adSlot,
  label,
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  // ✅ 1. YOUR REAL ADSENSE IDs (Mapped correctly)
  const ADSENSE_IDS = {
    // Fincado Horizontal Master
    HORIZONTAL: '3492850342',

    // Fincado Square Master
    SQUARE: '6372673867',
  };

  // ✅ 2. LOGIC: Auto-select the correct ID based on the requested shape
  const getSlotId = () => {
    // If a specific ID is passed manually (e.g. for tracking), use it.
    if (adSlot) return adSlot;

    switch (type) {
      case 'leaderboard':
      case 'banner':
        return ADSENSE_IDS.HORIZONTAL;
      case 'box':
      case 'rectangle':
      case 'square':
      case 'in-article':
        return ADSENSE_IDS.SQUARE;
      default:
        return ADSENSE_IDS.HORIZONTAL;
    }
  };

  const finalSlotId = getSlotId();
  const PUBLISHER_ID = 'ca-pub-6648091987919638';

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Safety Checks
      if (!adRef.current) return;
      if (adRef.current.offsetWidth === 0) return; // Don't load in hidden divs
      if (isAdLoaded) return; // Prevent double-loading

      // Check if AdSense already filled this specific slot
      const insElement = adRef.current.querySelector('ins.adsbygoogle');
      if (insElement && insElement.getAttribute('data-adsbygoogle-status')) {
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdLoaded(true);
      } catch (e) {
        console.warn('AdSense push skipped', e);
      }
    }, 300); // 300ms delay ensures layout is ready

    return () => clearTimeout(timeout);
  }, [isAdLoaded]);

  // Sizing Logic (Prevents Layout Shift)
  const minHeightMap: Record<AdType, number> = {
    leaderboard: 90,
    banner: 90,
    box: 250,
    'in-article': 250,
    rectangle: 250,
    square: 250,
  };

  const minWidthMap: Record<AdType, string> = {
    leaderboard: '300px',
    banner: '300px',
    box: '250px',
    'in-article': '250px',
    rectangle: '300px',
    square: '250px',
  };

  // AdSense Format Mapping
  const formatMap: Record<AdType, string> = {
    leaderboard: 'horizontal',
    banner: 'horizontal',
    box: 'rectangle',
    'in-article': 'fluid',
    rectangle: 'rectangle',
    square: 'rectangle',
  };

  return (
    <div className="flex flex-col items-center my-8">
      {/* Label is placed ABOVE the ad to avoid Policy Violation */}
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
