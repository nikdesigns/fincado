// src/app/hi/compound-interest-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CompoundInterestClient from '@/app/compound-interest-calculator/CompoundInterestClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'कंपाउंड इंटरेस्ट कैलकुलेटर – चक्रवृद्धि ब्याज की गणना करें',
  description:
    'Fincado कंपाउंड इंटरेस्ट कैलकुलेटर (Hindi): जानें कि चक्रवृद्धि ब्याज से आपका पैसा कैसे दोगुना या तिगुना हो सकता है। मासिक, तिमाही और वार्षिक गणना करें।',
  keywords: [
    'Compound Interest Calculator Hindi',
    'Chakravridhi Byaj Calculator',
    'Future Value Calculator Hindi',
    'Power of Compounding Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/compound-interest-calculator/',
    languages: {
      'en-IN': 'https://www.fincado.com/compound-interest-calculator/',
    },
  },
  openGraph: {
    title: 'कंपाउंड इंटरेस्ट कैलकुलेटर – पैसे से पैसा कमाएं',
    description:
      'मुफ्त टूल: जानें कि समय के साथ आपका छोटा निवेश कितना बड़ा बन सकता है।',
    url: 'https://www.fincado.com/hi/compound-interest-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiCompoundInterestPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    principal: 'मूलधन राशि (Principal ₹)',
    rate: 'ब्याज दर (% वार्षिक)',
    timePeriod: 'समय अवधि (वर्ष)',
    frequency: 'कंपाउंडिंग आवृत्ति',
    resetDefaults: 'रीसेट करें',
    totalAmount: 'परिपक्वता राशि (Maturity Amount)',
    interestEarned: 'कुल ब्याज',
    investedAmount: 'निवेश की गई राशि',
    yearly: 'वार्षिक (Yearly)',
    halfYearly: 'छमाही (Half-Yearly)',
    quarterly: 'तिमाही (Quarterly)',
    monthly: 'मासिक (Monthly)',
    breakdown: 'विकास विवरण',
  };

  return (
    <>
      <CalculatorSchema
        name="Compound Interest Calculator Hindi"
        description="Calculate compound interest maturity amount in Hindi."
        url="https://www.fincado.com/hi/compound-interest-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'कंपाउंड इंटरेस्ट कैलकुलेटर',
            url: 'https://www.fincado.com/hi/compound-interest-calculator/',
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
                name: 'साधारण ब्याज और चक्रवृद्धि ब्याज में क्या अंतर है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'साधारण ब्याज केवल मूलधन पर मिलता है। चक्रवृद्धि ब्याज (Compound Interest) में, ब्याज पर भी ब्याज मिलता है, जिससे आपका पैसा तेजी से बढ़ता है।',
                },
              },
              {
                '@type': 'Question',
                name: '72 का नियम (Rule of 72) क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'यह एक सूत्र है जो बताता है कि आपका पैसा कितने समय में दोगुना होगा। 72 को ब्याज दर से भाग दें। उदाहरण: 72 ÷ 12% = 6 साल।',
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
              href="/compound-interest-calculator/"
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
            कंपाउंड इंटरेस्ट कैलकुलेटर (चक्रवृद्धि ब्याज)
          </h1>
          <ShareTools title="कंपाउंड इंटरेस्ट कैलकुलेटर (Hindi)" />
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="hi-ci-top" type="leaderboard" />
          </div>

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            अल्बर्ट आइंस्टीन ने कंपाउंड इंटरेस्ट को &quot;दुनिया का आठवां
            अजूबा&quot; कहा था। देखें कि ब्याज पर ब्याज कमाने से आपकी छोटी बचत
            समय के साथ कितनी बड़ी बन सकती है।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <CompoundInterestClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-ci-mid" type="banner" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>कंपाउंड इंटरेस्ट क्या है?</h2>
              <p>
                कंपाउंड इंटरेस्ट (चक्रवृद्धि ब्याज) वह ब्याज है जो न केवल आपके
                मूलधन (Principal) पर मिलता है, बल्कि पिछले समय में अर्जित ब्याज
                पर भी मिलता है। सरल शब्दों में, यह{' '}
                <strong>&quot;ब्याज पर ब्याज&quot;</strong> है।
              </p>
              <p>
                यह लंबी अवधि में धन सृजन (Wealth Creation) का सबसे शक्तिशाली
                उपकरण है। जितना लंबा समय आप निवेशित रहेंगे, कंपाउंडिंग का प्रभाव
                उतना ही अधिक होगा।
              </p>

              <h3>गणना का सूत्र (Formula)</h3>
              <p>चक्रवृद्धि ब्याज की गणना इस सूत्र से की जाती है:</p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{nt}" />
              </div>

              <ul>
                <li>
                  <strong>P:</strong> मूलधन (शुरुआती निवेश)
                </li>
                <li>
                  <strong>r:</strong> वार्षिक ब्याज दर (दशमलव में, जैसे 10% =
                  0.10)
                </li>
                <li>
                  <strong>n:</strong> एक साल में कितनी बार ब्याज जुड़ता है
                  (Frequency)
                </li>
                <li>
                  <strong>t:</strong> समय (वर्षों में)
                </li>
              </ul>

              <h3>कंपाउंडिंग आवृत्ति का महत्व</h3>
              <p>
                ब्याज जितनी बार जुड़ेगा, रिटर्न उतना ही ज्यादा होगा। उदाहरण के
                लिए, <strong>मासिक कंपाउंडिंग</strong> (जैसे RD में) आपको{' '}
                <strong>वार्षिक कंपाउंडिंग</strong> (जैसे PPF में) से बेहतर
                रिटर्न देगी।
              </p>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>आवृत्ति</th>
                      <th>n का मान</th>
                      <th>उदाहरण</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>वार्षिक (Yearly)</td>
                      <td>1</td>
                      <td>PPF, EPF</td>
                    </tr>
                    <tr>
                      <td>तिमाही (Quarterly)</td>
                      <td>4</td>
                      <td>बैंक FD, पोस्ट ऑफिस स्कीम्स</td>
                    </tr>
                    <tr>
                      <td>मासिक (Monthly)</td>
                      <td>12</td>
                      <td>बचत खाता (Savings A/c)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/sip-calculator/">SIP कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/fd-calculator/">FD कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/simple-interest-calculator/">
                    साधारण ब्याज कैलकुलेटर
                  </Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>कंपाउंडिंग का सबसे ज्यादा फायदा कैसे उठाएं?</summary>
                <p>
                  1. <strong>जल्दी शुरू करें:</strong> समय कंपाउंडिंग का सबसे
                  बड़ा मित्र है।
                  <br />
                  2. <strong>धैर्य रखें:</strong> शुरुआती सालों में विकास धीमा
                  लगता है, लेकिन बाद के सालों में यह तेजी से बढ़ता है।
                </p>
              </details>
              <details>
                <summary>कौन से निवेश कंपाउंड इंटरेस्ट देते हैं?</summary>
                <p>
                  लगभग सभी विकास-उन्मुख निवेश जैसे म्यूचुअल फंड (Growth Plan),
                  फिक्स्ड डिपॉजिट (FD), PPF, और EPF कंपाउंडिंग के सिद्धांत पर
                  काम करते हैं।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar adId="hi-ci-sidebar" />
          </aside>
        </div>
      </main>
    </>
  );
}
