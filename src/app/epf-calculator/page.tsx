import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EPFClient from './EPFClient';
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
  title: 'EPF Calculator 2025 – Check Corpus & Interest (Tax Rules)',
  description:
    'Calculate EPF maturity corpus. Check employer contribution split (EPS vs EPF), interest rates, and tax on contributions above ₹2.5 Lakh.',
  keywords: [
    'EPF Calculator',
    'PF Calculator India',
    'Employees Provident Fund Calculator',
    'EPF Interest Calculator',
    'VPF Calculator',
    'EPF Tax Rules 2025',
    'Pension Contribution EPS',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/epf-calculator',
  },
  openGraph: {
    title: 'EPF Calculator – Track Your Retirement Savings',
    description:
      'Free tool to calculate your total EPF corpus including employer contribution and interest.',
    url: 'https://www.fincado.com/epf-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function EPFPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      The <strong>Employees' Provident Fund (EPF)</strong> is a mandatory retirement savings scheme 
      managed by the <strong>EPFO</strong> for salaried employees in India. It builds a retirement 
      corpus through regular monthly contributions from both the employee and the employer.
    </p>
    <p>
      It offers a <strong>Sovereign Guarantee</strong> (backed by the Govt) and falls under the 
      EEE (Exempt-Exempt-Exempt) tax status for most employees, making it one of the safest debt instruments.
    </p>
  `);

  const contributionContent = autoLinkContent(`
    <p>Both you and your employer contribute <strong>12%</strong> of your (Basic Salary + DA). However, the split is different:</p>
    <ul>
      <li><strong>Employee Share:</strong> 100% of your 12% goes into your EPF account.</li>
      <li><strong>Employer Share:</strong> Out of their 12%, only <strong>3.67%</strong> goes to EPF. The remaining <strong>8.33%</strong> goes to the <strong>Employee Pension Scheme (EPS)</strong>.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      <strong>New Tax Rule (Budget 2021):</strong> If your total contribution (Employee Share + VPF) exceeds 
      <strong>₹2.5 Lakhs</strong> in a financial year, the interest earned on the excess amount is <strong>taxable</strong> 
      as per your income tax slab. The corpus accumulated up to ₹2.5 Lakhs remains tax-free.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="EPF Calculator"
        description="Calculate your Employee Provident Fund (EPF) corpus at retirement including employer contributions and interest."
        url="https://www.fincado.com/epf-calculator"
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
                name: 'How is EPF interest calculated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The EPF interest rate is notified by the government every year (currently around 8.25%). Interest is calculated monthly on the running balance but credited annually.',
                },
              },
              {
                '@type': 'Question',
                name: "What is the employer's contribution to EPF?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The employer contributes 12% of Basic + DA. However, only 3.67% goes to your EPF account. The remaining 8.33% goes towards the Employee Pension Scheme (EPS).',
                },
              },
              {
                '@type': 'Question',
                name: 'Is EPF withdrawal taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'EPF withdrawal is tax-free if you have completed 5 years of continuous service. If withdrawn before 5 years, it is taxable. Interest on contributions above ₹2.5 Lakh/year is also taxable.',
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
              name: 'EPF Calculator',
              url: 'https://www.fincado.com/epf-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/epf-calculator" />
          <h1>Employees&apos; Provident Fund (EPF) Calculator</h1>
          <ShareTools title="Employees' Provident Fund (EPF) Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Your EPF is your biggest retirement asset. Calculate the exact
              breakdown of employee vs employer contributions and total interest
              earned over your career.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <EPFClient />

            {/* ✅ Live Rates (PPF Context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
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
                  href="/calculators/ppf-calculator"
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
                  🏦 PPF Calculator
                </Link>
                <Link
                  href="/calculators/gratuity-calculator"
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
                  💼 Gratuity Calc
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
              <span style={{ fontSize: '24px' }}>📜</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Confused about PF withdrawal?
                </strong>
                <Link
                  href="/guides/epf-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to withdraw PF Online →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="epf-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is the Employees&apos; Provident Fund (EPF)?</h2>
              <WikiText content={introContent} />

              <h3>Understanding the Contribution Split</h3>
              <WikiText content={contributionContent} />

              <h3>EPF vs PPF: Which is Better?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>EPF (Employees&lsquo; PF)</th>
                      <th>PPF (Public PF)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Interest Rate</strong>
                      </td>
                      <td>8.25% (Higher)</td>
                      <td>7.1% (Lower)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Eligibility</strong>
                      </td>
                      <td>Salaried Employees only</td>
                      <td>Anyone (Salaried/Self-Employed)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Lock-in</strong>
                      </td>
                      <td>Until Retirement (58)</td>
                      <td>15 Years</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Employer Match</strong>
                      </td>
                      <td>Yes (Employer adds 12%)</td>
                      <td>No</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Taxation on EPF (The 2.5 Lakh Rule)</h3>
              <WikiText content={taxContent} />

              <h3>How This Calculator Helps You</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Corpus Projection</h4>
                  <p>
                    Estimate the lump sum you will receive at retirement (Age
                    58/60).
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Interest Visualization</h4>
                  <p>
                    See how compounding turns small monthly deductions into a
                    massive interest component over 20-30 years.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>VPF Planning</h4>
                  <p>
                    Check how increasing your employee contribution (Voluntary
                    PF) boosts your final corpus.
                  </p>
                </div>
              </div>

              <h3>EPF Interest Calculation Formula</h3>
              <p>
                Interest is calculated monthly on the running balance, but
                credited annually.
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="Interest = \frac{(OpeningBalance + Contribution) \times Rate}{1200}" />
              </div>

              <WikiText
                content={`
                <p style="font-size: 14px; color: #666;">
                  <em>
                    *Note: This calculation happens every month, and the total interest is credited on March 31st.
                  </em>
                </p>
              `}
              />

              <h3>Key Benefits of EPF</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Sovereign Guarantee:</strong> One of the safest debt instruments in India.</li>
                    <li><strong>Tax Benefits:</strong> Contributions qualify for Section 80C.</li>
                    <li><strong>Insurance (EDLI):</strong> EPF members get free life insurance cover up to ₹7 Lakhs.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can I withdraw my EPF anytime?</summary>
                  <p>
                    You can withdraw the full amount only at retirement (58
                    years) or if you remain unemployed for 2 months. Partial
                    withdrawals are allowed for marriage, education, or home
                    purchase.
                  </p>
                </details>
                <details>
                  <summary>Is interest on EPF taxable?</summary>
                  <p>
                    Interest is tax-free for employee contributions up to ₹2.5
                    Lakh per year. If you contribute more than ₹2.5 Lakh (via
                    VPF), the interest on the excess amount is taxable.
                  </p>
                </details>
                <details>
                  <summary>How to check my EPF balance?</summary>
                  <p>
                    You can check your balance via the EPFO Portal, UMANG App,
                    or by giving a missed call to 9966044425 from your
                    registered mobile number.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="epf-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
