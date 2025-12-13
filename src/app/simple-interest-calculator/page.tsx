import type { Metadata } from 'next';
import React from 'react';
import SICalculatorClient from './SICalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'Simple Interest Calculator – Calculate Interest & Maturity Amount',
  description:
    'Calculate simple interest easily with our free online calculator. Determine the interest earned on your principal amount over a specific period without compounding.',
  keywords: [
    'Simple Interest Calculator',
    'SI Calculator',
    'Interest Rate Calculator',
    'Loan Interest Calculator',
    'Investment Return Calculator',
    'Math Calculator',
  ],
  openGraph: {
    title: 'Simple Interest Calculator – Fast & Accurate',
    description:
      'Free tool to calculate interest on loans or investments using the Simple Interest formula.',
    url: 'https://www.fincado.com/simple-interest-calculator',
    type: 'website',
  },
};

export default function SimpleInterestPage() {
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
                name: 'When is Simple Interest used?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It is often used for short-term loans, car loans (flat rate), and certain types of bonds where interest does not compound.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Simple Interest Calculator</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Calculate the interest earned or paid on a principal amount. The
            quickest way to determine returns without the complexity of
            compounding.
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <SICalculatorClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="si-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is SI? */}
              <h2>What is Simple Interest?</h2>
              <p>
                **Simple Interest (SI)** is a method of calculating the interest
                charge on a loan or the interest income on an investment. Unlike
                compound interest, SI is determined strictly by the original
                contribution (Principal), the daily/annual interest rate, and
                the duration of the loan.
              </p>
              [Image of simple vs compound interest graph]
              {/* 2. Key Concepts */}
              <h3>Core Components</h3>
              <ul>
                <li>
                  <strong>Principal (P):</strong> The initial amount of money
                  borrowed or invested.
                </li>
                <li>
                  <strong>Rate (R):</strong> The annual percentage rate (APR) of
                  interest.
                </li>
                <li>
                  <strong>Time (T):</strong> The duration for which the money is
                  borrowed or invested, usually expressed in years.
                </li>
              </ul>
              {/* 3. Planning Help */}
              <h3>Why Use This Calculator?</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Quick Estimates</h4>
                  <p>
                    Rapidly calculate the cost of "Flat Rate" loans often
                    advertised by car dealerships or personal loan lenders.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Investment Checks</h4>
                  <p>
                    Verify returns on non-compounding instruments like certain
                    bonds or private lending agreements.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Educational Use</h4>
                  <p>
                    A perfect tool for students and teachers to demonstrate the
                    linear growth of money over time.
                  </p>
                </div>
              </div>
              {/* 4. Formula */}
              <h3>Simple Interest Formula</h3>
              <p>The calculation is straightforward and linear:</p>
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
                SI = (P × R × T) / 100 <br />
                Total Amount = P + SI
              </div>
              {/* 5. SI vs CI */}
              <h3>Simple vs. Compound Interest</h3>
              <p>
                While Simple Interest grows linearly (e.g., earning $10 every
                year), Compound Interest grows exponentially (earning interest
                on interest).
              </p>
              <ul>
                <li>
                  <strong>Short Term:</strong> For very short durations, the
                  difference is negligible.
                </li>
                <li>
                  <strong>Long Term:</strong> Over many years, Compound Interest
                  significantly outperforms Simple Interest.
                </li>
              </ul>
            </article>

            {/* Smart Planning Stats */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Financial Basics"
                title="Interest Facts"
                stats={[
                  { value: 'Linear', label: 'Growth Pattern' },
                  { value: 'Principal', label: 'Calculation Basis' },
                  { value: 'Fixed', label: 'Return Amount' },
                ]}
              />
            </div>

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
                    Generally, yes. Since interest doesn't compound on unpaid
                    interest, the total amount payable is usually lower than
                    compound interest loans over the same period.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="si-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
