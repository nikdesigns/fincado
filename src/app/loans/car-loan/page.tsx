import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CarLoanEMIClient from './CarLoanEMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, ArrowRight, Info, Car } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CarLoanSchemas } from '@/components/schemas/CarLoanSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator 2026 - Auto Loan EMI Calculator India',
  description:
    'Free Car Loan EMI Calculator for India. Calculate monthly EMI for new & used cars from HDFC, SBI, ICICI banks. Compare auto loan rates, check eligibility & save on interest.',
  keywords: [
    'car loan emi calculator',
    'auto loan calculator',
    'car loan interest rate',
    'used car loan',
    'new car loan',
    'vehicle loan emi',
    'hdfc car loan',
    'sbi car loan',
    'car loan prepayment',
  ],
  alternates: {
    canonical: 'https://fincado.com/emi-calculator/car-loan/',
  },
  openGraph: {
    title: 'Car Loan EMI Calculator - Calculate Auto Loan EMI Online',
    description:
      'Calculate car loan EMI instantly. Compare rates from top banks & NBFCs. Get best deals on new & used car loans.',
    url: 'https://fincado.com/emi-calculator/car-loan/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-car-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Car Loan EMI Calculator',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ---------------- PAGE ---------------- */

export default function CarLoanEMIPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Car Loan EMI Calculator</strong> helps you calculate monthly installments 
      for your auto loan based on car price, down payment, interest rate, and tenure. 
      Indian banks and NBFCs offer car loans for both <strong>new cars</strong> (lower rates, 8.7%-10%) 
      and <strong>used cars</strong> (higher rates, 11%-14%) with flexible tenures up to 7 years.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Quick Approval:</strong> Car loans typically get approved within 24-48 hours with minimal documentation.</li>
      <li><strong>High Loan Amount:</strong> Banks finance up to 90% of on-road car price (10% down payment required).</li>
      <li><strong>Flexible Tenure:</strong> Repayment period from 1-7 years to suit your budget.</li>
      <li><strong>Competitive Rates:</strong> Interest rates starting from 8.70% p.a. for new cars.</li>
    </ul>
  `);

  const comparisonContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">Factor</th>
            <th class="p-3 text-left font-semibold border">New Car Loan</th>
            <th class="p-3 text-left font-semibold border">Used Car Loan</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Interest Rate</td>
            <td class="p-3 border text-emerald-700">8.70% - 10.00%</td>
            <td class="p-3 border">11.00% - 14.00%</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Max Loan Amount</td>
            <td class="p-3 border">90% of on-road price</td>
            <td class="p-3 border">80% of market value</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Max Tenure</td>
            <td class="p-3 border">7 years</td>
            <td class="p-3 border">5 years</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Processing Fee</td>
            <td class="p-3 border">₹2,000 - ₹5,000</td>
            <td class="p-3 border">₹3,000 - ₹7,000</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Car Age Allowed</td>
            <td class="p-3 border">Brand new</td>
            <td class="p-3 border">Up to 8-10 years old</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is the current car loan interest rate in India?',
      answer:
        'As of February 2026, car loan interest rates for new cars range from 8.70% to 10.50% p.a. SBI offers 8.85%-9.75%, HDFC 8.70%-10%, and ICICI 9%-10.50%. Used car loans have higher rates (11%-14%).',
    },
    {
      id: 'faq-2',
      question: 'How much down payment is required for a car loan?',
      answer:
        'Most banks require 10-20% down payment for new cars (they finance 80-90% of on-road price). For used cars, down payment is typically 20-30%. Higher down payment reduces EMI and total interest.',
    },
    {
      id: 'faq-3',
      question: 'Can I get a car loan for a used car?',
      answer:
        'Yes, all major banks and NBFCs offer used car loans. The car should be less than 8-10 years old at loan maturity. Interest rates are 2-3% higher than new car loans. Maximum tenure is typically 5 years.',
    },
    {
      id: 'faq-4',
      question: 'What is the maximum tenure for a car loan?',
      answer:
        'New car loans: Up to 7 years (84 months). Used car loans: Up to 5 years (60 months). However, longer tenure increases total interest paid. Most people choose 3-5 years for optimal balance.',
    },
    {
      id: 'faq-5',
      question: 'Do I need a co-applicant for a car loan?',
      answer:
        'Not mandatory, but adding a co-applicant (spouse/parent) can increase your loan eligibility by combining incomes. It also improves approval chances if your income is marginal or credit score is below 750.',
    },
    {
      id: 'faq-6',
      question: 'Can I prepay my car loan without penalty?',
      answer:
        'Most banks allow prepayment of car loans without penalty charges. Some may charge 2-5% penalty if prepaid within first year. Check your loan agreement for specific terms before prepaying.',
    },
    {
      id: 'faq-7',
      question: 'What documents are needed for a car loan?',
      answer:
        'Required documents: Identity proof (Aadhaar, PAN), Address proof, Income proof (3 months salary slips for salaried, 2 years ITR for self-employed), Bank statements (6 months), Car quotation/proforma invoice, and Passport-size photographs.',
    },
    {
      id: 'faq-8',
      question: 'Is car insurance mandatory with a car loan?',
      answer:
        'Yes, comprehensive car insurance is mandatory throughout the loan tenure. The bank/NBFC requires you to maintain valid insurance and add them as hypothecation holder. No Claim Bonus (NCB) benefits continue to apply.',
    },
    {
      id: 'faq-9',
      question: 'Can I transfer my car loan to another bank?',
      answer:
        'Yes, you can do a car loan balance transfer to another bank offering lower interest rates. However, check transfer charges, processing fees, and calculate if savings justify the transfer cost.',
    },
    {
      id: 'faq-10',
      question: 'How is car loan eligibility calculated?',
      answer:
        'Eligibility depends on: (1) Monthly income (minimum ₹25,000), (2) Credit score (minimum 650, preferably 750+), (3) Age (21-65 years), (4) EMI to income ratio (should not exceed 50%), and (5) Employment stability (2+ years work experience).',
    },
  ];

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'EMI Calculator',
            url: 'https://fincado.com/emi-calculator/',
          },
          {
            name: 'Car Loan EMI Calculator',
            url: 'https://fincado.com/emi-calculator/car-loan/',
          },
        ]}
      />

      <CalculatorSchema
        name="Car Loan EMI Calculator"
        description="Calculate car loan EMI for new & used vehicles. Check monthly repayment for auto loans from HDFC, SBI, ICICI & NBFCs."
        url="https://fincado.com/emi-calculator/car-loan/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <CarLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Car Loan EMI Calculator - Calculate Auto Loan EMI Online" />
            <LanguageToggle path="/hi/loans/car-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Car Loan EMI Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-blue-700">
                Calculate Auto Loan EMI for New & Used Cars
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="car-loan-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      LOWEST RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      HDFC Bank Car Loan {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.70%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      TYPICAL EMI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹10L @ 9% for 5 years
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹20,758
                      <span className="text-base font-normal text-slate-600">
                        /month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      MAX LOAN
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Finance up to (New Car)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      90%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        of price
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <CarLoanEMIClient />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="car-loan-after-calc" type="square" lazyLoad={false} />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Pro Tip
                </strong>
                Making a higher down payment (20-30%) significantly reduces your
                monthly EMI and total interest paid. It also improves loan
                approval chances.
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Car Loan Interest Rates Comparison {updatedLabel}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">
                            Bank/NBFC
                          </th>
                          <th className="p-3 text-left font-semibold">
                            New Car Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Used Car Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Processing Fee
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Max Tenure
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.70% - 10.00%
                          </td>
                          <td className="p-3">11.00% - 13.00%</td>
                          <td className="p-3">₹3,500</td>
                          <td className="p-3">7 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.85% - 9.75%
                          </td>
                          <td className="p-3">11.25% - 13.50%</td>
                          <td className="p-3">₹2,000</td>
                          <td className="p-3">7 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.00% - 10.50%
                          </td>
                          <td className="p-3">11.50% - 14.00%</td>
                          <td className="p-3">₹3,000</td>
                          <td className="p-3">7 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.25% - 11.50%
                          </td>
                          <td className="p-3">12.00% - 14.50%</td>
                          <td className="p-3">₹4,000</td>
                          <td className="p-3">7 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Bajaj Finserv</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.50% - 12.00%
                          </td>
                          <td className="p-3">12.50% - 15.00%</td>
                          <td className="p-3">₹5,000</td>
                          <td className="p-3">5 years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *Rates are indicative and vary based on credit score, car
                    model, and loan amount. Last updated: {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot id="car-loan-infeed-1" type="banner" lazyLoad={true} />
            </div>

            {/* Promo Content */}
            <Card className="no-print my-6 border-blue-200 bg-blue-50/50 transition-colors hover:bg-blue-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-blue-900">
                    Want to buy your dream car?
                  </strong>

                  <Link
                    href="/guides/car-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>Read our Complete Car Loan Guide (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Benefits of Car Loans in India
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Comparison */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      New Car Loan vs Used Car Loan
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={comparisonContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="car-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Car Loan Eligibility Criteria
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>Age:</strong> 21-65 years (salaried &
                        self-employed)
                      </li>
                      <li>
                        <strong>Income:</strong> Minimum ₹25,000/month
                        (salaried), ₹4 lakh/year (self-employed)
                      </li>
                      <li>
                        <strong>Credit Score:</strong> Minimum 650, preferably
                        750+ for best rates
                      </li>
                      <li>
                        <strong>Employment:</strong> Minimum 2 years work
                        experience (salaried), 3 years business vintage
                        (self-employed)
                      </li>
                      <li>
                        <strong>Down Payment:</strong> 10-20% for new cars,
                        20-30% for used cars
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="car-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Tips */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Tips to Get Best Car Loan Deal
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        Compare offers from at least 3-4 banks/NBFCs before
                        finalizing
                      </li>
                      <li>
                        Maintain credit score above 750 for lowest interest
                        rates
                      </li>
                      <li>Make higher down payment to reduce EMI burden</li>
                      <li>
                        Choose optimal tenure (3-5 years) to minimize total
                        interest
                      </li>
                      <li>
                        Check for dealer tie-ups offering special interest rates
                      </li>
                      <li>
                        Read all terms carefully before signing loan agreement
                      </li>
                    </ul>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Loan Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  General EMI Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate EMI for any type of loan
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/loans/home-loan/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🏠
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  Home Loan EMI Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate home loan EMI with tax benefits
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* 🎯 AD #6: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="car-loan-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

            {/* FAQ */}
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

            {/* 🎯 AD #7: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="car-loan-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #8: SIDEBAR TOP */}
              <AdSlot id="car-loan-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* 🎯 AD #10: SIDEBAR BOTTOM */}
              <AdSlot id="car-loan-sidebar-bottom" type="box" lazyLoad={true} />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
