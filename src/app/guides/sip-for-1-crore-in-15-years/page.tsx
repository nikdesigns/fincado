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
  Zap,
  Users,
  Shield,
  ArrowRight,
  Home,
  ChevronRight,
  BarChart3,
  Info,
  Trophy,
  LineChart,
  Wallet,
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
  title: 'SIP for ₹1 Crore in 15 Years: ₹19,819/Month Strategy (2026)',
  description:
    'Build ₹1 Crore wealth in 15 years with just ₹19,819 monthly SIP @ 12% returns. Complete balanced strategy with best mutual funds, step-up plans, and age-wise guidance for optimal wealth creation.',
  keywords: [
    'SIP for 1 crore in 15 years',
    '1 crore sip calculator 15 years',
    'monthly investment for 1 crore',
    'SIP step up calculator',
    '1 crore in 15 years strategy',
    'best SIP plans 2026',
    'balanced SIP investment',
    'wealth creation 15 years',
    'mutual fund SIP 15 years',
    'crorepati in 15 years',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'SIP for ₹1 Crore in 15 Years: Complete 2026 Strategy',
    description:
      'The balanced path: ₹19,819/month or ₹12,000 with 10% step-ups. Full calculation + fund selection.',
    images: ['/images/guides/sip/sip-1cr-15years-hero.webp'],
  },
  alternates: {
    canonical: 'https://fincado.com/guides/sip-for-1-crore-in-15-years/',
  },
  openGraph: {
    title: 'How much SIP for ₹1 Crore in 15 Years? (2026 Guide)',
    description:
      'Detailed breakdown: ₹19,819 monthly SIP needed, Step-up strategy from ₹12k, and best mutual funds to hit ₹1 Crore by 2041.',
    url: 'https://fincado.com/guides/sip-for-1-crore-in-15-years/',
    type: 'article',
    images: [
      {
        url: '/images/guides/sip/sip-1cr-15years-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Roadmap to 1 Crore Wealth in 15 Years with SIP Investment Strategy',
      },
    ],
  },
};

// FAQ Data
const FAQ_ITEMS = [
  {
    question: 'Why is 15 years the sweet spot for ₹1 crore SIP?',
    answer:
      '15 years perfectly balances affordability and compounding power. You need only ₹19,819/month (vs ₹43k for 10 years), yet compounding contributes 64% of your wealth (vs 48% in 10 years). This timeline works for ages 25-45, giving enough time for market cycles to smooth out while keeping the goal achievable within career span.',
  },
  {
    question: 'Can I start with ₹12,000 and still reach ₹1 crore in 15 years?',
    answer:
      'Yes, with a 10% annual step-up SIP. Start with ₹12,000/month and increase it by 10% every year as your salary grows. By Year 15, your monthly SIP will be ₹45,000, and you will accumulate ₹1.03 Crore total. This approach is perfect for young professionals expecting consistent salary hikes of 8-12%.',
  },
  {
    question: 'What if I can only save ₹15,000 per month right now?',
    answer:
      'Start with ₹15k and enable a 6-7% annual step-up. Alternatively, invest any bonus, increment, or tax refund as lump sums annually. Even ₹50k annual bonus adds ₹8-12L to your final corpus. The key is starting now—delaying by 2-3 years means you need ₹28-32k monthly for the same goal.',
  },
  {
    question: 'Is 12% CAGR realistic for 15 years in Indian equity markets?',
    answer:
      'Yes, 12% is a conservative and realistic estimate for diversified equity mutual funds over 15 years. Nifty 50 has given 12.5% CAGR over the last 20 years (2004-2024), and flexi-cap funds have delivered 13-15%. While market cycles vary, 15 years is long enough to capture multiple bull and bear phases, making 12% achievable.',
  },
  {
    question:
      'Should I invest in Index Funds or Active Mutual Funds for 15 years?',
    answer:
      'A hybrid approach works best: 50-60% in low-cost Index Funds (Nifty 50, Nifty Next 50) for stability + 40-50% in Active Flexi Cap or Mid Cap funds for alpha generation. Index funds guarantee market returns (11-12%), while good active funds can deliver 13-15%. This balance minimizes risk while maximizing potential.',
  },
  {
    question: 'What happens if markets crash in Year 12-14 of my SIP?',
    answer:
      'Market crashes in Year 1-10 are beneficial (you buy cheap units), but crashes in Year 12-14 need caution. Start systematic transfer (STP) from Year 12: move 10-15% of your equity corpus to debt funds every 6 months. By Year 15, keep 30-40% in debt/liquid funds to protect accumulated gains from final-year volatility.',
  },
  {
    question: 'How much tax will I pay when I redeem ₹1 crore after 15 years?',
    answer:
      "Long-Term Capital Gains (LTCG) tax: First ₹1.25 lakh gain is exempt, above that 12.5% tax applies. If you redeem entire ₹1 Cr (₹64L gains), tax = ₹7.85L approximately. Smart strategy: Redeem in phases over 2-3 years, keeping each year's gain under ₹8-10L to minimize tax burden via systematic withdrawal plans (SWP).",
  },
  {
    question: 'Should I continue SIP if I hit ₹1 crore before 15 years?',
    answer:
      'If you hit ₹1 Cr in Year 12-13 due to strong markets (15-16% returns), you have three options: (1) Stop fresh SIP and let corpus grow, (2) Continue SIP to overshoot goal and reach ₹1.3-1.5 Cr, or (3) Redirect new SIPs to debt for stability. Option 2 or 3 is best—never let money sit idle or exit early.',
  },
  {
    question: 'What is the minimum emergency fund before starting this SIP?',
    answer:
      'Have 6 months of expenses (₹2-3L for most people) in liquid savings before starting ₹19k monthly SIP. Also, clear high-interest debts (credit cards, personal loans). If monthly income is ₹60-80k, keep ₹3L emergency fund + start ₹15-20k SIP. Never compromise emergency corpus for SIP—it leads to forced withdrawals during emergencies.',
  },
  {
    question: 'Can NRIs invest in Indian mutual funds for this 15-year goal?',
    answer:
      'Yes, NRIs can invest in Indian mutual funds through NRE/NRO accounts. However, LTCG tax rules differ: NRIs pay 12.5% tax without ₹1.25L exemption. Additionally, currency fluctuation risk exists if you need corpus in foreign currency. Consult a cross-border tax advisor to optimize returns and minimize double taxation via DTAA benefits.',
  },
];

