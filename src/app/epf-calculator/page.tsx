import type { Metadata } from 'next';
import React from 'react';
import EPFClient from './EPFClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'EPF Calculator – Calculate Provident Fund Balance & Interest',
  description:
    'Check your EPF maturity amount online. Calculate employee & employer contribution, annual interest, and total retirement corpus with our EPF Calculator.',
  keywords: [
    'EPF Calculator',
    'PF Calculator',
    'Provident Fund Calculator',
    'EPF Interest Rate',
    'Employee Provident Fund',
    'Retirement Corpus Calculator',
    'UAN Member Portal',
  ],
  openGraph: {
    title: 'EPF Calculator – Track Your Retirement Savings',
    description:
      'Free tool to estimate your EPF balance at retirement with current interest rates.',
    url: 'https://www.fincado.com/epf-calculator',
    type: 'website',
  },
};

export default function EPFPage() {
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
                name: 'How is EPF interest calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'EPF interest is calculated monthly on the running balance but credited annually at the end of the financial year (March 31st). The current rate is 8.25% (FY 2023-24).',
                },
              },
              {
                '@type': 'Question',
                name: "What is the employer's contribution to EPF?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The employer contributes 12% of Basic + DA. However, only 3.67% goes to your EPF account. The remaining 8.33% goes towards the Employee Pension Scheme (EPS).',
                },
              },
              {
                '@type': 'Question',
                name: 'Is EPF withdrawal taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'EPF withdrawal is tax-free if you have completed 5 years of continuous service. If withdrawn before 5 years, it is taxable.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Employees&apos; Provident Fund (EPF) Calculator</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Your EPF is your biggest retirement asset. Calculate the exact
            breakdown of employee vs employer contributions and total interest
            earned over your career.
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <EPFClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="epf-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is EPF? */}
              <h2>What is the Employees&apos; Provident Fund (EPF)?</h2>
              <p>
                The **Employees&apos; Provident Fund (EPF)** is a mandatory
                retirement savings scheme managed by the EPFO for salaried
                employees. It helps build a retirement corpus through regular
                monthly contributions from both the employee and the employer.
              </p>
              [Image of EPF contribution split chart]
              {/* 2. Who Contributes? */}
              <h3>Understanding the Contribution Split</h3>
              <ul>
                <li>
                  <strong>Employee Share:</strong> 12% of (Basic Salary + DA).
                  Entire amount goes to EPF.
                </li>
                <li>
                  <strong>Employer Share:</strong> 12% of (Basic Salary + DA).
                  <br />- **3.67%** goes to EPF.
                  <br />- **8.33%** goes to EPS (Pension Scheme).
                </li>
              </ul>
              {/* 3. Planning Help */}
              <h3>How This Calculator Helps You</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Corpus Projection</h4>
                  <p>
                    Estimate the lump sum you will receive at retirement (Age
                    58/60).
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Interest Visualization</h4>
                  <p>
                    See how compounding turns small monthly deductions into a
                    massive interest component over 20-30 years.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>VPF Planning</h4>
                  <p>
                    Check how increasing your employee contribution (Voluntary
                    PF) boosts your final corpus.
                  </p>
                </div>
              </div>
              {/* 4. Formula */}
              <h3>EPF Interest Calculation Logic</h3>
              <p>Interest is calculated on the monthly running balance.</p>
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
                Monthly Interest = (Opening Bal + Contribution) × Rate% / 12
              </div>
              <p style={{ fontSize: '14px', color: '#666' }}>
                <em>
                  *Interest is accumulated monthly but credited to the account
                  only at the end of the financial year.
                </em>
              </p>
              {/* 5. Key Advantages */}
              <h3>Key Benefits of EPF</h3>
              <ul>
                <li>
                  <strong>Sovereign Guarantee:</strong> One of the safest debt
                  instruments in India.
                </li>
                <li>
                  <strong>Tax Benefits:</strong> Contributions qualify for
                  Section 80C. Interest and Maturity are tax-free (subject to
                  limits).
                </li>
                <li>
                  <strong>Insurance (EDLI):</strong> EPF members get free life
                  insurance cover up to ₹7 Lakhs.
                </li>
              </ul>
            </article>

            {/* Smart Planning Stats */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Retirement Security"
                title="EPF Highlights"
                stats={[
                  { value: '8.25%', label: 'Current Interest Rate' },
                  { value: 'EEE', label: 'Tax Status' },
                  { value: 'Age 58', label: 'Retirement Age' },
                ]}
              />
            </div>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can I withdraw my EPF anytime?</summary>
                  <p>
                    You can withdraw the full amount only at retirement (58
                    years) or if you remain unemployed for 2 months. Partial
                    withdrawals are allowed for marriage, education, or home
                    purchase.
                  </p>
                </details>
                <details>
                  <summary>Is interest on EPF taxable?</summary>
                  <p>
                    Interest is tax-free for employee contributions up to ₹2.5
                    Lakh per year. If you contribute more than ₹2.5 Lakh (via
                    VPF), the interest on the excess amount is taxable.
                  </p>
                </details>
                <details>
                  <summary>How to check my EPF balance?</summary>
                  <p>
                    You can check your balance via the EPFO Portal, UMANG App,
                    or by giving a missed call to 9966044425 from your
                    registered mobile number.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="epf-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
