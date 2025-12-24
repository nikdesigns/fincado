import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CompoundInterestClient from '@/app/compound-interest-calculator/CompoundInterestClient';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import { autoLinkContent } from '@/utils/autoLinker';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Compound Interest Calculator 2025 – The Power of Compounding',
  description:
    'Calculate compound interest with yearly, half-yearly, quarterly, or monthly frequency. See how your money grows over time with the power of compounding.',
  keywords: [
    'Compound Interest Calculator',
    'Compound Interest Formula',
    'Future Value Calculator',
    'Power of Compounding',
    'Investment Growth Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/compound-interest-calculator/',
  },
  openGraph: {
    title: 'Compound Interest Calculator – Watch Your Money Grow',
    description:
      'Free tool to calculate maturity amount with compound interest formula.',
    url: 'https://www.fincado.com/compound-interest-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function CompoundInterestPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Compound Interest</strong> is often called the "eighth wonder of the world". Unlike 
      Simple Interest, where you earn interest only on the principal, Compound Interest allows you 
      to earn <strong>interest on interest</strong>.
    </p>
    <p>
      This compounding effect causes your wealth to grow exponentially over time, making it the 
      most powerful concept in finance and investing.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Compound Interest Calculator"
        description="Calculate the future value of an investment with compound interest."
        url="https://www.fincado.com/compound-interest-calculator/"
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
                name: 'What is the Compound Interest Formula?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A = P(1 + r/n)^(nt), where P is principal, r is rate, n is compounding frequency, and t is time in years.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is it different from Simple Interest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'In Simple Interest, you earn interest only on the initial principal. In Compound Interest, the interest earned is added back to the principal, so you earn interest on that too.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the Rule of 72?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the interest rate to get the years. Example: 72 / 12% = 6 Years.',
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
              name: 'Compound Interest',
              url: 'https://www.fincado.com/compound-interest-calculator/',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Compound Interest Calculator</h1>
          <ShareTools title="Compound Interest Calculator" />
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Calculate the future value of your investments with monthly, quarterly, or yearly compounding. 
              Visualize the magic of exponential growth.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <CompoundInterestClient />

            {/* ✅ Live Rates (FD/RD Context) */}
            <LiveRateTable type="fixedDeposit" />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="ci-mid-content" type="leaderboard" />
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is Compound Interest?</h2>
              <WikiText content={introContent} />

              <h3>The Formula Explained</h3>
              <p>
                The mathematical formula used to calculate the final amount (A)
                is:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{nt}" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>P</strong>: Principal Amount (Initial Investment)</li>
                    <li><strong>r</strong>: Annual Interest Rate (decimal, e.g., 0.10 for 10%)</li>
                    <li><strong>n</strong>: Number of times interest is compounded per year</li>
                    <li><strong>t</strong>: Time period in years</li>
                  </ul>
                `}
              />

              <h3>Compounding Frequency Explained</h3>
              <p>
                The frequency at which interest is added to your account
                matters. The more frequent the compounding, the higher the
                returns.
              </p>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Frequency</th>
                      <th>n value</th>
                      <th>Example Investment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Yearly</td>
                      <td>1</td>
                      <td>PPF, EPF (Calculated monthly but credited yearly)</td>
                    </tr>
                    <tr>
                      <td>Half-Yearly</td>
                      <td>2</td>
                      <td>Some Corporate Bonds</td>
                    </tr>
                    <tr>
                      <td>Quarterly</td>
                      <td>4</td>
                      <td>Bank Fixed Deposits (FD)</td>
                    </tr>
                    <tr>
                      <td>Monthly</td>
                      <td>12</td>
                      <td>Savings Account (Daily balance, Monthly credit)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>The Power of Compounding Example</h3>
              <p>
                Let&apos;s say you invest <strong>₹1 Lakh</strong> for{' '}
                <strong>10 Years</strong> at <strong>10%</strong> returns.
              </p>
              <ul>
                <li>
                  <strong>Simple Interest:</strong> You earn ₹10,000 every year.
                  Total Interest = ₹1 Lakh. Final Amount = ₹2 Lakhs.
                </li>
                <li>
                  <strong>Compound Interest:</strong> The interest earns more
                  interest. Final Amount = <strong>₹2.59 Lakhs</strong>.
                </li>
              </ul>
              <p>
                That extra <strong>₹59,000</strong> is purely due to the magic
                of compounding!
              </p>

              <h3>Related Calculators</h3>
              <ul>
                <li>
                  <Link href="/calculators/sip-calculator">SIP Calculator</Link>
                </li>
                <li>
                  <Link href="/calculators/fd-calculator">
                    Fixed Deposit Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/ppf-calculator">PPF Calculator</Link>
                </li>
              </ul>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Which investments offer compound interest?</summary>
                  <p>
                    Almost all growth-oriented investments use compounding.
                    Examples include Fixed Deposits (Quarterly), Mutual Funds
                    (Growth Plan), PPF (Yearly), and EPF.
                  </p>
                </details>
                <details>
                  <summary>How can I maximize compounding?</summary>
                  <p>
                    1. <strong>Start Early:</strong> Time is the most important
                    factor.
                    <br />
                    2. <strong>Stay Invested:</strong> Don&apos;t withdraw
                    interest; let it grow.
                    <br />
                    3. <strong>Increase Frequency:</strong> Monthly compounding
                    yields more than yearly.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="ci-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
