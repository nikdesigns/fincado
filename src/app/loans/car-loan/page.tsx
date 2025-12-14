// src/app/loans/car-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import CarLoanClient from './CarLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator – Check Interest & Down Payment',
  description:
    'Calculate Car Loan EMI instantly. Plan your down payment, check interest rates from SBI, HDFC, Axis, and view amortization schedules for new and used cars.',
  keywords: [
    'Car Loan EMI Calculator',
    'Auto Loan Interest Rate',
    'Vehicle Loan Calculator',
    'Car Loan Eligibility',
    'Used Car Loan Calculator',
  ],
  openGraph: {
    title: 'Car Loan EMI Calculator – Drive Your Dream Car',
    description:
      'Free tool to calculate Car Loan EMI, Total Interest, and Tenure options.',
    url: 'https://www.fincado.com/loans/car-loan',
    type: 'website',
  },
};

export default function CarLoanPage() {
  return (
    <>
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
                  text: 'Hypothecation means the car is pledged as collateral to the bank. You own the car, but the bank holds the legal right to seize it if EMIs are not paid. The "Hypothecation" is removed from the RC once the loan is fully repaid.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get 100% funding on the car price?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Some banks offer 100% funding on the "Ex-Showroom" price, but you typically have to pay for insurance and registration (On-Road costs) yourself. Certain schemes cover 100% On-Road price for high-credit profile customers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Car Loan interest fixed or floating?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most car loans in India come with Fixed Interest Rates, meaning your EMI remains constant. However, some lenders do offer floating rate options linked to the Repo Rate.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header - Hidden in Print */}
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
            {/* CALCULATOR APP */}
            <CarLoanClient />

            {/* ✅ ADD LIVE RATES HERE */}
            <LiveRateTable type="carLoan" />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="car-loan-mid" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT (Hidden in Print) --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is a Car Loan? */}
              <h2>What is a Car Loan?</h2>
              <WikiText
                content={`
                  <p>
                    A <strong>Car Loan</strong> is a <strong>secured loan</strong> provided by banks
                    and NBFCs to purchase a new or used vehicle. The vehicle itself
                    serves as collateral for the loan. This arrangement is known as
                    <strong>Hypothecation</strong>.
                  </p>
                  <p>
                    Since the loan is secured against the car, interest rates are
                    typically lower (8.5% - 11%) compared to unsecured personal
                    loans. The lender retains the original registration papers (or a
                    lien on the RC) until the loan is fully repaid.
                  </p>
                `}
              />

              {/* 2. Who is Eligible? */}
              <h3>Who is Eligible?</h3>
              <WikiText
                content={`
                  <p>
                    Car loan eligibility is generally more relaxed than personal
                    loans because the asset backs the loan. Common criteria include:
                  </p>
                  <ul>
                    <li>
                      <strong>Age:</strong> 21 to 65 years (at loan maturity).
                    </li>
                    <li>
                      <strong>Employment:</strong>
                      <ul>
                        <li>
                          <em>Salaried:</em> Minimum annual income of ₹3 Lakhs.
                        </li>
                        <li>
                          <em>Self-Employed:</em> Business vintage of 2+ years and
                          ITR proofs.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Credit Score:</strong> A CIBIL score of
                      <strong>750+</strong> secures the best rates. However, scores
                      of 700-750 are often approved with slightly higher rates.
                    </li>
                    <li>
                      <strong>Residence:</strong> Stability of residence (at least 1
                      year at current address) is often checked.
                    </li>
                  </ul>
                `}
              />

              {/* 3. Calculator Help */}
              <h3>How This Calculator Helps Your Purchase Planning</h3>
              <WikiText
                content={`
                  <p>
                    Buying a car involves more than just the sticker price. Using
                    this calculator helps you plan your down payment and tenure
                    to keep your monthly budget intact.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Down Payment Strategy</h4>
                  <p>
                    A higher down payment reduces your loan burden. Use the
                    slider to see how paying 20% vs 10% upfront changes your
                    monthly EMI.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Tenure Selection</h4>
                  <p>
                    Car loans typically range from 3 to 7 years. While 7 years
                    lowers the EMI, you end up paying significantly more
                    interest. Find the sweet spot (usually 4-5 years).
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Budget for On-Road Costs</h4>
                  <p>
                    Remember, loans often cover the Ex-Showroom price. Ensure
                    your EMI allows room in your budget for Insurance, Road Tax,
                    and Maintenance.
                  </p>
                </div>
              </div>

              {/* 4. EMI Formula */}
              <h3>EMI Calculation Formula</h3>
              <p>
                The Equated Monthly Installment (EMI) for a car loan follows the
                standard reducing balance formula.
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
                EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
              </div>
              <WikiText
                content={`
                <ul style="font-size: 14px;">
                  <li>
                    <strong>P</strong> = Loan Amount (After subtracting Down
                    Payment)
                  </li>
                  <li>
                    <strong>R</strong> = Monthly Interest Rate (Annual Rate / 12 /
                    100)
                  </li>
                  <li>
                    <strong>N</strong> = Tenure in Months
                  </li>
                </ul>
              `}
              />

              {/* 5. Key Advantages */}
              <h3>Key Advantages of a Car Loan</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>High LTV (Loan to Value):</strong> Lenders often
                      finance up to 90% or even 100% of the On-Road price for
                      eligible customers.
                    </li>
                    <li>
                      <strong>Credit Builder:</strong> Being a secured loan, it is
                      easier to get approved. Timely payments are a great way to
                      build a high CIBIL score.
                    </li>
                    <li>
                      <strong>Tax Benefits (Business Use):</strong> If you use the
                      car for business purposes, you can claim tax deductions on the
                      interest paid and vehicle depreciation. (Note: Not applicable
                      for salaried individuals).
                    </li>
                    <li>
                      <strong>Pre-Approved Offers:</strong> Existing bank customers
                      often get instant disbursement with zero documentation.
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
                  <summary>
                    What is Hypothecation and how do I remove it?
                  </summary>
                  <p>
                    Hypothecation is the lender&apos;s lien on your car. Once
                    you repay the loan, the bank issues a NOC (No Objection
                    Certificate). You must submit this NOC to the RTO to remove
                    the hypothecation from your RC (Registration Certificate).
                  </p>
                </details>
                <details>
                  <summary>
                    Can I sell the car while the loan is active?
                  </summary>
                  <p>
                    No. You cannot sell a hypothecated vehicle. You must first
                    foreclose the loan, get the NOC, remove the hypothecation
                    from the RC, and then sell the car.
                  </p>
                </details>
                <details>
                  <summary>Are there foreclosure charges on car loans?</summary>
                  <p>
                    Yes, typically 3% to 5% of the outstanding principal if
                    closed before the tenure ends. Some banks waive this off
                    after a certain period (e.g., 2 years).
                  </p>
                </details>
                <details>
                  <summary>Is insurance included in the loan amount?</summary>
                  <p>
                    Banks usually fund 85-90% of the &quot;On-Road Price&quot;
                    which includes insurance and registration. However, some
                    schemes only fund the &quot;Ex-Showroom Price,&quot;
                    requiring you to pay for insurance out of pocket.
                  </p>
                </details>
                <details>
                  <summary>
                    Do salaried employees get tax benefits on car loans?
                  </summary>
                  <p>
                    No. Car loans do not offer tax benefits to salaried
                    individuals. Only self-employed professionals or businesses
                    can claim interest and depreciation as business expenses.
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
              <AdSlot id="car-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
