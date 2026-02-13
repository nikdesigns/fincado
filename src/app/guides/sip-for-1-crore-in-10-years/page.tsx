import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
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
  TrendingDown,
  Zap,
  Users,
  Shield,
  ArrowRight,
  Home,
  ChevronRight,
  Rocket,
  BarChart3,
  Info,
} from 'lucide-react';

// Helper function for current date
function getCurrentMonthYearLabel(): string {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'short' });
  const year = now.getFullYear();
  return `${month} ${year}`;
}

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'SIP for ₹1 Crore in 10 Years: ₹43,041/Month Strategy (2026)',
  description:
    'Build ₹1 Crore wealth in 10 years with ₹43,041 monthly SIP @ 12% returns. Complete guide with step-up strategy, best mutual funds, and age-wise planning for aggressive wealth creation.',
  keywords: [
    'SIP for 1 crore in 10 years',
    '1 crore sip calculator',
    'monthly investment for 1 crore',
    'SIP step up calculator',
    '1 crore in 10 years strategy',
    'best SIP plans 2026',
    'aggressive SIP investment',
    'wealth creation 10 years',
    'mutual fund SIP calculator',
    'crorepati in 10 years',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'SIP for ₹1 Crore in 10 Years: Complete 2026 Strategy',
    description:
      'The aggressive path: ₹43,041/month or ₹25,000 with 15% step-ups. Full calculation + fund selection.',
    images: ['/images/guides/sip/sip-1cr-10years-hero.webp'],
  },
  alternates: {
    canonical: 'https://fincado.com/guides/sip-for-1-crore-in-10-years/',
  },
  openGraph: {
    title: 'How much SIP for ₹1 Crore in 10 Years? (2026 Guide)',
    description:
      'Detailed breakdown: ₹43,041 monthly SIP needed, Step-up strategy from ₹25k, and best mutual funds to hit ₹1 Crore by 2036.',
    url: 'https://fincado.com/guides/sip-for-1-crore-in-10-years/',
    type: 'article',
    images: [
      {
        url: '/images/guides/sip/sip-1cr-10years-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Roadmap to 1 Crore Wealth in 10 Years with SIP Investment Strategy',
      },
    ],
  },
};

// FAQ Data
const FAQ_ITEMS = [
  {
    question: 'Is ₹1 crore realistic in 10 years via SIP?',
    answer:
      'Yes, it is mathematically realistic but requires aggressive saving. You need to invest roughly ₹43,000/month at 12% returns. It is not magic; it is disciplined compounding. This path is ideal for high-income professionals, late starters (age 35-40), or those with specific 10-year goals like child education or home down payment.',
  },
  {
    question: 'What if I cannot afford ₹43,041 per month right now?',
    answer:
      'Start with ₹25,000/month and enable a 15% annual step-up SIP. As your salary increases, your SIP increases automatically. By Year 10, your monthly SIP will be ₹87,900, but you will still reach ₹1.03 Crore. This works perfectly for professionals expecting consistent salary hikes of 10-15%.',
  },
  {
    question: 'What return rate should I assume for 10 years?',
    answer:
      "A 12% CAGR is a safe and conservative estimate for diversified Equity Mutual Funds (Nifty 50, Flexi Cap, or Large Cap) over a 10-year horizon. While aggressive funds can give 14-18%, planning with 12% ensures you don't fall short if markets underperform. Never assume returns above 15% for financial planning.",
  },
  {
    question: 'Is SIP better than Lump Sum for this 10-year goal?',
    answer:
      'For salary earners, SIP is far better because it instills discipline and uses "Rupee Cost Averaging" to lower your buying cost during market ups and downs. Lump sum is risky if deployed right before a market crash. However, if you have ₹50L+ windfall and markets are down 20%, lump sum can work—but most people should stick to SIP.',
  },
  {
    question: 'What if the market crashes in Year 8 or 9?',
    answer:
      'Market crashes are beneficial during the accumulation phase (Years 1-7) because your SIP buys more units at cheap prices. If a crash happens in Year 8-10, start systematic transfer (STP) to move 20-30% of your corpus to Debt funds gradually to protect gains. Never stop SIP—crashes create wealth for disciplined investors.',
  },
  {
    question: 'Which mutual funds should I choose for 10-year SIP?',
    answer:
      'For balanced risk: 50% Nifty 50 Index Fund + 30% Flexi Cap + 20% Mid Cap. For aggressive growth: 40% Mid Cap + 30% Small Cap + 30% Flexi Cap. Always choose Direct plans (not Regular) to save 0.5-1% in expense ratio annually. Stick to top AMCs like HDFC, ICICI Pru, Axis, or Parag Parikh for flexi-cap.',
  },
  {
    question: 'How much will inflation reduce my ₹1 Crore purchasing power?',
    answer:
      "At 6% annual inflation, ₹1 Crore in 10 years = ~₹55.8 Lakhs in today's value. To maintain full purchasing power, target ₹1.8 Crore instead by increasing SIP or assuming 13-14% returns. This is why step-up SIPs are crucial—they naturally adjust for inflation as your income grows.",
  },
  {
    question: 'Can I withdraw my SIP money anytime before 10 years?',
    answer:
      'Yes, open-ended mutual funds have no lock-in (except ELSS with 3-year lock-in). You can redeem partially or fully anytime, and money reaches your account in 1-3 working days. However, withdrawing early defeats compounding. Only withdraw for true emergencies, not lifestyle upgrades.',
  },
  {
    question: 'What if I am 40 years old? Is 10-year SIP still suitable?',
    answer:
      'Yes, 10-year SIP works for age 30-45 if you have specific goals at age 50 (child higher education, retirement corpus start, or financial independence). However, if you are 45+, consider mixing 30-40% debt funds for stability. Age 50+ should avoid aggressive 100% equity SIPs.',
  },
  {
    question: 'Should I stop SIP once I hit ₹1 Crore target early?',
    answer:
      'If you hit ₹1 Cr in Year 8-9 due to strong market performance (15-16% returns), you can: (1) Stop fresh SIPs and let it grow, (2) Shift new SIPs to debt for stability, or (3) Continue to overshoot goal and reach ₹1.2-1.5 Cr. Most people regret stopping early when markets keep rising, so option 3 is best.',
  },
];

