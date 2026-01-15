import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import InlineSipCalculator from '@/components/InlineSipCalculator';
import FAQSchema from '@/components/FAQSchema';
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
  PieChart,
  Calculator,
  AlertTriangle,
  Lightbulb,
  Clock,
  Target,
  CheckCircle2,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'How much SIP for 1 Crore in 10 Years? (2025 Calculation)',
  description:
    'Want to build ₹1 Crore wealth in 10 years? See the exact monthly SIP required, step-up strategy, and best mutual funds to reach your goal by 2035.',
  keywords: [
    'SIP for 1 crore in 10 years',
    '1 crore sip calculator',
    'monthly investment for 1 crore',
    'SIP step up calculator',
    '1 crore in 10 years strategy',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'How much SIP is needed for ₹1 Crore in 10 Years?',
    description: 'The exact math to becoming a Crorepati in a decade.',
    images: [
      'https://fincado.com/images/guides/mf/mutual-fund-guide-hero.webp',
    ],
  },
  alternates: {
    canonical: 'https://fincado.com/guides/sip-for-1-crore-in-10-years/',
  },
  openGraph: {
    title: 'How much SIP for 1 Crore in 10 Years? (2025 Guide)',
    description:
      'Detailed breakdown: Monthly SIP needed, Step-up strategy, and Asset allocation to hit ₹1 Crore.',
    url: 'https://fincado.com/guides/sip-for-1-crore-in-10-years/',
    type: 'article',
    images: [
      {
        url: 'https://fincado.com/images/guides/mf/mutual-fund-guide-hero.webp/',
        width: 1200,
        height: 600,
        alt: 'Roadmap to 1 Crore Wealth',
      },
    ],
  },
};

