import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GSTClient from './GSTClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Business Loan Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'GST Calculator India – Reverse GST & Tax Slabs 2025',
  description:
    'Calculate GST inclusive and exclusive prices instantly. Check 2025 GST rates for Gold (3%), Real Estate (5%), and Electronics (18%). Reverse GST formula included.',
  keywords: [
    'GST Calculator',
    'Reverse GST Calculator',
    'GST Calculation Formula',
    'GST Rates 2025',
    'Calculate GST on Gold',
    'IGST CGST SGST Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/gst-calculator',
  },
  openGraph: {
    title: 'GST Calculator – Instant Tax Computation',
    description:
      'Free tool for businesses to calculate GST invoices and reverse tax amounts.',
    url: 'https://www.fincado.com/gst-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function GSTPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>GST (Goods and Services Tax)</strong> is a destination-based indirect tax levied on the supply 
      of goods and services in India. It replaced multiple cascading taxes like VAT, Service Tax, and Excise Duty, 
      creating a "One Nation, One Tax" system.
    </p>
    <p>
      Businesses need to calculate GST accurately to file returns and generate <strong>e-invoices</strong>. 
      Consumers use it to cross-check bills for big-ticket purchases like cars or appliances.
    </p>
  `);

  const componentContent = autoLinkContent(`
    <ul>
      <li><strong>CGST (Central GST):</strong> Collected by the Central Government on intra-state sales (within the same state).</li>
      <li><strong>SGST (State GST):</strong> Collected by the State Government on intra-state sales.</li>
      <li><strong>IGST (Integrated GST):</strong> Collected by the Central Government on inter-state sales (between two states) and imports.</li>
    </ul>
  `);

  const reverseContent = autoLinkContent(`
    <p>
      Often, you know the final MRP (Maximum Retail Price) and need to find the actual base price 
      before tax. This is called a <strong>Reverse GST Calculation</strong>. It is essential for traders 
      to determine their profit margins.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="GST Calculator India"
        description="Calculate GST inclusive and exclusive amounts instantly. Supports 3% (Gold), 5%, 12%, 18%, and 28% slabs."
        url="https://www.fincado.com/gst-calculator"
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
                name: 'How to calculate Reverse GST?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To find the base price from the total amount: Net Price = Total Amount / (1 + (GST Rate/100)). For example, if Total is ₹118 and GST is 18%, Base Price = 118 / 1.18 = ₹100.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the GST rate on Gold?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Gold and Gold Jewellery attract a special GST rate of 3%. Making charges on gold jewellery are taxed separately at 5% or 18% depending on the service.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who pays IGST?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IGST (Integrated GST) is paid when goods or services are supplied from one state to another (Inter-state). The tax is collected by the Centre and later shared with the destination state.',
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

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/gst-calculator" />
          <h1>GST Calculator (Goods and Services Tax)</h1>
          <ShareTools title="GST Calculator" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="gst-top" type="leaderboard" />
          </div>
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
            <GSTClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="gst-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Business Loan Context) */}
            <LiveRateTable type="personalLoan" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Business Tools
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/calculators/sip-calculator"
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
                  📈 Investment Calc
                </Link>
                <Link
                  href="/calculators/loan-calculator"
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
                  💸 Business Loan
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
              <span style={{ fontSize: '24px' }}>💼</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Running a Business?
                </strong>
                <Link
                  href="/guides/gst-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to file GST Returns Online →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="gst-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>Understanding GST (Goods and Services Tax)</h2>
              <WikiText content={introContent} />

              <h3>Current GST Rate Slabs (2025)</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Rate</th>
                      <th>Items Covered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>0% (Exempt)</strong>
                      </td>
                      <td>
                        Fresh food (milk, eggs, vegetables), Books, Newspapers.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3%</strong>
                      </td>
                      <td>Gold, Silver, Platinum, Diamonds.</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>5%</strong>
                      </td>
                      <td>Packaged food, Medicines, Economy Air travel.</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12%</strong>
                      </td>
                      <td>
                        Mobiles, Processed food, Business Class Air travel.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>18%</strong>
                      </td>
                      <td>
                        Most Electronics, IT Services, Restaurants, Banking.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>28%</strong>
                      </td>
                      <td>Luxury Cars, Cement, ACs, Tobacoo (+ Cess).</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Components of GST</h3>
              <WikiText content={componentContent} />

              <h3>Reverse GST Calculation Formula</h3>
              <WikiText content={reverseContent} />

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="\text{Base Price} = \frac{\text{Total MRP}}{1 + (\text{GST Rate} / 100)}" />
              </div>

              <WikiText
                content={`
                  <p>
                    <strong>Example:</strong> If you bought a phone for ₹11,800 (inclusive of 18% GST):<br />
                    Base Price = 11,800 / 1.18 = <strong>₹10,000</strong>.<br />
                    GST Amount = ₹1,800.
                  </p>
                `}
              />

              <h3>Benefits of GST System</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Eliminates Cascading Effect:</strong> Tax on tax is removed via Input Tax Credit (ITC).</li>
                    <li><strong>Higher Threshold:</strong> Small businesses with turnover up to ₹40 Lakhs are exempt.</li>
                    <li><strong>Composition Scheme:</strong> Simplified compliance for businesses up to ₹1.5 Crore turnover.</li>
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
                    inter-state suppliers must register mandatorily.
                  </p>
                </details>
                <details>
                  <summary>What is HSN/SAC Code?</summary>
                  <p>
                    <strong>HSN</strong> (Harmonized System of Nomenclature) is
                    for goods, and <strong>SAC</strong> (Services Accounting
                    Code) is for services. These codes determine the tax rate.
                  </p>
                </details>
                <details>
                  <summary>Is there GST on exports?</summary>
                  <p>
                    Exports are generally treated as zero-rated supplies.
                    Exporters can either pay IGST and claim a refund or export
                    under a Bond/LUT without paying tax.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

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
