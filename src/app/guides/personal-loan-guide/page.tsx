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
  title: 'Personal Loan Guide 2025: Rates, CIBIL & Hidden Charges',
  description:
    'Personal loan guide 2025: Interest rates 9.99-24%, CIBIL score 750+ for best terms, flat vs reducing rate trap, hidden charges & smarter alternatives explained.',
  keywords: [
    'personal loan interest rates 2025',
    'cibil score for personal loan',
    'flat interest rate vs reducing balance',
    'personal loan hidden charges',
    'personal loan eligibility calculator',
    'gold loan vs personal loan',
  ],
  openGraph: {
    title:
      'Personal Loan Guide 2025: Interest Rates, CIBIL Score & Hidden Charges',
    description:
      'Don\'t fall for the "Flat Rate" trap. Learn how to save lakhs on interest and spot hidden charges before you sign.',
    url: 'https://www.fincado.com/guides/personal-loan-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/personal-loan/personal-loan-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Person checking loan application on mobile',
      },
    ],
  },
};

export default function PersonalLoanGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Personal Loan Guide',
            url: 'https://www.fincado.com/guides/personal-loan-guide',
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
              'Personal Loan Guide 2025: Interest Rates, CIBIL Score & Hidden Charges',
            description:
              'Comprehensive guide on Personal Loans in India: Eligibility, Documents, Flat vs Reducing Rate math, and Hidden Charges.',
            image:
              'https://www.fincado.com/images/guides/personal-loan/personal-loan-guide-hero.webp',
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
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
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
                name: 'Can I get a personal loan with a low CIBIL score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It is difficult. Most banks require 750+. Some NBFCs may lend to 650-700 scores but at very high interest rates (18-24%).',
                },
              },
              {
                '@type': 'Question',
                name: 'Is personal loan interest tax deductible?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Generally No for salaried individuals. However, if used for business purposes or home renovation/purchase, tax benefits may be claimed under specific sections.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between flat and reducing interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Flat rate calculates interest on the full principal for the entire tenure. Reducing rate calculates interest only on the outstanding balance. A 10% Flat Rate is roughly equal to an 18% Reducing Rate.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Unsecured Loans</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          Personal Loan Guide 2025: Rates, CIBIL & Hidden Charges
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
          <ShareTools title="Personal Loan Guide 2025" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Understanding <strong>personal loan interest rates</strong>, <strong>CIBIL score requirements</strong>, and hidden charges like processing fees can save you thousands of rupees. With rates ranging from <strong>9.99% to 24%</strong>, getting the best deal requires knowledge.

          This guide exposes the "Flat Rate" trap (where 10% is actually 18%), lists essential documents, and compares smarter alternatives like Gold Loans or Top-Ups.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/personal-loan/personal-loan-guide-hero.webp"
          alt="Happy couple approved for a personal loan"
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

      <h2>What is a Personal Loan?</h2>
      <WikiText
        content={`
          A <strong>Personal Loan</strong> is an *unsecured loan* provided by banks and NBFCs without requiring any collateral (like gold or property). It can be used for any purpose—medical emergency, wedding, travel, or debt consolidation.
        `}
      />

      <div className="callout-box info-box">
        <h3>Key Features:</h3>
        <ul>
          <li>
            <strong>No Collateral:</strong> Your assets are safe.
          </li>
          <li>
            <strong>Flexible Use:</strong> No restriction on end-use.
          </li>
          <li>
            <strong>Quick Disbursal:</strong> 24-48 hours (or instant for
            pre-approved).
          </li>
          <li>
            <strong>Fixed Tenure:</strong> 12 to 60 months typically.
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#eligibility">1. Eligibility & Documents</a>
          </li>
          <li>
            <a href="#interest-rates">2. Interest Rates & Hidden Charges</a>
          </li>
          <li>
            <a href="#flat-rate-trap">
              3. The &quot;Flat Rate&quot; Trap (Must Read)
            </a>
          </li>
          <li>
            <a href="#alternatives">4. Personal Loan vs Alternatives</a>
          </li>
          <li>
            <a href="#cibil-impact">5. Impact on Credit Score</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-pl-1" type="leaderboard" />
      </div>

      <h2 id="eligibility">Eligibility Criteria & Documents</h2>
      <p>Banks primarily look at your repayment capacity and credit history.</p>

      <h3>For Salaried Employees</h3>
      <ul className="checklist">
        <li>
          👤 <strong>Age:</strong> 21 - 60 Years.
        </li>
        <li>
          💰 <strong>Income:</strong> Min ₹15,000 - ₹25,000/month (varies by
          city).
        </li>
        <li>
          🏢 <strong>Experience:</strong> Min 1-2 years total work experience.
        </li>
        <li>
          📈 <strong>CIBIL Score:</strong> 750+ for best rates.
        </li>
      </ul>

      <h3>Documents Required</h3>
      <ul>
        <li>
          <strong>KYC:</strong> PAN, Aadhaar, Photo.
        </li>
        <li>
          <strong>Income:</strong> Last 3 months Salary Slips.
        </li>
        <li>
          <strong>Bank:</strong> Last 6 months Bank Statement (Salary A/c).
        </li>
      </ul>

      <h2 id="interest-rates">Interest Rates & Hidden Charges</h2>
      <p>Rates depend heavily on your CIBIL score and employer category.</p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>CIBIL Score</th>
              <th>Interest Rate (Approx)</th>
              <th>Approval Chance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>750 - 900</strong>
              </td>
              <td>10.50% - 13%</td>
              <td>High</td>
            </tr>
            <tr>
              <td>
                <strong>700 - 749</strong>
              </td>
              <td>13% - 16%</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>
                <strong>Below 700</strong>
              </td>
              <td>16% - 24%+</td>
              <td>Low / NBFCs Only</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Hidden Charges to Watch Out For</h3>
      <ul>
        <li>
          ⚠️ <strong>Processing Fee:</strong> 0.5% - 3% of loan amount + GST.
        </li>
        <li>
          ⚠️ <strong>Foreclosure Charges:</strong> 2% - 5% penalty if you close
          loan early (check lock-in period).
        </li>
        <li>
          ⚠️ <strong>Pre-payment Charges:</strong> Penalty for part-payments.
        </li>
      </ul>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-pl-2" type="leaderboard" />
      </div>

      {/* --- SECTION: FLAT RATE TRAP --- */}
      <h2 id="flat-rate-trap">
        The &quot;Flat Rate&quot; Trap: Don&apos;t Get Fooled
      </h2>
      <WikiText
        content={`Some lenders advertise a "Flat Interest Rate" (e.g., 10%) which sounds cheaper than a bank's "Reducing Rate" (e.g., 12%). <strong>This is a marketing trick.</strong>`}
      />

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The Trap</div>
          <div className="myth-title">
            Dealer says: &quot;10% Interest Rate (Flat)&quot;
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              On a ₹1 Lakh loan for 1 year, you pay interest on the full ₹1 Lakh
              every month, even though you are repaying principal monthly.
            </p>
          </div>
          <div className="reality-box">
            <strong>The Reality:</strong> A 10% Flat Rate is actually equal to
            an <strong>~18% Reducing Balance Rate</strong>. You end up paying
            almost double the interest!
          </div>
        </div>
      </div>

      <h3>Comparison: ₹1 Lakh Loan for 1 Year</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Quoted Rate</th>
              <th>Effective Cost (APR)</th>
              <th>Total Interest</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Flat Rate</strong>
              </td>
              <td>10%</td>
              <td style={{ color: '#dc2626', fontWeight: 'bold' }}>~17.9%</td>
              <td>₹10,000</td>
            </tr>
            <tr>
              <td>
                <strong>Reducing Rate</strong>
              </td>
              <td>12%</td>
              <td
                style={{
                  color: 'var(--color-brand-green)',
                  fontWeight: 'bold',
                }}
              >
                12.0%
              </td>
              <td>₹6,619</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Verdict:</strong> Always ask for the{' '}
        <strong>Reducing Balance Rate</strong>
        (or APR).
      </p>

      {/* --- SECTION: ALTERNATIVES --- */}
      <h2 id="alternatives">Personal Loan vs Alternatives</h2>
      <p>Before taking a PL, consider these cheaper options.</p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Interest Rate</th>
              <th>Pros</th>
              <th>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Personal Loan</strong>
              </td>
              <td>10.5% - 24%</td>
              <td>No Collateral</td>
              <td>High Rates</td>
            </tr>
            <tr>
              <td>
                <strong>Gold Loan</strong>
              </td>
              <td>7.5% - 12%</td>
              <td>Lower Rate, Fast</td>
              <td>Need Gold</td>
            </tr>
            <tr>
              <td>
                <strong>Home Top-Up</strong>
              </td>
              <td>8.5% - 9.5%</td>
              <td>Cheapest Option</td>
              <td>Need Home Loan</td>
            </tr>
            <tr>
              <td>
                <strong>Credit Card Loan</strong>
              </td>
              <td>15% - 40%</td>
              <td>Instant</td>
              <td>Very Expensive</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-pl-3" type="leaderboard" />
      </div>

      <h2 id="cibil-impact">Impact on Your Credit Score</h2>
      <ul>
        <li>
          <strong>Application:</strong> Every application triggers a &quot;Hard
          Inquiry&quot; which dips your score slightly. Do not apply to 10 banks
          at once.
        </li>
        <li>
          <strong>Repayment:</strong> Timely payments boost your score
          significantly.
        </li>
        <li>
          <strong>Default:</strong> Missing even one EMI can drop your score by
          50+ points.
        </li>
      </ul>

      <h2 id="smart-tips">Smart Borrowing Tips</h2>
      <ul className="checklist">
        <li>
          <strong>Debt Consolidation:</strong> Use a low-rate PL (12%) to pay
          off high-rate Credit Card debt (36%).
        </li>
        <li>
          <strong>Avoid Luxury:</strong> Don&apos;t take a loan for vacations or
          weddings unless necessary.
        </li>
        <li>
          <strong>Check Pre-Payment:</strong> Ensure there are no heavy
          penalties for closing early.
        </li>
      </ul>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>Can I get a loan with a low CIBIL score?</summary>
          <p>
            It is difficult. Most banks require 750+. Some NBFCs/Apps may lend
            to 600-700 scores but will charge very high interest rates (20-30%).
          </p>
        </details>
        <details>
          <summary>Is personal loan interest tax deductible?</summary>
          <p>
            Generally <strong>No</strong> for salaried individuals. However, if
            the loan is used for business expansion, purchase of assets, or home
            renovation, tax benefits *might* be claimed under specific sections
            (consult a CA).
          </p>
        </details>
        <details>
          <summary>What happens if I miss an EMI?</summary>
          <p>
            You will be charged a late fee and penal interest. More importantly,
            your CIBIL score will drop sharply, making future loans difficult.
          </p>
        </details>
        <details>
          <summary>How fast is the disbursement?</summary>
          <p>
            Pre-approved loans can be disbursed in <strong>10 seconds</strong>.
            Regular loans typically take <strong>24 to 48 hours</strong> after
            document submission.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          A Personal Loan is a great tool for emergencies, but a bad habit for
          lifestyle expenses.
        </p>
        <h4>Your Checklist:</h4>
        <ul className="checklist">
          <li>
            Maintain <strong>CIBIL 750+</strong>.
          </li>
          <li>
            Ask for <strong>Reducing Balance Rate</strong>.
          </li>
          <li>
            Compare <strong>Processing Fees</strong>.
          </li>
          <li>
            Check <strong>Foreclosure Charges</strong>.
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
        <strong>Disclaimer:</strong> Interest rates and terms are subject to
        change by lenders. This guide is for educational purposes. Please check
        the loan agreement carefully before signing.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Need a loan?</h2>
          <p>Check your eligibility and calculate your EMI first.</p>
          <div className="final-cta-row">
            <Link href="/loans/personal-loan" className="primary-cta">
              Personal Loan EMI
            </Link>
            <Link href="/simple-interest-calculator" className="secondary-cta">
              Check Flat Rate
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-pl-4" type="leaderboard" />
      </div>
    </article>
  );
}
