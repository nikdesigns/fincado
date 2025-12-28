import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PersonalLoanClient from './PersonalLoanClient';
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
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator – Check Eligibility & Interest (2025)',
  description:
    'Calculate Personal Loan EMI instantly. Compare interest rates from HDFC, SBI, ICICI. Check eligibility, documents required, and foreclosure charges.',
  keywords: [
    'Personal Loan EMI Calculator',
    'Personal Loan Interest Rate',
    'Unsecured Loan Calculator',
    'Loan Eligibility Calculator',
    'Prepayment Calculator',
    'Personal Loan vs Credit Card',
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

/* ---------------- PAGE ---------------- */

export default function PersonalLoanPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Personal Loan</strong> is an <strong>unsecured form of credit</strong>
      provided by financial institutions to help you meet immediate financial needs. 
      Unlike home or car loans, it is not restricted to a specific purpose.
    </p>
    <p>
      Because it is "unsecured," you do not need to pledge any <strong>collateral</strong> 
      (like property or gold). The approval is based primarily on your <strong>Credit Score</strong>, 
      income stability, and repayment capacity.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul>
      <li><strong>Employment:</strong> Salaried (MNC/Pvt Ltd/Govt) or Self-Employed.</li>
      <li><strong>Age:</strong> 21 to 60 years.</li>
      <li><strong>Credit Score:</strong> A CIBIL score of <strong>750+</strong> gets the best rates.</li>
      <li><strong>Income:</strong> Minimum monthly net income of ₹25,000 (varies by city).</li>
      <li><strong>Experience:</strong> Min 2 years total work experience.</li>
    </ul>
  `);

  const comparisonContent = autoLinkContent(`
    <p>
      Many borrowers confuse Personal Loans with Credit Card loans. 
      <strong>Personal Loans</strong> are generally cheaper (10.5%–14%) compared to Credit Card 
      revolving credit (36%–42%). Always choose a personal loan for large expenses like 
      weddings or medical emergencies.
    </p>
  `);

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
                name: 'Is interest on personal loan tax deductible?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Generally, NO. However, if the loan is used for home renovation (deductible under Sec 24) or business expansion, you may claim deductions. Keep proofs handy.',
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
              name: 'Personal Loan EMI Calculator',
              url: 'https://www.fincado.com/loans/personal-loan',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/loans/personal-loan" />
          <h1>Personal Loan EMI Calculator</h1>
          <ShareTools title="Personal Loan EMI Calculator" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="personal-loan-top" type="leaderboard" />
          </div>

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
            <PersonalLoanClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="personal-loan-after-calc" type="banner" />
            </div>

            <LiveRateTable type="personalLoan" />

            <div
              className="no-print"
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '16px',
                margin: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px' }}>💸</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Need a loan quickly?
                </strong>
                <Link
                  href="/guides/personal-loan-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read our Guide: How to Get Approved Instantly →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is a Personal Loan?</h2>
              <WikiText content={introContent} />

              <h3>Who is Eligible?</h3>
              <WikiText content={eligibilityContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Personal Loan vs Credit Card Loan</h3>
              <WikiText content={comparisonContent} />

              <h3>How This Calculator Helps Your Financial Planning</h3>
              <p>
                Using a <strong>Personal Loan EMI Calculator</strong> is a
                crucial first step before applying. It empowers you to verify
                your affordability.
              </p>

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

              <h3>EMI Calculation Formula</h3>
              <p>
                The Equated Monthly Installment (EMI) for a personal loan is
                calculated using the standard reducing balance method.
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="EMI = [P \times R \times (1+R)^N] / [(1+R)^N-1]" />
              </div>

              <WikiText
                content={`
                <ul>
                  <li><strong>P</strong> = Loan Amount (Principal)</li>
                  <li><strong>R</strong> = Monthly Interest Rate (Annual Rate / 12 / 100)</li>
                  <li><strong>N</strong> = Tenure in Months</li>
                </ul>
              `}
              />

              <h3>Key Advantages of a Personal Loan</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>No Collateral Required:</strong> Your assets remain safe.</li>
                    <li><strong>Quick Disbursal:</strong> Funds are often credited within 24–48 hours.</li>
                    <li><strong>Flexible End-Use:</strong> Use funds for weddings, travel, medical needs, etc.</li>
                    <li><strong>Fixed Interest Rates:</strong> EMIs remain constant throughout the tenure.</li>
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
              </div>
            </section>

            <AuthorBio />
          </div>

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
