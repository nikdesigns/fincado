import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HindiKVPClient from './HindiKVPClient';
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
import { ArrowRight, ShieldCheck, Landmark, Clock } from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- RELATED CALCULATORS ---------------- */
const relatedCalculators = [
  {
    href: '/hi/nsc-calculator/',
    icon: '🏦',
    title: 'NSC कैलकुलेटर',
    description: '5 वर्षीय पोस्ट ऑफिस सेविंग सर्टिफिकेट, सेक्शन 80C लाभ सहित।',
  },
  {
    href: '/hi/pomis-calculator/',
    icon: '📬',
    title: 'POMIS कैलकुलेटर',
    description: 'पोस्ट ऑफिस मंथली इनकम स्कीम से गारंटीड मासिक आय।',
  },
  {
    href: '/hi/scss-calculator/',
    icon: '👴',
    title: 'SCSS कैलकुलेटर',
    description: 'वरिष्ठ नागरिकों (60+) के लिए ज़्यादा तिमाही ब्याज दर।',
  },
  {
    href: '/hi/ppf-calculator/',
    icon: '💰',
    title: 'PPF कैलकुलेटर',
    description: '15 वर्षीय PPF निवेश पर 100% टैक्स-फ्री रिटर्न।',
  },
];

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title:
    'KVP कैलकुलेटर 2026 - पोस्ट ऑफिस पैसा दोगुना स्कीम (Kisan Vikas Patra)',
  description:
    'किसान विकास पत्र (KVP) की सटीक मैच्योरिटी तारीख और दोगुने पैसे की गणना करें। वर्तमान ब्याज दर 7.5% है - पैसा 115 महीनों (9 साल, 7 महीने) में दोगुना हो जाता है।',
  keywords: [
    'KVP Calculator in Hindi',
    'किसान विकास पत्र कैलकुलेटर',
    'पोस्ट ऑफिस पैसा दोगुना स्कीम',
    'Kisan Vikas Patra scheme in hindi',
    'KVP interest rate 2026 hindi',
    'Post Office Double Money Scheme'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/kvp-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/kvp-calculator/',
      'hi-IN': 'https://fincado.com/hi/kvp-calculator/',
      'x-default': 'https://fincado.com/kvp-calculator/',
    },
  },
  openGraph: {
    title: 'KVP कैलकुलेटर (किसान विकास पत्र)',
    description:
      'भारत सरकार की किसान विकास पत्र योजना के तहत यह पता करें कि आपका पैसा किस सटीक तारीख को दोगुना (Double) होगा।',
    url: 'https://fincado.com/hi/kvp-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE (Server Component) ---------------- */

export default function HindiKVPCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>किसान विकास पत्र (Kisan Vikas Patra - KVP)</strong> इंडिया पोस्ट (India Post) द्वारा जारी की जाने वाली एक लोकप्रिय और सुरक्षित बचत योजना है। 
    इस योजना का मूल वादा बहुत सीधा है: <strong>यह आपके एकमुश्त निवेश (One-time investment) को भारत सरकार द्वारा निर्धारित अवधि में दोगुना (Double) कर देती है।</strong> 
    शेयर बाजार (Stock Market) के उतार-चढ़ाव से पूरी तरह सुरक्षित, यह योजना उन लोगों के लिए बेहतरीन है जो जीरो रिस्क के साथ गारंटीड रिटर्न चाहते हैं।
  </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>पैसा दोगुना होने का समय:</strong> वर्तमान <strong>7.5% सालाना</strong> ब्याज दर के अनुसार, आपका निवेशित पैसा ठीक <strong>115 महीनों (9 वर्ष और 7 महीने)</strong> में दोगुना हो जाएगा।</li>
      <li><strong>निवेश की सीमा:</strong> आप न्यूनतम ₹1,000 (₹100 के गुणकों में) से शुरुआत कर सकते हैं। KVP में निवेश करने की <strong>कोई अधिकतम सीमा नहीं है</strong>।</li>
      <li><strong>लॉक-इन अवधि (Lock-in Period):</strong> इसमें <strong>2 वर्ष और 6 महीने (30 महीने)</strong> की सख्त लॉक-इन अवधि होती है। आप इस अवधि से पहले अपना पैसा नहीं निकाल सकते।</li>
      <li><strong>टैक्स नियम:</strong> <a href="/hi/ppf-calculator/">PPF</a> के विपरीत, KVP में इनकम टैक्स के सेक्शन 80C के तहत कोई टैक्स छूट (Tax Deduction) नहीं मिलती है। अर्जित ब्याज आपकी स्लैब दर के अनुसार पूरी तरह से टैक्सेबल होता है।</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'किसान विकास पत्र (KVP) में कौन निवेश कर सकता है?',
      answer:
        'कोई भी निवासी भारतीय (Indian Citizen) KVP प्रमाणपत्र खरीद सकता है। इसे व्यक्तिगत रूप से, संयुक्त रूप से (अधिकतम 3 वयस्क), या नाबालिग की ओर से लिया जा सकता है। NRI (अनिवासी भारतीय) और HUF निवेश करने के पात्र नहीं हैं।',
    },
    {
      id: 'faq-2',
      question: '2026 में मेरा पैसा कितने महीनों में दोगुना हो जाएगा?',
      answer:
        'वर्तमान 7.5% वार्षिक चक्रवृद्धि (Compounding) ब्याज दर के अनुसार, आपका पैसा ठीक 115 महीनों में दोगुना हो जाएगा, जो कि 9 वर्ष और 7 महीने के बराबर है।',
    },
    {
      id: 'faq-3',
      question: 'क्या KVP से मिलने वाला पैसा टैक्स-फ्री (Tax-free) है?',
      answer:
        'नहीं। किसान विकास पत्र सेक्शन 80C के तहत कोई टैक्स लाभ नहीं देता है। इसके अलावा, परिपक्वता (Maturity) पर मिलने वाला ब्याज आपके इनकम टैक्स स्लैब के आधार पर पूरी तरह से टैक्सेबल होता है। हालांकि, पोस्ट ऑफिस द्वारा कोई TDS नहीं काटा जाता है।',
    },
    {
      id: 'faq-4',
      question: 'न्यूनतम और अधिकतम निवेश राशि क्या है?',
      answer:
        'न्यूनतम निवेश ₹1,000 है। इसके ऊपर कोई भी राशि ₹100 के गुणक में होनी चाहिए। KVP में निवेश करने की कोई अधिकतम सीमा (No Maximum Limit) नहीं है। आप चाहें तो 50 लाख या 1 करोड़ भी लगा सकते हैं।',
    },
    {
      id: 'faq-5',
      question: 'क्या मैं 9 साल 7 महीने से पहले अपना पैसा निकाल सकता हूँ?',
      answer:
        'हाँ, लेकिन तुरंत नहीं। इसमें 2 साल और 6 महीने (30 महीने) का लॉक-इन पीरियड होता है। खाताधारक के निधन या अदालत के आदेश के अलावा आप इससे पहले पैसे नहीं निकाल सकते। यदि आप 2.5 साल के बाद लेकिन परिपक्वता से पहले पैसे निकालते हैं, तो आपको दोगुनी राशि नहीं मिलेगी; आपको निर्धारित समय-पूर्व दर (Premature rate) पर ब्याज जोड़कर पैसा वापस मिलेगा।',
    },
    {
      id: 'faq-6',
      question: 'क्या मैं KVP के बदले बैंक से लोन (Loan) ले सकता हूँ?',
      answer:
        'बिल्कुल! क्योंकि यह भारत सरकार द्वारा समर्थित है, लगभग सभी प्रमुख बैंक आपको सस्ती ब्याज दरों पर व्यक्तिगत या व्यावसायिक लोन सुरक्षित करने के लिए अपने KVP प्रमाणपत्रों को गिरवी (Pledge) रखने की अनुमति देते हैं।',
    }
  ];

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'KVP कैलकुलेटर',
            url: 'https://fincado.com/hi/kvp-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="KVP कैलकुलेटर (किसान विकास पत्र)"
        description="7.5% की दर से KVP के लिए सटीक मैच्योरिटी तारीख और दोगुनी राशि की गणना करें।"
        url="https://fincado.com/hi/kvp-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="KVP कैलकुलेटर – पोस्ट ऑफिस पैसा दोगुना स्कीम" />
            <LanguageToggle path="/kvp-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            KVP कैलकुलेटर
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              किसान विकास पत्र (पैसा दोगुना स्कीम)
            </span>
          </h1>

          {/* KEY METRICS BANNER */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1 font-semibold">
              ⭐ वर्तमान दर: 7.5% सालाना
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              दोगुना होने में: 115 महीने
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              लॉक-इन: 2.5 वर्ष
            </span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="kvp-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
              <p>
                यह जानने के लिए <strong>KVP कैलकुलेटर</strong> का उपयोग करें कि आपका पैसा वास्तव में कब दोगुना होगा। 
                भारत सरकार की इस सबसे सुरक्षित निवेश योजना के लिए सटीक मैच्योरिटी समय-सीमा (Maturity Timeline) और लॉक-इन अवधि प्राप्त करने के लिए बस अपनी निवेश राशि और आज की तारीख दर्ज करें।
              </p>
            `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Interactive Calculator */}
            <HindiKVPClient />

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hi/fd-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> बैंक FD के साथ तुलना करें
              </Link>
              <Link
                href="/hi/ppf-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                PPF कैलकुलेटर (टैक्स फ्री){' '}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Rich Content Section */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      किसान विकास पत्र (KVP) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      प्रमुख नियम और विशेषताएं (अपडेटेड {updatedLabel})
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* KVP vs FD vs Mutual Funds Table in Hindi */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-brand-700" />
                      क्या आपको KVP में निवेश करना चाहिए? (तुलना)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b text-slate-800">
                              विशेषता (Feature)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-brand-700">
                              किसान विकास पत्र (KVP)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-slate-800">
                              बैंक FD (Bank FD)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-slate-800">
                              म्यूचुअल फंड (Mutual Funds)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              जोखिम (Risk Level)
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-700 font-bold bg-brand-50">
                              जीरो रिस्क (Zero Risk)
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-600">
                              लो रिस्क (Low Risk)
                            </td>
                            <td className="px-4 py-3 border-l text-rose-600">
                              हाई रिस्क (High Risk)
                            </td>
                          </tr>
                          <tr className="bg-slate-50/30">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              रिटर्न (Returns)
                            </td>
                            <td className="px-4 py-3 border-l bg-brand-50">
                              गारंटीड (7.5%)
                            </td>
                            <td className="px-4 py-3 border-l">
                              गारंटीड (6% - 7%)
                            </td>
                            <td className="px-4 py-3 border-l">
                              अस्थिर (10% - 15% अनुमानित)
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              टैक्स लाभ (Tax Benefit)
                            </td>
                            <td className="px-4 py-3 border-l bg-brand-50">
                              कुछ नहीं (पूरी तरह टैक्सेबल)
                            </td>
                            <td className="px-4 py-3 border-l">
                              केवल 5-ईयर टैक्स सेवर FD पर
                            </td>
                            <td className="px-4 py-3 border-l">
                              केवल ELSS फंड्स पर
                            </td>
                          </tr>
                          <tr className="bg-slate-50/30">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              किसके लिए सबसे अच्छा है?
                            </td>
                            <td className="px-4 py-3 border-l font-medium bg-brand-50">
                              रूढ़िवादी निवेशक जो खाली पड़े पैसे को सुरक्षित रूप
                              से दोगुना करना चाहते हैं।
                            </td>
                            <td className="px-4 py-3 border-l">
                              आपातकालीन फंड (Emergency Fund) को कम समय के लिए
                              रखने हेतु।
                            </td>
                            <td className="px-4 py-3 border-l">
                              लंबे समय में आक्रामक रूप से वेल्थ (Wealth) बनाने
                              के लिए।
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Formula Block */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      KVP मैच्योरिटी (दोगुना होने) का फॉर्मूला
                    </h3>
                    <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600 mb-3">
                        KVP में आपका निवेश एक निश्चित महीनों में दोगुना होने
                        की गारंटी है, जिसे सरकार हर तिमाही मौजूदा ब्याज दर के
                        आधार पर अधिसूचित करती है। यह अवधि (n) चक्रवृद्धि ब्याज
                        फॉर्मूले को हल करके निकाली जाती है, जिसमें राशि 2 गुना
                        हो जाती है:
                      </div>

                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          2P = P × (1 + r)<sup>n</sup> &nbsp;→&nbsp; मैच्योरिटी राशि = P × 2
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">P</span>
                          <span>= निवेश राशि (कोई अधिकतम सीमा नहीं, न्यूनतम ₹1,000)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">r</span>
                          <span>= वार्षिक ब्याज दर (वर्तमान में 7.5% सालाना)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">n</span>
                          <span>
                            = दोगुना होने की अवधि — वर्तमान में{' '}
                            <strong>115 महीने (9 वर्ष 7 महीने)</strong>, 7.5%
                            दर पर अधिसूचित।
                          </span>
                        </div>
                        <div className="mt-4 p-3 bg-brand-50 rounded border border-brand-200">
                          <p className="text-xs text-slate-700">
                            <strong>नोट:</strong> यह कैलकुलेटर सरकार द्वारा
                            अधिसूचित 115 महीने की अवधि का उपयोग करता है, न कि
                            r से n की दोबारा गणना करता है, क्योंकि सरकार खुद हर
                            तिमाही यह अवधि तय और संशोधित करती है। परिपक्वता
                            तिथि पर आपका पैसा ठीक 2 गुना हो जाता है।
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Worked Example */}
                    <div className="p-5 bg-brand-50 rounded-lg border border-brand-200">
                      <h4 className="font-semibold text-brand-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">🧮</span>
                        उदाहरण: ₹1,00,000 का KVP निवेश
                      </h4>
                      <div className="space-y-3 text-sm text-slate-700">
                        <div className="grid grid-cols-2 gap-2">
                          <div><strong>निवेश (P):</strong></div>
                          <div>₹1,00,000</div>
                          <div><strong>ब्याज दर:</strong></div>
                          <div>7.5% सालाना</div>
                          <div><strong>दोगुना होने की अवधि (n):</strong></div>
                          <div>115 महीने (9 वर्ष 7 महीने)</div>
                        </div>

                        <div className="pt-3 border-t border-brand-300">
                          <strong className="block mb-2">चरण 1: दोगुना होने का फॉर्मूला लागू करें</strong>
                          <div className="ml-4 font-mono text-sm">
                            मैच्योरिटी राशि = 1,00,000 × 2 = ₹2,00,000
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-white rounded border-2 border-brand-50">
                          <div className="text-base font-semibold text-slate-700 mb-1">
                            मैच्योरिटी वैल्यू (115 महीनों बाद):
                          </div>
                          <div className="text-3xl font-semibold text-brand-700">
                            ₹2,00,000
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-brand-300 space-y-2">
                          <div className="flex justify-between">
                            <span>निवेशित मूलधन:</span>
                            <strong>₹1,00,000</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कुल अर्जित ब्याज:</span>
                            <strong className="text-brand-700">₹1,00,000</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>लॉक-इन समाप्त:</span>
                            <strong>30 महीने (2 वर्ष 6 महीने)</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* Related Calculators */}
            <section className="no-print mt-12 space-y-5">
              <h3 className="text-xl font-semibold text-slate-900">
                संबंधित स्मॉल सेविंग्स कैलकुलेटर
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedCalculators.map((calc) => (
                  <Link href={calc.href} key={calc.href} className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 text-2xl">
                            {calc.icon}
                          </span>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 group-hover:text-brand-700 mb-1">
                              {calc.title}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {calc.description}
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-brand-700">
                              <span>अभी कैलकुलेट करें</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

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
              <AdSlot id="kvp-sidebar-hi" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
