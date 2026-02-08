import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EPFClient from './EPFClient';
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
import { EPFSchemas } from '@/components/schemas/EPFSchemas';
import { Info, Briefcase, ArrowRight, Shield, TrendingUp } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'EPF Calculator 2026 – Calculate Employee Provident Fund Returns',
  description:
    'Calculate EPF maturity amount with 8.25% interest rate. Free EPF calculator for employee and employer contributions with 100% tax-free withdrawals under EEE status.',
  keywords: [
    'EPF Calculator',
    'Employee Provident Fund Calculator',
    'PF Calculator',
    'EPF Interest Calculator',
    'EPF Maturity Calculator',
    'EPF Withdrawal Calculator',
    'EPFO Calculator',
    'Provident Fund Calculator',
    'EPF Balance Calculator',
    'EPF Tax Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/epf-calculator/',
  },
  openGraph: {
    title: 'EPF Calculator 2026 – Calculate Your Provident Fund Corpus',
    description:
      'Free EPF calculator with 8.25% interest rate. Calculate employee and employer contributions, maturity amount, and tax-free withdrawal benefits.',
    url: 'https://fincado.com/epf-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-epf-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado EPF Calculator',
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

export default function EPFCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Employee Provident Fund (EPF)</strong> is a mandatory retirement savings scheme 
      for salaried employees in India, managed by the Employees' Provident Fund Organisation 
      (EPFO). Both employee and employer contribute 12% of basic salary + DA monthly, building 
      a substantial retirement corpus with <strong>tax-free compounding</strong>.
    </p>
    <p class="mt-4">
      EPF offers <strong>8.25% annual interest</strong> (FY 2025-26), which is higher than most 
      fixed-income products and completely tax-free under EEE (Exempt-Exempt-Exempt) status. 
      The scheme covers 7+ crore employees across India, making it the largest retirement 
      savings program in the country.
    </p>
  `);

  const keyFeaturesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Mandatory Scheme:</strong> Applicable to establishments with 20+ employees (Basic + DA ≤ ₹15,000)</li>
      <li><strong>Dual Contribution:</strong> Employee 12% + Employer 12% (3.67% EPF + 8.33% EPS)</li>
      <li><strong>High Interest:</strong> 8.25% p.a. (FY 2025-26) with monthly compounding</li>
      <li><strong>EEE Status:</strong> Contribution deductible, interest tax-free, withdrawal tax-free</li>
      <li><strong>Liquidity Options:</strong> Partial withdrawal for housing, medical, education after conditions</li>
      <li><strong>Portability:</strong> Transfer EPF across jobs seamlessly via UAN (Universal Account Number)</li>
      <li><strong>Insurance Cover:</strong> EDLI (Employee Deposit Linked Insurance) up to ₹7 lakh</li>
      <li><strong>Pension Benefit:</strong> EPS (Employee Pension Scheme) provides monthly pension from employer's 8.33%</li>
    </ul>
  `);

  const contributionBreakdownContent = autoLinkContent(`
    <p>
      Understanding EPF contribution split between employee and employer:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">Employee Contribution (12% of Basic + DA):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>100% goes to EPF account for retirement corpus</li>
      <li>Deductible under Section 80C up to ₹1.5 lakh</li>
      <li>Voluntary VPF (Voluntary Provident Fund) can increase contribution beyond 12%</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Employer Contribution (12% of Basic + DA):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>3.67% goes to EPF:</strong> Added to employee's EPF account for retirement corpus</li>
      <li><strong>8.33% goes to EPS:</strong> Employee Pension Scheme for monthly pension after retirement (not included in EPF corpus)</li>
      <li><strong>0.5% goes to EDLI:</strong> Employee Deposit Linked Insurance for life cover</li>
      <li><strong>0.01% admin charges:</strong> EPFO administrative expenses</li>
    </ul>
    <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p class="text-sm text-slate-700">
        <strong>Example:</strong> If basic salary = ₹40,000, employee contributes ₹4,800 (12%), 
        employer adds ₹1,468 (3.67%) to EPF. Total ₹6,268/month builds EPF corpus. Employer's 
        ₹3,332 (8.33%) goes to EPS for pension.
      </p>
    </div>
  `);

  const withdrawalRulesContent = autoLinkContent(`
    <p>
      EPF offers flexible withdrawal options based on employment duration and purpose:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. Full Withdrawal (100% Tax-Free):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>After retirement (age 58) or resignation with 2 months unemployment</li>
      <li>100% corpus including interest is tax-free under EEE status</li>
      <li>No TDS if continuous employment ≥5 years</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. Partial Withdrawal (Advance):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Medical Emergency:</strong> Withdraw up to 6 months salary for hospitalization (self/family)</li>
      <li><strong>Home Purchase/Construction:</strong> Up to 90% corpus after 5 years for buying/building house</li>
      <li><strong>Home Loan Repayment:</strong> Up to 90% corpus for repaying housing loan</li>
      <li><strong>Marriage/Education:</strong> Up to 50% corpus after 7 years for self/children</li>
      <li><strong>Pre-Retirement (1 year before):</strong> Up to 90% corpus can be withdrawn</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. Job Change Transfer:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Transfer EPF from old employer to new employer seamlessly via UAN</li>
      <li>Online transfer through EPFO portal - no paperwork required</li>
      <li>Maintains continuity for 5-year tax exemption rule</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">4. Tax on Early Withdrawal:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Withdrawal before 5 years continuous service attracts TDS (10% if PAN available, 34.6% if no PAN)</li>
      <li>TDS not applicable if withdrawal reason: ill health, business shutdown, employment termination</li>
      <li>Interest earned also becomes taxable if withdrawn before 5 years</li>
    </ul>
  `);

  const vpfContent = autoLinkContent(`
    <p>
      <strong>Voluntary Provident Fund (VPF)</strong> allows employees to contribute more than 
      mandatory 12% to EPF for higher retirement corpus:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Higher Contribution:</strong> Contribute up to 100% of basic salary (beyond mandatory 12%)</li>
      <li><strong>Same Interest Rate:</strong> VPF earns same 8.25% as regular EPF with monthly compounding</li>
      <li><strong>Tax Deduction:</strong> VPF contributions deductible under 80C (within ₹1.5L limit)</li>
      <li><strong>No Employer Matching:</strong> Employer doesn't contribute additional amount on VPF</li>
      <li><strong>Same Withdrawal Rules:</strong> VPF follows same rules as EPF - tax-free after 5 years</li>
      <li><strong>Higher Returns than FD:</strong> VPF @8.25% beats bank FD (6-7%) with tax-free interest</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>Who Should Use VPF:</strong> Conservative investors seeking safe, tax-free returns 
        higher than FD. Ideal for those in high tax brackets (30%) who've exhausted other 80C 
        instruments and want guaranteed returns.
      </p>
    </div>
  `);

  const faqItems = [
    {
      id: 'epf-faq-1',
      question: 'What is Employee Provident Fund (EPF)?',
      answer:
        'EPF is a mandatory retirement savings scheme for salaried employees. Both employee and employer contribute 12% of basic salary monthly. EPF earns 8.25% interest (FY 2025-26) with monthly compounding. Withdrawal after 5 years is 100% tax-free under EEE status.',
    },
    {
      id: 'epf-faq-2',
      question: 'How is EPF contribution calculated?',
      answer:
        'EPF contribution = 12% of (Basic Salary + Dearness Allowance). Employee contributes 12% which goes to EPF account. Employer contributes 12%: 3.67% to EPF, 8.33% to EPS (pension), 0.5% to EDLI (insurance), 0.01% admin charges. Total EPF corpus gets employee 12% + employer 3.67% = 15.67% monthly.',
    },
    {
      id: 'epf-faq-3',
      question: 'What is current EPF interest rate?',
      answer:
        'Current EPF interest rate is 8.25% per annum for FY 2025-26. Interest is calculated monthly but credited annually to EPF account. EPFO reviews and announces EPF rate every financial year. Historical rates: FY 2024-25 (8.25%), FY 2023-24 (8.15%), FY 2022-23 (8.10%).',
    },
    {
      id: 'epf-faq-4',
      question: 'Is EPF withdrawal tax-free?',
      answer:
        'EPF follows EEE (Exempt-Exempt-Exempt) status: (1) Contribution deductible under 80C, (2) Interest earned is tax-free, (3) Withdrawal after 5 years continuous service is 100% tax-free. Early withdrawal before 5 years attracts TDS (10% with PAN, 34.6% without PAN) and interest becomes taxable.',
    },
    {
      id: 'epf-faq-5',
      question: 'Can I withdraw EPF before 5 years?',
      answer:
        'Yes, but it attracts tax. Withdrawal before 5 years service makes corpus taxable (10% TDS if PAN, 34.6% if no PAN). Exceptions without tax: Job termination due to ill health, business shutdown, employer discontinuation. Partial withdrawal allowed for housing, medical, education after specific tenure.',
    },
    {
      id: 'epf-faq-6',
      question: 'What is difference between EPF and EPS?',
      answer:
        "EPF (Employee Provident Fund) is retirement corpus from employee 12% + employer 3.67%. Lump sum withdrawal at retirement. EPS (Employee Pension Scheme) is monthly pension from employer's 8.33%. Minimum 10 years service for pension eligibility. EPF is corpus, EPS is lifelong monthly income.",
    },
    {
      id: 'epf-faq-7',
      question: 'How to transfer EPF to new employer?',
      answer:
        'Login to EPFO portal using UAN → Services → One Member One EPF Account → Select old and new employer → Submit claim. Transfer is online, automatic, and instant. No paperwork needed. Maintains service continuity for 5-year tax exemption. Can check status online using UAN.',
    },
    {
      id: 'epf-faq-8',
      question: 'What is VPF (Voluntary Provident Fund)?',
      answer:
        'VPF allows contributing more than mandatory 12% to EPF (up to 100% of basic salary). Earns same 8.25% interest as EPF with tax-free returns. Eligible for 80C deduction (within ₹1.5L limit). No employer matching on VPF. Best for conservative investors seeking safe, tax-free returns higher than FD.',
    },
    {
      id: 'epf-faq-9',
      question: 'Can I check EPF balance online?',
      answer:
        'Yes, multiple ways: (1) EPFO portal - Login with UAN at unifiedportal-mem.epfindia.gov.in, (2) Umang App - Download and check via UAN, (3) SMS - Send EPFOHO UAN ENG to 7738299899, (4) Missed Call - Give missed call to 9966044425 from registered mobile. Instant balance check 24/7.',
    },
    {
      id: 'epf-faq-10',
      question: 'What happens to EPF after death?',
      answer:
        'EPF corpus goes to nominee (spouse, children, or registered nominee) immediately. Nominee must submit death certificate, claim form (Form 20), and KYC. Full corpus including interest is paid tax-free. EDLI (insurance) also pays ₹7 lakh (max) to nominee. No TDS on death claim withdrawals.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'EPF Calculator',
            url: 'https://fincado.com/epf-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="EPF (Employee Provident Fund) Calculator"
        description="Calculate EPF maturity amount with 8.25% interest rate. Employee and employer contributions with 100% tax-free withdrawals."
        url="https://fincado.com/epf-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <EPFSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EPF Calculator" />
            <LanguageToggle path="/hi/epf-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                EPF Calculator (Employee Provident Fund)
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                Calculate your retirement corpus with 8.25% tax-free returns
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="epf-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      INTEREST RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      FY 2025-26 (Monthly compounding)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.25%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      TAX STATUS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Contribution, Interest, Withdrawal
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      EEE
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        exempt
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      CONTRIBUTION
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Employee + Employer to EPF
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      15.67%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        total
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <EPFClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="epf-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Tax-Free Benefit
                </strong>
                EPF follows EEE status - contributions are tax-deductible (80C),
                interest earned is tax-free, and withdrawals after 5 years are
                100% tax-exempt. One of the best retirement savings instruments
                in India!
              </AlertDescription>
            </Alert>

            {/* ✅ EPF FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    EPF Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      EPF corpus is calculated using compound interest formula
                      with monthly contributions from both employee and
                      employer:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          Monthly Contributions
                        </div>
                        <div className="text-lg font-serif space-y-1">
                          <div>Employee Contribution = (Basic + DA) × 12%</div>
                          <div>
                            Employer Contribution (EPF) = (Basic + DA) × 3.67%
                          </div>
                          <div>Total Monthly = Employee + Employer</div>
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          EPF Maturity Value
                        </div>
                        <div className="text-lg font-serif">
                          FV = M × [(1 + r)<sup>n</sup> - 1] / r × (1 + r)
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          FV
                        </span>
                        <span>= Future value (EPF maturity corpus in ₹)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          M
                        </span>
                        <span>
                          = Total monthly contribution (employee + employer in
                          ₹)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Monthly interest rate (annual rate ÷ 12 ÷ 100)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          n
                        </span>
                        <span>= Total months of employment (years × 12)</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> Employer&apos;s 8.33%
                        contribution goes to EPS (Employee Pension Scheme) for
                        monthly pension, not included in EPF corpus calculation.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: ₹40,000 Basic Salary for 20 Years
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Basic Salary + DA:</strong>
                        </div>
                        <div>₹40,000/month</div>

                        <div>
                          <strong>Employment Period:</strong>
                        </div>
                        <div>20 years (240 months)</div>

                        <div>
                          <strong>EPF Interest Rate:</strong>
                        </div>
                        <div>8.25% p.a.</div>

                        <div>
                          <strong>Employee Contribution:</strong>
                        </div>
                        <div>12%</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Monthly Contributions
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>Employee = 40,000 × 12% = ₹4,800/month</div>
                          <div>
                            Employer (EPF) = 40,000 × 3.67% = ₹1,468/month
                          </div>
                          <div>Total Monthly (M) = 4,800 + 1,468 = ₹6,268</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate Monthly Interest Rate
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>r = 8.25% ÷ 12 ÷ 100 = 0.006875</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Calculate Total Months
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>n = 20 years × 12 = 240 months</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 4: Apply Future Value Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 6,268 × [(1.006875)<sup>240</sup> - 1] /
                            0.006875 × 1.006875
                          </div>
                          <div>
                            FV = 6,268 × [5.109 - 1] / 0.006875 × 1.006875
                          </div>
                          <div>FV = 6,268 × 597.61 × 1.006875</div>
                          <div>FV ≈ ₹37,68,900</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            EPF Corpus Breakdown:
                          </div>
                          <div className="flex justify-between">
                            <span>Total Investment (20 years):</span>
                            <strong className="text-slate-900">
                              ₹15,04,320
                            </strong>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600">
                            <span className="ml-4">Employee Share (12%):</span>
                            <span>₹11,52,000</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600">
                            <span className="ml-4">
                              Employer Share (3.67%):
                            </span>
                            <span>₹3,52,320</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Total EPF Corpus:</span>
                            <strong className="text-blue-700">
                              ₹37,68,900
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest Earned:</span>
                            <strong className="text-emerald-700">
                              ₹22,64,580
                            </strong>
                          </div>
                          <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
                            <span className="text-emerald-900">Returns:</span>
                            <strong className="text-emerald-700">150%</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Tax Benefit:</strong> All ₹37.69 lakh is 100%
                          tax-free at withdrawal after 5 years. Additionally,
                          annual contribution of ₹57,600 is deductible under
                          Section 80C, saving ₹17,280/year in taxes (30%
                          bracket).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contribution Split */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Understanding 12% Employer Contribution Split
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        Employer&apos;s 12% contribution is distributed across
                        multiple schemes:
                      </p>
                      <div className="p-3 bg-white rounded border border-purple-200 mt-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>EPF (Provident Fund):</span>
                            <strong>3.67%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>EPS (Pension Scheme):</span>
                            <strong>8.33%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>EDLI (Life Insurance):</span>
                            <strong>0.50%</strong>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600">
                            <span>Admin Charges:</span>
                            <strong>0.01%</strong>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-semibold">
                            <span>Total:</span>
                            <strong>12.51%</strong>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        Only 3.67% from employer goes to EPF corpus. EPS 8.33%
                        provides monthly pension separately.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    EPF interest rate is reviewed annually by EPFO. Historical
                    rates and actual corpus may vary based on government
                    notifications. Calculations assume continuous employment
                    without withdrawals.
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
                    Want higher retirement corpus?
                  </strong>
                  <Link
                    href="/retirement-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>
                      Use Retirement Calculator to plan complete retirement
                      strategy
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
                  What is Employee Provident Fund (EPF)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Features of EPF
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={keyFeaturesContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="epf-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF Contribution Breakdown: Employee vs Employer
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={contributionBreakdownContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF vs PPF vs NPS Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">EPF</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">NPS</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Interest Rate
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          8.25% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          10-12% p.a.
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax Status
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% tax-free)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% tax-free)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          EET (60% tax-free)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Lock-in Period
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5 years (for tax exemption)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Till age 60
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Contribution Limit
                        </TableCell>
                        <TableCell className="text-slate-700">
                          12% of basic (mandatory)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹500 - ₹1.5L/year
                        </TableCell>
                        <TableCell className="text-slate-700">
                          No limit
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Employer Contribution
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (3.67% to EPF)
                        </TableCell>
                        <TableCell className="text-slate-700">No</TableCell>
                        <TableCell className="text-slate-700">
                          Yes (for govt/corporates)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Partial Withdrawal
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (housing, medical)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Limited (after 5 years)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Limited (25% max)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Eligibility
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Salaried employees only
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          All Indian citizens
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          All citizens 18-70
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Investment Type
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Fixed (Govt backed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Fixed (Govt bonds)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Market-linked (E/C/G)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Best For
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Salaried with employer
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Safe tax-free savings
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Extra ₹50k tax benefit
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Verdict:</strong> EPF is best for salaried
                    employees due to employer matching (3.67%), higher interest
                    (8.25%), and 100% tax-free status. Combine with NPS for
                    extra ₹50k tax benefit and PPF for diversification.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF Withdrawal Rules and Tax Implications
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalRulesContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  VPF (Voluntary Provident Fund) - Boost Your Savings
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={vpfContent} />
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this EPF Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter your monthly basic salary + dearness allowance (DA)
                    amount.
                  </li>
                  <li>
                    Set your contribution percentage (default 12%, can increase
                    for VPF).
                  </li>
                  <li>
                    Input expected employment period in years (5-40 years).
                  </li>
                  <li>
                    Click <strong>&quot;Show Advanced Options&quot;</strong> to
                    adjust EPF interest rate (current: 8.25% for FY 2025-26).
                  </li>
                  <li>
                    View estimated EPF corpus at retirement with employee and
                    employer share breakdown.
                  </li>
                  <li>
                    Check monthly contributions from your side and
                    employer&apos;s side.
                  </li>
                  <li>
                    Review total interest earned over the employment period.
                  </li>
                  <li>
                    Save your EPF plan or share on WhatsApp for future
                    reference.
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Retirement Planning Tools
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              PPF Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate Public Provident Fund with 7.1% tax-free
                              returns.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Calculate PPF</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/nps-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💼
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              NPS Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              National Pension System with extra ₹50k tax
                              benefit.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate NPS</span>
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
              <AdSlot id="epf-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="epf-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="epf-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="epf-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
