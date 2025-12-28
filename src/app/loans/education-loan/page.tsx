import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EducationLoanClient from './EducationLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Education Loan EMI Calculator 2025 – Section 80E & Moratorium',
  description:
    'Calculate Education Loan EMI with Moratorium period. Check tax benefits under Section 80E, Study Abroad eligibility, and repayment schedules from SBI, HDFC.',
  keywords: [
    'Education Loan Calculator',
    'Student Loan EMI Calculator',
    'Moratorium Period Calculator',
    'Section 80E Tax Deduction',
    'Study Abroad Loan Calculator',
    'Education Loan Interest Rate',
    'Student Loan Eligibility India',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/loans/education-loan',
  },
  openGraph: {
    title: 'Education Loan Calculator – Plan Your Future',
    description:
      'Accurate Student Loan EMI Calculator with Moratorium logic & Tax Savings.',
    url: 'https://www.fincado.com/loans/education-loan',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function EducationLoanPage() {
  const introContent = autoLinkContent(`
    <p>
      An <strong>Education Loan</strong> is a financial product designed to help students 
      pursue higher education in India or abroad. Unlike other loans, it comes with a 
      unique feature called the <strong>Moratorium Period</strong> (or Repayment Holiday), 
      where the student is not required to pay EMIs during the course duration.
    </p>
    <p>
      Education loans cover tuition fees, hostel charges, exam fees, and even equipment 
      costs like laptops. They are available for both domestic and international studies.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Education Loans offer the best tax benefits among all loan types. Under <strong>Section 80E</strong> 
      of the Income Tax Act, you can claim a deduction on the <strong>entire interest amount</strong> paid.
    </p>
    <ul>
      <li><strong>Limit:</strong> No upper limit on the deduction amount (unlike 80C).</li>
      <li><strong>Duration:</strong> Available for up to 8 years or until interest is fully repaid.</li>
      <li><strong>Eligibility:</strong> Only available to the individual who took the loan (Student or Parent/Legal Guardian).</li>
    </ul>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul>
      <li><strong>Student:</strong> Must be an Indian citizen, aged 18-35, with confirmed admission.</li>
      <li><strong>Co-Applicant:</strong> A parent, guardian, or spouse with a stable income is mandatory.</li>
      <li><strong>Academic Record:</strong> Good grades (10th, 12th, Graduation) help in faster approval.</li>
      <li><strong>Collateral:</strong> 
        <ul>
          <li>Up to ₹4 Lakhs: No Collateral.</li>
          <li>₹4 Lakhs to ₹7.5 Lakhs: Third-party Guarantor required.</li>
          <li>Above ₹7.5 Lakhs: Tangible Collateral (Property/FD) required.</li>
        </ul>
      </li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Education Loan EMI Calculator"
        description="Calculate EMI for student loans. Account for moratorium periods and Section 80E tax deductions."
        url="https://www.fincado.com/loans/education-loan"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a Moratorium Period?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It is a repayment holiday consisting of the course duration plus 6-12 months. During this time, you do not have to pay EMI, but simple interest continues to accrue on the principal.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who is eligible for Section 80E deduction?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Any individual who has taken a loan for higher education for themselves, their spouse, or children can claim the deduction. It applies only to the interest component, not the principal.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get a loan for Study Abroad?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Banks offer higher loan amounts (up to ₹1.5 Crore) for premier institutions abroad. You generally need collateral for loans above ₹7.5 Lakhs.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Loans', url: 'https://www.fincado.com/loans' },
            {
              name: 'Education Loan EMI Calculator',
              url: 'https://www.fincado.com/loans/education-loan',
            },
          ]}
        />

        <header style={{ marginBottom: 40 }} className="no-print">
          <LanguageToggle path="/hi/loans/education-loan" />
          <h1>Education Loan EMI Calculator</h1>
          <ShareTools title="Education Loan EMI Calculator" />

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="edu-loan-top" type="leaderboard" />
          </div>

          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Plan your higher studies smartly. Calculate EMI including the
              <strong>Moratorium Period</strong> and estimate
              <strong>Section 80E</strong> tax savings.
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <EducationLoanClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="edu-loan-after-calc" type="banner" />
            </div>

            <LiveRateTable type="personalLoan" />

            <div
              className="no-print"
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '16px',
                margin: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px' }}>✈️</span>
              <div>
                <strong style={{ display: 'block', color: '#166534' }}>
                  Planning to Study Abroad?
                </strong>
                <Link
                  href="/guides/education-loan-guide"
                  style={{
                    color: '#16a34a',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Read our Guide: Collateral vs Non-Collateral Loans →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print">
              <h2>What is an Education Loan?</h2>
              <WikiText content={introContent} />

              <h3>Eligibility Criteria (2025)</h3>
              <WikiText content={eligibilityContent} />

              {/* 💰 AD 3: IN-CONTENT SQUARE */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3>Section 80E Tax Benefits</h3>
              <WikiText content={taxContent} />

              <h3>Documents Required Checklist</h3>
              <div
                className="checklist-box"
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px',
                  margin: '24px 0',
                }}
              >
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: '16px',
                    color: '#0f172a',
                  }}
                >
                  📄 For Student & Co-Applicant
                </h4>
                <ul className="checklist">
                  <li>
                    <strong>KYC:</strong> Aadhaar Card, PAN Card, Passport.
                  </li>
                  <li>
                    <strong>Academic:</strong> Marksheets (10th, 12th, Degree),
                    Entrance Exam Scorecard.
                  </li>
                  <li>
                    <strong>Admission:</strong> Offer Letter from University
                    with fee breakdown.
                  </li>
                  <li>
                    <strong>Financial:</strong> Last 3 months Salary Slips, 2
                    years ITR, Bank Statements.
                  </li>
                </ul>
              </div>

              <h3>How the Moratorium Period Works</h3>
              <WikiText
                content={`
                  <p>
                    Most calculators fail to account for the interest that
                    accumulates while you are studying. Fincado's tool adds
                    this "Moratorium Interest" to your principal so you
                    can see your <strong>True EMI</strong>.
                  </p>
                `}
              />

              <h3>EMI Calculation Formula</h3>
              <p>
                The formula includes accrued interest during the moratorium:
              </p>

              <div
                style={{
                  padding: '20px 0',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <BlockMath math="EMI = [(P + I_{moratorium}) \times r \times (1+R)^N] / [(1+R)^N-1]" />
              </div>

              <WikiText
                content={`
                <ul style="font-size: 14px;">
                  <li><strong>P</strong>: Loan Principal</li>
                  <li><strong>I_moratorium</strong>: Simple interest accrued during course</li>
                  <li><strong>N</strong>: Repayment Tenure</li>
                  <li><strong>r</strong>: Monthly Interest Rate</li>
                </ul>
              `}
              />
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>
                    What happens if I don&apos;t pay interest during the course?
                  </summary>
                  <p>
                    The interest accumulates and is added to your principal
                    (Capitalization). Your future EMI will be calculated on this
                    higher amount.
                  </p>
                </details>
                <details>
                  <summary>Is collateral required?</summary>
                  <p>
                    Loans up to ₹4 Lakhs need no collateral. Loans between
                    ₹4L-₹7.5L need a third-party guarantor. Above ₹7.5L requires
                    collateral (Property/FD).
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="edu-loan-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
