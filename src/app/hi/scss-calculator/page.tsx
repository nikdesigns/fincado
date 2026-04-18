import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HindiSCSSClient from './HindiSCSSClient';
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
import { ArrowRight, ShieldCheck, Landmark, PiggyBank } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title: 'SCSS कैलकुलेटर 2026 - सीनियर सिटीजन सेविंग स्कीम (SCSS)',
  description:
    'सीनियर सिटीजन सेविंग स्कीम (SCSS) से मिलने वाली त्रैमासिक (Quarterly) आय की सटीक गणना करें। 8.2% नई ब्याज दर और ₹30 लाख की अधिकतम सीमा के साथ अपडेटेड।',
  keywords: [
    'SCSS Calculator in Hindi',
    'SCSS कैलकुलेटर',
    'सीनियर सिटीजन सेविंग स्कीम 2026',
    'SCSS Interest Rate in Hindi',
    'Post Office SCSS Calculator',
    'Retirement Income Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/scss-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/scss-calculator/',
      'hi-IN': 'https://fincado.com/hi/scss-calculator/',
    },
  },
  openGraph: {
    title: 'SCSS कैलकुलेटर (सीनियर सिटीजन सेविंग स्कीम)',
    description:
      'अपने रिटायरमेंट के बाद सुरक्षित आय की योजना बनाएं। 8.2% ब्याज दर पर हर 3 महीने में मिलने वाले गारंटीड रिटर्न की गणना करें।',
    url: 'https://fincado.com/hi/scss-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE (Server Component) ---------------- */

export default function HindiSCSSCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>सीनियर सिटीजन सेविंग स्कीम (SCSS)</strong> भारत सरकार द्वारा चलाई जाने वाली एक सुरक्षित रिटायरमेंट योजना है। यह योजना 60 वर्ष या उससे अधिक आयु के भारतीय नागरिकों को एक नियमित और गारंटीड आय (Guaranteed Income) प्रदान करने के लिए डिज़ाइन की गई है। 
    इसे भारत में उपलब्ध सबसे सुरक्षित और सबसे अधिक रिटर्न देने वाले फिक्स्ड-इनकम निवेशों में से एक माना जाता है, जिसे पोस्ट ऑफिस और प्रमुख अधिकृत बैंकों (SBI, HDFC आदि) के माध्यम से खोला जा सकता है।
  </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>त्रैमासिक आय (Quarterly Income):</strong> एफडी (FD) के विपरीत जो ब्याज को कंपाउंड करती है, SCSS सीधे आपके बैंक खाते में हर तिमाही (31 मार्च, 30 जून, 30 सितंबर और 31 दिसंबर) ब्याज का भुगतान करती है।</li>
      <li><strong>उच्च ब्याज दर:</strong> वर्तमान में इस योजना पर <strong>8.2% सालाना</strong> की आकर्षक ब्याज दर मिल रही है, जो अधिकांश बैंक फिक्स्ड डिपॉजिट से काफी अधिक है।</li>
      <li><strong>निवेश की सीमा:</strong> आप न्यूनतम ₹1,000 से निवेश शुरू कर सकते हैं, और इसकी अधिकतम सीमा को हाल ही में बढ़ाकर प्रति व्यक्ति <strong>₹30 लाख</strong> कर दिया गया है।</li>
      <li><strong>टैक्स लाभ (Tax Benefits):</strong> इसमें जमा की गई राशि इनकम टैक्स के सेक्शन 80C के तहत ₹1.5 लाख तक की छूट के योग्य है। हालाँकि, अर्जित ब्याज (Interest) आपकी स्लैब दर के अनुसार पूरी तरह से टैक्सेबल होता है।</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'SCSS (सीनियर सिटीजन सेविंग स्कीम) में निवेश कौन कर सकता है?',
      answer:
        '60 वर्ष या उससे अधिक आयु का कोई भी भारतीय नागरिक SCSS खाता खोल सकता है। VRS (स्वैच्छिक सेवानिवृत्ति) लेने वाले लोग 55-60 वर्ष के बीच इसे खोल सकते हैं, बशर्ते वे सेवानिवृत्ति लाभ मिलने के एक महीने के भीतर निवेश करें। रिटायर्ड रक्षा कर्मी (Defense Personnel) 50 वर्ष की आयु में इसे खोल सकते हैं।',
    },
    {
      id: 'faq-2',
      question: 'SCSS के लिए वर्तमान ब्याज दर (Interest Rate) क्या है?',
      answer:
        '2026 तक, SCSS की वर्तमान ब्याज दर 8.2% प्रति वर्ष है। एक बार जब आप निवेश कर देते हैं, तो आपकी ब्याज दर पूरे 5 साल के कार्यकाल के लिए लॉक हो जाती है, भले ही सरकार बाद में नए निवेश के लिए दर बदल दे।',
    },
    {
      id: 'faq-3',
      question: 'क्या SCSS से मिलने वाला ब्याज टैक्स-फ्री है?',
      answer:
        'नहीं। SCSS से मिलने वाला ब्याज आपके इनकम टैक्स स्लैब के अनुसार पूरी तरह टैक्सेबल है। यदि वर्ष के लिए आपकी कुल ब्याज आय ₹50,000 से अधिक है, तो TDS काटा जाएगा। यदि आपकी कुल आय टैक्सेबल सीमा से कम है, तो आप TDS से बचने के लिए फॉर्म 15H जमा कर सकते हैं।',
    },
    {
      id: 'faq-4',
      question: 'क्या पति और पत्नी दोनों SCSS खाते खोल सकते हैं?',
      answer:
        'हाँ। पति और पत्नी दोनों अलग-अलग SCSS खाते खोल सकते हैं और प्रत्येक में ₹30 लाख तक निवेश कर सकते हैं। इस तरह एक युगल (Couple) कुल ₹60 लाख का निवेश करके लगभग ₹41,000 की संयुक्त मासिक आय (Combined Monthly Income) प्राप्त कर सकता है।',
    },
    {
      id: 'faq-5',
      question: 'क्या मैं 5 साल से पहले पैसे निकाल सकता हूँ?',
      answer:
        'हाँ, 1 वर्ष के बाद समय से पहले पैसे निकालने (Premature Withdrawal) की अनुमति है, लेकिन इसके लिए पेनाल्टी लगती है। यदि खाता 1 से 2 वर्ष के बीच बंद किया जाता है, तो मूलधन का 1.5% काट लिया जाता है। यदि 2 से 5 वर्ष के बीच बंद किया जाता है, तो 1% काटा जाता है।',
    },
    {
      id: 'faq-6',
      question: '5 साल की मैच्योरिटी के बाद क्या होता है?',
      answer:
        '5 साल के बाद, आपको अपनी मूल राशि (Principal Amount) वापस मिल जाएगी। आपके पास मैच्योरिटी के 1 वर्ष के भीतर आवेदन जमा करके SCSS खाते को अगले 3 वर्षों के ब्लॉक के लिए बढ़ाने (Extend) का विकल्प भी होता है।',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'SCSS कैलकुलेटर',
            url: 'https://fincado.com/hi/scss-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="SCSS कैलकुलेटर (सीनियर सिटीजन सेविंग स्कीम)"
        description="8.2% ब्याज दर पर SCSS से मिलने वाले त्रैमासिक भुगतान (Quarterly Payouts) की गणना करें।"
        url="https://fincado.com/hi/scss-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SCSS कैलकुलेटर – वरिष्ठ नागरिकों के लिए त्रैमासिक आय" />
            <LanguageToggle path="/scss-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            SCSS कैलकुलेटर
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              सीनियर सिटीजन सेविंग स्कीम
            </span>
          </h1>

          {/* KEY METRICS BANNER */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1 font-semibold">
              ⭐ वर्तमान दर: 8.2% सालाना
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              अवधि: 5 वर्ष
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              अधिकतम जमा: ₹30 लाख
            </span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="scss-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
              <p>
                अपनी रिटायरमेंट आय की योजना बनाने के लिए <strong>SCSS कैलकुलेटर</strong> का उपयोग करें। यह पता लगाएं कि भारत सरकार की इस प्रमुख वरिष्ठ नागरिक योजना के तहत आपको हर 3 महीने (तिमाही) में सीधे आपके बैंक खाते में कितनी गारंटीड ब्याज आय (Guaranteed Income) मिलेगी।
              </p>
            `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Interactive Calculator */}
            <HindiSCSSClient />

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hi/fd-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> FD कैलकुलेटर के साथ तुलना
                करें
              </Link>
              <Link
                href="/hi/swp-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                म्यूचुअल फंड SWP कैलकुलेटर{' '}
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
                      SCSS योजना क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      प्रमुख विशेषताएँ और लाभ
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Return Matrix */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <PiggyBank className="w-5 h-5 text-brand-700" />
                      SCSS इनकम मैट्रिक्स (8.2% दर पर)
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      अपनी जमा राशि के आधार पर संभावित आय का त्वरित विवरण देखें।
                    </p>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b text-slate-800">
                              निवेश राशि (Investment)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-emerald-700">
                              त्रैमासिक आय (हर 3 माह)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-slate-800">
                              कुल ब्याज (5 वर्षों में)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹ 1,00,000 (1 लाख)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 2,050
                            </td>
                            <td className="px-4 py-3 border-l">₹ 41,000</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹ 5,00,000 (5 लाख)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 10,250
                            </td>
                            <td className="px-4 py-3 border-l">₹ 2,05,000</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹ 15,00,000 (15 लाख)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 30,750
                            </td>
                            <td className="px-4 py-3 border-l">₹ 6,15,000</td>
                          </tr>
                          <tr className="bg-brand-100">
                            <td className="px-4 py-3 font-bold text-brand-700">
                              ₹ 30,00,000 (अधिकतम सीमा)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 61,500
                            </td>
                            <td className="px-4 py-3 border-l font-semibold text-brand-700">
                              ₹ 12,30,000
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
              <AdSlot id="scss-sidebar-hi" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
