import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import MutualFundsClient from './MutualFundsClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Comparison
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'Mutual Fund Calculator 2025 – Portfolio Returns & Asset Allocation',
  description:
    'Plan your mutual fund portfolio with our advanced calculator. Simulate Equity, Debt, and Gold returns. Check Direct vs Regular plan savings and 2025 tax rules.',
  keywords: [
    'Mutual Fund Calculator',
    'Portfolio Return Calculator',
    'Asset Allocation Planner',
    'Direct vs Regular Mutual Fund',
    'Mutual Fund Tax Calculator 2025',
    'Inflation Adjusted Returns',
  ],
  alternates: {
    canonical: 'https://fincado.com/mutual-funds/',
  },
  openGraph: {
    title: 'Mutual Fund Calculator – Optimize Your Portfolio',
    description:
      'Free tool to simulate multi-asset portfolio growth with inflation adjustment.',
    url: 'https://fincado.com/mutual-funds/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function MutualFundPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      Investing isn't just about picking the "best" stock. It's about building a balanced portfolio. 
      <strong>Asset Allocation</strong> is the practice of spreading your investments across different 
      asset classes like <strong>Equity</strong> (for growth), <strong>Debt</strong> (for stability), and 
      <strong>Gold</strong> (for hedging) to minimize risk.
    </p>
    <p>
      This calculator allows you to model a complete portfolio, unlike basic SIP calculators that 
      only look at one fund type.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      <strong>Equity Mutual Funds:</strong> Gains above ₹1.25 Lakh/year (held >1 year) are taxed at 
      <strong>12.5% (LTCG)</strong>. Short-term gains are taxed at 20%.
    </p>
    <p>
      <strong>Debt Mutual Funds:</strong> Profits are added to your income and taxed as per your slab rate 
      (for investments made after April 1, 2023).
    </p>
  `);

  const strategyContent = autoLinkContent(`
    <ul>
      <li><strong>Aggressive (Growth):</strong> High Equity exposure (>70%) for long-term goals (>10 years). Suitable for young investors.</li>
      <li><strong>Balanced (Moderate):</strong> A mix of Equity (50-60%) and Debt (40-50%) to balance growth with stability.</li>
      <li><strong>Conservative (Safety):</strong> High Debt exposure (>70%) to protect capital. Ideal for retirees.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Mutual Fund Portfolio Calculator"
        description="Simulate returns for a multi-asset portfolio including Equity, Debt, and Gold. Check inflation-adjusted corpus."
        url="https://fincado.com/mutual-funds/"
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
                name: 'What is Asset Allocation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Asset allocation is the strategy of dividing your investment portfolio across different asset classes like Equity, Debt, and Gold to balance risk and reward.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does inflation affect my returns?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Inflation reduces the purchasing power of money over time. This calculator shows the "Real Value" of your future corpus by adjusting for expected inflation.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 100 minus Age rule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It is a rule of thumb for asset allocation. Subtract your age from 100 to find the percentage of your portfolio that should be in Equity. For example, at age 30, you should have 70% in Equity.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Mutual Fund Calculator',
              url: 'https://fincado.com/mutual-funds/',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/mutual-funds" />
          <h1>Mutual Fund Portfolio Planner</h1>
          <ShareTools title="Mutual Fund Portfolio Planner" />
          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="mf-top" type="leaderboard" />
          </div>
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Design your perfect portfolio. Simulate returns across
              <strong>Equity</strong>, <strong>Debt</strong>, and <strong>Gold</strong>
              allocations and see the real value of your wealth after inflation.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <MutualFundsClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="mf-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (SIP/Lumpsum Context) */}
            <LiveRateTable type="personalLoan" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Related Calculators
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
                  href="/lumpsum-calculator"
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
                  💰 Lumpsum Calc
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
              <span style={{ fontSize: '24px' }}>📊</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Confused by Funds?
                </strong>
                <Link
                  href="/guides/mutual-fund-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: Direct vs Regular Plans Explained →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="mf-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>Why Asset Allocation Matters?</h2>
              <WikiText content={introContent} />

              <h3>Direct vs Regular Plans: Which is Better?</h3>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Direct Plan</th>
                      <th>Regular Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Expense Ratio</strong>
                      </td>
                      <td>Lower (~0.5% - 1%)</td>
                      <td>Higher (~1.5% - 2.5%)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Commission</strong>
                      </td>
                      <td>Zero Commission</td>
                      <td>Agent Commission Included</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Returns</strong>
                      </td>
                      <td>Higher (due to low fees)</td>
                      <td>Lower</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>How to Buy</strong>
                      </td>
                      <td>Directly from AMC/Apps</td>
                      <td>Via Distributor/Agent</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Strategies for Every Investor</h3>
              <WikiText content={strategyContent} />

              <h3>Taxation on Mutual Funds (2025 Rules)</h3>
              <WikiText content={taxContent} />

              <h3>How This Calculator Helps You</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Blended Returns</h4>
                  <p>
                    See the weighted average return of your portfolio (e.g., if
                    Equity gives 12% and Debt gives 7%, what is your net
                    return?).
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Inflation Reality</h4>
                  <p>
                    A ₹1 Crore corpus in 20 years might only be worth ₹30 Lakhs
                    in today&apos;s money. We show you the &quot;Real
                    Value&quot;.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Diversification Check</h4>
                  <p>
                    Visualize if you are over-exposed to risky assets or being
                    too conservative with your goals.
                  </p>
                </div>
              </div>

              <h3>Portfolio Return Calculation</h3>
              <p>
                The calculator computes the future value for each asset class
                separately (using Compound Interest logic) and sums them up.
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="FV_{portfolio} = \sum (FV_{asset})" />
              </div>

              <WikiText
                content={`
                  <p>
                    Where FV is calculated using standard SIP (Annuity Due) and Lumpsum formulas for each asset class.
                  </p>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>
                    What is a good return expectation for Equity?
                  </summary>
                  <p>
                    Historically, Indian equities (Nifty 50) have delivered
                    12-14% CAGR over long periods (10+ years). However,
                    short-term volatility is high.
                  </p>
                </details>
                <details>
                  <summary>Should I include Gold in my portfolio?</summary>
                  <p>
                    Gold acts as a hedge against inflation and market crashes. A
                    small allocation (5-10%) is often recommended for stability.
                  </p>
                </details>
                <details>
                  <summary>How often should I rebalance?</summary>
                  <p>
                    It is good practice to review and rebalance your portfolio
                    once a year to restore your original asset allocation
                    percentages.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="mf-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
