// src/app/mutual-fund-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import MutualFundsClient from './MutualFundsClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'Mutual Fund Calculator – Portfolio Return & Asset Allocation',
  description:
    'Plan your mutual fund portfolio with our advanced calculator. Simulate returns for Equity, Debt, and Gold allocations. Check blended returns and inflation-adjusted value.',
  keywords: [
    'Mutual Fund Calculator',
    'Portfolio Return Calculator',
    'Asset Allocation Planner',
    'SIP Calculator',
    'Investment Planner India',
    'Inflation Adjusted Returns',
  ],
  openGraph: {
    title: 'Mutual Fund Calculator – Optimize Your Portfolio',
    description:
      'Free tool to simulate multi-asset portfolio growth with inflation adjustment.',
    url: 'https://www.fincado.com/mutual-fund-calculator',
    type: 'website',
  },
};

export default function MutualFundPage() {
  return (
    <>
      {/* 2. SCHEMA MARKUP */}
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
                name: 'What is a balanced portfolio?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A balanced portfolio typically has a mix of Equity (for growth) and Debt (for stability). A common rule is "100 minus Age" for Equity allocation.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Mutual Fund Portfolio Planner</h1>
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
            {/* CALCULATOR APP */}
            <MutualFundsClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="mf-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is Asset Allocation? */}
              <h2>Why Asset Allocation Matters?</h2>
              <WikiText
                content={`
                  <p>
                    Investing isn't just about picking the "best"
                    stock. It's about building a balanced portfolio.
                    <strong>Asset Allocation</strong> is the practice of spreading
                    your investments across different asset classes (<strong>Equity</strong>, <strong>Debt</strong>,
                    <strong>Gold</strong>) to minimize risk.
                  </p>
                `}
              />
              {/* 2. Strategy */}
              <h3>Strategies for Every Investor</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Aggressive (Growth):</strong> High Equity exposure
                      (>70%) for long-term goals (>10 years). Suitable for
                      young investors with high risk appetite.
                    </li>
                    <li>
                      <strong>Balanced (Moderate):</strong> A mix of Equity (50-60%)
                      and Debt (40-50%) to balance growth with stability.
                    </li>
                    <li>
                      <strong>Conservative (Safety):</strong> High Debt exposure
                      (>70%) to protect capital. Ideal for retirees or short-term
                      goals.
                    </li>
                  </ul>
                `}
              />
              {/* 3. Planning Help */}
              <h3>How This Calculator Helps You</h3>
              <WikiText
                content={`
                  <p>
                    Unlike basic <strong>SIP Calculators</strong>, this tool lets you model a
                    <strong>complete portfolio</strong>:
                  </p>
                `}
              />
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
              {/* 4. Formula */}
              <h3>Portfolio Return Calculation</h3>
              <p>
                The calculator computes the future value for each asset class
                separately and sums them up.
              </p>
              <div
                style={{
                  background: '#f1f5f9',
                  padding: '16px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  marginBottom: '20px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                Portfolio FV = Σ (FV of Asset Class_i)
              </div>
              <WikiText
                content={`
                <p>
                  Where FV is calculated using standard <strong>SIP</strong> (Annuity Due) and
                  <strong>Lumpsum</strong> (Compound Interest) formulas.
                </p>
              `}
              />
              {/* 5. Key Advantages */}
              <h3>Benefits of Mutual Funds</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Professional Management:</strong> Fund managers handle
                      the research and trading decisions.
                    </li>
                    <li>
                      <strong>Diversification:</strong> A single fund invests in
                      30-50 stocks, reducing company-specific risk.
                    </li>
                    <li>
                      <strong>Liquidity:</strong> Open-ended funds allow you to
                      withdraw money anytime (T+1 to T+3 days).
                    </li>
                  </ul>
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

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="mf-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
