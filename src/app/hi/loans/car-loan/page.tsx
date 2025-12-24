// src/app/hi/loans/car-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CarLoanClient from '@/app/loans/car-loan/CarLoanClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'कार लोन EMI कैलकुलेटर – नई और पुरानी कार लोन ब्याज दरें',
  description:
    'Fincado कार लोन कैलकुलेटर (Hindi): नई और पुरानी कार लोन की EMI गणना करें। SBI, HDFC, Axis की ब्याज दरें तुलना करें और पात्रता जांचें।',
  keywords: [
    'Car Loan EMI Calculator Hindi',
    'Auto Loan Calculator Hindi',
    'New Car vs Used Car Loan Hindi',
    'Car Loan Eligibility Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/loans/car-loan/',
    languages: {
      'en-IN': 'https://www.fincado.com/loans/car-loan/',
    },
  },
  openGraph: {
    title: 'कार लोन EMI कैलकुलेटर – अपने सपनों की कार घर लाएं',
    description: 'मुफ्त टूल: कार लोन EMI, ब्याज और अवधि की गणना करें।',
    url: 'https://www.fincado.com/hi/loans/car-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiCarLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    vehiclePrice: 'वाहन की कीमत (Vehicle Price)',
    downPayment: 'डाउन पेमेंट (Down Payment)',
    tradeInValue: 'पुरानी कार की कीमत (Trade-In)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    tenure: 'अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    interest: 'ब्याज (Interest)',
    amortizationSchedule: 'किस्त तालिका (Amortization)',
    yearlyBreakdown: 'वर्ष के अनुसार विवरण',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    balance: 'बकाया राशि',
  };

  return (
    <>
      <CalculatorSchema
        name="Car Loan EMI Calculator Hindi"
        description="Calculate Car Loan EMI in Hindi."
        url="https://www.fincado.com/hi/loans/car-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'कार लोन EMI कैलकुलेटर',
            url: 'https://www.fincado.com/hi/loans/car-loan/',
          },
        ]}
      />

      {/* FAQ Schema (Hindi) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'क्या मैं लोन के दौरान अपनी कार बेच सकता हूँ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'नहीं। कार बेचने से पहले आपको लोन चुकाकर आरसी (RC) से हाइपोथेकेशन हटवाना होगा।',
                },
              },
              {
                '@type': 'Question',
                name: 'क्या कार लोन पर टैक्स छूट मिलती है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'वेतनभोगी व्यक्तियों के लिए नहीं। लेकिन यदि आप व्यवसायी हैं और कार का उपयोग व्यापार के लिए करते हैं, तो आप ब्याज और मूल्यह्रास पर कर लाभ का दावा कर सकते हैं।',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/loans/car-loan/"
              style={{
                fontSize: '14px',
                color: '#64748b',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f1f5f9',
                padding: '6px 12px',
                borderRadius: '99px',
              }}
            >
              <span>🇬🇧</span> Switch to English
            </Link>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              color: '#0f172a',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            कार लोन EMI कैलकुलेटर
          </h1>
          <ShareTools title="कार लोन EMI कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            अपने सपनों की कार घर लाएं। हमारी सटीक गणना से जानें EMI, डाउन पेमेंट
            और <strong>ब्याज दरें (Interest Rates)</strong>।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <CarLoanClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-car-loan-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>कार लोन क्या है? (What is a Car Loan?)</h2>
              <p>
                कार लोन एक सुरक्षित ऋण (Secured Loan) है जो बैंक नई या पुरानी
                कार खरीदने के लिए देते हैं। कार को लोन चुकाने तक बैंक के पास
                गिरवी (Hypothecation) रखा जाता है। नई कारों के लिए ब्याज दरें
                आमतौर पर <strong>8.5% से 11%</strong> के बीच होती हैं।
              </p>

              <h3>पात्रता (Eligibility)</h3>
              <ul>
                <li>
                  <strong>आयु:</strong> लोन परिपक्वता पर 21–65 वर्ष।
                </li>
                <li>
                  <strong>आय:</strong> वेतनभोगी कर्मचारियों के लिए न्यूनतम ₹3
                  लाख सालाना।
                </li>
                <li>
                  <strong>क्रेडिट स्कोर:</strong> 750+ CIBIL स्कोर पर सबसे कम
                  ब्याज दरें मिलती हैं।
                </li>
              </ul>

              <h3>नई कार बनाम पुरानी कार लोन</h3>
              <p>
                बैंक <strong>नई कार लोन</strong> और{' '}
                <strong>पुरानी (Used) कार लोन</strong> के लिए अलग-अलग दरें
                प्रदान करते हैं। पुरानी कार लोन की ब्याज दरें अक्सर अधिक
                (12%–18%) होती हैं और इसके लिए अधिक डाउन पेमेंट की आवश्यकता होती
                है।
              </p>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/emi-calculator/">EMI कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/loans/home-loan/">होम लोन कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/sip-calculator/">SIP कैलकुलेटर</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>क्या मैं लोन के दौरान अपनी कार बेच सकता हूँ?</summary>
                <p>
                  नहीं। कार बेचने से पहले आपको लोन चुकाकर आरसी (RC) से
                  हाइपोथेकेशन हटवाना होगा।
                </p>
              </details>
              <details>
                <summary>क्या कार लोन पर फोरक्लोजर चार्ज लगता है?</summary>
                <p>
                  आमतौर पर बकाया मूलधन का 3-5%। कुछ बैंक 2 साल बाद इसे माफ कर
                  देते हैं।
                </p>
              </details>
              <details>
                <summary>क्या वेतनभोगी लोगों को टैक्स छूट मिलती है?</summary>
                <p>
                  आमतौर पर नहीं। कार लोन पर टैक्स लाभ केवल उन स्वरोजगार
                  (Self-employed) व्यक्तियों या व्यवसायों के लिए उपलब्ध है जो
                  वाहन का उपयोग व्यावसायिक उद्देश्यों के लिए करते हैं।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-car-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
