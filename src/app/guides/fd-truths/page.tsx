import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
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
  Landmark,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Banknote,
  XCircle,
  PlusCircle,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Fixed Deposit Guide 2025: Interest, Tax, and Hidden Risks',
  description:
    'FDs are popular but misunderstood. Learn about FD interest calculation, tax rules, real vs nominal returns, and when FDs are good vs bad for your wealth.',
  keywords: [
    'fixed deposit guide India',
    'FD interest calculation',
    'FD tax rules 2025',
    'FD vs inflation',
    'senior citizen FD rates',
    'is FD safe',
    'FD return calculator',
    'real return on FD',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/fd-truths',
  },
  openGraph: {
    title: 'The Real Truth About Fixed Deposits: Safe or Wealth Destroyer?',
    description:
      'Discover the hidden impact of inflation and tax on your FD returns. A complete guide for smart savers.',
    url: 'https://www.fincado.com/guides/fd-truths',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Is FD interest taxable?',
    answer:
      'Yes, FD interest is fully taxable at your income tax slab rate. Banks also deduct TDS if interest exceeds a certain threshold (₹40,000 (₹50,000 for senior citizens), subject to change by the government.).',
  },
  {
    question: 'Does FD beat inflation?',
    answer:
      'Often, no. After accounting for tax and inflation, real returns on FDs are frequently close to zero or negative, especially for those in higher tax brackets.',
  },
  {
    question:
      'What is the difference between cumulative and non-cumulative FD?',
    answer:
      'In cumulative FDs, interest is reinvested and paid at maturity (compounding effect). In non-cumulative FDs, interest is paid out regularly (monthly/quarterly) for income.',
  },
  {
    question: 'Do senior citizens get extra interest on FD?',
    answer:
      'Yes, most banks offer 0.25% to 0.75% extra interest rate on FDs for senior citizens compared to general public rates.',
  },
];

