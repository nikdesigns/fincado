import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BadgeCheck, Briefcase } from 'lucide-react';
import NPSClient from './NPSClient';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'NPS Calculator 2026 – Pension & Lump Sum Estimator',
  description:
    'Calculate your National Pension System (NPS) corpus, monthly pension, and tax benefits. Updated for Budget 2026 annuity rules and 80CCD(1B) deductions.',
  keywords: [
    'NPS Calculator',
    'National Pension System',
    'NPS Pension Calculator',
    '80CCD(1B) Limit 2026',
    'NPS Tier 1 Returns',
    'Retirement Planning India',
  ],
  alternates: {
    canonical: 'https://fincado.com/nps-calculator/',
  },
  openGraph: {
    title: 'NPS Calculator – Plan Your Retirement Pension',
    description:
      'Estimate your retirement corpus and monthly pension with the National Pension System.',
    url: 'https://fincado.com/nps-calculator/',
    type: 'website',
  },
};

const NPS_FAQS = [
  {
    question: 'How much tax can I save with NPS?',
    answer:
      'You can save tax up to ₹1.5 Lakh under Section 80C and an additional ₹50,000 under Section 80CCD(1B), totaling ₹2 Lakh per year.',
  },
  {
    question: 'Is the NPS withdrawal amount tax-free?',
    answer:
      'Yes, at the age of 60, you can withdraw up to 60% of the corpus as a tax-free lump sum. The remaining 40% must be used to buy an annuity (pension plan), which is taxable.',
  },
  {
    question: 'What is the current return rate of NPS?',
    answer:
      'NPS returns are market-linked. Historically, Equity (Scheme E) has delivered 10-12%, while Corporate Debt (Scheme C) and Govt Bonds (Scheme G) have delivered 8-9%.',
  },
  {
    question: 'Did Budget 2026 change NPS rules?',
    answer:
      'Union Budget 2026 maintained the status quo. The exclusive ₹50,000 deduction under 80CCD(1B) continues, and the 60% tax-free withdrawal limit remains unchanged.',
  },
];

/* ---------------- PAGE ---------------- */

export default function NPSPage() {
  const introContent = autoLinkContent(`
    <p>
      The <strong>National Pension System (NPS)</strong> is a voluntary, long-term retirement savings scheme 
      regulated by the PFRDA. It is designed to enable systematic savings during your working life.
    </p>
    <p class="mt-2">
      It is one of the most efficient tax-saving instruments, offering market-linked returns and a 
      low cost structure. At retirement (age 60), it provides a <strong>Lump Sum amount</strong> 
      and a regular <strong>Monthly Pension</strong>.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>NPS offers a dual tax benefit for individual investors:</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Section 80C:</strong> Deduction up to ₹1.5 Lakh (part of the overall 80C limit).</li>
      <li><strong>Section 80CCD(1B):</strong> An <em>exclusive</em> additional deduction of <strong>₹50,000</strong>.</li>
    </ul>
    <p class="mt-4 text-sm text-slate-500">
      Note: Corporate employees can also claim deductions on employer contributions (up to 14% of Basic + DA) under Section 80CCD(2).
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="NPS Calculator"
        description="Calculate NPS pension and lump sum amount upon retirement."
        url="https://fincado.com/nps-calculator/"
      />

      <FAQSchema
        faqs={NPS_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'NPS Calculator',
              url: 'https://fincado.com/nps-calculator/',
            },
          ]}
        />

        <header className="no-print my-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="NPS Calculator 2026" />
            <LanguageToggle path="/hi/nps-calculator/" />
          </div>

          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              NPS Calculator
            </span>
            <span className="block mt-2 text-base sm:text-lg font-medium text-emerald-700">
              Plan your retirement with India&apos;s lowest-cost pension scheme
            </span>
          </h1>

          <div className="mt-4 max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Calculate your total retirement corpus, tax-free lump sum, and expected monthly pension 
                  using the <strong>National Pension System (NPS)</strong>.
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: Tax Benefits Confirmed
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The additional deduction of <strong>₹50,000</strong> under
                Section 80CCD(1B) continues for FY 2026-27. Withdrawal rules
                regarding the 60% tax-free corpus remain unchanged.
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <NPSClient />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="nps-after-calc" type="banner" />
            </div>

            {/* Related Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Retirement Tools
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/epf-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  <Briefcase className="w-4 h-4" /> EPF Calculator
                </Link>
                <Link
                  href="/retirement-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  👴 Retire Plan
                </Link>
              </div>
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print space-y-10">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is the National Pension System (NPS)?
                </h2>
                <WikiText content={introContent} />
              </section>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* TAX BENEFITS */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS Tax Benefits (Updated 2026)
                </h3>
                <WikiText content={taxContent} />
              </section>

              {/* WITHDRAWAL RULES */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS Maturity & Withdrawal Rules
                </h3>
                <Card className="border-slate-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              Rule
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Detail
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Retirement Age
                            </TableCell>
                            <TableCell>60 Years</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Lump Sum Withdrawal
                            </TableCell>
                            <TableCell>Max 60% of Corpus (Tax-Free)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Annuity Purchase
                            </TableCell>
                            <TableCell>
                              Min 40% of Corpus (For Monthly Pension)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Tax on Annuity
                            </TableCell>
                            <TableCell>Taxable as per Income Slab</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* HOW IT HELPS */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  How This Calculator Helps
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Estimate Pension
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Knowing your estimated monthly pension helps you check
                        if it matches your post-retirement lifestyle needs.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Compounding Power
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Since NPS is a long-term product (often 25-30 years),
                        even a small 1% difference in returns can change your
                        corpus by lakhs.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </article>

            {/* FAQs */}
            <section className="article no-print mt-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Frequently Asked Questions (FAQs)
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {NPS_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`nps-faq-${index}`}
                    className="border-b"
                  >
                    <AccordionTrigger className="text-left font-medium text-slate-800 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-28 space-y-6">
              <AdSlot id="nps-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
