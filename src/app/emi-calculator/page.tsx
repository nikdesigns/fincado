// src/app/emi-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import EMIClient from './EMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// 1. SEO METADATA (High-Volume Keywords)
export const metadata: Metadata = {
  title: 'EMI Calculator – Calculate Home, Car & Personal Loan EMI',
  description:
    'Use Fincado’s accurate EMI Calculator to check monthly installments, total interest, and amortization schedule. Compare rates and plan prepayments instantly.',
  keywords: [
    'EMI Calculator',
    'Loan EMI Calculator',
    'Home Loan Interest Calculator',
    'Personal Loan EMI',
    'Car Loan EMI',
    'Reduce Loan Interest',
    'Amortization Schedule',
    'Loan Prepayment Calculator',
  ],
  openGraph: {
    title: 'EMI Calculator – Plan Your Loan Repayment',
    description:
      'Free tool to calculate EMI, Interest, and Tenure for any loan.',
    url: 'https://www.fincado.com/emi-calculator',
    type: 'website',
  },
};

export default function EMIPage() {
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
                name: 'How is EMI calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'EMI is calculated using the formula EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure in months.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I reduce my loan EMI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can reduce your EMI by making a higher down payment, choosing a longer tenure, negotiating a lower interest rate, or opting for a loan balance transfer.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does tenure affect my total interest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. A longer tenure reduces your monthly EMI but significantly increases the total interest payout over the loan term.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>EMI Calculator – Plan Your Loan Smartly</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Instantly calculate your monthly EMI, visualize total interest
            costs, and download your repayment schedule.
            <strong> Accurate. Free. No Login Required.</strong>
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <EMIClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="emi-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT (Hidden in Print) --- */}
            <article className="article content-for-seo no-print">
              {/* SECTION 1: HOW IT HELPS */}
              <h2>How This EMI Calculator Helps You</h2>
              <p>
                Whether you are planning for a dream home, a new car, or a
                personal expense, knowing your EMI in advance is crucial. This
                tool helps you:
              </p>
              <ul>
                <li>
                  <strong>Budget Better:</strong> Know exactly how much needs to
                  be set aside from your monthly income.
                </li>
                <li>
                  <strong>Save on Interest:</strong> Experiment with different
                  tenures to find the "sweet spot" where EMI is affordable and
                  interest is low.
                </li>
                <li>
                  <strong>Compare Loans:</strong> Quickly switch interest rates
                  to compare offers from HDFC, SBI, ICICI, and other banks.
                </li>
              </ul>

              {/* SECTION 2: HOW TO USE */}
              <h3>How to Use Fincado's EMI Calculator?</h3>
              <p>
                Our tool is designed for speed and accuracy. Just follow these
                steps:
              </p>
              <ol>
                <li>
                  <strong>Enter Loan Amount:</strong> Input the principal amount
                  you wish to borrow.
                </li>
                <li>
                  <strong>Set Interest Rate:</strong> Enter the annual interest
                  rate offered by the lender.
                </li>
                <li>
                  <strong>Choose Tenure:</strong> Select the duration (years)
                  for repayment.
                </li>
              </ol>
              <p>
                The calculator will instantly show your{' '}
                <strong>Monthly EMI</strong>,{' '}
                <strong>Total Interest Payable</strong>, and the{' '}
                <strong>Total Payment</strong> amount.
              </p>

              {/* SECTION 3: ADVANTAGES */}
              <h3>Advantages of Using an Online Calculator</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>⚡ Instant & Accurate</h4>
                  <p>
                    Eliminate manual calculation errors. Get precise figures
                    down to the last rupee instantly.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>📊 Visual Breakdown</h4>
                  <p>
                    Our interactive charts show you exactly how much of your
                    money goes towards the Principal vs Interest.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>🛡️ Future Planning</h4>
                  <p>
                    Download the Amortization Schedule to plan your prepayments
                    and become debt-free faster.
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
              <h3>The EMI Calculation Formula</h3>
              <p>
                Whether it's a Home Loan, Car Loan, or Personal Loan, the math
                remains the same. Manual calculation is difficult because of the
                compounding interest factor.
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
                EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)
              </div>
              <ul style={{ fontSize: '14px' }}>
                <li>
                  <strong>P</strong> = Principal Loan Amount
                </li>
                <li>
                  <strong>r</strong> = Monthly Interest Rate (Annual Rate ÷ 12 ÷
                  100)
                </li>
                <li>
                  <strong>n</strong> = Loan Tenure in Months
                </li>
              </ul>

              <h3>Factors That Affect Your Loan EMI</h3>
              <p>
                <strong>Loan Amount:</strong> The higher the principal, the
                higher the EMI.
                <br />
                <strong>Interest Rate:</strong> A floating rate changes with
                market trends, while a fixed rate stays the same.
                <br />
                <strong>Loan Tenure:</strong> Longer tenure means lower EMI, but
                higher total interest cost.
              </p>
            </article>

            {/* Smart Planning Section */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Smart Savings"
                title="How to Save Interest on Loans?"
                stats={[
                  { value: '1 extra', label: 'EMI/year saves 3-4 years' },
                  { value: '5%', label: 'Annual hike clears loan fast' },
                  { value: 'Short', label: 'Tenure = Low Interest' },
                ]}
              />
            </div>

            {/* EXPANDED FAQ SECTION */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>How does a loan amortization schedule work?</summary>
                  <p>
                    An amortization schedule is a table giving the details of
                    the amount of principal and interest component for every
                    EMI. In the initial years, a large portion of your EMI goes
                    towards interest. As the loan matures, the principal
                    component increases.
                  </p>
                </details>
                <details>
                  <summary>
                    Floating vs. Fixed Interest Rate: Which is better?
                  </summary>
                  <p>
                    <strong>Floating Rate:</strong> Linked to the market (Repo
                    Rate). Generally cheaper but can fluctuate. Best for
                    long-term loans like Home Loans.
                    <br />
                    <br />
                    <strong>Fixed Rate:</strong> Constant EMI throughout the
                    tenure. Offers peace of mind but usually comes at a slightly
                    higher interest rate (1-2% higher).
                  </p>
                </details>
                <details>
                  <summary>
                    Does checking my EMI affect my credit score?
                  </summary>
                  <p>
                    No. Using an online EMI calculator is a "soft inquiry" or
                    just a tool usage. It does not impact your CIBIL or credit
                    score in any way.
                  </p>
                </details>
                <details>
                  <summary>Can I prepay my loan to reduce EMI?</summary>
                  <p>
                    Yes! Most banks allow part-prepayments. When you prepay, the
                    amount is deducted directly from your{' '}
                    <strong>Principal</strong>. You can then choose to either
                    reduce your EMI or reduce your Tenure (reducing tenure saves
                    more money).
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="emi-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
