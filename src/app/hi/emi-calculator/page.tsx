import type { Metadata } from 'next';
import EMIClient from '@/app/emi-calculator/EMIClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';
import LanguageToggle from '@/components/LanguageToggle';

export const metadata: Metadata = {
  title: 'EMI कैलकुलेटर – होम लोन, पर्सनल लोन की EMI निकालें | Fincado',
  description:
    'Fincado EMI कैलकुलेटर (Hindi): जानें आपकी मासिक किस्त (EMI) कितनी होगी। होम लोन, कार लोन और पर्सनल लोन के लिए सटीक गणना करें।',
  keywords: [
    'EMI Calculator Hindi',
    'Home Loan EMI Hindi',
    'Personal Loan EMI Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/emi-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/emi-calculator',
    },
  },
};

export default function HindiEMIPage() {
  // ✅ Define Hindi Labels
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    rate: 'ब्याज दर (Interest Rate %)',
    tenure: 'लोन अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    totalInterest: 'कुल ब्याज (Total Interest)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          {
            name: 'EMI कैलकुलेटर',
            url: 'https://www.fincado.com/hi/emi-calculator',
          },
        ]}
      />

      <CalculatorSchema
        name="EMI Calculator Hindi"
        description="Calculate Loan EMI in Hindi."
        url="https://www.fincado.com/hi/emi-calculator"
      />

      <div className="layout-grid">
        <div className="main-content">
          <header style={{ marginBottom: 32 }}>
            <LanguageToggle path="/emi-calculator" />
            <h1
              style={{
                fontSize: '28px',
                color: '#0f172a',
                marginBottom: '16px',
              }}
            >
              EMI कैलकुलेटर (EMI Calculator in Hindi)
            </h1>
            <ShareTools title="EMI कैलकुलेटर (Hindi)" />
            {/* 💰 AD 1: TOP LEADERBOARD */}
            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <AdSlot id="hi-emi-top" type="leaderboard" />
            </div>
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              लोन लेने से पहले अपनी मासिक किस्त (EMI) की गणना करें। यह टूल आपको
              होम लोन, पर्सनल लोन और कार लोन की EMI आसानी से बताता है।
            </p>
          </header>

          <div style={{ marginTop: 32 }}>
            {/* ✅ Pass Labels */}
            <EMIClient labels={hindiLabels} />
            {/* 💰 AD 2: AFTER CALCULATOR (BANNER) */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-emi-after-calc" type="banner" />
            </div>
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>EMI क्या होती है? (What is EMI?)</h2>
            <p>
              EMI का मतलब है <strong>Equated Monthly Installment</strong>। यह वह
              निश्चित राशि है जो आप हर महीने बैंक को अपने लोन को चुकाने के लिए
              देते हैं।
            </p>
            {/* 💰 AD 3: IN-CONTENT SQUARE */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot type="square" label="Advertisement" />
            </div>
            <h3>EMI कैसे कम करें?</h3>
            <ul>
              <li>
                <strong>लंबी अवधि चुनें:</strong> अवधि (Tenure) बढ़ाने से EMI कम
                हो जाती है।
              </li>
              <li>
                <strong>डाउन पेमेंट बढ़ाएं:</strong> लोन राशि कम होने से EMI कम
                आती है।
              </li>
            </ul>
          </div>
        </div>
        <HindiSidebar adId="hi-emi-sidebar" />
      </div>
    </main>
  );
}
