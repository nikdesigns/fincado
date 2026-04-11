import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import FAQSchema from '@/components/FAQSchema';
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
import {
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Wallet,
  Calculator,
  ArrowRight,
  Clock,
  PieChart,
  Zap,
  FileText,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  salary: '30 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-30-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-30-lakh-salary-hero.webp',
  standardDeductionNew: 75000,
  standardDeductionOld: 50000,
  rebateLimitNew: 1200000,
  rebateMaxNew: 60000,
};

export const metadata: Metadata = {
  title: 'Tax on ₹30 Lakh Salary (FY 2025-26): New vs Old Regime + In-Hand Pay',
  description:
    'Earning ₹30 Lakhs? New Regime tax is ₹4,75,800 (after ₹75,000 Standard Deduction). Compare with Old Regime (₹7,25,400 without deductions) and see your monthly in-hand salary.',
  keywords: [
    'Tax on 30 lakh salary',
    '30 LPA in hand salary',
    'tax on 30 lakh new regime',
    'section 87a rebate limit 2025-26',
    '30 lakh salary tax calculator',
    'new tax regime 2025-26',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://fincado.com/' }],
  alternates: {
    canonical: `https://fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹30 Lakh Salary: New vs Old Regime (FY 2025-26)',
    description:
      '₹30 Lakhs salary → ₹4,75,800 tax under New Regime. See exact calculation, monthly in-hand pay & break-even point.',
    url: `https://fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax30LakhGuide() {
  const pageTitle =
    'Tax on ₹30 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  const faqData = [
    {
      question: 'How much tax do I pay on 30 LPA salary?',
      answer:
        '₹4,75,800 under the New Tax Regime (FY 2025-26). After ₹75,000 standard deduction, taxable income is ₹29.25 Lakhs. Since this exceeds the ₹12 Lakh rebate limit, you pay full tax with no rebate.',
    },
    {
      question: 'What is the monthly in-hand salary for 30 LPA?',
      answer:
        'With New Regime tax of ₹4,75,800, your monthly in-hand (after PF cap ₹1,800, Professional Tax ₹200) is approximately ₹2,08,350.',
    },
    {
      question: 'Which tax regime is better for 30 Lakh package?',
      answer:
        'The New Tax Regime is generally better unless you have total deductions exceeding ₹8 Lakhs. Most high-income earners find the New Regime more efficient.',
    },
    {
      question: 'Is ₹30 lakh salary considered high income in India?',
      answer:
        'Yes. A ₹30 Lakh salary places you among the top ~1% of income earners in India, making tax efficiency and regime selection especially important.',
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          { name: 'Tax Planning', url: 'https://fincado.com/guides/tax/' },
          {
            name: 'Tax on 30 Lakh Salary',
            url: `https://fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />

      <FAQSchema faqs={faqData} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageTitle,
            image: [CONFIG.heroImage],
            inLanguage: 'en-IN',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://fincado.com/guides/${CONFIG.slug}`,
            },
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              url: 'https://fincado.com/about/',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
          }),
        }}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1"
        >
          Income Tax Guide
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 8 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{CONFIG.year}</strong>
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title={pageTitle} />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src={CONFIG.heroImage}
            alt="30 Lakh Salary Tax Calculation FY 2025-26"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Earning <strong>₹30 Lakhs (30 LPA)</strong> places you in the high-income bracket where tax planning becomes critical. Under the <strong>New Tax Regime (${CONFIG.year})</strong>, your taxable income after the ₹75,000 Standard Deduction is ₹29.25 Lakhs. Since this exceeds the ₹12 Lakh rebate limit, you pay tax of <strong>₹4,75,800</strong> — still significantly lower than the Old Regime.</p>`}
          />
          <Badge className="mt-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Status: High Income Tax Zone (New Regime)
          </Badge>
        </CardContent>
      </Card>

      <Card className="mb-12 bg-lime-50 border-lime-200 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lime-900 text-xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-lime-700" /> Quick Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lime-900">
            <p className="text-lg">
              For a <strong>₹30 Lakh salary</strong>, the{' '}
              <strong>New Tax Regime</strong> is the clear winner. Your total
              tax will be{' '}
              <span className="font-semibold text-xl">₹4,75,800</span>.
            </p>
            <div className="flex items-start gap-2 bg-white/60 p-3 rounded border border-lime-200 text-sm text-red-800">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                <strong>Old Regime Warning:</strong> Without deductions, you
                will pay approx <strong>₹7,25,400</strong> in tax. New Regime
                saves you roughly <strong>₹2.50 Lakhs</strong>.
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border border-lime-100">
              <p className="text-sm font-semibold mb-4 text-center text-slate-700">
                Check Your Specific Case:
              </p>
              <InlineTaxCalculator defaultSalary={3000000} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="tax-30l-1" type="in-article" />
      </div>

      <section className="mb-12">
        <h2
          id="take-home-salary"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-blue-600" /> Monthly In-Hand Breakdown
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  Component
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  New Regime (Recommended)
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Old Regime (No Deductions)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Gross Salary
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ₹2,50,000
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ₹2,50,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Statutory Cap)
                </TableCell>
                <TableCell className="text-red-600">- ₹1,800</TableCell>
                <TableCell className="text-red-600">- ₹1,800</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: Prof Tax
                </TableCell>
                <TableCell className="text-red-600">- ₹200</TableCell>
                <TableCell className="text-red-600">- ₹200</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: TDS (Tax)
                </TableCell>
                <TableCell className="text-red-600 font-semibold">
                  - ₹39,650
                </TableCell>
                <TableCell className="text-red-600 font-semibold">
                  - ₹60,450
                </TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-semibold text-emerald-900 text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-semibold text-emerald-700 text-lg">
                  ₹2,08,350
                </TableCell>
                <TableCell className="font-semibold text-amber-700 text-lg">
                  ₹1,87,550
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic">
          *PF is calculated at the statutory cap of ₹1,800/month (₹21,600/year).
        </p>
      </section>

      <section className="mb-12">
        <h2
          id="salary-flow"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-indigo-600" /> Where Does Your
          ₹30,00,000 Go?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-emerald-600 mb-2 text-lg">
                💰 In Pocket (83.3%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹25.00 L
              </span>
              <p className="text-sm text-slate-600 mt-2">
                Annual take-home pay.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-orange-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-orange-600 mb-2 text-lg">
                🏛️ Income Tax (15.9%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹4.76 L
              </span>
              <p className="text-sm text-slate-600 mt-2">New Regime Tax.</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-blue-600 mb-2 text-lg">
                🏦 Retirals (0.8%)
              </strong>
              <span className="text-3xl font-semibold text-slate-900">
                ₹0.24 L
              </span>
              <p className="text-sm text-slate-600 mt-2">
                Compulsory savings (capped).
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="new-regime"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-purple-600" /> Tax Calculation
          (New Regime – FY 2025-26)
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-700">
              Standard Deduction: <strong>₹75,000</strong>.<br />
              Taxable Income: ₹30,00,000 - ₹75,000 = <strong>₹29,25,000</strong>
              .
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-semibold text-slate-900">
                      Slab
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Rate
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Tax
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>0 - ₹4 Lakhs</TableCell>
                    <TableCell>Nil</TableCell>
                    <TableCell>₹0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹4 Lakhs - ₹8 Lakhs</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>₹20,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹8 Lakhs - ₹12 Lakhs</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>₹40,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹12 Lakhs - ₹16 Lakhs</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>₹60,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹16 Lakhs - ₹20 Lakhs</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>₹80,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹20 Lakhs - ₹24 Lakhs</TableCell>
                    <TableCell>25%</TableCell>
                    <TableCell>₹1,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹24 Lakhs - ₹29.25 Lakhs</TableCell>
                    <TableCell>30%</TableCell>
                    <TableCell>₹5.25 Lakhs × 30% = ₹1,57,500</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold bg-slate-50">
                    <TableCell>Gross Tax</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹4,57,500</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-emerald-600 bg-emerald-50/50">
                    <TableCell>Less: Rebate 87A</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹0 (limit exceeded)</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold text-emerald-800 bg-emerald-100">
                    <TableCell>Net Payable (+4% cess)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹4,75,800</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
              <strong>Note:</strong> Since taxable income (₹29.25L) exceeds ₹12
              Lakhs, you do not get the Section 87A rebate.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2
          id="break-even"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-indigo-600" /> The Break-Even
          Point
        </h2>
        <Card className="border-indigo-100 bg-indigo-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-indigo-900 text-lg">
              When to choose Old Regime?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-indigo-800">
            <p className="mb-2">
              To beat the New Regime tax of ₹4,75,800, you need total deductions
              exceeding:
            </p>
            <p className="text-2xl font-semibold text-indigo-700 mb-2">
              ₹8,00,000
            </p>
            <p>
              This requires: Full 80C (₹1.5L) + 80D (₹25-50k) + NPS (₹50k) +
              substantial HRA or Home Loan Interest (~₹5L+). For most people at
              30 LPA, New Regime remains simpler and better.
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            For a ₹30 Lakh salary, the <strong>New Tax Regime</strong> remains
            the default winner. It keeps your tax liability under ₹6 Lakhs and
            maximizes your monthly cash flow.
          </p>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          Calculations are based on income tax slabs for FY 2025-26 applicable
          to resident individuals below 60 years.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Explore More Tax Guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/guides/tax-on-20-lakh-salary/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹20 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Compare New vs Old regime tax for 20 LPA salary.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Check Now{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guides/tax-on-25-lakh-salary/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹25 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    See tax liability and in-hand pay for 25 LPA.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Read Guide{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guides/new-vs-old-tax-regime-2025/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    New vs Old Regime
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Detailed comparison of FY 2025-26 tax rules.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Learn More{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="faqs" className="mb-6 text-2xl font-semibold text-slate-900">
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
    </article>
  );
}
