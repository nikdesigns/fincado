import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Fincado हिंदी – सभी फाइनेंशियल कैलकुलेटर (SIP, EMI, PPF)',
  description:
    'भारत के सर्वश्रेष्ठ फाइनेंशियल टूल्स अब हिंदी में। SIP, होम लोन EMI, PPF और FD की गणना अपनी भाषा में करें।',
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
            fontSize: '32px',
            color: '#0f172a',
            marginBottom: '16px',
            fontWeight: 800,
          }}
        >
          फाइनेंशियल कैलकुलेटर (Hindi Tools)
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          अब फाइनेंस को समझना हुआ और भी आसान। अपनी भाषा में निवेश, लोन और बचत की
          गणना करें।
        </p>
      </header>

      <AdSlot type="leaderboard" label="Sponsored" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
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
                borderRadius: '16px',
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
          <strong>Home Loan</strong> की EMI जानना चाहते हों, हमारे कैलकुलेटर
          आपको सटीक और निष्पक्ष परिणाम देते हैं।
        </p>
      </div>
    </main>
  );
}
