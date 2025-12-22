import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FIRECalculatorClient from './FIRECalculatorClient';
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

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'FIRE Calculator 2025 – Financial Independence Retire Early',
  description:
    'Calculate your FIRE Number with our advanced FIRE Calculator. Estimate target corpus based on SWR (Safe Withdrawal Rate), inflation, and lifestyle expenses.',
  keywords: [
    'FIRE Calculator India',
    'Financial Independence Retire Early',
    'FIRE Number Formula',
    'Early Retirement Calculator',
    'Lean FIRE vs Fat FIRE',
    'Safe Withdrawal Rate India',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/fire-calculator',
  },
  openGraph: {
    title: 'FIRE Calculator – Plan Your Early Retirement',
    description:
      'Free tool to calculate your financial freedom number and required monthly savings.',
    url: 'https://www.fincado.com/fire-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function FIREPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>FIRE (Financial Independence, Retire Early)</strong> is a lifestyle movement with the goal 
      of gaining financial freedom at a young age (often in the 30s or 40s) rather than the traditional 
      retirement age of 60.
    </p>
    <p>
      The core principle is aggressive saving (50-70% of income) and low-cost investing to build a 
      <strong>Corpus</strong> that generates enough passive income to cover living expenses forever.
    </p>
  `);

  const coreConceptsContent = autoLinkContent(`
    <ul>
      <li><strong>FIRE Number:</strong> The target corpus amount. Formula: <em>Annual Expenses × 25 (or 30)</em>.</li>
      <li><strong>Safe Withdrawal Rate (SWR):</strong> The percentage of your corpus you can withdraw annually without running out of money (typically 4% globally, 3% in India).</li>
      <li><strong>Rule of 25:</strong> Based on the 4% SWR, you need 25 times your annual expenses invested to retire.</li>
    </ul>
  `);

  const swrContent = autoLinkContent(`
    <p>
      <strong>Is the 4% Rule Safe for India?</strong><br />
      The 4% rule was designed for the US market. India has higher inflation (6%-7%). 
      Therefore, many Indian financial planners recommend a more conservative withdrawal rate of 
      <strong>3% to 3.5%</strong>. This means you might need <strong>33x</strong> your annual expenses 
      instead of 25x.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="FIRE Calculator"
        description="Financial Independence, Retire Early (FIRE) calculator. Find out your 'Freedom Number' and when you can stop working."
        url="https://www.fincado.com/fire-calculator"
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
                name: 'What is the FIRE Number?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The FIRE Number is the total investment corpus required to sustain your lifestyle indefinitely without working. It is typically 25 to 30 times your annual expenses.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 25x Rule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The 25x Rule suggests that you need to save 25 times your annual expenses to retire comfortably, assuming a 4% annual withdrawal rate.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the 4% rule safe for India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Due to higher inflation in India, a withdrawal rate of 3% to 3.5% (approx 30x-33x expenses) is often considered safer than the standard 4% rule.',
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
              name: 'FIRE Calculator',
              url: 'https://www.fincado.com/fire-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/fire-calculator" />
          <h1>FIRE Calculator (Financial Independence, Retire Early)</h1>
          <ShareTools title="FIRE Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Stop working for money and let your money work for you. Calculate
              your <strong>Financial Freedom Number</strong> and the exact savings
              rate needed to retire early.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <FIRECalculatorClient />

            {/* ✅ Live Rates (Mutual Fund Context) */}
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
                  href="/calculators/retirement-calculator"
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
              <span style={{ fontSize: '24px' }}>🚀</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Start Early!
                </strong>
                <Link
                  href="/guides/sip-investment-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to build a 1 Cr Corpus with SIP →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="fire-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is the FIRE Movement?</h2>
              <WikiText content={introContent} />

              <h3>Types of FIRE: Which one are you?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Lifestyle</th>
                      <th>Corpus Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Lean FIRE</strong>
                      </td>
                      <td>Frugal / Minimalist</td>
                      <td>&lt; 25x Expenses</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Regular FIRE</strong>
                      </td>
                      <td>Standard / Current</td>
                      <td>25x - 30x Expenses</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fat FIRE</strong>
                      </td>
                      <td>Lavish / Luxury</td>
                      <td>&gt; 50x Expenses</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Barista FIRE</strong>
                      </td>
                      <td>Part-time work</td>
                      <td>~15x - 20x Expenses</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Core Concepts of FIRE</h3>
              <WikiText content={coreConceptsContent} />

              <h3>Safe Withdrawal Rate (SWR) in India</h3>
              <WikiText content={swrContent} />

              <h3>How This Calculator Helps You</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Reality Check</h4>
                  <p>
                    See if your current savings rate is enough to retire by 45,
                    or if you need to cut expenses.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Inflation Impact</h4>
                  <p>
                    Expenses double every 10-12 years due to inflation. This
                    tool adjusts your target corpus for future costs.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Gap Analysis</h4>
                  <p>
                    Find the exact monthly SIP required to bridge the gap
                    between your current savings and your FIRE goal.
                  </p>
                </div>
              </div>

              <h3>FIRE Calculation Formula</h3>
              <p>
                The core formula to determine your Financial Independence Number
                is:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="FIRE = \text{Annual Expenses} \times \frac{100}{SWR}" />
              </div>

              <WikiText
                content={`
                  <p>Where <strong>SWR</strong> is your Safe Withdrawal Rate (e.g., 4% or 3%).</p>
                `}
              />

              <h3>Why Pursue FIRE?</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Freedom of Time:</strong> Gain complete control over your schedule.</li>
                    <li><strong>Reduced Stress:</strong> Financial security eliminates anxiety about job loss.</li>
                    <li><strong>Passion Projects:</strong> Pursue meaningful work regardless of pay.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>How long does it take to achieve FIRE?</summary>
                  <p>
                    It depends on your savings rate. If you save 50% of your
                    income, it takes roughly 17 years. If you save 70%, it takes
                    about 9-10 years to reach financial independence.
                  </p>
                </details>
                <details>
                  <summary>Where should I invest for FIRE?</summary>
                  <p>
                    A diversified portfolio of Equity Mutual Funds (for growth)
                    and Debt instruments (for stability) is essential. Real
                    Estate (Rental Yield) can also provide passive income.
                  </p>
                </details>
                <details>
                  <summary>Does this include medical expenses?</summary>
                  <p>
                    Standard FIRE calculations cover living expenses. You should
                    maintain a separate, substantial Health Insurance cover and
                    an Emergency Fund for medical contingencies.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="fire-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
