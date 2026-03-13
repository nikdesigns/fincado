import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import APYClient from '@/app/apy-calculator/APYClient';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { APYSchemas } from '@/components/schemas/APYSchemas';
import { Info, Shield, ArrowRight, TrendingUp, Users } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'APY कैलकुलेटर 2026 – अटल पेंशन योजना योगदान गणना',
  description:
    'अटल पेंशन योजना के लिए मुफ्त APY कैलकुलेटर। गारंटीड पेंशन (₹1000-₹5000), नॉमिनी कॉर्पस और आयु-वार योगदान चार्ट देखें। तुरंत पेंशन परिदृश्यों की तुलना करें।',
  keywords: [
    'APY Calculator Hindi',
    'अटल पेंशन योजना कैलकुलेटर',
    'APY Contribution Chart Hindi',
    'Pension Scheme Calculator Hindi',
    'APY vs NPS Hindi',
    'Government Pension Scheme Hindi',
    'Guaranteed Pension Calculator Hindi',
    'PFRDA Pension Hindi',
    'APY योगदान चार्ट',
    'अटल पेंशन योजना लाभ'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/apy-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/apy-calculator/',
    },
  },
  openGraph: {
    title: 'APY कैलकुलेटर 2026 – आजीवन गारंटीड पेंशन',
    description:
      'आयु और वांछित पेंशन के आधार पर मासिक APY योगदान की गणना करें। भारत सरकार द्वारा समर्थित गारंटीड पेंशन प्राप्त करें।',
    url: 'https://fincado.com/hi/apy-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ---------------- PAGE ---------------- */

export default function APYCalculatorPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>अटल पेंशन योजना (APY)</strong> भारत सरकार द्वारा शुरू की गई एक सरकारी-प्रायोजित पेंशन योजना है जो असंगठित क्षेत्र के श्रमिकों के लिए सामाजिक सुरक्षा प्रदान करती है। यह सरकारी गारंटी द्वारा समर्थित <strong>गारंटीड मासिक पेंशन</strong> ₹1,000 से ₹5,000 तक 60 वर्ष की आयु से शुरू होती है।
    </p>
    <p class="mt-4">
      APY <strong>पेंशन फंड नियामक और विकास प्राधिकरण (PFRDA)</strong> द्वारा प्रशासित है और यह सुनिश्चित करता है कि अभिदाता सेवानिवृत्ति के बाद निश्चित पेंशन आय प्राप्त करें। यह योजना भारत भर में 6 करोड़ से अधिक ग्राहकों को कवर करती है, जो इसे असंगठित क्षेत्र के लिए सबसे बड़े सामाजिक सुरक्षा कार्यक्रमों में से एक बनाती है।
    </p>
  `);

  const keyFeaturesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>गारंटीड पेंशन:</strong> सरकार ₹1,000 से ₹5,000 प्रति माह की न्यूनतम पेंशन की गारंटी देती है</li>
      <li><strong>आयु पात्रता:</strong> 18-40 वर्ष के बीच शामिल हों, 60 वर्ष की आयु से पेंशन प्राप्त करें</li>
      <li><strong>निश्चित योगदान:</strong> आयु और पेंशन विकल्प के आधार पर मासिक/त्रैमासिक/अर्धवार्षिक योगदान</li>
      <li><strong>पति/पत्नी लाभ:</strong> अभिदाता की मृत्यु के बाद पति/पत्नी को समान पेंशन जारी रहती है</li>
      <li><strong>नॉमिनी कॉर्पस:</strong> दोनों की मृत्यु के बाद संचित कॉर्पस (₹1.7L से ₹8.5L) नॉमिनी को जाता है</li>
      <li><strong>ऑटो-डेबिट सुविधा:</strong> बचत खाते से स्वचालित कटौती नियमित भुगतान सुनिश्चित करती है</li>
      <li><strong>केवल गैर-कर दाता:</strong> विशेष रूप से गैर-आयकर दाताओं के लिए (अक्टूबर 2022 नियमों के अनुसार)</li>
      <li><strong>सरकारी सह-योगदान:</strong> केंद्र सरकार ने पात्र ग्राहकों के लिए 50% योगदान दिया (FY 2020 तक 5 वर्षों के लिए)</li>
    </ul>
  `);

  const eligibilityContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">APY में कौन शामिल हो सकता है?</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>आयु मानदंड:</strong> शामिल होने के समय 18 और 40 वर्ष के बीच होना चाहिए</li>
      <li><strong>नागरिकता:</strong> वैध आधार और पैन के साथ भारतीय नागरिक होना चाहिए</li>
      <li><strong>बैंक खाता:</strong> आधार से जुड़ा सक्रिय बचत बैंक खाता होना चाहिए</li>
      <li><strong>कर स्थिति:</strong> केवल गैर-आयकर दाता (1 अक्टूबर 2022 से नियमों के अनुसार)</li>
      <li><strong>मोबाइल नंबर:</strong> SMS अलर्ट और अपडेट के लिए पंजीकृत मोबाइल नंबर</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">APY में कौन शामिल नहीं हो सकता?</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>आयकर दाता (1 अक्टूबर 2022 के नियम परिवर्तन के बाद अयोग्य)</li>
      <li>जो पहले से EPF, NPS (सरकारी क्षेत्र), या ESIC के तहत कवर हैं</li>
      <li>किसी अन्य वैधानिक सामाजिक सुरक्षा योजना के सदस्य</li>
    </ul>
  `);

  const contributionRulesContent = autoLinkContent(`
    <p>
      APY योगदान आपकी <strong>शामिल होने की आयु</strong> और <strong>वांछित पेंशन राशि</strong> के आधार पर भिन्न होता है। युवा ग्राहक लंबी निवेश अवधि के कारण काफी कम भुगतान करते हैं:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">योगदान आवृत्ति विकल्प:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>मासिक:</strong> हर महीने की 1 तारीख को काटा जाता है</li>
      <li><strong>त्रैमासिक:</strong> साल में 4 बार काटा जाता है (हर 3 महीने)</li>
      <li><strong>अर्धवार्षिक:</strong> साल में दो बार काटा जाता है (हर 6 महीने)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">विलंब भुगतान दंड:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>प्रत्येक ₹100 योगदान (या उसके भाग) के लिए ₹1 प्रति माह</li>
      <li>6 महीने के गैर-भुगतान के बाद खाता फ्रीज</li>
      <li>12 महीने के बाद खाता बंद - दंड घटाकर कॉर्पस वापस</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">पेंशन राशि अपग्रेड करना:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>वित्तीय वर्ष में एक बार उच्च पेंशन स्लैब में अपग्रेड कर सकते हैं</li>
      <li>अर्जित ब्याज के साथ पिछली अवधि के लिए अंतर राशि का भुगतान करना होगा</li>
      <li>उदाहरण: ₹1,000 से ₹5,000 तक अपग्रेड करने के लिए पूर्वव्यापी भुगतान आवश्यक है</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>उदाहरण:</strong> 25 वर्ष का ग्राहक ₹5,000 पेंशन चाहता है। मासिक योगदान 35 वर्षों के लिए ₹376 है। कुल निवेश = ₹1,58,760। दोनों अभिदाता और पति/पत्नी के गुजर जाने के बाद नॉमिनी को ₹8.5 लाख कॉर्पस मिलता है।
      </p>
    </div>
  `);

  const withdrawalRulesContent = autoLinkContent(`
    <p>
      APY गारंटीड पेंशन लाभ सुनिश्चित करने के लिए सख्त निकासी नियमों का पालन करता है:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. सामान्य पेंशन (60+ वर्ष):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>अभिदाता को 60 वर्ष की आयु से मृत्यु तक गारंटीड मासिक पेंशन मिलती है</li>
      <li>अभिदाता की मृत्यु के बाद, पति/पत्नी को जीवन भर समान पेंशन मिलती है</li>
      <li>दोनों की मृत्यु के बाद, संचित कॉर्पस नॉमिनी को जाता है</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. समयपूर्व निकास (60 वर्ष से पहले):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>मृत्यु:</strong> पति/पत्नी जारी रख सकते हैं या कॉर्पस रिटर्न के लिए ऑप्ट कर सकते हैं</li>
      <li><strong>टर्मिनल बीमारी:</strong> निकास कर सकते हैं और संचित कॉर्पस प्राप्त कर सकते हैं</li>
      <li><strong>स्वैच्छिक निकास:</strong> अनुमति नहीं है - केवल असाधारण परिस्थितियों में</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. खाता बंद करना:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>यदि भुगतान बंद कर दिया: 6 महीने बाद खाता फ्रीज, 12 महीने बाद बंद</li>
      <li>बंद होने पर, योगदान + ब्याज वापस (दंड और शुल्क घटाकर)</li>
      <li>समयपूर्व बंद होने पर गारंटीड पेंशन लाभ जब्त</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'apy-faq-1',
      question: 'अटल पेंशन योजना (APY) क्या है?',
      answer:
        'APY असंगठित क्षेत्र के श्रमिकों के लिए सरकार समर्थित पेंशन योजना है। यह 60 वर्ष की आयु से शुरू होने वाली ₹1,000 से ₹5,000 तक की गारंटीड मासिक पेंशन प्रदान करती है। PFRDA द्वारा प्रशासित, योगदान आपके बैंक खाते से मासिक/त्रैमासिक/अर्धवार्षिक स्वतः डेबिट होते हैं।',
    },
    {
      id: 'apy-faq-2',
      question: 'APY योगदान की गणना कैसे की जाती है?',
      answer:
        'APY योगदान आपकी शामिल होने की आयु (18-40 वर्ष) और वांछित पेंशन राशि पर निर्भर करता है। युवा ग्राहक कम भुगतान करते हैं क्योंकि उनके पास योगदान करने के लिए अधिक वर्ष हैं। उदाहरण के लिए, ₹5,000 पेंशन के लिए 25 वर्ष की आयु पर मासिक योगदान ₹376 है, जबकि 35 वर्ष की आयु पर यह ₹902 तक बढ़ जाता है।',
    },
    {
      id: 'apy-faq-3',
      question: 'यदि मैं APY योगदान देना बंद कर दूं तो क्या होगा?',
      answer:
        'यदि आप भुगतान बंद कर देते हैं, तो खाता 6 महीने के बाद फ्रीज हो सकता है और 12 महीने के गैर-भुगतान के बाद बंद हो सकता है। आपको अपना संचित कॉर्पस (योगदान + ब्याज) घटा लागू दंड और बैंक शुल्क मिलेगा। गारंटीड पेंशन लाभ जब्त हो जाता है।',
    },
    {
      id: 'apy-faq-4',
      question: 'क्या मैं बाद में अपनी पेंशन राशि बढ़ा सकता हूं?',
      answer:
        'हां। आप पिछली अवधि के लिए अंतर राशि का भुगतान करके वित्तीय वर्ष में एक बार उच्च पेंशन स्लैब में अपग्रेड कर सकते हैं। उदाहरण के लिए, आप अंतर + अर्जित ब्याज का भुगतान करके ₹2,000 से ₹5,000 पेंशन तक अपग्रेड कर सकते हैं।',
    },
    {
      id: 'apy-faq-5',
      question: 'अभिदाता की मृत्यु के बाद क्या होता है?',
      answer:
        'अभिदाता की मृत्यु के बाद, पति/पत्नी को समान गारंटीड पेंशन मिलती रहती है। दोनों अभिदाता और पति/पत्नी के गुजर जाने के बाद, संचित कॉर्पस (₹5,000 पेंशन के लिए ₹8.5 लाख तक) नॉमिनी को लौटा दिया जाता है।',
    },
    {
      id: 'apy-faq-6',
      question: 'क्या विलंबित APY भुगतान के लिए दंड है?',
      answer:
        'हां। बैंक विलंबित भुगतान के लिए प्रत्येक ₹100 योगदान के लिए ₹1 प्रति माह दंड वसूलते हैं। उदाहरण के लिए, यदि आपका मासिक योगदान ₹500 है और आप 2 महीने देर से भुगतान करते हैं, तो दंड ₹10 (₹5 प्रति माह × 2 महीने) होगा।',
    },
    {
      id: 'apy-faq-7',
      question: 'APY के लिए कौन पात्र नहीं है?',
      answer:
        'आयकर दाता APY के लिए पात्र नहीं हैं (1 अक्टूबर 2022 से नियमों के अनुसार)। साथ ही, जो पहले से वैधानिक सामाजिक सुरक्षा योजनाओं जैसे EPF, NPS (सरकारी क्षेत्र), या ESIC के तहत कवर हैं, वे APY में शामिल नहीं हो सकते।',
    },
    {
      id: 'apy-faq-8',
      question: 'APY बनाम NPS - कौन बेहतर है?',
      answer:
        'APY सरकारी समर्थन के साथ गारंटीड निश्चित पेंशन (अधिकतम ₹5,000/माह) के लिए बेहतर है। NPS उच्च पेंशन क्षमता (बाजार-लिंक्ड रिटर्न 9-12%) के लिए बेहतर है लेकिन निवेश जोखिम के साथ। APY कम आय वाले श्रमिकों के लिए उपयुक्त है; NPS उच्च सेवानिवृत्ति कॉर्पस चाहने वाले वेतनभोगी पेशेवरों के लिए उपयुक्त है।',
    },
    {
      id: 'apy-faq-9',
      question: 'क्या मैं 60 से पहले APY पैसे निकाल सकता हूं?',
      answer:
        'समयपूर्व निकास केवल असाधारण मामलों जैसे टर्मिनल बीमारी या मृत्यु में अनुमति है। ऐसे मामलों में, संचित कॉर्पस वापस कर दिया जाता है। 60 वर्ष की आयु से पहले सामान्य निकासी की अनुमति नहीं है, जो APY को दीर्घकालिक प्रतिबद्धता बनाता है।',
    },
    {
      id: 'apy-faq-10',
      question: 'क्या केंद्रीय बजट 2026 ने APY नियम बदले?',
      answer:
        'केंद्रीय बजट 2026 ने APY योगदान दरों, पेंशन राशि या पात्रता मानदंड में कोई बदलाव नहीं किया। यह योजना मौजूदा PFRDA दिशानिर्देशों के अनुसार समान 5 पेंशन स्लैब (₹1,000 से ₹5,000) के साथ संचालित होती रहती है।',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'APY कैलकुलेटर',
            url: 'https://fincado.com/hi/apy-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="अटल पेंशन योजना (APY) कैलकुलेटर"
        description="APY पेंशन योजना के लिए मासिक योगदान की गणना करें। अपनी शामिल होने की आयु के आधार पर ₹1000 से ₹5000 तक गारंटीड पेंशन, कुल निवेश और नॉमिनी कॉर्पस देखें।"
        url="https://fincado.com/hi/apy-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <APYSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="APY कैलकुलेटर" />
            <LanguageToggle path="/apy-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                APY कैलकुलेटर (अटल पेंशन योजना)
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                गारंटीड सरकारी पेंशन की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-apy-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      सबसे लोकप्रिय
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹5,000 पेंशन (25 वर्ष)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹376
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /माह
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      शामिल होने की आयु
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      पात्र आयु सीमा
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      18-40
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      अधिकतम कॉर्पस
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      नॉमिनी को मिलता है
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹8.5L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        अधिकतम
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <APYClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-apy-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  सरकारी गारंटी
                </strong>
                APY भारत सरकार द्वारा समर्थित गारंटीड पेंशन प्रदान करता है। यदि
                वास्तविक रिटर्न वादा की गई पेंशन से कम है, तो सरकार भारत की
                संचित निधि से अंतर पूरा करती है।
              </AlertDescription>
            </Alert>

            {/* ✅ APY FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    APY गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      APY योगदान PFRDA द्वारा प्रकाशित पूर्व-परिभाषित तालिकाओं
                      पर आधारित हैं। लक्ष्य पेंशन कॉर्पस प्राप्त करने के लिए
                      फॉर्मूला रिवर्स-इंजीनियर किया गया है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          मासिक योगदान गणना
                        </div>
                        <div className="text-lg font-serif space-y-1">
                          <div>मासिक योगदान = आधार राशि × (पेंशन / 5000)</div>
                          <div className="text-sm text-slate-600 mt-2">
                            जहां आधार राशि शामिल होने की आयु पर निर्भर करती है
                          </div>
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          कुल निवेश
                        </div>
                        <div className="text-lg font-serif">
                          कुल = मासिक योगदान × [(60 - आयु) × 12]
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">आधार राशि:</strong>
                        <span>
                          विभिन्न आयु में ₹5,000 पेंशन के लिए पूर्व-परिभाषित
                          योगदान (PFRDA द्वारा प्रकाशित)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">पेंशन:</strong>
                        <span>
                          वांछित मासिक पेंशन (₹1,000, ₹2,000, ₹3,000, ₹4,000, या
                          ₹5,000)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">आयु:</strong>
                        <span>शामिल होने की आयु (18-40 वर्ष)</span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">नॉमिनी कॉर्पस:</strong>
                        <span>
                          प्रत्येक पेंशन स्लैब के लिए निश्चित कॉर्पस (₹1.7L से
                          ₹8.5L)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> APY जीवन प्रत्याशा, ब्याज दरों और
                        सरकारी समर्थन पर विचार करने वाली एक्चुअरियल टेबल का
                        उपयोग करता है। बाजार-लिंक्ड NPS के विपरीत, APY वास्तविक
                        रिटर्न की परवाह किए बिना निश्चित पेंशन की गारंटी देता
                        है।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: ₹5,000 पेंशन के लिए 25 वर्ष का ग्राहक
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>शामिल होने की आयु:</strong>
                        </div>
                        <div>25 वर्ष</div>

                        <div>
                          <strong>सेवानिवृत्ति आयु:</strong>
                        </div>
                        <div>60 वर्ष</div>

                        <div>
                          <strong>योगदान अवधि:</strong>
                        </div>
                        <div>35 वर्ष (420 महीने)</div>

                        <div>
                          <strong>वांछित पेंशन:</strong>
                        </div>
                        <div>₹5,000/माह</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: 25 वर्ष के लिए आधार राशि प्राप्त करें
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          आधार राशि (25 वर्ष की आयु में ₹5,000 पेंशन के लिए) =
                          ₹376/माह
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: वांछित पेंशन के लिए योगदान की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>मासिक योगदान = ₹376 × (5000 / 5000)</div>
                          <div>मासिक योगदान = ₹376</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: कुल निवेश की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>कुल महीने = (60 - 25) × 12 = 420 महीने</div>
                          <div>कुल निवेश = ₹376 × 420 = ₹1,57,920</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 4: नॉमिनी कॉर्पस (PFRDA द्वारा पूर्व-परिभाषित)
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            ₹5,000 पेंशन के लिए नॉमिनी कॉर्पस = ₹8,50,000
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            APY लाभ सारांश:
                          </div>
                          <div className="flex justify-between">
                            <span>कुल निवेश (35 वर्ष):</span>
                            <strong className="text-slate-900">
                              ₹1,57,920
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>गारंटीड मासिक पेंशन:</span>
                            <strong className="text-emerald-700">₹5,000</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>पति/पत्नी को समान पेंशन:</span>
                            <strong className="text-emerald-700">₹5,000</strong>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-base">
                              <span className="font-semibold">
                                नॉमिनी को कॉर्पस मिलता है:
                              </span>
                              <strong className="text-emerald-700">
                                ₹8,50,000
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300">
                        <p className="text-xs text-slate-600">
                          <strong>लाभ विश्लेषण:</strong> 35 वर्षों में ₹1.58 लाख
                          निवेश के लिए, आपको ₹5,000/माह आजीवन पेंशन
                          (₹60,000/वर्ष) मिलती है। पेंशन पति/पत्नी को जारी रहती
                          है। यदि आप सेवानिवृत्ति के बाद 25 वर्ष जीते हैं, तो
                          कुल पेंशन प्राप्त = ₹15 लाख + ₹8.5L कॉर्पस नॉमिनी को =
                          ₹23.5L कुल लाभ!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Age vs Contribution */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      शामिल होने की आयु का प्रभाव (₹5,000 पेंशन)
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="p-3 bg-white rounded border border-lime-200">
                        <div className="font-mono text-sm space-y-1">
                          <div>18 वर्ष: ₹210/माह × 504 महीने = ₹1,05,840</div>
                          <div>25 वर्ष: ₹376/माह × 420 महीने = ₹1,57,920</div>
                          <div>30 वर्ष: ₹577/माह × 360 महीने = ₹2,07,720</div>
                          <div>35 वर्ष: ₹902/माह × 300 महीने = ₹2,70,600</div>
                          <div>40 वर्ष: ₹1,454/माह × 240 महीने = ₹3,48,960</div>
                          <div className="mt-2 font-semibold text-lime-700">
                            18 बनाम 40 में शामिल होना: ₹2.43 लाख बचाएं (70% कम!)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    APY योगदान PFRDA द्वारा निश्चित किए गए हैं और समय-समय पर
                    संशोधित किए जा सकते हैं। नवीनतम योगदान दरों के लिए हमेशा
                    अपने बैंक से जांचें। गणना नियमित भुगतान बिना डिफ़ॉल्ट के
                    मानती है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    उच्च सेवानिवृत्ति कॉर्पस चाहते हैं?
                  </strong>
                  <Link
                    href="/hi/nps-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      कर लाभ के साथ बाजार-लिंक्ड पेंशन के लिए NPS कैलकुलेटर
                      आज़माएं
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  अटल पेंशन योजना (APY) क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  APY की प्रमुख विशेषताएं
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={keyFeaturesContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-apy-mid-content"
                  type="square"
                  label="विज्ञापन"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  APY के लिए पात्रता मानदंड
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={eligibilityContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  APY बनाम NPS बनाम EPF तुलना
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">विशेषता</TableHead>
                        <TableHead className="text-left">APY</TableHead>
                        <TableHead className="text-left">NPS</TableHead>
                        <TableHead className="text-left">EPF</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पेंशन राशि
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          निश्चित (₹1k-₹5k)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          बाजार-लिंक्ड (कोई सीमा नहीं)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          पेंशन नहीं (एकमुश्त)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          सरकारी गारंटी
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हां (100% गारंटीड)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          नहीं (बाजार जोखिम)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हां (निश्चित 8.25%)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पात्रता
                        </TableCell>
                        <TableCell className="text-slate-700">
                          गैर-कर दाता 18-40
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          सभी नागरिक 18-70
                        </TableCell>
                        <TableCell className="text-slate-700">
                          वेतनभोगी कर्मचारी
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          कर कटौती
                        </TableCell>
                        <TableCell className="text-slate-700">
                          नहीं (गैर-कर दाताओं के लिए)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹2L (80C + 80CCD(1B))
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L (80C)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          योगदान
                        </TableCell>
                        <TableCell className="text-slate-700">
                          केवल ₹42/माह से
                        </TableCell>
                        <TableCell className="text-slate-700">
                          न्यूनतम ₹500/वर्ष
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          12% + 3.67% (नियोक्ता)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पति/पत्नी लाभ
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हां (समान पेंशन)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          हां (वार्षिकी के माध्यम से)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          नॉमिनी को कॉर्पस मिलता है
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          समयपूर्व निकास
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कठिन (विशेष मामले)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          अनुमति (आंशिक 25%)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हां (शर्तों के बाद)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          सबसे अच्छा किसके लिए
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          असंगठित क्षेत्र
                        </TableCell>
                        <TableCell className="text-slate-700">
                          अतिरिक्त कर लाभ
                        </TableCell>
                        <TableCell className="text-slate-700">
                          नियोक्ता के साथ वेतनभोगी
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>विशेषज्ञ निर्णय:</strong> APY गारंटीड पेंशन सुरक्षा
                    चाहने वाले असंगठित क्षेत्र में कम आय वाले श्रमिकों के लिए
                    आदर्श है। वेतनभोगी पेशेवरों के लिए, व्यापक सेवानिवृत्ति
                    योजना के लिए EPF (अनिवार्य) + NPS (₹50k अतिरिक्त कर लाभ) को
                    मिलाएं।
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  APY योगदान नियम और दंड
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={contributionRulesContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  निकासी नियम और निकास नीति
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalRulesContent} />
                </div>
              </section>

              {/* How to Open */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  APY खाता कैसे खोलें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>अपने बैंक में जाएं:</strong> बचत खाते के साथ किसी भी
                    APY-अधिकृत बैंक (SBI, HDFC, ICICI, PNB, BoB, Axis, आदि) से
                    संपर्क करें
                  </li>
                  <li>
                    <strong>दस्तावेज़ जमा करें:</strong> आधार कार्ड, पैन कार्ड,
                    बैंक पासबुक और पंजीकृत मोबाइल नंबर प्रदान करें
                  </li>
                  <li>
                    <strong>APY फॉर्म भरें:</strong> आयु प्रमाण और नॉमिनी विवरण
                    के साथ ग्राहक पंजीकरण फॉर्म पूरा करें
                  </li>
                  <li>
                    <strong>पेंशन राशि चुनें:</strong> वांछित मासिक पेंशन चुनें
                    (₹1,000, ₹2,000, ₹3,000, ₹4,000, या ₹5,000)
                  </li>
                  <li>
                    <strong>योगदान आवृत्ति सेट करें:</strong> अपने खाते से
                    मासिक/त्रैमासिक/अर्धवार्षिक ऑटो-डेबिट चुनें
                  </li>
                  <li>
                    <strong>PRAN प्राप्त करें:</strong> SMS और ईमेल पुष्टिकरण के
                    माध्यम से स्थायी सेवानिवृत्ति खाता संख्या (PRAN) प्राप्त
                    करें
                  </li>
                </ol>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस APY कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>अपनी शामिल होने की आयु (18-40 वर्ष) चुनें।</li>
                  <li>वांछित मासिक पेंशन राशि (₹1,000 से ₹5,000) चुनें।</li>
                  <li>योगदान आवृत्ति (मासिक/त्रैमासिक/अर्धवार्षिक) चुनें।</li>
                  <li>
                    अपनी आयु और पेंशन विकल्प के आधार पर आवश्यक आवधिक योगदान राशि
                    देखें।
                  </li>
                  <li>
                    60 वर्ष की आयु तक आवश्यक कुल निवेश और नॉमिनी कॉर्पस राशि
                    जांचें।
                  </li>
                  <li>
                    दो अलग-अलग परिदृश्यों की साथ-साथ तुलना करने के लिए तुलना मोड
                    का उपयोग करें।
                  </li>
                  <li>
                    यह देखने के लिए आयु प्रभाव सिमुलेटर की समीक्षा करें कि शामिल
                    होने की आयु योगदान को कैसे प्रभावित करती है।
                  </li>
                  <li>
                    गणना को इतिहास में सहेजें और परिवार योजना के लिए WhatsApp के
                    माध्यम से साझा करें।
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित सेवानिवृत्ति योजना उपकरण
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/nps-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💼
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              NPS कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              ₹2L कर लाभ और बाजार-लिंक्ड रिटर्न के साथ राष्ट्रीय
                              पेंशन प्रणाली की गणना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>NPS की गणना करें</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/hi/retirement-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏖️
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              रिटायरमेंट कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              आरामदायक सेवानिवृत्ति जीवन के लिए पूर्ण
                              सेवानिवृत्ति कॉर्पस की योजना बनाएं।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>रिटायरमेंट की योजना बनाएं</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="hi-apy-before-faq" type="leaderboard" lazyLoad />
            </div>

            {/* FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न
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

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-apy-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-apy-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-apy-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
