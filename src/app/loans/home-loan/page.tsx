/* eslint-disable @next/next/no-html-link-for-pages */
// src/app/loans/home-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import HomeLoanClient from './HomeLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator 2025 – Check Eligibility & Tax Benefits',
  description:
    'Calculate Home Loan EMI, total interest, and tax benefits under Section 24(b) and 80C. Check eligibility, PMAY subsidy, and amortization schedule instantly.',
  keywords: [
    'Home Loan EMI Calculator',
    'Housing Loan Calculator',
    'SBI Home Loan EMI',
    'HDFC Home Loan Interest',
    'Home Loan Tax Benefit',
    'PMAY Calculator',
    'Mortgage Calculator India',
    'Home Loan Eligibility',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/loans/home-loan',
  },
  openGraph: {
    title: 'Home Loan EMI Calculator – Plan Your Dream Home',
    description:
      'Free tool to calculate Home Loan EMI, Interest, and Tax Benefits.',
    url: 'https://www.fincado.com/loans/home-loan',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function HomeLoanPage() {
  return (
    <>
      {/* --------- BREADCRUMB STRUCTURED DATA --------- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Loans', url: 'https://www.fincado.com/loans' },
          {
            name: 'Home Loan EMI Calculator',
            url: 'https://www.fincado.com/loans/home-loan',
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
                name: 'How does the Home Loan Calculator help me?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It helps you estimate your monthly EMI, total interest cost, and tax benefits, allowing you to choose the right loan amount and tenure.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the tax benefits on a Home Loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can claim up to ₹1.5 lakh under Section 80C on principal repayment and up to ₹2 lakh under Section 24(b) on interest.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is shorter tenure better for home loans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Shorter tenure increases EMI but significantly reduces total interest paid.',
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
            name: 'Home Loan EMI Calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            url: 'https://www.fincado.com/loans/home-loan',
            description:
              'Calculate Home Loan EMI, total interest payable, and tax benefits using Fincado’s Home Loan Calculator.',
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
          <h1>Home Loan EMI Calculator</h1>
          <WikiText
            content={`
              <p style="max-width: 700px; color: var(--color-text-muted);">
                Plan your dream home with our bank-grade accurate calculator.
                Check EMI, total interest cost, and tax savings instantly.
              </p>
            `}
          />
        </header>

        <div className="layout-grid">
          {/* -------- MAIN CONTENT -------- */}
          <div className="main-content">
            <HomeLoanClient />

            <LiveRateTable type="homeLoan" />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="home-loan-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT -------- */}
            <article className="article content-for-seo no-print">
              <h2>What is a Home Loan?</h2>
              <WikiText
                content={`
                  <p>
                    A <strong>Home Loan</strong> is a secured loan provided to purchase,
                    construct, or renovate residential property. The property acts as collateral.
                  </p>
                `}
              />

              <h3>How This Home Loan Calculator Helps</h3>
              <WikiText
                content={`
                  <p>
                    This calculator helps you plan EMIs, reduce interest burden,
                    and optimize tax savings before taking a long-term commitment.
                  </p>
                `}
              />

              <h3>Home Loan EMI Formula</h3>
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

              <h3>Related Calculators</h3>
              <ul>
                <li>
                  <a href="/emi-calculator">EMI Calculator</a>
                </li>
                <li>
                  <a href="/loans/personal-loan">Personal Loan Calculator</a>
                </li>
                <li>
                  <a href="/loans/car-loan">Car Loan Calculator</a>
                </li>
              </ul>
            </article>

            <AuthorBio />
          </div>

          {/* -------- SIDEBAR -------- */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="home-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
