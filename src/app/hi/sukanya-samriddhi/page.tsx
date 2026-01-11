import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SSYClient from '@/app/sukanya-samriddhi/SSYClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added
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
import { ArrowRight, UserPlus } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'सुकन्या समृद्धि योजना (SSY) कैलकुलेटर - ब्याज और परिपक्वता | Fincado',
  description:
    'सुकन्या समृद्धि योजना (SSY) कैलकुलेटर हिंदी में: जानें कि बेटी की 21 साल की उम्र में आपको कितना पैसा मिलेगा। ब्याज दर और नियम।',
  keywords: [
    'Sukanya Samriddhi Yojana Hindi',
    'SSY Calculator Hindi',
    'Beti Bachao Beti Padhao',
    'सुकन्या समृद्धि योजना',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/sukanya-samriddhi/',
    languages: {
      'en-IN': 'https://fincado.com/sukanya-samriddhi/',
    },
  },
  openGraph: {
    title: 'SSY कैलकुलेटर – बेटी के भविष्य के लिए',
    description: 'मुफ्त टूल: SSY परिपक्वता राशि और ब्याज की सटीक गणना करें।',
    url: 'https://fincado.com/hi/sukanya-samriddhi/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiSSYPage() {
  // ✅ Hindi Labels
  const hindiLabels = {
    girlAge: 'बेटी की वर्तमान आयु (Current Age)',
    depositFreq: 'निवेश का तरीका (Frequency)',
    monthlyInv: 'मासिक निवेश (Monthly)',
    yearlyInv: 'सालाना निवेश (Yearly)',
    rate: 'ब्याज दर (Interest Rate %)',
    maturityVal: 'परिपक्वता राशि (Maturity Value)',
    totalInv: 'कुल निवेश (Total Investment)',
    totalInt: 'कुल ब्याज (Total Interest)',
    infoText: 'खाता 10 वर्ष की आयु तक ही खुल सकता है।',
  };

  // ✅ FAQ Items (Hindi)
  const ssyFaqs = [
    {
      id: 'ssy-faq-1',
      question: 'मुझे कितने साल तक पैसे जमा करने होंगे?',
      answer:
        'आपको खाता खोलने की तारीख से 15 साल तक पैसे जमा करने होते हैं। इसके बाद के 6 साल (मैच्योरिटी तक) आपको पैसे जमा नहीं करने होते, लेकिन खाते पर ब्याज मिलता रहता है।',
    },
    {
      id: 'ssy-faq-2',
      question: 'क्या मैं बेटी की पढ़ाई के लिए पैसे निकाल सकता हूँ?',
      answer:
        'हाँ। जब बेटी 18 साल की हो जाती है या 10वीं पास कर लेती है, तो आप उच्च शिक्षा (Higher Education) के लिए शेष राशि का 50% निकाल सकते हैं।',
    },
    {
      id: 'ssy-faq-3',
      question: 'अगर बेटी की शादी 21 साल से पहले हो जाए तो क्या होगा?',
      answer:
        'यदि बेटी 18 साल की हो जाती है और उसकी शादी हो रही है, तो आप समय से पहले खाता बंद कर सकते हैं। शादी की तारीख के बाद कोई ब्याज नहीं मिलता।',
    },
    {
      id: 'ssy-faq-4',
      question: 'एक परिवार में कितने SSY खाते खोले जा सकते हैं?',
      answer:
        'एक परिवार में अधिकतम दो बेटियों के लिए खाते खोले जा सकते हैं। जुड़वा या तीन बच्चों के मामले में अपवाद (Exception) है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Sukanya Samriddhi Calculator Hindi"
        description="Calculate SSY maturity amount in Hindi."
        url="https://fincado.com/hi/sukanya-samriddhi/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'SSY कैलकुलेटर',
            url: 'https://fincado.com/hi/sukanya-samriddhi/',
          },
        ]}
      />

      <FAQSchema
        faqs={ssyFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SSY कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/sukanya-samriddhi" />
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
            <span className="block mb-2">
              सुकन्या समृद्धि योजना (SSY) कैलकुलेटर
            </span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              बेटी की शिक्षा और शादी के लिए एक सुरक्षित निवेश
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              यह भारत सरकार की &apos;बेटी बचाओ, बेटी पढ़ाओ&apos; अभियान के तहत
              एक छोटी बचत योजना है। जानें कि आज का छोटा निवेश आपकी बेटी के
              भविष्य के लिए कितना बड़ा <strong>टैक्स-फ्री फंड</strong> बना सकता
              है।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <SSYClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-ssy-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                तुलना करें
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
                  href="/hi/sip-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  📈 बच्चों का फंड (SIP)
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                  <UserPlus className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    बेटी के लिए सबसे अच्छा प्लान?
                  </strong>

                  <Link
                    href="/guides/ssy-guide" // Fallback to English if Hindi guide not ready
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>पढ़ें: SSY बनाम म्यूचुअल फंड (तुलना)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS SSY */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      सुकन्या समृद्धि योजना क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        सुकन्या समृद्धि योजना (SSY) बेटियों के सुरक्षित भविष्य
                        के लिए केंद्र सरकार की एक विशेष बचत योजना है। यह{' '}
                        <strong>EEE (Exempt-Exempt-Exempt)</strong> श्रेणी में
                        आती है, यानी निवेश, ब्याज और परिपक्वता राशि तीनों
                        टैक्स-फ्री हैं।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: ELIGIBILITY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      खाता कौन खोल सकता है?
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>योग्यता:</strong> 10 वर्ष से कम उम्र की बेटी के
                        नाम पर माता-पिता या कानूनी अभिभावक खाता खोल सकते हैं।
                      </li>
                      <li>
                        <strong>सीमा:</strong> एक बेटी के लिए केवल एक खाता। एक
                        परिवार में अधिकतम दो खाते।
                      </li>
                      <li>
                        <strong>निवेश सीमा:</strong> न्यूनतम ₹250 और अधिकतम ₹1.5
                        लाख प्रति वर्ष।
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
                      SSY बनाम PPF: कौन बेहतर है?
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              विशेषता
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              SSY (सुकन्या)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              PPF
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              ब्याज दर
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              ~8.2%
                            </TableCell>
                            <TableCell className="text-slate-600">
                              ~7.1%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              पात्रता
                            </TableCell>
                            <TableCell>केवल बेटियां (&lt;10 वर्ष)</TableCell>
                            <TableCell>कोई भी भारतीय</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">अवधि</TableCell>
                            <TableCell className="font-semibold">
                              21 वर्ष
                            </TableCell>
                            <TableCell>15 वर्ष</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              जमा अवधि
                            </TableCell>
                            <TableCell>15 वर्ष</TableCell>
                            <TableCell>15 वर्ष</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* SECTION 4: WITHDRAWAL */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पैसे निकालने के नियम
                    </h3>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        <strong>आंशिक निकासी:</strong> बेटी की उम्र 18 साल होने
                        पर या 10वीं पास करने पर शिक्षा के लिए 50% राशि निकाली जा
                        सकती है।
                      </p>
                      <p>
                        <strong>पूर्ण निकासी:</strong> खाता खोलने के 21 साल बाद
                        योजना परिपक्व (Mature) होती है। हालांकि, शादी के समय (18
                        साल के बाद) खाता बंद किया जा सकता है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 5: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SSY ब्याज गणना
                    </h3>
                    <p className="text-slate-700">
                      SSY पर ब्याज सालाना चक्रवृद्धि (Compounded Annually) होता
                      है।
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="A = P(1 + r)^n" />
                    </div>

                    <div className="text-slate-700">
                      <p className="text-sm">
                        <em>
                          यहाँ P में पिछले वर्षों का मूलधन और ब्याज भी शामिल
                          होता है।
                        </em>
                      </p>
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
                    defaultValue={ssyFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {ssyFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-ssy-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
