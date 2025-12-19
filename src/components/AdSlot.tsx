'use client';

import { useEffect } from 'react';

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
  label?: string;
  adSlot?: string; // Optional: specific ad unit ID if you have created them manually
};

export default function AdSlot({
  id,
  type = 'banner',
  label,
  adSlot,
}: AdSlotProps) {
  // Initialize ads after component mounts
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, []);

  const minHeightMap: Record<AdType, number> = {
    leaderboard: 90,
    banner: 90,
    box: 250,
    'in-article': 250,
    rectangle: 250,
    square: 250,
  };

  // Maps your types to standard AdSense formats
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
      id={id}
      className="ad-container my-8 flex justify-center items-center bg-gray-50/50 rounded-lg overflow-hidden"
      style={{ minHeight: minHeightMap[type] }}
    >
      {/* Google AdSense Unit
         client: Your ID from layout.tsx
         slot: Optional (for manual units)
         format: Auto/Rectangle/Horizontal
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-6648091987919638" // ✅ YOUR REAL ID
        data-ad-slot={adSlot || '1234567890'} // Replace with a generic "Auto" slot ID if you have one, or leave placeholder if relying entirely on auto-ads
        data-ad-format={formatMap[type]}
        data-full-width-responsive="true"
      />

      {/* Label for debugging/transparency (Optional) */}
      {/* <span className="text-[10px] text-gray-400 absolute top-0 right-0 p-1">Ad</span> */}
    </div>
  );
}
