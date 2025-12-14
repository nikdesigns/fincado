// src/app/lumpsum-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import LumpsumClient from './LumpsumClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'Lumpsum Calculator – Calculate One-Time Investment Returns',
  description:
    'Calculate the future value of your one-time investment with our Lumpsum Calculator. Compare returns, compounding frequency, and wealth growth over time.',
  keywords: [
    'Lumpsum Calculator',
    'Mutual Fund Lumpsum',
    'Investment Returns Calculator',
    'Compound Interest Calculator',
    'One Time Investment Plan',
    'Wealth Calculator',
  ],
  openGraph: {
    title: 'Lumpsum Calculator – Watch Your Wealth Grow',
    description:
      'Free tool to estimate returns on one-time investments with compounding benefits.',
    url: 'https://www.fincado.com/lumpsum-calculator',
    type: 'website',
  },
};

export default function LumpsumPage() {
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
                name: 'What is CAGR?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CAGR (Compounded Annual Growth Rate) represents the mean annual growth rate of an investment over a specified time period longer than one year.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Lumpsum Calculator — One-Time Investment</h1>
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
            {/* CALCULATOR APP */}
            <LumpsumClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="lumpsum-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is Lumpsum? */}
              <h2>What is a Lumpsum Investment?</h2>

              <WikiText
                content={`
                  <p>
                    A <strong>Lumpsum Investment</strong> involves depositing a
                    significant sum of money in a single transaction rather than
                    smaller recurring payments. This method is popular for <strong>Mutual
                    Funds</strong>, <strong>Fixed Deposits</strong>, and stocks.
                  </p>
                  <p>
                    The primary advantage is that the entire capital starts earning
                    returns from Day 1, maximizing the <strong>Compounding</strong> effect over long
                    durations.
                  </p>
                `}
              />

              {/* 2. Who is Eligible? */}
              <h3>Who Should Choose Lumpsum Investing?</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Windfall Gainers:</strong> Individuals who receive a
                      bonus, inheritance, or property sale proceeds.
                    </li>
                    <li>
                      <strong>Market Timers:</strong> Investors looking to enter
                      when the market has corrected significantly.
                    </li>
                    <li>
                      <strong>Retirees:</strong> Investing retirement corpus into
                      monthly income plans (SWP).
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
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
                <div className="advantage-card">
                  <h4>Frequency Impact</h4>
                  <p>
                    Check how different compounding frequencies (Annual vs
                    Monthly) affect your final maturity amount.
                  </p>
                </div>
              </div>

              {/* 4. Formula */}
              <h3>Lumpsum Calculation Formula</h3>
              <p>
                The future value is calculated using the standard Compound
                Interest formula:
              </p>
              <div
                style={{
                  background: 'transparent',
                  padding: '16px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  marginBottom: '20px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                FV = P × (1 + r/n) ^ (n × t)
              </div>
              <WikiText
                content={`
                <ul style="font-size: 14px;">
                  <li>
                    <strong>FV</strong> = Future Value
                  </li>
                  <li>
                    <strong>P</strong> = Principal Investment
                  </li>
                  <li>
                    <strong>r</strong> = Annual Interest Rate (decimal)
                  </li>
                  <li>
                    <strong>n</strong> = Compounding Frequency per year
                  </li>
                  <li>
                    <strong>t</strong> = Time in years
                  </li>
                </ul>
              `}
              />

              {/* 5. Key Advantages */}
              <h3>Key Advantages of Lumpsum Investment</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Instant Exposure:</strong> Your entire capital gets
                      exposure to asset growth immediately.
                    </li>
                    <li>
                      <strong>Convenience:</strong> A one-time transaction means no
                      need to track monthly debit dates.
                    </li>
                    <li>
                      <strong>Ideal for Debt:</strong> Lumpsum works exceptionally
                      well for Debt Funds and FDs where volatility is low.
                    </li>
                  </ul>
                `}
              />
            </article>

            {/* Smart Planning Stats */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Smart Investing"
                title="Lumpsum Success Tips"
                stats={[
                  { value: 'Buy Low', label: 'Invest during market dips' },
                  { value: 'Hold Long', label: 'Let compounding work' },
                  {
                    value: 'Diversify',
                    label: 'Split large sums across assets',
                  },
                ]}
              />
            </div>

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

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="lumpsum-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
