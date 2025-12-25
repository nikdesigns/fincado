import Link from 'next/link';
import AdSlot from './AdSlot';

const MENU_ITEMS = [
  // --- LOANS ---
  { label: '🏠 होम लोन EMI', href: '/hi/loans/home-loan/' },
  { label: '🚗 कार लोन EMI', href: '/hi/loans/car-loan/' },
  { label: '💳 पर्सनल लोन EMI', href: '/hi/loans/personal-loan/' },
  { label: '🎓 एजुकेशन लोन', href: '/hi/loans/education-loan/' },
  { label: '🔢 EMI कैलकुलेटर', href: '/hi/emi-calculator/' },

  // --- INVESTMENT ---
  { label: '📈 SIP कैलकुलेटर', href: '/hi/sip-calculator/' },
  { label: '💰 लम्पसम (एकमुश्त)', href: '/hi/lumpsum-calculator/' },
  { label: '📊 म्यूचुअल फंड', href: '/hi/mutual-funds/' },
  { label: '🏦 PPF कैलकुलेटर', href: '/hi/ppf-calculator/' },
  { label: '👧 SSY (सुकन्या)', href: '/hi/sukanya-samriddhi/' },
  { label: '📜 FD कैलकुलेटर', href: '/hi/fd-calculator/' },
  { label: '🔄 RD कैलकुलेटर', href: '/hi/rd-calculator/' },
  { label: '💸 SWP (पेंशन)', href: '/hi/swp-calculator/' },

  // --- RETIREMENT ---
  { label: '👴 रिटायरमेंट प्लानर', href: '/hi/retirement-calculator/' },
  { label: '🏢 EPF कैलकुलेटर', href: '/hi/epf-calculator/' },
  { label: '☂️ अटल पेंशन (APY)', href: '/hi/apy-calculator/' },
  { label: '🎁 ग्रेच्युटी (Gratuity)', href: '/hi/gratuity-calculator/' },
  { label: '🔥 FIRE कैलकुलेटर', href: '/hi/fire-calculator/' },

  // --- TOOLS ---
  { label: '📉 महंगाई (Inflation)', href: '/hi/inflation-calculator/' },
  { label: '⭐ क्रेडिट स्कोर', href: '/hi/credit-score/' },
  { label: '🧾 GST कैलकुलेटर', href: '/hi/gst-calculator/' },
  { label: '🔄 कंपाउंड इंटरेस्ट', href: '/hi/compound-interest-calculator/' },
  { label: '➗ साधारण ब्याज', href: '/hi/simple-interest-calculator/' },
];

export default function HindiSidebar({ adId }: { adId?: string }) {
  return (
    <aside className="sidebar">
      {/* Sticky Ad Unit with Dynamic ID */}
      <div style={{ marginTop: 32, position: 'sticky', top: 24 }}>
        <AdSlot id={adId} type="box" label="विज्ञापन (Ad)" />
      </div>
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
                  color: '#15803d',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
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
            href="/calculators/"
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
    </aside>
  );
}
