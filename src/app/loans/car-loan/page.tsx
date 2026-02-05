import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CarLoanClient from './CarLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { Car, ArrowRight, BadgeCheck } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator – New & Used Car Loans (Updated for 2026)',
  description:
    'Calculate Car Loan EMI instantly. Compare interest rates for New vs Used cars from SBI, HDFC, Axis. Check eligibility and down payment impact.',
  keywords: [
    'Car Loan EMI Calculator',
    'Auto Loan Interest Rate',
    'Vehicle Loan Calculator',
    'New Car Loan vs Used Car Loan',
    'Car Loan Eligibility',
    'Zero Down Payment Car Loan',
  ],
  alternates: {
    canonical: 'https://fincado.com/loans/car-loan/',
  },
  openGraph: {
    title: 'Car Loan EMI Calculator – Updated After Budget 2026',
    description:
      'Free tool to calculate Car Loan EMI, Total Interest, and Tenure options.',
    url: 'https://fincado.com/loans/car-loan/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function CarLoanPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Car Loan</strong> is a secured loan offered by banks and NBFCs to purchase 
      a new or used vehicle. The car itself acts as collateral (hypothecation) until the loan is fully repaid.
      Interest rates typically range between <strong>8.5% to 11%</strong> for new cars.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Age:</strong> 21–65 years at loan maturity.</li>
      <li><strong>Income:</strong> Minimum ₹3 Lakhs annually for salaried employees.</li>
      <li><strong>Credit Score:</strong> A CIBIL Score of 750+ usually gets the lowest interest rates.</li>
      <li><strong>Employment:</strong> At least 2 years of work experience is preferred.</li>
    </ul>
  `);

  const newVsUsedContent = autoLinkContent(`
    <p>
      Banks offer different rates for <strong>New Car Loans</strong> versus <strong>Used Car Loans</strong>. 
      Used car loans often have higher interest rates (12%–18%) and require a higher down payment compared 
      to new car loans.
    </p>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Can I sell my car during the loan tenure?',
      answer:
        'No. You must first close the car loan and remove hypothecation from the RC before selling the vehicle.',
    },
    {
      id: 'faq-2',
      question: 'Are there foreclosure charges on car loans?',
      answer:
        'Yes. Most banks charge 3–5% of the outstanding principal. Some lenders waive foreclosure charges after 2–3 years.',
    },
    {
      id: 'faq-3',
      question: 'Do salaried individuals get tax benefits on car loans?',
      answer:
        'Generally no. Tax benefits on car loans are available mainly to self-employed individuals or businesses using the car for business purposes.',
    },
    {
      id: 'faq-4',
      question: 'Is car loan EMI lower for new cars than used cars?',
      answer:
        'Yes. New car loans usually have lower interest rates, resulting in lower EMI compared to used car loans.',
    },
    {
      id: 'faq-5',
      question: 'Can I increase my down payment later?',
      answer:
        'No. Down payment is paid upfront. However, you can reduce loan burden later by making part prepayments.',
    },
    {
      id: 'faq-6',
      question: 'Which tenure is best for a car loan?',
      answer:
        'A tenure of 4–5 years usually offers the best balance between EMI affordability and total interest cost.',
    },
    {
      id: 'faq-7',
      question: 'Did Budget 2026 change car loan interest rates or EMIs?',
      answer:
        'No. Union Budget 2026 did not make any changes to car loan interest rates or EMI calculation methods. Rates continue to depend on bank policies, borrower credit score, and vehicle type.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Car Loan EMI Calculator"
        description="Calculate monthly EMI for new or used car loans. Plan your vehicle purchase budget effectively."
        url="https://fincado.com/loans/car-loan/"
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
            { name: 'Loans', url: 'https://fincado.com/loans/' },
            {
              name: 'Car Loan EMI Calculator',
              url: 'https://fincado.com/loans/car-loan/',
            },
          ]}
        />

        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Car Loan EMI Calculator" />
            <LanguageToggle path="/hi/loans/car-loan" />
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
            Car Loan EMI Calculator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              Check EMI & Down Payment
            </span>
          </h1>

          {/* Intro text */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
        <p>
          Drive home your dream car with confidence using Fincado’s
          <strong>Car Loan EMI Calculator</strong>.
          Calculate accurate EMIs, optimize your <strong>down payment</strong>,
          and compare interest rates across banks instantly.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <CarLoanClient />
            <div className="mt-4 flex gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg items-start">
              <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-emerald-900">
                  Budget 2026: Status Unchanged
                </p>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Car loan calculation rules remain the same. This tool uses the
                  standard <strong>reducing balance formula</strong> mandated
                  for banks & NBFCs.
                </p>
                <strong className="text-xs text-rose-700">
                  <u>NOTE:</u> EMI calculations are indicative and unaffected by
                  Union Budget 2026. Actual rates may vary by lender, credit
                  profile, and vehicle category.
                </strong>
              </div>
            </div>

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="car-loan-after-calc" type="banner" />
            </div>

            <LiveRateTable type="carLoan" />

            {/* promo content */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Car className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Buying a New vs Used Car?
                  </strong>

                  <Link
                    href="/guides/car-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Read our Car Loan Guide (Updated for 2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Rich SEO content */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- WHAT IS CAR LOAN --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is a Car Loan?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Who is Eligible for a Car Loan?
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={eligibilityContent} />
                      <p className="mt-3 text-xs text-slate-500">
                        Eligibility criteria may vary by lender and were not
                        altered by Union Budget 2026.
                      </p>
                    </div>
                  </section>

                  {/* --- AD SLOT --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- NEW VS USED --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      New Car vs Used Car Loans
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={newVsUsedContent} />
                    </div>
                  </section>

                  {/* --- HOW CALCULATOR HELPS --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This Car Loan Calculator Helps
                    </h3>

                    <p className="text-slate-700">
                      Use this calculator to balance your down payment, tenure,
                      and EMI so that your monthly budget stays comfortable
                      without overpaying interest.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Down Payment Planning
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Higher down payment reduces EMI and total interest
                          cost.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Tenure Optimization
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          A 4–5 year tenure usually offers the best EMI–interest
                          balance.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          On-Road Cost Awareness
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Plan for insurance, road tax, registration, and
                          maintenance costs.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* --- FORMULA --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Car Loan EMI Formula
                    </h3>

                    <p className="text-slate-700">
                      The standard formula used to calculate Car Loan EMI is:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul>
                <li><strong>P</strong> = Loan Principal (Amount Borrowed)</li>
                <li><strong>r</strong> = Monthly Interest Rate</li>
                <li><strong>n</strong> = Loan Tenure in Months</li>
              </ul>
            `}
                      />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQs */}
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
              <AdSlot id="car-loan-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
