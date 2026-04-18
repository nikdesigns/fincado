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
  ListChecks,
  HelpCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title:
    '30+ Free Financial Calculators for India | EMI, SIP, Tax & Retirement (2026)',
  description:
    "India's trusted financial calculator hub with 30+ free tools: EMI Calculator, SIP Calculator, Income Tax Calculator, Home Loan, PPF, Retirement Planning and more. Updated for FY 2026-27.",
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
    canonical: 'https://fincado.com/calculators/',
    languages: {
      hi: 'https://fincado.com/hi/calculators/',
      en: 'https://fincado.com/calculators/',
    },
  },
  openGraph: {
    title: '30+ Free Financial Calculators for India (2026)',
    description:
      'Free calculators for loans, investments, taxes and retirement planning. EMI, SIP, Home Loan, Income Tax and more. Updated for FY 2026-27.',
    url: 'https://fincado.com/calculators/',
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
      'EMI, SIP, Tax and Retirement calculators. Updated for FY 2026-27.',
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
};

export default function CalculatorsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://fincado.com/calculators/',
    name: '30+ Free Financial Calculators for India',
    description:
      'Complete suite of financial calculators for loans, investments, taxes and retirement planning. Updated for FY 2026-27.',
    url: 'https://fincado.com/calculators/',
    inLanguage: 'en-IN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
      name: 'Fincado',
      url: 'https://fincado.com/',
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
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
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
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
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
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Home Loan Calculator',
            url: 'https://fincado.com/loans/home-loan/',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
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
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          },
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What financial calculators are available on Fincado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fincado offers 30+ free calculators including EMI, SIP, Income Tax, Home Loan, PPF, Retirement, NPS and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these calculators free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All calculators are free to use and do not require registration.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate are the results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Calculators use standard formulas and up-to-date assumptions. Final numbers may vary by lender and policy details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which tools are most used?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most used tools are EMI Calculator, SIP Calculator, Income Tax Calculator and Home Loan Calculator.',
        },
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Fincado',
    url: 'https://fincado.com/',
    logo: 'https://fincado.com/logo.png',
    description:
      'Financial planning platform with free calculators for loans, investments and retirement.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Maharashtra',
    },
    sameAs: ['https://twitter.com/fincado', 'https://facebook.com/fincado'],
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 min-w-0 space-y-12 mt-12">
            <header className="relative bg-linear-to-br from-brand-50 via-brand-50 to-brand-50 rounded-3xl p-8 border border-brand-200 shadow-lg overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-700 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white border-brand-300 text-brand-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm">
                      30+ Free Tools
                    </Badge>
                    <Badge className="bg-brand-700 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <BadgeCheck className="w-3 h-3" />
                      FY 2026-27
                    </Badge>
                  </div>
                  <div className="no-print">
                    <LanguageToggle path="/hi/calculators" />
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4 leading-tight">
                  Financial Calculators for India
                </h1>

                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl mb-8">
                  Professional calculators for <strong>Loans</strong>,{' '}
                  <strong>Investments</strong>, <strong>Tax Planning</strong>,
                  and <strong>Retirement</strong>. Free to use, easy to compare,
                  and designed for Indian users.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Shield,
                      label: 'Bank-Grade Formulas',
                      color: 'text-brand-700 bg-brand-100',
                    },
                    {
                      icon: Zap,
                      label: 'Instant Results',
                      color: 'text-amber-600 bg-amber-100',
                    },
                    {
                      icon: Users,
                      label: 'Used by Indian Planners',
                      color: 'text-brand-700 bg-brand-100',
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

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-brand-700" />
                  Jump to section
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-2 text-sm">
                <Link
                  className="text-blue-600 hover:underline font-medium"
                  href="#all-calculators"
                >
                  All calculators
                </Link>
                <Link
                  className="text-blue-600 hover:underline font-medium"
                  href="#popular-tools"
                >
                  Popular tools
                </Link>
                <Link
                  className="text-blue-600 hover:underline font-medium"
                  href="#loan-calculators"
                >
                  Loan calculators
                </Link>
                <Link
                  className="text-blue-600 hover:underline font-medium"
                  href="#investment-calculators"
                >
                  Investment calculators
                </Link>
                <Link
                  className="text-blue-600 hover:underline font-medium"
                  href="#hub-faqs"
                >
                  FAQs
                </Link>
              </CardContent>
            </Card>

            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden">
              <AdSlot id="calc-hub-top" type="leaderboard" />
            </div>

            <section id="all-calculators" className="scroll-mt-24">
              <CalculatorsGrid />
            </section>

            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden my-8">
              <AdSlot id="calc-hub-mid" type="leaderboard" />
            </div>

            <article className="prose prose-slate prose-lg max-w-none">
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-slate-900">
                <LineChart className="h-7 w-7 text-brand-700" />
                Why use financial calculators?
              </h2>
              <p className="text-slate-600">
                Financial calculators help you compare outcomes before making
                money decisions. Whether you are planning{' '}
                <Link
                  href="/emi-calculator/"
                  className="text-brand-700 hover:text-brand-900 font-semibold"
                >
                  EMIs
                </Link>
                , monthly{' '}
                <Link
                  href="/sip-calculator/"
                  className="text-brand-700 hover:text-brand-900 font-semibold"
                >
                  SIPs
                </Link>
                , or{' '}
                <Link
                  href="/income-tax-calculator/"
                  className="text-brand-700 hover:text-brand-900 font-semibold"
                >
                  tax outgo
                </Link>
                , a calculator gives consistency and removes guesswork.
              </p>

              <Card className="my-8 border-slate-200 bg-linear-to-br from-brand-50 to-teal-50 not-prose">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest">
                        The Power of Compounding
                      </h3>
                      <p className="text-xs text-slate-600">
                        See how regular investing grows over long periods
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-inner min-h-62.5">
                    <div className="flex items-end justify-between gap-2 h-48">
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
                          <div className="relative w-full flex flex-col items-center">
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              <div className="bg-slate-900 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                {bar.value}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                              </div>
                            </div>

                            <div
                              className="w-full bg-linear-to-t from-brand-700 via-brand-500 to-brand-300 rounded-t-lg transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:from-brand-900 hover:via-brand-700 hover:to-brand-500"
                              style={{ height: `${bar.h * 1.92}px` }}
                            />
                          </div>

                          <span className="text-xs text-slate-600 font-semibold">
                            {bar.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                      <span className="text-xs text-slate-500">
                        Investment Growth
                      </span>
                      <span className="text-xs text-slate-400">
                        Hover to see values
                      </span>
                    </div>
                  </div>

                  <p className="text-center text-xs text-slate-600 mt-4 leading-relaxed">
                    Example: Monthly SIP of ₹10,000 at 12% annual returns.
                    <span className="font-semibold text-brand-900">
                      {' '}
                      Compounding rewards discipline.
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card
                id="popular-tools"
                className="my-8 border-brand-200 bg-white not-prose shadow-lg scroll-mt-24"
              >
                <CardHeader className="bg-linear-to-r from-brand-50 to-teal-50 border-b border-brand-100">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-700" />
                    Quick access: most popular tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      {
                        name: 'Compare Loan Rates',
                        url: '/compare-loans/',
                        label: 'Save on interest',
                        highlight: true,
                      },
                      {
                        name: 'Income Tax Calculator',
                        url: '/income-tax-calculator/',
                        label: 'New vs old regime',
                      },
                      {
                        name: 'SIP Calculator',
                        url: '/sip-calculator/',
                        label: 'Monthly wealth plan',
                      },
                      {
                        name: 'Home Loan Calculator',
                        url: '/loans/home-loan/',
                        label: 'Housing EMI planning',
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
                              ? 'bg-brand-50 border-brand-300 hover:border-brand-500 hover:shadow-lg'
                              : 'bg-slate-50 border-slate-200 hover:border-brand-300 hover:bg-brand-50'
                          }`}
                        >
                          <div>
                            <span
                              className={`block font-semibold text-sm group-hover:text-brand-900 transition-colors ${
                                item.highlight
                                  ? 'text-brand-900'
                                  : 'text-slate-900'
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="block text-xs text-slate-500 mt-0.5">
                              {item.label}
                            </span>
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <h2
                id="loan-calculators"
                className="text-2xl font-semibold text-slate-900 mt-12 scroll-mt-24"
              >
                How EMI & loan calculators help
              </h2>
              <p className="text-slate-600 mb-6">
                Loan calculators show how rate and tenure affect monthly EMI and
                total interest. Shorter tenures reduce interest but increase
                EMI, while longer tenures ease cash flow at a higher overall
                cost. Use our{' '}
                <Link
                  href="/compare-loans/"
                  className="text-brand-700 hover:text-brand-900 font-semibold"
                >
                  loan comparison tool
                </Link>{' '}
                to evaluate lenders side-by-side.
              </p>

              <div className="bg-linear-to-r from-brand-50 to-teal-50 border-l-4 border-brand-500 p-5 rounded-r-xl not-prose mb-8 shadow-sm">
                <h4 className="font-semibold text-brand-900 mb-2 flex items-center gap-2 text-base">
                  <CheckCircle2 className="h-5 w-5" /> Pro Tip
                </h4>
                <p className="text-sm text-brand-700 leading-relaxed">
                  Always compare{' '}
                  <strong>&ldquo;Total Interest Payable&rdquo;</strong> along
                  with EMI. Even a small reduction in interest rate can save
                  lakhs over long tenures.
                </p>
              </div>

              <h2
                id="investment-calculators"
                className="text-2xl font-semibold text-slate-900 mt-12 scroll-mt-24"
              >
                Investment & retirement calculators
              </h2>
              <p className="text-slate-600 mb-6">
                Plan long-term goals with{' '}
                <Link
                  href="/sip-calculator/"
                  className="text-brand-700 hover:text-brand-900 font-semibold"
                >
                  SIP
                </Link>
                ,{' '}
                <Link
                  href="/ppf-calculator/"
                  className="text-brand-700 hover:text-brand-900 font-semibold"
                >
                  PPF
                </Link>
                , and{' '}
                <Link
                  href="/retirement-calculator/"
                  className="text-brand-700 hover:text-brand-900 font-semibold"
                >
                  retirement
                </Link>{' '}
                calculators. These tools help estimate monthly contributions and
                goal timelines with realistic assumptions.
              </p>

              <section id="hub-faqs" className="not-prose mt-10 scroll-mt-24">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                  Frequently asked questions
                </h3>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <AccordionItem value="faq-1" className="border-none px-4">
                    <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline py-3 text-sm">
                      Are all calculators free?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                      Yes. All calculators are free, and no sign-up is required.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2" className="border-none px-4">
                    <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline py-3 text-sm">
                      Can I use these for final bank decisions?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                      Use them for planning and comparison. Final sanction
                      terms, fees, and rates depend on lender policy and your
                      profile.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3" className="border-none px-4">
                    <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline py-3 text-sm">
                      Which calculator should I start with?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                      Start with EMI calculator for debt planning, SIP
                      calculator for investing, and income tax calculator for
                      annual tax planning.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <Separator className="my-8" />
              <LegalNote />
            </article>

            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden mt-8">
              <AdSlot id="calc-hub-bottom" type="leaderboard" />
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8 mb-12">
            <div className="sticky top-24 space-y-8">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white min-h-62.5 flex items-center justify-center no-print">
                <AdSlot id="calc-hub-sidebar" type="box" />
              </div>
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
