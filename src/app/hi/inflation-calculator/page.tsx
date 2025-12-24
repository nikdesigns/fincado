// src/app/hi/inflation-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InflationClient from '@/app/inflation-calculator/InflationClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'महंगाई कैलकुलेटर – पैसे का भविष्य का मूल्य जानें (Inflation Calculator)',
  description:
    'Fincado महंगाई कैलकुलेटर (Hindi): जानें कि महंगाई आपकी बचत को कैसे कम करती है। भविष्य में शिक्षा, शादी और रिटायरमेंट के खर्च का सही अनुमान लगाएं।',
  keywords: [
    'Inflation Calculator Hindi',
    'Future Value of Money Hindi',
    'Cost of Living Calculator Hindi',
    'Rule of 72 Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/inflation-calculator/',
    languages: {
      'en-IN': 'https://www.fincado.com/inflation-calculator/',
    },
  },
  openGraph: {
    title: 'महंगाई कैलकुलेटर – अपनी क्रय शक्ति (Purchasing Power) जानें',
    description:
      'जानें कि आज के ₹1 लाख का मूल्य 10 साल बाद क्या होगा। सटीक गणना करें।',
    url: 'https://www.fincado.com/hi/inflation-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiInflationPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    currentAmount: 'वर्तमान राशि (Current Amount)',
    inflationRate: 'महंगाई दर (Inflation Rate %)',
    timePeriod: 'समय अवधि (Years)',
    futureValueRequired: 'भविष्य में आवश्यक राशि',
    todaysValue: 'आज का मूल्य',
    inflationImpact: 'महंगाई का असर (Loss)',
    disclaimer:
      '*महंगाई दरें अनुमानित हैं। वास्तविक महंगाई समय और श्रेणी के अनुसार भिन्न हो सकती है।',
  };

  return (
    <>
      <CalculatorSchema
        name="Inflation Calculator Hindi"
        description="Calculate future value of money considering inflation in Hindi."
        url="https://www.fincado.com/hi/inflation-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'महंगाई कैलकुलेटर',
            url: 'https://www.fincado.com/hi/inflation-calculator/',
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
                name: 'भारत में औसत महंगाई दर क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'लंबी अवधि की योजना के लिए भारत में औसतन 6% से 7% महंगाई दर मानी जाती है। हालाँकि, शिक्षा और चिकित्सा (Medical) की महंगाई 10-12% तक हो सकती है।',
                },
              },
              {
                '@type': 'Question',
                name: '72 का नियम (Rule of 72) क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'यह यह जानने का एक आसान तरीका है कि आपका पैसा कितने समय में आधा हो जाएगा (महंगाई के कारण)। सूत्र: 72 ÷ महंगाई दर।',
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
              href="/inflation-calculator/"
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
            महंगाई कैलकुलेटर (Inflation Calculator)
          </h1>
          <ShareTools title="महंगाई कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            महंगाई हर साल आपके पैसे की कीमत कम करती है। यह कैलकुलेटर बताता है कि
            आज के खर्चे को पूरा करने के लिए आपको भविष्य में कितने पैसों की जरूरत
            होगी।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <InflationClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-inflation-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>महंगाई क्या है? (What Is Inflation?)</h2>
              <p>
                महंगाई वह दर है जिस पर समय के साथ वस्तुओं और सेवाओं की कीमतें
                बढ़ती हैं। इसका सीधा मतलब है कि आपके पैसे की{' '}
                <strong>क्रय शक्ति (Purchasing Power)</strong> कम हो रही है।
              </p>
              <p>
                उदाहरण के लिए, यदि महंगाई दर 6% है, तो जो सामान आज ₹100 का है,
                वह अगले साल ₹106 का होगा। इसका मतलब है कि आपकी बचत को कम से कम
                6% की दर से बढ़ना चाहिए ताकि उसका मूल्य समान रहे।
              </p>

              <h3>72 का नियम (The Rule of 72)</h3>
              <p>
                यह एक त्वरित शॉर्टकट है जिससे आप जान सकते हैं कि महंगाई आपके
                पैसे की कीमत को कितने समय में <strong>आधा</strong> कर देगी।
              </p>
              <p>
                <em>सूत्र: 72 ÷ महंगाई दर = वर्ष</em>
                <br />
                उदाहरण: यदि महंगाई 6% है, तो 12 वर्षों (72/6) में आपके पैसे का
                मूल्य आधा हो जाएगा।
              </p>

              <h3>महंगाई को कैसे मात दें? (How to Beat Inflation)</h3>
              <ul>
                <li>
                  <strong>इक्विटी (Equity) में निवेश करें:</strong> शेयर बाजार
                  और म्यूचुअल फंड ही एकमात्र ऐसी संपत्तियां हैं जो लंबी अवधि में
                  महंगाई को बड़े अंतर से मात दे सकती हैं।
                </li>
                <li>
                  <strong>सोना (Gold):</strong> सोना महंगाई के खिलाफ एक अच्छा
                  बचाव (Hedge) माना जाता है।
                </li>
                <li>
                  <strong>नकद रखने से बचें:</strong> बैंक बचत खाते में पैसा रखने
                  से उसका मूल्य समय के साथ कम होता जाएगा क्योंकि ब्याज दर (3-4%)
                  महंगाई (6-7%) से कम होती है।
                </li>
              </ul>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/sip-calculator/">SIP कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/fd-calculator/">FD कैलकुलेटर</Link>
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
                <summary>भारत में मेडिकल महंगाई कितनी है?</summary>
                <p>
                  भारत में मेडिकल महंगाई (Medical Inflation) सामान्य महंगाई से
                  काफी अधिक है, जो लगभग <strong>10% से 14%</strong> सालाना मानी
                  जाती है। इसलिए हेल्थ इंश्योरेंस बहुत जरूरी है।
                </p>
              </details>
              <details>
                <summary>
                  क्या फिक्स्ड डिपॉजिट (FD) महंगाई को मात दे सकता है?
                </summary>
                <p>
                  आमतौर पर नहीं। टैक्स कटने के बाद, FD का रिटर्न अक्सर महंगाई दर
                  के बराबर या उससे कम हो जाता है। इसे &apos;Real Rate of
                  Return&apos; कहा जाता है।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-inflation-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
