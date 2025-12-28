import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SWPClient from './SWPClient';
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
  title: 'SWP Calculator 2025 – Monthly Pension from Mutual Funds',
  description:
    'Calculate monthly income from Mutual Fund investments. Estimate corpus longevity, 2025 tax rules (LTCG), and compare SWP vs Dividend plans.',
  keywords: [
    'SWP Calculator',
    'Systematic Withdrawal Plan',
    'Monthly Income Plan',
    'Mutual Fund SWP vs Dividend',
    'Retirement Income Calculator',
    'SWP Tax Calculation 2025',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/swp-calculator',
  },
  openGraph: {
    title: 'SWP Calculator – Regular Income Generator',
    description:
      'Free tool to plan your monthly withdrawals from mutual fund investments.',
    url: 'https://www.fincado.com/swp-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function SWPPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Systematic Withdrawal Plan (SWP)</strong> allows investors to withdraw a specific 
      sum of money from their <strong>Mutual Fund</strong> investments at regular intervals 
      (monthly, quarterly, or annually).
    </p>
    <p>
      It is essentially the reverse of an <strong>SIP</strong>. While SIP is for wealth accumulation, 
      SWP is for wealth distribution, making it the gold standard for retirees looking for a 
      regular "pension-like" income from their corpus.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      SWP is highly tax-efficient because you are not taxed on the entire withdrawal amount—only on 
      the <strong>Capital Gains</strong> portion of it.
    </p>
    <ul>
      <li><strong>Equity Funds (LTCG):</strong> If held for >1 year, gains above ₹1.25 Lakh/year are taxed at <strong>12.5%</strong>.</li>
      <li><strong>Debt Funds:</strong> Taxed as per your income tax slab (no indexation benefit for fresh investments after April 2023).</li>
    </ul>
  `);

  const safeWithdrawalContent = autoLinkContent(`
    <p>
      Financial planners often cite the <strong>"4% Rule"</strong>. It suggests that if you withdraw 
      <strong>4%</strong> of your retirement corpus annually (adjusted for inflation), your money 
      should last for 30 years or more without depleting completely.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="SWP Calculator"
        description="Plan your systematic withdrawals from mutual funds. Calculate how long your corpus will last with monthly payouts."
        url="https://www.fincado.com/swp-calculator"
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
                name: 'What is SWP in Mutual Funds?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount from your mutual fund investments at regular intervals (monthly/quarterly) while the remaining corpus continues to grow.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is SWP better than FD interest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. In FDs, the entire interest is taxed as per your slab. In SWP, only the capital gains portion is taxed, and the principal portion is tax-free. This makes SWP much more tax-efficient for those in the 30% tax bracket.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does SWP reduce my capital?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If your withdrawal rate is higher than the fund return rate, your capital will deplete. If the return rate is higher, your capital can grow even after withdrawals.',
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
              name: 'SWP Calculator',
              url: 'https://www.fincado.com/swp-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/swp-calculator" />
          <h1>SWP Calculator — Systematic Withdrawal Plan</h1>
          <ShareTools title="SWP Calculator — Systematic Withdrawal Plan" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="swp-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Turn your investments into a steady monthly salary. Calculate
              accurate withdrawals and see how long your retirement corpus will
              last.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SWPClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="swp-after-calc" type="banner" />
            </div>

            <LiveRateTable type="fixedDeposit" />

            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Retirement Tools
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
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
                <Link
                  href="/fd-calculator"
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
                  🏦 FD Calculator
                </Link>
              </div>
            </div>

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
              <span style={{ fontSize: '24px' }}>👴</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Retired or Retiring soon?
                </strong>
                <Link
                  href="/guides/swp-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to create a Tax-Free Pension →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is a Systematic Withdrawal Plan (SWP)?</h2>
              <WikiText content={introContent} />

              <h3>SWP vs Dividend (IDCW): Which is Better?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>SWP (Growth Option)</th>
                      <th>Dividend (IDCW) Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Payout Amount</strong>
                      </td>
                      <td>Fixed (You decide)</td>
                      <td>Uncertain (Fund Manager decides)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Taxation</strong>
                      </td>
                      <td>Capital Gains Tax (Lower)</td>
                      <td>Taxed as per Slab (Higher)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Control</strong>
                      </td>
                      <td>Full Control</td>
                      <td>No Control</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Best For</strong>
                      </td>
                      <td>Regular Monthly Income</td>
                      <td>Occasional Payouts</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Taxation on SWP (2025 Rules)</h3>
              <WikiText content={taxContent} />

              <h3>How Long Will My Money Last? (Safe Withdrawal Rate)</h3>
              <WikiText content={safeWithdrawalContent} />

              <h3>How This Calculator Helps Your Planning</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Corpus Longevity</h4>
                  <p>
                    Find out exactly how many years your money will last if you
                    withdraw ₹50,000/month.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Capital Protection</h4>
                  <p>
                    Check if your withdrawals are eating into your principal or
                    if your corpus is growing despite payouts.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Inflation Check</h4>
                  <p>
                    Understand that a fixed ₹20,000 withdrawal today will have
                    lower purchasing power 10 years from now.
                  </p>
                </div>
              </div>

              <h3>SWP Calculation Logic</h3>
              <p>
                The remaining balance after withdrawals is calculated using the
                annuity withdrawal formula:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="Bal = P(1+i)^n - W \times \frac{(1+i)^n - 1}{i}" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>Bal</strong>: Final Balance</li>
                    <li><strong>P</strong>: Initial Lumpsum Investment</li>
                    <li><strong>W</strong>: Monthly Withdrawal Amount</li>
                    <li><strong>i</strong>: Monthly Interest Rate</li>
                    <li><strong>n</strong>: Total Months</li>
                  </ul>
                `}
              />

              <h3>Key Advantages of SWP</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Tax Efficiency:</strong> Lower tax compared to FD interest or Dividends.</li>
                    <li><strong>Flexibility:</strong> Stop, pause, or increase amounts anytime.</li>
                    <li><strong>Rupee Cost Averaging:</strong> Units are sold at averaged prices over time.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can my SWP corpus become zero?</summary>
                  <p>
                    Yes. If your monthly withdrawal rate is higher than the
                    returns generated by the fund, you will start eating into
                    your principal, eventually depleting it to zero.
                  </p>
                </details>
                <details>
                  <summary>Is SWP taxable?</summary>
                  <p>
                    Yes, but efficiently. Each withdrawal consists of principal
                    (not taxed) and capital gains (taxed). For Equity funds held
                    &gt;1 year, gains &gt;₹1.25 Lakh are taxed at 12.5%.
                  </p>
                </details>
                <details>
                  <summary>Can I stop my SWP anytime?</summary>
                  <p>
                    Yes, SWP is completely flexible. You can stop, pause, or
                    modify the amount anytime without any penalty from the
                    mutual fund house.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="swp-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
