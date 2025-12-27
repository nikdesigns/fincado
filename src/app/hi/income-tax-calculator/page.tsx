import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
// Reuse the same updated client component
import IncomeTaxClient from '../../income-tax-calculator/IncomeTaxClient';
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
  title: 'इनकम टैक्स कैलकुलेटर 2025 - नई vs पुरानी व्यवस्था (Tax Calculator)',
  description:
    'इनकम टैक्स कैलकुलेटर AY 2025-26: अपनी आय पर टैक्स की गणना करें और जानें कि आपके लिए नई टैक्स व्यवस्था (New Regime) बेहतर है या पुरानी (Old Regime)।',
  keywords: [
    'इनकम टैक्स कैलकुलेटर',
    'टैक्स कैलकुलेटर 2025',
    'नई टैक्स व्यवस्था vs पुरानी',
    'इनकम टैक्स स्लैब 2025',
    'सैलरी टैक्स कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/income-tax-calculator',
  },
  openGraph: {
    title: 'इनकम टैक्स कैलकुलेटर - अपना टैक्स बचाएं',
    description:
      'जानें कि आप नई व्यवस्था और 80C कटौती के साथ कितना टैक्स बचा सकते हैं।',
    url: 'https://www.fincado.com/hi/income-tax-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

// ✅ Define labels OUTSIDE to prevent re-renders
const hindiLabels = {
  ayLabel: 'निर्धारण वर्ष (AY)',
  ageLabel: 'आयु वर्ग',
  incomeLabel: 'कुल वार्षिक आय (₹)',
  deductionsLabel: 'कुल कटौती (80C, 80D आदि)',
  deductionHint: '*कटौती केवल पुरानी व्यवस्था (Old Regime) के लिए लागू है।',
  recommendationLabel: 'हमारा सुझाव (Recommendation)',
  saveLabel: 'बचत:',
  oldRegimeLabel: 'पुरानी व्यवस्था टैक्स',
  newRegimeLabel: 'नई व्यवस्था टैक्स',
  netIncomeLabel: 'हाथ में आने वाली आय (Net Income)',
  ageOptions: {
    regular: '60 से कम (सामान्य)',
    senior: '60 - 80 (वरिष्ठ नागरिक)',
    superSenior: '80 से ऊपर (सुपर सीनियर)',
  },
};

/* ---------------- PAGE ---------------- */

export default function IncomeTaxHindiPage() {
  const introContent = autoLinkContent(`
    <p>
      यह <strong>इनकम टैक्स कैलकुलेटर</strong> आपको निर्धारण वर्ष (AY) 2025-26 और 2024-25 के लिए 
      आपके टैक्स की गणना करने में मदद करता है।
    </p>
    <p>
      यह स्वचालित रूप से <strong>पुरानी टैक्स व्यवस्था (Old Regime)</strong> और 
      <strong>नई टैक्स व्यवस्था (New Regime)</strong> की तुलना करता है और आपको बताता है कि 
      किसमें आपको कम टैक्स देना पड़ेगा।
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Income Tax Calculator Hindi"
        description="Calculate income tax liability in Hindi. Compare New vs Old Regime."
        url="https://www.fincado.com/hi/income-tax-calculator"
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
                name: 'AY 2025-26 के लिए स्टैंडर्ड डिडक्शन क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'नई टैक्स व्यवस्था (New Regime) के लिए, स्टैंडर्ड डिडक्शन को बढ़ाकर ₹75,000 कर दिया गया है। पुरानी व्यवस्था में यह अभी भी ₹50,000 है।',
                },
              },
              {
                '@type': 'Question',
                name: 'कौन सी टैक्स व्यवस्था बेहतर है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'यदि आपकी कुल कटौती (80C, होम लोन आदि) ₹3.75 लाख से कम है, तो आमतौर पर नई व्यवस्था बेहतर होती है। यदि कटौती इससे अधिक है, तो पुरानी व्यवस्था फायदेमंद हो सकती है।',
                },
              },
              {
                '@type': 'Question',
                name: 'क्या 7 लाख तक की आय टैक्स फ्री है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'हां, नई व्यवस्था के तहत धारा 87A की छूट के कारण ₹7 लाख तक की आय पर कोई टैक्स नहीं लगता है। पुरानी व्यवस्था में यह सीमा ₹5 लाख है।',
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
              url: 'https://www.fincado.com/hi/calculators',
            },
            {
              name: 'इनकम टैक्स कैलकुलेटर',
              url: 'https://www.fincado.com/hi/income-tax-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/income-tax-calculator" />
          <h1>इनकम टैक्स कैलकुलेटर (AY 2025-26)</h1>
          <ShareTools title="इनकम टैक्स कैलकुलेटर - अपना टैक्स बचाएं" />

          {/* 💰 AD 1 */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="hi-tax-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              अब टैक्स का अंदाजा लगाना छोड़ें। <strong>नई vs पुरानी व्यवस्था</strong> की तुरंत तुलना करें।
              बजट 2024 के नवीनतम स्लैब और ₹75,000 के स्टैंडर्ड डिडक्शन के साथ अपडेटेड।
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Using the component with static Hindi Labels */}
            <IncomeTaxClient labels={hindiLabels} />

            {/* 💰 AD 2 */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-tax-after-calc" type="banner" />
            </div>

            {/* Mobile Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                टैक्स बचत कैलकुलेटर
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/hi/elss-calculator"
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
                  📉 ELSS कैलकुलेटर
                </Link>
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
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print">
              <h2>नई vs पुरानी टैक्स व्यवस्था: कौन सी बेहतर है?</h2>
              <WikiText content={introContent} />

              {/* 💰 AD 3 */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>FY 2024-25 (New Regime) के लिए टैक्स स्लैब</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>आय सीमा (Income Range)</th>
                      <th>टैक्स दर</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>₹3,00,000 तक</td>
                      <td>
                        <strong>शून्य (Nil)</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>₹3 लाख से ₹7 लाख</td>
                      <td>5%</td>
                    </tr>
                    <tr>
                      <td>₹7 लाख से ₹10 लाख</td>
                      <td>10%</td>
                    </tr>
                    <tr>
                      <td>₹10 लाख से ₹12 लाख</td>
                      <td>15%</td>
                    </tr>
                    <tr>
                      <td>₹12 लाख से ₹15 लाख</td>
                      <td>20%</td>
                    </tr>
                    <tr>
                      <td>₹15 लाख से ऊपर</td>
                      <td>30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>2025 में टैक्स कैसे बचाएं?</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>स्टैंडर्ड डिडक्शन</h4>
                  <p>
                    नौकरीपेशा लोगों को नई व्यवस्था (New Regime) में बिना कोई बिल
                    जमा किए <strong>₹75,000</strong> (पहले ₹50k था) की सीधी छूट
                    मिलती है।
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>धारा 87A की छूट</h4>
                  <p>
                    यदि आपकी कर योग्य आय ₹7 लाख तक है (नई व्यवस्था), तो आपका
                    टैक्स <strong>शून्य</strong> होगा। पुरानी व्यवस्था में यह
                    सीमा ₹5 लाख है।
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>धारा 80C निवेश</h4>
                  <p>
                    <Link href="/hi/elss-calculator">ELSS कैलकुलेटर</Link> का
                    उपयोग करें और ₹1.5 लाख तक के निवेश की योजना बनाएं (केवल
                    पुरानी व्यवस्था के लिए)।
                  </p>
                </div>
              </div>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>क्या नई व्यवस्था में HRA छूट मिलती है?</summary>
                  <p>
                    नहीं। नई टैक्स व्यवस्था में HRA (मकान किराया भत्ता), LTA और
                    धारा 80C जैसी प्रमुख कटौती <strong>उपलब्ध नहीं</strong> हैं।
                  </p>
                </details>
                <details>
                  <summary>क्या मैं हर साल टैक्स रिजीम बदल सकता हूं?</summary>
                  <p>
                    वेतनभोगी व्यक्ति (Salaried) हर साल पुरानी और नई व्यवस्था के
                    बीच चयन कर सकते हैं। हालांकि, जिन लोगों की व्यावसायिक आय
                    (Business Income) है, वे जीवन में केवल एक बार ही स्विच कर
                    सकते हैं।
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hi-tax-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
