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
  salary: '6 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-6-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-6-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹6 Lakh Salary (2025): Tax-Free or Taxable? + In-Hand',
  description:
    'Is ₹6 Lakh salary tax-free? Yes! Calculate your zero-tax in-hand salary for FY 2025-26. Understand Section 87A rebate and New vs Old Regime.',
  keywords: [
    'Tax on 6 lakh salary',
    '6 LPA in hand salary',
    'is 6 lakh income tax free',
    'section 87a rebate limit 2025',
    '6 lakh salary tax calculator',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹6 Lakh Salary: Zero Tax Guide (2025)',
    description:
      'Earning ₹6 Lakhs? Good news: You likely pay ZERO tax. See the calculation and your monthly in-hand salary breakdown here.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax6LakhGuide() {
  const pageTitle = 'Tax on ₹6 Lakh Salary: Zero Tax Explanation (FY 2025-26)';

  // ==========================================
  // 3. FAQS
  // ==========================================
  const faqData = [
    {
      question: 'Is 6 Lakh income tax-free?',
      answer:
        'Yes, under the New Tax Regime (FY 2025-26), a salary of ₹6 Lakhs is effectively tax-free. Although income tax is calculated, it is fully offset by the Section 87A rebate.',
    },
    {
      question: 'How much tax on 6 LPA in Old Regime?',
      answer:
        'In the Old Regime, a ₹6 Lakh salary is NOT tax-free by default. After the ₹50,000 standard deduction, your taxable income is ₹5.5 Lakhs. Since this exceeds the ₹5 Lakh rebate limit, you would pay approx ₹23,400 in tax unless you invest in 80C.',
    },
    {
      question: 'What is the in-hand salary for 6 LPA?',
      answer:
        'Since there is zero tax, your monthly in-hand salary is high. After deducting PF (~₹3,000) and Professional Tax (₹200), you get approximately ₹46,800 per month.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 6 Lakh Salary',
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
          • <span>5 Min Read</span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="6 Lakh Salary Tax Calculation Zero Tax"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      <WikiText
        content={`Good news! Earning <strong>₹6 Lakhs (6 LPA)</strong> puts you in the "Sweet Spot" of Indian taxation. Under the <strong>New Tax Regime (FY 2025-26)</strong>, the government offers a tax rebate under <strong>Section 87A</strong> if your taxable income does not exceed <strong>₹7 Lakhs</strong>. Since your taxable income (after the ₹75,000 Standard Deduction) is only ₹5.25 Lakhs, you pay absolutely <strong>Zero Tax</strong>.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Tax-Free under New Regime
      </div>

      {/* --- VERDICT BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹6 Lakh salary</strong>, your tax payable is{' '}
          <strong>₹0 (Zero)</strong> under the New Tax Regime.
        </p>
        <p>
          <strong>Why?</strong> Your calculated tax is <strong>₹11,250</strong>,
          but the government gives you a full discount (Rebate u/s 87A), making
          the final amount zero.
        </p>
        <p>
          ⚠️ <strong>Warning:</strong> If you choose the{' '}
          <strong>Old Regime</strong> and make zero investments, you will have
          to pay <strong>₹23,400</strong> in tax.
        </p>

        <p>
          Verify this using our <strong>₹6 lakh salary tax calculator</strong>{' '}
          below.
        </p>

        <InlineTaxCalculator defaultSalary={600000} />
      </div>

      <AdSlot id="tax-6l-1" type="in-article" />

      {/* --- TAKE HOME --- */}
      <h2 id="take-home-salary">₹6 Lakh Salary – Monthly In-Hand Breakdown</h2>
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
                <strong>₹50,000</strong>
              </td>
              <td>
                <strong>₹50,000</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹3,000</td>
              <td style={{ color: '#dc2626' }}>- ₹3,000</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS (Income Tax)</td>
              <td style={{ color: '#16a34a', fontWeight: 'bold' }}>₹0</td>
              <td style={{ color: '#dc2626' }}>- ₹1,950</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹46,800</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹44,850</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="caption-text" style={{ marginTop: '8px' }}>
        PF is assumed at 12% of Basic Salary (Basic assumed as 50% of CTC).
        Since Gross is ₹50k, Basic ~₹25k, PF ~₹3k.
      </p>

      {/* --- SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹6,00,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (93.6%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹5.61 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Maximum possible take-home.
          </p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>🏛️ Income Tax (0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Zero income tax under current law.
          </p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.36 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Compulsory savings.</p>
        </div>
      </div>

      {/* --- CALCULATION --- */}
      <h2 id="new-regime">Why is Tax Zero? (The Calculation)</h2>
      <p>
        Under the New Regime, you get a Standard Deduction of ₹75,000.
        <br />
        <strong>Taxable Income</strong> = ₹6,00,000 - ₹75,000 ={' '}
        <strong>₹5,25,000</strong>.
      </p>
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
              <td>3L - 5.25L</td>
              <td>5%</td>
              <td>₹11,250</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Gross Tax</td>
              <td></td>
              <td>₹11,250</td>
            </tr>
            <tr style={{ color: '#16a34a', fontWeight: 'bold' }}>
              <td>Less: Rebate u/s 87A</td>
              <td></td>
              <td>- ₹11,250</td>
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

      <p
        style={{
          fontSize: '14px',
          background: '#f8fafc',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <strong>Note on Section 87A:</strong> In the New Regime, you get a full
        tax rebate if your taxable income does not exceed{' '}
        <strong>₹7 Lakhs</strong>. Since ₹5.25L is well within this limit, your
        tax is waived off.
      </p>

      {/* --- OLD REGIME COMPARISON --- */}
      <h2 id="old-regime">The Old Regime Trap</h2>
      <div className="callout-box warning-box">
        <p>
          In the <strong>Old Regime</strong>, the rebate limit is only ₹5 Lakhs
          (Taxable Income).
        </p>
        <p>
          Gross Salary (₹6L) - Standard Deduction (₹50k) ={' '}
          <strong>₹5.5 Lakhs</strong>.
        </p>
        <p>
          Since ₹5.5L {'>'} ₹5L, you do <strong>NOT</strong> get the 87A rebate
          in the Old Regime. You will end up paying ~₹23,400 tax unless you
          invest ₹50,000 in Section 80C.
        </p>
      </div>

      {/* --- CONCLUSION --- */}
      <div className="conclusion-box">
        <p>
          For a ₹6 Lakh salary, the <strong>New Tax Regime</strong> is the
          automatic choice. It offers Zero Tax with zero paperwork. Do not
          choose the Old Regime unless you have already committed to tax-saving
          investments.
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
              Check Tax for ₹8 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/guides/tax-on-10-lakh-salary">
              Check Tax for ₹10 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/sip-calculator">
              SIP Calculator (Invest your surplus)
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
