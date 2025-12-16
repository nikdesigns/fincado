import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Home Loan Guide 2025: Eligibility, Tax Benefits & FOIR Rules',
  description:
    'Complete Home Loan Guide 2025 for first-time buyers: Eligibility, FOIR calculation, tax benefits (80C/24B), hidden charges & step-by-step application checklist.',
  keywords: [
    'home loan first time buyer India',
    'home loan eligibility 2025',
    'FOIR calculation',
    'home loan tax benefits',
    '80C 24B deduction',
    'fixed vs floating interest rate',
    'home loan application process',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/home-loan-for-first-time-buyers',
  },
  openGraph: {
    title: 'Home Loan Guide 2025 | First-Time Buyer Handbook',
    description:
      'Everything you need to know about Home Loans: FOIR, Tax Hacks, and Interest Rates.',
    url: 'https://www.fincado.com/guides/home-loan-for-first-time-buyers',
    type: 'article',
  },
};

export default function HomeLoanGuidePage() {
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
            '@id':
              'https://www.fincado.com/guides/home-loan-for-first-time-buyers#article',
            headline:
              'Home Loan for First-Time Buyers in India: Complete Guide 2025',
            description:
              'Complete Home Loan Guide 2025 covering eligibility, FOIR, tax benefits, and application steps.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                'https://www.fincado.com/guides/home-loan-for-first-time-buyers',
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
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
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
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                'https://www.fincado.com/guides/home-loan-for-first-time-buyers',
            },
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the minimum credit score required for a home loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most banks require a CIBIL score of 700+ for approval, though 750+ gets you the best interest rates (8.5%-8.75%).',
                },
              },
              {
                '@type': 'Question',
                name: 'How is FOIR calculated for home loans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FOIR = (Total Monthly Obligations ÷ Gross Monthly Income) × 100. Banks typically allow 50-60% FOIR.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the down payment percentage for home loans in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Down payment ranges from 10-25% depending on property value: 10% for loans up to ₹30 lakh, 20% for ₹30-75 lakh, and 25% for above ₹75 lakh.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the tax benefits on home loans in 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can save up to ₹3.5 lakh annually: ₹1.5 lakh under Section 80C (principal), ₹2 lakh under Section 24(b) (interest), and additional ₹1.5 lakh under Section 80EEA for eligible first-time buyers.',
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
        <span className="badge-flagship">Flagship Guide</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(30px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
            color: 'var(--color-text-main)',
          }}
        >
          Home Loan for First-Time Buyers in India: Complete Guide 2025
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
            Last Updated: <strong>Dec 15, 2025</strong>
          </span>
          <span>•</span>
          <span>15 Min Read</span>
          <span>•</span>
          <span style={{ color: 'var(--color-brand-green)' }}>
            Expert Reviewed
          </span>
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`A **home loan** (also called housing loan or mortgage) is a secured loan provided by banks and housing finance companies (HFCs) to help you purchase, construct, renovate, or extend residential property in India. The property itself serves as collateral, which is why home loans offer lower interest rates (8.5%-9.5% in 2025) compared to personal loans.`}
      />

      <h3>Types of Home Loans Available in India:</h3>
      <ol>
        <li>
          <strong>Home Purchase Loan</strong> – For buying ready-to-move or
          under-construction property
        </li>
        <li>
          <strong>Home Construction Loan</strong> – For building a house on
          owned land
        </li>
        <li>
          <strong>Home Extension Loan</strong> – For adding rooms or floors to
          existing property
        </li>
        <li>
          <strong>Home Improvement Loan</strong> – For renovation, repairs,
          painting
        </li>
        <li>
          <strong>Plot Loan</strong> – For purchasing residential land (higher
          rates: 9-11%)
        </li>
        <li>
          <strong>Balance Transfer Loan</strong> – Shifting existing loan to
          another lender for better rates
        </li>
        <li>
          <strong>Top-Up Loan</strong> – Additional funding on existing home
          loan
        </li>
      </ol>

      <div className="callout-box info-box">
        <h3>Key Features:</h3>
        <ul>
          <li>
            <strong>Loan Amount:</strong> Up to 90% of property value (10-20%
            down payment required)
          </li>
          <li>
            <strong>Interest Rates:</strong> 8.50% - 9.50% p.a. (March 2025)
          </li>
          <li>
            <strong>Tenure:</strong> 5 to 30 years
          </li>
          <li>
            <strong>Tax Benefits:</strong> Up to ₹3.5 lakh per year under
            Sections 80C and 24(b)
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#eligibility">1. Eligibility Criteria (Age, Income)</a>
          </li>
          <li>
            <a href="#foir">2. FOIR: The Critical Metric</a>
          </li>
          <li>
            <a href="#down-payment">3. Down Payment Rules</a>
          </li>
          <li>
            <a href="#interest-types">4. Fixed vs Floating Rates</a>
          </li>
          <li>
            <a href="#hidden-charges">5. Hidden Charges Explained</a>
          </li>
          <li>
            <a href="#tax-benefits">6. Tax Benefits (80C/24b)</a>
          </li>
          <li>
            <a href="#amortization">7. EMI & Amortization</a>
          </li>
          <li>
            <a href="#mistakes">8. Common Mistakes</a>
          </li>
          <li>
            <a href="#checklist">9. Application Checklist</a>
          </li>
          <li>
            <a href="#faqs">10. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-1" type="leaderboard" />
      </div>

      {/* --- ELIGIBILITY SECTION (Full Content Restored) --- */}
      <h2 id="eligibility">
        Home Loan Eligibility Criteria: Bank-Wise Factors for 2025
      </h2>
      <p>
        Understanding eligibility is the first step toward successful loan
        approval. Here is what major Indian lenders evaluate:
      </p>

      <h3>1. Age Requirements</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Bank/HFC</th>
              <th>Minimum Age</th>
              <th>Maximum Age at Maturity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SBI, HDFC, ICICI</td>
              <td>21 years</td>
              <td>70 years</td>
            </tr>
            <tr>
              <td>Axis Bank</td>
              <td>21 years</td>
              <td>70 years</td>
            </tr>
            <tr>
              <td>PNB Housing</td>
              <td>21 years</td>
              <td>75 years</td>
            </tr>
            <tr>
              <td>Bajaj Housing Finance</td>
              <td>23 years (self)</td>
              <td>70 years</td>
            </tr>
            <tr>
              <td>LIC Housing Finance</td>
              <td>18 years</td>
              <td>70 years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="caption-text">
        <strong>Pro Tip:</strong> Younger borrowers get longer tenure options;
        adding a younger co-applicant (spouse/child) can extend repayment
        period.
      </p>

      <h3>2. Income Criteria</h3>
      <div className="example-box">
        <h4>For Salaried Employees:</h4>
        <ul>
          <li>
            <strong>Minimum monthly income:</strong> ₹25,000 - ₹40,000 (varies
            by city tier)
          </li>
          <li>
            <strong>Annual income:</strong> ₹3 lakh+
          </li>
          <li>
            <strong>Minimum work experience:</strong> 2-3 years total, 1 year
            with current employer
          </li>
        </ul>

        <h4 style={{ marginTop: 24 }}>For Self-Employed/Business Owners:</h4>
        <ul>
          <li>
            <strong>Minimum annual income:</strong> ₹1.5 - ₹2 lakh
          </li>
          <li>
            <strong>Business continuity:</strong> Minimum 3-5 years
          </li>
          <li>
            <strong>ITR:</strong> Last 2-3 years mandatory
          </li>
          <li>
            <strong>Financials:</strong> Positive net worth and profitability
          </li>
        </ul>

        <h4 style={{ marginTop: 24 }}>City-Wise Income Variations:</h4>
        <ul>
          <li>
            <strong>Metro cities (Delhi, Mumbai, Bangalore):</strong> ₹40,000+
            per month
          </li>
          <li>
            <strong>Tier-2 cities:</strong> ₹30,000+ per month
          </li>
          <li>
            <strong>Tier-3/rural areas:</strong> ₹25,000+ per month
          </li>
        </ul>
      </div>

      <h3>3. Credit Score (CIBIL) Requirements</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Score Range</th>
              <th>Loan Approval Chances</th>
              <th>Interest Rate Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>750+</td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                Excellent (90%+ approval)
              </td>
              <td>Best rates (8.5%-8.75%)</td>
            </tr>
            <tr>
              <td>700-749</td>
              <td style={{ color: '#eab308' }}>Good (70% approval)</td>
              <td>Standard rates (8.75%-9%)</td>
            </tr>
            <tr>
              <td>650-699</td>
              <td style={{ color: '#f97316' }}>Fair (50% approval)</td>
              <td>Higher rates (9%-9.5%)</td>
            </tr>
            <tr>
              <td>Below 650</td>
              <td style={{ color: '#dc2626' }}>Poor (20% approval)</td>
              <td>Rejection likely or 10%+ rates</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>How to Check CIBIL Score:</strong> Free once per year at{' '}
        <Link href="/credit-score">CIBIL Website</Link>. Check 3-6 months before
        applying to fix errors.
      </p>

      <h3>4. Employment Stability</h3>
      <ul>
        <li>
          <strong>Salaried:</strong> Minimum 2 years total work experience; at
          least 6-12 months with current employer. Permanent jobs in Public
          sector/MNCs get priority.
        </li>
        <li>
          <strong>Self-Employed:</strong> Business practice running for 3+
          years, consistent income growth in ITR, and GST registration.
        </li>
      </ul>

      <h3>5. Property-Related Factors</h3>
      <ul>
        <li>
          <strong>Approved builder/project:</strong> Bank must approve developer
        </li>
        <li>
          <strong>Clear legal title:</strong> No disputes or litigation
        </li>
        <li>
          <strong>RERA registered:</strong> Mandatory for under-construction
          properties
        </li>
        <li>
          <strong>Location:</strong> Prime areas get higher LTV; rural areas may
          get lower
        </li>
      </ul>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-2" type="leaderboard" />
      </div>

      {/* --- FOIR --- */}
      <h2 id="foir">FOIR Explained: The Most Critical Home Loan Metric</h2>
      <WikiText
        content={`**FOIR (Fixed Obligations to Income Ratio)** is the percentage of your monthly income that goes toward fixed financial obligations. Banks use FOIR to determine your repayment capacity.`}
      />

      <div className="formula-box">
        <strong>
          FOIR = (Total Monthly Fixed Obligations ÷ Gross Monthly Income) × 100
        </strong>
      </div>

      <h3>What Counts as &quot;Fixed Obligations&quot;?</h3>
      <ul>
        <li>
          <strong>Include:</strong> Existing loan EMIs (personal, car,
          education), Credit card minimums, Proposed home loan EMI, Rent.
        </li>
        <li>
          <strong>Exclude:</strong> Groceries, utilities, entertainment,
          savings.
        </li>
      </ul>

      {/* Image of FOIR calculation */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/home-loan/foir-calculation.webp"
          alt="FOIR calculation example showing income vs obligations"
          width={1200}
          height={600}
          priority
          className="guide-image"
        />
      </div>

      <div className="example-box">
        <h3>💡 FOIR Calculation Example</h3>
        <p>
          <strong>Scenario:</strong> Ramesh applies for a home loan.
        </p>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Income & Obligations</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gross Monthly Salary</td>
                <td>80,000</td>
              </tr>
              <tr>
                <td>Existing Car Loan EMI</td>
                <td>12,000</td>
              </tr>
              <tr>
                <td>Existing Personal Loan EMI</td>
                <td>8,000</td>
              </tr>
              <tr>
                <td>Credit Card Min Payment</td>
                <td>3,000</td>
              </tr>
              <tr>
                <td>Proposed Home Loan EMI</td>
                <td>25,000</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Fixed Obligations</strong>
                </td>
                <td>
                  <strong>48,000</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12 }}>
          <strong>FOIR Calculation:</strong> (48,000 ÷ 80,000) × 100 ={' '}
          <strong>60%</strong>
        </p>
      </div>

      <h3>Bank-Wise FOIR Limits:</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Lender Type</th>
              <th>Maximum FOIR</th>
              <th>Your Take-Home After FOIR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Most Banks</td>
              <td>50-55%</td>
              <td>45-50% of income</td>
            </tr>
            <tr>
              <td>HFCs (Bajaj, PNB)</td>
              <td>55-60%</td>
              <td>40-45% of income</td>
            </tr>
            <tr>
              <td>Government Banks</td>
              <td>50%</td>
              <td>50% of income</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Solutions to Reduce FOIR:</strong>
        <br />
        1. Close existing loans <br />
        2. Add co-applicant <br />
        3. Increase down payment <br />
        4. Choose longer tenure
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-3" type="leaderboard" />
      </div>

      {/* --- DOWN PAYMENT --- */}
      <h2 id="down-payment">
        Down Payment Rules in India: How Much Do You Really Need?
      </h2>
      <p>
        Down payment (also called margin money or own contribution) is the
        upfront amount you must pay from your pocket. Banks finance only 75-90%
        of property value.
      </p>

      <h3>Standard Down Payment Requirements:</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Property Value</th>
              <th>Maximum LTV</th>
              <th>Your Down Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Up to ₹30 lakh</td>
              <td>90%</td>
              <td>10% (₹3 lakh)</td>
            </tr>
            <tr>
              <td>₹30 lakh - ₹75 lakh</td>
              <td>80%</td>
              <td>20% (₹6-15 lakh)</td>
            </tr>
            <tr>
              <td>Above ₹75 lakh</td>
              <td>75%</td>
              <td>25% (₹18.75 lakh+)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Additional Costs Beyond Down Payment:</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Typical Cost</th>
              <th>Tax-Deductible?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stamp Duty</td>
              <td>5-7% of property value</td>
              <td>Yes (80C)</td>
            </tr>
            <tr>
              <td>Registration Charges</td>
              <td>1% of property value</td>
              <td>Yes (80C)</td>
            </tr>
            <tr>
              <td>Processing Fee</td>
              <td>0.25% - 1% of loan</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Legal/Technical</td>
              <td>₹5,000 - ₹15,000</td>
              <td>No</td>
            </tr>
            <tr>
              <td>GST (Under-Const.)</td>
              <td>1-5% of property value</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="caption-text">
        <strong>Total Upfront Cost Example (₹50 lakh property):</strong> You
        might need ~₹14 lakh cash (28% of cost), covering down payment + stamp
        duty + fees.
      </p>

      {/* --- INTEREST RATES --- */}
      <h2 id="interest-types">
        Home Loan Interest Types: Fixed vs Floating Rate Explained
      </h2>

      {/* Image of Fixed vs Floating */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/home-loan/fixed-vs-floating-rates.webp"
          alt="Comparison graph of fixed vs floating interest rates over time"
          width={1200}
          height={600}
          className="guide-image"
        />
      </div>

      <h3>1. Floating Interest Rate (Most Popular)</h3>
      <p>
        Rate changes every quarter based on RBI repo rate.
        <br />
        <strong>Current Rates (2025):</strong> 8.50% - 9.25% p.a.
      </p>
      <ul>
        <li>✅ Lower starting rate (0.5%-1% cheaper)</li>
        <li>✅ No prepayment charges</li>
        <li>❌ EMI uncertainty</li>
      </ul>

      <h3>2. Fixed Interest Rate</h3>
      <p>
        Rate remains constant for initial 3-5 years, then floats.
        <br />
        <strong>Current Rates (2025):</strong> 9.00% - 10.00% p.a.
      </p>
      <ul>
        <li>✅ EMI certainty for fixed period</li>
        <li>❌ Higher starting rate</li>
        <li>❌ High prepayment charges (2-5%)</li>
      </ul>

      <div className="callout-box info-box">
        <strong>Expert Recommendation:</strong> 85% of Indian borrowers choose{' '}
        <strong>Floating Rates</strong> due to lower lifetime costs and
        flexibility.
      </div>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-4" type="leaderboard" />
      </div>

      {/* --- HIDDEN CHARGES --- */}
      <h2 id="hidden-charges">
        Hidden Charges in Home Loans: What Banks Don&apos;t Tell You
      </h2>
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
              <td>Processing Fee</td>
              <td>0.25% - 1% of loan</td>
              <td style={{ color: 'var(--color-brand-green)' }}>✅ Yes</td>
            </tr>
            <tr>
              <td>Administrative Fee</td>
              <td>₹5,000 - ₹15,000</td>
              <td>⚠️ Sometimes</td>
            </tr>
            <tr>
              <td>Legal Valuation</td>
              <td>₹3,000 - ₹10,000</td>
              <td>❌ No</td>
            </tr>
            <tr>
              <td>Foreclosure (Fixed)</td>
              <td>2-4% of outstanding</td>
              <td>⚠️ Sometimes</td>
            </tr>
            <tr>
              <td>CERSAI Registration</td>
              <td>₹50 - ₹100</td>
              <td>❌ No</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- TAX BENEFITS --- */}
      <h2 id="tax-benefits">
        Tax Benefits on Home Loans: Save Up to ₹3.5 Lakh Per Year
      </h2>
      <WikiText
        content={`Home loans offer the highest tax benefits among all financial products in India, making homeownership significantly more affordable.`}
      />

      {/* Image of Tax Benefits */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/home-loan/tax-benefits-80c-24b.webp"
          alt="Infographic showing tax savings under section 80C and 24b"
          width={1200}
          height={600}
          className="guide-image"
        />
      </div>

      <h3>1. Section 80C: Principal Repayment</h3>
      <ul>
        <li>
          <strong>Max Benefit:</strong> ₹1.5 lakh per year
        </li>
        <li>
          <strong>Covers:</strong> Principal repayment + Stamp duty/Registration
        </li>
        <li>
          <strong>Condition:</strong> Do not sell property within 5 years.
        </li>
      </ul>

      <h3>2. Section 24(b): Interest Payment</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Property Type</th>
              <th>Old Regime</th>
              <th>New Regime (2025)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Self-Occupied</td>
              <td>₹2,00,000</td>
              <td>₹2,00,000</td>
            </tr>
            <tr>
              <td>Let-Out/Rented</td>
              <td>Unlimited</td>
              <td>₹3,00,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Section 80EE & 80EEA</h3>
      <p>
        Additional deductions of ₹50,000 (80EE) or ₹1.5 lakh (80EEA) for
        first-time buyers, subject to specific loan sanction dates and property
        values.
      </p>

      {/* 💰 AD SLOT 5 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-5" type="leaderboard" />
      </div>

      {/* --- AMORTIZATION --- */}
      <h2 id="amortization">
        How EMI Changes Over Loan Tenure: Understanding Amortization
      </h2>
      <p>
        Many first-time buyers are shocked to discover that their EMI initially
        pays mostly interest, not principal.
      </p>

      {/* Image of Amortization Graph */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/home-loan/amortization-schedule-graph.webp"
          alt="Amortization graph showing principal vs interest component over tenure"
          width={1200}
          height={600}
          className="guide-image"
        />
      </div>

      <h3>EMI Composition (₹40 Lakh Loan @ 8.5%, 20 Years)</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total EMI</th>
              <th>Interest Component</th>
              <th>Principal Component</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Year 1</td>
              <td>₹34,699</td>
              <td>82% (₹28,333)</td>
              <td>18% (₹6,366)</td>
            </tr>
            <tr>
              <td>Year 5</td>
              <td>₹34,699</td>
              <td>76%</td>
              <td>24%</td>
            </tr>
            <tr>
              <td>Year 10</td>
              <td>₹34,699</td>
              <td>64%</td>
              <td>36%</td>
            </tr>
            <tr>
              <td>Year 20</td>
              <td>₹34,699</td>
              <td>1%</td>
              <td>99%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>How to Accelerate Principal Repayment:</h3>
      <ul>
        <li>
          <strong>Prepay annually:</strong> Even ₹50,000/year reduces tenure by
          4-5 years.
        </li>
        <li>
          <strong>Increase EMI:</strong> 10% annual increase saves ₹15+ lakh.
        </li>
        <li>
          <strong>Refinance:</strong> If rates drop by 1%+.
        </li>
      </ul>

      {/* --- MISTAKES (Full Content) --- */}
      <h2 id="mistakes">Common Mistakes First-Time Home Buyers Make</h2>
      <div className="rejection-grid">
        <div className="rejection-card">
          <div className="rejection-title">1. Buying Beyond Budget</div>
          <p className="rejection-desc">
            Spending 50-60% of income on EMI, leaving no cushion for
            emergencies.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Follow the <strong>30-35% Rule</strong>. EMI should not exceed 35%
            of monthly income.
          </div>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">2. Ignoring Hidden Costs</div>
          <p className="rejection-desc">
            Forgetting maintenance, property tax, and furnishing costs leads to
            cash crunch.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Budget an extra <strong>15-20%</strong> for post-purchase expenses.
          </div>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">3. Not Checking Credit Score</div>
          <p className="rejection-desc">
            Applying for loan without checking CIBIL, discovering low score
            (650-) during bank rejection.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Check CIBIL 6 months prior. Pay off small dues to boost score.
          </div>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">4. Skipping Due Diligence</div>
          <p className="rejection-desc">
            Trusting builder/broker blindly without verifying legal documents.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Verify RERA number and hire a lawyer to check 30-year title chain.
          </div>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">5. Taking Maximum Tenure</div>
          <p className="rejection-desc">
            Opting for 30-year tenure pays 2-3x property value in interest.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Stick to 15-20 years and prepay aggressively to close early.
          </div>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">6. Not Comparing Lenders</div>
          <div className="rejection-desc">
            Going to salary account bank only. Paying 0.5-1% higher rate loses
            ₹5-8 lakh.
          </div>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Get quotes from 4-5 lenders (2 PSU, 2 Private, 1 HFC).
          </div>
        </div>

        <div className="rejection-card" style={{ gridColumn: '1 / -1' }}>
          <div className="rejection-title">7. Forgetting Tax Benefits</div>
          <p className="rejection-desc">
            Missing Section 80C/24b deductions due to poor record keeping.
          </p>
          <div className="solution-box">
            <span className="solution-label">Correction</span>
            Collect annual interest certificates and file ITR to save
            ₹1.5L/year.
          </div>
        </div>
      </div>

      {/* 💰 AD SLOT 6 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-6" type="leaderboard" />
      </div>

      {/* --- CHECKLIST (Full Content) --- */}
      <h2 id="checklist">Step-by-Step Home Loan Application Checklist</h2>
      <div
        className="alt-options-box"
        style={{
          background: '#fff',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Phase 1: Pre-Application (3-6 Months)</h3>
        <ul className="checklist">
          <li>✅ Check Credit Score (Target 750+)</li>
          <li>✅ Calculate Affordability (Max loan = Income × 60)</li>
          <li>✅ Save for Down Payment (20-25% of property value)</li>
          <li>✅ Research Locations & Builders (RERA Check)</li>
        </ul>

        <h3 style={{ marginTop: 24 }}>Phase 2: Application (Month 1-2)</h3>
        <ul className="checklist">
          <li>
            ✅ Gather Documents (KYC, Income Proof, Bank Statements, Property
            Docs)
          </li>
          <li>✅ Apply to 3-4 Lenders to compare offers</li>
          <li>✅ Facilitate Property Valuation (Bank sends surveyor)</li>
        </ul>

        <h3 style={{ marginTop: 24 }}>
          Phase 3: Sanction to Disbursement (Month 2-3)
        </h3>
        <ul className="checklist">
          <li>✅ Review Sanction Letter (Rate, Tenure, Charges)</li>
          <li>✅ Sign Loan Agreement & Pay Stamp Duty</li>
          <li>✅ Buy Property Insurance (Mandatory)</li>
          <li>✅ Loan Disbursement (to builder/seller)</li>
        </ul>

        <h3 style={{ marginTop: 24 }}>Phase 4: Post-Disbursement</h3>
        <ul className="checklist">
          <li>✅ Set up Auto-Debit for EMI</li>
          <li>✅ Collect Annual Interest Certificate for Tax Benefits</li>
          <li>✅ Plan Prepayments (Use bonuses)</li>
          <li>✅ Collect Original Deeds upon full repayment</li>
        </ul>
      </div>

      {/* --- FAQS (Full Content) --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>
            Q1: What is the minimum credit score required for a home loan?
          </summary>
          <p>
            Most banks require a CIBIL score of 700+ for approval, though 750+
            gets you the best interest rates (8.5%-8.75%).
          </p>
        </details>
        <details>
          <summary>Q2: How is FOIR calculated for home loans?</summary>
          <p>
            FOIR = (Total Monthly Obligations ÷ Gross Monthly Income) × 100.
            Banks typically allow 50-60% FOIR; keep it below 45% for comfortable
            repayment.
          </p>
        </details>
        <details>
          <summary>
            Q3: What is the down payment percentage for home loans?
          </summary>
          <p>
            Down payment ranges from 10-25%. 10% for loans up to ₹30 lakh, 20%
            for ₹30-75 lakh, and 25% for loans above ₹75 lakh.
          </p>
        </details>
        <details>
          <summary>
            Q4: Which is better: fixed or floating interest rate?
          </summary>
          <p>
            Floating rates are 0.5-1% cheaper and have zero prepayment charges.
            They are recommended for 85% of borrowers. Choose fixed only if
            rates are rising sharply or you need absolute certainty.
          </p>
        </details>
        <details>
          <summary>
            Q5: What are the tax benefits on home loans in 2025?
          </summary>
          <p>
            Save up to ₹3.5 lakh/year: ₹1.5 lakh under Section 80C (principal),
            ₹2 lakh under Section 24(b) (interest), and additional ₹1.5 lakh
            under Section 80EEA for eligible first-time buyers.
          </p>
        </details>
        <details>
          <summary>Q6: Can I prepay my home loan without penalty?</summary>
          <p>
            Yes, floating rate home loans taken by individuals have zero
            prepayment or foreclosure charges as per RBI guidelines. Fixed-rate
            loans may charge 2-5%.
          </p>
        </details>
        <details>
          <summary>
            Q7: What documents are required for a home loan application?
          </summary>
          <p>
            Salaried: Identity/Address proof, 6 months bank statements, 3 months
            payslips, Form 16. Self-Employed: 3 years ITR with financials,
            business proof. Property documents are mandatory for both.
          </p>
        </details>
        <details>
          <summary>Q8: How much loan can I get on a ₹50,000 salary?</summary>
          <p>
            With ₹50,000 monthly income, you can typically get a home loan of
            ₹25-30 lakh (assuming no existing loans and 35-40% EMI-to-income
            ratio).
          </p>
        </details>
        <details>
          <summary>Q9: What is pre-EMI in home loans?</summary>
          <p>
            Pre-EMI is the interest-only payment during the construction period
            for under-construction properties. Full EMI (principal + interest)
            starts after possession.
          </p>
        </details>
        <details>
          <summary>
            Q10: When should first-time buyers apply for a home loan?
          </summary>
          <p>
            Apply 3-6 months before you plan to purchase. This gives you time to
            improve your credit score, compare lenders, and negotiate rates.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Conclusion: Your Journey to Homeownership Starts Today</h2>
      <div className="conclusion-box">
        <p>
          Buying your first home is a life-changing milestone. With eligibility
          criteria becoming transparent and tax benefits saving up to ₹3.5 lakh
          annually, 2025 is an excellent time for first-time buyers.
        </p>
        <h4>Your Action Plan:</h4>
        <ul className="checklist">
          <li>✅ Check CIBIL score (target 750+)</li>
          <li>✅ Calculate FOIR (keep under 45%)</li>
          <li>✅ Save 30% of property value (down payment + costs)</li>
          <li>✅ Choose floating rate for flexibility</li>
          <li>✅ Plan annual prepayments to save interest</li>
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
          This guide is updated annually based on the latest RBI circulars and
          lending norms to ensure 100% accuracy.
        </p>
      </section>

      <p className="legal-disclaimer">
        This content is for educational purposes only and does not constitute
        financial advice. Loan terms, interest rates, and RBI regulations may
        vary by lender and over time. Always consult your bank or financial
        advisor before making loan decisions.
      </p>

      {/* --- FINAL CTA --- */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Ready to calculate your home loan eligibility?</h2>
          <p>
            Use our free Home Loan EMI Calculator to plan your purchase and
            discover how much you can afford!
          </p>
          <div className="final-cta-row">
            <Link href="/emi-calculator" className="primary-cta">
              Check Eligibility
            </Link>
            <Link href="/credit-score" className="secondary-cta">
              Check Credit Score
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-home-7" type="leaderboard" />
      </div>
    </article>
  );
}
