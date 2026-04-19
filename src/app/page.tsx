import type { Metadata } from 'next';
import React, { JSX } from 'react';
import Link from 'next/link';
import articlesData from '@/data/articles.json';
import AdSlot from '@/components/AdSlot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Activity,
  ArrowRight,
  Banknote,
  BarChart3,
  Briefcase,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  FileText,
  GitCompare,
  HomeIcon,
  PiggyBank,
  Receipt,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { getCurrentFiscalYear, getUpdatedForFYText } from '@/lib/fiscalYear';

export async function generateMetadata(): Promise<Metadata> {
  const fy = getCurrentFiscalYear();

  return {
    title: `Financial Calculators for India ${fy.shortYear} – EMI, SIP, Tax & Post Office | Fincado`,
    description: `Free financial calculators for India: EMI Prepayment, SIP, Income Tax, SCSS, KVP, POMIS, Brokerage, and Salary planning. Updated for FY ${fy.fullFormat}.`,
    keywords: [
      'financial calculators India',
      'EMI calculator India',
      'SIP calculator India',
      'income tax calculator India',
      'post office calculators',
      'brokerage calculator',
      `financial calculators FY ${fy.fullFormat}`,
      'Fincado',
    ],
    alternates: {
      canonical: 'https://fincado.com/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: 'https://fincado.com/',
      title: `Financial Calculators for India ${fy.shortYear} | Fincado`,
      description:
        'Calculate EMI, SIP returns, exact Income Tax, SCSS payouts, Capital Gains, and more with practical financial tools for Indian users.',
      siteName: 'Fincado',
      images: [
        {
          url: 'https://fincado.com/images/og/homepage-fincado-2026.webp',
          width: 1200,
          height: 630,
          alt: 'Fincado financial calculators for India',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Financial Calculators for India ${fy.shortYear} | Fincado`,
      description:
        'Free calculators for EMI, SIP, tax, post office schemes, and home loans in India.',
      images: ['https://fincado.com/images/og/homepage-fincado-2026.webp'],
    },
  };
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type ToolItem = {
  href: string;
  title: string;
  desc: string;
  icon: IconType;
  toneClass: string;
};

type MetricItem = {
  label: string;
  value: string;
  note: string;
};

type DecisionLane = {
  title: string;
  desc: string;
  href: string;
  cta: string;
  icon: IconType;
};

const FAQ_ITEMS = [
  {
    question: 'Which financial calculators are most useful for Indian users?',
    answer:
      'The most popular tools are the EMI Prepayment calculator to save loan interest, the SIP calculator for wealth creation, the Salary Calculator (CTC to In-Hand), and Post Office calculators like SCSS and KVP for safe returns.',
  },
  {
    question: 'Are these calculators updated for the current financial year?',
    answer:
      'Yes. Fincado updates calculators and content for the current financial year, including the latest Income Tax slabs, revised STT rates for Brokerage, and updated Post Office interest rates.',
  },
  {
    question: 'Can I use Fincado calculators without logging in?',
    answer:
      'Absolutely. Fincado is designed to be a friction-free experience. All calculators are 100% free to use and do not require account creation or email sign-ups.',
  },
  {
    question: 'What is the best way to get out of debt faster?',
    answer:
      'Use our EMI Prepayment Calculator. It shows you exactly how making a lumpsum part-payment or increasing your monthly EMI by a small amount can shave years off your loan tenure and save lakhs in interest.',
  },
];

const HERO_QUICK_ACTIONS = [
  {
    href: '/emi-prepayment-calculator/',
    label: 'EMI Prepayment Calculator',
    desc: 'Find the fastest path to cut loan tenure.',
  },
  {
    href: '/capital-gains-calculator/',
    label: 'Capital Gains Tax (12.5%)',
    desc: 'Estimate exact tax before you sell.',
  },
  {
    href: '/scss-calculator/',
    label: 'SCSS Calculator (8.2%)',
    desc: 'Plan safe quarterly retirement cashflow.',
  },
  {
    href: '/brokerage-calculator/',
    label: 'Brokerage Breakeven',
    desc: 'See net P&L after all charges.',
  },
];

const HERO_TRUST_POINTS = [
  '100% Free, No Login Required',
  'Aligned to current FY tax and compliance assumptions',
  'Built for Indian lending, tax, and investment workflows',
  'Readable breakdowns, not black-box outputs',
];

const METRICS: MetricItem[] = [
  {
    label: 'Decision Tools',
    value: '40+',
    note: 'Coverage across loans, tax, retirement, and trading.',
  },
  {
    label: 'Always-on Access',
    value: '24x7',
    note: 'Instant outputs with no sign-up barriers.',
  },
  {
    label: 'Current FY Focus',
    value: 'FY Ready',
    note: 'Updated assumptions for the active financial year.',
  },
  {
    label: 'Workflow Speed',
    value: '<60 sec',
    note: 'Most core estimates complete in under a minute.',
  },
];

const DECISION_LANES: DecisionLane[] = [
  {
    title: 'Borrow Better',
    desc: 'Model EMI, prepayment, and bank-to-bank offers before committing.',
    href: '/compare-loans/',
    cta: 'Compare Loan Offers',
    icon: Building2,
  },
  {
    title: 'Grow Capital',
    desc: 'Plan SIP, lumpsum, SWP, and long-term wealth targets with clarity.',
    href: '/sip-calculator/',
    cta: 'Start SIP Planning',
    icon: TrendingUp,
  },
  {
    title: 'Reduce Tax Drag',
    desc: 'Test salary, deductions, and regime scenarios before year-end.',
    href: '/income-tax-calculator/',
    cta: 'Optimize Tax',
    icon: FileText,
  },
  {
    title: 'Secure Retirement',
    desc: 'Evaluate SCSS, EPF, NPS, and income ladders for stable drawdown.',
    href: '/retirement-calculator/',
    cta: 'Plan Retirement',
    icon: Wallet,
  },
];

const ESSENTIAL_TOOLS: ToolItem[] = [
  {
    href: '/emi-calculator/',
    icon: Calculator,
    toneClass: 'bg-blue-50 text-blue-700',
    title: 'EMI Calculator',
    desc: 'Calculate monthly EMI, total interest, and repayment schedule with precision.',
  },
  {
    href: '/sip-calculator/',
    icon: TrendingUp,
    toneClass: 'bg-emerald-50 text-emerald-700',
    title: 'SIP Calculator',
    desc: 'Estimate long-horizon corpus from monthly investing with compounding.',
  },
  {
    href: '/income-tax-calculator/',
    icon: FileText,
    toneClass: 'bg-rose-50 text-rose-700',
    title: 'Income Tax Calculator',
    desc: 'Compare old vs new regime outputs to maximize in-hand income.',
  },
  {
    href: '/salary-calculator/',
    icon: Briefcase,
    toneClass: 'bg-indigo-50 text-indigo-700',
    title: 'Salary Calculator',
    desc: 'Convert CTC to monthly in-hand salary with PF and tax adjustments.',
  },
];

const DEBT_TOOLS: ToolItem[] = [
  {
    href: '/emi-prepayment-calculator/',
    icon: TrendingDown,
    toneClass: 'bg-emerald-50 text-emerald-700',
    title: 'EMI Prepayment Calculator',
    desc: 'Quantify savings from part-payments and higher EMI strategy.',
  },
  {
    href: '/loans/home-loan/',
    icon: HomeIcon,
    toneClass: 'bg-blue-50 text-blue-700',
    title: 'Home Loan Calculator',
    desc: 'Validate affordability, tenure, and monthly repayment comfort.',
  },
  {
    href: '/loans/car-loan/',
    icon: Target,
    toneClass: 'bg-amber-50 text-amber-700',
    title: 'Car Loan Calculator',
    desc: 'Set dealer-ready EMI ranges before final negotiation.',
  },
];

const SAFE_RETURN_TOOLS: ToolItem[] = [
  {
    href: '/scss-calculator/',
    icon: ShieldCheck,
    toneClass: 'bg-brand-50 text-brand-700',
    title: 'SCSS Calculator',
    desc: 'Model quarterly income from the Senior Citizen Savings Scheme.',
  },
  {
    href: '/pomis-calculator/',
    icon: Wallet,
    toneClass: 'bg-brand-50 text-brand-700',
    title: 'POMIS Calculator',
    desc: 'Estimate post office monthly income with confidence.',
  },
  {
    href: '/kvp-calculator/',
    icon: Clock,
    toneClass: 'bg-brand-50 text-brand-700',
    title: 'KVP Calculator',
    desc: 'Track money-doubling horizon and maturity timing exactly.',
  },
];

const TAX_TRADING_TOOLS: ToolItem[] = [
  {
    href: '/capital-gains-calculator/',
    icon: PiggyBank,
    toneClass: 'bg-purple-50 text-purple-700',
    title: 'Capital Gains Calculator',
    desc: 'Compute STCG/LTCG for stocks, mutual funds, and property.',
  },
  {
    href: '/brokerage-calculator/',
    icon: Activity,
    toneClass: 'bg-rose-50 text-rose-700',
    title: 'Brokerage Calculator',
    desc: 'See net breakeven after brokerage, STT, GST, and exchange fees.',
  },
  {
    href: '/rent-receipt-generator/',
    icon: Receipt,
    toneClass: 'bg-emerald-50 text-emerald-700',
    title: 'Rent Receipt Generator',
    desc: 'Generate instant printable receipts for HRA documentation.',
  },
];

const QUICK_COMPARISONS = [
  { b1: 'SBI', b2: 'HDFC', link: '/compare/sbi-vs-hdfc/' },
  { b1: 'HDFC', b2: 'ICICI', link: '/compare/hdfc-vs-icici/' },
  { b1: 'SBI', b2: 'Axis', link: '/compare/sbi-vs-axis/' },
  { b1: 'PNB', b2: 'BOB', link: '/compare/pnb-vs-bob/' },
];

const OPERATING_PRINCIPLES = [
  {
    title: 'Decision-First UX',
    desc: 'Every tool is structured around practical decisions, not formula memorization.',
    icon: Sparkles,
  },
  {
    title: 'Transparent Breakdown',
    desc: 'Outputs are paired with assumptions so users can validate and trust results.',
    icon: BarChart3,
  },
  {
    title: 'India-Specific Logic',
    desc: 'Lending, tax, and savings workflows reflect Indian market and policy context.',
    icon: Banknote,
  },
];

export default function Home(): JSX.Element {
  const featuredSlugs = [
    'sukanya-samriddhi-yojana-guide-2026',
    'elss-funds-guide-2026',
    'sovereign-gold-bond-sgb-guide',
    'health-insurance-buying-guide',
  ];

  const featuredGuides = articlesData.filter(
    (article) =>
      featuredSlugs.includes(article.slug) &&
      (article.language === 'en' || !article.language) &&
      !article.hidden,
  );

  const displayGuides =
    featuredGuides.length > 0
      ? featuredGuides.slice(0, 4)
      : articlesData
          .filter(
            (article) =>
              (article.language === 'en' || !article.language) &&
              !article.hidden,
          )
          .slice(0, 4);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Fincado',
        url: 'https://fincado.com/',
        logo: 'https://fincado.com/logo.png',
      },
      {
        '@type': 'WebSite',
        name: 'Fincado',
        url: 'https://fincado.com/',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="container pb-16 pt-6 sm:pt-8" id="main-content">
        <section
          className="relative mx-auto mt-6 grid max-w-6xl gap-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.15fr_0.85fr] md:p-10"
          aria-labelledby="hero-title"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-linear-to-br from-brand-200/70 to-transparent blur-3xl"
          />

          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-brand-400 bg-brand-50 font-semibold text-slate-800"
              >
                {getUpdatedForFYText()}
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-200 bg-slate-50 font-semibold text-slate-700"
              >
                Enterprise-grade planning stack
              </Badge>
            </div>

            <h1
              id="hero-title"
              className="text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-tight tracking-tight text-slate-900"
            >
              Financial Decision Infrastructure for Modern Indian Households
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Model loans, tax, salary, investments, and retirement in one
              place. Fincado helps you evaluate real trade-offs before you
              commit money.
            </p>

            <div className="mt-7 grid gap-2.5 text-sm font-medium text-slate-700 sm:grid-cols-2">
              {HERO_TRUST_POINTS.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-400 font-bold text-[#111827] transition-colors hover:bg-brand-500"
              >
                <Link href="/salary-calculator/">
                  Check In-Hand Salary <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-300"
              >
                <Link href="/emi-prepayment-calculator/">
                  Save Loan Interest
                </Link>
              </Button>
            </div>

            <div className="mt-8 w-full max-w-md">
              <AdSlot id="home-hero-ad" type="banner" />
            </div>
          </div>

          <aside className="relative z-10 grid gap-4">
            <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                  <Sparkles className="h-4 w-4 text-brand-700" /> Command Center
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                {HERO_QUICK_ACTIONS.map((action) => (
                  <QuickActionLink
                    key={action.href}
                    href={action.href}
                    label={action.label}
                    desc={action.desc}
                  />
                ))}
              </CardContent>
            </Card>

            <Card className="border-brand-200 bg-brand-50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Decision Tracks
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-slate-700">
                <TrackLink href="/compare-loans/" label="Borrowing" />
                <TrackLink
                  href="/income-tax-calculator/"
                  label="Tax Planning"
                />
                <TrackLink href="/sip-calculator/" label="Wealth Building" />
                <TrackLink href="/retirement-calculator/" label="Retirement" />
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="mt-18">
          <SectionHeader
            title="Choose Your Next Decision"
            description="Jump into the workflow that matches your immediate money decision."
          />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {DECISION_LANES.map((lane) => (
              <DecisionCard key={lane.title} lane={lane} />
            ))}
          </div>
        </section>

        <section className="mt-18">
          <SectionHeader
            title="Core Calculator Suite"
            description="The highest-usage models used daily by salaried users and families."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ESSENTIAL_TOOLS.map((tool) => (
              <EnterpriseToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        </section>

        <div className="my-14">
          <AdSlot id="home-mid-1" type="leaderboard" />
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeader
              title="Debt Management Desk"
              description="Plan borrowing with scenario clarity and compare lender options side by side."
              compact
            />
            <Button asChild variant="outline" className="bg-white">
              <Link href="/compare-loans/">
                Compare Bank Rates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DEBT_TOOLS.map((tool) => (
              <EnterpriseToolCard key={tool.href} tool={tool} />
            ))}
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_COMPARISONS.map((item) => (
              <ComparisonCard
                key={item.link}
                b1={item.b1}
                b2={item.b2}
                link={item.link}
              />
            ))}
          </div>
        </section>

        <section className="mt-18 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="lg:min-h-26">
              <SectionHeader
                title="Post Office & Safe Return Desk"
                description="Model conservative options with predictable cashflow outputs."
                compact
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-1">
              {SAFE_RETURN_TOOLS.map((tool) => (
                <EnterpriseToolCard key={tool.href} tool={tool} />
              ))}
            </div>
          </div>

          <div>
            <div className="lg:min-h-26">
              <SectionHeader
                title="Tax & Trading Desk"
                description="Understand charges, tax impact, and net take-home outcomes before execution."
                compact
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-1">
              {TAX_TRADING_TOOLS.map((tool) => (
                <EnterpriseToolCard key={tool.href} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <SectionHeader
              title="Featured Guides"
              description="Context-rich guides that support your calculator decisions."
              compact
            />
            <Button
              asChild
              variant="ghost"
              className="font-semibold text-emerald-700"
            >
              <Link href="/guides/">View all guides</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {displayGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="group block"
              >
                <Card className="h-full rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">
                      {guide.category || 'Guide'}
                    </span>
                  </div>
                  <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                    {guide.title}
                  </h3>
                  <p className="line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
                    {(guide.metaDescription || '')
                      .replace(/<[^>]+>/g, '')
                      .trim()}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeader
            title="Why This Feels Enterprise-Grade"
            description="The platform is designed to support repeatable, high-stakes money decisions."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {OPERATING_PRINCIPLES.map((item) => (
              <Card
                key={item.title}
                className="border-slate-200 bg-white shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <article className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Financial calculators that support real-world execution
            </h2>

            <div className="space-y-6 text-base font-medium leading-8 text-slate-700">
              <p>
                Financial tools create value only when they improve action
                quality. Most users are not searching for formulas first. They
                need clarity on affordability, tax impact, monthly cashflow, and
                long-term trade-offs before making decisions.
              </p>

              <p>
                Fincado is structured around these practical decisions.
                Borrowers can model EMI and prepayment outcomes, salaried users
                can compare regime impact, and investors can evaluate return
                paths with transparent assumptions.
              </p>

              <p>
                For low-risk planning, dedicated calculators for SCSS, POMIS,
                and KVP provide predictable cashflow visibility. For active
                market users, capital gains and brokerage tools highlight net
                outcomes after charges and taxes.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-16">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-slate-900">
                Frequently asked questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-medium leading-relaxed text-slate-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="my-16">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-[#081833] via-[#0b2142] to-[#12345f] px-6 py-10 shadow-2xl sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-12 -top-20 h-60 w-60 rounded-full bg-brand-400/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] bg-size-[22px_22px]" />

            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Decision Desk
                </div>

                <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Start with the calculator that matches your next money move.
                </h2>

                <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
                  Better outcomes come from comparing numbers before acting. Run
                  loan, investing, and tax scenarios in one workflow before you
                  commit.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-14 bg-brand-400 px-8 text-lg font-bold text-[#111827] shadow-lg shadow-brand-500/30 hover:bg-brand-300"
                  >
                    <Link href="/emi-calculator/">Calculate EMI</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 border-white/35 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-xs hover:bg-white/15"
                  >
                    <Link href="/sip-calculator/">Plan SIP</Link>
                  </Button>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Clock className="h-4 w-4 text-brand-300" />
                      Under 2 Minutes
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-200">
                      Most plans are modeled in one pass.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <ShieldCheck className="h-4 w-4 text-brand-300" />
                      No Signup Wall
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-200">
                      Compare outcomes without account friction.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Target className="h-4 w-4 text-brand-300" />
                      Action-Focused
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-200">
                      Outputs built for next-step decisions.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-200">
                  Popular Next Steps
                </p>

                <div className="mt-4 space-y-3">
                  <Link
                    href="/emi-prepayment-calculator/"
                    className="group flex items-center justify-between rounded-xl border border-white/15 bg-black/15 px-4 py-3 transition hover:border-brand-300 hover:bg-white/10"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Cut Loan Tenure
                      </div>
                      <div className="text-xs font-medium text-slate-300">
                        EMI Prepayment Calculator
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-200" />
                  </Link>

                  <Link
                    href="/income-tax-calculator/"
                    className="group flex items-center justify-between rounded-xl border border-white/15 bg-black/15 px-4 py-3 transition hover:border-brand-300 hover:bg-white/10"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Optimize Salary Tax
                      </div>
                      <div className="text-xs font-medium text-slate-300">
                        Income Tax Calculator
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-200" />
                  </Link>

                  <Link
                    href="/capital-gains-calculator/"
                    className="group flex items-center justify-between rounded-xl border border-white/15 bg-black/15 px-4 py-3 transition hover:border-brand-300 hover:bg-white/10"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Check Exit Tax Impact
                      </div>
                      <div className="text-xs font-medium text-slate-300">
                        Capital Gains Calculator
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-200" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function SectionHeader({
  title,
  description,
  compact = false,
}: {
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? '' : 'mb-6'}>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 font-medium text-slate-600">{description}</p>
    </div>
  );
}

function EnterpriseToolCard({ tool }: { tool: ToolItem }) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${tool.toneClass}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
        {tool.title}
      </h3>
      <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-slate-600">
        {tool.desc}
      </p>
    </Link>
  );
}

function QuickActionLink({
  href,
  label,
  desc,
}: {
  href: string;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all hover:border-brand-400 hover:shadow-sm"
    >
      <div className="font-bold text-slate-900 transition-colors group-hover:text-brand-700">
        {label}
      </div>
      <div className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
        {desc}
      </div>
    </Link>
  );
}

function TrackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-between rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-300"
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:text-brand-700" />
    </Link>
  );
}

function MetricCard({ label, value, note }: MetricItem) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
          {note}
        </p>
      </CardContent>
    </Card>
  );
}

function DecisionCard({ lane }: { lane: DecisionLane }) {
  const Icon = lane.icon;

  return (
    <Card className="group h-full border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{lane.title}</h3>
        <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-slate-600">
          {lane.desc}
        </p>
        <Link
          href={lane.href}
          className="mt-5 inline-flex items-center text-sm font-bold text-brand-700 transition group-hover:text-brand-900"
        >
          {lane.cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function ComparisonCard({
  b1,
  b2,
  link,
}: {
  b1: string;
  b2: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-[10px] font-bold text-slate-700 shadow-sm">
            {b1.slice(0, 1)}
          </div>
          <div className="z-0 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-brand-50 text-[10px] font-bold text-brand-700 shadow-sm">
            {b2.slice(0, 1)}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-brand-700">
            {b1} vs {b2}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Compare
          </span>
        </div>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-brand-200">
        <GitCompare className="h-4 w-4 text-slate-400 transition-colors group-hover:text-brand-900" />
      </div>
    </Link>
  );
}
