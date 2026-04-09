import type { Metadata } from 'next';
import React, { JSX } from 'react';
import Link from 'next/link';
import articlesData from '@/data/articles.json';
import Icon, { IconName } from '@/components/Icon';
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
} from 'lucide-react';
import {
  getCurrentFiscalYear,
  getBudgetYearText,
  getUpdatedForFYText,
} from '@/lib/fiscalYear';

export async function generateMetadata(): Promise<Metadata> {
  const fy = getCurrentFiscalYear();

  return {
    title: `Financial Calculators for India ${fy.shortYear} – EMI, SIP, Tax & Retirement | Fincado`,
    description: `Free financial calculators for India: EMI, SIP, income tax, PPF, EPF, inflation, retirement and home loan planning. Built for Indian users and updated for FY ${fy.fullFormat}.`,
    keywords: [
      'financial calculators India',
      'EMI calculator India',
      'SIP calculator India',
      'income tax calculator India',
      'retirement calculator India',
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
      description: `Calculate EMI, SIP returns, income tax, retirement corpus, inflation impact, and more with practical financial tools for Indian users.`,
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
        'Free calculators for EMI, SIP, tax, inflation, retirement and home loans in India.',
      images: ['https://fincado.com/images/og/homepage-fincado-2026.webp'],
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which financial calculators are most useful for Indian users?',
    answer:
      'The most commonly used tools are EMI calculators, SIP calculators, income tax calculators, retirement planners, PPF calculators, inflation calculators, and home loan affordability calculators.',
  },
  {
    question: 'Are these calculators updated for the current financial year?',
    answer:
      'Yes. Fincado updates calculators and content for the current financial year, including tax planning, retirement assumptions, and loan planning use cases.',
  },
  {
    question: 'Can I use Fincado calculators without logging in?',
    answer:
      'Yes. Fincado calculators are free to use and do not require account creation for core calculations.',
  },
  {
    question: 'What should I use first: EMI calculator or SIP calculator?',
    answer:
      'Use an EMI calculator if you are planning a loan or balance transfer. Use a SIP calculator if your goal is long-term investing, retirement, or wealth creation.',
  },
];

export default function Home(): JSX.Element {
  const fy = getCurrentFiscalYear();

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
        <section
          className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-14"
          aria-labelledby="hero-title"
        >
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="bg-[#F7FDF1] font-semibold text-slate-800"
              >
                {getUpdatedForFYText()}
              </Badge>
              <Badge
                variant="outline"
                className="bg-[#F7FDF1] font-semibold text-slate-800"
              >
                Verified for {getBudgetYearText()}
              </Badge>
            </div>

            <h1
              id="hero-title"
              className="text-[clamp(2.1rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.03em] text-slate-900"
            >
              Financial Calculators for India 2026-27
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Plan loans, investing, tax, inflation, and retirement with
              practical calculators built for Indian users. Fincado helps you
              estimate costs, compare options, and make clearer money decisions
              without spreadsheets.
            </p>

            <ul className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              <li>Free to use</li>
              <li>No login required</li>
              <li>Built for Indian financial planning</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#B0EC70] text-[#111827] font-semibold"
              >
                <Link href="/emi-calculator/">Check Loan EMI</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sip-calculator/">Start SIP Planning</Link>
              </Button>
            </div>
          </div>

          <aside className="grid gap-4">
            <Card className="border-slate-200 bg-[#F7FDF1]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Popular starting points
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <QuickLink
                  href="/emi-calculator/"
                  label="EMI Calculator"
                  desc="Monthly EMI, interest and tenure"
                />
                <QuickLink
                  href="/sip-calculator/"
                  label="SIP Calculator"
                  desc="Monthly investing and future value"
                />
                <QuickLink
                  href="/income-tax-calculator/"
                  label="Income Tax Calculator"
                  desc={`Old vs new regime for FY ${fy.fullFormat}`}
                />
                <QuickLink
                  href="/retirement-calculator/"
                  label="Retirement Planner"
                  desc="Corpus and monthly income planning"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900">
                  What you can do here
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <TrustRow
                  icon={<Building2 className="h-4 w-4" />}
                  text="Compare loan affordability and EMI burden."
                />
                <TrustRow
                  icon={<TrendingUp className="h-4 w-4" />}
                  text="Estimate SIP, lump sum, and long-term growth."
                />
                <TrustRow
                  icon={<FileText className="h-4 w-4" />}
                  text="Review tax planning and retirement scenarios."
                />
                <TrustRow
                  icon={<ShieldCheck className="h-4 w-4" />}
                  text="Use clear formulas and practical examples."
                />
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="mt-14">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Financial planning tools for loans, tax, investing and
                  retirement
                </h2>
                <p className="mt-2 text-slate-600">
                  Fincado focuses on the calculations people actually use: loan
                  EMI, SIP returns, inflation-adjusted goals, tax comparison,
                  provident fund growth, and retirement planning.
                </p>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/calculators/">Browse All Calculators</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Essential calculators
              </h2>
              <p className="mt-1 text-slate-600">
                Start with the most commonly used tools on Fincado.
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              className="font-semibold text-emerald-700"
            >
              <Link href="/calculators/">View all tools</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              href="/emi-calculator/"
              icon="emi"
              title="EMI Calculator"
              desc="Calculate monthly EMI, total interest and repayment burden."
            />
            <ToolCard
              href="/sip-calculator/"
              icon="sip"
              title="SIP Calculator"
              desc="Estimate long-term returns from monthly investing."
            />
            <ToolCard
              href="/income-tax-calculator/"
              icon="tax"
              title="Income Tax Calculator"
              desc={`Compare tax regimes for FY ${fy.fullFormat}.`}
            />
            <ToolCard
              href="/home-loan-calculator/"
              icon="homeLoan"
              title="Home Loan Calculator"
              desc="Plan affordability, EMI and tenure for housing loans."
            />
            <ToolCard
              href="/retirement-calculator/"
              icon="retirement"
              title="Retirement Calculator"
              desc="Estimate the corpus needed for future monthly expenses."
            />
            <ToolCard
              href="/inflation-calculator/"
              icon="inflation"
              title="Inflation Calculator"
              desc="See how inflation affects your future purchasing power."
            />
          </div>
        </section>

        <div className="my-14">
          <AdSlot id="home-mid-1" type="leaderboard" />
        </div>

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Loan comparison and planning
              </h2>
              <p className="mt-1 text-slate-600">
                Explore lenders, rates, and loan types before you borrow.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/compare-loans/">
                Compare loans <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ComparisonCard b1="SBI" b2="HDFC" link="/compare/sbi-vs-hdfc/" />
            <ComparisonCard
              b1="HDFC"
              b2="ICICI"
              link="/compare/hdfc-vs-icici/"
            />
            <ComparisonCard b1="SBI" b2="Axis" link="/compare/sbi-vs-axis/" />
            <ComparisonCard
              b1="ICICI"
              b2="Kotak"
              link="/compare/icici-vs-kotak/"
            />
            <ComparisonCard b1="PNB" b2="BOB" link="/compare/pnb-vs-bob/" />
            <ComparisonCard
              b1="Bajaj"
              b2="LIC Housing"
              link="/compare/bajaj-vs-lic-housing/"
            />
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Featured guides
              </h2>
              <p className="mt-1 text-slate-600">
                Long-form explainers on investing, tax saving, and financial
                planning.
              </p>
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
                <Card className="h-full rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-[#DFF7C6] hover:shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block rounded-full bg-[#F7FDF1] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#577A30]">
                      {guide.category || 'Guide'}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {guide.published
                        ? new Date(guide.published).toLocaleDateString(
                            'en-IN',
                            {
                              month: 'short',
                              year: 'numeric',
                            },
                          )
                        : 'Updated'}
                    </span>
                  </div>

                  <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-[#577A30]">
                    {guide.title}
                  </h3>

                  <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                    {(guide.metaDescription || '')
                      .replace(/<[^>]+>/g, '')
                      .trim()
                      .slice(0, 160)}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <article className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <h2 className="text-3xl font-semibold text-slate-900">
              Financial calculators that help you make clearer decisions
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-700">
              A financial calculator is useful only when it helps you answer a
              real question. Most people do not need abstract formulas first —
              they need to know whether they can afford a home loan, how much to
              invest each month, which tax regime may be better, or how
              inflation will affect future expenses. Fincado is designed around
              those practical decisions for Indian users.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-700">
              If you are borrowing, tools like the EMI calculator and home loan
              calculator can show how loan amount, interest rate, and tenure
              change your monthly outgo and total interest paid. That matters
              because a slightly longer tenure can reduce EMI but sharply
              increase total interest over time. Comparing multiple lenders also
              helps because even a small rate difference can add up
              significantly on long-term loans.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-700">
              If you are investing, a SIP calculator, lumpsum calculator, and
              inflation calculator help connect monthly contributions to
              long-term outcomes. Instead of looking only at headline returns,
              it is more useful to estimate future value, inflation-adjusted
              purchasing power, and the time required to reach a target corpus.
              That is especially relevant for retirement planning, children’s
              goals, and long-duration wealth building.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-700">
              Tax planning is another area where many people make decisions too
              late. Comparing the old and new tax regimes, understanding Section
              80C choices, and modelling deductions before the end of the
              financial year can reduce rushed decisions. Tools are not a
              substitute for professional advice in complex cases, but they are
              very useful for building a first estimate and comparing scenarios
              clearly.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Card className="border-slate-200 bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Loan planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-slate-600">
                  Use EMI, home loan, personal loan, and car loan tools to
                  estimate monthly burden, compare lenders, and avoid stretching
                  your budget.
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Investing and growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-slate-600">
                  Use SIP, lumpsum, SWP, PPF, EPF, and CAGR calculators to
                  understand growth, compounding, withdrawal planning, and
                  long-term goals.
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Tax and retirement
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-slate-600">
                  Use tax, inflation, gratuity, and retirement tools to estimate
                  future needs and compare scenarios before making year-end
                  decisions.
                </CardContent>
              </Card>
            </div>
          </article>
        </section>

        <section className="mt-16">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-slate-900">
                Frequently asked questions
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="mt-20">
          <div className="rounded-3xl bg-[#1B2E06] px-6 py-12 text-center shadow-lg sm:px-12">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Start with the calculator that matches your next decision
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-200 sm:text-lg">
              Borrowing, investing, tax planning, and retirement all improve
              when you can compare numbers clearly before you act.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-[#B0EC70] text-[#111827]">
                <Link href="/emi-calculator/">Calculate EMI</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-300 text-white"
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

function ToolCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: IconName;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#DFF7C6] hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7FDF1]">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
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
      className="rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-[#DFF7C6] hover:bg-[#FCFEF8]"
    >
      <div className="font-semibold text-slate-900">{label}</div>
      <div className="mt-1 text-xs leading-5 text-slate-600">{desc}</div>
    </Link>
  );
}

function TrustRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-slate-500">{icon}</span>
      <span>{text}</span>
    </div>
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
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:border-[#DFF7C6] hover:bg-[#F7FDF1] hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-[10px] font-semibold text-slate-700 shadow-sm">
            {b1.slice(0, 1)}
          </div>
          <div className="z-0 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-[#F7FDF1] text-[10px] font-semibold text-[#577A30] shadow-sm">
            {b2.slice(0, 1)}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#577A30]">
            {b1} vs {b2}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Compare rates
          </span>
        </div>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-[#DFF7C6]">
        <GitCompare className="h-4 w-4 text-slate-400 transition-colors group-hover:text-[#1B2E06]" />
      </div>
    </Link>
  );
}
