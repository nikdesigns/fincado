// src/app/hi/loans/personal-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PersonalLoanClient from '@/app/loans/personal-loan/PersonalLoanClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'पर्सनल लोन EMI कैलकुलेटर – पात्रता और ब्याज दरें (2025)',
  description:
    'Fincado पर्सनल लोन कैलकुलेटर (Hindi): अपनी EMI निकालें, ब्याज दरें तुलना करें और पात्रता चेक करें। शादी, यात्रा या मेडिकल खर्च के लिए सटीक गणना।',
  keywords: [
    'Personal Loan EMI Calculator Hindi',
    'Personal Loan Interest Rate Hindi',
    'Unsecured Loan Calculator Hindi',
    'Loan Eligibility Calculator Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/loans/personal-loan/',
    languages: {
      'en-IN': 'https://www.fincado.com/loans/personal-loan/',
    },
  },
  openGraph: {
    title: 'पर्सनल लोन EMI कैलकुलेटर – अपनी जरूरतों को पूरा करें',
    description: 'मुफ्त टूल: पर्सनल लोन EMI, ब्याज और अवधि की गणना करें।',
    url: 'https://www.fincado.com/hi/loans/personal-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiPersonalLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    tenure: 'अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    interest: 'ब्याज (Interest)',
    amortizationSchedule: 'किस्त तालिका (Amortization)',
    monthlyBreakdown: 'मासिक विवरण',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    balance: 'बकाया राशि',
  };

  return (
    <>
      <CalculatorSchema
        name="Personal Loan EMI Calculator Hindi"
        description="Calculate Personal Loan EMI in Hindi."
        url="https://www.fincado.com/hi/loans/personal-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'पर्सनल लोन EMI कैलकुलेटर',
            url: 'https://www.fincado.com/hi/loans/personal-loan/',
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
                name: 'पर्सनल लोन EMI की गणना कैसे की जाती है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'पर्सनल लोन EMI की गणना इस फॉर्मूले से होती है: P x R x (1+R)^N / [(1+R)^N-1], जहाँ P मूलधन है, R मासिक ब्याज दर है, और N अवधि है।',
                },
              },
              {
                '@type': 'Question',
                name: 'क्या मैं अपना पर्सनल लोन पहले चुका सकता हूँ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'हाँ, लेकिन अधिकांश बैंक बकाया मूलधन पर 2-4% का फोरक्लोजर शुल्क (Foreclosure Charges) लेते हैं। कुछ बैंक 12 महीने बाद इसे मुफ्त कर देते हैं।',
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
              href="/loans/personal-loan/"
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
            पर्सनल लोन EMI कैलकुलेटर
          </h1>
          <ShareTools title="पर्सनल लोन EMI कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            अपने खर्चों की योजना बनाएं। शादी, यात्रा या मेडिकल इमरजेंसी के लिए
            सटीक <strong>EMI की गणना</strong> करें।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <PersonalLoanClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-personal-loan-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>पर्सनल लोन क्या है? (What is a Personal Loan?)</h2>
              <p>
                पर्सनल लोन एक <strong>असुरक्षित ऋण (Unsecured Loan)</strong> है
                जो बैंक आपकी तत्काल वित्तीय जरूरतों को पूरा करने के लिए देते
                हैं। होम या कार लोन के विपरीत, इसका उपयोग किसी भी उद्देश्य
                (शादी, मेडिकल, यात्रा) के लिए किया जा सकता है।
              </p>
              <p>
                चूंकि यह &quot;असुरक्षित&quot; है, इसलिए आपको कोई{' '}
                <strong>संपत्ति</strong> (जैसे घर या सोना) गिरवी रखने की
                आवश्यकता नहीं होती। इसकी मंजूरी मुख्य रूप से आपके{' '}
                <strong>क्रेडिट स्कोर (CIBIL Score)</strong> और आय पर निर्भर
                करती है।
              </p>

              <h3>पात्रता (Eligibility Criteria)</h3>
              <ul>
                <li>
                  <strong>रोजगार:</strong> वेतनभोगी (Salaried) या स्वरोजगार
                  (Self-Employed)।
                </li>
                <li>
                  <strong>आयु:</strong> 21 से 60 वर्ष।
                </li>
                <li>
                  <strong>क्रेडिट स्कोर:</strong> 750+ CIBIL स्कोर पर सबसे अच्छी
                  ब्याज दरें मिलती हैं।
                </li>
                <li>
                  <strong>आय:</strong> न्यूनतम मासिक आय ₹25,000 (शहर के अनुसार
                  भिन्न हो सकती है)।
                </li>
              </ul>

              <h3>पर्सनल लोन बनाम क्रेडिट कार्ड लोन</h3>
              <p>
                कई लोग पर्सनल लोन और क्रेडिट कार्ड लोन में भ्रमित होते हैं।{' '}
                <strong>पर्सनल लोन</strong> आमतौर पर सस्ते (10.5%–14%) होते हैं,
                जबकि क्रेडिट कार्ड पर ब्याज दरें बहुत अधिक (36%–42%) होती हैं।
                बड़े खर्चों के लिए हमेशा पर्सनल लोन चुनें।
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
                  <Link href="/hi/loans/car-loan/">कार लोन कैलकुलेटर</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>
                  क्या पर्सनल लोन के ब्याज पर टैक्स छूट मिलती है?
                </summary>
                <p>
                  आमतौर पर नहीं। हालाँकि, यदि लोन का उपयोग घर की मरम्मत (धारा 24
                  के तहत) या व्यवसाय विस्तार के लिए किया जाता है, तो आप कटौती का
                  दावा कर सकते हैं। इसके लिए सबूत अपने पास रखें।
                </p>
              </details>
              <details>
                <summary>
                  फोरक्लोजर शुल्क (Foreclosure Charges) क्या हैं?
                </summary>
                <p>
                  यदि आप अवधि समाप्त होने से पहले पूरा लोन चुकाते हैं, तो
                  अधिकांश बैंक बकाया मूलधन का 2% से 4% शुल्क लेते हैं। लोन लेते
                  समय एग्रीमेंट जरूर पढ़ें।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-personal-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
