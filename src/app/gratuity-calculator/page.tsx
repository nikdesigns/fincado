import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GratuityClient from './GratuityClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Gratuity Calculator 2025 – Check Gratuity Amount & Tax Exemption',
  description:
    'Calculate your Gratuity amount online. Know the formula (15/26 vs 15/30), eligibility rules (5 years), and tax exemption limit (₹20 Lakhs).',
  keywords: [
    'Gratuity Calculator',
    'Gratuity Formula India',
    'Payment of Gratuity Act 1972',
    'Gratuity Tax Exemption Limit 2025',
    'Calculate Gratuity Online',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/gratuity-calculator/',
  },
  openGraph: {
    title: 'Gratuity Calculator – Know Your End-of-Service Benefit',
    description:
      'Free tool to calculate gratuity based on your salary and years of service.',
    url: 'https://www.fincado.com/gratuity-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function GratuityPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Gratuity</strong> is a monetary benefit given by an employer to an employee for services 
      rendered to the company. It is a lump sum payment made at the time of retirement, resignation, 
      or termination.
    </p>
    <p>
      In India, gratuity rules are mandated by the <strong>Payment of Gratuity Act, 1972</strong>. 
      Any organization with 10 or more employees must pay gratuity to eligible staff.
    </p>
  `);

  const formulaContent = autoLinkContent(`
    <p>
      The formula depends on whether your organization is covered under the Gratuity Act or not.
    </p>
    <ul>
      <li>
        <strong>Covered Employees:</strong> <br />
        <em>Gratuity = (Last Drawn Salary × 15 × Years of Service) / 26</em> <br />
        (Here, 26 represents the number of working days in a month).
      </li>
      <li>
        <strong>Not Covered Employees:</strong> <br />
        <em>Gratuity = (Last Drawn Salary × 15 × Years of Service) / 30</em>
      </li>
    </ul>
    <p>
      <strong>Note:</strong> Salary = Basic Pay + Dearness Allowance (DA).
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Gratuity Calculator"
        description="Calculate gratuity amount based on basic salary and tenure. Check tax-free limit of ₹20 Lakhs."
        url="https://www.fincado.com/gratuity-calculator/"
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
                name: 'What is the eligibility for Gratuity?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An employee is eligible for gratuity only after completing 5 continuous years of service with the same employer.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Gratuity taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Gratuity received by government employees is fully tax-free. For private sector employees, it is tax-free up to ₹20 Lakhs. Any amount above this limit is taxable.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does 4 years and 7 months count as 5 years?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. To be eligible, you must complete exactly 5 full years. However, once eligible (after 5 years), any fraction of service above 6 months is rounded off to the next year for calculation.',
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
              name: 'Gratuity Calculator',
              url: 'https://www.fincado.com/gratuity-calculator/',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Gratuity Calculator</h1>
          <ShareTools title="Gratuity Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Leaving a job or retiring? Use this tool to calculate your <strong>Gratuity Amount</strong> 
              and see how much of it is <strong>Tax-Free</strong>.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <GratuityClient />

            {/* ✅ Live Rates (EPF/PPF Context) */}
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
                  href="/calculators/epf-calculator"
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
                  🏢 EPF Calc
                </Link>
                <Link
                  href="/calculators/retirement-calculator"
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
                  👴 Retire Calc
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="gratuity-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is Gratuity?</h2>
              <WikiText content={introContent} />

              <h3>Gratuity Calculation Formula</h3>
              <WikiText content={formulaContent} />

              <h3>Tax Rules for Gratuity (2025)</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee Category</th>
                      <th>Tax Exemption Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Government Employees</td>
                      <td>Fully Tax Exempt</td>
                    </tr>
                    <tr>
                      <td>Private (Covered by Act)</td>
                      <td>₹20 Lakhs</td>
                    </tr>
                    <tr>
                      <td>Private (Not Covered)</td>
                      <td>₹20 Lakhs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                <em>
                  Note: The limit was increased from ₹10 Lakhs to ₹20 Lakhs in
                  2018.
                </em>
              </p>

              <h3>Eligibility Rules</h3>
              <ul>
                <li>
                  <strong>Minimum Service:</strong> 5 Years.
                </li>
                <li>
                  <strong>Exceptions:</strong> The 5-year rule does not apply in
                  case of death or disablement of the employee. The nominee
                  receives the amount.
                </li>
              </ul>

              <h3>How to use this calculator?</h3>
              <ol>
                <li>
                  Enter your <strong>Basic Salary + DA</strong> (Do not include
                  HRA or other allowances).
                </li>
                <li>Enter total years of service.</li>
                <li>
                  Select if your company is covered under the Gratuity Act (Most
                  private companies are).
                </li>
                <li>Get the exact payout amount instantly.</li>
              </ol>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can my employer refuse to pay Gratuity?</summary>
                  <p>
                    If you have completed 5 years of service, your employer is
                    legally bound to pay gratuity. It cannot be denied unless
                    the employee has been terminated for &quot;riotous or
                    disorderly conduct&quot;.
                  </p>
                </details>
                <details>
                  <summary>Is gratuity part of CTC?</summary>
                  <p>
                    Yes, most companies include the gratuity component (approx
                    4.81% of Basic) in your Cost to Company (CTC) structure, but
                    it is paid out only upon exit after 5 years.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="gratuity-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
