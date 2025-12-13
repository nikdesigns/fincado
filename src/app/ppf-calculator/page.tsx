import type { Metadata } from 'next';
import React from 'react';
import PPFClient from './PPFClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'PPF Calculator – Public Provident Fund Interest & Maturity',
  description:
    'Calculate PPF maturity amount, interest earned, and tax benefits with our accurate Public Provident Fund Calculator. Plan your 15-year tax-free savings goal.',
  keywords: [
    'PPF Calculator',
    'Public Provident Fund Calculator',
    'PPF Interest Rate',
    'Tax Saving Investment',
    '80C Deductions',
    'PPF Maturity Calculator',
    'Post Office PPF',
  ],
  openGraph: {
    title: 'PPF Calculator – Tax-Free Wealth Builder',
    description:
      'Free tool to calculate PPF returns with yearly compounding and tax-benefit analysis.',
    url: 'https://www.fincado.com/ppf-calculator',
    type: 'website',
  },
};

export default function PPFPage() {
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
                name: 'What is the current PPF interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The PPF interest rate is determined by the Central Government every quarter. Currently, it is around 7.1% per annum, compounded annually.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is PPF interest taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. PPF falls under the "EEE" (Exempt-Exempt-Exempt) category. The principal investment, the interest earned, and the maturity amount are all completely tax-free.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the lock-in period for PPF?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The mandatory lock-in period for a PPF account is 15 years. Partial withdrawals are allowed from the 7th year onwards under specific conditions.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>PPF Calculator — Public Provident Fund</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Build a tax-free retirement corpus. Calculate your PPF maturity
            value and see the power of compounding over 15 years.
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <PPFClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="ppf-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is PPF? */}
              <h2>What is the Public Provident Fund (PPF)?</h2>
              <p>
                The <strong>Public Provident Fund (PPF)</strong> is a long-term
                savings scheme backed by the Government of India. It was
                introduced to mobilize small savings and provide retirement
                security to self-employed individuals and workers in the
                unorganized sector.
              </p>

              {/* 2. Who is Eligible? */}
              <h3>Who Can Open a PPF Account?</h3>
              <ul>
                <li>
                  <strong>Resident Indians:</strong> Any individual can open a
                  PPF account in their own name.
                </li>
                <li>
                  <strong>Minors:</strong> Parents or guardians can open an
                  account on behalf of a minor child.
                </li>
                <li>
                  <strong>Not Allowed:</strong> NRIs (Non-Resident Indians) and
                  HUFs (Hindu Undivided Families) are not eligible to open new
                  PPF accounts.
                </li>
              </ul>

              {/* 3. Planning Help */}
              <h3>How This Calculator Helps Your Planning</h3>
              <p>
                PPF is a 15-year commitment. This calculator helps you visualize
                the long-term impact of your savings:
              </p>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Tax Planning</h4>
                  <p>
                    See exactly how much you need to invest (up to ₹1.5 Lakh) to
                    maximize your Section 80C tax deduction.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Wealth Projection</h4>
                  <p>
                    Visualize how a small ₹5,000/month contribution grows into a
                    significant tax-free corpus over 15+ years.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Extension Strategy</h4>
                  <p>
                    Plan beyond 15 years. See the compounding magic if you
                    extend your account for another 5-year block.
                  </p>
                </div>
              </div>

              {/* 4. Formula */}
              <h3>PPF Interest Calculation Formula</h3>
              <p>
                Interest on PPF is calculated on the lowest balance between the
                5th and the last day of every month. However, the interest is
                compounded annually and credited on March 31st.
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
                {/* Fixed the line below to render as plain text */}F = P × [((1
                + i)^n - 1) / i]
              </div>
              <ul style={{ fontSize: '14px' }}>
                <li>
                  <strong>F</strong> = Maturity Amount
                </li>
                <li>
                  <strong>P</strong> = Annual Installment
                </li>
                <li>
                  <strong>n</strong> = Tenure in Years
                </li>
                <li>
                  <strong>i</strong> = Interest Rate / 100
                </li>
              </ul>

              {/* 5. Key Advantages */}
              <h3>Key Advantages of PPF</h3>
              <ul>
                <li>
                  <strong>EEE Tax Status:</strong> Investment is tax-deductible,
                  interest is tax-free, and maturity amount is tax-free.
                </li>
                <li>
                  <strong>Sovereign Guarantee:</strong> Being government-backed,
                  your capital and returns are 100% safe.
                </li>
                <li>
                  <strong>Loan Facility:</strong> You can take a loan against
                  your PPF balance from the 3rd to the 6th financial year.
                </li>
                <li>
                  <strong>Protection from Attachment:</strong> A PPF account
                  cannot be attached by a court decree to pay off
                  debts/liabilities.
                </li>
              </ul>
            </article>

            {/* Smart Planning Stats */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Safe Investing"
                title="PPF Quick Facts"
                stats={[
                  { value: '15 Years', label: 'Lock-in Period' },
                  { value: '₹1.5 L', label: 'Max Annual Investment' },
                  { value: 'Tax Free', label: 'Interest & Maturity' },
                ]}
              />
            </div>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>
                    Can I withdraw money from PPF before 15 years?
                  </summary>
                  <p>
                    Partial withdrawals are allowed from the 7th financial year
                    onwards. You can withdraw up to 50% of the balance at the
                    end of the 4th preceding year or the immediate preceding
                    year, whichever is lower.
                  </p>
                </details>
                <details>
                  <summary>What happens if I miss a yearly deposit?</summary>
                  <p>
                    The account becomes "inactive". To reactivate it, you must
                    pay a penalty of ₹50 for each year of default along with the
                    minimum subscription of ₹500 per year.
                  </p>
                </details>
                <details>
                  <summary>Can I extend my PPF account after 15 years?</summary>
                  <p>
                    Yes. You can extend the account indefinitely in blocks of 5
                    years. You can choose to extend with or without making
                    further contributions.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="ppf-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
