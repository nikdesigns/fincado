import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreditScoreClient from './CreditScoreClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { CreditScoreSchemas } from '@/components/schemas/CreditScoreSchemas';
import {
  TrendingUp,
  Info,
  CreditCard,
  ArrowRight,
  Building,
  Shield,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Credit Score Calculator 2026 – Free CIBIL Score Estimator India',
  description:
    'Estimate your credit score (300-900) instantly. Check impact of payment history, utilization, inquiries. Get personalized tips to reach 750+ CIBIL score for best loan rates.',
  keywords: [
    'Credit Score Calculator',
    'CIBIL Score Estimator',
    'Check Credit Score Free India',
    'Improve CIBIL Score',
    'Credit Utilization Calculator',
    'Soft vs Hard Inquiry Credit',
    'Free Credit Report India',
    'CIBIL Experian Equifax Score'
  ],
  alternates: {
    canonical: 'https://fincado.com/credit-score/',
  },
  openGraph: {
    title: 'Credit Score Calculator 2026 – Boost Your CIBIL to 750+',
    description:
      'Free credit score estimator with impact analysis. Simulate score improvements by reducing utilization or clearing defaults.',
    url: 'https://fincado.com/credit-score/',
    type: 'website',
    images: [
      {
        url: '/og-credit-score.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Credit Score Calculator',
      }
    ],
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'faq-1',
    question: 'What is a good credit score in India?',
    answer:
      'A credit score of 750+ is considered excellent in India. 700-749 is good, 650-699 is fair, 600-649 is average, and below 600 is poor. Lenders prefer 750+ for best interest rates and instant loan approvals.',
  },
  {
    id: 'faq-2',
    question: 'How is credit score calculated in India?',
    answer:
      'Credit score is calculated based on: Payment History (35% weight) - on-time EMI and card payments; Credit Utilization (30%) - how much of credit limit used; Credit Age (15%) - average age of accounts; Credit Mix (10%) - secured & unsecured loans; New Inquiries (10%) - recent hard inquiries. Formula varies by bureau (CIBIL, Experian, Equifax, CRIF).',
  },
  {
    id: 'faq-3',
    question: 'How to check credit score for free in India?',
    answer:
      'Free credit score sources: (1) CIBIL once/year at cibil.com, (2) Bank apps (HDFC, ICICI, SBI offer free monthly scores), (3) Fintech apps like Paytm, PhonePe, Google Pay, (4) Credit bureaus: Experian, Equifax, CRIF High Mark websites. Avoid paid services that claim "instant" scores - free sources are equally reliable.',
  },
  {
    id: 'faq-4',
    question:
      'What is the difference between CIBIL, Experian, Equifax, and CRIF?',
    answer:
      'All four are RBI-licensed credit bureaus in India that calculate credit scores from 300-900. CIBIL (TransUnion) is most popular (90% lender coverage). Experian, Equifax, CRIF High Mark are equally valid. Scores may differ by 10-30 points due to different lender reporting. Check all four annually for comprehensive view.',
  },
  {
    id: 'faq-5',
    question: 'How long does it take to improve credit score?',
    answer:
      'Timeline for improvement: (1) Immediate (same month): Pay down credit card utilization below 30%, (2) 1-3 months: Consistent on-time payments reflect in score, (3) 3-6 months: Hard inquiry impact diminishes, (4) 6-12 months: Significant improvement with clean record, (5) 7 years: Defaults and settlements removed from report. Average time for poor to good: 6-12 months with discipline.',
  },
  {
    id: 'faq-6',
    question: 'Does checking my own credit score hurt it?',
    answer:
      'No. Checking your own credit score (soft inquiry) does NOT hurt your score. You can check unlimited times. Only HARD inquiries by lenders (when you apply for loan/card) impact score by 5-10 points. Soft inquiries (self-check, employer check, pre-approved offers) have zero impact.',
  },
  {
    id: 'faq-7',
    question: 'What is credit utilization and why does it matter?',
    answer:
      'Credit utilization = (Current credit card balance ÷ Total credit limit) × 100. Example: ₹45,000 balance on ₹1,00,000 limit = 45% utilization. Ideal: Below 30%. Above 50% signals credit hunger and drops score. Quick fix: Pay down balance or request limit increase. Utilization accounts for 30% of score calculation.',
  },
  {
    id: 'faq-8',
    question: 'How long do defaults stay on credit report?',
    answer:
      'Negative information stays for 7 years from date of first delinquency: (1) Defaults (90+ days late), (2) Settlements (partial payment accepted), (3) Write-offs, (4) Bankruptcy/insolvency. Impact diminishes over time but visible for full 7 years. Hard inquiries stay for 2 years. Positive information stays indefinitely.',
  },
  {
    id: 'faq-9',
    question: 'Should I close unused credit cards?',
    answer:
      'No, do NOT close old unused credit cards. Closing reduces total credit limit (increases utilization) and reduces average account age (both hurt score). Instead: Keep old cards active with small monthly transaction (₹200-500) and set up auto-pay. Zero annual fee cards should never be closed.',
  },
  {
    id: 'faq-10',
    question: 'Can I get a loan with 650 credit score?',
    answer:
      'Yes, but with limitations. 650 score: (1) Personal loans: Possible with higher interest (14-18%), lower amount, (2) Credit cards: Basic cards only, low limit, (3) Home/car loans: May require higher down payment, co-applicant. Rejection risk is high. Improve to 700+ for better terms, 750+ for best rates and instant approvals.',
  }
];

