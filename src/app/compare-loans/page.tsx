// src/app/compare-loans/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import LoanComparison from '@/components/LoanComparison';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';
import ComparisonGrid from '@/components/ComparisonGrid';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// --- UI COMPONENTS ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Scale,
  PiggyBank,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  GitCompare,
  Calculator,
  CheckCircle2,
  Info,
  Sparkles,
} from 'lucide-react';

// --- ENHANCED SEO METADATA (2026) ---
export const metadata: Metadata = {
  title:
    'Loan Comparison Tool 2026 | Compare Home, Car & Personal Loans | Fincado',
  description:
    'Compare loan offers from 15+ banks (SBI, HDFC, ICICI, Axis). Calculate total interest, EMI differences, and hidden charges. Find the cheapest loan in 2026. 100% free comparison tool.',
  keywords: [
    'loan comparison tool',
    'compare home loans',
    'compare car loans',
    'compare personal loans',
    'sbi vs hdfc loan',
    'icici vs axis loan',
    'best bank loan rates 2026',
    'loan interest comparison',
    'emi comparison calculator',
    'cheapest home loan',
    'loan calculator comparison',
    'bank loan comparison india',
  ],
  authors: [{ name: 'Fincado Team' }],
  creator: 'Fincado',
  publisher: 'Fincado',
  alternates: {
    canonical: 'https://fincado.com/compare-loans/',
  },
  openGraph: {
    title: 'Loan Comparison Tool 2026 | Compare 15+ Banks',
    description:
      'Compare loan offers side-by-side. Calculate total interest, EMI differences, and find the cheapest loan from SBI, HDFC, ICICI, and more.',
    url: 'https://fincado.com/compare-loans/',
    siteName: 'Fincado',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-compare-loans.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Loan Comparison Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Comparison Tool 2026',
    description:
      'Compare 15+ bank loans and save lakhs on interest. Free calculator.',
    images: ['https://fincado.com/og-compare-loans.jpg'],
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

export default function CompareLoansPage() {
  // Structured Data - WebApplication Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Loan Comparison Calculator',
    url: 'https://fincado.com/compare-loans/',
    description:
      'Compare loan offers from multiple banks side-by-side. Calculate total interest, EMI differences, and find the best loan deal.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Side-by-side loan comparison',
      'Total interest calculation',
      'EMI difference visualization',
      'Processing fee comparison',
      'Bank-wise comparison',
    ],
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I compare two loan offers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use our loan comparison tool to enter the principal amount, interest rate, and tenure for both loans. The calculator will show you the EMI, total interest, and total payment for each loan side-by-side.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is 8.5% fixed better than 8.4% floating?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually, floating rates are better for long-term loans (like Home Loans) because they are cheaper and have no prepayment penalties. Fixed rates offer peace of mind but often come with a premium.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I switch my loan for a 0.25% difference?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! On a ₹50 Lakh loan for 20 years, a 0.25% difference saves you approximately ₹1.8 Lakhs. Check if the Balance Transfer fees eat up your savings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which banks offer the best loan rates in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As of 2026, SBI, HDFC, ICICI, Axis, and Kotak offer competitive rates. Home loan rates range from 8.40% to 9.50%, while personal loan rates vary from 10.50% to 18%. Use our comparison tool to check current rates.',
        },
      },
    ],
  };

  // HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compare Loan Offers',
    description:
      'Step-by-step guide to comparing loan offers from different banks',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter Loan 1 Details',
        text: 'Enter the principal amount, interest rate, and loan tenure for the first loan offer.',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter Loan 2 Details',
        text: 'Enter the same details for the second loan offer you want to compare.',
      },
      {
        '@type': 'HowToStep',
        name: 'Compare Results',
        text: 'Review the side-by-side comparison showing EMI, total interest, and total payment for both loans.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose the Best Option',
        text: 'Select the loan with the lowest total interest and best terms for your needs.',
      },
    ],
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Compare Loans', url: 'https://fincado.com/compare-loans/' },
        ]}
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* --- ENHANCED HEADER SECTION --- */}
        <header className="text-center max-w-4xl mx-auto my-12">
          <div className="relative bg-linear-to-br from-lime-50 via-emerald-50 to-teal-50/30 border border-lime-200/50 rounded-2xl p-8 overflow-hidden shadow-sm">
            {/* Decorative Elements */}
            <div className="absolute -right-8 -top-8 opacity-5">
              <Scale className="w-48 h-48 text-lime-600" />
            </div>
            <div className="absolute -left-8 -bottom-8 opacity-5">
              <GitCompare className="w-40 h-40 text-emerald-600" />
            </div>

            <div className="relative z-10">
              <Badge className="mb-4 bg-white text-lime-700 border-lime-300 px-4 py-1.5 font-bold uppercase tracking-wider shadow-sm">
                💰 Free Savings Tool
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Compare Loan Offers{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600">
                  & Save Lakhs
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto mb-6">
                Confused between two bank offers? Don&apos;t just compare the
                EMI. Use this tool to visualize the{' '}
                <strong className="text-slate-900 font-semibold">
                  total interest difference
                </strong>{' '}
                and discover which loan is actually cheaper over the long run.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
                {[
                  {
                    icon: Calculator,
                    label: '15+ Banks',
                    color: 'bg-blue-50 text-blue-700',
                  },
                  {
                    icon: CheckCircle2,
                    label: '100% Free',
                    color: 'bg-emerald-50 text-emerald-700',
                  },
                  {
                    icon: Sparkles,
                    label: 'Real-time Results',
                    color: 'bg-purple-50 text-purple-700',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.color} rounded-lg p-3 flex flex-col items-center gap-1`}
                  >
                    <stat.icon className="w-5 h-5" />
                    <span className="text-xs font-semibold">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <ShareTools title="Compare Loan Offers - Fincado" />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* --- LEFT COLUMN (Main Tool) --- */}
          <div className="lg:col-span-8 min-w-0 space-y-10">
            {/* 1. CALCULATOR CARD */}
            <Card className="border-slate-200 shadow-lg overflow-hidden bg-white">
              <CardHeader className="bg-linear-to-r from-lime-50 to-emerald-50 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lime-600 flex items-center justify-center shadow-md">
                    <Scale className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">
                      Side-by-Side Calculator
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Enter details for two different loans to see the breakdown
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <LoanComparison />

                {/* Smart Tip Box */}
                <div className="mt-6 flex items-start gap-3 p-4 bg-linear-to-r from-lime-50 to-emerald-50 border border-lime-200 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-lime-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-lime-900 mb-1">
                      💡 Smart Comparison Tip
                    </h4>
                    <p className="text-xs text-lime-800 leading-relaxed">
                      A lower EMI isn&apos;t always better. Sometimes a longer
                      tenure reduces your monthly payment but drastically
                      increases the{' '}
                      <strong className="font-semibold">Total Interest</strong>{' '}
                      you pay. Always check the total cost.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. AD SLOT */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
              <AdSlot id="compare-mid" type="leaderboard" label="Sponsored" />
            </div>

            {/* 3. COMPARISON GRID HUB (SEO ENGINE) */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-linear-to-br from-lime-100 to-emerald-100 rounded-xl shadow-sm">
                  <GitCompare className="w-6 h-6 text-lime-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Browse Popular Bank Comparisons
                  </h2>
                  <p className="text-sm text-slate-600">
                    90+ pre-calculated comparisons with 2026 rates
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 leading-relaxed">
                  Select any two banks to see a detailed breakdown of their 2026
                  interest rates, processing fees, prepayment charges, and
                  approval success rates.
                </p>
              </div>

              <ComparisonGrid />
            </section>

            {/* 4. FEATURES GRID */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingDown className="h-6 w-6 text-emerald-600" />
                What to Compare Before Choosing a Loan
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: PiggyBank,
                    color: 'text-emerald-600 bg-emerald-50',
                    title: 'Total Interest Payable',
                    desc: 'This is the real cost of the loan. Always aim for the lowest total interest, not just the lowest EMI.',
                  },
                  {
                    icon: AlertCircle,
                    color: 'text-amber-600 bg-amber-50',
                    title: 'Processing Fees & Charges',
                    desc: 'Some banks offer low rates but charge high processing fees (up to 1%). Factor this into your decision.',
                  },
                  {
                    icon: TrendingDown,
                    color: 'text-blue-600 bg-blue-50',
                    title: 'Prepayment & Foreclosure',
                    desc: 'Ensure your loan has zero foreclosure charges so you can pay it off early if you have extra cash.',
                  },
                  {
                    icon: Scale,
                    color: 'text-purple-600 bg-purple-50',
                    title: 'Repo Rate Linking (RLLR)',
                    desc: 'For home loans, ensure the rate is linked to the Repo Rate for transparency and fairness.',
                  },
                ].map((item, i) => (
                  <Card
                    key={i}
                    className="border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                  >
                    <CardContent className="p-5">
                      <div
                        className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 shadow-sm`}
                      >
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 text-base">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Internal Linking */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Related Loan Tools
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Home Loan Calculator', href: '/loans/home-loan/' },
                    { name: 'Car Loan Calculator', href: '/loans/car-loan/' },
                    {
                      name: 'Personal Loan Calculator',
                      href: '/loans/personal-loan/',
                    },
                    { name: 'EMI Calculator', href: '/emi-calculator/' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. FAQs */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-5">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {[
                  {
                    q: 'How do I compare two loan offers?',
                    a: 'Use our loan comparison tool above. Enter the principal amount, interest rate, and tenure for both loans. The calculator will show you the EMI, total interest, and total payment for each loan side-by-side.',
                  },
                  {
                    q: 'Is 8.5% fixed better than 8.4% floating?',
                    a: 'Usually, floating rates are better for long-term loans (like Home Loans) because they are cheaper and have no prepayment penalties. Fixed rates offer peace of mind but often come with a premium.',
                  },
                  {
                    q: 'Should I switch my loan for a 0.25% difference?',
                    a: 'Yes! On a ₹50 Lakh loan for 20 years, a 0.25% difference saves you approximately ₹1.8 Lakhs. Check if the Balance Transfer fees eat up your savings.',
                  },
                  {
                    q: 'Which banks offer the best loan rates in 2026?',
                    a: 'As of 2026, SBI, HDFC, ICICI, Axis, and Kotak offer competitive rates. Home loan rates range from 8.40% to 9.50%, while personal loan rates vary from 10.50% to 18%. Use our comparison tool to check current rates.',
                  },
                ].map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="bg-white border border-slate-200 rounded-lg px-5"
                  >
                    <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pt-2 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* --- RIGHT COLUMN (Sidebar) --- */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <FinancialNavWidget />

              {/* Quick Links */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 pb-4 border-b border-slate-100">
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <GitCompare className="w-4 h-4 text-lime-600" />
                    Popular Comparisons
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 p-0">
                  <ul className="divide-y divide-slate-100">
                    {[
                      { name: 'HDFC vs SBI', url: '/compare/hdfc-vs-sbi/' },
                      { name: 'ICICI vs Axis', url: '/compare/icici-vs-axis/' },
                      { name: 'Kotak vs BoB', url: '/compare/kotak-vs-bob/' },
                      { name: 'PNB vs Canara', url: '/compare/pnb-vs-canara/' },
                    ].map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.url}
                          className="flex items-center justify-between px-5 py-3 hover:bg-lime-50 transition-colors group"
                        >
                          <span className="text-sm font-medium text-slate-600 group-hover:text-lime-700">
                            {link.name}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-lime-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Sticky Ad */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center no-print">
                <AdSlot type="box" id="compare-sidebar" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
