import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import IncomeTaxClient from './IncomeTaxClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BadgeCheck, Scale, FileText } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Income Tax Calculator 2026 – Compare New vs Old Regime',
  description:
    'Calculate your Income Tax for FY 2025-26 & FY 2026-27 with our free calculator. Compare New vs Old Regime tax liability, check tax slabs, and optimize deductions.',
  keywords: [
    'Income Tax Calculator',
    'Tax Calculator AY 2026-27',
    'New vs Old Tax Regime Calculator',
    'Income Tax Slabs 2026',
    'Salary Tax Calculator',
    '80C Tax Deduction',
  ],
  alternates: {
    canonical: 'https://fincado.com/income-tax-calculator/',
  },
  openGraph: {
    title: 'Income Tax Calculator 2026 – Compare New vs Old Regime',
    description:
      'Compare Old vs New Tax Regime and find the best option for your salary. Free online tax calculator for India.',
    url: 'https://fincado.com/income-tax-calculator/',
    type: 'website',
  },
};

const faqItems = [
  {
    id: 'faq-1',
    question: 'Does New Regime allow HRA exemption?',
    answer:
      'No. HRA, LTA, and most deductions are not allowed under the New Tax Regime.',
  },
  {
    id: 'faq-2',
    question: 'Can I change tax regime every year?',
    answer:
      'Salaried individuals can switch tax regimes every year. However, taxpayers with business income can switch only once.',
  },
  {
    id: 'faq-3',
    question: 'What is Health & Education Cess?',
    answer:
      'Health & Education Cess is an additional 4% tax applied on the total income tax payable in both Old and New regimes.',
  },
];

/* ---------------- PAGE ---------------- */

export default function IncomeTaxPage() {
  const introContent = autoLinkContent(`
    <p>
      The <strong>Income Tax Calculator</strong> helps you estimate your tax liability for the 
      Assessment Year (AY) 2026-27 and 2025-26. It automatically compares the 
      <strong>Old Tax Regime</strong> (with deductions like 80C, HRA) and the 
      <strong>New Tax Regime</strong> (lower rates, fewer deductions) to recommend the best option for you.
    </p>
    <p class="mt-4">
      If you are planning tax-saving investments, explore our detailed guide on 
      <a href="/guides/best-tax-saving-options-80c"> Section 80C investments</a> 
      to understand where deductions actually make sense.
    </p>
  `);

  return (
    <>
      {/* ---------------- SCHEMA ---------------- */}
      <CalculatorSchema
        name="Income Tax Calculator India"
        description="Calculate income tax liability for AY 2026-27. Compare New vs Old Regime tax slabs."
        url="https://fincado.com/income-tax-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Income Tax Calculator',
              url: 'https://fincado.com/income-tax-calculator/',
            },
          ]}
        />

        {/* ---------------- HEADER ---------------- */}
        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Income Tax Calculator 2026" />
            <LanguageToggle path="/hi/income-tax-calculator" />
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Income Tax Calculator
            <span className="block text-base sm:text-lg font-medium text-emerald-700 mt-2">
              AY 2026–27 • FY 2025–26
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-4 text-sm text-slate-500">
            Updated as per Budget 2026 • Valid for salaried individuals,
            freelancers & professionals
          </p>

          {/* Intro */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
                <p>
                  Stop guessing your tax. Compare <strong>New vs Old Regime</strong>
                  instantly using real slab logic and cess rules.
                  Ideal for salaried individuals, freelancers, and professionals in India.
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: Tax Slabs Confirmed
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The Union Budget 2026 maintained the{' '}
                <strong>New Tax Regime</strong> as the default. Standard
                Deduction remains at <strong>₹75,000</strong> for salary income.
                No new changes were introduced to Old Regime slabs.
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* ---------------- CALCULATOR ---------------- */}
            <IncomeTaxClient />

            <div className="no-print my-8">
              <AdSlot id="tax-after-calc" type="banner" />
            </div>

            {/* ---------------- SEO CONTENT ---------------- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- HOW TAX IS CALCULATED --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      How Income Tax Is Calculated (Step-by-Step Example)
                    </h2>

                    <p className="text-slate-700 leading-relaxed">
                      Let’s understand tax calculation with a simple example:
                    </p>

                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      <li>
                        <strong>Annual Salary:</strong> ₹12,00,000
                      </li>
                      <li>
                        <strong>Standard Deduction (New Regime):</strong>{' '}
                        ₹75,000
                      </li>
                      <li>
                        <strong>Taxable Income:</strong> ₹11,25,000
                      </li>
                    </ul>

                    <p className="text-slate-700 leading-relaxed">
                      Tax is calculated slab-wise and then a{' '}
                      <strong>4% Health & Education Cess</strong> is added. This
                      is exactly what the calculator above does — accurately and
                      instantly.
                    </p>
                  </section>
                  {/* --- NEW VS OLD --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      New vs Old Tax Regime: Which is Better?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- RECOMMENDATION TABLE --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Which Tax Regime Is Better for You?
                    </h3>

                    <div className="rounded-xl border border-slate-200 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              Your Situation
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Recommended Regime
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Deductions below ₹3.75 lakhs</TableCell>
                            <TableCell className="font-semibold text-emerald-700">
                              New Regime
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Home Loan + 80C + 80D deductions
                            </TableCell>
                            <TableCell className="font-semibold text-blue-700">
                              Old Regime
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Salary up to ₹7 lakhs</TableCell>
                            <TableCell className="font-semibold text-emerald-700">
                              New Regime (Zero Tax)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Unsure or mixed income sources
                            </TableCell>
                            <TableCell className="font-semibold">
                              Use Calculator
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>
                  {/* --- AD --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>
                  {/* --- TAX SAVING --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How to Save Tax in 2026?
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Scale className="w-4 h-4 text-slate-500" />
                          <h4 className="font-semibold text-slate-900">
                            Standard Deduction
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Flat deduction of <strong>₹75,000</strong> under New
                          Regime without any proof.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <h4 className="font-semibold text-slate-900">
                            Section 80C (Old)
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Investments like{' '}
                          <Link
                            href="/guides/elss-funds-guide"
                            className="text-emerald-700 font-medium underline-offset-4 hover:underline"
                          >
                            ELSS mutual funds
                          </Link>{' '}
                          allow tax deduction up to ₹1.5 lakhs.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <BadgeCheck className="w-4 h-4 text-blue-600" />
                          <h4 className="font-semibold text-slate-900">
                            Post-Tax Investing
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Compare where to invest your surplus using our{' '}
                          <Link
                            href="/guides/sip-vs-fd"
                            className="text-emerald-700 font-medium underline-offset-4 hover:underline"
                          >
                            SIP vs FD comparison
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* ---------------- FAQs ---------------- */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left text-slate-900 font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <AuthorBio />
          </div>

          {/* ---------------- SIDEBAR ---------------- */}
          <aside className="sidebar no-print">
            <div className="sticky top-28 mb-6">
              <AdSlot id="tax-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
