import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HRAClient from './HRAClient';
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
import { HRASchemas } from '@/components/schemas/HRASchemas';
import {
  Building2,
  AlertTriangle,
  Info,
  ArrowRight,
  Calculator,
  Home,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title:
    'HRA Calculator 2026 – House Rent Allowance Exemption | Section 10(13A)',
  description:
    'Calculate HRA exemption for FY 2026-27 under Old Tax Regime. Check tax-free rent limits for Metro (50%) vs Non-Metro (40%) cities. Free HRA calculator with instant results.',
  keywords: [
    'HRA Calculator India',
    'House Rent Allowance Exemption',
    'Section 10(13A) HRA',
    'Metro vs Non-Metro HRA',
    'HRA Calculation Formula',
    'Rent Receipt Tax Benefit',
    'Old Tax Regime HRA',
    'HRA Tax Saving Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/hra-calculator/',
  },
  openGraph: {
    title: 'HRA Calculator 2026 – Calculate Tax-Free Rent Allowance',
    description:
      'Free HRA calculator to compute House Rent Allowance exemption under Section 10(13A). Check Metro vs Non-Metro rates and save tax.',
    url: 'https://fincado.com/hra-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-hra-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado HRA Calculator',
      },
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
    id: 'hra-faq-1',
    question: 'Is HRA exemption available in the New Tax Regime?',
    answer:
      'No. HRA exemption under Section 10(13A) is NOT available in the New Tax Regime (default for FY 2026-27). You must opt for the Old Tax Regime to claim HRA benefits. New Regime does not allow HRA, 80C, 80D, or most other deductions.',
  },
  {
    id: 'hra-faq-2',
    question: 'Which cities are considered Metro for 50% HRA calculation?',
    answer:
      'Only four cities qualify as Metro: Delhi, Mumbai, Kolkata, and Chennai. All other cities including Bangalore, Hyderabad, Pune, Gurgaon, Noida are Non-Metro (40% HRA calculation). This classification is fixed by Income Tax rules.',
  },
  {
    id: 'hra-faq-3',
    question: 'Do I need landlord PAN card for HRA exemption?',
    answer:
      'Yes, landlord PAN is mandatory if annual rent exceeds ₹1,00,000 (₹8,334/month). Below this threshold, PAN is not required. For rent above ₹1 lakh, you must submit landlord PAN to employer while claiming HRA exemption.',
  },
  {
    id: 'hra-faq-4',
    question: 'Can I claim HRA if I pay rent to my parents?',
    answer:
      'Yes, you can claim HRA by paying rent to parents. You need valid rent receipts/agreement. However, your parents must declare this rent as "Income from House Property" in their ITR. Tax department may scrutinize if parents show no rental income but you claim HRA.',
  },
  {
    id: 'hra-faq-5',
    question: 'What is the HRA exemption formula?',
    answer:
      'HRA exemption = Minimum of: (1) Actual HRA received, (2) Rent paid minus 10% of salary, (3) 50% of salary (Metro) or 40% of salary (Non-Metro). Salary = Basic + DA. The lowest value becomes your exempt HRA.',
  },
  {
    id: 'hra-faq-6',
    question: 'Can I claim HRA if I own a house in the same city?',
    answer:
      'Yes, you can claim HRA even if you own a house in the same city, provided you live in a different rented house. Self-owned house must be in a different location than rented accommodation. You need valid rent receipts and reasonable explanation.',
  },
  {
    id: 'hra-faq-7',
    question: 'What documents are required to claim HRA exemption?',
    answer:
      'Required documents: (1) Rent receipts (monthly or quarterly with revenue stamp if cash > ₹5,000), (2) Rent agreement, (3) Landlord PAN (if rent > ₹1L/year), (4) Landlord declaration if PAN not available, (5) Rent payment proof (bank statement/cheque).',
  },
  {
    id: 'hra-faq-8',
    question: 'Is Dearness Allowance (DA) included in HRA calculation?',
    answer:
      'Yes, Dearness Allowance is included in salary for HRA calculation if it forms part of retirement benefits. Formula uses (Basic + DA). However, other allowances like Special Allowance, Conveyance, Medical are not included in HRA calculation salary.',
  },
  {
    id: 'hra-faq-9',
    question: 'Can I claim HRA and home loan deduction together?',
    answer:
      'Yes, you can claim both simultaneously if you own one house and live in a rented house in a different city. HRA for rented accommodation + Home loan interest (Section 24) for owned property (let-out or deemed let-out). Both allowed in Old Regime.',
  },
  {
    id: 'hra-faq-10',
    question: 'What if my HRA received is less than actual rent paid?',
    answer:
      'HRA exemption is capped at actual HRA received. Even if you pay higher rent, exemption cannot exceed HRA component in salary. Example: HRA received = ₹1.5L, Rent paid = ₹3L. Maximum exempt HRA = ₹1.5L (condition 1 applies).',
  },
];

