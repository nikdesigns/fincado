import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GSTClient from './GSTClient';
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
import { GSTSchemas } from '@/components/schemas/GSTSchemas';
import { BadgeCheck, Info, ArrowRight, Receipt, Building } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'GST Calculator India 2026 – Calculate GST Tax Online | Reverse GST',
  description:
    'Free GST Calculator for India. Calculate GST Exclusive (Add Tax) and Inclusive (Remove Tax) with CGST/SGST breakdown. Supports 3%, 5%, 12%, 18%, 28% rates. Instant results for businesses.',
  keywords: [
    'GST Calculator India',
    'Reverse GST Calculator',
    'GST Calculation Formula',
    'GST Rates 2026',
    'Calculate GST on Gold',
    'IGST CGST SGST Calculator',
    'GST Tax Calculator Online',
    'Add GST to Price',
    'Remove GST from MRP'
  ],
  alternates: {
    canonical: 'https://fincado.com/gst-calculator/',
  },
  openGraph: {
    title: 'GST Calculator 2026 – Calculate GST Tax Instantly',
    description:
      'Free online GST calculator for businesses and consumers. Calculate GST exclusive/inclusive prices with CGST, SGST, IGST breakdown.',
    url: 'https://fincado.com/gst-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-gst-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado GST Calculator',
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
    id: 'gst-faq-1',
    question: 'Who needs to register for GST in India?',
    answer:
      'Businesses with annual turnover exceeding ₹40 lakhs (₹20 lakhs for services) must register for GST. E-commerce sellers, inter-state suppliers, and businesses receiving goods/services from unregistered dealers must register mandatorily regardless of turnover.',
  },
  {
    id: 'gst-faq-2',
    question: 'What is the difference between CGST, SGST, and IGST?',
    answer:
      'CGST (Central GST) and SGST (State GST) apply to intra-state transactions (within same state) and are split equally. IGST (Integrated GST) applies to inter-state transactions (between two states) and imports. For 18% GST intra-state: CGST 9% + SGST 9%. For inter-state: IGST 18%.',
  },
  {
    id: 'gst-faq-3',
    question: 'How to calculate GST from MRP (Reverse GST)?',
    answer:
      'Reverse GST formula: Base Price = MRP ÷ (1 + GST Rate/100). Example: MRP = ₹11,800 with 18% GST. Base = ₹11,800 ÷ 1.18 = ₹10,000. GST Amount = ₹1,800. Use this to find actual product value from final invoice.',
  },
  {
    id: 'gst-faq-4',
    question: 'What is Input Tax Credit (ITC) in GST?',
    answer:
      'ITC allows businesses to claim credit for GST paid on purchases and use it to offset GST liability on sales. Example: You pay ₹1,800 GST on raw materials (input), collect ₹3,000 GST on finished goods (output). You pay only ₹1,200 (₹3,000 - ₹1,800) to government. This eliminates tax cascading.',
  },
  {
    id: 'gst-faq-5',
    question: 'What are the current GST rate slabs in 2026?',
    answer:
      'GST rates: 0% (Exempt - fresh food, books), 0.25% (rough diamonds), 3% (gold, silver), 5% (essentials - packaged food, medicines), 12% (standard goods - mobiles, processed food), 18% (services, electronics, IT), 28% (luxury goods - cars, ACs, tobacco + cess). Rates unchanged in Budget 2026.',
  },
  {
    id: 'gst-faq-6',
    question: 'When is GST return filing due date?',
    answer:
      'GSTR-1 (sales): 11th of next month. GSTR-3B (summary): 20th of next month. Annual return (GSTR-9): December 31st of next financial year. Quarterly filers under QRMP: 13th and 22nd/24th of month following quarter. Late filing attracts penalty of ₹50/day (₹20/day for nil return).',
  },
  {
    id: 'gst-faq-7',
    question: 'What is GST Composition Scheme?',
    answer:
      'Composition Scheme is for small businesses (turnover up to ₹1.5 crore for goods, ₹75 lakh for services). Pay flat 1% GST (manufacturers), 2.5% (restaurant services), or 6% (other services). Benefits: Simplified compliance, quarterly returns. Limitations: No ITC claim, no inter-state sales, no e-commerce.',
  },
  {
    id: 'gst-faq-8',
    question: 'Is e-invoice mandatory for all businesses?',
    answer:
      'E-invoice is mandatory for businesses with aggregate turnover exceeding ₹5 crores from August 2023. It applies to B2B (business-to-business) and export invoices only. B2C (retail) invoices are exempt. E-invoice generates IRN (Invoice Reference Number) through IRP (Invoice Registration Portal).',
  },
  {
    id: 'gst-faq-9',
    question: 'Can I claim GST refund as a consumer?',
    answer:
      'Consumers cannot claim GST refund. Only registered businesses can claim refund in cases like: zero-rated supplies (exports), inverted duty structure (when input GST > output GST), excess ITC accumulation. Foreign tourists can claim GST refund on purchases at airport under Tourist Refund Scheme.',
  },
  {
    id: 'gst-faq-10',
    question: 'What is HSN/SAC code in GST?',
    answer:
      'HSN (Harmonized System of Nomenclature) is 6-8 digit code for goods classification. SAC (Services Accounting Code) is 6-digit code for services. Used to determine applicable GST rate. Mandatory in invoices: 4-digit for turnover > ₹5 crore, 2-digit for ₹1.5-5 crore, optional below ₹1.5 crore.',
  }
];

