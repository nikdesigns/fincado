import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SWPClient from '@/app/swp-calculator/SWPClient';
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
import { ArrowRight, UserCheck } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'SWP कैलकुलेटर – मासिक पेंशन और निकासी | Fincado',
  description:
    'SWP Calculator Hindi: म्यूचुअल फंड से मासिक आय (Pension) की गणना करें। जानें आपका पैसा कितने साल तक चलेगा और इस पर कितना टैक्स लगेगा।',
  keywords: [
    'SWP Calculator Hindi',
    'Systematic Withdrawal Plan Hindi',
    'Monthly Income Plan Hindi',
    'Mutual Fund SWP Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/swp-calculator/',
    languages: { 'en-IN': 'https://fincado.com/swp-calculator/' },
  },
  openGraph: {
    title: 'SWP कैलकुलेटर – नियमित मासिक आय पाएं',
    description: 'मुफ्त टूल: जानें कि आपका फंड कब तक चलेगा।',
    url: 'https://fincado.com/hi/swp-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiSWPPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    totalInv: 'कुल निवेश (Total Investment)',
    monthlyWithdrawal: 'मासिक निकासी (Withdrawal)',
    rate: 'ब्याज दर (Return %)',
    time: 'समय अवधि (Years)',
    remainingVal: 'बची हुई राशि (Balance)',
    totalWithdrawn: 'कुल निकासी',
    warning: '⚠️ चेतावनी: आपका फंड तय समय से पहले खत्म हो जाएगा।',
  };

  // ✅ FAQ Items (Hindi)
  const swpFaqs = [
    {
      id: 'faq-1',
      question: 'क्या मेरा SWP फंड जीरो हो सकता है?',
      answer:
        'हाँ। यदि आप फंड के रिटर्न से ज्यादा पैसा निकालते हैं, तो आप मूलधन (Principal) खाना शुरू कर देंगे और धीरे-धीरे आपका फंड खत्म हो जाएगा।',
    },
    {
      id: 'faq-2',
      question: 'क्या SWP पर टैक्स लगता है?',
      answer:
        'हाँ, लेकिन यह बहुत टैक्स-कुशल (Tax Efficient) है। निकासी में केवल "कैपिटल गेन्स" वाले हिस्से पर टैक्स लगता है, मूलधन पर नहीं। इक्विटी फंड में ₹1.25 लाख तक का सालाना लाभ टैक्स-फ्री है।',
    },
    {
      id: 'faq-3',
      question: 'क्या मैं अपना SWP कभी भी रोक सकता हूँ?',
      answer:
        'जी हाँ। SWP पूरी तरह से लचीला है। आप कभी भी निकासी रोक सकते हैं, राशि बदल सकते हैं या पूरा पैसा निकाल सकते हैं। कोई पेनल्टी नहीं लगती।',
    },
    {
      id: 'faq-4',
      question: 'डिविडेंड और SWP में क्या बेहतर है?',
      answer:
        'SWP बेहतर है क्योंकि इसमें आपको एक निश्चित राशि मिलती है और इस पर टैक्स भी कम लगता है। डिविडेंड अनिश्चित होता है और उस पर आपकी टैक्स स्लैब के अनुसार टैक्स लगता है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="SWP Calculator Hindi"
        description="Calculate Systematic Withdrawal Plan in Hindi."
        url="https://fincado.com/hi/swp-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'SWP कैलकुलेटर',
            url: 'https://fincado.com/hi/swp-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={swpFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SWP कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/swp-calculator" />
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
            <span className="block mb-2">SWP कैलकुलेटर (मासिक आय)</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              रिटायरमेंट के लिए नियमित आय (Pension) प्लान करें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              एसडब्ल्यूपी (SWP) का उपयोग करके अपने निवेश को मासिक वेतन में
              बदलें। जानें कि आप हर महीने कितना पैसा निकाल सकते हैं और आपका{' '}
              <strong>फंड कितने साल तक चलेगा</strong>।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <SWPClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-swp-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य विकल्प
              </h3>
              <div className="grid grid-cols-2 gap-3">
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
                  📈 SIP कैलकुलेटर
                </Link>
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
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                  <UserCheck className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    रिटायर हो रहे हैं?
                  </strong>

                  <Link
                    href="/guides/swp-guide" // Use English guide if Hindi absent
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>पढ़ें: टैक्स-फ्री पेंशन कैसे बनाएं?</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS SWP */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      SWP क्या है? (What is SWP?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        SWP का मतलब है{' '}
                        <strong>Systematic Withdrawal Plan</strong>। यह SIP का
                        ठीक उल्टा है। जहाँ SIP में आप निवेश करते हैं, वहीं SWP
                        में आप अपने म्यूचुअल फंड निवेश से नियमित अंतराल (जैसे हर
                        महीने) पर एक निश्चित राशि निकालते हैं।
                      </p>
                      <p>
                        यह रिटायरमेंट के बाद &quot;पेंशन&quot; जैसी नियमित आय
                        पाने का सबसे स्मार्ट तरीका है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: COMPARISON TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP बनाम डिविडेंड (Dividend): कौन बेहतर?
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              विशेषता
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              SWP (Growth)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Dividend (IDCW)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              राशि (Amount)
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              निश्चित (आप तय करें)
                            </TableCell>
                            <TableCell className="text-slate-600">
                              अनिश्चित (AMC तय करती है)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              टैक्स (Tax)
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              कम (Capital Gains)
                            </TableCell>
                            <TableCell className="text-red-600 font-medium">
                              अधिक (Slab Rate)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              नियंत्रण
                            </TableCell>
                            <TableCell>पूर्ण नियंत्रण</TableCell>
                            <TableCell>कोई नियंत्रण नहीं</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: TAXATION */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP पर टैक्स (Tax Rules 2025)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        SWP इसलिए फायदेमंद है क्योंकि आपको पूरी निकासी पर टैक्स
                        नहीं देना होता, बल्कि केवल मुनाफे (Capital Gains) वाले
                        हिस्से पर टैक्स लगता है।
                      </p>
                      <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>
                          <strong>इक्विटी फंड:</strong> 1 साल बाद ₹1.25 लाख तक
                          का सालाना लाभ टैक्स-फ्री है। उससे ऊपर 12.5% टैक्स लगता
                          है।
                        </li>
                        <li>
                          <strong>डेट फंड:</strong> आपके टैक्स स्लैब के अनुसार
                          टैक्स लगता है।
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      बची हुई राशि (Remaining Balance) निकालने के लिए निम्नलिखित
                      सूत्र का उपयोग किया जाता है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="Bal = P(1+i)^n - W \times \frac{(1+i)^n - 1}{i}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>Bal</strong> = अंतिम शेष राशि
                        </li>
                        <li>
                          <strong>P</strong> = प्रारंभिक निवेश
                        </li>
                        <li>
                          <strong>W</strong> = मासिक निकासी
                        </li>
                        <li>
                          <strong>i</strong> = मासिक रिटर्न दर
                        </li>
                        <li>
                          <strong>n</strong> = कुल महीने
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* SECTION 5: ADVANTAGES */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP के फायदे
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            नियमित आय
                          </h4>
                          <p className="text-sm text-slate-600">
                            आपको हर महीने बैंक खाते में एक निश्चित तारीख को पैसा
                            मिलता है।
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            पूंजी वृद्धि
                          </h4>
                          <p className="text-sm text-slate-600">
                            यदि निकासी दर रिटर्न दर से कम है, तो आपका मूलधन भी
                            बढ़ता रहता है।
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            टैक्स बचत
                          </h4>
                          <p className="text-sm text-slate-600">
                            FD ब्याज की तुलना में SWP पर बहुत कम टैक्स लगता है।
                          </p>
                        </CardContent>
                      </Card>
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
                    defaultValue={swpFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {swpFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-swp-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
