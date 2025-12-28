import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import InlineSipCalculator from '@/components/InlineSipCalculator';
import FAQSchema from '@/components/FAQSchema';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'How much SIP for 1 Crore in 10 Years? (2025 Calculation)',
  description:
    'Want to build ₹1 Crore wealth in 10 years? See the exact monthly SIP required, step-up strategy, and best mutual funds to reach your goal by 2035.',
  keywords: [
    'SIP for 1 crore in 10 years',
    '1 crore sip calculator',
    'monthly investment for 1 crore',
    'SIP step up calculator',
    '1 crore in 10 years strategy',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'How much SIP is needed for ₹1 Crore in 10 Years?',
    description: 'The exact math to becoming a Crorepati in a decade.',
    images: [
      'https://www.fincado.com/images/guides/mf/mutual-fund-guide-hero.webp',
    ],
  },
  alternates: {
    canonical: 'https://www.fincado.com/guides/sip-for-1-crore-in-10-years',
  },
  openGraph: {
    title: 'How much SIP for 1 Crore in 10 Years? (2025 Guide)',
    description:
      'Detailed breakdown: Monthly SIP needed, Step-up strategy, and Asset allocation to hit ₹1 Crore.',
    url: 'https://www.fincado.com/guides/sip-for-1-crore-in-10-years',
    type: 'article',
    images: [
      {
        url: 'https://www.fincado.com/images/guides/mf/mutual-fund-guide-hero.webp',
        width: 1200,
        height: 600,
        alt: 'Roadmap to 1 Crore Wealth',
      },
    ],
  },
};

