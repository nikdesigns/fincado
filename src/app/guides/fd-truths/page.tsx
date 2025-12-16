import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Fixed Deposit Guide 2025: Interest, Tax, and Hidden Risks',
  description:
    'FDs are popular but misunderstood. Learn about FD interest calculation, tax rules, real vs nominal returns, and when FDs are good vs bad for your wealth.',
  keywords: [
    'fixed deposit guide India',
    'FD interest calculation',
    'FD tax rules 2025',
    'FD vs inflation',
    'senior citizen FD rates',
    'is FD safe',
    'FD return calculator',
    'real return on FD',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/fd-truths',
  },
  openGraph: {
    title: 'The Real Truth About Fixed Deposits: Safe or Wealth Destroyer?',
    description:
      'Discover the hidden impact of inflation and tax on your FD returns. A complete guide for smart savers.',
    url: 'https://www.fincado.com/guides/fd-truths',
    type: 'article',
  },
};

export default function FdGuidePage() {
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
            '@id': 'https://www.fincado.com/guides/fd-truths#article',
            headline:
              'Fixed Deposit Guide (FD Truths): The Real Story Behind "Safe" Returns',
            description:
              'Complete guide to Fixed Deposits in India covering interest calculation, taxation, inflation impact, and strategic use cases.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/guides/fd-truths',
            },
            image: {
              '@type': 'ImageObject',
              url: 'https://www.fincado.com/images/og/fd-truths.webp',
              width: 1200,
              height: 630,
            },
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-22',
            dateModified: '2025-12-22',
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
                name: 'Fixed Deposit Guide',
                item: 'https://www.fincado.com/guides/fd-truths',
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
                name: 'Is FD interest taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, FD interest is fully taxable at your income tax slab rate. Banks also deduct TDS if interest exceeds a certain threshold (₹40,000 (₹50,000 for senior citizens), subject to change by the government.).',
                },
              },
              {
                '@type': 'Question',
                name: 'Does FD beat inflation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Often, no. After accounting for tax and inflation, real returns on FDs are frequently close to zero or negative, especially for those in higher tax brackets.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between cumulative and non-cumulative FD?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'In cumulative FDs, interest is reinvested and paid at maturity (compounding effect). In non-cumulative FDs, interest is paid out regularly (monthly/quarterly) for income.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do senior citizens get extra interest on FD?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, most banks offer 0.25% to 0.75% extra interest rate on FDs for senior citizens compared to general public rates.',
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
        <span className="badge-flagship">Investment Guide</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(30px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
            color: 'var(--color-text-main)',
          }}
        >
          Fixed Deposit Guide (FD Truths): The Real Story Behind
          &quot;Safe&quot; Returns
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
            Last Updated: <strong>Dec 22, 2025</strong>
          </span>
          <span>•</span>
          <span>12 Min Read</span>
          <span>•</span>
          <span style={{ color: 'var(--color-brand-green)' }}>Data-Backed</span>
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`Fixed deposits (FDs) are the most popular investment for Indian savers, yet most people misunderstand how much they actually earn after inflation and tax. This single-page guide breaks down FD interest, tax rules, senior citizen benefits, and when FDs are genuinely good—or quietly destroying your wealth.`}
      />

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-fd-1" type="leaderboard" />
      </div>

      <hr className="divider" />

      {/* --- INTEREST CALCULATION --- */}
      <h2 id="interest-calculation">FD Interest Calculation</h2>
      <p>
        FDs offer a fixed rate of interest for a fixed tenure, making them
        simple to understand but also easy to overestimate in terms of returns.
      </p>

      <h3>Simple vs compound interest in FDs</h3>
      <p>
        Most bank FDs use <strong>compound interest</strong>, not simple
        interest. In simple interest, interest is calculated only on the
        principal. In compound interest, interest is calculated on principal
        plus accumulated interest at regular intervals (quarterly, half-yearly,
        or yearly).
      </p>

      <div className="formula-box">
        <p>
          <strong>Simple interest formula:</strong> Interest = P × R × T
        </p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          (P = principal, R = annual rate, T = time in years)
        </p>
        <br />
        <p>
          <strong>Compound interest formula (annual):</strong> A = P × (1 + R/n)
          <sup>nT</sup>
        </p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          (A = maturity amount, n = compounding periods/year)
        </p>
      </div>

      <h3>Example: Regular FD calculation</h3>
      <div className="example-box">
        <h4>Suppose:</h4>
        <ul className="checklist" style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>
            <strong>Principal:</strong> ₹5,00,000
          </li>
          <li>
            <strong>Interest rate:</strong> 7% per annum
          </li>
          <li>
            <strong>Tenure:</strong> 5 years
          </li>
          <li>
            <strong>Compounding:</strong> Quarterly (n = 4)
          </li>
        </ul>
        <div
          style={{
            background: '#fff',
            padding: 12,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <p>
            <strong>Approximate Outcome:</strong>
          </p>
          <ul>
            <li>
              Effective rate is slightly higher than 7% due to quarterly
              compounding.
            </li>
            <li>
              Maturity amount will be significantly higher than simple interest
              calculation.
            </li>
            <li>
              Approximate maturity (varies by bank & compounding method):{' '}
              <strong>~₹7.0–7.1 Lakh.</strong>.
            </li>
          </ul>
        </div>
      </div>

      <p>Banks usually provide:</p>
      <ul>
        <li>FD calculator on their website</li>
        <li>Quarterly/half-yearly/yearly compounding details</li>
        <li>Exact maturity value and total interest at the time of booking</li>
      </ul>

      <h3>Cumulative vs non-cumulative FDs</h3>
      <ul>
        <li>
          <strong>Cumulative FD:</strong> Interest is reinvested and paid at
          maturity. Best for long-term compounding.
        </li>
        <li>
          <strong>Non-cumulative FD:</strong> Interest is paid out monthly,
          quarterly, etc. Best for regular income (e.g., retirees).
        </li>
      </ul>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-fd-2" type="rectangle" />
      </div>

      <hr className="divider" />

      {/* --- FD VS INFLATION --- */}
      <h2 id="fd-vs-inflation">FD vs Inflation</h2>
      <p>
        FDs feel &quot;safe&quot; because the number in your bank account always
        goes up. The hidden danger is that <strong>purchasing power</strong> may
        actually be going down.
      </p>

      {/* Image of Real vs Nominal Return Graph */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/fd/real-vs-nominal-return.webp"
          alt="Graph comparing nominal FD returns vs real returns adjusted for inflation"
          width={1200}
          height={600}
          className="guide-image"
        />
      </div>

      <h3>Nominal vs real return</h3>
      <ul>
        <li>
          <strong>Nominal return:</strong> The % you see advertised (e.g., 7%
          per annum).
        </li>
        <li>
          <strong>Real return:</strong> The return after adjusting for
          inflation.
        </li>
      </ul>

      <div className="formula-box">
        <strong>Real Return ≈ Nominal Return − Inflation Rate</strong>
      </div>

      <div className="example-box">
        <h3>Example: The Inflation Trap</h3>
        <p>
          <strong>Scenario:</strong> FD rate 7% | Inflation 6%
        </p>
        <p>
          <strong>Real Return ≈ 7% − 6% = 1%</strong>
        </p>
        <p>
          Your money is effectively growing only about 1% in terms of actual
          purchasing power.
        </p>
      </div>

      <h3>When inflation beats your FD</h3>
      <p>
        If FD rate is 6% and inflation is 7%, your real return is{' '}
        <strong>−1%</strong>. This means you are{' '}
        <strong>losing purchasing power</strong> every year, even though your FD
        amount is increasing.
      </p>
      <p>
        Over long periods (10–20 years), this effect becomes massive. Prices of
        essentials rise faster than many FD rates. You may feel &quot;rich&quot;
        because your FD is larger, but it buys less than what a smaller amount
        could buy today.
      </p>

      <div className="callout-box warning-box">
        <strong>Key Insight:</strong> FDs protect your{' '}
        <strong>capital amount</strong> (assuming no bank default), but they do{' '}
        <strong>not guarantee protection against inflation</strong>.
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-fd-3" type="banner" />
      </div>

      <hr className="divider" />

      {/* --- FD TAX RULES --- */}
      <h2 id="tax-rules">FD Tax Rules</h2>
      <p>
        FD returns often look attractive on paper until you factor in{' '}
        <strong>income tax</strong>. FD interest is fully taxable, which can
        significantly reduce your effective return.
      </p>

      <h3>How FD interest is taxed</h3>
      <ul>
        <li>
          Interest earned on FDs is added to your{' '}
          <strong>total taxable income</strong> under &quot;Income from Other
          Sources&quot;.
        </li>
        <li>
          It is taxed at your <strong>slab rate</strong> (5%, 10%, 20%, 30% +
          cess).
        </li>
        <li>
          There is <strong>no special lower tax rate</strong> for FD interest
          like there might be for some capital gains.
        </li>
      </ul>

      <h3>TDS (Tax Deducted at Source) on FDs</h3>
      <p>
        Banks deduct TDS on FD interest if it crosses the prescribed annual
        threshold with that bank.
      </p>
      <ul>
        <li>
          If interest exceeds threshold, TDS is deducted (usually 10% with PAN).
        </li>
        <li>
          If your tax slab is higher than 10%, you must pay{' '}
          <strong>additional tax</strong> while filing returns.
        </li>
        <li>
          If income is below taxable limit, submit forms (15G/15H) to avoid TDS.
        </li>
      </ul>

      <h3>Post-tax FD return example</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FD Rate</td>
              <td>7%</td>
            </tr>
            <tr>
              <td>Tax Slab</td>
              <td>30%</td>
            </tr>
            <tr>
              <td>Tax on Interest</td>
              <td>2.1% (30% of 7%)</td>
            </tr>
            <tr>
              <td>
                <strong>Post-Tax Return</strong>
              </td>
              <td>
                <strong>4.9%</strong>
              </td>
            </tr>
            <tr>
              <td>Inflation</td>
              <td>6%</td>
            </tr>
            <tr>
              <td>
                <strong>Real Return</strong>
              </td>
              <td style={{ color: '#dc2626', fontWeight: 'bold' }}>
                -1.1% (Negative!)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        So a &quot;7% FD&quot; at 30% tax slab and 6% inflation is actually
        giving you <strong>negative real returns</strong>.
      </p>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-fd-4" type="rectangle" />
      </div>

      <hr className="divider" />

      {/* --- SENIOR CITIZENS --- */}
      <h2 id="senior-citizens">Senior Citizen FD Benefits</h2>
      <p>
        For senior citizens, FDs can still be meaningful because banks and the
        government offer special benefits designed to boost income security.
      </p>

      <h3>Higher interest rates</h3>
      <p>
        Most banks offer <strong>higher FD interest rates</strong> for senior
        citizens (commonly +0.25% to +0.75% over regular rates).
      </p>
      <p>
        For example: Regular FD rate 7% → Senior rate 7.5%. That extra 0.5% can
        meaningfully increase monthly income for retirees.
      </p>

      <h3>Special senior citizen schemes</h3>
      <p>
        Government-backed options like{' '}
        <strong>Senior Citizens&apos; Savings Scheme (SCSS)</strong> provide:
      </p>
      <ul>
        <li>Higher interest than normal FDs</li>
        <li>Fixed lock-in periods</li>
        <li>Quarterly interest payouts</li>
        <li>Specific tax rules and limits</li>
      </ul>

      <h3>Tax aspects for senior citizens</h3>
      <ul>
        <li>
          Senior citizens may enjoy{' '}
          <strong>higher basic exemption limits</strong>.
        </li>
        <li>
          Deductions on interest income (e.g., Section 80TTB) allow tax-free
          interest up to specific limits.
        </li>
        <li>
          Forms like 15H can help avoid TDS if total income is below taxable
          limits.
        </li>
      </ul>

      {/* 💰 AD SLOT 5 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-fd-5" type="banner" />
      </div>

      <hr className="divider" />

      {/* --- WHEN FD IS GOOD --- */}
      <h2 id="when-good">When FD Is Good</h2>
      <p>
        FDs are not useless—they just need to be used for the{' '}
        <strong>right goals</strong> and <strong>time frames</strong>.
      </p>

      <div className="checklist-box">
        <h3>1. Short-term parking (1–3 years)</h3>
        <p>
          Perfect for emergency funds, planned expenses (tuition, car), or money
          needing stability. Priority is{' '}
          <strong>capital safety and liquidity</strong>.
        </p>

        <h3>2. Risk-averse investors</h3>
        <p>
          Ideal for those with low risk tolerance who prefer guaranteed returns
          over market volatility.
        </p>

        <h3>3. Retirees needing stable income</h3>
        <p>
          FDs offer regular payouts and can be laddered to manage interest rate
          risk. They form a core &quot;income bucket&quot;.
        </p>

        <h3>4. Diversification</h3>
        <p>
          Even for aggressive investors, FDs act as a stability anchor to reduce
          overall portfolio volatility.
        </p>
      </div>

      {/* 💰 AD SLOT 6 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-fd-6" type="rectangle" />
      </div>

      <hr className="divider" />

      {/* --- WHEN FD IS BAD --- */}
      <h2 id="when-bad">When FD Is Bad</h2>
      <p>
        The biggest myths around FDs arise when they are treated as
        one-size-fits-all solutions. There are clear situations where FDs are a
        bad choice.
      </p>

      <div className="rejection-grid">
        <div className="rejection-card">
          <div className="rejection-title">1. Long-term Wealth Creation</div>
          <p>
            For goals 10+ years away (retirement, child education), FDs barely
            beat inflation post-tax. The opportunity cost vs equity is huge.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">2. High Tax Slab Investors</div>
          <p>
            If you pay 30% tax, FD returns drop drastically (often below
            inflation). Tax-efficient alternatives are usually better.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">3. Locked Emergency Funds</div>
          <p>
            Locking emergency funds in long-term FDs with penalties defeats the
            purpose. Keep them accessible.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">4. Blind Auto-Renewal</div>
          <p>
            Renewing FDs without checking rates or goals leads to money stuck in
            low-growth assets for decades.
          </p>
        </div>
      </div>

      {/* 💰 AD SLOT 7 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-fd-7" type="banner" />
      </div>

      <hr className="divider" />

      {/* --- CONCLUSION --- */}
      <h2>FD Truths: How to Use Them Smartly</h2>
      <div className="conclusion-box">
        <p>
          To make FDs work <strong>for you</strong> instead of against you,
          remember these core truths:
        </p>
        <ul className="checklist">
          <li>
            ✅ FDs are tools for <strong>safety and stability</strong>, not
            wealth creation.
          </li>
          <li>
            ✅ Always think in terms of <strong>real return</strong> (after tax
            & inflation).
          </li>
          <li>
            ✅ Senior citizens benefit more due to higher rates and tax breaks.
          </li>
          <li>✅ Use FDs for short-term goals and emergency buffers.</li>
          <li>
            ✅ Combine FDs with growth assets like equity for a balanced
            portfolio.
          </li>
        </ul>
        <p>
          When used intentionally, FDs are a valuable part of your financial
          toolkit. Assign them the right role: capital protection and stability.
        </p>
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
          Interest rates and tax rules are subject to change. Always verify
          current bank rates before investing.
        </p>
      </section>

      <p className="legal-disclaimer">
        Disclaimer: This content is for educational purposes only and does not
        constitute financial advice.
      </p>

      {/* --- FINAL CTA --- */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Check Your FD Returns Instantly</h2>
          <p>
            Use our free calculator to see maturity amounts and compare with
            other investments.
          </p>
          <div className="final-cta-row">
            <Link href="/fd-calculator" className="primary-cta">
              FD Calculator
            </Link>
            <Link href="/sip-calculator" className="secondary-cta">
              Compare with SIP
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
