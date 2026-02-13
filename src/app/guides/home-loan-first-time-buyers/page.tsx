// src/app/guides/first-time-home-buyer-guide/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  Percent,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  FileCheck,
  UserCheck,
  Building2,
  Calculator,
  XCircle,
  Home,
  IndianRupee,
  Calendar,
  Users,
  FileText,
} from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

// --- SEO METADATA (OPTIMIZED FOR FIRST-TIME BUYERS) ---
export const metadata: Metadata = {
  title:
    'First-Time Home Buyer Guide India 2026: Step-by-Step Checklist & 7 Mistakes to Avoid',
  description:
    'Complete first home loan guide for India 2026: Pre-approval checklist, PMAY subsidy eligibility, 7 costly mistakes first-time buyers make, FOIR calculation, tax benefits (80C/24B), and government schemes. Updated February 2026.',
  keywords: [
    'first time home buyer India',
    'first home loan checklist India',
    'home loan for beginners 2026',
    'PMAY subsidy first time buyer',
    'mistakes first time home buyers India',
    'pre-approval home loan India',
    'first time buyer eligibility',
    'home loan without credit history',
    'co-borrower home loan benefits',
    'first home tax benefits India',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/first-time-home-buyer-guide/',
  },
  openGraph: {
    title:
      'First-Time Home Buyer Guide India 2026 | Complete Beginner Handbook',
    description:
      'Your first home loan in India? Avoid 7 costly mistakes, get PMAY subsidy, and learn the complete step-by-step process from pre-approval to possession.',
    url: 'https://fincado.com/guides/first-time-home-buyer-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/home-loan/first-time-buyer-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

// --- FAQ ITEMS (FIRST-TIME BUYER FOCUSED) ---
const FAQ_ITEMS = [
  {
    question:
      'Can I get a home loan with no credit history as a first-time buyer?',
    answer:
      "Yes, but it's challenging. Options include: 1) Add co-borrower with good credit score (parent/spouse), 2) Start building credit with secured credit card 6 months before applying, 3) Apply to HFCs like LIC Housing or PNB Housing (more lenient than banks), 4) Provide alternative credit data like rent payment history, utility bill payments. Some banks offer special first-time buyer schemes with relaxed criteria.",
  },
  {
    question: 'What is PMAY subsidy for first-time home buyers in 2026?',
    answer:
      "PMAY (Pradhan Mantri Awas Yojana) offers interest subsidy up to ₹2.67 lakh for first-time buyers with annual income below ₹18 lakh buying property worth up to ₹45 lakh. Subsidy rates: MIG-I (₹6-12L income): 4% subsidy on ₹9L loan, MIG-II (₹12-18L income): 3% subsidy on ₹12L loan. Property must be in your or spouse's name and you should not own any other house in India.",
  },
  {
    question: 'How much down payment do first-time buyers need in India?',
    answer:
      'Down payment ranges from 10-25% of property value: 10% for properties up to ₹30 lakh, 20% for ₹30-75 lakh, and 25% for above ₹75 lakh. For a ₹50 lakh property, expect to pay ₹10 lakh (20%) as down payment. Additionally, budget for stamp duty (5-7%), registration (1%), and other charges (₹2-3 lakh) - total upfront cost is typically 30-35% of property value.',
  },
  {
    question: 'What is the minimum credit score required for first home loan?',
    answer:
      'Most banks require a CIBIL score of 700+ for approval, though 750+ gets you the best interest rates (8.5%-8.75%). Scores below 650 often lead to rejection or significantly higher interest rates. As a first-time buyer with no credit history, start building your score 6-12 months before applying by taking a small credit card and paying on time.',
  },
  {
    question: 'How is FOIR calculated and what is the ideal percentage?',
    answer:
      'FOIR = (Total Monthly Obligations ÷ Gross Monthly Income) × 100. This includes all existing EMIs, credit card dues, and the proposed home loan EMI. Banks typically allow 50-60% FOIR. Example: If your salary is ₹80,000 and total EMIs are ₹40,000, your FOIR is 50%. Keep it below 50% for best approval chances. Lower FOIR means higher loan eligibility.',
  },
  {
    question: 'Should I buy a home as a first-time buyer or keep renting?',
    answer:
      "Buy if: 1) You'll stay in the same city for 7+ years, 2) EMI ≤ 35% of monthly income, 3) You have 30% down payment saved, 4) Job is stable with regular income. Keep renting if: You're in first 3 years of career, may relocate for job opportunities, can't afford 30% down payment, or can invest that money in higher-return assets (12%+ returns vs 5-7% property appreciation).",
  },
  {
    question:
      'What documents do first-time home buyers need for loan approval?',
    answer:
      'Salaried: Last 6 months salary slips, Form 16 (2 years), bank statements (6 months), PAN, Aadhaar, property sale agreement, passport photos. Self-Employed: ITR (3 years), audited P&L and balance sheet, business proof (GST registration/trade license), bank statements (12 months), plus same KYC documents. Keep digital and physical copies ready to avoid 7-10 day delays.',
  },
  {
    question: 'How long does home loan approval take for first-time buyers?',
    answer:
      'Pre-approval: 3-7 working days with basic income documents. Final approval after property verification: 15-30 days total. Common delays: Incomplete documents (add 7-10 days), property title issues (add 15-20 days), low CIBIL score (rejection or higher rates). Pro tip: Get pre-approved before property hunting to negotiate better with sellers.',
  },
];

export default function FirstTimeHomeBuyerGuidePage() {
  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'First-Time Home Buyer Guide India 2026: Complete Checklist & Mistakes to Avoid',
            description:
              'Complete guide for first-time home buyers in India covering pre-approval process, PMAY subsidy, FOIR calculation, tax benefits, and 7 costly mistakes to avoid.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-15',
            dateModified: '2026-02-13',
            image:
              'https://fincado.com/images/guides/home-loan/first-time-buyer-hero.webp',
          }),
        }}
      />

      {/* --- FAQ SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* --- HOWTO SCHEMA (NEW) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Apply for Your First Home Loan in India',
            description:
              'Step-by-step guide for first-time home buyers to apply for and get approved for home loan',
            totalTime: 'P30D',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Check and Improve Credit Score',
                text: 'Get your CIBIL score (aim for 750+) at least 6 months before applying. If below 700, improve by paying all dues on time.',
                position: 1,
              },
              {
                '@type': 'HowToStep',
                name: 'Calculate Affordability and Save Down Payment',
                text: 'Use EMI calculator to determine affordable loan amount. Keep EMI below 35% of income. Save 30% of property value for down payment and other costs.',
                position: 2,
              },
              {
                '@type': 'HowToStep',
                name: 'Get Pre-Approved',
                text: "Submit basic income documents to 3-4 lenders to get pre-approval letter. This shows sellers you're a serious buyer.",
                position: 3,
              },
              {
                '@type': 'HowToStep',
                name: 'Hunt for Property',
                text: 'Search for properties within your budget. Verify builder credentials, legal documents, and completion status.',
                position: 4,
              },
              {
                '@type': 'HowToStep',
                name: 'Apply for Final Loan Approval',
                text: 'Submit complete documentation including property papers. Bank will conduct legal and technical verification (15-20 days).',
                position: 5,
              },
              {
                '@type': 'HowToStep',
                name: 'Complete Documentation and Disbursement',
                text: 'Sign loan agreement, pay stamp duty and registration charges. Bank disburses amount to seller. Move into your first home!',
                position: 6,
              },
            ],
          }),
        }}
      />

      {/* --- ITEMLIST SCHEMA FOR CHECKLIST (NEW) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'First-Time Home Buyer Application Checklist',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Phase 1: Pre-Application (6 months before)',
                description:
                  'Check Credit Score (Target 750+), Calculate Affordability, Save Down Payment (20-25%), Research PMAY eligibility',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Phase 2: Application (1-2 months before)',
                description:
                  'Gather KYC & Income Documents, Apply to 3-4 Lenders for pre-approval, Property hunting and selection',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Phase 3: Disbursement (Current month)',
                description:
                  'Property Valuation and Legal Check, Sign Agreement & Pay Stamp Duty, Buy Home Loan Insurance, Collect Original Deeds post-repayment',
              },
            ],
          }),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'First-Time Home Buyer Guide',
            url: 'https://fincado.com/guides/first-time-home-buyer-guide/',
          },
        ]}
      />

      {/* Breadcrumb Visual */}
      <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link href="/guides/" className="hover:text-blue-600 transition-colors">
          Guides
        </Link>
        <span>›</span>
        <span className="text-slate-900 font-medium">
          First-Time Home Buyer Guide
        </span>
      </nav>

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          🏠 First-Time Buyer Special
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          First-Time Home Buyer Guide India 2026: Complete Checklist & 7
          Mistakes to Avoid
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 18 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{updatedLabel}</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="First-Time Home Buyer Guide India 2026" />
        </div>
      </header>

      {/* Quick Answer Box */}
      <Card className="mb-8 border-l-4 border-l-blue-600 bg-linear-to-br from-blue-50/50 via-white to-slate-50/30 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Quick Answer for First-Time Buyers
              </CardTitle>
              <Badge className="mt-1 bg-blue-600 text-white hover:bg-blue-700">
                30-Second Read
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              As a <strong>first-time home buyer in India</strong>, you need a{' '}
              <strong>750+ CIBIL score</strong>,{' '}
              <strong>20-30% down payment</strong>, and{' '}
              <strong>EMI below 35% of income</strong>. Start by getting{' '}
              <strong>pre-approved</strong> 3-6 months before property hunting.
              Claim <strong>PMAY subsidy up to ₹2.67 lakh</strong> if eligible.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">750+</div>
                <div className="text-slate-600 text-xs">CIBIL Score</div>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">20-30%</div>
                <div className="text-slate-600 text-xs">Down Payment</div>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">₹2.67L</div>
                <div className="text-slate-600 text-xs">PMAY Subsidy</div>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border-2 border-blue-200 text-center">
                <div className="font-bold text-2xl text-blue-800">3-6mo</div>
                <div className="text-slate-600 text-xs">Pre-Approval</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-700 text-sm mb-3 flex items-start gap-2">
              <Calculator className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
              <span>
                <strong>Not sure how much you can borrow?</strong> Calculate
                your eligibility based on salary and CIBIL score in 10 seconds.
              </span>
            </p>
            <Link
              href="/loans/home-loan/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm w-full justify-center shadow-sm"
            >
              <Calculator className="h-4 w-4" />
              Check My Home Loan Eligibility
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* --- TOC (UPDATED) --- */}
      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" />
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a
              href="#why-first-timer"
              aria-label="Jump to Why This Guide section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">01</span> Why This Guide is
              Different
            </a>
            <a
              href="#timeline"
              aria-label="Jump to 6-Month Timeline section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">02</span> 6-Month Timeline
            </a>
            <a
              href="#eligibility"
              aria-label="Jump to Eligibility section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">03</span> Eligibility Criteria
            </a>
            <a
              href="#pre-approval"
              aria-label="Jump to Pre-Approval section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">04</span> Pre-Approval Process
            </a>
            <a
              href="#pmay-schemes"
              aria-label="Jump to PMAY section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">05</span> PMAY Subsidy Schemes
            </a>
            <a
              href="#foir"
              aria-label="Jump to FOIR section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">06</span> FOIR Calculation
            </a>
            <a
              href="#down-payment"
              aria-label="Jump to Down Payment section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">07</span> Down Payment Rules
            </a>
            <a
              href="#co-borrower"
              aria-label="Jump to Co-Borrower section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">08</span> Co-Borrower Strategy
            </a>
            <a
              href="#interest-types"
              aria-label="Jump to Interest Types section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">09</span> Fixed vs Floating Rates
            </a>
            <a
              href="#tax-benefits"
              aria-label="Jump to Tax Benefits section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">10</span> Tax Benefits (80C/24b)
            </a>
            <a
              href="#mistakes"
              aria-label="Jump to 7 Mistakes section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">11</span> 7 Costly Mistakes
            </a>
            <a
              href="#checklist"
              aria-label="Jump to Checklist section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-blue-700"
            >
              <span className="text-slate-400">12</span> Application Checklist
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* --- INTRO CARD (UPDATED) --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              Buying your <strong>first home in India</strong> is both exciting and overwhelming. Unlike experienced buyers, first-timers often make costly mistakes that can cost lakhs of rupees and years of financial stress. This comprehensive guide walks you through every step—from checking your credit score 6 months before applying to moving into your dream home.
            </p>
            <p class="mb-4">
              A <strong>home loan</strong> (also called housing loan or mortgage) is a secured loan provided by banks and housing finance companies (HFCs) to help you purchase residential property. The property itself serves as collateral, which is why home loans offer lower interest rates (8.5%-9.5% in 2026) compared to personal loans (10-15%).
            </p>
            <p>
              As a first-time buyer, you have access to special benefits like <strong>PMAY subsidy up to ₹2.67 lakh</strong>, relaxed eligibility criteria from some lenders, and generous tax deductions under the old tax regime. However, 68% of first-time buyers overpay due to lack of research—this guide ensures you're not one of them.
            </p>
          `}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-600" /> Types of Home Loans
              </h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>
                  <strong>Home Purchase Loan:</strong> For ready-to-move-in
                  properties
                </li>
                <li>
                  <strong>Home Construction Loan:</strong> Building on your own
                  land
                </li>
                <li>
                  <strong>Home Improvement Loan:</strong> Renovation of existing
                  property
                </li>
                <li>
                  <strong>Balance Transfer:</strong> Shifting to lower interest
                  rate bank
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Key Features for First-Timers
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  <strong>LTV Ratio:</strong> Borrow up to 90% (₹30L property)
                </li>
                <li>
                  <strong>Interest Rate:</strong> 8.50% - 9.50% p.a. (Feb 2026)
                </li>
                <li>
                  <strong>Tenure:</strong> 5 to 30 Years (choose 15-20 yrs)
                </li>
                <li>
                  <strong>Tax Savings:</strong> Up to ₹3.5L/year (old regime)
                </li>
                <li>
                  <strong>PMAY Subsidy:</strong> Up to ₹2.67L (if eligible)
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/home-loan/first-time-buyer-celebration.webp"
              alt="Young Indian couple holding house keys celebrating first home purchase with home loan approval | First-Time Buyer Guide 2026"
              priority
              quality={85}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          <p className="text-center text-xs text-slate-500 italic mt-2">
            Your first home is within reach with proper planning and guidance.
          </p>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-1" type="leaderboard" />
      </div>

      {/* --- NEW SECTION: WHY THIS GUIDE IS DIFFERENT --- */}
      <section id="why-first-timer" className="mb-12 scroll-mt-20">
        <Card className="border-2 border-blue-200 bg-linear-to-br from-blue-50 to-white shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-slate-900">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              Why First-Time Buyers Need a Different Approach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mb-4">
              Most home loan guides are written for all buyers. But first-timers
              face unique challenges that experienced buyers don&apos;t:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-slate-200">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  Challenges First-Timers Face
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">❌</span>
                    <span>No credit history or low CIBIL score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">❌</span>
                    <span>Don&apos;t know how much they can truly afford</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">❌</span>
                    <span>Underestimate total upfront costs (30-35%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">❌</span>
                    <span>
                      Fall for &quot;low EMI&quot; traps (30-year tenure)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">❌</span>
                    <span>Miss out on PMAY subsidy (₹2.67L free money)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  What This Guide Covers
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span>
                      6-month preparation timeline (build credit score)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Pre-approval process (before property hunting)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span>PMAY eligibility and application steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Co-borrower strategy (double tax benefits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span>7 costly mistakes with real case studies</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-blue-100 p-4 rounded-lg border border-blue-300">
              <p className="text-sm text-blue-900 font-medium">
                <strong>💡 Pro Tip:</strong> Bookmark this page and follow the
                timeline section. Checking off each step will ensure you
                don&apos;t miss critical deadlines or benefits.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- NEW SECTION: 6-MONTH TIMELINE --- */}
      <section id="timeline" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" /> Your 6-Month Timeline
          to First Home
        </h2>
        <p className="mb-6 text-slate-700">
          Don&apos;t wait until you find your dream property. Start preparing 6
          months in advance to get the best rates and avoid delays.
        </p>

        <div className="space-y-4">
          {/* Month -6 */}
          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700 text-lg">
                  -6M
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Month -6: Foundation Building
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Check CIBIL score:</strong> Get free report from
                        cibil.com. Target 750+.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Fix credit issues:</strong> Pay all outstanding
                        dues, dispute errors, reduce credit utilization below
                        30%.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Start saving:</strong> Open dedicated account
                        for down payment. Automate ₹20-30k/month transfers.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Research property rates:</strong> Track prices
                        in target localities using MagicBricks, 99acres.
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-900">
                      <strong>Goal:</strong> CIBIL 750+, ₹5-10L saved
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Month -3 */}
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-lg">
                  -3M
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Month -3: Pre-Approval Stage
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Calculate affordability:</strong> EMI should be
                        max 35% of monthly income. Use our calculator below.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Gather documents:</strong> Salary slips (6mo),
                        Form 16, bank statements, PAN, Aadhaar.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Apply for pre-approval:</strong> Submit to 3-4
                        banks/HFCs. Receive sanction letters in 5-7 days.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Check PMAY eligibility:</strong> Income below
                        ₹18L? Property below ₹45L? Apply for subsidy.
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-900">
                      <strong>Goal:</strong> Pre-approval from 3 lenders, know
                      exact loan amount
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Month -1 */}
          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700 text-lg">
                  -1M
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Month -1: Property Hunting
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Visit properties:</strong> Shortlist 5-7
                        options. Check location, builder reputation, possession
                        date.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Verify legal documents:</strong> Title deed,
                        NOC, approved plans, occupancy certificate.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Negotiate price:</strong> Show pre-approval
                        letter. Ask for 5-10% discount or free furnishings.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Book property:</strong> Pay token amount
                        (₹50k-1L). Sign sale agreement within 15 days.
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-900">
                      <strong>Goal:</strong> Property finalized, agreement
                      signed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Month 0 */}
          <Card className="border-l-4 border-l-green-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-lg">
                  Now
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Current Month: Loan Finalization
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Submit full documentation:</strong> Property
                        papers to bank for legal/technical verification.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Bank verification:</strong> Wait 15-20 days for
                        legal clearance and valuation report.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Final sanction:</strong> Receive approved loan
                        amount, sign agreement. Buy home insurance (mandatory).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Registration & Disbursement:</strong> Pay stamp
                        duty (5-7%), register property. Bank transfers funds to
                        seller.
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Goal:</strong> Keys in hand, EMI starts next month
                      🎉
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-slate-900 flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Reality Check:</strong> Most first-timers rush into
              property hunting without pre-approval. This leads to losing dream
              properties to buyers with financing ready. Follow this timeline
              religiously.
            </span>
          </p>
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-2" type="leaderboard" />
      </div>

      {/* --- NEW SECTION: PRE-APPROVAL PROCESS --- */}
      <section id="pre-approval" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="h-6 w-6 text-blue-600" /> Pre-Approval: Your
          Secret Weapon
        </h2>
        <p className="mb-6 text-slate-700">
          <strong>Pre-approval</strong> is a preliminary assessment where banks
          tell you exactly how much they&apos;ll lend you <em>before</em> you
          start property hunting. It&apos;s valid for 60-90 days and gives you
          massive negotiating power with sellers.
        </p>

        <Card className="border-2 border-blue-200 bg-linear-to-br from-blue-50 to-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Pre-Approval vs Final Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Feature
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Pre-Approval
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Final Approval
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">When to Apply</TableCell>
                    <TableCell className="text-blue-700 font-semibold">
                      Before property hunting
                    </TableCell>
                    <TableCell>After selecting property</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Documents Needed
                    </TableCell>
                    <TableCell>Basic (Income proof, CIBIL)</TableCell>
                    <TableCell>Complete (+ Property papers)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Timeline</TableCell>
                    <TableCell className="text-blue-700 font-semibold">
                      3-7 days
                    </TableCell>
                    <TableCell>15-30 days</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Validity</TableCell>
                    <TableCell>60-90 days</TableCell>
                    <TableCell>Until disbursement</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Commitment</TableCell>
                    <TableCell>Soft (subject to verification)</TableCell>
                    <TableCell>Hard (guaranteed funds)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-green-200 bg-green-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Benefits of Pre-Approval
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Know exact budget:</strong> No time wasted on
                    unaffordable properties
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Negotiate better:</strong> Sellers take you
                    seriously with pre-approval letter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Move fast:</strong> Beat other buyers who need weeks
                    for loan approval
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Rate lock:</strong> Some banks lock interest rate at
                    pre-approval stage
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 bg-slate-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-600" />
                Documents for Pre-Approval
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="font-semibold mb-2">Salaried Employees:</p>
              <ul className="space-y-1 mb-3">
                <li>• Last 3 months salary slips</li>
                <li>• Last 3 months bank statements</li>
                <li>• PAN card + Aadhaar card</li>
                <li>• Employment letter (optional)</li>
              </ul>
              <p className="font-semibold mb-2">Self-Employed:</p>
              <ul className="space-y-1">
                <li>• Last 2 years ITR with computation</li>
                <li>• Last 6 months bank statements</li>
                <li>• Business registration proof</li>
                <li>• PAN + Aadhaar</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 mb-2">
                Common Pre-Approval Mistakes
              </h4>
              <ul className="text-sm text-amber-900 space-y-1">
                <li>
                  <strong>1. Applying to only 1 bank:</strong> Get quotes from
                  3-4 lenders to compare rates.
                </li>
                <li>
                  <strong>2. Not reading fine print:</strong> Check processing
                  fees, pre-approval validity period.
                </li>
                <li>
                  <strong>3. Overestimating budget:</strong> Pre-approval shows
                  max loan, not what you should borrow (keep EMI &lt; 35%
                  income).
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700 mb-3 flex items-start gap-2">
            <Calculator className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
            <span>
              <strong>Ready for pre-approval?</strong> Calculate your
              eligibility and apply to top 3 banks instantly.
            </span>
          </p>
          <Link
            href="/loans/home-loan/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm shadow-sm"
          >
            <Calculator className="h-4 w-4" />
            Get Pre-Approval Estimates
          </Link>
        </div>
      </section>

      {/* --- NEW SECTION: PMAY GOVERNMENT SCHEMES --- */}
      <section id="pmay-schemes" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <IndianRupee className="h-6 w-6 text-orange-600" /> PMAY Subsidy: Get
          Up to ₹2.67 Lakh Free
        </h2>
        <p className="mb-6 text-slate-700">
          <strong>Pradhan Mantri Awas Yojana (PMAY)</strong> is the
          government&apos;s flagship scheme offering interest subsidy to
          first-time home buyers. If eligible, you receive a direct upfront
          subsidy that reduces your loan principal—essentially free money that
          saves lakhs over your loan tenure.
        </p>

        <Card className="border-2 border-orange-200 bg-linear-to-br from-orange-50 to-white shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-orange-600" />
              PMAY Credit Linked Subsidy Scheme (CLSS) - 2026 Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Category
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Annual Income
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Max Property Value
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Interest Subsidy
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Max Subsidy Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">EWS/LIG</TableCell>
                    <TableCell>Up to ₹6 Lakh</TableCell>
                    <TableCell>₹45 Lakh</TableCell>
                    <TableCell className="text-orange-700 font-bold">
                      6.50%
                    </TableCell>
                    <TableCell className="text-orange-700 font-bold">
                      ₹2.67 Lakh
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">MIG-I</TableCell>
                    <TableCell>₹6 - 12 Lakh</TableCell>
                    <TableCell>₹45 Lakh</TableCell>
                    <TableCell className="text-orange-700 font-bold">
                      4.00%
                    </TableCell>
                    <TableCell className="text-orange-700 font-bold">
                      ₹2.35 Lakh
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">MIG-II</TableCell>
                    <TableCell>₹12 - 18 Lakh</TableCell>
                    <TableCell>₹45 Lakh</TableCell>
                    <TableCell className="text-orange-700 font-bold">
                      3.00%
                    </TableCell>
                    <TableCell className="text-orange-700 font-bold">
                      ₹2.30 Lakh
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-slate-600 mt-3 italic">
              * Subsidy calculated on loan amount up to ₹6L (EWS/LIG), ₹9L
              (MIG-I), or ₹12L (MIG-II) for tenure of 20 years or actual tenure,
              whichever is lower.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-green-200 bg-green-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                PMAY Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>First-time buyer:</strong> You or family
                    shouldn&apos;t own any pucca house in India
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Income limit:</strong> Annual family income below
                    ₹18 lakh
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Property value:</strong> Not exceeding ₹45 lakh
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Carpet area:</strong> Max 60 sqm (metros), 90 sqm
                    (non-metros)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No prior subsidy:</strong> Haven&apos;t availed PMAY
                    benefit before
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Women ownership:</strong> Property in woman&apos;s
                    name (sole or joint) gets priority
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                How to Apply for PMAY
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ol className="space-y-2 list-decimal pl-5">
                <li>
                  <strong>Check eligibility:</strong> Visit pmaymis.gov.in and
                  use eligibility calculator
                </li>
                <li>
                  <strong>Get Aadhaar verified:</strong> Link Aadhaar with bank
                  account (mandatory)
                </li>
                <li>
                  <strong>Apply online:</strong> Fill PMAY-U application on
                  portal or through bank
                </li>
                <li>
                  <strong>Choose PMAY-linked lender:</strong> Not all banks
                  offer PMAY. Check approved list
                </li>
                <li>
                  <strong>Submit documents:</strong> Income proof, property
                  papers, Aadhaar, PAN
                </li>
                <li>
                  <strong>Sanction letter:</strong> Bank approves loan with PMAY
                  subsidy mentioned
                </li>
                <li>
                  <strong>Upfront subsidy:</strong> Government credits subsidy
                  directly to your loan account within 2-3 months
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Real Example */}
        <Card className="border-l-4 border-l-orange-600 bg-linear-to-br from-orange-50/30 to-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-orange-600" />
              Real Example: Priya&apos;s PMAY Savings (MIG-I Category)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border-2 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3">Profile</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Annual Income:</span>
                    <strong>₹10 Lakh</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Property Value:</span>
                    <strong>₹40 Lakh</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loan Amount:</span>
                    <strong>₹32 Lakh (80% LTV)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Interest Rate:</span>
                    <strong>8.75% p.a.</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tenure:</span>
                    <strong>20 Years</strong>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-2 border-orange-200">
                <h4 className="font-bold text-orange-900 mb-3">PMAY Impact</h4>
                <Table className="text-sm">
                  <TableBody>
                    <TableRow>
                      <TableCell>Without PMAY</TableCell>
                      <TableCell className="text-right">₹32,00,000</TableCell>
                    </TableRow>
                    <TableRow className="bg-orange-100">
                      <TableCell className="font-bold">
                        PMAY Subsidy (4% on ₹9L)
                      </TableCell>
                      <TableCell className="text-right font-bold text-orange-700">
                        - ₹2,35,000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">
                        Effective Loan Amount
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-700">
                        ₹29,65,000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>EMI Reduction</TableCell>
                      <TableCell className="text-right text-green-700 font-semibold">
                        ↓ ₹2,000/month
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-green-50">
                      <TableCell className="font-bold">
                        Total Savings (20 yrs)
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-800 text-lg">
                        ₹7.8 Lakh
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mt-4 bg-orange-100 p-4 rounded-lg border border-orange-300">
              <p className="text-sm text-orange-900 font-medium">
                💡 <strong>Pro Tip:</strong> Priya also gets tax benefits on the
                reduced EMI. Combined with PMAY, she saves over ₹10 lakh during
                the loan tenure!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 bg-red-50 p-5 rounded-xl border-2 border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 mb-2">
                Common PMAY Rejections
              </h4>
              <ul className="text-sm text-red-900 space-y-1">
                <li>
                  <strong>1. Property too expensive:</strong> ₹45L limit is
                  strict. Even ₹46L property is ineligible.
                </li>
                <li>
                  <strong>2. Already own property:</strong> Even ancestral
                  property in village disqualifies you.
                </li>
                <li>
                  <strong>3. Income proof mismatch:</strong> Showing ₹18L+
                  income leads to automatic rejection.
                </li>
                <li>
                  <strong>4. Applied through non-PMAY bank:</strong> Check
                  pmaymis.gov.in for approved lender list.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-3" type="leaderboard" />
      </div>

      {/* --- SECTION: ELIGIBILITY (UPDATED) --- */}
      <section id="eligibility" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="h-6 w-6 text-blue-600" /> Home Loan Eligibility
          for First-Timers (2026)
        </h2>
        <p className="mb-6 text-slate-700">
          Understanding eligibility is crucial for first-time buyers who often
          lack credit history. Here&apos;s what major Indian lenders evaluate:
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          1. Age Requirements
        </h3>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Bank/HFC
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Min Age
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Max Age at Maturity
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  First-Timer Friendly?
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>SBI, HDFC, ICICI</TableCell>
                <TableCell>21 years</TableCell>
                <TableCell>70 years</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  ✅ Yes
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Axis Bank</TableCell>
                <TableCell>21 years</TableCell>
                <TableCell>70 years</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  ✅ Yes
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PNB Housing</TableCell>
                <TableCell>21 years</TableCell>
                <TableCell>75 years</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  ✅ Yes
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LIC Housing</TableCell>
                <TableCell>21 years</TableCell>
                <TableCell>70 years</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  ✅ Most Lenient
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          2. Income & Credit Score (First-Timer Considerations)
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-slate-200 bg-slate-50/50 shadow-sm">
            <CardContent className="pt-4 text-sm text-slate-700">
              <strong className="block text-slate-900 mb-2">
                Income Criteria
              </strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Min Salary:</strong> ₹25k - ₹40k/month (varies by
                  city)
                </li>
                <li>
                  <strong>Business Income:</strong> ₹2L+ Annual (with 3 years
                  ITR)
                </li>
                <li>
                  <strong>Work Experience:</strong> Min 2 years total, 1 year in
                  current company
                </li>
                <li className="text-blue-700 font-semibold">
                  <strong>First-Timer Tip:</strong> Add parent/spouse as
                  co-applicant to boost eligibility
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-slate-50/50 shadow-sm">
            <CardContent className="pt-4 text-sm text-slate-700">
              <strong className="block text-slate-900 mb-2">
                Credit Score (CIBIL) - First-Timer Reality
              </strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>750+:</strong> Excellent rate (8.5%) - Easy approval
                </li>
                <li>
                  <strong>700-749:</strong> Good rate (8.75%) - Standard
                  approval
                </li>
                <li>
                  <strong>650-699:</strong> Average (9.5%) - Requires
                  co-borrower
                </li>
                <li>
                  <strong>&lt;650 or No History:</strong> High risk - Apply to
                  HFCs, add co-borrower with good score
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            First-Timers Without Credit History: Your Options
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-900">
            <div>
              <p className="font-semibold mb-2">
                Short-term (3-6 months before applying):
              </p>
              <ul className="space-y-1 list-disc pl-4">
                <li>Get secured credit card against FD</li>
                <li>Use it for small purchases, pay full amount on time</li>
                <li>This builds 700+ score in 6 months</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">
                Applying now without history:
              </p>
              <ul className="space-y-1 list-disc pl-4">
                <li>Add co-applicant with 750+ score (parent/spouse)</li>
                <li>Apply to HFCs (LIC Housing, PNB Housing more lenient)</li>
                <li>Provide alternative proof: rent receipts, utility bills</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: CO-BORROWER STRATEGY --- */}
      <section id="co-borrower" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="h-6 w-6 text-purple-600" /> Co-Borrower Strategy:
          Double Your Benefits
        </h2>
        <p className="mb-6 text-slate-700">
          Adding a co-borrower (spouse, parent, or sibling) to your home loan
          can <strong>double your tax benefits</strong>, increase loan
          eligibility by 50-100%, and improve approval chances if you have
          limited credit history. However, it comes with shared liability and
          impacts both credit scores.
        </p>

        <Card className="border-2 border-purple-200 bg-linear-to-br from-purple-50 to-white shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Co-Borrower vs Co-Owner vs Guarantor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Role
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Loan Liability
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Property Rights
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Tax Benefits
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Best For
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Co-Borrower</TableCell>
                    <TableCell className="text-red-700">
                      ✅ Yes (Joint)
                    </TableCell>
                    <TableCell className="text-green-700 font-bold">
                      ✅ Yes
                    </TableCell>
                    <TableCell className="text-green-700 font-bold">
                      ✅ Yes (Both)
                    </TableCell>
                    <TableCell>Spouse, parent with income</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Co-Owner</TableCell>
                    <TableCell>❌ No</TableCell>
                    <TableCell className="text-green-700 font-bold">
                      ✅ Yes
                    </TableCell>
                    <TableCell>❌ No</TableCell>
                    <TableCell>Adding family member to deed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Guarantor</TableCell>
                    <TableCell className="text-amber-700">
                      ⚠️ Only if you default
                    </TableCell>
                    <TableCell>❌ No</TableCell>
                    <TableCell>❌ No</TableCell>
                    <TableCell>Low credit score backup</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-green-200 bg-green-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Advantages of Co-Borrower
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Higher eligibility:</strong> Combined income =
                    50-100% more loan amount
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Double tax benefits:</strong> Each co-borrower
                    claims ₹3.5L = ₹7L total/year
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Better interest rate:</strong> Good co-borrower
                    CIBIL improves your rate
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Easy approval:</strong> Compensates for your limited
                    credit history
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✅</span>
                  <span>
                    <strong>Lower stamp duty:</strong> Many states offer 1-2%
                    discount if woman is co-owner
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-red-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disadvantages to Consider
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>
                    <strong>Joint liability:</strong> If you default,
                    co-borrower&apos;s CIBIL also tanks
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>
                    <strong>Affects co-borrower&apos;s loan capacity:</strong>{' '}
                    They can&apos;t buy another property easily
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>
                    <strong>Property ownership:</strong> Co-borrower must be
                    co-owner (can&apos;t remove later)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>
                    <strong>Relationship risk:</strong> Future disputes over
                    property ownership
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>
                    <strong>Exit hassles:</strong> Removing co-borrower requires
                    full refinancing
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Real Example */}
        <Card className="border-l-4 border-l-purple-600 bg-linear-to-br from-purple-50/30 to-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-purple-600" />
              Real Example: Rahul + Wife Neha as Co-Borrower
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border-2 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3">
                  Scenario A: Rahul Alone
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Rahul&apos;s Salary:</span>
                    <strong>₹60,000/month</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Max FOIR (50%):</span>
                    <strong>₹30,000 EMI</strong>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-slate-600">
                      Max Loan (8.5%, 20yr):
                    </span>
                    <strong className="text-red-700">₹35 Lakh</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax Benefit/year:</span>
                    <strong>₹3.5 Lakh</strong>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-200">
                <h4 className="font-bold text-purple-900 mb-3">
                  Scenario B: Rahul + Neha (Co-Borrower)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Combined Salary:</span>
                    <strong>₹1,00,000/month</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Max FOIR (50%):</span>
                    <strong>₹50,000 EMI</strong>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-slate-600">
                      Max Loan (8.5%, 20yr):
                    </span>
                    <strong className="text-green-700">₹58 Lakh (+66%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax Benefit/year:</span>
                    <strong className="text-green-700">
                      ₹7 Lakh (Both claim)
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-green-100 p-4 rounded-lg border border-green-300">
              <p className="text-sm text-green-900 font-semibold">
                💰 <strong>Result:</strong> By adding Neha, Rahul can buy a ₹58L
                property instead of ₹35L, and they save an extra ₹3.5L/year in
                taxes. Over 20 years, that&apos;s ₹70 lakh in additional tax
                savings!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Who Should You Add as Co-Borrower?
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">
                ✅ Best Choice: Spouse
              </p>
              <ul className="space-y-1 text-slate-700 text-xs">
                <li>• Natural co-owner</li>
                <li>• Double tax benefits</li>
                <li>• Lower stamp duty (women)</li>
                <li>• No future ownership disputes</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">
                ⚠️ Good Choice: Parent
              </p>
              <ul className="space-y-1 text-slate-700 text-xs">
                <li>• If single/unmarried</li>
                <li>• Parent has steady income</li>
                <li>• Consider inheritance issues</li>
                <li>• Exit clause if you marry later</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">
                ❌ Risky: Sibling/Friend
              </p>
              <ul className="space-y-1 text-slate-700 text-xs">
                <li>• High ownership dispute risk</li>
                <li>• Complex family dynamics</li>
                <li>• Hard to exit arrangement</li>
                <li>• Use only as last resort</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-4" type="leaderboard" />
      </div>

      {/* --- SECTION: FOIR (UPDATED) --- */}
      <section id="foir" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-indigo-600" /> FOIR: The
          Make-or-Break Number
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`<p><strong>FOIR (Fixed Obligations to Income Ratio)</strong> is the percentage of your monthly income that goes toward fixed financial obligations like EMIs and rent. Banks use FOIR to determine if you can actually afford the home loan EMI without defaulting.</p>
            <p class="mt-3">For first-time buyers, understanding FOIR is critical because many overestimate their borrowing capacity, leading to rejection or financial stress post-approval.</p>`}
          />
        </div>

        {/* IMAGE: FOIR Calculation */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/foir-calculation.webp"
            alt="FOIR calculation formula showing income vs obligations for home loan eligibility | First-Time Buyer Guide 2026"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-indigo-100 bg-indigo-50/30 mb-6 shadow-sm">
          <CardHeader className="pb-2 border-b border-indigo-100">
            <CardTitle className="text-indigo-900 text-lg">
              FOIR Calculation Example
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Income Side
                </h4>
                <div className="space-y-1 bg-white p-3 rounded border">
                  <div className="flex justify-between">
                    <span>Gross Monthly Salary:</span>
                    <strong>₹80,000</strong>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>(Before tax deductions)</span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Obligations Side
                </h4>
                <div className="space-y-1 bg-white p-3 rounded border">
                  <div className="flex justify-between text-xs">
                    <span>Personal Loan EMI:</span>
                    <span>₹8,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Car Loan EMI:</span>
                    <span>₹12,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Credit Card EMI:</span>
                    <span>₹3,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Proposed Home Loan EMI:</span>
                    <span>₹25,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-bold">
                    <span>Total Obligations:</span>
                    <span>₹48,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg border-2 border-indigo-300 text-center">
              <p className="font-bold text-indigo-800 text-lg mb-1">
                FOIR = (₹48,000 / ₹80,000) × 100 = 60%
              </p>
              <p className="text-xs text-indigo-700">
                This is at the upper limit. Banks prefer 50-55% FOIR for
                first-timers.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Lender Type
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Max FOIR Allowed
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Your Take-Home
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  First-Timer Advice
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Public Sector Banks
                </TableCell>
                <TableCell className="text-amber-700 font-bold">50%</TableCell>
                <TableCell>50%</TableCell>
                <TableCell className="text-xs">Strictest criteria</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Private Banks</TableCell>
                <TableCell className="text-amber-700 font-bold">
                  50-55%
                </TableCell>
                <TableCell>45-50%</TableCell>
                <TableCell className="text-xs">Standard for most</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HFCs (LIC, PNB)</TableCell>
                <TableCell className="text-red-700 font-bold">55-60%</TableCell>
                <TableCell>40-45%</TableCell>
                <TableCell className="text-xs">
                  More lenient, but risky
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-red-200 bg-red-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-red-900 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                High FOIR Warning Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Can&apos;t save:</strong> Living paycheck to
                    paycheck
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No emergency fund:</strong> Vulnerable to income
                    shocks
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Delayed EMIs:</strong> High default risk
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>High stress:</strong> Mental health impact
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                How to Reduce FOIR
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Close personal loans:</strong> Pay off high-interest
                    debts first
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Clear credit cards:</strong> Reduces monthly
                    obligations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Add co-borrower:</strong> Increases combined income
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Wait for increment:</strong> Delay by 3-6 months if
                    needed
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-slate-900 flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>First-Timer Tip:</strong> Aim for 40-45% FOIR, not the
              maximum 60%. This gives you breathing room for unexpected expenses
              (medical, car repairs, weddings) and lets you save for prepayment
              or investments.
            </span>
          </p>
        </div>
      </section>

      {/* --- SECTION: DOWN PAYMENT (UPDATED) --- */}
      <section id="down-payment" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-emerald-600" /> Down Payment Rules:
          Budget for 30-35%
        </h2>
        <p className="mb-6 text-slate-700">
          Many first-time buyers think down payment = 20% of property value.
          Wrong! You need to budget for
          <strong> 30-35% of total property cost</strong> upfront when factoring
          in stamp duty, registration, and other charges.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Property Value
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Max LTV (Bank Loan)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Your Down Payment
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Example
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Up to ₹30 Lakh</TableCell>
                <TableCell className="text-green-700 font-bold">90%</TableCell>
                <TableCell className="text-emerald-700 font-bold">
                  10%
                </TableCell>
                <TableCell className="text-sm">
                  ₹25L property = ₹2.5L down payment
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">₹30L - ₹75L</TableCell>
                <TableCell className="text-amber-700 font-bold">80%</TableCell>
                <TableCell className="text-emerald-700 font-bold">
                  20%
                </TableCell>
                <TableCell className="text-sm">
                  ₹50L property = ₹10L down payment
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Above ₹75 Lakh</TableCell>
                <TableCell className="text-red-700 font-bold">75%</TableCell>
                <TableCell className="text-emerald-700 font-bold">
                  25%
                </TableCell>
                <TableCell className="text-sm">
                  ₹1Cr property = ₹25L down payment
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="border-l-4 border-l-emerald-600 bg-linear-to-br from-emerald-50/30 to-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Complete Upfront Cost Breakdown (₹50L Property Example)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Property Value</TableCell>
                  <TableCell className="text-right">₹50,00,000</TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    Base cost
                  </TableCell>
                </TableRow>
                <TableRow className="bg-emerald-50">
                  <TableCell className="font-medium">
                    Down Payment (20%)
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-700">
                    ₹10,00,000
                  </TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    To seller
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Stamp Duty (6% avg)</TableCell>
                  <TableCell className="text-right">₹3,00,000</TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    State govt
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Registration Charges (1%)</TableCell>
                  <TableCell className="text-right">₹50,000</TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    Sub-registrar
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Home Loan Processing Fee (0.5%)</TableCell>
                  <TableCell className="text-right">₹25,000</TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    Bank charges
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Legal/Valuation Charges</TableCell>
                  <TableCell className="text-right">₹15,000</TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    Verification
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Home Insurance (First year)</TableCell>
                  <TableCell className="text-right">₹10,000</TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    Mandatory
                  </TableCell>
                </TableRow>
                <TableRow className="border-t-2">
                  <TableCell className="font-bold text-lg">
                    Total Upfront Cost
                  </TableCell>
                  <TableCell className="text-right font-bold text-red-700 text-xl">
                    ₹14,00,000
                  </TableCell>
                  <TableCell className="text-right text-xs font-bold text-red-700">
                    28% of property
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-red-900 font-semibold">
                ⚠️ <strong>Reality Check:</strong> For a ₹50L property, you need
                ₹14L cash upfront, not just ₹10L. Plus keep ₹2-3L extra for
                furnishing and emergencies. Total savings needed:{' '}
                <strong>₹17L minimum</strong>.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-slate-900 mb-3">
            <strong>💡 First-Timer Saving Strategy:</strong>
          </p>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>
              • Start saving 20-25% of salary in dedicated account 2 years
              before
            </li>
            <li>
              • Use recurring deposits/liquid funds (don&apos;t lock in fixed
              deposits)
            </li>
            <li>
              • Negotiate stamp duty discount if property in woman&apos;s name
              (1-2% in many states)
            </li>
            <li>
              • Ask bank to waive processing fee during festive offers (saves
              ₹25-50k)
            </li>
          </ul>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-5" type="leaderboard" />
      </div>

      {/* --- SECTION: INTEREST TYPES (UPDATED) --- */}
      <section id="interest-types" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Percent className="h-6 w-6 text-teal-600" /> Fixed vs Floating: Which
          Rate for First-Timers?
        </h2>

        {/* IMAGE: Rates Graph */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/fixed-vs-floating-rates.webp"
            alt="Comparison graph of fixed vs floating interest rates over 20 year period | Home Loan Guide 2026"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-teal-100 bg-teal-50/30 shadow-sm">
            <CardHeader className="pb-2 border-b border-teal-100">
              <CardTitle className="text-teal-800 text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Floating Rate (Recommended for 95% of First-Timers)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-3">
                Interest rate changes with RBI Repo Rate. Most popular choice in
                India.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lower starting rate:</strong> 8.50-8.75% vs 9.5%+
                    for fixed
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero prepayment charges:</strong> RBI mandates free
                    foreclosure
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rate cuts benefit you:</strong> EMI reduces when RBI
                    cuts rates
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>EMI fluctuates:</strong> Increases when RBI hikes
                    rates (±₹1-2k/month)
                  </span>
                </div>
              </div>
              <div className="mt-3 bg-teal-100 p-3 rounded border border-teal-200">
                <p className="text-xs text-teal-900 font-semibold">
                  ✅ Choose if: 20+ year tenure, can handle EMI fluctuations,
                  want flexibility to prepay
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50 shadow-sm">
            <CardHeader className="pb-2 border-b border-slate-200">
              <CardTitle className="text-slate-800 text-lg">
                Fixed Rate (Niche Use Case)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <p className="mb-3">
                Constant rate for 3-5 years, then converts to floating.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>EMI certainty:</strong> No surprises in budget
                    planning
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Protection from hikes:</strong> Safe if RBI
                    increases rates aggressively
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Higher starting rate:</strong> 9.5-10% vs 8.5%
                    floating
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prepayment penalties:</strong> 2-4% of outstanding
                    if closed early
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Miss rate cuts:</strong> Stuck at high rate if RBI
                    reduces
                  </span>
                </div>
              </div>
              <div className="mt-3 bg-slate-100 p-3 rounded border border-slate-200">
                <p className="text-xs text-slate-700 font-semibold">
                  ⚠️ Choose if: Tight budget, can&apos;t afford ₹1-2k EMI
                  increase, 5-10 year tenure only
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 mb-2">
                First-Timer Mistake: Choosing Fixed Rate
              </h4>
              <p className="text-sm text-amber-900 mb-2">
                82% of Indian borrowers choose floating rate. Fixed rates are
                popular only during high inflation periods. In Feb 2026, with
                RBI expected to cut rates, floating is the clear winner.
              </p>
              <p className="text-xs text-amber-800 italic">
                <strong>Example:</strong> Raghav took ₹40L fixed at 9.8% in
                2024. RBI cut rates by 0.75% in 2025-26. His friend with
                floating rate now pays ₹2,300 less EMI per month. Raghav
                can&apos;t prepay without 3% penalty (₹1.2L loss).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: TAX BENEFITS (UPDATED WITH 80EEA WARNING) --- */}
      <section id="tax-benefits" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits:
          Save ₹3.5 Lakh/Year (Old Regime)
        </h2>

        {/* Critical Warning about 80EEA */}
        <div className="mb-6 bg-red-50 p-5 rounded-xl border-2 border-red-300">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 mb-2 text-lg">
                ⚠️ CRITICAL UPDATE: Section 80EEA Expired
              </h4>
              <p className="text-sm text-red-900 mb-2">
                <strong>Section 80EEA</strong> (additional ₹1.5 lakh deduction
                for first-time buyers){' '}
                <strong>expired on March 31, 2022</strong>. It is NO LONGER
                AVAILABLE for loans sanctioned after this date.
              </p>
              <p className="text-sm text-red-900">
                Maximum tax benefit available now:{' '}
                <strong>₹3.5 lakh/year</strong> (₹1.5L under 80C + ₹2L under
                24b). Many websites still show outdated ₹5L benefit—ignore them.
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE: Tax Benefits */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/tax-benefits-80c-24b.webp"
            alt="Tax savings breakdown under section 80C and 24b for home loan borrowers 2026"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-emerald-100 bg-emerald-50/30 shadow-sm">
            <CardHeader className="pb-2 border-b border-emerald-100">
              <CardTitle className="text-emerald-800 text-lg">
                Section 80C (Principal Repayment)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span>Max Deduction:</span>
                  <strong className="text-emerald-700">₹1,50,000/year</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tax Saved (30% bracket):</span>
                  <strong className="text-emerald-700">₹46,800/year</strong>
                </div>
              </div>
              <ul className="space-y-1 text-xs">
                <li>• Includes stamp duty & registration (one-time)</li>
                <li>• Principal portion of EMI qualifies</li>
                <li>
                  • Property shouldn&apos;t be sold within 5 years (clawback)
                </li>
                <li>
                  • Shared with PPF, ELSS, LIC premiums (₹1.5L combined limit)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/30 shadow-sm">
            <CardHeader className="pb-2 border-b border-emerald-100">
              <CardTitle className="text-emerald-800 text-lg">
                Section 24(b) (Interest Payment)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span>Max Deduction:</span>
                  <strong className="text-emerald-700">₹2,00,000/year</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tax Saved (30% bracket):</span>
                  <strong className="text-emerald-700">₹62,400/year</strong>
                </div>
              </div>
              <ul className="space-y-1 text-xs">
                <li>• Self-occupied property: Max ₹2L</li>
                <li>• Let-out property: Full interest deductible (no limit)</li>
                <li>• Construction must complete within 5 years of loan</li>
                <li>
                  • Pre-construction interest deducted over 5 years (1/5th
                  annually)
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Old vs New Regime Comparison */}
        <Card className="border-2 border-blue-200 bg-linear-to-br from-blue-50 to-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Old vs New Tax Regime: Which for Home Loan?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-900">
                    Feature
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Old Regime
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    New Regime
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Home Loan Benefits
                  </TableCell>
                  <TableCell className="text-green-700 font-bold">
                    ✅ ₹3.5L/year
                  </TableCell>
                  <TableCell className="text-red-700 font-bold">
                    ❌ Zero
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tax Slabs</TableCell>
                  <TableCell>10%, 20%, 30%</TableCell>
                  <TableCell>5%, 10%, 15%, 20%, 30%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Other Deductions
                  </TableCell>
                  <TableCell>PPF, ELSS, NPS, etc.</TableCell>
                  <TableCell>Only Standard ₹50k</TableCell>
                </TableRow>
                <TableRow className="bg-green-50">
                  <TableCell className="font-bold">
                    Best for Home Buyers?
                  </TableCell>
                  <TableCell className="font-bold text-green-700">
                    ✅ Yes (if income &lt; ₹15L)
                  </TableCell>
                  <TableCell className="font-bold text-slate-600">
                    Only if income &gt; ₹20L
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-slate-600 mt-3 italic">
              * For ₹12L income with ₹40k EMI, old regime saves ₹1.05L more in
              taxes annually. Use our Income Tax Calculator to compare.
            </p>
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-slate-900 flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>First-Timer Tip:</strong> Stay in old tax regime for first
              5-7 years of home loan. Interest component is highest in early
              years (₹2L+ annually), maximizing your 24(b) benefit. Switch to
              new regime later if your income crosses ₹20L and deductions
              reduce.
            </span>
          </p>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-6" type="leaderboard" />
      </div>

      {/* --- SECTION: 7 COSTLY MISTAKES (EXPANDED) --- */}
      <section id="mistakes" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <XCircle className="h-6 w-6 text-red-500" /> 7 Costly Mistakes
          First-Time Buyers Make
        </h2>
        <p className="mb-6 text-slate-700">
          Learn from others&apos; expensive mistakes. These 7 errors cost
          first-time buyers lakhs of rupees and years of stress.
        </p>

        <div className="space-y-6">
          {/* Mistake 1 */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Not Getting Pre-Approved Before Property Hunting
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>The Mistake:</strong> Falling in love with ₹60L
                    property, then discovering you&apos;re eligible for only
                    ₹40L loan.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-2">
                    <p className="text-xs text-red-900">
                      <strong>Real Story:</strong> Anjali spent 3 months
                      searching Mumbai properties, paid ₹1L token for ₹58L flat.
                      Bank approved only ₹35L. Lost token money + dream home.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Solution:</strong> Get pre-approval from 3 banks
                      BEFORE property hunting. Know exact budget. Show
                      pre-approval letter to negotiate 5-10% discount with
                      seller.
                    </p>
                  </div>
                  <p className="text-xs text-red-700 font-bold mt-2">
                    💸 Cost: ₹1L+ token loss + 3 months wasted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 2 */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Underestimating Total Upfront Costs
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>The Mistake:</strong> Saving only 20% down payment,
                    forgetting stamp duty (5-7%), registration (1%), furnishing
                    (₹3-5L).
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-2">
                    <p className="text-xs text-red-900">
                      <strong>Real Story:</strong> Rohit saved ₹10L for ₹50L
                      flat. Shocked by ₹3L stamp duty + ₹50k registration + ₹4L
                      furnishing. Had to take personal loan at 14% for remaining
                      ₹7.5L.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Solution:</strong> Budget 35% of property value
                      upfront (not 20%). For ₹50L property: ₹10L down payment +
                      ₹3L stamp duty + ₹50k registration + ₹25k bank charges +
                      ₹3L furnishing = ₹17L total.
                    </p>
                  </div>
                  <p className="text-xs text-red-700 font-bold mt-2">
                    💸 Cost: ₹1-2L extra in personal loan interest (14% vs 8.5%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 3 */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Choosing Maximum Tenure to Lower EMI
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>The Mistake:</strong> Choosing 30-year tenure for
                    &quot;affordable&quot; ₹30k EMI instead of 20-year ₹38k EMI.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-2">
                    <p className="text-xs text-red-900">
                      <strong>Real Story:</strong> Priya took ₹40L for 30 years
                      (EMI ₹33k). Friend Neha took same loan for 20 years (EMI
                      ₹41k). After 20 years, Priya still owes ₹18L while Neha is
                      debt-free. Priya will pay ₹78L total interest vs
                      Neha&apos;s ₹51L.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Solution:</strong> Choose 15-20 year tenure. If
                      EMI unaffordable, buy cheaper property instead. Your
                      salary will grow—prepay aggressively in years 3-7 to
                      reduce tenure.
                    </p>
                  </div>
                  <p className="text-xs text-red-700 font-bold mt-2">
                    💸 Cost: ₹27L extra interest over loan life
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 4 */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Not Checking CIBIL Score Before Applying
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>The Mistake:</strong> Applying with 640 score,
                    getting rejection that further damages score to 610.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-2">
                    <p className="text-xs text-red-900">
                      <strong>Real Story:</strong> Arun applied to 4 banks with
                      655 score. All rejected (multiple inquiries dropped score
                      to 620). Waited 8 months to rebuild score to 730, then
                      approved but at 9.25% instead of 8.5%.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Solution:</strong> Check CIBIL 6 months before
                      applying. If &lt;700, spend 6 months improving: pay all
                      dues, reduce credit utilization to &lt;30%, dispute
                      errors. Target 750+ before applying.
                    </p>
                  </div>
                  <p className="text-xs text-red-700 font-bold mt-2">
                    💸 Cost: 0.75% higher rate = ₹2.8L extra interest on
                    ₹40L/20yr loan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 5 */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-lg">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Skipping Property Legal Verification
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>The Mistake:</strong> Trusting builder&apos;s
                    documents without independent lawyer verification.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-2">
                    <p className="text-xs text-red-900">
                      <strong>Real Story:</strong> Meera bought ₹55L flat, bank
                      approved loan. After 1 year, discovered property had
                      pending litigation. Can&apos;t sell or rent. Stuck paying
                      EMI for unusable property.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Solution:</strong> Hire property lawyer (₹10-15k)
                      to verify: title deed chain, encumbrance certificate, NOC
                      from authorities, approved building plans, occupancy
                      certificate. Don&apos;t rely only on bank&apos;s
                      verification.
                    </p>
                  </div>
                  <p className="text-xs text-red-700 font-bold mt-2">
                    💸 Cost: Entire ₹55L investment at risk + legal fees ₹2-5L
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 6 */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-lg">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Missing Out on PMAY Subsidy
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>The Mistake:</strong> Not applying for PMAY despite
                    being eligible, losing ₹2.35L free subsidy.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-2">
                    <p className="text-xs text-red-900">
                      <strong>Real Story:</strong> Karan bought ₹42L flat with
                      ₹10L income. Didn&apos;t know about PMAY. Friend told him
                      2 years later—too late to apply retroactively. Lost ₹2.35L
                      subsidy forever.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Solution:</strong> Check PMAY eligibility on
                      pmaymis.gov.in BEFORE loan approval. Income &lt;₹18L +
                      Property &lt;₹45L + First home = Apply immediately. Choose
                      PMAY-approved bank.
                    </p>
                  </div>
                  <p className="text-xs text-red-700 font-bold mt-2">
                    💸 Cost: ₹2.35L direct subsidy lost + ₹5.5L interest savings
                    over 20 years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 7 */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-lg">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Not Comparing Multiple Banks
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>The Mistake:</strong> Going with employer tie-up
                    bank at 9.15% without comparing other banks offering 8.65%.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-2">
                    <p className="text-xs text-red-900">
                      <strong>Real Story:</strong> Vikram took ₹45L at 9.15%
                      from HDFC (employer tie-up). Colleague got 8.65% from SBI.
                      0.5% difference = ₹4,200 higher EMI for Vikram. Over 20
                      years, he pays ₹10L extra.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Solution:</strong> Get quotes from minimum 4 banks
                      (2 PSU + 2 private). Compare: interest rate, processing
                      fee, prepayment charges, tenure flexibility. Negotiate
                      using competitor quotes.
                    </p>
                  </div>
                  <p className="text-xs text-red-700 font-bold mt-2">
                    💸 Cost: ₹10L+ extra interest due to 0.5% higher rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-slate-900 flex items-start gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Avoiding These 7 Mistakes Saves:</strong> ₹1L token + ₹2L
              personal loan interest + ₹27L excess tenure interest + ₹2.8L rate
              difference + ₹5L legal risk + ₹2.35L PMAY + ₹10L comparison ={' '}
              <strong>₹50+ Lakh over loan life</strong>
            </span>
          </p>
        </div>
      </section>

      {/* --- SECTION: CHECKLIST (UPDATED) --- */}
      <section id="checklist" className="mb-12 scroll-mt-20">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-emerald-600" /> Complete
              Application Checklist for First-Timers
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">
                    Phase 1
                  </span>
                  Pre-Application (6 Months Before)
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Check CIBIL Score:</strong> Get free report,
                      target 750+. Dispute errors immediately.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Calculate Affordability:</strong> EMI should be
                      max 35% of income. Use calculator to find budget.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Start Saving Down Payment:</strong> Target 30-35%
                      of property value (not just 20%).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Build Credit History:</strong> If no credit card,
                      get secured card and use responsibly for 6 months.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Close Unnecessary Loans:</strong> Pay off personal
                      loans, reduce credit card dues to improve FOIR.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Research PMAY Eligibility:</strong> Check if
                      income &lt;₹18L and property will be &lt;₹45L.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                    Phase 2
                  </span>
                  Application Stage (3 Months Before)
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Gather Income Documents:</strong> Salaried: 6
                      months salary slips, Form 16, bank statements.
                      Self-employed: 3 years ITR, audited financials.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Gather KYC Documents:</strong> PAN card, Aadhaar
                      card, passport, voter ID, passport size photos (10
                      copies).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Apply for Pre-Approval:</strong> Submit to 3-4
                      banks (mix of PSU and private). Get sanction letters.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Decide on Co-Borrower:</strong> Add spouse/parent
                      if needed for higher eligibility or better rate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Compare Final Offers:</strong> Interest rate,
                      processing fee, tenure options, prepayment terms.
                      Negotiate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Property Hunting:</strong> Visit 5-7 properties,
                      check location, builder reputation, legal documents.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-bold">
                    Phase 3
                  </span>
                  Property Selection (1 Month Before)
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Verify Legal Documents:</strong> Title deed,
                      encumbrance certificate, approved building plans, NOC,
                      occupancy certificate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Hire Property Lawyer:</strong> Independent
                      verification (₹10-15k). Don&apos;t rely only on
                      bank&apos;s check.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Negotiate Price:</strong> Show pre-approval
                      letter, ask for 5-10% discount or free furnishings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Pay Token Amount:</strong> ₹50k-1L. Get token
                      receipt, sign MOU (Memorandum of Understanding).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Submit Property Papers to Bank:</strong> Sale
                      agreement, NOC, approved plans for bank&apos;s
                      legal/technical verification.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                    Phase 4
                  </span>
                  Disbursement & Possession (Current Month)
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Wait for Bank Verification:</strong> Legal +
                      Technical check takes 15-20 days. Follow up weekly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Receive Final Sanction Letter:</strong> Confirms
                      loan amount, interest rate, tenure. Review carefully.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sign Loan Agreement:</strong> Read all terms,
                      check prepayment clauses, processing fee, late payment
                      charges.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Buy Home Loan Insurance:</strong> Mandatory by
                      most banks. Shop for best rates (₹8-12k/year).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Register Property:</strong> Pay stamp duty (5-7%)
                      + registration (1%) at sub-registrar office. Get
                      registered sale deed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Disburses Funds:</strong> Directly to
                      seller&apos;s account. Collect keys from builder/seller.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Collect Original Documents:</strong> Bank holds
                      till loan repaid. You get photocopy + acknowledgement
                      receipt.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Set Up Auto-Debit EMI:</strong> Link bank account,
                      set EMI date after salary credit. Never miss EMI (damages
                      CIBIL).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 bg-emerald-50 p-5 rounded-xl border-2 border-emerald-200">
                <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Post-Possession: Next Steps
                </h4>
                <ul className="text-sm text-emerald-900 space-y-1">
                  <li>
                    • Update address in Aadhaar, PAN, bank, employer (within 3
                    months)
                  </li>
                  <li>
                    • Apply for PMAY subsidy if eligible (within 6 months of
                    disbursement)
                  </li>
                  <li>
                    • Keep all receipts for tax filing (stamp duty,
                    registration, EMI statements)
                  </li>
                  <li>
                    • Start prepayment from Year 2-3 onwards (saves maximum
                    interest)
                  </li>
                  <li>
                    • Review home insurance annually, switch if better rates
                    available
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-7" type="leaderboard" />
      </div>

      {/* --- FAQS (UPDATED) --- */}
      <section id="faqs" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Frequently Asked Questions (First-Time Buyers)
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-white shadow-sm"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* --- KEY TAKEAWAYS --- */}
      <Card className="mb-12 border-l-4 border-l-blue-600 bg-linear-to-br from-blue-50/50 to-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
            Key Takeaways for First-Time Buyers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Start 6 months early:</strong> Build CIBIL score to
                750+, save 35% of property value, get pre-approved before
                hunting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>PMAY is free money:</strong> If income &lt;₹18L and
                property &lt;₹45L, apply for up to ₹2.67L subsidy. Don&apos;t
                miss this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Co-borrower doubles benefits:</strong> Add spouse to
                claim ₹7L tax benefits/year instead of ₹3.5L. Plus increase
                eligibility by 50-100%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Choose floating rate:</strong> 95% of Indians choose
                floating. Lower rate (8.5%), zero prepayment charges, benefits
                from RBI cuts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Keep EMI &lt;35% of income:</strong> Not the bank&apos;s
                max 60%. You need buffer for emergencies, savings, lifestyle
                expenses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Choose 15-20 year tenure:</strong> Not 25-30 years.
                You&apos;ll pay 2-3x property value in interest. Buy cheaper
                property if needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Old tax regime for home buyers:</strong> Save ₹3.5L/year
                vs zero in new regime. Switch to new only if income &gt;₹20L
                later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Compare 4+ banks:</strong> 0.5% rate difference = ₹10L
                over 20 years. Get quotes from 2 PSU + 2 private banks minimum.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* --- FINAL CTA --- */}
      <Card className="mb-8 bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <Home className="h-16 w-16 mb-4 text-blue-100" />
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to Start Your Home Buying Journey?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Calculate your exact eligibility, compare banks, and get
            pre-approval estimates in 2 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loans/home-loan/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg inline-flex items-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculate My Eligibility
            </Link>
            <Link
              href="/guides/home-loan-guide/"
              className="rounded-lg border-2 border-blue-300 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50 inline-flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              Advanced Home Loan Guide
            </Link>
          </div>
          <p className="text-xs text-blue-200 mt-6">
            Free • No registration • Instant results • Compare top banks
          </p>
        </CardContent>
      </Card>

      {/* Related Guides */}
      <Card className="mb-12 border border-slate-200 bg-white shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Related Guides & Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/guides/home-loan-guide/"
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700">
                Complete Home Loan Guide
              </h4>
              <p className="text-sm text-slate-600">
                Advanced guide covering prepayment, balance transfer, and
                refinancing strategies
              </p>
            </Link>

            <Link
              href="/loans/home-loan/"
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700">
                Home Loan EMI Calculator
              </h4>
              <p className="text-sm text-slate-600">
                Calculate monthly EMI, total interest, eligibility, and
                prepayment impact
              </p>
            </Link>

            <Link
              href="/income-tax-calculator/"
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700">
                Income Tax Calculator
              </h4>
              <p className="text-sm text-slate-600">
                Compare old vs new regime with home loan deductions and see
                actual savings
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Author Bio */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Written by Fincado Research Team
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  Expert financial analysts specializing in personal finance,
                  home loans, and tax planning for Indian consumers. Our team
                  has helped over 50,000 first-time buyers navigate the home
                  loan process successfully.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Home Loans & Mortgages
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    First-Time Buyer Advisory
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Tax Planning
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    PMAY Expert
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share Tools */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-4 text-center">
          Found this guide helpful? Share it with friends planning to buy their
          first home:
        </p>
        <div className="flex justify-center">
          <ShareTools title="First-Time Home Buyer Guide India 2026" />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-2 text-sm">Disclaimer</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          This guide is for educational purposes only and should not be
          considered financial advice. Home loan interest rates, eligibility
          criteria, PMAY schemes, and tax laws are subject to change. Section
          80EEA expired on March 31, 2022, and is no longer available. Please
          consult with a certified financial advisor, chartered accountant, or
          property lawyer before making any financial or property decisions.
          Actual loan approval and terms depend on individual circumstances,
          bank policies, credit profile, and property verification. Information
          last updated: <strong>{updatedLabel}</strong>.
        </p>
      </div>
    </article>
  );
}
