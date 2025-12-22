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
  title: 'Car Loan Guide 2025: Rates, Foreclosure & Hypothecation',
  description:
    'Car loan guide 2025: Compare new vs used car interest rates, understand flat vs reducing rates, foreclosure charges, hypothecation removal (Form 35) & more.',
  keywords: [
    'car loan interest rates 2025',
    'new vs used car loan india',
    'flat rate vs reducing balance car loan',
    'remove hypothecation from rc',
    'car loan foreclosure charges',
    'sbi car loan vs hdfc',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/car-loan-guide',
  },
  openGraph: {
    title:
      'Car Loan Guide 2025: New vs Used Car Interest Rates & Hypothecation',
    description:
      'Don’t get trapped by Flat Rates. Learn how to save lakhs on your car loan and remove hypothecation easily.',
    url: 'https://www.fincado.com/guides/car-loan-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/car-loan/car-loan-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Happy family with new car keys',
      },
    ],
  },
};

export default function CarLoanGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Car Loan Guide',
            url: 'https://www.fincado.com/guides/car-loan-guide',
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
              'Car Loan Guide 2025: New vs Used Car Interest Rates & Hypothecation',
            description:
              'Complete guide on Car Loans in India: Interest rates, Flat vs Reducing balance, and Hypothecation removal process.',
            image:
              'https://www.fincado.com/images/guides/car-loan/car-loan-guide-hero.webp',
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
            datePublished: '2025-01-20',
            dateModified: '2025-01-20',
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
                name: 'What is the interest rate on used car loans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Used car loan interest rates typically range from 8.9% to 15% p.a., which is generally 1-3% higher than new car loans.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I remove hypothecation from RC?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'After closing the loan, obtain an NOC from the lender. Submit Form 35 along with the NOC and original RC to your local RTO to remove the hypothecation.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between flat and reducing interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Flat rate calculates interest on the full principal for the entire tenure. Reducing rate calculates interest only on the outstanding balance. A 7% Flat Rate is roughly equal to a 13% Reducing Rate.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Auto Finance</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          Car Loan Guide 2025: Rates, Hypothecation & Hidden Traps
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
          <ShareTools title="Car Loan Guide 2025: Rates & Hypothecation" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Buying a car—whether new or used—is a major financial decision, and choosing the right <strong>car loan</strong> can save you lakhs over the loan tenure. This comprehensive <strong>Car Loan Guide 2025</strong> covers everything from interest rate differences between new and used car loans, the hidden "flat rate" trap, hypothecation removal after loan closure, and smart foreclosure strategies.

          Whether you're hunting for the best <strong>used car loan interest rate</strong> or trying to understand <strong>car loan foreclosure charges</strong>, this guide provides clear, actionable insights to help you make informed decisions.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/car-loan/car-loan-guide-hero.webp"
          alt="Indian family celebrating new car delivery"
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

      <h2>What is a Car Loan?</h2>
      <WikiText
        content={`
          A <strong>car loan</strong> is a secured loan provided by banks, NBFCs, and financial institutions to help you purchase a new or used car. The vehicle itself serves as collateral, and the lender holds a "hypothecation" over the car until the loan is fully repaid.
        `}
      />

      <div className="callout-box info-box">
        <h3>Key Components:</h3>
        <ul>
          <li>
            <strong>Principal Amount:</strong> The loan amount borrowed
            (typically 70-90% of value).
          </li>
          <li>
            <strong>Interest Rate:</strong> Cost of borrowing (percentage per
            annum).
          </li>
          <li>
            <strong>Tenure:</strong> Repayment period, usually 1 to 7 years.
          </li>
          <li>
            <strong>Hypothecation:</strong> Lender&apos;s legal claim on the
            vehicle until repayment.
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#how-it-works">1. How Car Loans Work</a>
          </li>
          <li>
            <a href="#new-vs-used">2. New vs Used Car Loans</a>
          </li>
          <li>
            <a href="#flat-rate-trap">3. The &ldquo;Flat Rate&ldquo; Trap</a>
          </li>
          <li>
            <a href="#tax-benefits">4. Tax Benefits & Risks</a>
          </li>
          <li>
            <a href="#hypothecation">5. Hypothecation Removal</a>
          </li>
          <li>
            <a href="#foreclosure">6. Foreclosure & Prepayment</a>
          </li>
          <li>
            <a href="#faqs">7. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-car-1" type="leaderboard" />
      </div>

      <h2 id="how-it-works">How Does a Car Loan Work in India?</h2>
      <ol>
        <li>
          <strong>Eligibility Check:</strong> Verify income, credit score, and
          age.
        </li>
        <li>
          <strong>Loan Approval:</strong> Lender issues sanction letter with
          terms.
        </li>
        <li>
          <strong>Documentation:</strong> Sign agreement; lender marks
          &quot;hypothecation&quot; on RC.
        </li>
        <li>
          <strong>Disbursement:</strong> Amount paid directly to dealer/seller.
        </li>
        <li>
          <strong>Repayment:</strong> Pay monthly EMIs.
        </li>
        <li>
          <strong>Closure:</strong> Get NOC and remove hypothecation from RC.
        </li>
      </ol>

      <h2 id="eligibility">Eligibility, Limits & Rules</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Age</strong>
              </td>
              <td>21 to 65 years</td>
            </tr>
            <tr>
              <td>
                <strong>Min Income</strong>
              </td>
              <td>₹15,000 - ₹25,000/month</td>
            </tr>
            <tr>
              <td>
                <strong>Credit Score</strong>
              </td>
              <td>750+ ideal (650+ considered)</td>
            </tr>
            <tr>
              <td>
                <strong>LTV Ratio</strong>
              </td>
              <td>Up to 90% (New) / 80% (Used)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- SECTION: NEW VS USED --- */}
      <h2 id="new-vs-used">New vs Used Car Loans: Detailed Comparison</h2>
      <p>
        One of the most critical decisions is whether to finance a new or used
        car. Interest rates, tenure, and Loan-to-Value (LTV) ratios differ
        significantly.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>New Car Loan</th>
              <th>Used Car Loan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Interest Rate</strong>
              </td>
              <td>
                <strong>7.6% - 10% p.a.</strong>
              </td>
              <td>
                <strong>8.9% - 15% p.a.</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Max Tenure</strong>
              </td>
              <td>Up to 7 Years (84 months)</td>
              <td>Up to 5 Years (60 months)</td>
            </tr>
            <tr>
              <td>
                <strong>LTV Ratio</strong>
              </td>
              <td>85-90% of On-Road Price</td>
              <td>70-85% of Market Value</td>
            </tr>
            <tr>
              <td>
                <strong>Processing Fees</strong>
              </td>
              <td>Low (₹3k - ₹10k)</td>
              <td>High (1% - 2% of loan)</td>
            </tr>
            <tr>
              <td>
                <strong>Best For</strong>
              </td>
              <td>Latest models, warranty</td>
              <td>Budget buyers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Key Takeaway:</strong> New car loans offer lower interest rates
        and longer tenure. Used car loans are costlier but allow you to buy a
        car at a lower upfront price.
      </div>

      {/* --- SECTION: FLAT RATE TRAP --- */}
      <h2 id="flat-rate-trap">
        The &quot;Flat Rate&ldquo; Trap: What You Need to Know
      </h2>
      <WikiText
        content={`Many car dealers advertise attractive offers like <strong>"Car loan at just 7% flat rate!"</strong>—but this is misleading.
        
        <strong>Flat Rate:</strong> Interest is calculated on the *original loan amount* for the entire tenure.
        <strong>Reducing Balance Rate:</strong> Interest is calculated on the *outstanding principal*, which reduces every month.
        `}
      />

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The Trap</div>
          <div className="myth-title">
            Dealer says: &quot;7% Interest Rate (Flat)&quot;
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              On a ₹5 Lakh loan for 5 years, you pay interest on the full ₹5
              Lakhs even in the last year (when you owe much less).
            </p>
          </div>
          <div className="reality-box">
            <strong>The Truth:</strong> A 7% Flat Rate is actually equal to a{' '}
            <strong>~13% Reducing Balance Rate</strong>. You are paying almost
            double the interest!
          </div>
        </div>
      </div>

      <h3>Comparison Table: Flat vs Reducing Rate</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>7% Flat Rate</th>
              <th>~7% Reducing Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Interest</td>
              <td>₹1,75,000</td>
              <td>~₹95,000</td>
            </tr>
            <tr>
              <td>Total Repaid</td>
              <td>₹6,75,000</td>
              <td>~₹5,95,000</td>
            </tr>
            <tr>
              <td>
                <strong>Actual Cost</strong>
              </td>
              <td style={{ color: '#dc2626', fontWeight: 'bold' }}>
                Much Higher
              </td>
              <td
                style={{
                  color: 'var(--color-brand-green)',
                  fontWeight: 'bold',
                }}
              >
                Transparent & Lower
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Pro Tip:</strong> Always ask for the &quot;Annual Percentage
        Rate (APR)&quot; in reducing balance terms.
      </p>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-car-2" type="leaderboard" />
      </div>

      <h2 id="tax-benefits">Tax Benefits on Car Loans</h2>
      <p>
        Unlike home loans,{' '}
        <strong>personal car loans do NOT offer tax deductions</strong> for
        salaried individuals.
      </p>

      <div className="example-box">
        <h4>Exception: Business Use</h4>
        <p>If you are self-employed or use the car for business:</p>
        <ul>
          <li>
            <strong>Interest:</strong> Can be claimed as a business expense.
          </li>
          <li>
            <strong>Depreciation:</strong> Can be claimed as a business asset
            (15% p.a.).
          </li>
        </ul>
      </div>

      <h2>Returns, Interest, or Growth Potential</h2>
      <p>
        Car loans are <strong>not investment products</strong>. A car is a
        depreciating asset.
      </p>
      <ul>
        <li>
          <strong>No Returns:</strong> Value drops 10-15% per year.
        </li>
        <li>
          <strong>Interest Cost:</strong> You pay extra over the car&apos;s
          price.
        </li>
        <li>
          <strong>Opportunity Cost:</strong> Money spent on EMI could have been
          invested.
        </li>
      </ul>

      <h2>Risks & Things to Consider</h2>
      <ul className="checklist">
        <li>
          <strong>Depreciation:</strong> New cars lose 20-30% value in first 2-3
          years.
        </li>
        <li>
          <strong>Foreclosure Charges:</strong> Penalty of 2-6% for early
          closing.
        </li>
        <li>
          <strong>Hidden Charges:</strong> Processing fees, documentation
          charges.
        </li>
        <li>
          <strong>Insurance:</strong> Mandatory comprehensive cover adds to
          cost.
        </li>
      </ul>

      {/* --- SECTION: HYPOTHECATION --- */}
      <h2 id="hypothecation">Hypothecation Removal: Step-by-Step Guide</h2>
      <WikiText
        content={`Once you pay off your car loan, the lender's hypothecation must be removed from the <strong>RC (Registration Certificate)</strong>. If skipped, you technically cannot sell the car easily.`}
      />

      <div
        className="alt-options-box"
        style={{ background: '#fff', marginTop: 24 }}
      >
        <h3 style={{ marginTop: 0 }}>The Process</h3>
        <ul className="checklist">
          <li>
            <strong>Step 1: Get NOC</strong>
            <br />
            Request &quot;No Objection Certificate&quot; and Form 35 from lender
            after loan closure.
          </li>
          <li>
            <strong>Step 2: Collect Documents</strong>
            <br />
            Original RC, PUC, Insurance, ID Proof, and Bank NOC/Form 35.
          </li>
          <li>
            <strong>Step 3: Visit RTO</strong>
            <br />
            Submit documents to your registered RTO and pay fee (₹100-₹300).
          </li>
          <li>
            <strong>Step 4: Update RC</strong>
            <br />
            Receive updated RC Smart Card without hypothecation in 15-30 days.
          </li>
        </ul>
      </div>

      {/* --- SECTION: FORECLOSURE --- */}
      <h2 id="foreclosure">Car Loan Foreclosure: When & How to Prepay</h2>
      <p>
        <strong>Foreclosure</strong> means paying off the loan before tenure
        ends. <strong>Prepayment</strong> is partial payment.
      </p>

      <h3>Foreclosure Charges</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timing</th>
              <th>Typical Penalty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>6-12 Months</td>
              <td>5-6% of Principal</td>
            </tr>
            <tr>
              <td>13-24 Months</td>
              <td>3-5% of Principal</td>
            </tr>
            <tr>
              <td>After 24 Months</td>
              <td>2-3% (or 0% for some)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Break-Even Analysis: Should You Foreclose?</h3>
      <p>
        Foreclose only if:{' '}
        <strong>Interest Saved &gt; Foreclosure Penalty</strong>.
      </p>
      <div className="example-box">
        <strong>Example Scenario:</strong>
        <ul>
          <li>Outstanding Principal: ₹3,20,000</li>
          <li>Remaining Interest: ₹62,464 (if continued)</li>
          <li>Foreclosure Penalty (4%): ₹12,800</li>
          <li>
            <strong>Net Savings:</strong> ₹62,464 - ₹12,800 ={' '}
            <strong>₹49,664</strong> ✅
          </li>
        </ul>
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-car-3" type="leaderboard" />
      </div>

      <h2 id="alternatives">Car Loan vs Alternatives</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Car Loan</th>
              <th>Cash Purchase</th>
              <th>Subscription</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Ownership</strong>
              </td>
              <td>Yes (End of tenure)</td>
              <td>Yes (Immediate)</td>
              <td>No</td>
            </tr>
            <tr>
              <td>
                <strong>Upfront Cost</strong>
              </td>
              <td>10-20%</td>
              <td>100%</td>
              <td>Minimal</td>
            </tr>
            <tr>
              <td>
                <strong>Monthly Cost</strong>
              </td>
              <td>EMI</td>
              <td>Zero</td>
              <td>Rental Fee</td>
            </tr>
            <tr>
              <td>
                <strong>Total Cost</strong>
              </td>
              <td>High (Interest)</td>
              <td>Lowest</td>
              <td>Highest</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Who Should Take a Car Loan?</h2>
      <ul>
        <li>
          ✅ <strong>Salaried Professionals:</strong> Structured EMIs fit
          monthly budgets.
        </li>
        <li>
          ✅ <strong>Business Owners:</strong> Liquidity for business;
          depreciation benefits.
        </li>
        <li>
          ✅ <strong>First-Time Buyers:</strong> Builds credit history.
        </li>
        <li>
          ❌ <strong>Think Twice If:</strong> You have unstable income or are
          already over-leveraged.
        </li>
      </ul>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>
            What is the interest rate on used car loans in India?
          </summary>
          <p>
            Rates typically range from <strong>8.9% to 15% p.a.</strong>,
            depending on lender, car age, and credit profile. generally 1-3%
            higher than new cars.
          </p>
        </details>
        <details>
          <summary>What are car loan foreclosure charges?</summary>
          <p>
            Typically <strong>2-6% of outstanding principal</strong>. Many
            lenders waive penalties after 12-24 months.
          </p>
        </details>
        <details>
          <summary>How is flat rate different from reducing rate?</summary>
          <p>
            Flat rate charges interest on the original loan amount throughout.
            Reducing rate charges only on the outstanding balance. 7% Flat ≈ 13%
            Reducing.
          </p>
        </details>
        <details>
          <summary>Can I get tax benefits on car loans?</summary>
          <p>
            No, not for personal use. Self-employed individuals can claim
            interest as business expense.
          </p>
        </details>
        <details>
          <summary>What is the maximum tenure?</summary>
          <p>New cars: Up to 7 years. Used cars: Up to 5 years.</p>
        </details>
        <details>
          <summary>When should I prepay?</summary>
          <p>
            When interest saved exceeds the penalty. Ideally after the lock-in
            period (usually 12 months).
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>A car loan makes ownership accessible but requires smart choices.</p>
        <h4>Key Takeaways:</h4>
        <ul className="checklist">
          <li>
            Choose <strong>New Car Loans</strong> for lower rates (7.6%).
          </li>
          <li>
            Beware of <strong>Flat Rates</strong> (Ask for APR).
          </li>
          <li>
            Remove <strong>Hypothecation</strong> after closure.
          </li>
          <li>
            <strong>Foreclose Smartly</strong> using break-even analysis.
          </li>
        </ul>
        <p>
          Whether financing a hatchback or SUV, this guide helps you save
          thousands.
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
        <strong>Disclaimer:</strong> Interest rates and terms change. This guide
        is for educational purposes. Check latest terms with your lender.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Buying a car soon?</h2>
          <p>
            Use our smart calculator to compare Flat vs Reducing rates and find
            your true EMI.
          </p>
          <div className="final-cta-row">
            <Link href="/loans/car-loan" className="primary-cta">
              Calculate Car EMI
            </Link>
            <Link
              href="/calculators/simple-interest-calculator"
              className="secondary-cta"
            >
              Check Flat Rate Truth
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-car-4" type="leaderboard" />
      </div>
    </article>
  );
}
