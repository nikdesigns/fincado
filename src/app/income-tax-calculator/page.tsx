import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import IncomeTaxClient from './IncomeTaxClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title:
    'Income Tax Calculator 2025 (AY 2025-26) – Compare New vs Old Regime Instantly',
  description:
    'Calculate your Income Tax for FY 2024-25 & FY 2025-26 with our free calculator. Compare New vs Old Regime tax liability, check tax slabs, and optimize deductions.',
  keywords: [
    'Income Tax Calculator',
    'Tax Calculator AY 2025-26',
    'New vs Old Tax Regime Calculator',
    'Income Tax Slabs 2025',
    'Salary Tax Calculator',
    '80C Tax Deduction',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/income-tax-calculator',
  },
  openGraph: {
    title: 'Income Tax Calculator 2025 – Compare New vs Old Regime',
    description:
      'Compare Old vs New Tax Regime and find the best option for your salary. Free online tax calculator for India.',
    url: 'https://www.fincado.com/income-tax-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function IncomeTaxPage() {
  const introContent = autoLinkContent(`
    <p>
      The <strong>Income Tax Calculator</strong> helps you estimate your tax liability for the 
      Assessment Year (AY) 2025-26 and 2024-25. It automatically compares the 
      <strong>Old Tax Regime</strong> (with deductions like 80C, HRA) and the 
      <strong>New Tax Regime</strong> (lower rates, fewer deductions) to recommend the best option for you.
    </p>
    <p>
      If you are planning tax-saving investments, explore our detailed guide on 
      <a href="/guides/best-tax-saving-options-80c"> Section 80C investments</a> 
      to understand where deductions actually make sense.
    </p>
  `);

  return (
    <>
      {/* ---------------- SCHEMA ---------------- */}
      <CalculatorSchema
        name="Income Tax Calculator India"
        description="Calculate income tax liability for AY 2025-26. Compare New vs Old Regime tax slabs."
        url="https://www.fincado.com/income-tax-calculator"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the standard deduction for AY 2025-26?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For the New Tax Regime, the standard deduction is ₹75,000 for FY 2024-25 (AY 2025-26). For the Old Regime, it remains ₹50,000.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which tax regime is better?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The New Regime is better if total deductions are below ₹3.75 lakhs. If you claim home loan interest, 80C, and 80D deductions, the Old Regime may save more tax.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is income up to ₹7 lakh tax-free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Under the New Tax Regime, income up to ₹7 lakh is effectively tax-free due to rebate under Section 87A.',
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
              name: 'Income Tax Calculator',
              url: 'https://www.fincado.com/income-tax-calculator',
            },
          ]}
        />

        {/* ---------------- HEADER ---------------- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/income-tax-calculator" />
          <h1>Income Tax Calculator (AY 2025-26)</h1>

          <p className="text-muted">
            Updated as per Budget 2024 • Valid for FY 2024-25 & AY 2025-26
          </p>

          <ShareTools title="Income Tax Calculator 2025" />

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="tax-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
              <p style="max-width: 700px; color: var(--color-text-muted);">
                Stop guessing your tax. Compare <strong>New vs Old Regime</strong> instantly using real slab logic.
                Ideal for salaried individuals, freelancers, and professionals in India.
              </p>
            `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* ---------------- CALCULATOR ---------------- */}
            <IncomeTaxClient />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="tax-after-calc" type="banner" />
            </div>

            {/* ---------------- SEO CONTENT ---------------- */}
            <article className="article content-for-seo no-print">
              <h2>How Income Tax Is Calculated (Step-by-Step Example)</h2>

              <p>Let’s understand tax calculation with a simple example:</p>

              <ul>
                <li>
                  <strong>Annual Salary:</strong> ₹12,00,000
                </li>
                <li>
                  <strong>Standard Deduction (New Regime):</strong> ₹75,000
                </li>
                <li>
                  <strong>Taxable Income:</strong> ₹11,25,000
                </li>
              </ul>

              <p>
                Tax is calculated slab-wise and then a{' '}
                <strong>4% Health & Education Cess</strong> is added. This is
                exactly what the calculator above does — accurately and
                instantly.
              </p>

              <h2>New vs Old Tax Regime: Which is Better?</h2>
              <WikiText content={introContent} />

              <h2>Which Tax Regime Is Better for You?</h2>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Your Situation</th>
                      <th>Recommended Regime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Deductions below ₹3.75 lakhs</td>
                      <td>
                        <strong>New Regime</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Home Loan + 80C + 80D deductions</td>
                      <td>
                        <strong>Old Regime</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Salary up to ₹7 lakhs</td>
                      <td>
                        <strong>New Regime (Zero Tax)</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Unsure or mixed income sources</td>
                      <td>
                        <strong>Use Calculator</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>How to Save Tax in 2025?</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Standard Deduction</h4>
                  <p>
                    Flat deduction of <strong>₹75,000</strong> under New Regime
                    without any proof.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Section 80C (Old Regime)</h4>
                  <p>
                    Investments like{' '}
                    <Link href="/guides/elss-funds-guide">
                      ELSS mutual funds
                    </Link>{' '}
                    allow tax deduction up to ₹1.5 lakhs.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Post-Tax Investing</h4>
                  <p>
                    Compare where to invest your surplus using our{' '}
                    <Link href="/guides/sip-vs-fd">SIP vs FD comparison</Link>.
                  </p>
                </div>
              </div>
            </article>

            {/* ---------------- FAQs ---------------- */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Does New Regime allow HRA exemption?</summary>
                  <p>
                    No. HRA, LTA, and most deductions are not allowed under the
                    New Tax Regime.
                  </p>
                </details>
                <details>
                  <summary>Can I change tax regime every year?</summary>
                  <p>
                    Salaried individuals can switch every year. Business income
                    taxpayers can switch only once.
                  </p>
                </details>
                <details>
                  <summary>What is Health & Education Cess?</summary>
                  <p>
                    An additional 4% tax applied on total income tax payable in
                    both regimes.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          {/* ---------------- SIDEBAR ---------------- */}
          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="tax-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
