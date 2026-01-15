import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'; // ✅ Added Link
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
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
import { Button } from '@/components/ui/button'; // ✅ Added Button
import {
  Calculator,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  FileText,
  Landmark,
  Scale,
  CheckCircle2,
  Users,
  ArrowRight, // ✅ Added ArrowRight
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'New vs Old Tax Regime 2026: Which is Better? (Calculator & Slabs)',
  description:
    'Compare New vs Old Tax Regime slabs for FY 2025-26. Calculate exemptions, 80C deductions, and breakeven points to save maximum tax.',
  alternates: {
    canonical: 'https://fincado.com/guides/new-vs-old-tax-regime-2025/',
  },
  openGraph: {
    title: 'New vs Old Tax Regime 2026: Which is Better for You?',
    description:
      'Budget 2025 has made the new regime default. Is it better for you? Check tax slabs, deductions, and breakeven analysis here.',
    url: 'https://fincado.com/guides/new-vs-old-tax-regime-2025/',
    type: 'article',
    images: [
      {
        url: '/images/guides/tax/hero-tax-regime.webp',
        width: 1200,
        height: 630,
        alt: 'Comparison of Old vs New Tax Regime 2026',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the standard deduction in the new tax regime?',
    answer:
      'For FY 2025-26, the standard deduction for salaried individuals has been increased to ₹75,000 under the New Tax Regime.',
  },
  {
    question: 'Can I switch between old and new tax regimes every year?',
    answer:
      'Salaried individuals can switch between the two regimes every financial year. However, individuals with business income can only switch once in their lifetime.',
  },
  {
    question: 'Is HRA exemption available in the new tax regime?',
    answer:
      'No, House Rent Allowance (HRA) exemption is NOT available in the New Tax Regime. It is only available under the Old Tax Regime.',
  },
  {
    question: 'Which tax regime is better for income above ₹15 lakhs?',
    answer:
      'If you have deductions (80C, 80D, HRA, Home Loan) exceeding ₹3.75 lakhs to ₹4 lakhs, the Old Regime might save you more tax. Otherwise, the New Regime is generally beneficial due to lower tax rates.',
  },
];

export default function TaxRegimeGuide() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'New vs Old Tax Regime',
            url: 'https://fincado.com/guides/new-vs-old-tax-regime-2025/',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1"
        >
          Tax Planning
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          New vs Old Tax Regime 2026: Which is Better for You?
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          Every year between January and March, millions of Indian taxpayers
          face the same dilemma: should I choose the new tax regime or stick
          with the old one? With Budget 2026 making the new regime even more
          attractive, this decision has become critical.
        </p>
      </header>

      {/* --- HERO IMAGE --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src="/images/guides/tax/hero-tax-regime.webp"
            alt="Old vs New Tax Regime Comparison 2026"
            fill
            priority
            className="object-cover"
          />
        </div>
      </Card>

      {/* ✅ NEW: Primary Call to Action */}
      <div className="mb-10 text-center bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">
          Confused by the slabs?
        </h3>
        <p className="text-slate-600 mb-4 text-sm">
          Don&apos;t calculate manually. Use our automated tool to compare your
          tax under both regimes instantly.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
        >
          <Link href="/income-tax-calculator/">
            {' '}
            {/* Note the trailing slash! */}
            Calculate My Tax Liability <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-top" type="leaderboard" />
      </div>

      {/* --- SECTION 1: UNDERSTANDING REGIMES --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue-600" /> Understanding the Two
            Tax Regimes
          </h2>
          <p className="mb-6 text-slate-700">
            India currently offers taxpayers a choice between two distinct
            income tax structures, each with its own philosophy and benefits.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Landmark className="h-4 w-4 text-slate-500" /> Old Tax Regime
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Traditional structure focusing on tax-saving investments.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Multiple deductions (80C, 80D, HRA).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Higher tax rates on lower slabs.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Requires documentation proofs.</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" /> New Tax
                Regime (Default)
              </h3>
              <p className="text-sm text-emerald-800 mb-3">
                Simplified structure with lower tax rates.
              </p>
              <ul className="space-y-2 text-sm text-emerald-900">
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Lower tax rates across slabs.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Minimal deductions (Standard Ded. only).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Paperless & hassle-free.</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 2: TAX SLABS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-indigo-600" /> Income Tax Slabs
          2025-26
        </h2>
        <p className="mb-6 text-slate-700">
          Understanding the exact tax slabs is crucial. Here is the breakdown
          for the <strong>New Regime</strong> (FY 2025-26).
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Income Slab
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Tax Rate
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Calculation
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Up to ₹4,00,000</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  NIL
                </TableCell>
                <TableCell>No tax</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹4L to ₹8L</TableCell>
                <TableCell>5%</TableCell>
                <TableCell>5% on income &gt; ₹4L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹8L to ₹12L</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>₹20k + 10% on income &gt; ₹8L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹12L to ₹16L</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>₹60k + 15% on income &gt; ₹12L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹16L to ₹20L</TableCell>
                <TableCell>20%</TableCell>
                <TableCell>₹1.2L + 20% on income &gt; ₹16L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹20L to ₹24L</TableCell>
                <TableCell>25%</TableCell>
                <TableCell>₹2L + 25% on income &gt; ₹20L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Above ₹24L</TableCell>
                <TableCell className="text-red-600 font-bold">30%</TableCell>
                <TableCell>₹3L + 30% on income &gt; ₹24L</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" /> Important Benefits (New Regime):
          </h4>
          <ul className="list-disc pl-5 text-sm text-indigo-800 space-y-1">
            <li>
              <strong>Standard Deduction:</strong> ₹75,000 for salaried.
            </li>
            <li>
              <strong>Tax Rebate (87A):</strong> Income up to ₹12 Lakh is
              effectively tax-free due to rebate limit adjustments.
            </li>
            <li>
              <strong>Effectively Tax-Free:</strong> Up to{' '}
              <strong>₹12.75 Lakh</strong> for salaried individuals.
            </li>
          </ul>
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-slabs-bottom" type="box" />
      </div>

      {/* --- SECTION 3: DEDUCTIONS (OLD REGIME) --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <FileText className="h-6 w-6 text-slate-600" /> Deductions in Old Tax
          Regime
        </h2>
        <p className="mb-6 text-slate-700">
          The old regime&lsquo;s biggest advantage is the extensive list of
          deductions available.
        </p>

        {/* IMAGE: Deductions */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/tax-benefits-80c-24b.webp"
            alt="Tax Deductions under Section 80C and 24b"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                Section 80C
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-2 font-bold text-emerald-600">Max ₹1.5 Lakh</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <Link
                    href="/epf-calculator/"
                    className="text-blue-600 hover:underline"
                  >
                    EPF
                  </Link>{' '}
                  &
                  <Link
                    href="/ppf-calculator/"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    PPF
                  </Link>
                </li>
                <li>
                  <Link
                    href="/elss-calculator/"
                    className="text-blue-600 hover:underline"
                  >
                    ELSS Mutual Funds
                  </Link>
                </li>
                <li>Life Insurance</li>
                <li>Home Loan Principal</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                Section 80D
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-2 font-bold text-emerald-600">Max ₹25k - ₹1L</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Self & Family</li>
                <li>Parents (Senior Citizens get higher limit)</li>
                <li>Preventive Health Checkup</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                HRA & Home Loan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-2 font-bold text-emerald-600">
                Significant Savings
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>HRA (Rent paid)</li>
                <li>
                  <Link
                    href="/loans/home-loan/"
                    className="text-blue-600 hover:underline"
                  >
                    Sec 24(b) Interest
                  </Link>{' '}
                  (Max ₹2L)
                </li>
                <li>Standard Deduction</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-mid-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 4: BREAKEVEN ANALYSIS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-amber-500" /> Breakeven Analysis:
          When to Switch?
        </h2>
        <p className="mb-6 text-slate-700">
          The answer depends on your income level and how many deductions you
          can actually claim.
        </p>

        {/* IMAGE: Breakeven */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/tax/breakeven-chart.webp"
            alt="Tax Regime Breakeven Analysis Chart"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Scenario 1: Low Deduction Users
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 italic">
                Profile: Young professionals, single, living with parents.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Income</TableHead>
                    <TableHead>Old Tax</TableHead>
                    <TableHead>New Tax</TableHead>
                    <TableHead>Winner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹8 Lakh</TableCell>
                    <TableCell>₹45,000</TableCell>
                    <TableCell>NIL</TableCell>
                    <TableCell className="font-bold text-emerald-600">
                      New
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹12 Lakh</TableCell>
                    <TableCell>₹1,22,500</TableCell>
                    <TableCell>NIL</TableCell>
                    <TableCell className="font-bold text-emerald-600">
                      New
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="mt-2 font-medium text-emerald-700">
                Verdict: New Regime is clearly better.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg">
                Scenario 2: Moderate Deduction Users
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 italic">
                Profile: Salaried with home loan, HRA, 80C.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Income</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Old Tax</TableHead>
                    <TableHead>New Tax</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹12 Lakh</TableCell>
                    <TableCell>₹3 Lakh</TableCell>
                    <TableCell>₹52,500</TableCell>
                    <TableCell>NIL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹15 Lakh</TableCell>
                    <TableCell>₹3 Lakh</TableCell>
                    <TableCell>₹1,02,500</TableCell>
                    <TableCell>₹75,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="mt-2 font-medium text-amber-700">
                Verdict: Marginal difference. New Regime often wins unless
                deductions are huge (&gt;₹3.75L).
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-after-breakeven" type="box" />
      </div>

      {/* --- SECTION 5: REAL LIFE EXAMPLES --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" /> Real-Life Examples
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">
                Fresh Graduate (₹8 Lakh)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Old Regime Tax:</span> <span>₹38,000</span>
                </li>
                <li className="flex justify-between">
                  <span>New Regime Tax:</span> <span>NIL</span>
                </li>
                <li className="pt-2 border-t border-slate-200 font-bold text-emerald-600">
                  Winner: New Regime (Saves ₹38k)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">
                Mid-Career (₹18 Lakh)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="text-xs text-slate-500 mb-2">
                Assuming HRA, Home Loan Interest, and 80C claimed.
              </p>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Old Regime Tax:</span> <span>₹1,29,400</span>
                </li>
                <li className="flex justify-between">
                  <span>New Regime Tax:</span> <span>₹1,45,000</span>
                </li>
                <li className="pt-2 border-t border-slate-200 font-bold text-emerald-600">
                  Winner: Old Regime (Saves ₹15.6k)
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-mid-content" type="leaderboard" />
      </div>

      {/* --- SECTION 6: HOW TO SWITCH --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-purple-600" /> How to Switch
          Regimes
        </h2>
        <Card className="border-purple-100 bg-purple-50/30">
          <CardContent className="pt-6">
            <ul className="space-y-4 text-slate-700 text-sm">
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                <div>
                  <strong>Default Regime:</strong> New Regime is now the
                  default. You must actively opt for Old Regime if you want it.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                <div>
                  <strong>For Salaried:</strong> Declare choice to employer at
                  start of FY. Can switch annually.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                <div>
                  <strong>For Business Income:</strong> Can switch to Old Regime
                  once, but moving back to New Regime is a one-time option
                  (lifetime).
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-in-content-rect" type="box" />
      </div>

      {/* --- SECTION 7: MISTAKES --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" /> Common Mistakes
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">
                Ignoring Future Goals
              </strong>
              <p className="text-sm text-slate-600">
                New regime doesn&apos;t force investment. Don&apos;t stop
                <Link
                  href="/sip-calculator/"
                  className="text-red-700 hover:underline font-medium mx-1"
                >
                  saving for goals (SIPs)
                </Link>
                just because there&apos;s no tax benefit.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">TDS Mismatch</strong>
              <p className="text-sm text-slate-600">
                Ensure employer deducts TDS based on your chosen regime to avoid
                large tax payable at filing time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-bottom" type="leaderboard" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion: Make
            an Informed Choice
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            There&apos;s no universal answer—it depends entirely on your income
            level, actual deductions, life stage, and financial goals.
          </p>
          <ul className="space-y-3 mb-6 text-slate-300 text-sm">
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>New regime is default;</strong> actively choose old if
                you need it.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Up to ₹12.75 lakh</strong> is effectively tax-free under
                new regime for salaried.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Old regime</strong> wins at ₹15 lakh+ income if you have
                substantial loans and investments.
              </span>
            </li>
          </ul>
          <p className="text-slate-400 text-sm italic">
            Take control of your tax planning today—the choice you make can save
            you lakhs over time.
          </p>
        </CardContent>
      </Card>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Frequently Asked Questions
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
    </article>
  );
}
