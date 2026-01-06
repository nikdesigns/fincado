import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GratuityClient from '@/app/gratuity-calculator/GratuityClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added
import 'katex/dist/katex.min.css';
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
import { Building2, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'ग्रेच्युटी कैलकुलेटर – गणना, फॉर्मूला और टैक्स नियम (2025)',
  description:
    'Fincado ग्रेच्युटी कैलकुलेटर (Hindi): जानें नौकरी छोड़ने या रिटायरमेंट पर आपको कितनी ग्रेच्युटी मिलेगी। 5 साल का नियम, टैक्स छूट (₹20 लाख) और गणना का तरीका समझें।',
  keywords: [
    'Gratuity Calculator Hindi',
    'Gratuity Formula India Hindi',
    'Gratuity Tax Exemption 2025 Hindi',
    'Gratuity Eligibility Rules Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/gratuity-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/gratuity-calculator',
    },
  },
  openGraph: {
    title: 'ग्रेच्युटी कैलकुलेटर – अपनी मेहनत की कमाई का हिसाब',
    description:
      'मुफ्त टूल: अपनी बेसिक सैलरी और सेवा के वर्षों के आधार पर ग्रेच्युटी की गणना करें।',
    url: 'https://www.fincado.com/hi/gratuity-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiGratuityPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    basicSalary: 'मासिक बेसिक सैलरी + DA (₹)',
    yearsOfService: 'सेवा के वर्ष (Years)',
    isCovered: 'क्या कंपनी ग्रेच्युटी एक्ट में है?',
    coveredOption: 'हाँ (Covered)',
    notCoveredOption: 'नहीं (Not Covered)',
    resetDefaults: 'रीसेट करें',
    totalGratuity: 'कुल ग्रेच्युटी राशि',
    exemptGratuity: 'टैक्स-फ्री राशि',
    taxableGratuity: 'टैक्सेबल राशि',
    formulaNote: 'सूत्र: (बेसिक + DA) × 15/26 × वर्ष',
  };

  // ✅ FAQ Items (Hindi)
  const gratuityFaqs = [
    {
      id: 'faq-1',
      question: 'क्या 4 साल 8 महीने को 5 साल माना जाएगा?',
      answer:
        'नहीं। पात्रता (Eligibility) के लिए आपको पूरे 5 साल पूरे करने होंगे। लेकिन, एक बार पात्र होने के बाद (5 साल बाद), 6 महीने से अधिक की किसी भी अवधि को गणना के लिए एक पूरा वर्ष माना जाता है।',
    },
    {
      id: 'faq-2',
      question: 'क्या कंपनी ग्रेच्युटी देने से मना कर सकती है?',
      answer:
        'यदि आपने 5 साल पूरे कर लिए हैं, तो यह आपका कानूनी अधिकार है। इसे केवल तभी रोका जा सकता है जब कर्मचारी को किसी गंभीर दुराचार या हिंसा के कारण नौकरी से निकाला गया हो।',
    },
    {
      id: 'faq-3',
      question: 'क्या ग्रेच्युटी CTC का हिस्सा होती है?',
      answer:
        'हाँ, अधिकांश कंपनियाँ आपकी CTC (Cost to Company) में ग्रेच्युटी (बेसिक सैलरी का लगभग 4.81%) शामिल करती हैं। लेकिन यह आपको तभी मिलती है जब आप कंपनी छोड़ते हैं और 5 साल पूरे कर लेते हैं।',
    },
    {
      id: 'faq-4',
      question: 'क्या ग्रेच्युटी पर टैक्स लगता है?',
      answer:
        'सरकारी कर्मचारियों के लिए यह पूरी तरह टैक्स-फ्री है। निजी क्षेत्र के कर्मचारियों के लिए ₹20 लाख तक की ग्रेच्युटी टैक्स-फ्री है। उससे ऊपर की राशि पर टैक्स लगता है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Gratuity Calculator Hindi"
        description="Calculate Gratuity amount and tax exemption in Hindi."
        url="https://www.fincado.com/hi/gratuity-calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'कैलकुलेटर', url: 'https://www.fincado.com/hi/calculators' },
          {
            name: 'ग्रेच्युटी कैलकुलेटर',
            url: 'https://www.fincado.com/hi/gratuity-calculator',
          },
        ]}
      />

      <FAQSchema
        faqs={gratuityFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="ग्रेच्युटी कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/gratuity-calculator" />
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
            <span className="block mb-2">ग्रेच्युटी कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              अपनी ग्रेच्युटी और टैक्स छूट का अनुमान लगाएं
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              जानें कि 5 साल की नौकरी के बाद आपको कंपनी से कितनी{' '}
              <strong>ग्रेच्युटी</strong> मिलेगी और उसमें से कितना हिस्सा{' '}
              <strong>टैक्स-फ्री</strong> होगा।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <GratuityClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-gratuity-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य टूल
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/epf-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🏢 EPF कैलकुलेटर
                </Link>
                <Link
                  href="/hi/retirement-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  👴 रिटायरमेंट
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                  <Building2 className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    नौकरी बदलने की सोच रहे हैं?
                  </strong>

                  <Link
                    href="/guides/epf-guide" // Fallback to English if Hindi absent
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      पढ़ें: पुराना PF नए खाते में कैसे ट्रांसफर करें?
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS GRATUITY */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      ग्रेच्युटी क्या है? (What is Gratuity?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        ग्रेच्युटी एक मौद्रिक लाभ है जो नियोक्ता (Employer) अपने
                        कर्मचारी को उसकी लंबी सेवाओं के बदले देता है। यह आमतौर
                        पर रिटायरमेंट, इस्तीफे या छंटनी के समय एकमुश्त राशि के
                        रूप में दी जाती है।
                      </p>
                      <p>
                        भारत में, यह{' '}
                        <strong>Payment of Gratuity Act, 1972</strong> के तहत
                        अनिवार्य है। जिस भी संस्था में 10 या उससे अधिक कर्मचारी
                        हैं, उसे ग्रेच्युटी देनी होती है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: FORMULA */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ग्रेच्युटी गणना का फॉर्मूला
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        ग्रेच्युटी की गणना इस बात पर निर्भर करती है कि आपकी
                        कंपनी ग्रेच्युटी एक्ट के तहत आती है या नहीं।
                      </p>
                      <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>
                          <strong>कवर्ड एम्प्लॉइज (Covered):</strong> <br />
                          <em>(अंतिम वेतन × 15 × सेवा वर्ष) / 26</em>
                        </li>
                        <li>
                          <strong>नॉन-कवर्ड एम्प्लॉइज (Not Covered):</strong>{' '}
                          <br />
                          <em>(अंतिम वेतन × 15 × सेवा वर्ष) / 30</em>
                        </li>
                      </ul>
                      <p className="text-sm mt-2 text-slate-500">
                        *वेतन (Salary) = बेसिक पे + महंगाई भत्ता (DA)।
                      </p>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: TAX RULES TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ग्रेच्युटी पर टैक्स नियम (2025)
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              कर्मचारी श्रेणी
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              टैक्स छूट सीमा
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>सरकारी कर्मचारी</TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              पूरी तरह टैक्स-फ्री
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>निजी क्षेत्र (प्राइवेट)</TableCell>
                            <TableCell>₹20 लाख तक</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      <em>
                        *₹20 लाख से ऊपर की राशि आपकी आय में जुड़ जाती है और उस
                        पर टैक्स लगता है।
                      </em>
                    </p>
                  </section>

                  {/* SECTION 4: ELIGIBILITY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पात्रता (Eligibility Criteria)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>न्यूनतम सेवा:</strong> आपको एक ही नियोक्ता के
                        साथ लगातार 5 साल पूरे करने होंगे।
                      </li>
                      <li>
                        <strong>अपवाद:</strong> मृत्यु या विकलांगता के मामले में
                        5 साल का नियम लागू नहीं होता।
                      </li>
                    </ul>
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
                    defaultValue={gratuityFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {gratuityFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-gratuity-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
