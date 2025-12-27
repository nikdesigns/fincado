import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import ELSSClient from '../../elss-calculator/ELSSClient'; // Reusing the same client component
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA (HINDI) ---------------- */
export const metadata: Metadata = {
  title: 'ELSS कैलकुलेटर 2025 - टैक्स बचाएं और वेल्थ बढ़ाएं (80C)',
  description:
    'ELSS म्यूचुअल फंड कैलकुलेटर: जानें कि ₹1.5 लाख तक निवेश करके आप कितना टैक्स बचा सकते हैं और 3 साल में कितना रिटर्न पा सकते हैं।',
  keywords: [
    'ELSS कैलकुलेटर',
    'टैक्स सेविंग म्यूचुअल फंड',
    'ELSS रिटर्न कैलकुलेटर',
    '80C टैक्स बचत',
    'SIP टैक्स कैलकुलेटर',
    'ELSS vs PPF हिंदी',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/elss-calculator',
  },
  openGraph: {
    title: 'ELSS कैलकुलेटर - टैक्स बचाएं और पैसा बढ़ाएं',
    description:
      'धारा 80C के तहत ₹46,800 तक टैक्स बचाएं। अपने ELSS निवेश के रिटर्न की गणना करें।',
    url: 'https://www.fincado.com/hi/elss-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function ELSSHindiPage() {
  // Hindi Labels for the Calculator Component
  const hindiLabels = {
    monthlyInv: 'मासिक निवेश (₹)',
    rate: 'अपेक्षित रिटर्न (% वार्षिक)',
    timePeriod: 'समय अवधि (वर्ष)',
    maturityValue: 'कुल मैच्योरिटी राशि',
    invested: 'कुल निवेश',
    returns: 'कुल लाभ (Returns)',
    taxSaved: 'टैक्स बचत (अधिकतम)',
  };

  const introContent = autoLinkContent(`
    <p>
      <strong>ELSS (इक्विटी लिंक्ड सेविंग्स स्कीम)</strong> एकमात्र ऐसा म्यूचुअल फंड है जो 
      आयकर अधिनियम की <strong>धारा 80C</strong> के तहत टैक्स छूट के लिए योग्य है।
    </p>
    <p>
      यह दोहरे लाभ देता है: <strong>टैक्स की बचत</strong> और <strong>पैसे की बढ़ोतरी (Wealth Creation)</strong>। 
      आप प्रति वर्ष ₹1.5 लाख तक के निवेश पर टैक्स छूट का दावा कर सकते हैं, जिससे आप ₹46,800 तक 
      (30% टैक्स स्लैब के लिए) टैक्स बचा सकते हैं।
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul>
      <li><strong>लॉक-इन अवधि:</strong> 3 साल (सभी 80C विकल्पों जैसे PPF या FD में सबसे कम)।</li>
      <li><strong>संभावित रिटर्न:</strong> 12% - 15% (ऐतिहासिक रूप से PPF/FD से बेहतर)।</li>
      <li><strong>निवेश का तरीका:</strong> SIP (सिस्टमैटिक इन्वेस्टमेंट प्लान) या एकमुश्त (Lump Sum)।</li>
      <li><strong>टैक्सेशन:</strong> ₹1.25 लाख से अधिक के लाभ (LTCG) पर 12.5% टैक्स लगता है।</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="ELSS Calculator Hindi"
        description="Calculate returns and tax savings for ELSS Mutual Funds in Hindi."
        url="https://www.fincado.com/hi/elss-calculator"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            inLanguage: 'hi',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'ELSS में लॉक-इन अवधि क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ELSS में निवेश की तारीख से 3 साल की अनिवार्य लॉक-इन अवधि होती है। यदि आप SIP करते हैं, तो प्रत्येक किस्त अलग-अलग 3 साल के लिए लॉक होती है।',
                },
              },
              {
                '@type': 'Question',
                name: 'मैं ELSS से कितना टैक्स बचा सकता हूं?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'आप धारा 80C के तहत ₹1.5 लाख तक निवेश कर सकते हैं। यदि आप 30% टैक्स ब्रैकेट में हैं, तो आप लगभग ₹46,800 (सेस सहित) टैक्स बचा सकते हैं।',
                },
              },
              {
                '@type': 'Question',
                name: 'क्या ELSS, PPF से बेहतर है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'वेल्थ क्रिएशन के लिए, ELSS आम तौर पर बेहतर है क्योंकि यह PPF (7.1%) की तुलना में इक्विटी-लिंक्ड रिटर्न (12-15%) देता है। ELSS का लॉक-इन भी कम है (3 साल बनाम 15 साल)। हालांकि, PPF जोखिम-मुक्त है, जबकि ELSS में बाजार जोखिम होता है।',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'होम', url: 'https://www.fincado.com/hi' },
            {
              name: 'कैलकुलेटर',
              url: 'https://www.fincado.com/hi/calculators', // Ensure this page exists or redirect
            },
            {
              name: 'ELSS कैलकुलेटर',
              url: 'https://www.fincado.com/hi/elss-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/elss-calculator" />
          <h1>ELSS कैलकुलेटर — टैक्स बचत + ग्रोथ</h1>
          <ShareTools title="ELSS कैलकुलेटर - टैक्स बचाएं" />

          {/* 💰 AD 1 */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="hi-elss-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              अपने टैक्स-सेविंग म्यूचुअल फंड निवेश की मैच्योरिटी वैल्यू की गणना करें।
              जानें कि धारा 80C के तहत टैक्स बचाते हुए आप कितनी संपत्ति बना सकते हैं।
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Reusing the English Component with Hindi Labels */}
            <ELSSClient labels={hindiLabels} />

            {/* 💰 AD 2 */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-elss-after-calc" type="banner" />
            </div>

            {/* Mobile Tools Grid */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                अन्य टैक्स सेविंग विकल्प
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/hi/ppf-calculator"
                  style={{
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#0f172a',
                    fontWeight: 500,
                    fontSize: '14px',
                    background: '#fff',
                  }}
                >
                  🔒 PPF कैलकुलेटर
                </Link>
                <Link
                  href="/hi/sip-calculator"
                  style={{
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#0f172a',
                    fontWeight: 500,
                    fontSize: '14px',
                    background: '#fff',
                  }}
                >
                  📈 SIP कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print">
              <h2>ELSS म्यूचुअल फंड क्या है?</h2>
              <WikiText content={introContent} />

              <h3>ELSS की मुख्य विशेषताएं</h3>
              <WikiText content={featuresContent} />

              {/* 💰 AD 3 */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>ELSS बनाम PPF: त्वरित तुलना</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>विशेषता</th>
                      <th>ELSS</th>
                      <th>PPF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>रिटर्न</strong>
                      </td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        12% - 15% (अपेक्षित)
                      </td>
                      <td>7.1% (निश्चित)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>लॉक-इन</strong>
                      </td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        3 साल
                      </td>
                      <td>15 साल</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>जोखिम</strong>
                      </td>
                      <td style={{ color: '#eab308' }}>मध्यम/उच्च</td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        शून्य जोखिम
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>टैक्स (लाभ पर)</strong>
                      </td>
                      <td>12.5% (यदि लाभ &gt; 1.25L)</td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        टैक्स फ्री
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>ELSS क्यों चुनें?</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>सबसे कम लॉक-इन</h4>
                  <p>
                    सिर्फ 3 साल के लॉक-इन के साथ, ELSS अन्य विकल्पों जैसे PPF
                    (15 साल) या FD (5 साल) की तुलना में सबसे अधिक लिक्विड है।
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>महंगाई को मात</h4>
                  <p>
                    इक्विटी ही एकमात्र एसेट क्लास है जो लंबी अवधि (5+ वर्ष) में
                    लगातार महंगाई (Inflation) को मात देती है।
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>SIP की सुविधा</h4>
                  <p>
                    आपको बड़ी एकमुश्त राशि की आवश्यकता नहीं है। SIP के जरिए
                    सिर्फ ₹500 प्रति माह से टैक्स बचाना शुरू करें।
                  </p>
                </div>
              </div>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>क्या मैं 3 साल बाद पैसा निकाल सकता हूं?</summary>
                  <p>
                    हां, 3 साल की लॉक-इन अवधि समाप्त होने के बाद, आप अपनी
                    यूनिट्स को रिडीम कर सकते हैं (बेच सकते हैं)। हालांकि, बेहतर
                    रिटर्न के लिए 5-7 साल तक निवेशित रहने की सलाह दी जाती है।
                  </p>
                </details>
                <details>
                  <summary>क्या ELSS में SIP की अनुमति है?</summary>
                  <p>
                    हां, ELSS में निवेश करने का सबसे अच्छा तरीका SIP है।
                    हालांकि, याद रखें कि <strong>प्रत्येक SIP किस्त</strong> का
                    अपना 3 साल का लॉक-इन पीरियड होता है।
                  </p>
                </details>
                <details>
                  <summary>ELSS पर टैक्स कैसे लगता है?</summary>
                  <p>
                    ELSS से होने वाले लाभ को लॉन्ग टर्म कैपिटल गेन्स (LTCG) माना
                    जाता है। एक वित्तीय वर्ष में ₹1.25 लाख तक का लाभ टैक्स-फ्री
                    है। इस सीमा से ऊपर के लाभ पर 12.5% टैक्स लगता है।
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hi-elss-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
