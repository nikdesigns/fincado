import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import LiveRateTable from '@/components/LiveRateTable';

export const metadata: Metadata = {
  title: 'Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden Charges',
  description:
    'Complete home loan guide for India: CIBIL score, FOIR, tax benefits (80C, 24b, 80EEA), RLLR vs MCLR, hidden charges & first-time buyer tips.',
  keywords: [
    'Home Loan Guide India',
    'Home Loan Tax Benefit 2025',
    'Section 80EEA',
    'RLLR vs MCLR',
    'First time home buyer guide',
    'Home Loan Process',
    'CIBIL score for home loan',
  ],
  openGraph: {
    title: 'Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden Charges',
    description:
      'Save lakhs on your home loan with these expert tips on tax, interest rates, and eligibility.',
    type: 'article',
    url: 'https://www.fincado.com/guides/home-loan-guide',
    images: [
      {
        url: '/images/guides/home-loan/home-loan-guide-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HomeLoanGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Home Loan Guide 2025',
            url: 'https://www.fincado.com/guides/home-loan-guide',
          },
        ]}
      />

      {/* --- Article Schema --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'The Complete Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden Charges',
            image:
              'https://www.fincado.com/images/guides/home-loan/home-loan-guide-hero.webp',
            datePublished: '2025-01-15T08:00:00+05:30',
            dateModified: '2025-01-15T09:00:00+05:30',
            author: {
              '@type': 'Person',
              name: 'Fincado Editorial Team',
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
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header
        className="guide-header no-print"
        style={{
          marginBottom: 32,
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 24,
        }}
      >
        <span className="badge-flagship">Flagship Guide</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          The Complete Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden
          Charges
        </h1>
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            color: 'var(--color-text-muted)',
            fontSize: 14,
            marginTop: 12,
          }}
        >
          <span>
            By <strong>Fincado Team</strong>
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>15 min read</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <ShareTools title="The Complete Home Loan Guide 2025" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          <p class="lead">
            Buying your first home in India is one of the biggest financial decisions you'll ever make, 
            and choosing the right <strong>Home Loan</strong> can save you lakhs of rupees over the loan tenure. 
            This comprehensive guide covers everything from CIBIL score requirements and tax benefits to 
            hidden charges, helping you make an informed decision before signing on the dotted line.
          </p>
          <p>
            Whether you're a first-time home buyer or looking to refinance, understanding 
            <strong>home loan eligibility criteria</strong>, <strong>tax deductions under Section 80C, 24(b), and 80EEA</strong>, 
            and the difference between <strong>RLLR vs MCLR</strong> will put you in control of your home-buying journey.
          </p>
        `}
      />
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/home-loan/happy-couple-new-home.webp"
          alt="Happy Indian couple holding house keys in a sun-lit modern apartment"
          width={1200}
          height={675}
          priority
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
        />
        <p
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginTop: '8px',
            fontStyle: 'italic',
          }}
        >
          Secure your dream home with the right loan strategy.
        </p>
      </div>

      <h2>What is a Home Loan?</h2>
      <WikiText
        content={`
          <p>
            A <strong>home loan (also called a housing loan or mortgage)</strong> is a secured loan provided by banks and 
            housing finance companies to help you purchase, construct, renovate, or extend residential property.
          </p>
          <p>Key components include:</p>
          <ul>
            <li><strong>Principal Amount:</strong> The total loan amount borrowed.</li>
            <li><strong>Interest Rate:</strong> The cost of borrowing (fixed or floating).</li>
            <li><strong>Tenure:</strong> The repayment period, typically ranging from 5 to 30 years.</li>
            <li>
              <strong>EMI:</strong> The monthly payment comprising both principal and interest.
              You can calculate your exact monthly outflow using our
              <a href="/emi-calculator/">EMI Calculator</a> before applying.
            </li>
          </ul>
        `}
      />

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-1" type="leaderboard" />
      </div>

      <h2>How Does a Home Loan Work in India?</h2>
      <WikiText
        content={`
          <p>The home loan process typically follows these steps:</p>
          <ol>
            <li><strong>Pre-Approval Check:</strong> Assess your eligibility and get a sanction letter.</li>
            <li><strong>Property Selection & Documentation:</strong> Submit documents for technical and legal verification.</li>
            <li><strong>Loan Disbursement:</strong> Funds are released to the seller/builder.</li>
            <li><strong>Repayment via EMI:</strong> Start paying EMIs and claiming tax benefits.</li>
          </ol>
        `}
      />

      <h2>The &quot;Pre-Sanction&quot; Checklist: Eligibility Criteria</h2>
      <p>
        Before you apply, make sure you meet these critical eligibility
        parameters:
      </p>

      <h3>1. CIBIL Score Requirements</h3>
      <WikiText
        content={`
          <p>
            Your <strong>CIBIL score</strong> is the single most important factor determining loan approval and interest rates.
          </p>
        `}
      />

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>CIBIL Score Range</th>
              <th>Loan Eligibility Status</th>
              <th>Interest Rate Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>750+ (Excellent)</strong>
              </td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                Very high chance of approval
              </td>
              <td>Lowest rates; banks compete for you</td>
            </tr>
            <tr>
              <td>
                <strong>700-749 (Good)</strong>
              </td>
              <td>High approval chances</td>
              <td>Slightly higher than top tier</td>
            </tr>
            <tr>
              <td>
                <strong>650-699 (Fair)</strong>
              </td>
              <td>Moderate approval chances</td>
              <td>Higher interest rates; stricter scrutiny</td>
            </tr>
            <tr>
              <td>
                <strong>Below 650 (Poor)</strong>
              </td>
              <td style={{ color: '#dc2626' }}>Low approval chances</td>
              <td>Very high rates; may face rejection</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2. FOIR (Fixed Obligation to Income Ratio) Explained</h3>
      <WikiText
        content={`
          <p>
            <strong>FOIR</strong> is the ratio of your total monthly debt obligations to your gross monthly income. 
            Most lenders prefer a FOIR of <strong>40-50%</strong> or lower.
          </p>
          <p>
            You can simulate different income, FOIR, and EMI combinations using our
            <a href="/emi-calculator">loan EMI calculator</a> to avoid over-borrowing.
          </p>
        `}
      />

      {/* --- CTA BOX --- */}
      <div
        className="guide-cta-box no-print"
        style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          padding: 24,
          borderRadius: 12,
          textAlign: 'center',
          margin: '32px 0',
        }}
      >
        <h3 style={{ marginTop: 0, color: '#166534' }}>
          Check Your Eligibility Now
        </h3>
        <p style={{ color: '#15803d' }}>
          Use our advanced calculator to see exactly how much loan you can
          afford based on your salary and existing EMIs.
        </p>
        <Link
          href="/loans/home-loan"
          className="primary-cta"
          style={{
            display: 'inline-block',
            marginTop: 12,
            color: '#166534',
            textDecoration: 'none',
            backgroundColor: 'white',
          }}
        >
          Home Loan EMI Calculator (Check Eligibility)
        </Link>
      </div>

      <h2>Home Loan Tax Benefits: The Crucial Section</h2>
      <WikiText
        content={`
          <p>
            One of the biggest advantages of taking a home loan in India is the significant 
            <strong>tax deductions</strong> available under the Income Tax Act, 1961.
          </p>
        `}
      />

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Covers</th>
              <th>Max Deduction</th>
              <th>Eligibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Section 80C</strong>
              </td>
              <td>Principal Repayment</td>
              <td>₹1,50,000/year</td>
              <td>All borrowers</td>
            </tr>
            <tr>
              <td>
                <strong>Section 24(b)</strong>
              </td>
              <td>Interest on loan</td>
              <td>₹2,00,000/year</td>
              <td>Self-occupied property</td>
            </tr>
            <tr>
              <td>
                <strong>Section 80EEA</strong>
              </td>
              <td>Additional Interest</td>
              <td>₹1,50,000/year</td>
              <td>First-time buyers (Affordable housing)*</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="caption-text">
        <em>
          *Note: Section 80EEA applies to loans sanctioned between April 1,
          2019, and March 31, 2022, for properties with stamp duty value up to
          ₹45 Lakhs.
        </em>
      </p>

      <h3>How to Claim Tax Benefits on a Joint Home Loan</h3>
      <WikiText
        content={`
          <p>
            When you take a <strong>joint home loan</strong> with a co-borrower (spouse, parent), 
            both can claim <strong>individual deductions</strong> under Section 80C and Section 24(b).
          </p>
          <p>
            This effectively <strong>doubles</strong> the total tax benefit available to the household 
            (e.g., total interest deduction of ₹4 Lakhs instead of ₹2 Lakhs).
          </p>
        `}
      />

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-2" type="leaderboard" />
      </div>

      <h2>Interest Rates: RLLR vs MCLR Explained</h2>
      <WikiText
        content={`
          <p>
            Home loan interest rates in India are benchmarked to either <strong>MCLR</strong> or <strong>RLLR</strong>. 
            Most experts now favor <strong>RLLR (Repo Linked Lending Rate)</strong> because it is directly linked 
            to the RBI's repo rate, offering faster transmission of rate cuts and greater transparency.
          </p>
          <p>
            Even a 0.5% rate change can significantly impact your EMI, which is why
            borrowers should always compare scenarios using an EMI calculator.
          </p>
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/home-loan/fixed-vs-floating-rates.webp"
          alt="Comparison of RLLR vs MCLR home loan interest rates"
          width={800}
          height={400}
          style={{ width: '100%', height: 'auto', borderRadius: 12 }}
        />
      </div>

      <h3 style={{ marginTop: '2rem' }}>Current Home Loan Rates (Live)</h3>
      <LiveRateTable type="homeLoan" />

      <h2>Hidden Charges List: What Banks Don&apos;t Highlight</h2>
      <p>
        While the interest rate gets the attention, these charges can increase
        your cost:
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Charge Type</th>
              <th>Typical Amount</th>
              <th>Negotiable?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Processing Fees</strong>
              </td>
              <td>0.25% - 1% of loan</td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                ✅ Yes (Often waived)
              </td>
            </tr>
            <tr>
              <td>
                <strong>MODT Charges</strong>
              </td>
              <td>₹2,000 - ₹10,000</td>
              <td>❌ No (Legal/Govt fee)</td>
            </tr>
            <tr>
              <td>
                <strong>Technical Fee</strong>
              </td>
              <td>₹2,000 - ₹5,000</td>
              <td>Sometimes included</td>
            </tr>
            <tr>
              <td>
                <strong>Prepayment Penalty</strong>
              </td>
              <td>
                <strong>Zero</strong> (Floating Rate)
              </td>
              <td>N/A (RBI Mandate)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Home Loan vs Renting</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Home Loan</th>
              <th>Renting</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Ownership</strong>
              </td>
              <td>Yes, after tenure</td>
              <td>No</td>
            </tr>
            <tr>
              <td>
                <strong>Monthly Outgo</strong>
              </td>
              <td>EMI (Principal + Interest)</td>
              <td>Rent (Expense)</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Benefits</strong>
              </td>
              <td>Yes (High)</td>
              <td>No (Except HRA)</td>
            </tr>
            <tr>
              <td>
                <strong>Flexibility</strong>
              </td>
              <td>Low (Long commitment)</td>
              <td>High (Relocate easily)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Final Verdict / Conclusion</h2>
      <div className="conclusion-box">
        <WikiText
          content={`
            <p>
              Buying a home in India is a strategic financial decision. To make the smartest choice:
            </p>
            <ul>
              <li>Aim for a <strong>CIBIL score of 750+</strong> before applying.</li>
              <li>Understand your <strong>FOIR</strong> and don't over-leverage.</li>
              <li>Maximize <strong>tax benefits</strong> under Sections 80C and 24(b).</li>
              <li>Choose <strong>RLLR-linked floating rate loans</strong> for better transparency.</li>
            </ul>
            <p>
              Whether you're a first-time buyer or upgrading, this guide equips you with the knowledge to 
              save lakhs over your loan tenure.
            </p>
          `}
        />
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-3" type="leaderboard" />
      </div>

      {/* --- FAQs --- */}
      <section className="article-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faqs-accordion">
          <details>
            <summary>
              Can I claim tax benefits on under-construction property?
            </summary>
            <p>
              No. You can only claim tax benefits (Sec 24b and 80C) starting
              from the financial year in which the construction is completed and
              possession is handed over. However, pre-construction interest can
              be claimed in 5 equal installments after possession.
            </p>
          </details>
          <details>
            <summary>Is it better to prepay my home loan?</summary>
            <p>
              Yes, especially in the early years. Since the interest component
              is highest in the initial years, even a small prepayment can
              reduce your tenure significantly. Use our calculator to check the
              impact.
            </p>
          </details>
          <details>
            <summary>What is the minimum down payment?</summary>
            <p>
              Banks typically finance 75% to 90% of the property value (LTV).
              You need to arrange the remaining 10% to 25% from your own funds
              as a down payment.
            </p>
          </details>
        </div>
      </section>

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

      {/* --- LEGAL DISCLAIMER --- */}
      <div className="legal-disclaimer">
        <strong>Disclaimer:</strong> The information provided in this guide is
        for educational purposes only. Interest rates, tax laws (Section 80C,
        24b), and bank policies change frequently. Please consult a qualified
        financial advisor or CA before making any final borrowing decisions.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Ready to calculate your home loan eligibility?</h2>
          <p>
            Use our free Home Loan EMI Calculator to plan your purchase and
            discover how much you can afford!
          </p>
          <div className="final-cta-row">
            <Link href="/loans/home-loan/" className="primary-cta">
              Home Loan EMI Calculator (Check Eligibility)
            </Link>
            <Link href="/credit-score" className="secondary-cta">
              Check Credit Score
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-4" type="leaderboard" />
      </div>
    </article>
  );
}
