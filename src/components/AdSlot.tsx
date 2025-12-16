'use client';

// ✅ Added 'square' to the supported Ad Types
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
};

/**
 * Reusable Ad Slot component
 * Used across Fincado pages
 */
export default function AdSlot({ id, type, label }: AdSlotProps) {
  // ✅ Added dimensions for 'square'
  const minHeightMap: Record<AdType, number> = {
    leaderboard: 90,
    banner: 90,
    box: 250,
    'in-article': 280,
    rectangle: 250,
    square: 250, // Added 250px height for square ads
  };

  return (
    <div
      id={id}
      data-ad-type={type}
      className="ad-box"
      style={{
        margin: '40px 0',
        minHeight: type ? minHeightMap[type] : 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
      }}
    >
      {label || 'AdSense Ad'}
    </div>
  );
}
