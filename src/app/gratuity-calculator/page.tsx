import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GratuityClient from './GratuityClient';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { GratuitySchemas } from '@/components/schemas/GratuitySchemas';
import { Info, ArrowRight, Shield, Award } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Gratuity Calculator 2026 – Calculate Gratuity Amount Online',
  description:
    'Calculate gratuity amount as per Payment of Gratuity Act 1972. Free calculator for covered and non-covered employees with tax exemption up to ₹20 lakh.',
  keywords: [
    'Gratuity Calculator',
    'Gratuity Calculation Formula',
    'Payment of Gratuity Act',
    'Gratuity Amount Calculator',
    'Gratuity Eligibility Calculator',
    'Gratuity Tax Calculator',
    'How to Calculate Gratuity',
    'Gratuity Rules 2026',
    'Gratuity Payment Calculator',
    'Employee Gratuity Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/gratuity-calculator/',
  },
  openGraph: {
    title: 'Gratuity Calculator 2026 – Calculate Your Gratuity Amount',
    description:
      'Free gratuity calculator as per Gratuity Act 1972. Calculate gratuity for 5+ years service with tax exemption up to ₹20 lakh.',
    url: 'https://fincado.com/gratuity-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-gratuity-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Gratuity Calculator',
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

export default function GratuityCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Gratuity</strong> is a lump sum payment made by employers to employees as a token 
      of appreciation for their services. Governed by the <strong>Payment of Gratuity Act, 1972</strong>, 
      it becomes payable when an employee completes 5 years of continuous service or upon 
      retirement, resignation, death, or disability.
    </p>
    <p class="mt-4">
      The Act covers establishments with 10 or more employees. Gratuity amount is calculated 
      based on <strong>last drawn salary (Basic + DA)</strong> and years of service. The first 
      ₹20 lakh of gratuity is <strong>completely tax-exempt</strong> under Section 10(10) of 
      the Income Tax Act, making it a valuable retirement benefit.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <p>
      Not all employees are eligible for gratuity. Here are the key eligibility criteria:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Minimum Service:</strong> Completed 5 years of continuous service (240 working days/year counts as 1 year)</li>
      <li><strong>Exception:</strong> Death or disability removes 5-year requirement - gratuity payable immediately</li>
      <li><strong>Coverage:</strong> Establishment must have 10+ employees at any point in preceding 12 months</li>
      <li><strong>Type of Employment:</strong> Applies to factories, mines, oil fields, plantations, ports, railways, shops, educational institutions</li>
      <li><strong>Resignation:</strong> Gratuity payable even on voluntary resignation after 5 years</li>
      <li><strong>Termination for Misconduct:</strong> Employer can withhold gratuity if employee terminated for willful damage, violence, moral turpitude</li>
    </ul>
    <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p class="text-sm text-slate-700">
        <strong>Important:</strong> 240 working days in a year qualifies as 1 completed year. 
        For seasonal workers, 190 days count as 1 year. Maternity leave counts as working days.
      </p>
    </div>
  `);

  const formulaExplanationContent = autoLinkContent(`
    <p>
      Gratuity calculation differs based on whether employer is covered under the Gratuity Act:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">For Covered Establishments (Gratuity Act Applicable):</h4>
    <div class="p-3 bg-slate-50 rounded border border-slate-200 mt-2 font-mono text-sm">
      Gratuity = (Last Drawn Salary × 15 × Years of Service) / 26
    </div>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Last Drawn Salary:</strong> Basic Salary + Dearness Allowance (DA)</li>
      <li><strong>15:</strong> Fixed multiplier as per Gratuity Act</li>
      <li><strong>26:</strong> Number of working days (assuming 26 working days/month)</li>
      <li><strong>Years of Service:</strong> Completed years (6+ months rounds up to 1 year)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">For Non-Covered Establishments (Act Not Applicable):</h4>
    <div class="p-3 bg-slate-50 rounded border border-slate-200 mt-2 font-mono text-sm">
      Gratuity = (Last Drawn Salary × 15 × Years of Service) / 30
    </div>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Uses 30 days/month instead of 26 (results in lower gratuity)</li>
      <li>Applicable to establishments not covered by Act (less than 10 employees)</li>
      <li>Formula can vary based on company policy</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Maximum Gratuity Limit:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>No Upper Limit:</strong> Payment of Gratuity Act has no ceiling on gratuity amount</li>
      <li><strong>Tax Exemption Limit:</strong> First ₹20 lakh is tax-free, excess is taxable</li>
      <li><strong>Government Employees:</strong> Tax exemption limit is ₹25 lakh (higher than private)</li>
    </ul>
  `);

  const taxationContent = autoLinkContent(`
    <p>
      Gratuity taxation under Section 10(10) of Income Tax Act varies by employee type:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. Government Employees:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>100% gratuity received is tax-exempt (no limit)</li>
      <li>Applies to Central, State, Local Government employees</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. Private Sector Employees (Covered by Act):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Tax exemption = <strong>Least of:</strong></li>
      <li className="ml-6">a) Actual gratuity received</li>
      <li className="ml-6">b) ₹20 lakh (maximum exempt limit)</li>
      <li className="ml-6">c) (15 × Last Salary × Years) / 26</li>
      <li>Amount exceeding ₹20 lakh is added to income and taxed as per slab</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. Private Sector Employees (Not Covered by Act):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Tax exemption = <strong>Least of:</strong></li>
      <li className="ml-6">a) Actual gratuity received</li>
      <li className="ml-6">b) ₹20 lakh (maximum exempt limit)</li>
      <li className="ml-6">c) (15 × Last Salary × Years) / 30</li>
      <li className="ml-6">d) ½ month salary × years of service</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>Example:</strong> Gratuity received = ₹25 lakh. Tax-free = ₹20 lakh. 
        Taxable = ₹5 lakh (taxed as per your income tax slab - 30% bracket = ₹1.5L tax).
      </p>
    </div>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      Gratuity becomes payable in the following situations:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Retirement:</strong> Upon reaching superannuation age (typically 58-60 years)</li>
      <li><strong>Resignation:</strong> Voluntary resignation after completing 5 years service</li>
      <li><strong>Retrenchment:</strong> Termination by employer (not due to misconduct) after 5 years</li>
      <li><strong>Death:</strong> Payable to nominee/legal heir even if service < 5 years</li>
      <li><strong>Disability:</strong> Accident or disease rendering employee unfit - 5-year rule waived</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Payment Timeline:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Gratuity must be paid within <strong>30 days</strong> from the date it becomes payable</li>
      <li>Delay beyond 30 days attracts simple interest (not compound) from employer</li>
      <li>Interest rate: As notified by government (currently around 10% per annum)</li>
      <li>Employee can claim gratuity with Form I application</li>
      <li>Employer must acknowledge receipt of application within 15 days</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Forfeiture (Loss of Gratuity):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Full Forfeiture:</strong> If employee terminated for act involving moral turpitude, violence, or causing loss to employer's property</li>
      <li><strong>Partial Forfeiture:</strong> Up to employer discretion for damage/loss caused by employee's willful omission/negligence</li>
      <li><strong>Cannot be Forfeited:</strong> Resignation, poor performance, general misconduct</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'gratuity-faq-1',
      question: 'What is gratuity and when is it payable?',
      answer:
        'Gratuity is a lump sum payment by employer as appreciation for employee service. Payable after 5 years continuous service (240 working days/year) upon retirement, resignation, death, or disability. Governed by Payment of Gratuity Act, 1972 for establishments with 10+ employees.',
    },
    {
      id: 'gratuity-faq-2',
      question: 'How is gratuity calculated?',
      answer:
        'For covered establishments: (Basic + DA) × 15/26 × Years. For non-covered: (Basic + DA) × 15/30 × Years. 6+ months of service rounds up to 1 year. Last drawn salary includes Basic + Dearness Allowance only, not HRA, bonuses, or other allowances.',
    },
    {
      id: 'gratuity-faq-3',
      question: 'Is gratuity taxable?',
      answer:
        'First ₹20 lakh of gratuity is tax-exempt under Section 10(10) for private employees (₹25L for government). Amount exceeding limit is taxable as per income tax slab. Government employees receive 100% tax-free gratuity without limit.',
    },
    {
      id: 'gratuity-faq-4',
      question: 'What is the minimum service required for gratuity?',
      answer:
        '5 years of continuous service (240 working days per year qualifies as 1 year). Exception: Death or disability waives 5-year rule - gratuity payable immediately. Resignation, retirement, retrenchment all require 5 years minimum.',
    },
    {
      id: 'gratuity-faq-5',
      question: 'Can I get gratuity if I resign before 5 years?',
      answer:
        'No, gratuity requires minimum 5 years continuous service. If you resign before completing 5 years, you are not eligible. However, if employment ends due to death or disability, gratuity is payable even with less than 5 years service.',
    },
    {
      id: 'gratuity-faq-6',
      question: 'What is the maximum gratuity amount?',
      answer:
        'No upper limit on gratuity amount as per Payment of Gratuity Act. However, only first ₹20 lakh is tax-exempt. Example: If gratuity = ₹35L, tax-free = ₹20L, taxable = ₹15L. Government employees have ₹25L tax exemption limit.',
    },
    {
      id: 'gratuity-faq-7',
      question: 'Is basic salary or CTC used for gratuity calculation?',
      answer:
        'Only Basic Salary + Dearness Allowance (DA) is used for gratuity calculation, not CTC. HRA, Special Allowances, Bonuses, Incentives, Medical, Conveyance are NOT included. This is as per Payment of Gratuity Act, 1972.',
    },
    {
      id: 'gratuity-faq-8',
      question: 'When must employer pay gratuity?',
      answer:
        'Within 30 days from the date gratuity becomes payable (date of superannuation, resignation acceptance, or discharge date). If delayed beyond 30 days, employer must pay simple interest (~10% p.a.). Employee must apply using Form I.',
    },
    {
      id: 'gratuity-faq-9',
      question: 'Can employer refuse to pay gratuity?',
      answer:
        'Yes, in specific cases: Termination for misconduct involving moral turpitude, violence against employer/property, or willful damage. For general misconduct, poor performance, or resignation, employer CANNOT refuse gratuity after 5 years service.',
    },
    {
      id: 'gratuity-faq-10',
      question: 'What happens to gratuity if employee dies?',
      answer:
        'Gratuity is immediately payable to nominee or legal heir (spouse, children, parents). 5-year service rule waived for death. Full amount is tax-free. Nominee must submit death certificate, Form I claim, and KYC. Payment within 30 days from claim.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Gratuity Calculator',
            url: 'https://fincado.com/gratuity-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Gratuity Calculator"
        description="Calculate gratuity amount as per Payment of Gratuity Act 1972 with tax exemption up to ₹20 lakh for 5+ years service."
        url="https://fincado.com/gratuity-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <GratuitySchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Gratuity Calculator" />
            <LanguageToggle path="/hi/gratuity-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Gratuity Calculator (Payment of Gratuity Act 1972)
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                Calculate gratuity amount with ₹20 lakh tax exemption
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="gratuity-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      MINIMUM SERVICE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Required for eligibility
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5 years
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        service
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      TAX EXEMPTION
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Tax-free gratuity limit
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹20L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        max
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      PAYMENT TIMELINE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Employer must pay within
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      30 days
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        max
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <GratuityClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="gratuity-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Eligibility Requirement
                </strong>
                Gratuity is payable only after completing 5 years of continuous
                service (240 working days per year). Exception: Death or
                disability removes this requirement.
              </AlertDescription>
            </Alert>

            {/* ✅ GRATUITY FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Gratuity Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      Gratuity calculation depends on whether employer is
                      covered under the Payment of Gratuity Act, 1972:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          For Covered Establishments (Act Applicable)
                        </div>
                        <div className="text-lg font-serif">
                          Gratuity = (Last Salary × 15 × Years) / 26
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          For Non-Covered Establishments (Act Not Applicable)
                        </div>
                        <div className="text-lg font-serif">
                          Gratuity = (Last Salary × 15 × Years) / 30
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-28">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          Last Salary
                        </span>
                        <span>
                          = Basic Salary + Dearness Allowance (DA) only
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          15
                        </span>
                        <span>
                          = Fixed multiplier as per Payment of Gratuity Act
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          26
                        </span>
                        <span>
                          = Working days per month (for covered establishments)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          30
                        </span>
                        <span>
                          = Days per month (for non-covered establishments)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          Years
                        </span>
                        <span>
                          = Completed years of service (6+ months rounds to 1
                          year)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> HRA, Special Allowances, Bonuses,
                        and other components are NOT included in gratuity
                        calculation - only Basic + DA.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: ₹50,000 Basic Salary for 10 Years (Covered
                      Establishment)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Basic Salary + DA:</strong>
                        </div>
                        <div>₹50,000/month</div>

                        <div>
                          <strong>Years of Service:</strong>
                        </div>
                        <div>10 years</div>

                        <div>
                          <strong>Establishment Type:</strong>
                        </div>
                        <div>Covered (26 working days)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Calculation Steps:
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>Gratuity = (50,000 × 15 × 10) / 26</div>
                          <div>Gratuity = 75,00,000 / 26</div>
                          <div>Gratuity ≈ ₹2,88,462</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">Tax Treatment:</strong>
                        <div className="ml-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Gratuity Received:</span>
                            <strong>₹2,88,462</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Exempt (Max ₹20L):</span>
                            <strong className="text-emerald-700">
                              ₹2,88,462
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Amount:</span>
                            <strong>₹0</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-emerald-900">
                          Result: 100% Tax-Free Gratuity
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Since gratuity amount (₹2.88L) is less than tax
                          exemption limit (₹20L), entire amount is tax-free
                          under Section 10(10).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High Amount Example */}
                  <div className="p-5 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      Example: ₹2 Lakh Basic Salary for 25 Years
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="ml-4 space-y-2 font-mono text-sm">
                        <div>Gratuity = (2,00,000 × 15 × 25) / 26</div>
                        <div>Gratuity = 7,50,00,000 / 26</div>
                        <div>Gratuity ≈ ₹28,84,615</div>
                      </div>

                      <div className="pt-3 border-t border-amber-300">
                        <strong className="block mb-2">Tax Treatment:</strong>
                        <div className="ml-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Gratuity Received:</span>
                            <strong>₹28,84,615</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Exempt (Max ₹20L):</span>
                            <strong className="text-emerald-700">
                              ₹20,00,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Amount:</span>
                            <strong className="text-amber-700">
                              ₹8,84,615
                            </strong>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600 mt-2">
                            <span>Tax @ 30% bracket:</span>
                            <strong>₹2,65,385</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-amber-500">
                        <div className="text-base font-semibold text-amber-900">
                          Result: Partially Taxable Gratuity
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Amount exceeding ₹20 lakh is taxable as salary income
                          as per your tax slab.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    Gratuity calculation is governed by Payment of Gratuity Act,
                    1972. Employer cannot reduce calculated amount. Tax
                    exemption under Section 10(10) is ₹20L for private
                    employees, ₹25L for government employees.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-blue-200 bg-blue-50/50 transition-colors hover:bg-blue-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-blue-900">
                    Want to calculate your EPF corpus?
                  </strong>
                  <Link
                    href="/epf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>
                      Use EPF Calculator for retirement savings planning
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Gratuity?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Gratuity Eligibility Criteria
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={eligibilityContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="gratuity-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Gratuity Calculation Formula Explained
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={formulaExplanationContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Gratuity: Covered vs Non-Covered Establishments
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Aspect</TableHead>
                        <TableHead className="text-left">
                          Covered (Act Applicable)
                        </TableHead>
                        <TableHead className="text-left">
                          Non-Covered (Act Not Applicable)
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Applicability
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          10+ employees
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Less than 10 employees
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Formula
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          (Salary × 15/26 × Years)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          (Salary × 15/30 × Years)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Working Days/Month
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          26 days
                        </TableCell>
                        <TableCell className="text-slate-700">
                          30 days
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Gratuity Amount
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Higher (26 days basis)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Lower (30 days basis)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Minimum Service
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5 years (240 days/year)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          As per company policy
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Maximum Limit
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          No ceiling
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Company policy
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax Exemption
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹20L (Section 10(10))
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹20L (Section 10(10))
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Payment Timeline
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Within 30 days (mandatory)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          As per company policy
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Death/Disability
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          5-year rule waived
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Company policy
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Key Difference:</strong> Covered establishments use
                    26 working days resulting in ~15% higher gratuity compared
                    to non-covered (30 days).
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Gratuity Taxation Rules
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxationContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  When and How Gratuity is Paid
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalContent} />
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this Gratuity Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter your monthly basic salary + dearness allowance (DA)
                    amount.
                  </li>
                  <li>
                    Input total years of completed service (minimum 5 years
                    required).
                  </li>
                  <li>
                    Select whether your employer is covered under the Payment of
                    Gratuity Act (most companies with 10+ employees are
                    covered).
                  </li>
                  <li>
                    View total gratuity amount calculated using the appropriate
                    formula (26 days for covered, 30 days for non-covered).
                  </li>
                  <li>
                    Check tax-exempt portion (up to ₹20 lakh) and taxable amount
                    (if any).
                  </li>
                  <li>
                    Save your gratuity calculation for future reference or share
                    via WhatsApp.
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Retirement Benefit Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/epf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💼
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              EPF Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate Employee Provident Fund with 8.25%
                              interest.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate EPF</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/retirement-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            🏖️
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              Retirement Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Plan complete retirement corpus and monthly SIP
                              needed.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Plan Retirement</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="gratuity-before-faq" type="leaderboard" lazyLoad />
            </div>

            {/* FAQs */}
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

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="gratuity-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="gratuity-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="gratuity-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