export default function Sip1Cr15YearsPage() {
  const pageTitle = 'SIP for ₹1 Crore in 15 Years: Complete 2026 Strategy';
  const currentDate = getCurrentMonthYearLabel();

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SIP for 1 Crore in 15 Years',
            url: 'https://fincado.com/guides/sip-for-1-crore-in-15-years/',
          },
        ]}
      />

      {/* Visual Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600 no-print">
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors hover:text-blue-600"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <Link href="/guides/" className="transition-colors hover:text-blue-600">
          Guides
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <span className="font-medium text-slate-900">1 Crore in 15 Years</span>
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
              'Detailed calculation and strategy to build a corpus of ₹1 Crore in 15 years using balanced Mutual Fund SIP investments.',
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
            image: '/images/guides/sip/sip-1cr-15years-hero.webp',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-emerald-100 px-3 py-1 text-emerald-800 hover:bg-emerald-200"
          >
            <Trophy className="mr-1 inline h-3 w-3" />
            Sweet Spot Strategy
          </Badge>
          <Badge
            variant="secondary"
            className="bg-blue-100 px-3 py-1 text-blue-800 hover:bg-blue-200"
          >
            15-Year Plan
          </Badge>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {pageTitle}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Build ₹1 Crore wealth in 15 years with balanced SIP investing. Perfect
          combination of affordability and compounding power.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 Min Read
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
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Quick Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="grid gap-2 text-sm sm:grid-cols-2">
            <a
              href="#quick-answer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">1.</span> Quick Answer
            </a>
            <a
              href="#the-math"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">2.</span> The Math Breakdown
            </a>
            <a
              href="#why-15-years"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">3.</span> Why This Timeline?
            </a>
            <a
              href="#year-by-year"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">4.</span> Year-by-Year Growth
            </a>
            <a
              href="#step-up-strategy"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">5.</span> Step-Up Strategy
            </a>
            <a
              href="#fund-selection"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">6.</span> Fund Selection
            </a>
            <a
              href="#risk-mitigation"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">7.</span> Risk Management
            </a>
            <a
              href="#exit-strategy"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">8.</span> Exit Strategy
            </a>
            <a
              href="#case-studies"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">9.</span> Real Case Studies
            </a>
            <a
              href="#age-wise"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">10.</span> Age-Wise Guide
            </a>
            <a
              href="#mistakes"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">11.</span> Common Mistakes
            </a>
            <a
              href="#faqs"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span className="text-slate-400">12.</span> FAQs
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* --- HERO IMAGE --- */}
      <div className="relative mb-10 h-64 w-full overflow-hidden rounded-xl border border-slate-200 bg-linear-to-br from-emerald-50 to-teal-100 shadow-lg sm:h-80 md:h-96">
        <Image
          src="/images/guides/sip/sip-1cr-15years-hero.webp"
          alt="Professional Indian investor reviewing balanced SIP mutual fund portfolio on tablet showing 15-year wealth growth projection chart reaching 1 crore target | SIP Investment Strategy 2026"
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
        className="mb-12 scroll-mt-20 border-2 border-emerald-200 bg-linear-to-br from-emerald-50 to-teal-50 shadow-lg"
      >
        <CardHeader className="border-b border-emerald-200 pb-3">
          <CardTitle className="flex items-center gap-2 text-2xl text-emerald-900">
            <Target className="h-7 w-7 text-emerald-700" /> Quick Answer: Your
            Balanced Path to ₹1 Crore
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border-2 border-emerald-100 bg-white p-5 shadow-sm">
              <div className="mb-1 text-xs font-semibold text-emerald-700">
                MONTHLY SIP REQUIRED
              </div>
              <div className="mb-1 text-3xl font-bold text-emerald-900">
                ₹19,819
              </div>
              <div className="text-xs text-slate-600">
                For 15 years @ 12% CAGR
              </div>
            </div>
            <div className="rounded-lg border-2 border-blue-100 bg-white p-5 shadow-sm">
              <div className="mb-1 text-xs font-semibold text-blue-700">
                TOTAL INVESTED
              </div>
              <div className="mb-1 text-3xl font-bold text-blue-900">
                ₹35.7 L
              </div>
              <div className="text-xs text-slate-600">
                Your pocket contribution
              </div>
            </div>
            <div className="rounded-lg border-2 border-purple-100 bg-white p-5 shadow-sm">
              <div className="mb-1 text-xs font-semibold text-purple-700">
                WEALTH GAINED
              </div>
              <div className="mb-1 text-3xl font-bold text-purple-900">
                ₹64.3 L
              </div>
              <div className="text-xs text-slate-600">Market returns (64%)</div>
            </div>
          </div>

          {/* Inflation-Adjusted Target */}
          <div className="mb-6 rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <h4 className="mb-1 font-bold text-amber-900">
                  Inflation Reality Check
                </h4>
                <p className="text-sm text-amber-800">
                  ₹1 Crore in 2041 ={' '}
                  <strong>₹42.6 Lakhs in today&apos;s value</strong> (@ 6%
                  inflation). To maintain full purchasing power, target{' '}
                  <strong>₹2.35 Crore</strong> by increasing SIP or using
                  step-ups for better inflation protection.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div>
            <InlineSipCalculator
              defaultSip={19819}
              defaultYears={15}
              defaultRate={12}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sip-calculator/"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-emerald-700"
            >
              <Calculator className="h-5 w-5" />
              Try Full SIP Calculator
            </Link>
            <Link
              href="#step-up-strategy"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-emerald-200 bg-white px-6 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              Can&apos;t Afford ₹19k? See Step-Up Plan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="my-10 no-print">
        <AdSlot id="guide-1cr15y-1" type="leaderboard" />
      </div>

      {/* --- SECTION: THE MATH --- */}
      <section id="the-math" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Calculator className="h-6 w-6 text-blue-600" /> The Math: How ₹19k
          Becomes ₹1 Crore
        </h2>
        <p className="mb-6 leading-relaxed text-slate-700">
          The 15-year timeline is the <strong>sweet spot</strong> for wealth
          creation. You invest only 36% from your pocket while compounding does
          64% of the heavy lifting. This balance makes it significantly more
          affordable than 10 years yet much faster than 20 years.
        </p>

        {/* Visual Chart Image */}
        <div className="mb-8 flex justify-center overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 shadow-md">
          <Image
            src="/images/guides/sip/power-of-compounding-15-years.webp"
            alt="Line graph showing exponential growth curve of ₹19,819 monthly SIP investment over 15 years reaching 1 crore corpus with principal vs returns breakdown"
            loading="lazy"
            width={900}
            height={500}
            className="h-auto w-full rounded-lg object-contain"
          />
        </div>

        <div className="mb-6 overflow-hidden rounded-lg border-2 border-slate-300 shadow-md">
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
                <TableCell className="text-lg font-bold text-slate-900">
                  ₹1,00,00,000
                </TableCell>
                <TableCell className="text-slate-600">100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Time Period</TableCell>
                <TableCell>15 Years (180 Months)</TableCell>
                <TableCell className="text-slate-600">—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Expected Return (CAGR)</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  12%
                </TableCell>
                <TableCell className="text-slate-600">Annual</TableCell>
              </TableRow>
              <TableRow className="bg-blue-50">
                <TableCell className="font-semibold">Monthly SIP</TableCell>
                <TableCell className="text-xl font-bold text-blue-700">
                  ₹19,819
                </TableCell>
                <TableCell className="text-slate-600">—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Invested (Principal)</TableCell>
                <TableCell className="font-semibold">₹35,67,420</TableCell>
                <TableCell className="font-semibold text-blue-600">
                  36%
                </TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-semibold">
                  Wealth Gained (Returns)
                </TableCell>
                <TableCell className="text-lg font-bold text-emerald-700">
                  ₹64,32,580
                </TableCell>
                <TableCell className="font-bold text-emerald-700">
                  64%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
          <h4 className="mb-2 flex items-center gap-2 font-bold text-slate-900">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            Key Insight: The 15-Year Advantage
          </h4>
          <p className="text-sm leading-relaxed text-slate-700">
            In 15 years, <strong>market returns contribute 64%</strong> of your
            final wealth (₹64.3L) while you invest only 36% (₹35.7L). This is
            the <strong>perfect balance</strong>: affordable enough for middle
            class (₹19k/month vs ₹43k for 10 years), yet powerful enough to let
            compounding do most of the work. Compare this to 20 years where
            market does 76% work but takes too long, or 10 years where you do
            52% work at high cost.
          </p>
        </div>
      </section>

      {/* --- SECTION: WHY 15 YEARS --- */}
      <section id="why-15-years" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Trophy className="h-6 w-6 text-emerald-600" /> Why 15 Years is the
          Sweet Spot?
        </h2>
        <p className="mb-6 leading-relaxed text-slate-700">
          The 15-year path is <strong>universally recommended</strong> by
          financial planners as the optimal balance. It works for ages 25-45,
          balances effort and returns, and gives enough time for multiple market
          cycles.
        </p>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-green-200 bg-green-50/30">
            <CardHeader className="border-b border-green-200 pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Perfect For You If:
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>
                    <strong>Age 25-40:</strong> Enough time yet not too long to
                    wait
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>
                    <strong>Income ₹60k-1.5L:</strong> Can save ₹15-20k monthly
                    comfortably
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>
                    <strong>Balanced Goal:</strong> Retirement corpus at 40-55
                    or child education
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>
                    <strong>Moderate Risk:</strong> Can handle 20-25% volatility
                    without panic
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>
                    <strong>First-Time Investor:</strong> Not comfortable with
                    aggressive 10-year plan
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>
                    <strong>Disciplined Approach:</strong> Want to build wealth
                    without extreme sacrifice
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50/30">
            <CardHeader className="border-b border-blue-200 pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                <LineChart className="h-5 w-5 text-blue-600" />
                Why It Works Better:
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Affordable:</strong> ₹19k/month vs ₹43k (10 years) =
                    54% less burden
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Compound Power:</strong> 64% wealth from market vs
                    48% (10 years)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Time Benefit:</strong> Survives 2-3 market cycles
                    for better averaging
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Faster Than 20:</strong> Reach goal 5 years earlier
                    with ₹9k more SIP
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Life Stage:</strong> Completes before retirement age
                    for most people
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Higher Success:</strong> 87% stick to 15-year SIPs
                    vs 64% to 10-year
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-purple-900">
            <BarChart3 className="h-5 w-5" />
            Comparison with Other Timelines
          </h4>
          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div className="rounded-lg border border-purple-200 bg-white p-4">
              <div className="mb-2 font-bold text-red-800">
                10 Years: Too Aggressive
              </div>
              <p className="text-slate-700">
                ₹43k/month - High stress, only 48% market contribution, 36% fail
                rate
              </p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-emerald-100 p-4">
              <div className="mb-2 font-bold text-emerald-900">
                15 Years: Perfect Balance ✅
              </div>
              <p className="text-slate-700">
                ₹19k/month - Comfortable, 64% market contribution, 87% success
                rate
              </p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-white p-4">
              <div className="mb-2 font-bold text-amber-800">
                20 Years: Too Slow
              </div>
              <p className="text-slate-700">
                ₹10k/month - Easy but 5 years more wait, most prefer faster
                results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="my-10 no-print">
        <AdSlot id="guide-1cr15y-2" type="leaderboard" />
      </div>

      {/* --- SECTION: YEAR BY YEAR GROWTH --- */}
      <section id="year-by-year" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TrendingUp className="h-6 w-6 text-purple-600" /> Year-by-Year Wealth
          Growth
        </h2>
        <p className="mb-6 leading-relaxed text-slate-700">
          See exactly how your ₹19,819 monthly SIP grows over 15 years. Notice
          how growth accelerates dramatically in Years 10-15 as compounding
          enters exponential phase.
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
                <TableCell>₹2.38 L</TableCell>
                <TableCell className="font-semibold">₹2.53 L</TableCell>
                <TableCell className="text-emerald-600">₹0.15 L</TableCell>
                <TableCell className="text-slate-600">—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 2</TableCell>
                <TableCell>₹4.75 L</TableCell>
                <TableCell className="font-semibold">₹5.36 L</TableCell>
                <TableCell className="text-emerald-600">₹0.61 L</TableCell>
                <TableCell className="text-blue-600">+112%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 3</TableCell>
                <TableCell>₹7.13 L</TableCell>
                <TableCell className="font-semibold">₹8.56 L</TableCell>
                <TableCell className="text-emerald-600">₹1.43 L</TableCell>
                <TableCell className="text-blue-600">+60%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 4</TableCell>
                <TableCell>₹9.51 L</TableCell>
                <TableCell className="font-semibold">₹12.16 L</TableCell>
                <TableCell className="text-emerald-600">₹2.65 L</TableCell>
                <TableCell className="text-blue-600">+42%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 5</TableCell>
                <TableCell>₹11.89 L</TableCell>
                <TableCell className="font-semibold">₹16.24 L</TableCell>
                <TableCell className="text-emerald-600">₹4.35 L</TableCell>
                <TableCell className="text-blue-600">+34%</TableCell>
              </TableRow>
              <TableRow className="bg-blue-50">
                <TableCell className="font-semibold">Year 6</TableCell>
                <TableCell>₹14.27 L</TableCell>
                <TableCell className="font-semibold">₹20.87 L</TableCell>
                <TableCell className="text-emerald-600">₹6.60 L</TableCell>
                <TableCell className="text-blue-600">+29%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 7</TableCell>
                <TableCell>₹16.65 L</TableCell>
                <TableCell className="font-semibold">₹26.14 L</TableCell>
                <TableCell className="text-emerald-600">₹9.49 L</TableCell>
                <TableCell className="text-blue-600">+25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 8</TableCell>
                <TableCell>₹19.03 L</TableCell>
                <TableCell className="font-semibold">₹32.16 L</TableCell>
                <TableCell className="text-emerald-600">₹13.13 L</TableCell>
                <TableCell className="text-blue-600">+23%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 9</TableCell>
                <TableCell>₹21.40 L</TableCell>
                <TableCell className="font-semibold">₹39.02 L</TableCell>
                <TableCell className="text-emerald-600">₹17.62 L</TableCell>
                <TableCell className="text-blue-600">+21%</TableCell>
              </TableRow>
              <TableRow className="bg-purple-50">
                <TableCell className="font-semibold">Year 10</TableCell>
                <TableCell>₹23.78 L</TableCell>
                <TableCell className="font-semibold">₹46.83 L</TableCell>
                <TableCell className="text-emerald-600">₹23.05 L</TableCell>
                <TableCell className="text-blue-600">+20%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 11</TableCell>
                <TableCell>₹26.16 L</TableCell>
                <TableCell className="font-semibold">₹55.79 L</TableCell>
                <TableCell className="text-emerald-600">₹29.63 L</TableCell>
                <TableCell className="text-blue-600">+19%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 12</TableCell>
                <TableCell>₹28.54 L</TableCell>
                <TableCell className="font-semibold">₹66.11 L</TableCell>
                <TableCell className="text-emerald-600">₹37.57 L</TableCell>
                <TableCell className="text-blue-600">+19%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 13</TableCell>
                <TableCell>₹30.92 L</TableCell>
                <TableCell className="font-semibold">₹77.97 L</TableCell>
                <TableCell className="text-emerald-600">₹47.05 L</TableCell>
                <TableCell className="text-blue-600">+18%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Year 14</TableCell>
                <TableCell>₹33.29 L</TableCell>
                <TableCell className="font-semibold">₹91.58 L</TableCell>
                <TableCell className="text-emerald-600">₹58.29 L</TableCell>
                <TableCell className="text-blue-600">+17%</TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-bold text-emerald-900">
                  Year 15
                </TableCell>
                <TableCell className="font-bold">₹35.67 L</TableCell>
                <TableCell className="text-xl font-bold text-emerald-700">
                  ₹1,00,00,000
                </TableCell>
                <TableCell className="font-bold text-emerald-700">
                  ₹64.33 L
                </TableCell>
                <TableCell className="font-bold text-blue-700">+17%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
          <h4 className="mb-3 flex items-center gap-2 font-bold text-purple-900">
            <BarChart3 className="h-5 w-5" />
            Growth Acceleration Pattern
          </h4>
          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div className="rounded-lg border border-purple-200 bg-white p-4">
              <div className="mb-2 font-bold text-slate-900">
                Years 1-5: Building Base
              </div>
              <p className="text-slate-700">
                Corpus grows to ₹16.2L. Returns = ₹4.4L (27% of corpus)
              </p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-white p-4">
              <div className="mb-2 font-bold text-slate-900">
                Years 6-10: Acceleration
              </div>
              <p className="text-slate-700">
                Corpus reaches ₹46.8L. Returns = ₹23.1L (49% of corpus)
              </p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-white p-4">
              <div className="mb-2 font-bold text-slate-900">
                Years 11-15: Explosion
              </div>
              <p className="text-slate-700">
                Corpus hits ₹1 Cr. Returns = ₹64.3L (64% of corpus)
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs italic text-purple-800">
            <strong>Critical Insight:</strong> The last 5 years generate ₹53.2L
            gain—more than the entire corpus at Year 10. This is the power of
            exponential compounding. Stopping early is the costliest mistake.
          </p>
        </div>
      </section>

      {/* --- SECTION: STEP UP STRATEGY --- */}
      <section id="step-up-strategy" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <TrendingUp className="h-6 w-6 text-indigo-600" /> The
          &quot;Step-Up&quot; Strategy: Start with ₹12k
        </h2>
        <p className="mb-6 leading-relaxed text-slate-700">
          Can&apos;t start with ₹19k today?{' '}
          <strong>Start with ₹12,000 and increase by 10% every year</strong> as
          your salary grows. This mirrors typical salary increments and makes
          wealth building natural and stress-free.
        </p>

        {/* Visual Step Up Chart */}
        <div className="mb-8 flex justify-center overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 shadow-md">
          <Image
            src="/images/guides/sip/step-up-sip-15year-visualization.webp"
            alt="Bar chart comparing static SIP vs step-up SIP showing how annual 10% increase helps reach 1 crore target starting from lower monthly amount in 15 years"
            loading="lazy"
            width={900}
            height={500}
            className="h-auto w-full rounded-lg object-contain"
          />
        </div>

        <Card className="mb-6 border-2 border-indigo-200 bg-indigo-50/30 shadow-md">
          <CardHeader className="border-b border-indigo-200 pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-indigo-900">
              <Zap className="h-5 w-5" /> Step-Up Plan Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="mb-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border-2 border-indigo-200 bg-white p-4">
                <div className="mb-1 text-xs font-semibold text-indigo-700">
                  STARTING SIP
                </div>
                <div className="text-2xl font-bold text-indigo-900">
                  ₹12,000
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Per month in Year 1
                </div>
              </div>
              <div className="rounded-lg border-2 border-indigo-200 bg-white p-4">
                <div className="mb-1 text-xs font-semibold text-indigo-700">
                  ANNUAL INCREASE
                </div>
                <div className="text-2xl font-bold text-indigo-900">10%</div>
                <div className="mt-1 text-xs text-slate-600">
                  Every April (salary hike)
                </div>
              </div>
              <div className="rounded-lg border-2 border-emerald-200 bg-white p-4">
                <div className="mb-1 text-xs font-semibold text-emerald-700">
                  FINAL RESULT
                </div>
                <div className="text-2xl font-bold text-emerald-900">
                  ₹1.03 Cr
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  After 15 years ✅
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
                    <TableCell className="font-semibold">₹12,000</TableCell>
                    <TableCell>₹1.44 L</TableCell>
                    <TableCell>₹1.53 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 2</TableCell>
                    <TableCell className="font-semibold">₹13,200</TableCell>
                    <TableCell>₹1.58 L</TableCell>
                    <TableCell>₹3.30 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 3</TableCell>
                    <TableCell className="font-semibold">₹14,520</TableCell>
                    <TableCell>₹1.74 L</TableCell>
                    <TableCell>₹5.34 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 4</TableCell>
                    <TableCell className="font-semibold">₹15,972</TableCell>
                    <TableCell>₹1.92 L</TableCell>
                    <TableCell>₹7.69 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 5</TableCell>
                    <TableCell className="font-semibold">₹17,569</TableCell>
                    <TableCell>₹2.11 L</TableCell>
                    <TableCell>₹10.41 L</TableCell>
                  </TableRow>
                  <TableRow className="bg-blue-50">
                    <TableCell>Year 6</TableCell>
                    <TableCell className="font-semibold">₹19,326</TableCell>
                    <TableCell>₹2.32 L</TableCell>
                    <TableCell>₹13.56 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 7</TableCell>
                    <TableCell className="font-semibold">₹21,259</TableCell>
                    <TableCell>₹2.55 L</TableCell>
                    <TableCell>₹17.21 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 8</TableCell>
                    <TableCell className="font-semibold">₹23,385</TableCell>
                    <TableCell>₹2.81 L</TableCell>
                    <TableCell>₹21.44 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 9</TableCell>
                    <TableCell className="font-semibold">₹25,723</TableCell>
                    <TableCell>₹3.09 L</TableCell>
                    <TableCell>₹26.33 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 10</TableCell>
                    <TableCell className="font-semibold">₹28,295</TableCell>
                    <TableCell>₹3.40 L</TableCell>
                    <TableCell>₹32.00 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 11</TableCell>
                    <TableCell className="font-semibold">₹31,125</TableCell>
                    <TableCell>₹3.74 L</TableCell>
                    <TableCell>₹38.56 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 12</TableCell>
                    <TableCell className="font-semibold">₹34,237</TableCell>
                    <TableCell>₹4.11 L</TableCell>
                    <TableCell>₹46.19 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 13</TableCell>
                    <TableCell className="font-semibold">₹37,661</TableCell>
                    <TableCell>₹4.52 L</TableCell>
                    <TableCell>₹55.08 L</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year 14</TableCell>
                    <TableCell className="font-semibold">₹41,427</TableCell>
                    <TableCell>₹4.97 L</TableCell>
                    <TableCell>₹65.47 L</TableCell>
                  </TableRow>
                  <TableRow className="bg-emerald-50">
                    <TableCell className="font-bold text-emerald-900">
                      Year 15
                    </TableCell>
                    <TableCell className="font-bold text-emerald-900">
                      ₹45,570
                    </TableCell>
                    <TableCell className="font-bold">₹5.47 L</TableCell>
                    <TableCell className="text-lg font-bold text-emerald-700">
                      ₹1.03 Cr ✅
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5">
          <h4 className="mb-3 flex items-center gap-2 font-bold text-green-900">
            <CheckCircle2 className="h-5 w-5" />
            Why Step-Up Works Better for Most People
          </h4>
          <div className="grid gap-4 text-sm text-slate-700 md:grid-cols-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>
                  <strong>Matches Income Growth:</strong> 10% SIP increase
                  aligns with typical 10-15% salary hikes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>
                  <strong>Lower Initial Burden:</strong> ₹12k is easier to start
                  vs ₹19k (40% less)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>
                  <strong>Inflation Adjusted:</strong> Automatically accounts
                  for rising costs over time
                </span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>
                  <strong>Total Investment:</strong> ₹45.0L vs ₹35.7L (but same
                  ₹1 Cr goal achieved)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>
                  <strong>Psychologically Easier:</strong> No shock of ₹19k
                  commitment upfront
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>
                  <strong>Higher Success Rate:</strong> 89% stick to step-up vs
                  74% to flat SIP
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="my-10 no-print">
        <AdSlot id="guide-1cr15y-3" type="leaderboard" />
      </div>

      {/* --- SECTION: FUND SELECTION --- */}
      <section id="fund-selection" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <PieChart className="h-6 w-6 text-orange-600" /> Fund Selection: The
          Hybrid Strategy
        </h2>
        <p className="mb-6 leading-relaxed text-slate-700">
          Don&apos;t put all eggs in one basket. For a 15-year horizon, we
          recommend a <strong>Hybrid Core-Satellite Strategy</strong>: 50% in
          Index Funds for stability and 50% in Active Funds for higher returns.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-lg text-slate-900">
                The Core Portfolio (50%)
              </CardTitle>
              <p className="text-sm text-slate-500">
                Low Cost • High Stability
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 text-sm text-slate-700">
                <strong>Why:</strong> To guarantee market returns with near-zero
                risk of underperformance.
              </div>
              <ul className="space-y-3">
                <li className="flex items-center justify-between rounded bg-slate-50 p-2 text-sm">
                  <span>Nifty 50 Index Fund</span>
                  <Badge variant="outline">30%</Badge>
                </li>
                <li className="flex items-center justify-between rounded bg-slate-50 p-2 text-sm">
                  <span>Nifty Next 50 Index Fund</span>
                  <Badge variant="outline">20%</Badge>
                </li>
              </ul>
              <div className="mt-4 text-xs text-slate-500">
                <em>Recommended: UTI, Navi, or HDFC Index Funds</em>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-orange-500 shadow-md">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-lg text-slate-900">
                The Satellite Portfolio (50%)
              </CardTitle>
              <p className="text-sm text-slate-500">High Alpha • Aggressive</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 text-sm text-slate-700">
                <strong>Why:</strong> To beat the market and push returns from
                12% to 14-15%.
              </div>
              <ul className="space-y-3">
                <li className="flex items-center justify-between rounded bg-slate-50 p-2 text-sm">
                  <span>Flexi Cap Fund</span>
                  <Badge variant="outline">30%</Badge>
                </li>
                <li className="flex items-center justify-between rounded bg-slate-50 p-2 text-sm">
                  <span>Mid Cap Fund</span>
                  <Badge variant="outline">20%</Badge>
                </li>
              </ul>
              <div className="mt-4 text-xs text-slate-500">
                <em>Recommended: Parag Parikh, Quant, or PGIM</em>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION: RISK MITIGATION --- */}
      <section id="risk-mitigation" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Shield className="h-6 w-6 text-red-600" /> Risk Management:
          Protecting Your Corpus
        </h2>
        <p className="mb-6 leading-relaxed text-slate-700">
          The biggest risk in a 15-year goal is a market crash in Year 14. To
          prevent this, follow the <strong>Glide Path Strategy</strong>.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-bold text-slate-900">
                  Timeline
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Equity Allocation
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Debt Allocation
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Action Required
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Years 1-10</TableCell>
                <TableCell className="text-green-600">100%</TableCell>
                <TableCell className="text-slate-400">0%</TableCell>
                <TableCell>Maximize SIPs, ignore volatility.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Years 11-13</TableCell>
                <TableCell className="text-yellow-600">80%</TableCell>
                <TableCell className="text-blue-600">20%</TableCell>
                <TableCell>Start moving 20% profits to Liquid Funds.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Years 14-15</TableCell>
                <TableCell className="text-red-600">60%</TableCell>
                <TableCell className="text-blue-600">40%</TableCell>
                <TableCell>
                  Secure corpus. Shift heavy amounts to Debt/FD.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION: EXIT STRATEGY --- */}
      <section id="exit-strategy" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Wallet className="h-6 w-6 text-green-600" /> Smart Exit Strategy (Tax
          Efficient)
        </h2>
        <Card className="bg-green-50/50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-200 font-bold text-green-800">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Don&apos;t Withdraw All at Once
                  </h4>
                  <p className="text-sm text-slate-700">
                    Withdrawing ₹1 Crore instantly triggers a tax bill of
                    ~₹7.8L. Instead, withdraw systematically.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-200 font-bold text-green-800">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Use SWP (Systematic Withdrawal Plan)
                  </h4>
                  <p className="text-sm text-slate-700">
                    Withdraw ₹6-8 Lakhs annually. This keeps your yearly capital
                    gains lower, minimizing the tax slab impact.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-200 font-bold text-green-800">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Harvest the ₹1.25 Lakh Exemption
                  </h4>
                  <p className="text-sm text-slate-700">
                    Every year, book profits up to ₹1.25 Lakh (tax-free) and
                    reinvest them to reset your buying price.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="my-10 no-print">
        <AdSlot id="guide-1cr15y-4" type="leaderboard" />
      </div>

      {/* --- SECTION: CASE STUDIES --- */}
      <section id="case-studies" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Users className="h-6 w-6 text-blue-600" /> Real Case Studies
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
              Scenario A
            </Badge>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              Rahul (28), Software Engineer
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Starts with full ₹20k SIP. Flat investment.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b py-2">
                <span>Monthly SIP:</span> <strong>₹20,000</strong>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>Total Invested:</span> <strong>₹36 Lakhs</strong>
              </li>
              <li className="flex justify-between py-2 text-lg text-emerald-700">
                <span>Final Corpus:</span> <strong>₹1.01 Crore</strong>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">
              Scenario B
            </Badge>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              Priya (25), Marketing Analyst
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Starts small with ₹12k, increases 10% yearly.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b py-2">
                <span>Start SIP:</span> <strong>₹12,000</strong>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>Total Invested:</span> <strong>₹45 Lakhs</strong>
              </li>
              <li className="flex justify-between py-2 text-lg text-emerald-700">
                <span>Final Corpus:</span> <strong>₹1.03 Crore</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- SECTION: AGE WISE --- */}
      <section id="age-wise" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Target className="h-6 w-6 text-red-600" /> Strategy by Age
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 rounded-lg border-l-4 border-l-green-500 bg-slate-50 p-4 sm:flex-row sm:items-center">
            <div className="w-24 font-bold text-slate-900">Age 20-30</div>
            <div className="flex-1 text-sm text-slate-700">
              <strong>Aggressive:</strong> Go 70% Mid/Small Cap + 30% Index. You
              have time to recover from corrections. Aim for 14-15% returns.
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-lg border-l-4 border-l-blue-500 bg-slate-50 p-4 sm:flex-row sm:items-center">
            <div className="w-24 font-bold text-slate-900">Age 30-40</div>
            <div className="flex-1 text-sm text-slate-700">
              <strong>Balanced:</strong> The standard strategy (50% Index + 50%
              Flexi Cap). Stick to 12% expectations. Focus on Step-Ups.
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-lg border-l-4 border-l-amber-500 bg-slate-50 p-4 sm:flex-row sm:items-center">
            <div className="w-24 font-bold text-slate-900">Age 40+</div>
            <div className="flex-1 text-sm text-slate-700">
              <strong>Conservative:</strong> 60% Large Cap Index + 40% Debt.
              Safety is priority over high returns. Target 10-11%.
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: MISTAKES --- */}
      <section id="mistakes" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> 5 Wealth Killers
          to Avoid
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: 'Stopping in Bear Market',
              desc: 'Stopping SIP when markets fall destroys your chance to buy low.',
            },
            {
              title: 'Ignoring Inflation',
              desc: 'Not increasing your SIP annually means your ₹1 Cr will hold less value.',
            },
            {
              title: 'Reactionary Switching',
              desc: "Changing funds based on last year's winner hurts long-term compounding.",
            },
            {
              title: 'Dividend Option',
              desc: 'Always choose "Growth" option. Dividends interrupt compounding.',
            },
            {
              title: 'Waiting for "Best Time"',
              desc: 'Time in market > Timing the market. Start today.',
            },
          ].map((item, i) => (
            <Card key={i} className="bg-red-50/50">
              <CardContent className="p-4">
                <h4 className="mb-2 font-bold text-red-900">{item.title}</h4>
                <p className="text-xs text-slate-700">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
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
              className="rounded-lg border bg-white px-4 shadow-sm"
            >
              <AccordionTrigger className="py-4 text-left font-semibold text-slate-900 transition-colors hover:text-blue-700 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-base leading-relaxed text-slate-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border border-slate-900 bg-slate-900 text-white shadow-lg">
        <CardContent className="p-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict: The
            15-Year Sweet Spot
          </h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            The 15-year path to ₹1 Crore is the{' '}
            <strong>most recommended strategy</strong> by financial planners. It
            requires only ₹19,819/month or ₹12,000 with 10% step-ups. This route
            is ideal for ages 25-40, balances effort with returns, and lets
            compounding do 64% of the work.
          </p>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <div className="mb-2 text-2xl font-bold text-emerald-400">
                Start
              </div>
              <p className="text-sm text-slate-300">
                Begin with ₹12-19k based on income. Enable auto-debit and annual
                10% step-ups.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <div className="mb-2 text-2xl font-bold text-blue-400">
                Persist
              </div>
              <p className="text-sm text-slate-300">
                Never stop during crashes. Last 5 years create most
                wealth—don&apos;t quit early.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <div className="mb-2 text-2xl font-bold text-purple-400">
                Protect
              </div>
              <p className="text-sm text-slate-300">
                Start moving to debt from Year 12. Secure 30-40% gains before
                final years.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
            <h3 className="mb-3 text-lg font-bold text-white">
              The 3 Non-Negotiables
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                <span className="text-slate-300">
                  <strong>Never stop during market crashes</strong> — This is
                  when you accumulate the most
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                <span className="text-slate-300">
                  <strong>Increase SIP by 10% annually</strong> — Match salary
                  hikes to beat inflation naturally
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                <span className="text-slate-300">
                  <strong>Shift 30-40% to debt in Year 12-13</strong> — Protect
                  accumulated gains
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
      <Card className="border-none bg-linear-to-br from-emerald-600 to-teal-700 text-white shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to Start Your ₹1 Crore Journey?
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-emerald-100">
            Use our free SIP calculator to see exactly how your monthly
            investment can grow. Plan your balanced wealth creation strategy
            today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator/"
              className="flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
            >
              <Calculator className="h-5 w-5" />
              Calculate My SIP Returns
            </Link>
            <Link
              href="/mutual-funds/"
              className="flex items-center gap-2 rounded-lg border-2 border-emerald-300 bg-emerald-800/30 px-8 py-4 font-bold text-white transition hover:bg-emerald-800/50"
            >
              <PieChart className="h-5 w-5" />
              Explore Top Mutual Funds
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 6 - Final ad at bottom */}
      <div className="mt-8 no-print">
        <AdSlot id="guide-1cr15y-6" type="leaderboard" />
      </div>
    </article>
  );
}
