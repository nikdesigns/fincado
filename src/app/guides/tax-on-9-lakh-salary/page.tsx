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
  salary: '9 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-9-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-9-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  // 1️⃣ SEO Title Improvement (CTR Boost)
  title: 'Tax on ₹9 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
  description:
    'Earning ₹9 Lakhs? Calculate your exact tax liability for FY 2025-26. Compare New vs Old Regime, check monthly in-hand salary, and break-even deductions.',
  keywords: [
    'Tax on 9 lakh salary',
    '9 LPA in hand salary',
    'tax on 9 lakh new regime',
    'is 9 lakh salary good',
    'income tax calculator 2025',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹9 Lakh Salary: Complete 2025 Guide',
    description:
      'Earning ₹9 Lakhs? See your tax liability for FY 2025-26. We compare New vs Old Regime and calculate your monthly in-hand salary.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax9LakhGuide() {
  const pageTitle =
    'Tax on ₹9 Lakh Salary (2025): New vs Old Regime + In-Hand Pay';

  // ==========================================
  // 3. FAQS
  // ==========================================
  const faqData = [
    {
      question: 'How much tax on 9 LPA salary?',
      answer:
        'For a ₹9 Lakh salary, your tax under the New Regime (FY 2025-26) is approx ₹33,800. Under the Old Regime, it is significantly higher at ₹85,800 (without deductions).',
    },
    {
      question: 'What is the monthly in-hand salary for 9 LPA?',
      answer:
        'After deducting PF (~₹4,500), Professional Tax (₹200), and TDS (~₹2,800), your monthly take-home salary is approximately ₹67,500 under the New Regime.',
    },
    {
      question: 'Which tax regime is better for 9 Lakh package?',
      answer:
        'The New Tax Regime is better unless you have deductions (HRA, 80C, 80D) exceeding ₹2.44 Lakhs. If your investments are lower than this, stick to the New Regime.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 9 Lakh Salary',
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
        <span className="badge-flagship">Income Tax Guide</span>
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
          • <span>7 Min Read</span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="9 Lakh Salary Tax Calculation FY 2025-26"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      <WikiText
        content={`Earning <strong>₹9 Lakhs (9 LPA)</strong> is a comfortable spot for many professionals. However, since it sits comfortably above the ₹7 Lakh tax-free limit, you cannot escape tax entirely. For <strong>FY 2025-26</strong>, the goal is to minimize this liability to keep your in-hand salary high.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* --- VERDICT BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹9 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is the clear winner for most. Your tax
          liability will be approximately <strong>₹33,800</strong>.
        </p>
        <p>
          The <strong>Old Tax Regime</strong> demands a hefty tax of{' '}
          <strong>₹85,800</strong> unless you have deductions (HRA + 80C)
          exceeding <strong>₹2.44 Lakhs</strong>.
        </p>

        {/* 2️⃣ Calculator Keyword Injection (Very Light) */}
        <p>
          Use our <strong>₹9 lakh salary tax calculator</strong> below to verify
          these figures.
        </p>

        <InlineTaxCalculator defaultSalary={900000} />
      </div>

      <AdSlot id="tax-9l-1" type="in-article" />

      {/* --- TAKE HOME --- */}
      <h2 id="take-home-salary">₹9 Lakh Salary – Monthly In-Hand Breakdown</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>New Regime</th>
              <th>Old Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Gross Salary</strong>
              </td>
              <td>
                <strong>₹75,000</strong>
              </td>
              <td>
                <strong>₹75,000</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹4,500</td>
              <td style={{ color: '#dc2626' }}>- ₹4,500</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS</td>
              <td style={{ color: '#dc2626' }}>- ₹2,817</td>
              <td style={{ color: '#dc2626' }}>- ₹7,150</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹67,483</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹63,150</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3️⃣ PF Assumption Transparency (EEAT) */}
      <p className="caption-text" style={{ marginTop: '8px' }}>
        PF is assumed at 12% of Basic Salary (Basic assumed as 50% of CTC).
      </p>

      {/* --- SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹9,00,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (90%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹8.10 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Take-home pay after tax & PF.
          </p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (3.8%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.34 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Tax paid (New Regime).</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.54 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Long-term savings.</p>
        </div>
      </div>

      {/* --- CALCULATION --- */}
      <h2 id="new-regime">Tax Calculation (New Regime)</h2>
      <p>Standard Deduction: ₹75,000. Taxable Income: ₹8,25,000.</p>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Slab</th>
              <th>Rate</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0 - 3L</td>
              <td>Nil</td>
              <td>0</td>
            </tr>
            <tr>
              <td>3L - 7L</td>
              <td>5%</td>
              <td>₹20,000</td>
            </tr>
            <tr>
              <td>7L - 8.25L</td>
              <td>10%</td>
              <td>₹12,500</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Total + Cess(4%)</td>
              <td></td>
              <td>₹33,800</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- BREAK EVEN --- */}
      <h2 id="break-even">Break-Even Point: ₹2.44 Lakhs</h2>
      <div className="callout-box info-box">
        <p>
          To beat the New Regime, you need Old Regime deductions greater than{' '}
          <strong>₹2,44,000</strong>.
        </p>
        <p>
          This is achievable if you max out 80C (₹1.5L) and pay significant
          House Rent (HRA) or Medical Insurance (80D).
        </p>
      </div>

      {/* --- CONCLUSION & AUTHORITY --- */}
      <div className="conclusion-box">
        <p>
          For a ₹9 Lakh salary, the <strong>New Tax Regime</strong> is highly
          efficient, taxing only ~3.8% of your total income. Unless you have
          significant HRA or Home Loan claims, there is little reason to choose
          the Old Regime.
        </p>
      </div>

      {/* 4️⃣ Authority / Compliance Line */}
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
          {/* 5️⃣ Internal Link (Topical Authority) */}
          <li>
            <Link href="/guides/new-vs-old-tax-regime-2025">
              New vs Old Tax Regime Explained (2025)
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
