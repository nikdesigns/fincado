import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
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
import { Button } from '@/components/ui/button';
import {
  Calculator,
  TrendingUp,
  Lightbulb,
  FileText,
  Landmark,
  Users,
  ArrowRight,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'New vs Old Tax Regime 2026: Which is Better? (Slabs + Calculator)',
  description:
    'Complete New vs Old Tax Regime comparison for FY 2025-26. See latest slabs, ₹75,000 standard deduction, rebate u/s 87A, breakeven points and use our interactive calculator.',
  alternates: {
    canonical: 'https://fincado.com/guides/new-vs-old-tax-regime-2026/',
  },
  openGraph: {
    title: 'New vs Old Tax Regime 2026: Which Saves You More Tax?',
    description:
      'Budget 2025 made the new regime even more attractive. Check slabs, deductions, rebate limit and breakeven analysis here.',
    url: 'https://fincado.com/guides/new-vs-old-tax-regime-2026/',
    type: 'article',
    images: [
      {
        url: '/images/guides/tax/hero-tax-regime.webp',
        width: 1200,
        height: 630,
        alt: 'New vs Old Tax Regime 2026 Comparison',
      },
    ],
  },
};

export default function TaxRegimeGuide() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'New vs Old Tax Regime',
            url: 'https://fincado.com/guides/new-vs-old-tax-regime-2026/',
          },
        ]}
      />

      {/* Header */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1">
          Tax Planning 2026
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl leading-tight">
          New vs Old Tax Regime 2026: Which is Better for You?
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl">
          Budget 2025 made the New Regime even more attractive. Here is the
          complete comparison with latest slabs, deductions, rebate rules,
          breakeven points and an interactive calculator.
        </p>
      </header>

      {/* Hero Image */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src="/images/guides/tax/hero-tax-regime.webp"
            alt="New vs Old Tax Regime 2026 Comparison"
            fill
            priority
            className="object-cover"
          />
        </div>
      </Card>

      {/* Primary Interactive CTA */}
      <div className="mb-12 bg-linear-to-r from-indigo-50 to-emerald-50 border border-indigo-100 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-semibold text-slate-900 mb-3">
          Not sure which regime saves you more?
        </h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Enter your income and deductions below. Our calculator instantly shows
          tax under both regimes.
        </p>
        <InlineTaxCalculator defaultSalary={1500000} />
      </div>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-top" type="leaderboard" />
      </div>

      {/* Quick Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
              New Tax Regime (Default)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Standard Deduction</span>
              <span className="font-semibold">₹75,000</span>
            </div>
            <div className="flex justify-between">
              <span>Rebate u/s 87A</span>
              <span className="font-semibold text-emerald-600">
                Up to ₹12 Lakh taxable income
              </span>
            </div>
            <div className="flex justify-between">
              <span>Best for</span>
              <span className="font-semibold">Most salaried people</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5" />
              Old Tax Regime
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Standard Deduction</span>
              <span className="font-semibold">₹50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Deductions Available</span>
              <span className="font-semibold">
                80C, HRA, 80D, Home Loan etc.
              </span>
            </div>
            <div className="flex justify-between">
              <span>Best for</span>
              <span className="font-semibold">High deduction claimants</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Regime Tax Slabs */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Calculator className="h-6 w-6 text-indigo-600" />
          New Tax Regime Slabs FY 2025-26
        </h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold">Income Slab</TableHead>
                <TableHead className="font-semibold">Tax Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>₹0 – ₹4 Lakh</TableCell>
                <TableCell className="text-emerald-600 font-medium">
                  Nil
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹4 Lakh – ₹8 Lakh</TableCell>
                <TableCell>5%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹8 Lakh – ₹12 Lakh</TableCell>
                <TableCell>10%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹12 Lakh – ₹16 Lakh</TableCell>
                <TableCell>15%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹16 Lakh – ₹20 Lakh</TableCell>
                <TableCell>20%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹20 Lakh – ₹24 Lakh</TableCell>
                <TableCell>25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Above ₹24 Lakh</TableCell>
                <TableCell className="text-red-600 font-medium">30%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-sm text-emerald-700 font-medium">
          ✅ Effectively zero tax up to ~₹12.75 Lakh gross salary for salaried
          individuals
        </p>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-slabs-bottom" type="box" />
      </div>

      {/* Deductions in Old Regime */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <FileText className="h-6 w-6 text-slate-600" /> Deductions Available
          Only in Old Regime
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                Section 80C
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-2 font-semibold text-emerald-600">
                Max ₹1.5 Lakh
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>EPF, PPF, ELSS</li>
                <li>Life Insurance</li>
                <li>Home Loan Principal</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                Section 80D
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-2 font-semibold text-emerald-600">
                Max ₹25k – ₹1 Lakh
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Health Insurance (Self &amp; Family)</li>
                <li>Parents (Higher limit for seniors)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                HRA + Home Loan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-2 font-semibold text-emerald-600">
                Significant Savings
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>HRA Exemption (Rent paid)</li>
                <li>Home Loan Interest (Sec 24b) – up to ₹2 Lakh</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-mid-banner" type="leaderboard" />
      </div>

      {/* Breakeven Analysis */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-amber-500" /> Breakeven Analysis:
          When to Switch?
        </h2>
        <Card className="border-indigo-100 bg-indigo-50/30">
          <CardContent className="pt-6">
            <p className="text-indigo-900 mb-2">
              You should choose Old Regime only if your total deductions exceed:
            </p>
            <p className="text-4xl font-semibold text-indigo-700 mb-4">
              ₹4.5 – 5 Lakhs
            </p>
            <p className="text-sm text-indigo-800">
              This includes 80C + HRA + Home Loan Interest + 80D + NPS etc. For
              most people, the New Regime is simpler and saves more tax.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-after-breakeven" type="box" />
      </div>

      {/* Real-Life Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" /> Real-Life Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Young Professional (₹12 Lakh)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-700">
                Deductions: ₹1.5 Lakh (80C only)
              </p>
              <div className="flex justify-between mt-4">
                <span>New Regime Tax:</span>
                <span className="font-semibold text-emerald-600">₹0</span>
              </div>
              <div className="flex justify-between">
                <span>Old Regime Tax:</span>
                <span className="font-semibold">₹52,500</span>
              </div>
              <p className="mt-3 text-xs font-medium text-emerald-700">
                Winner: New Regime (Saves ₹52,500)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">
                Mid-Career with Loan (₹18 Lakh)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-700">
                Deductions: ₹4.8 Lakh (HRA + 80C + Home Loan Interest)
              </p>
              <div className="flex justify-between mt-4">
                <span>New Regime Tax:</span>
                <span className="font-semibold">₹1,63,800</span>
              </div>
              <div className="flex justify-between">
                <span>Old Regime Tax:</span>
                <span className="font-semibold text-emerald-600">
                  ₹1,29,400
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-emerald-700">
                Winner: Old Regime (Saves ₹34,400)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-mid-content" type="leaderboard" />
      </div>

      {/* Conclusion */}
      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            For most salaried individuals earning up to ₹15–18 Lakhs, the{' '}
            <strong>New Tax Regime</strong> is the clear winner — simpler and
            saves more tax. Only switch to the Old Regime if you can genuinely
            claim deductions of ₹4.5 Lakh or more.
          </p>
          <Button
            asChild
            className="bg-white text-slate-900 hover:bg-slate-100"
          >
            <Link href="/income-tax-calculator/">
              Calculate Your Exact Tax Now{' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-in-content-rect" type="box" />
      </div>

      {/* FAQS */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {[
            {
              question: 'What is the standard deduction in the new tax regime?',
              answer:
                '₹75,000 for salaried individuals under the New Tax Regime for FY 2025-26.',
            },
            {
              question:
                'Can I switch between old and new tax regimes every year?',
              answer:
                'Yes. Salaried individuals can switch every financial year while filing ITR.',
            },
            {
              question: 'Is HRA exemption available in the new tax regime?',
              answer: 'No. HRA is only available under the Old Tax Regime.',
            },
            {
              question: 'Which regime is better for income above ₹15 lakhs?',
              answer:
                'If your total deductions exceed ₹4.5–5 Lakhs, the Old Regime may be better. Otherwise, stick with the New Regime.',
            },
          ].map((faq, index) => (
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

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="tax-guide-bottom" type="leaderboard" />
      </div>
    </article>
  );
}
