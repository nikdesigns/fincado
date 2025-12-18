import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

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

const HINDI_TOOLS = [
  {
    title: 'SIP कैलकुलेटर',
    desc: 'जानें कि आपकी छोटी बचत (SIP) भविष्य में कितनी बड़ी रकम बन सकती है।',
    href: '/hi/sip-calculator',
    icon: '📈',
    color: 'text-green-600',
  },
  {
    title: 'EMI कैलकुलेटर',
    desc: 'होम लोन या पर्सनल लोन लेने से पहले अपनी मासिक किस्त (EMI) की गणना करें।',
    href: '/hi/emi-calculator',
    icon: '🏠',
    color: 'text-blue-600',
  },
  {
    title: 'PPF कैलकुलेटर',
    desc: 'पब्लिक प्रोविडेंट फंड (PPF) की मैच्योरिटी और ब्याज की सटीक गणना करें।',
    href: '/hi/ppf-calculator',
    icon: '💰',
    color: 'text-orange-600',
  },
  {
    title: 'FD कैलकुलेटर',
    desc: 'बैंक फिक्स्ड डिपॉजिट (FD) पर मिलने वाले ब्याज और कुल रिटर्न को जानें।',
    href: '/hi/fd-calculator',
    icon: '🏦',
    color: 'text-purple-600',
  },
];

// ✅ NEW: Add your Hindi Guides here
const HINDI_GUIDES = [
  {
    title: 'Credit Score कैसे बढ़ाएं? (10 तरीके)',
    desc: '750+ स्कोर पाने के आसान और पक्के तरीके। 90 दिनों में सुधार देखें।',
    href: '/hi/guides/credit-score', // Points to the file we created
    category: 'Banking',
  },
  // Add more Hindi guides here as you create them...
];

export default function HindiHubPage() {
  return (
    <main
      className="container"
      style={{ padding: '40px 20px', maxWidth: '1000px' }}
    >
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi Tools)', url: 'https://www.fincado.com/hi' },
        ]}
      />

      <header style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            color: '#0f172a',
            marginBottom: '16px',
            fontWeight: 800,
          }}
        >
          फाइनेंशियल कैलकुलेटर और गाइड्स
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          अब फाइनेंस को समझना हुआ और भी आसान। अपनी भाषा में निवेश, लोन और बचत की
          गणना करें।
        </p>
      </header>

      <AdSlot type="leaderboard" label="Sponsored" />

      {/* --- CALCULATORS GRID --- */}
      <h2
        style={{
          fontSize: '24px',
          marginBottom: '24px',
          borderLeft: '4px solid #16a34a',
          paddingLeft: '12px',
        }}
      >
        प्रमुख कैलकुलेटर
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '60px',
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
                borderRadius: '16px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'transform 0.2s',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                {tool.icon}
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: '0 0 8px 0',
                }}
              >
                {tool.title}
              </h3>
              <p
                style={{
                  color: '#64748b',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* --- ✅ NEW: HINDI GUIDES GRID --- */}
      <h2
        style={{
          fontSize: '24px',
          marginBottom: '24px',
          borderLeft: '4px solid #e11d48',
          paddingLeft: '12px',
        }}
      >
        नवीनतम लेख (Guides)
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                borderLeft: '4px solid #e11d48', // Red accent for content
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#e11d48',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                {guide.category}
              </span>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '8px',
                  lineHeight: 1.4,
                }}
              >
                {guide.title}
              </h3>
              <p
                style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}
              >
                {guide.desc}
              </p>
              <div
                style={{
                  marginTop: '16px',
                  color: '#e11d48',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                अभी पढ़ें →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: 60,
          padding: '32px',
          background: '#f8fafc',
          borderRadius: '16px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '22px' }}>
          क्यों चुनें Fincado हिंदी?
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          भारत में वित्तीय साक्षरता (Financial Literacy) को बढ़ावा देने के लिए
          हमने अपने प्रमुख टूल्स को हिंदी में उपलब्ध कराया है। चाहे आप{' '}
          <strong>SIP</strong> के जरिए निवेश करना चाहते हों या{' '}
          <strong>Credit Score</strong> सुधारना चाहते हों, हमारे गाइड्स आपको सरल
          भाषा में सही जानकारी देते हैं।
        </p>
      </div>
    </main>
  );
}
