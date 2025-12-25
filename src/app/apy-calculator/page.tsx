import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import APYClient from './APYClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'APY Calculator 2025 – Atal Pension Yojana Contribution Chart',
  description:
    'Calculate monthly contribution for Atal Pension Yojana (APY). Check guaranteed pension (₹1000-₹5000), return to nominee, and age-wise contribution chart.',
  keywords: [
    'APY Calculator',
    'Atal Pension Yojana Calculator',
    'APY Contribution Chart 2025',
    'Pension Scheme for Unorganized Sector',
    'APY vs NPS',
    'Government Pension Scheme',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/apy-calculator',
  },
  openGraph: {
    title: 'APY Calculator – Guaranteed Pension for Life',
    description:
      'Free tool to calculate APY contributions based on age and desired pension amount.',
    url: 'https://www.fincado.com/apy-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function APYPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>Atal Pension Yojana (APY)</strong> is a social security scheme launched by the 
      Government of India to provide a defined pension to workers in the unorganized sector.
    </p>
    <p>
      It offers a minimum <strong>guaranteed pension</strong> ranging from ₹1,000 to ₹5,000 per month 
      starting at age 60, depending on the subscriber's contribution amount and entry age.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul>
      <li><strong>Age:</strong> Must be between 18 and 40 years.</li>
      <li><strong>Citizenship:</strong> Must be an Indian citizen.</li>
      <li><strong>Bank Account:</strong> Must have a valid savings bank account.</li>
      <li><strong>Tax Status:</strong> Should NOT be an income tax payer (Effective from Oct 1, 2022).</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul>
      <li><strong>Guaranteed Pension:</strong> The government guarantees the pension amount. If actual returns are lower, the government bridges the gap.</li>
      <li><strong>Spouse Benefit:</strong> The same pension is paid to the spouse after the subscriber's death.</li>
      <li><strong>Corpus to Nominee:</strong> After the death of both subscriber and spouse, the accumulated corpus (up to ₹8.5 Lakhs) is returned to the nominee.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Atal Pension Yojana (APY) Calculator"
        description="Calculate the monthly contribution required to get a guaranteed pension of ₹1000 to ₹5000 under the APY scheme."
        url="https://www.fincado.com/apy-calculator"
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the age limit for APY?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Any Indian citizen between the age of 18 and 40 years can join the Atal Pension Yojana scheme.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can income tax payers join APY?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Effective from October 1, 2022, any citizen who is or has been an income tax payer is not eligible to join APY.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens to the corpus after death?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'After the death of the subscriber, the pension continues to the spouse. After the death of both, the accumulated corpus (up to ₹8.5 Lakhs) is returned to the nominee.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
            {
              name: 'APY Calculator',
              url: 'https://www.fincado.com/apy-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/apy-calculator" />
          <h1>Atal Pension Yojana (APY) Calculator</h1>
          <ShareTools title="Atal Pension Yojana (APY) Calculator" />
          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="apy-top" type="leaderboard" />
          </div>
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Secure your old age with a guaranteed government pension. Calculate
              your monthly contribution based on your age and desired pension amount.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <APYClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="apy-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Using FD/NPS context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Retirement Tools
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/calculators/nps-calculator"
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
                  🇮🇳 NPS Calculator
                </Link>
                <Link
                  href="/calculators/epf-calculator"
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
                  🏢 EPF Calculator
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div
              className="no-print"
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '16px',
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px' }}>👴</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Need Higher Pension?
                </strong>
                <Link
                  href="/guides/nps-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: Why NPS might be better than APY →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="apy-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is Atal Pension Yojana (APY)?</h2>
              <WikiText content={introContent} />

              <h3>Who Can Subscribe to APY?</h3>
              <WikiText content={eligibilityContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>APY vs NPS: Which is Better?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Atal Pension Yojana (APY)</th>
                      <th>National Pension System (NPS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Pension Amount</strong>
                      </td>
                      <td>Fixed (Max ₹5,000/month)</td>
                      <td>Market Linked (No Limit)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Eligibility</strong>
                      </td>
                      <td>Unorganized Sector (Non-Tax Payers)</td>
                      <td>Any Citizen (Including Tax Payers)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Returns</strong>
                      </td>
                      <td>Guaranteed (~8%)</td>
                      <td>Market Linked (9% - 12%)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Premature Exit</strong>
                      </td>
                      <td>Difficult (Only in special cases)</td>
                      <td>Partial Withdrawal Allowed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Pension Slab & Return to Nominee</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Monthly Pension</th>
                      <th>Corpus Returned to Nominee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>₹1,000</td>
                      <td>₹1.7 Lakh</td>
                    </tr>
                    <tr>
                      <td>₹2,000</td>
                      <td>₹3.4 Lakh</td>
                    </tr>
                    <tr>
                      <td>₹3,000</td>
                      <td>₹5.1 Lakh</td>
                    </tr>
                    <tr>
                      <td>₹4,000</td>
                      <td>₹6.8 Lakh</td>
                    </tr>
                    <tr>
                      <td>₹5,000</td>
                      <td>₹8.5 Lakh</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>How This Calculator Helps Your Planning</h3>
              <WikiText
                content={`
                  <p>
                    APY contributions depend heavily on your entry age. The earlier you join,
                    the lower your monthly outflow. For example, joining at 18 vs 30 significantly 
                    reduces your monthly burden.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Contribution Check</h4>
                  <p>
                    Find out exactly how much will be deducted from your bank
                    account monthly based on your entry age.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Total Investment</h4>
                  <p>
                    See the total amount you will invest over 20-40 years versus
                    the corpus returned to your nominee.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Pension Selection</h4>
                  <p>
                    Compare the cost difference between opting for a ₹2,000
                    pension vs a ₹5,000 pension.
                  </p>
                </div>
              </div>

              <h3>Key Benefits of APY</h3>
              <WikiText content={benefitsContent} />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>
                    What happens if I stop paying contributions?
                  </summary>
                  <p>
                    The account will eventually be closed, and the accumulated
                    corpus (contributions + interest) will be returned to you.
                    However, maintenance charges and penalties will be deducted.
                  </p>
                </details>
                <details>
                  <summary>Can I increase my pension amount later?</summary>
                  <p>
                    Yes, you can upgrade to a higher pension slab (e.g., from
                    ₹1,000 to ₹5,000) once in a financial year by paying the
                    differential contribution amount.
                  </p>
                </details>
                <details>
                  <summary>Is there a penalty for delayed payment?</summary>
                  <p>
                    Yes, banks charge a small penalty (₹1 per month for every
                    ₹100 contributed) for delayed contributions.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="apy-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
