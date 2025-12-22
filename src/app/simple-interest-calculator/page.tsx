import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SICalculatorClient from './SICalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Loan Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'Simple Interest Calculator – Flat Rate Loan Interest',
  description:
    'Calculate Simple Interest (SI) instantly. Compare Flat Rate vs Reducing Balance interest. Useful for student loans, car loans, and short-term lending.',
  keywords: [
    'Simple Interest Calculator',
    'SI Calculator',
    'Flat Rate Interest Calculator',
    'Loan Interest Calculator',
    'Simple vs Compound Interest',
    'SI Formula',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/simple-interest-calculator',
  },
  openGraph: {
    title: 'Simple Interest Calculator – Fast & Accurate',
    description:
      'Free tool to calculate interest on loans or investments using the Simple Interest formula.',
    url: 'https://www.fincado.com/simple-interest-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function SimpleInterestPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>Simple Interest (SI)</strong> is a method of calculating interest where the interest 
      amount is fixed and calculated only on the original <strong>Principal</strong> amount. 
      It does not earn interest on interest (unlike Compound Interest).
    </p>
    <p>
      It is commonly used for short-term loans, car loans marketed as "Flat Rate," and informal 
      lending between friends and family.
    </p>
  `);

  const flatRateContent = autoLinkContent(`
    <p>
      <strong>The Flat Rate Trap:</strong> Many car dealers advertise a "Flat Interest Rate" (e.g., 7%) 
      which sounds cheap. However, because you pay interest on the <strong>full principal</strong> 
      throughout the tenure (even as you repay it), the effective rate is almost double (approx 13-14%).
    </p>
    <p>Always convert Flat Rate to <strong>Reducing Balance Rate</strong> before taking a loan.</p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Simple Interest Calculator"
        description="Quickly calculate simple interest and total repayment amount for personal loans or informal lending."
        url="https://www.fincado.com/simple-interest-calculator"
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the Simple Interest formula?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The formula for Simple Interest is SI = (P × R × T) / 100, where P is Principal, R is Rate per annum, and T is Time in years.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is Simple Interest different from Compound Interest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any accumulated interest from previous periods.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a Flat Rate loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A Flat Rate loan charges interest on the original principal for the entire tenure, ignoring the fact that you are paying back the principal monthly. It is more expensive than a Reducing Balance loan.',
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
              name: 'Simple Interest Calculator',
              url: 'https://www.fincado.com/simple-interest-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/simple-interest-calculator" />
          <h1>Simple Interest Calculator</h1>
          <ShareTools title="Simple Interest Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Calculate the interest earned or paid on a principal amount. The
              quickest way to determine returns without the complexity of
              <strong>Compounding</strong>.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SICalculatorClient />

            {/* ✅ Live Rates (Loan Context) */}
            <LiveRateTable type="personalLoan" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Compare Interest
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/calculators/compound-interest-calculator"
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
                  🔄 Compound Interest
                </Link>
                <Link
                  href="/calculators/emi-calculator"
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
                  🔢 EMI Calc
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
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
              <span style={{ fontSize: '24px' }}>🚗</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Buying a car on Flat Rate?
                </strong>
                <Link
                  href="/loans/car-loan/"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Check true EMI here →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="si-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is Simple Interest?</h2>
              <WikiText content={introContent} />

              <h3>Simple Interest vs Compound Interest</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Simple Interest (SI)</th>
                      <th>Compound Interest (CI)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Formula</strong>
                      </td>
                      <td>Interest on Principal only</td>
                      <td>Interest on Principal + Interest</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Growth</strong>
                      </td>
                      <td>Linear (Slow)</td>
                      <td>Exponential (Fast)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Returns</strong>
                      </td>
                      <td>Lower Returns</td>
                      <td>Higher Returns</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Used In</strong>
                      </td>
                      <td>Car Loans (Flat), Short Loans</td>
                      <td>Mutual Funds, FDs, Home Loans</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>The &quot;Flat Rate&quot; Loan Trap</h3>
              <WikiText content={flatRateContent} />

              <h3>Simple Interest Formula</h3>
              <p>The standard formula for calculating simple interest is:</p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="SI = \frac{P \times R \times T}{100}" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>SI</strong>: Simple Interest Generated</li>
                    <li><strong>P</strong>: Principal Amount</li>
                    <li><strong>R</strong>: Rate of Interest per Annum</li>
                    <li><strong>T</strong>: Time Period in Years</li>
                  </ul>
                `}
              />

              <h3>How This Calculator Helps You</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Quick Estimates</h4>
                  <p>
                    Rapidly calculate the cost of &quot;Flat Rate&quot; loans
                    often advertised by lenders.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Investment Checks</h4>
                  <p>
                    Verify returns on non-compounding instruments like certain
                    bonds.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Educational Use</h4>
                  <p>
                    A perfect tool for students to demonstrate the linear growth
                    of money.
                  </p>
                </div>
              </div>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Do banks use Simple Interest?</summary>
                  <p>
                    Most savings accounts and fixed deposits use Compound
                    Interest. However, banks may use Simple Interest for very
                    short-term loans or specific types of delay penalties.
                  </p>
                </details>
                <details>
                  <summary>How do I calculate interest for months?</summary>
                  <p>
                    If the time is in months, divide the number of months by 12
                    to convert it into years for the formula (e.g., 6 months =
                    6/12 = 0.5 years).
                  </p>
                </details>
                <details>
                  <summary>Is Simple Interest better for borrowers?</summary>
                  <p>
                    Generally, yes. Since interest doesn&apos;t compound on
                    unpaid interest, the total amount payable is usually lower
                    than compound interest loans over the same period.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="si-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
