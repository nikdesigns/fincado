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
  salary: '7.5 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-7-5-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-7-5-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹7.5 Lakh Salary (2025): Tax-Free? + In-Hand Pay',
  description:
    'Earning ₹7.5 Lakhs? You might pay ZERO tax. See how Standard Deduction brings you below the 87A rebate limit. Full calculation inside. Figures based on FY 2025-26 tax slabs for resident individuals.',
  keywords: [
    'Tax on 7.5 lakh salary',
    '7.5 LPA in hand salary',
    'is 7.5 lakh income tax free',
    'tax on 7.5 lakh old vs new regime',
    'income tax calculator 2025',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹7.5 Lakh Salary: Zero Tax Guide (2025)',
    description:
      'Good news: ₹7.5 Lakh salary is effectively tax-free under the New Regime. See the math behind the Zero Tax calculation.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax7Point5LakhGuide() {
  const pageTitle =
    'Tax on ₹7.5 Lakh Salary: Zero Tax Explanation (FY 2025-26)';

  // ==========================================
  // 3. FAQS
  // ==========================================
  const faqData = [
    {
      question: 'Is 7.5 Lakh income tax-free in New Regime?',
      answer:
        'Yes. Although the rebate limit is ₹7 Lakhs, salaried employees get a ₹75,000 Standard Deduction. This reduces a ₹7.5 Lakh salary to a taxable income of ₹6.75 Lakhs, which qualifies for the full tax rebate.',
    },
    {
      question: 'How much tax on 7.5 LPA in Old Regime?',
      answer:
        'In the Old Regime, you do not get the rebate because your net income (₹7 Lakhs after deduction) exceeds the ₹5 Lakh limit. You would pay approx ₹54,600 in tax unless you have investments like 80C.',
    },
    {
      question: 'What is the in-hand salary for 7.5 LPA?',
      answer:
        'Since there is zero tax under the New Regime, your monthly in-hand is simply Gross minus PF and Professional Tax. Expect approximately ₹58,550 per month.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 7.5 Lakh Salary',
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
              '@id': `https://www.fincado.com/guides/${CONFIG.slug}`,
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
        <span className="badge-flagship">Zero Tax Zone</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(24px, 4vw, 34px)',
            marginTop: 16,
            lineHeight: 1.3,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.02em',
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
          • <span>6 Min Read</span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="7.5 Lakh Salary Tax Calculation Zero Tax"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      {/* ✅ CORRECTED: More formal explanation of rebate eligibility */}
      <WikiText
        content={`Earning <strong>₹7.5 Lakhs (7.5 LPA)</strong> often confuses taxpayers because the rebate limit is ₹7 Lakhs. However, for salaried employees, the <strong>Standard Deduction of ₹75,000</strong> reduces your taxable income to <strong>₹6.75 Lakhs</strong>. Since this is below the ₹7 Lakh threshold, you qualify for the <strong>Section 87A rebate</strong>, effectively reducing your tax payable to zero.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Tax-Free under New Regime
      </div>

      {/* --- VERDICT BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹7.5 Lakh salary</strong>, your tax payable is{' '}
          <strong>₹0 (Zero)</strong> under the New Tax Regime.
        </p>
        {/* ✅ CORRECTED: Precise Calculation Label */}
        <p>
          <strong>The Calculation:</strong> ₹7.50 Lakhs (Gross) - ₹75,000
          (Standard Deduction) = <strong>₹6.75 Lakhs</strong>.
          <br />
          Since taxable income does not exceed ₹7 Lakhs, the Section 87A rebate
          fully offsets the calculated tax
        </p>
        <p>
          ⚠️ <strong>Old Regime Warning:</strong> Without investments, you will
          pay approx <strong>₹54,600</strong> in tax.
        </p>

        <p>Check this yourself using our calculator below.</p>

        <InlineTaxCalculator defaultSalary={750000} />
      </div>

      <AdSlot id="tax-7.5l-1" type="in-article" />

      {/* --- TAKE HOME --- */}
      <h2 id="take-home-salary">
        ₹7.5 Lakh Salary – Monthly In-Hand Breakdown
      </h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>New Regime (Recommended)</th>
              <th>Old Regime (No Investments)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Gross Salary</strong>
              </td>
              <td>
                <strong>₹62,500</strong>
              </td>
              <td>
                <strong>₹62,500</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹3,750</td>
              <td style={{ color: '#dc2626' }}>- ₹3,750</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS (Income Tax)</td>
              <td style={{ color: '#16a34a', fontWeight: 'bold' }}>₹0</td>
              <td style={{ color: '#dc2626' }}>- ₹4,550</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹58,550</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹54,000</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="caption-text" style={{ marginTop: '8px' }}>
        PF is assumed at 12% of Basic Salary (Basic assumed as 50% of CTC).
      </p>

      {/* --- SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹7,50,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (93.7%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹7.03 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Take-home pay.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>🏛️ Income Tax (0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Full Rebate applied.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.45 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Compulsory savings.</p>
        </div>
      </div>

      {/* --- CALCULATION --- */}
      <h2 id="new-regime">The &quot;Zero Tax&quot; Calculation Explained</h2>
      <p>
        The confusion usually happens because people forget to subtract the
        Standard Deduction.
      </p>
      <div className="table-responsive">
        <table className="data-table">
          <tbody>
            <tr>
              <td>Gross Salary</td>
              <td>₹7,50,000</td>
            </tr>
            <tr>
              <td>(-) Standard Deduction</td>
              <td>₹75,000</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Net Taxable Income</td>
              <td>₹6,75,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: '16px' }}>Now, we calculate tax on ₹6,75,000:</p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Slab</th>
              <th>Rate</th>
              <th>Calculation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0 - 3L</td>
              <td>Nil</td>
              <td>₹0</td>
            </tr>
            <tr>
              <td>3L - 6.75L</td>
              <td>5%</td>
              <td>₹18,750</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Gross Tax</td>
              <td></td>
              <td>₹18,750</td>
            </tr>
            <tr style={{ color: '#16a34a', fontWeight: 'bold' }}>
              <td>Less: Rebate u/s 87A</td>
              <td></td>
              <td>- ₹18,750</td>
            </tr>
            <tr
              style={{
                background: '#dcfce7',
                fontWeight: 'bold',
                color: '#14532d',
              }}
            >
              <td>Net Tax Payable</td>
              <td></td>
              <td>₹0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ CORRECTED: Legal explanation of rebate mechanism */}
      <p
        style={{
          fontSize: '14px',
          background: '#f8fafc',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <strong>Note:</strong> While tax is calculated at 5% on income between
        ₹3L–₹7L, the <strong>Section 87A rebate</strong> (up to ₹25,000) reduces
        the final tax payable to zero if taxable income is ₹7 Lakhs or less.
      </p>

      {/* --- OLD REGIME COMPARISON --- */}
      {/* ✅ CORRECTED: Neutral Heading */}
      <h2 id="old-regime">Tax Outcome under Old Regime (Without Deductions)</h2>
      <div className="callout-box warning-box">
        <p>
          In the <strong>Old Regime</strong>, the rebate limit is only ₹5 Lakhs.
        </p>
        <p>
          Your taxable income (after ₹50k deduction) is{' '}
          <strong>₹7.00 Lakhs</strong>.
        </p>
        <p>
          Since ₹7L {'>'} ₹5L, you pay tax on the full amount above ₹2.5L.
          <br />
          <strong>Total Tax = ₹52,500 + Cess = ₹54,600.</strong>
        </p>
        <p>
          To make this zero, you would need to invest{' '}
          <strong>₹2.00 Lakhs</strong> in Section 80C and other deductions.
        </p>
      </div>

      {/* --- CONCLUSION --- */}
      <div className="conclusion-box">
        {/* ✅ CORRECTED: Professional Tone */}
        <p>
          For a ₹7.5 Lakh salary, the <strong>New Tax Regime</strong> results in
          zero tax liability due to the Standard Deduction and 87A rebate. This
          benefit applies automatically without requiring additional
          investments. Ensure your employer considers the New Regime for TDS
          calculations.
        </p>
      </div>

      <p
        style={{
          fontSize: '13px',
          color: '#64748b',
          fontStyle: 'italic',
          marginTop: '16px',
        }}
      >
        Calculations are based on income tax slabs for FY 2025-26 applicable to
        resident individuals below 60 years.
      </p>

      <AuthorBio />

      {/* --- LINKS --- */}
      <section className="sibling-links">
        <h3>Useful Tools & Guides</h3>
        <ul>
          <li>
            <Link href="/guides/tax-on-8-lakh-salary">
              Check Tax for ₹8 Lakhs (Trap Zone)
            </Link>
          </li>
          <li>
            <Link href="/guides/tax-on-6-lakh-salary">
              Check Tax for ₹6 Lakhs
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
