// src/app/loans/personal-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import PersonalLoanClient from './PersonalLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator – Check Eligibility & Interest',
  description:
    'Calculate Personal Loan EMI instantly. Check monthly installments, total interest payout, and amortization schedule. Compare bank rates from HDFC, SBI, ICICI.',
  keywords: [
    'Personal Loan EMI Calculator',
    'Personal Loan Interest Rate',
    'Unsecured Loan Calculator',
    'Loan Eligibility',
    'Prepayment Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/loans/personal-loan',
  },
  openGraph: {
    title: 'Personal Loan EMI Calculator – Plan Your Finances',
    description:
      'Free tool to calculate Personal Loan EMI, Interest, and Tenure.',
    url: 'https://www.fincado.com/loans/personal-loan',
    type: 'website',
  },
};

export default function PersonalLoanPage() {
  return (
    <>
      <CalculatorSchema
        name="Personal Loan EMI Calculator"
        description="Check your personal loan EMI. Compare interest rates and repayment terms from top banks."
        url="https://www.fincado.com/loans/personal-loan"
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
                name: 'How is Personal Loan EMI calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Personal Loan EMI is calculated using the formula: P x R x (1+R)^N / [(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I prepay my personal loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, but most banks charge a foreclosure fee of 2-4% on the outstanding principal. Some banks offer zero prepayment charges after 12 months.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does tenure affect interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Usually, the interest rate remains the same regardless of tenure, but a longer tenure increases the total interest amount you pay.',
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
              name: 'Personal Loan EMI Calculator',
              url: 'https://www.fincado.com/loans/personal-loan',
            },
          ]}
        />
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Personal Loan EMI Calculator</h1>
          <ShareTools title="Personal Loan EMI Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Plan your expenses smartly. Calculate accurate EMIs for weddings,
              travel, or medical emergencies instantly.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <PersonalLoanClient />

            {/* ✅ ADD LIVE RATES HERE */}
            <LiveRateTable type="personalLoan" />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="personal-loan-mid" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT (Hidden in Print) --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is a Personal Loan? */}
              <h2>What is a Personal Loan?</h2>

              <WikiText
                content={`
                  <p>
                    A <strong>Personal Loan</strong> is an <strong>unsecured form of credit</strong>
                    provided by financial institutions to help you meet immediate
                    financial needs. Unlike home or car loans, it is not restricted
                    to a specific purpose.
                  </p>
                  <p>
                    Because it is "unsecured," you do not need to pledge
                    any <strong>collateral</strong> (like property or gold). The approval is based
                    primarily on your <strong>Credit Score</strong>, income stability, and
                    repayment capacity.
                  </p>
                `}
              />

              {/* 2. Who is Eligible? */}
              <h3>Who is Eligible?</h3>

              <WikiText
                content={`
                  <p>
                    Eligibility criteria ensure that the borrower has the capacity
                    to repay the loan on time. While specific requirements vary by
                    lender, the general parameters include:
                  </p>
                  <ul>
                    <li>
                      <strong>Employment Type:</strong>
                      <ul>
                        <li>
                          <em>Salaried:</em> Employees of private limited companies,
                          PSUs, or government bodies.
                        </li>
                        <li>
                          <em>Self-Employed:</em> Doctors, CAs, and business owners
                          with income proof.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Age:</strong> Typically between 21 and 60 years.
                    </li>
                    <li>
                      <strong>Credit Score:</strong> A CIBIL score of
                      <strong>750 or above</strong> is preferred.
                    </li>
                    <li>
                      <strong>Income:</strong> Minimum monthly net income (e.g.,
                      ₹25,000, varying by city).
                    </li>
                    <li>
                      <strong>Experience:</strong> Min 2 years total work
                      experience, with 1 year at the current employer.
                    </li>
                  </ul>
                `}
              />

              {/* 3. Calculator Help */}
              <h3>How This Calculator Helps Your Financial Planning</h3>
              <WikiText
                content={`
                  <p>
                    <em>
                      Note: Unlike education loans, personal loans usually do not
                      have a moratorium period; EMIs start immediately.
                    </em>
                  </p>
                  <p>
                    Using a <strong>Personal Loan EMI Calculator</strong> is a crucial first step
                    before applying. It empowers you to verify your affordability.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Assess Affordability</h4>
                  <p>
                    Instantly see the monthly outflow. Ensure your EMI does not
                    exceed 40-50% of your monthly take-home salary.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Choose the Right Tenure</h4>
                  <p>
                    Balance your budget. A longer tenure reduces the monthly EMI
                    but increases the total interest payout.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Plan Pre-payments</h4>
                  <p>
                    See how the outstanding balance reduces over time to plan
                    for foreclosure when you receive a bonus.
                  </p>
                </div>
              </div>

              {/* 4. EMI Formula */}
              <h3>EMI Calculation Formula</h3>
              <p>
                The Equated Monthly Installment (EMI) for a personal loan is
                calculated using the standard reducing balance method.
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
                    <strong>P</strong> = Loan Amount (Principal)
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
              <h3>Key Advantages of a Personal Loan</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>No Collateral Required:</strong> Your assets remain
                      safe; you don't need to mortgage your home.
                    </li>
                    <li>
                      <strong>Quick Disbursal:</strong> Funds are often credited
                      within 24–48 hours (or instantly for pre-approved customers).
                    </li>
                    <li>
                      <strong>Flexible End-Use:</strong> You have complete freedom
                      to use the funds for weddings, travel, medical needs, or
                      renovations.
                    </li>
                    <li>
                      <strong>Fixed Interest Rates:</strong> EMIs remain constant
                      throughout the tenure, making budgeting easier.
                    </li>
                    <li>
                      <strong>Minimal Documentation:</strong> The process is often
                      paperless for existing bank customers.
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
                    Is interest on personal loan tax deductible?
                  </summary>
                  <p>
                    Generally, NO. However, if the loan is used for home
                    renovation (deductible under Sec 24) or business expansion,
                    you may claim deductions. Keep proofs handy.
                  </p>
                </details>
                <details>
                  <summary>What are foreclosure charges?</summary>
                  <p>
                    Most banks charge 2% to 4% of the outstanding principal if
                    you repay the full loan before the tenure ends. Check your
                    loan agreement.
                  </p>
                </details>
                <details>
                  <summary>
                    What is a good CIBIL score for a personal loan?
                  </summary>
                  <p>
                    A score of 750 and above is considered excellent and helps
                    you get the lowest interest rates and quick approval.
                  </p>
                </details>
                <details>
                  <summary>
                    Can I close my personal loan before the tenure ends?
                  </summary>
                  <p>
                    Yes, most lenders allow you to foreclose or make
                    part-payments after a specific lock-in period (usually 6–12
                    months).
                  </p>
                </details>
                <details>
                  <summary>
                    Will applying for a personal loan affect my credit score?
                  </summary>
                  <p>
                    Applying triggers a &quot;hard inquiry&quot; which may dip
                    your score slightly. However, timely repayment will boost
                    your score significantly.
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
              <AdSlot id="personal-loan-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
