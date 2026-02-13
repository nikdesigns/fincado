import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
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
  Clock,
  Calculator,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Coins,
  ShieldCheck,
  Scale,
  Ban,
  TrendingDown,
  History,
  FileText,
  ClipboardCheck,
  Target,
  PiggyBank,
} from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

// --- SEO METADATA (IMPROVED) ---
export const metadata: Metadata = {
  title:
    'SIP Investment Guide 2026: Complete Strategy, Returns Calculator & Tax Rules',
  description:
    'Complete SIP Investment Guide 2026: How SIP works, rupee cost averaging benefits, compounding calculator, SIP vs lump sum comparison, age-wise investment amounts (₹5K-₹50K), LTCG/STCG tax rules, market crash strategies, step-by-step guide & 10 common mistakes to avoid.',
  keywords: [
    'SIP investment guide 2026',
    'what is SIP mutual fund',
    'SIP vs lump sum comparison',
    'SIP returns calculator India',
    'SIP tax rules 2026',
    'best SIP amount by age',
    'rupee cost averaging explained',
    'SIP compounding calculator',
    'systematic investment plan India',
    'SIP during market crash strategy',
    'ELSS tax benefits 80C',
    'SIP LTCG STCG taxation',
    'how to start SIP online',
    'SIP step up strategy',
  ],
  openGraph: {
    title:
      'SIP Investment Guide 2026: Complete Strategy, Returns Calculator & Tax Rules',
    description:
      'Master SIP investing with our complete guide covering returns, taxation, age-wise strategies, and market crash tactics for 2026.',
    type: 'article',
    url: 'https://fincado.com/guides/sip-investment-guide/',
    images: [
      {
        url: '/images/guides/sip/sip-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'SIP Investment Guide 2026 Hero Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIP Investment Guide 2026: Complete Strategy & Returns',
    description:
      'Complete SIP guide covering compounding, tax rules, returns & age-wise strategies for wealth creation.',
  },
  alternates: {
    canonical: 'https://fincado.com/guides/sip-investment-guide/',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is SIP and how does it work?',
    answer:
      'SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly (monthly/quarterly) in mutual funds through auto-debit. It uses rupee-cost averaging to buy more units when prices are low and fewer when high, reducing average purchase cost over time.',
  },
  {
    question: 'What is the minimum amount to start a SIP?',
    answer:
      'Most mutual funds allow SIP starting from ₹500/month, with some funds accepting as low as ₹100/month. You can start with any amount comfortable for your budget and increase gradually.',
  },
  {
    question: 'Is SIP better than lump sum investment?',
    answer:
      'For 85% of retail investors, yes—SIP is better because it eliminates market timing risk, provides rupee-cost averaging benefits, and builds disciplined investment habits. Lump sum works better only if you invest during major market corrections (15-20% falls).',
  },
  {
    question: 'How much SIP should I do according to my age?',
    answer:
      'General guideline: Ages 20-30: ₹5K-₹15K/month (20-30% of income); Ages 30-40: ₹15K-₹40K/month (25-40% of income); Ages 40-50: ₹40K-₹1L/month (30-50% of income). Always prioritize emergency fund first.',
  },
  {
    question: 'What returns can I expect from SIP?',
    answer:
      'Historical equity mutual fund SIP returns (15-20 years): 12-15% CAGR. However, returns vary by fund category—large-cap (10-12%), flexi-cap (12-14%), mid-cap (14-16%), small-cap (15-18% but highly volatile). Returns are not guaranteed.',
  },
  {
    question: 'How is SIP taxed in India in 2026?',
    answer:
      'For equity funds: LTCG (>12 months) taxed at 12.5% on gains above ₹1.25 lakh/year; STCG (<12 months) taxed at 20%. For debt funds: gains added to income and taxed at your slab rate. ELSS offers Section 80C deduction up to ₹1.5 lakh.',
  },
  {
    question: 'Should I continue SIP during market crash?',
    answer:
      "Absolutely YES! Market crashes are SIP investors' best friends—you accumulate more units at lower prices. Historical data shows investors who continued SIP during 2008 and 2020 crashes earned 8-12% higher returns than those who paused.",
  },
  {
    question: 'How long should I continue my SIP?',
    answer:
      'Minimum 5-7 years for large-cap funds, 7-10 years for mid-cap, and 10-15 years for small-cap funds. Ideally, continue SIP until your financial goal is achieved. Data shows 10+ year SIPs have ZERO historical instances of negative returns in Indian equity markets.',
  },
  {
    question: 'Can I stop or pause my SIP anytime?',
    answer:
      'Yes (except ELSS which has 3-year lock-in). You can pause, stop, or withdraw your SIP investments anytime without penalty in open-ended mutual funds. However, premature withdrawal defeats the purpose of long-term compounding.',
  },
  {
    question: 'What are the biggest mistakes to avoid in SIP?',
    answer:
      "Top mistakes: (1) Stopping SIP during market falls, (2) choosing dividend over growth option, (3) over-diversification (15+ funds), (4) chasing last year's top performers, (5) not increasing SIP with salary hikes, and (6) redeeming for small expenses instead of letting it compound.",
  },
];

export default function SipGuidePage() {
  const updatedLabel = getCurrentMonthYearLabel();

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
              'SIP Investment Guide 2026: Complete Beginner to Expert Strategy for Wealth Creation',
            description:
              'Complete SIP Investment Guide 2026 covering compounding, rupee cost averaging, SIP vs Lump Sum, tax rules, age-wise strategies, and market crash tactics.',
            author: {
              '@type': 'Organization',
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
            datePublished: '2025-12-16',
            dateModified: '2026-02-13',
            image: 'https://fincado.com/images/guides/sip/sip-guide-hero.webp',
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

      {/* --- HOWTO SCHEMA (NEW) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Start SIP Investment in India',
            description: 'Step-by-step guide to starting a SIP in mutual funds',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Complete KYC',
                text: 'Complete your KYC (Know Your Customer) process online or offline using Aadhaar, PAN, and bank details.',
              },
              {
                '@type': 'HowToStep',
                name: 'Choose Fund Category',
                text: 'Select fund category based on goals: Equity (long-term wealth), Debt (stability), or Hybrid (balanced).',
              },
              {
                '@type': 'HowToStep',
                name: 'Decide SIP Amount',
                text: 'Start with 10-20% of monthly income. Can begin with as low as ₹500/month.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set Up Auto-Debit',
                text: 'Enable auto-debit mandate for hassle-free monthly investments.',
              },
              {
                '@type': 'HowToStep',
                name: 'Monitor & Step-Up',
                text: 'Review portfolio quarterly and increase SIP by 10% annually with salary hikes.',
              },
            ],
          }),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SIP Investment Guide 2026',
            url: 'https://fincado.com/guides/sip-investment-guide/',
          },
        ]}
      />

      {/* Breadcrumb Visual */}
      <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link href="/guides/" className="hover:text-blue-600 transition-colors">
          Guides
        </Link>
        <span>›</span>
        <span className="text-slate-900 font-medium">
          SIP Investment Guide 2026
        </span>
      </nav>

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Flagship Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          The Complete SIP Investment Guide 2026: Strategy, Returns & Tax Rules
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 22 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{updatedLabel}</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-blue-700">
            <CheckCircle2 className="h-4 w-4" /> SEBI-Compliant
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="The Complete SIP Investment Guide 2026" />
        </div>
      </header>

      {/* Quick Answer - WITH BLUE ACCENT (NEW) */}
      <Card className="mb-8 border-l-4 border-l-blue-600 bg-linear-to-br from-blue-50/50 via-white to-slate-50/30 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Quick Answer
              </CardTitle>
              <Badge className="mt-1 bg-blue-600 text-white hover:bg-blue-700">
                30-Second Read
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              SIP (Systematic Investment Plan) lets you invest{' '}
              <strong>as low as ₹500/month</strong> in mutual funds through
              auto-debit. Historical 20-year SIP returns average{' '}
              <strong>12-15% CAGR</strong> (compared to 6-7% in FDs). A{' '}
              <strong>₹10,000 monthly SIP for 20 years</strong> can grow to{' '}
              <strong>₹99 lakhs</strong> (invested: ₹24L).
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">₹500</div>
                <div className="text-slate-600 text-xs">Min Investment</div>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">12-15%</div>
                <div className="text-slate-600 text-xs">Avg Returns*</div>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">Zero</div>
                <div className="text-slate-600 text-xs">Lock-in**</div>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">12.5%</div>
                <div className="text-slate-600 text-xs">LTCG Tax</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 italic">
              *Historical data, not guaranteed | **Except ELSS (3-year lock-in)
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-700 text-sm mb-3 flex items-start gap-2">
              <Calculator className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
              <span>
                <strong>Want to know your wealth potential?</strong> Calculate
                how much your monthly SIP can grow in 10, 20, or 30 years.
              </span>
            </p>
            <Link
              href="/sip-calculator/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm w-full justify-center shadow-sm"
            >
              <Calculator className="h-4 w-4" />
              Calculate My SIP Returns
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Table of Contents (IMPROVED) */}
      <Card className="mb-8 border border-slate-200 bg-slate-50/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" />
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a
              href="#what-is-sip"
              aria-label="Jump to What is SIP section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">01</span> What is SIP?
            </a>
            <a
              href="#how-to-start"
              aria-label="Jump to How to Start section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">02</span> How to Start SIP
            </a>
            <a
              href="#how-it-works"
              aria-label="Jump to How SIP Works section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">03</span> How SIP Works
              (Compounding)
            </a>
            <a
              href="#sip-vs-lumpsum"
              aria-label="Jump to SIP vs Lump Sum section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">04</span> SIP vs Lump Sum
            </a>
            <a
              href="#age-strategy"
              aria-label="Jump to Age-Wise Strategy section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">05</span> Best SIP Amount by Age
            </a>
            <a
              href="#returns-examples"
              aria-label="Jump to Returns Examples section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">06</span> SIP Returns Matrix
            </a>
            <a
              href="#tax-rules"
              aria-label="Jump to Tax Rules section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">07</span> SIP Tax Rules 2026
            </a>
            <a
              href="#fund-selection"
              aria-label="Jump to Fund Selection section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">08</span> Choosing Right Funds
            </a>
            <a
              href="#market-crash"
              aria-label="Jump to Market Crash Strategy section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">09</span> SIP During Market Crash
            </a>
            <a
              href="#duration"
              aria-label="Jump to Duration Guide section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">10</span> Minimum Duration Rule
            </a>
            <a
              href="#mistakes"
              aria-label="Jump to Common Mistakes section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">11</span> Common Mistakes
            </a>
            <a
              href="#myths"
              aria-label="Jump to SIP Myths section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">12</span> SIP Myths Debunked
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              SIP (Systematic Investment Plan) is a disciplined investment method where you invest a fixed amount regularly (monthly, quarterly, or weekly) in mutual funds through auto-debit, regardless of market conditions. It's India's most powerful wealth-creation tool for retail investors, with over <strong>7.8 crore active SIP accounts</strong> contributing <strong>₹19,000+ crore monthly</strong> as of February 2026.
            </p>
            <p>
              Unlike lump sum investing where you need to time the market, SIP leverages <strong>rupee-cost averaging</strong> to buy more units when markets fall and fewer when they rise, significantly reducing your average purchase cost. This guide covers everything from starting your first SIP to advanced tax optimization strategies, helping you build long-term wealth systematically.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/sip/sip-guide-hero.webp"
              alt="Young Indian investor reviewing SIP mutual fund portfolio on smartphone showing wealth growth chart | SIP Investment Guide 2026"
              priority
              quality={85}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          <p className="text-center text-xs text-slate-500 italic mt-2">
            Start your wealth creation journey with systematic investing.
          </p>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 - After intro, before main content */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS SIP --- */}
      <Card
        id="what-is-sip"
        className="mb-12 border border-slate-200 shadow-sm scroll-mt-20"
      >
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-blue-600" /> What is SIP?
            (Systematic Investment Plan)
          </h2>
          <p className="mb-6 text-slate-700">
            A <strong>Systematic Investment Plan (SIP)</strong> is an investment
            method that allows you to invest a fixed amount regularly in mutual
            funds, creating a disciplined approach to wealth accumulation. Think
            of it as a recurring deposit, but with market-linked returns instead
            of fixed bank interest rates.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-600" /> How It Works
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li>
                  <strong>Fixed Amount:</strong> Invest ₹500-₹1L+ monthly based
                  on your budget
                </li>
                <li>
                  <strong>Auto-Debit:</strong> Money automatically deducted from
                  your bank account
                </li>
                <li>
                  <strong>Units Allocation:</strong> You receive units based on
                  current NAV (Net Asset Value)
                </li>
                <li>
                  <strong>Flexible:</strong> Pause, stop, or modify amount
                  anytime (except ELSS)
                </li>
                <li>
                  <strong>Frequency:</strong> Choose monthly, quarterly, or
                  weekly SIP
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-slate-600" /> Why SIP Works
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-4">
                <li>
                  <strong>Rupee Cost Averaging:</strong> Buy more units when
                  price low, fewer when high
                </li>
                <li>
                  <strong>Power of Compounding:</strong> Earn returns on your
                  returns over time
                </li>
                <li>
                  <strong>Eliminates Timing Risk:</strong> No need to predict
                  market highs/lows
                </li>
                <li>
                  <strong>Builds Discipline:</strong> Forced savings ensure
                  regular investing
                </li>
                <li>
                  <strong>Accessible:</strong> Start with as little as ₹500
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1.5: SIP VS TRADITIONAL (Improved Table) --- */}
      <Card className="mb-12 border border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" /> SIP vs Traditional
            Investing
          </h2>
          <p className="mb-6 text-slate-700">
            Understanding how SIP compares to traditional investment methods
            helps you make informed decisions based on your financial goals and
            risk appetite.
          </p>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="font-bold text-slate-900">
                        Feature
                      </TableHead>
                      <TableHead className="font-bold text-slate-900">
                        SIP (Mutual Funds)
                      </TableHead>
                      <TableHead className="font-bold text-slate-900">
                        Lump Sum
                      </TableHead>
                      <TableHead className="font-bold text-slate-900">
                        RD (Recurring Deposit)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Investment Pattern
                      </TableCell>
                      <TableCell>Fixed amount regularly</TableCell>
                      <TableCell>One-time large amount</TableCell>
                      <TableCell>Fixed amount regularly</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Expected Returns
                      </TableCell>
                      <TableCell className="text-blue-600 font-bold">
                        12-15% (Equity)*
                      </TableCell>
                      <TableCell>Variable (Timing dependent)</TableCell>
                      <TableCell>5.5-7.5% (Guaranteed)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Market Risk
                      </TableCell>
                      <TableCell>Averaged (Rupee Cost Averaging)</TableCell>
                      <TableCell className="text-red-600">
                        High (Timing Risk)
                      </TableCell>
                      <TableCell className="text-green-600">Zero</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Minimum Amount
                      </TableCell>
                      <TableCell className="font-bold">₹500/month</TableCell>
                      <TableCell>₹5,000+</TableCell>
                      <TableCell>₹100/month</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Liquidity
                      </TableCell>
                      <TableCell>High (Redeem anytime)</TableCell>
                      <TableCell>High</TableCell>
                      <TableCell>Penalty on premature withdrawal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Lock-in Period
                      </TableCell>
                      <TableCell>None (Except ELSS: 3 years)</TableCell>
                      <TableCell>None</TableCell>
                      <TableCell>Usually 5 years</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Tax Benefits
                      </TableCell>
                      <TableCell>ELSS: 80C up to ₹1.5L</TableCell>
                      <TableCell>ELSS: 80C up to ₹1.5L</TableCell>
                      <TableCell>80C up to ₹1.5L (5-year RD)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-4 italic">
            *Historical equity fund returns 2006-2026. Past performance
            doesn&apos;t guarantee future returns. Mutual fund investments are
            subject to market risk.
          </p>

          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100 text-sm text-blue-900 mt-6">
            <strong className="mb-2 text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Key Advantages of SIP:
            </strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Rupee-Cost Averaging:</strong> Automatic buy-low
                strategy reduces average purchase cost
              </li>
              <li>
                <strong>Disciplined Investing:</strong> Auto-debit ensures you
                never miss an investment
              </li>
              <li>
                <strong>Power of Compounding:</strong> Exponential growth over
                10+ years
              </li>
              <li>
                <strong>Flexibility:</strong> Start small (₹500) and scale up
                with income growth
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 2: HOW TO START SIP (NEW) --- */}
      <section id="how-to-start" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-blue-600" /> How to Start Your
          First SIP (Step-by-Step)
        </h2>
        <p className="mb-6 text-slate-700">
          Starting a SIP is simpler than opening a bank account. Follow these 6
          steps to begin your wealth creation journey today. No prior investment
          experience required!
        </p>

        <div className="space-y-4">
          {/* Step 1 */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Complete KYC (One-Time Process)
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Complete your KYC verification online (eKYC) or offline
                    using Aadhaar, PAN card, and bank details. This is a
                    one-time mandatory process for all mutual fund investments
                    in India as per SEBI regulations.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Timeline:</strong> 24-48 hours for online eKYC |{' '}
                      <strong>Required:</strong> PAN card, Aadhaar, Bank Account
                      Statement, Passport-size Photo, Signature
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Choose Investment Platform
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Select between <strong>Direct Plans</strong> (via AMC
                    website - 0.5-1% lower expense ratio) or{' '}
                    <strong>Regular Plans</strong> through apps like Groww,
                    Zerodha Coin, ET Money, Paytm Money, or traditional
                    distributors.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Pro Tip:</strong> Direct plans save ₹2-3 lakhs
                      over 20 years on a ₹10K SIP due to lower expense ratio.
                      Choose regular only if you need advisory support.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Select Fund Category & Scheme
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Choose based on investment goal and time horizon:{' '}
                    <strong>Equity Funds</strong> 7 years wealth creation),{' '}
                    <strong>Debt Funds</strong> (3-5 years stability),{' '}
                    <strong>Hybrid Funds</strong> (balanced 60:40 equity-debt
                    mix).
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Beginner-Friendly:</strong> Start with Index Funds
                      (Nifty 50/Sensex) or Flexi-Cap Funds for automatic
                      diversification across market caps.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Decide SIP Amount & Date
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Start with 10-20% of your monthly income. Choose a SIP date
                    close to your salary credit date (5th, 7th, or 10th works
                    best for salaried individuals) to ensure sufficient balance.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Smart Move:</strong> Split into 2-3 funds (Index +
                      Flexi-Cap + Mid-Cap) on different dates (5th, 10th, 15th)
                      for better rupee-cost averaging.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Set Up Auto-Debit Mandate
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Register an auto-debit mandate (E-NACH) with your bank for
                    hassle-free monthly deductions. You can set a maximum debit
                    limit to control spending.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>One-Time Setup:</strong> Takes 2-3 days for bank
                      approval. Once active, investments happen automatically
                      without manual intervention.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 6 */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                  6
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Monitor & Step-Up Annually
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Review your portfolio quarterly. Enable SIP step-up to
                    increase your monthly investment by 10% annually,
                    automatically adjusting with your salary hikes and
                    inflation.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Step-Up Magic:</strong> A ₹10K SIP with 10% annual
                      step-up creates 40% more wealth than a static SIP over 20
                      years!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-slate-900 flex items-start gap-2">
            <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Total Time to Start:</strong> Complete the process in 2-3
              days. First SIP deduction happens on your chosen date next month.
              That&apos;s it—you&apos;re now an investor!
            </span>
          </p>
        </div>
      </section>

      {/* 💰 AD SLOT 2 - After How to Start section */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-2" type="leaderboard" />
      </div>

      {/* --- SECTION 3: HOW SIP WORKS - COMPOUNDING --- */}
      <section id="how-it-works" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-indigo-600" /> How SIP Works: The
          Magic of Compounding
        </h2>
        <p className="mb-6 text-slate-700">
          SIP&apos;s real power lies in <strong>compounding</strong>—earning
          returns on your returns. Albert Einstein allegedly called compound
          interest &quot;the eighth wonder of the world.&quot; The longer you
          stay invested, the more dramatic the wealth creation becomes.
        </p>

        {/* IMAGE: Compounding Graph */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/sip/power-of-compounding-graph.webp"
            alt="Graph showing exponential growth curve of ₹10,000 monthly SIP investment over 30 years demonstrating power of compounding in mutual funds"
            loading="lazy"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-indigo-200 bg-indigo-50/30 mb-8 shadow-sm">
          <CardHeader className="pb-3 border-b border-indigo-200">
            <CardTitle className="text-indigo-900 text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> The Power of Time: ₹10,000
              Monthly SIP @ 12% CAGR
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-indigo-50">
                    <TableHead className="font-bold text-indigo-900">
                      Period
                    </TableHead>
                    <TableHead className="font-bold text-indigo-900">
                      Total Invested
                    </TableHead>
                    <TableHead className="font-bold text-indigo-900">
                      Maturity Value
                    </TableHead>
                    <TableHead className="font-bold text-indigo-900">
                      Wealth Gain
                    </TableHead>
                    <TableHead className="font-bold text-indigo-900">
                      Multiple
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">5 Years</TableCell>
                    <TableCell>₹6,00,000</TableCell>
                    <TableCell>₹8,16,000</TableCell>
                    <TableCell>₹2,16,000</TableCell>
                    <TableCell>1.36x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">10 Years</TableCell>
                    <TableCell>₹12,00,000</TableCell>
                    <TableCell>₹23,00,000</TableCell>
                    <TableCell>₹11,00,000</TableCell>
                    <TableCell>1.92x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">15 Years</TableCell>
                    <TableCell>₹18,00,000</TableCell>
                    <TableCell>₹50,00,000</TableCell>
                    <TableCell>₹32,00,000</TableCell>
                    <TableCell>2.78x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">20 Years</TableCell>
                    <TableCell>₹24,00,000</TableCell>
                    <TableCell>₹99,00,000</TableCell>
                    <TableCell>₹75,00,000</TableCell>
                    <TableCell>4.13x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">25 Years</TableCell>
                    <TableCell>₹30,00,000</TableCell>
                    <TableCell>₹1,89,00,000</TableCell>
                    <TableCell>₹1,59,00,000</TableCell>
                    <TableCell>6.30x</TableCell>
                  </TableRow>
                  <TableRow className="bg-indigo-100 hover:bg-indigo-100">
                    <TableCell className="font-bold">30 Years</TableCell>
                    <TableCell className="font-bold">₹36,00,000</TableCell>
                    <TableCell className="font-bold text-blue-700 text-lg">
                      ₹3,53,00,000
                    </TableCell>
                    <TableCell className="font-bold text-blue-700 text-lg">
                      ₹3,17,00,000
                    </TableCell>
                    <TableCell className="font-bold">9.81x</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="p-4 text-sm text-indigo-900 bg-indigo-50/50 border-t border-indigo-200">
              <strong className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5" /> Shocking Insight:
              </strong>
              From year 20 to 30, your wealth increases by 3.6x (₹2.54 Cr
              growth), while you only invest ₹12L more. The last 10 years create
              more wealth than the first 20 combined—that&apos;s the magic of
              exponential compounding!
            </div>
          </CardContent>
        </Card>

        {/* Rupee Cost Averaging Explanation */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" /> Rupee Cost Averaging:
              Your Hidden Advantage
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-slate-700 mb-4">
              With SIP, you automatically buy more units when the market is down
              and fewer when it&apos;s up, reducing your average cost per unit
              over time. This eliminates the need to time the market.
            </p>

            <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
              <h4 className="font-bold text-slate-900 mb-3">
                Example: ₹10,000 Monthly SIP Over 6 Months
              </h4>
              <div className="overflow-x-auto">
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>NAV (₹)</TableHead>
                      <TableHead>Investment</TableHead>
                      <TableHead>Units Bought</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jan</TableCell>
                      <TableCell>₹100</TableCell>
                      <TableCell>₹10,000</TableCell>
                      <TableCell>100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Feb</TableCell>
                      <TableCell>₹90</TableCell>
                      <TableCell>₹10,000</TableCell>
                      <TableCell className="text-green-700 font-bold">
                        111.11
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mar</TableCell>
                      <TableCell>₹80</TableCell>
                      <TableCell>₹10,000</TableCell>
                      <TableCell className="text-green-700 font-bold">
                        125
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Apr</TableCell>
                      <TableCell>₹85</TableCell>
                      <TableCell>₹10,000</TableCell>
                      <TableCell>117.65</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May</TableCell>
                      <TableCell>₹95</TableCell>
                      <TableCell>₹10,000</TableCell>
                      <TableCell>105.26</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jun</TableCell>
                      <TableCell>₹105</TableCell>
                      <TableCell>₹10,000</TableCell>
                      <TableCell>95.24</TableCell>
                    </TableRow>
                    <TableRow className="bg-blue-100 font-bold">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>₹60,000</TableCell>
                      <TableCell>654.26 units</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">
                    Average NAV (Simple)
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    ₹92.50 (₹555/6)
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border-2 border-green-300">
                  <p className="text-xs text-green-800 mb-1">
                    Your Average Cost (SIP)
                  </p>
                  <p className="text-lg font-bold text-green-700">
                    ₹91.70 (₹60K/654 units)
                  </p>
                </div>
              </div>

              <p className="text-xs text-blue-900 mt-3 italic font-medium">
                You saved ₹0.80 per unit through rupee cost averaging. Over
                10,000 units, that&apos;s ₹8,000 in savings—automatically!
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 - After compounding section */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4: SIP VS LUMP SUM --- */}
      <section id="sip-vs-lumpsum" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="h-6 w-6 text-amber-500" /> SIP vs Lump Sum: The
          Verdict
        </h2>

        <p className="mb-6 text-slate-700">
          The eternal debate: Should you invest ₹12 lakh at once or ₹1 lakh
          monthly for 12 months? The answer depends on market conditions and
          your risk appetite.
        </p>

        <Card className="border border-slate-200 shadow-sm mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-lg text-slate-900">
              Historical Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Market Scenario
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      SIP Return
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Lump Sum Return
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Winner
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Bull Market</strong> (Steady Rise)
                    </TableCell>
                    <TableCell>38-45%</TableCell>
                    <TableCell className="font-bold">52-68%</TableCell>
                    <TableCell className="text-green-600 font-bold">
                      Lump Sum ✓
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Bear Market</strong> (Crash -20%+)
                    </TableCell>
                    <TableCell className="font-bold">12-15%</TableCell>
                    <TableCell className="text-red-600">-10 to +5%</TableCell>
                    <TableCell className="text-green-600 font-bold">
                      SIP ✓ (Big Win)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Volatile Market</strong> (Up & Down)
                    </TableCell>
                    <TableCell className="font-bold">14-17%</TableCell>
                    <TableCell>11-13%</TableCell>
                    <TableCell className="text-green-600 font-bold">
                      SIP ✓
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-blue-50">
                    <TableCell>
                      <strong>20-Year Average</strong> (All Conditions)
                    </TableCell>
                    <TableCell className="font-bold text-blue-700">
                      12.8%
                    </TableCell>
                    <TableCell>11.9%</TableCell>
                    <TableCell className="font-bold text-blue-700">
                      SIP ✓ (Slight Edge)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-green-200 bg-green-50/30 shadow-sm">
            <CardHeader className="pb-3 border-b border-green-200">
              <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> SIP Wins When...
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Market is volatile or bearish</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>You are a beginner investor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>You have regular income (salary)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>You want to avoid market timing risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>You are risk-averse and need peace of mind</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>You want disciplined, automated investing</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/30 shadow-sm">
            <CardHeader className="pb-3 border-b border-amber-200">
              <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
                <Target className="h-5 w-5" /> Lump Sum Wins When...
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Market is at correction bottom (-15% to -20%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Strong bull run is expected to follow</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    You have windfall money (bonus, inheritance, sale proceeds)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>You have 10+ year horizon to recover from losses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>You are experienced in market timing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>You can handle short-term volatility</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" /> The Hybrid Strategy
            (Recommended for Windfalls)
          </h4>
          <p className="text-sm text-slate-700 mb-3">
            If you suddenly receive a large sum (₹10-50 lakhs), use the{' '}
            <strong>50-30-20 Rule</strong> to balance both approaches:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
              <div className="font-bold text-2xl text-blue-700 mb-1">50%</div>
              <p className="text-slate-700">
                Invest immediately as <strong>Lump Sum</strong> in Index/Large
                Cap funds
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
              <div className="font-bold text-2xl text-blue-700 mb-1">30%</div>
              <p className="text-slate-700">
                Park in <strong>Liquid Fund</strong>, then STP (Systematic
                Transfer) to equity over 6-12 months
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
              <div className="font-bold text-2xl text-blue-700 mb-1">20%</div>
              <p className="text-slate-700">
                Continue your regular <strong>salary SIP</strong> for discipline
              </p>
            </div>
          </div>
          <p className="text-xs text-blue-900 mt-3 italic">
            This strategy gives you market exposure immediately while still
            benefiting from rupee cost averaging on the remaining 30%.
          </p>
        </div>
      </section>

      {/* 💰 AD SLOT 4 - After SIP vs Lump Sum */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-4" type="leaderboard" />
      </div>

      {/* --- SECTION 5: AGE STRATEGY --- */}
      <section id="age-strategy" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="h-6 w-6 text-purple-600" /> Best SIP Amount by Age &
          Income
        </h2>
        <p className="mb-6 text-slate-700">
          Your SIP amount should align with your age, income, and financial
          goals. Here&apos;s a comprehensive age-wise strategy to maximize
          wealth creation.
        </p>

        <div className="space-y-6">
          <Card className="border-emerald-200 bg-emerald-50/20 shadow-sm">
            <CardHeader className="pb-3 border-b border-emerald-200">
              <CardTitle className="text-emerald-800 text-xl flex items-center gap-2">
                <Target className="h-5 w-5" /> Age 20-25: The Foundation Years
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Just started career, building emergency fund
              </p>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                <p className="mb-2">
                  <strong>Typical Income:</strong> ₹20,000 - ₹40,000/month
                </p>
                <p className="mb-2">
                  <strong>Primary Goals:</strong> Build investment habit,
                  emergency fund (3-6 months expenses)
                </p>
              </div>

              <div className="overflow-x-auto mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Monthly Income</TableHead>
                      <TableHead>Recommended SIP</TableHead>
                      <TableHead>Goal (10 years)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>₹25,000</TableCell>
                      <TableCell className="font-bold">
                        ₹2,500-₹5,000 (10-20%)
                      </TableCell>
                      <TableCell>₹10-18L corpus</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>₹35,000</TableCell>
                      <TableCell className="font-bold">
                        ₹5,000-₹7,000 (15-20%)
                      </TableCell>
                      <TableCell>₹18-25L corpus</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <p className="font-semibold text-emerald-900 mb-2">
                    Asset Allocation
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• 90% Equity (Small/Mid Cap focus)</li>
                    <li>• 10% Debt (Emergency fund building)</li>
                    <li>• Aggressive growth phase</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <p className="font-semibold text-emerald-900 mb-2">
                    Recommended Funds
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Flexi Cap Fund (40%)</li>
                    <li>• Mid Cap Fund (30%)</li>
                    <li>• Small Cap Fund (20%)</li>
                    <li>• Liquid Fund (10%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/20 shadow-sm">
            <CardHeader className="pb-3 border-b border-blue-200">
              <CardTitle className="text-blue-800 text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Age 25-35: Wealth
                Accumulation Phase
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Peak earning growth, major life goals (marriage, house)
              </p>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                <p className="mb-2">
                  <strong>Typical Income:</strong> ₹40,000 - ₹1,00,000/month
                </p>
                <p className="mb-2">
                  <strong>Primary Goals:</strong> House down payment, marriage,
                  child planning
                </p>
              </div>

              <div className="overflow-x-auto mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Monthly Income</TableHead>
                      <TableHead>Recommended SIP</TableHead>
                      <TableHead>Goal (15 years)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>₹50,000</TableCell>
                      <TableCell className="font-bold">
                        ₹10,000-₹15,000 (20-30%)
                      </TableCell>
                      <TableCell>₹50-75L corpus</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>₹75,000</TableCell>
                      <TableCell className="font-bold">
                        ₹18,000-₹25,000 (25-35%)
                      </TableCell>
                      <TableCell>₹90L-₹1.25Cr corpus</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>₹1,00,000+</TableCell>
                      <TableCell className="font-bold">
                        ₹25,000-₹40,000 (25-40%)
                      </TableCell>
                      <TableCell>₹1.25-₹2Cr corpus</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">
                    Asset Allocation
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• 80% Equity (Diversified mix)</li>
                    <li>• 15% Debt (Goal-based parking)</li>
                    <li>• 5% Gold (Inflation hedge)</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">
                    Recommended Funds
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Flexi Cap Fund (30%)</li>
                    <li>• Index Fund - Nifty 50 (25%)</li>
                    <li>• Mid Cap Fund (25%)</li>
                    <li>• Debt Fund (15%) + Gold ETF (5%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50/20 shadow-sm">
            <CardHeader className="pb-3 border-b border-indigo-200">
              <CardTitle className="text-indigo-800 text-xl flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Age 35-45: Peak Earning &
                De-Risking
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Highest income phase, retirement planning begins
              </p>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                <p className="mb-2">
                  <strong>Typical Income:</strong> ₹1L - ₹3L/month
                </p>
                <p className="mb-2">
                  <strong>Primary Goals:</strong> Child education fund,
                  retirement corpus, debt repayment
                </p>
              </div>

              <div className="overflow-x-auto mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Monthly Income</TableHead>
                      <TableHead>Recommended SIP</TableHead>
                      <TableHead>Goal (20 years)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>₹1,50,000</TableCell>
                      <TableCell className="font-bold">
                        ₹50,000-₹75,000 (33-50%)
                      </TableCell>
                      <TableCell>₹2-₹3Cr corpus</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>₹2,50,000</TableCell>
                      <TableCell className="font-bold">
                        ₹85,000-₹1,25,000 (35-50%)
                      </TableCell>
                      <TableCell>₹3.5-₹5Cr corpus</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>₹3,00,000+</TableCell>
                      <TableCell className="font-bold">
                        ₹1,20,000-₹1,80,000 (40-60%)
                      </TableCell>
                      <TableCell>₹5-₹7Cr corpus</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <p className="font-semibold text-indigo-900 mb-2">
                    Asset Allocation
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• 70% Equity (Large cap heavy)</li>
                    <li>• 25% Debt (Goal-based + safety)</li>
                    <li>• 5% Gold (Portfolio hedge)</li>
                    <li>• Gradual de-risking phase</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <p className="font-semibold text-indigo-900 mb-2">
                    Recommended Funds
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Index Fund - Nifty 50 (40%)</li>
                    <li>• Flexi Cap Fund (20%)</li>
                    <li>• Mid Cap Fund (10%)</li>
                    <li>• Debt Fund (25%) + Gold ETF (5%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/20 shadow-sm">
            <CardHeader className="pb-3 border-b border-purple-200">
              <CardTitle className="text-purple-800 text-xl flex items-center gap-2">
                <History className="h-5 w-5" /> Age 45-55: Pre-Retirement
                Consolidation
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Final wealth sprint, aggressive debt reduction
              </p>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                <p className="mb-2">
                  <strong>Typical Income:</strong> ₹1.5L - ₹4L/month
                </p>
                <p className="mb-2">
                  <strong>Primary Goals:</strong> Maximize retirement corpus,
                  clear all debts, health insurance
                </p>
              </div>

              <div className="overflow-x-auto mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Monthly Income</TableHead>
                      <TableHead>Recommended SIP</TableHead>
                      <TableHead>Strategy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>₹2,00,000</TableCell>
                      <TableCell className="font-bold">
                        ₹80,000-₹1,20,000 (40-60%)
                      </TableCell>
                      <TableCell>Conservative growth</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>₹3,50,000+</TableCell>
                      <TableCell className="font-bold">
                        ₹1,40,000-₹2,10,000 (40-60%)
                      </TableCell>
                      <TableCell>Capital preservation focus</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">
                    Asset Allocation
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• 50% Equity (Large cap only)</li>
                    <li>• 40% Debt (High quality bonds)</li>
                    <li>• 10% Gold + Cash (Liquidity)</li>
                    <li>• Focus: Capital preservation</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">
                    Recommended Funds
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Index Fund - Nifty 50 (50%)</li>
                    <li>• Debt Fund - Corporate Bond (30%)</li>
                    <li>• Liquid Fund (10%)</li>
                    <li>• Gold ETF (10%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" /> Universal Rule
            Across All Ages
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-1">
                Step-Up Annually
              </p>
              <p className="text-slate-600 text-xs">
                Increase SIP by 10-15% every year with salary hikes to beat
                inflation
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-1">
                Emergency Fund First
              </p>
              <p className="text-slate-600 text-xs">
                Keep 6 months expenses in liquid fund before aggressive SIP
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-1">
                Rebalance Yearly
              </p>
              <p className="text-slate-600 text-xs">
                Review portfolio annually and shift equity to debt as you age
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 5 - After Age Strategy */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-5" type="leaderboard" />
      </div>

      {/* --- SECTION 6: RETURNS MATRIX --- */}
      <section id="returns-examples" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Coins className="h-6 w-6 text-yellow-600" /> SIP Returns Matrix (12%
          CAGR Projection)
        </h2>
        <p className="mb-6 text-slate-700">
          Real-world projections for different SIP amounts assuming 12% CAGR
          (historical average for equity funds). Notice how ₹5,000 monthly can
          turn into <strong>₹1.76 Crore</strong> over 30 years!
        </p>

        <div className="space-y-6">
          {/* ₹5,000 SIP */}
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-slate-600" /> ₹5,000 Monthly
                SIP @ 12%
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Perfect for beginners and young professionals
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Years</TableHead>
                    <TableHead>Invested</TableHead>
                    <TableHead>Maturity Value</TableHead>
                    <TableHead>Wealth Gain</TableHead>
                    <TableHead>Returns %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">5</TableCell>
                    <TableCell>₹3,00,000</TableCell>
                    <TableCell className="font-bold">₹4,08,000</TableCell>
                    <TableCell>₹1,08,000</TableCell>
                    <TableCell>36%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">10</TableCell>
                    <TableCell>₹6,00,000</TableCell>
                    <TableCell className="font-bold">₹11,50,000</TableCell>
                    <TableCell>₹5,50,000</TableCell>
                    <TableCell>92%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">15</TableCell>
                    <TableCell>₹9,00,000</TableCell>
                    <TableCell className="font-bold">₹25,00,000</TableCell>
                    <TableCell>₹16,00,000</TableCell>
                    <TableCell>178%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">20</TableCell>
                    <TableCell>₹12,00,000</TableCell>
                    <TableCell className="font-bold text-blue-700">
                      ₹49,50,000
                    </TableCell>
                    <TableCell>₹37,50,000</TableCell>
                    <TableCell>313%</TableCell>
                  </TableRow>
                  <TableRow className="bg-green-50">
                    <TableCell className="font-bold">30</TableCell>
                    <TableCell className="font-bold">₹18,00,000</TableCell>
                    <TableCell className="font-bold text-green-700 text-lg">
                      ₹1,76,00,000
                    </TableCell>
                    <TableCell className="font-bold text-green-700">
                      ₹1,58,00,000
                    </TableCell>
                    <TableCell className="font-bold">878%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* ₹10,000 SIP */}
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-slate-600" /> ₹10,000
                Monthly SIP @ 12%
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Ideal for mid-career professionals
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Years</TableHead>
                    <TableHead>Invested</TableHead>
                    <TableHead>Maturity Value</TableHead>
                    <TableHead>Wealth Gain</TableHead>
                    <TableHead>Returns %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">5</TableCell>
                    <TableCell>₹6,00,000</TableCell>
                    <TableCell className="font-bold">₹8,16,000</TableCell>
                    <TableCell>₹2,16,000</TableCell>
                    <TableCell>36%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">10</TableCell>
                    <TableCell>₹12,00,000</TableCell>
                    <TableCell className="font-bold">₹23,00,000</TableCell>
                    <TableCell>₹11,00,000</TableCell>
                    <TableCell>92%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">15</TableCell>
                    <TableCell>₹18,00,000</TableCell>
                    <TableCell className="font-bold">₹50,00,000</TableCell>
                    <TableCell>₹32,00,000</TableCell>
                    <TableCell>178%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">20</TableCell>
                    <TableCell>₹24,00,000</TableCell>
                    <TableCell className="font-bold text-blue-700">
                      ₹99,00,000
                    </TableCell>
                    <TableCell>₹75,00,000</TableCell>
                    <TableCell>313%</TableCell>
                  </TableRow>
                  <TableRow className="bg-green-50">
                    <TableCell className="font-bold">30</TableCell>
                    <TableCell className="font-bold">₹36,00,000</TableCell>
                    <TableCell className="font-bold text-green-700 text-lg">
                      ₹3,53,00,000
                    </TableCell>
                    <TableCell className="font-bold text-green-700">
                      ₹3,17,00,000
                    </TableCell>
                    <TableCell className="font-bold">881%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* ₹25,000 SIP */}
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-slate-600" /> ₹25,000
                Monthly SIP @ 12%
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                For senior professionals & serious wealth builders
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Years</TableHead>
                    <TableHead>Invested</TableHead>
                    <TableHead>Maturity Value</TableHead>
                    <TableHead>Wealth Gain</TableHead>
                    <TableHead>Returns %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">10</TableCell>
                    <TableCell>₹30,00,000</TableCell>
                    <TableCell className="font-bold">₹57,50,000</TableCell>
                    <TableCell>₹27,50,000</TableCell>
                    <TableCell>92%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">15</TableCell>
                    <TableCell>₹45,00,000</TableCell>
                    <TableCell className="font-bold">₹1,25,00,000</TableCell>
                    <TableCell>₹80,00,000</TableCell>
                    <TableCell>178%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">20</TableCell>
                    <TableCell>₹60,00,000</TableCell>
                    <TableCell className="font-bold text-blue-700">
                      ₹2,47,50,000
                    </TableCell>
                    <TableCell>₹1,87,50,000</TableCell>
                    <TableCell>313%</TableCell>
                  </TableRow>
                  <TableRow className="bg-green-50">
                    <TableCell className="font-bold">25</TableCell>
                    <TableCell className="font-bold">₹75,00,000</TableCell>
                    <TableCell className="font-bold text-green-700 text-lg">
                      ₹4,72,50,000
                    </TableCell>
                    <TableCell className="font-bold text-green-700">
                      ₹3,97,50,000
                    </TableCell>
                    <TableCell className="font-bold">530%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <div className="mt-6 bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
            <span>
              <strong>Important Disclaimer:</strong> These projections assume
              consistent 12% CAGR based on historical equity fund performance
              (2006-2026). Actual returns may vary based on market conditions,
              fund selection, and economic cycles. Mutual fund investments are
              subject to market risk. Past performance is not indicative of
              future returns.
            </span>
          </p>
        </div>

        <div className="mt-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-700 mb-3 flex items-start gap-2">
            <Calculator className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
            <span>
              <strong>Want personalized calculations?</strong> Use our SIP
              calculator to see projections for your specific investment amount,
              time horizon, and expected returns.
            </span>
          </p>
          <Link
            href="/sip-calculator/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm shadow-sm"
          >
            <Calculator className="h-4 w-4" />
            Try SIP Calculator Now
          </Link>
        </div>
      </section>

      {/* 💰 AD SLOT 6 - After Returns section */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-6" type="leaderboard" />
      </div>

      {/* --- SECTION 7: TAX RULES 2026 --- */}
      <section id="tax-rules" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-teal-600" /> SIP Tax Rules 2026:
          Complete Taxation Guide
        </h2>
        <p className="mb-6 text-slate-700">
          Understanding SIP taxation is crucial for maximizing your post-tax
          returns. Tax treatment differs based on fund type (equity vs debt) and
          holding period. Here&apos;s everything you need to know.
        </p>

        {/* IMAGE: Tax Rules */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/sip/sip-taxation-rules-2025.webp"
            alt="Infographic explaining SIP taxation rules for equity and debt mutual funds in India showing LTCG, STCG rates and exemption limits for 2026"
            loading="lazy"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        {/* Equity vs Debt Taxation */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-teal-200 bg-teal-50/30 shadow-sm">
            <CardHeader className="pb-3 border-b border-teal-200">
              <CardTitle className="text-teal-800 text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Equity Funds ({'>'}65%
                Equity)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-teal-200">
                  <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-600" /> Short-Term
                    Capital Gains (STCG)
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong>Holding Period:</strong> Less than 12 months
                    </li>
                    <li>
                      <strong>Tax Rate:</strong>{' '}
                      <span className="text-red-600 font-bold">20%</span> on
                      gains
                    </li>
                    <li>
                      <strong>No Exemption Limit</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-teal-200">
                  <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <History className="h-4 w-4 text-slate-600" /> Long-Term
                    Capital Gains (LTCG)
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong>Holding Period:</strong> More than 12 months
                    </li>
                    <li>
                      <strong>Tax Rate:</strong>{' '}
                      <span className="text-blue-600 font-bold">12.5%</span> on
                      gains
                    </li>
                    <li>
                      <strong>Exemption:</strong> First ₹1.25 lakh gains per
                      year tax-free
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-teal-50 p-3 rounded-lg border border-teal-200">
                <p className="text-xs text-teal-900">
                  <strong>Example:</strong> You sell equity SIP units after 2
                  years with ₹2L profit. Tax = (₹2L - ₹1.25L) × 12.5% ={' '}
                  <strong>₹9,375</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-300 bg-slate-50/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-300">
              <CardTitle className="text-slate-800 text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" /> Debt Funds ({'<'}65% Equity)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-300">
                  <p className="font-bold text-slate-900 mb-2">
                    Taxation (All Durations)
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong>Tax Treatment:</strong> Gains added to your total
                      income
                    </li>
                    <li>
                      <strong>Tax Rate:</strong> As per your{' '}
                      <span className="font-bold">Income Tax Slab</span>
                    </li>
                    <li>
                      <strong>No LTCG/STCG Benefits</strong> (from April 2023)
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Tax Slab Rates (2026)
                  </p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    <li>• Up to ₹3L: Nil (New regime)</li>
                    <li>• ₹3-7L: 5%</li>
                    <li>• ₹7-10L: 10%</li>
                    <li>• ₹10-12L: 15%</li>
                    <li>• ₹12-15L: 20%</li>
                    <li>• Above ₹15L: 30%</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-slate-100 p-3 rounded-lg border border-slate-300">
                <p className="text-xs text-slate-700">
                  <strong>Example:</strong> If you&apos;re in 30% tax bracket
                  and earn ₹1L from debt funds, tax = ₹1L × 30% ={' '}
                  <strong>₹30,000</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FIFO Rule & ELSS */}
        <Card className="border border-slate-200 shadow-sm mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-slate-600" /> FIFO Rule &
              Special Cases
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <History className="h-4 w-4 text-blue-600" /> FIFO Method (First
                In, First Out)
              </h4>
              <p className="text-sm text-slate-700 mb-3">
                Each SIP installment is treated as a separate investment. When
                you redeem units, the first units you purchased are considered
                sold first for tax calculation purposes.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 font-semibold mb-2">
                  Example: How FIFO Works
                </p>
                <div className="text-xs text-slate-700 space-y-1">
                  <p>• Jan 2024: Invested ₹10K (Installment 1) → NAV ₹100</p>
                  <p>• Feb 2024: Invested ₹10K (Installment 2) → NAV ₹110</p>
                  <p>• Mar 2024: Invested ₹10K (Installment 3) → NAV ₹120</p>
                  <p className="pt-2 font-semibold">
                    When you redeem in Feb 2025:
                  </p>
                  <p>
                    → Jan installment qualifies for LTCG ({'>'}12 months) @
                    12.5%
                  </p>
                  <p>→ Feb & Mar installments = STCG ({'<'}12 months) @ 20%</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" /> ELSS (Equity
                Linked Savings Scheme)
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-900 mb-2">
                    Tax Benefits
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>
                      • <strong>Section 80C Deduction:</strong> Up to ₹1.5
                      lakh/year
                    </li>
                    <li>• Reduces taxable income (saves 30% tax = ₹46,500)</li>
                    <li>• Available in both old & new tax regimes</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="font-semibold text-amber-900 mb-2">
                    Lock-in & Exit Tax
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>
                      • <strong>3-year lock-in</strong> per installment
                    </li>
                    <li>• After 3 years: LTCG rules apply (12.5%)</li>
                    <li>• ₹1.25L exemption available on gains</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Saving Strategies */}
        <Card className="border-2 border-blue-200 bg-blue-50/30 shadow-sm">
          <CardHeader className="border-b border-blue-200">
            <CardTitle className="text-blue-900 text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" /> Tax Optimization
              Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="font-bold text-slate-900 mb-2">
                  1. Hold for 12+ Months
                </p>
                <p className="text-xs text-slate-700">
                  Wait at least 12 months to qualify for LTCG (12.5% vs 20%).
                  This alone saves 7.5% tax on your profits.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="font-bold text-slate-900 mb-2">
                  2. Utilize ₹1.25L Exemption
                </p>
                <p className="text-xs text-slate-700">
                  Plan redemptions to keep annual LTCG under ₹1.25L threshold.
                  Spread large redemptions across years if possible.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="font-bold text-slate-900 mb-2">
                  3. Tax Loss Harvesting
                </p>
                <p className="text-xs text-slate-700">
                  Sell loss-making investments before March 31 to offset gains
                  and reduce tax liability. Reinvest immediately if needed.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="font-bold text-slate-900 mb-2">
                  4. ELSS for 80C Benefits
                </p>
                <p className="text-xs text-slate-700">
                  Maximize ₹1.5L ELSS investment for upfront tax deduction.
                  Better than PPF/FD as it offers equity returns + tax savings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 8: FUND SELECTION (NEW) --- */}
      <section id="fund-selection" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="h-6 w-6 text-purple-600" /> Choosing the Right SIP
          Funds
        </h2>
        <p className="mb-6 text-slate-700">
          With 1,500+ mutual fund schemes in India, choosing the right funds is
          crucial. Here&apos;s a simple framework to build your SIP portfolio
          based on risk appetite and goals.
        </p>

        {/* Fund Categories */}
        <div className="space-y-4 mb-6">
          <Card className="border-blue-200 bg-blue-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Index Funds (Low Risk)
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Passively tracks market indices like Nifty 50 or Sensex.
                    Lowest expense ratio (0.1-0.5%), guaranteed market returns.
                    Perfect for beginners.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-2 rounded border border-blue-200">
                      <strong>Expected Return:</strong> 10-12%
                    </div>
                    <div className="bg-white p-2 rounded border border-blue-200">
                      <strong>Risk:</strong> Low to Medium
                    </div>
                    <div className="bg-white p-2 rounded border border-blue-200">
                      <strong>Best For:</strong> Long-term (10+ years)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Large Cap Funds (Low-Medium Risk)
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Invests in top 100 companies by market cap (TCS, Reliance,
                    HDFC Bank). Stable, less volatile. Good for conservative
                    investors.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-2 rounded border border-green-200">
                      <strong>Expected Return:</strong> 10-13%
                    </div>
                    <div className="bg-white p-2 rounded border border-green-200">
                      <strong>Risk:</strong> Low to Medium
                    </div>
                    <div className="bg-white p-2 rounded border border-green-200">
                      <strong>Best For:</strong> 5-7 years
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Scale className="h-6 w-6 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Flexi Cap / Multi Cap Funds (Medium Risk)
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Invests across all market caps dynamically based on
                    opportunities. Best all-weather funds. Recommended for most
                    investors.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-2 rounded border border-indigo-200">
                      <strong>Expected Return:</strong> 12-15%
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-200">
                      <strong>Risk:</strong> Medium
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-200">
                      <strong>Best For:</strong> 7-10 years
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Mid Cap Funds (Medium-High Risk)
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Invests in companies ranked 101-250 by market cap. Higher
                    growth potential but volatile. Only for risk-tolerant
                    investors.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-2 rounded border border-amber-200">
                      <strong>Expected Return:</strong> 14-17%
                    </div>
                    <div className="bg-white p-2 rounded border border-amber-200">
                      <strong>Risk:</strong> Medium to High
                    </div>
                    <div className="bg-white p-2 rounded border border-amber-200">
                      <strong>Best For:</strong> 7-10 years
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Small Cap Funds (High Risk)
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Invests in companies ranked 251+ by market cap. Highest
                    return potential but extreme volatility. Can fall 40-50% in
                    bear markets.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-2 rounded border border-red-200">
                      <strong>Expected Return:</strong> 15-20%
                    </div>
                    <div className="bg-white p-2 rounded border border-red-200">
                      <strong>Risk:</strong> Very High
                    </div>
                    <div className="bg-white p-2 rounded border border-red-200">
                      <strong>Best For:</strong> 10-15 years
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Portfolios */}
        <Card className="border-2 border-purple-200 bg-purple-50/30 shadow-sm">
          <CardHeader className="border-b border-purple-200">
            <CardTitle className="text-purple-900 text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" /> Sample SIP
              Portfolios by Risk Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Conservative */}
              <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-green-800 mb-3 text-center">
                  Conservative (Age 45+)
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b pb-1">
                    <span>Index Fund (Nifty 50)</span>
                    <strong>50%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Large Cap Fund</span>
                    <strong>20%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Debt Fund</span>
                    <strong>25%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Gold ETF</span>
                    <strong>5%</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 italic">
                  Capital preservation focus
                </p>
              </div>

              {/* Moderate */}
              <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 text-center">
                  Moderate (Age 30-45)
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b pb-1">
                    <span>Flexi Cap Fund</span>
                    <strong>35%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Index Fund (Nifty 50)</span>
                    <strong>25%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Mid Cap Fund</span>
                    <strong>20%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Debt Fund</span>
                    <strong>15%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Gold ETF</span>
                    <strong>5%</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 italic">
                  Balanced growth approach
                </p>
              </div>

              {/* Aggressive */}
              <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                <h4 className="font-bold text-red-800 mb-3 text-center">
                  Aggressive (Age 20-30)
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b pb-1">
                    <span>Flexi Cap Fund</span>
                    <strong>30%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Mid Cap Fund</span>
                    <strong>30%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Small Cap Fund</span>
                    <strong>25%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Index Fund</span>
                    <strong>10%</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Liquid Fund</span>
                    <strong>5%</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 italic">
                  Maximum growth potential
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" /> Fund Selection
            Checklist
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>Check 5-year & 10-year returns (not just 1-year)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>Prefer Direct plans (0.5-1% lower expense ratio)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  Look for consistent performance, not highest returns
                </span>
              </li>
            </ul>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>Avoid funds with AUM less than ₹500 crore</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  Don&apos;t over-diversify: 3-5 funds maximum is enough
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  Choose funds with stable fund manager tenure (3+ years)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 7 - After Fund Selection */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-7" type="leaderboard" />
      </div>

      {/* --- SECTION 9: MARKET CRASH STRATEGY --- */}
      <section id="market-crash" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingDown className="h-6 w-6 text-red-500" /> SIP During Market
          Crash: Your Winning Strategy
        </h2>

        <p className="mb-6 text-slate-700">
          Market crashes are <strong>wealth-creation opportunities</strong> for
          SIP investors, not disasters. Historical data proves that those who
          continue or increase SIPs during falls earn significantly higher
          returns.
        </p>

        {/* Historical Evidence */}
        <Card className="border border-slate-200 shadow-sm mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
              <History className="h-5 w-5 text-slate-600" /> Historical
              Evidence: 2008 Financial Crisis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-700 mb-4">
              Case Study: ₹10,000 monthly SIP in Sensex Index Fund from Jan 2008
              to Dec 2013 (6 years). Market crashed 60% in 2008.
            </p>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Strategy
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Units Accumulated
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Portfolio Value (Jan 2014)
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      CAGR
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong className="text-red-600">Paused SIP</strong>{' '}
                      during crash (panic)
                    </TableCell>
                    <TableCell>615 units</TableCell>
                    <TableCell>₹12.92 Lakh</TableCell>
                    <TableCell>7.8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong className="text-blue-600">Continued SIP</strong>{' '}
                      (disciplined)
                    </TableCell>
                    <TableCell>895 units</TableCell>
                    <TableCell>₹18.80 Lakh</TableCell>
                    <TableCell>16.2%</TableCell>
                  </TableRow>
                  <TableRow className="bg-green-50">
                    <TableCell>
                      <strong className="text-green-700">Doubled SIP</strong>{' '}
                      during crash (smart)
                    </TableCell>
                    <TableCell className="font-bold">1,240 units</TableCell>
                    <TableCell className="font-bold text-green-700 text-lg">
                      ₹26.04 Lakh
                    </TableCell>
                    <TableCell className="font-bold text-green-700">
                      23.1%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <p className="text-sm text-green-900 font-semibold">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                Result: Doubling SIP during crash created{' '}
                <strong>2x more wealth</strong> (₹26L vs ₹13L) compared to panic
                selling!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* COVID-19 Crash */}
        <Card className="border border-slate-200 shadow-sm mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" /> COVID-19
              Crash (March 2020)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">What Happened</h4>
                <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                  <li>Sensex fell from 42,000 to 25,000 (-40%) in 1 month</li>
                  <li>
                    Mid-cap & small-cap funds fell 50-60% by March 23, 2020
                  </li>
                  <li>
                    Panic redemptions: ₹87,000 Cr pulled out in March-April 2020
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">
                  SIP Investors Who Stayed
                </h4>
                <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                  <li>Bought units at 40-50% discount during March-May 2020</li>
                  <li>
                    By Dec 2020, portfolios recovered 100% + 15% extra gain
                  </li>
                  <li>
                    By Dec 2021, those SIPs had generated 80-120% returns from
                    March 2020 lows
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Lesson:</strong> SIP investors who continued during the
                COVID crash earned their{' '}
                <strong>entire year&apos;s salary</strong> worth of returns in
                just 18 months!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Golden Rules */}
        <Card className="bg-red-50 border-2 border-red-200 shadow-sm">
          <CardHeader className="border-b border-red-200">
            <CardTitle className="text-red-900 text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> 3 Golden Rules for Market
              Crashes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <h4 className="font-bold text-red-900 mb-2 text-lg flex items-center gap-2">
                  <span className="bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  NEVER Stop Your SIP
                </h4>
                <p className="text-sm text-slate-700 pl-9">
                  Crashes last 6-18 months on average. Stopping means you miss
                  buying at rock-bottom prices. This is the #1 mistake that
                  destroys wealth. Markets <strong>always recover</strong>—all
                  15 major crashes in Indian history recovered within 3 years.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-amber-300">
                <h4 className="font-bold text-amber-900 mb-2 text-lg flex items-center gap-2">
                  <span className="bg-amber-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  Top-Up SIP if You Have Spare Cash
                </h4>
                <p className="text-sm text-slate-700 pl-9">
                  If market falls 20%+, deploy bonus/emergency savings to double
                  your SIP temporarily for 3-6 months. This accelerates unit
                  accumulation at discounted prices. Target: buy{' '}
                  <strong>50-100% extra units</strong> during the crash bottom.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <h4 className="font-bold text-green-900 mb-2 text-lg flex items-center gap-2">
                  <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                    3
                  </span>
                  Don&apos;t Try to Time the Bottom
                </h4>
                <p className="text-sm text-slate-700 pl-9">
                  Nobody knows the exact bottom. Trying to wait for it means you
                  miss the initial recovery rally (which is the fastest). Just
                  keep buying systematically. SIP automatically averages your
                  cost.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" /> Mindset Shift
            Required
          </h4>
          <p className="text-sm text-slate-700 mb-3">
            Train yourself to think:{' '}
            <strong>&quot;Market crash = Shopping sale&quot;</strong> instead of
            &quot;Market crash = Panic & sell.&quot;
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200 text-sm text-slate-700">
            <p className="mb-2">
              <strong className="text-green-700">Good Investors:</strong> Buy
              more when everyone is selling
            </p>
            <p>
              <strong className="text-red-700">Poor Investors:</strong> Sell
              when everyone is panicking
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 10: DURATION GUIDE --- */}
      <section id="duration" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <History className="h-6 w-6 text-slate-600" /> Minimum Investment
          Duration by Fund Type
        </h2>
        <p className="mb-6 text-slate-700">
          Equity investments need time to stabilize volatility and compound
          returns. Redeeming too early defeats the purpose of SIP. Follow these
          minimum holding periods based on fund category.
        </p>

        <Card className="border border-slate-200 shadow-sm mb-6">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Fund Category
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Minimum Duration
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Ideal Duration
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Reason
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Large Cap / Index
                    </TableCell>
                    <TableCell className="font-bold text-blue-600">
                      5-7 Years
                    </TableCell>
                    <TableCell>10+ Years</TableCell>
                    <TableCell className="text-sm">
                      Lower volatility, stable compounding
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Flexi Cap / Multi Cap
                    </TableCell>
                    <TableCell className="font-bold text-blue-600">
                      7-10 Years
                    </TableCell>
                    <TableCell>12+ Years</TableCell>
                    <TableCell className="text-sm">
                      Balanced across caps, needs full cycle
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mid Cap</TableCell>
                    <TableCell className="font-bold text-amber-600">
                      7-10 Years
                    </TableCell>
                    <TableCell>15+ Years</TableCell>
                    <TableCell className="text-sm">
                      High volatility, exceptional long-term gains
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Small Cap</TableCell>
                    <TableCell className="font-bold text-red-600">
                      10-15 Years
                    </TableCell>
                    <TableCell>20+ Years</TableCell>
                    <TableCell className="text-sm">
                      Extreme swings, massive compounding potential
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ELSS</TableCell>
                    <TableCell className="font-bold text-green-600">
                      3 Years (Lock-in)
                    </TableCell>
                    <TableCell>7-10 Years</TableCell>
                    <TableCell className="text-sm">
                      Mandatory lock-in, tax benefits + equity returns
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Debt Funds</TableCell>
                    <TableCell className="font-bold text-slate-600">
                      3-5 Years
                    </TableCell>
                    <TableCell>5-7 Years</TableCell>
                    <TableCell className="text-sm">
                      Goal-based parking, lower returns
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Historical Returns by Duration */}
        <Card className="border-2 border-blue-200 bg-blue-50/20 shadow-sm">
          <CardHeader className="border-b border-blue-200">
            <CardTitle className="text-blue-900 text-lg">
              Why Duration Matters: Sensex SIP Returns by Holding Period
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-700 mb-4">
              Analysis of Sensex SIP returns across different time horizons
              (1996-2026 data):
            </p>

            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg border-2 border-red-200 text-center">
                <div className="font-bold text-3xl text-red-600 mb-2">
                  1-3 Yr
                </div>
                <p className="text-slate-700 mb-1">-5% to +18% range</p>
                <p className="text-xs text-red-700 font-semibold">
                  Highly Volatile
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-amber-200 text-center">
                <div className="font-bold text-3xl text-amber-600 mb-2">
                  5-7 Yr
                </div>
                <p className="text-slate-700 mb-1">8-14% CAGR</p>
                <p className="text-xs text-amber-700 font-semibold">
                  Moderate Swings
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-green-200 text-center">
                <div className="font-bold text-3xl text-green-600 mb-2">
                  10-15 Yr
                </div>
                <p className="text-slate-700 mb-1">11-14% CAGR</p>
                <p className="text-xs text-green-700 font-semibold">
                  Stable Returns
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-3xl text-blue-600 mb-2">
                  15+ Yr
                </div>
                <p className="text-slate-700 mb-1">12-16% CAGR</p>
                <p className="text-xs text-blue-700 font-semibold">
                  ZERO Negative Cases!
                </p>
              </div>
            </div>

            <div className="mt-4 bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <p className="text-sm text-green-900 font-semibold">
                <CheckCircle2 className="inline h-5 w-5 mr-1" />
                <strong>Critical Insight:</strong> No 15-year SIP in Indian
                equity history has given negative returns. Time eliminates risk!
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 11: COMMON MISTAKES --- */}
      <section id="mistakes" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" /> 10 Common SIP
          Mistakes to Avoid
        </h2>
        <p className="mb-6 text-slate-700">
          Even experienced investors make these mistakes that can cost lakhs in
          lost returns. Avoid these pitfalls to maximize your SIP wealth
          creation.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <Card className="border-red-200 bg-red-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Stopping SIP During Market Falls
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Missing the accumulation phase costs 40-60% extra wealth.
                    Crashes are buying opportunities, not exit signals.
                  </p>
                  <p className="text-xs text-red-700 font-semibold">
                    Lost Wealth: ₹30-50L over 20 years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-700 text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Choosing Dividend Over Growth Option
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Dividends are taxed immediately and kill compounding. Growth
                    option reinvests profits automatically for exponential
                    growth.
                  </p>
                  <p className="text-xs text-orange-700 font-semibold">
                    Lost Wealth: ₹15-25L over 20 years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700 text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Over-Diversification (15+ Funds)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Holding too many funds dilutes returns and creates tracking
                    nightmares. 3-5 well-chosen funds are sufficient for
                    diversification.
                  </p>
                  <p className="text-xs text-amber-700 font-semibold">
                    Impact: Returns diluted by 2-3%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-700 text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Not Increasing SIP with Salary Hikes
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Inflation eats static SIPs. Enable 10% annual step-up or
                    manually increase SIP every year to maintain real purchasing
                    power.
                  </p>
                  <p className="text-xs text-yellow-700 font-semibold">
                    Lost Wealth: ₹40-60L over 25 years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-lime-200 bg-lime-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center font-bold text-lime-700 text-sm">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Chasing Last Year&apos;s Top Performers
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Past returns don&apos;t guarantee future performance. Top
                    performers often underperform in next cycle. Focus on
                    consistent 5-10 year returns.
                  </p>
                  <p className="text-xs text-lime-700 font-semibold">
                    Risk: 5-8% lower returns
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-sm">
                  6
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Redeeming for Small Expenses
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Breaking SIP for phone/vacation defeats compounding. Keep
                    separate emergency fund. Let SIP investments mature for
                    15-20 years.
                  </p>
                  <p className="text-xs text-green-700 font-semibold">
                    Lost Opportunity: ₹20-40L
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 bg-teal-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700 text-sm">
                  7
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Investing Without Clear Goal
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    No goal = no discipline. Define specific goals (retirement,
                    house, child education) with timelines to stay committed
                    during volatility.
                  </p>
                  <p className="text-xs text-teal-700 font-semibold">
                    Risk: Premature exit
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 bg-cyan-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center font-bold text-cyan-700 text-sm">
                  8
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Choosing Regular Plans Over Direct
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Regular plans have 0.5-1% higher expense ratio (commission
                    to distributors). Direct plans save ₹2-3 lakhs over 20 years
                    on ₹10K SIP.
                  </p>
                  <p className="text-xs text-cyan-700 font-semibold">
                    Lost Wealth: ₹2-5L
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm">
                  9
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Ignoring Asset Allocation Rebalancing
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    As you age, shift from equity to debt gradually. 40-year-old
                    shouldn&apos;t have 100% equity. Rebalance annually to
                    reduce risk.
                  </p>
                  <p className="text-xs text-blue-700 font-semibold">
                    Risk: Portfolio crash near retirement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700 text-sm">
                  10
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Starting Too Late (After 35-40)
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Starting at 25 vs 35 creates 3x wealth difference due to
                    compounding. Even small SIPs at young age beat large SIPs
                    started late.
                  </p>
                  <p className="text-xs text-indigo-700 font-semibold">
                    Opportunity Cost: ₹1-2 Cr
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-red-50 p-5 rounded-xl border-2 border-red-200">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Ban className="h-5 w-5 text-red-600" /> The Costliest Mistake
          </h4>
          <p className="text-sm text-slate-700">
            <strong className="text-red-700">Mistake #1</strong> (Stopping SIP
            during crashes) is responsible for 60% of wealth destruction. If you
            remember just ONE thing from this guide, remember:{' '}
            <strong className="text-green-700">
              Continue SIP no matter what the market does.
            </strong>
          </p>
        </div>
      </section>

      {/* 💰 AD SLOT 8 - After Mistakes */}
      <div className="no-print my-10">
        <AdSlot id="guide-sip-8" type="leaderboard" />
      </div>

      {/* --- SECTION 12: MYTHS DEBUNKED --- */}
      <section id="myths" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Ban className="h-6 w-6 text-amber-500" /> SIP Myths Debunked
        </h2>
        <p className="mb-6 text-slate-700">
          These common misconceptions prevent millions from starting their
          wealth creation journey. Let&apos;s bust these myths with facts.
        </p>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-2 text-lg">
                    Myth #1: &quot;SIP Guarantees Returns&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong> SIP
                      is an investment <strong>method</strong>, not a product.
                      Returns depend on underlying mutual fund performance and
                      market conditions. However, historical data shows 15+ year
                      SIPs have never given negative returns in Indian equity
                      markets.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-orange-700 mb-2 text-lg">
                    Myth #2: &quot;I Need Large Amount to Start&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong> You
                      can start with as little as <strong>₹500/month</strong>.
                      Even ₹1,000 monthly SIP for 25 years @ 12% creates ₹1.9
                      crore wealth. Start small, but start NOW.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-700 mb-2 text-lg">
                    Myth #3: &quot;I Can&apos;t Withdraw My Money&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong>{' '}
                      Open-ended mutual funds have <strong>zero lock-in</strong>{' '}
                      (except ELSS with 3-year lock-in). You can redeem
                      partially or fully anytime. Money typically reaches your
                      account in 1-3 working days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-yellow-700 mb-2 text-lg">
                    Myth #4: &quot;Lump Sum is Always Better Than SIP&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong> Lump
                      sum wins only in sustained bull markets. In volatile
                      markets (85% of the time), SIP performs better due to
                      rupee cost averaging. Historical 20-year data: SIP beats
                      lump sum in 65% of scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-lime-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-lime-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lime-700 mb-2 text-lg">
                    Myth #5: &quot;SIP is Only for Young People&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong> While
                      starting early maximizes compounding, even 45-year-olds
                      can benefit. A 10-year SIP can still double your money.
                      Adjust allocation (more debt, less equity) based on age
                      and risk appetite.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-green-700 mb-2 text-lg">
                    Myth #6: &quot;Market Timing is Essential&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong>{' '}
                      SIP&apos;s biggest advantage is eliminating need for
                      market timing. Rupee cost averaging automatically buys low
                      and high. Even expert fund managers fail at timing—SIP
                      removes this risk completely.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-teal-700 mb-2 text-lg">
                    Myth #7: &quot;SIP Works Only in Bull Markets&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong> SIP
                      actually works <strong>better in bear markets</strong>{' '}
                      because you accumulate more units at lower prices. The
                      2008 and 2020 crash SIP investors earned 8-12% extra
                      returns compared to those who started in bull markets.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Ban className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-700 mb-2 text-lg">
                    Myth #8: &ldquo;I Need Expert Knowledge to Start&quot;
                  </h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong className="text-green-700">Reality:</strong>{' '}
                      Starting SIP is simpler than opening a bank account.
                      Choose 2-3 index funds or flexi-cap funds, set auto-debit,
                      and forget for 10 years. No daily tracking needed. Apps
                      like Groww/Zerodha make it a 10-minute process.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 13: FAQs --- */}
      <section id="faqs" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Frequently Asked Questions (FAQs)
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
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict:
            Your SIP Action Plan
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            SIP is India&apos;s most accessible and proven wealth-creation tool.
            The difference between financial freedom and struggle often comes
            down to one decision: <strong>Starting your SIP today</strong>.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">Start</div>
              <p className="text-sm text-slate-300">
                Begin with ₹500-₹5,000 based on income. Don&apos;t wait for
                &quot;perfect timing&quot;—there isn&apos;t one.
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">
                Automate
              </div>
              <p className="text-sm text-slate-300">
                Set auto-debit and forget. Let discipline work silently in
                background for 15-20 years.
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                Step-Up
              </div>
              <p className="text-sm text-slate-300">
                Increase SIP by 10% annually with salary hikes. This alone
                creates 40% extra wealth.
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
                  <strong>Choose Growth option, not Dividend</strong> — Let
                  compounding work its magic
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Hold for minimum 10-15 years</strong> — Time
                  eliminates risk and maximizes returns
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Author Bio */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <div className="prose prose-slate max-w-none">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            About Fincado Research Team
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Our team of financial analysts and certified advisors brings decades
            of combined experience in Indian financial markets. We analyze
            historical data, conduct comprehensive market research, and provide
            evidence-based guidance to help you make informed investment
            decisions. This guide is based on 30 years of Indian equity market
            data (1996-2026) and insights from SEBI-regulated investment
            practices.
          </p>
        </div>

        <div className="mt-6 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-200">
          <strong className="block mb-2 text-slate-700 not-italic">
            Disclaimer:
          </strong>
          <p>
            Mutual Fund investments are subject to market risks. Read all scheme
            related documents carefully before investing. Past performance is
            not indicative of future returns. The views and investment tips
            expressed in this guide are for educational purposes only and should
            not be construed as investment advice. Please consult with a SEBI
            registered investment advisor before making any investment
            decisions. The projections and returns mentioned are based on
            historical data and hypothetical scenarios; actual results may vary
            significantly.
          </p>
        </div>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to Start Your Wealth Journey?
          </h2>
          <p className="mb-8 max-w-2xl text-blue-100 text-lg">
            Use our free SIP calculator to see exactly how much your monthly
            investment can grow. Plan your financial freedom today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg flex items-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculate My SIP Returns
            </Link>
            <Link
              href="/mutual-funds/"
              className="rounded-lg border-2 border-blue-300 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50 flex items-center gap-2"
            >
              <TrendingUp className="h-5 w-5" />
              Explore Top Mutual Funds
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 9 - Final ad at bottom */}
      <div className="no-print mt-8">
        <AdSlot id="guide-sip-9" type="leaderboard" />
      </div>
    </article>
  );
}
