import type { Metadata } from 'next';
import RDClient from '@/app/rd-calculator/RDClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'RD कैलकुलेटर – रिकरिंग डिपॉजिट ब्याज और परिपक्वता राशि | Fincado',
  description:
    'RD कैलकुलेटर हिंदी में: जानें कि आपकी मासिक आरडी (Recurring Deposit) पर आपको कितना ब्याज मिलेगा और मैच्योरिटी राशि क्या होगी।',
  keywords: [
    'RD Calculator Hindi',
    'Recurring Deposit Calculator Hindi',
    'RD Interest Rate Hindi',
    'आरडी कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/rd-calculator',
    languages: { 'en-IN': 'https://www.fincado.com/rd-calculator' },
  },
};

export default function HindiRDPage() {
  const hindiLabels = {
    monthlyDeposit: 'मासिक जमा (Monthly Deposit)',
    rate: 'ब्याज दर (Interest Rate %)',
    years: 'वर्ष (Years)',
    months: 'महीने (Months)',
    maturityAmount: 'परिपक्वता राशि (Maturity Amount)',
    totalInv: 'कुल जमा (Total Investment)',
    grossInt: 'कुल ब्याज (Gross Interest)',
    netInt: 'नेट ब्याज (Net Interest)',
    taxDeducted: 'TDS (Tax)',
    advancedParams: 'टैक्स विकल्प (Advanced)',
    taxRate: 'टैक्स दर (%)',
    ignoreTax: 'बिना टैक्स के देखें (Show Gross)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi' },
          {
            name: 'RD कैलकुलेटर',
            url: 'https://www.fincado.com/hi/rd-calculator',
          },
        ]}
      />
      <CalculatorSchema
        name="RD Calculator Hindi"
        description="Calculate Recurring Deposit maturity in Hindi."
        url="https://www.fincado.com/hi/rd-calculator"
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
              RD कैलकुलेटर (Recurring Deposit in Hindi)
            </h1>
            <ShareTools title="RD कैलकुलेटर (Hindi)" />

            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <AdSlot id="hi-rd-top" type="leaderboard" />
            </div>

            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              रिकरिंग डिपॉजिट (RD) उन लोगों के लिए बेहतरीन है जो एक बार में बड़ा
              निवेश नहीं कर सकते। हर महीने थोड़ी रकम जमा करें और बैंक से
              सुरक्षित रिटर्न पाएं।
            </p>
          </header>

          <div style={{ marginTop: 32 }}>
            <RDClient labels={hindiLabels} />
          </div>

          <div className="no-print" style={{ margin: '32px 0' }}>
            <AdSlot id="hi-rd-mid" type="banner" />
          </div>
          <div className="article" style={{ marginTop: 40 }}>
            <h2>RD (रिकरिंग डिपॉजिट) क्या है?</h2>
            <p>
              RD एक प्रकार का टर्म डिपॉजिट है जिसमें आप एकमुश्त राशि जमा करने के
              बजाय, हर महीने एक निश्चित राशि जमा करते हैं।
            </p>
            <h3>फायदे (Benefits)</h3>
            <ul>
              <li>
                <strong>छोटी बचत:</strong> मात्र ₹500 से शुरुआत करें।
              </li>
              <li>
                <strong>निश्चित ब्याज:</strong> एफडी (FD) के बराबर ब्याज दर
                मिलती है।
              </li>
              <li>
                <strong>अनुशासन:</strong> हर महीने बचत करने की आदत बनती है।
              </li>
            </ul>
          </div>
        </div>
        <HindiSidebar adId="hi-rd-sidebar" />
      </div>
    </main>
  );
}
