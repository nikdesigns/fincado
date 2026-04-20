// src/app/compare-loans/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  GitCompare,
  Info,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingDown,
} from 'lucide-react';
import LoanComparison from '@/components/LoanComparison';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';
import ComparisonGrid from '@/components/ComparisonGrid';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type StatItem = {
  icon: LucideIcon;
  label: string;
  color: string;
};

type FeatureItem = {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
};

type LinkItem = {
  name: string;
  href: string;
};

type FaqItem = {
  q: string;
  a: string;
};

const pageTitle = 'Loan Comparison Tool | Compare Home, Car & Personal Loans';

const stats: StatItem[] = [
  {
    icon: Calculator,
    label: '15+ Lenders',
    color: 'border border-slate-700 bg-white/10 text-slate-100 backdrop-blur-sm',
  },
  {
    icon: CheckCircle2,
    label: 'No Signup',
    color: 'border border-slate-700 bg-white/10 text-slate-100 backdrop-blur-sm',
  },
  {
    icon: Sparkles,
    label: 'Instant Analysis',
    color: 'border border-slate-700 bg-white/10 text-slate-100 backdrop-blur-sm',
  }
];

const comparisonFactors: FeatureItem[] = [
  {
    icon: PiggyBank,
    color: 'bg-brand-50 text-brand-700',
    title: 'Total Interest Payable',
    desc: 'This is the real cost of the loan. Always aim for the lowest total interest, not just the lowest EMI.',
  },
  {
    icon: AlertCircle,
    color: 'bg-slate-100 text-slate-700',
    title: 'Processing Fees & Charges',
    desc: 'Some banks offer low rates but charge high processing fees (up to 1%). Factor this into your decision.',
  },
  {
    icon: TrendingDown,
    color: 'bg-brand-50 text-brand-700',
    title: 'Prepayment & Foreclosure',
    desc: 'Ensure your loan has zero foreclosure charges so you can pay it off early if you have extra cash.',
  },
  {
    icon: Scale,
    color: 'bg-slate-100 text-slate-700',
    title: 'Repo Rate Linking (RLLR)',
    desc: 'For home loans, ensure the rate is linked to the Repo Rate for transparency and fairness.',
  }
];

const relatedTools: LinkItem[] = [
  { name: 'Home Loan Calculator', href: '/loans/home-loan/' },
  { name: 'Car Loan Calculator', href: '/loans/car-loan/' },
  { name: 'Personal Loan Calculator', href: '/loans/personal-loan/' },
  { name: 'EMI Calculator', href: '/emi-calculator/' }
];

const popularComparisons: LinkItem[] = [
  { name: 'HDFC vs SBI', href: '/compare/hdfc-vs-sbi/' },
  { name: 'ICICI vs Axis', href: '/compare/icici-vs-axis/' },
  { name: 'Kotak vs BoB', href: '/compare/kotak-vs-bob/' },
  { name: 'PNB vs Canara', href: '/compare/pnb-vs-canara/' }
];

const faqItems: FaqItem[] = [
  {
    q: 'How do I compare two loan offers?',
    a: 'Use our loan comparison tool above. Enter principal amount, interest rate, and tenure for both loans. The calculator shows EMI, total interest, and total payment side-by-side.',
  },
  {
    q: 'Is a fixed rate always better than a floating rate?',
    a: 'Not always. Floating rates can be lower over long tenures, while fixed rates provide payment certainty. Compare both options using total cost over full tenure.',
  },
  {
    q: 'Should I switch my loan for a 0.25% rate difference?',
    a: 'A 0.25% difference can save a large amount over long tenures. Calculate net savings after considering transfer, legal, and processing charges.',
  },
  {
    q: 'Which bank offers the best loan rate?',
    a: 'The best option depends on your profile, charges, and terms—not just headline interest rate. Compare effective cost, fees, and flexibility before choosing.',
  }
];

