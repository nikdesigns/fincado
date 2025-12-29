import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import FAQSchema from '@/components/FAQSchema';
import InlineTaxCalculator from '@/components/InlineTaxCalculator';

// ==========================================
// 1. CONFIGURATION
// ==========================================
const CONFIG = {
  salary: '12 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-12-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-12-lakh-salary-hero.webp', // Placeholder
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹12 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
  description:
    'Tax on ₹12 Lakh salary in FY 2025-26 explained. Compare New vs Old Regime, exact monthly in-hand salary, tax slabs, and break-even deductions.',
  keywords: [
    'Tax on 12 lakh salary',
    '12 LPA take home salary',
    'New vs Old regime for 12 lakh',
    'monthly in hand salary for 12 lakhs',
    'income tax calculator 2025',
  ],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹12 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
    description:
      'Detailed breakdown: Your exact monthly take-home pay and tax liability.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    images: [CONFIG.heroImage],
  },
};

export default function Tax12LakhGuide() {
  const pageTitle =
    'Tax on ₹12 Lakh Salary (2025): New vs Old Regime + In-Hand Pay';

  // ✅ PAA-Style FAQs
  const faqData = [
    {
      question: 'How much tax do I pay on 12 LPA salary?',
      answer:
        'For a ₹12 Lakh salary, you pay approx ₹71,500 under the New Tax Regime (FY 2025-26). Under the Old Regime, the tax is significantly higher at ₹1,63,800 unless you claim deductions.',
    },
    {
      question: 'What is the monthly in-hand salary for 12 LPA?',
      answer:
        'After deducting Income Tax (~₹5,958) and PF (~₹6,000), your approximate monthly in-hand salary for 12 LPA is around ₹87,800 under the New Regime.',
    },
    {
      question: 'Which tax regime is better for 12 Lakh package?',
      answer:
        'The New Tax Regime is better by default. You should only switch to the Old Regime if you have total deductions (HRA, Home Loan, 80C) exceeding ₹3.75 Lakhs.',
    },
    {
      question: 'Is 12 Lakh salary good in India?',
      answer:
        'Your approximate monthly in-hand salary is ₹87,800 under the New Regime.',
    },
    {
      question: 'How to save tax on 12 LPA salary?',
      answer:
        'Under the New Regime, tax is low by default. Under the Old Regime, you can save tax by maximizing 80C (₹1.5L), paying health insurance premiums (80D), and claiming HRA or Home Loan interest.',
    },
  ];

  return (
    <article className="article guide-body">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 12 Lakh Salary',
            url: `https://www.fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />

      <FAQSchema faqs={faqData} />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageTitle,
            image: [CONFIG.heroImage],
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
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
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header
        style={{
          marginBottom: 24,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 24,
        }}
      >
        <span className="badge-flagship">Income Tax Guide</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(30px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
            color: 'var(--color-text-main)',
          }}
        >
          {pageTitle}
        </h1>
        <div
          style={{
            fontSize: 14,
            color: 'var(--color-text-muted)',
            marginTop: 12,
          }}
        >
          <span>
            Updated: <strong>FY 2025-26</strong>
          </span>{' '}
          • <span>9 Min Read</span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      {/* --- HERO IMAGE --- */}
      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="12 Lakh Salary Tax Comparison New vs Old Regime"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      {/* --- INTRO (Optimized for Search Intent) --- */}
      <WikiText
        content={`Earning a <strong>₹12 Lakh salary</strong> places you in India's growing upper-middle class, but it also increases your tax liability. For <strong>FY 2025-26</strong>, the choice between the New vs Old Tax Regime is critical. Making the wrong decision could cost you over <strong>₹90,000</strong> in unnecessary taxes.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* --- DIRECT ANSWER BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹12 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is the clear winner for most people.
          Your total tax will be approx <strong>₹71,500</strong>.
        </p>

        {/* Voice Search Friendly Sentence */}
        <p
          style={{
            fontSize: '15px',
            fontStyle: 'italic',
            color: '#475569',
            margin: '0 0 16px 0',
          }}
        >
          If you earn ₹12 lakh per year in India, your take-home salary is
          roughly ₹87,800 per month under the New Tax Regime.
        </p>

        {/* At a Glance Table */}
        <div
          style={{
            margin: '0 0 20px 0',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <table
            style={{
              width: '100%',
              fontSize: '14px',
              borderCollapse: 'collapse',
              background: '#fff',
            }}
          >
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>
                  Annual Salary
                </td>
                <td
                  style={{
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}
                >
                  ₹12,00,000
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>
                  Tax (New Regime)
                </td>
                <td
                  style={{
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    color: '#dc2626',
                    textAlign: 'right',
                  }}
                >
                  ₹71,500
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>
                  Monthly In-Hand
                </td>
                <td
                  style={{
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    color: '#16a34a',
                    textAlign: 'right',
                  }}
                >
                  ₹87,842
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>
                  Best Regime
                </td>
                <td
                  style={{
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    color: '#16a34a',
                    textAlign: 'right',
                  }}
                >
                  New
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The <strong>Old Tax Regime</strong> is very expensive (Tax: ₹1.63
          Lakhs) unless you have massive deductions (HRA + Home Loan + 80C)
          totaling more than <strong>₹3.75 Lakhs</strong>.
        </p>

        {/* --- CALCULATOR (12L Default) --- */}
        <InlineTaxCalculator defaultSalary={1200000} />
      </div>

      <AdSlot id="tax-12l-1" type="in-article" />

      {/* --- TAKE-HOME SALARY SECTION --- */}
      <h2 id="take-home-salary">₹12 Lakh Salary – Monthly In-Hand Breakdown</h2>
      <p>
        Your &quot;In-Hand&quot; salary is what actually hits your bank account
        after the government and your employer take their share. Here is the
        realistic breakdown for <strong>12 LPA</strong>.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Monthly Amount (New Regime)</th>
              <th>Monthly Amount (Old Regime)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Gross Salary</strong>
              </td>
              <td>
                <strong>₹1,00,000</strong>
              </td>
              <td>
                <strong>₹1,00,000</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF Contribution (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹6,000</td>
              <td style={{ color: '#dc2626' }}>- ₹6,000</td>
            </tr>
            <tr>
              <td>Less: Professional Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: Income Tax (TDS)</td>
              <td style={{ color: '#dc2626' }}>- ₹5,958</td>
              <td style={{ color: '#dc2626' }}>- ₹13,650</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>Final In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹87,842</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹80,150</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="caption-text">
        *Old Regime calculation assumes NO other deductions except standard
        deduction.
      </p>

      {/* --- VISUAL SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹12,00,000 Go?</h2>
      <p>
        Under the New Regime, the tax burden is moderate, allowing you to keep
        nearly 88% of your income.
      </p>

      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (87.8%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹10.54 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Disposable income.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.72 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Tax paid (New Regime).</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.2%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.74 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Long-term savings.</p>
        </div>
      </div>

      <AdSlot id="tax-12l-2" type="in-article" />

      {/* --- CALCULATION MATH --- */}
      <h2 id="new-regime">Tax Calculation: New Tax Regime (2025)</h2>
      <p>
        For FY 2025-26, you get a <strong>Standard Deduction of ₹75,000</strong>
        . This reduces your taxable income from ₹12L to ₹11.25L.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Income Slab</th>
              <th>Rate</th>
              <th>Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>₹0 - ₹3L</td>
              <td>Nil</td>
              <td>₹0</td>
            </tr>
            <tr>
              <td>₹3L - ₹7L</td>
              <td>5%</td>
              <td>₹20,000</td>
            </tr>
            <tr>
              <td>₹7L - ₹10L</td>
              <td>10%</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>₹10L - ₹11.25L</td>
              <td>15%</td>
              <td>₹18,750</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontWeight: 'bold' }}>
              <td>Total Tax (Before Cess)</td>
              <td>-</td>
              <td>₹68,750</td>
            </tr>
            <tr>
              <td>Health & Education Cess (4%)</td>
              <td>-</td>
              <td>₹2,750</td>
            </tr>
            <tr
              style={{
                background: '#dcfce7',
                fontWeight: 'bold',
                color: '#14532d',
              }}
            >
              <td>Final Tax Payable</td>
              <td>-</td>
              <td>₹71,500</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- COMPARISON TABLE --- */}
      <h2 id="comparison">New vs Old Tax Regime for ₹12 LPA</h2>
      <p>
        The difference is stark here. Without huge deductions, the Old Regime
        tax is more than <strong>double</strong> the New Regime tax.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>New Regime</th>
              <th>Old Regime (No Deductions)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross Salary</td>
              <td>₹12,00,000</td>
              <td>₹12,00,000</td>
            </tr>
            <tr>
              <td>Standard Deduction</td>
              <td>₹75,000</td>
              <td>₹50,000</td>
            </tr>
            <tr>
              <td>Taxable Income</td>
              <td>₹11,25,000</td>
              <td>₹11,50,000</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Payable</strong>
              </td>
              <td style={{ color: '#16a34a', fontWeight: 'bold' }}>₹71,500</td>
              <td style={{ color: '#dc2626', fontWeight: 'bold' }}>
                ₹1,63,800
              </td>
            </tr>
            <tr>
              <td>
                <strong>Savings</strong>
              </td>
              <td
                colSpan={2}
                style={{
                  textAlign: 'center',
                  background: '#f0fdf4',
                  fontWeight: 'bold',
                }}
              >
                New Regime saves you ₹92,300
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- BREAK EVEN EXPLANATION --- */}
      <h2 id="break-even">The Break-Even Point: ₹3.75 Lakhs</h2>

      <div className="callout-box info-box">
        <h3>The Magic Number</h3>
        <p>
          To make the Old Regime worth it, you need to reduce your taxable
          income massively.
        </p>
        <p>
          Calculations show that the{' '}
          <strong>Break-Even Deduction amount is approx ₹3,75,000.</strong>
        </p>
        <ul className="checklist">
          <li>
            <strong>Deductions &lt; ₹3.75 Lakhs:</strong> Stick to{' '}
            <strong>New Regime</strong>.
          </li>
          <li>
            <strong>Deductions &gt; ₹3.75 Lakhs:</strong> Switch to{' '}
            <strong>Old Regime</strong>.
          </li>
        </ul>
      </div>

      {/* --- PERSONAS --- */}
      <h2 id="personas">Which Regime Should You Choose?</h2>

      <div className="rejection-grid">
        {/* Profile 1 */}
        <div className="rejection-card">
          <div className="rejection-title">👦 The Saver</div>
          <p className="rejection-desc">Maxes out 80C but pays no rent.</p>
          <ul
            className="checklist"
            style={{ fontSize: '13px', marginBottom: '12px' }}
          >
            <li>Rent: ₹0</li>
            <li>80C: ₹1.5L</li>
            <li>NPS: ₹50k</li>
          </ul>
          <div
            className="solution-box"
            style={{
              background: '#f0fdf4',
              borderColor: '#bbf7d0',
              color: '#166534',
            }}
          >
            <span className="solution-label">Winner</span>
            <strong>New Regime</strong> (Saves ₹35k+)
          </div>
        </div>

        {/* Profile 2 */}
        <div className="rejection-card">
          <div className="rejection-title">🏠 The Heavy Deductor</div>
          <p className="rejection-desc">Pays rent + has Home Loan + 80C.</p>
          <ul
            className="checklist"
            style={{ fontSize: '13px', marginBottom: '12px' }}
          >
            <li>Home Loan Int: ₹2L</li>
            <li>80C: ₹1.5L</li>
            <li>80D: ₹25k</li>
          </ul>
          <div
            className="solution-box"
            style={{
              background: '#eff6ff',
              borderColor: '#bfdbfe',
              color: '#1e40af',
            }}
          >
            <span className="solution-label">Winner</span>
            <strong>Old Regime</strong> (Saves ₹5k)
          </div>
        </div>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          For a ₹12 Lakh salary, the <strong>New Tax Regime</strong> is
          efficient and stress-free. It leaves you with ~₹88,000 monthly in
          hand. Unless you have a Home Loan AND maximize Section 80C, sticking
          to the New Regime is the smartest financial move.
        </p>
      </div>

      <AuthorBio />

      {/* --- INTERNAL LINKING & CTA --- */}
      <section className="sibling-links">
        <h3>Useful Tools & Guides</h3>
        <ul>
          <li>
            <Link href="/guides/tax-on-10-lakh-salary">
              Check Tax for ₹10 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/guides/tax-on-15-lakh-salary">
              Check Tax for ₹15 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/guides/elss-funds-guide-2025">
              Best ELSS Funds (80C)
            </Link>
          </li>
        </ul>
      </section>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions</h2>
      <div className="faqs-accordion">
        {faqData.map((faq, index) => (
          <details key={index}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </article>
  );
}
