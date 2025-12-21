import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: 'Sovereign Gold Bonds (SGB) Guide 2025: Interest, Tax & Redemption',
  description:
    'Complete guide to Sovereign Gold Bonds (SGB) in India. Learn about 2.5% interest, tax-free redemption, and why SGB is better than physical gold.',
  alternates: {
    canonical: 'https://www.fincado.com/guides/sovereign-gold-bond-sgb-guide',
  },
  openGraph: {
    title: 'Sovereign Gold Bonds (SGB) Guide 2025',
    description:
      'Invest in Gold + Earn 2.5% Interest. Tax-free maturity and government guarantee. Read the full SGB guide.',
    type: 'article',
    url: 'https://www.fincado.com/guides/sovereign-gold-bond-sgb-guide',
    images: [
      { url: '/images/guides/sgb/sgb-hero.webp', width: 1200, height: 630 },
    ],
  },
};

export default function SGBGuide() {
  // --- Article Schema ---
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Sovereign Gold Bonds (SGB): Interest, Tax Benefits & Redemption (2025 Guide)',
    description:
      'Comprehensive guide to Sovereign Gold Bonds (SGB), covering interest rates, tax benefits, redemption rules, and comparison with physical gold.',
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
    datePublished: '2025-01-10',
    dateModified: '2025-01-10',
    image: 'https://www.fincado.com/images/guides/sgb/sgb-hero.webp',
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'SGB Guide',
            url: 'https://www.fincado.com/guides/sovereign-gold-bond-sgb-guide',
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="article">
        <header
          style={{
            marginBottom: 32,
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 24,
          }}
        >
          <span
            className="badge-flagship"
            style={{
              background: '#dbeafe',
              color: '#1e40af',
              marginBottom: 12,
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Gold Investment
          </span>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Sovereign Gold Bonds (SGB): Interest, Tax Benefits & Redemption
            (2025 Guide)
          </h1>

          <div
            style={{
              fontSize: 14,
              color: 'var(--color-text-muted)',
              marginBottom: 20,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span>
              Last Updated: <strong>Jan 2025</strong>
            </span>
            <span>•</span>
            <span>10 Min Read</span>
          </div>

          <ShareTools title="Sovereign Gold Bonds (SGB) Guide" />
        </header>

        {/* 🖼️ IMAGE 1: HERO IMAGE (Save as: public/images/guides/sgb/sgb-hero.webp) */}
        <figure style={{ marginBottom: 32 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#fffbeb',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #fde68a',
            }}
          >
            <Image
              src="/images/guides/sgb/sgb-hero.webp"
              alt="Sovereign Gold Bonds: Gold plus Interest Benefit"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </figure>

        <WikiText
          content={`
          <p>Sovereign Gold Bonds (SGB) are one of the smartest ways for Indians to invest in gold without worrying about storage, purity, or making charges. Backed by the Government of India and issued by the Reserve Bank of India (RBI), SGBs combine the price appreciation of gold with extra interest and attractive tax benefits, making them a powerful long-term wealth creation tool.</p>
          <p><em>Note: Exact interest rates, issue prices, and tranche dates change over time; always check the latest RBI or bank communication before investing.</em></p>
        `}
        />

        {/* AD SLOT 1 */}
        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id="sgb-guide-top" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>What Are Sovereign Gold Bonds (SGB)?</h2>
          <p>Sovereign Gold Bonds are government securities denominated in grams of gold. Instead of buying physical gold, you buy these bonds, and their value is linked to the market price of 24K gold (999 purity).</p>

          <h3>Key features of SGB:</h3>
          <ul>
            <li><strong>Issuer:</strong> Government of India (through RBI).</li>
            <li><strong>Denomination:</strong> 1 unit = 1 gram of gold.</li>
            <li><strong>Tenure:</strong> 8 years, with exit option from 5th year.</li>
            <li><strong>Interest:</strong> Fixed rate (commonly 2.5% per annum) on the initial investment amount.</li>
            <li><strong>Redemption:</strong> Cash credited to bank account based on prevailing gold price.</li>
            <li><strong>Forms:</strong> Held as a certificate or in demat form.</li>
          </ul>
        `}
        />

        {/* AD SLOT 2 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="sgb-guide-features-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Why SGB Is Better Than Physical Gold</h2>
          <p>Indians have traditionally bought gold in the form of jewellery, coins, or bars, but that comes with hidden costs and risks. Sovereign Gold Bonds solve many of these issues while adding extra benefits.</p>

          <h3>1. No Making Charges, No Wastage, No Storage Risk</h3>
          <p><strong>Physical gold issues:</strong> High making charges (8–25%), wastage on resale, purity risks, and storage/theft concerns.</p>
          <p><strong>SGB advantages:</strong> Zero making charges, 100% purity benchmark (999 gold), and zero storage risk (digital/demat holding).</p>

          <h3>2. Extra 2.5% Interest on Top of Gold Price</h3>
          <p>Physical gold generates <strong>zero regular income</strong>. SGBs, however, pay you <strong>fixed interest plus gold price appreciation</strong>.</p>
          <ul>
            <li>The government pays a fixed interest rate (commonly <strong>2.5% per annum</strong>) on the initial subscription amount.</li>
            <li>Interest is paid semi-annually directly into your bank account.</li>
          </ul>
          
          <div class="callout-box info-box">
            <strong>Example:</strong><br/>
            If you invest ₹3,00,000 in SGB (50g @ ₹6000/g):<br/>
            You get <strong>₹7,500 annual interest</strong> credited to your bank account, PLUS the value of your bond grows if gold prices rise.
          </div>
        `}
        />

        {/* 🖼️ IMAGE 2: SGB vs PHYSICAL GOLD (Save as: public/images/guides/sgb/sgb-vs-physical.webp) */}
        <figure style={{ margin: '32px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#fef2f2',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #fee2e2',
            }}
          >
            <Image
              src="/images/guides/sgb/sgb-vs-physical.webp"
              alt="Comparison: Sovereign Gold Bond vs Physical Gold"
              fill
              style={{ objectFit: 'contain', padding: '16px' }}
            />
          </div>
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#64748b',
              marginTop: '8px',
            }}
          >
            SGB beats physical gold with interest income and tax benefits.
          </figcaption>
        </figure>

        {/* AD SLOT 3 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="sgb-guide-mid-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>Tax-Free Capital Gains on Maturity (8 Years)</h2>
          <p>One of the biggest reasons Sovereign Gold Bonds are so powerful for long-term investors is their tax treatment.</p>

          <h3>8-Year Maturity and Redemption</h3>
          <p>SGBs have a tenure of 8 years. On maturity, the redemption price is based on the simple average of closing price of 999 purity gold of the last few business days.</p>

          <h3>Tax-Free Capital Gains</h3>
          <p>For individual investors, <strong>capital gains arising at redemption on maturity (after 8 years) are exempt from income tax</strong>.</p>
          <p>Example: If you invested ₹3 Lakh and redeem at ₹5.5 Lakh after 8 years, the <strong>₹2.5 Lakh gain is Tax-Free</strong>.</p>

          <h3>Tax on Interest</h3>
          <p>The semi-annual interest (e.g., 2.5% p.a.) is taxable as “Income from Other Sources” at your slab rate.</p>
        `}
        />

        {/* AD SLOT 4 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="sgb-guide-tax-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>How to Buy SGB: Banks, Post Offices, and Demat</h2>
          <p>RBI opens SGB subscription in <strong>tranches</strong> several times a year. Investors can apply through:</p>

          <h3>1. Through Banks (Online/Offline)</h3>
          <ul>
            <li><strong>Online:</strong> Log in to Net Banking > Investments > Sovereign Gold Bonds.</li>
            <li><strong>Offline:</strong> Visit branch, fill form, and pay via cheque/DD.</li>
          </ul>

          <h3>2. Through Stock Brokers (Demat)</h3>
          <ul>
            <li>Log in to your broker app (Zerodha, Upstox, etc.).</li>
            <li>Go to "Sovereign Gold Bonds" or "IPO/Bonds" section.</li>
            <li>Place order during the subscription window. Units are credited to Demat.</li>
          </ul>

          <h3>3. Secondary Market</h3>
          <p>You can also buy existing SGB units from the stock exchange (NSE/BSE) through your demat account if a new tranche is not open.</p>
        `}
        />

        {/* AD SLOT 5 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="sgb-guide-buying-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>Premature Withdrawal Rules (After 5 Years)</h2>
          
          <h3>1. Early Redemption Through RBI</h3>
          <p>Investors can opt for premature redemption <strong>from the 5th year onwards</strong> on interest payment dates. RBI redeems these units at the prevailing gold price.</p>

          <h3>2. Selling on Stock Exchanges</h3>
          <p>SGBs are listed on stock exchanges (NSE/BSE). You can sell them anytime if you hold them in Demat form, providing high liquidity.</p>

          <h3>3. Loan Against SGB</h3>
          <p>SGBs can be used as collateral for loans, similar to physical gold loans. This provides liquidity without selling your investment.</p>
        `}
        />

        {/* AD SLOT 6 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="sgb-guide-redemption-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>SGB vs Physical Gold vs Gold ETF (Quick Comparison)</h2>
          <div class="table-container">
            <table class="rate-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Sovereign Gold Bond (SGB)</th>
                  <th>Physical Gold</th>
                  <th>Gold ETF</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Backed by</strong></td><td>Govt of India (Sovereign)</td><td>Self Custody</td><td>Mutual Fund</td></tr>
                <tr><td><strong>Interest</strong></td><td><strong>~2.5% p.a.</strong> ✅</td><td>No</td><td>No</td></tr>
                <tr><td><strong>Charges</strong></td><td>No making/storage charges</td><td>Making charges, Storage cost</td><td>Expense Ratio</td></tr>
                <tr><td><strong>Tax on Maturity</strong></td><td><strong>Tax-Free</strong> (8 years) ✅</td><td>Taxable</td><td>Taxable</td></tr>
                <tr><td><strong>Liquidity</strong></td><td>Medium (5 yr exit / Exchange)</td><td>High</td><td>High</td></tr>
                <tr><td><strong>Purity Risk</strong></td><td>None (Financial Gold)</td><td>Yes</td><td>None</td></tr>
              </tbody>
            </table>
          </div>
        `}
        />

        {/* AD SLOT 7 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="sgb-guide-bottom" type="leaderboard" />
        </div>

        <section className="conclusion-box" style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            Final Take: Who Should Invest in SGB?
          </h2>
          <p style={{ marginBottom: 16 }}>
            Sovereign Gold Bonds are ideal if you want{' '}
            <strong>long-term exposure to gold (5–8 years)</strong> without
            storage or purity worries.
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              You earn <strong>2.5% extra interest</strong> on top of gold price
              appreciation.
            </li>
            <li>
              You enjoy <strong>Tax-Free maturity</strong> after 8 years.
            </li>
            <li>
              It combines the cultural comfort of gold with the financial
              intelligence of bonds.
            </li>
          </ul>
        </section>

        <AuthorBio />

        <div className="legal-disclaimer">
          <p>
            <strong>Disclaimer:</strong> Sovereign Gold Bond details (interest
            rates, issue dates) are subject to RBI notifications. Gold prices
            are subject to market risks. This article is for educational
            purposes only and does not constitute financial advice. Please
            consult a financial advisor before investing.
          </p>
        </div>
      </article>
    </>
  );
}
