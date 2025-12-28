import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SIPClient from './SIPClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
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
  title:
    'SIP Calculator 2025 – Calculate Mutual Fund Returns (Inflation Adjusted)',
  description:
    'Calculate future value of monthly SIPs with our Mutual Fund Calculator. Check returns with inflation adjustment, tax implications (LTCG), and step-up growth.',
  keywords: [
    'SIP Calculator',
    'Mutual Fund Calculator',
    'Systematic Investment Plan',
    'SIP Return Calculator',
    'Inflation Adjusted SIP Calculator',
    'SIP Tax Calculator',
    'LTCG Tax on SIP',
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

/* ---------------- PAGE ---------------- */

export default function SIPPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Systematic Investment Plan (SIP)</strong> is a disciplined method of investing in 
      <strong>Mutual Funds</strong>. It allows you to invest a fixed amount regularly (monthly or quarterly), 
      helping you build wealth over the long term through the power of compounding.
    </p>
    <p>
      SIPs work on the principle of <strong>Rupee Cost Averaging</strong>—you buy more units when the market 
      is low and fewer units when the market is high, averaging out your cost of investment.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <p>
      Unlike loans, there are no strict eligibility criteria based on income or credit score. 
      Any individual can start a SIP if they meet these basic requirements:
    </p>
    <ul>
      <li><strong>KYC Compliant:</strong> You must have a PAN Card and be KYC verified.</li>
      <li><strong>Bank Account:</strong> An active savings account is needed for auto-debit mandates.</li>
      <li><strong>Minimum Age:</strong> Anyone above 18 years can invest. Parents can also invest in the name of a minor.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      SIP returns are taxed based on the type of mutual fund (Equity vs Debt) and the holding period. 
      For <strong>Equity Mutual Funds</strong> (holding > 65% in stocks):
    </p>
    <ul>
      <li><strong>Short Term (STCG):</strong> If sold before 1 year, gains are taxed at 20%.</li>
      <li><strong>Long Term (LTCG):</strong> If sold after 1 year, gains above ₹1.25 Lakh/year are taxed at 12.5%.</li>
    </ul>
  `);

  const advantagesContent = autoLinkContent(`
    <ul>
      <li><strong>Rupee Cost Averaging:</strong> Automatically buy low and sell high.</li>
      <li><strong>Disciplined Savings:</strong> Auto-debit ensures you save first, spend later.</li>
      <li><strong>Flexibility:</strong> You can pause, stop, or increase (step-up) your investment amount anytime.</li>
      <li><strong>Power of Compounding:</strong> Returns earned on your returns accelerate wealth creation over time.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="SIP Calculator India"
        description="Free SIP Calculator to estimate returns on your Systematic Investment Plan (SIP) with inflation adjustment."
        url="https://www.fincado.com/sip-calculator"
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
                name: 'What is Rupee Cost Averaging?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Rupee Cost Averaging is a strategy where you invest a fixed amount regularly. You buy more units when markets are low and fewer when markets are high, averaging out the cost of your investment over time.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does inflation affect my SIP returns?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Inflation reduces the purchasing power of your future wealth. A ₹1 Crore corpus in 20 years might only be worth ₹40 Lakhs in today\'s value. Use our calculator to see "Real Returns".',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I increase my SIP amount later?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, this is called a Step-up SIP. Increasing your SIP amount by just 10% every year can double your final corpus compared to a fixed SIP.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are SIP returns taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. For Equity funds, gains withdrawn before 1 year are taxed at 20% (STCG). Gains above ₹1.25 Lakh withdrawn after 1 year are taxed at 12.5% (LTCG).',
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

        <header style={{ marginBottom: 32 }} className="no-print">
          <LanguageToggle path="/hi/sip-calculator" />
          <h1>SIP Calculator — Plan Your Wealth Creation</h1>
          <ShareTools title="SIP Calculator" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="sip-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              See the magic of compounding. Calculate how your small monthly
              investments grow over time and plan for your dream goals.
              <strong> Accurate. Free. Inflation Adjusted.</strong>
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SIPClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="sip-after-calc" type="banner" />
            </div>

            {/* Mobile-Only Related Tools */}
            <div
              className="mobile-only-suggestions"
              style={{ marginTop: 32, marginBottom: 32 }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
                More Investment Tools
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <Link
                  href="/step-up-sip-calculator"
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
                  📈 Step-up SIP
                </Link>
                <Link
                  href="/lumpsum-calculator"
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
                  💰 Lumpsum Calc
                </Link>
              </div>
            </div>

            {/* Promo Box */}
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
              <span style={{ fontSize: '24px' }}>🏆</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Where to invest in 2025?
                </strong>
                <Link
                  href="/guides/sip-investment-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read our Guide: Best SIP Investment Strategies →
                </Link>
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print">
              <h2>What is a Systematic Investment Plan (SIP)?</h2>
              <WikiText content={introContent} />

              <h3>Who Can Invest in SIP?</h3>
              <WikiText content={eligibilityContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

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

              <h3>Taxation on SIP Returns (Updated 2025)</h3>
              <WikiText content={taxContent} />

              <h3>SIP Calculation Formula</h3>
              <WikiText
                content={`
                   <p>
                     The calculator uses the Future Value of Annuity formula. 
                     SIPs are calculated as an "Annuity Due" because payments are made at the start of the period.
                   </p>
                 `}
              />

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="FV = P \times \frac{(1 + i)^n - 1}{i} \times (1 + i)" />
              </div>

              <WikiText
                content={`
                  <ul style="font-size: 14px;">
                    <li><strong>FV</strong>: Future Value</li>
                    <li><strong>P</strong>: Monthly Investment Amount</li>
                    <li><strong>i</strong>: Monthly Rate (Annual Rate ÷ 1200)</li>
                    <li><strong>n</strong>: Total Months</li>
                  </ul>
                `}
              />

              <h3>Key Advantages of SIP</h3>
              <WikiText content={advantagesContent} />
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
                <details>
                  <summary>What is Step-Up SIP?</summary>
                  <p>
                    A strategy where you increase your SIP amount every year
                    (e.g., by 10%) as your income grows. This significantly
                    boosts your final corpus.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="sip-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
