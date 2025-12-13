// src/app/loans/home-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import HomeLoanClient from './HomeLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// 1. SEO METADATA (High-Volume Keywords)
export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator 2025 – Check Eligibility & Tax Benefits',
  description:
    'Calculate Home Loan EMI, Total Interest, and Tax Benefits under Section 24(b) and 80C. Check eligibility, PMAY subsidy, and amortization schedule instantly.',
  keywords: [
    'Home Loan EMI Calculator',
    'Housing Loan Calculator',
    'SBI Home Loan EMI',
    'HDFC Home Loan Interest',
    'Home Loan Tax Benefit',
    'PMAY Calculator',
    'Home Loan Prepayment',
    'Mortgage Calculator India',
    'Loan Eligibility',
  ],
  openGraph: {
    title: 'Home Loan EMI Calculator – Plan Your Dream Home',
    description:
      'Free tool to calculate Home Loan EMI, Interest, and Tax Benefits.',
    url: 'https://www.fincado.com/loans/home-loan',
    type: 'website',
  },
};

export default function HomeLoanPage() {
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
                name: 'How does the Home Loan Calculator help me?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It helps you estimate your monthly EMI, total interest cost, and tax benefits, allowing you to choose the right loan amount and tenure for your budget.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the tax benefits on a Home Loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can claim up to ₹1.5 Lakh under Section 80C (Principal) and up to ₹2 Lakh under Section 24(b) (Interest) per financial year.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is it better to choose a shorter tenure?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. A shorter tenure increases your monthly EMI but significantly reduces the total interest payout over the loan life.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Home Loan EMI Calculator</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Plan your dream home with our bank-grade accurate calculator. Check
            monthly installments, total interest cost, and tax savings
            instantly.
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <HomeLoanClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="home-loan-mid" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT (Hidden in Print) --- */}
            <article className="article content-for-seo no-print">
              {/* SECTION 1: HOW IT HELPS */}
              <h2>How This Calculator Helps You</h2>
              <p>
                Buying a home is a long-term financial commitment. A slight
                change in interest rates or tenure can cost you lakhs. This tool
                is designed to help you:
              </p>
              <ul>
                <li>
                  <strong>Budget Accurately:</strong> Know exactly how much you
                  need to pay every month so you don't overstretch your
                  finances.
                </li>
                <li>
                  <strong>Save Interest:</strong> Experiment with different
                  tenures to see how you can save 20-30% on total interest
                  payouts.
                </li>
                <li>
                  <strong>Check Affordability:</strong> Ensure your EMI does not
                  exceed 40-50% of your monthly take-home income.
                </li>
                <li>
                  <strong>Tax Planning:</strong> Estimate your deductions under
                  Section 80C and 24(b) to lower your tax liability.
                </li>
              </ul>

              {/* SECTION 2: HOW TO USE */}
              <h3>How to Use Fincado's Home Loan Calculator?</h3>
              <p>
                Using our tool is simple and instant. Just follow these three
                steps:
              </p>
              <ol>
                <li>
                  <strong>Enter Loan Amount:</strong> Input the total amount you
                  wish to borrow from the bank.
                </li>
                <li>
                  <strong>Set Interest Rate:</strong> Enter the current interest
                  rate offered by your bank (e.g., 8.5% for SBI/HDFC).
                </li>
                <li>
                  <strong>Choose Tenure:</strong> Select the number of years you
                  want to repay the loan.
                </li>
              </ol>
              <p>
                Once entered, the calculator immediately shows your{' '}
                <strong>Monthly EMI</strong>, <strong>Total Interest</strong>,
                and a year-wise <strong>Amortization Schedule</strong>.
              </p>

              {/* SECTION 3: ADVANTAGES */}
              <h3>Advantages of Using an Online Calculator</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>⚡ Instant Results</h4>
                  <p>
                    No manual calculations or complex formulas. Get 100%
                    accurate results in milliseconds.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>📊 Visual Breakdown</h4>
                  <p>
                    See exactly how much of your money goes to Principal vs
                    Interest with our interactive charts.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>🛡️ Comparisons</h4>
                  <p>
                    Compare different loan offers side-by-side to find the
                    cheapest option for your needs.
                  </p>
                </div>
              </div>

              <hr
                style={{
                  margin: '32px 0',
                  border: 'none',
                  borderTop: '1px solid #e2e8f0',
                }}
              />

              {/* SECTION 4: FORMULA & MATH */}
              <h3>Home Loan Formula</h3>
              <p>We use the standard formula used by all Indian banks:</p>
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
                EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
              </div>
              <ul>
                <li>
                  <strong>P</strong> = Loan Amount (Principal)
                </li>
                <li>
                  <strong>R</strong> = Monthly Interest Rate (Annual Rate / 12 /
                  100)
                </li>
                <li>
                  <strong>N</strong> = Loan Tenure in Months
                </li>
              </ul>

              {/* SECTION 5: TAX BENEFITS (High Ranking Keywords) */}
              <h3>Home Loan Tax Benefits (FY 2024-25)</h3>
              <p>
                Home owners can claim significant tax deductions to reduce their
                taxable income:
              </p>
              <div
                className="schedule-wrapper"
                style={{
                  maxHeight: 'none',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  marginBottom: '24px',
                }}
              >
                <table className="rate-table">
                  <thead>
                    <tr>
                      <th>Section</th>
                      <th>Component</th>
                      <th>Max Deduction (Self-Occupied)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Sec 80C</strong>
                      </td>
                      <td>Principal Repayment</td>
                      <td>₹1.5 Lakh</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Sec 24(b)</strong>
                      </td>
                      <td>Interest Payment</td>
                      <td>₹2.0 Lakh</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Sec 80EEA</strong>
                      </td>
                      <td>Additional Interest</td>
                      <td>₹1.5 Lakh (First-time buyers)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Factors Affecting Your Home Loan</h3>
              <p>
                <strong>LTV Ratio:</strong> Banks fund 75-90% of the property
                value. A higher down payment reduces your EMI.
                <br />
                <strong>Credit Score:</strong> A score of 750+ can reduce your
                interest rate by 0.5% - 1.0%.
                <br />
                <strong>Repo Rate:</strong> Most home loans are floating rate
                (RLLR). If the RBI Repo Rate goes up, your EMI increases.
              </p>
            </article>

            {/* Smart Planning Section */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Save Interest"
                title="Smart Home Loan Tips"
                stats={[
                  { value: '1 extra', label: 'EMI/year saves 3 years' },
                  { value: '5%', label: 'Annual hike clears loan fast' },
                  { value: 'Max', label: 'Avail Joint Loan Benefits' },
                ]}
              />
            </div>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Should I choose Fixed or Floating Rate?</summary>
                  <p>
                    Floating Rate is generally better for home loans. It is 1-2%
                    cheaper than fixed rates and has zero prepayment penalty.
                  </p>
                </details>
                <details>
                  <summary>Does prepayment reduce tenure or EMI?</summary>
                  <p>
                    Banks usually reduce the <strong>Tenure</strong> by default
                    when you prepay, which saves maximum interest. You can
                    request EMI reduction if needed.
                  </p>
                </details>
                <details>
                  <summary>What is the ideal tenure?</summary>
                  <p>
                    Try to keep it between 15-20 years. Increasing it to 30
                    years drastically increases the interest burden.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="home-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
