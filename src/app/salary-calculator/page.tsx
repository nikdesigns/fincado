import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SalaryClient from './SalaryClient';
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
import { BookOpen, ArrowRight, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Salary Calculator India - CTC to In-Hand Take Home Pay 2026',
  description:
    'Calculate your exact monthly take-home salary from CTC. Advanced In-hand salary calculator for India with New Tax Regime TDS, PF, and HRA breakdown.',
  keywords: [
    'Salary Calculator',
    'In Hand Salary Calculator',
    'CTC to In Hand',
    'Take Home Salary Calculator',
    'TDS Calculator Salary',
    'PF Deduction Calculator',
    'Gross to Net Salary',
  ],
  alternates: {
    canonical: 'https://fincado.com/salary-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/salary-calculator/',
      'hi-IN': 'https://fincado.com/hi/salary-calculator/',
    },
  },
  openGraph: {
    title: 'CTC to In-Hand Salary Calculator (2026 Updated)',
    description:
      'Calculate your exact monthly take-home salary from CTC. Includes latest New Tax Regime TDS and PF deductions.',
    url: 'https://fincado.com/salary-calculator/',
    type: 'website',
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

/* ---------------- PAGE (Server Component) ---------------- */

export default function SalaryCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>CTC (Cost to Company)</strong> is the total amount an employer spends on you annually, but it is not what you receive in your bank account. 
    Your <strong>In-Hand (Take-Home) Salary</strong> is derived after subtracting the employer's contributions (like Employer PF and Gratuity) to get your Gross Salary, 
    and then further deducting your personal taxes (TDS, Professional Tax) and Employee PF. 
    Compare your tax liability using our <a href="/income-tax-calculator/">Income Tax Calculator</a> to optimize your take-home pay.
  </p>
  `);

  const benefitsContent = autoLinkContent(`
    <p>
      This calculator helps you decode your job offer letter. By knowing your exact monthly take-home pay, 
      you can budget your rent, plan your EMI using our <a href="/emi-calculator/">EMI Calculator</a>, 
      and ensure you are negotiating the right CTC during job transitions.
    </p>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is the difference between CTC and In-Hand Salary?',
      answer:
        'CTC (Cost to Company) is the total amount a company spends on an employee, including Employer PF, gratuity, and insurance. In-Hand (Take Home) salary is what you actually receive in your bank account after deducting Employer PF, Employee PF, Income Tax (TDS), and Professional Tax.',
    },
    {
      id: 'faq-2',
      question: 'How is PF calculated on my salary?',
      answer:
        "Provident Fund (PF) is typically calculated as 12% of your Basic Salary. Both you (Employee) and your company (Employer) contribute 12%. The employer's share is part of your CTC but not your Gross Salary.",
    },
    {
      id: 'faq-3',
      question: 'Why is my In-Hand salary much lower than my CTC?',
      answer:
        'Your in-hand salary is lower because deductions like Employer PF and Gratuity are subtracted before arriving at Gross Salary. From Gross Salary, Employee PF, Professional Tax, and Income Tax (TDS) are further deducted.',
    },
    {
      id: 'faq-4',
      question: 'Does this calculator use the New Tax Regime?',
      answer:
        'Yes, this calculator estimates your Income Tax (TDS) based on the default New Tax Regime, which includes a ₹75,000 standard deduction and tax rebates up to ₹7 Lakhs taxable income.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Salary Calculator',
            url: 'https://fincado.com/salary-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Salary Calculator (CTC to In-Hand)"
        description="Calculate monthly take-home salary from CTC with PF and Tax breakdown. Updated for Budget 2026."
        url="https://fincado.com/salary-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Salary Calculator – CTC to In-Hand Pay" />
            <LanguageToggle path="/hi/salary-calculator" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Salary Calculator (CTC to In-Hand)
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4">
              Decode Your Job Offer
            </span>
          </h1>

          {/* LAST UPDATED BANNER */}
          <div className="flex items-center gap-2 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1">
              ✅ Updated for Budget 2026
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              April 12, 2026
            </span>
            <span className="text-xs">
              • ₹75,000 standard deduction applied
            </span>
          </div>

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="salary-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
                <p>
                  Use Fincado’s <strong>Salary Calculator</strong> to convert your annual CTC into your exact monthly take-home pay. 
                  We automatically break down your Basic Pay, HRA, Provident Fund (PF) deductions, and estimate your Income Tax (TDS) under the latest tax rules.
                </p>
              `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Benefit Highlight Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-brand-400 bg-linear-to-br from-[white] to-brand-50">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">
                      NEW REGIME BENEFIT
                    </div>
                    <div className="text-sm font-medium text-brand-600 mb-2">
                      Standard Deduction
                    </div>
                    <div className="text-3xl font-semibold text-slate-900">
                      ₹75,000
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-400 bg-linear-to-br from-[white] to-brand-50">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">
                      TAX FREE LIMIT
                    </div>
                    <div className="text-sm font-medium text-brand-600 mb-2">
                      Zero Tax Up To
                    </div>
                    <div className="text-3xl font-semibold text-slate-900">
                      ₹7.75L
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-400 bg-linear-to-br from-[white] to-brand-50">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">
                      EPF CONTRIBUTION
                    </div>
                    <div className="text-sm font-medium text-brand-600 mb-2">
                      Employer + Employee
                    </div>
                    <div className="text-3xl font-semibold text-slate-900">
                      24%
                      <span className="text-base font-medium text-slate-600">
                        {' '}
                        of Basic
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR (Client Component) */}
            <SalaryClient />

            <Alert className="mt-6 bg-slate-50/50 border-slate-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <span className="text-slate-900 font-semibold block mb-0.5">
                  Tax Calculation Note
                </span>
                Switch between New and Old Tax Regime using the toggle above the
                calculator.
              </AlertDescription>
            </Alert>

            {/* How is In-Hand Salary Calculated? */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    How is In-Hand Salary Calculated?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      The formula to convert CTC to Net Take-Home Pay involves
                      stripping away employer benefits and personal taxes:
                    </div>
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif text-slate-800">
                        Gross Salary = CTC − Employer PF − Gratuity
                      </div>
                      <div className="text-center text-xl font-serif text-brand-700 mt-4 border-t pt-4">
                        In-Hand Salary = Gross Salary − Employee PF − Income Tax
                        − Professional Tax
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <h4 className="font-semibold text-[#111827] mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Understanding the Components
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        <strong>Employer PF:</strong> 12% of Basic. It is part
                        of your CTC but goes straight to your retirement fund,
                        not your bank account.
                      </li>
                      <li>
                        <strong>Employee PF:</strong> Another 12% of Basic
                        deducted from your Gross Salary.
                      </li>
                      <li>
                        <strong>TDS (Tax Deducted at Source):</strong> Your HR
                        department estimates your annual tax liability and
                        deducts a portion every month.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 💰 AD 2: AFTER RESULT */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="salary-after-calc" type="banner" />
            </div>

            {/* Promo Card */}
            <Card className="no-print my-6 border-brand-200 bg-brand-50 transition-colors hover:bg-brand-100">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-500">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-brand-900">
                    Want to save more tax?
                  </strong>
                  <Link
                    href="/guides/best-tax-saving-options-80c/"
                    className="group inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <span>Read our Section 80C Investment Guide</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* EXPANDED SEO CONTENT */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-12">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is CTC?
                    </h2>
                    <WikiText content={introContent} />
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This Calculator Helps
                    </h3>
                    <WikiText content={benefitsContent} />
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Typical Salary Breakup (as % of CTC)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="text-left p-4 border">Component</th>
                            <th className="text-right p-4 border">% of CTC</th>
                            <th className="text-left p-4 border">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-4 border">Basic Salary</td>
                            <td className="text-right p-4 border font-medium">
                              40–50%
                            </td>
                            <td className="p-4 border text-slate-600">
                              Base pay, used for PF &amp; HRA
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border">HRA</td>
                            <td className="text-right p-4 border font-medium">
                              15–25%
                            </td>
                            <td className="p-4 border text-slate-600">
                              House Rent Allowance
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border">Special Allowance</td>
                            <td className="text-right p-4 border font-medium">
                              10–20%
                            </td>
                            <td className="p-4 border text-slate-600">
                              Flexible component
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border">Employer PF</td>
                            <td className="text-right p-4 border font-medium">
                              12% of Basic
                            </td>
                            <td className="p-4 border text-slate-600">
                              Retirement contribution
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border">Gratuity</td>
                            <td className="text-right p-4 border font-medium">
                              4.81%
                            </td>
                            <td className="p-4 border text-slate-600">
                              Long-term benefit
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      New Tax Regime Slabs 2026
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-brand-50">
                            <th className="text-left p-4 border">
                              Taxable Income
                            </th>
                            <th className="text-right p-4 border">Tax Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-4 border">₹0 – ₹3,00,000</td>
                            <td className="text-right p-4 border text-green-600">
                              0%
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹3,00,001 – ₹6,00,000
                            </td>
                            <td className="text-right p-4 border">5%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹6,00,001 – ₹9,00,000
                            </td>
                            <td className="text-right p-4 border">10%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹9,00,001 – ₹12,00,000
                            </td>
                            <td className="text-right p-4 border">15%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹12,00,001 – ₹15,00,000
                            </td>
                            <td className="text-right p-4 border">20%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">Above ₹15,00,000</td>
                            <td className="text-right p-4 border">30%</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-slate-500 mt-3">
                        + ₹75,000 Standard Deduction • Rebate u/s 87A up to
                        ₹7.75 Lakh taxable income
                      </p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Real Examples (April 2026)
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Card className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-semibold">
                            ₹8 Lakh CTC
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            ₹54,200 / month in-hand
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-semibold">
                            ₹12 Lakh CTC
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            ₹79,800 / month in-hand
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-semibold">
                            ₹20 Lakh CTC
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            ₹1,28,500 / month in-hand
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Professional Tax by State (2026)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="p-4 border text-left">State</th>
                            <th className="p-4 border text-right">Monthly</th>
                            <th className="p-4 border text-right">Annual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-4 border">Maharashtra</td>
                            <td className="p-4 border text-right">₹200</td>
                            <td className="p-4 border text-right">₹2,400</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">Karnataka</td>
                            <td className="p-4 border text-right">₹200</td>
                            <td className="p-4 border text-right">₹2,400</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">Tamil Nadu</td>
                            <td className="p-4 border text-right">₹200</td>
                            <td className="p-4 border text-right">₹2,400</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">West Bengal</td>
                            <td className="p-4 border text-right">₹200</td>
                            <td className="p-4 border text-right">₹2,400</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">Others</td>
                            <td className="p-4 border text-right">₹0 – ₹208</td>
                            <td className="p-4 border text-right">Varies</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Tax &amp; Salary Tools
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                      <Link href="/income-tax-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl">
                                <Image
                                  src="/images/icons/tax.svg"
                                  alt="Tax icon"
                                  width={24}
                                  height={24}
                                  className="w-12 h-12"
                                />
                              </span>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  Income Tax Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Detailed tax calculation for Old vs New Regime
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hra-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <Image
                                src="/images/icons/tax.svg"
                                alt="HRA icon"
                                width={24}
                                height={24}
                                className="w-12 h-12"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  HRA Exemption Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate tax exemption on House Rent
                                  Allowance
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/epf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <Image
                                src="/images/icons/epf.svg"
                                alt="EPF icon"
                                width={24}
                                height={24}
                                className="w-12 h-12"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  EPF Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Estimate your provident fund corpus at
                                  retirement
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/gratuity-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <Image
                                src="/images/icons/tax.svg"
                                alt="Gratuity icon"
                                width={24}
                                height={24}
                                className="w-12 h-12"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  Gratuity Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate gratuity payout when leaving a
                                  company
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
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

            {/* FAQ Section */}
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

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="salary-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
