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
import { Badge } from '@/components/ui/badge';
import {
  Calculator,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Clock,
  Landmark,
  CheckCircle2,
  Building2,
  TrendingUp,
  XCircle,
  ListChecks,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title:
    'Retirement Planning Guide India: Strategies, Corpus Calculation & EPF/NPS/PPF',
  description:
    'Complete guide to retirement planning in India. Calculate your required corpus, understand inflation impact, and master the EPF+PPF+NPS strategy to secure your golden years.',
  keywords: [
    'retirement planning India',
    'retirement corpus calculator',
    'EPF vs PPF vs NPS',
    'inflation adjusted retirement',
    'retirement mistakes to avoid',
    'NPS tier 1 vs tier 2',
    'early retirement India'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/retirement-planning-india/',
  },
  openGraph: {
    title: 'Retirement Planning Guide (India) | Build Your Dream Corpus',
    description:
      "Don't guess your retirement number. Use our scientific formula and asset allocation strategies to build a failsafe retirement plan.",
    url: 'https://fincado.com/guides/retirement-planning-india/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'How much money is needed for retirement in India?',
    answer:
      'There is no fixed number, but a common rule is 25-30 times your annual expenses at the time of retirement. For a middle-class lifestyle in a metro city, a corpus of ₹3-5 Crores is often recommended for those retiring in 20-25 years.',
  },
  {
    question: 'Is NPS better than PPF for retirement?',
    answer:
      'NPS is better for growth as it invests in equity (stocks), offering higher potential returns (10-12%) compared to PPF (7.1%). However, PPF offers guaranteed tax-free returns. A combination of both is usually best.',
  },
  {
    question: 'What is the 4% withdrawal rule?',
    answer:
      'The 4% rule suggests you can withdraw 4% of your retirement corpus annually to cover expenses, adjusting for inflation, without running out of money for at least 30 years.',
  }
];

