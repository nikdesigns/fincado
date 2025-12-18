import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'Fincado हिंदी – सभी फाइनेंशियल कैलकुलेटर (All Calculators)',
  description:
    'भारत के सर्वश्रेष्ठ फाइनेंशियल टूल्स अब हिंदी में। SIP, EMI, PPF, GST, RD, SSY और अन्य कैलकुलेटर का उपयोग करें।',
  alternates: {
    canonical: 'https://www.fincado.com/hi',
    languages: { 'en-IN': 'https://www.fincado.com/calculators' },
  },
};

const HINDI_TOOLS = [
  {
    title: 'SIP कैलकुलेटर',
    desc: 'मासिक निवेश से भविष्य की राशि जानें।',
    href: '/hi/sip-calculator',
    icon: '📈',
  },
  {
    title: 'Lumpsum कैलकुलेटर',
    desc: 'एकमुश्त निवेश पर रिटर्न की गणना करें।',
    href: '/hi/lumpsum-calculator',
    icon: '💰',
  },
  {
    title: 'SWP कैलकुलेटर',
    desc: 'म्यूचुअल फंड से मासिक पेंशन प्लान बनाएं।',
    href: '/hi/swp-calculator',
    icon: '💸',
  },
  {
    title: 'EMI कैलकुलेटर',
    desc: 'होम और पर्सनल लोन की किस्त जानें।',
    href: '/hi/emi-calculator',
    icon: '🏠',
  },
  {
    title: 'PPF कैलकुलेटर',
    desc: 'PPF खाते की ब्याज और मैच्योरिटी देखें।',
    href: '/hi/ppf-calculator',
    icon: '🏦',
  },
  {
    title: 'SSY (सुकन्या)',
    desc: 'बेटी के भविष्य के लिए SSY राशि जानें।',
    href: '/hi/sukanya-samriddhi',
    icon: '👧',
  },
  {
    title: 'GST कैलकुलेटर',
    desc: 'सामान पर GST जोड़ें या हटाएं (Reverse GST)।',
    href: '/hi/gst-calculator',
    icon: '📊',
  },
  {
    title: 'RD कैलकुलेटर',
    desc: 'रिकरिंग डिपॉजिट (RD) का ब्याज जानें।',
    href: '/hi/rd-calculator',
    icon: '🔄',
  },
  {
    title: 'FD कैलकुलेटर',
    desc: 'फिक्स्ड डिपॉजिट (FD) पर रिटर्न देखें।',
    href: '/hi/fd-calculator',
    icon: '📜',
  },
  {
    title: 'साधारण ब्याज (SI)',
    desc: 'मूलधन और ब्याज की त्वरित गणना करें।',
    href: '/hi/simple-interest-calculator',
    icon: '➗',
  },
];

export default function HindiHubPage() {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi' },
        ]}
      />
      <div className="layout-grid">
        <div className="main-content">
          <header style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontSize: '32px',
                color: '#0f172a',
                marginBottom: '16px',
                fontWeight: 800,
              }}
            >
              फाइनेंशियल कैलकुलेटर (Hindi Tools)
            </h1>
            <p style={{ color: '#64748b', fontSize: '18px' }}>
              अब फाइनेंस को समझना हुआ आसान। अपनी भाषा में निवेश और लोन की गणना
              करें।
            </p>
          </header>

          <AdSlot type="leaderboard" label="Sponsored" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            {HINDI_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="hover-card"
                  style={{
                    padding: '24px',
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                    {tool.icon}
                  </div>
                  <h2
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#0f172a',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {tool.title}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
                    {tool.desc}
                  </p>
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      color: '#16a34a',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    गणना करें →
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ margin: '48px 0' }}>
            <AdSlot type="leaderboard" label="Advertisement" />
          </div>
        </div>
        <HindiSidebar />
      </div>
    </main>
  );
}
