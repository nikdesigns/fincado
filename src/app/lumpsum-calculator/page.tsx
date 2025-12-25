import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import LumpsumClient from './LumpsumClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Lumpsum Calculator 2025 – One-Time Investment Returns',
  description:
    'Calculate the future value of your one-time investment. Compare Lumpsum vs SIP returns, check STP strategies, and visualize compound interest growth.',
  keywords: [
    'Lumpsum Calculator',
    'Mutual Fund Lumpsum',
    'Investment Returns Calculator',
    'Compound Interest Calculator',
    'Lumpsum vs SIP',
    'STP Calculator',
    'One Time Investment Plan',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/lumpsum-calculator',
  },
  openGraph: {
    title: 'Lumpsum Calculator – Watch Your Wealth Grow',
    description:
      'Free tool to estimate returns on one-time investments with compounding benefits.',
    url: 'https://www.fincado.com/lumpsum-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function LumpsumPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Lumpsum Investment</strong> involves depositing a significant sum of money 
      in a single transaction rather than smaller recurring payments. This method is popular 
      for <strong>Mutual Funds</strong>, Fixed Deposits, and stocks.
    </p>
    <p>
      The primary advantage is that the entire capital starts earning returns from Day 1, 
      maximizing the power of <strong>Compounding</strong> over long durations. However, it carries 
      higher risk if invested during a market peak.
    </p>
  `);

  const stpContent = autoLinkContent(`
    <p>
      Smart investors often use a <strong>Systematic Transfer Plan (STP)</strong> instead of a direct lumpsum. 
      You park your money in a safe <strong>Liquid Fund</strong> and transfer a fixed amount monthly 
      into an Equity Fund. This protects you from market volatility while earning better returns than a savings account.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Lumpsum returns in mutual funds are taxed based on the holding period. 
      For Equity Funds held for more than 1 year, gains above ₹1.25 Lakh are taxed at 
      <strong>12.5% (LTCG)</strong>. Short-term gains (less than 1 year) are taxed at 20%.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Lumpsum Investment Calculator"
        description="Estimate the future value of your one-time mutual fund investment using compound interest."
        url="https://www.fincado.com/lumpsum-calculator"
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
                name: 'What is a Lumpsum investment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A Lumpsum investment is a one-time payment of a large amount into a financial instrument like a Mutual Fund or FD, allowing it to compound over a fixed tenure.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Lumpsum better than SIP?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Lumpsum works best when markets are low or correcting, as you buy units at a lower price. SIP is better for rupee cost averaging in volatile markets.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is STP (Systematic Transfer Plan)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'STP allows you to invest a lumpsum in a Debt fund and transfer a fixed amount to an Equity fund monthly. It combines the safety of debt with the growth of equity.',
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
              name: 'Lumpsum Calculator',
              url: 'https://www.fincado.com/lumpsum-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/lumpsum-calculator" />
          <h1>Lumpsum Calculator — One-Time Investment</h1>
          <ShareTools title="Lumpsum Calculator — One-Time Investment" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="lumpsum-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Invest once, grow forever. Calculate the future value of your lump
              sum investment and visualize the power of compounding.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <LumpsumClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="lumpsum-after-calc" type="banner" />
            </div>

            <LiveRateTable type="fixedDeposit" />

            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Compare Investments
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
                  📈 SIP Calculator
                </Link>
                <Link
                  href="/calculators/fd-calculator"
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
                  🏦 FD Returns
                </Link>
              </div>
            </div>

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
                  Is the market too high?
                </strong>
                <Link
                  href="/guides/sip-investment-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: Why STP is safer than Lumpsum →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is a Lumpsum Investment?</h2>
              <WikiText content={introContent} />

              <h3>Lumpsum vs SIP: Which is Better?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Lumpsum</th>
                      <th>SIP (Systematic Plan)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Best Time</strong>
                      </td>
                      <td>When market is low (Correction)</td>
                      <td>Any time (Auto-averaging)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Risk</strong>
                      </td>
                      <td>Higher (Timing risk)</td>
                      <td>Lower (Averages out volatility)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Capital</strong>
                      </td>
                      <td>Requires large upfront cash</td>
                      <td>Small monthly amounts (e.g. ₹500)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Growth</strong>
                      </td>
                      <td>Higher potential if timed right</td>
                      <td>Consistent long-term growth</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>The STP Strategy (Pro Tip)</h3>
              <WikiText content={stpContent} />

              <h3>How This Calculator Helps Your Planning</h3>
              <WikiText
                content={`
                  <p>
                    Seeing the end value of a large investment helps in decision
                    making. This tool assists you to visualize exponential growth.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Compare Tenures</h4>
                  <p>
                    See how extending your investment by just 5 years can double
                    your returns due to exponential growth.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Adjust Expectations</h4>
                  <p>
                    Visualize realistic outcomes by toggling between
                    conservative (8%) and aggressive (15%) return rates.
                  </p>
                </div>
              </div>

              <h3>Taxation on Returns (2025 Update)</h3>
              <WikiText content={taxContent} />

              <h3>Lumpsum Calculation Formula</h3>
              <p>
                This calculator uses the standard compound interest formula to
                estimate future value:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="FV = P (1 + r)^n" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>FV</strong>: Future Value</li>
                    <li><strong>P</strong>: Present Investment Amount</li>
                    <li><strong>r</strong>: Annual Rate of Return</li>
                    <li><strong>n</strong>: Time Period in Years</li>
                  </ul>
                `}
              />

              <h3>Key Advantages of Lumpsum</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Instant Exposure:</strong> Your entire capital starts growing from Day 1.</li>
                    <li><strong>Convenience:</strong> One-time transaction, no monthly tracking.</li>
                    <li><strong>Ideal for Debt:</strong> Works great for Debt Funds/FDs where volatility is low.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Is Lumpsum risky in Mutual Funds?</summary>
                  <p>
                    It carries higher risk than SIP if invested at a market
                    peak. However, over a 7-10 year horizon, volatility usually
                    smooths out.
                  </p>
                </details>
                <details>
                  <summary>What is the best time for Lumpsum?</summary>
                  <p>
                    Historically, investing when market valuations (P/E ratio)
                    are low has generated the best long-term returns.
                  </p>
                </details>
                <details>
                  <summary>Can I convert Lumpsum to SIP?</summary>
                  <p>
                    Yes, you can park a lumpsum in a Liquid Fund and use an STP
                    (Systematic Transfer Plan) to move money into Equity funds
                    monthly.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="lumpsum-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
