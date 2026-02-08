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
  TrendingDown,
  RefreshCw,
  Layers,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  Clock,
  PieChart,
  CheckCircle2,
  Wallet,
  Scale,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'SWP Retirement Guide: Monthly Income & FIRE Strategy',
  description:
    'Ultimate SWP retirement guide: Generate monthly income from mutual funds, bucketing strategy, SWP vs dividend tax comparison, FIRE India & inflation-proofing.',
  keywords: [
    'systematic withdrawal plan swp',
    'swp for retirement monthly income',
    'fire movement india',
    'swp vs dividend tax',
    'retirement bucketing strategy',
    'inflation adjusted swp calculator',
  ],
  openGraph: {
    title:
      'The Ultimate Retirement Withdrawal Guide: SWP vs Dividends vs Rental',
    description:
      'Learn how to create a tax-free monthly income from your mutual funds using SWP and the Bucketing Strategy.',
    url: 'https://fincado.com/guides/swp-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/swp/swp-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Relaxed retired couple enjoying financial freedom',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'Is SWP better than dividend (IDCW) for retirement?',
    answer:
      'Yes. SWP is far superior due to tax efficiency (12.5% LTCG vs 30% dividend tax), control over withdrawal amount, and capital preservation.',
  },
  {
    question: 'What is the 4% withdrawal rule?',
    answer:
      'The 4% rule suggests withdrawing 4% of your initial retirement corpus annually, adjusted for inflation, to ensure your money lasts for 30 years.',
  },
  {
    question: 'How does the bucketing strategy work?',
    answer:
      'Bucketing divides corpus into 3 parts: Bucket 1 (Liquid/Cash) for 1-3 years expenses, Bucket 2 (Debt) for 4-10 years, and Bucket 3 (Equity) for 10+ years growth.',
  },
];

