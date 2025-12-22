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
  title: 'EPF Guide 2025: 8.25% Interest, Tax & Withdrawal Rules',
  description:
    'EPF 2025: 8.25% interest rate, EEE tax benefits (Section 80C), 5-year withdrawal rule, EPF vs NPS/PPF comparison & how to build ₹1-2 crore tax-free corpus.',
  keywords: [
    'epf interest rate 2025',
    'employee provident fund withdrawal rules',
    'epf tax on withdrawal before 5 years',
    'uan activation steps',
    'epf vs ppf interest rate',
    'voluntary provident fund vpf',
  ],
  openGraph: {
    title:
      'EPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
    description:
      'The ultimate guide to your Employee Provident Fund. Learn about the 8.25% interest, EEE tax status, and how to avoid tax on withdrawals.',
    url: 'https://www.fincado.com/guides/epf-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/epf/epf-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'EPF passbook and retirement savings growth chart',
      },
    ],
  },
};

export default function EPFGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'EPF Guide 2025',
            url: 'https://www.fincado.com/guides/epf-guide',
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
              'EPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
            description:
              'Comprehensive guide to Employee Provident Fund (EPF): Interest rates, contribution split (EPF vs EPS), withdrawal rules, and tax implications.',
            image:
              'https://www.fincado.com/images/guides/epf/epf-guide-hero.webp',
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
            datePublished: '2025-02-22',
            dateModified: '2025-02-22',
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
                name: 'Is EPF withdrawal taxable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Withdrawal is 100% tax-free if you have completed 5 years of continuous service. If withdrawn before 5 years, it is taxable at your slab rate.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I withdraw my full EPF amount?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Full withdrawal is allowed only upon retirement (58 years) or if you remain unemployed for 2 months. Partial withdrawals are allowed for specific needs like housing or medical emergencies.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the current EPF interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The EPF interest rate for FY 2024-25 is 8.25% per annum.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Retirement Savings</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          EPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits
        </h1>
        <div className="guide-meta">
          <span>
            By <strong>Fincado Team</strong>
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>13 Min Read</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <ShareTools title="EPF Guide 2025" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          The <strong>Employee Provident Fund (EPF)</strong> is India's largest mandatory retirement scheme, offering a government-backed <strong>8.25% interest rate</strong> (FY 2024-25) and <strong>EEE tax status</strong>.

          However, most employees unknowingly lose money by ignoring the <strong>"EPS Split"</strong> or withdrawing funds prematurely, which attracts tax. This guide covers UAN activation, withdrawal rules, and how to become an EPF Crorepati.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/epf/epf-guide-hero.webp"
          alt="EPF contribution breakdown pie chart"
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

      <h2>What is EPF (Employee Provident Fund)?</h2>
      <WikiText
        content={`
          <strong>EPF</strong> is a retirement savings scheme managed by the EPFO. Both employee and employer contribute <strong>12%</strong> of the basic salary. It offers guaranteed returns and capital protection.
        `}
      />

      <div className="callout-box info-box">
        <h3>Key Highlights (2025):</h3>
        <ul>
          <li>
            <strong>Interest Rate:</strong> 8.25% p.a.
          </li>
          <li>
            <strong>Contribution:</strong> 12% Employee + 12% Employer.
          </li>
          <li>
            <strong>Tax Status:</strong> EEE (Exempt-Exempt-Exempt) after 5
            years.
          </li>
          <li>
            <strong>Lock-In:</strong> Until Retirement (58 years).
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#contribution-split">1. The 12% Rule (EPF vs EPS)</a>
          </li>
          <li>
            <a href="#interest-rate">2. Interest Rate & Calculation</a>
          </li>
          <li>
            <a href="#tax-benefits">3. Tax Benefits (The EEE Advantage)</a>
          </li>
          <li>
            <a href="#withdrawal-rules">4. Withdrawal Rules (5-Year Clause)</a>
          </li>
          <li>
            <a href="#epf-vs-ppf">5. EPF vs PPF vs NPS</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-epf-1" type="leaderboard" />
      </div>

      <h2 id="contribution-split">EPF Structure: Where Does Your Money Go?</h2>
      <p>
        Many believe the employer matches their contribution 100%.{' '}
        <strong>This is a myth.</strong> Here is the real breakdown of the
        employer&apos;s 12%:
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Share</th>
              <th>Goes To</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Employee Share</strong>
              </td>
              <td>12%</td>
              <td>
                <strong>EPF Account</strong>
              </td>
              <td>Your Corpus + Interest</td>
            </tr>
            <tr>
              <td>
                <strong>Employer Share 1</strong>
              </td>
              <td>3.67%</td>
              <td>
                <strong>EPF Account</strong>
              </td>
              <td>Your Corpus + Interest</td>
            </tr>
            <tr>
              <td>
                <strong>Employer Share 2</strong>
              </td>
              <td>8.33%</td>
              <td>
                <strong>EPS (Pension)</strong>
              </td>
              <td>Monthly Pension (No Interest)</td>
            </tr>
            <tr>
              <td>
                <strong>EDLI</strong>
              </td>
              <td>0.5%</td>
              <td>Insurance Fund</td>
              <td>Life Insurance Cover</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">Reality Check</div>
          <div className="myth-title">Only 15.67% goes to PF</div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              Your 12% + Employer&apos;s 3.67% = <strong>15.67%</strong> goes to
              your EPF account to earn 8.25% interest.
            </p>
            <p>
              The remaining <strong>8.33%</strong> goes to the Pension Scheme
              (EPS), which does not earn compound interest.
            </p>
          </div>
        </div>
      </div>

      <h2 id="interest-rate">Current EPF Interest Rate (2025)</h2>
      <p>
        The interest rate for FY 2024-25 is <strong>8.25% p.a.</strong> This is
        higher than PPF (7.1%) and most Fixed Deposits.
      </p>
      <ul>
        <li>
          <strong>Calculation:</strong> Monthly (on running balance).
        </li>
        <li>
          <strong>Credit:</strong> Annually (usually by March 31st).
        </li>
      </ul>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-epf-2" type="leaderboard" />
      </div>

      <h2 id="tax-benefits">Tax Benefits: The EEE Advantage</h2>
      <WikiText
        content={`EPF enjoys <strong>EEE (Exempt-Exempt-Exempt)</strong> status, meaning no tax at contribution, accumulation, or withdrawal stages (conditions apply).`}
      />

      <h3>1. Section 80C Deduction</h3>
      <p>
        Your 12% contribution is eligible for tax deduction under Section 80C
        (up to ₹1.5 Lakh limit).
      </p>

      <h3>2. Tax-Free Interest</h3>
      <p>
        Interest earned is tax-free. *Exception:* If your own contribution
        exceeds <strong>₹2.5 Lakh/year</strong>, interest on the excess amount
        is taxable.
      </p>

      <h3>3. Tax-Free Withdrawal</h3>
      <p>
        Withdrawal is 100% tax-free if you have completed{' '}
        <strong>5 years of continuous service</strong>.
      </p>

      <h2 id="withdrawal-rules">Withdrawal Rules: The Critical 5-Year Rule</h2>
      <p>Premature withdrawal is the biggest wealth killer.</p>

      <h3>Withdrawal BEFORE 5 Years</h3>
      <ul>
        <li>
          ❌ <strong>Taxable:</strong> Employer&apos;s share and Interest are
          fully taxable.
        </li>
        <li>
          ❌ <strong>TDS:</strong> 10% TDS deducted if amount `{'>'}` ₹50,000.
        </li>
      </ul>

      <h3>Withdrawal AFTER 5 Years</h3>
      <ul>
        <li>
          ✅ <strong>Tax-Free:</strong> Entire corpus is tax-free.
        </li>
        <li>
          ✅ <strong>No TDS:</strong> Full amount credited.
        </li>
      </ul>

      <div className="callout-box info-box">
        <strong>Pro Tip:</strong> When changing jobs, <strong>TRANSFER</strong>{' '}
        your EPF account (using UAN) instead of withdrawing. This maintains your
        &quot;Continuous Service&quot; record for the 5-year rule.
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-epf-3" type="leaderboard" />
      </div>

      <h2 id="epf-vs-ppf">EPF vs PPF vs NPS Comparison</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>EPF</th>
              <th>PPF</th>
              <th>NPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Interest</strong>
              </td>
              <td>
                <strong>8.25%</strong> (Fixed)
              </td>
              <td>7.1% (Fixed)</td>
              <td>10-12% (Market)</td>
            </tr>
            <tr>
              <td>
                <strong>Eligibility</strong>
              </td>
              <td>Salaried Only</td>
              <td>All Residents</td>
              <td>All Residents</td>
            </tr>
            <tr>
              <td>
                <strong>Employer Match</strong>
              </td>
              <td>
                <strong>Yes</strong>
              </td>
              <td>No</td>
              <td>Optional (Corporate)</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Status</strong>
              </td>
              <td>EEE (Conditional)</td>
              <td>
                <strong>EEE</strong>
              </td>
              <td>EET</td>
            </tr>
            <tr>
              <td>
                <strong>Lock-In</strong>
              </td>
              <td>Retirement (58)</td>
              <td>15 Years</td>
              <td>Age 60</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>How do I check my EPF balance?</summary>
          <p>
            You can check your balance via the <strong>EPFO Portal</strong>,{' '}
            <strong>UMANG App</strong>, or by giving a missed call to{' '}
            <strong>011-22901406</strong> from your registered mobile number.
          </p>
        </details>
        <details>
          <summary>What is VPF (Voluntary Provident Fund)?</summary>
          <p>
            VPF allows you to contribute more than the mandatory 12% to your EPF
            account. It earns the same 8.25% interest and enjoys EEE tax
            benefits (up to ₹2.5L limit).
          </p>
        </details>
        <details>
          <summary>Can I withdraw EPF for home loan repayment?</summary>
          <p>
            Yes. You can make a partial withdrawal for home
            purchase/construction or repayment of home loan after completing{' '}
            <strong>5 years of service</strong>.
          </p>
        </details>
        <details>
          <summary>Is UAN mandatory?</summary>
          <p>
            Yes. The Universal Account Number (UAN) is mandatory for checking
            balance, transferring accounts, and making withdrawal claims.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          EPF is the backbone of retirement planning for salaried employees.
        </p>
        <h4>Your Action Plan:</h4>
        <ul className="checklist">
          <li>
            Activate your <strong>UAN</strong>.
          </li>
          <li>
            Check <strong>Passbook</strong> monthly.
          </li>
          <li>
            <strong>Transfer</strong> accounts when changing jobs.
          </li>
          <li>
            Avoid withdrawal before <strong>5 years</strong>.
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
        <strong>Disclaimer:</strong> Interest rates are declared annually by the
        EPFO. Tax rules are subject to change. This guide is for educational
        purposes. Consult a tax advisor for specific queries.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Plan your retirement</h2>
          <p>Calculate your EPF corpus growth over time.</p>
          <div className="final-cta-row">
            <Link href="/calculators/epf-calculator" className="primary-cta">
              EPF Calculator
            </Link>
            <Link href="/calculators/ppf-calculator" className="secondary-cta">
              Compare with PPF
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-epf-4" type="leaderboard" />
      </div>
    </article>
  );
}
