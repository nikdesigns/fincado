// src/app/gst-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import GSTClient from './GSTClient';
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
  title: 'GST Calculator – Calculate GST Online (Add/Remove Tax)',
  description:
    'Calculate GST amount easily. Add GST to net price or remove GST from gross price. Check 5%, 12%, 18%, 28% tax slabs instantly.',
  keywords: [
    'GST Calculator',
    'GST Calculation Formula',
    'Reverse GST Calculator',
    'Calculate GST on Amount',
    'Goods and Services Tax India',
    'GST Invoice Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/gst-calculator',
  },
  openGraph: {
    title: 'GST Calculator – Instant Tax Computation',
    description:
      'Free tool for businesses and consumers to calculate GST inclusive/exclusive prices.',
    url: 'https://www.fincado.com/gst-calculator',
    type: 'website',
  },
};

export default function GSTPage() {
  return (
    <>
      <CalculatorSchema
        name="GST Calculator India"
        description="Calculate GST (Goods and Services Tax) inclusive and exclusive amounts instantly. Supports 5%, 12%, 18%, and 28% slabs."
        url="https://www.fincado.com/gst-calculator"
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
                name: 'How to calculate GST?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To add GST: Gross Price = Net Price × (1 + GST Rate). To remove GST: Net Price = Gross Price / (1 + GST Rate).',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the GST slabs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The primary GST slabs in India are 5%, 12%, 18%, and 28%. Essential items are often exempt (0%), while luxury goods attract higher rates plus cess.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Reverse Charge Mechanism (RCM)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Under RCM, the liability to pay GST falls on the recipient of goods/services instead of the supplier. This applies to specific goods and unregistered dealers.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to calculate reverse GST?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Reverse GST is calculated by dividing the gross price by (1 + GST rate). Example: Net Price = Gross Price / 1.18 for 18% GST.',
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
              name: 'GST Calculator',
              url: 'https://www.fincado.com/gst-calculator',
            },
          ]}
        />
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/gst-calculator" />
          <h1>GST Calculator (Goods and Services Tax)</h1>
          <ShareTools title="GST Calculator (Goods and Services Tax)" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Instantly calculate <strong>GST Inclusive</strong> and <strong>Exclusive</strong> prices.
              Ideal for generating invoices, verifying bills, and tax compliance.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <GSTClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="gst-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is GST? */}
              <h2>Understanding GST (Goods and Services Tax)</h2>

              <WikiText
                content={`
                  <p>
                    <strong>GST (Goods and Services Tax)</strong> is a destination-based indirect tax levied on the supply
                    of goods and services. It has replaced multiple indirect taxes
                    like VAT, Service Tax, and Excise Duty, creating a "One
                    Nation, One Tax" system.
                  </p>
                `}
              />

              {/* 2. Key Components */}
              <h3>Components of GST</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>CGST (Central GST):</strong> Collected by the Central
                      Government on intra-state sales.
                    </li>
                    <li>
                      <strong>SGST (State GST):</strong> Collected by the State
                      Government on intra-state sales.
                    </li>
                    <li>
                      <strong>IGST (Integrated GST):</strong> Collected by the
                      Central Government on inter-state sales and imports.
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
              <h3>Why Use This Calculator?</h3>
              <WikiText
                content={`
                  <p>
                    Manual calculations can lead to billing errors. This tool helps ensure <strong>Invoice</strong> accuracy.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Reverse Calculation</h4>
                  <p>
                    Easily find the base price of a product sold at MRP (Gross
                    Price) by removing the tax component.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Invoice Accuracy</h4>
                  <p>
                    Avoid billing errors by calculating precise CGST and SGST
                    splits for your invoices.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Budgeting</h4>
                  <p>
                    Consumers can estimate the final price of big-ticket items
                    like cars or electronics before purchase.
                  </p>
                </div>
              </div>

              {/* 4. Formula */}
              <h3>GST Calculation Formula</h3>
              <p>For calculating the tax amount on a base price:</p>

              <div style={{ padding: '20px 0', overflowX: 'auto' }}>
                <BlockMath math="GST = \text{Base Price} \times \frac{R}{100}" />
              </div>

              <WikiText
                content={`
  <ul>
    <li><strong>GST</strong> = Tax Amount</li>
    <li><strong>R</strong> = GST Rate (5%, 12%, 18%, 28%)</li>
  </ul>
  <p>To calculate the <strong>Total Amount</strong>:</p>
  <p>Total = Base Price + GST Amount</p>
`}
              />

              {/* 5. Key Advantages */}
              <h3>Benefits of GST System</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Eliminates Cascading Effect:</strong> Tax on tax is
                      removed via <strong>Input Tax Credit</strong> (ITC).
                    </li>
                    <li>
                      <strong>Higher Threshold:</strong> Small businesses with
                      turnover up to ₹40 Lakhs are exempt (for goods).
                    </li>
                    <li>
                      <strong>Composition Scheme:</strong> Simplified compliance for
                      small businesses with turnover up to ₹1.5 Crore.
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
                  <summary>Who needs to register for GST?</summary>
                  <p>
                    Businesses with an annual turnover exceeding ₹40 Lakhs (₹20
                    Lakhs for services) must register. E-commerce sellers and
                    inter-state suppliers must register mandatorily regardless
                    of turnover.
                  </p>
                </details>
                <details>
                  <summary>What is HSN/SAC Code?</summary>
                  <p>
                    <strong>HSN</strong> (Harmonized System of Nomenclature) is
                    for goods, and <strong>SAC</strong> (Services Accounting
                    Code) is for services. These codes classify items to
                    determine the applicable tax rate.
                  </p>
                </details>
                <details>
                  <summary>Is there GST on exports?</summary>
                  <p>
                    Exports are generally treated as zero-rated supplies.
                    Exporters can either pay IGST and claim a refund or export
                    under a Bond/Letter of Undertaking (LUT) without paying tax.
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
              <AdSlot id="gst-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