/* ---------------- PAGE ---------------- */
export default function GSTPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>GST (Goods and Services Tax)</strong> is India's comprehensive indirect tax on 
      the supply of goods and services. Implemented on July 1, 2017, GST replaced multiple 
      cascading taxes like VAT, Service Tax, Central Excise Duty, and Entry Tax, creating a 
      unified <strong>"One Nation, One Tax, One Market"</strong> system.
    </p>
    <p class="mt-4">
      GST is a destination-based consumption tax where tax is collected at the point of 
      consumption, not production. It has five rate slabs: 0% (exempt), 3% (precious metals), 
      5% (essentials), 12% (standard goods), 18% (services/electronics), and 28% (luxury goods).
    </p>
  `);

  const howCalculatedContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">GST Exclusive (Add GST to Base Price):</h4>
    <p class="mt-2">
      When you have the net/base price and need to calculate final invoice value including GST:
    </p>
    <div class="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div class="space-y-2 text-sm">
        <div><strong>GST Amount</strong> = Base Price × (GST Rate ÷ 100)</div>
        <div><strong>Final Invoice</strong> = Base Price + GST Amount</div>
        <div class="mt-3 pt-3 border-t border-blue-300">
          <strong>Example:</strong> Item price = ₹10,000, GST = 18%<br/>
          GST Amount = ₹10,000 × 0.18 = ₹1,800<br/>
          Final Invoice = ₹10,000 + ₹1,800 = <strong>₹11,800</strong>
        </div>
      </div>
    </div>

    <h4 class="font-semibold text-slate-900 mt-6">GST Inclusive (Reverse GST - Remove Tax from MRP):</h4>
    <p class="mt-2">
      When you have the MRP/final invoice value and need to find base price and GST amount:
    </p>
    <div class="mt-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
      <div class="space-y-2 text-sm">
        <div><strong>Base Price</strong> = MRP ÷ (1 + GST Rate ÷ 100)</div>
        <div><strong>GST Amount</strong> = MRP - Base Price</div>
        <div class="mt-3 pt-3 border-t border-indigo-300">
          <strong>Example:</strong> MRP = ₹11,800, GST = 18%<br/>
          Base Price = ₹11,800 ÷ 1.18 = ₹10,000<br/>
          GST Amount = ₹11,800 - ₹10,000 = <strong>₹1,800</strong>
        </div>
      </div>
    </div>

    <h4 class="font-semibold text-slate-900 mt-6">CGST, SGST, IGST Breakdown:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Intra-State (Within same state):</strong> GST split equally into CGST (Central) and SGST (State). For 18% GST: CGST 9% + SGST 9%</li>
      <li><strong>Inter-State (Between two states):</strong> Full GST as IGST (Integrated). For 18% GST: IGST 18%</li>
      <li><strong>Imports:</strong> IGST applicable along with customs duty and IGST cess if applicable</li>
    </ul>
  `);

  const itcContent = autoLinkContent(`
    <p>
      <strong>Input Tax Credit (ITC)</strong> is the core mechanism of GST that eliminates 
      the cascading effect (tax on tax). It allows businesses to claim credit for GST paid 
      on inputs (purchases) and offset it against GST liability on outputs (sales).
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">How ITC Works:</h4>
    <ol class="list-decimal pl-5 space-y-2 mt-2">
      <li><strong>Input Tax:</strong> You purchase raw materials worth ₹10,000 + 18% GST (₹1,800). Total paid = ₹11,800</li>
      <li><strong>Output Tax:</strong> You sell finished goods worth ₹20,000 + 18% GST (₹3,600). Total collected = ₹23,600</li>
      <li><strong>ITC Claim:</strong> Net GST payable = Output GST - Input GST = ₹3,600 - ₹1,800 = <strong>₹1,800</strong></li>
      <li><strong>Benefit:</strong> Without ITC, you'd pay full ₹3,600. With ITC, you pay only ₹1,800</li>
    </ol>

    <h4 class="font-semibold text-slate-900 mt-4">ITC Eligibility Conditions:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Must possess valid tax invoice or debit note</li>
      <li>Goods/services must be received</li>
      <li>GST paid to supplier must be deposited with government</li>
      <li>Return (GSTR-3B) must be filed</li>
      <li>Supplier must have filed their return (GSTR-1)</li>
    </ul>

    <h4 class="font-semibold text-slate-900 mt-4">ITC Not Allowed On:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Motor vehicles for personal use (except when used for business purposes like taxi, driving school)</li>
      <li>Food, beverages, outdoor catering, beauty treatment</li>
      <li>Goods/services used for personal consumption</li>
      <li>Construction of immovable property (except plant & machinery)</li>
      <li>GST paid under composition scheme</li>
    </ul>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'GST Calculator',
            url: 'https://fincado.com/gst-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="GST Calculator India - Goods and Services Tax Calculator"
        description="Calculate GST exclusive and inclusive amounts with CGST/SGST breakdown. Supports all GST rates: 3%, 5%, 12%, 18%, 28%."
        url="https://fincado.com/gst-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <GSTSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="GST Calculator 2026" />
            <LanguageToggle path="/hi/gst-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-green-100 text-emerald-700">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                GST Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                Goods & Services Tax India
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Calculate <strong>GST Exclusive (Add Tax)</strong> and <strong>Inclusive (Remove Tax)</strong> 
                  amounts instantly with CGST/SGST/IGST breakdown. Perfect for businesses, invoicing, and 
                  price verification.
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: GST Slabs Unchanged
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The Union Budget 2026 did not announce any changes to standard
                GST rates (5%, 12%, 18%, 28%). All rate revisions continue to be
                governed by the GST Council.
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="gst-top" type="leaderboard" />
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
                      REGISTRATION THRESHOLD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Mandatory for businesses
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹40L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        turnover
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      ₹20L for services
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      MOST COMMON RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Services, Electronics, IT
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      18%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        GST
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      CGST 9% + SGST 9%
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      PRECIOUS METALS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Gold, Silver, Platinum
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      3%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        GST
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Lowest non-exempt rate
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <GSTClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="gst-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Calculation Note
                </strong>
                This calculator shows CGST/SGST split for intra-state
                transactions. For inter-state sales, the entire amount is IGST.
                Always verify HSN/SAC code for accurate GST rate on your
                products/services.
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Building className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Running a GST-registered business?
                  </strong>
                  <p className="text-sm text-slate-700">
                    Calculate tax liability, understand ITC, and ensure GST
                    compliance with proper invoicing
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* GST Rate Slabs Table */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    GST Rate Slabs 2026 (India)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>GST Rate</TableHead>
                          <TableHead>Categories & Items</TableHead>
                          <TableHead>Examples</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold text-emerald-700">
                            0% (Exempt)
                          </TableCell>
                          <TableCell>
                            Basic necessities, Education, Healthcare
                          </TableCell>
                          <TableCell className="text-sm">
                            Fresh vegetables, milk, eggs, fruits, bread,
                            newspapers, educational services, healthcare
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-purple-700">
                            0.25%
                          </TableCell>
                          <TableCell>Rough diamonds</TableCell>
                          <TableCell className="text-sm">
                            Uncut/rough diamonds for jewellery manufacturing
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-yellow-700">
                            3%
                          </TableCell>
                          <TableCell>Precious metals</TableCell>
                          <TableCell className="text-sm">
                            Gold, silver, platinum, cut & polished diamonds,
                            gold/silver jewellery
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-blue-700">
                            5%
                          </TableCell>
                          <TableCell>Essentials, Food products</TableCell>
                          <TableCell className="text-sm">
                            Packaged food items, medicines, life-saving drugs,
                            domestic LPG, economy air travel, coal
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-indigo-700">
                            12%
                          </TableCell>
                          <TableCell>Standard goods</TableCell>
                          <TableCell className="text-sm">
                            Mobile phones, processed food, computers, business
                            class air travel, frozen meat
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-slate-900">
                            18%
                          </TableCell>
                          <TableCell>Services, Electronics, IT</TableCell>
                          <TableCell className="text-sm">
                            IT services, telecommunications, financial services,
                            restaurants without AC, electronics, capital goods
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-red-700">
                            28%
                          </TableCell>
                          <TableCell>Luxury goods, Sin goods</TableCell>
                          <TableCell className="text-sm">
                            Luxury cars, ACs, refrigerators, tobacco, pan
                            masala, aerated drinks, cement (+ additional cess on
                            some items)
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                    <p className="text-sm text-slate-700">
                      <strong>Note:</strong> Some items under 28% slab attract
                      additional GST Compensation Cess (e.g., tobacco, pan
                      masala, coal, aerated drinks). Always check HSN/SAC code
                      for exact rate applicable to your product/service.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AD #3: MID-CONTENT */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="gst-mid-content"
                type="square"
                label="Advertisement"
              />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is GST (Goods and Services Tax)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Calculate GST: Exclusive vs Inclusive
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={howCalculatedContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Input Tax Credit (ITC) Explained
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={itcContent} />
                </div>
              </section>

              {/* GST vs Old Tax System */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  GST vs Old Indirect Tax System
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aspect</TableHead>
                        <TableHead>Old Tax System (Pre-2017)</TableHead>
                        <TableHead>GST System (Post-2017)</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">
                          Tax Structure
                        </TableCell>
                        <TableCell>
                          Multiple taxes: VAT, Service Tax, Excise, Entry Tax,
                          Octroi
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Single unified tax: GST (CGST + SGST + IGST)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          Cascading Effect
                        </TableCell>
                        <TableCell>
                          Tax on tax (no credit for previous taxes)
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Eliminated through Input Tax Credit (ITC)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          Compliance
                        </TableCell>
                        <TableCell>
                          Multiple returns to Centre and State separately
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Single online portal (GST Network)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          Registration Threshold
                        </TableCell>
                        <TableCell>
                          Varied by state (₹5-10 lakhs for VAT)
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Uniform ₹40L goods / ₹20L services
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          Inter-State Tax
                        </TableCell>
                        <TableCell>
                          CST 2% (no input credit), entry tax
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          IGST with full ITC available
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          E-commerce
                        </TableCell>
                        <TableCell>No specific provisions, complex</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Specific TCS provisions, simplified compliance
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* E-Invoice Guidelines */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  E-Invoice Guidelines for GST
                </h3>

                <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    What is E-Invoice?
                  </h4>
                  <p className="text-sm text-slate-700">
                    E-invoice is an electronic invoice generated through the
                    Invoice Registration Portal (IRP). It provides a unique
                    Invoice Reference Number (IRN) and QR code for
                    authentication. E-invoicing is mandatory for B2B and export
                    invoices for businesses with turnover exceeding ₹5 crores.
                  </p>
                </div>

                <div className="space-y-4">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Who Must Generate E-Invoice?
                      </h4>
                      <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                        <li>
                          All businesses with aggregate turnover exceeding ₹5
                          crores
                        </li>
                        <li>Applies to B2B invoices, exports, SEZ supplies</li>
                        <li>NOT applicable to B2C (retail) invoices</li>
                        <li>
                          Special Economic Zones (SEZ) units/developers
                          mandatorily
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        E-Invoice Generation Process
                      </h4>
                      <ol className="text-sm text-slate-700 list-decimal pl-5 space-y-2">
                        <li>
                          Create invoice in accounting software (Tally, SAP,
                          etc.)
                        </li>
                        <li>
                          Upload invoice JSON to IRP portal (directly or via
                          GSP)
                        </li>
                        <li>
                          IRP validates and generates IRN (64-character hash)
                        </li>
                        <li>QR code generated with invoice details</li>
                        <li>
                          Digitally signed invoice returned with IRN and QR code
                        </li>
                        <li>Auto-populated to GSTR-1 and E-way bill system</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Benefits of E-Invoice
                      </h4>
                      <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                        <li>
                          Auto-population of GSTR-1 (no manual entry required)
                        </li>
                        <li>
                          Real-time tracking of invoices by tax authorities
                        </li>
                        <li>Reduced errors through standardized format</li>
                        <li>
                          Faster ITC claim process (pre-populated for recipient)
                        </li>
                        <li>
                          Integration with E-way bill system (one-click
                          generation)
                        </li>
                        <li>Prevention of fake invoices and tax evasion</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Common GST Mistakes */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Common GST Calculation Mistakes to Avoid
                </h3>

                <div className="space-y-3">
                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            Wrong GST Rate Selection
                          </h4>
                          <p className="text-sm text-slate-700">
                            Using 18% GST for gold (correct: 3%) or 5% for
                            electronics (correct: 18%). Always check HSN/SAC
                            code on GST portal or consult CA.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            Rounding Errors in Invoices
                          </h4>
                          <p className="text-sm text-slate-700">
                            GST should be calculated on line items first, then
                            summed. Don&apos;t round base amount before adding
                            GST. Round only the final invoice total.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            Claiming ITC Without Valid Documents
                          </h4>
                          <p className="text-sm text-slate-700">
                            ITC requires valid GST-compliant invoice with
                            supplier GSTIN, HSN/SAC code, and tax breakup.
                            Credit notes, delivery challans don&apos;t qualify.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            Incorrect Place of Supply
                          </h4>
                          <p className="text-sm text-slate-700">
                            For services, place of supply determines if IGST or
                            CGST+SGST applies. Goods: location of goods.
                            Services: location of recipient (B2B) or supplier
                            (B2C).
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            Late Return Filing
                          </h4>
                          <p className="text-sm text-slate-700">
                            GSTR-1 due 11th, GSTR-3B due 20th. Late filing:
                            ₹50/day penalty (₹20/day for nil return). ITC can be
                            claimed only after supplier files GSTR-1.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Financial Calculators
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
                              Calculate income tax liability for businesses and
                              professionals. Compare Old vs New Tax Regime.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate Tax</span>
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
              <AdSlot id="gst-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="gst-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="gst-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="gst-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
