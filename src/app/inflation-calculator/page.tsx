import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InflationClient from './InflationClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Investment Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost

/* ================= SEO METADATA ================= */
export const metadata: Metadata = {
  title: 'Inflation Calculator India 2025 – Future Value of Money',
  description:
    'Calculate how inflation reduces your purchasing power. Check future cost of living, education, and medical expenses. Learn the Rule of 72.',
  keywords: [
    'Inflation Calculator India',
    'Purchasing Power Calculator',
    'Future Value of Money',
    'Cost of Living Calculator',
    'Real Rate of Return',
    'Rule of 72',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/inflation-calculator',
  },
  openGraph: {
    title: 'Inflation Calculator – Know the Real Value of Money',
    description:
      'Estimate how inflation reduces purchasing power and what your money will be worth in the future.',
    url: 'https://www.fincado.com/inflation-calculator',
    type: 'website',
  },
};

export default function InflationPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>Inflation</strong> is the silent killer of wealth. It is the rate at which the prices of goods 
      and services rise over time, effectively reducing the <strong>purchasing power</strong> of your money.
    </p>
    <p>
      For example, if inflation is 6%, a product that costs ₹100 today will cost ₹106 next year. 
      This means your savings must grow faster than inflation just to maintain their value.
    </p>
  `);

  const typesContent = autoLinkContent(`
    <ul>
      <li><strong>CPI Inflation:</strong> The general inflation rate (approx 6%) affecting daily items like food and fuel.</li>
      <li><strong>Lifestyle Inflation:</strong> The increase in spending as your income grows (upgrading cars, phones).</li>
      <li><strong>Sectoral Inflation:</strong> Education and Medical costs in India rise much faster (10%-12%) than general inflation.</li>
    </ul>
  `);

  const rule72Content = autoLinkContent(`
    <p>
      The <strong>Rule of 72</strong> is a quick mental shortcut to estimate how long it will take for prices 
      to double at a given inflation rate.
    </p>
    <p>
      <em>Formula: 72 / Inflation Rate = Years to Double.</em><br/>
      Example: At 6% inflation, prices will double in <strong>12 years</strong> (72 / 6).
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Inflation Calculator"
        description="Calculate how inflation erodes purchasing power and estimate the future cost of goods and services."
        url="https://www.fincado.com/inflation-calculator"
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
                name: 'What is a good inflation rate to assume in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For long-term financial planning in India, an average inflation rate of around 6% is commonly used. However, for education and medical goals, assume 10%.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Real Rate of Return?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It is the actual profit you make after adjusting for inflation. Formula: Real Return = ((1 + Nominal Rate) / (1 + Inflation Rate)) - 1.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does inflation affect savings?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If your savings account gives 3% interest and inflation is 6%, your "Real Return" is negative (-3%). Your money is actually losing value.',
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
              name: 'Inflation Calculator',
              url: 'https://www.fincado.com/inflation-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/inflation-calculator" />
          <h1>Inflation Calculator – Future Value of Money</h1>
          <ShareTools title="Inflation Calculator" />
          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="inflation-top" type="leaderboard" />
          </div>
          <WikiText
            content={`
              <p style="max-width: 720px; color: var(--color-text-muted);">
                Inflation silently reduces the value of your money every year.
                <strong> This calculator shows how much more you’ll need in the future to maintain the same lifestyle.</strong>
              </p>
            `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <InflationClient />
            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="inflation-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Where to invest to beat inflation) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Beat Inflation
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/sip-calculator"
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
                  📈 SIP Calculator
                </Link>
                <Link
                  href="/retirement-calculator"
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
                  👴 Retire Calc
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
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Protect your wealth
                </strong>
                <Link
                  href="/guides/gold-investment-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: Is Gold the best hedge against Inflation? →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="inflation-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What Is Inflation?</h2>
              <WikiText content={introContent} />

              <h3>Are You Beating Inflation? (Real Returns Table)</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Asset Class</th>
                      <th>Avg Return</th>
                      <th>Inflation (6%)</th>
                      <th>Real Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Savings A/C</strong>
                      </td>
                      <td>3.0%</td>
                      <td>-6.0%</td>
                      <td style={{ color: 'red' }}>
                        <strong>-3.0% (Loss)</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fixed Deposit</strong>
                      </td>
                      <td>7.0%</td>
                      <td>-6.0%</td>
                      <td style={{ color: 'green' }}>
                        <strong>+1.0%</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Equity Mutual Fund</strong>
                      </td>
                      <td>12.0%</td>
                      <td>-6.0%</td>
                      <td style={{ color: 'green' }}>
                        <strong>+6.0% (Wealth Creation)</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Gold</strong>
                      </td>
                      <td>8.0%</td>
                      <td>-6.0%</td>
                      <td style={{ color: 'green' }}>
                        <strong>+2.0%</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>The Rule of 72</h3>
              <WikiText content={rule72Content} />

              <h3>Types of Inflation in India</h3>
              <WikiText content={typesContent} />

              <h3>Inflation Calculation Formula</h3>
              <p>
                To calculate the future cost of an item based on inflation, we
                use the compound interest formula:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="FV = PV \times (1 + r)^n" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>FV</strong>: Future Value (Cost in future)</li>
                    <li><strong>PV</strong>: Present Value (Current Cost)</li>
                    <li><strong>r</strong>: Annual Inflation Rate</li>
                    <li><strong>n</strong>: Number of Years</li>
                  </ul>
                `}
              />

              <h3>How to Beat Inflation</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Invest in Equity:</strong> Stocks and Equity Mutual Funds are the only assets that consistently beat inflation by a wide margin.</li>
                    <li><strong>Step-Up SIP:</strong> Increase your investments every year as your income grows.</li>
                    <li><strong>Avoid Idle Cash:</strong> Keeping money in savings accounts guarantees a loss of value over time.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Why do prices increase every year?</summary>
                  <p>
                    Prices rise due to increased demand (Demand-Pull), higher
                    production costs (Cost-Push), or an increase in money supply
                    by central banks.
                  </p>
                </details>
                <details>
                  <summary>How much is medical inflation in India?</summary>
                  <p>
                    Medical inflation in India is significantly higher than
                    general inflation, often estimated between{' '}
                    <strong>10% to 14%</strong> annually. Always plan a separate
                    buffer for healthcare.
                  </p>
                </details>
                <details>
                  <summary>Does gold beat inflation?</summary>
                  <p>
                    Yes, historically gold has acted as a hedge against
                    inflation, maintaining its purchasing power over centuries.
                    However, it does not generate wealth as fast as businesses
                    (Stocks).
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="inflation-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
