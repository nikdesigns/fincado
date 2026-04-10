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
  Clock,
  PieChart,
  Scale,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  salary: '9 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-9-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-9-lakh-salary-hero.webp',
  standardDeductionNew: 75000,
  standardDeductionOld: 50000,
  rebateLimitNew: 1200000,
  rebateMaxNew: 60000,
};

export const metadata: Metadata = {
  title: 'Tax on ₹9 Lakh Salary (FY 2025-26): Still Zero Tax? + In-Hand Pay',
  description:
    'Earning ₹9 Lakhs? You still pay ZERO tax under New Regime (FY 2025-26) thanks to ₹75,000 Standard Deduction + full Section 87A rebate (up to ₹12L taxable income). Full in-hand salary breakdown & New vs Old comparison.',
  keywords: [
    'Tax on 9 lakh salary',
    '9 LPA in hand salary',
    'is 9 lakh income tax free',
    'section 87a rebate limit 2025-26',
    '9 lakh salary tax calculator',
    'new tax regime 2025-26',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://fincado.com/' }],
  alternates: {
    canonical: `https://fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹9 Lakh Salary: Still Zero Tax (FY 2025-26)',
    description:
      '₹9 Lakhs salary remains tax-free under New Regime. See exact math, monthly in-hand salary & when Old Regime makes sense.',
    url: `https://fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax9LakhGuide() {
  const pageTitle = `Tax on ₹9 Lakh Salary: Zero Tax Explanation (${CONFIG.year})`;

  const faqData = [
    {
      question: 'How much tax on 9 LPA salary?',
      answer:
        '₹0 under the New Tax Regime (FY 2025-26). After ₹75,000 standard deduction, taxable income is ₹8.25 Lakhs, which qualifies for full Section 87A rebate.',
    },
    {
      question: 'What is the monthly in-hand salary for 9 LPA?',
      answer:
        'With zero tax under the New Regime, your monthly in-hand (after PF ~₹4,500 and Professional Tax ₹200) is approximately ₹70,300.',
    },
    {
      question: 'Which tax regime is better for 9 Lakh package?',
      answer:
        'The New Tax Regime is better for most people at 9 LPA because it gives zero tax with no paperwork. Old Regime typically becomes competitive only with very high deductions (~₹3.5L+).',
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
            name: 'Tax on 9 Lakh Salary',
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
        {/* HEADER Badge */}
        <Badge
          variant="secondary"
          className="mb-3 bg-[#EFFBE2] text-[#577A30] hover:bg-[#DFF7C6] px-3 py-1"
        >
          Zero Tax Zone
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 7 Min Read
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
            alt="9 Lakh Salary Tax Calculation FY 2025-26"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Earning <strong>₹9 Lakhs (9 LPA)</strong> still qualifies for <strong>zero tax</strong> under the <strong>New Tax Regime (${CONFIG.year})</strong>. The <strong>₹75,000 Standard Deduction</strong> brings your taxable income to <strong>₹8.25 Lakhs</strong>, which is below the ₹12 Lakh rebate limit. You get the full <strong>Section 87A rebate</strong>, making your final tax <strong>zero</strong>.</p>`}
          />
          <Badge className="mt-4 bg-[#EFFBE2] text-[#577A30] hover:bg-[#DFF7C6]">
            Status: Tax-Free under New Regime ({CONFIG.year})
          </Badge>
        </CardContent>
      </Card>

      {/* --- VERDICT BOX --- */}
      <Card className="mb-12 bg-[#F7FDF1] border-[#DFF7C6] shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#1B2E06] text-xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-[#577A30]" /> Quick Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-[#1B2E06]">
            <p className="text-lg">
              For a <strong>₹9 Lakh salary</strong>, your tax payable is{' '}
              <span className="font-semibold text-2xl">₹0 (Zero)</span> under
              the New Tax Regime.
            </p>
            <p>
              <strong>Why?</strong> Your calculated tax is{' '}
              <strong>₹21,250</strong>, but the government gives you a full
              discount (Rebate u/s 87A up to ₹12 Lakh taxable income).
            </p>
            <div className="flex items-start gap-2 bg-white/60 p-3 rounded border border-[#DFF7C6] text-sm text-amber-800">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                <strong>Old Regime Warning:</strong> Without substantial
                deductions, you will pay approx <strong>₹85,800</strong> in tax.
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border border-[#EFFBE2]">
              <p className="text-sm font-semibold mb-4 text-center text-slate-700">
                Verify with our Calculator:
              </p>
              <InlineTaxCalculator defaultSalary={900000} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-9l-1" type="in-article" />
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
                  Old Regime (No Invest)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Gross Salary
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ₹75,000
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ₹75,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Est.)
                </TableCell>
                <TableCell className="text-red-600">- ₹4,500</TableCell>
                <TableCell className="text-red-600">- ₹4,500</TableCell>
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
                <TableCell className="text-[#577A30] font-semibold">
                  ₹0
                </TableCell>
                <TableCell className="text-red-600 font-semibold">
                  - ₹7,150
                </TableCell>
              </TableRow>
              <TableRow className="bg-[#F7FDF1]">
                <TableCell className="font-semibold text-[#1B2E06] text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-semibold text-[#577A30] text-lg">
                  ₹70,300
                </TableCell>
                <TableCell className="font-semibold text-amber-700 text-lg">
                  ₹63,150
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

      {/* --- SECTION 2: SALARY FLOW --- */}
      <section className="mb-12">
        <h2
          id="salary-flow"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-indigo-600" /> Where Does Your
          ₹9,00,000 Go?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-[#F7FDF1]0 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-[#577A30] mb-2 text-lg">
                💰 In Pocket (94.0%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹8.46 L
              </span>
              <p className="text-sm text-slate-600 mt-2">
                Annual take-home pay.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-[#F7FDF1]0 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-[#577A30] mb-2 text-lg">
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
                ₹0.54 L
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
          <Calculator className="h-6 w-6 text-purple-600" /> Tax Calculation
          (New Regime – {CONFIG.year})
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-700">
              Standard Deduction:{' '}
              <strong>
                ₹{CONFIG.standardDeductionNew.toLocaleString('en-IN')}
              </strong>
              <br />. Taxable Income: ₹9,00,000 - ₹
              {CONFIG.standardDeductionNew.toLocaleString('en-IN')} ={' '}
              <strong>₹8,25,000</strong>.
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
                    <TableCell>₹4 Lakhs - ₹8.25 Lakhs</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>₹4,25,000 × 5% = ₹21,250</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold bg-slate-50">
                    <TableCell>Gross Tax</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹21,250</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-[#577A30] bg-[#F7FDF1]/50">
                    <TableCell>Less: Rebate 87A</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>- ₹21,250</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-[#577A30] bg-[#EFFBE2]">
                    <TableCell>Net Payable</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
              <strong>Note on Section 87A ({CONFIG.year}):</strong> Full tax
              rebate (up to ₹{CONFIG.rebateMaxNew.toLocaleString('en-IN')}) if
              taxable income ≤{' '}
              <strong>
                ₹{(CONFIG.rebateLimitNew / 100000).toLocaleString('en-IN')}{' '}
                Lakhs
              </strong>
              . Your ₹8.25L is comfortably within the limit.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 4: BREAK EVEN --- */}
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
              Since New Regime tax is already ₹0, Old Regime only competes if
              your total deductions are very high.
            </p>
            <p className="text-2xl font-semibold text-indigo-700 mb-2">
              ₹3,50,000+
            </p>
            <p>
              Only then can Old Regime taxable income fall to ₹5L or below and
              also reach zero tax. For most people at 9 LPA, New Regime stays
              better.
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            For a ₹9 Lakh salary, the <strong>New Tax Regime</strong> currently
            gives you zero tax after standard deduction and 87A rebate. Unless
            you already have very large deductions, New Regime is usually the
            practical choice.
          </p>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          Calculations are based on income tax slabs for {CONFIG.year}{' '}
          applicable to resident individuals below 60 years.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Explore More Tax Scenarios
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/guides/tax-on-8-lakh-salary/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹8 Lakhs
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

          <Link href="/guides/tax-on-10-lakh-salary/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Tax on ₹10 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    See calculations for the next salary milestone.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                  View Analysis{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guides/new-vs-old-tax-regime-2025/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7FDF1] text-[#577A30] group-hover:bg-[#EFFBE2] group-hover:text-[#577A30] transition-colors">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#577A30] transition-colors">
                    New vs Old Regime
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Detailed comparison of FY 2025-26 rules.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-[#577A30]">
                  Read Guide{' '}
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
