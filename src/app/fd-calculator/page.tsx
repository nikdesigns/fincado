import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FDClient from './FDClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
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
  title: 'FD Calculator 2025 – Calculate Interest & Maturity Value',
  description:
    'Calculate Fixed Deposit maturity amount with our accurate FD Calculator. Check monthly/quarterly payouts, TDS deduction rules, and 2025 interest rates.',
  keywords: [
    'FD Calculator',
    'Fixed Deposit Calculator',
    'FD Interest Rates 2025',
    'Term Deposit Calculator',
    'FD TDS Calculator',
    'Cumulative vs Non-Cumulative FD',
    'Senior Citizen FD Rates',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/fd-calculator',
  },
  openGraph: {
    title: 'FD Calculator – Secure Your Savings',
    description:
      'Free tool to calculate FD maturity amount, total interest, and effective yield.',
    url: 'https://www.fincado.com/fd-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function FDPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Fixed Deposit (FD)</strong> is a low-risk investment instrument 
      offered by banks and NBFCs where you deposit a lump sum amount 
      for a fixed tenure at a pre-determined interest rate.
    </p>
    <p>
      Unlike stock market investments, FDs offer <strong>guaranteed returns</strong> 
      and capital safety, making them the preferred choice for conservative investors 
      and senior citizens.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <p>
      Almost any investor category can open an FD in India. Common eligibility includes:
    </p>
    <ul>
      <li><strong>Resident Individuals:</strong> Including minors (with guardians).</li>
      <li><strong>Senior Citizens:</strong> Eligible for higher interest rates (usually 0.50% extra).</li>
      <li><strong>NRIs:</strong> Can open NRE (repatriable) or NRO (non-repatriable) FDs.</li>
      <li><strong>Organizations:</strong> HUFs, Partnership Firms, Trusts, and Companies.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Interest earned on Fixed Deposits is <strong>fully taxable</strong> as per your income tax slab. 
      It is added to your annual income under "Income from Other Sources".
    </p>
    <ul>
      <li><strong>TDS Deduction:</strong> Banks deduct 10% TDS if interest exceeds ₹40,000 in a year (₹50,000 for Senior Citizens).</li>
      <li><strong>Form 15G/15H:</strong> You can submit these forms to the bank to avoid TDS if your total income is below the taxable limit.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Fixed Deposit (FD) Calculator"
        description="Calculate the maturity amount and interest earned on your Fixed Deposits (FD) for all Indian banks."
        url="https://www.fincado.com/fd-calculator"
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
                name: 'How is FD interest calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FD interest is calculated using the compound interest formula: A = P * (1 + r/n)^(n*t). In India, most banks compound interest quarterly (n=4).',
                },
              },
              {
                '@type': 'Question',
                name: 'Is FD interest taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Interest earned on Fixed Deposits is fully taxable as per your income tax slab. Banks deduct 10% TDS if the interest exceeds ₹40,000 in a financial year (₹50,000 for senior citizens).',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I withdraw my FD before maturity?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, most FDs allow premature withdrawal, but banks typically charge a penalty of 0.5% to 1% on the interest rate. Tax Saver FDs (5 years) cannot be withdrawn early.',
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
              name: 'FD Calculator',
              url: 'https://www.fincado.com/fd-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/fd-calculator" />
          <h1>Fixed Deposit (FD) Calculator</h1>
          <ShareTools title="Fixed Deposit (FD) Calculator" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="fd-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Secure your future with guaranteed returns. Calculate accurate FD
              maturity values with options for <strong>Tax Deductions</strong> and
              <strong>Quarterly Compounding</strong>.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <FDClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="fd-after-calc" type="banner" />
            </div>

            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                More Savings Tools
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/calculators/rd-calculator"
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
                  🔄 RD Calculator
                </Link>
                <Link
                  href="/calculators/ppf-calculator"
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
                  🏦 PPF Returns
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
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Looking for safer returns?
                </strong>
                <Link
                  href="/guides/fixed-deposit-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to Ladder FDs for Higher Interest →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is a Fixed Deposit (FD)?</h2>
              <WikiText content={introContent} />

              <h3>Who is Eligible?</h3>
              <WikiText content={eligibilityContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>How This Calculator Helps Your Planning</h3>
              <WikiText
                content={`
                  <p>
                    Manual calculation of compound interest can be tricky. This
                    calculator helps you verify bank quotes and understand the
                    impact of <strong>TDS (Tax Deducted at Source)</strong>.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Exact Compounding</h4>
                  <p>
                    Most Indian banks compound interest quarterly. This tool
                    uses the exact formula to give you precise maturity figures.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Tax Estimation</h4>
                  <p>
                    See your &quot;Real Returns&quot;. Input your tax slab (20%
                    or 30%) to see how much money actually lands in your pocket.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Compare Tenures</h4>
                  <p>
                    Quickly check if locking your money for 5 years yields
                    significantly more than renewing it every year.
                  </p>
                </div>
              </div>

              <h3>TDS on FD Interest (2025 Rules)</h3>
              <WikiText content={taxContent} />

              <h3>FD Maturity Formula</h3>
              <p>For Compound Interest FDs (Reinvestment), the formula is:</p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{n \times t}" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>A</strong>: Maturity Amount</li>
                    <li><strong>P</strong>: Principal Investment</li>
                    <li><strong>r</strong>: Rate of Interest (in decimals)</li>
                    <li><strong>n</strong>: Compounding Frequency (4 for Quarterly)</li>
                    <li><strong>t</strong>: Time in Years</li>
                  </ul>
                `}
              />

              <h3>Key Advantages of Fixed Deposits</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Capital Safety:</strong> FDs up to ₹5 Lakh per bank are insured by DICGC.</li>
                    <li><strong>Liquidity:</strong> Premature withdrawal allowed (with small penalty).</li>
                    <li><strong>Tax Saving:</strong> 5-Year Tax Saver FDs allow Section 80C deductions.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Is interest on FD taxable?</summary>
                  <p>
                    Yes. The interest is added to your total income and taxed as
                    per your slab. Banks deduct 10% TDS if interest exceeds
                    ₹40,000 (₹50,000 for seniors).
                  </p>
                </details>
                <details>
                  <summary>Can I withdraw my FD before maturity?</summary>
                  <p>
                    Yes, most FDs allow premature withdrawal, but banks
                    typically charge a penalty of 0.5% to 1% on the interest
                    rate. Tax Saver FDs (5 years) cannot be withdrawn early.
                  </p>
                </details>
                <details>
                  <summary>What is Cumulative vs Non-Cumulative FD?</summary>
                  <p>
                    <strong>Cumulative:</strong> Interest is reinvested and paid
                    at maturity (Power of Compounding). <br />
                    <strong>Non-Cumulative:</strong> Interest is paid out
                    monthly, quarterly, or yearly (Good for regular income).
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="fd-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
