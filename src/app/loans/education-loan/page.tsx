import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EducationLoanClient from './EducationLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
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
import {
  CheckCircle2,
  GraduationCap,
  Wallet,
  FileText,
  UserSquare2,
  Plane,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title:
    'Education Loan EMI Calculator – Section 80E & Moratorium (Updated for 2026)',
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
    canonical: 'https://fincado.com/loans/education-loan/',
  },
  openGraph: {
    title: 'Education Loan EMI Calculator – Updated After Budget 2026',
    description:
      'Accurate Student Loan EMI Calculator with Moratorium logic & Tax Savings.',
    url: 'https://fincado.com/loans/education-loan/',
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
    <p class="mt-4">
      Education loans cover tuition fees, hostel charges, exam fees, and even equipment 
      costs like laptops. They are available for both domestic and international studies.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Education Loans offer the best tax benefits among all loan types. Under <strong>Section 80E</strong> 
      of the Income Tax Act, you can claim a deduction on the <strong>entire interest amount</strong> paid.
    </p>
    <ul class="mt-4 list-disc list-inside space-y-2">
      <li><strong>Limit:</strong> No upper limit on the deduction amount (unlike 80C).</li>
      <li><strong>Duration:</strong> Available for up to 8 years or until interest is fully repaid.</li>
      <li><strong>Eligibility:</strong> Only available to the individual who took the loan (Student or Parent/Legal Guardian).</li>
    </ul>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Student:</strong> Must be an Indian citizen, aged 18-35, with confirmed admission.</li>
      <li><strong>Co-Applicant:</strong> A parent, guardian, or spouse with a stable income is mandatory.</li>
      <li><strong>Academic Record:</strong> Good grades (10th, 12th, Graduation) help in faster approval.</li>
      <li><strong>Collateral:</strong> 
        <ul class="list-disc list-inside ml-5 mt-1">
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
    {
      id: 'faq-6',
      question:
        'Did Budget 2026 change education loan tax benefits under Section 80E?',
      answer:
        'No. Union Budget 2026 did not introduce any changes to Section 80E. Borrowers can continue to claim a full deduction on education loan interest for up to 8 years, with no upper limit.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Education Loan EMI Calculator"
        description="Calculate EMI for student loans. Account for moratorium periods and Section 80E tax deductions."
        url="https://fincado.com/loans/education-loan/"
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
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Loans', url: 'https://fincado.com/loans/' },
            {
              name: 'Education Loan EMI Calculator',
              url: 'https://fincado.com/loans/education-loan/',
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

            {/* promo card */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Plane className="h-5 w-5 -rotate-45" />{' '}
                  {/* Rotated for 'taking off' look */}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Planning to Study Abroad?
                  </strong>

                  <Link
                    href="/guides/education-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      Read our Guide: Collateral vs Non-Collateral Loans
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* rich seo content  */}
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
                      <Alert className="mt-4 bg-slate-50 border-slate-200">
                        <BookOpen className="h-4 w-4 text-slate-500" />
                        <AlertTitle className="text-slate-900 font-semibold text-sm">
                          Budget 2026 Update
                        </AlertTitle>
                        <AlertDescription className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Union Budget 2026 did not make any changes to
                          education loan tax benefits under Section 80E,
                          moratorium rules, or repayment structures. Students
                          and parents can continue to claim full interest
                          deductions as per existing income tax provisions.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </section>

                  {/* --- ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Eligibility Criteria (2026)
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
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-slate-900">
                        Documents Required Checklist
                      </h3>
                    </div>

                    <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
                      {/* Sub-Header Strip */}
                      <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                          <UserSquare2 className="h-4 w-4" /> For Student &
                          Co-Applicant
                        </h4>
                      </div>

                      <CardContent className="p-6 sm:p-8">
                        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                          {/* Item 1: KYC */}
                          <li className="flex gap-4">
                            <div className="mt-1 shrink-0">
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="space-y-1">
                              <strong className="block font-semibold text-slate-900">
                                KYC Documents
                              </strong>
                              <p className="text-sm leading-relaxed text-slate-600">
                                Aadhaar Card, PAN Card, Passport (Identity &
                                Address Proof)
                              </p>
                            </div>
                          </li>

                          {/* Item 2: Academic */}
                          <li className="flex gap-4">
                            <div className="mt-1 shrink-0">
                              <GraduationCap className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="space-y-1">
                              <strong className="block font-semibold text-slate-900">
                                Academic Records
                              </strong>
                              <p className="text-sm leading-relaxed text-slate-600">
                                Marksheets (10th, 12th, Degree) & Entrance Exam
                                Scorecard
                              </p>
                            </div>
                          </li>

                          {/* Item 3: Admission */}
                          <li className="flex gap-4">
                            <div className="mt-1 shrink-0">
                              <FileText className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="space-y-1">
                              <strong className="block font-semibold text-slate-900">
                                Admission Proof
                              </strong>
                              <p className="text-sm leading-relaxed text-slate-600">
                                Confirmed University Offer Letter with complete
                                fee breakdown
                              </p>
                            </div>
                          </li>

                          {/* Item 4: Financial */}
                          <li className="flex gap-4">
                            <div className="mt-1 shrink-0">
                              <Wallet className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="space-y-1">
                              <strong className="block font-semibold text-slate-900">
                                Financial Documents
                              </strong>
                              <p className="text-sm leading-relaxed text-slate-600">
                                Salary Slips, ITR (last 2 years) & Bank
                                Statements (6 months)
                              </p>
                            </div>
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
                    <h3 className="text-xl font-semibold text-slate-900 ">
                      EMI Calculation Formula
                    </h3>

                    <p className="text-slate-700">
                      Education loan EMI includes interest accrued during the
                      moratorium:
                    </p>

                    <div className="text-sm overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <BlockMath math="EMI = [(P + I_{moratorium}) \times r \times (1+r)^N] / [(1+r)^N - 1]" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul class="list-disc list-inside space-y-2 text-xs">
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