export default function Sip1Cr10YearsPage() {
  const pageTitle = 'How much SIP is needed for ₹1 Crore in 10 Years?';

  const faqData = [
    {
      question: 'Is ₹1 crore realistic in 10 years via SIP?',
      answer:
        'Yes, it is mathematically realistic but requires aggressive saving. You need to invest roughly ₹43,000/month at 12% returns. It is not magic; it is disciplined compounding.',
    },
    {
      question: 'What return rate is safe to assume for 10 years?',
      answer:
        'A 12% CAGR is a safe and conservative estimate for Equity Mutual Funds (Nifty 50 or Flexi Cap) over a 10-year horizon. While markets can give 15-18%, planning with 12% ensures you don’t fall short.',
    },
    {
      question: 'Is SIP better than Lump Sum for this goal?',
      answer:
        'For salary earners, SIP is far better because it instills discipline and uses "Rupee Cost Averaging" to lower your buying cost during market ups and downs. Lump sum is risky if deployed right before a crash.',
    },
    {
      question: 'What if the market crashes in the 5th or 8th year?',
      answer:
        'Market crashes are beneficial during the accumulation phase (years 1-8) because your SIP buys more units at cheap prices. If a crash happens in year 9 or 10, you should move your corpus to safer Debt funds (STP) to protect it.',
    },
    {
      question: 'Can I reach 1 Crore with less than ₹43k SIP?',
      answer:
        'Yes, using the Step-Up SIP method. If you start with ₹25,000/month and increase your investment by 15% every year (as your salary grows), you can still hit the ₹1 Crore target in 10 years.',
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: '1 Crore in 10 Years',
            url: 'https://fincado.com/guides/sip-for-1-crore-in-10-years/',
          },
        ]}
      />

      {/* --- FAQ SCHEMA --- */}
      <FAQSchema faqs={faqData} />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline: pageTitle,
            description:
              'Detailed calculation and strategy to build a corpus of ₹1 Crore in 10 years using Mutual Funds.',
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://incado.com/logo.png',
              },
            },
            datePublished: '2025-12-28',
            dateModified: '2025-12-28',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1"
        >
          Wealth Strategy
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 8 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <TrendingUp className="h-4 w-4" /> Calculated @ 12% CAGR
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title={pageTitle} />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/mf/mutual-fund-guide-hero.webp"
              alt="Roadmap to 1 Crore Wealth"
              fill
              priority
              className="object-cover"
            />
          </div>
          <WikiText
            content={`<p>Building a corpus of ₹1 Crore is the definitive financial milestone for millions of Indian investors. Achieving this in <strong>10 years</strong> is an aggressive goal that requires discipline, the right asset allocation, and a substantial monthly investment.</p>`}
          />
        </CardContent>
      </Card>

      {/* --- SECTION 1: THE ANSWER --- */}
      <Card className="mb-12 bg-emerald-50 border-emerald-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-emerald-900 text-xl flex items-center gap-2">
            <Target className="h-6 w-6" /> The Short Answer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-emerald-800 text-lg mb-6">
            To reach <strong>₹1 Crore in 10 Years</strong>, assuming a 12%
            annual return from equity mutual funds, you need to start a monthly
            SIP of roughly <span className="font-bold text-2xl">₹43,041</span>.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-emerald-100">
            <InlineSipCalculator />
          </div>
          <div className="flex justify-end">
            <Link
              href="/sip-calculator/"
              className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Check Your Own Goal →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-1cr-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: THE MATH --- */}
      <section className="mb-12">
        <h2
          id="the-math"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-blue-600" /> The Math: How ₹43k
          Becomes ₹1 Crore
        </h2>
        <p className="mb-6 text-slate-700">
          When you invest for 10 years, you rely heavily on your principal
          contribution because the compounding effect explodes <em>after</em>{' '}
          the 10th year.
        </p>

        {/* IMAGE: Compounding Graph */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/sip/power-of-compounding-graph.webp"
            alt="Graph showing power of compounding over time"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Parameter
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Value
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Target Amount</TableCell>
                <TableCell className="font-bold text-slate-900">
                  ₹1,00,00,000 (1 Crore)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Time Period</TableCell>
                <TableCell>10 Years (120 Months)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Expected Return</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  12% (Equity Benchmark)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monthly SIP</TableCell>
                <TableCell className="text-blue-600 font-bold text-lg">
                  ₹43,041
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Invested</TableCell>
                <TableCell>₹51.6 Lakhs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Wealth Gained</TableCell>
                <TableCell className="text-emerald-600">₹48.4 Lakhs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 3: TIME COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="time-comparison"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Clock className="h-6 w-6 text-amber-500" /> Is ₹43k Too High? The
          Cost of Delay
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Time</TableHead>
                <TableHead className="font-bold text-slate-900">
                  SIP Needed
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Total Invested
                </TableHead>
                <TableHead className="font-bold text-slate-900">Ease</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-amber-50/50">
                <TableCell className="font-bold text-amber-900">
                  10 Years
                </TableCell>
                <TableCell className="font-bold text-amber-900">
                  ₹43,041
                </TableCell>
                <TableCell className="text-amber-900">₹51.6 L</TableCell>
                <TableCell className="text-amber-700 font-bold">Hard</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15 Years</TableCell>
                <TableCell>₹19,819</TableCell>
                <TableCell>₹35.6 L</TableCell>
                <TableCell className="text-emerald-600">Moderate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20 Years</TableCell>
                <TableCell>₹10,009</TableCell>
                <TableCell>₹24.0 L</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Easy
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>25 Years</TableCell>
                <TableCell>₹5,270</TableCell>
                <TableCell>₹15.8 L</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Very Easy
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-1cr-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: STEP UP STRATEGY --- */}
      <section className="mb-12">
        <h2
          id="step-up-strategy"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-purple-600" /> The
          &quot;Step-Up&ldquo; Strategy
        </h2>
        <p className="mb-6 text-slate-700">
          Can&apos;t start with ₹43k? Start small and increase your SIP by 15%
          every year.
        </p>

        {/* IMAGE: Step Up Strategy */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/sip/step-up-strategy.webp"
            alt="Visualizing Step-Up SIP Strategy"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-purple-100 bg-purple-50/30 mb-6">
          <CardHeader className="pb-2 border-b border-purple-100">
            <CardTitle className="text-purple-900 text-lg">
              The Plan (Start Small)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Starting SIP:</span>
                <strong>₹25,000 / month</strong>
              </li>
              <li className="flex justify-between">
                <span>Annual Increase:</span>
                <strong>15%</strong>
              </li>
              <li className="flex justify-between pt-2 border-t border-purple-200 font-bold text-purple-800">
                <span>Result (10 Yrs):</span>
                <span>₹1.03 Crore ✅</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Year</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Monthly SIP
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Corpus (Year End)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Year 1</TableCell>
                <TableCell>₹25,000</TableCell>
                <TableCell>₹3.2 L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year 5</TableCell>
                <TableCell>₹43,725</TableCell>
                <TableCell>₹28.4 L</TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-bold text-emerald-900">
                  Year 10
                </TableCell>
                <TableCell className="font-bold text-emerald-900">
                  ₹87,900
                </TableCell>
                <TableCell className="font-bold text-emerald-700">
                  ₹1.03 Cr
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 5: ASSET ALLOCATION --- */}
      <section className="mb-12">
        <h2
          id="where-to-invest"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-teal-600" /> Where Should You
          Invest?
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">Aggressive</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-bold text-red-600">Aim: 14-15% Return</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>40% Mid Cap</li>
                <li>30% Small Cap</li>
                <li>30% Flexi Cap</li>
              </ul>
              <p className="mt-2 text-xs italic text-slate-500">
                High volatility risk.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Balanced (Recommended)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-bold text-emerald-600">Aim: 12% Return</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>50% Nifty 50 Index</li>
                <li>30% Flexi Cap</li>
                <li>20% Mid Cap</li>
              </ul>
              <p className="mt-2 text-xs italic text-slate-500">
                Stable long-term growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-1cr-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: MISTAKES --- */}
      <section className="mb-12">
        <h2
          id="common-mistakes"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-red-500" /> Mistakes That Kill
          the Dream
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-4">
              <strong className="block text-red-900 mb-2">
                1. Stopping SIP
              </strong>
              <p className="text-sm text-red-800">
                Pausing during market dips kills your accumulation phase.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-4">
              <strong className="block text-red-900 mb-2">
                2. Ignoring Inflation
              </strong>
              <p className="text-sm text-red-800">
                ₹1 Cr in 10 years = ₹55L today. Aim higher if possible.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-4">
              <strong className="block text-red-900 mb-2">
                3. Too Many Funds
              </strong>
              <p className="text-sm text-red-800">
                Buying 10 funds dilutes returns. Stick to 3.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
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

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Reaching ₹1 Crore in 10 years is possible. It requires a SIP of
            ₹43,000 (or ₹25,000 with step-ups). The most important factor is not
            the amount, but the <strong>start date</strong>.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Start Audit
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Automate SIP
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Ignore Noise
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-emerald-600 to-teal-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Calculate Your Own Path
          </h2>
          <p className="mb-8 max-w-lg text-emerald-100 text-lg">
            Want to see how much YOU need to save based on your current age? Use
            our free calculator.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-emerald-700 transition hover:bg-emerald-50 shadow-lg"
            >
              Open SIP Calculator
            </Link>
            <Link
              href="/mutual-funds/"
              className="rounded-lg border border-emerald-400 bg-emerald-800/30 px-8 py-4 font-bold text-white transition hover:bg-emerald-800/50"
            >
              See Top Funds
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
