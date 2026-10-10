import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HindiPrepaymentClient from './HindiPrepaymentClient';
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
import { ArrowRight, Zap, ShieldAlert, Home } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title: 'EMI प्रीपेमेंट (Prepayment) कैलकुलेटर 2026 - होम लोन का ब्याज बचाएं',
  description:
    'जानें कि होम लोन या पर्सनल लोन में एकमुश्त (Lumpsum) या एक्स्ट्रा EMI भरने से आप कितने लाख का ब्याज और कितने साल की लोन अवधि (Tenure) बचा सकते हैं।',
  keywords: [
    'Home Loan Prepayment Calculator in Hindi',
    'EMI Prepayment Calculator',
    'लोन प्रीपेमेंट कैलकुलेटर',
    'होम लोन पार्ट पेमेंट',
    'Loan Foreclosure Calculator',
    'Interest Saved Calculator'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/emi-prepayment-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/emi-prepayment-calculator/',
      'hi-IN': 'https://fincado.com/hi/emi-prepayment-calculator/',
      'x-default': 'https://fincado.com/emi-prepayment-calculator/',
    },
  },
  openGraph: {
    title: 'EMI प्रीपेमेंट कैलकुलेटर (ब्याज और समय बचाएं)',
    description:
      'आज ही पार्ट-पेमेंट (Part-payment) करके जानें कि आप अपने होम लोन से कितने साल कम कर सकते हैं और बैंक को देने वाले लाखों रुपये का ब्याज कैसे बचा सकते हैं।',
    url: 'https://fincado.com/hi/emi-prepayment-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE (Server Component) ---------------- */

export default function HindiEMIPrepaymentPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>EMI प्रीपेमेंट (Part-Payment)</strong> वह प्रक्रिया है जिसमें आप अपनी नियमित मासिक EMI के अलावा अपने लोन खाते में कुछ अतिरिक्त राशि जमा करते हैं। 
    चूंकि भारत में होम लोन (Home Loan) और पर्सनल लोन ब्याज की गणना "रेड्यूसिंग बैलेंस (Reducing Balance)" विधि पर करते हैं, इसलिए आपके द्वारा दिया गया कोई भी अतिरिक्त पैसा <strong>सीधे आपके मूलधन (Principal Amount) को कम करने में जाता है</strong>। 
    इससे कंपाउंडिंग का उल्टा असर होता है (Reverse Compounding), जिससे बैंक को दिया जाने वाला कुल ब्याज बहुत कम हो जाता है और आपके लोन की अवधि (Tenure) भी घट जाती है।
  </p>
  `);

  const strategiesContent = autoLinkContent(`
    <p>जल्दी कर्ज मुक्त (Debt Free) होने के दो सबसे प्रभावी तरीके यहाँ दिए गए हैं:</p>
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>1. वार्षिक एकमुश्त (Annual Lumpsum) रणनीति:</strong> यदि आपको सालाना बोनस मिलता है या आप कोई संपत्ति बेचते हैं, तो साल में एक बार अपने लोन में एकमुश्त राशि (जैसे, ₹1 लाख या ₹2 लाख) डालने से EMIs के कई साल कम हो सकते हैं।</li>
      <li><strong>2. EMI स्टेप-अप (Step-Up) रणनीति:</strong> जैसे-जैसे हर साल आपकी सैलरी बढ़ती है, स्वेच्छा से अपनी EMI 5% से 10% बढ़ा दें। 20 साल के होम लोन पर हर महीने दी जाने वाली ₹2,000 की अतिरिक्त राशि भी आपके लाखों रुपये के ब्याज को बचा सकती है।</li>
      <li><em>Pro Tip:</em> हमारा कैलकुलेटर आपको अपनी कुल बचत देखने के लिए दोनों रणनीतियों को एक साथ (Lumpsum + Extra EMI) मिलाने की सुविधा देता है।</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question:
        'प्रीपेमेंट के बाद मुझे अपनी EMI कम करनी चाहिए या लोन की अवधि (Tenure)?',
      answer:
        'हमेशा लोन की अवधि (Tenure) कम करने का विकल्प चुनें (EMI को समान रखें)। अवधि कम करने से आपके ब्याज की अधिकतम बचत होती है। यदि आप अपनी EMI कम करना चुनते हैं, तो आपको हर महीने तत्काल नकद राहत मिलेगी, लेकिन लंबे समय में आप बैंक को काफी अधिक ब्याज चुकाएंगे।',
    },
    {
      id: 'faq-2',
      question:
        'क्या होम लोन के प्रीपेमेंट (Prepayment) पर कोई पेनाल्टी शुल्क लगता है?',
      answer:
        'RBI के दिशानिर्देशों के अनुसार, बैंक और NBFCs व्यक्तियों (Individuals) द्वारा लिए गए फ्लोटिंग-रेट (Floating-rate) होम लोन पर कोई प्रीपेमेंट या फोरक्लोज़र पेनाल्टी नहीं लगा सकते हैं। हालाँकि, यदि आपके पास फिक्स्ड-रेट (Fixed-rate) लोन या बिज़नेस लोन है, तो बैंक प्रीपेड राशि पर 1% से 3% का जुर्माना लगा सकते हैं।',
    },
    {
      id: 'faq-3',
      question:
        'क्या म्यूचुअल फंड में निवेश करना बेहतर है या अपना होम लोन चुकाना?',
      answer:
        'यह गणित पर निर्भर करता है। यदि आपकी होम लोन की ब्याज दर 8.5% है, तो इसे समय से पहले चुकाने पर आपको 8.5% का गारंटीड (Guaranteed), जोखिम-मुक्त (Risk-free) और टैक्स-फ्री रिटर्न मिलता है। यदि आपको लगता है कि आप इक्विटी म्यूचुअल फंड (SIP) में आराम से 12% से 15% कमा सकते हैं, तो निवेश करने से गणितीय रूप से अधिक नेट वेल्थ मिल सकती है। हालाँकि, प्रीपेमेंट आपको कर्ज मुक्त होने की अद्वितीय मानसिक शांति देता है।',
    },
    {
      id: 'faq-4',
      question: 'पार्ट-पेमेंट करने का सबसे अच्छा समय कब है?',
      answer:
        'जितनी जल्दी हो सके, उतना बेहतर। एक सामान्य 20-वर्षीय लोन में, शुरुआती 5 से 7 वर्षों में आपकी EMI का अधिकांश हिस्सा ब्याज चुकाने में जाता है। लोन के शुरुआती वर्षों में पार्ट-पेमेंट करने से बाद के वर्षों में भुगतान करने की तुलना में ब्याज की बचत बहुत अधिक होती है।',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'EMI प्रीपेमेंट कैलकुलेटर',
            url: 'https://fincado.com/hi/emi-prepayment-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="EMI प्रीपेमेंट कैलकुलेटर (पार्ट पेमेंट)"
        description="अपने लोन पर पार्ट-पेमेंट करके बचाए गए ब्याज और कम हुई अवधि की गणना करें।"
        url="https://fincado.com/hi/emi-prepayment-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EMI प्रीपेमेंट कैलकुलेटर – होम लोन का ब्याज बचाएं" />
            <LanguageToggle path="/emi-prepayment-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            EMI प्रीपेमेंट (Prepayment) कैलकुलेटर
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              होम लोन पार्ट-पेमेंट पर ब्याज की बचत
            </span>
          </h1>

          {/* KEY METRICS BANNER */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1 font-semibold">
              ✅ RBI नियम: फ्लोटिंग रेट लोन पर 0% प्रीपेमेंट शुल्क
            </span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="prepay-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
              <p>
                क्या आपको सालाना बोनस मिला है या आपके पास अतिरिक्त बचत है? रिवर्स कंपाउंडिंग (Reverse Compounding) का जादू देखने के लिए <strong>EMI प्रीपेमेंट कैलकुलेटर</strong> का उपयोग करें। 
                अपने बचे हुए लोन का विवरण और एकमुश्त राशि (Lumpsum) दर्ज करें और जानें कि आप अपने होम लोन की अवधि को कितने साल कम कर सकते हैं।
              </p>
            `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Interactive Calculator */}
            <HindiPrepaymentClient />

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hi/emi-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" /> सामान्य EMI कैलकुलेटर
              </Link>
              <Link
                href="/hi/sip-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                प्रीपेमेंट बनाम निवेश (SIP){' '}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Rich Content Section */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-emerald-600" />
                      पार्ट-पेमेंट (Part-Payment) कैसे काम करता है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      सर्वश्रेष्ठ प्रीपेमेंट रणनीतियाँ (Best Strategies)
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <WikiText content={strategiesContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* The Golden Rule Section in Hindi */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-500" />
                      गोल्डन रूल: शुरुआत में प्रीपेमेंट करें (Do It Early)
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      EMI शेड्यूल में, शुरुआती वर्षों में ब्याज का हिस्सा सबसे
                      अधिक होता है। उदाहरण के लिए, 20 साल के होम लोन में, पहले 5
                      वर्षों में आपकी EMI का लगभग 70% हिस्सा केवल ब्याज चुकाने
                      में जाता है। इसलिए शुरुआत में दिया गया 1 लाख रुपये बहुत
                      अधिक ब्याज बचाता है।
                    </p>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg mt-4">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b text-slate-800">
                              प्रीपेमेंट का समय (₹1 लाख)
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-emerald-700">
                              ब्याज की बचत*
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-blue-700">
                              लोन अवधि कम हुई*
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              पहले साल के अंत में
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹ 3,98,000
                            </td>
                            <td className="px-4 py-3 border-l text-blue-700 font-medium">
                              9 महीने
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              5वें साल के अंत में
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-600">
                              ₹ 2,40,000
                            </td>
                            <td className="px-4 py-3 border-l text-blue-600 font-medium">
                              7 महीने
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              10वें साल के अंत में
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-500">
                              ₹ 1,15,000
                            </td>
                            <td className="px-4 py-3 border-l text-blue-500 font-medium">
                              5 महीने
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td
                              colSpan={3}
                              className="px-4 py-2 text-xs text-slate-400 text-center"
                            >
                              *यह ₹50 लाख के लोन (8.5% दर, 20 वर्ष) का एक अनुमान
                              है।
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Formula Block */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI प्रीपेमेंट फॉर्मूला
                    </h3>
                    <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600 mb-3">
                        आपकी मौजूदा EMI पहले स्टैंडर्ड रेड्यूसिंग-बैलेंस
                        फॉर्मूले से निकाली जाती है, फिर कैलकुलेटर हर महीने
                        आपके बचे हुए बैलेंस की दोबारा गणना करता है — एकमुश्त
                        राशि को तुरंत घटाकर और अतिरिक्त मासिक राशि को
                        मूलधन में जोड़कर:
                      </div>

                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">P</span>
                          <span>= बकाया मूलधन (एकमुश्त राशि घटाने के बाद)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">r</span>
                          <span>= मासिक ब्याज दर (वार्षिक दर ÷ 12 ÷ 100)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">n</span>
                          <span>= बची हुई अवधि (महीनों में)</span>
                        </div>
                        <div className="mt-4 p-3 bg-brand-50 rounded border border-brand-200">
                          <p className="text-xs text-slate-700">
                            <strong>नोट:</strong> EMI राशि आपके मूल लोन जितनी
                            ही रहती है (अवधि घटाने की रणनीति)। हर महीने,
                            कैलकुलेटर आपकी अतिरिक्त मासिक राशि सीधे मूलधन में
                            जोड़ देता है, जिससे बैलेंस — और भविष्य का ब्याज —
                            तेज़ी से घटता है, और EMI कम करने के बजाय लोन जल्दी
                            खत्म हो जाता है।
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Worked Example */}
                    <div className="p-5 bg-brand-50 rounded-lg border border-brand-200">
                      <h4 className="font-semibold text-brand-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">🧮</span>
                        उदाहरण: ₹50,00,000 लोन पर ₹5,00,000 एकमुश्त भुगतान
                      </h4>
                      <div className="space-y-3 text-sm text-slate-700">
                        <div className="grid grid-cols-2 gap-2">
                          <div><strong>बकाया मूलधन:</strong></div>
                          <div>₹50,00,000</div>
                          <div><strong>ब्याज दर:</strong></div>
                          <div>8.5% सालाना</div>
                          <div><strong>बची हुई अवधि:</strong></div>
                          <div>15 वर्ष (180 महीने)</div>
                          <div><strong>एकमुश्त भुगतान (आज):</strong></div>
                          <div>₹5,00,000</div>
                        </div>

                        <div className="pt-3 border-t border-brand-300">
                          <strong className="block mb-2">चरण 1: मूल EMI निकालें</strong>
                          <div className="ml-4 font-mono text-sm">
                            r = 8.5 ÷ 12 ÷ 100 = 0.00708
                          </div>
                          <div className="ml-4 font-mono text-sm">
                            EMI ≈ ₹49,238 / महीना
                          </div>
                        </div>

                        <div className="pt-3">
                          <strong className="block mb-2">चरण 2: एकमुश्त राशि लागू कर दोबारा गणना करें</strong>
                          <div className="ml-4 font-mono text-sm">
                            नया बैलेंस = 50,00,000 − 5,00,000 = ₹45,00,000
                          </div>
                          <div className="ml-4 text-sm">
                            वही EMI (₹49,238) बनाए रखने पर, लोन अब कम महीनों
                            में चुक जाएगा क्योंकि हर EMI का ज़्यादा हिस्सा
                            मूलधन में जाता है।
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-white rounded border-2 border-brand-50">
                          <div className="text-base font-semibold text-slate-700 mb-1">
                            कुल बचा हुआ ब्याज:
                          </div>
                          <div className="text-3xl font-semibold text-brand-700">
                            ≈ ₹11,50,000
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-brand-300 space-y-2">
                          <div className="flex justify-between">
                            <span>मूल अवधि:</span>
                            <strong>15 वर्ष</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>नई अवधि:</span>
                            <strong className="text-brand-700">≈ 11 वर्ष 2 महीने</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>बची हुई अवधि:</span>
                            <strong className="text-brand-700">≈ 3 वर्ष 10 महीने</strong>
                          </div>
                        </div>
                      </div>
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
              <AdSlot id="prepay-sidebar-hi" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
