import type { Metadata } from 'next';
import React from 'react';
import RetirementCalculatorClient from './RetirementCalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'Retirement Calculator – Plan Your Retirement Corpus',
  description:
    'Calculate how much money you need to retire comfortably. Factor in inflation, current savings, and post-retirement expenses to find your target corpus.',
  keywords: [
    'Retirement Calculator',
    'Pension Calculator',
    'Retirement Corpus',
    'Inflation Adjusted Retirement',
    'Financial Freedom Calculator',
    'Retirement Planning India',
  ],
  openGraph: {
    title: 'Retirement Calculator – Secure Your Golden Years',
    description:
      'Free tool to estimate your retirement corpus and required monthly savings.',
    url: 'https://www.fincado.com/retirement-calculator',
    type: 'website',
  },
};

export default function RetirementPage() {
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
                name: 'How much money do I need for retirement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A common rule of thumb is to aim for a corpus that is 20-25 times your annual expenses at the time of retirement. However, this varies based on lifestyle and inflation.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 4% withdrawal rule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The 4% rule suggests you can withdraw 4% of your retirement portfolio in the first year, and adjust that amount for inflation annually, ensuring your money lasts for 30 years.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does inflation affect retirement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Inflation reduces your purchasing power. If your monthly expense is ₹50,000 today, you might need ₹1.5 Lakhs in 20 years to maintain the same lifestyle.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Retirement Corpus Calculator</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Find out exactly how much you need to save today to maintain your
            lifestyle tomorrow. Account for <strong>inflation</strong> and{' '}
            <strong>longevity</strong>.
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <RetirementCalculatorClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="retire-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is Retirement Planning? */}
              <h2>What is Retirement Planning?</h2>
              <p>
                **Retirement Planning** is the process of estimating your future
                income needs and setting aside enough capital today to meet
                those needs when you stop working.
              </p>

              <p>
                It is not just about saving; it&apos;s about investing wisely to
                beat inflation so that your corpus lasts as long as you do.
              </p>

              {/* 2. Key Challenges */}
              <h3>The Two Biggest Risks in Retirement</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Inflation Risk</h4>
                  <p>
                    The &quot;Silent Killer&quot;. ₹1 Lakh today will buy much
                    less 20 years from now. Your corpus must grow faster than
                    inflation.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Longevity Risk</h4>
                  <p>
                    Living longer than expected means you might outlive your
                    savings. You need a buffer for medical costs and an extended
                    lifespan.
                  </p>
                </div>
              </div>

              {/* 3. Planning Help */}
              <h3>How This Calculator Helps You</h3>
              <ul>
                <li>
                  <strong>Target Setting:</strong> It calculates the precise
                  &quot;Magic Number&quot; (Corpus) you need at age 60.
                </li>
                <li>
                  <strong>Shortfall Analysis:</strong> It compares your target
                  with your current savings to show the gap.
                </li>
                <li>
                  <strong>Action Plan:</strong> It tells you the monthly SIP
                  required starting TODAY to bridge that gap.
                </li>
              </ul>

              {/* 4. Strategy */}
              <h3>Recommended Asset Allocation by Age</h3>
              <ul>
                <li>
                  <strong>Young (20s-30s):</strong> High Equity (70-80%). Focus
                  on aggressive growth.
                </li>
                <li>
                  <strong>Mid-Career (40s):</strong> Balanced (50-60% Equity).
                  Start securing gains.
                </li>
                <li>
                  <strong>Near Retirement (50s):</strong> Conservative (30-40%
                  Equity). Focus on capital preservation.
                </li>
              </ul>
            </article>

            {/* Smart Planning Stats */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Financial Freedom"
                title="Retirement Rules"
                stats={[
                  { value: '30X', label: 'Corpus = 30x Annual Expense' },
                  { value: '4%', label: 'Safe Withdrawal Rate' },
                  { value: 'Early', label: 'Start ASAP for Compounding' },
                ]}
              />
            </div>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>
                    When should I start planning for retirement?
                  </summary>
                  <p>
                    Ideally, as soon as you start earning. Starting early allows
                    you to leverage the power of compounding. For example,
                    starting at 25 vs 35 can double your final corpus with the
                    same monthly investment.
                  </p>
                </details>
                <details>
                  <summary>Where should I invest for retirement?</summary>
                  <p>
                    A mix of EPF (Employee Provident Fund), PPF, NPS (National
                    Pension System), and Equity Mutual Funds is recommended for
                    a balanced Indian portfolio.
                  </p>
                </details>
                <details>
                  <summary>How much inflation should I assume?</summary>
                  <p>
                    For India, a long-term inflation rate of 6% is a standard
                    assumption. However, medical inflation is often higher
                    (8-10%), so account for that separately.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="retire-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
