import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CarLoanClient from './CarLoanClient';
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
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator 2025 – New & Used Car Loan Interest',
  description:
    'Calculate Car Loan EMI instantly. Compare interest rates for New vs Used cars from SBI, HDFC, Axis. Check eligibility and down payment impact.',
  keywords: [
    'Car Loan EMI Calculator',
    'Auto Loan Interest Rate',
    'Vehicle Loan Calculator',
    'New Car Loan vs Used Car Loan',
    'Car Loan Eligibility',
    'Zero Down Payment Car Loan',
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
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      A <strong>Car Loan</strong> is a secured loan offered by banks and NBFCs to purchase 
      a new or used vehicle. The car itself acts as collateral (hypothecation) until the loan is fully repaid.
      Interest rates typically range between <strong>8.5% to 11%</strong> for new cars.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul>
      <li><strong>Age:</strong> 21–65 years at loan maturity.</li>
      <li><strong>Income:</strong> Minimum ₹3 Lakhs annually for salaried employees.</li>
      <li><strong>Credit Score:</strong> A CIBIL Score of 750+ usually gets the lowest interest rates.</li>
      <li><strong>Employment:</strong> At least 2 years of work experience is preferred.</li>
    </ul>
  `);

  const newVsUsedContent = autoLinkContent(`
    <p>
      Banks offer different rates for <strong>New Car Loans</strong> versus <strong>Used Car Loans</strong>. 
      Used car loans often have higher interest rates (12%–18%) and require a higher down payment compared 
      to new car loans.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Car Loan EMI Calculator"
        description="Calculate monthly EMI for new or used car loans. Plan your vehicle purchase budget effectively."
        url="https://www.fincado.com/loans/car-loan"
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
                name: 'Is it better to take a longer tenure for a car loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A longer tenure reduces your monthly EMI but increases the total interest you pay. Ideally, choose the shortest tenure you can comfortably afford (e.g., 3-5 years) to save on interest.',
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
            { name: 'Loans', url: 'https://www.fincado.com/loans' },
            {
              name: 'Car Loan EMI Calculator',
              url: 'https://www.fincado.com/loans/car-loan',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/loans/car-loan" />
          <h1>Car Loan EMI Calculator</h1>
          <ShareTools title="Car Loan EMI Calculator" />
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
            <CarLoanClient />

            <LiveRateTable type="carLoan" />

            {/* ✅ PROMO BOX: Drive users to the full guide */}
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
                  Buying a New vs Used Car?
                </strong>
                <Link
                  href="/guides/car-loan-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read our 2025 Guide: Interest Rates & Hidden Costs →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="car-loan-mid" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is a Car Loan?</h2>
              <WikiText content={introContent} />

              <h3>Who is Eligible for a Car Loan?</h3>
              {/* ✅ Auto-Linked Eligibility List */}
              <WikiText content={eligibilityContent} />

              <h3>New Car vs Used Car Loans</h3>
              {/* ✅ Crucial SEO Topic */}
              <WikiText content={newVsUsedContent} />

              <h3>How This Calculator Helps</h3>
              <p>
                Use this calculator to balance your down payment, tenure, and
                EMI so that your monthly budget stays comfortable.
              </p>

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
              <p>The standard formula used for EMI calculation is:</p>

              {/* ✅ Professional Math Block */}
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
                    <li><strong>P</strong>: Loan Principal (Amount Borrowed)</li>
                    <li><strong>r</strong>: Monthly Interest Rate</li>
                    <li><strong>n</strong>: Loan Tenure in Months</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQ Section */}
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
                  <p>
                    Generally, no. Tax benefits on car loans are typically
                    available only to self-employed individuals or businesses
                    who use the vehicle for business purposes (claiming
                    depreciation and interest).
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="car-loan-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