export default function RetirementPlanningGuidePage() {
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
              'Retirement Planning Guide (India): Build Your Dream Retirement Without Compromising Your Lifestyle',
            description:
              'Comprehensive guide to building a retirement corpus in India, covering inflation, asset allocation, and product selection.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
              },
            },
            datePublished: '2025-10-15',
            dateModified: '2025-10-15',
            image:
              '/images/guides/retirement/retirement-planning.webp',
          }),
        }}
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

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Retirement Planning',
            url: 'https://fincado.com/guides/retirement-planning-india/',
          }
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1"
        >
          Essential Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Retirement Planning Guide: Strategy & Corpus Calculation
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 20 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Oct 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Retirement Planning Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Retirement planning isn't just about saving money—it's about strategically building a corpus that can sustain your lifestyle for 25-30 years after you stop working, while inflation continuously erodes purchasing power. Most Indians severely underestimate how much they need, leading to financial stress in their golden years. This comprehensive guide provides actionable strategies, real calculations, and smart product combinations to secure your retirement.</p>`}
          />
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-retirement-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: CORPUS CALCULATION --- */}
      <section className="mb-12">
        <h2
          id="corpus-needed"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-indigo-600" /> How Much Corpus Do
          You Need?
        </h2>
        <p className="mb-6 text-slate-700">
          The most common retirement planning mistake is guessing a random
          number like &quot;₹1 crore&quot; or &quot;₹2 crore&quot; without any
          scientific basis. Your required corpus depends on multiple
          personalized factors that vary dramatically from person to person.
        </p>

        <Card className="border-slate-200 mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900">
              The Formula
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="bg-white p-3 rounded border border-slate-200 text-center font-mono text-slate-800 mb-4">
              FV = PV × (1 + r)^n
            </div>
            <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
              <li>
                <strong>FV</strong> = Future value (corpus needed)
              </li>
              <li>
                <strong>PV</strong> = Present value (current monthly expense)
              </li>
              <li>
                <strong>r</strong> = Expected inflation rate
              </li>
              <li>
                <strong>n</strong> = Years until retirement
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* IMAGE: Corpus Accumulation */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/retirement/retirement-corpus-accumulation.webp"
            alt="Area chart showing exponential growth of retirement corpus over 25 years through compounding"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-indigo-100 bg-indigo-50/30">
          <CardHeader className="pb-2 border-b border-indigo-100">
            <CardTitle className="text-indigo-900 text-lg">
              Real-World Example: 35-Year-Old Professional
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700 space-y-6">
            <div>
              <strong className="block text-indigo-800 mb-2">
                Current Situation:
              </strong>
              <ul className="grid sm:grid-cols-2 gap-2">
                <li>• Current Age: 35</li>
                <li>• Retirement Age: 60</li>
                <li>• Life Expectancy: 85</li>
                <li>• Monthly Expense: ₹50,000</li>
                <li>• Current Savings: ₹15 Lakh</li>
                <li>• Inflation: 6%</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-indigo-100">
                <strong>Step 1: Expenses at Age 60</strong>
                <p className="mt-1">
                  ₹50,000 × (1.06)^25 ={' '}
                  <span className="text-red-600 font-bold">
                    ₹2,14,500 per month
                  </span>
                </p>
              </div>

              <div className="bg-white p-4 rounded border border-indigo-100">
                <strong>Step 2: Total Corpus Needed</strong>
                <p className="mt-1">
                  To sustain ₹2.15L/month for 25 years (post-retirement):
                  <br />
                  <span className="text-lg font-bold text-slate-900">
                    ₹5.2 Crore - ₹6 Crore
                  </span>
                </p>
              </div>

              <div className="bg-white p-4 rounded border border-indigo-100">
                <strong>Step 3: Existing Savings Growth</strong>
                <p className="mt-1">
                  ₹15 Lakh at 12% for 25 years grows to{' '}
                  <strong>₹2.55 Crore</strong>.
                </p>
              </div>

              <div className="bg-white p-4 rounded border border-indigo-100">
                <strong>Step 4: The Gap</strong>
                <p className="mt-1">
                  ₹6 Cr (Needed) - ₹2.55 Cr (Existing) ={' '}
                  <strong>₹3.45 Crore Shortfall</strong>.
                </p>
              </div>
            </div>

            <div className="bg-indigo-100 p-4 rounded border border-indigo-200 text-indigo-900 text-center">
              <strong className="block text-lg mb-1">
                Monthly SIP Required
              </strong>
              <span className="text-2xl font-bold">₹18,000 - ₹20,000</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            Why People Underestimate Needs
          </h3>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>
              <strong>Ignoring Inflation:</strong> Assuming expenses stay flat.
            </li>
            <li>
              <strong>Underestimating Lifespan:</strong> Living to 90 is common.
            </li>
            <li>
              <strong>Medical Inflation:</strong> Healthcare costs rise 10-15%.
            </li>
            <li>
              <strong>Lifestyle Creep:</strong> Spending rises with income.
            </li>
          </ul>
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-retirement-2" type="rectangle" />
      </div>

      {/* --- SECTION 2: INFLATION --- */}
      <section className="mb-12">
        <h2
          id="inflation"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingDown className="h-6 w-6 text-red-500" /> Inflation: The
          Silent Killer
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`Inflation erodes purchasing power. What costs ₹50,000 today will cost approx ₹2.15 lakh/month in 25 years at 6% inflation.`}
          />
        </div>

        {/* IMAGE: Purchasing Power */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/retirement/purchasing-power-erosion-30y.webp"
            alt="Bar chart showing purchasing power of 1 Lakh rupees eroding over 30 years due to inflation"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Current Monthly Expense
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Years to Retire
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Future Monthly Need (6% Inf)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>₹40,000</TableCell>
                <TableCell>20 Years</TableCell>
                <TableCell>₹1.28 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹50,000</TableCell>
                <TableCell>25 Years</TableCell>
                <TableCell>₹2.15 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹75,000</TableCell>
                <TableCell>30 Years</TableCell>
                <TableCell className="text-red-600 font-bold">
                  ₹4.30 Lakh
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹1,00,000</TableCell>
                <TableCell>25 Years</TableCell>
                <TableCell className="text-red-600 font-bold">
                  ₹5.42 Lakh
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="bg-red-50 border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-900 text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Medical Inflation Warning
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-800">
            <p className="mb-2">
              Healthcare costs in India inflate at <strong>10-15%</strong>{' '}
              annually.
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Cardiac Surgery:</strong> ₹5 Lakh today → ₹40-50 Lakh in
                25 years.
              </li>
              <li>
                <strong>Room Charges:</strong> ₹5k/day → ₹40k/day.
              </li>
            </ul>
            <p className="mt-2 font-medium">
              Must Have: ₹25-50L Health Insurance + Critical Illness Cover.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-retirement-3" type="banner" />
      </div>

      {/* --- SECTION 3: PRODUCT STRATEGY --- */}
      <section className="mb-12">
        <h2
          id="strategy"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> EPF + PPF + NPS:
          The Three Pillars
        </h2>
        <p className="mb-6 text-slate-700">
          Smart planners use a combination that balances safety, growth, tax
          efficiency, and liquidity.
        </p>

        {/* IMAGE: Strategy */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/retirement/epf-ppf-nps-comparison.webp"
            alt="Comparison chart showing features of EPF, PPF, and NPS as the three pillars of retirement planning"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" /> EPF (Stability)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Mandatory for Salaried.</li>
                <li>8.25% Interest.</li>
                <li>EEE Tax Status.</li>
                <li>
                  <strong>Role:</strong> Stability Anchor.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg flex items-center gap-2">
                <Landmark className="h-5 w-5" /> PPF (Tax-Free)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Open to All.</li>
                <li>7.1% (Govt backed).</li>
                <li>15 Year Lock-in.</li>
                <li>
                  <strong>Role:</strong> Safe Compounding.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> NPS (Growth)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Market Linked (10-14%).</li>
                <li>Extra ₹50k Tax Benefit.</li>
                <li>Flexible Allocation.</li>
                <li>
                  <strong>Role:</strong> Wealth Engine.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Optimal Allocation Strategy (Age 30-40)
        </h3>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Product
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Allocation
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Purpose
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>EPF</TableCell>
                <TableCell>Automatic (12%)</TableCell>
                <TableCell>Base Stability</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PPF</TableCell>
                <TableCell>15-20%</TableCell>
                <TableCell>Tax-Free Debt</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NPS</TableCell>
                <TableCell>30-40%</TableCell>
                <TableCell>Equity Growth</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Equity MFs</TableCell>
                <TableCell>30-40%</TableCell>
                <TableCell>Max Aggressive Growth</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Strategy (25Y Investment)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Final Corpus
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Net (Post Tax)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>EPF Only (8.25%)</TableCell>
                <TableCell>₹2.46 Cr</TableCell>
                <TableCell>₹2.46 Cr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PPF Only (7.1%)</TableCell>
                <TableCell>₹2.06 Cr</TableCell>
                <TableCell>₹2.06 Cr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NPS (12%)</TableCell>
                <TableCell>₹3.76 Cr</TableCell>
                <TableCell>₹3.20 Cr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Balanced Mix (10.5%)</TableCell>
                <TableCell>₹3.18 Cr</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ₹2.85 Cr (Optimal)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-retirement-4" type="rectangle" />
      </div>

      {/* --- SECTION 4: CALCULATOR USAGE --- */}
      <section className="mb-12">
        <h2
          id="calculator"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-purple-600" /> Calculator Guide
        </h2>
        <Card className="border-purple-100 bg-purple-50/30">
          <CardContent className="pt-6">
            <p className="mb-4 text-sm text-slate-700">
              Online calculators are powerful if used correctly. Essential
              Inputs:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 text-sm">
              <li>
                <strong className="text-purple-700">1. Inflation:</strong> Use
                6-7% (General), 10% (Medical).
              </li>
              <li>
                <strong className="text-purple-700">2. Life Expectancy:</strong>{' '}
                Plan till age 85-90.
              </li>
              <li>
                <strong className="text-purple-700">
                  3. Post-Retire Return:
                </strong>{' '}
                Conservative 6-8%.
              </li>
              <li>
                <strong className="text-purple-700">4. Expenses:</strong>{' '}
                Include annual costs (vacations).
              </li>
            </ul>
            <div className="mt-4 bg-white p-3 rounded border border-purple-100 text-sm text-slate-600">
              <strong>Example:</strong> Age 35, Retire 60, Exp 85. Monthly Exp
              ₹60k. Existing ₹20L.
              <br />
              <strong>Result:</strong> Need ₹9.47 Cr Corpus. Monthly Invest
              ₹52,011.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-retirement-5" type="square" />
      </div>

      {/* --- SECTION 5: MISTAKES --- */}
      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Common Mistakes &
          Solutions
        </h2>

        {/* IMAGE: Cost of Delay */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/retirement/cost-of-delay-retirement.webp"
            alt="Bar graph comparing corpus accumulated by starting at age 25, 35, and 45"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Mistake 1 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 1. Starting Too
                Late
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> Starting at 45 instead of 25 reduces
                corpus from ₹3.5 Cr to ₹48 Lakh (for same SIP).
              </p>
              <p>
                <strong>Solution:</strong> Start now, even small.
              </p>
            </CardContent>
          </Card>

          {/* Mistake 2 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 2. Relying on EPF
                Only
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> EPF (8.25%) barely beats inflation. Real
                return ~1-2%.
              </p>
              <p>
                <strong>Solution:</strong> Add Equity (NPS/MFs) for growth.
              </p>
            </CardContent>
          </Card>

          {/* Mistake 3 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 3. Premature
                Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> Withdrawing ₹10L at age 40 kills ₹47L of
                future corpus (at 60).
              </p>
              <p>
                <strong>Solution:</strong> Keep retirement funds untouchable.
              </p>
            </CardContent>
          </Card>

          {/* Mistake 4 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 4. Ignoring Asset
                Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> 100% Debt = Low Growth. 100% Equity =
                Risk near retirement.
              </p>
              <p>
                <strong>Solution:</strong> Shift from Equity to Debt as you age
                (Glide Path).
              </p>
            </CardContent>
          </Card>

          {/* Mistake 5 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 5. Ignoring
                Healthcare
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> One surgery can wipe out savings. Medical
                inflation is 15%.
              </p>
              <p>
                <strong>Solution:</strong> Separate medical corpus + Health
                Insurance.
              </p>
            </CardContent>
          </Card>

          {/* Mistake 6 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 6. Underestimating
                Life
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> Planning for 15 years post-retire, but
                living 30 years. Running out of money at 75.
              </p>
              <p>
                <strong>Solution:</strong> Plan for age 90.
              </p>
            </CardContent>
          </Card>

          {/* Mistake 7 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 7. Lifestyle
                Inflation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> Expenses rise with income, but savings
                don&apos;t keep up.
              </p>
              <p>
                <strong>Solution:</strong> Save 50% of every raise.
              </p>
            </CardContent>
          </Card>

          {/* Mistake 8 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> 8. Set and Forget
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Cost:</strong> Portfolio drift risk.
              </p>
              <p>
                <strong>Solution:</strong> Annual review and rebalancing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="guide-retirement-7" type="banner" />
      </div>

      {/* --- SECTION 6: CHECKLIST --- */}
      <section className="mb-12">
        <h2
          id="checklist"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ListChecks className="h-6 w-6 text-emerald-600" /> Actionable
          Checklist
        </h2>

        <div className="space-y-6">
          <Card className="border-emerald-200 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Age 25-30: Foundation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Start EPF.</li>
                <li>Open PPF (₹12.5k/mo).</li>
                <li>Start Equity SIP (₹5-10k).</li>
                <li>Term & Health Insurance.</li>
                <li>
                  <strong>Target:</strong> Save 20-25% of income.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Age 30-40: Acceleration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Max PPF (₹1.5L).</li>
                <li>Increase NPS (₹1-2L).</li>
                <li>Step up SIPs by 10%.</li>
                <li>Review Portfolio Annually.</li>
                <li>
                  <strong>Target:</strong> Corpus = 3-5x Annual Income.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-indigo-800 text-lg">
                Age 40-50: Peak Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Boost savings to 30-35%.</li>
                <li>Max all tax-saving options.</li>
                <li>Start reducing equity exposure.</li>
                <li>Clear high-interest debt.</li>
                <li>
                  <strong>Target:</strong> Corpus = 8-12x Annual Income.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg">
                Age 50-60: Preservation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Shift to 60-70% Debt.</li>
                <li>Plan Annuity Strategy.</li>
                <li>Calculate Post-Retire Income sources.</li>
                <li>
                  <strong>Target:</strong> 100% of Corpus Goal.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">
                Post-60: Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Set up SWP.</li>
                <li>Convert NPS to Annuity.</li>
                <li>Maintain 15-20% Equity for growth.</li>
                <li>Monitor withdrawal rate (4-5%).</li>
                <li>Update Estate Planning.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Thoughts
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Retirement planning is your responsibility. The corpus you need
            might seem daunting (₹5-10 Cr), but broken down into monthly SIPs
            started early, it&apos;s achievable.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Start Early
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Diversify
              (EPF+NPS)
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Adjust for
              Inflation
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only and does not constitute financial advice. Always consult your
          financial advisor.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-indigo-600 to-purple-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Find Your Retirement Number
          </h2>
          <p className="mb-8 max-w-lg text-indigo-100 text-lg">
            Use our free retirement calculator to see exactly how much you need
            to save monthly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/retirement-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50 shadow-lg"
            >
              Retirement Calculator
            </Link>
            <Link
              href="/sip-calculator/"
              className="rounded-lg border border-indigo-400 bg-indigo-800/30 px-8 py-4 font-bold text-white transition hover:bg-indigo-800/50"
            >
              Plan SIP
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
