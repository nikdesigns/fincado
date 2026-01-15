import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreditScoreClient from '@/app/credit-score/CreditScoreClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added for Comparison
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import FAQSchema from '@/components/FAQSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ShieldAlert, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'क्रेडिट स्कोर कैलकुलेटर – अपना CIBIL स्कोर चेक करें और सुधारें',
  description:
    'Fincado क्रेडिट स्कोर कैलकुलेटर (Hindi): अपना क्रेडिट स्कोर जानें। देखें कि पेमेंट हिस्ट्री और क्रेडिट लिमिट का आपके CIBIL स्कोर पर क्या असर होता है।',
  keywords: [
    'Credit Score Calculator Hindi',
    'CIBIL Score Check Hindi',
    'Improve Credit Score Hindi',
    'Loan Eligibility Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/credit-score/',
    languages: {
      'en-IN': 'https://fincado.com/credit-score/',
    },
  },
  openGraph: {
    title: 'क्रेडिट स्कोर कैलकुलेटर – लोन मिलने की संभावना जानें',
    description:
      'मुफ्त टूल: अपना अनुमानित क्रेडिट स्कोर चेक करें और उसे सुधारने के तरीके जानें।',
    url: 'https://fincado.com/hi/credit-score/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiCreditScorePage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    onTimePayments: 'समय पर भुगतान (%)',
    creditUtilization: 'क्रेडिट का उपयोग (Utilization %)',
    avgAge: 'क्रेडिट आयु (वर्ष)',
    activeAccounts: 'सक्रिय खाते (Active Accounts)',
    recentEnquiries: 'हाल की पूछताछ (Enquiries)',
    loanMix: 'लोन मिश्रण (%)',
    hasDefaults: 'डिफ़ॉल्ट (Defaults)',
    hasSettlements: 'सेटलमेंट (Settlements)',
    estimatedScore: 'अनुमानित स्कोर',
    improveSimulator: '⚡ स्कोर सुधारने का सिम्युलेटर',
    totalCardLimit: 'कुल कार्ड लिमिट',
    payDownAmount: 'भुगतान राशि (Pay Down)',
    newUtil: 'नया उपयोग (Util)',
    noChange: 'कोई बदलाव नहीं',
    points: 'अंक (Points)',
    priorityActions: 'प्राथमिकता वाले कदम:',
    actionReduceUtil: 'क्रेडिट उपयोग 30% से कम करें',
    actionAvoidLoans: 'नए लोन के लिए आवेदन न करें',
    actionOnTime: '100% समय पर भुगतान सुनिश्चित करें',
    actionKeepOld: 'पुराने खाते बंद न करें',
    actionMaintain: 'वर्तमान अच्छी आदतें बनाए रखें!',
    disclaimer:
      '*यह केवल एक अनुमानित स्कोर है। वास्तविक CIBIL या Experian स्कोर भिन्न हो सकता है।',
  };

  // ✅ FAQ Items (Hindi)
  const creditFaqs = [
    {
      id: 'faq-1',
      question: 'क्या Settled स्टेटस बुरा है?',
      answer:
        'हाँ। "Settled" का मतलब है कि आपने पूरा बकाया नहीं चुकाया। यह एक नकारात्मक निशान है। हमेशा पूरा भुगतान करके "Closed" स्टेटस पाने का लक्ष्य रखें।',
    },
    {
      id: 'faq-2',
      question: 'क्रेडिट स्कोर कितनी बार अपडेट होता है?',
      answer:
        'बैंक आमतौर पर हर 30-45 दिनों में क्रेडिट ब्यूरो (जैसे CIBIL, Experian) को डेटा भेजते हैं। जब भी नया डेटा मिलता है, आपका स्कोर अपडेट हो जाता है।',
    },
    {
      id: 'faq-3',
      question: 'क्या अपना स्कोर चेक करने से वह कम हो जाता है?',
      answer:
        'नहीं। अपना स्कोर खुद चेक करना "Soft Inquiry" है और इससे आपके स्कोर पर कोई असर नहीं पड़ता। केवल बैंक द्वारा की गई "Hard Inquiry" से स्कोर थोड़ा कम हो सकता है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Credit Score Calculator Hindi"
        description="Estimate credit score and get improvement tips in Hindi."
        url="https://fincado.com/hi/credit-score/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'क्रेडिट स्कोर कैलकुलेटर',
            url: 'https://fincado.com/hi/credit-score/',
          },
        ]}
      />

      <FAQSchema
        faqs={creditFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="क्रेडिट स्कोर कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/credit-score" />
          </div>

          <h1
            className="
            text-[clamp(1.8rem,4vw,2.5rem)]
            font-semibold
            leading-tight
            tracking-[-0.02em]
            text-slate-900
          "
          >
            <span className="block mb-2">क्रेडिट स्कोर कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              अपना CIBIL स्कोर अनुमानित करें और सुधारें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              जानें कि कौन से कारक आपके स्कोर को नुकसान पहुँचा रहे हैं। देखें कि
              क्रेडिट कार्ड का बिल चुकाने या लिमिट बढ़ाने से आपका{' '}
              <strong>क्रेडिट स्कोर</strong> कैसे बढ़ सकता है।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <CreditScoreClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-credit-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                लोन विकल्प
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/loans/personal-loan/"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  💸 पर्सनल लोन
                </Link>
                <Link
                  href="/hi/emi-calculator/"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🔢 EMI कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <ShieldAlert className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    स्कोर अचानक गिर गया?
                  </strong>

                  <Link
                    href="hi/guides/credit-score/" // Fallback to English if Hindi guide absent
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>पढ़ें: CIBIL विवाद (Dispute) कैसे दर्ज करें?</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS CREDIT SCORE */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      क्रेडिट स्कोर क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        आपका <strong>क्रेडिट स्कोर</strong> (जिसे भारत में अक्सर{' '}
                        <strong>CIBIL स्कोर</strong> कहा जाता है) 300 से 900 के
                        बीच की एक संख्या है जो आपकी साख (Creditworthiness) को
                        दर्शाती है।
                      </p>
                      <p>
                        बैंक और लोन देने वाली संस्थाएं इसका उपयोग यह तय करने के
                        लिए करती हैं कि आपको लोन देना जोखिम भरा है या नहीं। सबसे
                        कम ब्याज दरों पर लोन पाने के लिए आमतौर पर{' '}
                        <strong>750+</strong> स्कोर अच्छा माना जाता है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: SCORE RANGES */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      क्रेडिट स्कोर रेंज (Score Ranges)
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              स्कोर रेंज
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              रेटिंग
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              लोन मिलने की संभावना
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold text-emerald-600">
                              750 - 900
                            </TableCell>
                            <TableCell>उत्कृष्ट (Excellent)</TableCell>
                            <TableCell>
                              आसानी से मंजूरी, सबसे कम ब्याज दरें
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-lime-600">
                              700 - 749
                            </TableCell>
                            <TableCell>अच्छा (Good)</TableCell>
                            <TableCell>अच्छी संभावना, मानक दरें</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-amber-600">
                              650 - 699
                            </TableCell>
                            <TableCell>औसत (Average)</TableCell>
                            <TableCell>मुश्किल मंजूरी, उच्च ब्याज दर</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-red-600">
                              300 - 649
                            </TableCell>
                            <TableCell>खराब (Poor)</TableCell>
                            <TableCell>लोन मिलना बहुत मुश्किल</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: FACTORS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      क्रेडिट स्कोर को प्रभावित करने वाले 5 कारक
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>भुगतान इतिहास (35%):</strong> सबसे महत्वपूर्ण।
                        एक भी किस्त चूकने पर स्कोर तेजी से गिरता है।
                      </li>
                      <li>
                        <strong>क्रेडिट उपयोग (30%):</strong> अपनी लिमिट का 30%
                        से ज्यादा उपयोग करना क्रेडिट भूख का संकेत है।
                      </li>
                      <li>
                        <strong>क्रेडिट आयु (15%):</strong> पुराने खाते स्कोर
                        बढ़ाते हैं। पुराना कार्ड बंद न करें।
                      </li>
                      <li>
                        <strong>क्रेडिट मिश्रण (10%):</strong> सिक्योर्ड (होम
                        लोन) और अनसिक्योर्ड (क्रेडिट कार्ड) लोन का संतुलन अच्छा
                        होता है।
                      </li>
                      <li>
                        <strong>नई पूछताछ (10%):</strong> बहुत कम समय में कई लोन
                        अप्लाई करना स्कोर घटाता है।
                      </li>
                    </ul>
                  </section>

                  {/* SECTION 4: SOFT VS HARD INQUIRY  */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      सॉफ्ट बनाम हार्ड इंक्वायरी (Inquiry)
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              विशेषता
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              सॉफ्ट इंक्वायरी
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              हार्ड इंक्वायरी
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              कौन करता है?
                            </TableCell>
                            <TableCell>आप खुद या एम्प्लॉयर</TableCell>
                            <TableCell>बैंक या लोन देने वाली संस्था</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              उद्देश्य
                            </TableCell>
                            <TableCell>जानकारी के लिए</TableCell>
                            <TableCell>लोन एप्लीकेशन के लिए</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              स्कोर पर असर
                            </TableCell>
                            <TableCell className="text-emerald-600 font-semibold">
                              कोई असर नहीं
                            </TableCell>
                            <TableCell className="text-red-600 font-semibold">
                              थोड़ा कम हो सकता है
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* SECTION 5: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      क्रेडिट स्कोर की गणना कैसे होती है?
                    </h3>
                    <p className="text-slate-700">
                      हालाँकि सटीक एल्गोरिदम गुप्त होता है, लेकिन मोटे तौर पर
                      भार (Weightage) इस प्रकार है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="Score = 0.35(P) + 0.30(U) + 0.15(A) + 0.10(M) + 0.10(N)" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>P</strong>: भुगतान इतिहास (Payment History)
                        </li>
                        <li>
                          <strong>U</strong>: क्रेडिट उपयोग (Utilization)
                        </li>
                        <li>
                          <strong>A</strong>: क्रेडिट इतिहास की उम्र (Age)
                        </li>
                        <li>
                          <strong>M</strong>: क्रेडिट मिश्रण (Mix)
                        </li>
                        <li>
                          <strong>N</strong>: नई पूछताछ (New Inquiries)
                        </li>
                      </ul>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न (FAQs)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={creditFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {creditFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900 font-medium">
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
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <HindiSidebar adId="hi-credit-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
