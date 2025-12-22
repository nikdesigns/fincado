import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EMIClient from './EMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EMI Calculator – Calculate Home, Car & Personal Loan EMI',
  description:
    'Use Fincado’s accurate EMI Calculator to check monthly installments, total interest, and amortization schedule. Compare rates and plan prepayments instantly.',
  keywords: [
    'EMI Calculator',
    'Loan EMI Calculator',
    'Home Loan EMI',
    'Car Loan EMI',
    'Personal Loan EMI',
    'Reduce Loan Interest',
    'Amortization Schedule',
    'Loan Repayment Schedule',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/emi-calculator',
  },
  openGraph: {
    title: 'EMI Calculator – Plan Your Loan Repayment',
    description:
      'Free tool to calculate EMI, Interest, and Tenure for any loan.',
    url: 'https://www.fincado.com/emi-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function EMIPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>EMI (Equated Monthly Installment)</strong> is the fixed monthly
      amount paid towards loan repayment, consisting of principal and interest.
      Indian banks calculate EMI using the <strong>reducing balance method</strong>,
      where interest is charged only on the outstanding principal.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <p>
      This calculator helps you budget better, compare loan offers,
      and reduce total interest through informed planning.
      Most borrowers underestimate how much interest accumulates
      over long tenures until they see the amortization table.
    </p>
  `);

  const factorsContent = autoLinkContent(`
    <ul>
      <li><strong>Loan Principal:</strong> The total amount you borrow. Higher principal means higher EMI.</li>
      <li><strong>Interest Rate:</strong> A lower <strong>Personal Loan Interest Rate</strong> or Home Loan rate reduces your monthly burden significantly.</li>
      <li><strong>Tenure:</strong> Choosing a longer tenure reduces your monthly EMI but increases the total interest payout over time.</li>
    </ul>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
          {
            name: 'EMI Calculator',
            url: 'https://www.fincado.com/emi-calculator',
          },
        ]}
      />

      <CalculatorSchema
        name="Loan EMI Calculator"
        description="Calculate EMI for Home Loan, Car Loan, and Personal Loan. Check monthly repayment schedule and total interest."
        url="https://www.fincado.com/emi-calculator"
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
                name: 'How is EMI calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'EMI is calculated using the formula EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where P is principal, R is monthly interest rate, and N is tenure in months.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I reduce my loan EMI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can reduce EMI by increasing down payment, choosing longer tenure, negotiating interest rate, or making prepayments.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does prepayment reduce EMI or Tenure?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most banks reduce the tenure by default when you make a prepayment, which saves you the maximum interest. However, you can request to reduce the EMI amount instead.',
                },
              },
            ],
          }),
        }}
      />

      {/* ✅ FIX 1: Removed maxWidth: '100vw'. Left only padding. 
          The .container class in globals.css will handle width perfectly. */}
      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/emi-calculator" />
          <h1>EMI Calculator – Plan Your Loan Smartly</h1>
          <ShareTools title="EMI Calculator" />
          <WikiText
            content={`
              <p style="max-width: 700px; color: var(--color-text-muted);">
                Instantly calculate your monthly EMI, visualize total interest costs,
                and download your repayment schedule.
                <strong> Accurate. Free. No Login Required.</strong>
              </p>
            `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <EMIClient />

            <LiveRateTable type="personalLoan" />

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
              <span style={{ fontSize: '24px' }}>📚</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Want to master your EMI?
                </strong>
                <Link
                  href="/guides/emi-calculator-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read our 2025 EMI Guide: Formulas & Smart Planning →
                </Link>
              </div>
            </div>

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="emi-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is an EMI?</h2>
              <WikiText content={introContent} />

              <h3>How This EMI Calculator Helps</h3>
              <WikiText content={benefitsContent} />

              <h3>Factors That Affect Your EMI</h3>
              <WikiText content={factorsContent} />

              <h3>EMI Calculation Formula</h3>
              <p>
                The formula used to calculate the Equated Monthly Installment
                (EMI) is:
              </p>

              {/* ✅ FIX 2: Kept Math block overflow safety */}
              <div>
                <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
              </div>

              <WikiText
                content={`
                  <ul>
                    <li><strong>E</strong> = EMI Amount</li>
                    <li><strong>P</strong> = Principal Loan Amount</li>
                    <li><strong>r</strong> = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)</li>
                    <li><strong>n</strong> = Loan Tenure in Months</li>
                  </ul>
                `}
              />

              <p style={{ marginTop: 16 }}>
                This EMI calculator is maintained by <strong>Fincado</strong>, a
                financial tools platform focused on accuracy and transparency
                for Indian borrowers.
              </p>

              <h3>Related Loan Calculators</h3>
              <ul>
                <li>
                  <Link href="/loans/home-loan">Home Loan EMI Calculator</Link>
                </li>
                <li>
                  <Link href="/loans/car-loan">Car Loan EMI Calculator</Link>
                </li>
                <li>
                  <Link href="/loans/personal-loan">
                    Personal Loan EMI Calculator
                  </Link>
                </li>
              </ul>

              <h2>When Should You Use an EMI Calculator?</h2>
              <ul>
                <li>Before applying for any loan to check affordability.</li>
                <li>While comparing banks to find the cheapest option.</li>
                <li>
                  To calculate how much interest you save with prepayments.
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print">
              <h2>Frequently Asked Questions</h2>
              <details open>
                <summary>Does EMI affect credit score?</summary>
                <p>
                  No. Checking EMI using a calculator is a soft activity and
                  does not impact your credit score. However, missing an EMI
                  payment will negatively impact your score.
                </p>
              </details>
              <details>
                <summary>Does prepayment reduce EMI or Tenure?</summary>
                <p>
                  By default, banks reduce the <strong>Tenure</strong> when you
                  prepay, which saves you the most interest. You must
                  specifically request the bank if you want to reduce the EMI
                  amount instead.
                </p>
              </details>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="emi-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
