// src/app/fd-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import FDClient from './FDClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'FD Calculator – Fixed Deposit Interest & Maturity Value',
  description:
    'Calculate the maturity amount of your Fixed Deposit (FD) with our accurate FD Calculator. Compare interest rates, check quarterly compounding returns, and estimate tax deductions.',
  keywords: [
    'FD Calculator',
    'Fixed Deposit Calculator',
    'FD Interest Rates',
    'Term Deposit Calculator',
    'Bank FD Rates India',
    'FD Maturity Calculator',
    'Quarterly Compounding Calculator',
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

export default function FDPage() {
  return (
    <>
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
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Fixed Deposit (FD) Calculator</h1>
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
            {/* CALCULATOR APP */}
            <FDClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="fd-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is an FD? */}
              <h2>What is a Fixed Deposit (FD)?</h2>
              <WikiText
                content={`
                  <p>
                    A <strong>Fixed Deposit (FD)</strong> is a financial instrument
                    offered by banks and NBFCs where you deposit a lump sum amount
                    for a fixed tenure at a pre-determined interest rate.
                  </p>
                  <p>
                    FDs are one of the most popular investment options in India due
                    to their <strong>safety</strong>
                    and <strong>guaranteed returns</strong>, which are unaffected by
                    market fluctuations.
                  </p>
                `}
              />

              {/* 2. Who is Eligible? */}
              <h3>Who is Eligible to Open an FD?</h3>
              <WikiText
                content={`
                  <p>
                    Almost any investor category can open an FD in India. Common
                    eligibility includes:
                  </p>
                  <ul>
                    <li>
                      <strong>Resident Individuals:</strong> Any individual,
                      including minors (with guardians).
                    </li>
                    <li>
                      <strong>Senior Citizens:</strong> Eligible for higher interest
                      rates (usually 0.50% extra).
                    </li>
                    <li>
                      <strong>NRIs:</strong> Can open NRE (repatriable) or NRO
                      (non-repatriable) Fixed Deposits.
                    </li>
                    <li>
                      <strong>Organizations:</strong> HUFs, Partnership Firms,
                      Trusts, and Companies.
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
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
                    See your &quot;Real Returns&quot;. Input your tax slab
                    (e.g., 20% or 30%) to see how much money actually lands in
                    your pocket.
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

              {/* 4. Formula */}
              <h3>FD Interest Calculation Formula</h3>
              <p>
                The maturity value is calculated using the Compound Interest
                formula. For most bank FDs, interest is compounded quarterly
                (every 3 months).
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
                A = P × (1 + r/n) ^ (n × t)
              </div>
              <WikiText
                content={`
                <ul style="font-size: 14px;">
                  <li>
                    <strong>A</strong> = Maturity Amount
                  </li>
                  <li>
                    <strong>P</strong> = Principal Amount
                  </li>
                  <li>
                    <strong>r</strong> = Rate of Interest (decimal)
                  </li>
                  <li>
                    <strong>n</strong> = Compounding Frequency (4 for Quarterly)
                  </li>
                  <li>
                    <strong>t</strong> = Tenure in years
                  </li>
                </ul>
              `}
              />

              {/* 5. Key Advantages */}
              <h3>Key Advantages of Fixed Deposits</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Capital Safety:</strong> FDs up to ₹5 Lakh per bank
                      are insured by DICGC (RBI subsidiary).
                    </li>
                    <li>
                      <strong>Liquidity:</strong> You can break your FD prematurely
                      (with a small penalty) or take an overdraft loan against it.
                    </li>
                    <li>
                      <strong>Tax Saving:</strong> 5-Year Tax Saver FDs allow
                      deductions under Section 80C (up to ₹1.5 Lakh).
                    </li>
                    <li>
                      <strong>Regular Income:</strong> You can choose non-cumulative
                      FDs to get monthly or quarterly interest payouts.
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
                  <summary>Is interest on FD taxable?</summary>
                  <p>
                    Yes. The interest is added to your total income and taxed as
                    per your slab. Banks deduct 10% TDS if interest `{'>'}`
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

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="fd-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
