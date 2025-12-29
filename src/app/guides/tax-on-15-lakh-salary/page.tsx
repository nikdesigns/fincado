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
  salary: '15 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-15-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-15-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹15 Lakh Salary: New vs Old Regime (FY 2025-26)',
  description:
    'Calculate monthly in-hand salary for ₹15 LPA. Detailed breakdown of New vs Old Tax Regime, take-home pay, and income tax calculation for FY 2025-26.',
  keywords: [
    'Tax on 15 lakh salary',
    '15 LPA take home',
    'New vs Old regime for 15 lakh',
    'monthly in hand salary for 15 lakhs',
    'income tax on 15 lakh salary',
    'tax calculation FY 2025-26',
  ],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹15 Lakh Salary: Complete 2025 Guide',
    description: 'See your exact monthly take-home pay and tax liability.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    images: [CONFIG.heroImage],
  },
};

export default function Tax15LakhGuide() {
  const pageTitle =
    'Tax on ₹15 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  const faqData = [
    {
      question: 'What is the monthly in-hand salary for 15 LPA?',
      answer:
        'Under the New Tax Regime, your approximate monthly in-hand salary for 15 LPA is ₹1,06,467, after deducting Tax (₹10,833) and PF (₹7,500).',
    },
    {
      question: 'Is New Regime better for 15 Lakh salary?',
      answer:
        'Yes, the New Regime is better by default for ₹15 Lakh salary unless you have deductions (HRA, Home Loan, 80C) exceeding ₹4.33 Lakhs.',
    },
    {
      question: 'What is the tax on 15 lakh salary in New Regime?',
      answer:
        'The total tax payable is ₹1,30,000 (including cess) for FY 2025-26, considering the ₹75,000 Standard Deduction.',
    },
    {
      question: 'Is Standard Deduction applicable in New Regime for 15 LPA?',
      answer:
        'Yes, the Standard Deduction of ₹75,000 is now available under the New Tax Regime for FY 2025-26.',
    },
    {
      question: 'Can I switch between Old and New Regime?',
      answer:
        'Salaried individuals can switch between the Old and New Regime every year while filing their ITR, based on which one saves them more tax.',
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
            name: 'Tax on 15 Lakh Salary',
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
            inLanguage: 'en-IN',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/guides/tax-on-15-lakh-salary',
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
          alt="15 Lakh Salary Tax Calculation FY 2025-26"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      {/* --- INTRO --- */}
      <WikiText
        content={`Earning <strong>₹15 Lakh per annum</strong> puts you in a significant income bracket in India. It brings financial freedom but also a higher tax liability. The biggest question for <strong>FY 2025-26</strong> is: Should you stick to the Old Regime for deductions or switch to the New Regime for lower rates?`}
      />

      <p className="freshness-note">
        <strong>Updated for FY 2025-26:</strong> Calculations include the
        increased Standard Deduction of ₹75,000 for the New Tax Regime.
      </p>

      {/* --- DIRECT ANSWER BOX + CALCULATOR --- */}
      <div className="short-answer-box">
        <h3>The Short Answer</h3>
        <p>
          For a salary of <strong>₹15 Lakhs</strong>, the{' '}
          <strong>New Tax Regime</strong> is generally better. You will pay
          approx <strong>₹1,30,000</strong> in tax.
        </p>

        {/* --- CALCULATOR --- */}
        <InlineTaxCalculator />

        <p style={{ marginTop: 16, fontSize: '16px' }}>
          To make the <strong>Old Regime</strong> beneficial, you need to claim
          deductions totaling more than <strong>₹4.33 Lakhs</strong>.
        </p>
      </div>

      <AdSlot id="tax-15l-1" type="in-article" />

      {/* --- 1️⃣ TAKE-HOME SALARY SECTION --- */}
      <h2 id="take-home-salary">₹15 Lakh Salary – Monthly In-Hand Breakdown</h2>
      <p>
        Most people confuse &quot;CTC&quot; with &quot;In-Hand Salary&quot;.
        Your <strong>15 LPA take home</strong> depends heavily on the tax regime
        you choose.
      </p>
      <p>
        Here is the exact monthly breakdown assuming standard PF contribution
        (approx ₹7,500/mo) and Professional Tax.
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
                <strong>₹1,25,000</strong>
              </td>
              <td>
                <strong>₹1,25,000</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF Contribution (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹7,500</td>
              <td style={{ color: '#dc2626' }}>- ₹7,500</td>
            </tr>
            <tr>
              <td>Less: Professional Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: Income Tax (TDS)</td>
              <td style={{ color: '#dc2626' }}>- ₹10,833</td>
              <td style={{ color: '#dc2626' }}>- ₹21,450</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>Final In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹1,06,467</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹95,850</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="caption-text">
        *Old Regime calculation assumes NO other deductions except standard
        deduction. If you claim HRA/80C, the tax will lower, increasing the
        in-hand amount.
      </p>

      {/* --- 2️⃣ VISUAL SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹15,00,000 Go?</h2>
      <p>
        It is painful to see money vanish. Under the{' '}
        <strong>New Tax Regime</strong>, here is how your annual CTC is sliced:
      </p>

      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (85.3%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹12.80 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Used for expenses, EMIs, and savings.
          </p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (8.7%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹1.30 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Paid to the government.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.90 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Locked for your retirement.
          </p>
        </div>
      </div>

      <AdSlot id="tax-15l-2" type="in-article" />

      {/* --- SECTION: BASIC DEFINITION --- */}
      <h2 id="what-is-tax">What is Income Tax on ₹15 Lakh Salary?</h2>
      <p>
        Income tax on a ₹15 lakh salary depends on the tax regime you choose.
        India currently has two systems:
      </p>
      <ul className="checklist">
        <li>
          <strong>New Tax Regime:</strong> Lower tax rates, but fewer deductions
          (No HRA, No 80C). Default for FY 2025-26.
        </li>
        <li>
          <strong>Old Tax Regime:</strong> Higher tax rates, but allows
          deductions like Section 80C, 80D, HRA, and Home Loan interest.
        </li>
      </ul>

      {/* --- SECTION: CALCULATION FORMULA --- */}
      <h2 id="calculation-process">
        How Income Tax is Calculated (FY 2025-26)
      </h2>
      <p>
        Before we look at the final numbers, here is the formula used for
        calculation:
      </p>
      <div className="methodology-box" style={{ marginTop: 0 }}>
        <h4>Tax Calculation Formula</h4>
        <p>
          <strong>Taxable Income</strong> = Gross Salary - Standard Deduction -
          (Exemptions & Deductions)
        </p>
      </div>

      {/* --- SECTION: NEW REGIME MATH --- */}
      <h2 id="new-regime">
        Tax on ₹15 Lakh Salary Under New Tax Regime (2025)
      </h2>
      <p>
        Under the New Regime, the slabs have been simplified. For FY 2025-26,
        you also get a <strong>Standard Deduction of ₹75,000</strong>.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Income Slab</th>
              <th>Tax Rate</th>
              <th>Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>₹0 - ₹3,00,000</td>
              <td>Nil</td>
              <td>₹0</td>
            </tr>
            <tr>
              <td>₹3,00,001 - ₹7,00,000</td>
              <td>5%</td>
              <td>₹20,000</td>
            </tr>
            <tr>
              <td>₹7,00,001 - ₹10,00,000</td>
              <td>10%</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>₹10,00,001 - ₹12,00,000</td>
              <td>15%</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>₹12,00,001 - ₹14,25,000*</td>
              <td>20%</td>
              <td>₹45,000</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontWeight: 'bold' }}>
              <td>Total Tax (Before Cess)</td>
              <td>-</td>
              <td>₹1,25,000</td>
            </tr>
            <tr>
              <td>Health & Education Cess (4%)</td>
              <td>-</td>
              <td>₹5,000</td>
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
              <td>₹1,30,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="caption-text">
        *Note: Taxable income reduces to ₹14.25 Lakhs after deducting ₹75,000
        Standard Deduction.
      </p>

      {/* --- SECTION: OLD REGIME MATH --- */}
      <h2 id="old-regime">Tax on ₹15 Lakh Salary Under Old Tax Regime</h2>
      <p>
        The Old Regime offers a Standard Deduction of ₹50,000. The tax rates are
        higher, but you can claim deductions to lower your taxable income.
      </p>
      <p>
        <strong>Scenario:</strong> Assuming you claim{' '}
        <strong>Standard Deduction (₹50k)</strong> but have{' '}
        <strong>ZERO other deductions</strong>.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Income Slab</th>
              <th>Tax Rate</th>
              <th>Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>₹0 - ₹2,50,000</td>
              <td>Nil</td>
              <td>₹0</td>
            </tr>
            <tr>
              <td>₹2,50,001 - ₹5,00,000</td>
              <td>5%</td>
              <td>₹12,500</td>
            </tr>
            <tr>
              <td>₹5,00,001 - ₹10,00,000</td>
              <td>20%</td>
              <td>₹1,00,000</td>
            </tr>
            <tr>
              <td>₹10,00,001 - ₹14,50,000</td>
              <td>30%</td>
              <td>₹1,35,000</td>
            </tr>
            <tr style={{ background: '#fff7ed', fontWeight: 'bold' }}>
              <td>Total Tax (Before Cess)</td>
              <td>-</td>
              <td>₹2,47,500</td>
            </tr>
            <tr>
              <td>Cess (4%)</td>
              <td>-</td>
              <td>₹9,900</td>
            </tr>
            <tr
              style={{
                background: '#ffedd5',
                fontWeight: 'bold',
                color: '#7c2d12',
              }}
            >
              <td>Final Tax Payable</td>
              <td>-</td>
              <td>₹2,57,400</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- SECTION: COMPARISON --- */}
      <h2 id="comparison">New vs Old Tax Regime for ₹15 LPA (Comparison)</h2>
      <p>
        Let&apos;s compare the two directly. As you can see, without deductions,
        the Old Regime tax is nearly <strong>double</strong> the New Regime tax.
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
              <td>₹15,00,000</td>
              <td>₹15,00,000</td>
            </tr>
            <tr>
              <td>Standard Deduction</td>
              <td>₹75,000</td>
              <td>₹50,000</td>
            </tr>
            <tr>
              <td>Taxable Income</td>
              <td>₹14,25,000</td>
              <td>₹14,50,000</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Payable</strong>
              </td>
              <td style={{ color: '#16a34a', fontWeight: 'bold' }}>
                ₹1,30,000
              </td>
              <td style={{ color: '#dc2626', fontWeight: 'bold' }}>
                ₹2,57,400
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
                New Regime saves you ₹1,27,400
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdSlot id="tax-15l-3" type="in-article" />

      {/* --- 3️⃣ REAL-LIFE PERSONAS --- */}
      <h2 id="personas">Which Regime Is Better For You? (3 Scenarios)</h2>
      <p>
        Calculation is one thing, but real life is different. Let&apos;s look at
        3 common profiles for someone earning ₹15 Lakhs.
      </p>

      <div className="rejection-grid">
        {/* Profile 1 */}
        <div className="rejection-card">
          <div className="rejection-title">👦 The New Joiner</div>
          <p className="rejection-desc">
            Lives with parents, no loans, basic investments.
          </p>
          <ul
            className="checklist"
            style={{ fontSize: '13px', marginBottom: '12px' }}
          >
            <li>Rent Paid: ₹0</li>
            <li>80C Investment: ₹50k</li>
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
            <strong>New Regime</strong> saves ~₹1 Lakh.
          </div>
        </div>

        {/* Profile 2 */}
        <div className="rejection-card">
          <div className="rejection-title">🏠 The Renter</div>
          <p className="rejection-desc">
            Pays high rent in metro city, maxes out 80C.
          </p>
          <ul
            className="checklist"
            style={{ fontSize: '13px', marginBottom: '12px' }}
          >
            <li>Rent: ₹25k/mo</li>
            <li>80C: ₹1.5L (Full)</li>
          </ul>
          <div
            className="solution-box"
            style={{
              background: '#fff7ed',
              borderColor: '#fed7aa',
              color: '#c2410c',
            }}
          >
            <span className="solution-label">Mixed</span>
            <strong>New Regime</strong> still wins marginally. Need more
            deductions.
          </div>
        </div>

        {/* Profile 3 */}
        <div className="rejection-card">
          <div className="rejection-title">👨‍👩‍👧 The Home Owner</div>
          <p className="rejection-desc">
            Has Home Loan, 80C, Medical Insurance.
          </p>
          <ul
            className="checklist"
            style={{ fontSize: '13px', marginBottom: '12px' }}
          >
            <li>Home Loan Interest: ₹2L</li>
            <li>80C: ₹1.5L</li>
            <li>80D: ₹50k</li>
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
            <strong>Old Regime</strong> wins! Saves ~₹15k more.
          </div>
        </div>
      </div>

      {/* --- SECTION: BREAK EVEN --- */}
      <h2 id="break-even">The &quot;Break-Even&quot; Number: ₹4.33 Lakhs</h2>

      <div className="callout-box info-box">
        <h3>The Magic Number</h3>
        <p>
          This is your magic number. If your total deductions (Standard
          Deduction + 80C + HRA + Home Loan + 80D) are less than ₹4.33 Lakhs,
          stick to the <strong>New Regime</strong>.
        </p>
        <p>If they cross this amount, switch to the Old Regime.</p>
      </div>

      {/* --- SECTION: DEDUCTIONS LIST --- */}
      <h2 id="deductions">Common Deductions to Save Tax (Old Regime)</h2>
      <p>
        To reach that ₹4.33 Lakh deduction target, you would need a combination
        of these:
      </p>

      <ul className="checklist">
        <li>
          <strong>Section 80C (₹1.5L):</strong> PF, PPF, ELSS Mutual Funds, LIC,
          Principal Home Loan repayment.
        </li>
        <li>
          <strong>Section 80D (₹25k - ₹50k):</strong> Health Insurance premiums
          for self and parents.
        </li>
        <li>
          <strong>Section 80CCD(1B) (₹50k):</strong> National Pension System
          (NPS).
        </li>
        <li>
          <strong>Section 24(b) (₹2L):</strong> Interest on Home Loan.
        </li>
        <li>
          <strong>HRA (House Rent Allowance):</strong> Exemptions based on
          actual rent paid.
        </li>
      </ul>

      {/* --- 4️⃣ AUTHORITY BLOCK --- */}
      <div className="methodology-box">
        <h4>How We Calculated These Numbers</h4>
        <p>
          <strong>Basis:</strong> Calculations are based on income tax slabs for
          Resident Individuals (&lt;60 years) for FY 2025-26.
        </p>
        <ul
          style={{
            paddingLeft: '20px',
            fontSize: '13px',
            marginTop: '8px',
            color: '#64748b',
          }}
        >
          <li>
            <strong>Standard Deduction:</strong> ₹75,000 (New Regime) and
            ₹50,000 (Old Regime).
          </li>
          <li>
            <strong>Cess:</strong> 4% Health & Education Cess applied on tax
            payable.
          </li>
          <li>
            <strong>PF:</strong> Assumed at 12% of Basic Salary (Basic assumed
            as 50% of CTC).
          </li>
          <li>
            <strong>Professional Tax:</strong> Assumed at ₹200/month (varies by
            state).
          </li>
        </ul>
      </div>

      {/* --- CONCLUSION --- */}
      <h2 id="verdict">Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          For a ₹15 Lakh salary, the <strong>New Tax Regime</strong> is the
          clear winner for 80% of taxpayers. It offers a higher in-hand salary
          of roughly <strong>₹1.06 Lakhs/month</strong> without the hassle of
          investment proof submission.
        </p>
        <p>
          However, if you are paying a hefty Home Loan EMI, calculate carefully
          before switching.
        </p>
      </div>

      <p className="disclaimer-note">
        <strong>Disclaimer:</strong> Tax laws are subject to change. The
        calculations above are based on FY 2025-26 slabs. Please consult a CA
        for professional advice filing your returns.
      </p>

      {/* --- AUTHOR BIO --- */}
      <AuthorBio />

      {/* --- 5️⃣ INTERNAL LINKING & CTA --- */}
      <section className="sibling-links">
        <h3>Useful Tools & Guides</h3>
        <ul>
          <li>
            <Link href="/guides/elss-funds-guide-2025">
              Best ELSS Funds to Save Tax (80C)
            </Link>
          </li>
          <li>
            <Link href="/sip-calculator">Calculate Wealth Growth (SIP)</Link>
          </li>
          <li>
            <Link href="/guides/sip-for-1-crore-in-10-years">
              How to Build ₹1 Crore in 10 Years
            </Link>
          </li>
          <li>
            <Link href="/guides/sip-for-1-crore-in-15-years">
              Moderate Path: 1 Crore in 15 Years
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
