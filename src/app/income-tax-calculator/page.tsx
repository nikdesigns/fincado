import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import IncomeTaxClient from './IncomeTaxClient';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { IncomeTaxSchemas } from '@/components/schemas/IncomeTaxSchemas';
import {
  BadgeCheck,
  Scale,
  FileText,
  Info,
  TrendingDown,
  ArrowRight,
  Receipt,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Income Tax Calculator 2026 – Compare Old vs New Regime | FY 2025-26',
  description:
    'Calculate Income Tax for FY 2025-26 & FY 2026-27 with instant Old vs New Regime comparison. Check tax slabs, 80C deductions, HRA exemption, and get personalized recommendation.',
  keywords: [
    'Income Tax Calculator India',
    'Tax Calculator 2026',
    'New vs Old Tax Regime Calculator',
    'FY 2025-26 Tax Slabs',
    'AY 2026-27 Income Tax',
    'Section 80C Calculator',
    'Salary Tax Calculator',
    'Budget 2026 Tax Changes',
  ],
  alternates: {
    canonical: 'https://fincado.com/income-tax-calculator/',
  },
  openGraph: {
    title: 'Income Tax Calculator 2026 – Old vs New Regime Comparison',
    description:
      'Free Income Tax Calculator with instant regime comparison. Calculate tax for FY 2025-26 & FY 2026-27, optimize deductions, and save tax.',
    url: 'https://fincado.com/income-tax-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-income-tax-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Income Tax Calculator',
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'tax-faq-1',
    question: 'Which tax regime is better: Old or New?',
    answer:
      'New Regime is better if your deductions (80C + HRA + home loan interest) are less than ₹3.75 lakhs. Old Regime is better if you have high deductions (home loan, HRA, 80C all maxed out). Use our calculator to compare both based on your actual income and deductions.',
  },
  {
    id: 'tax-faq-2',
    question: 'Can I switch between Old and New Regime every year?',
    answer:
      'Yes. Salaried individuals can switch between Old and New Tax Regime every financial year while filing ITR. However, taxpayers with business income can switch only once in their lifetime.',
  },
  {
    id: 'tax-faq-3',
    question: 'Does New Regime allow HRA exemption?',
    answer:
      'No. HRA exemption, LTA (Leave Travel Allowance), Section 80C, 80D, home loan interest deduction are NOT allowed under New Tax Regime. Only Standard Deduction of ₹75,000 is allowed.',
  },
  {
    id: 'tax-faq-4',
    question: 'What is Standard Deduction in Income Tax?',
    answer:
      'Standard Deduction is flat deduction available without any proof. Old Regime: ₹50,000. New Regime: ₹75,000. It applies to salaried individuals and pensioners automatically.',
  },
  {
    id: 'tax-faq-5',
    question: 'What is Section 87A rebate?',
    answer:
      'Section 87A provides tax rebate for low-income taxpayers. New Regime: Full tax rebate if taxable income ≤ ₹7 lakhs (zero tax). Old Regime: Full tax rebate if taxable income ≤ ₹5 lakhs (zero tax).',
  },
  {
    id: 'tax-faq-6',
    question: 'What is Health & Education Cess?',
    answer:
      'Health & Education Cess is additional 4% tax levied on total income tax liability (after rebate and surcharge). It applies to both Old and New Regime. Example: Tax = ₹1,00,000 → Cess = ₹4,000 → Total = ₹1,04,000.',
  },
  {
    id: 'tax-faq-7',
    question: 'When is surcharge applicable on income tax?',
    answer:
      'Surcharge applies on income above ₹50 lakhs: 10% surcharge for ₹50L-₹1Cr, 15% for ₹1Cr-₹2Cr, 25% for ₹2Cr-₹5Cr, 37% for ₹5Cr+. Surcharge is calculated on income tax (before cess). Not included in basic calculator.',
  },
  {
    id: 'tax-faq-8',
    question: 'What deductions are allowed under Section 80C?',
    answer:
      'Section 80C allows deduction up to ₹1.5 lakhs for: EPF, PPF, ELSS mutual funds, NSC, life insurance premium, home loan principal, Sukanya Samriddhi Yojana, tuition fees. Applies only to Old Regime.',
  },
  {
    id: 'tax-faq-9',
    question: 'Is EPF contribution included in gross salary?',
    answer:
      'Employee EPF contribution (12% of basic) is deducted from gross salary before tax calculation under Section 80C. Employer EPF contribution is NOT included in gross salary (tax-free up to ₹7.5L/year).',
  },
  {
    id: 'tax-faq-10',
    question: 'Did Budget 2026 change income tax slabs?',
    answer:
      'Budget 2026 retained existing tax slabs for both Old and New Regime. Standard Deduction remains ₹75,000 for New Regime. No new changes were introduced for FY 2026-27.',
  },
];

