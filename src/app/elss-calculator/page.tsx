import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import ELSSClient from './ELSSClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'ELSS Calculator 2025 – Calculate Tax Saving Mutual Fund Returns',
  description:
    'Calculate returns on your ELSS Mutual Fund investments. Check how much tax you save under Section 80C (up to ₹46,800) and estimate maturity value.',
  keywords: [
    'ELSS Calculator',
    'Tax Saving Mutual Fund Calculator',
    'ELSS Return Calculator',
    'Section 80C Calculator',
    'SIP Tax Saving',
    'ELSS vs PPF Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/elss-calculator',
  },
  openGraph: {
    title: 'ELSS Calculator – Save Tax & Build Wealth',
    description:
      'Invest in ELSS to save up to ₹46,800 in tax and earn high equity returns. Calculate now.',
    url: 'https://www.fincado.com/elss-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function ELSSPage() {
  const introContent = autoLinkContent(`
    <p>
      An <strong>ELSS (Equity Linked Savings Scheme)</strong> is the only type of Mutual Fund that qualifies for 
      tax deduction under <strong>Section 80C</strong> of the Income Tax Act.
    </p>
    <p>
      It serves a dual purpose: <strong>Tax Saving</strong> and <strong>Wealth Creation</strong>. 
      You can claim a deduction of up to ₹1.5 Lakh per year, potentially saving up to ₹46,800 in taxes 
      (for the 30% tax bracket).
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul>
      <li><strong>Lock-in Period:</strong> 3 Years (Shortest among all 80C options like PPF or FD).</li>
      <li><strong>Potential Returns:</strong> 12% - 15% (Historically higher than PPF/FD).</li>
      <li><strong>Investment Mode:</strong> SIP (Systematic Investment Plan) or Lump Sum.</li>
      <li><strong>Taxation:</strong> LTCG gains above ₹1.25 Lakh are taxed at 12.5%.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="ELSS Calculator India"
        description="Calculate returns and tax savings for ELSS Mutual Funds under Section 80C."
        url="https://www.fincado.com/elss-calculator"
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
                name: 'What is the lock-in period for ELSS?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ELSS has a mandatory lock-in period of 3 years from the date of investment. If you do a SIP, each installment is locked for 3 years individually.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much tax can I save with ELSS?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can invest up to ₹1.5 Lakh under Section 80C. If you are in the 30% tax bracket, you save approximately ₹46,800 (including cess) in taxes.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is ELSS better than PPF?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For wealth creation, ELSS is generally better as it offers equity-linked returns (12-15%) compared to PPF (7.1%). ELSS also has a shorter lock-in (3 years vs 15 years). However, PPF is risk-free, while ELSS carries market risk.',
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
              name: 'ELSS Calculator',
              url: 'https://www.fincado.com/elss-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/elss-calculator" />
          <h1>ELSS Calculator — Tax Saving + Growth</h1>
          <ShareTools title="ELSS Calculator" />

          {/* 💰 AD 1 */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="elss-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Calculate the maturity value of your tax-saving mutual fund investments.
              Find out how much wealth you can build while saving taxes under Section 80C.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <ELSSClient />

            {/* 💰 AD 2 */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="elss-after-calc" type="banner" />
            </div>

            {/* Mobile Tools Grid */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Compare Tax Saving Options
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/ppf-calculator"
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
                  🔒 PPF Calculator
                </Link>
                <Link
                  href="/sip-calculator"
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
                  📈 SIP Calculator
                </Link>
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print">
              <h2>What is ELSS Mutual Fund?</h2>
              <WikiText content={introContent} />

              <h3>Key Features of ELSS</h3>
              <WikiText content={featuresContent} />

              {/* 💰 AD 3 */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>ELSS vs PPF: Quick Comparison</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>ELSS</th>
                      <th>PPF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Returns</strong>
                      </td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        12% - 15% (Exp)
                      </td>
                      <td>7.1% (Fixed)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Lock-in</strong>
                      </td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        3 Years
                      </td>
                      <td>15 Years</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Risk</strong>
                      </td>
                      <td style={{ color: '#eab308' }}>Moderate/High</td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        Risk Free
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax on Returns</strong>
                      </td>
                      <td>12.5% (LTCG &gt; 1.25L)</td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        Tax Free
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Why Choose ELSS?</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Shortest Lock-in</h4>
                  <p>
                    With just a 3-year lock-in, ELSS is the most liquid tax
                    saving option compared to PPF (15y) or FD (5y).
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Inflation Beating</h4>
                  <p>
                    Equity is the only asset class that consistently beats
                    inflation over the long term (5+ years).
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>SIP Convenience</h4>
                  <p>
                    You don&apos;t need a large lump sum. Start saving tax with
                    just ₹500 per month via SIP.
                  </p>
                </div>
              </div>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can I withdraw money after 3 years?</summary>
                  <p>
                    Yes, after the 3-year lock-in period ends, you can redeem
                    your units. However, it is recommended to stay invested for
                    5-7 years for better returns.
                  </p>
                </details>
                <details>
                  <summary>Is SIP allowed in ELSS?</summary>
                  <p>
                    Yes, SIP is the best way to invest in ELSS. However,
                    remember that <strong>each SIP installment</strong> has its
                    own 3-year lock-in period.
                  </p>
                </details>
                <details>
                  <summary>How is ELSS taxed?</summary>
                  <p>
                    ELSS gains are treated as Long Term Capital Gains (LTCG).
                    Gains up to ₹1.25 Lakh in a financial year are tax-free.
                    Gains above this limit are taxed at 12.5%.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="elss-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
