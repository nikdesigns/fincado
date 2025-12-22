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
  title: 'Education Loan Guide: MS in US, 80E Tax & Rates 2025',
  description:
    'Education loan guide for MS in US: Secured vs unsecured rates, Section 80E tax deduction, moratorium strategy, I-20 documents & smart repayment tips 2025.',
  keywords: [
    'education loan for study abroad',
    'section 80E tax deduction',
    'secured vs unsecured education loan',
    'education loan interest rates 2025',
    'moratorium period interest calculation',
    'documents for education loan',
  ],
  openGraph: {
    title:
      'Study Abroad Education Loan Guide: Secured vs Unsecured & Section 80E',
    description:
      'Save lakhs on your education loan. Learn about 80E tax benefits, moratorium strategies, and how to choose between secured and unsecured loans.',
    url: 'https://www.fincado.com/guides/education-loan-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/education-loan/education-loan-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Student with luggage at airport dreaming of study abroad',
      },
    ],
  },
};

export default function EducationLoanGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Education Loan Guide',
            url: 'https://www.fincado.com/guides/education-loan-guide',
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
              'Study Abroad Education Loan Guide: Secured vs Unsecured & Section 80E',
            description:
              'Comprehensive guide on Education Loans for studying abroad: Eligibility, Interest Rates, Section 80E Tax Benefits, and Moratorium strategies.',
            image:
              'https://www.fincado.com/images/guides/education-loan/education-loan-guide-hero.webp',
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
            datePublished: '2025-01-22',
            dateModified: '2025-01-22',
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
                name: 'What is the interest rate on education loans for MS in the US?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Secured loans typically range from 8-10% p.a., while unsecured loans range from 11-14% p.a., depending on the lender and credit profile.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Section 80E and how does it help?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Section 80E allows tax deduction on the entire interest paid on an education loan with no upper limit for up to 8 years. For a parent in the 30% tax bracket, this effectively reduces the interest rate by ~3%.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I pay interest during the moratorium period?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, if possible. Paying simple interest during the moratorium prevents capitalization (interest on interest) and can save ₹3-5 lakh or more over the loan tenure.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Study Abroad</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          Study Abroad Education Loan Guide: Secured vs Unsecured & Section 80E
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
          <ShareTools title="Study Abroad Education Loan Guide" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Pursuing higher education abroad—particularly an <strong>MS in the US</strong>—is a dream for thousands of Indian students every year, but the cost can easily exceed <strong>₹50-80 lakhs</strong>. An <strong>education loan</strong> makes this dream financially feasible, and understanding the difference between secured and unsecured loans, leveraging <strong>Section 80E tax deduction</strong>, and strategically managing the moratorium period can save lakhs in interest over the loan tenure.

          This comprehensive <strong>Study Abroad Education Loan Guide</strong> covers everything from eligibility and interest rates to tax benefits, documentation (I-20, visa), and smart repayment strategies.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/education-loan/education-loan-guide-hero.webp"
          alt="Student looking at university campus abroad"
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

      <h2>What is an Education Loan?</h2>
      <WikiText
        content={`
          An <strong>Education Loan</strong> is a specialized loan designed to finance higher education expenses, including tuition fees, living costs, travel, books, and other study-related expenses. These loans offer unique features like a <strong>moratorium period</strong> (study + job search) where you don't have to pay full EMIs.
        `}
      />

      <div className="callout-box info-box">
        <h3>Key Components:</h3>
        <ul>
          <li>
            <strong>Principal Amount:</strong> Total loan sanctioned (₹5 Lakhs
            to ₹1.5 Crore+).
          </li>
          <li>
            <strong>Interest Rate:</strong> 8-14% p.a. (Secured vs Unsecured).
          </li>
          <li>
            <strong>Tenure:</strong> 10-15 years after course completion.
          </li>
          <li>
            <strong>Moratorium:</strong> Grace period during study + 6-12
            months.
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#how-it-works">1. How Education Loans Work</a>
          </li>
          <li>
            <a href="#secured-vs-unsecured">2. Secured vs Unsecured Loans</a>
          </li>
          <li>
            <a href="#section-80e">3. Tax Benefits (Section 80E)</a>
          </li>
          <li>
            <a href="#moratorium-strategy">
              4. Moratorium Strategy (Save Lakhs)
            </a>
          </li>
          <li>
            <a href="#documents">5. Required Documents</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-edu-1" type="leaderboard" />
      </div>

      <h2 id="how-it-works">How Does an Education Loan Work?</h2>
      <ol>
        <li>
          <strong>Admission:</strong> Receive admission letter/I-20 from
          university.
        </li>
        <li>
          <strong>Application:</strong> Apply with co-applicant details and
          collateral (if any).
        </li>
        <li>
          <strong>Sanction:</strong> Lender approves loan based on profile and
          future income potential.
        </li>
        <li>
          <strong>Disbursement:</strong> Fees paid directly to university;
          living expenses to Forex card.
        </li>
        <li>
          <strong>Moratorium:</strong> Study period + 6-12 months (Simple
          interest accrues).
        </li>
        <li>
          <strong>Repayment:</strong> Full EMI starts after moratorium ends.
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
              <td>16 - 35 Years</td>
            </tr>
            <tr>
              <td>
                <strong>Academic</strong>
              </td>
              <td>Confirmed Admission (I-20 for US)</td>
            </tr>
            <tr>
              <td>
                <strong>Co-Applicant</strong>
              </td>
              <td>Parent/Guardian with stable income</td>
            </tr>
            <tr>
              <td>
                <strong>Credit Score</strong>
              </td>
              <td>Co-applicant should have 750+</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- SECTION: SECURED VS UNSECURED --- */}
      <h2 id="secured-vs-unsecured">Secured vs Unsecured Education Loans</h2>
      <p>
        One of the most critical decisions is choosing between pledging
        collateral (Secured) or going without it (Unsecured).
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Secured Loan</th>
              <th>Unsecured Loan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Collateral</strong>
              </td>
              <td>
                <strong>Required</strong> (Property/FD)
              </td>
              <td>
                <strong>Not Required</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Interest Rate</strong>
              </td>
              <td>
                <strong>8% - 10% p.a.</strong>
              </td>
              <td>
                <strong>11% - 14% p.a.</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Max Amount</strong>
              </td>
              <td>Up to ₹1.5 Crore+</td>
              <td>₹40 - ₹75 Lakhs</td>
            </tr>
            <tr>
              <td>
                <strong>Approval</strong>
              </td>
              <td>Easier (Lower Risk)</td>
              <td>Harder (Strict Income Checks)</td>
            </tr>
            <tr>
              <td>
                <strong>Best For</strong>
              </td>
              <td>High Loan Amounts (&gt;₹50L)</td>
              <td>Moderate Amounts / No Assets</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Key Insight:</strong> For an MS in the US costing ₹60 Lakh, the
        2-3% interest difference in a Secured Loan can save you{' '}
        <strong>₹5-10 Lakhs</strong> in total interest.
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-edu-2" type="leaderboard" />
      </div>

      {/* --- SECTION: TAX BENEFITS --- */}
      <h2 id="section-80e">Tax Benefits: Section 80E Deep Dive</h2>
      <WikiText
        content={`<strong>Section 80E</strong> allows you to claim a deduction for the <strong>entire interest amount</strong> paid on an education loan, with <strong>no upper limit</strong>, for up to <strong>8 years</strong>. This effectively reduces your actual cost of borrowing.`}
      />

      <div className="example-box">
        <h3>Section 80E Savings Example</h3>
        <p>
          <strong>Scenario:</strong> Parent in 30% Tax Slab.
        </p>
        <ul>
          <li>Loan Amount: ₹40 Lakh</li>
          <li>Interest Rate: 10%</li>
          <li>Annual Interest Paid: ₹4,00,000</li>
        </ul>
        <hr style={{ margin: '16px 0', borderColor: '#e2e8f0' }} />
        <ul>
          <li>
            <strong>Tax Saved (30% of ₹4L):</strong> ₹1,20,000
          </li>
          <li>
            <strong>Net Interest Cost:</strong> ₹2,80,000
          </li>
          <li>
            <strong>Effective Interest Rate:</strong> ~7%
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Thanks to Section 80E, a 10% loan effectively costs only{' '}
          <strong>7%</strong> for a high-taxpayer co-applicant.
        </p>
      </div>

      <h3>Tax Benefit Summary Table</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tax Slab</th>
              <th>Interest Paid</th>
              <th>Tax Saved</th>
              <th>Effective Rate Reduction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30%</td>
              <td>₹4,00,000</td>
              <td>₹1,20,000</td>
              <td>
                <strong>~3.0%</strong>
              </td>
            </tr>
            <tr>
              <td>20%</td>
              <td>₹4,00,000</td>
              <td>₹80,000</td>
              <td>
                <strong>~2.0%</strong>
              </td>
            </tr>
            <tr>
              <td>5%</td>
              <td>₹4,00,000</td>
              <td>₹20,000</td>
              <td>
                <strong>~0.5%</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- SECTION: MORATORIUM STRATEGY --- */}
      <h2 id="moratorium-strategy">
        The &quot;Moratorium&quot; Strategy: Save Lakhs
      </h2>
      <WikiText
        content={`The <strong>Moratorium Period</strong> is when you don't *have* to pay EMIs (Course + 1 year). However, simple interest keeps accumulating. You have two choices:
        
        1. <strong>Pay Simple Interest:</strong> Pay small monthly interest during study.
        2. <strong>Defer Interest:</strong> Pay nothing now; interest gets added to principal later.
        `}
      />

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The Trap</div>
          <div className="myth-title">
            &quot;I&apos;ll pay everything after I get a job.&quot;
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              If you defer, the accrued interest (e.g., ₹12 Lakhs) gets added to
              your Principal (Capitalization). You will then pay interest on
              this interest for 10-15 years!
            </p>
          </div>
          <div className="reality-box">
            <strong>The Smart Move:</strong> Paying the simple interest (approx
            ₹30k/month) during the course prevents capitalization and can save{' '}
            <strong>₹3-5 Lakhs</strong> in the long run.
          </div>
        </div>
      </div>

      <h3>Calculation: The &quot;Interest on Interest&quot; Penalty</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Principal at Repayment Start</th>
              <th>Extra Burden</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Pay Monthly Interest</strong>
              </td>
              <td>₹40,00,000 (Original)</td>
              <td>₹0</td>
            </tr>
            <tr>
              <td>
                <strong>Defer (Capitalize)</strong>
              </td>
              <td>₹53,24,000 (Bloated)</td>
              <td style={{ color: '#dc2626' }}>
                <strong>+₹13.24 Lakhs Debt</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-edu-3" type="leaderboard" />
      </div>

      {/* --- SECTION: DOCUMENTS --- */}
      <h2 id="documents">Documents Required (Study Abroad)</h2>
      <p>
        Ensure these are ready for smooth processing, especially for
        US/UK/Canada.
      </p>

      <h3>Student Documents</h3>
      <ul className="checklist">
        <li>
          📄 <strong>Academic:</strong> Marksheets (10th, 12th, Degree),
          GRE/GMAT/IELTS scores.
        </li>
        <li>
          🎓 <strong>Admission:</strong> Admission Letter or{' '}
          <strong>I-20 Form</strong> (for US).
        </li>
        <li>
          🛂 <strong>KYC:</strong> Passport, Aadhaar, PAN, Voter ID.
        </li>
        <li>
          ✈️ <strong>Visa:</strong> Copy of Student Visa (once received).
        </li>
      </ul>

      <h3>Co-Applicant Documents</h3>
      <ul className="checklist">
        <li>
          💰 <strong>Income:</strong> Salary Slips (3 months), ITR (2 years).
        </li>
        <li>
          🏦 <strong>Bank:</strong> Statement (last 6 months).
        </li>
        <li>
          🏠 <strong>Collateral (if secured):</strong> Title Deed, Property
          Valuation Report.
        </li>
      </ul>

      <h2 id="disbursement">Disbursement Process</h2>
      <WikiText
        content={`Unlike personal loans, education loans are disbursed <strong>directly to the university</strong> via wire transfer for tuition fees. Living expenses are typically loaded onto a <strong>Forex Card</strong> or transferred to the student's foreign bank account in stages.`}
      />

      <h2 id="roi">Returns & Risks</h2>
      <p>
        Education loans are an investment in your career, not a financial
        product.
      </p>

      <h3>ROI Example</h3>
      <ul>
        <li>
          <strong>Total Loan:</strong> ₹50 Lakhs
        </li>
        <li>
          <strong>Salary Post-MS:</strong> $90,000 (~₹75 Lakhs)
        </li>
        <li>
          <strong>Payback Period:</strong> 2-3 Years (if aggressive).
        </li>
      </ul>

      <h3>Risks to Consider</h3>
      <ul>
        <li>
          ⚠️ <strong>Job Market:</strong> Recessions or visa issues can delay
          employment.
        </li>
        <li>
          ⚠️ <strong>Exchange Rate:</strong> If INR weakens against USD,
          repayment cost increases.
        </li>
        <li>
          ⚠️ <strong>Collateral:</strong> Defaulting on secured loans puts
          family property at risk.
        </li>
      </ul>

      <h2 id="alternatives">Education Loan vs Alternatives</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Education Loan</th>
              <th>Scholarship</th>
              <th>Personal Loan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Amount</strong>
              </td>
              <td>High (Up to ₹1.5 Cr)</td>
              <td>Variable</td>
              <td>Low (Up to ₹25L)</td>
            </tr>
            <tr>
              <td>
                <strong>Interest</strong>
              </td>
              <td>8-12%</td>
              <td>0%</td>
              <td>12-18%</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Benefit</strong>
              </td>
              <td>✅ Yes (Sec 80E)</td>
              <td>N/A</td>
              <td>❌ No</td>
            </tr>
            <tr>
              <td>
                <strong>Moratorium</strong>
              </td>
              <td>✅ Yes</td>
              <td>N/A</td>
              <td>❌ No (Immediate EMI)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Recommendation:</strong> Always aim for scholarships first. Use
        education loans for the balance. Avoid personal loans due to high
        interest and no tax benefits.
      </div>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>
            What is the interest rate on education loans for MS in the US?
          </summary>
          <p>
            Secured loans: <strong>8-10% p.a.</strong>. Unsecured loans:{' '}
            <strong>11-14% p.a.</strong>. Rates depend on the lender and your
            profile.
          </p>
        </details>
        <details>
          <summary>Can I get an education loan without collateral?</summary>
          <p>
            Yes. <strong>Unsecured loans</strong> are available up to ₹40-75
            Lakhs for premier institutes, but they come with higher interest
            rates.
          </p>
        </details>
        <details>
          <summary>
            What is the maximum loan amount for studying abroad?
          </summary>
          <p>
            Secured loans can go up to <strong>₹1.5 Crore</strong> or more
            depending on collateral value. Unsecured loans are typically capped
            at ₹40-75 Lakhs.
          </p>
        </details>
        <details>
          <summary>Is there a penalty for early repayment?</summary>
          <p>
            Most education loans (especially from PSUs) have{' '}
            <strong>zero prepayment penalty</strong>. You can pay off the loan
            as fast as you like.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          An education loan is a powerful tool to unlock global career
          opportunities.
        </p>
        <h4>Your Roadmap:</h4>
        <ul className="checklist">
          <li>
            Choose <strong>Secured Loans</strong> if you have property (save
            2-3% interest).
          </li>
          <li>
            Maximize <strong>Section 80E</strong> benefits (save ~3%
            effectively).
          </li>
          <li>
            <strong>Pay Interest During Study</strong> to avoid the compounding
            trap.
          </li>
          <li> Keep documents (I-20, Income Proof) ready early.</li>
        </ul>
        <p>
          Invest in yourself wisely, and the returns will far outweigh the cost.
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
        <strong>Disclaimer:</strong> Interest rates, tax laws (Section 80E), and
        bank policies change frequently. This guide is for educational purposes.
        Please consult a qualified financial advisor before taking a loan.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Planning your studies?</h2>
          <p>Use our tools to plan your loan repayment and investments.</p>
          <div className="final-cta-row">
            <Link href="/loans/education-loan" className="primary-cta">
              Calculate Education EMI
            </Link>
            <Link href="/calculators/sip-calculator" className="secondary-cta">
              Plan Investments
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-edu-4" type="leaderboard" />
      </div>
    </article>
  );
}
