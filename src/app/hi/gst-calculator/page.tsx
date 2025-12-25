import type { Metadata } from 'next';
import GSTClient from '@/app/gst-calculator/GSTClient';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';

export const metadata: Metadata = {
  title: 'GST कैलकुलेटर – GST जोड़ें या हटाएं (Online Tool) | Fincado',
  description:
    'GST कैलकुलेटर हिंदी में: किसी भी राशि पर GST (5%, 12%, 18%, 28%) की गणना करें। जानें कि टैक्स के बाद फाइनल कीमत क्या होगी।',
  keywords: [
    'GST Calculator Hindi',
    'GST Calculation Formula Hindi',
    'Reverse GST Calculator Hindi',
    'जीएसटी कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/gst-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/gst-calculator',
    },
  },
};

export default function HindiGSTPage() {
  // ✅ Hindi Labels
  const hindiLabels = {
    modeLabel: 'कैलकुलेशन मोड (Mode)',
    addMode: 'GST जोड़ें (+)',
    removeMode: 'GST हटाएं (-)',
    amountLabelAdd: 'मूल राशि (Net Price)',
    amountLabelRemove: 'कुल राशि (Gross Price/MRP)',
    rateLabel: 'GST दर (%)',
    resultNet: 'टैक्स हटाने के बाद (Net Price)',
    resultGross: 'टैक्स जोड़ने के बाद (Gross Price)',
    resultTax: 'कुल टैक्स (Total Tax)',
    resultBase: 'मूल कीमत (Base Price)',
    taxSplit: 'टैक्स विभाजन (CGST/SGST)',
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi' },
          {
            name: 'GST कैलकुलेटर',
            url: 'https://www.fincado.com/hi/gst-calculator',
          },
        ]}
      />

      <CalculatorSchema
        name="GST Calculator Hindi"
        description="Calculate GST inclusive and exclusive amounts in Hindi."
        url="https://www.fincado.com/hi/gst-calculator"
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
              GST कैलकुलेटर (GST Calculator in Hindi)
            </h1>
            <ShareTools title="GST कैलकुलेटर (Hindi)" />

            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <AdSlot id="hi-gst-top" type="leaderboard" />
            </div>

            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              यह टूल आपको किसी भी सामान या सेवा पर GST की गणना करने में मदद करता
              है। आप GST जोड़ भी सकते हैं और MRP से GST हटा (Reverse Calculate)
              भी सकते हैं।
            </p>
          </header>

          <div style={{ marginTop: 32 }}>
            {/* ✅ Pass Hindi Labels */}
            <GSTClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-gst-mid" type="banner" />
            </div>
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>GST क्या है? (What is GST?)</h2>
            <p>
              GST (Goods and Services Tax) एक अप्रत्यक्ष कर (Indirect Tax) है जो
              पूरे भारत में वस्तुओं और सेवाओं की सप्लाई पर लगता है। इसे &apos;वन
              नेशन, वन टैक्स&apos; के सिद्धांत पर लाया गया था।
            </p>

            <h3>GST के प्रकार</h3>
            <ul>
              <li>
                <strong>CGST:</strong> यह केंद्र सरकार के पास जाता है।
              </li>
              <li>
                <strong>SGST:</strong> यह राज्य सरकार के पास जाता है।
              </li>
              <li>
                <strong>IGST:</strong> यह तब लगता है जब आप एक राज्य से दूसरे
                राज्य में व्यापार करते हैं।
              </li>
            </ul>
            <div className="no-print my-8 flex justify-center">
              <AdSlot type="square" label="Advertisement" />
            </div>

            <h3>GST कैसे निकालें?</h3>
            <p>
              यदि किसी वस्तु की कीमत ₹100 है और GST दर 18% है:
              <br />
              <strong>GST राशि = 100 x 18% = ₹18</strong>
              <br />
              <strong>कुल कीमत = ₹100 + ₹18 = ₹118</strong>
            </p>
          </div>
        </div>

        <HindiSidebar adId="hi-gst-sidebar" />
      </div>
    </main>
  );
}
