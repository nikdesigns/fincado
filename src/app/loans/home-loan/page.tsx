import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HomeLoanClient from './HomeLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import LanguageToggle from '@/components/LanguageToggle';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator 2025 – Eligibility & Tax Benefits',
  description:
    'Calculate Home Loan EMI, total interest, and tax benefits under Section 24(b) and 80C. Check eligibility, PMAY subsidy, and amortization schedule instantly.',
  keywords: [
    'Home Loan EMI Calculator',
    'Housing Loan Calculator',
    'SBI Home Loan EMI',
    'HDFC Home Loan Interest',
    'Home Loan Tax Benefit',
    'Section 80C',
    'Section 24b',
    'PMAY Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/loans/home-loan',
  },
  openGraph: {
    title: 'Home Loan EMI Calculator – Plan Your Dream Home',
    description:
      'Free tool to calculate Home Loan EMI, Interest, and Tax Benefits.',
    url: 'https://www.fincado.com/loans/home-loan',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function HomeLoanPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Home Loan</strong> is a secured loan provided by banks or NBFCs to purchase,
      construct, or renovate a residential property. In India, home loans offer significant 
      <strong>tax benefits</strong> and long repayment tenures of up to 30 years.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Home loans are the best tax-saving instruments in India. You can claim deductions under two sections:
    </p>
    <ul>
      <li><strong>Section 80C:</strong> Deduction up to ₹1.5 Lakh on <em>Principal Repayment</em>.</li>
      <li><strong>Section 24(b):</strong> Deduction up to ₹2 Lakh on <em>Interest Payment</em> for a self-occupied property.</li>
    </ul>
    <p>
      Use this calculator to split your EMI into principal and interest components to maximize these claims.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Home Loan EMI Calculator"
        description="Calculate home loan EMI, total interest payable, and tax benefits (Sec 80C, 24b) with amortization schedule."
        url="https://www.fincado.com/loans/home-loan"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Loans', url: 'https://www.fincado.com/loans' },
          {
            name: 'Home Loan EMI Calculator',
            url: 'https://www.fincado.com/loans/home-loan',
          },
        ]}
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
                name: 'How does the Home Loan Calculator help me?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It helps you estimate your monthly EMI, total interest cost, and tax benefits, allowing you to choose the right loan amount and tenure.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the tax benefits on a Home Loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can claim up to ₹1.5 lakh under Section 80C on principal repayment and up to ₹2 lakh under Section 24(b) on interest.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does tenure affect Home Loan interest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. A 30-year loan has lower EMI but you pay almost double the interest compared to a 15-year loan.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/loans/home-loan" />
          <h1>Home Loan EMI Calculator</h1>
          <ShareTools title="Home Loan EMI Calculator" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="home-loan-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
              <p style="max-width: 700px; color: var(--color-text-muted);">
                Plan your dream home with our bank-grade accurate calculator.
                Check EMI, total interest cost, and <strong>Tax Savings</strong> instantly.
              </p>
            `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <HomeLoanClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="home-loan-after-calc" type="banner" />
            </div>

            <LiveRateTable type="homeLoan" />

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
              <span style={{ fontSize: '24px' }}>🏡</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Buying your first home?
                </strong>
                <Link
                  href="/guides/home-loan-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read our Complete Home Loan Guide (2025 Edition) →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is a Home Loan?</h2>
              <WikiText content={introContent} />

              <h3>Tax Benefits of Home Loans (2025)</h3>
              <WikiText content={taxContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Home Loan EMI Formula</h3>
              <p>Indian banks use the following standard formula:</p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
              </div>

              <WikiText
                content={`
                  <ul>
                    <li><strong>P</strong>: Principal Loan Amount</li>
                    <li><strong>r</strong>: Monthly Interest Rate (Annual Rate / 12 / 100)</li>
                    <li><strong>n</strong>: Loan Tenure in Months</li>
                  </ul>
                `}
              />

              <h3>Related Calculators</h3>
              <ul>
                <li>
                  <Link href="/emi-calculator">EMI Calculator</Link>
                </li>
                <li>
                  <Link href="/loans/personal-loan">
                    Personal Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/loans/car-loan">Car Loan Calculator</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print">
              <h2>Frequently Asked Questions</h2>
              <details open>
                <summary>Is home loan interest tax-free?</summary>
                <p>
                  Not entirely. Under Section 24(b), you can claim a deduction
                  of up to ₹2 Lakh per year on interest paid for a self-occupied
                  property.
                </p>
              </details>
              <details>
                <summary>Can I pay more than my EMI?</summary>
                <p>
                  Yes, this is called a <strong>Prepayment</strong>. Making even
                  one extra EMI per year can reduce your loan tenure by several
                  years and save lakhs in interest.
                </p>
              </details>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="home-loan-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
