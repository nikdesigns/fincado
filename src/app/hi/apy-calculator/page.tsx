import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import APYClient from '@/app/apy-calculator/APYClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added for Comparison
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
import { UserCheck, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'अटल पेंशन योजना (APY) कैलकुलेटर – चार्ट और लाभ जानें',
  description:
    'Fincado APY कैलकुलेटर (Hindi): अपनी उम्र के अनुसार मासिक निवेश जानें और ₹5000 की गारंटीड पेंशन पाएं। चार्ट, पात्रता और नॉमिनी लाभ देखें।',
  keywords: [
    'APY Calculator Hindi',
    'Atal Pension Yojana Chart Hindi',
    'APY Contribution Hindi',
    'Pension Scheme Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/apy-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/apy-calculator',
    },
  },
  openGraph: {
    title: 'अटल पेंशन योजना (APY) कैलकुलेटर – बुढ़ापे का सहारा',
    description:
      'जानें कि आपको ₹1000 से ₹5000 की पेंशन के लिए हर महीने कितना जमा करना होगा।',
    url: 'https://www.fincado.com/hi/apy-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiAPYPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    joiningAge: 'शामिल होने की आयु (Joining Age)',
    desiredPension: 'वांछित मासिक पेंशन (₹)',
    contributionFreq: 'भुगतान आवृत्ति (Frequency)',
    contributionYears: 'योगदान के वर्ष:',
    pensionStartsAt: 'पेंशन शुरू होगी:',
    resetDefaults: 'रीसेट करें',
    youNeedToPay: 'आपको जमा करना होगा',
    totalInvestment: 'कुल निवेश',
    corpusToNominee: 'नॉमिनी को मिलेगा (Corpus)',
    guaranteedPension: 'गारंटीड मासिक पेंशन',
    forSpouse: '(आपके और आपके जीवनसाथी के लिए)',
    per: '/',
    monthly: 'महीना',
    quarterly: 'तिमाही',
    halfYearly: 'छमाही',
    years: 'वर्ष',
  };

  // ✅ FAQ Items (Hindi)
  const apyFaqs = [
    {
      id: 'apy-faq-1',
      question: 'अगर मैं भुगतान करना बंद कर दूं तो क्या होगा?',
      answer:
        'खाता अंततः बंद कर दिया जाएगा, और जमा राशि (योगदान + ब्याज) आपको वापस कर दी जाएगी। हालाँकि, कुछ रखरखाव शुल्क और जुर्माना काटा जा सकता है।',
    },
    {
      id: 'apy-faq-2',
      question: 'क्या मैं बाद में अपनी पेंशन राशि बढ़ा सकता हूँ?',
      answer:
        'हाँ, आप वित्तीय वर्ष में एक बार अपनी पेंशन राशि को अपग्रेड (जैसे ₹1,000 से ₹5,000) कर सकते हैं। इसके लिए आपको अंतर राशि का भुगतान करना होगा।',
    },
    {
      id: 'apy-faq-3',
      question: 'क्या APY में देर से भुगतान करने पर जुर्माना लगता है?',
      answer:
        'हाँ। आमतौर पर बैंकों द्वारा देर से भुगतान करने पर ₹1 प्रति माह से लेकर ₹10 प्रति माह तक का जुर्माना लगाया जाता है (यह योगदान राशि पर निर्भर करता है)।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Atal Pension Yojana Calculator Hindi"
        description="Calculate Atal Pension Yojana contribution in Hindi."
        url="https://www.fincado.com/hi/apy-calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'कैलकुलेटर', url: 'https://www.fincado.com/hi/calculators' },
          {
            name: 'APY कैलकुलेटर',
            url: 'https://www.fincado.com/hi/apy-calculator',
          },
        ]}
      />

      <FAQSchema
        faqs={apyFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="अटल पेंशन योजना (APY) कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/apy-calculator" />
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
            <span className="block mb-2">अटल पेंशन योजना (APY) कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              भारत सरकार की गारंटीड पेंशन योजना
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              अपने बुढ़ापे को सुरक्षित करें। इस कैलकुलेटर से जानें कि आपको
              ₹1,000 से ₹5,000 की
              <strong>मासिक पेंशन</strong> पाने के लिए आज कितना निवेश करना होगा।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <APYClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-apy-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य पेंशन विकल्प
              </h3>
              <div className="grid grid-cols-2 gap-3">
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
                  💼 ग्रेच्युटी
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
                  🏢 रिटायरमेंट प्लानर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-700">
                  <UserCheck className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    क्या आपको ज्यादा पेंशन चाहिए?
                  </strong>

                  <Link
                    href="/hi/guides/nps-guide" // Fallback to English if Hindi guide absent
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>पढ़ें: NPS, APY से बेहतर क्यों हो सकता है?</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS APY */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      अटल पेंशन योजना (APY) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        अटल पेंशन योजना भारत सरकार द्वारा शुरू की गई एक सामाजिक
                        सुरक्षा योजना है। इसका उद्देश्य असंगठित क्षेत्र के
                        श्रमिकों को 60 वर्ष की आयु के बाद एक निश्चित आय प्रदान
                        करना है।
                      </p>
                      <p>
                        इसमें आपको ₹1,000 से लेकर ₹5,000 तक की{' '}
                        <strong>गारंटीड मासिक पेंशन</strong> मिलती है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: ELIGIBILITY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पात्रता (Eligibility)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>आयु:</strong> 18 से 40 वर्ष के बीच होनी चाहिए।
                      </li>
                      <li>
                        <strong>नागरिकता:</strong> भारतीय नागरिक होना अनिवार्य
                        है।
                      </li>
                      <li>
                        <strong>बैंक खाता:</strong> एक वैध बचत बैंक खाता होना
                        चाहिए।
                      </li>
                      <li>
                        <strong>टैक्स:</strong> 1 अक्टूबर 2022 से, करदाता
                        (Taxpayers) इस योजना में शामिल नहीं हो सकते।
                      </li>
                    </ul>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: APY VS NPS */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      APY बनाम NPS: कौन बेहतर है?
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              सुविधा
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              अटल पेंशन (APY)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              NPS
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              पेंशन राशि
                            </TableCell>
                            <TableCell>फिक्स्ड (अधिकतम ₹5,000)</TableCell>
                            <TableCell>
                              बाजार पर निर्भर (कोई सीमा नहीं)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              रिटर्न
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              गारंटीड (~8%)
                            </TableCell>
                            <TableCell className="text-amber-600 font-medium">
                              9% - 12% (बाजार)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              कौन जुड़ सकता है
                            </TableCell>
                            <TableCell>गैर-करदाता (Non-Tax Payer)</TableCell>
                            <TableCell>कोई भी नागरिक</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* SECTION 4: PENSION SLAB */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पेंशन स्लैब और नॉमिनी लाभ
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              मासिक पेंशन
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              नॉमिनी को मिलने वाली राशि
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>₹1,000</TableCell>
                            <TableCell>₹1.7 लाख</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹2,000</TableCell>
                            <TableCell>₹3.4 लाख</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹3,000</TableCell>
                            <TableCell>₹5.1 लाख</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹4,000</TableCell>
                            <TableCell>₹6.8 लाख</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹5,000</TableCell>
                            <TableCell>₹8.5 लाख</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
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
                    defaultValue={apyFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {apyFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-apy-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
