import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InvestingClient from './InvestingClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Investing Planner 2025 – SIP, Lumpsum & Asset Allocation',
  description:
    'Plan your investments with our advanced Investing Planner. Calculate future value, check Asset Allocation (Equity vs Debt), and estimate inflation-adjusted returns.',
  keywords: [
    'Investing Planner',
    'SIP Calculator India',
    'Asset Allocation Tool',
    'Portfolio Planner',
    'Lumpsum Calculator',
    'Financial Goal Planner',
    'Equity vs Debt',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/investing',
  },
  openGraph: {
    title: 'Investing Planner – Plan Your Financial Freedom',
    description:
      'Free tool to plan SIPs, lumpsum investments, and asset allocation strategies.',
    url: 'https://www.fincado.com/investing',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function InvestingPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Investment Planning</strong> is the process of matching your financial goals and objectives 
      with your financial resources. It is not just about buying stocks; it is about building a 
      diversified portfolio that balances <strong>Risk and Reward</strong>.
    </p>
    <p>
      A good plan helps you beat <strong>Inflation</strong> (the rising cost of living) and generate 
      wealth over the long term using the power of <strong>Compounding</strong>.
    </p>
  `);

  const allocationContent = autoLinkContent(`
    <ul>
      <li><strong>Equity (Stocks/Mutual Funds):</strong> High risk, high reward (12-15%). Best for long-term goals (>7 years).</li>
      <li><strong>Debt (FD/Bonds/PPF):</strong> Low risk, moderate reward (6-8%). Best for short-term goals and stability.</li>
      <li><strong>Gold:</strong> Acts as a hedge against inflation and market crashes. Experts recommend 5-10% allocation.</li>
    </ul>
  `);

  const compoundingContent = autoLinkContent(`
    <p>
      Albert Einstein called <strong>Compound Interest</strong> the "eighth wonder of the world." 
      It allows your money to earn interest on interest. The longer you stay invested, the faster 
      your money grows.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Investment Planner India"
        description="Plan SIPs, lumpsum investments, and asset allocation. Calculate CAGR and future portfolio value."
        url="https://www.fincado.com/investing"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the best asset allocation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The "100 minus Age" rule is a common starting point. Subtract your age from 100 to find the percentage of equity in your portfolio. For example, at age 30, keep 70% in Equity and 30% in Debt.',
                },
              },
              {
                '@type': 'Question',
                name: 'SIP or Lumpsum: Which is better?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SIP is better for volatile markets as it averages out the cost (Rupee Cost Averaging). Lumpsum is better when markets are low or correcting.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does inflation affect investments?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If your investment returns are 7% and inflation is 6%, your real return is only ~1%. You need high-growth assets like Equity to beat inflation significantly.',
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
              name: 'Investing Planner',
              url: 'https://www.fincado.com/investing',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Investing Planner — SIP, Lumpsum & Allocation</h1>
          <ShareTools title="Investing Planner" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="investing-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Plan your financial future. Simulate different allocation mixes
              (Equity / Debt / Gold), calculate future values, and get diversification guidance.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <InvestingClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="investing-after-calc" type="banner" />
            </div>

            <LiveRateTable type="fixedDeposit" />

            {/* Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Related Tools
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/calculators/sip-calculator"
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
                  📈 SIP Calc
                </Link>
                <Link
                  href="/calculators/mutual-funds"
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
                  📊 MF Portfolio
                </Link>
              </div>
            </div>

            {/* Promo Box */}
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
              <span style={{ fontSize: '24px' }}>💡</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  New to Investing?
                </strong>
                <Link
                  href="/guides/sip-investment-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: The Ultimate Beginner&apos;s Guide →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is Investment Planning?</h2>
              <WikiText content={introContent} />

              <h3>Asset Allocation Strategies</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Equity</th>
                      <th>Debt</th>
                      <th>Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Aggressive</strong>
                      </td>
                      <td>70% - 80%</td>
                      <td>20% - 30%</td>
                      <td>High</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Moderate</strong>
                      </td>
                      <td>50%</td>
                      <td>50%</td>
                      <td>Medium</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Conservative</strong>
                      </td>
                      <td>20% - 30%</td>
                      <td>70% - 80%</td>
                      <td>Low</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Understanding Asset Classes</h3>
              <WikiText content={allocationContent} />

              <h3>The Power of Compounding</h3>
              <WikiText content={compoundingContent} />

              <h3>Future Value Formula</h3>
              <p>
                The standard formula for Compound Interest used in planning:
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
                    <li><strong>FV</strong>: Future Value</li>
                    <li><strong>PV</strong>: Present Value (Investment)</li>
                    <li><strong>r</strong>: Annual Return Rate</li>
                    <li><strong>n</strong>: Time in Years</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>How much should I save monthly?</summary>
                  <p>
                    A general rule is the <strong>50-30-20 Rule</strong>: Spend
                    50% on needs, 30% on wants, and save at least{' '}
                    <strong>20%</strong> of your income for investments.
                  </p>
                </details>
                <details>
                  <summary>Are mutual funds safe?</summary>
                  <p>
                    Mutual funds are subject to market risks. However, over the
                    long term (10+ years), equity mutual funds have historically
                    outperformed inflation and other asset classes.
                  </p>
                </details>
                <details>
                  <summary>What is expense ratio?</summary>
                  <p>
                    It is the annual fee charged by mutual funds to manage your
                    money.
                    <strong>Direct Plans</strong> have lower expense ratios
                    compared to Regular Plans.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="investing-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
