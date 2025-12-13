import type { Metadata } from 'next';
import React from 'react';
import SSYClient from './SSYClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'SSY Calculator – Sukanya Samriddhi Yojana Interest & Maturity',
  description:
    "Calculate the maturity amount for your daughter's Sukanya Samriddhi Yojana (SSY) account. Check interest earned, tax benefits, and yearly growth schedule.",
  keywords: [
    'SSY Calculator',
    'Sukanya Samriddhi Yojana Calculator',
    'SSY Interest Rate',
    'Girl Child Investment Plan',
    'Post Office SSY',
    'Tax Free Savings Scheme',
  ],
  openGraph: {
    title: "SSY Calculator – Secure Your Daughter's Future",
    description:
      'Free tool to calculate SSY maturity value with current government interest rates.',
    url: 'https://www.fincado.com/ssy-calculator',
    type: 'website',
  },
};

export default function SSYPage() {
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
                name: 'What is the current SSY interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The SSY interest rate is reviewed quarterly by the government. Currently, it is around 8.2% per annum, compounded annually.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the maturity period of SSY?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The SSY account matures after 21 years from the date of opening or when the girl child gets married after attaining 18 years of age.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is SSY tax-free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, SSY falls under the EEE (Exempt-Exempt-Exempt) category. Investment amount, interest earned, and maturity proceeds are all tax-free.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Sukanya Samriddhi Yojana (SSY) Calculator</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Secure your daughter's future with India's highest-return small
            savings scheme. Calculate the tax-free maturity amount for education
            or marriage.
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <SSYClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="ssy-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is SSY? */}
              <h2>What is Sukanya Samriddhi Yojana (SSY)?</h2>
              <p>
                **Sukanya Samriddhi Yojana (SSY)** is a government-backed
                savings scheme launched as part of the *Beti Bachao, Beti
                Padhao* campaign. It is designed exclusively for the girl child
                to build a corpus for her higher education and marriage
                expenses.
              </p>
              [Image of girl child education savings concept]
              {/* 2. Who is Eligible? */}
              <h3>Who Can Open an SSY Account?</h3>
              <ul>
                <li>
                  <strong>Girl Child:</strong> A parent or legal guardian can
                  open an account in the name of a girl child below the age of
                  10 years.
                </li>
                <li>
                  <strong>Limit:</strong> Only one account per girl child.
                  Maximum two accounts per family (exception for
                  twins/triplets).
                </li>
                <li>
                  <strong>Residency:</strong> The girl child must be an Indian
                  resident.
                </li>
              </ul>
              {/* 3. Planning Help */}
              <h3>How This Calculator Helps Your Planning</h3>
              <p>
                Since SSY involves a long 21-year tenure with changing deposit
                rules (15 years deposit, 6 years earning interest), manual
                calculation is complex.
              </p>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Maturity Estimate</h4>
                  <p>
                    Know exactly how much corpus will be available when your
                    daughter turns 21.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Deposit Planning</h4>
                  <p>
                    See how a small increase in monthly deposit (e.g., ₹2,000 to
                    ₹5,000) impacts the final amount exponentially.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Schedule View</h4>
                  <p>
                    Get a year-by-year breakdown of principal vs interest
                    accumulation.
                  </p>
                </div>
              </div>
              {/* 4. Formula */}
              <h3>SSY Interest Calculation Logic</h3>
              <p>
                Interest on SSY is calculated on the lowest balance between the
                5th and the last day of every month. However, it is compounded
                annually.
              </p>
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
                A = P(1 + r/n)^(nt)
              </div>
              <p style={{ fontSize: '14px', color: '#666' }}>
                <em>
                  *Applied annually. Deposits are made for 15 years, maturity is
                  at 21 years.
                </em>
              </p>
              {/* 5. Key Advantages */}
              <h3>Key Advantages of SSY</h3>
              <ul>
                <li>
                  <strong>Highest Interest Rate:</strong> SSY typically offers
                  higher returns than PPF and FDs.
                </li>
                <li>
                  <strong>Triple EEE Tax Benefit:</strong> Tax deduction on
                  investment (80C), tax-free interest, and tax-free maturity.
                </li>
                <li>
                  <strong>Lock-in Period:</strong> Ensures disciplined savings
                  for the specific goal of the girl child's future.
                </li>
              </ul>
            </article>

            {/* Smart Planning Stats */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Government Scheme"
                title="SSY Quick Facts"
                stats={[
                  { value: '8.2%', label: 'Current Interest Rate' },
                  { value: '21 Yrs', label: 'Maturity Period' },
                  { value: 'Tax Free', label: 'Returns & Maturity' },
                ]}
              />
            </div>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>How long do I need to deposit money?</summary>
                  <p>
                    You need to deposit money for the first{' '}
                    <strong>15 years</strong> from the date of account opening.
                    The account continues to earn interest until maturity (21
                    years).
                  </p>
                </details>
                <details>
                  <summary>
                    Can I withdraw money for my daughter's education?
                  </summary>
                  <p>
                    Yes. Partial withdrawal of up to 50% of the balance is
                    allowed for higher education expenses once the girl child
                    attains the age of 18 or passes the 10th standard.
                  </p>
                </details>
                <details>
                  <summary>What is the minimum and maximum deposit?</summary>
                  <p>
                    Minimum deposit is ₹250 per year. Maximum deposit is ₹1.5
                    Lakh per financial year.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="ssy-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
