// src/app/credit-score-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import CreditScoreClient from './CreditScoreClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'Credit Score Estimator – Check & Improve Your CIBIL Score',
  description:
    'Estimate your Credit Score based on utilization, payment history, and credit mix. Get actionable tips to improve your CIBIL/Experian score.',
  keywords: [
    'Credit Score Calculator',
    'CIBIL Score Estimator',
    'Check Credit Score',
    'Improve CIBIL Score',
    'Credit Utilization Calculator',
    'Loan Approval Chances',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/credit-score-calculator',
  },
  openGraph: {
    title: 'Credit Score Estimator – Boost Your Eligibility',
    description:
      'Free tool to estimate your credit score and simulate the impact of paying down debt.',
    url: 'https://www.fincado.com/credit-score-calculator',
    type: 'website',
  },
};

export default function CreditScorePage() {
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
                name: 'Do checking my own score lower it?',
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
              url: 'https://www.fincado.com/credit-score',
            },
          ]}
        />
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Credit Score Estimator</h1>
          <ShareTools title="Credit Score Estimator" />
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
            {/* CALCULATOR APP */}
            <CreditScoreClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="credit-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is Credit Score? */}
              <h2>What determines your Credit Score?</h2>
              <WikiText
                content={`
                  <p>
                    Your <strong>Credit Score</strong> (like <strong>CIBIL Score</strong>, Experian) is a 3-digit number
                    (300-900) that summarizes your creditworthiness. It is
                    calculated based on your past behavior with loans and credit
                    cards.
                  </p>
                `}
              />
              {/* [Image of credit score factors pie chart] */}
              {/* 2. Key Factors */}
              <h3>The 5 Pillars of Credit Scoring</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Payment History (35%)</h4>
                  <p>
                    The most critical factor. Even a single missed or late
                    payment can drop your score significantly.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Utilization (30%)</h4>
                  <p>
                    How much of your limit you use. High utilization ({'>'}30%)
                    signals &quot;credit hunger&quot; and risk.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Credit Mix (10%)</h4>
                  <p>
                    A healthy mix of secured (Home/Auto) and unsecured
                    (Personal/Card) loans is preferred over just unsecured debt.
                  </p>
                </div>
              </div>
              {/* 3. Planning Help */}
              <h3>How This Estimator Helps You</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Score Breakdown:</strong> See exactly how many points
                      you are losing due to high utilization or inquiries.
                    </li>
                    <li>
                      <strong>What-If Simulation:</strong> The tool calculates the
                      potential score boost if you pay down ₹50,000 of card debt
                      today.
                    </li>
                    <li>
                      <strong>Action Plan:</strong> Prioritized steps (e.g.,
                      "Stop applying for new cards") to fix your score.
                    </li>
                  </ul>
                `}
              />
              {/* 4. Strategy */}
              <h3>Steps to Improve Score (750+)</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Automate Payments:</strong> Set up auto-debit for
                      minimum dues to avoid late marks.
                    </li>
                    <li>
                      <strong>Increase Limit:</strong> Requesting a higher credit
                      limit (without spending more) lowers your utilization ratio.
                    </li>
                    <li>
                      <strong>Don't Close Old Cards:</strong> The age of your
                      oldest account (Credit History Length) boosts your score (15%
                      weight).
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
                  <summary>How long does a default stay on my report?</summary>
                  <p>
                    Negative information like defaults or settlements can stay
                    on your credit report for up to 7 years, though their impact
                    diminishes over time.
                  </p>
                </details>
                <details>
                  <summary>Is a &quot;Settled&quot; status bad?</summary>
                  <p>
                    Yes. &quot;Settled&quot; means you paid less than the full
                    amount owed. It is a negative mark. Always aim for
                    &quot;Closed&quot; status by paying in full.
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

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
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
