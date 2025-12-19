import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'Fincado हिंदी – सभी फाइनेंशियल कैलकुलेटर और गाइड्स',
  description:
    'भारत के सर्वश्रेष्ठ फाइनेंशियल टूल्स अब हिंदी में। SIP, होम लोन EMI, PPF कैलकुलेटर और क्रेडिट स्कोर गाइड्स।',
  alternates: {
    canonical: 'https://www.fincado.com/hi',
    languages: {
      'en-IN': 'https://www.fincado.com/calculators',
    },
  },
};

// --- DATA CONSTANTS ---

const HINDI_TOOLS = [
  {
    title: 'SIP कैलकुलेटर',
    desc: 'जानें कि आपकी छोटी बचत (SIP) भविष्य में कितनी बड़ी रकम बन सकती है।',
    href: '/hi/sip-calculator',
    icon: '📈',
  },
  {
    title: 'EMI कैलकुलेटर',
    desc: 'होम लोन या पर्सनल लोन लेने से पहले अपनी मासिक किस्त (EMI) की गणना करें।',
    href: '/hi/emi-calculator',
    icon: '🏠',
  },
  {
    title: 'PPF कैलकुलेटर',
    desc: 'पब्लिक प्रोविडेंट फंड (PPF) की मैच्योरिटी और ब्याज की सटीक गणना करें।',
    href: '/hi/ppf-calculator',
    icon: '💰',
  },
  {
    title: 'FD कैलकुलेटर',
    desc: 'बैंक फिक्स्ड डिपॉजिट (FD) पर मिलने वाले ब्याज और कुल रिटर्न को जानें।',
    href: '/hi/fd-calculator',
    icon: '🏦',
  },
  {
    title: 'RD कैलकुलेटर',
    desc: 'रिकरिंग डिपॉजिट (RD) पर मिलने वाले ब्याज की गणना करें।',
    href: '/hi/rd-calculator',
    icon: '📅',
  },
  {
    title: 'GST कैलकुलेटर',
    desc: 'आसानी से GST जोड़ें या हटाएं (Exclusive/Inclusive Tax)।',
    href: '/hi/gst-calculator',
    icon: '🧾',
  },
  {
    title: 'Lumpsum कैलकुलेटर',
    desc: 'एकमुश्त निवेश (One-time Investment) पर रिटर्न देखें।',
    href: '/hi/lumpsum-calculator',
    icon: '💎',
  },
  {
    title: 'SWP कैलकुलेटर',
    desc: 'म्यूचुअल फंड से नियमित आय (Systematic Withdrawal) प्लान करें।',
    href: '/hi/swp-calculator',
    icon: '💸',
  },
  {
    title: 'SSY (सुकन्या) कैलकुलेटर',
    desc: 'बेटियों के भविष्य के लिए सुकन्या समृद्धि योजना की गणना।',
    href: '/hi/sukanya-samriddhi',
    icon: '👧',
  },
  {
    title: 'साधारण ब्याज (Simple Interest)',
    desc: 'मूलधन, दर और समय के आधार पर साधारण ब्याज निकालें।',
    href: '/hi/simple-interest-calculator',
    icon: '➗',
  },
];

const HINDI_GUIDES = [
  {
    title: 'Credit Score कैसे बढ़ाएं? (10 तरीके)',
    desc: '750+ स्कोर पाने के आसान और पक्के तरीके। 90 दिनों में सुधार देखें।',
    href: '/hi/guides/credit-score',
    category: 'Banking',
  },
  {
    title: 'Personal Loan इंटरेस्ट रेट्स (2025)',
    desc: 'सस्ते पर्सनल लोन के लिए टिप्स और मौजूदा बैंक ब्याज दरें।',
    href: '/hi/guides/personal-loan',
    category: 'Loans',
  },
  {
    title: 'SIP vs FD: बेहतर कौन? (हिंदी)',
    desc: 'रिटर्न, रिस्क और टैक्स के मामले में SIP और FD का पूरा तुलनात्मक विश्लेषण।',
    href: '/hi/guides/sip-vs-fd',
    category: 'Investment',
  },
];

