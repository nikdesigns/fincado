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
  title: 'SWP Retirement Guide: Monthly Income & FIRE Strategy',
  description:
    'Ultimate SWP retirement guide: Generate monthly income from mutual funds, bucketing strategy, SWP vs dividend tax comparison, FIRE India & inflation-proofing.',
  keywords: [
    'systematic withdrawal plan swp',
    'swp for retirement monthly income',
    'fire movement india',
    'swp vs dividend tax',
    'retirement bucketing strategy',
    'inflation adjusted swp calculator',
  ],
  openGraph: {
    title:
      'The Ultimate Retirement Withdrawal Guide: SWP vs Dividends vs Rental',
    description:
      'Learn how to create a tax-free monthly income from your mutual funds using SWP and the Bucketing Strategy.',
    url: 'https://www.fincado.com/guides/swp-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/swp/swp-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Relaxed retired couple enjoying financial freedom',
      },
    ],
  },
};

export default function SWPGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'SWP & FIRE Guide',
            url: 'https://www.fincado.com/guides/swp-guide',
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
              'The Ultimate Retirement Withdrawal Guide: SWP vs Dividends vs Rental',
            description:
              'Comprehensive guide on using SWP for retirement income, the Bucketing Strategy, and achieving FIRE in India.',
            image:
              'https://www.fincado.com/images/guides/swp/swp-guide-hero.webp',
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
            datePublished: '2025-02-01',
            dateModified: '2025-02-01',
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
                name: 'Is SWP better than dividend (IDCW) for retirement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. SWP is far superior due to tax efficiency (12.5% LTCG vs 30% dividend tax), control over withdrawal amount, and capital preservation.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 4% withdrawal rule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The 4% rule suggests withdrawing 4% of your initial retirement corpus annually, adjusted for inflation, to ensure your money lasts for 30 years.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the bucketing strategy work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bucketing divides corpus into 3 parts: Bucket 1 (Liquid/Cash) for 1-3 years expenses, Bucket 2 (Debt) for 4-10 years, and Bucket 3 (Equity) for 10+ years growth.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Retirement Planning</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          The Ultimate Retirement Withdrawal Guide: SWP vs Dividends & FIRE
        </h1>
        <div className="guide-meta">
          <span>
            By <strong>Fincado Team</strong>
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>16 Min Read</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <ShareTools title="SWP & FIRE Retirement Guide" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Generating a consistent monthly income post-retirement is the #1 challenge for every retiree. While traditional options like FDs and annuities offer safety, they fail to beat inflation.

          Enter the <strong>Systematic Withdrawal Plan (SWP)</strong>—a powerful tool that, when combined with the <strong>Bucketing Strategy</strong>, can generate tax-efficient income for 30+ years. Whether you're planning for <strong>FIRE (Financial Independence, Retire Early)</strong> or traditional retirement, this guide is your blueprint.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/swp/swp-guide-hero.webp"
          alt="Happy retired couple using laptop"
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

      <h2>What is SWP (Systematic Withdrawal Plan)?</h2>
      <WikiText
        content={`
          <strong>SWP</strong> allows you to withdraw a fixed amount from your mutual fund investments at regular intervals (monthly/quarterly). Unlike IDCW (Dividends), you control the amount, frequency, and tax liability.
        `}
      />

      <div className="callout-box info-box">
        <h3>Why SWP is Powerful:</h3>
        <ul>
          <li>
            <strong>Regular Income:</strong> Create your own
            &quot;pension&quot;.
          </li>
          <li>
            <strong>Tax Efficiency:</strong> Only the capital gains portion is
            taxed (often zero).
          </li>
          <li>
            <strong>Growth:</strong> Remaining corpus continues to grow in the
            market.
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#bucketing-strategy">1. The Bucketing Strategy</a>
          </li>
          <li>
            <a href="#swp-vs-idcw">2. SWP vs Dividend (Tax Reality)</a>
          </li>
          <li>
            <a href="#inflation-proofing">3. Inflation-Proofing Your Income</a>
          </li>
          <li>
            <a href="#swp-taxation">4. SWP Taxation 2025</a>
          </li>
          <li>
            <a href="#fire-planning">5. FIRE & Safe Withdrawal Rate</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-swp-1" type="leaderboard" />
      </div>

      {/* --- SECTION: BUCKETING STRATEGY --- */}
      <h2 id="bucketing-strategy">
        The &quot;Bucketing&quot; Strategy: Safety + Growth
      </h2>
      <p>
        The biggest fear in retirement is a market crash. The Bucketing Strategy
        solves this by dividing your corpus into time-based buckets.
      </p>

      <div className="example-box">
        <h3>Bucket 1: Years 1-3 (Immediate Needs)</h3>
        <ul>
          <li>
            <strong>Allocation:</strong> 15-20% of Corpus
          </li>
          <li>
            <strong>Instruments:</strong> Savings Bank, Liquid Funds, FDs
          </li>
          <li>
            <strong>Risk:</strong> Zero Market Risk
          </li>
          <li>
            <strong>Purpose:</strong> Pay monthly bills. Immune to stock market
            crashes.
          </li>
        </ul>

        <hr style={{ margin: '16px 0', borderColor: '#e2e8f0' }} />

        <h3>Bucket 2: Years 4-10 (Stability)</h3>
        <ul>
          <li>
            <strong>Allocation:</strong> 30-35% of Corpus
          </li>
          <li>
            <strong>Instruments:</strong> Conservative Hybrid, Debt Funds
          </li>
          <li>
            <strong>Return:</strong> 8-9%
          </li>
          <li>
            <strong>Purpose:</strong> Refill Bucket 1 as it depletes.
          </li>
        </ul>

        <hr style={{ margin: '16px 0', borderColor: '#e2e8f0' }} />

        <h3>Bucket 3: Years 10+ (Growth)</h3>
        <ul>
          <li>
            <strong>Allocation:</strong> 45-50% of Corpus
          </li>
          <li>
            <strong>Instruments:</strong> Equity Mutual Funds, Index Funds
          </li>
          <li>
            <strong>Return:</strong> 12-14%
          </li>
          <li>
            <strong>Purpose:</strong> Beat inflation and preserve wealth for old
            age.
          </li>
        </ul>
      </div>

      <div className="callout-box info-box">
        <strong>Why it works:</strong> Even if the market crashes by 50%, your
        <strong>Bucket 1</strong> ensures you don&apos;t have to sell equity at
        a loss for at least 3 years, giving the market time to recover.
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-swp-2" type="leaderboard" />
      </div>

      {/* --- SECTION: SWP VS IDCW --- */}
      <h2 id="swp-vs-idcw">SWP vs IDCW (Dividend): The Tax Trap</h2>
      <WikiText
        content={`Many retirees choose <strong>IDCW (Dividend)</strong> plans thinking it's safer. In reality, dividends are taxed at your income slab rate (up to 30%), while SWP withdrawals are taxed as Capital Gains (often 0% or 12.5%).`}
      />

      <h3>Comparison Table: ₹6 Lakh Annual Income</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>SWP (Growth Plan)</th>
              <th>IDCW (Dividend Plan)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Income Control</strong>
              </td>
              <td>Full (You decide)</td>
              <td>Zero (Fund decides)</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Calculation</strong>
              </td>
              <td>Only on Gains (Principal is tax-free)</td>
              <td>Entire Amount Taxed</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Rate (30% Slab)</strong>
              </td>
              <td>
                <strong>0%</strong> (Gains &lt; ₹1.25L)
              </td>
              <td>
                <strong>30%</strong> (Slab Rate)
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tax Payable</strong>
              </td>
              <td>
                <strong>₹0</strong>
              </td>
              <td>
                <strong>₹1,80,000</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Net Income</strong>
              </td>
              <td>₹6,00,000</td>
              <td>₹4,20,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Verdict:</strong> SWP saves you ₹1.8 Lakhs in tax annually in
        this example!
      </p>

      {/* --- SECTION: INFLATION PROOFING --- */}
      <h2 id="inflation-proofing">Inflation-Proofing Your SWP</h2>
      <p>
        A fixed ₹50,000 withdrawal today will feel like ₹25,000 in 15 years. You
        <strong>must</strong> increase your withdrawal annually.
      </p>

      <h3>Inflation-Adjusted Strategy</h3>
      <ol>
        <li>
          <strong>Start:</strong> Year 1 Withdrawal = ₹50,000/month.
        </li>
        <li>
          <strong>Escalate:</strong> Increase SWP by 5-6% every year.
        </li>
        <li>
          <strong>Result:</strong> Year 10 Withdrawal = ₹81,445/month (Maintains
          lifestyle).
        </li>
      </ol>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Monthly SWP (5% Hike)</th>
              <th>Annual Withdrawal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>₹50,000</td>
              <td>₹6,00,000</td>
            </tr>
            <tr>
              <td>5</td>
              <td>₹60,776</td>
              <td>₹7,29,312</td>
            </tr>
            <tr>
              <td>10</td>
              <td>₹78,119</td>
              <td>₹9,37,428</td>
            </tr>
            <tr>
              <td>20</td>
              <td>₹1,26,348</td>
              <td>₹15,16,176</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-swp-3" type="leaderboard" />
      </div>

      {/* --- SECTION: SWP TAXATION --- */}
      <h2 id="swp-taxation">Tax Treatment of SWP (2025 Rules)</h2>

      <h3>Equity Funds (Holding `{'>'}` 1 Year)</h3>
      <ul>
        <li>
          <strong>LTCG Tax:</strong> 12.5%
        </li>
        <li>
          <strong>Exemption:</strong> First ₹1.25 Lakh gains in a year are{' '}
          <strong>Tax-Free</strong>.
        </li>
        <li>
          <strong>Result:</strong> Since SWP withdrawals are mostly principal
          (initially), the taxable gain is often below ₹1.25L, making your
          income effectively tax-free.
        </li>
      </ul>

      <h3>Debt Funds (Any Holding Period)</h3>
      <ul>
        <li>
          <strong>Taxation:</strong> Added to income and taxed at{' '}
          <strong>Slab Rate</strong>.
        </li>
        <li>
          <strong>Note:</strong> No indexation benefit for funds bought after
          April 1, 2023.
        </li>
      </ul>

      {/* --- SECTION: FIRE PLANNING --- */}
      <h2 id="fire-planning">FIRE & The 4% Rule</h2>
      <WikiText
        content={`For <strong>FIRE (Financial Independence, Retire Early)</strong> aspirants, the <strong>4% Rule</strong> is the golden standard. It states you can withdraw 4% of your initial corpus annually (adjusted for inflation) and never run out of money for 30 years.`}
      />

      <h3>Safe Withdrawal Rates</h3>
      <ul>
        <li>
          <strong>Conservative (40+ Years):</strong> 3.5% - 4%
        </li>
        <li>
          <strong>Moderate (30 Years):</strong> 4% - 5%
        </li>
        <li>
          <strong>Aggressive (20 Years):</strong> 6% - 7%
        </li>
      </ul>

      <h2 id="alternatives">SWP vs Alternatives</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Tax Efficiency</th>
              <th>Inflation Protection</th>
              <th>Capital Growth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>SWP (Equity)</strong>
              </td>
              <td>✅ High (LTCG)</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
            </tr>
            <tr>
              <td>
                <strong>FD Interest</strong>
              </td>
              <td>❌ Low (Slab)</td>
              <td>❌ No</td>
              <td>❌ No</td>
            </tr>
            <tr>
              <td>
                <strong>Annuity</strong>
              </td>
              <td>❌ Low (Slab)</td>
              <td>❌ No</td>
              <td>❌ No (Capital gone)</td>
            </tr>
            <tr>
              <td>
                <strong>Rental</strong>
              </td>
              <td>Medium (Slab - 30%)</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>Can I lose money with SWP?</summary>
          <p>
            If the market performs poorly for many years and you withdraw too
            aggressively (e.g., 8-10%), you can deplete your corpus. Stick to
            4-5% withdrawal rates.
          </p>
        </details>
        <details>
          <summary>Which funds are best for SWP?</summary>
          <p>
            For Bucket 1: Liquid Funds. For Bucket 2: Conservative
            Hybrid/Balanced Advantage Funds. For Bucket 3: Flexi-cap or Index
            Funds.
          </p>
        </details>
        <details>
          <summary>How do I start an SWP?</summary>
          <p>
            Log in to your mutual fund portal (e.g., Zerodha Coin, Groww, or AMC
            website), select the fund, choose &quot;SWP&quot;, enter amount and
            date (e.g., 1st of every month).
          </p>
        </details>
        <details>
          <summary>Is SWP taxable?</summary>
          <p>
            Only the *capital gains* portion of the withdrawal is taxed. The
            principal withdrawal is not taxed. This makes it highly efficient
            compared to salary or interest.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>SWP is the modern retiree&apos;s pension plan.</p>
        <h4>Your Retirement Blueprint:</h4>
        <ul className="checklist">
          <li>
            {' '}
            Use <strong>Bucketing</strong> to secure 3 years&apos; expenses.
          </li>
          <li>
            {' '}
            Choose <strong>SWP over IDCW</strong> to save tax.
          </li>
          <li>
            {' '}
            Increase withdrawals annually for <strong>Inflation</strong>.
          </li>
          <li>
            {' '}
            Stick to a <strong>4-5% Withdrawal Rate</strong>.
          </li>
        </ul>
        <p>
          Start planning today to ensure your golden years are truly golden.
        </p>
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
        market risks. Tax laws are subject to change. This guide is for
        educational purposes. Consult a SEBI registered investment advisor
        before retiring.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Plan your financial freedom</h2>
          <p>
            Calculate how long your retirement corpus will last with our tools.
          </p>
          <div className="final-cta-row">
            <Link href="/calculators/swp-calculator" className="primary-cta">
              SWP Calculator
            </Link>
            <Link href="/calculators/fire-calculator" className="secondary-cta">
              FIRE Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-swp-4" type="leaderboard" />
      </div>
    </article>
  );
}
