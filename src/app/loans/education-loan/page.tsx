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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';

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

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What happens if I don’t pay interest during the course?',
      answer:
        'The interest accrued during the moratorium period is added to your loan principal (capitalized). Your EMI is then calculated on this higher amount, increasing the total interest payable.',
    },
    {
      id: 'faq-2',
      question: 'Is collateral required for an education loan?',
      answer:
        'Loans up to ₹4 lakh usually do not require collateral. Loans between ₹4–7.5 lakh may need a third-party guarantor. Loans above ₹7.5 lakh generally require collateral such as property or fixed deposits.',
    },
    {
      id: 'faq-3',
      question: 'When does education loan repayment start?',
      answer:
        'Repayment usually starts after the moratorium period, which includes the course duration plus 6–12 months, depending on the lender.',
    },
    {
      id: 'faq-4',
      question: 'Is education loan interest tax deductible?',
      answer:
        'Yes. Under Section 80E of the Income Tax Act, the entire interest paid on an education loan is tax-deductible for up to 8 years, with no upper limit.',
    },
    {
      id: 'faq-5',
      question: 'Can I prepay or foreclose an education loan?',
      answer:
        'Most banks allow prepayment without penalty. Early repayment can significantly reduce total interest paid.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Education Loan EMI Calculator"
        description="Calculate EMI for student loans. Account for moratorium periods and Section 80E tax deductions."
        url="https://www.fincado.com/loans/education-loan"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
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

        <header className="no-print my-4">
          {/* Top action row */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Education Loan EMI Calculator" />
            <LanguageToggle path="/hi/loans/education-loan" />
          </div>

          {/* Title */}
          <h1
            className="
      text-[clamp(1.9rem,4vw,2.6rem)]
      font-semibold
      leading-tight
      tracking-[-0.02em]
      text-slate-900
    "
          >
            <span
              className="
        block
        mb-3
        text-2xl
        sm:text-3xl
        lg:text-4xl
        font-semibold
        tracking-tight
      "
            >
              Education Loan EMI Calculator
            </span>

            <span className="block text-base sm:text-lg font-medium text-lime-700">
              Calculate EMI, moratorium impact & tax benefits
            </span>
          </h1>

          {/* Description */}
          <div className="max-w-3xl mt-4 text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
        <p>
          Plan your higher studies smartly using our
          <strong>Education Loan EMI Calculator</strong>.
          Instantly calculate EMI including the
          <strong>moratorium period</strong> and estimate
          <strong>Section 80E tax savings</strong> before applying.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <EducationLoanClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="edu-loan-after-calc" type="banner" />
            </div>

            <LiveRateTable type="personalLoan" />

            <Card className="no-print my-8 border-emerald-200 bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-4 sm:p-6">
                {/* Icon */}
                <span className="text-2xl leading-none">✈️</span>

                {/* Content */}
                <div>
                  <strong className="block text-base font-semibold text-emerald-800">
                    Planning to Study Abroad?
                  </strong>

                  <Link
                    href="/guides/education-loan-guide"
                    className="
          mt-1 inline-block
          text-sm
          font-semibold
          text-emerald-700
          underline
          underline-offset-4
          hover:text-emerald-800
        "
                  >
                    Read our Guide: Collateral vs Non-Collateral Loans →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- WHAT IS EDUCATION LOAN --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is an Education Loan?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Eligibility Criteria (2025)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={eligibilityContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- TAX BENEFITS --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Section 80E Tax Benefits
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* --- DOCUMENT CHECKLIST --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Documents Required Checklist
                    </h3>

                    <Card className="border-slate-200 bg-slate-50">
                      <CardContent className="p-6 sm:p-8">
                        {/* Header */}
                        <div className="mb-6 flex items-center gap-3">
                          <h4 className="text-base font-semibold text-slate-900">
                            For Student & Co-Applicant
                          </h4>
                        </div>

                        {/* Checklist Grid */}
                        <ul className="grid gap-4 sm:grid-cols-2">
                          <li className="flex items-start gap-3">
                            <span className="mt-1 text-emerald-600">✅</span>
                            <p className="text-sm leading-relaxed text-slate-700">
                              <strong className="text-slate-900">KYC:</strong>{' '}
                              Aadhaar Card, PAN Card, Passport
                            </p>
                          </li>

                          <li className="flex items-start gap-3">
                            <span className="mt-1 text-emerald-600">✅</span>
                            <p className="text-sm leading-relaxed text-slate-700">
                              <strong className="text-slate-900">
                                Academic:
                              </strong>{' '}
                              Marksheets (10th, 12th, Degree), Entrance Exam
                              Scorecard
                            </p>
                          </li>

                          <li className="flex items-start gap-3">
                            <span className="mt-1 text-emerald-600">✅</span>
                            <p className="text-sm leading-relaxed text-slate-700">
                              <strong className="text-slate-900">
                                Admission:
                              </strong>{' '}
                              University Offer Letter with fee breakdown
                            </p>
                          </li>

                          <li className="flex items-start gap-3">
                            <span className="mt-1 text-emerald-600">✅</span>
                            <p className="text-sm leading-relaxed text-slate-700">
                              <strong className="text-slate-900">
                                Financial:
                              </strong>{' '}
                              Salary Slips, ITR (last 2 years), Bank Statements
                            </p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </section>

                  {/* --- MORATORIUM EXPLANATION --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How the Moratorium Period Works
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText
                        content={`
              <p>
                Most calculators fail to account for the interest that accrues
                while you are studying. Fincado’s calculator adds this
                <strong> Moratorium Interest</strong> to your principal so you
                see your <strong>true EMI</strong> after repayment begins.
              </p>
            `}
                      />
                    </div>
                  </section>

                  {/* --- EMI FORMULA --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI Calculation Formula
                    </h3>

                    <p className="text-slate-700">
                      Education loan EMI includes interest accrued during the
                      moratorium:
                    </p>

                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <BlockMath math="EMI = [(P + I_{moratorium}) \times r \times (1+r)^N] / [(1+r)^N - 1]" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul>
                <li><strong>P</strong> = Original Loan Amount</li>
                <li><strong>I<sub>moratorium</sub></strong> = Interest accrued during study period</li>
                <li><strong>r</strong> = Monthly Interest Rate</li>
                <li><strong>N</strong> = Repayment Tenure (Months)</li>
              </ul>
            `}
                      />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQs */}
            <section className="no-print my-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="edu-loan-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
