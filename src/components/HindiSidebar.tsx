import Link from 'next/link';
import AdSlot from './AdSlot';

const MENU_ITEMS = [
  { label: '📈 SIP कैलकुलेटर', href: '/hi/sip-calculator/' },
  { label: '💰 Lumpsum (एकमुश्त)', href: '/hi/lumpsum-calculator/' },
  { label: '💸 SWP (पेंशन)', href: '/hi/swp-calculator/' },
  { label: '🏠 EMI कैलकुलेटर', href: '/hi/emi-calculator/' },
  { label: '🏦 PPF कैलकुलेटर', href: '/hi/ppf-calculator/' },
  { label: '👧 SSY (सुकन्या योजना)', href: '/hi/sukanya-samriddhi/' },
  { label: '📊 GST कैलकुलेटर', href: '/hi/gst-calculator/' },
  { label: '🔄 RD कैलकुलेटर', href: '/hi/rd-calculator/' },
  { label: '📜 FD कैलकुलेटर', href: '/hi/fd-calculator/' },
  { label: '➗ साधारण ब्याज (SI)', href: '/hi/simple-interest-calculator/' },
];

export default function HindiSidebar() {
  return (
    <aside className="sidebar">
      <div
        style={{
          background: '#f8fafc',
          padding: '24px 20px',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h3
          style={{
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: 700,
            color: '#0f172a',
            borderBottom: '2px solid #22c55e',
            display: 'inline-block',
            paddingBottom: 4,
          }}
        >
          हिंदी कैलकुलेटर (Tools)
        </h3>

        <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
          {MENU_ITEMS.map((item) => (
            <li
              key={item.href}
              style={{
                marginBottom: 10,
                borderBottom: '1px dashed #e2e8f0',
                paddingBottom: 10,
              }}
            >
              <Link
                href={item.href}
                style={{
                  color: '#15803d', // Darker green for better contrast
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.2s',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Switch Language Button */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid #cbd5e1',
          }}
        >
          <Link
            href="/calculators/" // ✅ Fixed trailing slash
            style={{
              fontSize: '15px',
              color: '#475569',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 500,
            }}
          >
            <span>🇬🇧</span> Switch to English
          </Link>
        </div>
      </div>

      {/* Sticky Ad Unit */}
      <div style={{ marginTop: 32, position: 'sticky', top: 24 }}>
        <AdSlot type="box" label="विज्ञापन (Ad)" />
      </div>
    </aside>
  );
}
