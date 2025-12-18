import Link from 'next/link';
import AdSlot from './AdSlot';

export default function HindiSidebar() {
  return (
    <aside className="sidebar">
      <div
        style={{
          background: '#f8fafc',
          padding: '20px 16px',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#0f172a' }}
        >
          हिंदी कैलकुलेटर (Tools)
        </h3>
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/sip-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              📈 SIP कैलकुलेटर
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/lumpsum-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              💰 Lumpsum (एकमुश्त)
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/swp-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              💸 SWP (पेंशन)
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/emi-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              🏠 EMI कैलकुलेटर
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/ppf-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              🏦 PPF कैलकुलेटर
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/sukanya-samriddhi"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              👧 SSY (सुकन्या)
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/gst-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              📊 GST कैलकुलेटर
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/rd-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              🔄 RD कैलकुलेटर
            </Link>
          </li>
          <li
            style={{
              marginBottom: 12,
              borderBottom: '1px dashed #cbd5e1',
              paddingBottom: 8,
            }}
          >
            <Link
              href="/hi/fd-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              📜 FD कैलकुलेटर
            </Link>
          </li>
          <li style={{ marginBottom: 12 }}>
            <Link
              href="/hi/simple-interest-calculator"
              style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block',
              }}
            >
              ➗ साधारण ब्याज (SI)
            </Link>
          </li>
        </ul>
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <Link
            href="/calculators"
            style={{
              fontSize: '14px',
              color: '#64748b',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>🇬🇧</span> Switch to English
          </Link>
        </div>
      </div>
      <div style={{ marginTop: 24, position: 'sticky', top: 20 }}>
        <AdSlot type="box" label="विज्ञापन (Ad)" />
      </div>
    </aside>
  );
}
