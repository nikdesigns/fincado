// src/app/emi-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import EMIClient from './EMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EMI Calculator – Calculate Home, Car & Personal Loan EMI',
  description:
    'Use Fincado’s accurate EMI Calculator to check monthly installments, total interest, and amortization schedule. Compare rates and plan prepayments instantly.',
  keywords: [
    'EMI Calculator',
    'Loan EMI Calculator',
    'Home Loan EMI',
    'Car Loan EMI',
    'Personal Loan EMI',
    'Reduce Loan Interest',
    'Amortization Schedule',
  ],
  openGraph: {
    title: 'EMI Calculator – Plan Your Loan Repayment',
    description:
      'Free tool to calculate EMI, Interest, and Tenure for any loan.',
    url: 'https://www.fincado.com/emi-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function EMIPage() {
  return (
    <>
      {/* --------- BREADCRUMB STRUCTURED DATA --------- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
          {
            name: 'EMI Calculator',
            url: 'https://www.fincado.com/emi-calculator',
          },
        ]}
      />

      {/* --------- FAQ SCHEMA --------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How is EMI calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'EMI is calculated using the formula EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where P is principal, R is monthly interest rate, and N is tenure in months.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I reduce my loan EMI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can reduce EMI by increasing down payment, choosing longer tenure, negotiating interest rate, or making prepayments.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does tenure affect total interest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Longer tenure lowers EMI but significantly increases total interest paid over the loan term.',
                },
              },
            ],
          }),
        }}
      />

      {/* --------- CALCULATOR SCHEMA --------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'EMI Calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            url: 'https://www.fincado.com/emi-calculator',
            description:
              'Calculate EMI for home loan, car loan, and personal loan with interest breakdown and amortization schedule.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              url: 'https://www.fincado.com',
            },
          }),
        }}
      />

      {/* --------- PAGE CONTENT --------- */}
      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>EMI Calculator – Plan Your Loan Smartly</h1>
          <WikiText
            content={`
              <p style="max-width: 700px; color: var(--color-text-muted);">
                Instantly calculate your monthly EMI, visualize total interest costs,
                and download your repayment schedule.
                <strong> Accurate. Free. No Login Required.</strong>
              </p>
            `}
          />
        </header>

        <div className="layout-grid">
          {/* -------- MAIN CONTENT -------- */}
          <div className="main-content">
            <EMIClient />

            <LiveRateTable type="personalLoan" />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="emi-mid-content" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT -------- */}
            <article className="article content-for-seo no-print">
              <h2>What is an EMI?</h2>
              <WikiText
                content={`
                  <p>
                    <strong>EMI (Equated Monthly Installment)</strong> is the fixed monthly
                    amount paid towards loan repayment, consisting of principal and interest.
                  </p>
                `}
              />

              <h3>How This EMI Calculator Helps</h3>
              <WikiText
                content={`
                  <p>
                    This calculator helps you budget better, compare loan offers,
                    and reduce total interest through informed planning.
                  </p>
                `}
              />

              <h3>The EMI Formula</h3>
              <div
                style={{
                  border: '1px solid #e2e8f0',
                  padding: 16,
                  borderRadius: 8,
                  textAlign: 'center',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                }}
              >
                EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> − 1]
              </div>

              <h3>Related Loan Calculators</h3>
              <ul>
                <li>
                  <a href="/home-loan-calculator">Home Loan EMI Calculator</a>
                </li>
                <li>
                  <a href="/car-loan-calculator">Car Loan EMI Calculator</a>
                </li>
                <li>
                  <a href="/personal-loan-calculator">
                    Personal Loan EMI Calculator
                  </a>
                </li>
              </ul>
            </article>

            {/* -------- FAQ UI -------- */}
            <section className="article no-print">
              <h2>Frequently Asked Questions</h2>
              <details open>
                <summary>Does EMI affect credit score?</summary>
                <p>
                  No. Checking EMI using a calculator is a soft activity and
                  does not impact your credit score.
                </p>
              </details>
            </section>

            <AuthorBio />
          </div>

          {/* -------- SIDEBAR -------- */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="emi-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
