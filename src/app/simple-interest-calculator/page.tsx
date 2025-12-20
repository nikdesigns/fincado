// src/app/simple-interest-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import SICalculatorClient from './SICalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css'; // Import CSS for math
import { BlockMath } from 'react-katex'; // Component for block formulas
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'Simple Interest Calculator – Interest & Maturity',
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

export default function SimpleInterestPage() {
  return (
    <>
      <CalculatorSchema
        name="Simple Interest Calculator"
        description="Quickly calculate simple interest and total repayment amount for personal loans or informal lending."
        url="https://www.fincado.com/simple-interest-calculator"
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
              {
                '@type': 'Question',
                name: 'How do you calculate simple interest monthly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To calculate simple interest monthly, convert months into years by dividing by 12, then apply the formula SI = (P × R × T) / 100.',
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
        {/* Header */}
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
            {/* CALCULATOR APP */}
            <SICalculatorClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="si-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is SI? */}
              <h2>What is Simple Interest?</h2>

              <WikiText
                content={`
                  <p>
                    <strong>Simple Interest (SI)</strong> is a method of calculating the interest
                    charge on a <strong>Loan</strong> or the interest income on an investment. Unlike
                    <strong>Compound Interest</strong>, SI is determined strictly by the original
                    contribution (Principal), the daily/annual interest rate, and
                    the duration of the loan.
                  </p>
                `}
              />

              {/* 2. Key Concepts */}
              <h3>Core Components</h3>
              <WikiText
                content={`
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
                `}
              />

              {/* 3. Planning Help */}
              <h3>Why Use This Calculator?</h3>
              <WikiText
                content={`
                  <p>
                    Calculating linear returns is often needed for quick estimates
                    on flat-rate loans or friend-and-family lending.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Quick Estimates</h4>
                  <p>
                    Rapidly calculate the cost of &quot;Flat Rate&quot; loans
                    often advertised by car dealerships or personal loan
                    lenders.
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
              <p>
                The standard formula for calculating simple interest without
                compounding is:
              </p>

              <div style={{ padding: '20px 0', overflowX: 'auto' }}>
                <BlockMath math="SI = \frac{P \times R \times T}{100}" />
              </div>

              <WikiText
                content={`
  <ul>
    <li><strong>SI</strong> = Simple Interest Generated</li>
    <li><strong>P</strong> = Principal Amount</li>
    <li><strong>R</strong> = Rate of Interest per Annum</li>
    <li><strong>T</strong> = Time Period in Years</li>
  </ul>
`}
              />

              {/* 5. SI vs CI */}
              <h3>Simple vs. Compound Interest</h3>
              <WikiText
                content={`
                  <p>
                    While Simple Interest grows linearly (e.g., earning ₹10 every
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
                `}
              />
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

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
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
