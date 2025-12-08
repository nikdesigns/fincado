type AdSlotProps = {
  label?: string;
};

export default function AdSlot({ label }: AdSlotProps) {
  return (
    <div
      className="ad-box"
      style={{
        margin: '40px 0',
        minHeight: 120,
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
