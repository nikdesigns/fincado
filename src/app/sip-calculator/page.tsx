// src/app/sip-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import SIPClient from './SIPClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'SIP Calculator – Calculate Mutual Fund Returns & Growth',
  description:
    'Calculate the future value of your monthly SIPs with our Mutual Fund SIP Calculator. Check returns, CAGR, and plan for financial goals like retirement or education.',
  keywords: [
    'SIP Calculator',
    'Mutual Fund Calculator',
    'Systematic Investment Plan',
    'SIP Return Calculator',
    'Investment Planner India',
    'CAGR Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/sip-calculator',
  },
  openGraph: {
    title: 'SIP Calculator – The Power of Compounding',
    description:
      'Visualize how small monthly investments grow into a large corpus over time.',
    url: 'https://www.fincado.com/sip-calculator',
    type: 'website',
  },
};

export default function SIPPage() {
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
                name: 'What is Rupee Cost Averaging?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Rupee Cost Averaging is a strategy where you invest a fixed amount regularly. You buy more units when markets are low and fewer when markets are high, averaging out the cost of your investment over time.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I change my SIP amount later?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, most "Step-up SIP" options allow you to increase your investment amount annually. Alternatively, you can start a fresh SIP with a new amount.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are SIP returns taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. For Equity funds, gains withdrawn before 1 year are taxed at 15% (STCG). Gains above ₹1 Lakh withdrawn after 1 year are taxed at 10% (LTCG).',
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
              name: 'SIP Calculator',
              url: 'https://www.fincado.com/sip-calculator',
            },
          ]}
        />
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>SIP Calculator — Plan Your Wealth Creation</h1>
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              See the magic of compounding. Calculate how your small monthly
              investments grow over time and plan for your dream goals.
              <strong> Accurate. Free. No Login Required.</strong>
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <SIPClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="sip-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT (Hidden in Print) --- */}
            <article className="article content-for-seo no-print">
              {/* 1. What is SIP? */}
              <h2>What is a Systematic Investment Plan (SIP)?</h2>

              <WikiText
                content={`
                  <p>
                    A <strong>SIP (Systematic Investment Plan)</strong> is a disciplined way of investing money
                    in <strong>Mutual Funds</strong>. Instead of a lump sum, you invest a fixed
                    amount at regular intervals (monthly or quarterly).
                  </p>
                  <p>
                    It is similar to a <strong>Recurring Deposit (RD)</strong> but invests in
                    market-linked instruments (Equity/Debt) to generate potentially
                    higher returns over the long term. It relies on the power of
                    <strong>Compounding</strong> to grow your wealth.
                  </p>
                `}
              />

              {/* 2. Who Can Invest? */}
              <h3>Who Can Invest in SIP?</h3>
              <WikiText
                content={`
                  <p>
                    Unlike loans, there are no strict eligibility criteria based on
                    income or credit score. Any individual can start a SIP if they
                    meet these basic requirements:
                  </p>
                  <ul>
                    <li>
                      <strong>KYC Compliant:</strong> You must have a PAN Card and
                      be KYC verified.
                    </li>
                    <li>
                      <strong>Bank Account:</strong> An active savings account is
                      needed for auto-debit mandates.
                    </li>
                    <li>
                      <strong>Minimum Age:</strong> Anyone above 18 years can
                      invest. Parents can also invest in the name of a minor.
                    </li>
                  </ul>
                `}
              />

              {/* 3. Calculator Help */}
              <h3>How This Calculator Helps Your Wealth Planning</h3>
              <WikiText
                content={`
                  <p>
                    Investing without a target is like driving without a
                    destination. This calculator helps you Visualize Growth and check the
                    impact of <strong>Inflation</strong>.
                  </p>
                `}
              />

              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Visualize Growth</h4>
                  <p>
                    See how a small ₹5,000 monthly investment can grow into
                    Crores over 20-30 years due to compounding.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Goal Mapping</h4>
                  <p>
                    Reverse calculate: Input your target corpus (e.g., ₹1 Crore
                    for retirement) to find out the monthly SIP required today.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Check Inflation Impact</h4>
                  <p>
                    Understand the &quot;Real Value&quot; of your returns. ₹10
                    Lakhs today will not buy the same things 10 years from now.
                  </p>
                </div>
              </div>

              {/* 4. Formula */}
              <h3>SIP Calculation Formula</h3>
              <WikiText
                content={`
                  <p>
                    The calculator uses the standard Future Value of Annuity
                    formula. SIPs are typically calculated as an "Annuity
                    Due" because payments are made at the start of the period.
                  </p>
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
                FV = P × [ (1 + i)ⁿ - 1 ] / i × (1 + i)
              </div>
              <WikiText
                content={`
                <ul style="font-size: 14px;">
                  <li>
                    <strong>FV</strong> = Future Value (Maturity Amount)
                  </li>
                  <li>
                    <strong>P</strong> = Monthly SIP Amount
                  </li>
                  <li>
                    <strong>i</strong> = Monthly Interest Rate (Annual Rate / 12 /
                    100)
                  </li>
                  <li>
                    <strong>n</strong> = Total number of months
                  </li>
                </ul>
              `}
              />

              {/* 5. Key Advantages */}
              <h3>Key Advantages of SIP</h3>

              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Rupee Cost Averaging:</strong> You buy more units when
                      the market is low and fewer when high, automatically averaging
                      your purchase cost.
                    </li>
                    <li>
                      <strong>Disciplined Savings:</strong> Auto-debit ensures you
                      save first and spend later.
                    </li>
                    <li>
                      <strong>Flexibility:</strong> You can pause, stop, or increase
                      (step-up) your investment amount anytime.
                    </li>
                    <li>
                      <strong>Power of Compounding:</strong> Returns earned on your
                      returns accelerate wealth creation over time.
                    </li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can I withdraw my SIP money anytime?</summary>
                  <p>
                    Yes, for open-ended mutual funds, you can withdraw anytime.
                    However, <strong>ELSS (Tax Saving)</strong> funds have a
                    3-year lock-in period.
                  </p>
                </details>
                <details>
                  <summary>
                    What happens if I miss a monthly installment?
                  </summary>
                  <p>
                    Nothing major. The bank may charge a small penalty for
                    insufficient funds (NACH bounce), but your SIP will not be
                    cancelled. It will continue from the next month.
                  </p>
                </details>
                <details>
                  <summary>Which date is best for SIP?</summary>
                  <p>
                    Historically, the date of the month has negligible impact on
                    long-term returns. It is best to choose a date shortly after
                    your salary credit date (e.g., 5th or 7th) to ensure
                    discipline.
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
              <AdSlot id="sip-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
