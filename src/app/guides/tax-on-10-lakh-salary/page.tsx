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
  Lightbulb,
  CheckCircle2,
  Wallet,
  Calculator,
  ArrowRight,
  Scale,
  Clock,
  PieChart,
  Zap,
  TrendingUp,
} from 'lucide-react';

const CONFIG = {
  salary: '10 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-10-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-10-lakh-salary-hero.webp',
  standardDeductionNew: 75000,
  standardDeductionOld: 50000,
  rebateLimitNew: 1200000,
  rebateMaxNew: 60000,
};

export const metadata: Metadata = {
  title: 'Tax on ₹10 Lakh Salary (FY 2025-26): Still Zero Tax? + In-Hand Pay',
  description:
    'Earning ₹10 Lakhs? You still pay ZERO tax under New Regime (FY 2025-26) due to ₹75,000 Standard Deduction + full Section 87A rebate up to ₹12 Lakh taxable income. Compare with Old Regime & see monthly in-hand.',
  keywords: [
    'Tax on 10 lakh salary',
    '10 LPA in hand salary',
    'is 10 lakh income tax free',
    'section 87a rebate limit 2025-26',
    '10 lakh salary tax calculator',
    'new tax regime 2025-26',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://fincado.com/' }],
  alternates: {
    canonical: `https://fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹10 Lakh Salary: Still Zero Tax (FY 2025-26)',
    description:
      'Good news: ₹10 Lakhs salary remains tax-free under New Regime. See exact calculation, in-hand salary & when Old Regime is better.',
    url: `https://fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax10LakhGuide() {
  const pageTitle = `Tax on ₹10 Lakh Salary: New vs Old Regime Breakdown (${CONFIG.year})`;

  const faqData = [
    {
      question: 'How much tax on 10 Lakh salary in New Regime?',
      answer:
        '₹0 under the New Regime (FY 2025-26). After ₹75,000 standard deduction, taxable income is ₹9.25 Lakhs — fully covered by Section 87A rebate up to ₹12 Lakhs.',
    },
    {
      question: 'Is Old Regime better for 10 LPA?',
      answer:
        'Only if you have very high deductions. Without deductions, Old Regime tax is ~₹1,06,600 — much higher than New Regime.',
    },
    {
      question: 'What is the monthly in-hand salary for 10 LPA?',
      answer:
        'With zero tax under the New Regime, your monthly in-hand (after PF ~₹5,000 and Professional Tax ₹200) is approximately ₹78,133.',
    },
    {
      question: 'Can I save tax on 10 Lakh salary?',
      answer:
        'New Regime already gives you zero tax. In Old Regime, deductions help, but you generally need around ₹4.5L deductions to bring old-regime tax to zero at ₹10L salary.',
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
            name: 'Tax on 10 Lakh Salary',
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
            inLanguage: 'en-IN',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://fincado.com/guides/${CONFIG.slug}`,
            },
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
            dateModified: '2026-04-10',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-brand-100 text-brand-700 hover:bg-brand-200 px-3 py-1"
        >
          Zero Tax Zone
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 8 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{CONFIG.year}</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-brand-700">
            <CheckCircle2 className="h-4 w-4" /> Calculation Verified
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title={pageTitle} />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src={CONFIG.heroImage}
            alt="Tax on 10 Lakh Salary Comparison Graph"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Earning <strong>₹10 Lakhs (10 LPA)</strong> is a major milestone. Under the <strong>New Tax Regime (${CONFIG.year})</strong>, the <strong>₹75,000 Standard Deduction</strong> reduces your taxable income to <strong>₹9.25 Lakhs</strong>. Since this is below the ₹12 Lakh rebate limit, you get the full <strong>Section 87A rebate</strong>, resulting in <strong>zero tax</strong>.</p>`}
          />
          <Badge className="mt-4 bg-brand-100 text-brand-700 hover:bg-brand-200">
            Status: Tax-Free under New Regime ({CONFIG.year})
          </Badge>
        </CardContent>
      </Card>

      <Card className="mb-12 bg-brand-50 border-brand-200 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-brand-900 text-xl flex items-center gap-2">
            <Scale className="h-6 w-6 text-brand-700" /> The Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-brand-900">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-brand-100 shadow-sm">
                <span className="text-sm font-semibold text-slate-500 uppercase">
                  New Regime Tax
                </span>
                <p className="text-3xl font-semibold text-brand-700">₹0</p>
                <p className="text-xs text-slate-600 mt-1">
                  (Full rebate applied)
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                <span className="text-sm font-semibold text-slate-500 uppercase">
                  Old Regime Tax
                </span>
                <p className="text-3xl font-semibold text-red-600">₹1,06,600</p>
                <p className="text-xs text-slate-600 mt-1">
                  (Without deductions)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/60 p-3 rounded border border-brand-200 text-sm text-brand-900">
              <Lightbulb className="h-5 w-5 shrink-0 mt-0.5 text-amber-500" />
              <span>
                <strong>Winner:</strong> New Regime saves you over{' '}
                <strong>₹1 Lakh</strong> vs Old Regime without deductions. Old
                Regime becomes comparable only with very high deductions.
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border border-brand-100">
              <p className="text-sm font-semibold mb-4 text-center text-slate-700">
                Check Your Specific Case:
              </p>
              <InlineTaxCalculator defaultSalary={1000000} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="tax-10l-1" type="in-article" />
      </div>

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
                  ₹83,333
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ₹83,333
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Est.)
                </TableCell>
                <TableCell className="text-red-600">- ₹5,000</TableCell>
                <TableCell className="text-red-600">- ₹5,000</TableCell>
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
                  Less: TDS (Income Tax)
                </TableCell>
                <TableCell className="text-brand-700 font-semibold">
                  ₹0
                </TableCell>
                <TableCell className="text-red-600 font-semibold">
                  - ₹8,883
                </TableCell>
              </TableRow>
              <TableRow className="bg-brand-50">
                <TableCell className="font-semibold text-brand-900 text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-semibold text-brand-700 text-lg">
                  ₹78,133
                </TableCell>
                <TableCell className="font-semibold text-amber-700 text-lg">
                  ₹69,250
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic">
          *PF assumed at 12% of Basic (Basic = 50% of Gross). TDS is averaged
          monthly.
        </p>
      </section>

      {/* --- SECTION 3: SALARY FLOW --- */}
      <section className="mb-12">
        <h2
          id="salary-flow"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-indigo-600" /> Where Does Your ₹10L
          Go?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-brand-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-brand-700 mb-2 text-lg">
                💰 In Pocket (94.0%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹9.38 L
              </span>
              <p className="text-sm text-slate-600 mt-2">
                Annual take-home pay.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-brand-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-brand-700 mb-2 text-lg">
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
                🏦 Retiral Savings (6.0%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹0.60 L
              </span>
              <p className="text-sm text-slate-600 mt-2">PF + PT savings.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="new-regime"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-brand-700" /> New Regime
          Calculation ({CONFIG.year})
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-700">
              <div className="flex justify-between mb-1">
                <span>Gross Salary</span>
                <span>₹10,00,000</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>(-) Standard Deduction</span>
                <span className="text-brand-700">- ₹75,000</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-slate-300">
                <span>Net Taxable Income</span>
                <span>₹9,25,000</span>
              </div>
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
                    <TableCell>₹8 Lakhs - ₹9.25 Lakhs</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>₹1,25,000 × 10% = ₹12,500</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold bg-slate-50">
                    <TableCell>Gross Tax</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹32,500</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-brand-700 bg-brand-50/50">
                    <TableCell>Less: Rebate 87A</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>- ₹32,500</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-brand-700 bg-brand-100">
                    <TableCell>Net Payable</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
              <strong>Note:</strong> Full rebate u/s 87A (up to ₹
              {CONFIG.rebateMaxNew.toLocaleString('en-IN')}) applies because
              taxable income (₹9.25L) is below ₹
              {(CONFIG.rebateLimitNew / 100000).toLocaleString('en-IN')} Lakhs.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2
          id="old-regime"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-amber-600" /> Old Regime
          Calculation (Without Deductions)
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-700">
              <div className="flex justify-between mb-1">
                <span>Gross Salary</span>
                <span>₹10,00,000</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>(-) Standard Deduction</span>
                <span className="text-amber-600">- ₹50,000</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-slate-300">
                <span>Net Taxable Income</span>
                <span>₹9,50,000</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-semibold text-slate-900">
                      Slab (Old)
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Rate
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Calculation
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>0 - 2.5L</TableCell>
                    <TableCell>Nil</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2.5L - 5L</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>₹12,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5L - 9.5L</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>₹90,000</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold bg-slate-50 text-slate-900">
                    <TableCell>Total Tax</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹1,02,500</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-red-800 bg-red-50">
                    <TableCell>Total + Cess (4%)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹1,06,600</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2
          id="break-even"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Zap className="h-6 w-6 text-indigo-600" /> The Break-Even Point
        </h2>
        <Card className="border-indigo-100 bg-indigo-50/30">
          <CardContent className="pt-6">
            <p className="text-sm text-indigo-900 mb-4">
              Since New Regime tax is already <strong>₹0</strong>, Old Regime
              can compete only if your total deductions are very high —
              typically <strong>₹4.5 Lakhs or more</strong>.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border border-indigo-200 text-sm">
                <span className="block text-xs uppercase text-slate-500 font-semibold mb-1">
                  Deductions &lt; ₹4.5L
                </span>
                <strong className="text-brand-700">Choose New Regime</strong>
              </div>
              <div className="bg-white p-3 rounded border border-indigo-200 text-sm">
                <span className="block text-xs uppercase text-slate-500 font-semibold mb-1">
                  Deductions ≥ ₹4.5L
                </span>
                <strong className="text-brand-700">Old can match</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Explore More Financial Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/guides/tax-on-15-lakh-salary/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹15 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Compare tax liability for a higher salary bracket.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Check Now{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guides/elss-funds-guide-2026/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Best ELSS Funds
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Save tax under Section 80C.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                  Start Saving{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/sip-calculator/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                    SIP Calculator
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Calculate returns on monthly investments.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-brand-700">
                  Calculate Returns{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

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
