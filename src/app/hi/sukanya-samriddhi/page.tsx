import type { Metadata } from 'next';
import SSYClient from '@/app/sukanya-samriddhi/SSYClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';
import LanguageToggle from '@/components/LanguageToggle';

export const metadata: Metadata = {
  title: 'सुकन्या समृद्धि योजना (SSY) कैलकुलेटर - ब्याज और परिपक्वता | Fincado',
  description:
    'सुकन्या समृद्धि योजना (SSY) कैलकुलेटर हिंदी में: जानें कि बेटी की 21 साल की उम्र में आपको कितना पैसा मिलेगा। ब्याज दर और नियम।',
  keywords: [
    'Sukanya Samriddhi Yojana Hindi',
    'SSY Calculator Hindi',
    'Beti Bachao Beti Padhao',
    'सुकन्या समृद्धि योजना',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/sukanya-samriddhi',
    languages: {
      'en-IN': 'https://www.fincado.com/sukanya-samriddhi',
    },
  },
};

export default function HindiSSYPage() {
  // ✅ Hindi Labels
  const hindiLabels = {
    girlAge: 'बेटी की वर्तमान आयु (Current Age)',
    depositFreq: 'निवेश का तरीका (Frequency)',
    monthlyInv: 'मासिक निवेश (Monthly)',
    yearlyInv: 'सालाना निवेश (Yearly)',
    rate: 'ब्याज दर (Interest Rate %)',
    maturityVal: 'परिपक्वता राशि (Maturity Value)',
    totalInv: 'कुल निवेश (Total Investment)',
    totalInt: 'कुल ब्याज (Total Interest)',
    infoText: 'खाता 10 वर्ष की आयु तक ही खुल सकता है।',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi' },
          {
            name: 'SSY कैलकुलेटर',
            url: 'https://www.fincado.com/hi/sukanya-samriddhi',
          },
        ]}
      />

      <CalculatorSchema
        name="Sukanya Samriddhi Calculator Hindi"
        description="Calculate SSY maturity amount in Hindi."
        url="https://www.fincado.com/hi/sukanya-samriddhi"
      />

      <div className="layout-grid">
        <div className="main-content">
          <header style={{ marginBottom: 32 }}>
            <LanguageToggle path="/sukanya-samriddhi" />
            <h1
              style={{
                fontSize: '28px',
                color: '#0f172a',
                marginBottom: '16px',
              }}
            >
              सुकन्या समृद्धि योजना (SSY Calculator Hindi)
            </h1>
            <ShareTools title="SSY कैलकुलेटर (Hindi)" />

            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <AdSlot id="hi-ssy-top" type="leaderboard" />
            </div>
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              यह भारत सरकार की &apos;बेटी बचाओ, बेटी पढ़ाओ&apos; अभियान के तहत
              एक छोटी बचत योजना है। जानें कि आज का छोटा निवेश आपकी बेटी के
              भविष्य (शिक्षा/शादी) के लिए कितना बड़ा फंड बना सकता है।
            </p>
          </header>

          <div style={{ marginTop: 32 }}>
            {/* ✅ Pass Hindi Labels */}
            <SSYClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-ssy-mid" type="banner" />
            </div>
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>SSY योजना क्या है?</h2>
            <p>
              सुकन्या समृद्धि योजना (SSY) बेटियों के सुरक्षित भविष्य के लिए
              केंद्र सरकार की एक योजना है। इसमें आपको <strong>धारा 80C</strong>{' '}
              के तहत टैक्स छूट भी मिलती है और इसका ब्याज दर अन्य योजनाओं (जैसे
              PPF) से ज्यादा होता है।
            </p>

            <h3>मुख्य नियम (Key Rules)</h3>
            <ul>
              <li>
                <strong>योग्यता:</strong> 10 वर्ष से कम उम्र की बेटी के नाम पर
                खाता खोला जा सकता है।
              </li>
              <li>
                <strong>जमा अवधि:</strong> खाता खोलने की तारीख से 15 साल तक पैसे
                जमा करने होते हैं।
              </li>
              <li>
                <strong>मैच्योरिटी:</strong> खाता खोलने के 21 साल बाद यह स्कीम
                पूरी (Mature) होती है।
              </li>
              <li>
                <strong>न्यूनतम निवेश:</strong> ₹250 प्रति वर्ष।
              </li>
              <li>
                <strong>अधिकतम निवेश:</strong> ₹1.5 लाख प्रति वर्ष।
              </li>
            </ul>

            <div className="no-print my-8 flex justify-center">
              <AdSlot type="square" label="Advertisement" />
            </div>

            <h3>पैसे कब निकाल सकते हैं?</h3>
            <p>
              बेटी की उम्र <strong>18 साल</strong> होने पर उसकी उच्च शिक्षा
              (Higher Education) के लिए 50% राशि निकाली जा सकती है। पूरी राशि 21
              साल बाद ही मिलती है।
            </p>
          </div>
        </div>

        <HindiSidebar adId="hi-ssy-sidebar" />
      </div>
    </main>
  );
}
