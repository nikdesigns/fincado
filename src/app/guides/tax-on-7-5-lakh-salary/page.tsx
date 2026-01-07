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
  CheckCircle2,
  Wallet,
  Calculator,
  ArrowRight,
  Clock,
  Coins,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  salary: '7.5 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-7-5-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-7-5-lakh-salary-hero.webp',
};

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Tax on ₹7.5 Lakh Salary (2025): Tax-Free? + In-Hand Pay',
  description:
    'Earning ₹7.5 Lakhs? You might pay ZERO tax. See how Standard Deduction brings you below the 87A rebate limit. Full calculation inside. Figures based on FY 2025-26 tax slabs for resident individuals.',
  keywords: [
    'Tax on 7.5 lakh salary',
    '7.5 LPA in hand salary',
    'is 7.5 lakh income tax free',
    'tax on 7.5 lakh old vs new regime',
    'income tax calculator 2025',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹7.5 Lakh Salary: Zero Tax Guide (2025)',
    description:
      'Good news: ₹7.5 Lakh salary is effectively tax-free under the New Regime. See the math behind the Zero Tax calculation.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax7Point5LakhGuide() {
  const pageTitle =
    'Tax on ₹7.5 Lakh Salary: Zero Tax Explanation (FY 2025-26)';

  // --- FAQS ---
  const faqData = [
    {
      question: 'Is 7.5 Lakh income tax-free in New Regime?',
      answer:
        'Yes. Although the rebate limit is ₹7 Lakhs, salaried employees get a ₹75,000 Standard Deduction. This reduces a ₹7.5 Lakh salary to a taxable income of ₹6.75 Lakhs, which qualifies for the full tax rebate.',
    },
    {
      question: 'How much tax on 7.5 LPA in Old Regime?',
      answer:
        'In the Old Regime, you do not get the rebate because your net income (₹7 Lakhs after deduction) exceeds the ₹5 Lakh limit. You would pay approx ₹54,600 in tax unless you have investments like 80C.',
    },
    {
      question: 'What is the in-hand salary for 7.5 LPA?',
      answer:
        'Since there is zero tax under the New Regime, your monthly in-hand is simply Gross minus PF and Professional Tax. Expect approximately ₹58,550 per month.',
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 7.5 Lakh Salary',
            url: `https://www.fincado.com/guides/${CONFIG.slug}`,
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
              '@id': `https://www.fincado.com/guides/${CONFIG.slug}`,
            },
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              url: 'https://www.fincado.com/about',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1"
        >
          Zero Tax Zone
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 6 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">FY 2025-26</strong>
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
            alt="7.5 Lakh Salary Tax Calculation Zero Tax"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Earning <strong>₹7.5 Lakhs (7.5 LPA)</strong> often confuses taxpayers because the rebate limit is ₹7 Lakhs. However, for salaried employees, the <strong>Standard Deduction of ₹75,000</strong> reduces your taxable income to <strong>₹6.75 Lakhs</strong>. Since this is below the ₹7 Lakh threshold, you qualify for the <strong>Section 87A rebate</strong>, effectively reducing your tax payable to zero.</p>`}
          />
          <Badge className="mt-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Status: Tax-Free under New Regime
          </Badge>
        </CardContent>
      </Card>

      {/* --- VERDICT BOX --- */}
      <Card className="mb-12 bg-lime-50 border-lime-200 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lime-900 text-xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-lime-700" /> Quick Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lime-900">
            <p className="text-lg">
              For a <strong>₹7.5 Lakh salary</strong>, your tax payable is{' '}
              <span className="font-bold text-2xl">₹0 (Zero)</span> under the
              New Tax Regime.
            </p>
            <div className="bg-white/60 p-3 rounded border border-lime-200 text-sm">
              <strong>The Calculation:</strong> ₹7.50 Lakhs (Gross) - ₹75,000
              (Standard Deduction) = <strong>₹6.75 Lakhs</strong>.
              <br />
              Since taxable income does not exceed ₹7 Lakhs, the Section 87A
              rebate fully offsets the calculated tax.
            </div>
            <div className="flex items-start gap-2 bg-white/60 p-3 rounded border border-lime-200 text-sm text-amber-800">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                <strong>Old Regime Warning:</strong> Without investments, you
                will pay approx <strong>₹54,600</strong> in tax.
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border border-lime-100">
              <p className="text-sm font-semibold mb-4 text-center text-slate-700">
                Verify with our Calculator:
              </p>
              <InlineTaxCalculator defaultSalary={750000} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-7.5l-1" type="in-article" />
      </div>

      {/* --- SECTION 2: TAKE HOME --- */}
      <section className="mb-12">
        <h2
          id="take-home-salary"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-blue-600" /> Monthly In-Hand Breakdown
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Component
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  New Regime (Recommended)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Old Regime (No Invest)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Gross Salary
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ₹62,500
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ₹62,500
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Est.)
                </TableCell>
                <TableCell className="text-red-600">- ₹3,750</TableCell>
                <TableCell className="text-red-600">- ₹3,750</TableCell>
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
                <TableCell className="text-emerald-600 font-bold">₹0</TableCell>
                <TableCell className="text-red-600">- ₹4,550</TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-bold text-emerald-900 text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-bold text-emerald-700 text-lg">
                  ₹58,550
                </TableCell>
                <TableCell className="font-bold text-amber-700 text-lg">
                  ₹54,000
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic">
          *PF is assumed at 12% of Basic Salary (Basic assumed as 50% of CTC).
        </p>
      </section>

      {/* --- SECTION 3: SALARY FLOW --- */}
      <section className="mb-12">
        <h2
          id="salary-flow"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-indigo-600" /> Where Does Your
          ₹7.5L Go?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-emerald-600 mb-2 text-lg">
                💰 In Pocket (93.7%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹7.03 L</span>
              <p className="text-sm text-slate-600 mt-2">Take-home pay.</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-emerald-600 mb-2 text-lg">
                🏛️ Income Tax (0%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹0</span>
              <p className="text-sm text-slate-600 mt-2">
                Full Rebate applied.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-blue-600 mb-2 text-lg">
                🏦 Retirals (6.0%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹0.45 L</span>
              <p className="text-sm text-slate-600 mt-2">Compulsory savings.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 4: CALCULATION --- */}
      <section className="mb-12">
        <h2
          id="new-regime"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-purple-600" /> The &quot;Zero
          Tax&quot; Calculation
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200">
              <div className="flex justify-between mb-2 text-sm">
                <span>Gross Salary</span>
                <span className="font-medium">₹7,50,000</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>(-) Standard Deduction</span>
                <span className="font-medium text-emerald-600">- ₹75,000</span>
              </div>
              <div className="flex justify-between border-t border-slate-300 pt-2 font-bold text-slate-900">
                <span>Net Taxable Income</span>
                <span>₹6,75,000</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-bold text-slate-900">
                      Slab
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Rate
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Calculation
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>0 - 3L</TableCell>
                    <TableCell>Nil</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3L - 6.75L</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>₹18,750</TableCell>
                  </TableRow>
                  <TableRow className="font-bold bg-slate-50">
                    <TableCell>Gross Tax</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹18,750</TableCell>
                  </TableRow>
                  <TableRow className="font-bold text-emerald-600 bg-emerald-50/50">
                    <TableCell>Less: Rebate 87A</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>- ₹18,750</TableCell>
                  </TableRow>
                  <TableRow className="font-bold text-emerald-800 bg-emerald-100">
                    <TableCell>Net Payable</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
              <strong>Note:</strong> While tax is calculated at 5% on income
              between ₹3L–₹7L, the <strong>Section 87A rebate</strong> (up to
              ₹25,000) reduces the final tax payable to zero if taxable income
              is ₹7 Lakhs or less.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 5: OLD REGIME --- */}
      <section className="mb-12">
        <h2
          id="old-regime"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Coins className="h-6 w-6 text-amber-600" /> Tax Outcome under Old
          Regime
        </h2>
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-900 text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Why You Might Pay Tax
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-800 space-y-3">
            <p>
              In the <strong>Old Regime</strong>, the rebate limit is only ₹5
              Lakhs. Your taxable income (after ₹50k deduction) is{' '}
              <strong>₹7.00 Lakhs</strong>.
            </p>
            <div className="bg-white/60 p-3 rounded border border-amber-200 font-medium text-amber-900">
              Since ₹7L &gt; ₹5L, you pay tax on the full amount above ₹2.5L.
              <br />
              <strong>Total Tax = ₹54,600.</strong>
            </div>
            <p className="text-xs">
              To make this zero, you would need to invest{' '}
              <strong>₹2.00 Lakhs</strong> in Section 80C and other deductions.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 6: CONCLUSION --- */}
      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            For a ₹7.5 Lakh salary, the <strong>New Tax Regime</strong> results
            in zero tax liability due to the Standard Deduction and 87A rebate.
            This benefit applies automatically without requiring additional
            investments.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Standard
              Deduction
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 87A Rebate
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Zero Tax
            </div>
          </div>
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
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Explore More Financial Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Link 1: Tax on 8L */}
          <Link href="/guides/tax-on-8-lakh-salary" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹8 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Check tax liability for a slightly higher bracket.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Compare Now{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 2: Tax on 6L */}
          <Link href="/guides/tax-on-6-lakh-salary" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Tax on ₹6 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    See tax calculations for a lower salary slab.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                  View Details{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 3: SIP Calculator */}
          <Link href="/sip-calculator" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    SIP Calculator
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Start planning your long-term wealth creation.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                  Calculate Returns{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2 id="faqs" className="mb-6 text-2xl font-bold text-slate-900">
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
