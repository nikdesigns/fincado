// src/app/hi/loans/home-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import HomeLoanClient from '@/app/loans/home-loan/HomeLoanClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import Link from 'next/link';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'होम लोन EMI कैलकुलेटर – ब्याज और टैक्स छूट की गणना करें | Fincado',
  description:
    'Fincado होम लोन कैलकुलेटर (Hindi): अपनी मासिक किस्त (EMI) जानें, कुल ब्याज की गणना करें और टैक्स छूट (Section 80C, 24b) का लाभ उठाएं।',
  keywords: [
    'Home Loan EMI Calculator Hindi',
    'Housing Loan Calculator India',
    'Home Loan Tax Benefit Hindi',
    'SBI Home Loan Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/loans/home-loan/',
    languages: {
      'en-IN': 'https://www.fincado.com/loans/home-loan/',
    },
  },
  openGraph: {
    title: 'होम लोन EMI कैलकुलेटर – अपने घर का सपना पूरा करें',
    description: 'मुफ्त टूल: होम लोन EMI, ब्याज और टैक्स बचत की गणना करें।',
    url: 'https://www.fincado.com/hi/loans/home-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiHomeLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
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
        name="Home Loan EMI Calculator Hindi"
        description="Calculate Home Loan EMI and Tax Benefits in Hindi."
        url="https://www.fincado.com/hi/loans/home-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'होम लोन EMI कैलकुलेटर',
            url: 'https://www.fincado.com/hi/loans/home-loan/',
          },
        ]}
      />

      {/* Expanded FAQ Schema (Hindi) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'होम लोन कैलकुलेटर कैसे मदद करता है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'यह आपको अपनी मासिक ईएमआई (EMI), कुल ब्याज लागत और टैक्स लाभों का अनुमान लगाने में मदद करता है।',
                },
              },
              {
                '@type': 'Question',
                name: 'होम लोन पर टैक्स लाभ क्या हैं?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'आप धारा 80C के तहत मूलधन भुगतान पर ₹1.5 लाख तक और धारा 24(b) के तहत ब्याज पर ₹2 लाख तक की कटौती का दावा कर सकते हैं।',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          {/* Language Switcher */}
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/loans/home-loan/"
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
            होम लोन EMI कैलकुलेटर
          </h1>
          <ShareTools title="होम लोन EMI कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            अपने सपनों के घर की योजना बनाएं। हमारी सटीक गणना से जानें EMI, कुल
            ब्याज और <strong>टैक्स बचत (Tax Benefits)</strong>।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <HomeLoanClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-home-loan-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>होम लोन क्या है? (What is a Home Loan?)</h2>
              <p>
                होम लोन एक सुरक्षित ऋण (Secured Loan) है जो बैंक या वित्तीय
                संस्थान घर खरीदने, बनाने या मरम्मत करने के लिए देते हैं। भारत
                में, होम लोन 30 साल तक की लंबी अवधि और{' '}
                <strong>टैक्स लाभ</strong>
                के साथ आते हैं।
              </p>

              <h3>होम लोन पर टैक्स लाभ (Tax Benefits 2025)</h3>
              <p>
                भारत में होम लोन सबसे अच्छे टैक्स सेविंग विकल्पों में से एक है।
                आप दो धाराओं के तहत छूट का दावा कर सकते हैं:
              </p>
              <ul>
                <li>
                  <strong>धारा 80C:</strong> मूलधन (Principal) भुगतान पर ₹1.5
                  लाख तक की कटौती।
                </li>
                <li>
                  <strong>धारा 24(b):</strong> ब्याज (Interest) भुगतान पर ₹2 लाख
                  तक की कटौती (स्वयं के घर के लिए)।
                </li>
              </ul>
              <p>
                इस कैलकुलेटर का उपयोग करके अपनी EMI को मूलधन और ब्याज में
                विभाजित करें और अधिकतम टैक्स लाभ उठाएं।
              </p>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/emi-calculator/">EMI कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/sip-calculator/">SIP कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/ppf-calculator/">PPF कैलकुलेटर</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>क्या होम लोन का ब्याज टैक्स-फ्री है?</summary>
                <p>
                  पूरी तरह नहीं। धारा 24(b) के तहत, आप खुद के रहने वाले घर के
                  लिए चुकाए गए ब्याज पर प्रति वर्ष ₹2 लाख तक की कटौती का दावा कर
                  सकते हैं।
                </p>
              </details>
              <details>
                <summary>
                  क्या मैं अपनी EMI से ज्यादा भुगतान कर सकता हूं?
                </summary>
                <p>
                  हाँ, इसे <strong>Prepayment</strong> (पूर्व भुगतान) कहा जाता
                  है। साल में एक अतिरिक्त EMI देने से भी आपकी लोन अवधि कई साल कम
                  हो सकती है और आप लाखों रुपये ब्याज बचा सकते हैं।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-home-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