export default function HindiHubPage() {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi Tools)', url: 'https://www.fincado.com/hi' },
        ]}
      />

      {/* --- HEADER (Full Width) --- */}
      <header
        style={{
          marginBottom: 40,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 24,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            color: '#0f172a',
            marginBottom: '16px',
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          फाइनेंशियल कैलकुलेटर और गाइड्स
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '18px',
            maxWidth: '750px',
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          अब फाइनेंस को समझना हुआ और भी आसान। अपनी भाषा में निवेश, लोन और बचत की
          गणना करें और एक्सपर्ट गाइड्स पढ़ें।
        </p>
        <ShareTools title="Fincado हिंदी - फाइनेंशियल टूल्स" />
      </header>

      {/* --- LAYOUT GRID (Main + Sidebar) --- */}
      <div className="layout-grid">
        {/* --- LEFT: MAIN CONTENT --- */}
        <div className="main-content">
          <AdSlot type="leaderboard" label="Sponsored" />

          {/* SECTION 1: CALCULATORS */}
          <section style={{ marginTop: 32 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '24px' }}>🧮</span>
              <h2
                style={{
                  fontSize: '24px',
                  margin: 0,
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                प्रमुख कैलकुलेटर
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
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
                      padding: '20px',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      height: '100%',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '24px',
                        background: '#f8fafc',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        flexShrink: 0,
                      }}
                    >
                      {tool.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#0f172a',
                          margin: '0 0 4px 0',
                        }}
                      >
                        {tool.title}
                      </h3>
                      <p
                        style={{
                          color: '#64748b',
                          fontSize: '14px',
                          lineHeight: '1.5',
                          margin: 0,
                        }}
                      >
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* AD SLOT: MID CONTENT */}
          <div style={{ margin: '40px 0' }}>
            <AdSlot type="leaderboard" />
          </div>

          {/* SECTION 2: GUIDES */}
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '24px' }}>📚</span>
              <h2
                style={{
                  fontSize: '24px',
                  margin: 0,
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                नवीनतम लेख (Guides)
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
              }}
            >
              {HINDI_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      padding: '24px',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      // Removed the red borderLeft
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                    className="hover-card"
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#16a34a', // Changed from Red to Brand Green
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                        display: 'block',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {guide.category}
                    </span>
                    <h3
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#1e293b',
                        marginBottom: '8px',
                        lineHeight: 1.4,
                      }}
                    >
                      {guide.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '15px',
                        color: '#64748b',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {guide.desc}
                    </p>
                    <div
                      style={{
                        marginTop: '16px',
                        color: '#2563eb',
                        fontWeight: 600,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      अभी पढ़ें <span style={{ fontSize: '16px' }}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 3: SEO TEXT */}
          <section
            style={{
              marginTop: 48,
              padding: '32px',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
            }}
          >
            <h3
              style={{
                margin: '0 0 16px 0',
                fontSize: '20px',
                color: '#334155',
              }}
            >
              Fincado हिंदी क्यों?
            </h3>
            <p
              style={{ color: '#475569', lineHeight: '1.7', fontSize: '15px' }}
            >
              भारत में वित्तीय साक्षरता (Financial Literacy) को बढ़ावा देने के
              लिए हमने अपने प्रमुख टूल्स को हिंदी में उपलब्ध कराया है। अक्सर
              फाइनेंस की जटिल शर्तें (Jargon) आम लोगों को समझ नहीं आतीं। Fincado
              का प्रयास है कि <strong>SIP</strong>, <strong>EMI</strong>, और{' '}
              <strong>Credit Score</strong>
              जैसे विषयों को आप अपनी मातृभाषा में आसानी से समझ सकें और सही फैसले
              ले सकें।
            </p>
          </section>
        </div>

        {/* --- RIGHT: SIDEBAR --- */}
        <aside className="sidebar">
          {/* 1. Hindi Sidebar Links */}
          <HindiSidebar />

          {/* 2. Sticky Ad */}
          <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
            <AdSlot id="hindi-hub-sidebar" type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
