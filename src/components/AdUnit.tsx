import AdSlot from './AdSlot';

type AdUnitProps = {
  client?: string; // Legacy prop, can be ignored or passed
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
  className?: string;
};

// Redirecting AdUnit to use the working AdSlot logic
export default function AdUnit({ slot, className }: AdUnitProps) {
  return <AdSlot type="rectangle" adSlot={slot} />;
}