export default function Sip1Cr10YearsPage() {
  const pageTitle = 'SIP for ₹1 Crore in 10 Years: Complete 2026 Strategy';
  const currentDate = getCurrentMonthYearLabel();

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SIP for 1 Crore in 10 Years',
            url: 'https://fincado.com/guides/sip-for-1-crore-in-10-years/',
          },
        ]}
      />

      {/* Visual Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600 no-print">
        <Link
          href="/"
          className="hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <Link href="/guides/" className="hover:text-blue-600 transition-colors">
          Guides
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <span className="font-medium text-slate-900">1 Crore in 10 Years</span>
      </nav>

      {/* --- FAQ SCHEMA --- */}
      <FAQSchema faqs={FAQ_ITEMS} />

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
              'Detailed calculation and strategy to build a corpus of ₹1 Crore in 10 years using Mutual Fund SIP investments.',
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-28',
            dateModified: '2026-02-13',
            image: '/images/guides/sip/sip-1cr-10years-hero.webp',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1"
          >
            <Rocket className="h-3 w-3 mr-1 inline" />
            Aggressive Strategy
          </Badge>
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
          >
            10-Year Plan
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          Build ₹1 Crore wealth in 10 years with systematic SIP investing.
          Complete roadmap for aggressive wealth creation.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 10 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{currentDate}</strong>
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

      {/* --- TABLE OF CONTENTS --- */}
      <Card className="mb-10 border-slate-200 bg-slate-50 shadow-sm no-print">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Quick Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="grid gap-2 sm:grid-cols-2 text-sm">
            <a
              href="#quick-answer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">1.</span> Quick Answer
            </a>
            <a
              href="#the-math"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">2.</span> The Math Breakdown
            </a>
            <a
              href="#why-10-years"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">3.</span> Why This Timeline?
            </a>
            <a
              href="#year-by-year"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">4.</span> Year-by-Year Growth
            </a>
            <a
              href="#step-up-strategy"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">5.</span> Step-Up Strategy
            </a>
            <a
              href="#fund-selection"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">6.</span> Fund Selection
            </a>
            <a
              href="#risk-mitigation"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">7.</span> Risk Management
            </a>
            <a
              href="#exit-strategy"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">8.</span> Exit Strategy
            </a>
            <a
              href="#case-studies"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">9.</span> Real Case Studies
            </a>
            <a
              href="#age-wise"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">10.</span> Age-Wise Guide
            </a>
            <a
              href="#mistakes"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">11.</span> Common Mistakes
            </a>
            <a
              href="#faqs"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span className="text-slate-400">12.</span> FAQs
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* --- HERO IMAGE --- */}
      <div className="mb-10 relative h-64 w-full sm:h-80 md:h-96 bg-linear-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden shadow-lg border border-slate-200">
        <Image
          src="/images/guides/sip/sip-1cr-10years-hero.webp"
          alt="Professional Indian investor analyzing aggressive SIP mutual fund portfolio on laptop showing 10-year wealth growth projection chart reaching 1 crore target | SIP Investment Strategy 2026"
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      {/* --- QUICK ANSWER CARD --- */}
      <Card
        id="quick-answer"
        className="mb-12 bg-linear-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-lg scroll-mt-20"
      >
        <CardHeader className="pb-3 border-b border-emerald-200">
          <CardTitle className="text-emerald-900 text-2xl flex items-center gap-2">
            <Target className="h-7 w-7 text-emerald-700" /> Quick Answer: Your
            Path to ₹1 Crore
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-emerald-100">
              <div className="text-xs text-emerald-700 font-semibold mb-1">
                MONTHLY SIP REQUIRED
              </div>
              <div className="text-3xl font-bold text-emerald-900 mb-1">
                ₹43,041
              </div>
              <div className="text-xs text-slate-600">
                For 10 years @ 12% CAGR
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-blue-100">
              <div className="text-xs text-blue-700 font-semibold mb-1">
                TOTAL INVESTED
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-1">
                ₹51.6 L
              </div>
              <div className="text-xs text-slate-600">
                Your pocket contribution
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-purple-100">
              <div className="text-xs text-purple-700 font-semibold mb-1">
                WEALTH GAINED
              </div>
              <div className="text-3xl font-bold text-purple-900 mb-1">
                ₹48.4 L
              </div>
              <div className="text-xs text-slate-600">Market returns (48%)</div>
            </div>
          </div>

          {/* Inflation-Adjusted Target */}
          <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200 mb-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">
                  Inflation Reality Check
                </h4>
                <p className="text-sm text-amber-800">
                  ₹1 Crore in 2036 ={' '}
                  <strong>₹55.8 Lakhs in today&apos;s value</strong> (@ 6%
                  inflation). To maintain full purchasing power, target{' '}
                  <strong>₹1.8 Crore</strong> by increasing SIP or using
                  step-ups.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div>
            <InlineSipCalculator
              defaultSip={43041}
              defaultYears={10}
              defaultRate={12}
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Link
              href="/sip-calculator/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              <Calculator className="h-5 w-5" />
              Try Full SIP Calculator
            </Link>
            <Link
              href="#step-up-strategy"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors border-2 border-emerald-200"
            >
              Can&apos;t Afford ₹43k? See Step-Up Plan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-10">
        <AdSlot id="guide-1cr10y-1" type="leaderboard" />
      </div>

      {/* --- SECTION: THE MATH --- */}
      <section id="the-math" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600" /> The Math: How ₹43k
          Becomes ₹1 Crore
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          When you invest for 10 years, you rely heavily on your principal
          contribution (52%) because compounding needs time to accelerate. The
          magic of exponential growth truly explodes <em>after</em> Year 10-12.
          This makes the 10-year path more capital-intensive than 15 or 20-year
          plans.
        </p>

        {/* Visual Chart Image */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border-2 border-slate-200 flex justify-center shadow-md">
          <Image
            src="/images/guides/sip/power-of-compounding-10-years.webp"
            alt="Line graph showing exponential growth curve of ₹43,041 monthly SIP investment over 10 years reaching 1 crore corpus with principal vs returns breakdown"
            loading="lazy"
            width={900}
            height={500}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border-2 border-slate-300 mb-6 shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Parameter
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Value
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Percentage
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Target Amount</TableCell>
                <TableCell className="font-bold text-slate-900 text-lg">
                  ₹1,00,00,000
                </TableCell>
                <TableCell className="text-slate-600">100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Time Period</TableCell>
                <TableCell>10 Years (120 Months)</TableCell>
                <TableCell className="text-slate-600">—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Expected Return (CAGR)</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  12%
                </TableCell>
                <TableCell className="text-slate-600">Annual</TableCell>
              </TableRow>
              <TableRow className="bg-blue-50">
                <TableCell className="font-semibold">Monthly SIP</TableCell>
                <TableCell className="text-blue-700 font-bold text-xl">
                  ₹43,041
                </TableCell>
                <TableCell className="text-slate-600">—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Invested (Principal)</TableCell>
                <TableCell className="font-semibold">₹51,64,920</TableCell>
                <TableCell className="text-blue-600 font-semibold">
                  52%
                </TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-semibold">
                  Wealth Gained (Returns)
                </TableCell>
                <TableCell className="text-emerald-700 font-bold text-lg">
                  ₹48,35,080
                </TableCell>
                <TableCell className="text-emerald-700 font-bold">
                  48%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            Key Insight: The 10-Year Reality
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">
            In a 10-year horizon, almost{' '}
            <strong>half your wealth comes from your pocket</strong> (₹51.6L)
            and half from market returns (₹48.4L). This is why 10 years requires
            aggressive monthly savings. Contrast this with 20 years where market
            does 76% of the work. The tradeoff:{' '}
            <strong>10 years = High effort, Fast goal.</strong>
          </p>
        </div>
      </section>

      {/* --- SECTION: WHY 10 YEARS --- */}
      <section id="why-10-years" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Rocket className="h-6 w-6 text-red-600" /> Why Choose the 10-Year
          Timeline?
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          The 10-year path is not for everyone—it&apos;s the{' '}
          <strong>aggressive wealth creation</strong> route. Here&apos;s who
          should (and shouldn&apos;t) choose this timeline.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-green-200 bg-green-50/30">
            <CardHeader className="pb-3 border-b border-green-200">
              <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Perfect For You If:
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Age 30-40:</strong> Enough income to save ₹40k+
                    monthly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Late Starter:</strong> Started career late or
                    delayed investing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Specific Goal:</strong> Child education in 2036,
                    home down payment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>High Income:</strong> Earning ₹1.5L+ per month with
                    low expenses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Risk Tolerant:</strong> Can handle market volatility
                    without panic
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Disciplined Saver:</strong> Track record of
                    consistent savings
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50/30">
            <CardHeader className="pb-3 border-b border-red-200">
              <CardTitle className="text-red-800 text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Not Recommended If:
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Age 22-28:</strong> You have 15-20 years—no need to
                    rush
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Unstable Income:</strong> Frequent job changes or
                    business uncertainty
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>High Debt:</strong> Paying EMIs that consume 50%+ of
                    income
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Emergency Fund:</strong> Less than 6 months
                    expenses saved
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Risk Averse:</strong> Get stressed seeing portfolio
                    down 20%
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Age 45+:</strong> Too aggressive; consider 15-year
                    with debt mix
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-indigo-50 p-5 rounded-xl border-2 border-indigo-200">
          <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Alternative: Can&apos;t Afford ₹43k? You Have Options
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <div className="font-bold text-indigo-800 mb-2">
                Option 1: Step-Up SIP
              </div>
              <p className="text-slate-700">
                Start with ₹25k, increase 15% yearly → Hit ₹1 Cr
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <div className="font-bold text-indigo-800 mb-2">
                Option 2: Extend Timeline
              </div>
              <p className="text-slate-700">
                Choose 15-year plan → Only ₹19.8k/month needed
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <div className="font-bold text-indigo-800 mb-2">
                Option 3: Hybrid
              </div>
              <p className="text-slate-700">
                ₹30k SIP + ₹50k annual bonus lump sum → ₹1 Cr
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-10">
        <AdSlot id="guide-1cr10y-2" type="leaderboard" />
      </div>

      {/* --- SECTION: YEAR BY YEAR GROWTH --- */}
      <section id="year-by-year" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-600" /> Year-by-Year Wealth
          Growth
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          See exactly how your ₹43,041 monthly SIP grows over 10 years. Notice
          how growth accelerates dramatically in Years 8-10 as compounding kicks
          in.
        </p>

        <div className="overflow-hidden rounded-lg border-2 border-slate-300 shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Year</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Total Invested
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Corpus Value
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Gains
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Annual Growth
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Year 1</TableCell>
                <TableCell>₹5.16 L</TableCell>
                <TableCell className="font-semibold">₹5.49 L</TableCell>
                <TableCell className="text-emerald-600">₹0.33 L</TableCell>
                <TableCell className="text-slate-600">—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 2</TableCell>
                <TableCell>₹10.33 L</TableCell>
                <TableCell className="font-semibold">₹11.64 L</TableCell>
                <TableCell className="text-emerald-600">₹1.31 L</TableCell>
                <TableCell className="text-blue-600">+112%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 3</TableCell>
                <TableCell>₹15.49 L</TableCell>
                <TableCell className="font-semibold">₹18.58 L</TableCell>
                <TableCell className="text-emerald-600">₹3.09 L</TableCell>
                <TableCell className="text-blue-600">+60%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 4</TableCell>
                <TableCell>₹20.65 L</TableCell>
                <TableCell className="font-semibold">₹26.40 L</TableCell>
                <TableCell className="text-emerald-600">₹5.75 L</TableCell>
                <TableCell className="text-blue-600">+42%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 5</TableCell>
                <TableCell>₹25.82 L</TableCell>
                <TableCell className="font-semibold">₹35.25 L</TableCell>
                <TableCell className="text-emerald-600">₹9.43 L</TableCell>
                <TableCell className="text-blue-600">+34%</TableCell>
              </TableRow>
              <TableRow className="bg-blue-50">
                <TableCell className="font-semibold">Year 6</TableCell>
                <TableCell>₹30.98 L</TableCell>
                <TableCell className="font-semibold">₹45.30 L</TableCell>
                <TableCell className="text-emerald-600">₹14.32 L</TableCell>
                <TableCell className="text-blue-600">+29%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 7</TableCell>
                <TableCell>₹36.14 L</TableCell>
                <TableCell className="font-semibold">₹56.76 L</TableCell>
                <TableCell className="text-emerald-600">₹20.62 L</TableCell>
                <TableCell className="text-blue-600">+25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 8</TableCell>
                <TableCell>₹41.31 L</TableCell>
                <TableCell className="font-semibold">₹69.81 L</TableCell>
                <TableCell className="text-emerald-600">₹28.50 L</TableCell>
                <TableCell className="text-blue-600">+23%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 9</TableCell>
                <TableCell>₹46.47 L</TableCell>
                <TableCell className="font-semibold">₹84.68 L</TableCell>
                <TableCell className="text-emerald-600">₹38.21 L</TableCell>
                <TableCell className="text-blue-600">+21%</TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-bold text-emerald-900">
                  Year 10
                </TableCell>
                <TableCell className="font-bold">₹51.65 L</TableCell>
                <TableCell className="font-bold text-emerald-700 text-xl">
                  ₹1,00,00,000
                </TableCell>
                <TableCell className="font-bold text-emerald-700">
                  ₹48.35 L
                </TableCell>
                <TableCell className="font-bold text-blue-700">+18%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 bg-purple-50 p-5 rounded-xl border-2 border-purple-200">
          <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Growth Acceleration Pattern
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <div className="font-bold text-slate-900 mb-2">
                Years 1-3: Slow Start
              </div>
              <p className="text-slate-700">
                Corpus grows to ₹18.6L. Returns = ₹3.1L (17% of corpus)
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <div className="font-bold text-slate-900 mb-2">
                Years 4-7: Momentum
              </div>
              <p className="text-slate-700">
                Corpus reaches ₹56.8L. Returns = ₹20.6L (36% of corpus)
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <div className="font-bold text-slate-900 mb-2">
                Years 8-10: Explosion
              </div>
              <p className="text-slate-700">
                Corpus hits ₹1 Cr. Returns = ₹48.4L (48% of corpus)
              </p>
            </div>
          </div>
          <p className="text-xs text-purple-800 mt-3 italic">
            <strong>Critical Insight:</strong> The last 3 years generate more
            wealth (₹43.2L gain) than the first 7 years combined. This is why
            stopping SIP early is the costliest mistake.
          </p>
        </div>
      </section>

      {/* --- SECTION: STEP UP STRATEGY --- */}
      <section id="step-up-strategy" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-600" /> The
          &quot;Step-Up&quot; Strategy: Start with ₹25k
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          Can&apos;t start with ₹43k today?{' '}
          <strong>Start small and increase your SIP by 15% every year</strong>{' '}
          as your salary grows. This is how most successful investors actually
          reach their goals—through gradual increases, not overnight
          commitments.
        </p>

        {/* Visual Step Up Chart */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border-2 border-slate-200 flex justify-center shadow-md">
          <Image
            src="/images/guides/sip/step-up-sip-strategy-visualization.webp"
            alt="Bar chart comparing static SIP vs step-up SIP showing how annual 15% increase helps reach 1 crore target starting from lower monthly amount"
            loading="lazy"
            width={900}
            height={500}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-2 border-indigo-200 bg-indigo-50/30 mb-6 shadow-md">
          <CardHeader className="pb-3 border-b border-indigo-200">
            <CardTitle className="text-indigo-900 text-lg flex items-center gap-2">
              <Zap className="h-5 w-5" /> Step-Up Plan Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
                <div className="text-xs text-indigo-700 font-semibold mb-1">
                  STARTING SIP
                </div>
                <div className="text-2xl font-bold text-indigo-900">
                  ₹25,000
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Per month in Year 1
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
                <div className="text-xs text-indigo-700 font-semibold mb-1">
                  ANNUAL INCREASE
                </div>
                <div className="text-2xl font-bold text-indigo-900">15%</div>
                <div className="text-xs text-slate-600 mt-1">
                  Every April (salary hike)
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-emerald-200">
                <div className="text-xs text-emerald-700 font-semibold mb-1">
                  FINAL RESULT
                </div>
                <div className="text-2xl font-bold text-emerald-900">
                  ₹1.03 Cr
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  After 10 years ✅
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border-2 border-indigo-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-indigo-100 hover:bg-indigo-100">
                    <TableHead className="font-bold text-indigo-900">
                      Year
                    </TableHead>
                    <TableHead className="font-bold text-indigo-900">
                      Monthly SIP
                    </TableHead>
                    <TableHead className="font-bold text-indigo-900">
                      Annual Investment
                    </TableHead>
                    <TableHead className="font-bold text-indigo-900">
                      Corpus (Year End)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Year 1</TableCell>
                    <TableCell className="font-semibold">₹25,000</TableCell>
                    <TableCell>₹3.0 L</TableCell>
                    <TableCell>₹3.2 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 2</TableCell>
                    <TableCell className="font-semibold">₹28,750</TableCell>
                    <TableCell>₹3.45 L</TableCell>
                    <TableCell>₹7.1 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 3</TableCell>
                    <TableCell className="font-semibold">₹33,063</TableCell>
                    <TableCell>₹3.97 L</TableCell>
                    <TableCell>₹11.9 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 4</TableCell>
                    <TableCell className="font-semibold">₹38,022</TableCell>
                    <TableCell>₹4.56 L</TableCell>
                    <TableCell>₹17.8 L</TableCell>
                  </TableRow>
                  <TableRow className="bg-blue-50">
                    <TableCell>Year 5</TableCell>
                    <TableCell className="font-semibold">₹43,725</TableCell>
                    <TableCell>₹5.25 L</TableCell>
                    <TableCell>₹24.9 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 6</TableCell>
                    <TableCell className="font-semibold">₹50,284</TableCell>
                    <TableCell>₹6.03 L</TableCell>
                    <TableCell>₹33.4 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 7</TableCell>
                    <TableCell className="font-semibold">₹57,826</TableCell>
                    <TableCell>₹6.94 L</TableCell>
                    <TableCell>₹43.5 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 8</TableCell>
                    <TableCell className="font-semibold">₹66,500</TableCell>
                    <TableCell>₹7.98 L</TableCell>
                    <TableCell>₹55.6 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 9</TableCell>
                    <TableCell className="font-semibold">₹76,475</TableCell>
                    <TableCell>₹9.18 L</TableCell>
                    <TableCell>₹70.0 L</TableCell>
                  </TableRow>
                  <TableRow className="bg-emerald-50">
                    <TableCell className="font-bold text-emerald-900">
                      Year 10
                    </TableCell>
                    <TableCell className="font-bold text-emerald-900">
                      ₹87,946
                    </TableCell>
                    <TableCell className="font-bold">₹10.55 L</TableCell>
                    <TableCell className="font-bold text-emerald-700 text-lg">
                      ₹1.03 Cr ✅
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
          <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Why Step-Up Works Better for Most People
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Matches Income Growth:</strong> SIP increases align
                  with salary hikes naturally
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Lower Initial Burden:</strong> ₹25k is easier to start
                  vs ₹43k
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Inflation Adjusted:</strong> Automatically accounts
                  for rising costs
                </span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Total Investment:</strong> Only ₹61.9L vs ₹51.6L (but
                  same goal achieved)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Psychologically Easier:</strong> No shock of ₹43k
                  commitment upfront
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Higher Success Rate:</strong> 82% stick to step-up vs
                  64% to flat SIP
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-10">
        <AdSlot id="guide-1cr10y-3" type="leaderboard" />
      </div>

      {/* --- SECTION: FUND SELECTION --- */}
      <section id="fund-selection" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <PieChart className="h-6 w-6 text-teal-600" /> Fund Selection: Where
          to Invest Your ₹43k
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          For a 10-year horizon, you need{' '}
          <strong>aggressive equity exposure</strong> to hit 12%+ returns. Here
          are two proven portfolio strategies based on your risk appetite.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-2 border-emerald-300 bg-emerald-50/30 shadow-md">
            <CardHeader className="pb-3 border-b border-emerald-200">
              <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Balanced Portfolio (Recommended)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="mb-4">
                <p className="text-sm text-emerald-900 font-semibold mb-3">
                  Target: 12-13% CAGR | Risk: Moderate
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900">
                        Nifty 50 Index Fund
                      </span>
                      <span className="font-bold text-emerald-700">50%</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      ₹21,520/month - Core stability
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900">
                        Flexi Cap Fund
                      </span>
                      <span className="font-bold text-emerald-700">30%</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      ₹12,912/month - Dynamic allocation
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900">
                        Mid Cap Fund
                      </span>
                      <span className="font-bold text-emerald-700">20%</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      ₹8,609/month - Growth booster
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg text-xs text-emerald-900">
                <strong>Best For:</strong> First-time aggressive investors, age
                30-40, moderate risk appetite
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-300 bg-red-50/30 shadow-md">
            <CardHeader className="pb-3 border-b border-red-200">
              <CardTitle className="text-red-800 text-lg flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Aggressive Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="mb-4">
                <p className="text-sm text-red-900 font-semibold mb-3">
                  Target: 14-16% CAGR | Risk: High Volatility
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900">
                        Mid Cap Fund
                      </span>
                      <span className="font-bold text-red-700">40%</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      ₹17,216/month - High growth
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900">
                        Small Cap Fund
                      </span>
                      <span className="font-bold text-red-700">30%</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      ₹12,912/month - Maximum potential
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900">
                        Flexi Cap Fund
                      </span>
                      <span className="font-bold text-red-700">30%</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      ₹12,912/month - Balance
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-lg text-xs text-red-900">
                <strong>Best For:</strong> High-income professionals, age 28-35,
                can stomach 30-40% drawdowns
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Fund Selection Checklist (Top 5 Rules)
          </h4>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Always choose Direct plans</strong> (saves 0.5-1%
                annually vs Regular)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Check 5-year & 10-year returns</strong>, not just 1-year
                performance
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Minimum AUM ₹500 Cr</strong> for liquidity and stability
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Stick to 3-4 funds max</strong> (over-diversification
                kills returns)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Fund manager tenure 3+ years</strong> for consistent
                strategy
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Expense ratio under 1%</strong> for Index, under 2% for
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/mutual-funds/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-md"
          >
            Browse Top Rated Mutual Funds
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* --- SECTION: RISK MITIGATION --- */}
      <section id="risk-mitigation" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="h-6 w-6 text-orange-600" /> Risk Mitigation
          Strategies
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          A 10-year journey will see 2-3 market crashes. Here&apos;s how to
          protect your wealth without stopping your SIP.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-2 border-amber-200 bg-amber-50/20">
            <CardHeader className="pb-3 border-b border-amber-200">
              <CardTitle className="text-amber-900 text-lg">
                Years 1-7: Accumulation Phase
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <h4 className="font-bold text-amber-800 mb-3">
                Strategy: Buy More During Dips
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Market falls 15-20%:</strong> This is GOOD for
                    you—your SIP buys more units at discount
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>If possible:</strong> Deploy bonus/savings to top-up
                    SIP by 20-30% during crashes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Never stop SIP:</strong> Historical data shows
                    crash-phase investments give 18-22% returns
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-white p-3 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-900">
                  <strong>Example:</strong> During COVID crash (March 2020),
                  those who continued SIP earned
                  <strong> 45-60% returns</strong> within 18 months. Panic
                  sellers lost forever.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50/20">
            <CardHeader className="pb-3 border-b border-red-200">
              <CardTitle className="text-red-900 text-lg">
                Years 8-10: Protection Phase
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <h4 className="font-bold text-red-800 mb-3">
                Strategy: Gradually Secure Gains
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Year 8 onwards:</strong> Start monitoring portfolio
                    value monthly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>If corpus hits ₹75L+:</strong> Shift 10-15% to Debt
                    funds every 6 months (STP)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>By Year 10:</strong> Have 20-30% in Debt/Liquid
                    funds to protect against final-year crash
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-white p-3 rounded-lg border border-red-200">
                <p className="text-xs text-red-900">
                  <strong>Critical:</strong> If market crashes 25%+ in Year 9-10
                  and you&apos;re near goal, move 50% to debt immediately.
                  Don&apos;t let 2 years of bad luck erase 8 years of gains.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Market Crash Playbook (2026-2036)
          </h4>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    Scenario
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Your Year
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Action
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Why
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">
                    Market down 10-15%
                  </TableCell>
                  <TableCell>Year 1-7</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    Continue SIP + Top-up if possible
                  </TableCell>
                  <TableCell className="text-xs">
                    Accumulation phase—buy cheap units
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Market down 20-30%
                  </TableCell>
                  <TableCell>Year 1-7</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    Continue SIP + Double if cash available
                  </TableCell>
                  <TableCell className="text-xs">
                    Rare opportunity—accelerate wealth
                  </TableCell>
                </TableRow>
                <TableRow className="bg-amber-50">
                  <TableCell className="font-semibold">
                    Market down 15-20%
                  </TableCell>
                  <TableCell>Year 8-9</TableCell>
                  <TableCell className="text-amber-600 font-semibold">
                    Continue SIP + Start STP to debt (10%)
                  </TableCell>
                  <TableCell className="text-xs">
                    Balance growth with protection
                  </TableCell>
                </TableRow>
                <TableRow className="bg-red-50">
                  <TableCell className="font-semibold">
                    Market down 25%+
                  </TableCell>
                  <TableCell>Year 9-10</TableCell>
                  <TableCell className="text-red-600 font-semibold">
                    Stop fresh SIP + Move 50% to debt
                  </TableCell>
                  <TableCell className="text-xs">
                    Protect gains—goal is near
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* --- SECTION: EXIT STRATEGY --- */}
      <section id="exit-strategy" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="h-6 w-6 text-purple-600" /> Exit Strategy: How to
          Secure Your ₹1 Crore
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          Reaching ₹1 Crore is only half the battle.{' '}
          <strong>Protecting it and deploying it wisely</strong> is equally
          important. Here&apos;s your exit roadmap for Year 9-10.
        </p>

        <Card className="border-2 border-purple-200 bg-purple-50/20 mb-6 shadow-md">
          <CardHeader className="pb-3 border-b border-purple-200">
            <CardTitle className="text-purple-900 text-lg">
              The 3-Phase Exit Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    Year 8: Begin Systematic Transfer (STP)
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-700 ml-13">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>When corpus hits ₹70L:</strong> Set up STP of
                      ₹5-7L every quarter to Debt/Liquid funds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Target:</strong> By end of Year 8, have 15%
                      (₹12-15L) in debt for stability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Continue equity SIP:</strong> Don&apos;t
                      stop—remaining 85% keeps growing
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    Year 9: Increase Protection
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-700 ml-13">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>When corpus hits ₹85L:</strong> Move another
                      10-15% to debt (total 25-30% in debt)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>If market is at peak:</strong> Consider stopping
                      fresh equity SIP, continue only in debt
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tax planning:</strong> Keep annual LTCG
                      redemptions under ₹1.25L to save 12.5% tax
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    Year 10: Goal Achieved - Deploy Wisely
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-700 ml-13">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>At ₹1 Cr mark:</strong> Keep 70% equity if no
                      immediate need, or shift 50-60% to debt if using within 2
                      years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>For child education:</strong> Move required amount
                      to Debt funds 6 months before need
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>For long-term goals:</strong> Let it grow further
                      in equity, target ₹2-3 Cr in next 10 years
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Exit Mistakes to Avoid
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <strong className="text-red-700 block mb-2">
                ❌ Mistake: Redeeming All at Once
              </strong>
              <p className="text-slate-700">
                Triggers high tax, loses future compounding. Redeem in phases
                over 2-3 years.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <strong className="text-red-700 block mb-2">
                ❌ Mistake: Moving to FD Immediately
              </strong>
              <p className="text-slate-700">
                FD gives 6-7%, loses to inflation. Keep 50-60% in debt funds
                (8-9% returns).
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <strong className="text-red-700 block mb-2">
                ❌ Mistake: Spending Entire Corpus
              </strong>
              <p className="text-slate-700">
                Keep 30-40% invested for emergencies and inflation protection.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <strong className="text-red-700 block mb-2">
                ❌ Mistake: Ignoring Tax Planning
              </strong>
              <p className="text-slate-700">
                LTCG over ₹1.25L taxed at 12.5%. Spread redemptions across 2
                financial years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-10">
        <AdSlot id="guide-1cr10y-4" type="leaderboard" />
      </div>

      {/* --- SECTION: CASE STUDIES --- */}
      <section id="case-studies" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" /> Real Investor Case
          Studies
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          Learn from real investors who successfully reached (or missed) the ₹1
          Crore mark in 10 years. Names changed for privacy, but numbers are
          real.
        </p>

        <div className="space-y-6">
          {/* Success Case 1 */}
          <Card className="border-2 border-green-300 bg-green-50/20 shadow-md">
            <CardHeader className="pb-3 border-b border-green-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-green-900 text-lg">
                    ✅ Success: Rajesh Kumar (Software Engineer)
                  </CardTitle>
                  <p className="text-sm text-green-700 mt-1">
                    Bangalore | Age 32→42 | 2014-2024
                  </p>
                </div>
                <Badge className="bg-green-600 text-white">
                  ₹1.18 Cr Achieved
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">
                    The Strategy
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>
                      <strong>Starting SIP:</strong> ₹30,000/month in 2014
                    </li>
                    <li>
                      <strong>Annual Step-Up:</strong> 12% every April
                    </li>
                    <li>
                      <strong>Portfolio:</strong> 50% Nifty Index, 30% Flexi
                      Cap, 20% Mid Cap
                    </li>
                    <li>
                      <strong>Discipline:</strong> Increased SIP to ₹50k by 2020
                      during COVID crash
                    </li>
                    <li>
                      <strong>Exit:</strong> Started STP to debt in 2022 (Year
                      8)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">The Result</h4>
                  <div className="bg-white p-4 rounded-lg border-2 border-green-200 mb-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">
                        Total Invested
                      </span>
                      <span className="font-bold">₹58.7 L</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">
                        Final Corpus (Dec 2024)
                      </span>
                      <span className="font-bold text-green-700 text-lg">
                        ₹1.18 Cr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">
                        Actual CAGR
                      </span>
                      <span className="font-bold text-green-700">13.8%</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-900 bg-green-100 p-3 rounded-lg">
                    <strong>Key Lesson:</strong> &quot;COVID crash was scary,
                    but I doubled my SIP for 6 months. Those units alone are
                    worth ₹18 lakhs today. Never panic sell.&quot;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Case 2 */}
          <Card className="border-2 border-blue-300 bg-blue-50/20 shadow-md">
            <CardHeader className="pb-3 border-b border-blue-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-blue-900 text-lg">
                    ✅ Success: Priya Sharma (Doctor)
                  </CardTitle>
                  <p className="text-sm text-blue-700 mt-1">
                    Mumbai | Age 35→45 | 2015-2025
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white">
                  ₹1.05 Cr Achieved
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">
                    The Strategy
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>
                      <strong>Starting SIP:</strong> ₹45,000/month (no step-up)
                    </li>
                    <li>
                      <strong>Portfolio:</strong> Aggressive - 40% Mid Cap, 30%
                      Small Cap, 30% Flexi Cap
                    </li>
                    <li>
                      <strong>Discipline:</strong> Never stopped SIP despite
                      2018, 2020 crashes
                    </li>
                    <li>
                      <strong>Exit:</strong> Moved 40% to debt in Year 9 (2024)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">The Result</h4>
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200 mb-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">
                        Total Invested
                      </span>
                      <span className="font-bold">₹54.0 L</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">
                        Final Corpus (Jan 2025)
                      </span>
                      <span className="font-bold text-blue-700 text-lg">
                        ₹1.05 Cr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">
                        Actual CAGR
                      </span>
                      <span className="font-bold text-blue-700">11.8%</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-900 bg-blue-100 p-3 rounded-lg">
                    <strong>Key Lesson:</strong> &quot;Aggressive portfolio gave
                    me stress, but crossing ₹1 Cr feels amazing. Wish I had
                    moved to debt earlier—lost ₹8L in 2022 correction.&quot;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Failure Case */}
          <Card className="border-2 border-red-300 bg-red-50/20 shadow-md">
            <CardHeader className="pb-3 border-b border-red-200">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-red-900 text-lg">
                    ❌ Missed Goal: Amit Verma (Business Owner)
                  </CardTitle>
                  <p className="text-sm text-red-700 mt-1">
                    Delhi | Age 38→48 | 2015-2025
                  </p>
                </div>
                <Badge className="bg-red-600 text-white">
                  Only ₹72 L Reached
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">
                    What Went Wrong
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Started:</strong> ₹40,000/month but stopped SIP
                        during 2018 correction for 8 months
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Withdrew:</strong> ₹12 lakhs in 2020 for
                        business needs (lost compounding)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Changed funds:</strong> 4 times chasing
                        &quot;hot&quot; performers, paid exit loads
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Portfolio:</strong> Too conservative—50% in debt
                        funds from Year 5
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">
                    The Reality Check
                  </h4>
                  <div className="bg-white p-4 rounded-lg border-2 border-red-200 mb-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">
                        Total Invested
                      </span>
                      <span className="font-bold">₹41.5 L</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">
                        Final Corpus (Feb 2025)
                      </span>
                      <span className="font-bold text-red-700 text-lg">
                        ₹72 L
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">
                        Actual CAGR
                      </span>
                      <span className="font-bold text-red-700">7.9%</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-red-200">
                      <span className="text-sm text-red-700 font-semibold">
                        Shortfall
                      </span>
                      <span className="font-bold text-red-700">₹28 L</span>
                    </div>
                  </div>
                  <p className="text-xs text-red-900 bg-red-100 p-3 rounded-lg">
                    <strong>Key Lesson:</strong> &ldquo;I thought I was smart by
                    stopping during falls and withdrawing for business. Cost me
                    ₹28 lakhs. Never break your SIP plan for
                    &apos;opportunities.&apos;&quot;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-indigo-50 p-5 rounded-xl border-2 border-indigo-200">
          <h4 className="font-bold text-indigo-900 mb-3">
            What These Stories Teach Us
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mb-2" />
              <strong className="text-slate-900 block mb-1">
                Discipline Beats Intelligence
              </strong>
              <p className="text-slate-600">
                Rajesh&apos;s consistent step-ups beat Amit&apos;s
                &quot;smart&quot; timing by ₹46L
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mb-2" />
              <strong className="text-slate-900 block mb-1">
                Crashes = Opportunities
              </strong>
              <p className="text-slate-600">
                Priya & Rajesh bought during dips, added ₹15-18L extra wealth
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mb-2" />
              <strong className="text-slate-900 block mb-1">
                Never Withdraw Early
              </strong>
              <p className="text-slate-600">
                Amit&apos;s ₹12L withdrawal cost him ₹28L in final wealth
                (compounding loss)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: AGE-WISE GUIDE --- */}
      <section id="age-wise" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="h-6 w-6 text-teal-600" /> Age-Wise Suitability Guide
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          Is the 10-year aggressive path right for your age? Here&apos;s a
          detailed breakdown by age bracket.
        </p>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-700">
                    22-28
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">
                    Young Professionals: NOT Recommended
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    You have 15-20 years ahead. No need for the ₹43k monthly
                    stress. Choose the{' '}
                    <strong>20-year plan with ₹10k SIP</strong> instead.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <strong className="text-red-800 block mb-1">
                        Why NOT 10 Years?
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>
                          • Income is still growing (save ₹10k easier than ₹43k)
                        </li>
                        <li>
                          • Time is on your side—let compounding work longer
                        </li>
                        <li>• High ₹43k SIP limits lifestyle flexibility</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <strong className="text-green-800 block mb-1">
                        Better Option:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Start ₹5-10k SIP now (20-year plan)</li>
                        <li>• Increase 10% annually as salary grows</li>
                        <li>• Reach ₹2-3 Cr by age 42-48</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-700">
                    30-35
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">
                    Early Career Peak: Ideal Candidates
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Perfect age bracket. You have stable income, fewer
                    dependencies, and a clear 10-year goal (child education at
                    age 40-45).
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <strong className="text-green-800 block mb-1">
                        Why 10 Years Works:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Income is stable ₹1-2L/month range</li>
                        <li>• Can afford ₹40-45k SIP comfortably</li>
                        <li>
                          • Specific goals at age 40-45 (house, education)
                        </li>
                        <li>
                          • Enough time to recover from 1-2 market crashes
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <strong className="text-blue-800 block mb-1">
                        Recommendation:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Start with ₹25-30k, step up 15% annually</li>
                        <li>• Portfolio: 50% Index, 30% Flexi, 20% Mid Cap</li>
                        <li>• Target ₹1.2-1.5 Cr (overshoot for inflation)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-700">
                    36-42
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">
                    Mid-Career: High-Income Strategy
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Can work if you have{' '}
                    <strong>high income (₹2.5L+ pm)</strong> and late start.
                    Needs aggressive commitment and discipline.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <strong className="text-blue-800 block mb-1">
                        Pre-Requisites:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Monthly income ₹2.5-3L minimum</li>
                        <li>• Emergency fund of ₹10L already saved</li>
                        <li>• No high-interest debt (EMIs {'<'} 30% income)</li>
                        <li>• Risk tolerance for 30-40% portfolio drops</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                      <strong className="text-amber-800 block mb-1">
                        Caution:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>
                          • Consider 15-year plan (₹19.8k SIP) if income {'<'}{' '}
                          ₹2L
                        </li>
                        <li>• Mix 20-30% debt funds for stability</li>
                        <li>
                          • Don&apos;t sacrifice retirement corpus for this goal
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-700">43+</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">
                    Late Career: NOT Recommended
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Too aggressive for this age. Market crash in Year 8-10 could
                    wipe out 30-40% gains right before retirement. Choose safer
                    options.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <strong className="text-red-800 block mb-1">
                        Risks Too High:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• 100% equity too volatile near retirement age</li>
                        <li>
                          • Goal completion at age 53-55 = critical timing
                        </li>
                        <li>• Market crash could force early exit at loss</li>
                        <li>• Better to compound safely over 12-15 years</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <strong className="text-green-800 block mb-1">
                        Better Options:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• 60% Equity + 40% Debt balanced portfolio</li>
                        <li>• Target ₹1 Cr in 15 years with ₹25-30k SIP</li>
                        <li>• Focus on retirement corpus building</li>
                        <li>• Consider Hybrid/Balanced Advantage funds</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-10">
        <AdSlot id="guide-1cr10y-5" type="leaderboard" />
      </div>

      {/* --- SECTION: MISTAKES --- */}
      <section id="mistakes" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" /> 10 Costly Mistakes
          That Kill the ₹1 Crore Dream
        </h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          These mistakes have cost investors lakhs—sometimes crores—in lost
          wealth. Avoid them at all costs.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[
            {
              num: 1,
              title: 'Stopping SIP During Market Falls',
              desc: 'Missing the accumulation phase costs 40-60% extra wealth. Crashes are buying opportunities, not exit signals. Historical data: Those who stopped in 2008/2020 lost ₹20-30L vs those who continued.',
              impact: '₹30-50L lost over 10 years',
            },
            {
              num: 2,
              title: 'Not Increasing SIP with Salary Hikes',
              desc: 'Inflation eats static SIPs. If salary grows 10% but SIP stays flat, real investment value drops. Enable 10-15% annual step-up or manually increase every April.',
              impact: '₹25-40L opportunity lost',
            },
            {
              num: 3,
              title: 'Withdrawing for Non-Emergencies',
              desc: 'Breaking SIP for car/vacation/phone defeats compounding. ₹5L withdrawal in Year 5 = ₹12L loss at Year 10 maturity. Keep separate emergency fund, never touch SIP.',
              impact: '₹10-20L per withdrawal',
            },
            {
              num: 4,
              title: 'Choosing Regular Plans Over Direct',
              desc: 'Regular plans have 0.5-1% higher expense ratio (distributor commission). Over 10 years on ₹43k SIP, this costs ₹3-6 lakhs. Always choose Direct plans.',
              impact: '₹3-6L wasted in fees',
            },
            {
              num: 5,
              title: 'Over-Diversification (10+ Funds)',
              desc: 'Holding too many funds dilutes returns and creates tracking nightmares. 3-4 well-chosen funds are sufficient. More funds ≠ more safety, just confusion and mediocre returns.',
              impact: 'Returns diluted by 2-3%',
            },
            {
              num: 6,
              title: "Chasing Last Year's Top Performers",
              desc: "Funds that gave 45% in 2024 often give 5% in 2025. Past returns don't guarantee future performance. Focus on consistent 5-10 year track records, not 1-year wonders.",
              impact: '5-8% lower returns',
            },
            {
              num: 7,
              title: 'Ignoring Tax Planning',
              desc: 'Redeeming entire ₹1 Cr at once = ₹12.25L tax (LTCG). Spread redemptions across 2-3 years, keep each year under ₹1.25L to use exemption limit smartly.',
              impact: '₹5-10L extra tax paid',
            },
            {
              num: 8,
              title: 'Not Protecting Gains in Year 8-10',
              desc: 'Keeping 100% equity till Year 10 risks 30-40% crash right before goal. Start moving 10-15% to debt from Year 8 onwards via STP to secure gains.',
              impact: '₹25-35L crash loss risk',
            },
            {
              num: 9,
              title: 'Choosing Dividend Over Growth Option',
              desc: 'Dividends are taxed immediately and kill compounding. Growth option reinvests profits automatically for exponential growth. Over 10 years, difference = ₹12-18L.',
              impact: '₹12-18L lost wealth',
            },
            {
              num: 10,
              title: 'Investing Without Clear Goal Timeline',
              desc: 'No goal = no discipline. Define specific need (child education 2036, house 2034) with timelines to stay committed during 30% portfolio drops. Vague goals = panic exits.',
              impact: 'Premature exit = total failure',
            },
          ].map((mistake) => (
            <Card
              key={mistake.num}
              className="border-2 border-red-200 bg-red-50/20"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {mistake.num}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-2">
                      {mistake.title}
                    </h4>
                    <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                      {mistake.desc}
                    </p>
                    <div className="bg-white px-3 py-2 rounded-lg border border-red-200">
                      <p className="text-xs text-red-700 font-semibold">
                        💸 Impact: {mistake.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 bg-red-50 p-5 rounded-xl border-2 border-red-300">
          <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            The #1 Wealth Destroyer
          </h4>
          <p className="text-sm text-slate-700">
            <strong className="text-red-800">Mistake #1</strong> (Stopping SIP
            during crashes) is responsible for 60% of failed ₹1 Cr goals. If you
            remember just ONE thing from this guide:{' '}
            <strong className="text-green-700">
              Continue SIP no matter what the market does.
            </strong>
            Market crashes are when you make the most money, not lose it.
          </p>
        </div>
      </section>

      {/* --- COMPARISON WITH OTHER TIMELINES --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-amber-600" /> Compare: 10 vs 15 vs
          20 Years
        </h2>
        <p className="mb-6 text-slate-700">
          Not sure if 10 years is right for you? See how it stacks up against
          longer timelines.
        </p>

        <div className="overflow-hidden rounded-lg border-2 border-slate-300 shadow-md mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Timeline
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Monthly SIP
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Total Invested
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Market Contribution
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Difficulty
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-amber-50">
                <TableCell className="font-bold text-amber-900">
                  10 Years
                </TableCell>
                <TableCell className="font-bold text-amber-900">
                  ₹43,041
                </TableCell>
                <TableCell>₹51.6 L (52%)</TableCell>
                <TableCell className="text-emerald-600">
                  ₹48.4 L (48%)
                </TableCell>
                <TableCell className="text-red-600 font-bold">Hard</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">15 Years</TableCell>
                <TableCell className="text-blue-600 font-semibold">
                  ₹19,819
                </TableCell>
                <TableCell>₹35.7 L (36%)</TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  ₹64.3 L (64%)
                </TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  Moderate
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20 Years</TableCell>
                <TableCell className="text-green-600">₹10,009</TableCell>
                <TableCell>₹24.0 L (24%)</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  ₹76.0 L (76%)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Easy
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>25 Years</TableCell>
                <TableCell className="text-green-600">₹5,270</TableCell>
                <TableCell>₹15.8 L (16%)</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  ₹84.2 L (84%)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Very Easy
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/guides/sip-for-1-crore-in-10-years/" className="block">
            <Card className="border-2 border-amber-300 bg-amber-50 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-5">
                <Badge className="bg-amber-600 text-white mb-3">
                  Current Guide
                </Badge>
                <h3 className="font-bold text-slate-900 mb-2">10-Year Plan</h3>
                <p className="text-sm text-slate-700 mb-3">
                  ₹43,041/month - For aggressive savers with high income
                </p>
                <div className="text-xs text-amber-700 font-semibold">
                  You&apos;re reading this guide
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guides/sip-for-1-crore-in-15-years/" className="block">
            <Card className="border-2 border-blue-300 bg-blue-50 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-5">
                <Badge className="bg-blue-600 text-white mb-3">
                  Sweet Spot
                </Badge>
                <h3 className="font-bold text-slate-900 mb-2">15-Year Plan</h3>
                <p className="text-sm text-slate-700 mb-3">
                  ₹19,819/month - Perfect balance of effort & compounding
                </p>
                <div className="flex items-center text-sm text-blue-700 font-semibold">
                  View 15-Year Guide
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guides/sip-for-1-crore-in-20-years/" className="block">
            <Card className="border-2 border-green-300 bg-green-50 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-5">
                <Badge className="bg-green-600 text-white mb-3">
                  Easiest Path
                </Badge>
                <h3 className="font-bold text-slate-900 mb-2">20-Year Plan</h3>
                <p className="text-sm text-slate-700 mb-3">
                  ₹10,009/month - Wealth on autopilot for young investors
                </p>
                <div className="flex items-center text-sm text-green-700 font-semibold">
                  View 20-Year Guide
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section id="faqs" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-white shadow-sm"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline hover:text-blue-700 transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border border-slate-900 bg-slate-900 text-white shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict: Is
            10-Year Path Right For You?
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            The 10-year path to ₹1 Crore is{' '}
            <strong>aggressive but achievable</strong>. It requires
            ₹43,041/month or ₹25,000 with 15% step-ups. This route is ideal for
            age 30-40 with high income, specific goals, and strong discipline.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="text-2xl font-bold text-emerald-400 mb-2">
                Start
              </div>
              <p className="text-sm text-slate-300">
                Begin with ₹25-43k based on income. Enable auto-debit and annual
                step-ups.
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                Persist
              </div>
              <p className="text-sm text-slate-300">
                Never stop during crashes. Years 8-10 create most
                wealth—don&apos;t quit early.
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                Protect
              </div>
              <p className="text-sm text-slate-300">
                Start moving to debt from Year 8. Secure gains before final year
                volatility.
              </p>
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
            <h3 className="font-bold text-lg mb-3 text-white">
              The 3 Non-Negotiables
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Never stop during market crashes</strong> — This is
                  when you make the most money
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Increase SIP by 10-15% annually</strong> — Match
                  salary hikes to beat inflation
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Shift 20-30% to debt in Year 8-9</strong> — Protect
                  gains from late-stage crashes
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Author Bio */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-emerald-600 to-teal-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to Start Your ₹1 Crore Journey?
          </h2>
          <p className="mb-8 max-w-2xl text-emerald-100 text-lg">
            Use our free SIP calculator to see exactly how much your monthly
            investment can grow. Plan your aggressive wealth creation strategy
            today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-emerald-700 transition hover:bg-emerald-50 shadow-lg flex items-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculate My SIP Returns
            </Link>
            <Link
              href="/mutual-funds/"
              className="rounded-lg border-2 border-emerald-300 bg-emerald-800/30 px-8 py-4 font-bold text-white transition hover:bg-emerald-800/50 flex items-center gap-2"
            >
              <PieChart className="h-5 w-5" />
              Explore Top Mutual Funds
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 6 - Final ad at bottom */}
      <div className="no-print mt-8">
        <AdSlot id="guide-1cr10y-6" type="leaderboard" />
      </div>
    </article>
  );
}
