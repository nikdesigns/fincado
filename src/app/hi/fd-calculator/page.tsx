import type { Metadata } from 'next';
import FDClient from '@/app/fd-calculator/FDClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'FD कैलकुलेटर – फिक्स्ड डिपॉजिट ब्याज और रिटर्न | Fincado',
  description:
    'FD (Fixed Deposit) कैलकुलेटर हिंदी में: जानें कि आपकी जमा राशि पर बैंक आपको कितना ब्याज देगा।',
  alternates: {
    canonical: 'https://www.fincado.com/hi/fd-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/fd-calculator',
    },
  },
};

export default function HindiFDPage() {
  // ✅ Define Hindi Labels
  const hindiLabels = {
    principal: 'जमा राशि (Principal Amount)',
    rate: 'ब्याज दर (Interest Rate %)',
    years: 'वर्ष (Years)',
    months: 'महीने (Months)',
    freq: 'ब्याज चक्र (Compounding Freq)',
    maturity: 'परिपक्वता राशि (Maturity Amount)',
    totalPrincipal: 'मूल राशि (Principal)',
    interest: 'कुल ब्याज (Total Interest)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          {
            name: 'FD कैलकुलेटर',
            url: 'https://www.fincado.com/hi/fd-calculator',
          },
        ]}
      />

      <CalculatorSchema
        name="FD Calculator Hindi"
        description="Calculate Fixed Deposit returns in Hindi."
        url="https://www.fincado.com/hi/fd-calculator"
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
              FD कैलकुलेटर (FD Calculator in Hindi)
            </h1>
            <ShareTools title="FD कैलकुलेटर (Hindi)" />
            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <AdSlot id="hi-fd-top" type="leaderboard" />
            </div>
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              फिक्स्ड डिपॉजिट (FD) निवेश का पारंपरिक और सुरक्षित तरीका है। अपनी
              जमा राशि, ब्याज दर और अवधि दर्ज करें और जानें कि आपको कितना रिटर्न
              मिलेगा।
            </p>
          </header>

          <div style={{ marginTop: 32 }}>
            {/* ✅ Pass Labels */}
            <FDClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-fd-mid" type="banner" />
            </div>
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>FD (फिक्स्ड डिपॉजिट) क्या है?</h2>
            <p>
              FD में आप एक निश्चित राशि को बैंक में एक निश्चित समय (जैसे 1 साल,
              5 साल) के लिए जमा करते हैं। बदले में बैंक आपको सामान्य बचत खाते से
              ज्यादा ब्याज देता है।
            </p>
            <div className="no-print my-8 flex justify-center">
              <AdSlot type="square" label="Advertisement" />
            </div>
            <h3>लाभ (Benefits)</h3>
            <ul>
              <li>
                <strong>सुरक्षित निवेश:</strong> शेयर बाजार का जोखिम नहीं।
              </li>
              <li>
                <strong>निश्चित रिटर्न:</strong> पहले से पता होता है कि कितना
                पैसा मिलेगा।
              </li>
            </ul>
          </div>
        </div>

        <HindiSidebar adId="hi-fd-sidebar" />
      </div>
    </main>
  );
}
