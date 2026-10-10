// src/app/compare-loans/page.tsx
import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  Car,
  CheckCircle2,
  GitCompare,
  HelpCircle,
  Home,
  LayoutGrid,
  ListChecks,
  PiggyBank,
  Scale,
  TrendingDown,
  Wallet,
} from 'lucide-react';
import LoanComparison from '@/components/LoanComparison';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';
import ComparisonGrid, {
  COMPARISON_PAIR_COUNT,
} from '@/components/ComparisonGrid';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { banks } from '@/lib/banks';

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

type LinkItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  desc: string;
};

type FaqItem = {
  q: string;
  a: string;
};

/* Small pill used above every section heading */
function Eyebrow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
      <Icon className="h-3.5 w-3.5" /> {children}
    </p>
  );
}

const CARD =
  'rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-brand-500 hover:shadow-xl hover:shadow-slate-900/5';

const pageTitle = 'Loan Comparison Tool | Compare Home, Car & Personal Loans';

const comparisonFactors: FeatureItem[] = [
  {
    icon: PiggyBank,
    title: 'Total Interest Payable',
    desc: 'This is the real cost of the loan. Always aim for the lowest total interest, not just the lowest EMI.',
  },
  {
    icon: AlertCircle,
    title: 'Processing Fees & Charges',
    desc: 'Some banks offer low rates but charge high processing fees (up to 1%). Factor this into your decision.',
  },
  {
    icon: TrendingDown,
    title: 'Prepayment & Foreclosure',
    desc: 'Ensure your loan has zero foreclosure charges so you can pay it off early if you have extra cash.',
  },
  {
    icon: Scale,
    title: 'Repo Rate Linking (RLLR)',
    desc: 'For home loans, ensure the rate is linked to the Repo Rate for transparency and fairness.',
  }
];

const relatedTools: LinkItem[] = [
  { name: 'Home Loan Calculator', href: '/loans/home-loan/', icon: Home, desc: 'Affordability, EMI and tax benefit' },
  { name: 'Car Loan Calculator', href: '/loans/car-loan/', icon: Car, desc: 'EMI for new and used cars' },
  { name: 'Personal Loan Calculator', href: '/loans/personal-loan/', icon: Wallet, desc: 'EMI and total cost of borrowing' },
  { name: 'EMI Calculator', href: '/emi-calculator/', icon: Calculator, desc: 'Any loan, with repayment schedule' },
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
  title: pageTitle,
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
  authors: [{ name: 'Nitin Kaushik', url: 'https://fincado.com/about/' }],
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

      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {/* ── HERO ─────────────────────────────────────────── */}
        <header className="relative">
          <div className="relative mx-auto max-w-4xl pt-10 pb-12 text-center sm:pt-14">
            <Eyebrow icon={Scale}>Loan comparison tool</Eyebrow>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Compare two loan offers.{' '}
              <span className="rounded-lg bg-brand-300 px-2 box-decoration-clone">
                See which really costs less.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Confused between two bank offers? Don&apos;t just compare EMI.
              Put both loans side by side and see the{' '}
              <strong className="font-semibold text-slate-900">
                total interest difference
              </strong>{' '}
              over the full tenure.
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
              {[
                `${banks.length} lenders tracked`,
                'No sign-up required',
                'Free to use',
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* ── CALCULATOR ───────────────────────────────────── */}
        <section
          aria-labelledby="calculator-heading"
          className="w-full pb-16"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/5 sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-brand-400">
                  <Scale className="h-5 w-5" />
                </span>
                <div>
                  <h2
                    id="calculator-heading"
                    className="text-xl font-bold tracking-tight text-slate-900"
                  >
                    Side-by-side calculator
                  </h2>
                  <p className="text-sm text-slate-600">
                    Enter two loans to see the full cost of each.
                  </p>
                </div>
              </div>
              <div className="no-print">
                <ShareTools title="Compare Loan Offers - Fincado" />
              </div>
            </div>

            <LoanComparison />
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-500">
            A lower EMI isn&apos;t always the cheaper loan. A longer tenure
            reduces the monthly payment but can add lakhs in total interest, so
            compare total repayment and then check fees and prepayment terms.
          </p>
        </section>

        <div className="no-print mx-auto mb-16 flex w-full max-w-5xl justify-center">
          <AdSlot id="compare-mid" type="leaderboard" label="Sponsored" />
        </div>

        {/* ── WHAT TO COMPARE ──────────────────────────────── */}
        <section
          aria-labelledby="comparison-checklist-heading"
          className="rounded-3xl border border-slate-200 bg-white py-16"
        >
          <div className="px-4 sm:px-8 lg:px-12">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Eyebrow icon={ListChecks}>Beyond the EMI</Eyebrow>
              <h2
                id="comparison-checklist-heading"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                What to compare before choosing a loan
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                The headline rate is only one of four things that decide what a
                loan really costs you.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {comparisonFactors.map((item, index) => (
                <li key={item.title} className={`flex flex-col p-6 ${CARD}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-brand-400">
                      <item.icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-semibold text-slate-300 tabular-nums">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── BANK MATCHUPS ────────────────────────────────── */}
        <section
          aria-labelledby="popular-comparisons-heading"
          className="py-16"
        >
          <div>
            <div className="mb-10 max-w-2xl">
              <Eyebrow icon={GitCompare}>Head-to-head</Eyebrow>
              <h2
                id="popular-comparisons-heading"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Compare {COMPARISON_PAIR_COUNT} bank matchups
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Starting home loan rates for India&apos;s major lenders, paired
                against each other. The biggest rate gaps come first.
              </p>
            </div>

            <ComparisonGrid />
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section
          aria-labelledby="compare-loans-faqs"
          className="rounded-3xl border border-slate-200 bg-white py-16"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-8">
            <div className="mb-10 text-center">
              <Eyebrow icon={HelpCircle}>FAQ</Eyebrow>
              <h2
                id="compare-loans-faqs"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Frequently asked questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className="rounded-2xl border border-slate-200 bg-white px-6 last:border-b"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-slate-900 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── RELATED TOOLS ────────────────────────────────── */}
        <section
          aria-labelledby="related-tools-heading"
          className="py-16"
        >
          <div>
            <div className="mb-10 max-w-2xl">
              <Eyebrow icon={LayoutGrid}>Keep going</Eyebrow>
              <h2
                id="related-tools-heading"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Related loan tools
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTools.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-4 p-4 ${CARD}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-400 group-hover:text-slate-900">
                    <link.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {link.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {link.desc}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900" />
                </Link>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <FinancialNavWidget />
              </div>
              <div className="no-print flex min-h-62.5 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-4">
                <AdSlot type="box" id="compare-sidebar" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
