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
  salary: '10 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-10-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-10-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹10 Lakh Salary: New vs Old Regime (FY 2025-26)',
  description:
    'How much tax on 10 lakh salary? Compare New vs Old Tax Regime for FY 2025-26. See exact in-hand salary, break-even calculation, and tax saving tips.',
  keywords: [
    'Tax on 10 lakh salary',
    '10 LPA take home salary',
    'New vs Old tax regime for 10 lakh',
    'Is 10 lakh salary taxable',
    'how to save tax on 10 lakh salary',
    'income tax calculator 2025',
  ],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹10 Lakh Salary: Complete 2025 Guide',
    description:
      'Detailed breakdown: New vs Old Regime tax liability and monthly in-hand salary.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    images: [CONFIG.heroImage],
  },
};

export default function Tax10LakhGuide() {
  const pageTitle =
    'Tax on ₹10 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  // ✅ 4. REWRITTEN FAQs (PAA STYLE)
  const faqData = [
    {
      question: 'Is ₹10 lakh salary taxable in India?',
      answer:
        'Yes, a ₹10 Lakh annual salary is taxable in India. Under the New Tax Regime (FY 2025-26), the tax liability is approx ₹44,200. However, if your taxable income is below ₹7 Lakhs, you pay zero tax due to the Section 87A rebate.',
    },
    {
      question: 'How much tax do I pay on 10 LPA?',
      answer:
        'On a ₹10 Lakh salary, you pay ₹44,200 under the New Tax Regime. If you choose the Old Regime without any deductions, the tax is much higher at ₹1,06,600. Using deductions like 80C and HRA can reduce this.',
    },
    {
      question: 'Is new tax regime good for salaried employees?',
      answer:
        'For most employees earning up to ₹15 Lakhs who do not claim HRA or Home Loan deductions, the New Tax Regime is better. It offers lower tax rates and requires no paperwork or investment proofs.',
    },
    {
      question: 'Can I save tax on 10 lakh salary?',
      answer:
        'Yes. Under the Old Regime, you can reduce your tax to zero if you claim deductions (80C, 80D, HRA) exceeding ₹4.5 Lakhs. Under the New Regime, tax saving is limited to the ₹75,000 Standard Deduction.',
    },
    {
      question: 'Which tax regime is best without HRA?',
      answer:
        'If you do not receive HRA or live in your own house, the New Tax Regime is almost always the best choice for a ₹10 Lakh salary, saving you over ₹60,000 compared to the Old Regime.',
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
            name: 'Tax on 10 Lakh Salary',
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
            inLanguage: 'en-IN',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/guides/tax-on-10-lakh-salary',
            },
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
          • <span>8 Min Read</span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      {/* --- HERO IMAGE --- */}
      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="10 Lakh Salary Tax Calculation FY 2025-26"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      {/* --- INTRO --- */}
      <WikiText
        content={`Reaching the **₹10 Lakh (10 LPA)** milestone is a big moment in any career. But crossing the double-digit mark also invites higher attention from the Income Tax department. For **FY 2025-26**, determining your actual take-home salary and choosing the right tax regime is crucial to saving money.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* --- ✅ 1. DIRECT ANSWER BOX (FEATURED SNIPPET OPTIMIZED) --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹10 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime is better</strong> for most employees, with a
          tax liability of roughly <strong>₹44,200</strong>.
        </p>
        <p>
          The <strong>Old Tax Regime</strong> only becomes beneficial if you can
          claim total deductions (HRA, 80C, 80D) exceeding{' '}
          <strong>₹3.00 Lakhs</strong>. If your investments are lower than this,
          stick to the New Regime.
        </p>

        {/* --- CALCULATOR --- */}
        <InlineTaxCalculator defaultSalary={1000000} />
      </div>

      <AdSlot id="tax-10l-1" type="in-article" />

      {/* --- TAKE-HOME SALARY SECTION --- */}
      <h2 id="take-home-salary">₹10 Lakh Salary – Monthly In-Hand Breakdown</h2>
      <p>
        Your &quot;CTC&quot; includes components like PF and gratuity which you
        don&apos;t get in your bank account monthly. Here is the realistic
        breakdown for <strong>10 LPA</strong>.
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
                <strong>₹83,333</strong>
              </td>
              <td>
                <strong>₹83,333</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF Contribution (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹5,000</td>
              <td style={{ color: '#dc2626' }}>- ₹5,000</td>
            </tr>
            <tr>
              <td>Less: Professional Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: Income Tax (TDS)</td>
              <td style={{ color: '#dc2626' }}>- ₹3,683</td>
              <td style={{ color: '#dc2626' }}>- ₹8,883</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>Final In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹74,450</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹69,250</strong>
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
      <h2 id="salary-flow">Where Does Your ₹10,00,000 Go?</h2>
      <p>
        At 10 LPA, the tax bite is relatively small under the New Regime,
        leaving you with a healthy chunk of your earnings.
      </p>

      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (89.3%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹8.93 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Disposable income for lifestyle & savings.
          </p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (4.4%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.44 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Tax paid (New Regime).</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.3%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.63 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Compulsory savings.</p>
        </div>
      </div>

      <AdSlot id="tax-10l-2" type="in-article" />

      {/* --- CALCULATION MATH --- */}
      <h2 id="new-regime">Tax Calculation: New Tax Regime (2025)</h2>
      <p>
        For FY 2025-26, the <strong>Standard Deduction is ₹75,000</strong>. This
        reduces your taxable income from ₹10L to ₹9.25L.
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
              <td>₹7L - ₹9.25L</td>
              <td>10%</td>
              <td>₹22,500</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontWeight: 'bold' }}>
              <td>Total Tax (Before Cess)</td>
              <td>-</td>
              <td>₹42,500</td>
            </tr>
            <tr>
              <td>Health & Education Cess (4%)</td>
              <td>-</td>
              <td>₹1,700</td>
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
              <td>₹44,200</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- ✅ 2. REALISTIC OLD REGIME SCENARIO --- */}
      <h2 id="old-regime-deductions">
        Old Tax Regime with Deductions (Real-Life Scenario)
      </h2>
      <p>
        The comparison isn&apos;t fair if we assume zero deductions for the Old
        Regime. Let&apos;s look at a realistic scenario where an employee
        maximizes their common tax-saving options.
      </p>
      <p>
        <strong>Assumption:</strong> You claim Section 80C (₹1.5L) and Section
        80D (₹25k).
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tax Component</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross Salary</td>
              <td>₹10,00,000</td>
            </tr>
            <tr>
              <td>(-) Standard Deduction</td>
              <td>₹50,000</td>
            </tr>
            <tr>
              <td>(-) Section 80C (EPF/ELSS/LIC)</td>
              <td>₹1,50,000</td>
            </tr>
            <tr>
              <td>(-) Section 80D (Health Ins.)</td>
              <td>₹25,000</td>
            </tr>
            <tr style={{ background: '#fff7ed', fontWeight: '600' }}>
              <td>Net Taxable Income</td>
              <td>₹7,75,000</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Payable (Old Regime)</strong>
              </td>
              <td>
                <strong>₹67,600</strong>
              </td>
            </tr>
            <tr>
              <td>Tax Payable (New Regime)</td>
              <td style={{ color: '#16a34a', fontWeight: 'bold' }}>₹44,200</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: '12px' }}>
        <strong>Observation:</strong> Even with ₹1.75 Lakhs in deductions, the{' '}
        <strong>Old Regime is still more expensive</strong> (₹67k vs ₹44k). You
        need even more deductions (like HRA) to beat the New Regime.
      </p>

      {/* --- ✅ 3. BREAK EVEN EXPLANATION --- */}
      <h2 id="break-even">The Break-Even Point: ₹3,00,000</h2>
      <div className="callout-box info-box">
        <h3>Why is ₹3 Lakh the Magic Number?</h3>
        <p>
          For a ₹10 Lakh salary, the tax under the New Regime is very low
          (~4.4%). To bring your Old Regime tax down to this level, you need to
          reduce your taxable income significantly.
        </p>
        <p>
          Calculations show that the{' '}
          <strong>Break-Even Deduction amount is approx ₹3,00,000.</strong>
        </p>
        <ul className="checklist">
          <li>
            <strong>Deductions &lt; ₹3 Lakhs:</strong> Choose{' '}
            <strong>New Regime</strong>.
          </li>
          <li>
            <strong>Deductions &gt; ₹3 Lakhs:</strong> Choose{' '}
            <strong>Old Regime</strong>.
          </li>
        </ul>
      </div>

      <div className="methodology-box">
        <h4>Note on Calculations</h4>
        <p>
          Calculations are based on FY 2025-26 slabs. PF is estimated at
          ₹5,000/month (12% of Basic, assuming Basic is 40-50% of CTC).
          Professional Tax of ₹2,400/year is deducted.
        </p>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          For a ₹10 Lakh salary, the <strong>New Tax Regime</strong> is highly
          efficient, taxing only ~4.4% of your total income. Unless you have
          significant HRA or Home Loan claims, there is little reason to choose
          the Old Regime.
        </p>
      </div>

      <AuthorBio />

      {/* --- INTERNAL LINKING & CTA --- */}
      <section className="sibling-links">
        <h3>Useful Tools & Guides</h3>
        <ul>
          <li>
            <Link href="/guides/tax-on-15-lakh-salary">
              Compare with 15 Lakh Salary
            </Link>
          </li>
          <li>
            <Link href="/guides/elss-funds-guide-2025">
              Best ELSS Funds (80C)
            </Link>
          </li>
          <li>
            <Link href="/sip-calculator">SIP Calculator</Link>
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
