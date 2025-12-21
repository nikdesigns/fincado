import type { Metadata } from 'next';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'New vs Old Tax Regime 2025: Which is Better? (Calculator & Slabs)',
  description:
    'Compare New vs Old Tax Regime slabs for FY 2025-26. Calculate exemptions, 80C deductions, and breakeven points to save maximum tax.',
  alternates: {
    canonical: 'https://www.fincado.com/guides/new-vs-old-tax-regime-2025',
  },
};

export default function TaxRegimeGuide() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'New vs Old Tax Regime',
            url: 'https://www.fincado.com/guides/new-vs-old-tax-regime-2025',
          },
        ]}
      />

      <article className="article">
        <header
          style={{
            marginBottom: 32,
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-brand-green)',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Tax Planning
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            New vs Old Tax Regime 2025: Which is Better for You? (Complete
            Guide)
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            Every year between January and March, millions of Indian taxpayers
            face the same dilemma: should I choose the new tax regime or stick
            with the old one? With Budget 2025 making the new regime even more
            attractive, this decision has become critical.
          </p>
        </header>

        {/* 🖼️ IMAGE 1: HERO IMAGE (Save as: public/images/guides/tax/hero-tax-regime.webp) */}
        <figure style={{ marginBottom: 32 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#f1f5f9',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/guides/tax/hero-tax-regime.webp"
              alt="Old vs New Tax Regime Comparison 2025"
              fill
              style={{ objectFit: 'cover' }}
              // Simple error handler or fallback could be added here
            />
          </div>
        </figure>

        {/* AD SLOT 1 */}
        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id="tax-guide-top" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>Understanding the Two Tax Regimes</h2>
          <p>India currently offers taxpayers a choice between two distinct income tax structures, each with its own philosophy and benefits.</p>

          <h3>Old Tax Regime (Default until FY 2022-23)</h3>
          <p>The old tax regime follows the traditional tax structure. Its defining characteristic is the availability of numerous deductions and exemptions that can significantly reduce your taxable income.</p>
          <ul>
            <li>Multiple deductions available (80C, 80D, HRA, LTA, etc.)</li>
            <li>Higher tax rates on lower income slabs</li>
            <li>Requires tax-saving investments and documentation</li>
          </ul>

          <h3>New Tax Regime (Default from FY 2023-24)</h3>
          <p>Introduced in Budget 2020 and made default from FY 2023-24, the new regime offers lower tax rates but eliminates most deductions. Budget 2025 has made it even more taxpayer-friendly.</p>
          <ul>
            <li>Lower and simplified tax rates</li>
            <li>Minimal deductions (only standard deduction and employer NPS)</li>
            <li>Less paperwork and documentation</li>
            <li>Default option (you must actively choose old regime if preferred)</li>
          </ul>
        `}
        />

        <hr
          style={{
            margin: '40px 0',
            border: 0,
            borderTop: '1px solid #e2e8f0',
          }}
        />

        <WikiText
          content={`
          <h2>Income Tax Slabs 2025-26: Complete Comparison</h2>
          <p>Understanding the exact tax slabs is crucial for making an informed decision. Here's the complete breakdown for FY 2025-26.</p>

          <h3>New Tax Regime Slabs (FY 2025-26)</h3>
          <div class="table-container">
            <table class="rate-table">
              <thead>
                <tr><th>Income Slab</th><th>Tax Rate</th><th>Tax Calculation</th></tr>
              </thead>
              <tbody>
                <tr><td>Up to ₹4,00,000</td><td>NIL</td><td>No tax</td></tr>
                <tr><td>₹4,00,001 to ₹8,00,000</td><td>5%</td><td>5% on income above ₹4 lakh</td></tr>
                <tr><td>₹8,00,001 to ₹12,00,000</td><td>10%</td><td>₹20,000 + 10% on income above ₹8 lakh</td></tr>
                <tr><td>₹12,00,001 to ₹16,00,000</td><td>15%</td><td>₹60,000 + 15% on income above ₹12 lakh</td></tr>
                <tr><td>₹16,00,001 to ₹20,00,000</td><td>20%</td><td>₹1,20,000 + 20% on income above ₹16 lakh</td></tr>
                <tr><td>₹20,00,001 to ₹24,00,000</td><td>25%</td><td>₹2,00,000 + 25% on income above ₹20 lakh</td></tr>
                <tr><td>Above ₹24,00,000</td><td>30%</td><td>₹3,00,000 + 30% on income above ₹24 lakh</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout-box">
            <strong>Important Benefits:</strong>
            <ul>
              <li>Standard deduction: ₹75,000 for salaried individuals</li>
              <li>Tax rebate under Section 87A: ₹60,000 (making income up to ₹12 lakh tax-free)</li>
              <li><strong>Effectively tax-free income: Up to ₹12.75 lakh for salaried individuals</strong></li>
            </ul>
          </div>
        `}
        />

        {/* AD SLOT 2 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="tax-guide-slabs-bottom" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Deductions Allowed in Old Tax Regime (Complete List)</h2>
          <p>The old regime's biggest advantage is the extensive list of deductions and exemptions available. Here's a comprehensive breakdown:</p>
        `}
        />

        {/* 🖼️ IMAGE 2: DEDUCTIONS (Reusing your existing Home Loan image as a fallback/placeholder) */}
        <figure style={{ margin: '32px 0' }}>
          <Image
            src="/images/guides/home-loan/tax-benefits-80c-24b.webp"
            alt="Tax Deductions under Section 80C and 24b"
            width={800}
            height={450}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          />
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#64748b',
              marginTop: '8px',
            }}
          >
            The Old Regime allows deductions for Home Loan Interest (Sec 24b)
            and Investments (Sec 80C).
          </figcaption>
        </figure>

        <WikiText
          content={`
          <h3>Section 80C Deductions (Maximum ₹1,50,000)</h3>
          <ul>
            <li><strong>Employee Provident Fund (EPF)</strong> – Mandatory deduction, tax-free</li>
            <li><strong>Public Provident Fund (PPF)</strong> – 7.1% interest, 15-year lock-in</li>
            <li><strong>ELSS Funds</strong> – Market-linked, 3-year lock-in</li>
            <li><strong>Life Insurance Premium</strong> – For self, spouse, children</li>
            <li><strong>Home Loan Principal Repayment</strong> – Up to ₹1.5 lakh limit</li>
          </ul>

          <h3>Section 80D: Health Insurance Premium</h3>
          <p>Deduction for medical insurance premiums paid for self, family, and parents. Maximum deduction ranges from ₹25,000 to ₹1,00,000 depending on the age of the insured.</p>

          <h3>House Rent Allowance (HRA) Exemption</h3>
          <p>If you are a salaried individual living in rented accommodation, you can claim HRA exemption. This often saves ₹1.5L to ₹3L annually for metro residents.</p>
        `}
        />

        {/* AD SLOT 3 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="tax-guide-mid-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>Breakeven Analysis: At What Income Should You Switch?</h2>
          <p>This is the million-rupee question. The answer depends on your income level and how many deductions you can actually claim.</p>
        `}
        />

        {/* 🖼️ IMAGE 3: BREAKEVEN CHART (Save as: public/images/guides/tax/breakeven-chart.webp) */}
        <figure style={{ margin: '32px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#f8fafc',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
            }}
          >
            <Image
              src="/images/guides/tax/breakeven-chart.webp"
              alt="Tax Regime Breakeven Analysis Chart"
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
            At approximately ₹15 Lakh income, you need ₹3.75 Lakh deductions for
            Old Regime to be beneficial.
          </figcaption>
        </figure>

        <WikiText
          content={`
          <h3>Scenario 1: Low Deduction Users</h3>
          <p><strong>Profile:</strong> Young professionals, single, living with parents, minimal investments.</p>
          <div class="table-container">
            <table class="rate-table">
              <thead><tr><th>Income</th><th>Old Regime Tax</th><th>New Regime Tax</th><th>Winner</th></tr></thead>
              <tbody>
                <tr><td>₹8,00,000</td><td>₹45,000</td><td>NIL</td><td><strong>New</strong></td></tr>
                <tr><td>₹12,00,000</td><td>₹1,22,500</td><td>NIL</td><td><strong>New</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Verdict:</strong> For income up to ₹15 lakh with minimal deductions, <strong>new regime is clearly better.</strong></p>

          <h3>Scenario 2: Moderate Deduction Users</h3>
          <p><strong>Profile:</strong> Salaried with home loan, taking HRA, investing in 80C.</p>
          <div class="table-container">
            <table class="rate-table">
              <thead><tr><th>Income</th><th>Deductions</th><th>Old Regime Tax</th><th>New Regime Tax</th></tr></thead>
              <tbody>
                <tr><td>₹12,00,000</td><td>₹3,00,000</td><td>₹52,500</td><td>NIL</td></tr>
                <tr><td>₹15,00,000</td><td>₹3,00,000</td><td>₹1,02,500</td><td>₹75,000</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Verdict:</strong> Between ₹10-15 lakh, it's marginal. Above ₹15 lakh, old regime can be better if you have substantial deductions.</p>
        `}
        />

        {/* AD SLOT 4 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="tax-guide-after-breakeven" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Real-Life Examples</h2>
          
          <h3>Example 1: Fresh Graduate (₹8 Lakh Salary)</h3>
          <ul>
            <li><strong>Old Regime Tax:</strong> ₹38,000</li>
            <li><strong>New Regime Tax:</strong> NIL (Due to rebate)</li>
            <li><strong>Winner:</strong> New Regime saves ₹38,000</li>
          </ul>

          <h3>Example 2: Mid-Career Professional (₹18 Lakh Salary)</h3>
          <p>Assuming HRA, Home Loan Interest, and 80C are claimed.</p>
          <ul>
            <li><strong>Old Regime Tax:</strong> ₹1,29,400</li>
            <li><strong>New Regime Tax:</strong> ₹1,45,000</li>
            <li><strong>Winner:</strong> Old Regime saves ₹15,600</li>
          </ul>
        `}
        />

        {/* AD SLOT 5 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="tax-guide-mid-content" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>How to Switch Tax Regimes During ITR Filing</h2>
          <h3>Default Regime</h3>
          <p><strong>New regime is the default</strong> for all taxpayers. If you do nothing, you'll automatically be under the new regime. You must actively opt for old regime if you want its benefits.</p>

          <h3>Switching for Salaried Individuals</h3>
          <ul>
            <li><strong>Switch to Old Regime:</strong> Declare your choice at the beginning of the financial year to your employer.</li>
            <li><strong>Switch to New Regime:</strong> Simply don't opt for old regime.</li>
            <li><strong>Frequency:</strong> Salaried individuals can switch <strong>every year</strong> as per convenience.</li>
          </ul>
        `}
        />

        {/* AD SLOT 6 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="tax-guide-in-content-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Strategic Considerations & Common Mistakes</h2>
          <h3>1. Investment Discipline</h3>
          <p>The new regime requires no compulsion to invest, but you might not build wealth systematically. The old regime forces disciplined investing through tax-saving requirements.</p>

          <h3>2. Common Mistakes</h3>
          <ul>
            <li><strong>Choosing Based on This Year Alone:</strong> Don't optimize for one year. Consider 3-5 year projection.</li>
            <li><strong>Ignoring TDS Implications:</strong> Ensure your employer deducts TDS based on your chosen regime to avoid refund delays.</li>
          </ul>
        `}
        />

        {/* AD SLOT 7 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="tax-guide-bottom" type="leaderboard" />
        </div>

        <section
          style={{
            background: '#f0fdf4',
            padding: 24,
            borderRadius: 12,
            border: '1px solid #bbf7d0',
            marginTop: 40,
          }}
        >
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            Conclusion: Make an Informed Choice
          </h2>
          <p style={{ marginBottom: 16 }}>
            There&apos;s no universal answer—it depends entirely on your income
            level, actual deductions, life stage, and financial goals.
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>
              <strong>New regime is default;</strong> actively choose old if you
              need it.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Up to ₹12.75 lakh</strong> is effectively tax-free under
              new regime for salaried.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Old regime</strong> wins at ₹15 lakh+ income if you have
              loans and investments.
            </li>
          </ul>
          <p>
            Take control of your tax planning today—the choice you make can save
            you lakhs over time.
          </p>
        </section>
      </article>
    </>
  );
}
