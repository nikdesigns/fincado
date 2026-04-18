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
  ArrowRight,
  Building2,
  FileText,
  GitCompare,
  ShieldCheck,
  TrendingUp,
  Calculator,
  Wallet,
  PiggyBank,
  TrendingDown,
  Landmark,
  Clock,
  Activity,
  Receipt,
  Briefcase,
  Target,
  HomeIcon,
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
      description: `Calculate EMI, SIP returns, exact Income Tax, SCSS payouts, Capital Gains, and more with practical financial tools for Indian users.`,
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
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://fincado.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="container py-8" id="main-content">
        {/* HERO SECTION */}
        <section
          className="mx-auto grid max-w-6xl gap-8 rounded-3xl border my-10 border-slate-200 bg-white px-6 py-10 shadow-sm md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-14"
          aria-labelledby="hero-title"
        >
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="bg-brand-50 font-semibold text-slate-800 border-brand-400"
              >
                {getUpdatedForFYText()}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 font-semibold text-blue-800 border-blue-200"
              >
                40+ Premium Tools
              </Badge>
            </div>

            <h1
              id="hero-title"
              className="text-[clamp(2.1rem,4vw,3.5rem)] font-semibold leading-tight tracking-tight text-slate-900"
            >
              India&apos;s Most Powerful Financial Calculators
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Plan your loans, investments, taxes, and retirement with
              precision. Fincado helps you estimate exact EMIs, Post Office
              payouts, Capital Gains, and in-hand salary without spreadsheets.
            </p>

            <ul className="mt-6 flex flex-wrap gap-5 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> No Login
                Required
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> SEBI / RBI
                Rules Updated
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-400 text-[#111827] font-bold hover:bg-brand-500 transition-colors"
              >
                <Link href="/salary-calculator/">Check In-Hand Salary</Link>
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

            {/* 💰 AD 1: HIGH VISIBILITY BELOW HERO BUTTONS */}
            <div className="mt-8 w-full max-w-md">
              <AdSlot id="home-hero-ad" type="banner" />
            </div>
          </div>

          <aside className="grid gap-4">
            <Card className="border-emerald-100 bg-brand-50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  🔥 Trending Right Now
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <QuickLink
                  href="/emi-prepayment-calculator/"
                  label="EMI Prepayment Calculator"
                  desc="Save lakhs by part-paying your loan."
                />
                <QuickLink
                  href="/capital-gains-calculator/"
                  label="Capital Gains Tax (12.5%)"
                  desc="Calculate exact tax on Stocks & MFs."
                />
                <QuickLink
                  href="/scss-calculator/"
                  label="SCSS Calculator (8.2%)"
                  desc="Senior Citizen guaranteed quarterly income."
                />
                <QuickLink
                  href="/brokerage-calculator/"
                  label="Brokerage Calculator"
                  desc="Find Intraday & Options breakeven points."
                />
              </CardContent>
            </Card>
          </aside>
        </section>

        {/* SECTION 1: MOST POPULAR */}
        <section className="mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-brand-700" /> The Essentials
            </h2>
            <p className="mt-1 text-slate-600 font-medium">
              Start with the most commonly used financial tools in India.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/emi-calculator/"
              icon={<Calculator className="w-6 h-6 text-blue-600" />}
              bgClass="bg-blue-50"
              title="EMI Calculator"
              desc="Calculate your exact monthly EMI, total interest, and repayment schedule."
            />
            <ToolCard
              href="/sip-calculator/"
              icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
              bgClass="bg-emerald-50"
              title="SIP Calculator"
              desc="Estimate long-term wealth creation from monthly mutual fund investments."
            />
            <ToolCard
              href="/income-tax-calculator/"
              icon={<FileText className="w-6 h-6 text-rose-600" />}
              bgClass="bg-rose-50"
              title="Income Tax Calculator"
              desc={`Compare Old vs New tax regimes to maximize your take-home pay.`}
            />
            <ToolCard
              href="/salary-calculator/"
              icon={<Briefcase className="w-6 h-6 text-indigo-600" />}
              bgClass="bg-indigo-50"
              title="Salary Calculator"
              desc="Convert your CTC into exact monthly In-Hand salary with PF/Tax breakdown."
            />
          </div>
        </section>

        <div className="my-14">
          <AdSlot id="home-mid-1" type="leaderboard" />
        </div>

        {/* SECTION 2: SMART LOANS & DEBT */}
        <section className="mt-14 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-slate-700" /> Smart Debt
                Management
              </h2>
              <p className="mt-1 text-slate-600 font-medium">
                Plan your borrowing and learn how to get out of debt faster.
              </p>
            </div>
            <Button asChild variant="outline" className="bg-white">
              <Link href="/compare-loans/">
                Compare Bank Rates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <ToolCard
              href="/emi-prepayment-calculator/"
              icon={<TrendingDown className="w-6 h-6 text-emerald-600" />}
              bgClass="bg-emerald-50"
              title="EMI Prepayment Calculator"
              desc="See how much interest you save by making lumpsum part-payments on your loan."
            />
            <ToolCard
              href="/loans/home-loan/"
              icon={<HomeIcon className="w-6 h-6 text-blue-600" />}
              bgClass="bg-blue-50"
              title="Home Loan Calculator"
              desc="Plan affordability, EMI limits, and tenure for housing loans."
            />
            <ToolCard
              href="/loans/car-loan/"
              icon={<Target className="w-6 h-6 text-amber-600" />}
              bgClass="bg-amber-50"
              title="Car Loan Calculator"
              desc="Calculate your exact monthly car payment before visiting the dealership."
            />
          </div>

          {/* Quick Comparisons */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ComparisonCard b1="SBI" b2="HDFC" link="/compare/sbi-vs-hdfc/" />
            <ComparisonCard
              b1="HDFC"
              b2="ICICI"
              link="/compare/hdfc-vs-icici/"
            />
            <ComparisonCard b1="SBI" b2="Axis" link="/compare/sbi-vs-axis/" />
            <ComparisonCard b1="PNB" b2="BOB" link="/compare/pnb-vs-bob/" />
          </div>
        </section>

        {/* SECTION 3: POST OFFICE & SAFE RETURNS */}
        <section className="mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-6 h-6 text-amber-600" /> Post Office & Safe
              Returns
            </h2>
            <p className="mt-1 text-slate-600 font-medium">
              Calculate guaranteed returns backed by the Government of India.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              href="/scss-calculator/"
              icon={<ShieldCheck className="w-6 h-6 text-brand-700" />}
              bgClass="bg-brand-50"
              title="SCSS Calculator"
              desc="Calculate guaranteed quarterly income for Senior Citizens at 8.2%."
            />
            <ToolCard
              href="/pomis-calculator/"
              icon={<Wallet className="w-6 h-6 text-brand-700" />}
              bgClass="bg-brand-50"
              title="POMIS Calculator"
              desc="Plan your monthly income from the Post Office MIS scheme at 7.4%."
            />
            <ToolCard
              href="/kvp-calculator/"
              icon={<Clock className="w-6 h-6 text-brand-700" />}
              bgClass="bg-brand-50"
              title="KVP Calculator"
              desc="Find the exact date your money will double under Kisan Vikas Patra."
            />
          </div>
        </section>

        {/* SECTION 4: TAX & TRADING */}
        <section className="mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-rose-600" /> Tax & Trading
              Utilities
            </h2>
            <p className="mt-1 text-slate-600 font-medium">
              Tools for active investors, traders, and salaried employees.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              href="/capital-gains-calculator/"
              icon={<PiggyBank className="w-6 h-6 text-purple-600" />}
              bgClass="bg-purple-50"
              title="Capital Gains Calculator"
              desc="Calculate STCG & LTCG on Stocks, Mutual Funds, and Real Estate."
            />
            <ToolCard
              href="/brokerage-calculator/"
              icon={<Activity className="w-6 h-6 text-rose-600" />}
              bgClass="bg-rose-50"
              title="Brokerage Calculator"
              desc="Find precise breakeven points for Intraday & Options after STT and Exchange fees."
            />
            <ToolCard
              href="/rent-receipt-generator/"
              icon={<Receipt className="w-6 h-6 text-emerald-600" />}
              bgClass="bg-emerald-50"
              title="Rent Receipt Generator"
              desc="Generate free, instantly printable PDFs to claim your HRA tax exemption."
            />
          </div>
        </section>

        {/* GUIDES SECTION */}
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Featured Guides
              </h2>
            </div>
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
                <Card className="h-full rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md bg-white">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 border border-brand-200">
                      {guide.category || 'Guide'}
                    </span>
                  </div>
                  <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                    {guide.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 font-medium">
                    {(guide.metaDescription || '')
                      .replace(/<[^>]+>/g, '')
                      .trim()}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* LONG-FORM SEO CONTENT */}
        <section className="mt-24">
          <article className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Financial calculators that help you make clearer decisions
            </h2>

            <div className="space-y-6 text-base leading-8 text-slate-700 font-medium">
              <p>
                A financial calculator is useful only when it helps you answer a
                real question. Most people do not need abstract formulas first —
                they need to know whether they can afford a home loan, how much
                <strong> In-Hand Salary</strong> they will receive after PF
                deductions, which tax regime saves more money, or how to get out
                of debt faster. Fincado is designed specifically around these
                practical decisions for Indian users.
              </p>

              <p>
                If you are borrowing, tools like our standard EMI calculator and
                the advanced <strong>EMI Prepayment Calculator</strong> show you
                the true cost of debt. By making strategic lumpsum
                part-payments, you can witness the power of reverse
                compounding—shaving years off your loan tenure and saving lakhs
                in interest.
              </p>

              <p>
                For conservative investors and retirees, navigating government
                schemes is crucial. Our dedicated tools for{' '}
                <strong>Post Office Schemes</strong>—including the SCSS
                Calculator (Senior Citizen Savings Scheme), POMIS (Monthly
                Income Scheme), and KVP (Kisan Vikas Patra)—help you map out
                guaranteed quarterly or monthly cash flows and exact maturity
                dates without the hassle of manual math.
              </p>

              <p>
                If you are an active investor or trader, the devil is in the
                details. Use the <strong>Capital Gains Tax Calculator</strong>{' '}
                to determine your exact STCG and LTCG liabilities under the new
                12.5% budget rules. For active market participants, our{' '}
                <strong>Brokerage Calculator</strong> breaks down STT, GST, and
                SEBI exchange fees to reveal your exact breakeven points for
                Intraday and F&O trading.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-16">
          <Card className="bg-white border-slate-200">
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
                    <AccordionContent className="text-slate-600 font-medium leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="my-16">
          <div className="rounded-3xl bg-slate-900 px-6 py-14 text-center shadow-xl sm:px-12 bg-[url('/images/noise.png')]">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              Start with the calculator that matches your next decision.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg font-medium">
              Borrowing, investing, tax planning, and retirement all improve
              when you can compare the exact numbers clearly before you act.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-400 text-[#111827] font-bold hover:bg-brand-500 h-14 px-8 text-lg"
              >
                <Link href="/emi-calculator/">Calculate EMI</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-500 text-white hover:bg-slate-800 h-14 px-8 text-lg bg-transparent"
              >
                <Link href="/sip-calculator/">Plan SIP</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* --- Helper Components --- */

function ToolCard({
  href,
  icon,
  bgClass,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  bgClass: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg group flex flex-col"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${bgClass} transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 font-medium flex-1">
        {desc}
      </p>
    </Link>
  );
}

function QuickLink({
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
      className="rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all hover:border-brand-400 hover:bg-white hover:shadow-sm group"
    >
      <div className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
        {label}
      </div>
      <div className="mt-1 text-xs leading-relaxed text-slate-500 font-medium">
        {desc}
      </div>
    </Link>
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
