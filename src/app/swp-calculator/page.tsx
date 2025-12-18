// src/app/swp-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import SWPClient from './SWPClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css'; // Import CSS for math
import { BlockMath } from 'react-katex'; // Component for block formulas
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'SWP Calculator – Systematic Withdrawal Plan for Monthly Income',
  description:
    'Calculate monthly income from your Mutual Fund investments with our SWP Calculator. Estimate capital appreciation, withdrawal tenure, and remaining corpus.',
  keywords: [
    'SWP Calculator',
    'Systematic Withdrawal Plan',
    'Monthly Income Plan',
    'Mutual Fund SWP',
    'Retirement Income Calculator',
    'SWP Return Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/swp-calculator',
  },
  openGraph: {
    title: 'SWP Calculator – Regular Income Generator',
    description:
      'Free tool to plan your monthly withdrawals from mutual fund investments.',
    url: 'https://www.fincado.com/swp-calculator',
    type: 'website',
  },
};

export default function SWPPage() {
  return (
    <>
      <CalculatorSchema
        name="SWP Calculator"
        description="Plan your systematic withdrawals from mutual funds. Calculate how long your corpus will last with monthly payouts."
        url="https://www.fincado.com/swp-calculator"
      />
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
                name: 'What is SWP in Mutual Funds?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount from your mutual fund investments at regular intervals (monthly/quarterly) while the remaining corpus continues to grow.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is SWP better than FD interest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SWP is generally more tax-efficient than FD interest, especially for those in higher tax brackets. In Debt Funds held >3 years, gains are taxed as LTCG with indexation benefits.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does SWP reduce my capital?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If your withdrawal rate is higher than the fund return rate, your capital will deplete. If the return rate is higher, your capital can grow even after withdrawals.',
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
              name: 'SWP Calculator',
              url: 'https://www.fincado.com/swp-calculator',
            },
          ]}
        />
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/swp-calculator" />
          <h1>SWP Calculator — Systematic Withdrawal Plan</h1>
          <ShareTools title="SWP Calculator — Systematic Withdrawal Plan" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Turn your investments into a steady monthly salary. Calculate
              accurate withdrawals and see how long your retirement corpus will
              last.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <SWPClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="swp-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is SWP? */}
              <h2>What is a Systematic Withdrawal Plan (SWP)?</h2>

              <WikiText
                content={`
                  <p>
                    A <strong>Systematic Withdrawal Plan (SWP)</strong> allows investors to
                    withdraw a specific sum of money from their <strong>Mutual Fund</strong>
                    investments at regular intervals (monthly, quarterly, or
                    annually).
                  </p>
                  <p>
                    It is essentially the reverse of an <strong>SIP</strong>. While SIP is for wealth
                    accumulation, SWP is for wealth distribution, making it ideal
                    for retirees looking for a regular pension-like income.
                  </p>
                `}
              />

              {/* 2. Who is Eligible? */}
              <h3>Who Should Opt for SWP?</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Retirees:</strong> To generate a steady monthly income
                      from their retirement corpus.
                    </li>
                    <li>
                      <strong>High Tax Bracket Investors:</strong> SWP from <strong>Debt
                      Funds</strong> is more tax-efficient than <strong>Fixed Deposit</strong> interest.
                    </li>
                    <li>
                      <strong>Goal Seekers:</strong> Those who need regular cash
                      flow for specific expenses (e.g., child's hostel fees).
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
              <h3>How This Calculator Helps Your Planning</h3>
              <WikiText
                content={`
                  <p>
                    Managing withdrawals is tricky. If you withdraw too much, you run out of money too soon.
                    This calculator helps you find the balance.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Corpus Longevity</h4>
                  <p>
                    Find out exactly how many years your money will last if you
                    withdraw ₹50,000/month.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Capital Protection</h4>
                  <p>
                    Check if your withdrawals are eating into your principal or
                    if your corpus is growing despite payouts.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Inflation Check</h4>
                  <p>
                    Understand that a fixed ₹20,000 withdrawal today will have
                    lower purchasing power 10 years from now.
                  </p>
                </div>
              </div>

              {/* 4. Formula */}
              <h3>SWP Calculation Logic</h3>
              <p>
                The remaining balance after withdrawals is calculated using the
                annuity withdrawal formula:
              </p>

              <div style={{ padding: '20px 0', overflowX: 'auto' }}>
                <BlockMath math="Bal = P(1+i)^n - W \times \frac{(1+i)^n - 1}{i}" />
              </div>

              <WikiText
                content={`
  <ul>
    <li><strong>Bal</strong> = Final Balance</li>
    <li><strong>P</strong> = Initial Lumpsum Investment</li>
    <li><strong>W</strong> = Monthly Withdrawal Amount</li>
    <li><strong>i</strong> = Monthly Interest Rate</li>
    <li><strong>n</strong> = Total Months</li>
  </ul>
`}
              />

              {/* 5. Key Advantages */}
              <h3>Key Advantages of SWP</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Tax Efficiency:</strong> Only the capital gains
                      portion of the withdrawal is taxed, not the principal.
                    </li>
                    <li>
                      <strong>Flexibility:</strong> You can change the withdrawal
                      amount, frequency, or stop it anytime.
                    </li>
                    <li>
                      <strong>Rupee Cost Averaging:</strong> When markets are high,
                      fewer units are sold to meet your cash needs. When low, more
                      units are sold.
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
                  <summary>Can my SWP corpus become zero?</summary>
                  <p>
                    Yes. If your monthly withdrawal rate is higher than the
                    returns generated by the fund, you will start eating into
                    your principal, eventually depleting it to zero.
                  </p>
                </details>
                <details>
                  <summary>Is SWP taxable?</summary>
                  <p>
                    Yes, but efficiently. Each withdrawal consists of principal
                    (not taxed) and capital gains (taxed). For Debt funds &gt;3
                    years, gains are taxed at 20% with indexation. For Equity
                    &gt;1 year, gains &gt;₹1L are taxed at 10%.
                  </p>
                </details>
                <details>
                  <summary>Can I stop my SWP anytime?</summary>
                  <p>
                    Yes, SWP is completely flexible. You can stop, pause, or
                    modify the amount anytime without any penalty from the
                    mutual fund house.
                  </p>
                </details>
              </div>
            </section>

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="swp-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
