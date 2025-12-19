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
};

export default function AdSlot({ id, type = 'banner', adSlot }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!adRef.current) return;

      const width = adRef.current.offsetWidth;

      // 🚫 Prevent push if width is zero
      if (width === 0) return;

      try {
        // @ts-expect-error
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
      className="ad-container my-8 flex justify-center items-center bg-gray-50/50 rounded-lg overflow-hidden"
      style={{ minHeight: minHeightMap[type], width: '100%' }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-6648091987919638"
        data-ad-slot={adSlot || ''}
        data-ad-format={formatMap[type]}
        data-full-width-responsive="true"
      />
    </div>
  );
}
