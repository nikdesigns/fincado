// src/app/apy-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import APYClient from './APYClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'APY Calculator – Atal Pension Yojana Scheme Calculator',
  description:
    'Calculate your monthly contribution for Atal Pension Yojana (APY). Check guaranteed pension amount, total investment, and return to nominee.',
  keywords: [
    'APY Calculator',
    'Atal Pension Yojana Calculator',
    'APY Chart',
    'Pension Scheme for Unorganized Sector',
    'Government Pension Scheme',
    'APY Contribution Chart',
  ],
  openGraph: {
    title: 'APY Calculator – Guaranteed Pension for Life',
    description:
      'Free tool to calculate APY contributions based on age and desired pension amount.',
    url: 'https://www.fincado.com/apy-calculator',
    type: 'website',
  },
};

export default function APYPage() {
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
                name: 'What is the age limit for APY?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Any Indian citizen between the age of 18 and 40 years can join the Atal Pension Yojana scheme.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the pension amount guaranteed?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, the pension amount (₹1,000 to ₹5,000) is guaranteed by the Government of India.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can income tax payers join APY?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Effective from October 1, 2022, any citizen who is or has been an income tax payer is not eligible to join APY.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Atal Pension Yojana (APY) Calculator</h1>
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Secure your old age with a guaranteed government pension. Calculate
              your monthly contribution based on your age and desired pension
              amount.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <APYClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="apy-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is APY? */}
              <h2>What is Atal Pension Yojana (APY)?</h2>

              <p>
                <strong>Atal Pension Yojana (APY)</strong> is a social security
                scheme launched by the Government of India to provide a defined
                pension to workers in the unorganized sector.
              </p>
              <p>
                It offers a minimum guaranteed pension ranging from ₹1,000 to
                ₹5,000 per month starting at age 60, depending on the
                subscriber&apos;s contribution.
              </p>

              {/* 2. Who is Eligible? */}
              <h3>Who Can Subscribe to APY?</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Age:</strong> Must be between 18 and 40 years.
                    </li>
                    <li>
                      <strong>Citizenship:</strong> Must be an Indian citizen.
                    </li>
                    <li>
                      <strong>Bank Account:</strong> Must have a valid savings bank
                      account or post office savings account.
                    </li>
                    <li>
                      <strong>Tax Status:</strong> Should NOT be an income tax payer
                      (as of Oct 1, 2022).
                    </li>
                  </ul>
                `}
              />

              {/* 3. Planning Help */}
              <h3>How This Calculator Helps Your Planning</h3>
              <WikiText
                content={`
                  <p>
                    APY contributions depend heavily on your entry age. The earlier you join,
                    the lower your monthly outflow.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Contribution Check</h4>
                  <p>
                    Find out exactly how much will be deducted from your bank
                    account monthly based on your entry age.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Total Investment</h4>
                  <p>
                    See the total amount you will invest over 20-40 years versus
                    the corpus returned to your nominee.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Pension Selection</h4>
                  <p>
                    Compare the cost difference between opting for a ₹2,000
                    pension vs a ₹5,000 pension.
                  </p>
                </div>
              </div>

              {/* 4. Formula/Logic */}
              <h3>How APY Contributions are Determined</h3>
              <WikiText
                content={`
                  <p>
                    APY is a <strong>Defined Benefit</strong> scheme. The contribution amounts
                    are fixed actuarially based on:
                  </p>
                  <ul>
                    <li>
                      <strong>Entry Age:</strong> Younger applicants pay less
                      because their money compounds for longer.
                    </li>
                    <li>
                      <strong>Pension Slab:</strong> Higher pension (e.g., ₹5,000)
                      requires higher contribution.
                    </li>
                    <li>
                      <strong>Frequency:</strong> You can pay Monthly, Quarterly, or
                      Half-Yearly.
                    </li>
                  </ul>
                `}
              />

              <div
                style={{
                  background: '#f1f5f9',
                  padding: '16px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  marginBottom: '20px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                Vesting Age = 60 Years
              </div>

              {/* 5. Key Advantages */}
              <h3>Benefits of APY</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Guaranteed Pension:</strong> The government guarantees
                      the pension amount. If actual returns are lower, the
                      government bridges the gap.
                    </li>
                    <li>
                      <strong>Spouse Benefit:</strong> The same pension is paid to
                      the spouse after the subscriber's death.
                    </li>
                    <li>
                      <strong>Corpus to Nominee:</strong> After the death of both
                      subscriber and spouse, the accumulated corpus (up to ₹8.5
                      Lakhs) is returned to the nominee.
                    </li>
                    <li>
                      <strong>Tax Benefit:</strong> Contributions are eligible for
                      tax deduction under <strong>Section 80CCD(1)</strong>.
                    </li>
                  </ul>
                `}
              />
            </article>

            {/* Smart Planning Stats */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Social Security"
                title="APY Quick Facts"
                stats={[
                  { value: '18-40', label: 'Entry Age' },
                  { value: '₹5,000', label: 'Max Monthly Pension' },
                  { value: 'Govt', label: 'Backed Guarantee' },
                ]}
              />
            </div>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>
                    What happens if I stop paying contributions?
                  </summary>
                  <p>
                    The account will eventually be closed, and the accumulated
                    corpus (contributions + interest) will be returned to you.
                    However, deductions/penalties may apply for maintenance
                    charges.
                  </p>
                </details>
                <details>
                  <summary>Can I increase my pension amount later?</summary>
                  <p>
                    Yes, you can upgrade to a higher pension slab (e.g., from
                    ₹1,000 to ₹5,000) once in a financial year by paying the
                    differential contribution amount.
                  </p>
                </details>
                <details>
                  <summary>Is there a penalty for delayed payment?</summary>
                  <p>
                    Yes, banks charge a small penalty (₹1 to ₹10 per month) for
                    delayed contributions.
                  </p>
                </details>
              </div>
            </section>

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="apy-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
