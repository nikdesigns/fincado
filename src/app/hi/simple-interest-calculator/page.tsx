import type { Metadata } from 'next';
import SICalculatorClient from '@/app/simple-interest-calculator/SICalculatorClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'साधारण ब्याज (Simple Interest) कैलकुलेटर | Fincado',
  description:
    'Simple Interest Calculator Hindi: मूलधन, दर और समय दर्ज करें और तुरंत साधारण ब्याज की गणना करें।',
  keywords: [
    'Simple Interest Calculator Hindi',
    'Sadharan Byaj Calculator',
    'Interest Calculator India',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/simple-interest-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/simple-interest-calculator',
    },
  },
};

export default function HindiSIPage() {
  const hindiLabels = {
    principal: 'मूल राशि (Principal Amount)',
    rate: 'ब्याज दर (Interest Rate %)',
    time: 'समय अवधि (Years)',
    maturityVal: 'कुल राशि (Total Amount)',
    resultPrincipal: 'मूलधन (Principal)',
    resultInterest: 'कुल ब्याज (Interest)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi' },
          {
            name: 'साधारण ब्याज',
            url: 'https://www.fincado.com/hi/simple-interest-calculator',
          },
        ]}
      />
      <CalculatorSchema
        name="Simple Interest Calculator Hindi"
        description="Calculate Simple Interest in Hindi."
        url="https://www.fincado.com/hi/simple-interest-calculator"
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
              साधारण ब्याज कैलकुलेटर (Simple Interest)
            </h1>
            <ShareTools title="Simple Interest Calculator (Hindi)" />

            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <AdSlot id="hi-si-top" type="leaderboard" />
            </div>
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              यह कैलकुलेटर आपको आसानी से साधारण ब्याज (Simple Interest) और अंतिम
              राशि की गणना करने में मदद करता है।
            </p>
          </header>

          <div style={{ marginTop: 32 }}>
            <SICalculatorClient labels={hindiLabels} />
          </div>
          <div className="no-print" style={{ margin: '32px 0' }}>
            <AdSlot id="hi-si-mid" type="banner" />
          </div>
          <div className="article" style={{ marginTop: 40 }}>
            <h2>साधारण ब्याज क्या है?</h2>
            <p>
              जब ब्याज केवल मूल राशि (Principal) पर लगता है, तो उसे साधारण ब्याज
              कहते हैं।
            </p>

            <div className="no-print my-8 flex justify-center">
              <AdSlot type="square" label="Advertisement" />
            </div>
            <h3>सूत्र (Formula)</h3>
            <p>
              <strong>SI = (P × R × T) / 100</strong>
            </p>
            <ul>
              <li>P = मूलधन (Principal)</li>
              <li>R = दर (Rate)</li>
              <li>T = समय (Time)</li>
            </ul>
          </div>
        </div>
        <HindiSidebar adId="hi-si-sidebar" />
      </div>
    </main>
  );
}
