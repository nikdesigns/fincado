// src/app/rd-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import RDClient from './RDClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'RD Calculator – Recurring Deposit Interest & Maturity Value',
  description:
    'Calculate the maturity amount of your Recurring Deposit (RD) with our accurate RD Calculator. Check interest rates, quarterly compounding, and plan your monthly savings goals.',
  keywords: [
    'RD Calculator',
    'Recurring Deposit Calculator',
    'RD Interest Rates',
    'Post Office RD Calculator',
    'Bank RD Rates',
    'Monthly Savings Calculator',
    'Compounding Interest Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/rd-calculator',
  },
  openGraph: {
    title: 'RD Calculator – Grow Your Monthly Savings',
    description:
      'Free tool to calculate RD maturity amount with quarterly compounding logic.',
    url: 'https://www.fincado.com/rd-calculator',
    type: 'website',
  },
};

export default function RDPage() {
  return (
    <>
      <CalculatorSchema
        name="Recurring Deposit (RD) Calculator"
        description="Calculate the maturity value of your Recurring Deposits with quarterly compounding interest."
        url="https://www.fincado.com/rd-calculator"
      />
      {/* 2. SCHEMA MARKUP FOR FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How is RD interest calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'RD interest is calculated using the compound interest formula on each monthly installment individually. Most banks in India compound interest quarterly.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is RD interest taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Interest earned on Recurring Deposits is fully taxable as per your income tax slab. TDS (10%) is deducted if interest income exceeds ₹40,000 in a financial year (₹50,000 for senior citizens).',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I miss an RD installment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If you miss an installment, banks typically charge a penalty (e.g., ₹1.50 per ₹100 per month). Continued default may lead to the closure of the RD account.',
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
              name: 'RD Calculator',
              url: 'https://www.fincado.com/rd-calculator',
            },
          ]}
        />
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Recurring Deposit (RD) Calculator</h1>
          <ShareTools title="Recurring Deposit (RD) Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Turn small monthly savings into a large corpus. Use our bank-grade
              calculator to check your maturity amount with accurate
              <strong>quarterly compounding</strong>.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <RDClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="rd-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is RD? */}
              <h2>What is a Recurring Deposit (RD)?</h2>
              <WikiText
                content={`
                  <p>
                    A <strong>Recurring Deposit (RD)</strong> is a special term
                    deposit offered by banks and <strong>Post Office</strong> schemes that allows you to
                    deposit a fixed amount every month for a pre-defined tenure.
                  </p>
                  <p>
                    Unlike a <strong>Fixed Deposit (FD)</strong> where you need a large lump sum
                    upfront, an RD allows salaried individuals to build a corpus
                    gradually. The interest rates are typically the same as FDs,
                    making it a safe and high-return option for disciplined savers.
                  </p>
                `}
              />

              {/* 2. Who is Eligible? */}
              <h3>Who is Eligible to Open an RD?</h3>
              <WikiText
                content={`
                  <p>
                    RDs are designed to be accessible to almost everyone. Common
                    eligibility criteria include:
                  </p>
                  <ul>
                    <li>
                      <strong>Resident Individuals:</strong> Any Indian resident can
                      open an RD in their own name.
                    </li>
                    <li>
                      <strong>Minors:</strong> Can open an account under the
                      guardianship of parents.
                    </li>
                    <li>
                      <strong>Senior Citizens:</strong> Eligible for higher interest
                      rates (usually 0.50% extra).
                    </li>
                    <li>
                      <strong>Organizations:</strong> HUFs, Clubs, Associations, and
                      Corporate entities can also open RDs.
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
              <h3>How This Calculator Helps with Goal Planning</h3>
              <WikiText
                content={`
                  <p>
                    Since RDs involve multiple cash flows (one deposit every month),
                    calculating the final maturity manually is difficult due to
                    <strong>Compounding</strong>. This calculator helps you:
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Plan Short-Term Goals</h4>
                  <p>
                    Calculate exactly how much to save monthly to buy a car or
                    fund a vacation in 2 years.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Verify Bank Quotes</h4>
                  <p>
                    Ensure your bank is calculating interest correctly using the
                    quarterly compounding formula.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Compare Returns</h4>
                  <p>
                    See the difference in earnings between a 5-year RD and a
                    3-year RD instantly.
                  </p>
                </div>
              </div>

              {/* 4. Formula */}
              <h3>RD Interest Calculation with Quarterly Compounding</h3>
              <p>
                The interest on RD is compounded quarterly in most banks. The
                formula calculates the compound interest on each monthly
                installment individually based on the number of quarters it
                stays with the bank.
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
                M = P × (1 + r/n)^(nt)
              </div>
              <WikiText
                content={`
                <p>
                  <em>
                    Where the formula is applied iteratively for every monthly
                    deposit.
                  </em>
                </p>
                <ul style="font-size: 14px;">
                  <li>
                    <strong>M</strong> = Maturity Value
                  </li>
                  <li>
                    <strong>P</strong> = Monthly Installment
                  </li>
                  <li>
                    <strong>n</strong> = Compounding Frequency (4 for Quarterly)
                  </li>
                  <li>
                    <strong>t</strong> = Time period remaining for that specific
                    installment
                  </li>
                </ul>
              `}
              />

              {/* 5. Key Advantages */}
              <h3>Key Advantages of a Recurring Deposit</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Disciplined Savings:</strong> The obligation to pay
                      monthly fosters a habit of saving.
                    </li>
                    <li>
                      <strong>Guaranteed Returns:</strong> Interest rates are locked
                      at the time of opening, protecting you from market volatility.
                    </li>
                    <li>
                      <strong>Liquid Options:</strong> While penalties apply, you
                      can close an RD prematurely in case of financial emergencies.
                    </li>
                    <li>
                      <strong>Loan Facility:</strong> You can avail a loan or
                      overdraft of up to 90% of your RD balance.
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
                  <summary>Is RD interest taxable?</summary>
                  <p>
                    Yes. Interest earned is added to your income and taxed at
                    your slab rate. TDS is deducted if interest exceeds
                    ₹40,000/year (₹50,000 for Seniors).
                  </p>
                </details>
                <details>
                  <summary>
                    Can I increase my monthly installment later?
                  </summary>
                  <p>
                    No. In a standard RD, the amount is fixed. However, some
                    banks offer &quot;iWish&quot; or &quot;Flexi RD&quot;
                    products where you can vary the deposit amount.
                  </p>
                </details>
                <details>
                  <summary>What is the minimum tenure for an RD?</summary>
                  <p>
                    The minimum tenure is usually <strong>6 months</strong> and
                    the maximum is <strong>10 years</strong>.
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
              <AdSlot id="rd-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
