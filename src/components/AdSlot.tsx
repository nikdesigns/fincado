/* src/components/AdSlot.tsx */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useEffect, useRef } from 'react';

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
  label?: string; // ✅ ADDED: This line fixes the error
};

export default function AdSlot({
  id,
  type = 'banner',
  adSlot,
  label, // ✅ ADDED: Now we accept the prop
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!adRef.current) return;

      const width = adRef.current.offsetWidth;

      // 🚫 Prevent push if width is zero
      if (width === 0) return;

      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense push skipped', e);
      }
    }, 300); // ⏳ allow layout to settle

    return () => clearTimeout(timeout);
  }, []);

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

  const formatMap: Record<AdType, string> = {
    leaderboard: 'horizontal',
    banner: 'horizontal',
    box: 'rectangle',
    'in-article': 'fluid',
    rectangle: 'rectangle',
    square: 'rectangle',
  };

  return (
    <div
      ref={adRef}
      id={id}
      className="ad-container my-8 flex flex-col justify-center items-center bg-gray-50/50 rounded-lg overflow-hidden relative"
      // ✅ suppressHydrationWarning: Fixes "Content does not match server" error
      suppressHydrationWarning={true}
      style={{
        minHeight: minHeightMap[type],
        minWidth: minWidthMap[type],
        width: '100%',
      }}
    >
      {/* Optional Label (Rendered only if label is provided) */}
      {label && (
        <span className="absolute top-0 right-0 bg-gray-100 text-[10px] text-gray-500 px-1 rounded-bl z-10">
          {label}
        </span>
      )}

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-6648091987919638"
        data-ad-slot={adSlot || '1234567890'}
        data-ad-format={formatMap[type]}
        data-full-width-responsive="true"
        suppressHydrationWarning={true}
      />
    </div>
  );
}
