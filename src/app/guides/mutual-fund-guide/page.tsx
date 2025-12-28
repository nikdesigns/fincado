import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Direct vs Regular MF: Save 1% & Earn ₹25L More',
  description:
    'Direct vs regular mutual funds: Learn how 1% expense ratio costs ₹25-50 lakh over 20 years. Switch guide, best direct MF platforms & index vs active funds.',
  keywords: [
    'direct vs regular mutual fund',
    'expense ratio impact calculator',
    'switch regular to direct mf',
    'zerodha coin vs groww vs paytm money',
    'index funds vs active funds',
    'best direct mutual fund app india',
  ],
  openGraph: {
    title: 'Direct vs Regular Mutual Funds: How to Save 1% Commission',
    description:
      'Stop paying commissions. Learn how switching to Direct Plans can add ₹50 Lakhs to your retirement corpus.',
    url: 'https://www.fincado.com/guides/mutual-fund-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/mf/direct-vs-regular-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Graph comparing direct vs regular fund growth over 20 years',
      },
    ],
  },
};

export default function DirectMFGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Mutual Fund Guide',
            url: 'https://www.fincado.com/guides/mutual-fund-guide',
          },
        ]}
      />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'Direct vs Regular Mutual Funds: How to Save 1% Commission',
            description:
              'Complete guide on why Direct Mutual Funds are better than Regular plans. Includes calculator examples, switching guide, and platform reviews.',
            image:
              'https://www.fincado.com/images/guides/mf/mutual-fund-guide-hero.webp',
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
            datePublished: '2025-02-10',
            dateModified: '2025-02-10',
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
                name: 'What is the difference between direct and regular mutual funds?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Direct plans are purchased directly from the AMC without intermediaries, resulting in lower expense ratios and higher returns. Regular plans are sold via distributors who earn a commission.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much can I save by investing in direct mutual funds?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Direct plans typically have expense ratios 1-1.5% lower than regular plans. Over 20 years, this difference can amount to ₹25-50 Lakh extra corpus on a ₹5 Crore portfolio.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I switch from regular to direct mutual funds?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You need to redeem your regular plan units (paying any applicable tax) and reinvest the proceeds into the direct plan of the same fund via a platform like Zerodha Coin or Groww.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Smart Investing</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          Direct vs Regular Mutual Funds: How to Save 1% Commission
        </h1>
        <div className="guide-meta">
          <span>
            By <strong>Fincado Team</strong>
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>15 Min Read</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <ShareTools title="Direct vs Regular MF Guide" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          The difference between <strong>Direct</strong> and <strong>Regular</strong> mutual funds might seem like a small 1% fee, but over 20-30 years, this commission can cost you <strong>₹25-50 Lakhs</strong>! That's money taken from your retirement to pay a broker.

          Understanding the <strong>Expense Ratio impact</strong> and knowing which platforms offer zero-commission investing is crucial. This guide breaks down the math, shows you how to switch, and explains why <strong>Index Funds</strong> are winning.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/mf/mutual-fund-guide-hero.webp"
          alt="Comparison of wealth growth: Direct vs Regular plan"
          width={1200}
          height={675}
          priority
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        />
      </div>

      <h2>What are Direct and Regular Mutual Funds?</h2>
      <WikiText
        content={`
          Both plans invest in the <strong>same portfolio</strong> with the same fund manager. The only difference is <strong>who gets paid</strong>.
        `}
      />

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Regular Plan</th>
              <th>Direct Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Sold By</strong>
              </td>
              <td>Brokers / Distributors</td>
              <td>AMC / Zero-Commission Platforms</td>
            </tr>
            <tr>
              <td>
                <strong>Commission</strong>
              </td>
              <td>Yes (0.5% - 1.5%)</td>
              <td>
                <strong>Zero</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Expense Ratio</strong>
              </td>
              <td>Higher (e.g. 2.0%)</td>
              <td>
                <strong>Lower</strong> (e.g. 0.8%)
              </td>
            </tr>
            <tr>
              <td>
                <strong>NAV</strong>
              </td>
              <td>Lower</td>
              <td>
                <strong>Higher</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Returns</strong>
              </td>
              <td>Lower</td>
              <td>
                <strong>1-1.5% Higher Annually</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#expense-ratio">1. The 1% Difference (Real Math)</a>
          </li>
          <li>
            <a href="#wealth-loss">2. How You Lose ₹50 Lakhs</a>
          </li>
          <li>
            <a href="#switching-guide">3. How to Switch to Direct Plans</a>
          </li>
          <li>
            <a href="#platforms">4. Best Direct MF Platforms</a>
          </li>
          <li>
            <a href="#active-vs-passive">5. Active vs Index Funds</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-mf-1" type="leaderboard" />
      </div>

      {/* --- SECTION: EXPENSE RATIO --- */}
      <h2 id="expense-ratio">How Does the 1% Difference Work?</h2>
      <p>
        The <strong>Expense Ratio</strong> is the annual fee deducted from your
        investment.
      </p>

      <div className="example-box">
        <h3>Real-World Example: HDFC Equity Fund</h3>
        <ul>
          <li>
            <strong>Regular Plan Expense Ratio:</strong> 2.34%
          </li>
          <li>
            <strong>Direct Plan Expense Ratio:</strong> 0.39%
          </li>
          <li>
            <strong>Difference:</strong> 1.95% per year!
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          This means in the Regular plan, you lose almost 2% of your wealth{' '}
          <em>every single year</em> to commissions, regardless of profit or
          loss.
        </p>
      </div>

      <h2 id="wealth-loss">The 1% Difference: Losing ₹12.5 Lakhs</h2>
      <WikiText
        content={`Let's simulate a <strong>₹10,000 Monthly SIP</strong> for <strong>20 Years</strong> assuming 12% market returns.`}
      />

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Expense Ratio</th>
              <th>Net Return</th>
              <th>Final Corpus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Regular Plan</strong>
              </td>
              <td>2.0%</td>
              <td>10%</td>
              <td>₹75.94 Lakhs</td>
            </tr>
            <tr>
              <td>
                <strong>Direct Plan</strong>
              </td>
              <td>1.0%</td>
              <td>11%</td>
              <td>
                <strong>₹88.53 Lakhs</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Loss to Commission</strong>
              </td>
              <td>-</td>
              <td>-</td>
              <td style={{ color: '#dc2626', fontWeight: 'bold' }}>
                ₹12.59 Lakhs Lost!
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Insight:</strong> For a larger corpus (e.g. ₹25 Lakh Lumpsum),
        the loss over 30 years is nearly <strong>₹1.76 Crore</strong>.
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-mf-2" type="leaderboard" />
      </div>

      {/* --- SECTION: SWITCHING GUIDE --- */}
      <h2 id="switching-guide">
        How to Switch from Regular to Direct: Step-by-Step
      </h2>
      <p>
        Switching isn&apos;t automatic. You must redeem (sell) and reinvest
        (buy).
      </p>

      <h3>The 8-Step Process</h3>
      <ol>
        <li>
          <strong>Audit:</strong> Check your portfolio. Identify funds with
          &quot;Regular&quot; in the name.
        </li>
        <li>
          <strong>Tax Check:</strong> Calculate Exit Load and Capital Gains Tax
          (LTCG/STCG).
        </li>
        <li>
          <strong>Platform:</strong> Open an account on a Direct platform
          (Zerodha/Groww).
        </li>
        <li>
          <strong>KYC:</strong> Complete digital KYC if moving to a new broker.
        </li>
        <li>
          <strong>Redeem:</strong> Sell your Regular units. Money hits bank in
          T+2 days.
        </li>
        <li>
          <strong>Reinvest:</strong> Buy the <strong>Direct Plan</strong> of the
          same fund.
        </li>
        <li>
          <strong>SIPs:</strong> Stop old SIPs. Start new SIPs in Direct plans.
        </li>
        <li>
          <strong>Taxes:</strong> Pay any capital gains tax when filing ITR.
        </li>
      </ol>

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The Fear</div>
          <div className="myth-title">
            &quot;But I have to pay tax to switch!&quot;
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              Investors fear paying ₹5,000 LTCG tax now, so they stay in Regular
              plans losing ₹50,000 every year in commissions.
            </p>
          </div>
          <div className="reality-box">
            <strong>The Reality:</strong> Paying a small one-time tax is worth
            it to save Lakhs in future commissions.{' '}
            <strong>Rip the band-aid off.</strong>
          </div>
        </div>
      </div>

      <h2 id="platforms">Best Direct Mutual Fund Platforms</h2>
      <p>Where should you invest?</p>

      <ul>
        <li>
          <strong>Zerodha Coin:</strong> Zero commission. Demat mode. Best for
          serious investors.
        </li>
        <li>
          <strong>Groww:</strong> Zero commission. Simple UI. Beginner friendly.
        </li>
        <li>
          <strong>Paytm Money:</strong> Zero commission. Good analytics.
        </li>
        <li>
          <strong>AMC Website:</strong> Invest directly with fund house (e.g.
          SBI MF). Clunky but direct.
        </li>
      </ul>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-mf-3" type="leaderboard" />
      </div>

      {/* --- SECTION: ACTIVE VS PASSIVE --- */}
      <h2 id="active-vs-passive">Active vs Passive: Why Index Funds Win</h2>
      <WikiText
        content={`Once you go Direct, the next question is: <strong>Active Fund</strong> (Manager picks stocks) or <strong>Index Fund</strong> (Tracks Nifty 50)?`}
      />

      <h3>Performance Reality (Large Cap)</h3>
      <p>
        <strong>61% of Active Funds FAILED to beat the Index</strong> over the
        last 4 years.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Recommendation</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Large Cap</strong>
              </td>
              <td>
                <strong>Index Funds</strong> (Nifty 50)
              </td>
              <td>
                Active managers struggle to beat benchmark; Index is cheap
                (0.2%).
              </td>
            </tr>
            <tr>
              <td>
                <strong>Mid/Small Cap</strong>
              </td>
              <td>Active Funds</td>
              <td>Managers can find hidden gems; higher alpha potential.</td>
            </tr>
            <tr>
              <td>
                <strong>International</strong>
              </td>
              <td>Index Funds (S&P 500)</td>
              <td>Low cost exposure to US tech giants.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>Is there any risk in Direct Mutual Funds?</summary>
          <p>
            The market risk is exactly the same as Regular plans (since the
            portfolio is identical). The only &quot;risk&quot; is that you
            don&apos;t have a broker advising you, so you must choose funds
            yourself (or use Index funds).
          </p>
        </details>
        <details>
          <summary>
            Can I hold both Direct and Regular plans of the same fund?
          </summary>
          <p>
            No. You cannot hold them in the same folio usually. They are treated
            as separate schemes. You must choose one.
          </p>
        </details>
        <details>
          <summary>What is the expense ratio of Index Funds?</summary>
          <p>
            Direct Index Funds are ultra-cheap, often around{' '}
            <strong>0.1% to 0.3%</strong>. This is 10x cheaper than Active
            Regular funds (2%+).
          </p>
        </details>
        <details>
          <summary>Do I need a Demat account for Direct Funds?</summary>
          <p>
            Not necessarily. Platforms like Groww/Paytm Money use SOA format
            (non-Demat). Zerodha Coin uses Demat. Both are fine.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          Switching to Direct Funds is the single highest-ROI move you can make
          today.
        </p>
        <h4>Your Action Plan:</h4>
        <ul className="checklist">
          <li>Check your portfolio for &quot;Regular&quot; plans.</li>
          <li>
            Open account on <strong>Zerodha/Groww</strong>.
          </li>
          <li>
            Stop old SIPs; Start new <strong>Direct SIPs</strong>.
          </li>
          <li>Redeem old units strategically (mind taxes).</li>
        </ul>
        <p>Don&apos;t let 1% eat your retirement. Take control today.</p>
      </div>

      {/* --- AUTHOR BIO --- */}
      <div
        style={{
          marginTop: 40,
          borderTop: '1px solid var(--color-border)',
          paddingTop: 24,
        }}
      >
        <AuthorBio />
      </div>

      <div className="legal-disclaimer">
        <strong>Disclaimer:</strong> Mutual Fund investments are subject to
        market risks. Read all scheme related documents carefully. Past
        performance is not an indicator of future returns. This guide is for
        educational purposes only.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Calculate your savings</h2>
          <p>See exactly how much extra wealth you can create.</p>
          <div className="final-cta-row">
            <Link href="/sip-calculator" className="primary-cta">
              SIP Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-mf-4" type="leaderboard" />
      </div>
    </article>
  );
}
