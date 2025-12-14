// src/app/loans/education-loan/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import EducationLoanClient from './EducationLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';

// 1. SEO METADATA
export const metadata: Metadata = {
  title: 'Education Loan EMI Calculator – With Moratorium & 80E Benefit',
  description:
    'Calculate Education Loan EMI including Moratorium period. Check eligibility, 80E tax deduction, and repayment schedule for SBI, HDFC, and Axis Bank.',
  keywords: [
    'Education Loan Calculator',
    'Student Loan EMI Calculator',
    'Moratorium Period Calculator',
    'Section 80E Tax Benefit',
    'Education Loan Eligibility',
    'Study Loan Interest Rate',
  ],
  openGraph: {
    title: 'Education Loan Calculator – Plan Your Future',
    description: 'Accurate Student Loan EMI Calculator with Moratorium logic.',
    url: 'https://www.fincado.com/loans/education-loan',
    type: 'website',
  },
};

export default function EducationLoanPage() {
  return (
    <>
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
                  text: 'It is a repayment holiday during the course duration plus 6-12 months. You do not have to pay EMI, but interest accumulates.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who is eligible for an Education Loan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Any Indian citizen aged 18-35 admitted to a recognized course in India or abroad is eligible. A co-applicant (parent/guardian) is usually mandatory.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Education Loan interest tax deductible?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, under Section 80E, the entire interest component is tax-deductible for up to 8 years.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header - Hidden in Print */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Education Loan EMI Calculator</h1>
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
            {/* CALCULATOR */}
            <EducationLoanClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="edu-loan-mid" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              {/* 1. WHAT IS IT */}
              <h2>What is an Education Loan?</h2>

              <WikiText
                content={`
                  <p>
                    An <strong>Education Loan</strong> provides financial support to students
                    pursuing higher education in India or abroad. It covers tuition
                    fees, hostel charges, exam fees, and even laptop purchases.
                    Unlike personal loans, these come with a
                    <strong>Moratorium Period</strong> (repayment holiday).
                  </p>
                `}
              />

              {/* 2. ELIGIBILITY */}
              <h3>Who is Eligible and Who Can Repay?</h3>
              <WikiText
                content={`
                  <ul>
                    <li>
                      <strong>Student:</strong> Must be an Indian citizen, aged
                      18-35, with confirmed admission in a recognized institute.
                    </li>
                    <li>
                      <strong>Co-Applicant:</strong> A parent, guardian, or spouse
                      with a stable income is mandatory to act as a guarantor.
                    </li>
                    <li>
                      <strong>Repayment:</strong> The student is the primary
                      borrower, but the co-applicant pays the simple interest during
                      the course to save money.
                    </li>
                  </ul>
                `}
              />

              {/* 3. MORATORIUM PLANNING (Crucial for Ranking) */}
              <h3>How This Calculator Helps with Moratorium Planning</h3>
              <WikiText
                content={`
                  <p>
                    Most calculators fail to account for the interest that
                    accumulates while you are studying. Fincado's tool adds
                    this "Moratorium Interest" to your principal so you
                    can see your <strong>True EMI</strong>.
                  </p>
                  <div style="background: #fff3cd; padding: 16px; border-radius: 8px; border: 1px solid #ffeeba; color: #856404;">
                    <strong>Interest Trap:</strong> If you don't pay interest
                    during the course, it gets added to your loan (Capitalization),
                    meaning you pay interest on interest later!
                  </div>
                `}
              />

              {/* 4. FORMULA */}
              <h3>EMI Calculation with Moratorium Interest</h3>
              <p>
                The formula is slightly different because the Principal (P)
                increases by the time repayment starts.
              </p>
              <div
                style={{
                  background: '#f1f5f9',
                  padding: '16px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  marginBottom: '20px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                EMI = [(P + Accrued Interest) x R x (1+R)^N] / [(1+R)^N-1]
              </div>
              <WikiText
                content={`
                <p>
                  Where <em>Accrued Interest</em> = Loan Amount × Rate × Course
                  Duration.
                </p>
              `}
              />

              {/* 5. ADVANTAGES */}
              <h3>Key Advantages of an Education Loan</h3>
              <div className="advantage-grid">
                <div className="advantage-card">
                  <h4>Build Credit Score</h4>
                  <p>
                    It&apos;s often the first loan for a student. Repaying it on
                    time builds a solid CIBIL score for future life.
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Section 80E Tax Save</h4>
                  <p>
                    The <strong>entire interest amount</strong> paid is
                    tax-deductible for 8 years. There is no upper limit (unlike
                    80C).
                  </p>
                </div>
                <div className="advantage-card">
                  <h4>Moratorium Holiday</h4>
                  <p>
                    You get breathing space during your course + 1 year to find
                    a job before EMIs start.
                  </p>
                </div>
              </div>
            </article>

            {/* Smart Planning */}
            <div className="no-print">
              <HeroWithStats
                eyebrow="Save Money"
                title="Education Loan Hacks"
                stats={[
                  {
                    value: '1%',
                    label: 'Concession for paying interest early',
                  },
                  { value: '8 yrs', label: 'Max Tax Benefit Duration' },
                  { value: '0.5%', label: 'Discount for Girl Students' },
                ]}
              />
            </div>

            {/* 6. FAQs */}
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
                <details>
                  <summary>Can I repay the loan early?</summary>
                  <p>
                    Yes. Most education loans have{' '}
                    <strong>Zero Prepayment Penalty</strong>. You should clear
                    it as soon as you get a job to save on interest.
                  </p>
                </details>
              </div>
            </section>

            {/* ✅ ADD AUTHOR BIO HERE */}
            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="edu-loan-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