export default function Sip1Cr10YearsPage() {
  const pageTitle = 'How much SIP is needed for ₹1 Crore in 10 Years?';

  // --- FAQ DATA ---
  const faqData = [
    {
      question: 'Is ₹1 crore realistic in 10 years via SIP?',
      answer:
        'Yes, it is mathematically realistic but requires aggressive saving. You need to invest roughly ₹43,000/month at 12% returns. It is not magic; it is disciplined compounding.',
    },
    {
      question: 'What return rate is safe to assume for 10 years?',
      answer:
        'A 12% CAGR is a safe and conservative estimate for Equity Mutual Funds (Nifty 50 or Flexi Cap) over a 10-year horizon. While markets can give 15-18%, planning with 12% ensures you don’t fall short.',
    },
    {
      question: 'Is SIP better than Lump Sum for this goal?',
      answer:
        'For salary earners, SIP is far better because it instills discipline and uses "Rupee Cost Averaging" to lower your buying cost during market ups and downs. Lump sum is risky if deployed right before a crash.',
    },
    {
      question: 'What if the market crashes in the 5th or 8th year?',
      answer:
        'Market crashes are beneficial during the accumulation phase (years 1-8) because your SIP buys more units at cheap prices. If a crash happens in year 9 or 10, you should move your corpus to safer Debt funds (STP) to protect it.',
    },
    {
      question: 'Can I reach 1 Crore with less than ₹43k SIP?',
      answer:
        'Yes, using the Step-Up SIP method. If you start with ₹25,000/month and increase your investment by 15% every year (as your salary grows), you can still hit the ₹1 Crore target in 10 years.',
    },
  ];

  return (
    <article className="article guide-body">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: '1 Crore in 10 Years',
            url: 'https://www.fincado.com/guides/sip-for-1-crore-in-10-years',
          },
        ]}
      />

      {/* --- FAQ SCHEMA --- */}
      <FAQSchema faqs={faqData} />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            '@id':
              'https://www.fincado.com/guides/sip-for-1-crore-in-10-years#article',
            headline: pageTitle,
            description:
              'Detailed calculation and strategy to build a corpus of ₹1 Crore in 10 years using Mutual Funds.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                'https://www.fincado.com/guides/sip-for-1-crore-in-10-years',
            },
            image: [
              'https://www.fincado.com/images/guides/mf/mutual-fund-guide-hero.webp',
            ],
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              jobTitle: 'Investment Research Analysts',
              worksFor: {
                '@type': 'Organization',
                name: 'Fincado',
              },
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-28',
            dateModified: '2025-12-28',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header
        style={{
          marginBottom: 24,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 24,
        }}
      >
        <span className="badge-flagship">Wealth Strategy</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(30px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
            color: 'var(--color-text-main)',
          }}
        >
          {pageTitle}
        </h1>
        <div
          style={{
            fontSize: 14,
            color: 'var(--color-text-muted)',
            marginTop: 12,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span>
            Last Updated: <strong>Dec 28, 2025</strong>
          </span>
          <span>•</span>
          <span>8 Min Read</span>
          <span>•</span>
          <span style={{ color: 'var(--color-brand-green)' }}>
            Calculated @ 12% CAGR
          </span>
        </div>
      </header>

      {/* --- SHARE TOOLS --- */}
      <ShareTools title={pageTitle} />

      {/* --- HERO IMAGE --- */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/mf/mutual-fund-guide-hero.webp"
          alt="Roadmap to 1 Crore Wealth"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
        <p className="caption-text">
          Achieving ₹1 Crore in 10 years requires a disciplined roadmap.
        </p>
      </div>

      {/* --- INTRO --- */}
      <WikiText
        content={`Building a corpus of ₹1 Crore is the definitive financial milestone for millions of Indian investors. Achieving this in <strong>10 years</strong> is an aggressive goal that requires discipline, the right asset allocation, and a substantial monthly investment.`}
      />

      <p className="freshness-note">
        <strong>Updated for 2025:</strong> All calculations use current market
        return assumptions and SIP norms applicable for Indian investors.
      </p>

      {/* --- THE DIRECT ANSWER (Callout) --- */}
      <div className="short-answer-box">
        <h3>The Short Answer</h3>
        <p>
          To reach <strong>₹1 Crore in 10 Years</strong>, assuming a 12% annual
          return from equity mutual funds, you need to start a monthly SIP of
          roughly <strong>₹43,041</strong>.
        </p>
        <InlineSipCalculator />

        <div className="methodology-box">
          <h4>How this SIP amount was calculated</h4>
          <p>
            The SIP amount shown above is calculated using the standard SIP
            future value formula, assuming monthly investments, a 12% annualized
            return compounded monthly, and a total investment period of 120
            months (10 years). The return assumption aligns with long-term Nifty
            50 and diversified equity fund performance in India.
          </p>
        </div>
        <Link
          href="/sip-calculator"
          className="secondary-cta"
          style={{ fontSize: '14px', padding: '10px 20px', marginTop: '16px' }}
        >
          Check Your Own Goal →
        </Link>
      </div>

      <p>
        Does ₹43,000 sound too high? Don&apos;t worry. In this guide, we will
        analyze the math behind this number and show you a{' '}
        <strong>&quot;Step-Up Strategy&quot;</strong> to reach the same goal
        starting with a much smaller amount.
      </p>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-1cr-1" type="leaderboard" />
      </div>

      {/* --- THE MATH SECTION --- */}
      <h2 id="the-math">The Math: How ₹43k Becomes ₹1 Crore</h2>
      <p>
        When you invest for 10 years, you rely heavily on your principal
        contribution because the compounding effect (interest on interest)
        typically explodes <em>after</em> the 10th year.
      </p>

      {/* --- COMPOUNDING GRAPH --- */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/sip/power-of-compounding-graph.webp"
          alt="Graph showing power of compounding over time"
          width={1200}
          height={600}
          className="guide-image"
        />
        <p className="caption-text">
          Notice how the wealth curve steepens over time. In a 10-year period,
          your contribution matters as much as the returns.
        </p>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Target Amount</strong>
              </td>
              <td>₹1,00,00,000 (1 Crore)</td>
            </tr>
            <tr>
              <td>
                <strong>Time Period</strong>
              </td>
              <td>10 Years (120 Months)</td>
            </tr>
            <tr>
              <td>
                <strong>Expected Return</strong>
              </td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                12% (Equity Benchmark)
              </td>
            </tr>
            <tr>
              <td>
                <strong>Monthly SIP</strong>
              </td>
              <td>
                <strong>₹43,041</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Total Invested</strong>
              </td>
              <td>₹51.6 Lakhs</td>
            </tr>
            <tr>
              <td>
                <strong>Wealth Gained</strong>
              </td>
              <td>₹48.4 Lakhs</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- COMPARISON TABLE --- */}
      <h2 id="time-comparison">Is ₹43k Too High? The Cost of Delay</h2>
      <p>
        If ₹43,000 strains your budget, look at how drastically the required
        amount drops if you just add a few more years to your timeline.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Time Period</th>
              <th>Monthly SIP Needed</th>
              <th>Total You Invest</th>
              <th>Ease Factor</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: '#fff7ed' }}>
              <td>
                <strong>10 Years</strong>
              </td>
              <td>
                <strong>₹43,041</strong>
              </td>
              <td>₹51.6 Lakhs</td>
              <td style={{ color: '#ea580c' }}>Hard / Aggressive</td>
            </tr>
            <tr>
              <td>
                <strong>15 Years</strong>
              </td>
              <td>
                <strong>₹19,819</strong>
              </td>
              <td>₹35.6 Lakhs</td>
              <td style={{ color: 'var(--color-brand-green)' }}>Moderate</td>
            </tr>
            <tr>
              <td>
                <strong>20 Years</strong>
              </td>
              <td>
                <strong>₹10,009</strong>
              </td>
              <td>₹24.0 Lakhs</td>
              <td style={{ color: 'var(--color-brand-green)' }}>Easy</td>
            </tr>
            <tr>
              <td>
                <strong>25 Years</strong>
              </td>
              <td>
                <strong>₹5,270</strong>
              </td>
              <td>₹15.8 Lakhs</td>
              <td style={{ color: 'var(--color-brand-green)' }}>Very Easy</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-1cr-2" type="leaderboard" />
      </div>

      {/* --- STEP-UP STRATEGY --- */}
      <h2 id="step-up-strategy">
        Can&apos;t Afford ₹43k? Use the &quot;Step-Up&quot; Trick
      </h2>
      <p>
        Most people cannot start with ₹43,000 immediately. The solution is a{' '}
        <strong>Step-Up SIP</strong>. Start small, and increase your SIP amount
        by 10-15% every year as your salary grows.
      </p>

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/sip/step-up-strategy.webp" // ⚠️ Check if file exists in /public/images/guides/sip/
          alt="Visualizing Step-Up SIP Strategy"
          width={1200}
          height={600}
          className="guide-image"
        />
        <p className="caption-text">
          A step-up strategy allows you to start lower and catch up as your
          income grows.
        </p>
      </div>

      <p>
        <strong>
          The Strategy to reach ₹1 Crore in 10 Years (starting smaller):
        </strong>
      </p>

      <ul className="checklist">
        <li>
          <strong>Starting SIP:</strong> ₹25,000 / month
        </li>
        <li>
          <strong>Annual Step-Up:</strong> 15% increase per year
        </li>
        <li>
          <strong>Expected Return:</strong> 12%
        </li>
      </ul>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Monthly SIP</th>
              <th>Year End Corpus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Year 1</td>
              <td>₹25,000</td>
              <td>₹3.2 Lakhs</td>
            </tr>
            <tr>
              <td>Year 3</td>
              <td>₹33,063</td>
              <td>₹12.5 Lakhs</td>
            </tr>
            <tr>
              <td>Year 5</td>
              <td>₹43,725</td>
              <td>₹28.4 Lakhs</td>
            </tr>
            <tr>
              <td>Year 8</td>
              <td>₹66,480</td>
              <td>₹65.8 Lakhs</td>
            </tr>
            <tr>
              <td>
                <strong>Year 10</strong>
              </td>
              <td>
                <strong>₹87,900</strong>
              </td>
              <td>
                <strong>₹1.03 Crore</strong> ✅
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- ASSET ALLOCATION --- */}
      <h2 id="where-to-invest">Where Should You Invest for this Goal?</h2>
      <p>
        For a 10-year horizon, inflation is your enemy. Fixed Deposits (FDs)
        offering 6-7% returns will require you to invest over{' '}
        <strong>₹60,000/month</strong> to reach ₹1 Crore. Equity is
        non-negotiable here.
      </p>
      <p>
        If you also want to save taxes while investing, consider{' '}
        <Link href="/guides/elss-funds-guide-2025" className="internal-link">
          ELSS Mutual Funds
        </Link>{' '}
        which offer tax benefits under Section 80C along with equity growth.
      </p>

      <div className="strategy-grid">
        <div className="strategy-card">
          <h4>Aggressive Portfolio</h4>
          <p style={{ fontSize: '14px', margin: 0 }}>
            <span className="highlight-green">Aim: 14-15% Return</span>
            <br />
            <br />
            • 40% Mid Cap Funds
            <br />
            • 30% Small Cap Funds
            <br />
            • 30% Flexi Cap Funds
            <br />
            <br />
            <em>
              Risk: High volatility, but higher chance of hitting 1Cr early.
            </em>
          </p>
        </div>
        <div className="strategy-card">
          <h4>Balanced Portfolio (Recommended)</h4>
          <p style={{ fontSize: '14px', margin: 0 }}>
            <span className="highlight-green">Aim: 12% Return</span>
            <br />
            <br />
            • 50% Nifty 50 Index Fund
            <br />
            • 30% Flexi Cap Fund
            <br />
            • 20% Mid Cap Fund
            <br />
            <br />
            <em>Risk: Moderate. Stable growth with market alignment.</em>
          </p>
        </div>
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-1cr-3" type="leaderboard" />
      </div>

      {/* --- MISTAKES --- */}
      <h2 id="common-mistakes">3 Mistakes That Kill the 1 Crore Dream</h2>
      <div className="rejection-grid">
        <div className="rejection-card">
          <div className="rejection-title">1. Pausing During Corrections</div>
          <p className="rejection-desc">
            In 10 years, the market will crash at least twice. Stopping SIP then
            kills your accumulation phase.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Continue (or double) SIP during crashes.
          </div>
        </div>
        <div className="rejection-card">
          <div className="rejection-title">2. Ignoring Inflation</div>
          <p className="rejection-desc">
            ₹1 Crore in 10 years will feel like ~₹55 Lakhs today due to 6%
            inflation.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Aim for ₹1.5 Crore if possible.
          </div>
        </div>
        <div className="rejection-card">
          <div className="rejection-title">3. Too Many Funds</div>
          <p className="rejection-desc">
            Buying 10 different funds dilutes your returns. You only need 3 good
            funds.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Stick to 1 Index + 1 Flexi + 1 Midcap.
          </div>
        </div>
      </div>

      {/* --- FREQUENTLY ASKED QUESTIONS --- */}
      <h2 id="faqs">Frequently Asked Questions</h2>
      <div className="faqs-accordion">
        {faqData.map((faq, index) => (
          <details key={index}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Conclusion: Start Your Journey Today</h2>
      <div className="conclusion-box">
        <p>
          Reaching ₹1 Crore in 10 years is challenging but mathematically
          possible. It requires a SIP of ₹43,000 (or ₹25,000 with step-ups). The
          most important factor is not the amount, but the{' '}
          <strong>start date</strong>.
        </p>
        <h4>Your Action Plan:</h4>
        <ul className="checklist">
          <li>
            <strong>Audit your expenses</strong> to find investible surplus.
          </li>
          <li>
            <strong>Start a SIP</strong> of at least ₹20,000 - ₹25,000
            immediately.
          </li>
          <li>
            <strong>Automate</strong> a 10-15% annual increase in contribution.
          </li>
          <li>
            <strong>Ignore short-term volatility</strong>; focus on the 2035
            goal.
          </li>
        </ul>
      </div>

      {/* --- AUTHOR BIO --- */}
      <AuthorBio />

      {/* --- FINAL CTA --- */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Calculate Your Own Path to 1 Crore</h2>
          <p>
            Want to see how much YOU need to save based on your current age? Use
            our free calculator to customize the numbers.
          </p>
          <div className="final-cta-row">
            <Link href="/sip-calculator" className="primary-cta">
              Open SIP Calculator
            </Link>
            <Link href="/mutual-funds" className="secondary-cta">
              See Top Funds
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
