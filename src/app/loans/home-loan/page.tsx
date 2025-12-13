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
              {/* 1. What is a Home Loan? (New Section) */}
              <h2>What is a Home Loan?</h2>
              <p>
                A Home Loan is a secured loan provided by financial institutions
                to help you purchase, construct, or renovate a residential
                property. The property itself acts as{' '}
                <strong>collateral</strong> for the loan.
              </p>
              <p>
                Because it is a high-value loan secured by real estate, it comes
                with long repayment tenures (up to 30 years) and relatively
                lower interest rates compared to personal or car loans.
              </p>

              {/* 2. Who is Eligible? (New Section) */}
              <h3>Who is Eligible?</h3>
              <p>
                Banks evaluate your repayment capacity and the legal status of
                the property. Common eligibility criteria include:
              </p>
              <ul>
                <li>
                  <strong>Applicant Type:</strong> Resident Indians and NRIs
                  (Non-Resident Indians).
                </li>
                <li>
                  <strong>Age:</strong> 21 to 70 years (loan must be closed by
                  retirement age).
                </li>
                <li>
                  <strong>Credit Score:</strong> A CIBIL score of{' '}
                  <strong>750+</strong> is crucial for getting the best ROI
                  (Rate of Interest).
                </li>
                <li>
                  <strong>Income Stability:</strong> At least 2 years of work
                  experience for salaried and 3 years of business continuity for
                  self-employed individuals.
                </li>
              </ul>

              {/* 3. Calculator Help */}
              <h3>How This Calculator Helps Your Planning</h3>
              <p>
                Buying a home is a long-term financial commitment. A slight
                change in interest rates or tenure can cost you lakhs. This tool
                is designed to help you:
              </p>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Budget Accurately</h4>
                  <p>
                    Know exactly how much you need to pay every month so you
                    don't overstretch your finances.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Save Interest</h4>
                  <p>
                    Experiment with different tenures to see how you can save
                    20-30% on total interest payouts.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Tax Planning</h4>
                  <p>
                    Estimate your deductions under Section 80C and 24(b) to
                    lower your tax liability significantly.
                  </p>
                </div>
              </div>

              {/* 4. Formula */}
              <h3>Home Loan Formula</h3>
              <p>
                We use the standard reducing balance formula used by all Indian
                banks:
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

              {/* 5. Key Advantages (New Section) */}
              <h3>Key Advantages of a Home Loan</h3>
              <ul>
                <li>
                  <strong>Tax Savings:</strong> The biggest advantage. You save
                  tax on both principal repayment (Sec 80C) and interest payment
                  (Sec 24).
                </li>
                <li>
                  <strong>Long Tenure:</strong> Repayment can be spread over
                  20-30 years, reducing the monthly burden.
                </li>
                <li>
                  <strong>Capital Appreciation:</strong> While you pay interest,
                  the value of your property typically appreciates over time.
                </li>
                <li>
                  <strong>Balance Transfer:</strong> If interest rates drop, you
                  can transfer your loan to another bank for a lower rate.
                </li>
              </ul>

              {/* 6. Tax Benefits Table */}
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
                <details>
                  <summary>Can I get a loan for land purchase?</summary>
                  <p>
                    Yes, "Plot Loans" are available for buying residential land,
                    but tax benefits are only applicable if you construct a
                    house on it within 3 years.
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
