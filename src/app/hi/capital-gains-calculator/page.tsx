import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HindiCapitalGainsClient from './HindiCapitalGainsClient';
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
import { ArrowRight, TrendingUp, Landmark } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title:
    'कैपिटल गेन टैक्स कैलकुलेटर 2026: शेयर और प्रॉपर्टी पर STCG व LTCG निकालें',
  description:
    'शेयर (Stocks), म्यूचुअल फंड और प्रॉपर्टी पर अपने शॉर्ट टर्म (STCG) और लॉन्ग टर्म (LTCG) कैपिटल गेन टैक्स की सटीक गणना करें। 20% STCG और 12.5% LTCG नियमों के साथ अपडेटेड।',
  keywords: [
    'कैपिटल गेन कैलकुलेटर',
    'LTCG कैलकुलेटर',
    'STCG कैलकुलेटर',
    'म्यूचुअल फंड टैक्स कैलकुलेटर',
    'Capital Gains Tax India in Hindi',
    'शेयर बाजार टैक्स कैलकुलेटर',
    'प्रॉपर्टी पर कैपिटल गेन टैक्स',
    'LTCG exemption limit',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/capital-gains-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/capital-gains-calculator/',
      'hi-IN': 'https://fincado.com/hi/capital-gains-calculator/',
    },
  },
  openGraph: {
    title: 'कैपिटल गेन टैक्स कैलकुलेटर 2026 (STCG & LTCG)',
    description:
      'बजट 2026 के नए नियमों के अनुसार अपने निवेश (Equity, Debt, Real Estate) के मुनाफे पर टैक्स की गणना तुरंत करें।',
    url: 'https://fincado.com/hi/capital-gains-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE (Server Component) ---------------- */

export default function HindiCapitalGainsPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>कैपिटल गेन टैक्स (Capital Gains Tax)</strong> वह टैक्स है जो आप किसी एसेट (जैसे शेयर, म्यूचुअल फंड, या प्रॉपर्टी) को बेचने से हुए मुनाफे (Profit) पर देते हैं। 
    अगर आप किसी एसेट को कम समय के लिए होल्ड करते हैं, तो उस मुनाफे पर <strong>शॉर्ट-टर्म (STCG)</strong> के रूप में अधिक टैक्स लगता है। 
    वहीं, लंबे समय तक होल्ड करने पर यह <strong>लॉन्ग-टर्म (LTCG)</strong> माना जाता है, जिस पर टैक्स की दर कम होती है और कुछ छूट भी मिलती है। 
    अपने निवेश की सुरक्षित निकासी (Withdrawal) की योजना बनाने के लिए इस कैलकुलेटर के साथ हमारे <a href="/hi/swp-calculator/">SWP कैलकुलेटर</a> का उपयोग करें।
  </p>
  `);

  const budgetContent = autoLinkContent(`
    <p>हाल ही के यूनियन बजट (Union Budget) में कैपिटल गेन टैक्स नियमों को सरल बनाने के लिए बड़े बदलाव किए गए हैं:</p>
    <ul class="list-disc pl-5 space-y-2 mt-3">
      <li><strong>Equity STCG:</strong> इसे 15% से बढ़ाकर <strong>20%</strong> कर दिया गया है।</li>
      <li><strong>Equity LTCG:</strong> इसे 10% से बढ़ाकर <strong>12.5%</strong> कर दिया गया है। हालांकि, प्रति वर्ष टैक्स-फ्री छूट की सीमा ₹1 लाख से बढ़ाकर <strong>₹1.25 लाख</strong> कर दी गई है।</li>
      <li><strong>प्रॉपर्टी (Real Estate) LTCG:</strong> इंडेक्सेशन (Indexation) का लाभ हटा दिया गया है। प्रॉपर्टी पर अब फ्लैट <strong>12.5%</strong> LTCG लगता है।</li>
      <li><strong>डेट फंड्स (Debt Funds):</strong> अप्रैल 2023 के बाद किए गए निवेश पर आपकी स्लैब दर (Slab Rate) के अनुसार टैक्स लगेगा (LTCG का कोई लाभ नहीं)।</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question:
        'इक्विटी (Equity) को लॉन्ग टर्म (Long Term) मानने के लिए होल्डिंग अवधि क्या है?',
      answer:
        'सूचीबद्ध शेयरों (Listed Shares) और इक्विटी म्यूचुअल फंड के लिए, होल्डिंग अवधि 12 महीने (1 वर्ष) से अधिक होनी चाहिए। 12 महीने के भीतर बेची गई किसी भी संपत्ति को शॉर्ट-टर्म कैपिटल गेन (STCG) माना जाता है।',
    },
    {
      id: 'faq-2',
      question: '₹1.25 लाख की LTCG छूट कैसे काम करती है?',
      answer:
        'एक वित्तीय वर्ष (Financial Year) में, सभी इक्विटी निवेशों से प्राप्त आपके पहले ₹1,25,000 के लॉन्ग-टर्म कैपिटल गेन (LTCG) पर कोई टैक्स नहीं लगता है (यह पूरी तरह टैक्स-फ्री है)। आपको केवल ₹1.25 लाख से अधिक की राशि पर 12.5% टैक्स देना होता है।',
    },
    {
      id: 'faq-3',
      question: 'क्या डेट (Debt) म्यूचुअल फंड पर LTCG का लाभ मिलता है?',
      answer:
        'नहीं। 1 अप्रैल 2023 के बाद खरीदे गए डेट म्यूचुअल फंड्स पर आपकी नियमित इनकम टैक्स स्लैब दर के अनुसार टैक्स लगाया जाता है, चाहे आप उन्हें कितने भी समय तक होल्ड करें। इसमें LTCG या इंडेक्सेशन का कोई लाभ नहीं मिलता।',
    },
    {
      id: 'faq-4',
      question:
        'क्या प्रॉपर्टी बेचने पर इंडेक्सेशन (Indexation) का लाभ मिलता है?',
      answer:
        'नहीं। नए नियमों के अनुसार, रियल एस्टेट (प्रॉपर्टी) के लिए इंडेक्सेशन का लाभ हटा दिया गया है। अब प्रॉपर्टी पर (24 महीने बाद बेचने पर) बिना इंडेक्सेशन के फ्लैट 12.5% LTCG लगता है।',
    },
    {
      id: 'faq-5',
      question: 'क्या मुझे कैपिटल गेन पर एडवांस टैक्स (Advance Tax) देना होगा?',
      answer:
        'हाँ। यदि एक वर्ष में आपकी कुल टैक्स देनदारी (कैपिटल गेन टैक्स सहित) ₹10,000 से अधिक है, तो आपको किस्तों में एडवांस टैक्स का भुगतान करना होगा।',
    },
    {
      id: 'faq-6',
      question:
        'क्या मैं कैपिटल लॉस को मुनाफे के साथ सेट-ऑफ (Set-off) कर सकता हूँ?',
      answer:
        'हाँ। शॉर्ट-टर्म लॉस को किसी भी कैपिटल गेन (लॉन्ग टर्म या शॉर्ट टर्म) के साथ सेट-ऑफ किया जा सकता है। लेकिन लॉन्ग-टर्म लॉस को केवल लॉन्ग-टर्म गेन के साथ ही सेट-ऑफ किया जा सकता है। बचे हुए लॉस को 8 वर्षों तक कैरी फॉरवर्ड किया जा सकता है।',
    },
    {
      id: 'faq-7',
      question: 'क्या कैपिटल गेन टैक्स पर 4% सेस (Cess) लगता है?',
      answer:
        'हाँ। निकाले गए मूल टैक्स (Base Tax) पर 4% हेल्थ एंड एजुकेशन सेस (Health & Education Cess) लागू होता है। हमारा कैलकुलेटर आपको सटीक अंतिम राशि देने के लिए इसे अपने आप जोड़ लेता है।',
    },
    {
      id: 'faq-8',
      question: 'यह कैलकुलेटर कितना सटीक है?',
      answer:
        'वित्तीय वर्ष 2026-27 के लिए यह अत्यधिक सटीक है। यह नवीनतम यूनियन बजट के सटीक नियमों का उपयोग करता है। फिर भी, जटिल टैक्स प्लानिंग के लिए हमेशा अपने CA (Chartered Accountant) से सलाह लें।',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'कैपिटल गेन कैलकुलेटर',
            url: 'https://fincado.com/hi/capital-gains-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="कैपिटल गेन टैक्स कैलकुलेटर (Capital Gains Calculator)"
        description="शेयर, म्यूचुअल फंड और प्रॉपर्टी पर STCG और LTCG टैक्स की गणना करें। बजट 2026 के नियमों के अनुसार।"
        url="https://fincado.com/hi/capital-gains-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="कैपिटल गेन टैक्स कैलकुलेटर – STCG & LTCG" />
            <LanguageToggle path="/capital-gains-calculator" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            कैपिटल गेन टैक्स कैलकुलेटर
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              STCG और LTCG टैक्स की सटीक गणना करें
            </span>
          </h1>

          {/* LAST UPDATED BANNER */}
          <div className="flex items-center gap-2 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1">
              ✅ वित्तीय वर्ष (FY) 2026-27 के लिए अपडेटेड
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              अप्रैल 2026
            </span>
            <span className="text-xs">• नए बजट नियम लागू किए गए</span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="cg-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
              <p>
                शेयर, म्यूचुअल फंड या रियल एस्टेट (प्रॉपर्टी) बेचने पर आपकी सटीक टैक्स देनदारी (Tax Liability) निर्धारित करने के लिए हमारे <strong>कैपिटल गेन कैलकुलेटर</strong> का उपयोग करें। 
                यह कैलकुलेटर नवीनतम बजट नियमों के साथ पूरी तरह से अपडेटेड है, जिसमें इक्विटी के लिए नया <strong>12.5% LTCG दर</strong> और <strong>₹1.25 लाख की छूट</strong> शामिल है।
              </p>
            `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* HINDI CLIENT COMPONENT */}
            <HindiCapitalGainsClient />

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hi/income-tax-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> पूरा इनकम टैक्स कैलकुलेटर
              </Link>
              <Link
                href="/hi/lumpsum-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                लम्पसम (Lumpsum) कैलकुलेटर{' '}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Rich Content Section */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      कैपिटल गेन (Capital Gains) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brand-700" />
                      लेटेस्ट बजट 2026 नियम (Latest Rules)
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-brand-50 border border-brand-200 p-6 rounded-xl">
                      <WikiText content={budgetContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Holding Period Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      होल्डिंग अवधि (Holding Period) चीट शीट
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="text-left p-4 border text-slate-800">
                              एसेट क्लास (Asset)
                            </th>
                            <th className="text-left p-4 border text-slate-800">
                              शॉर्ट टर्म (STCG)
                            </th>
                            <th className="text-left p-4 border text-slate-800">
                              लॉन्ग टर्म (LTCG)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-4 border font-medium text-slate-700">
                              इक्विटी / म्यूचुअल फंड्स
                            </td>
                            <td className="p-4 border text-slate-600">
                              12 महीने या कम →{' '}
                              <strong className="text-rose-600">20%</strong>
                            </td>
                            <td className="p-4 border text-slate-600">
                              12 महीने से अधिक →{' '}
                              <strong className="text-brand-700">12.5%</strong>{' '}
                              (₹1.25L छूट के बाद)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium text-slate-700">
                              रियल एस्टेट (प्रॉपर्टी)
                            </td>
                            <td className="p-4 border text-slate-600">
                              24 महीने या कम →{' '}
                              <strong className="text-rose-600">
                                स्लैब रेट
                              </strong>
                            </td>
                            <td className="p-4 border text-slate-600">
                              24 महीने से अधिक →{' '}
                              <strong className="text-brand-700">12.5%</strong>{' '}
                              (बिना इंडेक्सेशन)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium text-slate-700">
                              डेट फंड्स (Debt Funds)
                            </td>
                            <td
                              colSpan={2}
                              className="p-4 border text-center bg-blue-50 text-slate-700"
                            >
                              आपकी <strong>इनकम टैक्स स्लैब दर</strong> पर टैक्स
                              लगता है (LTCG का कोई लाभ नहीं)
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
              <AdSlot id="cg-sidebar-hi" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
