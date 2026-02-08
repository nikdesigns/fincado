// src/app/loans/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';

// --- UI COMPONENTS ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Home,
  Banknote,
  Car,
  GraduationCap,
  Calculator,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Unlock,
  Percent,
  Clock,
  HelpCircle,
} from 'lucide-react';

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'Compare Loans in India: Home, Personal & Car Loan Rates (2025)',
  description:
    'Find the best loan offers in India. Compare interest rates, calculate EMI, and check eligibility for Home Loans, Personal Loans, and Car Loans.',
  keywords: [
    'loans in India',
    'compare loan interest rates',
    'home loan eligibility',
    'personal loan interest rates',
    'car loan emi calculator',
    'education loan india',
    'loan against property'
  ],
  openGraph: {
    title: 'Smart Borrowing Starts Here | Fincado Loans Hub',
    description:
      'Compare rates, calculate EMIs, and apply for the best loans in India.',
    url: 'https://fincado.com/loans/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fincado.com/loans/',
  },
};

// --- 2. LOAN DATA ---
const LOAN_TYPES = [
  {
    title: 'Home Loan',
    path: '/loans/home-loan',
    icon: Home,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    desc: 'Lowest rates from 8.35%. Tax benefits under Sec 24 & 80C.',
  },
  {
    title: 'Personal Loan',
    path: '/loans/personal-loan',
    icon: Banknote,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
    desc: 'Instant approval up to ₹40 Lakhs. No collateral required.',
  },
  {
    title: 'Car Loan',
    path: '/loans/car-loan',
    icon: Car,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    desc: 'Drive your dream car with up to 100% on-road funding.',
  },
  {
    title: 'Education Loan',
    path: '/loans/education-loan',
    icon: GraduationCap,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    desc: 'Study in India or abroad with moratorium benefits.',
  },
  {
    title: 'EMI Calculator',
    path: '/emi-calculator',
    icon: Calculator,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
    desc: 'Calculate your exact monthly EMI before applying.',
  }
];

