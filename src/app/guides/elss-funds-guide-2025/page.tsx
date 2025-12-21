import type { Metadata } from 'next';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: 'ELSS Funds Guide 2025: Save Tax & Build Wealth (3-Year Lock-in)',
  description:
    'Complete guide to ELSS Mutual Funds. Learn about 3-year lock-in, Section 80C tax benefits, historical returns, and comparison with PPF/FD.',
  keywords: [
    'ELSS Funds 2025',
    'Equity Linked Savings Scheme',
    'ELSS vs PPF',
    'Tax Saving Mutual Funds',
    'Section 80C Investment',
    'ELSS Lock-in period',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/elss-funds-guide-2025',
  },
  openGraph: {
    title: 'ELSS Funds Guide 2025: Save Tax & Build Wealth',
    description:
      'Why settle for 7% returns? Save tax and aim for 12-15% returns with ELSS. Complete guide inside.',
    type: 'article',
    url: 'https://www.fincado.com/guides/elss-funds-guide-2025',
    images: [
      {
        url: '/images/guides/elss/elss-guide-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ELSSGuide() {
  // --- Article Schema ---
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'ELSS Funds Guide 2025: Save Tax & Build Wealth with 3-Year Lock-in',
    description:
      'Comprehensive guide to ELSS mutual funds, covering tax benefits, lock-in periods, and comparison with PPF/FD.',
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
    datePublished: '2025-01-08',
    dateModified: '2025-01-08',
    image: 'https://www.fincado.com/images/guides/elss/elss-guide-hero.webp',
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'ELSS Funds Guide',
            url: 'https://www.fincado.com/guides/elss-funds-guide-2025',
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
            Mutual Funds & Tax Planning
          </span>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            ELSS Funds Guide 2025: Save Tax & Build Wealth with 3-Year Lock-in
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
            <span>12 Min Read</span>
          </div>

          <ShareTools title="ELSS Funds Guide 2025" />
        </header>

        {/* 🖼️ IMAGE 1: HERO IMAGE (Save as: public/images/guides/elss/elss-hero.webp) */}
        {/*  */}
        <figure style={{ marginBottom: 32 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#f0fdf4',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #bbf7d0',
            }}
          >
            <Image
              src="/images/guides/elss/elss-hero.webp"
              alt="ELSS Funds: Tax Saving plus Wealth Creation"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </figure>

        <WikiText
          content={`
          <p>Equity Linked Savings Scheme (ELSS) has become the go-to tax-saving investment choice for young Indians who want to combine tax benefits with wealth creation potential. Unlike traditional tax-saving options like PPF and fixed deposits, ELSS offers the dual advantage of equity market exposure and the shortest lock-in period of just 3 years.</p>
        `}
        />

        {/* AD SLOT 1 */}
        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id="elss-guide-top" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>What is Equity Linked Savings Scheme (ELSS)?</h2>
          <p>Equity Linked Savings Scheme (ELSS) is a type of mutual fund that primarily invests in equity and equity-related instruments while offering tax deduction benefits under Section 80C of the Income Tax Act.</p>

          <h3>Key Features of ELSS Funds</h3>
          <ul>
            <li><strong>Investment Type:</strong> At least 80% of the corpus must be invested in equity.</li>
            <li><strong>Tax Benefits:</strong> Investments qualify for deduction under <strong>Section 80C</strong> (Max ₹1.5 Lakh/year).</li>
            <li><strong>Lock-in Period:</strong> <strong>3 years</strong> (Shortest among all 80C options).</li>
            <li><strong>Minimum Investment:</strong> As low as ₹500 via SIP.</li>
            <li><strong>Returns:</strong> Market-linked (Historical average: 12-15%).</li>
          </ul>

          <h3>How ELSS Works</h3>
          <ol>
            <li><strong>Invest:</strong> Fund manager puts your money in a diversified equity portfolio.</li>
            <li><strong>Lock:</strong> Your investment gets locked for 3 years from the date of purchase.</li>
            <li><strong>Tax Save:</strong> You claim deduction under Section 80C.</li>
            <li><strong>Grow:</strong> Fund value grows based on stock market performance.</li>
            <li><strong>Redeem:</strong> After 3 years, you can sell or continue holding.</li>
          </ol>
        `}
        />

        {/* AD SLOT 2 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="elss-guide-basics-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Why Choose ELSS for Tax Saving?</h2>
          
          <h3>1. Shortest Lock-in Period</h3>
          <div class="table-container">
            <table class="rate-table">
              <thead><tr><th>Investment Option</th><th>Lock-in Period</th></tr></thead>
              <tbody>
                <tr><td><strong>ELSS</strong></td><td><strong>3 years</strong> ✅</td></tr>
                <tr><td>National Savings Certificate (NSC)</td><td>5 years</td></tr>
                <tr><td>Tax Saver Fixed Deposit</td><td>5 years</td></tr>
                <tr><td>Public Provident Fund (PPF)</td><td>15 years</td></tr>
              </tbody>
            </table>
          </div>

          <h3>2. Higher Return Potential</h3>
          <p>While past performance doesn't guarantee future returns, the equity exposure in ELSS provides growth potential that fixed-income instruments cannot match. Historical averages show ELSS delivering 12-15% vs PPF's 7.1%.</p>

          <h3>3. Dual Benefit</h3>
          <p>You get immediate tax savings (up to ₹46,800 in 30% slab) AND long-term wealth creation.</p>
        `}
        />

        {/* 🖼️ IMAGE 2: COMPOUNDING GRAPH (Save as: public/images/guides/elss/elss-vs-ppf-growth.webp) */}
        {/*  */}
        <figure style={{ margin: '32px 0' }}>
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
              src="/images/guides/elss/elss-vs-ppf-growth.webp"
              alt="Graph showing ELSS wealth creation potential vs PPF"
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
            The power of compounding: Equity exposure can significantly
            outperform fixed income over 10+ years.
          </figcaption>
        </figure>

        <WikiText
          content={`
          <h2>Tax Benefits of ELSS: Section 80C Explained</h2>
          
          <h3>Tax Deduction at Investment</h3>
          <p>Investments up to <strong>₹1,50,000 per financial year</strong> qualify for deduction. This amount is deducted from your gross total income before calculating tax.</p>
          
          <div class="callout-box info-box">
            <strong>Example Calculation:</strong><br/>
            If you are in the 30% tax bracket and invest ₹1,50,000 in ELSS:<br/>
            Tax Saved = ₹46,800 (30% of ₹1.5L + Cess).<br/>
            <strong>Effective cost of investment = ~₹1,03,000.</strong>
          </div>

          <h3>Tax on Returns (LTCG)</h3>
          <p>ELSS taxation follows equity mutual fund rules:</p>
          <ul>
            <li><strong>Long-Term Capital Gains (LTCG):</strong> Gains up to ₹1.25 Lakh per year are <strong>Tax-Free</strong>.</li>
            <li><strong>Above ₹1.25 Lakh:</strong> Taxed at 10% without indexation.</li>
          </ul>
        `}
        />

        {/* AD SLOT 3 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="elss-guide-mid-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>ELSS vs PPF vs FD: Complete Comparison</h2>
          <div class="table-container">
            <table class="rate-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>ELSS</th>
                  <th>PPF</th>
                  <th>Tax Saver FD</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Returns</strong></td><td>12-15% (Market)</td><td>7.1% (Fixed)</td><td>5.5-7% (Fixed)</td></tr>
                <tr><td><strong>Lock-in</strong></td><td><strong>3 Years</strong> ✅</td><td>15 Years</td><td>5 Years</td></tr>
                <tr><td><strong>Risk</strong></td><td>High (Equity)</td><td>Zero (Govt)</td><td>Low (Bank)</td></tr>
                <tr><td><strong>Tax Status</strong></td><td>EET (LTCG Tax > 1.25L)</td><td><strong>EEE</strong> ✅</td><td>ETT (Interest Taxable)</td></tr>
                <tr><td><strong>Best For</strong></td><td>Wealth Creation</td><td>Retirement/Safety</td><td>Capital Protection</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>The Balanced Approach</h3>
          <p>Many financial planners recommend a combination: <strong>40-50% in ELSS</strong> for growth and <strong>30-40% in PPF</strong> for stability.</p>
        `}
        />

        {/* AD SLOT 4 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="elss-guide-comparison-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Risk Factors in ELSS Investment</h2>
          <p>While returns are attractive, ELSS carries equity risks:</p>
          <ul>
            <li><strong>Market Risk:</strong> NAV can fall during market downturns. Short-term volatility is normal.</li>
            <li><strong>Lock-in Risk:</strong> You cannot access funds for 3 years, even in emergencies.</li>
            <li><strong>Fund Manager Risk:</strong> Performance depends on the manager's stock selection.</li>
          </ul>

          <h2>Historical Returns of ELSS Funds</h2>
          <div class="table-container">
            <table class="rate-table">
              <thead><tr><th>Time Period</th><th>Category Average CAGR</th></tr></thead>
              <tbody>
                <tr><td>3 Years</td><td>16-20%</td></tr>
                <tr><td>5 Years</td><td>15-19%</td></tr>
                <tr><td>10 Years</td><td>13-16%</td></tr>
              </tbody>
            </table>
          </div>
          <p><em>Note: Better ELSS funds often beat benchmarks by 2-4% over long periods.</em></p>
        `}
        />

        {/* AD SLOT 5 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="elss-guide-returns-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>How to Choose the Right ELSS Fund</h2>
          <p>With 30+ funds available, use this checklist:</p>
          <ol>
            <li><strong>Long-Term Track Record:</strong> Look for consistent performance over 5-10 years, not just last year's topper.</li>
            <li><strong>Expense Ratio:</strong> Lower is better. Always choose <strong>Direct Plans</strong> over Regular plans.</li>
            <li><strong>Portfolio Quality:</strong> Ensure diversification across sectors and market caps.</li>
            <li><strong>Fund Manager Tenure:</strong> Prefer funds where the manager has been stable for 3+ years.</li>
          </ol>

          <h2>How to Invest: SIP vs Lump Sum</h2>
          
          <h3>SIP (Systematic Investment Plan) – Recommended ✅</h3>
          <p>Invest a fixed amount (e.g., ₹5,000) every month.</p>
          <ul>
            <li><strong>Rupee Cost Averaging:</strong> Buys more units when markets are low.</li>
            <li><strong>Discipline:</strong> Reduces timing risk and emotional decisions.</li>
            <li><strong>Note:</strong> Each SIP installment has its own separate 3-year lock-in.</li>
          </ul>

          <h3>Lump Sum Investment</h3>
          <p>One-time investment (e.g., ₹1.5 Lakh in March).</p>
          <ul>
            <li><strong>Pros:</strong> Full capital works from day one; simpler lock-in tracking.</li>
            <li><strong>Cons:</strong> High timing risk if invested at market peak.</li>
          </ul>
        `}
        />

        {/* AD SLOT 6 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="elss-guide-strategy-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>How to Redeem ELSS After 3-Year Lock-in</h2>
          <p>Once the 3-year lock-in ends, you have three options:</p>
          <ol>
            <li><strong>Full Redemption:</strong> Withdraw everything if you need funds.</li>
            <li><strong>Partial Redemption:</strong> Withdraw only what you need.</li>
            <li><strong>Continue Holding (Recommended):</strong> If fund performance is good, stay invested to let compounding work for 5-7+ years.</li>
          </ol>

          <h3>Tax Optimization Strategy</h3>
          <p>If your gains exceed ₹1.25 Lakh, consider spreading redemption over 2 financial years to minimize tax liability.</p>

          <h2>Common Mistakes to Avoid</h2>
          <ul class="checklist">
            <li>Investing only for tax saving and ignoring risk profile.</li>
            <li>Waiting until March for a last-minute lump sum rush.</li>
            <li>Redeeming immediately after 3 years, missing long-term growth.</li>
            <li>Chasing last year's top performer without checking consistency.</li>
            <li>Investing through Regular plans instead of Direct plans.</li>
          </ul>
        `}
        />

        {/* AD SLOT 7 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="elss-guide-bottom" type="leaderboard" />
        </div>

        <section className="conclusion-box" style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            Conclusion: Is ELSS Right for You?
          </h2>
          <p style={{ marginBottom: 16 }}>
            ELSS combines the best of both worlds – tax saving today and wealth
            creation for tomorrow. It is ideal for{' '}
            <strong>young professionals</strong> and investors with a{' '}
            <strong>5+ year horizon</strong>.
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              <strong>Start Early:</strong> Begin a monthly SIP in April to
              avoid year-end stress.
            </li>
            <li>
              <strong>Think Long Term:</strong> While lock-in is 3 years, aim to
              hold for 7-10 years.
            </li>
            <li>
              <strong>Stay Disciplined:</strong> Don&apos;t stop SIPs during
              market downturns; that&apos;s when you accumulate more units.
            </li>
          </ul>
        </section>

        {/* --- FAQ Section --- */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ marginBottom: 20 }}>FAQs: ELSS Mutual Funds</h2>

          <div className="faqs-accordion">
            <details>
              <summary>Can I invest more than ₹1.5 lakh in ELSS?</summary>
              <p>
                Yes, you can invest any amount. However, only ₹1,50,000
                qualifies for tax deduction under Section 80C. Excess amount
                continues to grow but without tax benefit.
              </p>
            </details>

            <details>
              <summary>
                What happens if I don&apos;t redeem after 3 years?
              </summary>
              <p>
                Nothing negative. Your investment continues to grow. You can
                redeem anytime after 3 years whenever you need – there is no
                compulsion to withdraw.
              </p>
            </details>

            <details>
              <summary>Can I switch ELSS funds during lock-in?</summary>
              <p>
                No. Switching is treated as redemption and purchase. Since
                redemption is not allowed during the 3-year lock-in, you cannot
                switch funds.
              </p>
            </details>

            <details>
              <summary>Is ELSS better than PPF?</summary>
              <p>
                ELSS is better for wealth creation (12-15% potential) and
                liquidity (3 years). PPF is better for safety (Govt backed) and
                complete tax exemption (EEE), but has a 15-year lock-in.
              </p>
            </details>

            <details>
              <summary>Do I need to file ITR if I redeem ELSS?</summary>
              <p>
                You should file ITR if your total income exceeds the basic
                exemption limit or if your Long Term Capital Gains exceed ₹1.25
                Lakh.
              </p>
            </details>
          </div>
        </div>

        <AuthorBio />

        <div className="legal-disclaimer">
          <p>
            <strong>Disclaimer:</strong> Mutual Fund investments are subject to
            market risks, read all scheme related documents carefully. The past
            performance of mutual funds is not necessarily indicative of future
            performance. This article is for educational purposes only and does
            not constitute financial advice. Please consult a tax advisor before
            making investment decisions.
          </p>
        </div>
      </article>
    </>
  );
}
