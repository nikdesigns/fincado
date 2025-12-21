import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: 'Health Insurance Buying Guide: Top 5 Features to Check (India)',
  description:
    'Health Insurance Buying Guide India: Learn about room rent capping, NCB, waiting periods, cashless claims, and Section 80D tax benefits.',
  keywords: [
    'Health Insurance Buying Guide India',
    'Best Health Insurance features',
    'Room rent capping explained',
    'No Claim Bonus Health Insurance',
    'Cashless vs Reimbursement Claim',
    'Section 80D Tax Benefit',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/health-insurance-buying-guide',
  },
  openGraph: {
    title: 'Health Insurance Buying Guide: 5 Things to Check Before Buying',
    description:
      "Don't buy a policy just for the low premium. Check room rent limits, waiting periods, and cashless network first.",
    type: 'article',
    url: 'https://www.fincado.com/guides/health-insurance-buying-guide',
    images: [
      {
        url: '/images/guides/health-insurance/health-insurance-guide-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HealthInsuranceGuide() {
  // --- FAQ SCHEMA ---
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much health insurance cover is enough in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For metro city residents, it is suggested to have at least ₹10 lakh for individuals and ₹15–25 lakh for families (floater policy).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is room rent capping in health insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is a limit on the room rent the insurer will pay (e.g., 1% of Sum Insured). If you choose a room exceeding this limit, you may have to pay a proportionate share of the entire hospital bill.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I buy health insurance if I have a pre-existing disease?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but there will be a waiting period (usually 2-4 years) before coverage for that specific disease begins.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is OPD covered in health insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard policies usually cover hospitalization expenses only. OPD coverage is available as an add-on or in specific premium plans.',
        },
      },
    ],
  };

  // --- ARTICLE SCHEMA ---
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Health Insurance Buying Guide: Top 5 Features to Check Before Buying',
    description:
      'A comprehensive guide to buying health insurance in India. Covers room rent limits, NCB, waiting periods, and Section 80D benefits.',
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
    datePublished: '2025-01-12',
    dateModified: '2025-01-12',
    image:
      'https://www.fincado.com/images/guides/health-insurance/health-insurance-guide-hero.webp',
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Health Insurance Guide',
            url: 'https://www.fincado.com/guides/health-insurance-buying-guide',
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="article">
        <header
          style={{
            marginBottom: 32,
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 24,
          }}
        >
          <span
            className="badge-flagship"
            style={{
              background: '#dbeafe',
              color: '#1e40af',
              marginBottom: 12,
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Insurance & Protection
          </span>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Health Insurance Buying Guide: Top 5 Features to Check Before Buying
          </h1>

          <div
            style={{
              fontSize: 14,
              color: 'var(--color-text-muted)',
              marginBottom: 20,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span>
              Last Updated: <strong>Jan 2025</strong>
            </span>
            <span>•</span>
            <span>12 Min Read</span>
            <span>•</span>
            <span style={{ color: 'var(--color-brand-green)' }}>
              Verified Guide
            </span>
          </div>

          <ShareTools title="Health Insurance Buying Guide" />
        </header>

        {/* 🖼️ IMAGE 1: HERO IMAGE (Save as: public/images/guides/health-insurance/health-insurance-guide-hero.webp) */}
        <figure style={{ marginBottom: 32 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#e0f2fe',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #bae6fd',
            }}
          >
            <Image
              src="/images/guides/health-insurance/health-insurance-guide-hero.webp"
              alt="Health Insurance Buying Guide: Family Protection Concept"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </figure>

        <WikiText
          content={`
          <p>Choosing the right <strong>health insurance plan</strong> in India can be confusing, especially with technical terms like room rent capping, no claim bonus, waiting periods, and cashless claims. The primary goal of this <strong>health insurance buying guide</strong> is to help you quickly understand which features matter most before paying your first premium.</p>
          <p>This article explains the <strong>top 5 features to check before buying health insurance</strong> in simple language, with a special focus on Indian policies. By the end, you will know how to compare policies smartly, avoid hidden costs, and pick a mediclaim plan that actually works at the time of hospitalization.</p>
        `}
        />

        {/* AD SLOT 1 */}
        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id="health-guide-top" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>What is a Health Insurance Buying Guide?</h2>
          <p>A health insurance buying guide is a structured checklist that helps you evaluate and compare health insurance policies before purchase. Instead of choosing a plan only on the basis of premium, this guide focuses on features like room rent limits, no claim bonus (NCB), waiting periods, co-payment, and claim process.</p>
          <p>For Indian retail investors and families, such a guide is crucial because medical inflation in India is rising faster than income, and one wrong clause (like room rent capping) can drastically reduce your claim payout.</p>

          <h2>How Does Health Insurance Work in India?</h2>
          <p>Health insurance is a contract between you and an insurer where you pay a premium every year, and the insurer covers hospitalization expenses. At the time of hospitalization, either the insurer pays directly to the hospital (<strong>Cashless</strong>) or you pay first and get reimbursed later (<strong>Reimbursement</strong>).</p>
          
          <h3>Key concepts:</h3>
          <ul>
            <li><strong>Sum Insured:</strong> Maximum amount the insurer will pay in a policy year.</li>
            <li><strong>Waiting Periods:</strong> Time during which specific illnesses or pre-existing diseases are not covered.</li>
            <li><strong>Exclusions:</strong> What is not covered (e.g., cosmetic surgery).</li>
          </ul>
        `}
        />

        {/* AD SLOT 2 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="health-guide-basics-rect" type="box" />
        </div>

        <h2 id="key-features">
          Key Features & Benefits (Top 5 Things to Check)
        </h2>
        <p>
          These are the non-negotiable features you must verify before buying
          any policy.
        </p>

        <h3>1. Room Rent Capping (Avoid Strict Limits)</h3>
        <p>
          Many policies put a limit like 1% of Sum Insured per day for a normal
          room. If your room rent crosses this limit, many hospitals upgrade{' '}
          <strong>all related costs</strong> (doctor fees, nursing, etc.),
          forcing you to pay the proportionate difference.
        </p>

        {/* 🖼️ IMAGE 2: ROOM RENT CAPPING VISUAL (Save as: public/images/guides/health-insurance/room-rent-capping-explained.webp) */}
        <figure style={{ margin: '24px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#fef2f2',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #fee2e2',
            }}
          >
            <Image
              src="/images/guides/health-insurance/room-rent-capping-explained.webp"
              alt="Impact of Room Rent Capping on Total Hospital Bill"
              fill
              style={{ objectFit: 'contain', padding: '16px' }}
            />
          </div>
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#64748b',
              marginTop: '8px',
            }}
          >
            Warning: Exceeding room rent limits can proportionally increase your
            entire bill.
          </figcaption>
        </figure>

        <div className="callout-box info-box">
          <strong>Ideal Approach:</strong> Prefer policies with{' '}
          <strong>No Room Rent Capping</strong> or at least &quot;Single Private
          Room&quot; eligibility. This is critical if you live in metro cities.
        </div>

        <h3>2. No Claim Bonus (NCB) Explained</h3>
        <p>
          NCB is a reward for not making a claim. Good policies increase your
          Sum Insured by <strong>10–50% every claim-free year</strong>, often
          doubling your cover over time without extra premium.
        </p>
        <ul className="checklist">
          <li>
            Check the <strong>Maximum NCB limit</strong> (e.g., up to 100% or
            150% of base cover).
          </li>
          <li>Check if NCB reduces partially or fully upon making a claim.</li>
        </ul>

        {/* AD SLOT 3 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="health-guide-features-banner" type="leaderboard" />
        </div>

        <h3>3. Waiting Periods for Pre-Existing Diseases</h3>
        <p>
          Almost all plans have waiting periods for pre-existing diseases (PEDs)
          like diabetes, thyroid, or hypertension.
        </p>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Condition Type</th>
                <th>Typical Waiting Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Pre-existing Diseases (PED)</strong>
                </td>
                <td>2 to 4 Years</td>
              </tr>
              <tr>
                <td>
                  <strong>Specific Illnesses (Hernia, Cataract)</strong>
                </td>
                <td>2 Years</td>
              </tr>
              <tr>
                <td>
                  <strong>Initial Waiting Period</strong>
                </td>
                <td>30 Days (except accidents)</td>
              </tr>
              <tr>
                <td>
                  <strong>Maternity (if covered)</strong>
                </td>
                <td>9 to 24 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Tip:</strong> If you have parents with health issues, look for
          plans with shorter waiting periods (e.g., 2 years instead of 4).
        </p>

        <h3>4. Cashless vs Reimbursement Claims</h3>

        {/* 🖼️ IMAGE 3: CASHLESS FLOW (Save as: public/images/guides/health-insurance/cashless-vs-reimbursement.webp) */}
        <figure style={{ margin: '24px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#f0fdf4',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #bbf7d0',
            }}
          >
            <Image
              src="/images/guides/health-insurance/cashless-vs-reimbursement.webp"
              alt="Cashless vs Reimbursement Claim Process Flowchart"
              fill
              style={{ objectFit: 'contain', padding: '16px' }}
            />
          </div>
        </figure>

        <p>
          <strong>Cashless Claims:</strong> You get treated at a network
          hospital, and the insurer pays directly. <br />
          <strong>Reimbursement:</strong> You pay first and claim later. Always
          check the <strong>Network Hospital List</strong> in your city before
          buying.
        </p>

        <h3>5. Other Critical Features</h3>
        <ul className="checklist">
          <li>
            <strong>Co-payment:</strong> Avoid policies that force you to pay
            10-20% of every bill (common in senior citizen plans).
          </li>
          <li>
            <strong>Restoration Benefit:</strong> Does the Sum Insured refill if
            you exhaust it?
          </li>
          <li>
            <strong>Daycare Procedures:</strong> Coverage for surgeries not
            requiring 24-hour hospitalization.
          </li>
        </ul>

        {/* AD SLOT 4 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="health-guide-mid-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Eligibility, Limits & Rules</h2>
          <h3>Age & Renewal</h3>
          <ul>
            <li><strong>Entry Age:</strong> Usually 18 to 65 years. Children from 90 days.</li>
            <li><strong>Lifelong Renewability:</strong> Ensure the policy allows you to renew for life.</li>
          </ul>

          <h3>Sum Insured Options</h3>
          <p>For metro city residents, a cover of <strong>₹10–25 Lakh</strong> (Family Floater) is considered practical given rising medical costs.</p>

          <h2>Tax Benefits (Section 80D Explained)</h2>
          <p>Health insurance premiums offer tax deductions under Section 80D of the Income Tax Act.</p>
          
          <div class="table-container">
            <table class="data-table">
              <thead><tr><th>Category</th><th>Max Deduction Limit</th></tr></thead>
              <tbody>
                <tr><td>Self & Family (< 60 years)</td><td>₹25,000</td></tr>
                <tr><td>Parents (< 60 years)</td><td>₹25,000</td></tr>
                <tr><td>Parents (Senior Citizens 60+)</td><td>₹50,000</td></tr>
                <tr><td><strong>Max Combined Limit</strong></td><td><strong>₹75,000 - ₹1,00,000</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p><em>Example:</em> Paying ₹20k for your family and ₹40k for senior parents allows a total deduction of ₹60,000.</p>
        `}
        />

        {/* AD SLOT 5 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="health-guide-tax-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>Risks & Things to Consider</h2>
          <ul class="checklist">
            <li><strong>Hidden Sub-limits:</strong> Check for caps on specific treatments like Cataract or Joint Replacement.</li>
            <li><strong>Portability:</strong> You can port to another insurer if unhappy, but do it while you are healthy.</li>
            <li><strong>Claim Ratio:</strong> Check the insurer's Claim Settlement Ratio and Incurred Claim Ratio.</li>
          </ul>

          <h2>Health Insurance vs Alternatives</h2>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Personal Health Policy</th>
                  <th>Employer Group Cover</th>
                  <th>Emergency Fund</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Coverage</strong></td><td>High (Chosen by you)</td><td>Low (Fixed by company)</td><td>Limited to savings</td></tr>
                <tr><td><strong>Validity</strong></td><td>Lifelong (if renewed)</td><td>Ends with Job</td><td>Always available</td></tr>
                <tr><td><strong>Tax Benefit</strong></td><td>Yes (80D)</td><td>No</td><td>No</td></tr>
                <tr><td><strong>Best Use</strong></td><td><strong>Long-term Safety</strong></td><td>Temporary Support</td><td>Small Expenses</td></tr>
              </tbody>
            </table>
          </div>
        `}
        />

        {/* AD SLOT 6 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="health-guide-comparison-rect" type="box" />
        </div>

        {/* --- FAQ SECTION --- */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ marginBottom: 20 }}>
            FAQs (Health Insurance Buying Guide)
          </h2>
          <div className="faqs-accordion">
            <details>
              <summary>
                How much health insurance cover is enough in India?
              </summary>
              <p>
                For metro cities, ₹10-15 Lakh for individuals and ₹20-25 Lakh
                for families is recommended due to high medical inflation.
              </p>
            </details>

            <details>
              <summary>
                Should I buy health insurance if I have employer cover?
              </summary>
              <p>
                Yes. Employer cover ends when you leave the job or retire. A
                personal policy ensures continuous coverage and waiting period
                benefits.
              </p>
            </details>

            <details>
              <summary>What is better: Family Floater or Individual?</summary>
              <p>
                Family Floater is cost-effective for young families. Individual
                policies are better for older parents or members with high
                health risks to preserve the sum insured.
              </p>
            </details>

            <details>
              <summary>What is cashless hospitalization?</summary>
              <p>
                It means the insurer settles the bill directly with the network
                hospital. You don&apos;t have to pay from your pocket, except
                for non-medical expenses.
              </p>
            </details>

            <details>
              <summary>Can I increase my cover later?</summary>
              <p>
                Yes, you can request a Sum Insured enhancement at renewal, or
                buy a <strong>Super Top-up policy</strong> to increase coverage
                cheaply.
              </p>
            </details>
          </div>
        </div>

        {/* AD SLOT 7 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="health-guide-bottom" type="leaderboard" />
        </div>

        <section className="conclusion-box" style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Final Verdict</h2>
          <p style={{ marginBottom: 16 }}>
            A smart health insurance purchase is not about chasing the lowest
            premium, but about the right features.{' '}
            <strong>Avoid strict room rent caps</strong>, ensure a{' '}
            <strong>healthy No Claim Bonus</strong>, and verify{' '}
            <strong>waiting periods</strong> for pre-existing diseases.
          </p>
          <p>
            Treat health insurance as a non-negotiable safety net. One medical
            emergency can wipe out years of savings—protect your family&apos;s
            future today.
          </p>
        </section>

        <AuthorBio />

        <div className="legal-disclaimer">
          <p>
            <strong>Disclaimer:</strong> Insurance is a subject matter of
            solicitation. The information provided in this article is for
            educational purposes only. Please read the policy wordings and terms
            & conditions carefully before concluding a sale. Fincado is not an
            insurance aggregator or broker.
          </p>
        </div>
      </article>
    </>
  );
}
