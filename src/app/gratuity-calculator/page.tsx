import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GratuityClient from './GratuityClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import { autoLinkContent } from '@/utils/autoLinker';
import LanguageToggle from '@/components/LanguageToggle';
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

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Gratuity Calculator 2025 – Check Gratuity Amount & Tax Exemption',
  description:
    'Calculate your Gratuity amount online. Know the formula (15/26 vs 15/30), eligibility rules (5 years), and tax exemption limit (₹20 Lakhs).',
  keywords: [
    'Gratuity Calculator',
    'Gratuity Formula India',
    'Payment of Gratuity Act 1972',
    'Gratuity Tax Exemption Limit 2025',
    'Calculate Gratuity Online',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/gratuity-calculator/',
  },
  openGraph: {
    title: 'Gratuity Calculator – Know Your End-of-Service Benefit',
    description:
      'Free tool to calculate gratuity based on your salary and years of service.',
    url: 'https://www.fincado.com/gratuity-calculator/',
    type: 'website',
  },
};

const GRATUITY_FAQS = [
  {
    id: 'gratuity-faq-1',
    question: 'Can my employer refuse to pay Gratuity?',
    answer:
      'If you have completed 5 years of continuous service, your employer is legally bound to pay gratuity. It cannot be denied unless the employee has been terminated for riotous or disorderly conduct.',
  },
  {
    id: 'gratuity-faq-2',
    question: 'Is gratuity part of CTC?',
    answer:
      'Yes, most companies include gratuity (around 4.81% of Basic Salary) in your Cost to Company (CTC). However, it is paid only when you leave the company after completing 5 years of service.',
  },

  // 👇 ADDED FROM YOUR HARDCODED SCHEMA
  {
    id: 'gratuity-faq-3',
    question: 'What is the eligibility for Gratuity?',
    answer:
      'An employee is eligible for gratuity only after completing 5 continuous years of service with the same employer.',
  },
  {
    id: 'gratuity-faq-4',
    question: 'Is Gratuity taxable?',
    answer:
      'Gratuity received by government employees is fully tax-free. For private sector employees, it is tax-free up to ₹20 Lakhs. Any amount above this limit is taxable.',
  },
  {
    id: 'gratuity-faq-5',
    question: 'Does 4 years and 7 months count as 5 years?',
    answer:
      'No. To be eligible, you must complete exactly 5 full years. However, once eligible, any service period above 6 months is rounded off to the next year for calculation.',
  },
];

/* ---------------- PAGE ---------------- */

export default function GratuityPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Gratuity</strong> is a monetary benefit given by an employer to an employee for services 
      rendered to the company. It is a lump sum payment made at the time of retirement, resignation, 
      or termination.
    </p>
    <p class="mt-4">
      In India, gratuity rules are mandated by the <strong>Payment of Gratuity Act, 1972</strong>. 
      Any organization with 10 or more employees must pay gratuity to eligible staff.
    </p>
  `);

  const formulaContent = autoLinkContent(`
    <p>
      The formula depends on whether your organization is covered under the Gratuity Act or not.
    </p>
    <ul class="list-disc list-inside space-y-2 mt-2">
      <li>
        <strong>Covered Employees:</strong> <br />
        <em>Gratuity = (Last Drawn Salary × 15 × Years of Service) / 26</em> <br />
        (Here, 26 represents the number of working days in a month).
      </li>
      <li>
        <strong>Not Covered Employees:</strong> <br />
        <em>Gratuity = (Last Drawn Salary × 15 × Years of Service) / 30</em>
      </li>
    </ul>
    <p>
      <strong>Note:</strong> Salary = Basic Pay + Dearness Allowance (DA).
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Gratuity Calculator"
        description="Calculate gratuity amount based on basic salary and tenure. Check tax-free limit of ₹20 Lakhs."
        url="https://www.fincado.com/gratuity-calculator/"
      />

      {/* FAQ Schema */}
      <FAQSchema
        faqs={GRATUITY_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
            {
              name: 'Gratuity Calculator',
              url: 'https://www.fincado.com/gratuity-calculator/',
            },
          ]}
        />

        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Gratuity Calculator" />
            <LanguageToggle path="/hi/gratuity-calculator" />
          </div>

          {/* Title */}
          <h1
            className="
      mb-4
      text-2xl
      sm:text-3xl
      lg:text-4xl
      font-semibold
      tracking-tight
      text-slate-900
    "
          >
            Gratuity Calculator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mt-1">
              Estimate Your Gratuity & Tax Exemption
            </span>
          </h1>

          {/* Intro text */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
        <p>
          Leaving a job or planning retirement?
          Use Fincado’s <strong>Gratuity Calculator</strong> to instantly
          estimate your payable gratuity amount and understand
          how much of it is <strong>tax-free</strong> under current rules.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <GratuityClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="gratuity-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (EPF/PPF Context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Retirement Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/epf-calculator"
                  className="
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3
        py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        hover:bg-slate-50
        transition
      "
                >
                  🏢 EPF Calc
                </Link>

                <Link
                  href="/retirement-calculator"
                  className="
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3
        py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        hover:bg-slate-50
        transition
      "
                >
                  👴 Retire Calc
                </Link>
              </div>
            </div>

            <div className="no-print my-8">
              <AdSlot id="gratuity-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- WHAT IS GRATUITY --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is Gratuity?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- FORMULA --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Gratuity Calculation Formula
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={formulaContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- TAX RULES TABLE --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Tax Rules for Gratuity (2025)
                    </h3>

                    <div className="rounded-lg border border-slate-200 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee Category</TableHead>
                            <TableHead>Tax Exemption Limit</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell>Government Employees</TableCell>
                            <TableCell className="font-medium text-emerald-700">
                              Fully Tax Exempt
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Private (Covered by Act)</TableCell>
                            <TableCell>₹20 Lakhs</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Private (Not Covered)</TableCell>
                            <TableCell>₹20 Lakhs</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <p className="text-sm text-slate-500">
                      <em>
                        Note: The tax exemption limit was increased from ₹10
                        Lakhs to ₹20 Lakhs in 2018.
                      </em>
                    </p>
                  </section>

                  {/* --- ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Eligibility Rules
                    </h3>

                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      <li>
                        <strong>Minimum Service:</strong> 5 Years of continuous
                        service.
                      </li>
                      <li>
                        <strong>Exceptions:</strong> The 5-year rule does not
                        apply in case of death or permanent disablement. The
                        nominee receives the gratuity.
                      </li>
                    </ul>
                  </section>

                  {/* --- HOW TO USE --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How to Use This Calculator
                    </h3>

                    <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                      <li>
                        Enter your <strong>Basic Salary + DA</strong> (exclude
                        HRA and allowances).
                      </li>
                      <li>Enter your total years of service.</li>
                      <li>
                        Select whether your employer is covered under the
                        Gratuity Act (most private companies are).
                      </li>
                      <li>Get the exact gratuity payout instantly.</li>
                    </ol>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQs --- */}
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
                    defaultValue={GRATUITY_FAQS[0]?.id}
                    className="space-y-2"
                  >
                    {GRATUITY_FAQS.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900">
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

          <aside className="sidebar no-print">
            <div className="sticky top-5 mb-6">
              <AdSlot id="gratuity-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
