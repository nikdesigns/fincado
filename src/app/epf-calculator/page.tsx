// src/app/epf-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import EPFClient from './EPFClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

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

export default function EPFPage() {
  return (
    <>
      <CalculatorSchema
        name="EPF Calculator"
        description="Calculate your Employee Provident Fund (EPF) corpus at retirement including employer contributions and interest."
        url="https://www.fincado.com/epf-calculator"
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
                name: 'How is EPF interest calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The EPF interest rate is notified by the government every year and is currently around 8%+, credited annually.',
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
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
            {
              name: 'EPF Calculator',
              url: 'https://www.fincado.com/epf-calculator',
            },
          ]}
        />
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Employees&apos; Provident Fund (EPF) Calculator</h1>
          <ShareTools title="Employees' Provident Fund (EPF) Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Your EPF is your biggest retirement asset. Calculate the exact
              breakdown of employee vs employer contributions and total interest
              earned over your career.
            </p>
          `}
          />
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

              <WikiText
                content={`
                  <p>
                    The <strong>Employees' Provident Fund (EPF)</strong> is a mandatory
                    retirement savings scheme managed by the <strong>EPFO</strong> for salaried
                    employees. It helps build a retirement corpus through regular
                    monthly contributions from both the employee and the employer.
                  </p>
                `}
              />

              {/* 2. Who Contributes? */}
              <h3>Understanding the Contribution Split</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Employee Share:</strong> 12% of (Basic Salary + DA).
                      Entire amount goes to EPF.
                    </li>
                    <li>
                      <strong>Employer Share:</strong> 12% of (Basic Salary + DA).
                      <br />- <strong>3.67%</strong> goes to EPF.
                      <br />- <strong>8.33%</strong> goes to <strong>EPS</strong> (Pension Scheme).
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
              <h3>How This Calculator Helps You</h3>
              <WikiText
                content={`
                  <p>
                    Managing long-term contributions is complex. This tool helps visualize
                    the compounding effect over 20-30 years.
                  </p>
                `}
              />

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
              <WikiText
                content={`
                <p style="font-size: 14px; color: #666;">
                  <em>
                    *Interest is accumulated monthly but credited to the account
                    only at the end of the financial year.
                  </em>
                </p>
              `}
              />

              {/* 5. Key Advantages */}
              <h3>Key Benefits of EPF</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Sovereign Guarantee:</strong> One of the safest debt
                      instruments in India.
                    </li>
                    <li>
                      <strong>Tax Benefits:</strong> Contributions qualify for
                      <strong>Section 80C</strong>. Interest and Maturity are tax-free (subject to
                      limits).
                    </li>
                    <li>
                      <strong>Insurance (EDLI):</strong> EPF members get free life
                      insurance cover up to ₹7 Lakhs.
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

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="epf-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
