// src/app/loans/car-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import CarLoanClient from './CarLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator 2025 – Interest Rates & Down Payment',
  description:
    'Calculate Car Loan EMI instantly. Plan your down payment, check interest rates from SBI, HDFC, Axis, and view amortization schedules for new and used cars.',
  keywords: [
    'Car Loan EMI Calculator',
    'Auto Loan Interest Rate',
    'Vehicle Loan Calculator',
    'Car Loan Eligibility',
    'Used Car Loan Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/loans/car-loan',
  },
  openGraph: {
    title: 'Car Loan EMI Calculator – Drive Your Dream Car',
    description:
      'Free tool to calculate Car Loan EMI, Total Interest, and Tenure options.',
    url: 'https://www.fincado.com/loans/car-loan',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function CarLoanPage() {
  return (
    <>
      {/* ---------- FAQ SCHEMA ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Hypothecation in Car Loans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Hypothecation means the car is pledged as collateral to the bank. You own the car, but the bank holds the legal right to seize it if EMIs are not paid. The hypothecation is removed from the RC once the loan is fully repaid.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get 100% funding on the car price?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Some banks offer 100% funding on the ex-showroom price. Insurance and registration are usually paid separately. High-credit customers may get 100% on-road funding under special schemes.',
                },
              },
              {
                '@type': 'Question',
                name: 'What credit score is required for a car loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A CIBIL score of 750+ gets the best interest rates. Scores between 700–749 are usually approved with slightly higher rates.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* ---------- BREADCRUMB ---------- */}
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Loans', url: 'https://www.fincado.com/loans' },
            {
              name: 'Car Loan EMI Calculator',
              url: 'https://www.fincado.com/loans/car-loan',
            },
          ]}
        />

        {/* ---------- HEADER ---------- */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Car Loan EMI Calculator</h1>
          <WikiText
            content={`
              <p style="max-width: 700px; color: var(--color-text-muted);">
                Drive home your dream car with confidence. Calculate accurate EMIs,
                optimize your down payment, and compare interest rates instantly.
              </p>
            `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* ---------- CALCULATOR ---------- */}
            <CarLoanClient />

            {/* ---------- LIVE RATES ---------- */}
            <LiveRateTable type="carLoan" />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="car-loan-mid" type="leaderboard" />
            </div>

            {/* ---------- SEO CONTENT ---------- */}
            <article className="article content-for-seo no-print">
              <h2>What is a Car Loan?</h2>
              <WikiText
                content={`
                  <p>
                    A <strong>Car Loan</strong> is a secured loan offered by banks
                    and NBFCs to purchase a new or used vehicle. The car itself is
                    pledged as collateral, known as <strong>hypothecation</strong>.
                  </p>
                  <p>
                    Because the loan is secured, interest rates are lower than
                    personal loans and typically range between 8.5%–11%.
                  </p>
                `}
              />

              <h3>Who is Eligible for a Car Loan?</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Age:</strong> 21–65 years at loan maturity</li>
                    <li><strong>Income:</strong> ₹3L+ annually (salaried)</li>
                    <li><strong>Credit Score:</strong> 750+ for best rates</li>
                    <li><strong>Employment Stability:</strong> 2+ years preferred</li>
                  </ul>
                `}
              />

              <h3>How This Calculator Helps</h3>
              <WikiText
                content={`
                  <p>
                    Use this calculator to balance your down payment, tenure,
                    and EMI so that your monthly budget stays comfortable.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Down Payment Planning</h4>
                  <p>Higher down payment = lower EMI & interest.</p>
                </div>
                <div className="advantage-card">
                  <h4>Tenure Optimization</h4>
                  <p>4–5 years usually gives the best balance.</p>
                </div>
                <div className="advantage-card">
                  <h4>On-Road Cost Awareness</h4>
                  <p>Plan for insurance, road tax & maintenance.</p>
                </div>
              </div>

              <h3>Car Loan EMI Formula</h3>
              <div
                style={{
                  background: '#f1f5f9',
                  padding: 16,
                  borderRadius: 8,
                  fontFamily: 'monospace',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                EMI = [P × R × (1+R)^N] / [(1+R)^N − 1]
              </div>

              <WikiText
                content={`
                  <ul style="font-size:14px;">
                    <li><strong>P</strong> = Loan Amount</li>
                    <li><strong>R</strong> = Monthly Interest Rate</li>
                    <li><strong>N</strong> = Tenure in Months</li>
                  </ul>
                `}
              />
            </article>

            {/* ---------- FAQs ---------- */}
            <section className="article no-print">
              <h2>Frequently Asked Questions</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can I sell my car during the loan?</summary>
                  <p>
                    No. You must first close the loan and remove hypothecation
                    from the RC before selling.
                  </p>
                </details>
                <details>
                  <summary>Are there foreclosure charges?</summary>
                  <p>
                    Usually 3–5% of outstanding principal. Some banks waive it
                    after 2 years.
                  </p>
                </details>
                <details>
                  <summary>Do salaried people get tax benefits?</summary>
                  <p>No. Tax benefits apply only for business use vehicles.</p>
                </details>
              </div>
            </section>

            {/* ---------- AUTHOR ---------- */}
            <AuthorBio />
          </div>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="car-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
