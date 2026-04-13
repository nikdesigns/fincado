import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HindiPOMISClient from './HindiPOMISClient';
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
import { ArrowRight, Landmark, PiggyBank, Mail } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title: 'POMIS कैलकुलेटर 2026 - पोस्ट ऑफिस मंथली इनकम स्कीम (MIS)',
  description:
    'पोस्ट ऑफिस MIS से अपनी गारंटीड मासिक आय (Monthly Income) की सटीक गणना करें। 7.4% ब्याज दर, ₹9 लाख (सिंगल) और ₹15 लाख (जॉइंट) की नई जमा सीमा के साथ अपडेटेड।',
  keywords: [
    'POMIS Calculator in Hindi',
    'पोस्ट ऑफिस मंथली इनकम स्कीम',
    'Post Office MIS Interest Rate 2026 in Hindi',
    'POMIS limits',
    'मंथली इनकम स्कीम पोस्ट ऑफिस',
    'POMIS premature withdrawal penalty in hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/pomis-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/pomis-calculator/',
      'hi-IN': 'https://fincado.com/hi/pomis-calculator/',
    },
  },
  openGraph: {
    title: 'POMIS कैलकुलेटर (पोस्ट ऑफिस मंथली इनकम स्कीम)',
    description:
      'इंडिया पोस्ट (India Post) MIS से अपनी सटीक मासिक आय निकालें। समय से पहले खाता बंद करने पर लगने वाली पेनाल्टी का लाइव सिम्युलेटर भी शामिल है।',
    url: 'https://fincado.com/hi/pomis-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE (Server Component) ---------------- */

export default function HindiPOMISCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>पोस्ट ऑफिस मंथली इनकम स्कीम (POMIS)</strong> भारत सरकार द्वारा समर्थित एक सुरक्षित बचत योजना है, जो निवेशकों को एक स्थिर और गारंटीड मासिक आय (Guaranteed Monthly Income) प्रदान करती है। 
    यह रूढ़िवादी निवेशकों (Conservative Investors), गृहिणियों और उन रिटायर लोगों के बीच बहुत लोकप्रिय है जो शेयर बाजार के जोखिम के बिना अपनी पूंजी सुरक्षित रखना चाहते हैं। 
    <a href="/hi/fd-calculator/">फिक्स्ड डिपॉजिट (FD)</a> के विपरीत, जिसमें ब्याज कंपाउंड होता है, POMIS में हर महीने आपका ब्याज सीधे आपके पोस्ट ऑफिस बचत खाते (Savings Account) में जमा कर दिया जाता है।
  </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>ब्याज दर (Interest Rate):</strong> वर्तमान में इस योजना पर <strong>7.4% सालाना</strong> की दर से ब्याज मिल रहा है, जिसका भुगतान हर महीने किया जाता है।</li>
      <li><strong>निवेश की सीमा (Investment Limits):</strong> आप एक सिंगल अकाउंट (Single Account) में अधिकतम <strong>₹9 लाख</strong> और जॉइंट अकाउंट (Joint Account - अधिकतम 3 वयस्क) में <strong>₹15 लाख</strong> तक जमा कर सकते हैं।</li>
      <li><strong>मैच्योरिटी (Maturity):</strong> इस योजना की लॉक-इन अवधि पूरी तरह से <strong>5 वर्ष</strong> की है।</li>
      <li><strong>टैक्स नियम (Taxation):</strong> इस योजना में जमा की गई राशि पर <strong>सेक्शन 80C के तहत कोई टैक्स छूट नहीं मिलती है</strong>, और हर महीने मिलने वाला ब्याज आपके इनकम टैक्स स्लैब के अनुसार पूरी तरह टैक्सेबल (Taxable) होता है।</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'POMIS खाता कौन खोल सकता है?',
      answer:
        'कोई भी भारतीय नागरिक (Adult) POMIS खाता खोल सकता है। इसे नाबालिग (Minor) की ओर से भी खोला जा सकता है (10 वर्ष से अधिक उम्र का नाबालिग इसे खुद भी संचालित कर सकता है)। NRI (अनिवासी भारतीय) और HUF यह खाता खोलने के पात्र नहीं हैं।',
    },
    {
      id: 'faq-2',
      question: 'अगर मैं अपना मासिक ब्याज नहीं निकालूं तो क्या होगा?',
      answer:
        'यदि आप अपने बचत खाते में जमा किए गए मासिक ब्याज को नहीं निकालते हैं, तो उस ब्याज पर आपको कोई अतिरिक्त ब्याज नहीं मिलेगा। POMIS में ब्याज कंपाउंड (Compound) नहीं होता है। बेहतर रिटर्न के लिए आप इस मासिक आय को पोस्ट ऑफिस रेकरिंग डिपॉजिट (RD) में ऑटो-ट्रांसफर (Auto-transfer) कर सकते हैं।',
    },
    {
      id: 'faq-3',
      question: 'क्या मैं 5 साल से पहले POMIS खाता बंद कर सकता हूँ?',
      answer:
        'हाँ, लेकिन इस पर पेनाल्टी लगती है। आप 1 साल से पहले इसे बंद नहीं कर सकते। यदि 1 से 3 साल के बीच बंद किया जाता है, तो मूलधन (Principal) से 2% पेनाल्टी काटी जाती है। यदि 3 से 5 साल के बीच बंद किया जाता है, तो 1% पेनाल्टी काटी जाती है। हमारे कैलकुलेटर में आप इसका लाइव सिम्युलेशन देख सकते हैं।',
    },
    {
      id: 'faq-4',
      question: 'क्या POMIS के ब्याज पर TDS कटता है?',
      answer:
        'नहीं। पोस्ट ऑफिस POMIS के भुगतान पर TDS (Tax Deducted at Source) नहीं काटता है। हालाँकि, यह ब्याज आय पूरी तरह से टैक्सेबल है, और आपको अपना ITR (इनकम टैक्स रिटर्न) भरते समय इसे "Income from Other Sources" के तहत दिखाना होगा।',
    },
    {
      id: 'faq-5',
      question: 'क्या मैं अपना POMIS खाता ट्रांसफर कर सकता हूँ?',
      answer:
        'हाँ। आप बिना किसी अतिरिक्त शुल्क के पूरे भारत में एक पोस्ट ऑफिस शाखा से दूसरी शाखा में अपना POMIS खाता आसानी से ट्रांसफर कर सकते हैं।',
    },
    {
      id: 'faq-6',
      question: 'जॉइंट अकाउंट के लिए निवेश सीमा की गणना कैसे की जाती है?',
      answer:
        'जॉइंट अकाउंट (अधिकतम ₹15 लाख) में, सभी संयुक्त खाताधारकों का निवेश में बराबर का हिस्सा माना जाता है। उदाहरण के लिए, यदि दो लोग ₹15 लाख का निवेश करते हैं, तो इसे प्रत्येक व्यक्ति द्वारा ₹7.5 लाख का निवेश माना जाता है, जो उनकी व्यक्तिगत ₹9 लाख की सीमा के अंदर गिना जाएगा।',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'POMIS कैलकुलेटर',
            url: 'https://fincado.com/hi/pomis-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="POMIS कैलकुलेटर (पोस्ट ऑफिस मंथली इनकम स्कीम)"
        description="7.4% ब्याज दर पर POMIS से मासिक भुगतान और पेनाल्टी की गणना करें।"
        url="https://fincado.com/hi/pomis-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="POMIS कैलकुलेटर – पोस्ट ऑफिस मंथली इनकम" />
            <LanguageToggle path="/pomis-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            POMIS कैलकुलेटर
            <span className="block max-w-fit text-base sm:text-lg font-medium text-[#577A30] mb-4 mt-2">
              पोस्ट ऑफिस मंथली इनकम स्कीम (MIS)
            </span>
          </h1>

          {/* KEY METRICS BANNER */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium bg-[#F7FDF1] border border-[#B0EC70] text-[#577A30] px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1 font-semibold">
              ⭐ वर्तमान दर: 7.4% सालाना
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-[#B0EC70]">
              मैच्योरिटी: 5 वर्ष
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-[#B0EC70]">
              अधिकतम जमा: ₹15L (जॉइंट)
            </span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="pomis-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
              <p>
                इंडिया पोस्ट (India Post) से आपको हर महीने कितनी आय (Monthly Income) मिलेगी, यह सटीक रूप से जानने के लिए हमारे <strong>POMIS कैलकुलेटर</strong> का उपयोग करें। 
                हमारे टूल में एक एडवांस <strong>समय-पूर्व खाता बंदी (Premature Closure) सिम्युलेटर</strong> भी है जो आपको दिखाता है कि 5 साल से पहले पैसे निकालने पर आपके मूलधन से कितनी पेनाल्टी काटी जाएगी।
              </p>
            `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Interactive Calculator */}
            <HindiPOMISClient />

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hi/scss-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> सीनियर सिटीजन स्कीम (SCSS)
              </Link>
              <Link
                href="/hi/rd-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                पोस्ट ऑफिस RD कैलकुलेटर <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Rich Content Section */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <Mail className="w-6 h-6 text-rose-600" />
                      पोस्ट ऑफिस MIS क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      प्रमुख नियम और निवेश सीमाएं
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
                      <PiggyBank className="w-5 h-5 text-[#577A30]" />
                      POMIS इनकम मैट्रिक्स (7.4% दर पर)
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      विभिन्न जमा राशियों पर मिलने वाली आय का त्वरित विवरण।
                    </p>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b text-slate-800">
                              निवेश राशि (Investment)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-emerald-700">
                              मासिक आय (हर महीने)
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
                              ₹ 617
                            </td>
                            <td className="px-4 py-3 border-l">₹ 37,000</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹ 5,00,000 (5 लाख)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 3,083
                            </td>
                            <td className="px-4 py-3 border-l">₹ 1,85,000</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹ 9,00,000 (अधिकतम - सिंगल)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 5,550
                            </td>
                            <td className="px-4 py-3 border-l">₹ 3,33,000</td>
                          </tr>
                          <tr className="bg-[#EFFBE2]">
                            <td className="px-4 py-3 font-bold text-[#577A30]">
                              ₹ 15,00,000 (अधिकतम - जॉइंट)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 9,250
                            </td>
                            <td className="px-4 py-3 border-l font-semibold text-[#577A30]">
                              ₹ 5,55,000
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
              <AdSlot id="pomis-sidebar-hi" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
