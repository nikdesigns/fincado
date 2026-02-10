import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorsGrid from './CalculatorsGrid';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import LanguageToggle from '@/components/LanguageToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  ArrowRight,
  LineChart,
  BadgeCheck,
  TrendingUp,
  Shield,
  Zap,
  Users,
} from 'lucide-react';

// --- 1. ENHANCED SEO METADATA (2026 Best Practices) ---
export const metadata: Metadata = {
  title:
    '30+ Free Financial Calculators for India | EMI, SIP, Tax & Retirement (2026)',
  description:
    "India's most trusted financial calculator hub with 30+ free tools: EMI Calculator, SIP Calculator, Income Tax Calculator, Home Loan, PPF, Retirement Planning & more. Updated for Budget 2026 & FY 2026-27.",
  keywords: [
    'financial calculators india',
    'EMI calculator',
    'SIP calculator',
    'home loan calculator',
    'income tax calculator 2026',
    'retirement calculator',
    'loan calculators',
    'investment calculators',
    'PPF calculator',
    'NPS calculator',
    'inflation calculator india',
    'budget 2026 calculators',
    'FY 2026-27 tax calculator',
  ],
  authors: [{ name: 'Fincado Team' }],
  creator: 'Fincado',
  publisher: 'Fincado',
  alternates: {
    canonical: 'https://fincado.com/calculators',
    languages: {
      hi: 'https://fincado.com/hi/calculators',
      en: 'https://fincado.com/calculators',
    },
  },
  openGraph: {
    title: '30+ Free Financial Calculators for India (2026)',
    description:
      'Free calculators for loans, investments, taxes and retirement planning. EMI, SIP, Home Loan, Income Tax & more. Verified for FY 2026-27.',
    url: 'https://fincado.com/calculators',
    siteName: 'Fincado',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://fincado.com/og-calculators.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '30+ Free Financial Calculators for India',
    description:
      'EMI, SIP, Tax & Retirement calculators. Updated for Budget 2026.',
    images: ['https://fincado.com/og-calculators.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function CalculatorsPage() {
  // Structured Data - CollectionPage Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://fincado.com/calculators',
    name: '30+ Free Financial Calculators for India',
    description:
      'Complete suite of financial calculators for loans, investments, taxes and retirement planning. Updated for FY 2026-27.',
    url: 'https://fincado.com/calculators',
    inLanguage: 'en-IN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
      name: 'Fincado',
      url: 'https://fincado.com',
    },
    about: {
      '@type': 'Thing',
      name: 'Financial Planning',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'EMI Calculator',
            url: 'https://fincado.com/emi-calculator/',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'SIP Calculator',
            url: 'https://fincado.com/sip-calculator/',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Income Tax Calculator',
            url: 'https://fincado.com/income-tax-calculator/',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Home Loan Calculator',
            url: 'https://fincado.com/home-loan-calculator/',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Retirement Calculator',
            url: 'https://fincado.com/retirement-calculator/',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
          },
        },
      ],
    },
  };

  // FAQ Schema for Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What financial calculators are available on Fincado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fincado offers 30+ free financial calculators including EMI Calculator, SIP Calculator, Income Tax Calculator, Home Loan Calculator, PPF Calculator, Retirement Planner, NPS Calculator, and many more for loans, investments, and tax planning.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these calculators free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all calculators on Fincado are 100% free to use with no registration required. They are updated regularly with the latest interest rates and tax regulations for FY 2026-27.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate are the calculator results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our calculators use bank-grade formulas and are updated with the latest Budget 2026 regulations, RBI rates, and tax slabs to ensure accurate results. However, final figures may vary based on individual bank policies and terms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is the most popular calculator on Fincado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The EMI Calculator and SIP Calculator are our most popular tools, followed by the Income Tax Calculator and Home Loan Calculator. These help users plan their monthly payments and investment returns effectively.',
        },
      },
    ],
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Fincado',
    url: 'https://fincado.com',
    logo: 'https://fincado.com/logo.png',
    description:
      "India's most comprehensive financial planning platform with free calculators for loans, investments, and retirement.",
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Maharashtra',
    },
    sameAs: ['https://twitter.com/fincado', 'https://facebook.com/fincado'],
  };

  return (
    <>
      {/* ✅ BREADCRUMB STRUCTURED DATA */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators' },
        ]}
      />

      {/* ✅ COLLECTION PAGE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* ✅ FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ ORGANIZATION SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* -------- MAIN CONTENT (Left Column) -------- */}
          <div className="lg:col-span-8 min-w-0 space-y-12 mt-12">
            {/* --- HERO HEADER --- */}
            <header className="relative bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 border border-emerald-200 shadow-lg overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white border-emerald-300 text-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
                      30+ Free Tools
                    </Badge>
                    <Badge className="bg-emerald-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <BadgeCheck className="w-3 h-3" />
                      Budget 2026
                    </Badge>
                  </div>
                  <div className="no-print">
                    <LanguageToggle path="/hi/calculators" />
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                  Financial Calculators for India
                </h1>

                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl mb-8">
                  Professional-grade calculators for <strong>Loans</strong>,{' '}
                  <strong>Investments</strong>, <strong>Tax Planning</strong>,
                  and <strong>Retirement</strong>. All free, accurate, and
                  updated for <strong>FY 2026-27</strong>.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Shield,
                      label: 'Bank-Grade Accuracy',
                      color: 'text-blue-600 bg-blue-100',
                    },
                    {
                      icon: Zap,
                      label: 'Instant Results',
                      color: 'text-amber-600 bg-amber-100',
                    },
                    {
                      icon: Users,
                      label: 'Trusted by 1M+ Users',
                      color: 'text-emerald-600 bg-emerald-100',
                    },
                  ].map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white shadow-sm"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center`}
                      >
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            {/* Top Ad */}
            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden">
              <AdSlot id="calc-hub-top" type="leaderboard" />
            </div>

            {/* --- CALCULATORS GRID COMPONENT --- */}
            <section>
              <CalculatorsGrid />
            </section>

            {/* Mid Ad */}
            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden my-8">
              <AdSlot id="calc-hub-mid" type="leaderboard" />
            </div>

            {/* --- SEO CONTENT SECTION --- */}
            <article className="prose prose-slate prose-lg max-w-none">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                <LineChart className="h-7 w-7 text-emerald-600" />
                Why Use Financial Calculators?
              </h2>
              <p className="text-slate-600">
                Financial calculators help you make informed money decisions by
                visualizing real outcomes. Whether you are comparing{' '}
                <Link
                  href="/emi-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  EMIs
                </Link>
                , planning{' '}
                <Link
                  href="/sip-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  investments
                </Link>
                , or estimating{' '}
                <Link
                  href="/inflation-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  inflation impact
                </Link>
                , calculators remove guesswork and provide mathematical
                certainty.
              </p>

              {/* ✅ VISUAL: Compounding Growth Chart (Fixed) */}
              <Card className="my-8 border-slate-200 bg-linear-to-br from-emerald-50 to-teal-50 not-prose">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                        The Power of Compounding
                      </h3>
                      <p className="text-xs text-slate-600">
                        See how investments grow exponentially over time
                      </p>
                    </div>
                  </div>

                  {/* Chart Container with proper min-height */}
                  <div className="bg-white rounded-xl p-6 shadow-inner min-h-62.5">
                    <div className="flex items-end justify-between gap-2 h-48">
                      {/* Bars representing exponential growth */}
                      {[
                        { h: 15, label: 'Y1', value: '₹1.5L' },
                        { h: 22, label: 'Y3', value: '₹3.2L' },
                        { h: 32, label: 'Y5', value: '₹5.8L' },
                        { h: 45, label: 'Y10', value: '₹12.5L' },
                        { h: 60, label: 'Y15', value: '₹24.2L' },
                        { h: 78, label: 'Y20', value: '₹45.8L' },
                        { h: 92, label: 'Y25', value: '₹78.5L' },
                        { h: 100, label: 'Y30', value: '₹1.2Cr' },
                      ].map((bar, i) => (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-2 group"
                        >
                          {/* Tooltip on hover */}
                          <div className="relative w-full flex flex-col items-center">
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              <div className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                {bar.value}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                              </div>
                            </div>

                            {/* Bar */}
                            <div
                              className="w-full bg-linear-to-t from-emerald-600 via-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-500"
                              style={{ height: `${bar.h * 1.92}px` }}
                            />
                          </div>

                          {/* Label */}
                          <span className="text-xs text-slate-600 font-semibold">
                            {bar.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Y-axis labels */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                      <span className="text-xs text-slate-500">
                        Investment Growth
                      </span>
                      <span className="text-xs text-slate-400">
                        Hover to see values
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-center text-xs text-slate-600 mt-4 leading-relaxed">
                    Example: Monthly SIP of ₹10,000 at 12% annual returns.
                    <span className="font-semibold text-emerald-700">
                      {' '}
                      Compound interest makes your money work for you!
                    </span>
                  </p>
                </CardContent>
              </Card>

              {/* Quick Links Card with Internal Linking */}
              <Card className="my-8 border-emerald-200 bg-white not-prose shadow-lg">
                <CardHeader className="bg-linear-to-rrom-emerald-50 to-teal-50 border-b border-emerald-100">
                  <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-600" />
                    Quick Access: Most Popular Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      {
                        name: 'Compare Loan Rates',
                        url: '/compare-loans/',
                        label: 'Save on Interest',
                        highlight: true,
                      },
                      {
                        name: 'Income Tax Calculator',
                        url: '/income-tax-calculator/',
                        label: 'New vs Old Regime',
                      },
                      {
                        name: 'SIP Calculator',
                        url: '/sip-calculator/',
                        label: 'Grow wealth monthly',
                      },
                      {
                        name: 'Home Loan Calculator',
                        url: '/home-loan-calculator/',
                        label: 'Plan housing loan',
                      },
                      {
                        name: 'Retirement Planner',
                        url: '/retirement-calculator/',
                        label: 'Long-term security',
                      },
                      {
                        name: 'Inflation Calculator',
                        url: '/inflation-calculator/',
                        label: 'Protect purchasing power',
                      },
                    ].map((item) => (
                      <li key={item.url}>
                        <Link
                          href={item.url}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all group ${
                            item.highlight
                              ? 'bg-emerald-50 border-emerald-300 hover:border-emerald-500 hover:shadow-lg'
                              : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                          }`}
                        >
                          <div>
                            <span
                              className={`block font-bold text-sm group-hover:text-emerald-700 transition-colors ${
                                item.highlight
                                  ? 'text-emerald-700'
                                  : 'text-slate-900'
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="block text-xs text-slate-500 mt-0.5">
                              {item.label}
                            </span>
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <h2
                id="loan-calculators"
                className="text-2xl font-bold text-slate-900 mt-12"
              >
                How EMI & Loan Calculators Help
              </h2>
              <p className="text-slate-600 mb-6">
                <Link
                  href="/loans/home-loan/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Loan calculators
                </Link>{' '}
                show how interest rate and tenure affect your monthly EMI and
                total interest. Shorter tenures reduce interest but increase
                EMI, while longer tenures improve cash flow at a higher total
                cost. Use our{' '}
                <Link
                  href="/compare-loans/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  loan comparison tool
                </Link>{' '}
                to find the best rates.
              </p>

              <div className="bg-linear-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-5 rounded-r-xl not-prose mb-8 shadow-sm">
                <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2 text-base">
                  <CheckCircle2 className="h-5 w-5" /> Pro Tip
                </h4>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Always check the{' '}
                  <strong>&ldquo;Total Interest Payable&quot;</strong> field in
                  our calculators. Small changes in interest rates can save you
                  lakhs over 20 years. A 0.5% rate reduction on a ₹50L home loan
                  saves ₹5-6 lakhs!
                </p>
              </div>

              <h2
                id="investment-calculators"
                className="text-2xl font-bold text-slate-900 mt-12"
              >
                Investment & Retirement Calculators
              </h2>
              <p className="text-slate-600 mb-6">
                Plan your financial future with our{' '}
                <Link
                  href="/sip-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  SIP Calculator
                </Link>
                ,{' '}
                <Link
                  href="/ppf-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  PPF Calculator
                </Link>
                , and{' '}
                <Link
                  href="/retirement-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Retirement Planner
                </Link>
                . These tools help you understand the power of compounding and
                determine how much you need to invest monthly to reach your
                financial goals.
              </p>

              <Separator className="my-8" />
              <LegalNote />
            </article>

            {/* Bottom Ad */}
            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden mt-8">
              <AdSlot id="calc-hub-bottom" type="leaderboard" />
            </div>
          </div>

          {/* -------- SIDEBAR (Right Column) -------- */}
          <aside className="lg:col-span-4 space-y-8 mb-12">
            <div className="sticky top-24 space-y-8">
              {/* Sidebar Ad */}
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white min-h-62.5 flex items-center justify-center no-print">
                <AdSlot id="calc-hub-sidebar" type="box" />
              </div>

              {/* Financial Nav Widget */}
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
