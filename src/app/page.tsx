import type { Metadata } from 'next';
import React, { JSX } from 'react';
import Link from 'next/link';
import Icon, { IconName } from '@/components/Icon';
import AdSlot from '@/components/AdSlot';
import articlesData from '@/data/articles.json';
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
  Building2,
  FileText,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  GitCompare,
} from 'lucide-react';
import {
  getCurrentFiscalYear,
  getBudgetYearText,
  getUpdatedForFYText,
} from '@/lib/fiscalYear';

// --- SEO METADATA (Updated for 2026) ---
export const metadata: Metadata = {
  title:
    'Financial Calculators for India 2026 – EMI, SIP, Tax & Retirement | Fincado',
  description:
    'Master your money with Fincado. Free, bank-grade calculators for Home Loan EMI, SIP Returns, Inflation, EPF, PPF, GST, and Retirement Planning. Updated for Budget 2026.',
  keywords: [
    'Financial Calculators India',
    'EMI Calculator 2026',
    'SIP Calculator',
    'Inflation Calculator',
    'Home Loan Interest Rates 2026',
    'Retirement Planning',
    'Tax Saving Calculator FY 2026-27',
    'Fincado',
  ],
  alternates: {
    canonical: 'https://fincado.com/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fincado.com/',
    title: 'Fincado – Master Your Money (2026 Edition)',
    description:
      'The most comprehensive financial toolkit for Indian investors. Updated for Union Budget 2026.',
    siteName: 'Fincado',
  },
};

