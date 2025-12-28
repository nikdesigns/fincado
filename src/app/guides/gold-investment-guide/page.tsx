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
  title: 'SGB vs Digital vs Physical Gold: Best Way to Buy 2025',
  description:
    "SGB vs digital gold vs physical gold: Compare returns, taxes, costs. Learn why Sovereign Gold Bonds (2.5% interest, tax-free maturity) beat digital gold's 3% GST.",
  keywords: [
    'sovereign gold bond vs digital gold',
    'sgb interest rate 2025',
    'best way to buy gold in india',
    'is digital gold safe',
    'sgb tax benefits',
    'gold etf vs physical gold',
  ],
  openGraph: {
    title: 'Sovereign Gold Bond (SGB) vs Digital Gold vs Physical Gold',
    description:
      'Stop paying 3% GST on Digital Gold. Learn why SGB is the undisputed king of gold investments with 2.5% extra interest.',
    url: 'https://www.fincado.com/guides/gold-investment-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/gold/gold-investment-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Comparison of SGB certificate vs Digital Gold app vs Physical Coins',
      },
    ],
  },
};

export default function GoldInvestmentGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Gold Investment Guide',
            url: 'https://www.fincado.com/guides/gold-investment-guide',
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
              'Sovereign Gold Bond (SGB) vs Digital Gold vs Physical Gold',
            description:
              'Comprehensive comparison of gold investment options in India. Why SGB beats Digital and Physical gold in returns, tax, and safety.',
            image:
              'https://www.fincado.com/images/guides/gold/gold-investment-hero.webp',
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
            datePublished: '2025-02-12',
            dateModified: '2025-02-12',
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
                name: 'What is the best way to buy gold in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For investment, Sovereign Gold Bonds (SGB) are the best due to 2.5% annual interest, tax-free maturity, and zero making charges. For consumption, physical jewelry is preferred.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is digital gold a good investment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Digital gold carries a 3% GST cost, 2-3% spread loss (difference between buy/sell price), and zero interest income. It is only good for very short-term holding.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the interest rate on SGB?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SGB pays a fixed interest rate of 2.5% per annum on the initial investment amount, credited semi-annually to your bank account.',
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
          Sovereign Gold Bond (SGB) vs Digital Gold vs Physical Gold
        </h1>
        <div className="guide-meta">
          <span>
            By <strong>Fincado Team</strong>
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>12 Min Read</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <ShareTools title="SGB vs Digital Gold Guide" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Choosing the <strong>best way to buy gold</strong> can mean the difference between earning <strong>2.5% extra annual interest</strong> (SGB) and losing money to <strong>3% GST</strong> and hidden spreads (Digital Gold).

          While physical jewelry carries 10-25% making charges, <strong>Sovereign Gold Bonds (SGBs)</strong> offer government-backed safety and tax-free returns. This guide compares SGB, Digital Gold, and Physical Gold to help you maximize your wealth in 2025.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/gold/gold-investment-hero.webp"
          alt="SGB vs Digital Gold comparison infographic"
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

      <h2>How to Invest in Gold?</h2>
      <WikiText
        content={`
          <strong>1. Sovereign Gold Bonds (SGB):</strong> Government securities denominated in grams of gold.
          <strong>2. Digital Gold:</strong> Online gold stored in vaults (e.g., Paytm, PhonePe).
          <strong>3. Physical Gold:</strong> Jewelry, Coins, or Bars bought from jewelers.
        `}
      />

      <div className="callout-box info-box">
        <h3>Quick Summary:</h3>
        <ul>
          <li>
            <strong>Best for Returns:</strong> SGB (Interest + Appreciation)
          </li>
          <li>
            <strong>Best for Liquidity:</strong> Digital Gold / Physical Coins
          </li>
          <li>
            <strong>Best for Usage:</strong> Physical Jewelry
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#comparison">1. SGB vs Digital vs Physical (Comparison)</a>
          </li>
          <li>
            <a href="#sgb-advantage">2. The SGB Advantage (Why It Wins)</a>
          </li>
          <li>
            <a href="#digital-gold-trap">3. The Digital Gold Trap</a>
          </li>
          <li>
            <a href="#physical-gold">4. Physical Gold (Hidden Costs)</a>
          </li>
          <li>
            <a href="#taxation">5. Tax Treatment (2025 Rules)</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gold-1" type="leaderboard" />
      </div>

      {/* --- SECTION: COMPARISON TABLE --- */}
      <h2 id="comparison">
        Comprehensive Comparison: SGB vs Digital vs Physical
      </h2>
      <p>Let&apos;s compare them on returns, cost, and safety.</p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Sovereign Gold Bond (SGB)</th>
              <th>Digital Gold</th>
              <th>Physical Gold (Jewelry)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Interest</strong>
              </td>
              <td>
                <strong>2.5% p.a.</strong>
              </td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>
                <strong>Making Charges</strong>
              </td>
              <td>
                <strong>Zero</strong>
              </td>
              <td>Zero</td>
              <td>High (10-25%)</td>
            </tr>
            <tr>
              <td>
                <strong>GST Cost</strong>
              </td>
              <td>
                <strong>Zero</strong>
              </td>
              <td>3%</td>
              <td>3%</td>
            </tr>
            <tr>
              <td>
                <strong>Purity</strong>
              </td>
              <td>999 (24K Guaranteed)</td>
              <td>995/999</td>
              <td>Varies (Hallmarking)</td>
            </tr>
            <tr>
              <td>
                <strong>Storage</strong>
              </td>
              <td>Demat (Free)</td>
              <td>Vault (Small Fee)</td>
              <td>Locker (Costly)</td>
            </tr>
            <tr>
              <td>
                <strong>Capital Gains Tax</strong>
              </td>
              <td>
                <strong>Tax-Free (Maturity)</strong>
              </td>
              <td>Taxable (Slab/LTCG)</td>
              <td>Taxable (Slab/LTCG)</td>
            </tr>
            <tr>
              <td>
                <strong>Liquidity</strong>
              </td>
              <td>Medium (5-8 Yrs)</td>
              <td>High (Instant)</td>
              <td>High</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Verdict:</strong> <strong>SGB</strong> is the clear winner for
        investors due to extra interest income and tax-free status.{' '}
        <strong>Digital Gold</strong> is costly due to GST and spreads.
      </div>

      {/* --- SECTION: SGB ADVANTAGE --- */}
      <h2 id="sgb-advantage">The SGB Advantage: Why It&apos;s Superior</h2>
      <WikiText
        content={`SGBs are issued by the <strong>RBI</strong> on behalf of the Govt of India. They are the *only* gold instrument that pays you interest.`}
      />

      <div className="example-box">
        <h3>Returns Calculation (10 Grams Investment)</h3>
        <p>Assuming Gold Price grows at 8% CAGR over 8 years.</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 8 }}>
            💰 <strong>Investment:</strong> ₹65,000
          </li>
          <li style={{ marginBottom: 8 }}>
            📈 <strong>Gold Value after 8 Yrs:</strong> ~₹1,20,000
          </li>
          <li style={{ marginBottom: 8 }}>
            💵 <strong>Interest Earned (2.5%):</strong> +₹13,000
          </li>
          <li style={{ marginBottom: 8 }}>
            🛡️ <strong>Tax Saved:</strong> ~₹7,000 (Tax-Free Maturity)
          </li>
        </ul>
        <p
          style={{
            marginTop: 12,
            fontWeight: 'bold',
            color: 'var(--color-brand-green)',
          }}
        >
          Total Gain: ₹68,000 (More than double!)
        </p>
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gold-2" type="leaderboard" />
      </div>

      <h2 id="digital-gold-trap">The Digital Gold Trap: Hidden Costs</h2>
      <p>
        Buying gold for ₹100 on an app sounds easy, but it&apos;s inefficient.
      </p>

      <h3>1. The 3% GST Loss</h3>
      <p>
        When you buy ₹10,000 of digital gold, ₹300 goes to GST. You only get
        ₹9,700 worth of gold. You start with a <strong>-3% loss</strong>{' '}
        immediately.
      </p>

      <h3>2. The Buy-Sell Spread (3-6%)</h3>
      <p>
        Platforms have a difference between Buy and Sell price. If you buy at
        ₹6,000/gm, the selling price might be ₹5,800/gm instantly. That&apos;s
        another 3% loss.
      </p>

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The Reality Check</div>
          <div className="myth-title">
            &quot;Instant Liquidity&quot; comes at a cost.
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              Between GST and Spreads, you lose <strong>5-6%</strong> of your
              capital the moment you invest in Digital Gold. Gold prices must
              rise 6% just for you to break even!
            </p>
          </div>
        </div>
      </div>

      <h2 id="physical-gold">Physical Gold: Consumption vs Investment</h2>
      <p>
        <strong>Golden Rule:</strong> Buy Physical Gold (Jewelry) only for
        *consumption* (wearing/weddings), never for investment.
      </p>
      <ul>
        <li>
          ❌ <strong>Making Charges:</strong> You pay 10-25% extra to the
          jeweler, which is lost forever when you resell.
        </li>
        <li>
          ❌ <strong>Purity Issues:</strong> Even with Hallmarking, buyback
          policies vary.
        </li>
        <li>
          ❌ <strong>Theft Risk:</strong> Requires expensive locker storage.
        </li>
      </ul>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gold-3" type="leaderboard" />
      </div>

      <h2 id="taxation">Tax Treatment (2025 Rules)</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Interest Income</th>
              <th>Capital Gains (Maturity)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>SGB</strong>
              </td>
              <td>Taxed as Income</td>
              <td>
                <strong>Tax-Free (after 8 yrs)</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Digital Gold</strong>
              </td>
              <td>No Interest</td>
              <td>Taxed (LTCG / Slab)</td>
            </tr>
            <tr>
              <td>
                <strong>Physical Gold</strong>
              </td>
              <td>No Interest</td>
              <td>Taxed (LTCG / Slab)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>What is the lock-in period for SGB?</summary>
          <p>
            SGB has a tenure of 8 years. However, you can exit after 5 years on
            interest payment dates. You can also sell SGBs anytime on the stock
            exchange (demat required).
          </p>
        </details>
        <details>
          <summary>Can I convert Digital Gold to Physical Gold?</summary>
          <p>
            Yes, most apps allow this, but you have to pay{' '}
            <strong>making charges + delivery fees</strong>, which makes it very
            expensive compared to buying coins directly.
          </p>
        </details>
        <details>
          <summary>Is SGB interest taxable?</summary>
          <p>
            Yes. The 2.5% annual interest is added to your income and taxed as
            per your slab. However, the capital appreciation at maturity is
            tax-free.
          </p>
        </details>
        <details>
          <summary>How much gold should I have in my portfolio?</summary>
          <p>
            Most experts recommend allocating <strong>5% to 10%</strong> of your
            portfolio to Gold (SGBs) as a hedge against inflation and equity
            volatility.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>Don&apos;t lose money to GST and Making Charges. Invest smart.</p>
        <h4>Your Gold Strategy:</h4>
        <ul className="checklist">
          <li>
            Buy <strong>SGBs</strong> for long-term wealth (8+ years).
          </li>
          <li>
            Buy <strong>Physical Jewelry</strong> only for wearing/weddings.
          </li>
          <li>
            Avoid <strong>Digital Gold</strong> for large investments (high
            costs).
          </li>
          <li>
            Allocate <strong>5-10%</strong> of portfolio to Gold.
          </li>
        </ul>
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
        <strong>Disclaimer:</strong> Gold prices are subject to market risks.
        SGB issuance depends on RBI notifications. This guide is for educational
        purposes. Please consult a financial advisor for personalized advice.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Calculate your gold returns</h2>
          <p>See how much more you earn with SGBs compared to physical gold.</p>
          <div className="final-cta-row">
            <Link href="/sip-calculator" className="primary-cta">
              Compare with Mutual Funds
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gold-4" type="leaderboard" />
      </div>
    </article>
  );
}
