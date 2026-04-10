import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import FAQSchema from '@/components/FAQSchema';
import InlineTaxCalculator from '@/components/InlineTaxCalculator';
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
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Wallet,
  Calculator,
  ArrowRight,
  Scale,
  Clock,
  PieChart,
  Zap,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  salary: '12 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-12-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-12-lakh-salary-hero.webp',
  // New constants for future-proofing
  standardDeductionNew: 75000,
  standardDeductionOld: 50000,
  rebateLimitNew: 1200000, // taxable income
  rebateMaxNew: 60000,
};

export const metadata: Metadata = {
  title: 'Tax on ₹12 Lakh Salary (FY 2025-26): Zero Tax? + In-Hand Pay',
  description:
    'Tax on ₹12 Lakh salary in FY 2025-26 explained. After ₹75,000 standard deduction, taxable income is ₹11.25L and net tax becomes ₹0 under New Regime after Section 87A rebate. Compare with Old Regime and in-hand pay.',
  keywords: [
    'Tax on 12 lakh salary',
    '12 LPA in hand salary',
    'is 12 lakh income tax free',
    'section 87a rebate limit 2025-26',
    '12 lakh salary tax calculator',
    'new tax regime 2025-26',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://fincado.com/' }],
  alternates: {
    canonical: `https://fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹12 Lakh Salary (FY 2025-26): Zero Tax? + In-Hand Pay',
    description:
      'Detailed breakdown: Your exact monthly take-home pay and tax liability.',
    url: `https://fincado.com/guides/${CONFIG.slug}`,

    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax12LakhGuide() {
  const pageTitle = `Tax on ₹12 Lakh Salary: New vs Old Tax Regime (${CONFIG.year})`;

  // --- FAQS ---
  const faqData = [
    {
      question: 'How much tax do I pay on 12 LPA salary?',
      answer:
        'For ₹12 Lakh salary in FY 2025-26, net tax payable is ₹0 under the New Tax Regime due to Section 87A rebate. Under the Old Regime (without deductions), tax remains much higher.',
    },
    {
      question: 'What is the monthly in-hand salary for 12 LPA?',
      answer:
        'With zero income tax under the New Regime, monthly in-hand is approximately ₹93,800 after PF (~₹6,000) and Professional Tax (~₹200).',
    },
    {
      question: 'Which tax regime is better for 12 Lakh package?',
      answer:
        'The New Tax Regime is far better for most people at 12 LPA because it gives zero tax with no paperwork. Switch to Old Regime only if you have very high deductions (₹4 Lakh+).',
    },
    {
      question: 'Is 12 Lakh salary good in India?',
      answer:
        'Yes. With zero tax under the New Regime, your approximate monthly in-hand salary is ₹93,800 — a comfortable income in most Indian cities.',
    },
    {
      question: 'How to save tax on 12 LPA salary?',
      answer:
        'At 12 LPA, New Regime already gives zero net tax (after rebate), so tax-saving focus should shift to wealth building. Under Old Regime, you need large deductions (80C, 80D, HRA, home loan interest) to match New Regime.',
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          { name: 'Tax Planning', url: 'https://fincado.com/guides/tax/' },
          {
            name: 'Tax on 12 Lakh Salary',
            url: `https://fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />

      <FAQSchema faqs={faqData} />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageTitle,
            image: [CONFIG.heroImage],
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              url: 'https://fincado.com/about/',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        {/* HEADER Badge */}
        <Badge
          variant="secondary"
          className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1"
        >
          Zero Tax Zone
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 9 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{CONFIG.year}</strong>
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title={pageTitle} />
        </div>
      </header>

      {/* --- HERO IMAGE --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src={CONFIG.heroImage}
            alt="12 Lakh Salary Tax Comparison New vs Old Regime"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          {/* HERO Card */}
          <WikiText
            content={`<p>Earning <strong>₹12 Lakh salary</strong> in <strong>${CONFIG.year}</strong>? Under the <strong>New Tax Regime</strong>, your taxable income becomes <strong>₹11.25 Lakhs</strong> after standard deduction, and your final payable tax becomes <strong>₹0</strong> after Section 87A rebate. The Old Regime is usually costlier unless you claim very high deductions.</p>`}
          />
          <Badge className="mt-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Status: Tax-Free under New Regime (FY 2025-26)
          </Badge>
        </CardContent>
      </Card>

      {/* --- VERDICT BOX --- */}
      <Card className="mb-12 bg-lime-50 border-lime-200 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lime-900 text-xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-lime-700" /> Quick Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lime-900">
            <p className="text-lg">
              For a <strong>₹12 Lakh salary</strong>, your tax payable is{' '}
              <span className="font-semibold text-2xl">₹0 (Zero)</span> under
              the New Tax Regime.
            </p>
            <p>
              <strong>Why?</strong> Your calculated tax is{' '}
              <strong>₹51,250</strong>, but the government gives you a full
              discount (Rebate u/s 87A up to ₹12 Lakh taxable income).
            </p>

            <div className="flex items-start gap-2 bg-white/60 p-3 rounded border border-lime-200 text-sm text-red-800">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                <strong>Old Regime Warning:</strong> Without deductions, you
                will pay approx <strong>₹1,63,800</strong> in tax.
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border border-lime-100">
              <p className="text-sm font-semibold mb-4 text-center text-slate-700">
                Verify with our Calculator:
              </p>
              <InlineTaxCalculator defaultSalary={1200000} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-12l-1" type="in-article" />
      </div>

      {/* --- SECTION 1: TAKE HOME --- */}
      <section className="mb-12">
        <h2
          id="take-home-salary"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-blue-600" /> Monthly In-Hand Breakdown
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  Component
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  New Regime (Recommended)
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Old Regime (No Deductions)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Gross Salary
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ₹1,00,000
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ₹1,00,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Est.)
                </TableCell>
                <TableCell className="text-red-600">- ₹6,000</TableCell>
                <TableCell className="text-red-600">- ₹6,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: Prof Tax
                </TableCell>
                <TableCell className="text-red-600">- ₹200</TableCell>
                <TableCell className="text-red-600">- ₹200</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: TDS (Tax)
                </TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  ₹0
                </TableCell>
                <TableCell className="text-red-600 font-semibold">
                  - ₹13,650
                </TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-semibold text-emerald-900 text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-semibold text-emerald-700 text-lg">
                  ₹93,800
                </TableCell>
                <TableCell className="font-semibold text-amber-700 text-lg">
                  ₹80,150
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic">
          *Old Regime calculation assumes NO other deductions except standard
          deduction.
        </p>
      </section>

      {/* --- SECTION 2: SALARY FLOW --- */}
      <section className="mb-12">
        <h2
          id="salary-flow"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-indigo-600" /> Where Does Your ₹12L
          Go?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-emerald-600 mb-2 text-lg">
                💰 In Pocket (94.0%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹11.26 L
              </span>
              <p className="text-sm text-slate-600 mt-2">
                Annual take-home pay.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-emerald-600 mb-2 text-lg">
                🏛️ Income Tax (0%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">₹0</span>
              <p className="text-sm text-slate-600 mt-2">
                Full rebate applied.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-blue-600 mb-2 text-lg">
                🏦 Retirals (6.0%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹0.72 L
              </span>
              <p className="text-sm text-slate-600 mt-2">Compulsory savings.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 3: CALCULATION --- */}
      <section className="mb-12">
        <h2
          id="new-regime"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-emerald-600" /> New Regime
          Calculation (FY 2025-26)
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-700">
              Standard Deduction: <strong>₹75,000</strong>.<br />
              Taxable Income: ₹12,00,000 - ₹75,000 = <strong>₹11,25,000</strong>
              .
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-semibold text-slate-900">
                      Slab
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Rate
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Tax
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>0 - ₹4 Lakhs</TableCell>
                    <TableCell>Nil</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹4 Lakhs - ₹8 Lakhs</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>₹20,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹8 Lakhs - ₹10 Lakhs</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>₹20,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹10 Lakhs - ₹11.25 Lakhs</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>₹1,25,000 × 15% = ₹18,750</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold bg-slate-50">
                    <TableCell>Gross Tax</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹58,750</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-emerald-600 bg-emerald-50/50">
                    <TableCell>Less: Rebate 87A</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>- ₹58,750</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-emerald-800 bg-emerald-100">
                    <TableCell>Net Payable</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
              <strong>Note on Section 87A (FY 2025-26):</strong> Full tax rebate
              (up to ₹60,000) if taxable income ≤ <strong>₹12 Lakhs</strong>.
              Your ₹11.25L is within the limit.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 4: COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="comparison"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-indigo-600" /> New vs Old Regime
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  New Regime
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Old Regime (No Ded.)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Payable
                </TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  ₹0
                </TableCell>
                <TableCell className="text-red-600 font-semibold">
                  ₹1,63,800
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Savings
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="text-center font-semibold bg-emerald-50 text-emerald-800"
                >
                  New Regime saves you ₹1,63,800
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 5: BREAK EVEN --- */}
      <section className="mb-12">
        <h2
          id="break-even"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-indigo-600" /> The Break-Even
          Point
        </h2>
        <Card className="border-indigo-100 bg-indigo-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-indigo-900 text-lg">
              When to choose Old Regime?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-indigo-800">
            <p className="mb-2">
              Since New Regime tax is already ₹0, switch to Old Regime only if
              your total deductions (HRA + 80C + 80D + home loan interest + NPS
              etc.) are very high — typically <strong>₹4 Lakhs or more</strong>.
            </p>
            <p className="text-2xl font-semibold text-indigo-700 mb-2">
              ₹4,00,000+
            </p>
            <p>
              This is usually achievable only with significant HRA or home loan
              interest. For most people at 12 LPA, New Regime is clearly better.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 6: PERSONAS --- */}
      <section className="mb-12">
        <h2
          id="personas"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20"
        >
          Who Should Choose What?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-200 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                The Saver
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">Maxes out 80C but pays no rent.</p>
              <ul className="list-disc pl-4 mb-3">
                <li>Rent: ₹0</li>
                <li>80C: ₹1.5L</li>
                <li>NPS: ₹50k</li>
              </ul>
              <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded inline-block font-semibold">
                Winner: New Regime (Saves ₹35k+)
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                The Heavy Deductor
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">Pays rent + has Home Loan + 80C.</p>
              <ul className="list-disc pl-4 mb-3">
                <li>Home Loan Int: ₹2L</li>
                <li>80C: ₹1.5L</li>
                <li>80D: ₹25k</li>
              </ul>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded inline-block font-semibold">
                Winner: Old Regime (Saves ₹5k)
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            For a ₹12 Lakh salary, the <strong>New Tax Regime</strong> is
            efficient and stress-free. It leaves you with ~₹88,000 monthly in
            hand. Unless you have a Home Loan AND maximize Section 80C, sticking
            to the New Regime is the smartest financial move.
          </p>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          Calculations are based on income tax slabs for FY 2025-26 applicable
          to resident individuals below 60 years.
        </p>
      </div>

      {/* --- SECTION: RELATED LINKS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Explore More Financial Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Link 1: Tax on 10L */}
          <Link href="/guides/tax-on-10-lakh-salary/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹10 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Check tax liability for a lower salary bracket.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Compare Now{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 2: Tax on 15L */}
          <Link href="/guides/tax-on-15-lakh-salary/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Tax on ₹15 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    See calculations for the next salary milestone.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                  View Details{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 3: ELSS Funds */}
          <Link href="/guides/elss-funds-guide-2025/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Best ELSS Funds
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Save up to ₹46,800 tax under Section 80C.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                  Start Saving{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2 id="faqs" className="mb-6 text-2xl font-semibold text-slate-900">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-white"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </article>
  );
}
