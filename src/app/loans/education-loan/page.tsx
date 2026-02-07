import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EducationLoanEMIClient from './EducationLoanEMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, ArrowRight, Info, GraduationCap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EducationLoanSchemas } from '@/components/schemas/EducationLoanSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Education Loan EMI Calculator 2026 - Student Loan Calculator India',
  description:
    'Free Education Loan EMI Calculator for India. Calculate monthly EMI for student loans with tax benefits under Section 80E. Compare rates from SBI, HDFC, ICICI for studying abroad or in India.',
  keywords: [
    'education loan emi calculator',
    'student loan calculator',
    'education loan interest rate',
    'study abroad loan',
    'section 80e tax benefit',
    'education loan eligibility',
    'sbi student loan',
    'hdfc education loan',
  ],
  alternates: {
    canonical: 'https://fincado.com/emi-calculator/education-loan/',
  },
  openGraph: {
    title:
      'Education Loan EMI Calculator - Student Loan Calculator with Tax Benefits',
    description:
      'Calculate education loan EMI with Section 80E tax benefits. Compare rates for studying in India & abroad from top banks.',
    url: 'https://fincado.com/emi-calculator/education-loan/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-education-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Education Loan EMI Calculator',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ---------------- PAGE ---------------- */

export default function EducationLoanEMIPage() {
  const introContent = autoLinkContent(`
    <p>
      An <strong>Education Loan EMI Calculator</strong> helps you calculate monthly installments 
      for student loans taken for higher education in India or abroad. Education loans offer 
      <strong>100% tax deduction on interest</strong> paid under <strong>Section 80E</strong> 
      (no upper limit) with flexible repayment starting after course completion + 1 year moratorium period.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>100% Tax Deduction:</strong> Full interest amount is tax deductible under Section 80E for 8 years (no maximum limit).</li>
      <li><strong>No Collateral for Loans up to ₹7.5L:</strong> Most banks don't require collateral for education loans below ₹7.5 lakhs.</li>
      <li><strong>Moratorium Period:</strong> EMI repayment starts after course completion + 1 year (or 6 months after getting job).</li>
      <li><strong>Covers All Expenses:</strong> Includes tuition fees, hostel, books, travel, laptop, and living expenses abroad.</li>
      <li><strong>Lower Interest Rates:</strong> Interest rates (8.5%-13.5%) are lower than personal loans due to government subsidies.</li>
    </ul>
  `);

  const domesticVsAbroadContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">Factor</th>
            <th class="p-3 text-left font-semibold border">Study in India</th>
            <th class="p-3 text-left font-semibold border">Study Abroad</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Interest Rate</td>
            <td class="p-3 border text-emerald-700">8.50% - 11.50%</td>
            <td class="p-3 border">9.50% - 13.50%</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Loan Amount</td>
            <td class="p-3 border">Up to ₹15 lakhs</td>
            <td class="p-3 border">Up to ₹1.5 crores</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Collateral Required</td>
            <td class="p-3 border">Above ₹7.5 lakhs</td>
            <td class="p-3 border">Above ₹7.5 lakhs</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Repayment Tenure</td>
            <td class="p-3 border">10-15 years</td>
            <td class="p-3 border">15 years</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Processing Fee</td>
            <td class="p-3 border">₹2,000 - ₹5,000</td>
            <td class="p-3 border">₹5,000 - ₹10,000</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Co-applicant Required</td>
            <td class="p-3 border">Parent/Guardian</td>
            <td class="p-3 border">Parent/Guardian (mandatory)</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is the current education loan interest rate in India?',
      answer:
        'As of February 2026, education loan interest rates for studying in India range from 8.50% to 11.50% p.a. For studying abroad, rates are 9.50% to 13.50%. SBI offers 9.05%-10.40%, HDFC 9.50%-11.50%, and ICICI 10.50%-13.50%. Rates vary based on loan amount, course, and institute ranking.',
    },
    {
      id: 'faq-2',
      question: 'What is Section 80E tax benefit on education loan?',
      answer:
        'Section 80E allows 100% tax deduction on interest paid on education loans for 8 years starting from the year you begin repayment. There is NO MAXIMUM LIMIT. If you pay ₹1 lakh interest annually, full ₹1 lakh is deductible. Principal repayment is not covered under 80E.',
    },
    {
      id: 'faq-3',
      question: 'Do I need a co-applicant for an education loan?',
      answer:
        "Yes, education loans always require a co-applicant - typically a parent or guardian. The co-applicant's income is considered for eligibility. For loans above ₹7.5 lakhs, collateral (property, FD, LIC) from co-applicant is required.",
    },
    {
      id: 'faq-4',
      question: 'What is the moratorium period in education loans?',
      answer:
        'Moratorium is the grace period before EMI repayment starts. It equals course duration + 1 year (or 6 months after getting a job, whichever is earlier). During moratorium, simple interest accrues but EMI payment is not required. Some borrowers pay interest during this period to reduce total cost.',
    },
    {
      id: 'faq-5',
      question: 'Can I get education loan without collateral?',
      answer:
        "Yes, for loans up to ₹7.5 lakhs, most banks don't require collateral if studying at recognized institutions. For amounts above ₹7.5 lakhs, collateral (property, FD, LIC, NSC worth 100-150% of loan) is mandatory. Some NBFCs offer higher amounts without collateral at higher rates.",
    },
    {
      id: 'faq-6',
      question: 'What expenses are covered under education loan?',
      answer:
        'Education loans cover: (1) Tuition & admission fees, (2) Hostel & accommodation, (3) Books, equipment & laptop, (4) Travel expenses (for abroad), (5) Study tours, (6) Exam/library/lab fees, (7) Caution deposit, (8) Building fund. Personal expenses are not covered.',
    },
    {
      id: 'faq-7',
      question: 'What is the maximum education loan amount I can get?',
      answer:
        "For studying in India: Up to ₹15-20 lakhs. For studying abroad: Up to ₹1-1.5 crores depending on bank. SBI offers up to ₹1.5 cr for abroad, HDFC up to ₹1 cr, ICICI up to ₹1.2 cr. Loan amount depends on course fees, institute ranking, and co-applicant's income.",
    },
    {
      id: 'faq-8',
      question: 'Which courses are eligible for education loans?',
      answer:
        'Eligible courses: (1) Graduation/Post-graduation from UGC/AICTE/Government approved institutions, (2) Professional courses (Engineering, Medical, MBA, CA, CS), (3) Courses abroad from recognized universities, (4) Vocational courses from ITI/Polytechnics. Diploma/certificate courses may have restrictions.',
    },
    {
      id: 'faq-9',
      question:
        "What happens if I can't repay education loan after completing studies?",
      answer:
        'If unable to repay: (1) Contact bank immediately to restructure loan, (2) Request extended moratorium (some banks allow up to 2 years), (3) Co-applicant becomes liable to repay, (4) Collateral (if pledged) may be seized, (5) Credit score drops affecting future loans, (6) Legal action after NPA declaration.',
    },
    {
      id: 'faq-10',
      question: 'Can I prepay education loan and save on Section 80E benefits?',
      answer:
        "Yes, you can prepay without penalty at most banks. However, consider this: If your tax bracket is 30%, and loan rate is 10%, effective post-tax cost is only 7% (due to 80E deduction). If you can earn >7% returns elsewhere, don't prepay. Prepay only if your return on investments is lower.",
    },
  ];
  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'EMI Calculator',
            url: 'https://fincado.com/emi-calculator/',
          },
          {
            name: 'Education Loan EMI Calculator',
            url: 'https://fincado.com/emi-calculator/education-loan/',
          },
        ]}
      />

      <CalculatorSchema
        name="Education Loan EMI Calculator"
        description="Calculate education loan EMI with Section 80E tax benefits. Check monthly repayment for student loans in India & abroad."
        url="https://fincado.com/emi-calculator/education-loan/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <EducationLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Education Loan EMI Calculator - Student Loan Calculator with Tax Benefits" />
            <LanguageToggle path="/hi/loans/education-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Education Loan EMI Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-indigo-700">
                Student Loan Calculator with Section 80E Tax Benefits
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="education-loan-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-indigo-200 bg-linear-to-brrom-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      BEST RATE (INDIA)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      SBI Scholar Loan {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.50%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      TAX BENEFIT (80E)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Interest Deduction (8 Years)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      100%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        unlimited
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      MORATORIUM PERIOD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Grace Period Before EMI
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      Course
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        +1 yr
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <EducationLoanEMIClient />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot
                id="education-loan-after-calc"
                type="square"
                lazyLoad={false}
              />
            </div>

            {/* Formula Block */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Education Loan EMI Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      Education loan EMIs are also calculated using the standard
                      reducing balance EMI formula. Typically, interest during
                      the moratorium is added to the principal, and then EMI
                      starts.
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        EMI = P × [r × (1 + r)<sup>n</sup>] / [(1 + r)
                        <sup>n</sup> − 1]
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>
                          = Effective principal at the time EMI starts (original
                          loan amount + interest accrued during moratorium)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Monthly interest rate = Annual Rate ÷ (12 × 100)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Repayment tenure in months (years × 12), excluding
                          moratorium period
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: Education Loan with Moratorium
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Original Loan Amount:</strong>
                        </div>
                        <div>₹10,00,000</div>

                        <div>
                          <strong>Annual Interest Rate:</strong>
                        </div>
                        <div>10% p.a.</div>

                        <div>
                          <strong>Course + Moratorium Period:</strong>
                        </div>
                        <div>5 years (60 months)</div>

                        <div>
                          <strong>Repayment Tenure (after moratorium):</strong>
                        </div>
                        <div>10 years (120 months)</div>
                      </div>

                      {/* Step 1: Moratorium interest */}
                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Interest Accrued During Moratorium (Simple
                          Interest)
                        </strong>
                        <div className="ml-4 font-mono text-base space-y-1">
                          <div>Interest = Principal × Rate × Time</div>
                          <div>
                            Interest = 10,00,000 × 10% × 5 = 10,00,000 × 0.10 ×
                            5
                          </div>
                          <div>Interest = ₹5,00,000</div>
                        </div>
                      </div>

                      {/* Step 2: New principal */}
                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Principal at Start of EMI
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          P (effective) = 10,00,000 + 5,00,000 = ₹15,00,000
                        </div>
                      </div>

                      {/* Step 3: EMI formula */}
                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply EMI Formula on ₹15,00,000 for 10 Years
                        </strong>
                        <div className="ml-4 font-mono text-sm space-y-2">
                          <div>r = 10 ÷ (12 × 100) = 0.008333</div>
                          <div>n = 10 × 12 = 120 months</div>
                          <div>
                            EMI = 15,00,000 × [0.008333 × (1.008333)
                            <sup>120</sup>] / [(1.008333)<sup>120</sup> − 1]
                          </div>
                          {/* You can omit the numeric simplification or keep it approximate */}
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Monthly EMI (approx):
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹19,800
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Total Interest (moratorium + EMI period):</span>
                          <strong className="text-red-600">
                            Very high due to long tenure and moratorium
                          </strong>
                        </div>
                        <p className="text-slate-600">
                          Paying at least the interest during the moratorium can
                          reduce your effective EMI and total cost
                          significantly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Education Loan Specific Points
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        During moratorium, banks usually charge{' '}
                        <strong>simple interest</strong>; it is added to
                        principal if you do not pay it.
                      </li>
                      <li>
                        EMIs are then calculated on this higher principal using
                        the same standard EMI formula.
                      </li>
                      <li>
                        Under Section 80E,{' '}
                        <strong>100% of the interest paid</strong> is tax
                        deductible for 8 years, which reduces your effective
                        cost.
                      </li>
                      <li>
                        If your tax bracket is 30%, a 10% nominal interest rate
                        effectively costs around 7% after tax.
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    This education loan EMI calculator follows the standard
                    reducing balance method and considers moratorium interest
                    the way most Indian banks structure student loans.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Section 80E Tax Benefit
                </strong>
                Education loan interest is 100% tax deductible for 8 years with
                NO MAXIMUM LIMIT. In 30% tax bracket, effective interest cost
                reduces by 30%. This makes education loans one of the most
                tax-efficient loans in India.
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Education Loan Interest Rates Comparison {updatedLabel}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">Bank</th>
                          <th className="p-3 text-left font-semibold">
                            India Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Abroad Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Max Loan (Abroad)
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Collateral Required
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.50% - 10.50%
                          </td>
                          <td className="p-3">9.50% - 11.50%</td>
                          <td className="p-3">₹1.5 Cr</td>
                          <td className="p-3">Above ₹7.5L</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.50% - 11.00%
                          </td>
                          <td className="p-3">10.50% - 12.50%</td>
                          <td className="p-3">₹1 Cr</td>
                          <td className="p-3">Above ₹7.5L</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.50% - 11.50%
                          </td>
                          <td className="p-3">11.50% - 13.00%</td>
                          <td className="p-3">₹1.2 Cr</td>
                          <td className="p-3">Above ₹7.5L</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            13.70% - 15.20%
                          </td>
                          <td className="p-3">14.50% - 16.00%</td>
                          <td className="p-3">₹75L</td>
                          <td className="p-3">Above ₹4L</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Bank of Baroda</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.85% - 10.15%
                          </td>
                          <td className="p-3">9.85% - 11.50%</td>
                          <td className="p-3">₹1.5 Cr</td>
                          <td className="p-3">Above ₹7.5L</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *Rates vary based on course, institute, loan amount.
                    Top-ranked institutes get lower rates. Girls may get
                    0.25-0.5% concession. Last updated: {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot
                id="education-loan-infeed-1"
                type="banner"
                lazyLoad={true}
              />
            </div>

            {/* Promo Content */}
            <Card className="no-print my-6 border-indigo-200 bg-indigo-50/50 transition-colors hover:bg-indigo-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-indigo-900">
                    Planning to study abroad?
                  </strong>

                  <Link
                    href="/guides/education-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                  >
                    <span>Read our Complete Education Loan Guide (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Benefits of Education Loans
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Comparison */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Study in India vs Study Abroad Loans
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={domesticVsAbroadContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="education-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Education Loan Eligibility Criteria
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>Student:</strong> Indian citizen admitted to
                        recognized institution (UGC/AICTE approved in India,
                        QS/Times ranked abroad)
                      </li>
                      <li>
                        <strong>Age:</strong> Typically 18-35 years (varies by
                        bank)
                      </li>
                      <li>
                        <strong>Co-applicant:</strong> Parent/Guardian mandatory
                        with stable income (salaried/self-employed/retired with
                        pension)
                      </li>
                      <li>
                        <strong>Academic Record:</strong> Minimum 50-60% marks
                        in previous qualifying exam (12th/Graduation)
                      </li>
                      <li>
                        <strong>Admission Proof:</strong> Valid admission
                        letter/offer letter from institution
                      </li>
                      <li>
                        <strong>Collateral:</strong> For loans above ₹7.5 lakhs
                        - property/LIC/FD/NSC worth 100-150% of loan amount
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="education-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Documents */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Documents Required for Education Loan
                    </h2>

                    <div className="grid gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          Student Documents
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>Admission/Offer letter from institution</li>
                          <li>Mark sheets of 10th, 12th, and Graduation</li>
                          <li>
                            Entrance exam scores (GATE/GRE/GMAT/IELTS/TOEFL)
                          </li>
                          <li>Course fee structure and breakdown</li>
                          <li>PAN Card, Aadhaar Card, Passport (for abroad)</li>
                          <li>2 passport-size photographs</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          Co-applicant (Parent/Guardian) Documents
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>PAN Card, Aadhaar Card, Address Proof</li>
                          <li>
                            Last 6 months salary slips (salaried) or 2 years ITR
                            (self-employed)
                          </li>
                          <li>Last 6-12 months bank statements</li>
                          <li>Employment certificate/Business proof</li>
                          <li>Form 16 or Income Certificate</li>
                          <li>
                            Property papers (if offering collateral above ₹7.5L)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Tips */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Tips to Get Best Education Loan Deal
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        Apply early - 4-6 months before course starts to avoid
                        last-minute stress
                      </li>
                      <li>
                        Target top-ranked institutes - banks offer lower rates
                        for QS/Times top 200 universities
                      </li>
                      <li>
                        Compare at least 3-4 banks - rates vary 2-3% between
                        banks for same profile
                      </li>
                      <li>
                        Consider paying interest during moratorium - saves
                        significantly on total interest
                      </li>
                      <li>
                        Check for government subsidies - EWS students may get
                        interest subsidy from Ministry of Education
                      </li>
                      <li>
                        Maintain good academic record - some banks offer rate
                        concessions for merit students
                      </li>
                      <li>
                        Leverage Section 80E benefits - reduces effective
                        interest cost by your tax bracket percentage
                      </li>
                    </ul>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Loan Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                                  General EMI Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate EMI for any type of loan
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/loans/personal-loan/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                                💳
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                                  Personal Loan Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Compare with personal loans (no tax benefit)
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-purple-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* 🎯 AD #6: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="education-loan-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

            {/* FAQ */}
            <section className="no-print mt-12">
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

            {/* 🎯 AD #7: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="education-loan-bottom"
                type="square"
                lazyLoad={true}
              />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #8: SIDEBAR TOP */}
              <AdSlot id="education-loan-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* 🎯 AD #10: SIDEBAR BOTTOM */}
              <AdSlot
                id="education-loan-sidebar-bottom"
                type="box"
                lazyLoad={true}
              />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
