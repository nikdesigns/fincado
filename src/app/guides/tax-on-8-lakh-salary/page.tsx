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
  Wallet,
  Calculator,
  ArrowRight,
  Clock,
  Zap,
  PiggyBank,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  salary: '8 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-8-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-8-lakh-salary-hero.webp',
  standardDeductionNew: 75000,
  standardDeductionOld: 50000,
  rebateLimitNew: 1200000,
  rebateMaxNew: 60000,
};

export const metadata: Metadata = {
  title: 'Tax on ₹8 Lakh Salary (FY 2025-26): Still Zero Tax? + In-Hand',
  description:
    'Earning ₹8 Lakhs? You still pay ZERO tax under New Regime (FY 2025-26). ₹75,000 Standard Deduction + full Section 87A rebate (up to ₹12L taxable income). Full in-hand breakdown & calculator inside.',
  keywords: [
    'Tax on 8 lakh salary',
    '8 LPA in hand salary',
    'is 8 lakh income tax free',
    'section 87a rebate limit 2025-26',
    '8 lakh salary tax calculator',
    'new tax regime 2025-26',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://fincado.com/' }],
  alternates: { canonical: `https://fincado.com/guides/${CONFIG.slug}` },
  openGraph: {
    title: 'Tax on ₹8 Lakh Salary: Still Zero Tax (FY 2025-26)',
    description:
      'Good news: ₹8 Lakhs salary is still effectively tax-free under New Regime. See exact math, monthly in-hand & Old vs New comparison.',
    url: `https://fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax8LakhGuide() {
  const pageTitle = `Tax on ₹8 Lakh Salary: Zero Tax Explanation (${CONFIG.year})`;

  // --- FAQS ---
  const faqData = [
    {
      question: 'Is ₹8 lakh salary tax-free?',
      answer:
        'Yes. Under the New Tax Regime (FY 2025-26), after ₹75,000 standard deduction your taxable income is ₹7.25 Lakhs. Since this is below the ₹12 Lakh rebate limit, you get full Section 87A rebate and pay zero tax.',
    },
    {
      question: 'How much tax on 8 LPA under New Regime?',
      answer:
        '₹0. Your gross tax is ₹16,250, but it is fully offset by the Section 87A rebate.',
    },
    {
      question: 'What is the monthly in-hand salary for 8 LPA?',
      answer:
        'With zero tax under the New Regime, your monthly in-hand (after PF ~₹3,600 and Professional Tax ₹200) is approximately ₹62,867.',
    },
    {
      question: 'Is there marginal relief on ₹8 lakh salary?',
      answer:
        'Not needed. The enhanced 87A rebate (up to ₹12L taxable income) already makes the entire ₹8 Lakh salary tax-free in the New Regime.',
    },
    {
      question: 'How can I reduce tax further on ₹8 lakh salary?',
      answer:
        'The New Regime already gives you zero tax. If you have large deductions (80C, HRA, home loan etc.), compare with Old Regime using the calculator.',
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          { name: 'Tax Planning', url: 'https://fincado.com/guides/tax/' },
          {
            name: 'Tax on 8 Lakh Salary',
            url: `https://fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />

      <FAQSchema faqs={faqData} />

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
            dateModified: '2025-02-15',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        {/* In HEADER */}
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
            alt="Tax on 8 Lakh Salary Graph"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          {/* In HERO IMAGE Card */}
          <WikiText
            content={`<p>Earning <strong>₹8 Lakhs (8 LPA)</strong> still puts you in the Zero Tax Zone under the <strong>New Tax Regime (${CONFIG.year})</strong>. The <strong>₹75,000 Standard Deduction</strong> reduces your taxable income to <strong>₹7.25 Lakhs</strong>. Since this is well below the ₹12 Lakh rebate limit, you get the full <strong>Section 87A rebate</strong>, making your tax payable <strong>zero</strong>.</p>`}
          />
          <Badge className="mt-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Status: Tax-Free under New Regime ({CONFIG.year})
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
              For a <strong>₹8 Lakh salary</strong>, your tax payable is{' '}
              <span className="font-bold text-2xl">₹0 (Zero)</span> under the
              New Tax Regime.
            </p>
            <p>
              <strong>Why?</strong> Your calculated tax is{' '}
              <strong>₹16,250</strong>, but the government gives you a full
              discount (Rebate u/s 87A up to ₹12 Lakh taxable income).
            </p>
            <div className="flex items-start gap-2 bg-white/60 p-3 rounded border border-lime-200 text-sm text-amber-800">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                <strong>Old Regime Warning:</strong> Without substantial
                investments, you will pay approx <strong>₹65,000</strong> in
                tax.
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border border-lime-100">
              <p className="text-sm font-semibold mb-4 text-center text-slate-700">
                Verify with our Calculator:
              </p>
              <InlineTaxCalculator defaultSalary={800000} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-8l-1" type="in-article" />
      </div>

      {/* --- SECTION 1: STILL ZERO TAX --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-emerald-600" /> Still Zero Tax
          at ₹8 Lakhs
        </h2>
        <Card className="bg-emerald-50 border-emerald-200 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-900 text-lg">
              How the rebate works at ₹8 Lakhs ({CONFIG.year})
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-emerald-900">
            <ul className="space-y-4">
              <li className="bg-white p-3 rounded border border-emerald-100 shadow-sm">
                <strong>₹7.75 Lakhs Salary</strong>
                <br />
                Minus ₹75k Std Deduction = Taxable ₹7.00 Lakhs.
                <br />
                <span className="text-emerald-600 font-bold">
                  Tax = ZERO
                </span>{' '}
                (Full 87A Rebate).
              </li>
              <li className="bg-white p-3 rounded border border-emerald-100 shadow-sm">
                <strong>₹8.00 Lakhs Salary</strong>
                <br />
                Minus ₹75k Std Deduction = Taxable ₹7.25 Lakhs.
                <br />
                <span className="text-emerald-600 font-bold">
                  Tax = ZERO
                </span>{' '}
                (Still under ₹12L rebate limit).
              </li>
            </ul>
            <p className="mt-4 font-medium">
              The higher rebate limit (₹12 Lakhs taxable income) means even ₹8
              Lakhs salary remains completely tax-free in the New Regime.
            </p>
          </CardContent>
        </Card>
      </section>

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
                  ₹66,667
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ₹66,667
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Est.)
                </TableCell>
                <TableCell className="text-red-600">- ₹3,600</TableCell>
                <TableCell className="text-red-600">- ₹3,600</TableCell>
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
                <TableCell className="text-red-600">- ₹5,416</TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-bold text-emerald-900 text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-bold text-emerald-700 text-lg">
                  ₹62,867
                </TableCell>
                <TableCell className="font-bold text-amber-700 text-lg">
                  ₹57,451
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic">
          *PF is assumed at 12% of Basic Salary (Basic assumed as 50% of CTC).
        </p>
      </section>

      {/* --- SECTION 3: CALCULATION --- */}
      <section className="mb-12">
        <h2
          id="new-regime"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
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
              <br />
              Taxable Income: ₹8,00,000 - ₹
              {CONFIG.standardDeductionNew.toLocaleString('en-IN')} ={' '}
              <strong>₹7,25,000</strong>.
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
                    <TableCell>₹4 Lakhs - ₹7.25 Lakhs</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>₹3,25,000 × 5% = ₹16,250</TableCell>
                  </TableRow>
                  <TableRow className="font-bold bg-slate-50">
                    <TableCell>Gross Tax</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹16,250</TableCell>
                  </TableRow>
                  <TableRow className="font-bold text-emerald-600 bg-emerald-50/50">
                    <TableCell>Less: Rebate 87A</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>- ₹16,250</TableCell>
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
              <strong>Note on Section 87A ({CONFIG.year}):</strong> Full tax
              rebate (up to ₹{CONFIG.rebateMaxNew.toLocaleString('en-IN')}) if
              taxable income ≤{' '}
              <strong>
                ₹{(CONFIG.rebateLimitNew / 100000).toLocaleString('en-IN')}{' '}
                Lakhs
              </strong>
              . Your ₹7.25L is comfortably within the limit.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 4: BREAK EVEN --- */}
      <section className="mb-12">
        <h2
          id="break-even"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
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
              To beat the New Regime tax of ₹23,400, you need total deductions
              in the Old Regime exceeding:
            </p>
            <p className="text-2xl font-bold text-indigo-700 mb-2">₹2,60,000</p>
            <p>
              If your [80C + HRA + 80D + Home Loan Interest] is more than ₹2.6
              Lakhs, switch to Old Regime. Otherwise, stick to New Regime.
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      {/* --- SECTION: RELATED LINKS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
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
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹10 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    See tax calculations for the next salary bracket.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Compare Now{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 2: RD Calculator */}
          <Link href="/rd-calculator/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    <PiggyBank className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    RD Calculator
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Calculate returns on secure recurring deposits.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                  Check Returns{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 3: SIP Calculator */}
          <Link href="/sip-calculator/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Invest Surplus
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    See how small monthly investments grow over time.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                  Start SIP{' '}
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
