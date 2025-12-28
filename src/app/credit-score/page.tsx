import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreditScoreClient from './CreditScoreClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Loan Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema'; // ✅ Actually used now
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'Credit Score Calculator 2025 – Check CIBIL & Experian Score',
  description:
    'Estimate your Credit Score instantly. Check how utilization, payment history, and inquiries affect your CIBIL. Get tips to reach 750+ score.',
  keywords: [
    'Credit Score Calculator',
    'CIBIL Score Estimator',
    'Check Credit Score Free',
    'Improve CIBIL Score',
    'Credit Utilization Calculator',
    'Soft vs Hard Inquiry',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/credit-score/',
  },
  openGraph: {
    title: 'Credit Score Estimator – Boost Your Eligibility',
    description:
      'Free tool to estimate your credit score and simulate the impact of paying down debt.',
    url: 'https://www.fincado.com/credit-score/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function CreditScorePage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      Your <strong>Credit Score</strong> (often referred to as <strong>CIBIL Score</strong> in India) 
      is a 3-digit number ranging from 300 to 900 that summarizes your creditworthiness. 
      It is calculated based on your past behavior with loans and credit cards.
    </p>
    <p>
      Lenders use this score to evaluate the risk of lending to you. A score above <strong>750</strong> 
      is generally required to get loans at the lowest interest rates.
    </p>
  `);

  const factorsContent = autoLinkContent(`
    <ul>
      <li><strong>Payment History (35%):</strong> The most critical factor. Even a single missed payment can drop your score by 50+ points.</li>
      <li><strong>Credit Utilization (30%):</strong> How much of your limit you use. High utilization (>30%) signals "credit hunger".</li>
      <li><strong>Credit Age (15%):</strong> Older accounts boost your score. Never close your oldest credit card.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Credit Score Estimator"
        description="Estimate your CIBIL/Credit Score based on payment history, utilization ratio, and credit mix."
        url="https://www.fincado.com/credit-score/"
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
                name: 'What is a good CIBIL score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A score of 750 or above is generally considered good and can help you get loans at lower interest rates. 800+ is excellent.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does credit utilization affect score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Credit utilization (credit used / total limit) has a high impact (approx 30%). Keeping it below 30% is ideal for a healthy score.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does checking my own score lower it?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Checking your own score is a "soft enquiry" and does not impact your credit score. Only "hard enquiries" by lenders affect it.',
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
              name: 'Credit Score Calculator',
              url: 'https://www.fincado.com/credit-score/',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/credit-score/" />
          <h1>Credit Score Estimator</h1>
          <ShareTools title="Credit Score Estimator" />
          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="credit-top" type="leaderboard" />
          </div>
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Understand the factors hurting your score. Simulate how paying down
              credit card debt can boost your <strong>Credit Score</strong>
              instantly.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <CreditScoreClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="credit-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Personal Loan Context - High correlation with score) */}
            <LiveRateTable type="personalLoan" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Loan Tools
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/loans/personal-loan"
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
                  💸 Loan EMI
                </Link>
                <Link
                  href="/emi-calculator"
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
              <span style={{ fontSize: '24px' }}>📉</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Score dropped suddenly?
                </strong>
                <Link
                  href="/guides/credit-score-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to raise CIBIL Dispute →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="credit-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What determines your Credit Score?</h2>
              <WikiText content={introContent} />

              <h3>Credit Score Ranges: Where do you stand?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Score Range</th>
                      <th>Rating</th>
                      <th>Loan Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>750 - 900</strong>
                      </td>
                      <td>Excellent</td>
                      <td>Fast Approval, Lowest Interest Rates</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>700 - 749</strong>
                      </td>
                      <td>Good</td>
                      <td>High Chances, Standard Rates</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>650 - 699</strong>
                      </td>
                      <td>Average</td>
                      <td>Possible Approval, Higher Interest</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>300 - 649</strong>
                      </td>
                      <td>Poor</td>
                      <td>Likely Rejection</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>The 5 Pillars of Credit Scoring</h3>
              <WikiText content={factorsContent} />

              <h3>Soft Inquiry vs Hard Inquiry</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Soft Inquiry</th>
                      <th>Hard Inquiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Who Checks?</strong>
                      </td>
                      <td>You (Self-check) or Employer</td>
                      <td>Bank / Lender</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Reason</strong>
                      </td>
                      <td>Information / Monitoring</td>
                      <td>Loan / Card Application</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Impact on Score</strong>
                      </td>
                      <td>
                        <strong>No Impact (0 points)</strong>
                      </td>
                      <td>
                        <strong>Negative Impact (-5 to -10 points)</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>How the Score is Calculated</h3>
              <p>
                While the exact algorithm (FICO/CIBIL) is proprietary, it
                generally follows a weighted model:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="Score = 0.35(P) + 0.30(U) + 0.15(A) + 0.10(M) + 0.10(N)" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>P</strong>: Payment History (35%)</li>
                    <li><strong>U</strong>: Credit Utilization (30%)</li>
                    <li><strong>A</strong>: Age of Credit History (15%)</li>
                    <li><strong>M</strong>: Credit Mix (10%)</li>
                    <li><strong>N</strong>: New Inquiries (10%)</li>
                  </ul>
                `}
              />

              <h3>Steps to Improve Score (750+)</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Automate Payments:</strong> Set up auto-debit for minimum dues to avoid late marks.</li>
                    <li><strong>Increase Limit:</strong> Requesting a higher credit limit lowers your utilization ratio.</li>
                    <li><strong>Limit Applications:</strong> Don't apply for multiple cards in a short span (Hard Inquiries).</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>How long does a default stay on my report?</summary>
                  <p>
                    Negative information like defaults or settlements can stay
                    on your credit report for up to 7 years, though their impact
                    diminishes over time.
                  </p>
                </details>
                <details>
                  <summary>Is a &ldquo;Settled&ldquo; status bad?</summary>
                  <p>
                    Yes. &ldquo;Settled&ldquo; means you paid less than the full
                    amount owed. It is a negative mark. Always aim for
                    &ldquo;Closed&ldquo; status by paying in full.
                  </p>
                </details>
                <details>
                  <summary>How often is my score updated?</summary>
                  <p>
                    Lenders typically report data to bureaus every 30-45 days.
                    Your score updates whenever new data is received.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="credit-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
