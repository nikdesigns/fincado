import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'SIP vs FD: Which is Better in 2025? (Returns, Tax & Risk Analysis)',
  description:
    'SIP vs FD 2025: The ultimate comparison. See 10 & 20-year return differences, tax rules (new LTCG), inflation impact, and find out which investment builds more wealth for you.',
  keywords: [
    'SIP vs FD',
    'SIP vs Fixed Deposit',
    'mutual fund vs FD',
    'SIP returns vs FD returns',
    'inflation adjusted returns India',
    'SIP taxation 2025',
    'safe investment options India',
    'wealth creation strategy',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/sip-vs-fd',
  },
  openGraph: {
    title: 'SIP vs FD: The Battle for Your Savings (2025 Edition)',
    description:
      'Stop guessing. See the math. We compare Returns, Risk, and Taxes to help you decide.',
    url: 'https://www.fincado.com/guides/sip-vs-fd',
    type: 'article',
    images: [
      {
        url: 'https://www.fincado.com/images/og/sip-vs-fd.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function SipVsFdGuidePage() {
  return (
    <article className="article guide-body">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            '@id': 'https://www.fincado.com/guides/sip-vs-fd#article',
            headline:
              'SIP vs FD: Which is Better? Complete Analysis for Indian Investors 2025',
            description:
              'Detailed comparison of Systematic Investment Plans (SIP) and Fixed Deposits (FD) covering returns, risk, taxation, and inflation.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/guides/sip-vs-fd',
            },
            image: {
              '@type': 'ImageObject',
              url: 'https://www.fincado.com/images/og/sip-vs-fd.webp',
              width: 1200,
              height: 630,
            },
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
              url: 'https://www.fincado.com/about',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-18',
            dateModified: '2025-12-18',
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.fincado.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Guides',
                item: 'https://www.fincado.com/guides',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'SIP vs FD',
                item: 'https://www.fincado.com/guides/sip-vs-fd',
              },
            ],
          }),
        }}
      />
      {/* --- FAQ SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is SIP safer than FD?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. FD is a risk-free instrument backed by banks (and DICGC insurance up to ₹5 Lakh). SIP in equity mutual funds carries market risk, though it historically offers much higher returns over the long term (10+ years).',
                },
              },
              {
                '@type': 'Question',
                name: 'Can SIP beat inflation better than FD?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. FDs typically offer 6.5-7.5% returns, which barely matches inflation. Equity SIPs target 12-15% returns, providing a real positive return of 6-8% above inflation, making them superior for wealth creation.',
                },
              },
              {
                '@type': 'Question',
                name: 'How are SIP and FD taxed in 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FD interest is added to your income and taxed at your slab rate. Equity SIP gains >₹1.25 Lakh/year are taxed at 12.5% (LTCG). Generally, SIP is more tax-efficient for those in higher tax brackets (30%).',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I withdraw money from SIP anytime like FD?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, open-ended mutual fund SIPs are highly liquid and can be redeemed anytime without penalty (unlike FDs which often have a 1% premature withdrawal penalty). Money typically reaches your bank in 1-3 working days.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header
        style={{
          marginBottom: 32,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 24,
        }}
      >
        <span className="badge-flagship">Must Read</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(30px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
            color: 'var(--color-text-main)',
          }}
        >
          SIP vs FD in 2025: Returns, Tax, Risk & Wealth Comparison
        </h1>
        <div
          style={{
            fontSize: 14,
            color: 'var(--color-text-muted)',
            marginTop: 12,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span>
            Last Updated: <strong>Dec 18, 2025</strong>
          </span>
          <span>•</span>
          <span>12 Min Read</span>
          <span>•</span>
          <span style={{ color: 'var(--color-brand-green)' }}>Data-Backed</span>
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`The battle between <strong>Fixed Deposits (FD)</strong> and <strong>Systematic Investment Plans (SIP)</strong> is the classic debate of Safety vs. Growth. For generations, Indians have trusted FDs blindly. But with inflation rising and FD rates stagnating, is your money actually safe, or is it silently losing value?

In this comprehensive guide, we compare SIP and FD on returns, risk, tax efficiency, and liquidity to help you decide where to park your hard-earned money.`}
      />

      {/* --- AT A GLANCE TABLE --- */}
      <h3>At a Glance: The 10-Second Comparison</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Fixed Deposit (FD)</th>
              <th>Equity SIP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Primary Goal</strong>
              </td>
              <td>Capital Protection</td>
              <td>Wealth Creation</td>
            </tr>
            <tr>
              <td>
                <strong>Risk</strong>
              </td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                Low (Bank backed)
              </td>
              <td style={{ color: '#f97316' }}>Moderate to High</td>
            </tr>
            <tr>
              <td>
                <strong>Avg Returns</strong>
              </td>
              <td>6.5% - 7.5%</td>
              <td style={{ color: 'var(--color-brand-green)' }}>12% - 15%</td>
            </tr>
            <tr>
              <td>
                <strong>Inflation Beating?</strong>
              </td>
              <td style={{ color: '#dc2626' }}>No (Barely matches)</td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                Yes (Comfortably)
              </td>
            </tr>
            <tr>
              <td>
                <strong>Taxation</strong>
              </td>
              <td>Taxed at Slab (up to 30%)</td>
              <td>12.5% LTCG (Tax efficient)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-vs-1" type="leaderboard" />
      </div>

      {/* --- DEFINITIONS --- */}
      <h2 id="definitions">Understanding the Contenders</h2>

      <div
        className="compare-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          className="compare-card"
          style={{
            background: '#f8fafc',
            padding: 24,
            borderRadius: 12,
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>🏦 What is FD?</h3>
          <p style={{ fontSize: 15, lineHeight: 1.6 }}>
            A <strong>Fixed Deposit</strong> is a lump-sum investment with a
            bank for a fixed tenure at a fixed interest rate. It offers
            guaranteed returns and safety of principal.
          </p>
          <ul style={{ paddingLeft: 20, fontSize: 14 }}>
            <li>Guaranteed returns</li>
            <li>DICGC Insurance up to ₹5L</li>
            <li>Penalty on premature withdrawal</li>
          </ul>
        </div>
        <div
          className="compare-card"
          style={{
            background: '#f0fdf4',
            padding: 24,
            borderRadius: 12,
            border: '1px solid #bbf7d0',
          }}
        >
          <h3 style={{ marginTop: 0, color: '#15803d' }}>📈 What is SIP?</h3>
          <p style={{ fontSize: 15, lineHeight: 1.6 }}>
            <strong>SIP</strong> is a method of investing small amounts
            regularly in Mutual Funds. It leverages the power of the stock
            market to build wealth over time.
          </p>
          <ul style={{ paddingLeft: 20, fontSize: 14 }}>
            <li>Market-linked returns</li>
            <li>Rupee-cost averaging</li>
            <li>High liquidity (withdraw anytime)</li>
          </ul>
        </div>
      </div>

      {/* --- RETURNS BATTLE --- */}
      <h2 id="returns">The Returns Battle: 10 & 20 Year Data</h2>
      <p>
        Let&apos;s look at the numbers. We assume a monthly investment of{' '}
        <strong>₹10,000</strong>.
        <br />
        <em>
          (FD in this context refers to Recurring Deposit/RD for fair comparison
          of monthly outflow)
        </em>
      </p>

      {/* Image: Growth Graph */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/sip-vs-fd/sip-vs-fd-growth-graph.webp"
          alt="Graph comparing 20-year growth of SIP vs FD showing massive divergence"
          width={1200}
          height={600}
          className="guide-image"
        />
      </div>

      <h3>Scenario 1: 10-Year Horizon</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>FD / RD (7%)</th>
              <th>Equity SIP (12%)</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Invested</td>
              <td>₹12,00,000</td>
              <td>₹12,00,000</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Maturity Value</td>
              <td>₹17,30,000</td>
              <td>₹23,23,000</td>
              <td
                style={{
                  color: 'var(--color-brand-green)',
                  fontWeight: 'bold',
                }}
              >
                + ₹5.93 Lakh
              </td>
            </tr>
            <tr>
              <td>% Growth</td>
              <td>44%</td>
              <td>93%</td>
              <td>SIP Wins</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Scenario 2: 20-Year Horizon (The Power of Compounding)</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>FD / RD (7%)</th>
              <th>Equity SIP (12%)</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Invested</td>
              <td>₹24,00,000</td>
              <td>₹24,00,000</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Maturity Value</td>
              <td>₹52,00,000</td>
              <td>₹99,91,000</td>
              <td
                style={{
                  color: 'var(--color-brand-green)',
                  fontWeight: 'bold',
                }}
              >
                + ₹47.9 Lakh
              </td>
            </tr>
            <tr>
              <td>% Growth</td>
              <td>116%</td>
              <td>316%</td>
              <td>
                <strong>SIP Wins Big</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box update-box">
        <strong>The Wealth Gap:</strong> In 20 years, the difference isn&apos;t
        small. SIP creates <strong>double the wealth</strong> of an FD for the
        same investment amount. This is the cost of &quot;safety&quot;.
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-vs-2" type="leaderboard" />
      </div>

      {/* --- INFLATION --- */}
      <h2 id="inflation">Inflation: The Silent Killer of FDs</h2>
      <WikiText
        content={`<strong>Inflation</strong> is the rate at which money loses value (approx. 6% in India). If your investment return doesn't beat inflation significantly, you are technically getting poorer.`}
      />

      <h3>Real Rate of Return Calculation:</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Nominal Return</th>
              <th>Inflation</th>
              <th>Tax (30% slab)</th>
              <th>Real Return</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>FD</strong>
              </td>
              <td>7.0%</td>
              <td>6.0%</td>
              <td>2.1%</td>
              <td style={{ color: '#dc2626', fontWeight: 'bold' }}>
                -1.1% (Negative)
              </td>
            </tr>
            <tr>
              <td>
                <strong>SIP</strong>
              </td>
              <td>12.0%</td>
              <td>6.0%</td>
              <td>1.2% (approx)</td>
              <td
                style={{
                  color: 'var(--color-brand-green)',
                  fontWeight: 'bold',
                }}
              >
                +4.8% (Positive)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>Shocking Reality:</strong> If you are in the 30% tax bracket,
        investing in FD actually <strong>erodes your purchasing power</strong>.
        You can buy <em>less</em> with your maturity money than you can today.
      </p>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-vs-3" type="leaderboard" />
      </div>

      {/* --- RISK --- */}
      <h2 id="risk">Risk Assessment: Volatility vs. Safety</h2>
      <p>
        FDs are safe, but SIPs are not &quot;gambling&quot;. Understanding the
        nature of risk is key.
      </p>

      <h3>1. Market Volatility (SIP Risk)</h3>
      <p>
        SIPs invest in stocks, which go up and down daily.
        <br />
        <strong>Mitigation:</strong> Over 10+ years, the probability of negative
        returns in a diversified equity fund is <strong>zero</strong> (based on
        historical Nifty data). Short-term is risky; long-term is robust.
      </p>

      <h3>2. Opportunity Cost (FD Risk)</h3>
      <p>
        The risk of FD is not losing capital, but{' '}
        <strong>outliving your capital</strong>. Because FDs grow slowly, you
        risk running out of money in retirement due to inflation.
      </p>

      {/* --- TAXATION --- */}
      <h2 id="tax">Taxation Rules 2025: Why SIP Wins for High Earners</h2>

      {/* Image: Taxation Infographic */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/sip-vs-fd/sip-fd-taxation-comparison.webp"
          alt="Comparison of tax rates between FD and Equity Mutual Funds post-Budget 2024"
          width={1200}
          height={600}
          className="guide-image"
        />
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Fixed Deposit Tax</th>
              <th>Equity SIP Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Tax Rate</strong>
              </td>
              <td>Added to Income (Slab Rate)</td>
              <td>12.5% (LTCG) / 20% (STCG)</td>
            </tr>
            <tr>
              <td>
                <strong>Exemption</strong>
              </td>
              <td>None (TDS cuts above ₹40k)</td>
              <td>₹1.25 Lakh Profit FREE/year</td>
            </tr>
            <tr>
              <td>
                <strong>Impact on ₹5L Profit</strong>
              </td>
              <td>₹1,50,000 (30% slab)</td>
              <td>₹46,875 (12.5% on excess)</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Savings</strong>
              </td>
              <td>-</td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                Save ₹1 Lakh+
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Verdict:</strong> For anyone in the 20% or 30% tax bracket,
        <strong>Equity SIP is far more tax-efficient</strong>. You pay
        significantly less tax on gains compared to FD interest.
      </div>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-vs-4" type="leaderboard" />
      </div>

      {/* --- LIQUIDITY --- */}
      <h2 id="liquidity">Liquidity & Flexibility</h2>

      <h3>Fixed Deposit</h3>
      <ul>
        <li>
          ❌ <strong>Lock-in:</strong> Usually fixed tenure (1-5 years).
        </li>
        <li>
          ❌ <strong>Penalty:</strong> 0.5% to 1% penalty on interest if
          withdrawn early.
        </li>
        <li>
          ❌ <strong>Rigid:</strong> Cannot increase investment amount easily
          mid-tenure.
        </li>
      </ul>

      <h3>SIP (Open-Ended Funds)</h3>
      <ul>
        <li>
          ✅ <strong>No Lock-in:</strong> Withdraw anytime (money in bank in 2
          days).
        </li>
        <li>
          ✅ <strong>No Penalty:</strong> Exit load usually nil after 1 year.
        </li>
        <li>
          ✅ <strong>Flexible:</strong> Pause, stop, or increase SIP amount
          anytime via app.
        </li>
      </ul>

      {/* --- VERDICT --- */}
      <h2 id="verdict">Who Should Choose What?</h2>

      <div className="rejection-grid">
        <div className="rejection-card">
          <div className="rejection-title">Choose FD If...</div>
          <ul className="checklist" style={{ marginTop: 16 }}>
            <li>
              Need money in <strong>&lt; 3 years</strong> (e.g., Wedding next
              year)
            </li>
            <li>Absolutely zero risk tolerance</li>
            <li>Retired and need guaranteed monthly income</li>
            <li>Parking emergency fund</li>
          </ul>
        </div>

        <div
          className="rejection-card"
          style={{ borderLeft: '4px solid var(--color-brand-green)' }}
        >
          <div
            className="rejection-title"
            style={{ color: 'var(--color-brand-green)' }}
          >
            Choose SIP If...
          </div>
          <ul className="checklist" style={{ marginTop: 16 }}>
            <li>
              Goal is <strong>&gt; 5 years</strong> away (Retirement, Kids
              education)
            </li>
            <li>Want to beat inflation and build wealth</li>
            <li>In high tax bracket (20-30%)</li>
            <li>Can ignore short-term market noise</li>
          </ul>
        </div>
      </div>

      {/* 💰 AD SLOT 5 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-vs-5" type="leaderboard" />
      </div>

      {/* --- HYBRID STRATEGY --- */}
      <h2 id="hybrid">Smart Strategy: The Hybrid Approach</h2>
      <p>
        You don&apos;t have to choose just one. The best portfolio uses both:
      </p>

      <div className="example-box">
        <h3>💰 The Asset Allocation Rule</h3>
        <ul>
          <li>
            <strong>Emergency Fund (6 months expenses):</strong> Keep in FD /
            Sweep-in FD. (Safety First)
          </li>
          <li>
            <strong>Short Term Goals (1-3 yrs):</strong> Keep in FD or Debt
            Funds. (Stability)
          </li>
          <li>
            <strong>Long Term Goals (5y+):</strong> Put in Equity SIP. (Growth)
          </li>
        </ul>
      </div>

      {/* --- FAQS --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>Q1: Can SIP lose money?</summary>
          <p>
            Yes, in the short term (1-3 years), market volatility can lead to
            negative returns. However, over long periods (7-10+ years),
            diversified equity funds have historically never given negative
            returns in India.
          </p>
        </details>
        <details>
          <summary>Q2: Is FD interest tax-free up to ₹10,000?</summary>
          <p>
            No. Only Savings Account interest is tax-free up to ₹10,000 u/s
            80TTA. FD interest is fully taxable. However, banks only deduct TDS
            if interest exceeds ₹40,000 (or ₹50,000 for seniors), but you must
            still pay the tax while filing ITR.
          </p>
        </details>
        <details>
          <summary>Q3: Which SIP is best for beginners?</summary>
          <p>
            For beginners, an <strong>Index Fund SIP</strong> (Nifty 50) or a{' '}
            <strong>Flexi-Cap Fund</strong> is recommended. These are
            diversified and relatively safer within the equity category.
          </p>
        </details>
        <details>
          <summary>Q4: Can I switch from FD to SIP?</summary>
          <p>
            Yes. If you have a large FD, you can use a{' '}
            <strong>Systematic Transfer Plan (STP)</strong>. Break the FD, put
            it in a Liquid Fund, and transfer a fixed amount monthly to an
            Equity Fund to manage risk.
          </p>
        </details>
      </div>

      {/* 💰 AD SLOT 6 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-vs-6" type="leaderboard" />
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Conclusion: The Winner Is Clear</h2>
      <div className="conclusion-box">
        <p>
          FD is for <strong>preservation</strong>; SIP is for{' '}
          <strong>creation</strong>. If you want your money to just &quot;be
          safe&quot;, choose FD. But if you want to become wealthy, beat
          inflation, and achieve big financial goals,{' '}
          <strong>SIP is the undisputed king</strong>.
        </p>
        <h4>Your Action Plan:</h4>
        <ul className="checklist">
          <li>✅ Secure 6 months expenses in FD (Emergency Fund)</li>
          <li>✅ Start an SIP today for long-term goals</li>
          <li>✅ Don&apos;t look at SIP returns for the first 3 years</li>
          <li>✅ Review and step-up SIP annually</li>
        </ul>
      </div>

      {/* --- AUTHOR BOX --- */}
      <section className="author-box">
        <div className="author-row">
          <span className="author-label">Written By</span>
          <span className="author-name">Fincado Research Team</span>
        </div>
        <div className="author-row">
          <span className="author-label">Reviewed By</span>
          <span className="author-name">
            Certified Financial Planner (India)
            <span
              className="verified-icon"
              title="Verified Expert"
              style={{
                display: 'inline-flex',
                marginLeft: 6,
                background: 'var(--color-success-bg)',
                color: 'var(--color-brand-green)',
                width: 16,
                height: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontSize: 10,
              }}
            >
              ✓
            </span>
          </span>
        </div>
        <p className="author-disclaimer">
          Market data and tax rules updated as per Union Budget 2025.
        </p>
      </section>

      <p className="legal-disclaimer">
        Disclaimer: Mutual Fund investments are subject to market risks. Read
        all scheme related documents carefully. Past performance is not
        indicative of future returns.
      </p>

      {/* --- FINAL CTA --- */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Compare Your Own Numbers</h2>
          <p>
            Don&apos;t just take our word for it. Use our calculators to see the
            difference yourself.
          </p>
          <div className="final-cta-row">
            <Link href="/sip-calculator" className="primary-cta">
              SIP Calculator
            </Link>
            <Link href="/fd-calculator" className="secondary-cta">
              FD Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-vs-7" type="leaderboard" />
      </div>
    </article>
  );
}
