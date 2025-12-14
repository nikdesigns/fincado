// src/app/fire-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import FIRECalculatorClient from './FIRECalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'FIRE Calculator – Financial Independence Retire Early Planning',
  description:
    'Calculate your FIRE Number with our advanced FIRE Calculator. Estimate target corpus based on SWR (Safe Withdrawal Rate), inflation, and lifestyle expenses.',
  keywords: [
    'FIRE Calculator',
    'Financial Independence Retire Early',
    'FIRE Number Calculator',
    'Early Retirement Calculator',
    'F.I.R.E Movement',
    'Retirement Corpus Calculator India',
  ],
  openGraph: {
    title: 'FIRE Calculator – Plan Your Early Retirement',
    description:
      'Free tool to calculate your financial freedom number and required monthly savings.',
    url: 'https://www.fincado.com/fire-calculator',
    type: 'website',
  },
};

export default function FIREPage() {
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
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>FIRE Calculator (Financial Independence, Retire Early)</h1>
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
            {/* CALCULATOR APP */}
            <FIRECalculatorClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="fire-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is FIRE? */}
              <h2>What is the FIRE Movement?</h2>

              <WikiText
                content={`
                  <p>
                    <strong>FIRE (Financial Independence, Retire Early)</strong> is a lifestyle
                    movement with the goal of gaining financial freedom at a young
                    age (often in the 30s or 40s) rather than the traditional
                    retirement age of 60.
                  </p>
                  <p>
                    The core principle is aggressive saving (50-70% of income) and
                    low-cost investing to build a <strong>Corpus</strong> that generates enough
                    passive income to cover living expenses forever.
                  </p>
                `}
              />

              {/* 2. Key Concepts */}
              <h3>Core Concepts of FIRE</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>FIRE Number:</strong> The target corpus amount.
                      Formula: <em>Annual Expenses × 25 (or 30)</em>.
                    </li>
                    <li>
                      <strong>Safe Withdrawal Rate (SWR):</strong> The percentage of
                      your corpus you can withdraw annually without running out of
                      money (typically 4%).
                    </li>
                    <li>
                      <strong>Rule of 25:</strong> Based on the 4% SWR, you need 25
                      times your annual expenses invested to retire.
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
              <h3>How This Calculator Helps You</h3>
              <WikiText
                content={`
                  <p>
                    Achieving FIRE requires math, not just intent. This tool bridges the gap
                    between your current savings and your freedom date.
                  </p>
                `}
              />

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

              {/* 4. Strategy */}
              <h3>Types of FIRE</h3>

              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Lean FIRE:</strong> Retiring on a very strict,
                      low-budget lifestyle (Corpus &lt; 20x expenses).
                    </li>
                    <li>
                      <strong>Fat FIRE:</strong> Retiring with a lavish lifestyle
                      and a large buffer (Corpus &gt; 30x expenses).
                    </li>
                    <li>
                      <strong>Barista FIRE:</strong> Retiring from the main
                      corporate job but working a low-stress part-time job for
                      benefits/income.
                    </li>
                  </ul>
                `}
              />

              {/* 5. Key Advantages */}
              <h3>Why Pursue FIRE?</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Freedom of Time:</strong> You gain complete control
                      over your schedule.
                    </li>
                    <li>
                      <strong>Reduced Stress:</strong> Financial security eliminates
                      anxiety about job loss or economic downturns.
                    </li>
                    <li>
                      <strong>Passion Projects:</strong> You can pursue work that is
                      meaningful to you, regardless of the pay.
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
                  <summary>Is the 4% rule valid for India?</summary>
                  <p>
                    India has higher inflation than the US. Many experts
                    recommend a more conservative withdrawal rate of{' '}
                    <strong>3% to 3.5%</strong> (approx 33x expenses) for Indian
                    retirees to ensure the corpus lasts.
                  </p>
                </details>
                <details>
                  <summary>Where should I invest for FIRE?</summary>
                  <p>
                    A diversified portfolio of Equity Mutual Funds (for growth)
                    and Debt instruments (for stability) is essential. Real
                    Estate (Rental Yield) and REITs can also provide passive
                    income.
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

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="fire-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
