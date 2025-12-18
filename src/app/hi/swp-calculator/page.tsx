import type { Metadata } from 'next';
import SWPClient from '@/app/swp-calculator/SWPClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'SWP कैलकुलेटर – मासिक पेंशन और निकासी | Fincado',
  description:
    'SWP Calculator Hindi: म्यूचुअल फंड से मासिक आय (Pension) की गणना करें। जानें आपका पैसा कितने साल तक चलेगा।',
  alternates: {
    canonical: 'https://www.fincado.com/hi/swp-calculator',
    languages: { 'en-IN': 'https://www.fincado.com/swp-calculator' },
  },
};

export default function HindiSWPPage() {
  const hindiLabels = {
    totalInv: 'कुल निवेश (Total Investment)',
    monthlyWithdrawal: 'मासिक निकासी (Withdrawal)',
    rate: 'ब्याज दर (Return %)',
    time: 'समय अवधि (Years)',
    remainingVal: 'बची हुई राशि (Balance)',
    totalWithdrawn: 'कुल निकासी',
    warning: '⚠️ चेतावनी: आपका फंड तय समय से पहले खत्म हो जाएगा।',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi' },
          {
            name: 'SWP कैलकुलेटर',
            url: 'https://www.fincado.com/hi/swp-calculator',
          },
        ]}
      />
      <CalculatorSchema
        name="SWP Calculator Hindi"
        description="Calculate Systematic Withdrawal Plan in Hindi."
        url="https://www.fincado.com/hi/swp-calculator"
      />

      <div className="layout-grid">
        <div className="main-content">
          <header style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontSize: '28px',
                color: '#0f172a',
                marginBottom: '16px',
              }}
            >
              SWP कैलकुलेटर (मासिक आय प्लान)
            </h1>
            <ShareTools title="SWP Calculator (Hindi)" />
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              SWP (Systematic Withdrawal Plan) रिटायरमेंट के लिए सबसे अच्छा
              विकल्प है। अपने निवेश से हर महीने एक निश्चित राशि पाएं।
            </p>
          </header>
          <AdSlot type="leaderboard" />
          <div style={{ marginTop: 32 }}>
            <SWPClient labels={hindiLabels} />
          </div>
          <div className="article" style={{ marginTop: 40 }}>
            <h2>SWP क्या है?</h2>
            <p>
              SWP का मतलब है <strong>Systematic Withdrawal Plan</strong>। यह SIP
              का उल्टा है। इसमें आप हर महीने अपने म्यूचुअल फंड से एक निश्चित
              राशि निकालते हैं।
            </p>
            <h3>फायदे</h3>
            <ul>
              <li>
                <strong>नियमित आय:</strong> पेंशन की तरह हर महीने पैसे मिलते
                हैं।
              </li>
              <li>
                <strong>पूंजी वृद्धि:</strong> यदि निकासी दर ब्याज दर से कम है,
                तो आपका मूलधन भी बढ़ता रहता है।
              </li>
            </ul>
          </div>
        </div>
        <HindiSidebar />
      </div>
    </main>
  );
}
