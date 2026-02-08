import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'; // ✅ Added Link
import React from 'react';
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
  TrendingUp,
  Clock,
  CheckCircle2,
  Lock,
  BarChart3,
  PieChart,
  AlertTriangle,
  FileText,
  Lightbulb,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'ELSS Funds Guide 2026: Save Tax & Build Wealth (3-Year Lock-in)',
  description:
    'Complete guide to ELSS Mutual Funds. Learn about 3-year lock-in, Section 80C tax benefits, historical returns, and comparison with PPF/FD.',
  keywords: [
    'ELSS Funds 2026',
    'Equity Linked Savings Scheme',
    'ELSS vs PPF',
    'Tax Saving Mutual Funds',
    'Section 80C Investment',
    'ELSS Lock-in period',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/elss-funds-guide-2025/',
  },
  openGraph: {
    title: 'ELSS Funds Guide 2026: Save Tax & Build Wealth',
    description:
      'Why settle for 7% returns? Save tax and aim for 12-15% returns with ELSS. Complete guide inside.',
    type: 'article',
    url: 'https://fincado.com/guides/elss-funds-guide-2025/',
    images: [
      {
        url: '/images/guides/elss/elss-guide-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can I invest more than ₹1.5 lakh in ELSS?',
    answer:
      'Yes, you can invest any amount. However, only ₹1,50,000 qualifies for tax deduction under Section 80C. Excess amount continues to grow but without tax benefit.',
  },
  {
    question: "What happens if I don't redeem after 3 years?",
    answer:
      'Nothing negative. Your investment continues to grow. You can redeem anytime after 3 years whenever you need – there is no compulsion to withdraw.',
  },
  {
    question: 'Can I switch ELSS funds during lock-in?',
    answer:
      'No. Switching is treated as redemption and purchase. Since redemption is not allowed during the 3-year lock-in, you cannot switch funds.',
  },
  {
    question: 'Is ELSS better than PPF?',
    answer:
      'ELSS is better for wealth creation (12-15% potential) and liquidity (3 years). PPF is better for safety (Govt backed) and complete tax exemption (EEE), but has a 15-year lock-in.',
  },
  {
    question: 'Do I need to file ITR if I redeem ELSS?',
    answer:
      'You should file ITR if your total income exceeds the basic exemption limit or if your Long Term Capital Gains exceed ₹1.25 Lakh.',
  },
];

export default function ELSSGuide() {
  // --- Article Schema ---
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'ELSS Funds Guide 2026: Save Tax & Build Wealth with 3-Year Lock-in',
    description:
      'Comprehensive guide to ELSS mutual funds, covering tax benefits, lock-in periods, and comparison with PPF/FD.',
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
    datePublished: '2026-01-01',
    dateModified: '2026-01-01',
    image: '/images/guides/elss/elss-guide-hero.webp',
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'ELSS Funds Guide',
            url: 'https://fincado.com/guides/elss-funds-guide-2025/',
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Mutual Funds & Tax Planning
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          ELSS Funds Guide 2026: Save Tax & Build Wealth with 3-Year Lock-in
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jan 2026</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="ELSS Funds Guide 2026" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-emerald-50">
          <Image
            src="/images/guides/elss/elss-hero.webp"
            alt="ELSS Funds: Tax Saving plus Wealth Creation"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
          <p>Equity Linked Savings Scheme (ELSS) has become the go-to tax-saving investment choice for young Indians who want to combine tax benefits with wealth creation potential. Unlike traditional tax-saving options like PPF and fixed deposits, ELSS offers the dual advantage of equity market exposure and the shortest lock-in period of just 3 years.</p>
        `}
          />
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="elss-guide-top" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS ELSS --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="h-6 w-6 text-indigo-600" /> What is Equity
            Linked Savings Scheme (ELSS)?
          </h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            Equity Linked Savings Scheme (ELSS) is a type of mutual fund that
            primarily invests in equity and equity-related instruments while
            offering tax deduction benefits under Section 80C of the Income Tax
            Act. You can calculate your tax benefits using our{' '}
            <Link
              href="/income-tax-calculator/"
              className="text-blue-600 hover:underline font-medium"
            >
              Income Tax Calculator
            </Link>
            .
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-900">
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <strong>Investment Type:</strong> At least 80% in equity.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <strong>Tax Benefits:</strong> Section 80C (Max ₹1.5L).
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <strong>Lock-in:</strong> 3 years (Shortest).
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <strong>Returns:</strong> 12-15% (Historical).
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-900">
                  How ELSS Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 marker:font-bold">
                  <li>
                    <strong>Invest:</strong> Fund manager builds equity
                    portfolio.
                  </li>
                  <li>
                    <strong>Lock:</strong> Money locked for 3 years.
                  </li>
                  <li>
                    <strong>Tax Save:</strong> Claim deduction in ITR.
                  </li>
                  <li>
                    <strong>Grow:</strong> Wealth grows with market.
                  </li>
                  <li>
                    <strong>Redeem:</strong> Sell or hold after 3 years.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="elss-guide-basics-rect" type="box" />
      </div>

      {/* --- SECTION 2: WHY CHOOSE ELSS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Why Choose ELSS
          for Tax Saving?
        </h2>

        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
              <CardTitle className="text-base text-slate-900">
                1. Shortest Lock-in Period
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investment Option</TableHead>
                    <TableHead>Lock-in Period</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-emerald-700">
                      ELSS Mutual Fund
                    </TableCell>
                    <TableCell className="font-bold text-emerald-700">
                      3 years ✅
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>National Savings Certificate (NSC)</TableCell>
                    <TableCell>5 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Link
                        href="/fd-calculator/"
                        className="text-blue-600 hover:underline"
                      >
                        Tax Saver FD
                      </Link>
                    </TableCell>
                    <TableCell>5 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Link
                        href="/ppf-calculator/"
                        className="text-blue-600 hover:underline"
                      >
                        Public Provident Fund (PPF)
                      </Link>
                    </TableCell>
                    <TableCell>15 years</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-900">
                2. Higher Return Potential
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>
                While past performance doesn&apos;t guarantee future returns,
                the equity exposure in ELSS provides growth potential that
                fixed-income instruments cannot match. Historical averages show
                ELSS delivering <strong>12-15%</strong> vs PPF&apos;s 7.1%.
                Check real returns using our{' '}
                <Link
                  href="/inflation-calculator/"
                  className="text-blue-600 hover:underline"
                >
                  Inflation Calculator
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 🖼️ IMAGE 2: COMPOUNDING GRAPH */}
        <div className="my-8 overflow-hidden rounded-xl border border-amber-200 bg-amber-50">
          <div className="relative aspect-video w-full">
            <Image
              src="/images/guides/elss/elss-vs-ppf-growth.webp"
              alt="Graph showing ELSS wealth creation potential vs PPF"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="border-t border-amber-100 bg-amber-100/50 p-3 text-center text-xs font-medium text-amber-900">
            Figure: The power of compounding (Equity vs Fixed Income)
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TAX BENEFITS --- */}
      <Card className="mb-12 border-emerald-200 bg-emerald-50/30 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-emerald-800">
            <FileText className="h-6 w-6" /> Tax Benefits: Section 80C Explained
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Deduction at Investment
            </h3>
            <p className="text-sm text-slate-700">
              Investments up to <strong>₹1,50,000 per financial year</strong>{' '}
              qualify for deduction. This amount is deducted from your gross
              total income before calculating tax.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-emerald-200">
            <strong className="block text-emerald-700 mb-2">
              Example Calculation:
            </strong>
            <p className="text-sm text-slate-600">
              If you are in the 30% tax bracket and invest ₹1,50,000 in ELSS:
              <br />
              Tax Saved = <span className="font-bold">₹46,800</span> (30% of
              ₹1.5L + Cess).
              <br />
              <strong>Effective cost of investment = ~₹1,03,000.</strong>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Tax on Returns (LTCG)
            </h3>
            <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>
                <strong>Long-Term Capital Gains (LTCG):</strong> Gains up to
                ₹1.25 Lakh per year are <strong>Tax-Free</strong>.
              </li>
              <li>
                <strong>Above ₹1.25 Lakh:</strong> Taxed at 10% without
                indexation.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="elss-guide-mid-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 4: COMPARISON TABLE --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
          ELSS vs PPF vs FD: Complete Comparison
        </h2>

        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    Parameter
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    ELSS
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    PPF
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Tax Saver FD
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Returns
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    12-15% (Market)
                  </TableCell>
                  <TableCell>7.1% (Fixed)</TableCell>
                  <TableCell>5.5-7% (Fixed)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Lock-in
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    3 Years ✅
                  </TableCell>
                  <TableCell>15 Years</TableCell>
                  <TableCell>5 Years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Risk
                  </TableCell>
                  <TableCell className="text-amber-600">
                    High (Equity)
                  </TableCell>
                  <TableCell className="text-emerald-600">
                    Zero (Govt)
                  </TableCell>
                  <TableCell>Low (Bank)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Tax Status
                  </TableCell>
                  <TableCell>LTCG &gt; 1.25L Taxed</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    EEE (Tax Free) ✅
                  </TableCell>
                  <TableCell className="text-red-600">
                    Interest Taxable
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Best For
                  </TableCell>
                  <TableCell>Wealth Creation</TableCell>
                  <TableCell>Retirement</TableCell>
                  <TableCell>Capital Safety</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-900 text-sm border border-blue-100">
          <strong>The Balanced Approach:</strong> Many financial planners
          recommend a combination: <strong>40-50% in ELSS</strong> for growth
          and{' '}
          <strong>
            30-40% in{' '}
            <Link
              href="/ppf-calculator/"
              className="text-blue-700 underline hover:text-blue-900"
            >
              PPF
            </Link>
          </strong>{' '}
          for stability.
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="elss-guide-comparison-rect" type="box" />
      </div>

      {/* --- SECTION 5: HISTORICAL RETURNS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-indigo-600" /> Historical Returns &
          Risk
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-200">
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                Category Average CAGR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>3 Years</TableCell>
                    <TableCell className="font-bold text-right">
                      16-20%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5 Years</TableCell>
                    <TableCell className="font-bold text-right">
                      15-19%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10 Years</TableCell>
                    <TableCell className="font-bold text-right">
                      13-16%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Risk Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>
                <strong>Market Risk:</strong> NAV can fall during market
                downturns.
              </p>
              <p>
                <strong>Lock-in Risk:</strong> You cannot access funds for 3
                years.
              </p>
              <p>
                <strong>Manager Risk:</strong> Performance depends on stock
                selection.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="elss-guide-returns-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 6: HOW TO CHOOSE & INVEST --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
          How to Choose & Invest
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Checklist */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Checklist for Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>
                    <strong>Long-Term Track Record:</strong> Look for consistent
                    performance over 5-10 years.
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>
                    <strong>Expense Ratio:</strong> Lower is better. Always
                    choose <strong>Direct Plans</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>
                    <strong>Portfolio Quality:</strong> Ensure diversification
                    across sectors.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* SIP vs Lumpsum */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">SIP vs Lump Sum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded bg-emerald-50 p-3 border border-emerald-100">
                <strong className="text-emerald-800 block mb-1">
                  SIP (Recommended ✅)
                </strong>
                <p className="text-xs text-slate-600">
                  Invest fixed amount monthly. Reduces timing risk via Rupee
                  Cost Averaging. Use our{' '}
                  <Link
                    href="/sip-calculator/"
                    className="text-emerald-700 hover:underline font-bold"
                  >
                    SIP Calculator
                  </Link>{' '}
                  to plan.
                </p>
              </div>
              <div className="rounded bg-slate-50 p-3 border border-slate-100">
                <strong className="text-slate-800 block mb-1">Lump Sum</strong>
                <p className="text-xs text-slate-600">
                  One-time investment. Good if you have bulk cash, but carries
                  high market timing risk.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="elss-guide-strategy-rect" type="box" />
      </div>

      {/* --- SECTION 7: REDEMPTION & MISTAKES --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="h-6 w-6 text-amber-500" /> Redemption & Mistakes
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-3">
                After 3-Year Lock-in
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 marker:font-bold">
                <li>
                  <strong>Full Redemption:</strong> Withdraw everything if you
                  need funds.
                </li>
                <li>
                  <strong>Partial Redemption:</strong> Withdraw only what you
                  need.
                </li>
                <li>
                  <strong>Continue Holding (Best):</strong> Let compounding work
                  for 5-7+ years.
                </li>
              </ol>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Mistakes to Avoid
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
                <li>Investing only for tax saving.</li>
                <li>Waiting until March for lump sum.</li>
                <li>Redeeming immediately after 3 years.</li>
                <li>Chasing last year&apos;s top performer.</li>
                <li>Choosing Regular plans over Direct.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="elss-guide-bottom" type="leaderboard" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="mb-12 bg-slate-900 text-white border-slate-900">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion: Is
            ELSS Right for You?
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            ELSS combines the best of both worlds – tax saving today and wealth
            creation for tomorrow. It is ideal for{' '}
            <strong>young professionals</strong> and investors with a{' '}
            <strong>5+ year horizon</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="bg-slate-800 p-3 rounded border border-slate-700 flex-1">
              <strong className="block text-emerald-400 mb-1">
                Start Early
              </strong>
              Begin monthly SIP in April to avoid stress.
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700 flex-1">
              <strong className="block text-emerald-400 mb-1">
                Think Long Term
              </strong>
              Aim to hold for 7-10 years for best returns.
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700 flex-1">
              <strong className="block text-emerald-400 mb-1">
                Stay Disciplined
              </strong>
              Don&apos;t stop SIPs during market downturns.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- FAQs --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          FAQs: ELSS Mutual Funds
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

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      <div className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100 mb-8">
        <p>
          <strong>Disclaimer:</strong> Mutual Fund investments are subject to
          market risks, read all scheme related documents carefully. The past
          performance of mutual funds is not necessarily indicative of future
          performance. This article is for educational purposes only and does
          not constitute financial advice. Please consult a tax advisor before
          making investment decisions.
        </p>
      </div>
    </article>
  );
}
