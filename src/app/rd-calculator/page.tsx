import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RDClient from './RDClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'RD Calculator 2025 – Recurring Deposit Maturity & Interest',
  description:
    'Calculate RD maturity amount with quarterly compounding. Compare RD interest rates of SBI, HDFC, Post Office. Check TDS rules and RD vs SIP returns.',
  keywords: [
    'RD Calculator',
    'Recurring Deposit Calculator',
    'RD Interest Rates 2025',
    'Post Office RD Calculator',
    'RD vs SIP',
    'Recurring Deposit Tax',
    'Monthly Savings Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/rd-calculator',
  },
  openGraph: {
    title: 'RD Calculator – Grow Your Monthly Savings',
    description:
      'Free tool to calculate RD maturity amount with accurate quarterly compounding logic.',
    url: 'https://www.fincado.com/rd-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function RDPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Recurring Deposit (RD)</strong> is a term deposit offered by banks and <strong>Post Offices</strong> 
      that allows individuals to deposit a fixed amount every month for a pre-defined tenure. 
      It is ideal for salaried people who want to save a portion of their income regularly.
    </p>
    <p>
      Unlike a <strong>Fixed Deposit (FD)</strong> where a lump sum is required, RD brings the 
      discipline of regular savings with interest rates similar to FDs.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Interest earned on Recurring Deposits is <strong>fully taxable</strong>. It is added to your annual income 
      and taxed according to your slab.
    </p>
    <ul>
      <li><strong>TDS:</strong> Banks deduct 10% TDS if interest exceeds ₹40,000/year (₹50,000 for Seniors).</li>
      <li><strong>Form 15G/15H:</strong> You can submit these forms to avoid TDS if your total income is below the taxable limit.</li>
    </ul>
  `);

  const comparisonContent = autoLinkContent(`
    <p>
      Investors often confuse <strong>RD vs SIP</strong>. While RD offers guaranteed returns (6.5%–7.5%), 
      <strong>SIPs in Mutual Funds</strong> offer market-linked returns (12%–15%) but come with higher risk. 
      RD is safer, but SIP beats inflation better in the long run.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Recurring Deposit (RD) Calculator"
        description="Calculate the maturity value of your Recurring Deposits with quarterly compounding interest."
        url="https://www.fincado.com/rd-calculator"
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

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/rd-calculator" />
          <h1>Recurring Deposit (RD) Calculator</h1>
          <ShareTools title="Recurring Deposit (RD) Calculator" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="rd-top" type="leaderboard" />
          </div>

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
            <RDClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="rd-after-calc" type="banner" />
            </div>

            <LiveRateTable type="fixedDeposit" />

            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Compare Savings
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/sip-calculator"
                  style={{
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#0f172a',
                    fontWeight: 500,
                    fontSize: '14px',
                    background: '#fff',
                  }}
                >
                  📈 SIP Calculator
                </Link>
                <Link
                  href="/fd-calculator"
                  style={{
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#0f172a',
                    fontWeight: 500,
                    fontSize: '14px',
                    background: '#fff',
                  }}
                >
                  💰 FD Calculator
                </Link>
              </div>
            </div>

            <div
              className="no-print"
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '16px',
                margin: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Want safe returns?
                </strong>
                <Link
                  href="/guides/fixed-deposit-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to Ladder Deposits for Higher Returns →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is a Recurring Deposit (RD)?</h2>
              <WikiText content={introContent} />

              <h3>RD Interest Taxation (TDS Rules)</h3>
              <WikiText content={taxContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>RD vs SIP: Which is better?</h3>
              <WikiText content={comparisonContent} />

              <h3>How This Calculator Helps Your Planning</h3>
              <p>
                Since RDs involve multiple cash flows (one deposit every month),
                calculating the final maturity manually is difficult.
              </p>

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

              <h3>RD Interest Calculation Formula</h3>
              <p>
                The interest on RD is compounded quarterly in most Indian banks.
                The formula sums up the compound interest earned on each
                individual monthly installment.
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="M = \sum_{i=1}^{n} P \left(1 + \frac{r}{400}\right)^{4 \times \frac{t_i}{12}}" />
              </div>

              <WikiText
                content={`
                <ul style="font-size: 14px;">
                  <li><strong>M</strong>: Maturity Value</li>
                  <li><strong>P</strong>: Monthly Installment Amount</li>
                  <li><strong>r</strong>: Annual Interest Rate (%)</li>
                  <li><strong>t_i</strong>: Time in months for the <em>i-th</em> installment</li>
                </ul>
              `}
              />

              <h3>Key Advantages of RD</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Disciplined Savings:</strong> Forces you to save a fixed amount every month.</li>
                    <li><strong>Guaranteed Returns:</strong> Interest rates are locked at the time of opening.</li>
                    <li><strong>Liquid Options:</strong> Can be closed prematurely in emergencies (with penalty).</li>
                    <li><strong>Loan Facility:</strong> Avail a loan up to 90% of your RD balance.</li>
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

            <AuthorBio />
          </div>

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