export default function FdGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'Fixed Deposit Guide (FD Truths): The Real Story Behind "Safe" Returns',
            description:
              'Complete guide to Fixed Deposits in India covering interest calculation, taxation, inflation impact, and strategic use cases.',
            image: 'https://www.fincado.com/images/og/fd-truths.webp',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-22',
            dateModified: '2025-12-22',
          }),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Fixed Deposit Guide',
            url: 'https://www.fincado.com/guides/fd-truths',
          },
        ]}
      />

      {/* --- FAQ SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Investment Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          FD Guide 2025-26: Interest, Tax, and Inflation Risks
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Data-Backed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="FD Guide 2025: Interest, Tax, and Hidden Risks" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p>Fixed deposits (FDs) are the most popular investment for Indian savers, yet most people misunderstand how much they actually earn after inflation and tax. This single-page guide breaks down FD interest, tax rules, senior citizen benefits, and when FDs are genuinely good—or quietly destroying your wealth.</p>
          `}
          />
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: INTEREST CALCULATION --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="interest-calculation"
            className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2"
          >
            <Banknote className="h-6 w-6 text-blue-600" /> FD Interest
            Calculation
          </h2>
          <p className="mb-6 text-slate-700">
            FDs offer a fixed rate of interest for a fixed tenure, making them
            simple to understand but also easy to overestimate in terms of
            returns.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Simple vs Compound Interest
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Most bank FDs use <strong>compound interest</strong>, not simple
            interest. Interest is calculated on principal plus accumulated
            interest at regular intervals.
          </p>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
            <p className="font-mono text-sm mb-2">
              <strong>Simple Interest:</strong> Interest = P × R × T
            </p>
            <p className="font-mono text-sm">
              <strong>Compound Interest:</strong> A = P × (1 + R/n)<sup>nT</sup>
            </p>
            <p className="text-xs text-slate-500 mt-2">
              (P=Principal, R=Rate, T=Time, n=Compounding freq)
            </p>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6">
            <h4 className="font-bold text-blue-900 mb-2">
              Example: ₹5 Lakh FD @ 7% for 5 Years
            </h4>
            <ul className="space-y-1 text-sm text-blue-800 list-disc pl-4">
              <li>
                <strong>Compounding:</strong> Quarterly (n=4)
              </li>
              <li>
                <strong>Outcome:</strong> Effective rate &gt; 7%. Maturity
                amount ~₹7.0–7.1 Lakh.
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-emerald-800 flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" /> Cumulative FD
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Interest is reinvested and paid at maturity. Best for long-term
                compounding.
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-800 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Non-Cumulative FD
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Interest paid out monthly/quarterly. Best for regular income
                (e.g., retirees).
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-2" type="rectangle" />
      </div>

      {/* --- SECTION 2: FD VS INFLATION --- */}
      <section className="mb-12">
        <h2
          id="fd-vs-inflation"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-red-500" /> FD vs Inflation: The
          Silent Killer
        </h2>
        <p className="mb-6 text-slate-700">
          FDs feel &quot;safe&quot; because the number in your bank account
          always goes up. The hidden danger is that{' '}
          <strong>purchasing power</strong> may actually be going down.
        </p>

        {/* IMAGE: Real vs Nominal Return */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/fd/real-vs-nominal-return.webp"
            alt="Graph comparing nominal FD returns vs real returns adjusted for inflation"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-red-100 bg-red-50/30 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-800 text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> The Inflation Trap Example
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-2">
            <p>
              <strong>Scenario:</strong> FD Rate 7% | Inflation 6%
            </p>
            <div className="bg-white p-3 rounded border border-red-200 font-mono text-center">
              Real Return ≈ 7% - 6% = <strong>1%</strong>
            </div>
            <p>
              Your money is effectively growing only about 1% in terms of actual
              purchasing power. If inflation hits 7%, your real return is{' '}
              <strong>0%</strong>.
            </p>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900 border border-amber-100">
          <strong>Key Insight:</strong> FDs protect your{' '}
          <strong>capital amount</strong>, but they do{' '}
          <strong>not guarantee protection against inflation</strong>.
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-3" type="banner" />
      </div>

      {/* --- SECTION 3: TAX RULES --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="tax-rules"
            className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2"
          >
            <ShieldCheck className="h-6 w-6 text-slate-600" /> FD Tax Rules
          </h2>
          <p className="mb-6 text-slate-700">
            FD returns look attractive until you factor in{' '}
            <strong>income tax</strong>. Interest is fully taxable at your slab
            rate.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Taxation</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Added to &quot;Income from Other Sources&quot;.</li>
                <li>Taxed at slab rate (up to 30% + cess).</li>
                <li>No special lower tax rate like LTCG.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">TDS Rules</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Deducted if interest &gt; ₹40k (₹50k for seniors).</li>
                <li>usually 10% with PAN.</li>
                <li>Submit 15G/15H to avoid TDS if income low.</li>
              </ul>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 mb-3">
            Real Post-Tax Return (30% Slab)
          </h3>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-900">
                    Factor
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Value
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>FD Rate</TableCell>
                  <TableCell>7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax (30%)</TableCell>
                  <TableCell>-2.1%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Post-Tax Return</TableCell>
                  <TableCell className="font-bold text-slate-900">
                    4.9%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inflation</TableCell>
                  <TableCell>6%</TableCell>
                </TableRow>
                <TableRow className="bg-red-50">
                  <TableCell className="font-bold text-red-900">
                    Real Return
                  </TableCell>
                  <TableCell className="font-bold text-red-600">
                    -1.1% (Negative)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-4" type="rectangle" />
      </div>

      {/* --- SECTION 4: SENIOR CITIZENS --- */}
      <section className="mb-12">
        <h2
          id="senior-citizens"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Landmark className="h-6 w-6 text-amber-600" /> Senior Citizen FD
          Benefits
        </h2>
        <p className="mb-6 text-slate-700">
          For seniors, FDs are still vital due to special benefits.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Higher Interest
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Typically <strong>+0.50%</strong> over regular rates. (e.g., 7.5%
              vs 7.0%).
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                SCSS Scheme
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Senior Citizens&apos; Savings Scheme offers even higher rates,
              quarterly payouts, and safety.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Tax Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Section 80TTB</strong> allows tax-free interest up to
              ₹50,000 per year.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-5" type="banner" />
      </div>

      {/* --- SECTION 5: GOOD VS BAD --- */}
      <section className="mb-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* WHEN GOOD */}
          <div>
            <h2
              id="when-good"
              className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2"
            >
              <CheckCircle2 className="h-6 w-6 text-emerald-600" /> When FD Is
              Good
            </h2>
            <Card className="border-emerald-200 bg-emerald-50/30 h-full">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-emerald-800 shrink-0">
                      1
                    </div>
                    <div className="text-sm text-slate-700">
                      <strong>Short-term goals (1-3 yrs):</strong> Emergency
                      funds, planned expenses.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-emerald-800 shrink-0">
                      2
                    </div>
                    <div className="text-sm text-slate-700">
                      <strong>Risk-averse investors:</strong> Zero tolerance for
                      volatility.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-emerald-800 shrink-0">
                      3
                    </div>
                    <div className="text-sm text-slate-700">
                      <strong>Retirees:</strong> Needing stable monthly income.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* WHEN BAD */}
          <div>
            <h2
              id="when-bad"
              className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2"
            >
              <XCircle className="h-6 w-6 text-red-600" /> When FD Is Bad
            </h2>
            <Card className="border-red-200 bg-red-50/30 h-full">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-red-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-red-800 shrink-0">
                      1
                    </div>
                    <div className="text-sm text-slate-700">
                      <strong>Long-term Wealth (10+ yrs):</strong> Barely beats
                      inflation. Huge opportunity cost.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-red-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-red-800 shrink-0">
                      2
                    </div>
                    <div className="text-sm text-slate-700">
                      <strong>High Tax Slab (30%):</strong> Returns drop to ~5%.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-red-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-red-800 shrink-0">
                      3
                    </div>
                    <div className="text-sm text-slate-700">
                      <strong>Blind Renewal:</strong> Letting money sit in low
                      rates for decades.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-6" type="rectangle" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            FDs are tools for <strong>safety and stability</strong>, not wealth
            creation. Use them for short-term goals and emergency funds. For
            long-term growth, consider tax-efficient alternatives.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Capital
              Safety
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Short Term
              Goals
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Senior
              Citizens
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
          Frequently Asked Questions (FAQs)
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
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

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only. Interest rates and tax rules are subject to change. Always
          verify current bank rates before investing.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Check Your FD Returns Instantly
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Use our free calculator to see maturity amounts and compare with
            other investments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fd-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              FD Calculator
            </Link>
            <Link
              href="/sip-calculator"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Compare with SIP
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-fd-7" type="banner" />
      </div>
    </article>
  );
}