export default function Home(): JSX.Element {
  const fy = getCurrentFiscalYear();
  const featuredSlugs = [
    'sukanya-samriddhi-yojana-guide-2026',
    'elss-funds-guide-2026',
    'sovereign-gold-bond-sgb-guide',
    'health-insurance-buying-guide',
  ];

  const featuredGuides = articlesData.filter(
    (a) =>
      featuredSlugs.includes(a.slug) && (a.language === 'en' || !a.language),
  );

  const displayGuides =
    featuredGuides.length > 0
      ? featuredGuides
      : articlesData
          .filter((a) => a.language === 'en' || !a.language)
          .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Fincado',
            url: 'https://fincado.com/',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://fincado.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Which is the best financial calculator in India for 2026?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Fincado provides free, accurate financial calculators for EMI, SIP, income tax, and retirement planning, fully updated for Union Budget 2026 norms.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are online EMI calculators accurate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Fincado EMI calculators use bank-grade reducing balance formulas followed by major Indian banks like SBI, HDFC, and ICICI.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Fincado free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, all calculators on Fincado are 100% free, require no login, and are privacy-focused.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Fincado',
            url: 'https://fincado.com',
            logo: '/logo.png',
            sameAs: [
              'https://www.linkedin.com/company/fincado',
              'https://twitter.com/fincado',
            ],
          }),
        }}
      />

      <main className="container home-hero-wrap" id="main-content">
        {/* --- HERO SECTION --- */}
        <section
          className="home-hero hero-elevated relative overflow-hidden"
          aria-labelledby="hero-title"
        >
          {/* Background glow */}
          <div
            className="
      pointer-events-none
      absolute
      -top-[20%]
      -right-[10%]
      h-150
      w-150
      max-h-[80vw]
      max-w-[80vw]
      bg-[radial-gradient(circle,rgba(5,150,105,0.08)_0%,rgba(255,255,255,0)_70%)]
      z-0
    "
          />

          <div className="hero-grid relative z-10">
            {/* LEFT */}
            <div className="hero-content">
              {/* BADGES */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {/* ✅ Updated Year Badge */}
                <Badge variant="outline" className="...">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  {getUpdatedForFYText()} {/* Dynamic! */}
                </Badge>

                <Badge variant="outline" className="...">
                  <span className="pulse-dot"></span>
                  Verified for {getBudgetYearText()} {/* Dynamic! */}
                </Badge>
              </div>

              {/* TITLE */}
              <h1
                id="hero-title"
                className="
          mb-6
          font-semibold
          leading-[1.15]
          tracking-[-0.03em]
          text-slate-900
          text-[clamp(2rem,4vw,3rem)]
        "
              >
                <span className="inline-block bg-linear-to-br from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                  Financial Calculators for India {fy.shortYear}
                </span>
                <br />
                <span className="mt-3 block text-[0.45em] font-semibold tracking-[0.01em] text-slate-600">
                  EMI • SIP • Tax • Retirement Tools
                </span>
              </h1>

              {/* SUBTEXT */}
              <p className="hero-sub mb-8 max-w-135 text-[1.125rem] leading-relaxed text-slate-600">
                Make smarter decisions with 20+ bank-grade calculators for
                Loans, SIPs, Inflation, and Retirement.
                <span className="mt-3 flex gap-4 text-[0.9em] font-medium text-slate-500">
                  <span>✅ No Login Required</span>
                  <span>✅ 100% Free</span>
                  <span>✅ Data Private</span>
                </span>
              </p>

              {/* CTAs */}
              <div className="hero-cta-row flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="
            bg-emerald-600
            text-white
            hover:bg-emerald-700
            shadow-lg
            shadow-emerald-500/20
            font-semibold
          "
                >
                  <Link href="/emi-calculator/">Check Loan EMI</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-semibold"
                >
                  <Link href="/sip-calculator/">Start Investing</Link>
                </Button>
              </div>

              {/* AD */}
              <div className="hero-ad mt-8 min-h-22.5 max-w-182">
                <AdSlot id="home-hero-leaderboard" type="banner" />
              </div>
            </div>

            {/* RIGHT */}
            <aside className="hero-visual flex flex-col justify-center pl-5">
              <div className="hero-stats relative">
                {/* EMI CARD */}
                <Card className="stat-card absolute left-0 top-5 z-10 min-w-45 -rotate-3 bg-white/90 backdrop-blur">
                  <div className="p-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs">
                        📉
                      </span>
                      <span className="text-xs text-slate-500">
                        Monthly EMI
                      </span>
                    </div>
                    <span className="text-xl font-bold text-slate-800">
                      ₹12,450
                    </span>
                  </div>
                </Card>

                {/* CORPUS CARD */}
                <Card className="stat-card absolute right-5 top-12 z-20 min-w-55 rotate-2 border-emerald-200">
                  <div className="relative p-6">
                    <span className="absolute -top-2.5 right-5 rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white">
                      +12% Growth
                    </span>

                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-base">
                        🚀
                      </span>
                      <span className="text-[13px] font-semibold uppercase tracking-wide text-slate-600">
                        Projected Corpus
                      </span>
                    </div>

                    <span className="text-4xl font-extrabold text-emerald-800">
                      ₹2.54 Cr
                    </span>
                  </div>
                </Card>
              </div>

              <div className="hero-side-ad scale-95">
                <AdSlot id="home-hero-sidebar" type="box" />
              </div>
            </aside>
          </div>
        </section>

        {/* --- TRUST STRIP (Updated Text) --- */}
        <section className="py-10">
          <div className="container px-4 md:px-6">
            <Card className="relative overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-[#489719] to-transparent opacity-80" />

              <CardContent className="flex flex-col items-center gap-8 px-6 py-10 md:px-10">
                <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-2 rounded-full border-slate-200 bg-slate-50/50 px-4 py-2 text-sm font-semibold text-slate-800 backdrop-blur-sm"
                  >
                    <span className="text-base">🇮🇳</span>
                    <span>Trusted by Indian Investors</span>
                  </Badge>

                  <div className="hidden h-8 w-px bg-slate-200 md:block" />

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <TrustTag
                      icon={<Building2 className="h-4 w-4" />}
                      label="Loans"
                    />
                    <TrustTag
                      icon={<FileText className="h-4 w-4" />}
                      label="Tax Planning"
                    />
                    <TrustTag
                      icon={<TrendingUp className="h-4 w-4" />}
                      label="Investments"
                    />
                  </div>
                </div>

                <div className="h-px w-24 bg-slate-100" />

                <div className="max-w-3xl text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#489719]">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Bank-Grade Formulas</span>
                  </div>

                  <p className="homepage-entity text-[15px] leading-relaxed text-slate-600 md:text-base">
                    Fincado is a free financial calculator platform for India,
                    helping users calculate EMI, SIP returns, income tax,
                    retirement corpus, and investment growth using verified
                    banking formulas aligned with <strong>FY 2026-27</strong>{' '}
                    norms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --- 1. MOST POPULAR TOOLS --- */}
        <section className="tools-section">
          <div className="tools-header container-inner flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Essential Financial Tools
              </h2>
              <p className="tools-sub mt-1 text-slate-600">
                Popular financial calculators in India for EMI, SIP, income tax
                and credit planning.
              </p>
            </div>

            <Button asChild variant="outline" className="shrink-0">
              <Link href="/calculators/">View All</Link>
            </Button>
          </div>

          <div className="tools-grid container-inner grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/emi-calculator/"
              icon="emi"
              title="EMI Calculator"
              desc="Calculate Loan EMI & Interest"
            />
            <ToolCard
              href="/sip-calculator/"
              icon="sip"
              title="SIP Calculator"
              desc="Estimate Mutual Fund Returns"
            />
            <ToolCard
              href="/credit-score/"
              icon="creditScore"
              title="Credit Score"
              desc="Check CIBIL-based credit eligibility"
            />
            <ToolCard
              href="/income-tax-calculator/"
              icon="tax"
              title="Income Tax Calc"
              desc={`New vs Old Regime (${fy.fullFormat})`} // ✅ Updated Year
            />
          </div>
        </section>

        {/* --- AD BREAK --- */}
        <div className="midpage-ad">
          <AdSlot id="home-mid-1" type="leaderboard" />
        </div>

        {/* ✅ REVENUE ENGINE SECTION (Updated Date) */}
        <section className="my-16 container-inner">
          <div className="relative overflow-hidden rounded-3xl shadow-xs bg-white border border-slate-100 px-6 py-10 sm:px-10 sm:py-12">
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
              <div className="space-y-3">
                <Badge className="...">
                  Updated{' '}
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Compare & <span className="text-emerald-600">Save</span>
                </h2>
                <p className="text-slate-600 max-w-lg text-sm sm:text-base leading-relaxed">
                  Stop overpaying on interest. Compare live rates, processing
                  fees, and approval chances for India&apos;s top lenders.
                </p>
              </div>
              <Button
                asChild
                className="bg-emerald-900 text-white hover:bg-emerald-800 shadow-lg"
              >
                <Link href="/compare-loans/">
                  View All Banks <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ComparisonCard b1="SBI" b2="HDFC" link="/compare/sbi-vs-hdfc" />
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
          </div>
        </section>

        {/* --- 2. LOAN PLANNING SECTION --- */}
        <section className="tools-section">
          <div className="tools-header container-inner">
            <div>
              <h2>Loan & Debt Planning</h2>
              <p className="tools-sub">Loan calculators in India</p>
            </div>
          </div>
          <div className="tools-grid container-inner">
            <ToolCard
              href="/loans/home-loan/"
              icon="homeLoan"
              title="Home Loan EMI"
              desc="Check Affordability & Tax Benefits"
            />
            <ToolCard
              href="/loans/personal-loan/"
              icon="personalLoan"
              title="Personal Loan"
              desc="Compare Interest Rates"
            />
            <ToolCard
              href="/loans/car-loan/"
              icon="carLoan"
              title="Car Loan EMI"
              desc="Plan your dream car purchase"
            />
            <ToolCard
              href="/loans/education-loan/"
              icon="educationLoan"
              title="Education Loan"
              desc="Calculate moratorium interest"
            />
          </div>
        </section>

        {/* --- 3. INVESTMENT & WEALTH --- */}
        <section className="tools-section">
          <div className="tools-header container-inner">
            <div>
              <h2>Grow Your Wealth</h2>
              <p className="tools-sub">Investment calculators</p>
            </div>
          </div>
          <div className="tools-grid container-inner">
            <ToolCard
              href="/elss-calculator/"
              icon="investing"
              title="ELSS Calculator"
              desc="Tax Saving Mutual Fund Returns"
            />
            <ToolCard
              href="/fd-calculator/"
              icon="fd"
              title="FD Calculator"
              desc="Fixed Deposit Maturity Value"
            />
            <ToolCard
              href="/lumpsum-calculator/"
              icon="investing"
              title="Lumpsum Calculator"
              desc="One-time investment returns"
            />
            <ToolCard
              href="/swp-calculator/"
              icon="saving"
              title="SWP Calculator"
              desc="Systematic Withdrawal Plan"
            />
          </div>
        </section>

        {/* --- AD BREAK --- */}
        <div className="midpage-ad">
          <AdSlot id="home-mid-2" type="leaderboard" />
        </div>

        {/* --- 4. RETIREMENT & TAX --- */}
        <section className="tools-section">
          <div className="tools-header container-inner">
            <div>
              <h2>Retirement & Tax Planning</h2>
              <p className="tools-sub">Retirement & tax calculators</p>
            </div>
          </div>
          <div className="tools-grid container-inner">
            <ToolCard
              href="/inflation-calculator/"
              icon="investing"
              title="Inflation Calculator"
              desc="Calculate Future Value of Money"
            />
            <ToolCard
              href="/retirement-calculator/"
              icon="retirement"
              title="Retirement Planner"
              desc="How much corpus do you need?"
            />
            <ToolCard
              href="/ppf-calculator/"
              icon="ppf"
              title="PPF Calculator"
              desc="Public Provident Fund Returns"
            />
            <ToolCard
              href="/epf-calculator/"
              icon="epf"
              title="EPF Calculator"
              desc="Employee Provident Fund Corpus"
            />
            <ToolCard
              href="/gst-calculator/"
              icon="tax"
              title="GST Calculator"
              desc="Calculate GST Rates (5% - 28%)"
            />
          </div>
        </section>

        {/* --- FEATURED GUIDES --- */}
        <section className="featured-guides mt-15">
          <div className="tools-header container-inner mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Financial Wisdom
              </h2>
              <p className="mt-1 text-base text-slate-500">
                Expert-written guides backed by real calculations, updated for
                Indian laws.
              </p>
            </div>

            <Button
              asChild
              variant="ghost"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <Link href="/guides/">View All Guides →</Link>
            </Button>
          </div>

          <div className="guide-grid container-inner grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="group block"
              >
                <Card
                  className="
            h-full
            rounded-xl
            border
            border-slate-200
            p-6
            transition
            hover:-translate-y-1
            hover:shadow-lg
          "
                >
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                      {guide.category}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold leading-snug text-slate-900">
                    {guide.title}
                  </h3>

                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {guide.metaDescription
                      .replace(/<[^>]+>/g, '')
                      .substring(0, 120)}
                    ...
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">
                    <span>
                      {guide.published
                        ? new Date(guide.published).toLocaleDateString(
                            'en-IN',
                            {
                              month: 'short',
                              year: 'numeric',
                            },
                          )
                        : 'Guide'}
                    </span>
                    <span className="font-semibold text-emerald-600 group-hover:underline">
                      Read Article →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* --- RICH SEO CONTENT --- */}
        <section className="mt-24">
          <article className="container-inner">
            <div className="prose prose-slate max-w-none bg-white p-12 rounded-2xl border">
              <h2 className="text-3xl text-slate-900 pb-4 font-medium">
                Your All-In-One Financial Planning Platform
              </h2>

              <p className="pb-2">
                Financial freedom isn&apos;t a dream; it&apos;s a calculation.
                Whether you are a fresh graduate starting your first job, a
                parent planning for your child&apos;s education, or someone
                nearing retirement, <strong>Fincado</strong> provides the
                mathematical clarity you need to make the right choices in 2026.
              </p>

              <h3 className="text-xl text-slate-900 py-4 font-medium">
                Why Use Online Financial Calculators?
              </h3>

              <p className="pb-2">
                Manual calculations are prone to errors, especially when dealing
                with compound interest, tax slabs, and inflation. Our
                calculators offer:
              </p>

              <ul className="list-disc pl-6">
                <li>
                  <strong>Precision:</strong> We use bank-grade formulas used by
                  institutions like SBI, HDFC, and ICICI.
                </li>
                <li>
                  <strong>Speed:</strong> Get answers in milliseconds—no complex
                  Excel sheets required.
                </li>
                <li>
                  <strong>Budget 2026 Compliant:</strong> All tools are verified
                  against the latest Union Budget announcements.
                </li>
              </ul>

              <h3 className="pt-6 text-xl font-medium">
                Core Pillars of Personal Finance
              </h3>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h4 className="mb-2 text-base font-semibold text-slate-900">
                    Debt Management
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 pt-5">
                    Use our <strong>EMI Calculators</strong> to keep your
                    Debt-to-Income ratio below 40%. Smartly plan prepayments to
                    become debt-free faster.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
                  <h4 className="mb-2 text-base font-semibold text-slate-900">
                    Wealth Creation
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 pt-5">
                    Start a <strong>SIP</strong> today. Even ₹500/month
                    compounded at 12% over 30 years can create a significant
                    corpus.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
                  <h4 className="mb-2 text-base font-semibold text-slate-900">
                    Tax Saving
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 pt-5">
                    Maximize Section 80C limits with <strong>PPF</strong>,{' '}
                    <strong>EPF</strong>, and ELSS funds. Don&apos;t let taxes
                    eat into your retirement nest egg.
                  </p>
                </div>
              </div>
            </div>

            {/* --- FAQ SECTION --- */}
            <div className="mt-12">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>
                        Are these calculators updated for Budget 2026?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes. All our tools (EMI, FD, Tax, Inflation) are
                        verified against Union Budget 2026 announcements to
                        ensure you get the most accurate financial projections.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-2">
                      <AccordionTrigger>
                        How can I save tax on my salary in FY 2026-27?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can use our EPF and PPF calculators to plan your
                        Section 80C investments (Limit: ₹1.5 Lakh).
                        Additionally, Home Loan interest (Section 24b) and NPS
                        (Section 80CCD) offer further deductions under the Old
                        Regime.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-3">
                      <AccordionTrigger>
                        What is the best way to become a Crorepati?
                      </AccordionTrigger>
                      <AccordionContent>
                        Consistent investing. Use the SIP Calculator to see how
                        a ₹15,000 monthly investment at 12% return makes you a
                        Crorepati in 15 years.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </article>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="mt-20">
          <div className="relative rounded-2xl bg-linear-to-br from-emerald-300 to-emerald-700 p-px">
            <div className="rounded-2xl bg-white px-6 py-12 sm:px-12 text-center shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3">
                Ready to take control?
              </h2>

              <p className="text-slate-600 max-w-xl mx-auto mb-8 text-base sm:text-lg">
                Join thousands of smart investors using Fincado daily.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Link href="/emi-calculator/">Calculate EMI</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-900 hover:bg-slate-50"
                >
                  <Link href="/sip-calculator/">Plan Investment</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// --- SUB-COMPONENTS ---
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
    <Link href={href} className="tool-tile">
      <div className="tool-icon-wrap">
        <Icon name={icon} className="tool-icon-svg" />
      </div>
      <h3 className="tool-title">{title}</h3>
      <p className="tool-desc">{desc}</p>
    </Link>
  );
}

function TrustTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="group flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-[#489719]/30 hover:bg-[#489719]/5 hover:text-slate-900">
      <span className="text-slate-400 transition-colors group-hover:text-[#489719]">
        {icon}
      </span>
      {label}
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
      className="group flex items-center justify-between bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          {/* Bank 1 Icon */}
          <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-slate-700 border border-slate-100 shadow-sm z-10">
            {b1.slice(0, 1)}
          </div>
          {/* Bank 2 Icon */}
          <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-[10px] font-black text-emerald-700 border border-white shadow-sm z-0">
            {b2.slice(0, 1)}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-700 group-hover:text-emerald-700 text-sm transition-colors">
            {b1} vs {b2}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
            Compare Rates
          </span>
        </div>
      </div>
      <div className="h-8 w-8 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center transition-colors">
        <GitCompare className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
      </div>
    </Link>
  );
}
