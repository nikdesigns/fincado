/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import React from 'react';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import InflationClient from './InflationClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css'; // Import CSS for math
import { BlockMath } from 'react-katex'; // Component for block formulas
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

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
  return (
    <>
      <CalculatorSchema
        name="Inflation Calculator"
        description="Calculate how inflation erodes purchasing power and estimate the future cost of goods and services."
        url="https://www.fincado.com/inflation-calculator"
      />
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
              {
                '@type': 'Question',
                name: 'How do you calculate inflation-adjusted value?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Inflation-adjusted value is calculated by dividing the future amount by (1 + inflation rate)^years to get its value in today’s terms.',
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
        {/* ================= HEADER ================= */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Inflation Calculator – Know the Future Value of Your Money</h1>
          <ShareTools title="Inflation Calculator – Know the Future Value of Your Money" />
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
              <p>To calculate the future cost of an item based on inflation:</p>

              <div style={{ padding: '20px 0', overflowX: 'auto' }}>
                <BlockMath math="FV = PV \times (1 + r)^n" />
              </div>

              <WikiText
                content={`
  <ul>
    <li><strong>FV</strong> = Future Value (Cost in future)</li>
    <li><strong>PV</strong> = Present Value (Current Cost)</li>
    <li><strong>r</strong> = Annual Inflation Rate</li>
    <li><strong>n</strong> = Number of Years</li>
  </ul>
`}
              />

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

            <AuthorBio />
          </div>

          {/* ================= SIDEBAR ================= */}
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