/* ---------------- PAGE ---------------- */
export default function HRAPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>House Rent Allowance (HRA)</strong> is a salary component paid by employers 
      to compensate employees for rental accommodation expenses. Under <strong>Section 
      10(13A)</strong> of the Income Tax Act, a portion of HRA can be claimed as 
      <strong>tax-exempt</strong> if you live in a rented house and opt for the Old Tax Regime.
    </p>
    <p class="mt-4">
      The exemption is calculated using a three-condition formula where the <strong>lowest 
      value</strong> becomes your tax-free HRA. This calculator helps you determine exact 
      exempt and taxable HRA amounts based on your salary, rent paid, and city classification.
    </p>
  `);

  const howCalculatedContent = autoLinkContent(`
    <p>
      HRA exemption is calculated as the <strong>minimum (lowest)</strong> of these three values:
    </p>
    <ol class="list-decimal pl-6 space-y-3 mt-3">
      <li>
        <strong>Actual HRA Received:</strong> The HRA component shown in your salary slip 
        (monthly HRA × 12 for annual calculation)
      </li>
      <li>
        <strong>Rent Paid minus 10% of Salary:</strong> Total annual rent paid minus 10% 
        of (Basic Salary + Dearness Allowance). This ensures only "excess rent" beyond 
        basic living costs gets exemption
      </li>
      <li>
        <strong>50% or 40% of Salary:</strong> 
        <ul class="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Metro Cities (50%):</strong> Delhi, Mumbai, Kolkata, Chennai only</li>
          <li><strong>Non-Metro Cities (40%):</strong> All other cities (Bangalore, Hyderabad, Pune, etc.)</li>
        </ul>
      </li>
    </ol>
    <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p class="text-sm text-slate-700">
        <strong>Key Formula:</strong> Salary for HRA = Basic Salary + Dearness Allowance (DA). 
        Other allowances like Special Allowance, Conveyance, Medical are NOT included.
      </p>
    </div>
  `);

  const documentsContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Mandatory Documents:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Rent Receipts:</strong> Monthly or quarterly receipts with landlord signature, property address, and revenue stamp (₹1 for payments > ₹5,000 cash)</li>
      <li><strong>Rent Agreement:</strong> Registered or notarized rental agreement showing rent amount, tenure, and landlord details</li>
      <li><strong>Landlord PAN:</strong> Mandatory if annual rent exceeds ₹1,00,000. Submit to employer for TDS compliance</li>
      <li><strong>Rent Payment Proof:</strong> Bank statements, cheque copies, or UPI transaction records showing rent payments</li>
      <li><strong>No-PAN Declaration:</strong> If landlord refuses PAN, submit declaration with landlord name and address</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Rent Receipt Format:</h4>
    <div class="mt-3 p-4 bg-slate-50 rounded border border-slate-200 text-sm font-mono">
      <div class="space-y-1">
        <div>Received from: [Your Name]</div>
        <div>Amount: ₹[Rent Amount] (Rupees [In Words])</div>
        <div>For: Rent of property at [Address]</div>
        <div>Period: [Month/Year]</div>
        <div>Landlord Name: [Name]</div>
        <div>Landlord PAN: [If rent > ₹1L/year]</div>
        <div>Date: [Date]</div>
        <div>Signature: [Landlord Signature]</div>
      </div>
    </div>
  `);

  const commonMistakesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Claiming HRA in New Tax Regime:</strong> HRA is NOT allowed in New Regime. Must choose Old Regime.</li>
      <li><strong>Wrong City Classification:</strong> Only Delhi/Mumbai/Kolkata/Chennai are Metro (50%). Bangalore is Non-Metro (40%).</li>
      <li><strong>Including full CTC as Salary:</strong> Only Basic + DA counts for HRA calculation, not total CTC or gross salary.</li>
      <li><strong>No Rent Receipts:</strong> Claiming HRA without proper documentation. Receipts are mandatory for IT verification.</li>
      <li><strong>Missing Landlord PAN:</strong> PAN required if rent > ₹1L/year. Missing PAN can lead to claim rejection.</li>
      <li><strong>Paying Rent in Cash:</strong> Large cash payments without receipts/stamp are rejected. Use bank transfer for audit trail.</li>
      <li><strong>Same Address as Owned House:</strong> Cannot claim HRA if you live in your own house. Must be different location.</li>
      <li><strong>Parents Not Showing Rental Income:</strong> If you pay rent to parents, they must declare it in ITR. Mismatch causes issues.</li>
    </ul>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'HRA Calculator',
            url: 'https://fincado.com/hra-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="HRA Calculator - House Rent Allowance Exemption"
        description="Calculate HRA tax exemption under Section 10(13A). Check Metro vs Non-Metro rates and determine tax-free rent allowance."
        url="https://fincado.com/hra-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <HRASchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="HRA Calculator 2026" />
            <LanguageToggle path="/hi/hra-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 text-blue-700">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                HRA Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-blue-700">
                House Rent Allowance Exemption
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Calculate <strong>tax-free HRA</strong> under Section 10(13A). 
                  Check Metro vs Non-Metro exemption rates and determine exact taxable 
                  HRA based on your salary and rent paid.
                </p>
              `}
            />
          </div>

          {/* Old Tax Regime Alert */}
          <div className="mt-6 flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg items-start shadow-sm max-w-2xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-900">
                Important: Old Tax Regime Only
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                HRA exemption is NOT available under the New Tax Regime (default
                for FY 2026-27). You must opt for the Old Tax Regime to claim
                this benefit. New Regime does not allow HRA, 80C, 80D, or most
                other deductions.
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hra-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      METRO RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Delhi, Mumbai, Kolkata, Chennai
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      50%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        of salary
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      NON-METRO RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      All other cities
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      40%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        of salary
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      PAN THRESHOLD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Landlord PAN mandatory above
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹1L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /year
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <HRAClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hra-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Calculation Note
                </strong>
                HRA exemption is the minimum (lowest) of three conditions. Even
                if you pay high rent, exemption cannot exceed actual HRA
                received from employer. Always keep rent receipts and landlord
                PAN for audit.
              </AlertDescription>
            </Alert>

            {/* Formula Breakdown Section */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    HRA Exemption Formula & Calculation
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      HRA exemption is calculated as the{' '}
                      <strong>minimum</strong> of these three values:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 space-y-3">
                      <div className="text-base font-semibold text-slate-700 mb-3">
                        Three-Condition Formula
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                          <div className="font-semibold text-blue-900 mb-1">
                            Condition 1: Actual HRA Received
                          </div>
                          <div className="font-mono text-xs text-slate-700">
                            HRA component from salary slip (annual)
                          </div>
                        </div>

                        <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                          <div className="font-semibold text-indigo-900 mb-1">
                            Condition 2: Rent Paid - 10% of Salary
                          </div>
                          <div className="font-mono text-xs text-slate-700">
                            Rent Paid - (0.10 × (Basic + DA))
                          </div>
                        </div>

                        <div className="p-3 bg-purple-50 rounded border border-purple-200">
                          <div className="font-semibold text-purple-900 mb-1">
                            Condition 3: 50% or 40% of Salary
                          </div>
                          <div className="font-mono text-xs text-slate-700">
                            Metro: 0.50 × (Basic + DA)
                            <br />
                            Non-Metro: 0.40 × (Basic + DA)
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                        <div className="font-semibold text-emerald-900 mb-1">
                          Final Exempt HRA
                        </div>
                        <div className="font-mono text-sm text-slate-700">
                          Exempt HRA = Minimum (Condition 1, Condition 2,
                          Condition 3)
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Salary:</strong>
                        <span>
                          Basic Salary + Dearness Allowance (DA) only. Other
                          allowances NOT included.
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Metro Cities:</strong>
                        <span>
                          Only Delhi, Mumbai, Kolkata, Chennai (50% exemption
                          rate)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Non-Metro:</strong>
                        <span>
                          All other cities including Bangalore, Hyderabad, Pune
                          (40% exemption rate)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Taxable HRA:</strong>
                        <span>
                          HRA Received - Exempt HRA (added to taxable income)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: Metro City HRA Calculation
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Basic Salary:</strong>
                        </div>
                        <div>₹6,00,000/year</div>

                        <div>
                          <strong>DA:</strong>
                        </div>
                        <div>₹0</div>

                        <div>
                          <strong>HRA Received:</strong>
                        </div>
                        <div>₹2,40,000/year (₹20k/month)</div>

                        <div>
                          <strong>Rent Paid:</strong>
                        </div>
                        <div>₹1,80,000/year (₹15k/month)</div>

                        <div>
                          <strong>City:</strong>
                        </div>
                        <div>Mumbai (Metro - 50%)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Three Conditions
                        </strong>
                        <div className="ml-4 space-y-2 text-xs">
                          <div className="p-2 bg-white rounded">
                            <strong>Condition 1:</strong> Actual HRA = ₹2,40,000
                          </div>
                          <div className="p-2 bg-white rounded">
                            <strong>Condition 2:</strong> Rent - 10% Salary =
                            ₹1,80,000 - (0.10 × ₹6,00,000) = ₹1,80,000 - ₹60,000
                            =<strong> ₹1,20,000</strong>
                          </div>
                          <div className="p-2 bg-white rounded">
                            <strong>Condition 3:</strong> 50% of Salary (Metro)
                            = 0.50 × ₹6,00,000 = <strong>₹3,00,000</strong>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 2: Choose Minimum Value
                        </strong>
                        <div className="ml-4 text-xs">
                          <div className="p-2 bg-white rounded">
                            Minimum of (₹2,40,000, ₹1,20,000, ₹3,00,000) ={' '}
                            <strong className="text-emerald-700">
                              ₹1,20,000
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            HRA Summary:
                          </div>
                          <div className="flex justify-between">
                            <span>Exempt HRA (Tax Free):</span>
                            <strong className="text-emerald-700">
                              ₹1,20,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable HRA:</span>
                            <strong className="text-slate-900">
                              ₹1,20,000 (₹2,40,000 - ₹1,20,000)
                            </strong>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-xs text-slate-600">
                              <span>Tax Saving (at 30% slab):</span>
                              <strong className="text-emerald-700">
                                ~₹36,000/year
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Note:</strong> Condition 2 (₹1,20,000) is the
                          lowest, so that becomes the exempt HRA. Remaining
                          ₹1,20,000 HRA is added to taxable income.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Compare Old vs New Tax Regime with HRA impact
                  </strong>
                  <Link
                    href="/income-tax-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      Use Income Tax Calculator to see if Old Regime saves more
                      with HRA
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Metro vs Non-Metro Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Metro vs Non-Metro: HRA Exemption Rates
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>City Type</TableHead>
                          <TableHead>Cities Covered</TableHead>
                          <TableHead>HRA Exemption Rate</TableHead>
                          <TableHead>Example (₹6L Salary)</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold text-blue-700">
                            Metro
                          </TableCell>
                          <TableCell>
                            Delhi, Mumbai, Kolkata, Chennai only
                          </TableCell>
                          <TableCell className="font-semibold text-blue-700">
                            50% of Salary
                          </TableCell>
                          <TableCell>₹3,00,000 max</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-indigo-700">
                            Non-Metro
                          </TableCell>
                          <TableCell>
                            Bangalore, Hyderabad, Pune, Gurgaon, Noida, and all
                            other cities
                          </TableCell>
                          <TableCell className="font-semibold text-indigo-700">
                            40% of Salary
                          </TableCell>
                          <TableCell>₹2,40,000 max</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                    <p className="text-sm text-slate-700">
                      <strong>Important:</strong> Only Delhi, Mumbai, Kolkata,
                      and Chennai are classified as Metro cities as per Income
                      Tax rules. Despite being tier-1 cities, Bangalore,
                      Hyderabad, and Pune are considered Non-Metro for HRA
                      calculation (40% limit).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AD #3: MID-CONTENT */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="hra-mid-content"
                type="square"
                label="Advertisement"
              />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is House Rent Allowance (HRA)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How is HRA Exemption Calculated?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={howCalculatedContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Documents Required to Claim HRA
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={documentsContent} />
                </div>
              </section>

              {/* HRA vs Home Loan Comparison */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Can I Claim Both HRA and Home Loan Deduction?
                </h3>

                <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <Home className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div className="text-slate-700">
                      <p className="font-semibold text-green-900 mb-2">
                        Yes! You can claim both simultaneously
                      </p>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        <li>
                          <strong>HRA Exemption:</strong> For rented
                          accommodation where you currently live (Section
                          10(13A))
                        </li>
                        <li>
                          <strong>Home Loan Interest:</strong> For owned
                          property (can be in different city or let-out) -
                          Deduction up to ₹2 lakhs under Section 24(b)
                        </li>
                        <li>
                          <strong>Home Loan Principal:</strong> Under Section
                          80C (up to ₹1.5 lakhs combined with other 80C
                          investments)
                        </li>
                        <li>
                          <strong>Condition:</strong> Both properties should be
                          in different locations. You live in rented house in
                          City A, own property in City B.
                        </li>
                      </ul>
                      <div className="mt-3 p-3 bg-white rounded text-xs">
                        <strong>Example:</strong> Working in Mumbai (rented),
                        own property in hometown. Can claim HRA for Mumbai rent
                        + Home loan deduction for hometown property (deemed
                        let-out). Total benefit = HRA exempt + ₹2L interest +
                        ₹1.5L principal under 80C.
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Common Mistakes to Avoid When Claiming HRA
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={commonMistakesContent} />
                </div>
              </section>

              {/* Special Scenarios */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Special HRA Scenarios Explained
                </h3>

                <div className="space-y-4">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        1. Paying Rent to Parents
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>Allowed:</strong> Yes, you can pay rent to
                        parents and claim HRA. <strong>Requirements:</strong>{' '}
                        Valid rent agreement, rent receipts, bank transfer
                        proof. Parents must declare rental income in ITR under
                        &quot;Income from House Property&quot;. Tax department
                        may scrutinize if parents don&apos;t show this income.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        2. Paying Rent to Spouse
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>Allowed:</strong> Yes, but complex. Spouse must
                        own the property and declare rental income. Subject to
                        clubbing provisions under Income Tax Act. Consult CA for
                        proper documentation. Generally not recommended for
                        owned joint property.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        3. Living in Owned House but Claiming HRA
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>Not Allowed:</strong> Cannot claim HRA if you
                        live in your own house (or house owned by spouse in same
                        city). Even if you receive HRA from employer, entire
                        amount becomes taxable. Exception: Owned house in
                        different city, living in rented accommodation in work
                        city.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        4. HRA Without Rent Receipts
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>Not Allowed:</strong> Rent receipts are
                        mandatory to claim HRA exemption. Without proper
                        documentation, entire HRA becomes taxable. Keep
                        monthly/quarterly receipts with revenue stamp, landlord
                        signature, and property address. For rent &gt; ₹1L/year,
                        landlord PAN is must.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Tax & Salary Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/income-tax-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              Income Tax Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Compare Old vs New Tax Regime and see if HRA
                              benefits make Old Regime better for you.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate Tax Liability</span>
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
              <AdSlot id="hra-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="hra-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hra-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hra-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
