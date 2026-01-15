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
  Lightbulb,
  Wallet,
  Calculator,
  ArrowRight,
  Scale,
  Clock,
  PieChart,
  Zap,
  Goal,
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  salary: '15 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-15-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-15-lakh-salary-hero.webp',
};

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Tax on ₹15 Lakh Salary: New vs Old Regime (FY 2025-26)',
  description:
    'Calculate monthly in-hand salary for ₹15 LPA. Detailed breakdown of New vs Old Tax Regime, take-home pay, and income tax calculation for FY 2025-26.',
  keywords: [
    'Tax on 15 lakh salary',
    '15 LPA take home',
    'New vs Old regime for 15 lakh',
    'monthly in hand salary for 15 lakhs',
    'income tax on 15 lakh salary',
    'tax calculation FY 2025-26',
  ],
  alternates: {
    canonical: `https://fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹15 Lakh Salary: Complete 2025 Guide',
    description: 'See your exact monthly take-home pay and tax liability.',
    url: `https://fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax15LakhGuide() {
  const pageTitle =
    'Tax on ₹15 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  // --- FAQS ---
  const faqData = [
    {
      question: 'What is the monthly in-hand salary for 15 LPA?',
      answer:
        'Under the New Tax Regime, your approximate monthly in-hand salary for 15 LPA is ₹1,06,467, after deducting Tax (₹10,833) and PF (₹7,500).',
    },
    {
      question: 'Is New Regime better for 15 Lakh salary?',
      answer:
        'Yes, the New Regime is better by default for ₹15 Lakh salary unless you have deductions (HRA, Home Loan, 80C) exceeding ₹4.33 Lakhs.',
    },
    {
      question: 'What is the tax on 15 lakh salary in New Regime?',
      answer:
        'The total tax payable is ₹1,30,000 (including cess) for FY 2025-26, considering the ₹75,000 Standard Deduction.',
    },
    {
      question: 'Is Standard Deduction applicable in New Regime for 15 LPA?',
      answer:
        'Yes, the Standard Deduction of ₹75,000 is now available under the New Tax Regime for FY 2025-26.',
    },
    {
      question: 'Can I switch between Old and New Regime?',
      answer:
        'Salaried individuals can switch between the Old and New Regime every year while filing their ITR, based on which one saves them more tax.',
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          { name: 'Tax Planning', url: 'https://fincado.com/guides/tax/' },
          {
            name: 'Tax on 15 Lakh Salary',
            url: `https://fincado.com/guides/${CONFIG.slug}`,
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
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              url: 'https://fincado.com/about/',
            },
            inLanguage: 'en-IN',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/guides/tax-on-15-lakh-salary/',
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
            <Clock className="h-4 w-4" /> 9 Min Read
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
            alt="15 Lakh Salary Tax Calculation FY 2025-26"
            fill
            priority
            className="object-contain"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Earning <strong>₹15 Lakh per annum</strong> puts you in a significant income bracket in India. It brings financial freedom but also a higher tax liability. The biggest question for <strong>FY 2025-26</strong> is: Should you stick to the Old Regime for deductions or switch to the New Regime for lower rates?</p>`}
          />
        </CardContent>
      </Card>

      {/* --- VERDICT BOX --- */}
      <Card className="mb-12 bg-lime-50 border-lime-200 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lime-900 text-xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-lime-700" /> Quick Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lime-900">
            <p className="text-lg">
              For a <strong>₹15 Lakh salary</strong>, the{' '}
              <strong>New Tax Regime</strong> is generally better. You will pay
              approx <span className="font-bold text-xl">₹1,30,000</span> in
              tax.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-4 border border-lime-100">
              <InlineTaxCalculator defaultSalary={1500000} />
            </div>

            <p className="text-sm">
              To make the <strong>Old Regime</strong> beneficial, you need to
              claim deductions totaling more than <strong>₹4.33 Lakhs</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="tax-15l-1" type="in-article" />
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
                  ₹1,25,000
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ₹1,25,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Less: PF (Est.)
                </TableCell>
                <TableCell className="text-red-600">- ₹7,500</TableCell>
                <TableCell className="text-red-600">- ₹7,500</TableCell>
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
                  - ₹10,833
                </TableCell>
                <TableCell className="text-red-600 font-bold">
                  - ₹21,450
                </TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50">
                <TableCell className="font-bold text-emerald-900 text-lg">
                  In-Hand Salary
                </TableCell>
                <TableCell className="font-bold text-emerald-700 text-lg">
                  ₹1,06,467
                </TableCell>
                <TableCell className="font-bold text-amber-700 text-lg">
                  ₹95,850
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic">
          *Old Regime assumes standard deduction only.
        </p>
      </section>

      {/* --- SECTION 2: SALARY FLOW --- */}
      <section className="mb-12">
        <h2
          id="salary-flow"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-indigo-600" /> Where Does Your
          ₹15,00,000 Go?
        </h2>

        {/* DIAGRAM TRIGGER */}
        <div className="mb-6"></div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-emerald-600 mb-2 text-lg">
                💰 In Pocket (85.3%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">
                ₹12.80 L
              </span>
              <p className="text-sm text-slate-600 mt-2">Disposable income.</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-orange-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-orange-600 mb-2 text-lg">
                🏛️ Income Tax (8.7%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹1.30 L</span>
              <p className="text-sm text-slate-600 mt-2">New Regime Tax.</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <strong className="block text-blue-600 mb-2 text-lg">
                🏦 Retirals (6.0%)
              </strong>
              <span className="text-3xl font-bold text-slate-900">₹0.90 L</span>
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
              Taxable Income: ₹15,00,000 - ₹75,000 = <strong>₹14,25,000</strong>
              .
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
                    <TableCell>7L - 10L</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>₹30,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10L - 12L</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>₹30,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12L - 14.25L</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>₹45,000</TableCell>
                  </TableRow>
                  <TableRow className="font-bold bg-slate-50 text-slate-900">
                    <TableCell>Total + Cess(4%)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>₹1,30,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 4: COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="comparison"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-indigo-600" /> New vs Old Regime
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  New Regime
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Old Regime (No Ded.)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Payable
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  ₹1,30,000
                </TableCell>
                <TableCell className="text-red-600 font-bold">
                  ₹2,57,400
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Savings
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="text-center font-bold bg-emerald-50 text-emerald-800"
                >
                  New Regime saves you ₹1,27,400
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 5: PERSONAS --- */}
      <section className="mb-12">
        <h2
          id="personas"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Which Regime Should You Choose?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-200 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                The New Joiner
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">Lives with parents, basic investments.</p>
              <ul className="list-disc pl-4 mb-3">
                <li>Rent Paid: ₹0</li>
                <li>80C Investment: ₹50k</li>
              </ul>
              <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded inline-block font-bold">
                Winner: New Regime (Saves ~₹1 Lakh)
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                The Home Owner
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">Has Home Loan, 80C, Medical Insurance.</p>
              <ul className="list-disc pl-4 mb-3">
                <li>Home Loan Int: ₹2L</li>
                <li>80C: ₹1.5L</li>
                <li>80D: ₹50k</li>
              </ul>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded inline-block font-bold">
                Winner: Old Regime (Saves ~₹15k)
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 6: BREAK EVEN --- */}
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
              If your total deductions (Standard Deduction + 80C + HRA + Home
              Loan + 80D) exceed:
            </p>
            <p className="text-2xl font-bold text-indigo-700 mb-2">₹4,33,000</p>
            <p>Switch to Old Regime. Otherwise, stick to New Regime.</p>
          </CardContent>
        </Card>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            For a ₹15 Lakh salary, the <strong>New Tax Regime</strong> is the
            clear winner for 80% of taxpayers. It offers a higher in-hand salary
            of roughly <strong>₹1.06 Lakhs/month</strong> without the hassle of
            investment proof submission.
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
          Explore More Financial Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Link 1: ELSS Funds */}
          <Link href="/guides/elss-funds-guide-2025/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Best ELSS Funds
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Save up to ₹46,800 tax under Section 80C.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                  Start Saving{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 2: SIP Calculator */}
          <Link href="/sip-calculator/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    SIP Calculator
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Calculate returns on your monthly investments.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                  Check Returns{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Link 3: 1 Crore Goal */}
          <Link href="/guides/sip-for-1-crore-in-10-years/" className="group">
            <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    <Goal className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Build ₹1 Crore
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    A step-by-step plan to reach ₹1 Cr in 10 years.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                  See Plan{' '}
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
