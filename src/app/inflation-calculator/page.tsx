/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import React from 'react';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import InflationClient from './InflationClient';

/* ================= SEO METADATA ================= */
export const metadata: Metadata = {
  title: 'Inflation Calculator – Calculate Future Value of Money',
  description:
    'Use Fincado’s Inflation Calculator to see how inflation affects your money over time. Calculate future value, purchasing power loss and plan smarter investments.',
  keywords: [
    'Inflation Calculator',
    'Inflation Calculator India',
    'Purchasing Power Calculator',
    'Future Value of Money',
    'Inflation Impact Calculator',
    'Cost of Living Calculator',
    'Inflation Planning',
  ],
  openGraph: {
    title: 'Inflation Calculator – Know the Real Value of Money',
    description:
      'Estimate how inflation reduces purchasing power and what your money will be worth in the future.',
    url: 'https://www.fincado.com/inflation-calculator',
    type: 'website',
  },
};

export default function InflationPage() {
  return (
    <>
      {/* ================= SCHEMA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is inflation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Inflation is the rise in prices of goods and services over time, which reduces the purchasing power of money.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a good inflation rate to assume in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For long-term financial planning in India, an average inflation rate of around 6% is commonly used.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does inflation affect savings?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If your savings grow slower than inflation, your real purchasing power declines even though the balance increases.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* ================= HEADER ================= */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Inflation Calculator – Know the Future Value of Your Money</h1>
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
          {/* ================= MAIN ================= */}
          <div className="main-content">
            {/* CALCULATOR */}
            <InflationClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="inflation-mid-content" type="leaderboard" />
            </div>

            {/* ================= SEO CONTENT ================= */}
            <article className="article content-for-seo no-print">
              <h2>What Is an Inflation Calculator?</h2>
              <p>
                An <strong>Inflation Calculator</strong> helps you understand
                how inflation impacts the future value of money. It shows how
                much more money you will need in the future to buy the same
                goods and services you can afford today.
              </p>

              <h2>How Inflation Reduces Purchasing Power</h2>
              <p>
                As inflation increases, prices rise and each rupee buys less.
                This means your money loses value over time if it does not grow
                faster than inflation.
              </p>

              <h3>Inflation Formula</h3>
              <div
                style={{
                  background: '#f1f5f9',
                  padding: '16px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                Future Value = Present Value × (1 + Inflation Rate)
                <sup>Years</sup>
              </div>

              <h2>Why Inflation Matters in India</h2>
              <ul>
                <li>Average inflation in India ranges between 5%–7%</li>
                <li>Medical and education costs rise faster than inflation</li>
                <li>Fixed deposits often fail to beat inflation</li>
                <li>Ignoring inflation leads to under-saving</li>
              </ul>

              <h2>Inflation vs Fixed Deposits</h2>
              <table className="rate-table">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Returns</th>
                    <th>Real Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Savings Account</td>
                    <td>3%</td>
                    <td>Negative</td>
                  </tr>
                  <tr>
                    <td>Fixed Deposit</td>
                    <td>5–6%</td>
                    <td>Near Zero</td>
                  </tr>
                  <tr>
                    <td>Equity Mutual Funds</td>
                    <td>10–12%</td>
                    <td>Positive</td>
                  </tr>
                </tbody>
              </table>

              <h2>How to Beat Inflation</h2>
              <ul>
                <li>Invest in equity-oriented instruments</li>
                <li>Increase income over time</li>
                <li>Use SIPs for disciplined investing</li>
                <li>Review investments annually</li>
              </ul>

              <h2>Related Financial Calculators</h2>
              <ul>
                <li>
                  <a href="/emi-calculator">EMI Calculator</a>
                </li>
                <li>
                  <a href="/sip-calculator">SIP Calculator</a>
                </li>
                <li>
                  <a href="/fd-calculator">FD Calculator</a>
                </li>
                <li>
                  <a href="/retirement-calculator">Retirement Calculator</a>
                </li>
              </ul>
            </article>

            {/* STATS */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Inflation Insight"
                title="Why Beating Inflation Matters"
                stats={[
                  { value: '6%', label: 'Avg Inflation (India)' },
                  { value: '12 yrs', label: 'Money Value Halves' },
                  { value: 'Equity', label: 'Best Long-Term Hedge' },
                ]}
              />
            </div>

            <AuthorBio />
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="inflation-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
