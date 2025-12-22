import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RetirementCalculatorClient from './RetirementCalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Comparison
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
  title: 'Retirement Calculator 2025 – Plan Your Corpus & Inflation',
  description:
    'Calculate retirement corpus required in India. Adjust for 6% inflation, life expectancy, and current savings. Plan for FIRE (Financial Independence).',
  keywords: [
    'Retirement Calculator India',
    'Pension Calculator',
    'Retirement Corpus Formula',
    'Inflation Adjusted Retirement',
    'FIRE Calculator',
    'NPS vs EPF vs PPF',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/retirement-calculator',
  },
  openGraph: {
    title: 'Retirement Calculator – Secure Your Golden Years',
    description:
      'Free tool to estimate your retirement corpus and required monthly SIP.',
    url: 'https://www.fincado.com/retirement-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function RetirementPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>Retirement Planning</strong> is the process of estimating your future income needs 
      and setting aside enough capital today to meet those needs when you stop working.
    </p>
    <p>
      It is not just about saving; it's about investing wisely to beat <strong>Inflation</strong> 
      so that your corpus lasts as long as you do. Modern planning also includes concepts like 
      <strong>FIRE (Financial Independence, Retire Early)</strong>.
    </p>
  `);

  const riskContent = autoLinkContent(`
    <ul>
      <li><strong>Inflation Risk:</strong> The "Silent Killer". ₹1 Lakh today will buy much less 20 years from now. Your corpus must grow faster than inflation (typically 6% in India).</li>
      <li><strong>Longevity Risk:</strong> Living longer than expected means you might outlive your savings. You need a buffer for medical costs and an extended lifespan.</li>
    </ul>
  `);

  const allocationContent = autoLinkContent(`
    <ul>
      <li><strong>Young (20s-30s):</strong> High <strong>Equity</strong> (70-80%). Focus on aggressive growth via Mutual Funds.</li>
      <li><strong>Mid-Career (40s):</strong> Balanced (50-60% Equity). Start securing gains into Debt/NPS.</li>
      <li><strong>Near Retirement (50s):</strong> Conservative (30-40% Equity). Focus on capital preservation and regular income (SWP).</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Retirement Corpus Calculator"
        description="Estimate how much money you need to retire in India. Adjust for inflation and life expectancy."
        url="https://www.fincado.com/retirement-calculator"
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
                name: 'How much money do I need for retirement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A common rule of thumb is to aim for a corpus that is 20-25 times your annual expenses at the time of retirement. However, this varies based on lifestyle and inflation.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 4% withdrawal rule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The 4% rule suggests you can withdraw 4% of your retirement portfolio in the first year, and adjust that amount for inflation annually, ensuring your money lasts for 30 years.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where should I invest for retirement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A balanced portfolio including EPF (Employee Provident Fund), NPS (National Pension System), and Equity Mutual Funds is recommended for Indian investors.',
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
              name: 'Retirement Calculator',
              url: 'https://www.fincado.com/retirement-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/retirement-calculator" />
          <h1>Retirement Corpus Calculator</h1>
          <ShareTools title="Retirement Corpus Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Find out exactly how much you need to save today to maintain your
              lifestyle tomorrow. Account for <strong>Inflation</strong> and
              <strong>Longevity</strong>.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <RetirementCalculatorClient />

            {/* ✅ Live Rates (FD/NPS Context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Planning Tools
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
                  📈 SIP Calculator
                </Link>
                <Link
                  href="/calculators/swp-calculator"
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
                  💸 Pension Calc
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
              <span style={{ fontSize: '24px' }}>🔥</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Want to retire early?
                </strong>
                <Link
                  href="/guides/swp-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: The F.I.R.E Movement Guide →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="retire-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is Retirement Planning?</h2>
              <WikiText content={introContent} />
              [Image of retirement timeline infographic]
              <h3>EPF vs NPS vs Mutual Funds: Where to Save?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>EPF (Provident Fund)</th>
                      <th>NPS (Pension System)</th>
                      <th>Equity Mutual Funds</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Returns</strong>
                      </td>
                      <td>~8.15% (Fixed)</td>
                      <td>9% - 11% (Market Linked)</td>
                      <td>12% - 15% (High Growth)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax Benefit</strong>
                      </td>
                      <td>Sec 80C (EEE status)</td>
                      <td>Sec 80CCD (Extra ₹50k)</td>
                      <td>ELSS (Sec 80C)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Liquidity</strong>
                      </td>
                      <td>Low (Retirement/Job loss)</td>
                      <td>Very Low (Age 60)</td>
                      <td>High (Anytime)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3>The Two Biggest Risks</h3>
              <WikiText content={riskContent} />
              <h3>Recommended Asset Allocation by Age</h3>
              <WikiText content={allocationContent} />
              <h3>The 4% Withdrawal Rule</h3>
              <p>
                A popular rule for retirement spending. It states that if you
                invest in a balanced portfolio (50% Equity, 50% Debt), you can
                safely withdraw <strong>4% of your corpus</strong> in the first
                year and adjust for inflation thereafter, without running out of
                money for 30 years.
              </p>
              <h3>Retirement Calculation Formula</h3>
              <p>
                The calculator uses two steps: First, estimating Future Expenses
                (FV), and second, calculating the Corpus required (PV of Growing
                Annuity).
              </p>
              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="Exp_{future} = Exp_{current} \times (1 + r_{inf})^n" />
              </div>
              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>Exp</strong>: Monthly Expenses</li>
                    <li><strong>r_inf</strong>: Inflation Rate</li>
                    <li><strong>n</strong>: Years until Retirement</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>When should I start planning?</summary>
                  <p>
                    Ideally, as soon as you start earning. Starting early allows
                    you to leverage the power of compounding. For example,
                    starting at 25 vs 35 can double your final corpus with the
                    same monthly investment.
                  </p>
                </details>
                <details>
                  <summary>How much inflation should I assume?</summary>
                  <p>
                    For India, a long-term inflation rate of 6% is a standard
                    assumption. However, medical inflation is often higher
                    (8-10%), so account for that separately.
                  </p>
                </details>
                <details>
                  <summary>Is NPS mandatory?</summary>
                  <p>
                    No, but it is highly recommended for the additional tax
                    benefit (₹50,000 under 80CCD) and low-cost exposure to
                    equity and debt markets.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="retire-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
