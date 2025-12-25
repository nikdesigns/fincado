// src/app/hi/retirement-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RetirementCalculatorClient from '@/app/retirement-calculator/RetirementCalculatorClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'रिटायरमेंट कैलकुलेटर – पेंशन और कॉर्पस प्लानिंग (Retirement Calculator)',
  description:
    'Fincado रिटायरमेंट कैलकुलेटर (Hindi): जानें रिटायरमेंट के लिए आपको कितने पैसों (Corpus) की जरूरत होगी। महंगाई और SIP की सटीक गणना करें।',
  keywords: [
    'Retirement Calculator Hindi',
    'Pension Calculator Hindi',
    'Retirement Planning India Hindi',
    'Inflation Adjusted Retirement Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/retirement-calculator/',
    languages: {
      'en-IN': 'https://www.fincado.com/retirement-calculator/',
    },
  },
  openGraph: {
    title: 'रिटायरमेंट कैलकुलेटर – अपने बुढ़ापे को सुरक्षित करें',
    description:
      'जानें कि महंगाई को मात देने के लिए आपको आज कितनी बचत करनी चाहिए।',
    url: 'https://www.fincado.com/hi/retirement-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiRetirementPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    currentAge: 'वर्तमान आयु (Current Age)',
    retireAge: 'रिटायरमेंट आयु (Retire Age)',
    currentExpense: 'मासिक खर्च (Current Expense)',
    currentSavings: 'मौजूदा बचत (Current Savings)',
    advancedRates: 'उन्नत दरें (Inflation, Returns)',
    inflation: 'महंगाई दर (Inflation %)',
    preRetireReturn: 'निवेश रिटर्न (Retirement से पहले)',
    postRetireReturn: 'निवेश रिटर्न (Retirement के बाद)',
    resetDefaults: 'रीसेट करें',
    targetCorpus: 'लक्ष्य राशि (Target Corpus)',
    sipNeeded: 'जरूरी मासिक निवेश (SIP Needed)',
    perMonth: '/ महीना',
    expenseAtRetirement: 'रिटायरमेंट पर खर्च',
    currentSavingsFV: 'मौजूदा बचत का भविष्य मूल्य',
  };

  return (
    <>
      <CalculatorSchema
        name="Retirement Calculator Hindi"
        description="Calculate retirement corpus and monthly SIP in Hindi."
        url="https://www.fincado.com/hi/retirement-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'रिटायरमेंट कैलकुलेटर',
            url: 'https://www.fincado.com/hi/retirement-calculator/',
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
                name: 'रिटायरमेंट के लिए कितने पैसों की जरूरत होती है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'एक सामान्य नियम यह है कि रिटायरमेंट के समय आपके पास अपने वार्षिक खर्च का 20-25 गुना पैसा होना चाहिए। यह महंगाई और जीवनशैली पर निर्भर करता है।',
                },
              },
              {
                '@type': 'Question',
                name: '4% निकासी नियम (4% Withdrawal Rule) क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'यह नियम कहता है कि यदि आप अपने रिटायरमेंट फंड का 4% पहले साल निकालते हैं और फिर महंगाई के हिसाब से बढ़ाते हैं, तो आपका पैसा 30 साल तक चल सकता है।',
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
              href="/retirement-calculator/"
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
            रिटायरमेंट कैलकुलेटर (Retirement Calculator)
          </h1>
          <ShareTools title="रिटायरमेंट कैलकुलेटर (Hindi)" />

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="hi-retire-top" type="leaderboard" />
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
            जानें कि अपनी वर्तमान जीवनशैली को बनाए रखने के लिए आपको भविष्य में
            कितने पैसों की जरूरत होगी। <strong>महंगाई (Inflation)</strong> को
            ध्यान में रखकर सटीक गणना करें।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <RetirementCalculatorClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-retire-mid" type="banner" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>रिटायरमेंट प्लानिंग क्या है?</h2>
              <p>
                रिटायरमेंट प्लानिंग का मतलब है अपनी भविष्य की आय की जरूरतों का
                अनुमान लगाना और उन्हें पूरा करने के लिए आज ही बचत करना। यह केवल
                पैसे बचाने के बारे में नहीं है, बल्कि <strong>महंगाई</strong> को
                मात देने के लिए सही जगह निवेश करने के बारे में भी है।
              </p>

              <h3>पैसे कहाँ निवेश करें? (EPF vs NPS vs Mutual Funds)</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>सुविधा</th>
                      <th>EPF (PF)</th>
                      <th>NPS (Pension)</th>
                      <th>इक्विटी फंड्स</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>रिटर्न</strong>
                      </td>
                      <td>~8.15% (फिक्स्ड)</td>
                      <td>9% - 11%</td>
                      <td>12% - 15%</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>टैक्स लाभ</strong>
                      </td>
                      <td>80C (EEE)</td>
                      <td>80CCD (Extra 50k)</td>
                      <td>ELSS (80C)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>दो सबसे बड़े जोखिम</h3>
              <ul>
                <li>
                  <strong>महंगाई जोखिम (Inflation):</strong> यह &quot;मूक
                  हत्यारा&quot; है। आज का 1 लाख रुपये 20 साल बाद बहुत कम
                  खरीदेगा। आपके निवेश को महंगाई (भारत में लगभग 6%) से तेज बढ़ना
                  चाहिए।
                </li>
                <li>
                  <strong>लंबी उम्र का जोखिम:</strong> उम्मीद से ज्यादा जीने का
                  मतलब है कि आपकी बचत खत्म हो सकती है। चिकित्सा खर्च और लंबी आयु
                  के लिए अतिरिक्त बफर की जरूरत होती है।
                </li>
              </ul>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>4% निकासी नियम (4% Withdrawal Rule)</h3>
              <p>
                रिटायरमेंट खर्च के लिए एक लोकप्रिय नियम। यह कहता है कि यदि आप
                संतुलित पोर्टफोलियो (50% इक्विटी, 50% डेट) में निवेश करते हैं,
                तो आप पहले वर्ष में अपने कॉर्पस का <strong>4%</strong> सुरक्षित
                रूप से निकाल सकते हैं और उसके बाद महंगाई के लिए समायोजित कर सकते
                हैं।
              </p>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/sip-calculator/">SIP कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/ppf-calculator/">PPF कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/swp-calculator/">SWP (पेंशन) कैलकुलेटर</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>मुझे कब प्लानिंग शुरू करनी चाहिए?</summary>
                <p>
                  जैसे ही आप कमाना शुरू करें। जल्दी शुरू करने से आपको
                  &apos;कंपाउंडिंग&apos; (Compounding) का लाभ मिलता है। 25 साल
                  की उम्र में निवेश शुरू करने से आपका कॉर्पस 35 साल की उम्र में
                  शुरू करने वाले व्यक्ति से दोगुना हो सकता है।
                </p>
              </details>
              <details>
                <summary>महंगाई दर कितनी माननी चाहिए?</summary>
                <p>
                  भारत के लिए, 6% की दीर्घकालिक महंगाई दर एक मानक अनुमान है।
                  हालाँकि, चिकित्सा महंगाई अक्सर अधिक (8-10%) होती है, इसलिए
                  इसका अलग से हिसाब रखें।
                </p>
              </details>
              <details>
                <summary>क्या NPS अनिवार्य है?</summary>
                <p>
                  नहीं, लेकिन अतिरिक्त टैक्स लाभ (80CCD के तहत ₹50,000) और
                  इक्विटी में कम लागत वाले निवेश के लिए इसकी अत्यधिक सिफारिश की
                  जाती है।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar adId="hi-retire-sidebar" />
          </aside>
        </div>
      </main>
    </>
  );
}
