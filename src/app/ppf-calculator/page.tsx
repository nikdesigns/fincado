import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import PPFClient from './PPFClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'PPF Calculator 2025 – Public Provident Fund Interest & Maturity',
  description:
    'Calculate PPF maturity amount, interest earned, and tax-free returns. Check current interest rates, loan against PPF rules, and withdrawal limits.',
  keywords: [
    'PPF Calculator',
    'Public Provident Fund Calculator',
    'PPF Interest Rate 2025',
    'Tax Free Investment',
    'Section 80C Investment',
    'PPF Maturity Calculator',
    'Post Office PPF Scheme',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/ppf-calculator',
  },
  openGraph: {
    title: 'PPF Calculator – Tax-Free Wealth Builder',
    description:
      'Free tool to calculate PPF returns with yearly compounding and tax-benefit analysis.',
    url: 'https://www.fincado.com/ppf-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function PPFPage() {
  const introContent = autoLinkContent(`
    <p>
      The <strong>Public Provident Fund (PPF)</strong> is a long-term savings scheme backed by the 
      Government of India. It allows you to build a retirement corpus while saving on taxes.
    </p>
    <p>
      It is one of the few investment options that fall under the <strong>EEE (Exempt-Exempt-Exempt)</strong> 
      category, meaning your investment, interest earned, and maturity amount are all <strong>100% Tax-Free</strong>.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul>
      <li><strong>Resident Individuals:</strong> Any Indian resident can open a PPF account.</li>
      <li><strong>Minors:</strong> Parents can open an account on behalf of a minor child.</li>
      <li><strong>Restrictions:</strong> <strong>NRIs</strong> and <strong>HUFs</strong> cannot open new PPF accounts. However, existing NRI accounts can continue until maturity.</li>
    </ul>
  `);

  const loanContent = autoLinkContent(`
    <p>
      You can take a loan against your PPF balance from the <strong>3rd to the 6th financial year</strong>. 
      The loan interest rate is usually <strong>1% higher</strong> than the prevailing PPF interest rate. 
      From the 7th year onwards, you become eligible for partial withdrawals instead of loans.
    </p>
  `);

  const extensionContent = autoLinkContent(`
    <p>
      After the mandatory 15-year lock-in, you can extend your PPF account in blocks of <strong>5 years</strong>. 
      You have two options:
    </p>
    <ul>
      <li><strong>Extension with Contribution:</strong> Continue depositing money and earning interest. (Requires Form-H submission).</li>
      <li><strong>Extension without Contribution:</strong> Stop depositing but keep the balance in the account to earn interest.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="PPF Calculator"
        description="Calculate Public Provident Fund (PPF) maturity amount, interest earned, and tax-free returns over 15 years."
        url="https://www.fincado.com/ppf-calculator"
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
                name: 'What is the current PPF interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The PPF interest rate is determined by the Central Government every quarter. Currently, it is around 7.1% per annum, compounded annually.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is PPF interest taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. PPF falls under the "EEE" (Exempt-Exempt-Exempt) category. The principal investment, the interest earned, and the maturity amount are all completely tax-free.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the lock-in period for PPF?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The mandatory lock-in period for a PPF account is 15 years. Partial withdrawals are allowed from the 7th year onwards under specific conditions.',
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
              name: 'PPF Calculator',
              url: 'https://www.fincado.com/ppf-calculator',
            },
          ]}
        />

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/ppf-calculator" />
          <h1>PPF Calculator — Public Provident Fund</h1>
          <ShareTools title="PPF Calculator — Public Provident Fund" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="ppf-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Build a tax-free retirement corpus. Calculate your PPF maturity
              value and see the power of compounding over 15 years.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <PPFClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="ppf-after-calc" type="banner" />
            </div>

            <LiveRateTable type="fixedDeposit" />

            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                Compare Savings
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/calculators/fd-calculator"
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
                  🏦 FD Returns
                </Link>
                <Link
                  href="/calculators/sukanya-samriddhi-yojana-calculator"
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
                  👧 SSY Calculator
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
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Safe Investment Strategy
                </strong>
                <Link
                  href="/guides/ppf-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read: How to Maximize PPF Returns →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is the Public Provident Fund (PPF)?</h2>
              <WikiText content={introContent} />

              <h3>Who Can Open a PPF Account?</h3>
              <WikiText content={eligibilityContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>PPF vs FD vs ELSS: Quick Comparison</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>PPF</th>
                      <th>Bank FD</th>
                      <th>ELSS Mutual Fund</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Returns</strong>
                      </td>
                      <td>~7.1% (Guaranteed)</td>
                      <td>6.5% - 7.5%</td>
                      <td>12% - 15% (Market Linked)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax Status</strong>
                      </td>
                      <td>EEE (Tax Free)</td>
                      <td>Fully Taxable</td>
                      <td>LTCG Tax (12.5%)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Lock-in</strong>
                      </td>
                      <td>15 Years</td>
                      <td>7 Days - 10 Years</td>
                      <td>3 Years</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Risk</strong>
                      </td>
                      <td>Zero Risk (Govt Backed)</td>
                      <td>Low Risk</td>
                      <td>High Risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Loan Against PPF & Partial Withdrawals</h3>
              <WikiText content={loanContent} />

              <h3>Extension Rules (After 15 Years)</h3>
              <WikiText content={extensionContent} />

              <h3>PPF Calculation Formula</h3>
              <p>
                The interest on PPF is compounded annually. The formula is
                similar to the Future Value of an Annuity:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="A = P \times \left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>A</strong>: Maturity Amount</li>
                    <li><strong>P</strong>: Annual Installment</li>
                    <li><strong>i</strong>: Annual Interest Rate</li>
                    <li><strong>n</strong>: Tenure (15 to 50 years)</li>
                  </ul>
                `}
              />

              <h3>Key Advantages of PPF</h3>
              <WikiText
                content={`
                  <ul>
                    <li><strong>EEE Tax Status:</strong> No tax on investment, interest, or withdrawal.</li>
                    <li><strong>Sovereign Guarantee:</strong> 100% capital safety backed by Govt of India.</li>
                    <li><strong>Protection from Attachment:</strong> Cannot be claimed by creditors/courts to pay off debts.</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>
                    Can I withdraw money from PPF before 15 years?
                  </summary>
                  <p>
                    Partial withdrawals are allowed from the 7th financial year
                    onwards. You can withdraw up to 50% of the balance at the
                    end of the 4th preceding year.
                  </p>
                </details>
                <details>
                  <summary>What happens if I miss a yearly deposit?</summary>
                  <p>
                    The account becomes &quot;inactive&quot;. To reactivate it,
                    you must pay a penalty of ₹50 per year along with the
                    minimum subscription of ₹500 per year.
                  </p>
                </details>
                <details>
                  <summary>Can I extend my PPF account after 15 years?</summary>
                  <p>
                    Yes. You can extend the account indefinitely in blocks of 5
                    years. You must submit Form H within one year of maturity to
                    extend &quot;with contribution&quot;.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="ppf-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
