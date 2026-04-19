import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HindiBrokerageClient from './HindiBrokerageClient';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { Target, Activity, AlertCircle } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title: 'ब्रोकरेज कैलकुलेटर 2026 - इंट्राडे, डिलीवरी और F&O (Options) शुल्क',
  description:
    'Zerodha, Groww और Upstox के लिए अपनी सटीक ब्रोकरेज, STT और शुद्ध लाभ (Net P&L) की गणना करें। SEBI के नए एक्सचेंज शुल्क और नए STT दरों के साथ पूरी तरह अपडेटेड।',
  keywords: [
    'Brokerage Calculator in Hindi',
    'ब्रोकरेज कैलकुलेटर',
    'Zerodha Brokerage Calculator Hindi',
    'इंट्राडे ट्रेडिंग शुल्क',
    'ऑप्शन ट्रेडिंग ब्रोकरेज',
    'STT Calculator in Hindi',
    'Stock Market Breakeven Calculator'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/brokerage-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/brokerage-calculator/',
      'hi-IN': 'https://fincado.com/hi/brokerage-calculator/',
    },
  },
  openGraph: {
    title: 'एडवांस ब्रोकरेज कैलकुलेटर (STT और नेट P&L)',
    description:
      'ट्रेड लेने से पहले अपना सटीक ब्रेकइवन पॉइंट (Breakeven Point) और सभी टैक्स (STT, GST, SEBI) कटने के बाद का शुद्ध मुनाफा जानें।',
    url: 'https://fincado.com/hi/brokerage-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE (Server Component) ---------------- */

export default function HindiBrokerageCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    भारतीय शेयर बाजार में ट्रेडिंग करते समय, <strong>ब्रोकरेज (Brokerage)</strong> केवल एक छोटा सा हिस्सा होता है। आपके कुल मुनाफे (Gross Profit) पर कई वैधानिक टैक्स लगते हैं जैसे कि <strong>STT (Securities Transaction Tax)</strong>, एक्सचेंज शुल्क, स्टाम्प ड्यूटी, SEBI फीस और GST। 
    हमारा <strong>ब्रोकरेज कैलकुलेटर</strong> स्टैंडर्ड डिस्काउंट ब्रोकर मॉडल (Zerodha, Groww, Upstox, AngelOne) का उपयोग करता है ताकि आपको आपका सटीक <strong>शुद्ध लाभ (Net P&L)</strong> और ट्रेड को मुनाफे में लाने के लिए आवश्यक <strong>ब्रेकइवन पॉइंट (Breakeven Point)</strong> दिखाया जा सके।
  </p>
  `);

  const chargesContent = autoLinkContent(`
    <p>इस कैलकुलेटर को नवीनतम नियामक (Regulatory) बदलावों के साथ पूरी तरह अपडेट किया गया है:</p>
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>नई STT दरें (F&O):</strong> ऑप्शंस (Options) पर STT अब 0.1% (0.0625% से बढ़कर) और फ्यूचर्स (Futures) पर 0.02% (0.0125% से बढ़कर) हो गया है।</li>
      <li><strong>True-to-Label एक्सचेंज शुल्क:</strong> SEBI ने स्लैब रेट को हटाकर एक फ्लैट (Flat) शुल्क ढांचा अनिवार्य कर दिया है। NSE लेनदेन शुल्क अब कैश इक्विटी (Cash Equity) के लिए 0.00297% और ऑप्शंस के लिए 0.03503% की फ्लैट दर पर लिया जाता है।</li>
      <li><strong>ब्रोकरेज:</strong> यह डिलीवरी के लिए ₹0 और इंट्राडे/फ्यूचर्स के लिए ₹20 या 0.03% (जो भी कम हो) मानता है। ऑप्शंस (Options) के लिए यह ₹20 प्रति ऑर्डर (₹40 बाय + सेल) है।</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'ट्रेडिंग में ब्रेकइवन पॉइंट (Breakeven Point) क्या होता है?',
      answer:
        'ब्रेकइवन पॉइंट यह दर्शाता है कि टैक्स और ब्रोकरेज की लागत को कवर करने के लिए स्टॉक या ऑप्शन को आपके पक्ष में कितने पॉइंट (Points) मूव करना चाहिए। यदि आप ₹100 पर कोई शेयर खरीदते हैं और ब्रेकइवन 0.50 पॉइंट है, तो आपको केवल ₹0 का शुद्ध लाभ (Net Profit) कमाने के लिए भी उसे ₹100.50 पर बेचना होगा।',
    },
    {
      id: 'faq-2',
      question: 'डिलीवरी (Delivery) ट्रेड्स पर STT इतना अधिक क्यों है?',
      answer:
        'इक्विटी डिलीवरी पर 0.1% का STT (Securities Transaction Tax) खरीद (Buy) और बिक्री (Sell) दोनों पक्षों पर लगाया जाता है। यह इसे लंबी अवधि के निवेशकों के लिए सबसे बड़ा टैक्स बनाता है। इसके विपरीत, इंट्राडे और F&O ट्रेड्स में STT केवल बिक्री (Sell) पक्ष पर लगता है।',
    },
    {
      id: 'faq-3',
      question: '"True-to-Label" चार्ज अपडेट क्या है?',
      answer:
        'पहले, NSE जैसे एक्सचेंज ब्रोकर्स से वॉल्यूम (Slab) के आधार पर चार्ज लेते थे, लेकिन ब्रोकर्स रिटेल ग्राहकों से एक फ्लैट, उच्च दर वसूलते थे और बीच का अंतर खुद रख लेते थे। हाल ही में SEBI ने अनिवार्य किया है कि ब्रोकर्स को ग्राहकों से ठीक वही शुल्क लेना होगा जो एक्सचेंज उनसे लेता है (True-to-Label)। यह कैलकुलेटर उन्हीं नई फ्लैट दरों को दर्शाता है।',
    },
    {
      id: 'faq-4',
      question: 'क्या कुल टर्नओवर (Turnover) पर GST लगाया जाता है?',
      answer:
        'नहीं। 18% GST केवल सेवा शुल्कों (Service Charges) पर लगाया जाता है। इसमें आपका ब्रोकरेज शुल्क, एक्सचेंज ट्रांजैक्शन चार्ज और SEBI टर्नओवर फीस शामिल हैं। STT या स्टाम्प ड्यूटी पर GST नहीं लगता है।',
    },
    {
      id: 'faq-5',
      question: 'क्या यह कैलकुलेटर Zerodha और Groww के लिए काम करता है?',
      answer:
        'हाँ। Zerodha, Groww, Upstox और AngelOne सभी एक समान "डिस्काउंट ब्रोकरेज (Discount Brokerage)" मॉडल (डिलीवरी शून्य, इंट्राडे/F&O के लिए ₹20 प्रति ट्रेड) का पालन करते हैं। यह कैलकुलेटर उनके कॉन्ट्रैक्ट नोट (Contract Note) की सटीक गणना करता है।',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'ब्रोकरेज कैलकुलेटर',
            url: 'https://fincado.com/hi/brokerage-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="ब्रोकरेज कैलकुलेटर (इंट्राडे और F&O)"
        description="Zerodha और Groww के लिए STT, ब्रोकरेज और शुद्ध लाभ (Net P&L) की गणना करें।"
        url="https://fincado.com/hi/brokerage-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="ब्रोकरेज कैलकुलेटर – STT और नेट P&L की गणना करें" />
            <LanguageToggle path="/brokerage-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            ब्रोकरेज (Brokerage) कैलकुलेटर
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              इंट्राडे, डिलीवरी और F&O शुल्क
            </span>
          </h1>

          {/* KEY METRICS BANNER */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1 font-semibold">
              ✅ SEBI &quot;True-to-Label&quot; शुल्क लागू
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              नई STT दरें अपडेटेड
            </span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="brokerage-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
              <p>
                ट्रेड लेने से पहले अपने सटीक <strong>शुद्ध लाभ और हानि (Net Profit & Loss)</strong> की गणना करें। यह एडवांस कैलकुलेटर STT, GST, स्टाम्प ड्यूटी और एक्सचेंज फीस जैसे सभी छिपे हुए शुल्कों का ब्यौरा देता है, ताकि आपको अपना सटीक <strong>ब्रेकइवन पॉइंट (Breakeven Point)</strong> पता चल सके।
              </p>
            `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Interactive Calculator */}
            <HindiBrokerageClient />

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hi/capital-gains-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Activity className="w-4 h-4 mr-2" /> कैपिटल गेन टैक्स
                (STCG/LTCG) कैलकुलेटर
              </Link>
            </div>

            {/* Rich Content Section */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <Target className="w-6 h-6 text-emerald-600" />
                      ब्रेकइवन पॉइंट (Breakeven Point) क्यों महत्वपूर्ण है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                      नवीनतम नियम और शुल्क अपडेट (2026)
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-rose-50 border border-rose-100 p-6 rounded-xl">
                      <WikiText content={chargesContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Charge Matrix */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      स्टैंडर्ड चार्ज मैट्रिक्स (Zerodha/Groww/Upstox)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg mt-4">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b text-slate-800">
                              शुल्क प्रकार (Charge Type)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-slate-800">
                              इक्विटी डिलीवरी
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-slate-800">
                              इक्विटी इंट्राडे
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-slate-800">
                              F&O ऑप्शंस (Options)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ब्रोकरेज
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-600 font-bold">
                              शून्य (Zero)
                            </td>
                            <td className="px-4 py-3 border-l">
                              ₹20 या 0.03% (जो कम हो)
                            </td>
                            <td className="px-4 py-3 border-l">
                              फ्लैट ₹20 / ऑर्डर
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              STT
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.1% (खरीद और बिक्री दोनों पर)
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.025% (केवल बिक्री पर)
                            </td>
                            <td className="px-4 py-3 border-l text-rose-600 font-medium">
                              0.1% (केवल बिक्री पर)
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              एक्सचेंज (NSE)
                            </td>
                            <td className="px-4 py-3 border-l">0.00297%</td>
                            <td className="px-4 py-3 border-l">0.00297%</td>
                            <td className="px-4 py-3 border-l">0.03503%</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              स्टाम्प ड्यूटी
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.015% (केवल खरीद पर)
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.003% (केवल खरीद पर)
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.003% (केवल खरीद पर)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQ */}
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

            <div className="no-print mt-8">
              <AuthorBio />
            </div>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="brokerage-sidebar-hi" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