/* ---------------- PAGE ---------------- */
export default function CreditScorePage() {
  const introContent = autoLinkContent(`
    <p>
      Your <strong>Credit Score</strong> is a 3-digit number ranging from 300 to 900 that 
      represents your creditworthiness to lenders. In India, credit scores are calculated by 
      four RBI-licensed bureaus: <strong>CIBIL (TransUnion), Experian, Equifax, and CRIF High Mark</strong>.
    </p>
    <p class="mt-4">
      Lenders use this score to evaluate the risk of lending money. A score above <strong>750</strong> 
      qualifies for instant loan approvals at the lowest interest rates. Below 650, you may face 
      rejections or significantly higher rates.
    </p>
  `);

  const factorsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-3 mt-2">
      <li><strong>Payment History (35%):</strong> Most critical factor. Even one 30-day late payment 
      can drop your score by 50-100 points. Set up auto-debit for all EMIs and credit cards.</li>
      
      <li><strong>Credit Utilization (30%):</strong> Percentage of credit limit used. High utilization 
      (above 30%) signals "credit hunger" to lenders. Keep below 30%, ideally below 10% for excellent score.</li>
      
      <li><strong>Credit Age (15%):</strong> Average age of all credit accounts. Older accounts boost score. 
      Never close your oldest credit card even if unused. Keep it active with small transactions.</li>
      
      <li><strong>Credit Mix (10%):</strong> Mix of secured (home/car loan) and unsecured credit (cards, 
      personal loan). Diverse mix improves score but don't take unnecessary loans for this.</li>
      
      <li><strong>Recent Inquiries (10%):</strong> Each hard inquiry (loan application) drops score by 
      5-10 points. Avoid multiple applications within 6 months. Space out loan applications.</li>
    </ul>
  `);

  const improvementSteps = autoLinkContent(`
    <ol class="list-decimal pl-5 space-y-3 mt-2">
      <li><strong>Automate All Payments:</strong> Set up auto-debit for credit cards and EMIs. Never miss 
      due date. Even one missed payment hurts for 7 years.</li>
      
      <li><strong>Reduce Credit Utilization:</strong> Pay down credit card balances below 30% of limit. 
      Or request credit limit increase (doesn't require hard inquiry).</li>
      
      <li><strong>Check Credit Report for Errors:</strong> Get free report from all 4 bureaus annually. 
      Dispute incorrect defaults, closed accounts shown as active, or wrong personal details.</li>
      
      <li><strong>Don't Close Old Accounts:</strong> Keep oldest credit cards active with small monthly 
      transactions. Closing reduces credit age and increases utilization.</li>
      
      <li><strong>Avoid Multiple Loan Applications:</strong> Each hard inquiry drops score. Space applications 
      by 6+ months. Use pre-approved offers or soft inquiry tools.</li>
      
      <li><strong>Settle Dues in Full (Never "Settled"):</strong> If struggling, negotiate payment plan but 
      always aim for "Closed" status. "Settled" marks severely impact score and future eligibility.</li>
      
      <li><strong>Build Credit Mix Gradually:</strong> If you only have unsecured credit (cards, personal loans), 
      consider secured loan (car/gold) when needed naturally. Don't force it.</li>
      
      <li><strong>Monitor Progress Monthly:</strong> Check score every month using free sources. Track improvements. 
      Typically takes 3-6 months to see positive change with consistent discipline.</li>
    </ol>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Credit Score Calculator',
            url: 'https://fincado.com/credit-score/',
          }
        ]}
      />

      <CalculatorSchema
        name="Credit Score Calculator - CIBIL Score Estimator"
        description="Estimate credit score based on payment history, utilization, account age, credit mix, and inquiries. Get personalized tips to improve score."
        url="https://fincado.com/credit-score/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <CreditScoreSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Credit Score Calculator 2026" />
            <LanguageToggle path="/hi/credit-score" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-green-100 text-emerald-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Credit Score Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                CIBIL Score Estimator & Improvement Simulator
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Estimate your credit score instantly and discover which factors are hurting your score. 
                  Simulate improvements by reducing utilization, clearing defaults, or improving payment history.
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg items-start shadow-sm max-w-2xl">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-900">
                Free Credit Score Access
              </p>
              <p className="text-xs text-blue-800 leading-relaxed">
                RBI mandates one free credit report per year from each bureau.
                Use bank apps (HDFC, ICICI, SBI) or fintech platforms (Paytm,
                PhonePe) for unlimited free monthly scores.
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="credit-score-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      EXCELLENT SCORE TARGET
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      For best loan rates
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      750+
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        score
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Out of 900 maximum
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-orange-700 mb-1">
                      UTILIZATION RULE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Credit card usage limit
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      30%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        max
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Below 10% is ideal
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-red-700 mb-1">
                      DEFAULT PERIOD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Stays on credit report
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        years
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      From first delinquency
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <CreditScoreClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="credit-score-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-amber-50/50 border-amber-200 text-slate-600">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Estimation Disclaimer
                </strong>
                This is an educational credit score estimator. Actual CIBIL,
                Experian, Equifax, or CRIF scores may vary based on proprietary
                algorithms and real-time lender reporting. Always check official
                bureau reports for accurate scores.
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Score dropped suddenly?
                  </strong>
                  <p className="text-sm text-slate-700">
                    Learn how to identify errors, raise disputes, and rebuild
                    your credit score systematically
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Credit Bureau Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Credit Bureaus in India (CIBIL vs Experian vs Equifax vs
                    CRIF)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bureau</TableHead>
                          <TableHead>Score Range</TableHead>
                          <TableHead>Market Share</TableHead>
                          <TableHead>Free Report</TableHead>
                          <TableHead>Best For</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            CIBIL (TransUnion)
                          </TableCell>
                          <TableCell>300 - 900</TableCell>
                          <TableCell>~90%</TableCell>
                          <TableCell>Once/year at cibil.com</TableCell>
                          <TableCell>
                            Most widely used, accepted by all lenders
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            Experian
                          </TableCell>
                          <TableCell>300 - 900</TableCell>
                          <TableCell>~60%</TableCell>
                          <TableCell>Once/year at experian.in</TableCell>
                          <TableCell>
                            Global presence, detailed reports
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            Equifax
                          </TableCell>
                          <TableCell>300 - 900</TableCell>
                          <TableCell>~40%</TableCell>
                          <TableCell>Once/year at equifax.co.in</TableCell>
                          <TableCell>
                            Used by fintech lenders, credit card companies
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            CRIF High Mark
                          </TableCell>
                          <TableCell>300 - 900</TableCell>
                          <TableCell>~30%</TableCell>
                          <TableCell>Once/year at crifhighmark.com</TableCell>
                          <TableCell>Commercial credit, MSME loans</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-slate-700">
                      <strong>Note:</strong> All four bureaus are equally valid
                      and RBI-regulated. Scores may differ by 10-30 points due
                      to different lender reporting timelines. Check all four
                      annually for comprehensive view. Most lenders pull CIBIL
                      first, then Experian/Equifax as backup.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AD #3: MID-CONTENT */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="credit-score-mid-content"
                type="square"
                label="Advertisement"
              />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Credit Score and Why Does It Matter?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  5 Factors That Determine Your Credit Score
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={factorsContent} />
                </div>
              </section>

              {/* Credit Score Ranges */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Credit Score Ranges: What Lenders See
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Score Range</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Loan Eligibility</TableHead>
                        <TableHead>Interest Rate Impact</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold text-emerald-700">
                          750 – 900
                        </TableCell>
                        <TableCell>Excellent</TableCell>
                        <TableCell>
                          Instant approval, pre-approved offers
                        </TableCell>
                        <TableCell>
                          Lowest rates (8-10% personal loan)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-lime-700">
                          700 – 749
                        </TableCell>
                        <TableCell>Good</TableCell>
                        <TableCell>
                          High approval chances, minimal docs
                        </TableCell>
                        <TableCell>Standard rates (11-13%)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-yellow-700">
                          650 – 699
                        </TableCell>
                        <TableCell>Fair</TableCell>
                        <TableCell>
                          Possible approval, may need co-applicant
                        </TableCell>
                        <TableCell>Higher rates (14-16%)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-orange-700">
                          600 – 649
                        </TableCell>
                        <TableCell>Average</TableCell>
                        <TableCell>
                          Limited options, secured loans only
                        </TableCell>
                        <TableCell>Very high rates (17-20%)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-red-700">
                          300 – 599
                        </TableCell>
                        <TableCell>Poor</TableCell>
                        <TableCell>
                          High rejection risk, subprime lenders
                        </TableCell>
                        <TableCell>Extremely high rates (22-30%+)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* Soft vs Hard Inquiry */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Soft Inquiry vs Hard Inquiry: Know the Difference
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>Soft Inquiry</TableHead>
                        <TableHead>Hard Inquiry</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Who initiates?
                        </TableCell>
                        <TableCell>You / Employer / Landlord</TableCell>
                        <TableCell>
                          Bank / Lender / Credit card issuer
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Purpose</TableCell>
                        <TableCell>
                          Self-check, pre-approved offer screening, background
                          check
                        </TableCell>
                        <TableCell>
                          Loan application, credit card application (formal
                          request)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Consent required?
                        </TableCell>
                        <TableCell>No (for self-check)</TableCell>
                        <TableCell>Yes (you must sign/authorize)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Impact on credit score
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Zero impact
                        </TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          −5 to −10 points per inquiry
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Visible to lenders?
                        </TableCell>
                        <TableCell>No (only you see it)</TableCell>
                        <TableCell>
                          Yes (visible on credit report for 2 years)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Examples</TableCell>
                        <TableCell>
                          Checking score on bank app, employment verification,
                          insurance quote
                        </TableCell>
                        <TableCell>
                          Personal loan application, credit card application,
                          car loan
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-slate-700">
                    <strong>Pro Tip:</strong> Always ask if lender will do
                    &quot;soft inquiry&quot; or &quot;hard inquiry&quot; before
                    applying. Some banks offer pre-qualification with soft
                    inquiry (no score impact) before formal application. Use
                    this to shop around without hurting your score.
                  </p>
                </div>
              </section>

              {/* Free Credit Report Sources */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Where to Get Free Credit Report in India (2026)
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Official Bureau Websites
                          </h4>
                          <ul className="text-sm text-slate-700 space-y-1">
                            <li>• CIBIL: cibil.com (once/year free)</li>
                            <li>• Experian: experian.in (once/year)</li>
                            <li>• Equifax: equifax.co.in (once/year)</li>
                            <li>• CRIF: crifhighmark.com (once/year)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Building className="h-6 w-6 text-emerald-600 mt-1 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Bank & Fintech Apps
                          </h4>
                          <ul className="text-sm text-slate-700 space-y-1">
                            <li>• HDFC Bank (free monthly CIBIL)</li>
                            <li>• ICICI Bank (free Experian score)</li>
                            <li>• SBI Card (free CIBIL for cardholders)</li>
                            <li>• Paytm, PhonePe, Google Pay (free)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="ml-2 text-sm text-green-800">
                    <strong>Best Practice:</strong> Check score from at least 2
                    different sources every 3 months. If you see sudden drop or
                    unfamiliar accounts, raise dispute immediately with bureau.
                    Identity theft is common - early detection is critical.
                  </AlertDescription>
                </Alert>
              </section>

              {/* How to Improve */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  8-Step Action Plan to Reach 750+ Credit Score
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={improvementSteps} />
                </div>
              </section>

              {/* Credit Cards by Score Range */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Credit Cards You Can Get by Score Range
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Score Range</TableHead>
                        <TableHead>Card Types</TableHead>
                        <TableHead>Examples</TableHead>
                        <TableHead>Benefits</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold text-emerald-700">
                          750+
                        </TableCell>
                        <TableCell>Premium, Travel, Rewards</TableCell>
                        <TableCell>
                          HDFC Regalia, SBI Elite, ICICI Sapphiro, Amex Gold
                        </TableCell>
                        <TableCell>
                          High limit, airport lounge, cashback 2-5%
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-lime-700">
                          700-749
                        </TableCell>
                        <TableCell>Standard, Lifestyle</TableCell>
                        <TableCell>
                          HDFC Millennia, SBI SimplyClick, ICICI Coral
                        </TableCell>
                        <TableCell>
                          Good limit (₹2-5L), fuel surcharge waiver
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-yellow-700">
                          650-699
                        </TableCell>
                        <TableCell>Basic, Entry-level</TableCell>
                        <TableCell>
                          SBI SimplySave, ICICI Platinum, Axis Ace
                        </TableCell>
                        <TableCell>
                          Low limit (₹50K-1L), basic rewards
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-orange-700">
                          600-649
                        </TableCell>
                        <TableCell>Secured Cards</TableCell>
                        <TableCell>
                          HDFC FD Card, SBI FD Card (requires fixed deposit)
                        </TableCell>
                        <TableCell>
                          Limit = 80-90% of FD, helps build credit
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold text-red-700">
                          Below 600
                        </TableCell>
                        <TableCell>Very Limited Options</TableCell>
                        <TableCell>
                          OneCard (100% FD backed), Credit Builder cards
                        </TableCell>
                        <TableCell>Focus on improving score first</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Financial Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/loans/personal-loan/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              Personal Loan Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate EMI based on your credit score. See how
                              750+ score gets you 2-3% lower interest rates.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate EMI</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/home-loan-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            🏠
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              Home Loan Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Check home loan eligibility. Good credit score
                              increases loan amount by 20-30%.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Check Eligibility</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="credit-score-before-faq"
                type="leaderboard"
                lazyLoad
              />
            </div>

            {/* FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900">
                          {faq.question}
                        </AccordionTrigger>

                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="credit-score-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="credit-score-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="credit-score-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
