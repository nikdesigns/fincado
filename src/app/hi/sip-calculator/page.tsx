import type { Metadata } from 'next';
import SIPClient from '@/app/sip-calculator/SIPClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'SIP कैलकुलेटर – रिटर्न और निवेश की गणना करें | Fincado',
  description:
    'एसआईपी (SIP) कैलकुलेटर: जानें कि आपकी मासिक SIP निवेश आपको 5, 10 या 20 साल में कितना अमीर बना सकती है।',
  keywords: [
    'SIP Calculator Hindi',
    'Mutual Fund Calculator Hindi',
    'SIP Return Calculator',
    'एसआईपी कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/sip-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/sip-calculator',
    },
  },
};

export default function HindiSIPPage() {
  // ✅ 1. Define Hindi Labels
  const hindiLabels = {
    monthlyInv: 'मासिक निवेश (Monthly Investment)',
    rate: 'ब्याज दर (Expected Return %)',
    timePeriod: 'समय अवधि (Years)',
    maturityValue: 'कुल राशि (Maturity Value)',
    invested: 'कुल निवेश (Invested)',
    returns: 'अनुमानित रिटर्न (Returns)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          {
            name: 'SIP कैलकुलेटर',
            url: 'https://www.fincado.com/hi/sip-calculator',
          },
        ]}
      />

      <CalculatorSchema
        name="SIP Calculator Hindi"
        description="Calculate SIP returns in Hindi."
        url="https://www.fincado.com/hi/sip-calculator"
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
              SIP कैलकुलेटर (SIP Calculator in Hindi)
            </h1>
            <ShareTools title="SIP कैलकुलेटर (Hindi)" />
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              एसआईपी (Systematic Investment Plan) म्यूचुअल फंड में निवेश करने का
              सबसे आसान तरीका है। जानें कि छोटे निवेश से आप भविष्य में कितना
              बड़ा फंड बना सकते हैं।
            </p>
          </header>

          <AdSlot type="leaderboard" label="Sponsored" />

          <div style={{ marginTop: 32 }}>
            {/* ✅ 2. Pass Labels Prop */}
            <SIPClient labels={hindiLabels} />
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>SIP क्या है? (What is SIP?)</h2>
            <p>
              SIP का मतलब है <strong>Systematic Investment Plan</strong>। यह एक
              ऐसा तरीका है जिससे आप हर महीने थोड़ी-थोड़ी रकम (जैसे ₹500)
              म्यूचुअल फंड में जमा कर सकते हैं।
            </p>
            <h3>SIP के फायदे (Benefits)</h3>
            <ul>
              <li>
                <strong>छोटी शुरुआत:</strong> आप मात्र ₹500 से शुरू कर सकते हैं।
              </li>
              <li>
                <strong>कंपाउंडिंग की शक्ति:</strong> लंबे समय में आपको ब्याज पर
                ब्याज मिलता है।
              </li>
              <li>
                <strong>अनुशासन:</strong> हर महीने निवेश करने की आदत बनती है।
              </li>
            </ul>
          </div>
        </div>

        <HindiSidebar />
      </div>
    </main>
  );
}
