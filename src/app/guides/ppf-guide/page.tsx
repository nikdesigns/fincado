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
  title: 'PPF Guide 2025: 7.1% Rate, Withdrawal & Tax Benefits',
  description:
    'PPF 2025 guide: 7.1% interest, EEE tax status (save ₹46K/year), 5th-month deposit rule, withdrawal/loan rules, PPF vs ELSS/EPF & how to earn ₹1 crore+.',
  keywords: [
    'ppf interest rate 2025',
    'public provident fund withdrawal rules',
    'ppf vs elss tax benefit',
    'ppf calculator 15 years',
    'loan against ppf account',
    'ppf account extension rules',
  ],
  openGraph: {
    title:
      'PPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
    description:
      'Turn ₹1.5 Lakh/year into ₹1 Crore tax-free. Master the 5th-of-month rule, extensions, and EEE benefits.',
    url: 'https://www.fincado.com/guides/ppf-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/ppf/ppf-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Piggy bank with tax-free growth chart',
      },
    ],
  },
};

export default function PPFGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'PPF Guide 2025',
            url: 'https://www.fincado.com/guides/ppf-guide',
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
              'PPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
            description:
              'Complete guide to Public Provident Fund (PPF): Interest calculation, withdrawal rules, loan facility, and comparison with ELSS/EPF.',
            image:
              'https://www.fincado.com/images/guides/ppf/ppf-guide-hero.webp',
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
            datePublished: '2025-02-18',
            dateModified: '2025-02-18',
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
                name: 'What happens if I miss a PPF deposit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your account becomes inactive. You can revive it by paying a penalty of ₹50 per year of default plus the minimum deposit of ₹500 for each missed year.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I have more than one PPF account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. An individual can open only one PPF account in their name. Opening a second account is illegal and will not earn interest.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is PPF interest taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. PPF falls under the EEE category. The interest earned and the maturity amount are completely tax-free.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Tax Saving</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          PPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)
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
          <ShareTools title="PPF Guide 2025" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Understanding <strong>PPF (Public Provident Fund)</strong> is essential for long-term wealth creation. With a <strong>7.1% tax-free interest rate</strong> and sovereign guarantee, it remains India's favorite tax-saving tool.

          However, missing the <strong>"5th of the Month" rule</strong> can cost you thousands in interest. This guide covers interest calculation, <strong>80C benefits</strong>, withdrawal rules, and how to become a <strong>Crorepati</strong> using PPF extensions.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/ppf/ppf-guide-hero.webp"
          alt="Growth of PPF investment over 15 years"
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

      <h2>What is PPF (Public Provident Fund)?</h2>
      <WikiText
        content={`
          <strong>PPF</strong> is a government-backed savings scheme with a <strong>15-year lock-in</strong>. It offers guaranteed returns and complete tax exemption under the <strong>EEE</strong> (Exempt-Exempt-Exempt) status.
        `}
      />

      <div className="callout-box info-box">
        <h3>Key Highlights (2025):</h3>
        <ul>
          <li>
            <strong>Interest Rate:</strong> 7.1% p.a. (Compounded Annually)
          </li>
          <li>
            <strong>Min/Max Deposit:</strong> ₹500 / ₹1.5 Lakh per year
          </li>
          <li>
            <strong>Tenure:</strong> 15 Years (Extendable by 5 years)
          </li>
          <li>
            <strong>Tax Benefit:</strong> Section 80C (up to ₹1.5L)
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#interest-rate">
              1. Interest Rate & &quot;5th Day&quot; Rule
            </a>
          </li>
          <li>
            <a href="#eligibility">2. Eligibility & Account Rules</a>
          </li>
          <li>
            <a href="#tax-benefits">3. The EEE Tax Advantage</a>
          </li>
          <li>
            <a href="#withdrawal-rules">4. Withdrawal, Loan & Closure</a>
          </li>
          <li>
            <a href="#ppf-vs-alternatives">5. PPF vs ELSS vs EPF</a>
          </li>
          <li>
            <a href="#crorepati-strategy">6. How to build ₹1 Crore</a>
          </li>
          <li>
            <a href="#faqs">7. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-ppf-1" type="leaderboard" />
      </div>

      <h2 id="interest-rate">
        Current Interest Rate & The &quot;5th of the Month&quot; Rule
      </h2>
      <p>
        The current rate is <strong>7.1%</strong>. Interest is calculated
        monthly but credited annually on March 31st.
      </p>

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">Crucial Rule</div>
          <div className="myth-title">Deposit BEFORE the 5th</div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              Interest is calculated on the <strong>lowest balance</strong>{' '}
              between the 5th and the last day of the month.
            </p>
            <p>
              If you deposit on the <strong>6th</strong>, you lose interest on
              that amount for the <strong>entire month</strong>.
            </p>
          </div>
          <div className="reality-box">
            <strong>Pro Tip:</strong> Always set your SIP/Deposit date to the
            <strong>1st or 2nd</strong> of the month.
          </div>
        </div>
      </div>

      <h2 id="eligibility">Eligibility & Account Rules</h2>
      <ul className="checklist">
        <li>
          <strong>Residents Only:</strong> Only Indian residents can open a PPF.
          NRIs cannot open *new* accounts.
        </li>
        <li>
          <strong>One Account:</strong> Only one account per individual is
          allowed.
        </li>
        <li>
          <strong>Minors:</strong> Parents can open accounts for minors
          (Guardian operated).
        </li>
        <li>
          <strong>Deposit Limit:</strong> Max ₹1.5 Lakh per financial year (Self
          + Minor combined).
        </li>
      </ul>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-ppf-2" type="leaderboard" />
      </div>

      <h2 id="tax-benefits">Tax Benefits: The EEE Advantage</h2>
      <WikiText
        content={`<strong>EEE</strong> stands for Exempt-Exempt-Exempt. It means you pay <strong>Zero Tax</strong> at all three stages.`}
      />

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Tax Treatment</th>
              <th>Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Investment</strong>
              </td>
              <td>Section 80C</td>
              <td>Deduction up to ₹1.5 Lakh</td>
            </tr>
            <tr>
              <td>
                <strong>Interest</strong>
              </td>
              <td>Tax-Free</td>
              <td>7.1% Interest is fully exempt</td>
            </tr>
            <tr>
              <td>
                <strong>Maturity</strong>
              </td>
              <td>Tax-Free</td>
              <td>Withdrawal amount is 100% exempt</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="withdrawal-rules">Withdrawal, Loan & Premature Closure</h2>
      <p>PPF is illiquid, but offers some options in emergencies.</p>

      <h3>1. Loan against PPF</h3>
      <ul>
        <li>
          Available from <strong>3rd to 6th financial year</strong>.
        </li>
        <li>Loan amount: Up to 25% of balance.</li>
        <li>
          Interest: <strong>Only 1%</strong> p.a.
        </li>
      </ul>

      <h3>2. Partial Withdrawal</h3>
      <ul>
        <li>
          Allowed from <strong>7th financial year</strong>.
        </li>
        <li>Max 50% of the balance.</li>
        <li>Only one withdrawal per year.</li>
      </ul>

      <h3>3. Premature Closure</h3>
      <ul>
        <li>
          Allowed after <strong>5 years</strong>.
        </li>
        <li>Valid reasons: Medical emergency, Higher education.</li>
        <li>
          <strong>Penalty:</strong> 1% interest deduction for all previous
          years.
        </li>
      </ul>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-ppf-3" type="leaderboard" />
      </div>

      <h2 id="ppf-vs-alternatives">PPF vs Alternatives Comparison</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>PPF</th>
              <th>ELSS (Mutual Fund)</th>
              <th>EPF (Employee)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Returns</strong>
              </td>
              <td>7.1% (Fixed)</td>
              <td>
                <strong>12-15%</strong> (Variable)
              </td>
              <td>8.25% (Fixed)</td>
            </tr>
            <tr>
              <td>
                <strong>Lock-In</strong>
              </td>
              <td>15 Years</td>
              <td>
                <strong>3 Years</strong>
              </td>
              <td>Until Retirement</td>
            </tr>
            <tr>
              <td>
                <strong>Risk</strong>
              </td>
              <td>Zero (Govt)</td>
              <td>High (Market)</td>
              <td>Zero (Govt)</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Status</strong>
              </td>
              <td>
                <strong>EEE</strong>
              </td>
              <td>EET (LTCG Tax)</td>
              <td>EEE</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Verdict:</strong> Choose <strong>PPF</strong> for guaranteed
        safety. Choose
        <strong>ELSS</strong> for higher growth if you can tolerate risk.
      </div>

      <h2 id="crorepati-strategy">How to Become a Crorepati with PPF</h2>
      <WikiText
        content={`The magic of PPF lies in <strong>Extensions</strong>. After 15 years, you can extend your account in blocks of 5 years indefinitely.`}
      />

      <h3>The Power of Compounding (Investing ₹1.5L/year)</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tenure</th>
              <th>Total Invested</th>
              <th>Maturity Amount (@7.1%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15 Years</td>
              <td>₹22.5 Lakh</td>
              <td>₹40.7 Lakh</td>
            </tr>
            <tr>
              <td>20 Years (1 Ext)</td>
              <td>₹30 Lakh</td>
              <td>₹66.6 Lakh</td>
            </tr>
            <tr>
              <td>
                <strong>25 Years (2 Ext)</strong>
              </td>
              <td>₹37.5 Lakh</td>
              <td>
                <strong>₹1.03 Crore</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        By extending just twice (10 extra years), your corpus more than doubles
        to <strong>₹1 Crore+</strong>!
      </p>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>What happens if I miss a deposit?</summary>
          <p>
            Your account becomes discontinued. You must pay a penalty of ₹50 per
            year plus the minimum ₹500 subscription for each missed year to
            reactivate it.
          </p>
        </details>
        <details>
          <summary>Can I open a PPF account in a private bank?</summary>
          <p>
            Yes, authorized private banks like HDFC, ICICI, and Axis Bank offer
            PPF accounts. The rules and interest rates are exactly the same as
            Post Office PPF.
          </p>
        </details>
        <details>
          <summary>Is the interest rate fixed for 15 years?</summary>
          <p>
            No. The government reviews and revises the interest rate
            <strong>quarterly</strong>. Your balance earns the prevailing rate
            for that quarter.
          </p>
        </details>
        <details>
          <summary>Can I transfer my PPF account?</summary>
          <p>
            Yes, you can transfer your PPF account from a Post Office to a Bank,
            or from one bank branch to another.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>PPF is the cornerstone of a safe retirement portfolio.</p>
        <h4>Your Action Plan:</h4>
        <ul className="checklist">
          <li>
            {' '}
            Open PPF for <strong>safety & tax saving</strong>.
          </li>
          <li>
            {' '}
            Deposit before the <strong>5th</strong> of every month.
          </li>
          <li>
            {' '}
            Extend after 15 years for <strong>wealth creation</strong>.
          </li>
          <li>
            {' '}
            Combine with <strong>ELSS</strong> for higher growth.
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
        <strong>Disclaimer:</strong> Interest rates are subject to change by the
        government. This guide is for educational purposes. Please consult a
        financial advisor for personalized advice.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Plan your tax savings</h2>
          <p>Calculate your PPF maturity amount and tax benefits.</p>
          <div className="final-cta-row">
            <Link href="/ppf-calculator" className="primary-cta">
              PPF Calculator
            </Link>
            <Link href="/sip-calculator" className="secondary-cta">
              Compare with ELSS
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-ppf-4" type="leaderboard" />
      </div>
    </article>
  );
}
