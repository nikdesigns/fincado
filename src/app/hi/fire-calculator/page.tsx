// src/app/hi/fire-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FIRECalculatorClient from '@/app/fire-calculator/FIRECalculatorClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'FIRE कैलकुलेटर – जल्दी रिटायरमेंट की योजना बनाएं (Early Retirement)',
  description:
    'Fincado FIRE कैलकुलेटर (Hindi): अपना FIRE नंबर जानें और जल्दी रिटायर होने के लिए आवश्यक बचत की गणना करें। वित्तीय स्वतंत्रता (Financial Freedom) का पहला कदम।',
  keywords: [
    'FIRE Calculator Hindi',
    'Financial Independence Retire Early Hindi',
    'Early Retirement Calculator Hindi',
    'FIRE Number Formula Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/fire-calculator/',
    languages: {
      'en-IN': 'https://www.fincado.com/fire-calculator/',
    },
  },
  openGraph: {
    title: 'FIRE कैलकुलेटर – अपनी शर्तों पर जीवन जिएं',
    description:
      'जानें कि आपको काम करना बंद करने के लिए कितने पैसों (Corpus) की जरूरत है।',
    url: 'https://www.fincado.com/hi/fire-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiFIREPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    currentAge: 'वर्तमान आयु (Current Age)',
    fireAge: 'FIRE आयु (Retire Age)',
    currentAnnualExpense: 'वार्षिक खर्च (Annual Expense)',
    currentCorpus: 'मौजूदा बचत (Current Savings)',
    advancedAssumptions: 'उन्नत सेटिंग (महंगाई, रिटर्न)',
    inflation: 'महंगाई दर (Inflation %)',
    returnRate: 'रिटर्न दर (Return Rate %)',
    safeWithdrawalRate: 'सुरक्षित निकासी दर (SWR %)',
    multiplier: 'गुणांक (Multiplier)',
    recommendedSWR: 'भारत के लिए सुझाव: 3.0% - 3.5%',
    resetDefaults: 'रीसेट करें',
    fireNumber: 'आपका FIRE लक्ष्य (FIRE Number)',
    monthlySavingsNeeded: 'मासिक बचत की जरूरत',
    perMonth: '/महीना',
    futureAnnualExp: 'भविष्य का वार्षिक खर्च',
    currentCorpusFV: 'मौजूदा बचत का भविष्य मूल्य',
  };

  return (
    <>
      <CalculatorSchema
        name="FIRE Calculator Hindi"
        description="Calculate Financial Independence Retire Early (FIRE) corpus in Hindi."
        url="https://www.fincado.com/hi/fire-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'FIRE कैलकुलेटर',
            url: 'https://www.fincado.com/hi/fire-calculator/',
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
                name: 'FIRE नंबर क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FIRE नंबर वह कुल निवेश राशि है जो आपको जीवन भर काम किए बिना अपने खर्चों को पूरा करने के लिए चाहिए। आमतौर पर यह आपके वार्षिक खर्च का 25 से 30 गुना होता है।',
                },
              },
              {
                '@type': 'Question',
                name: 'क्या भारत में 4% निकासी नियम सुरक्षित है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'भारत में अधिक महंगाई के कारण, 3% से 3.5% की निकासी दर (SWR) को अधिक सुरक्षित माना जाता है। इसका मतलब है कि आपको अपने खर्चों का लगभग 33 गुना जमा करना होगा।',
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
              href="/fire-calculator/"
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
            FIRE कैलकुलेटर (जल्दी रिटायरमेंट)
          </h1>
          <ShareTools title="FIRE कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            पैसों के लिए काम करना बंद करें और अपने पैसे को अपने लिए काम करने
            दें। जानें कि <strong>Financial Independence (आर्थिक आजादी)</strong>{' '}
            पाने के लिए आपको आज कितनी बचत करनी चाहिए।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <FIRECalculatorClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-fire-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>FIRE मूवमेंट क्या है?</h2>
              <p>
                <strong>FIRE (Financial Independence, Retire Early)</strong> एक
                जीवनशैली आंदोलन है जिसका लक्ष्य 60 वर्ष की पारंपरिक उम्र के बजाय
                जल्दी (30 या 40 के दशक में) रिटायर होना है।
              </p>
              <p>
                इसका मुख्य सिद्धांत आक्रामक बचत (आय का 50-70%) और कम लागत वाले
                निवेश के माध्यम से एक ऐसा <strong>कॉर्पस (Corpus)</strong> बनाना
                है जो आपके जीवन भर के खर्चों को पूरा करने के लिए पर्याप्त पैसिव
                इनकम (Passive Income) दे सके।
              </p>

              <h3>FIRE नंबर कैसे निकालें?</h3>
              <p>
                आपका FIRE नंबर वह लक्ष्य राशि है जिसे आपको प्राप्त करना है। इसका
                सरल सूत्र है:
              </p>
              <p>
                <em>FIRE नंबर = वार्षिक खर्च × 25 (या 30)</em>
              </p>
              <ul>
                <li>
                  <strong>Lean FIRE:</strong> कम खर्चीला जीवन जीने वालों के लिए
                  (25 गुना से कम)।
                </li>
                <li>
                  <strong>Fat FIRE:</strong> विलासितापूर्ण जीवन जीने वालों के
                  लिए (50 गुना से अधिक)।
                </li>
              </ul>

              <h3>सुरक्षित निकासी दर (Safe Withdrawal Rate - SWR)</h3>
              <p>
                यह वह प्रतिशत है जिसे आप अपने निवेश से हर साल निकाल सकते हैं
                बिना यह डर कि आपका पैसा खत्म हो जाएगा।
                <br />
                <strong>क्या भारत के लिए 4% नियम सही है?</strong>
                <br />
                नहीं, भारत में महंगाई दर (6-7%) अमेरिका से अधिक है। इसलिए भारतीय
                नियोजक <strong>3% से 3.5%</strong> की निकासी दर की सलाह देते
                हैं। इसका मतलब है कि आपको अपने वार्षिक खर्च का लगभग{' '}
                <strong>33 गुना</strong> जमा करना चाहिए।
              </p>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/sip-calculator/">SIP कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/retirement-calculator/">
                    रिटायरमेंट कैलकुलेटर
                  </Link>
                </li>
                <li>
                  <Link href="/hi/swp-calculator/">SWP कैलकुलेटर</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>FIRE हासिल करने में कितना समय लगता है?</summary>
                <p>
                  यह आपकी बचत दर (Savings Rate) पर निर्भर करता है। यदि आप अपनी
                  आय का 50% बचाते हैं, तो आपको लगभग 17 साल लगेंगे। यदि आप 70%
                  बचाते हैं, तो आप 9-10 वर्षों में आर्थिक स्वतंत्रता प्राप्त कर
                  सकते हैं।
                </p>
              </details>
              <details>
                <summary>FIRE के लिए कहाँ निवेश करें?</summary>
                <p>
                  इक्विटी म्यूचुअल फंड (विकास के लिए) और डेट इंस्ट्रूमेंट्स
                  (स्थिरता के लिए) का एक संतुलित पोर्टफोलियो आवश्यक है। रियल
                  एस्टेट से मिलने वाला किराया भी पैसिव इनकम का एक अच्छा स्रोत हो
                  सकता है।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-fire-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
