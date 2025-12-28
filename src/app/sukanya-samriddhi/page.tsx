import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SSYClient from './SSYClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Comparison context
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
  title: 'SSY Calculator 2025 – Sukanya Samriddhi Maturity Value',
  description:
    "Calculate the maturity amount for your daughter's SSY account. Check 2025 interest rates (8.2%), tax benefits (EEE), and yearly growth schedule.",
  keywords: [
    'SSY Calculator',
    'Sukanya Samriddhi Yojana Calculator',
    'SSY Interest Rate 2025',
    'Girl Child Investment Plan',
    'Post Office SSY',
    'SSY vs PPF',
    'Tax Free Savings Scheme',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/sukanya-samriddhi/',
  },
  openGraph: {
    title: "SSY Calculator – Secure Your Daughter's Future",
    description:
      'Free tool to calculate SSY maturity value with current government interest rates.',
    url: 'https://www.fincado.com/sukanya-samriddhi/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function SSYPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>Sukanya Samriddhi Yojana (SSY)</strong> is a government-backed savings scheme launched 
      as part of the <em>Beti Bachao, Beti Padhao</em> campaign. It is designed exclusively for the 
      girl child to build a corpus for her higher education and marriage expenses.
    </p>
    <p>
      It offers the <strong>highest interest rate</strong> among all small savings schemes and falls under 
      the <strong>EEE (Exempt-Exempt-Exempt)</strong> tax category, making it the best investment 
      for your daughter's future.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul>
      <li><strong>Girl Child:</strong> Account can be opened in the name of a girl child below 10 years of age.</li>
      <li><strong>Limit:</strong> Only one account per girl child. Maximum two accounts per family (exception for twins/triplets).</li>
      <li><strong>Min/Max Deposit:</strong> Minimum ₹250/year and Maximum ₹1.5 Lakh/year.</li>
    </ul>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      <strong>Partial Withdrawal:</strong> You can withdraw up to 50% of the balance for the girl's 
      higher education once she turns 18 or passes 10th standard.
    </p>
    <p>
      <strong>Full Maturity:</strong> The account matures 21 years after opening. However, it can be 
      closed earlier if the girl gets married after turning 18.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Sukanya Samriddhi Yojana Calculator"
        description="Calculate the maturity amount for your daughter's SSY account based on current government interest rates."
        url="https://www.fincado.com/sukanya-samriddhi/"
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
                  text: 'The SSY account matures after 21 years from the date of opening. However, you only need to deposit money for the first 15 years.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is SSY tax-free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, SSY falls under the EEE (Exempt-Exempt-Exempt) category. Investment amount (80C), interest earned, and maturity proceeds are all tax-free.',
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
              name: 'SSY Calculator',
              url: 'https://www.fincado.com/sukanya-samriddhi/',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/sukanya-samriddhi/" />
          <h1>Sukanya Samriddhi Yojana (SSY) Calculator</h1>
          <ShareTools title="Sukanya Samriddhi Yojana (SSY) Calculator" />
          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="ssy-top" type="leaderboard" />
          </div>
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Secure your daughter&apos;s future with India&apos;s highest-return
              small savings scheme. Calculate the tax-free maturity amount for
              education or marriage.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SSYClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="ssy-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (PPF vs SSY Comparison Context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Related Calculators
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
                  🏦 PPF Calculator
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
                  📈 Children&apos;s Fund
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
              <span style={{ fontSize: '24px' }}>👧</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Best Plan for Girl Child?
                </strong>
                <Link
                  href="/guides/ssy-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: SSY vs Mutual Funds Comparison →
                </Link>
              </div>
            </div>

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="ssy-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is Sukanya Samriddhi Yojana (SSY)?</h2>
              <WikiText content={introContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Who Can Open an Account?</h3>
              <WikiText content={eligibilityContent} />

              <h3>SSY vs PPF: Which is Better?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Sukanya Samriddhi (SSY)</th>
                      <th>Public Provident Fund (PPF)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Interest Rate</strong>
                      </td>
                      <td>~8.2% (Higher)</td>
                      <td>~7.1%</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Eligibility</strong>
                      </td>
                      <td>Girl Child only (Below 10)</td>
                      <td>Anyone</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tenure</strong>
                      </td>
                      <td>21 Years</td>
                      <td>15 Years</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Deposit Period</strong>
                      </td>
                      <td>15 Years</td>
                      <td>15 Years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Withdrawal & Maturity Rules</h3>
              <WikiText content={withdrawalContent} />

              <h3>How This Calculator Helps Your Planning</h3>
              <WikiText
                content={`
                  <p>
                    Since SSY involves a long 21-year tenure with changing deposit rules 
                    (you pay for 15 years, but earn interest for 21 years), manual calculation is complex.
                  </p>
                `}
              />

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

              <h3>SSY Interest Calculation Logic</h3>
              <p>
                Interest on SSY is compounded annually. The balance earns
                interest at the end of every financial year.
              </p>

              {/* ✅ Professional Math Block */}
              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="A = P(1 + \frac{r}{100})^n" />
              </div>

              <WikiText
                content={`
                <p style="font-size: 14px; color: #666;">
                  <em>*Note: P is the accumulated principal + interest from previous years.</em>
                </p>
              `}
              />

              <h3>Key Advantages of SSY</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>Highest Interest Rate:</strong> Offers better returns than PPF and FDs.</li>
                    <li><strong>Triple EEE Tax Benefit:</strong> No tax on entry, growth, or exit.</li>
                    <li><strong>Sovereign Guarantee:</strong> 100% capital safety backed by the Government.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>How long do I need to deposit money?</summary>
                  <p>
                    You need to deposit money for the first{' '}
                    <strong>15 years</strong> from the date of account opening.
                    The account continues to earn interest without deposits for
                    the remaining 6 years until maturity (Total 21 years).
                  </p>
                </details>
                <details>
                  <summary>
                    Can I withdraw money for my daughter&apos;s education?
                  </summary>
                  <p>
                    Yes. Partial withdrawal of up to 50% of the balance is
                    allowed for higher education expenses once the girl child
                    attains the age of 18 or passes the 10th standard.
                  </p>
                </details>
                <details>
                  <summary>
                    What happens if the girl gets married before 21?
                  </summary>
                  <p>
                    If the girl child turns 18 and gets married, the SSY account
                    can be closed prematurely. No interest is credited after the
                    date of marriage.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="ssy-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