export const metadata: Metadata = {
  title: `${pageTitle} | Fincado`,
  description:
    'Compare loan offers from top banks side-by-side. Calculate EMI, total interest, total repayment, and key charges to find the most cost-effective loan.',
  keywords: [
    'loan comparison tool',
    'compare home loans',
    'compare car loans',
    'compare personal loans',
    'loan interest comparison',
    'emi comparison calculator',
    'cheapest home loan',
    'bank loan comparison india'
  ],
  authors: [{ name: 'Fincado Team' }],
  creator: 'Fincado',
  publisher: 'Fincado',
  alternates: {
    canonical: 'https://fincado.com/compare-loans/',
  },
  openGraph: {
    title: pageTitle,
    description:
      'Compare loan offers side-by-side and identify which option costs less over the full loan tenure.',
    url: 'https://fincado.com/compare-loans/',
    siteName: 'Fincado',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fincado Loan Comparison Tool',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description:
      'Compare bank loan offers and find the most affordable option with a side-by-side calculator.',
    images: ['https://fincado.com/og-image.png'],
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
      'Bank-wise comparison'
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compare Loan Offers',
    description:
      'Step-by-step guide to comparing loan offers from different banks.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter Loan 1 Details',
        text: 'Enter principal amount, interest rate, and loan tenure for the first loan offer.',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter Loan 2 Details',
        text: 'Enter the same fields for the second loan offer you want to compare.',
      },
      {
        '@type': 'HowToStep',
        name: 'Compare Results',
        text: 'Review side-by-side outputs including EMI, total interest, and total payment.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose the Better Option',
        text: 'Pick the option with lower effective cost after including one-time charges and flexibility.',
      }
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Compare Loans', url: 'https://fincado.com/compare-loans/' }
        ]}
      />

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
        <header className="mx-auto my-12 max-w-4xl text-center">
          <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-lg">
            <div className="absolute -right-8 -top-8 opacity-10">
              <Scale className="h-48 w-48 text-brand-300" />
            </div>
            <div className="absolute -bottom-8 -left-8 opacity-10">
              <GitCompare className="h-40 w-40 text-brand-300" />
            </div>

            <div className="relative z-10">
              <Badge className="mb-4 border border-brand-300 bg-brand-500/20 px-4 py-1.5 font-semibold tracking-wider text-brand-200 uppercase shadow-sm">
                Analyst Edition
              </Badge>

              <h1 className="mb-4 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Compare Loan Offers{' '}
                <span className="text-brand-300">
                  & Save Lakhs
                </span>
              </h1>

              <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Confused between two bank offers? Don&apos;t just compare EMI.
                Use this tool to visualize the{' '}
                <strong className="font-semibold text-white">
                  total interest difference
                </strong>{' '}
                and discover which option is actually cheaper over the long run.
              </p>

              <div className="mx-auto mb-6 grid max-w-2xl grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.color} flex flex-col items-center gap-1 rounded-lg p-3`}
                  >
                    <stat.icon className="h-5 w-5" />
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

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 space-y-10 lg:col-span-8">
            <Card className="compare-unique-card overflow-hidden border-slate-200 bg-white shadow-lg">
              <CardHeader className="border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 shadow-md">
                    <Scale className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      Side-by-Side Calculator
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Enter details for two different loans to see the full
                      breakdown.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <LoanComparison />

                <div className="compare-note-rail mt-6 flex items-start gap-3 rounded-lg border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900">
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="mb-1 text-sm font-semibold text-slate-900">
                      Smart Comparison Tip
                    </h2>
                    <p className="text-xs leading-relaxed text-slate-600">
                      A lower EMI isn&apos;t always better. Sometimes a longer
                      tenure reduces monthly payment but significantly increases
                      total interest paid.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 no-print">
              <AdSlot id="compare-mid" type="leaderboard" label="Sponsored" />
            </div>

            <section aria-labelledby="popular-comparisons-heading">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-slate-900 p-2.5 shadow-sm">
                  <GitCompare className="h-6 w-6 text-brand-300" />
                </div>
                <div>
                  <h2
                    id="popular-comparisons-heading"
                    className="text-2xl font-semibold text-slate-900"
                  >
                    Browse Popular Bank Comparisons
                  </h2>
                  <p className="text-sm text-slate-600">
                    Compare major lenders side-by-side using the latest values
                    available in the tool.
                  </p>
                </div>
              </div>

              <div className="compare-note-rail mb-6 flex items-start gap-3 rounded-lg border border-slate-200 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                <p className="text-sm leading-relaxed text-slate-600">
                  Compare interest rate, processing fees, prepayment terms, and
                  total repayment. This gives a more reliable decision than EMI
                  alone.
                </p>
              </div>

              <ComparisonGrid />
            </section>

            <section aria-labelledby="comparison-checklist-heading">
              <h2
                id="comparison-checklist-heading"
                className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900"
              >
                <TrendingDown className="h-6 w-6 text-brand-700" />
                What to Compare Before Choosing a Loan
              </h2>

              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {comparisonFactors.map((item) => (
                  <Card
                    key={item.title}
                    className="compare-stage-card compare-unique-card border-slate-200 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
                  >
                    <CardContent className="p-5">
                      <div
                        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${item.color} shadow-sm`}
                      >
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-base font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="compare-grid-shell rounded-xl border border-slate-200 p-6">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  Related Loan Tools
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedTools.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="compare-link-tile group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-brand-700 transition-all hover:border-brand-300 hover:bg-brand-50/50 hover:text-slate-900"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section aria-labelledby="compare-loans-faqs">
              <h2
                id="compare-loans-faqs"
                className="mb-5 text-2xl font-semibold text-slate-900"
              >
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqItems.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`item-${i}`}
                    className="compare-stage-card rounded-lg border border-slate-200 bg-white px-5"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-800 hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 leading-relaxed text-slate-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <FinancialNavWidget />

              <Card className="compare-unique-card border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 bg-slate-50 pb-4">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
                    <GitCompare className="h-4 w-4 text-brand-700" />
                    Popular Comparisons
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-0">
                  <ul className="divide-y divide-slate-100">
                    {popularComparisons.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="compare-link-tile group flex items-center justify-between px-5 py-3 transition-colors hover:bg-slate-50"
                        >
                          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                            {link.name}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-slate-900" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="no-print flex min-h-62.5 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <AdSlot type="box" id="compare-sidebar" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
