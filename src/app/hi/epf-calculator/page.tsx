import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EPFClient from '@/app/epf-calculator/EPFClient';
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
import { ArrowRight, BookOpen } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EPF कैलकुलेटर – भविष्य निधि और ब्याज की गणना करें (EPF Calculator)',
  description:
    'Fincado EPF कैलकुलेटर (Hindi): जानें रिटायरमेंट पर आपको कितना PF मिलेगा। ब्याज दर, नियोक्ता योगदान और टैक्स नियमों की सटीक जानकारी।',
  keywords: [
    'EPF Calculator Hindi',
    'PF Calculator India Hindi',
    'EPF Interest Calculator Hindi',
    'Pension Calculator Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/epf-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/epf-calculator/',
    },
  },
  openGraph: {
    title: 'EPF कैलकुलेटर – आपकी रिटायरमेंट पूंजी का हिसाब',
    description:
      'जानें कि आपकी सैलरी से कटने वाला PF रिटायरमेंट तक कितना बड़ा फंड बन जाएगा।',
    url: 'https://fincado.com/hi/epf-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiEPFPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    basicSalary: 'मासिक बेसिक सैलरी + DA (₹)',
    yourContribution: 'आपका योगदान (%)',
    employerContribution: 'नियोक्ता योगदान (%)',
    employmentPeriod: 'नौकरी की अवधि (वर्ष)',
    annualIncrease: 'सालाना ब्याज दर (% p.a)',
    currentInterestRate: 'वर्तमान ब्याज दर',
    resetDefaults: 'रीसेट करें',
    estimatedCorpus: 'अनुमानित EPF राशि',
    yourShare: 'आपका हिस्सा',
    employerShare: 'नियोक्ता का हिस्सा',
    totalInterest: 'कुल ब्याज कमाया',
    yearlyGrowth: 'सालाना EPF वृद्धि',
    balanceAccumulation: 'कुल जमा राशि',
    exportCSV: 'डाउनलोड (CSV)',
    year: 'वर्ष',
    youContrib: 'आपका जमा',
    employerContrib: 'कंपनी जमा',
    interest: 'ब्याज',
    balance: 'शेष राशि',
  };

  // ✅ FAQ Items (Hindi)
  const epfFaqs = [
    {
      id: 'faq-1',
      question: 'क्या मैं अपना PF कभी भी निकाल सकता हूँ?',
      answer:
        'आप पूरी राशि केवल रिटायरमेंट (58 वर्ष) पर निकाल सकते हैं या यदि आप 2 महीने तक बेरोजगार रहते हैं। शादी, शिक्षा या घर खरीदने के लिए "आंशिक निकासी" (Partial Withdrawal) की अनुमति है।',
    },
    {
      id: 'faq-2',
      question: 'EPF ब्याज की गणना कैसे होती है?',
      answer:
        'EPF ब्याज दर सरकार द्वारा हर साल तय की जाती है (वर्तमान में लगभग 8.25%)। ब्याज की गणना मासिक शेष राशि पर होती है लेकिन जमा सालाना होता है।',
    },
    {
      id: 'faq-3',
      question: 'नियोक्ता (Employer) का कितना योगदान होता है?',
      answer:
        'नियोक्ता बेसिक सैलरी + DA का 12% योगदान देता है। इसमें से 3.67% EPF में और बाकी 8.33% कर्मचारी पेंशन योजना (EPS) में जाता है।',
    },
    {
      id: 'faq-4',
      question: 'क्या EPF ब्याज पर टैक्स लगता है?',
      answer:
        'यदि आपका सालाना योगदान ₹2.5 लाख से अधिक है, तो उस अतिरिक्त राशि पर अर्जित ब्याज कर योग्य (Taxable) है। ₹2.5 लाख तक की सीमा पूरी तरह टैक्स-फ्री रहती है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="EPF Calculator Hindi"
        description="Calculate EPF corpus and interest in Hindi."
        url="https://fincado.com/hi/epf-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'EPF कैलकुलेटर',
            url: 'https://fincado.com/hi/epf-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={epfFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EPF कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/epf-calculator" />
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
            <span className="block mb-2">EPF कैलकुलेटर (PF Calculator)</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              रिटायरमेंट कॉर्पस और पेंशन (EPS) की सटीक गणना
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              आपका भविष्य निधि (PF) रिटायरमेंट के लिए सबसे बड़ी संपत्ति है।
              जानें कि आपकी सैलरी से कटने वाला पैसा और ब्याज मिलकर भविष्य में
              कितना बड़ा फंड बनेगा।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <EPFClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-epf-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य रिटायरमेंट टूल
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/ppf-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🏦 PPF कैलकुलेटर
                </Link>
                <Link
                  href="/hi/gratuity-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  💼 ग्रेच्युटी कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    PF निकालने में दिक्कत आ रही है?
                  </strong>

                  <Link
                    href="/guides/epf-guide" // Fallback to English if Hindi guide absent
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>पढ़ें: ऑनलाइन PF कैसे निकालें (स्टेप-बाय-स्टेप)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS EPF */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      कर्मचारी भविष्य निधि (EPF) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        EPF (Employees&apos; Provident Fund) वेतनभोगी
                        कर्मचारियों के लिए एक अनिवार्य रिटायरमेंट बचत योजना है।
                        इसमें कर्मचारी और नियोक्ता दोनों हर महीने योगदान करते
                        हैं।
                      </p>
                      <p>
                        यह भारत सरकार द्वारा समर्थित है और{' '}
                        <strong>EEE (Exempt-Exempt-Exempt)</strong> श्रेणी में
                        आता है, यानी निवेश, ब्याज और मैच्योरिटी राशि तीनों
                        टैक्स-फ्री हैं (कुछ शर्तों के साथ)।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: CONTRIBUTION SPLIT */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      योगदान का बंटवारा (Contribution Split)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        आप और आपकी कंपनी दोनों (Basic Salary + DA) का{' '}
                        <strong>12%</strong> योगदान करते हैं। लेकिन इसका बंटवारा
                        इस प्रकार होता है:
                      </p>
                      <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>
                          <strong>कर्मचारी का हिस्सा:</strong> पूरा 12% आपके EPF
                          खाते में जाता है।
                        </li>
                        <li>
                          <strong>नियोक्ता का हिस्सा:</strong> 3.67% EPF में और
                          8.33% कर्मचारी पेंशन योजना (EPS) में जाता है।
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: COMPARISON TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EPF बनाम PPF: कौन बेहतर है?
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              विशेषता
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              EPF (कर्मचारी)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              PPF (पब्लिक)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              ब्याज दर
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              8.25% (अधिक)
                            </TableCell>
                            <TableCell className="text-slate-600">
                              7.1%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              पात्रता
                            </TableCell>
                            <TableCell>केवल वेतनभोगी</TableCell>
                            <TableCell>कोई भी नागरिक</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              लॉक-इन
                            </TableCell>
                            <TableCell>रिटायरमेंट तक (58)</TableCell>
                            <TableCell>15 वर्ष</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              नियोक्ता मैच
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              हाँ (12%)
                            </TableCell>
                            <TableCell>नहीं</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* SECTION 4: TAX RULES */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EPF पर टैक्स नियम (₹2.5 लाख की सीमा)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        बजट 2021 के नए नियम के अनुसार, यदि एक वित्तीय वर्ष में
                        आपका कुल योगदान (Employee Share + VPF)
                        <strong> ₹2.5 लाख</strong> से अधिक है, तो अतिरिक्त राशि
                        पर मिलने वाला ब्याज कर योग्य (Taxable) होगा।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 5: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EPF ब्याज गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      ब्याज की गणना मासिक शेष राशि (Opening Balance + Monthly
                      Contribution) पर की जाती है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="Interest = \frac{(OpeningBalance + Contribution) \times Rate}{1200}" />
                    </div>

                    <div className="text-slate-700">
                      <p className="text-sm">
                        <em>
                          *ब्याज की गणना हर महीने होती है लेकिन खाते में जमा
                          (Credit) 31 मार्च को होता है।
                        </em>
                      </p>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print mt-12">
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
                    defaultValue={epfFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {epfFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-epf-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