/* ---------------- PAGE ---------------- */
export default function IncomeTaxPage() {
  const introContent = autoLinkContent(`
    <p>
      The <strong>Income Tax Calculator</strong> helps you calculate exact tax liability 
      for Assessment Year (AY) 2026-27 and 2027-28 covering Financial Years 2025-26 and 
      2026-27. It automatically compares <strong>Old Tax Regime</strong> (with deductions 
      like 80C, HRA, home loan) and <strong>New Tax Regime</strong> (lower rates, higher 
      standard deduction) to recommend the best option.
    </p>
    <p class="mt-4">
      The calculator includes age-based exemptions for senior citizens, Section 87A rebate, 
      Health & Education Cess (4%), and provides instant regime comparison with detailed 
      tax breakdown.
    </p>
  `);

  const howTaxCalculatedContent = autoLinkContent(`
    <p>
      Income tax in India is calculated using <strong>progressive tax slabs</strong> where 
      different portions of income are taxed at different rates. Here's the step-by-step process:
    </p>
    <ol class="list-decimal pl-6 space-y-2 mt-3">
      <li><strong>Calculate Gross Total Income:</strong> Add salary, house property income, capital gains, other sources</li>
      <li><strong>Deduct Standard Deduction:</strong> ₹50,000 (Old) or ₹75,000 (New) for salaried individuals</li>
      <li><strong>Apply Chapter VIA Deductions:</strong> 80C (₹1.5L), 80D (₹25-50k), HRA, home loan interest (Old Regime only)</li>
      <li><strong>Calculate Taxable Income:</strong> Gross Income - Standard Deduction - Chapter VIA Deductions</li>
      <li><strong>Apply Tax Slabs:</strong> Calculate tax on each slab portion (5%, 10%, 15%, 20%, 30%)</li>
      <li><strong>Check Section 87A Rebate:</strong> Full rebate if income ≤ ₹7L (New) or ≤ ₹5L (Old)</li>
      <li><strong>Add Surcharge:</strong> If income exceeds ₹50 lakhs (10-37% depending on income)</li>
      <li><strong>Add Health & Education Cess:</strong> 4% on (Tax + Surcharge)</li>
    </ol>
  `);

  const deductionsContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Major Deductions (Old Regime Only):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Section 80C (up to ₹1.5 lakhs):</strong> EPF, PPF, ELSS, life insurance, NSC, home loan principal, tuition fees</li>
      <li><strong>Section 80CCD(1B) (up to ₹50,000):</strong> Additional deduction for NPS contribution (over and above 80C)</li>
      <li><strong>Section 80D (up to ₹25-50k):</strong> Health insurance premium (self: ₹25k, parents: ₹25k, senior parents: ₹50k)</li>
      <li><strong>Section 24(b) (up to ₹2 lakhs):</strong> Home loan interest for self-occupied property</li>
      <li><strong>Section 10(13A):</strong> HRA exemption (least of: actual HRA, rent - 10% of salary, 50% of salary for metro/40% non-metro)</li>
      <li><strong>Section 80TTA/TTB (up to ₹10-50k):</strong> Interest on savings account (₹10k general, ₹50k senior citizens)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Deductions in New Regime:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Standard Deduction:</strong> ₹75,000 (only this is allowed)</li>
      <li><strong>Employer NPS Contribution:</strong> Under Section 80CCD(2) (up to 10% of salary)</li>
      <li><strong>NOT Allowed:</strong> 80C, 80D, HRA, LTA, home loan interest, 80G donations, etc.</li>
    </ul>
  `);

  const surchargeContent = autoLinkContent(`
    <p>
      <strong>Surcharge</strong> is additional tax levied on high-income earners. It is 
      calculated on income tax amount (before cess) and then 4% cess is added on total:
    </p>
    <div class="mt-3 overflow-x-auto">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-slate-100">
            <th class="border p-2 text-left">Income Range</th>
            <th class="border p-2 text-left">Surcharge Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border p-2">Up to ₹50 lakhs</td><td class="border p-2">No Surcharge</td></tr>
          <tr><td class="border p-2">₹50L - ₹1 Crore</td><td class="border p-2">10%</td></tr>
          <tr><td class="border p-2">₹1 Cr - ₹2 Crore</td><td class="border p-2">15%</td></tr>
          <tr><td class="border p-2">₹2 Cr - ₹5 Crore</td><td class="border p-2">25%</td></tr>
          <tr><td class="border p-2">Above ₹5 Crore</td><td class="border p-2">37%</td></tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3 p-3 bg-amber-50 rounded border border-amber-200">
      <p class="text-sm text-slate-700">
        <strong>Example:</strong> Income = ₹60 lakhs, Tax = ₹10 lakhs → Surcharge (10%) = 
        ₹1 lakh → Cess (4%) = ₹44,000 → Total Tax = ₹11,44,000
      </p>
    </div>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Income Tax Calculator',
            url: 'https://fincado.com/income-tax-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Income Tax Calculator India"
        description="Calculate income tax liability for AY 2026-27 & AY 2027-28. Compare Old vs New Tax Regime with instant recommendation."
        url="https://fincado.com/income-tax-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <IncomeTaxSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Income Tax Calculator 2026" />
            <LanguageToggle path="/hi/income-tax-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-green-100 text-emerald-700">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Income Tax Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                FY 2025–26 & FY 2026–27
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Compare <strong>Old vs New Tax Regime</strong> instantly with accurate 
                  slab calculations. Find out which regime saves you more tax based on your 
                  deductions and income level. Updated as per Budget 2026.
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: Tax Slabs Unchanged
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Union Budget 2026 maintained the <strong>New Tax Regime</strong>{' '}
                as default with ₹75,000 Standard Deduction. Old Regime slabs
                remain unchanged. Calculator updated for FY 2026-27 (AY
                2027-28).
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="tax-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      TAX FREE INCOME
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      New Regime (with rebate)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹7L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /year
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      STD DEDUCTION
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      New Regime (no proof)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹75k
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        flat
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-red-700 mb-1">
                      MAX TAX RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Above ₹15L income
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      30%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        + cess
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <IncomeTaxClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="tax-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Regime Selection Tip
                </strong>
                New Regime is usually better for income up to ₹12 lakhs with low
                deductions. Old Regime benefits those with home loan, high HRA,
                and maxed-out 80C investments. Use calculator to confirm!
              </AlertDescription>
            </Alert>

            {/* Tax Slab Comparison Tables */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Income Tax Slabs FY 2025-26 & FY 2026-27
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Old Regime Slabs */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Old Tax Regime
                      </h3>

                      <div className="overflow-hidden rounded-lg border border-slate-200">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-blue-50">
                              <TableHead className="font-bold">
                                Income Slab
                              </TableHead>
                              <TableHead className="font-bold">
                                Tax Rate
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-sm">
                            <TableRow>
                              <TableCell>Up to ₹2.5L*</TableCell>
                              <TableCell className="font-semibold">
                                Nil
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹2.5L - ₹5L</TableCell>
                              <TableCell className="font-semibold">
                                5%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹5L - ₹10L</TableCell>
                              <TableCell className="font-semibold">
                                20%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Above ₹10L</TableCell>
                              <TableCell className="font-semibold">
                                30%
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <p>*Basic exemption: ₹3L (age 60-80), ₹5L (age 80+)</p>
                        <p>
                          <strong>Standard Deduction:</strong> ₹50,000
                        </p>
                        <p>
                          <strong>Section 87A Rebate:</strong> Full rebate if
                          taxable income ≤ ₹5L
                        </p>
                        <p>
                          <strong>Deductions Allowed:</strong> 80C, 80D, HRA,
                          home loan, etc.
                        </p>
                      </div>
                    </div>

                    {/* New Regime Slabs */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
                        <Receipt className="h-5 w-5" />
                        New Tax Regime
                      </h3>

                      <div className="overflow-hidden rounded-lg border border-slate-200">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-emerald-50">
                              <TableHead className="font-bold">
                                Income Slab
                              </TableHead>
                              <TableHead className="font-bold">
                                Tax Rate
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-sm">
                            <TableRow>
                              <TableCell>Up to ₹3L</TableCell>
                              <TableCell className="font-semibold">
                                Nil
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹3L - ₹7L</TableCell>
                              <TableCell className="font-semibold">
                                5%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹7L - ₹10L</TableCell>
                              <TableCell className="font-semibold">
                                10%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹10L - ₹12L</TableCell>
                              <TableCell className="font-semibold">
                                15%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹12L - ₹15L</TableCell>
                              <TableCell className="font-semibold">
                                20%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Above ₹15L</TableCell>
                              <TableCell className="font-semibold">
                                30%
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <p>
                          <strong>Standard Deduction:</strong> ₹75,000
                        </p>
                        <p>
                          <strong>Section 87A Rebate:</strong> Full rebate if
                          taxable income ≤ ₹7L
                        </p>
                        <p>
                          <strong>Deductions NOT Allowed:</strong> 80C, 80D,
                          HRA, home loan, LTA
                        </p>
                        <p>
                          <strong>Default Regime:</strong> Applies automatically
                          unless Old is chosen
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-slate-700">
                      <strong>Key Difference:</strong> New Regime has more slabs
                      (6 vs 4) with lower rates but fewer deductions. Old Regime
                      has higher rates but allows deductions under 80C, 80D,
                      HRA, home loan interest which can significantly reduce
                      taxable income.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-blue-200 bg-blue-50/50 transition-colors hover:bg-blue-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-blue-900">
                    Save tax with ELSS mutual funds (Section 80C)
                  </strong>
                  <Link
                    href="/elss-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>
                      Calculate ELSS returns and tax saving potential with ELSS
                      Calculator
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
                  What is Income Tax in India?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How is Income Tax Calculated? (Step-by-Step)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={howTaxCalculatedContent} />
                </div>

                {/* Example Calculation */}
                <div className="mt-6 p-5 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🧮</span>
                    Example: ₹12 Lakh Salary Tax Calculation (New Regime)
                  </h4>

                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between">
                        <span>Gross Annual Salary:</span>
                        <span className="font-semibold">₹12,00,000</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Less: Standard Deduction:</span>
                        <span>₹75,000</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Taxable Income:</span>
                        <span>₹11,25,000</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-blue-300">
                      <div className="font-semibold mb-2">Tax Calculation:</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div>Up to ₹3L: Nil = ₹0</div>
                        <div>₹3L - ₹7L (₹4L × 5%): = ₹20,000</div>
                        <div>₹7L - ₹10L (₹3L × 10%): = ₹30,000</div>
                        <div>₹10L - ₹11.25L (₹1.25L × 15%): = ₹18,750</div>
                        <div className="border-t pt-1 mt-2 font-semibold">
                          Total Tax: = ₹68,750
                        </div>
                        <div>Add: Health & Education Cess (4%): = ₹2,750</div>
                        <div className="font-bold text-base mt-2 text-emerald-700">
                          Final Tax Liability: = ₹71,500
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                      <div className="text-sm">
                        <strong>Net Income After Tax:</strong> ₹12,00,000 -
                        ₹71,500 ={' '}
                        <strong className="text-emerald-700">₹11,28,500</strong>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Effective Tax Rate: 5.96%
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="tax-mid-content"
                  type="square"
                  label="Advertisement"
                />
              </div>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Deductions & Exemptions Explained
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={deductionsContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  What is Surcharge on Income Tax?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={surchargeContent} />
                </div>
              </section>

              {/* Regime Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Old vs New Regime: Detailed Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>Old Regime</TableHead>
                        <TableHead>New Regime</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Tax Slabs</TableCell>
                        <TableCell>4 slabs (5%, 20%, 30%)</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          6 slabs (5%, 10%, 15%, 20%, 30%)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Standard Deduction
                        </TableCell>
                        <TableCell>₹50,000</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹75,000
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Section 80C (₹1.5L)
                        </TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          Allowed
                        </TableCell>
                        <TableCell>Not Allowed</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          HRA Exemption
                        </TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          Allowed
                        </TableCell>
                        <TableCell>Not Allowed</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Home Loan Interest
                        </TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          Allowed (₹2L)
                        </TableCell>
                        <TableCell>Not Allowed</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Section 87A Rebate
                        </TableCell>
                        <TableCell>Up to ₹5L income</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Up to ₹7L income
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          LTA (Leave Travel)
                        </TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          Allowed
                        </TableCell>
                        <TableCell>Not Allowed</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Default Choice
                        </TableCell>
                        <TableCell>No</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (from FY 2023-24)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Best For</TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          High deductions (home loan, HRA, 80C all maxed)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Low deductions, simple salary income
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* Recommendation Guide */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Which Tax Regime Should You Choose?
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-5 rounded-xl border-2 border-emerald-200 bg-emerald-50">
                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5" />
                      Choose New Regime If:
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
                      <li>Income below ₹7 lakhs (zero tax with rebate)</li>
                      <li>No home loan or HRA benefits</li>
                      <li>Deductions less than ₹3.75 lakhs</li>
                      <li>Want simplicity without proof submission</li>
                      <li>Freelancer/consultant with no HRA</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border-2 border-blue-200 bg-blue-50">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Choose Old Regime If:
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
                      <li>Home loan with high interest (₹2L deduction)</li>
                      <li>High HRA (₹3-4L exemption in metros)</li>
                      <li>Maxed-out 80C investments (₹1.5L)</li>
                      <li>Total deductions exceed ₹3.75 lakhs</li>
                      <li>Senior citizens with high medical expenses (80D)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-slate-700">
                    <strong>General Rule:</strong> New Regime saves more tax for
                    income up to ₹12 lakhs with minimal deductions. Old Regime
                    is better when total deductions (HRA + 80C + home loan)
                    exceed ₹3.75 lakhs. Always use calculator for accurate
                    comparison!
                  </p>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use This Income Tax Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Select <strong>Financial Year</strong>: FY 2025-26 (for ITR
                    filing in 2026) or FY 2026-27 (for planning ahead).
                  </li>
                  <li>
                    Choose <strong>Age Category</strong>: Below 60, 60-80
                    (senior), or 80+ (super senior). Affects basic exemption in
                    Old Regime.
                  </li>
                  <li>
                    Enter <strong>Gross Annual Income</strong>: Total salary
                    before any deductions (CTC minus employer PF contribution).
                  </li>
                  <li>
                    Add <strong>Total Deductions</strong>: Sum of 80C (₹1.5L),
                    80D (₹25-50k), HRA exemption, home loan interest, etc.
                    Applies only to Old Regime.
                  </li>
                  <li>
                    Review <strong>Regime Comparison</strong>: Calculator shows
                    tax for both regimes and highlights which one saves more.
                  </li>
                  <li>
                    Check <strong>Tax Breakdown</strong>: See taxable income
                    calculation, slab-wise tax, and final amount with cess.
                  </li>
                  <li>
                    Save calculation for future reference or share with
                    CA/family via WhatsApp.
                  </li>
                </ol>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Tax & Investment Tools
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/elss-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              ELSS Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate tax saving and returns from ELSS mutual
                              funds under Section 80C.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate ELSS Returns</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/hra-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            🏠
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              HRA Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate House Rent Allowance exemption for Old
                              Tax Regime planning.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Calculate HRA Exemption</span>
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
              <AdSlot id="tax-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="tax-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="tax-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="tax-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