export default function LoansPage() {
  // FAQ Schema Data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the current Home Loan interest rate in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Current home loan interest rates in India start around 8.35% p.a. for eligible borrowers with a credit score above 750.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a Personal Loan without collateral?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Personal Loans are unsecured loans, meaning you do not need to pledge any collateral like gold or property to avail them.',
        },
      }
    ],
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* --- STRUCTURED DATA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Loans', url: 'https://fincado.com/loans/' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="lg:col-span-8 min-w-0 mt-12">
          {/* Top Ad */}
          <div className="mb-8 no-print flex justify-center bg-slate-50 rounded-lg p-2 border border-slate-100">
            <AdSlot
              id="loans-top-leaderboard"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          {/* --- HERO SECTION --- */}
          <section className="text-center mb-12 bg-linear-to-b from-emerald-50/50 to-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 font-semibold uppercase tracking-wider border-emerald-200">
              Smart Borrowing
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Find the Perfect Loan for <br />
              <span className="text-emerald-600">Your Ambitions.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Compare interest rates, check eligibility, and calculate EMIs for
              Home, Personal, and Car loans in minutes.
            </p>
            <div className="mt-6 flex justify-center">
              <ShareTools title="Compare Loans in India - Fincado" />
            </div>
          </section>

          {/* --- LOAN GRID (Using Card Components) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {LOAN_TYPES.map((loan) => (
              <Link key={loan.path} href={loan.path} className="group h-full">
                <Card className="h-full hover:shadow-lg hover:border-emerald-500 transition-all duration-200 cursor-pointer flex flex-col">
                  <CardHeader className="flex-row gap-4 items-start space-y-0 pb-2">
                    <div
                      className={`w-12 h-12 rounded-xl ${loan.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <loan.icon className={`w-6 h-6 ${loan.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {loan.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="grow pt-2">
                    <CardDescription className="text-slate-600 text-sm leading-relaxed">
                      {loan.desc}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-slate-50 mt-4">
                    <div className="flex items-center text-emerald-600 font-semibold text-sm pt-4 group-hover:translate-x-1 transition-transform">
                      Check Rates <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* Mid Content Ad */}
          <div className="my-12 no-print flex justify-center">
            <AdSlot id="loans-mid-leaderboard" type="leaderboard" />
          </div>

          {/* --- EDUCATIONAL CONTENT --- */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                Understanding Loans in India
              </h2>
              <p className="text-slate-600 leading-relaxed">
                A loan is a sum of money that you borrow from a bank or
                financial institution (NBFC) with the promise to repay it over a
                specific period (tenure) along with interest.
              </p>
            </div>

            {/* Comparison Cards: Secured vs Unsecured */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-slate-50 border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <LockKeyhole className="w-4 h-4 text-indigo-500" />
                    1. Secured Loans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-sm">
                    Backed by collateral (e.g., House, Car, Gold). These
                    generally have <strong>lower interest rates</strong> because
                    the risk to the lender is lower.
                  </CardDescription>
                  <p className="text-xs text-slate-500 mt-3 italic">
                    Examples: Home Loan, Car Loan.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Unlock className="w-4 h-4 text-amber-500" />
                    2. Unsecured Loans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-sm">
                    Given based on your creditworthiness (CIBIL Score).
                    <strong> No collateral needed</strong>, but interest rates
                    are typically higher.
                  </CardDescription>
                  <p className="text-xs text-slate-500 mt-3 italic">
                    Examples: Personal Loan, Credit Cards.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Factors Cards */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Key Factors Affecting Your EMI
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Banknote,
                    title: 'Principal',
                    desc: 'Total amount borrowed. Higher amount = Higher EMI.',
                  },
                  {
                    icon: Percent,
                    title: 'Interest Rate',
                    desc: 'Even 0.5% diff saves lakhs over 20 years.',
                  },
                  {
                    icon: Clock,
                    title: 'Tenure',
                    desc: 'Longer tenure = Lower EMI but Higher Total Interest.',
                  }
                ].map((factor, i) => (
                  <Card key={i} className="border-slate-200">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="p-2 bg-slate-100 rounded-full mb-3">
                        <factor.icon className="w-5 h-5 text-slate-700" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">
                        {factor.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-snug">
                        {factor.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Checklist Box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <h3 className="font-bold text-indigo-900 mb-2">
                Checklist Before Applying
              </h3>
              <p className="text-indigo-800/80 text-sm leading-relaxed">
                Before you submit a loan application, ensure you check your{' '}
                <Link
                  href="/credit-score/"
                  className="font-semibold underline decoration-indigo-400 underline-offset-2 hover:text-indigo-700"
                >
                  Credit Score
                </Link>
                . A score above 750 can help you negotiate better rates. Also,
                use our{' '}
                <Link
                  href="/emi-calculator/"
                  className="font-semibold underline decoration-indigo-400 underline-offset-2 hover:text-indigo-700"
                >
                  EMI Calculator
                </Link>{' '}
                to ensure the monthly installment fits within 40% of your
                take-home salary.
              </p>
            </div>

            {/* FAQ Accordion (Implemented) */}
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-amber-500" />
                Frequently Asked Questions
              </h3>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="bg-white border rounded-lg mb-3 px-1"
                >
                  <AccordionTrigger className="font-semibold text-slate-800 px-4 hover:no-underline hover:text-emerald-600">
                    What is the current Home Loan interest rate?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 px-4 pb-4">
                    Current home loan interest rates in India start around{' '}
                    <strong>8.35% p.a.</strong> for eligible borrowers with a
                    credit score above 750. Rates vary by bank and loan amount.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white border rounded-lg mb-3 px-1"
                >
                  <AccordionTrigger className="font-semibold text-slate-800 px-4 hover:no-underline hover:text-emerald-600">
                    Can I get a Personal Loan without collateral?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 px-4 pb-4">
                    Yes, Personal Loans are <strong>unsecured loans</strong>,
                    meaning you do not need to pledge any collateral like gold
                    or property to avail them. Approval depends on your income
                    and CIBIL score.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white border rounded-lg mb-3 px-1"
                >
                  <AccordionTrigger className="font-semibold text-slate-800 px-4 hover:no-underline hover:text-emerald-600">
                    What documents are needed for a loan?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 px-4 pb-4">
                    Generally, you need KYC (Aadhaar/PAN), Income Proof (Salary
                    slips/ITR), and Bank Statements for the last 6 months. For
                    secured loans, property or asset documents are also
                    required.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Bottom Ad */}
          <div className="mt-12 no-print flex justify-center">
            <AdSlot id="loans-bottom-leaderboard" type="leaderboard" />
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <aside className="lg:col-span-4 space-y-8 mt-12">
          {/* Navigation Widget */}
          <Card className="border-slate-200 shadow-none border-none bg-transparent">
            <CardContent className="pt-4">
              <FinancialNavWidget />
            </CardContent>
          </Card>

          {/* Sticky Sidebar Ad */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
            <AdSlot id="loans-sidebar-sticky" type="box" />
          </div>

          {/* Credit Score Promo (Dark Theme) */}
          <div className="bg-slate-900 rounded-2xl p-6 text-center shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck className="w-24 h-24 text-white" />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🚀
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Check Your Eligibility
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                A high CIBIL score is the secret to low-interest loans. Check
                yours for free without impacting your score.
              </p>
              <Link href="/credit-score/">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                  Check Credit Score
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