export default function SWPGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SWP & FIRE Guide',
            url: 'https://fincado.com/guides/swp-guide/',
          },
        ]}
      />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'The Ultimate Retirement Withdrawal Guide: SWP vs Dividends vs Rental',
            description:
              'Comprehensive guide on using SWP for retirement income, the Bucketing Strategy, and achieving FIRE in India.',
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
            datePublished: '2025-02-01',
            dateModified: '2025-02-01',
            image: '/images/guides/swp/swp-guide-hero.webp',
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

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-purple-100 text-purple-800 hover:bg-purple-200 px-3 py-1"
        >
          Retirement Planning
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          The Ultimate Retirement Withdrawal Guide: SWP vs Dividends & FIRE
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 16 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jan 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="SWP & FIRE Retirement Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Generating a consistent monthly income post-retirement is the #1 challenge for every retiree. While traditional options like FDs and annuities offer safety, they fail to beat inflation.</p>
            <p>Enter the <strong>Systematic Withdrawal Plan (SWP)</strong>—a powerful tool that, when combined with the <strong>Bucketing Strategy</strong>, can generate tax-efficient income for 30+ years. Whether you're planning for <strong>FIRE (Financial Independence, Retire Early)</strong> or traditional retirement, this guide is your blueprint.</p>`}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
            <Image
              src="/images/guides/swp/swp-guide-hero.webp"
              alt="Relaxed retired couple enjoying financial freedom"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS SWP --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-indigo-600" /> What is SWP
            (Systematic Withdrawal Plan)?
          </h2>
          <p className="mb-6 text-slate-700">
            <strong>SWP</strong> allows you to withdraw a fixed amount from your
            mutual fund investments at regular intervals (monthly/quarterly).
            Unlike IDCW (Dividends), you control the amount, frequency, and tax
            liability.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800 flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> Regular Income
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Create your own &quot;pension&quot;.
              </CardContent>
            </Card>
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Tax Efficient
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Only gains are taxed.
              </CardContent>
            </Card>
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Corpus keeps growing.
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* --- TOC --- */}
      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-bold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a
                href="#bucketing-strategy"
                className="hover:text-indigo-600 hover:underline"
              >
                1. The Bucketing Strategy
              </a>
            </li>
            <li>
              <a
                href="#swp-vs-idcw"
                className="hover:text-indigo-600 hover:underline"
              >
                2. SWP vs Dividend (Tax Reality)
              </a>
            </li>
            <li>
              <a
                href="#inflation-proofing"
                className="hover:text-indigo-600 hover:underline"
              >
                3. Inflation-Proofing Your Income
              </a>
            </li>
            <li>
              <a
                href="#swp-taxation"
                className="hover:text-indigo-600 hover:underline"
              >
                4. SWP Taxation 2025
              </a>
            </li>
            <li>
              <a
                href="#fire-planning"
                className="hover:text-indigo-600 hover:underline"
              >
                5. FIRE & Safe Withdrawal Rate
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-indigo-600 hover:underline">
                6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-swp-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: BUCKETING --- */}
      <section className="mb-12">
        <h2
          id="bucketing-strategy"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Layers className="h-6 w-6 text-blue-600" /> The &quot;Bucketing&quot;
          Strategy
        </h2>
        <p className="mb-6 text-slate-700">
          The biggest fear in retirement is a market crash. The Bucketing
          Strategy solves this by dividing your corpus into time-based buckets.
        </p>

        <div className="space-y-6">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Bucket 1: Years 1-3 (Immediate)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Allocation:</strong> 15-20%
                </li>
                <li>
                  <strong>Instruments:</strong> Liquid Funds, FD
                </li>
                <li>
                  <strong>Role:</strong> Pay monthly bills. Zero risk.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Bucket 2: Years 4-10 (Stability)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Allocation:</strong> 30-35%
                </li>
                <li>
                  <strong>Instruments:</strong> Debt/Hybrid Funds
                </li>
                <li>
                  <strong>Role:</strong> Refill Bucket 1. Moderate growth
                  (8-9%).
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-purple-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-800 text-lg">
                Bucket 3: Years 10+ (Growth)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Allocation:</strong> 45-50%
                </li>
                <li>
                  <strong>Instruments:</strong> Equity Mutual Funds
                </li>
                <li>
                  <strong>Role:</strong> Beat inflation. High growth (12-14%).
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
          <strong>Why it works:</strong> Even if the market crashes by 50%, your
          Bucket 1 ensures you don&apos;t have to sell equity at a loss for at
          least 3 years.
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-swp-2" type="leaderboard" />
      </div>

      {/* --- SECTION 3: SWP VS IDCW --- */}
      <section className="mb-12">
        <h2
          id="swp-vs-idcw"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-amber-500" /> SWP vs IDCW (Dividend)
        </h2>
        <p className="mb-6 text-slate-700">
          SWP withdrawals are taxed as Capital Gains, while Dividends are taxed
          at your income slab rate.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  SWP (Growth)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  IDCW (Dividend)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Control
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Full (You decide)
                </TableCell>
                <TableCell className="text-red-600">
                  Zero (Fund decides)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Rate (30% Slab)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  0% - 12.5%
                </TableCell>
                <TableCell className="text-red-600 font-bold">30%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Net Income (on ₹6L)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  ₹6,00,000
                </TableCell>
                <TableCell>₹4,20,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 4: INFLATION --- */}
      <section className="mb-12">
        <h2
          id="inflation-proofing"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingDown className="h-6 w-6 text-red-500" /> Inflation-Proofing
        </h2>
        <p className="mb-6 text-slate-700">
          A fixed ₹50,000 withdrawal today will feel like ₹25,000 in 15 years.
          You must increase your withdrawal annually.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Year</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Monthly SWP (5% Hike)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Annual Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Year 1</TableCell>
                <TableCell>₹50,000</TableCell>
                <TableCell>₹6.00 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year 5</TableCell>
                <TableCell>₹60,776</TableCell>
                <TableCell>₹7.29 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year 10</TableCell>
                <TableCell>₹78,119</TableCell>
                <TableCell>₹9.37 Lakh</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-bold text-red-900">
                  Year 20
                </TableCell>
                <TableCell className="font-bold text-red-900">
                  ₹1,26,348
                </TableCell>
                <TableCell className="font-bold text-red-900">
                  ₹15.16 Lakh
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-swp-3" type="leaderboard" />
      </div>

      {/* --- SECTION 5: TAXATION --- */}
      <section className="mb-12">
        <h2
          id="swp-taxation"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> SWP Taxation
          (2025)
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Equity Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li>
                  <strong>LTCG:</strong> 12.5% (Gains &gt; ₹1.25L exempt).
                </li>
                <li>
                  Since SWP withdraws principal too, taxable gain is often
                  minimal.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">
                Debt Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>
                Taxed at your <strong>Income Tax Slab Rate</strong>. No
                indexation benefit.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 6: FIRE & 4% RULE --- */}
      <section className="mb-12">
        <h2
          id="fire-planning"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-purple-600" /> FIRE & The 4% Rule
        </h2>
        <p className="mb-6 text-slate-700">
          The 4% Rule states you can withdraw 4% of your initial corpus annually
          (adjusted for inflation) and never run out of money for 30 years.
        </p>

        <Card className="border-purple-100 bg-purple-50/30 mb-6">
          <CardHeader className="pb-2 border-b border-purple-100">
            <CardTitle className="text-purple-900 text-lg">
              Safe Withdrawal Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Conservative (40+ Years)</span>
                <strong>3.5% - 4%</strong>
              </li>
              <li className="flex justify-between">
                <span>Moderate (30 Years)</span>
                <strong>4% - 5%</strong>
              </li>
              <li className="flex justify-between">
                <span>Aggressive (20 Years)</span>
                <strong>6% - 7%</strong>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Instrument
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Tax Efficiency
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Inflation Protection
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Capital Growth
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  SWP (Equity)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  High
                </TableCell>
                <TableCell className="text-emerald-600">Yes</TableCell>
                <TableCell className="text-emerald-600">Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  FD Interest
                </TableCell>
                <TableCell className="text-red-600">Low</TableCell>
                <TableCell className="text-red-600">No</TableCell>
                <TableCell className="text-red-600">No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Annuity
                </TableCell>
                <TableCell className="text-red-600">Low</TableCell>
                <TableCell className="text-red-600">No</TableCell>
                <TableCell className="text-red-600">No</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
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
          <AccordionItem
            value="item-custom-1"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I lose money with SWP?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              If the market performs poorly for many years and you withdraw too
              aggressively (e.g., 8-10%), you can deplete your corpus. Stick to
              4-5% withdrawal rates.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Which funds are best for SWP?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Bucket 1: Liquid. Bucket 2: Conservative Hybrid. Bucket 3:
              Flexi-cap/Index.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            SWP is the modern retiree&apos;s pension plan.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Use
              Bucketing
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Choose
              Growth
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 4% Rule
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Mutual Fund investments are subject to
          market risks. Tax laws are subject to change. This guide is for
          educational purposes. Consult a SEBI registered investment advisor
          before retiring.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-indigo-600 to-purple-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Plan your financial freedom
          </h2>
          <p className="mb-8 max-w-lg text-indigo-100 text-lg">
            Calculate how long your retirement corpus will last.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/swp-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50 shadow-lg"
            >
              SWP Calculator
            </Link>
            <Link
              href="/fire-calculator/"
              className="rounded-lg border border-indigo-400 bg-indigo-800/30 px-8 py-4 font-bold text-white transition hover:bg-indigo-800/50"
            >
              FIRE Calculator
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-swp-4" type="leaderboard" />
      </div>
    </article>
  );
}
