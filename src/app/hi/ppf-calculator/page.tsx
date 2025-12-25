import type { Metadata } from 'next';
import PPFClient from '@/app/ppf-calculator/PPFClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'PPF कैलकुलेटर – भविष्य निधि (PPF) ब्याज और परिपक्वता राशि | Fincado',
  description:
    'पब्लिक प्रोविडेंट फंड (PPF) कैलकुलेटर हिंदी में: जानें कि 15 साल बाद आपकी जमा राशि पर कितना ब्याज मिलेगा।',
  alternates: {
    canonical: 'https://www.fincado.com/hi/ppf-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/ppf-calculator',
    },
  },
};

export default function HindiPPFPage() {
  // ✅ Define Hindi Labels
  const hindiLabels = {
    modeLabel: 'निवेश मोड (Mode)',
    monthlyInv: 'मासिक निवेश (Monthly Investment)',
    annualInv: 'सालाना निवेश (Annual Investment)',
    rate: 'ब्याज दर (Interest Rate %)',
    duration: 'अवधि (Years)',
    maturity: 'परिपक्वता राशि (Maturity Value)',
    totalInv: 'कुल निवेश (Total Investment)',
    totalInt: 'कुल ब्याज (Total Interest)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          {
            name: 'PPF कैलकुलेटर',
            url: 'https://www.fincado.com/hi/ppf-calculator',
          },
        ]}
      />

      <CalculatorSchema
        name="PPF Calculator Hindi"
        description="Calculate PPF Maturity in Hindi."
        url="https://www.fincado.com/hi/ppf-calculator"
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
              PPF कैलकुलेटर (PPF Calculator in Hindi)
            </h1>
            <ShareTools title="PPF कैलकुलेटर (Hindi)" />

            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <AdSlot id="hi-ppf-top" type="leaderboard" />
            </div>
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              पब्लिक प्रोविडेंट फंड (PPF) भारत में निवेश का सबसे सुरक्षित विकल्प
              है। इस कैलकुलेटर से जानें कि 15 साल बाद आपको कितना रिटर्न मिलेगा।
            </p>
          </header>

          <div style={{ marginTop: 32 }}>
            {/* ✅ Pass Labels */}
            <PPFClient labels={hindiLabels} />
          </div>

          <div className="no-print" style={{ margin: '32px 0' }}>
            <AdSlot id="hi-ppf-mid" type="banner" />
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>PPF खाता क्या है?</h2>
            <p>
              PPF (Public Provident Fund) सरकार द्वारा समर्थित एक लंबी अवधि की
              बचत योजना है। इसमें निवेश करने पर आपको <strong>धारा 80C</strong>{' '}
              के तहत टैक्स छूट भी मिलती है।
            </p>

            <div className="no-print my-8 flex justify-center">
              <AdSlot type="square" label="Advertisement" />
            </div>
            <h3>महत्वपूर्ण नियम</h3>
            <ul>
              <li>
                <strong>अवधि:</strong> 15 साल (लॉक-इन)।
              </li>
              <li>
                <strong>ब्याज दर:</strong> सरकार हर तिमाही तय करती है।
              </li>
            </ul>
          </div>
        </div>

        <HindiSidebar adId="hi-ppf-sidebar" />
      </div>
    </main>
  );
}
