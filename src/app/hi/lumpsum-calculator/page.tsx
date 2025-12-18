import type { Metadata } from 'next';
import LumpsumClient from '@/app/lumpsum-calculator/LumpsumClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'Lumpsum कैलकुलेटर – एकमुश्त निवेश पर रिटर्न | Fincado',
  description:
    'Lumpsum Calculator Hindi: म्यूचुअल फंड या एफडी में एकमुश्त निवेश पर मिलने वाले रिटर्न और कंपाउंडिंग ब्याज की गणना करें।',
  alternates: {
    canonical: 'https://www.fincado.com/hi/lumpsum-calculator',
    languages: { 'en-IN': 'https://www.fincado.com/lumpsum-calculator' },
  },
};

export default function HindiLumpsumPage() {
  const hindiLabels = {
    investment: 'निवेश राशि (Investment)',
    rate: 'ब्याज दर (Expected Return %)',
    time: 'समय अवधि (Years)',
    frequency: 'ब्याज चक्र (Compounding)',
    futureVal: 'कुल राशि (Future Value)',
    invested: 'कुल निवेश',
    wealthGained: 'कुल फायदा (Returns)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi' },
          {
            name: 'Lumpsum कैलकुलेटर',
            url: 'https://www.fincado.com/hi/lumpsum-calculator',
          },
        ]}
      />
      <CalculatorSchema
        name="Lumpsum Calculator Hindi"
        description="Calculate one-time investment returns in Hindi."
        url="https://www.fincado.com/hi/lumpsum-calculator"
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
              Lumpsum कैलकुलेटर (एकमुश्त निवेश)
            </h1>
            <ShareTools title="Lumpsum Calculator (Hindi)" />
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              यदि आपके पास एक साथ बड़ी राशि (जैसे बोनस या प्रॉपर्टी से मिला
              पैसा) है, तो उसे एकमुश्त (Lumpsum) निवेश करें और कंपाउंडिंग का लाभ
              उठाएं।
            </p>
          </header>
          <AdSlot type="leaderboard" />
          <div style={{ marginTop: 32 }}>
            <LumpsumClient labels={hindiLabels} />
          </div>
          <div className="article" style={{ marginTop: 40 }}>
            <h2>Lumpsum निवेश क्या है?</h2>
            <p>
              जब आप म्यूचुअल फंड या बैंक में एक ही बार में बड़ी रकम जमा करते
              हैं, तो इसे Lumpsum निवेश कहते हैं।
            </p>
            <h3>फायदे</h3>
            <ul>
              <li>
                <strong>बड़ा रिटर्न:</strong> पूरी रकम पर पहले दिन से ब्याज
                मिलता है।
              </li>
              <li>
                <strong>सुविधा:</strong> बार-बार पैसे जमा करने की जरूरत नहीं।
              </li>
            </ul>
          </div>
        </div>
        <HindiSidebar />
      </div>
    </main>
  );
}
