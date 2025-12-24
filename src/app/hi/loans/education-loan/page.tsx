// src/app/hi/loans/education-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EducationLoanClient from '@/app/loans/education-loan/EducationLoanClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'एजुकेशन लोन कैलकुलेटर – ब्याज, EMI और टैक्स छूट (Section 80E)',
  description:
    'Fincado एजुकेशन लोन कैलकुलेटर (Hindi): अपनी EMI और कोर्स अवधि के ब्याज (Moratorium) की गणना करें। विदेश में पढ़ाई और टैक्स लाभ (Section 80E) की जानकारी प्राप्त करें।',
  keywords: [
    'Education Loan Calculator Hindi',
    'Student Loan EMI Hindi',
    'Section 80E Tax Deduction Hindi',
    'Study Abroad Loan Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/loans/education-loan/',
    languages: {
      'en-IN': 'https://www.fincado.com/loans/education-loan/',
    },
  },
  openGraph: {
    title: 'एजुकेशन लोन कैलकुलेटर – अपने भविष्य की योजना बनाएं',
    description: 'मुफ्त टूल: कोर्स के दौरान ब्याज और EMI की सटीक गणना करें।',
    url: 'https://www.fincado.com/hi/loans/education-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiEducationLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    moratorium: 'कोर्स अवधि (Moratorium Months)',
    repaymentTenure: 'पुनर्भुगतान अवधि (Years)',
    payInterestToggle: 'क्या आप कोर्स के दौरान ब्याज चुकाएंगे?',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principalCap: 'कुल मूलधन (Principal + Interest)',
    totalInterest: 'कुल ब्याज',
    interestSavedMsg: '✅ आप मूलधन पर ब्याज बचा रहे हैं!',
    interestAddedMsg: '⚠️ ब्याज मूलधन में जुड़ गया:',
    repaymentSchedule: 'किस्त तालिका (Repayment Schedule)',
    startsAfter: 'कोर्स अवधि (Moratorium) के बाद शुरू',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    principal: 'मूलधन',
    interest: 'ब्याज',
    balance: 'बकाया राशि',
  };

  return (
    <>
      <CalculatorSchema
        name="Education Loan EMI Calculator Hindi"
        description="Calculate Education Loan EMI and Section 80E benefits in Hindi."
        url="https://www.fincado.com/hi/loans/education-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'एजुकेशन लोन कैलकुलेटर',
            url: 'https://www.fincado.com/hi/loans/education-loan/',
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
                name: 'Moratorium अवधि क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "यह एक 'पुनर्भुगतान अवकाश' (Repayment Holiday) है, जिसमें कोर्स की अवधि और 6-12 महीने शामिल होते हैं। इस दौरान आपको EMI नहीं देनी पड़ती, लेकिन साधारण ब्याज जुड़ता रहता है।",
                },
              },
              {
                '@type': 'Question',
                name: 'Section 80E के तहत किसे छूट मिलती है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'कोई भी व्यक्ति जिसने अपनी, अपने जीवनसाथी या बच्चों की उच्च शिक्षा के लिए लोन लिया है, वह ब्याज पर टैक्स छूट का दावा कर सकता है।',
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
              href="/loans/education-loan/"
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
            एजुकेशन लोन कैलकुलेटर
          </h1>
          <ShareTools title="एजुकेशन लोन कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            अपनी उच्च शिक्षा की योजना बनाएं। <strong>Moratorium अवधि</strong> के
            साथ EMI की गणना करें और <strong>Section 80E</strong> के तहत टैक्स
            बचत को समझें।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <EducationLoanClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-edu-loan-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>एजुकेशन लोन क्या है? (What is Education Loan?)</h2>
              <p>
                एजुकेशन लोन एक वित्तीय सहायता है जो छात्रों को भारत या विदेश में
                उच्च शिक्षा प्राप्त करने में मदद करती है। अन्य लोन के विपरीत,
                इसमें
                <strong>Moratorium अवधि</strong> (पुनर्भुगतान अवकाश) की सुविधा
                होती है, जहाँ छात्र को कोर्स के दौरान EMI नहीं चुकानी पड़ती।
              </p>

              <h3>Section 80E टैक्स लाभ (Tax Benefits)</h3>
              <p>
                एजुकेशन लोन सभी लोन प्रकारों में सबसे अच्छा टैक्स लाभ प्रदान
                करता है। आयकर अधिनियम की <strong>धारा 80E</strong> के तहत, आप
                चुकाए गए <strong>पूरे ब्याज</strong> पर कटौती का दावा कर सकते
                हैं।
              </p>
              <ul>
                <li>
                  <strong>सीमा:</strong> कटौती की राशि पर कोई ऊपरी सीमा नहीं है
                  (80C के विपरीत)।
                </li>
                <li>
                  <strong>अवधि:</strong> यह लाभ 8 साल तक या जब तक ब्याज पूरा न
                  चुक जाए, तब तक मिलता है।
                </li>
              </ul>

              <h3>पात्रता (Eligibility Criteria)</h3>
              <ul>
                <li>
                  <strong>छात्र:</strong> भारतीय नागरिक होना चाहिए, आयु 18-35
                  वर्ष।
                </li>
                <li>
                  <strong>सह-आवेदक (Co-Applicant):</strong> माता-पिता या अभिभावक
                  का होना अनिवार्य है।
                </li>
                <li>
                  <strong>संपार्श्विक (Collateral):</strong> ₹4 लाख तक के लोन के
                  लिए कुछ भी गिरवी रखने की आवश्यकता नहीं होती।
                </li>
              </ul>

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
                <summary>Moratorium अवधि क्या है?</summary>
                <p>
                  यह एक छूट अवधि है जिसमें कोर्स की अवधि और उसके बाद 6-12 महीने
                  शामिल होते हैं। इस दौरान आपको EMI का भुगतान नहीं करना पड़ता,
                  लेकिन मूलधन पर साधारण ब्याज जुड़ता रहता है।
                </p>
              </details>
              <details>
                <summary>क्या विदेश में पढ़ाई के लिए लोन मिलता है?</summary>
                <p>
                  हाँ। बैंक विदेश के प्रतिष्ठित संस्थानों के लिए ₹1.5 करोड़ तक
                  का लोन देते हैं। आमतौर पर ₹7.5 लाख से अधिक के लोन के लिए
                  संपत्ति (Collateral) की आवश्यकता होती है।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-edu-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
