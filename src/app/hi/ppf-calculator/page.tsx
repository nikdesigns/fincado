import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PPFClient from '@/app/ppf-calculator/PPFClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added for live rates
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
import { ShieldCheck, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'PPF कैलकुलेटर – भविष्य निधि (PPF) ब्याज और परिपक्वता राशि | Fincado',
  description:
    'पब्लिक प्रोविडेंट फंड (PPF) कैलकुलेटर हिंदी में: जानें कि 15 साल बाद आपकी जमा राशि पर कितना ब्याज मिलेगा। टैक्स-फ्री रिटर्न की गणना करें।',
  keywords: [
    'PPF Calculator Hindi',
    'Public Provident Fund Hindi',
    'PPF Interest Rate Hindi',
    'Tax Free Investment Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/ppf-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/ppf-calculator/',
    },
  },
  openGraph: {
    title: 'PPF कैलकुलेटर – सुरक्षित और टैक्स-फ्री निवेश',
    description:
      'मुफ्त टूल: PPF मैच्योरिटी राशि और कुल ब्याज की सटीक गणना करें।',
    url: 'https://fincado.com/hi/ppf-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiPPFPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    modeLabel: 'निवेश मोड (Mode)',
    monthlyInv: 'मासिक निवेश (Monthly Investment)',
    annualInv: 'सालाना निवेश (Annual Investment)',
    rate: 'ब्याज दर (Interest Rate %)',
    duration: 'अवधि (Years)',
    maturity: 'परिपक्वता राशि (Maturity Value)',
    totalInv: 'कुल निवेश (Total Investment)',
    totalInt: 'कुल ब्याज (Total Interest)',
  };

  // ✅ FAQ Items (Hindi)
  const ppfFaqs = [
    {
      id: 'faq-1',
      question: 'क्या मैं 15 साल से पहले PPF से पैसा निकाल सकता हूँ?',
      answer:
        'हाँ, 7वें वित्तीय वर्ष से आंशिक निकासी (Partial Withdrawal) की अनुमति है। आप पिछले चौथे वर्ष के अंत में शेष राशि का 50% तक निकाल सकते हैं।',
    },
    {
      id: 'faq-2',
      question: 'अगर मैं एक साल पैसा जमा करना भूल जाऊँ तो क्या होगा?',
      answer:
        'आपका खाता निष्क्रिय (Inactive) हो जाएगा। इसे दोबारा सक्रिय करने के लिए आपको ₹50 प्रति वर्ष का जुर्माना और ₹500 प्रति वर्ष की न्यूनतम जमा राशि देनी होगी।',
    },
    {
      id: 'faq-3',
      question: 'क्या मैं 15 साल बाद भी PPF खाता जारी रख सकता हूँ?',
      answer:
        'हाँ। आप परिपक्वता (Maturity) के बाद अपने खाते को 5-5 साल के ब्लॉक में अनिश्चित काल तक बढ़ा सकते हैं।',
    },
    {
      id: 'faq-4',
      question: 'क्या PPF पर मिलने वाला ब्याज टैक्स-फ्री है?',
      answer:
        'जी हाँ, PPF "EEE" श्रेणी में आता है। इसका मतलब है कि निवेश राशि, मिलने वाला ब्याज और मैच्योरिटी राशि तीनों पूरी तरह से टैक्स-फ्री हैं।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="PPF Calculator Hindi"
        description="Calculate PPF Maturity in Hindi."
        url="https://fincado.com/hi/ppf-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'PPF कैलकुलेटर',
            url: 'https://fincado.com/hi/ppf-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={ppfFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="PPF कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/ppf-calculator" />
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
            <span className="block mb-2">PPF कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              पब्लिक प्रोविडेंट फंड (PPF) - सुरक्षित और टैक्स-फ्री रिटर्न
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              पब्लिक प्रोविडेंट फंड (PPF) भारत में निवेश का सबसे सुरक्षित विकल्प
              है। इस कैलकुलेटर से जानें कि 15 साल बाद आपको कितना रिटर्न मिलेगा
              और आप कितना <strong>टैक्स बचा (Tax Saving)</strong> सकते हैं।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <PPFClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-ppf-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य बचत योजनाएं
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/fd-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🏦 FD कैलकुलेटर
                </Link>
                <Link
                  href="/hi/sukanya-samriddhi"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  👧 सुकन्या समृद्धि
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    सुरक्षित निवेश रणनीति
                  </strong>

                  <Link
                    href="/guides/ppf-guide" // Fallback to English if Hindi guide not ready
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>गाइड पढ़ें: PPF रिटर्न को अधिकतम कैसे करें</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS PPF */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      PPF खाता क्या है? (What is PPF?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        PPF (Public Provident Fund) सरकार द्वारा समर्थित एक लंबी
                        अवधि की बचत योजना है। यह आपको रिटायरमेंट के लिए एक बड़ा
                        फंड बनाने में मदद करती है।
                      </p>
                      <p>
                        यह उन कुछ निवेश विकल्पों में से एक है जो{' '}
                        <strong>EEE (Exempt-Exempt-Exempt)</strong> श्रेणी में
                        आते हैं, जिसका अर्थ है कि जमा राशि, ब्याज और परिपक्वता
                        राशि तीनों <strong>100% टैक्स-फ्री</strong> हैं।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: ELIGIBILITY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पात्रता (Eligibility Criteria)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>भारतीय निवासी:</strong> कोई भी भारतीय नागरिक PPF
                        खाता खोल सकता है।
                      </li>
                      <li>
                        <strong>नाबालिग:</strong> माता-पिता अपने नाबालिग बच्चे
                        के नाम पर खाता खोल सकते हैं।
                      </li>
                      <li>
                        <strong>प्रतिबंध:</strong> NRIs और HUFs नया PPF खाता
                        नहीं खोल सकते।
                      </li>
                    </ul>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: COMPARISON TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      PPF बनाम FD बनाम ELSS: त्वरित तुलना
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              विशेषता
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              PPF
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Bank FD
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              ELSS (MF)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              रिटर्न
                            </TableCell>
                            <TableCell className="font-semibold text-lime-700">
                              ~7.1% (गारंटीड)
                            </TableCell>
                            <TableCell className="text-slate-600">
                              6.5% – 7.5%
                            </TableCell>
                            <TableCell className="font-semibold text-amber-600">
                              12% – 15%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">टैक्स</TableCell>
                            <TableCell className="font-semibold text-lime-700">
                              पूरी तरह फ्री (EEE)
                            </TableCell>
                            <TableCell className="text-red-600">
                              पूरी तरह टैक्सेबल
                            </TableCell>
                            <TableCell className="text-amber-600">
                              12.5% (LTCG)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              लॉक-इन
                            </TableCell>
                            <TableCell className="font-semibold">
                              15 साल
                            </TableCell>
                            <TableCell>7 दिन – 10 साल</TableCell>
                            <TableCell className="font-semibold">
                              3 साल
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">जोखिम</TableCell>
                            <TableCell className="font-semibold text-lime-700">
                              शून्य (सरकारी)
                            </TableCell>
                            <TableCell>कम</TableCell>
                            <TableCell className="font-semibold text-red-600">
                              अधिक (बाजार)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* SECTION 4: LOAN & EXTENSION */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      लोन और विस्तार (Extension) के नियम
                    </h3>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        <strong>लोन:</strong> आप तीसरे से छठे वित्तीय वर्ष के
                        बीच अपने PPF बैलेंस पर लोन ले सकते हैं।
                      </p>
                      <p>
                        <strong>विस्तार:</strong> 15 साल पूरे होने के बाद, आप
                        खाते को 5-5 साल के लिए आगे बढ़ा सकते हैं (चाहे तो और
                        पैसा जमा करें, या बिना जमा किए ब्याज कमाते रहें)।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 5: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      PPF गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      PPF पर ब्याज सालाना चक्रवृद्धि (Compounded Annually) होता
                      है।
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="A = P \times \left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>A</strong> = परिपक्वता राशि (Maturity Amount)
                        </li>
                        <li>
                          <strong>P</strong> = वार्षिक किस्त (Annual
                          Installment)
                        </li>
                        <li>
                          <strong>i</strong> = ब्याज दर (दशमलव में)
                        </li>
                        <li>
                          <strong>n</strong> = अवधि (वर्षों में)
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
                    defaultValue={ppfFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {ppfFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-ppf-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
