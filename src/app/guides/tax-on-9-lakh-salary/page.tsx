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
  Scale,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  salary: '9 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-9-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-9-lakh-salary-hero.webp',
};

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Tax on ₹9 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
  description:
    'Earning ₹9 Lakhs? Calculate your exact tax liability for FY 2025-26. Compare New vs Old Regime, check monthly in-hand salary, and break-even deductions.',
  keywords: [
    'Tax on 9 lakh salary',
    '9 LPA in hand salary',
    'tax on 9 lakh new regime',
    'is 9 lakh salary good',
    'income tax calculator 2025',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹9 Lakh Salary: Complete 2025 Guide',
    description:
      'Earning ₹9 Lakhs? See your tax liability for FY 2025-26. We compare New vs Old Regime and calculate your monthly in-hand salary.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax9LakhGuide() {
  const pageTitle =
    'Tax on ₹9 Lakh Salary (2025): New vs Old Regime + In-Hand Pay';

  // --- FAQS ---
  const faqData = [
    {
      question: 'How much tax on 9 LPA salary?',
      answer:
        'For a ₹9 Lakh salary, your tax under the New Regime (FY 2025-26) is approx ₹33,800. Under the Old Regime, it is significantly higher at ₹85,800 (without deductions).',
    },
    {
      question: 'What is the monthly in-hand salary for 9 LPA?',
      answer:
        'After deducting PF (~₹4,500), Professional Tax (₹200), and TDS (~₹2,800), your monthly take-home salary is approximately ₹67,500 under the New Regime.',
    },
    {
      question: 'Which tax regime is better for 9 Lakh package?',
      answer:
        'The New Tax Regime is better unless you have deductions (HRA, 80C, 80D) exceeding ₹2.44 Lakhs. If your investments are lower than this, stick to the New Regime.',
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 9 Lakh Salary',
            url: `https://www.fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />

      <FAQSchema faqs={faqData} />

      {/* --- ARTICLE SCHEMA --- */}
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
              '@id': `https://www.fincado.com/guides/${CONFIG.slug}`,
            },
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              url: 'https://www.fincado.com/about',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1"
        >
          Income Tax Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          {pageTitle}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 7 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">FY 2025-26</strong>
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title={pageTitle} />
        </div>
      </header>

      {/* --- HERO IMAGE --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src={CONFIG.heroImage}
            alt="9 Lakh Salary Tax Calculation FY 2025-26"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Earning <strong>₹9 Lakhs (9 LPA)</strong> is a comfortable spot for many professionals. However, since it sits comfortably above the ₹7 Lakh tax-free limit, you cannot escape tax entirely. For <strong>FY 2025-26</strong>, the goal is to minimize this liability to keep your in-hand salary high.</p>`}
          />
          <Badge className="mt-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Status: Low Tax Zone
          </Badge>
        </CardContent>
      </Card>

      {/* --- VERDICT BOX --- */}
      <Card className="mb-12 bg-lime-50 border-lime-200 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lime-900 text-xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-lime-700" /> Quick Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lime-900">
            <p className="text-lg">
              For a <strong>₹9 Lakh salary</strong>, the{' '}
              <strong>New Tax Regime</strong> is the clear winner. Your tax
              liability will be approximately{' '}
              <span className="font-bold text-xl">₹33,800</span>.
            </p>
            <div className="flex items-start gap-2 bg-white/60 p-3 rounded border border-lime-200 text-sm text-red-800">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                <strong>Old Regime Warning:</strong> The Old Regime demands a
                huge tax of <strong>₹85,800</strong> unless you have deductions
                (HRA + 80C) exceeding <strong>₹2.44 Lakhs</strong>.
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border border-lime-100">
              <p className="text-sm font-semibold mb-4 text-center text-slate-700">
                Verify with our Calculator:
              </p>
              <InlineTaxCalculator defaultSalary={900000} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-9l-1" type="in-article" />
      </div>

      {/* --- SECTION 1: TAKE HOME --- */}
      <section className="mb-12">
        <h2
          id="take-home-salary"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-blue-600" /> Monthly In-Hand Breakdown
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Component
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  New Regime
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Old Regime
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Gross Salary
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ₹75,000
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ₹75,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Est.)
                </TableCell>
                <TableCell className="text-red-600">- ₹4,500</TableCell>
                <TableCell className="text-red-600">- ₹4,500</TableCell>
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
                  Less: TDS
                </TableCell>
                <TableCell className="text-red-600 font-bold">
                  - ₹2,817
                </TableCell>
                <TableCell className="text-red-600 font-bold">
                  - ₹7,150
                </TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-bold text-emerald-900 text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-bold text-emerald-700 text-lg">
                  ₹67,483
                </TableCell>
                <TableCell className="font-bold text-amber-700 text-lg">
                  ₹63,150
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic">
          *PF assumed at 12% of Basic (Basic = 50% of Gross). TDS is averaged
          monthly.
        </p>
      </section>

      {/* --- SECTION 2: SALARY FLOW --- */}
      <section className="mb-12">
        <h2
          id="salary-flow"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-indigo-600" /> Where Does Your
          ₹9,00,000 Go?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-emerald-600 mb-2 text-lg">
                💰 In Pocket (90%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹8.10 L</span>
              <p className="text-sm text-slate-600 mt-2">
                Annual take-home pay.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-orange-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-orange-600 mb-2 text-lg">
                🏛️ Income Tax (3.8%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹0.34 L</span>
              <p className="text-sm text-slate-600 mt-2">New Regime Tax.</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-blue-600 mb-2 text-lg">
                🏦 Retirals (6.0%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹0.54 L</span>
              <p className="text-sm text-slate-600 mt-2">Compulsory savings.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 3: CALCULATION --- */}
      <section className="mb-12">
        <h2
          id="new-regime"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-purple-600" /> Tax Calculation
          (New Regime)
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-700">
              Standard Deduction: <strong>₹75,000</strong>.
              <br />
              Taxable Income: ₹9,00,000 - ₹75,000 = <strong>₹8,25,000</strong>.
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-bold text-slate-900">
                      Slab
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Rate
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Tax
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>0 - 3L</TableCell>
                    <TableCell>Nil</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3L - 7L</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>₹20,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>7L - 8.25L</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>₹12,500</TableCell>
                  </TableRow>
                  <TableRow className="font-bold bg-slate-50 text-slate-900">
                    <TableCell>Total + Cess(4%)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹33,800</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 4: BREAK EVEN --- */}
      <section className="mb-12">
        <h2
          id="break-even"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
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
              To beat the New Regime tax of ₹33,800, you need total deductions
              in the Old Regime exceeding:
            </p>
            <p className="text-2xl font-bold text-indigo-700 mb-2">₹2,44,000</p>
            <p>
              This is achievable if you max out 80C (₹1.5L) AND pay significant
              House Rent (HRA) or Medical Insurance (80D).
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            For a ₹9 Lakh salary, the <strong>New Tax Regime</strong> is highly
            efficient, taxing only ~3.8% of your total income. Unless you have
            significant HRA or Home Loan claims, there is little reason to
            choose the Old Regime.
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

      {/* --- SECTION: RELATED LINKS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Explore More Tax Scenarios
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Link 1: Tax on 8L */}
          <Link href="/guides/tax-on-8-lakh-salary" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Tax on ₹8 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Check tax liability for a lower salary bracket.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Compare Now{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 2: Tax on 10L */}
          <Link href="/guides/tax-on-10-lakh-salary" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Tax on ₹10 Lakhs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    See calculations for the next salary milestone.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                  View Analysis{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 3: New vs Old Regime */}
          <Link href="/guides/new-vs-old-tax-regime-2025" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    New vs Old Regime
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Detailed comparison of FY 2025-26 rules.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                  Read Guide{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2 id="faqs" className="mb-6 text-2xl font-bold text-slate-900">
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
