import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SICalculatorClient from '@/app/simple-interest-calculator/SICalculatorClient';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import FAQSchema from '@/components/FAQSchema';
import { SimpleInterestSchemas } from '@/components/schemas/SimpleInterestSchemas';
import {
  BadgeCheck,
  Percent,
  ArrowRight,
  AlertTriangle,
  Calculator,
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'साधारण ब्याज कैलकुलेटर भारत 2026 – फ्लैट रेट लोन कैलकुलेटर',
  description:
    'मुफ्त साधारण ब्याज (SI) कैलकुलेटर लोन और निवेश के लिए। फ्लैट रेट ब्याज की गणना करें, रिड्यूसिंग बैलेंस में बदलें, कार लोन के जाल को समझें। वर्ष-वार विभाजन शामिल।',
  keywords: [
    'साधारण ब्याज कैलकुलेटर',
    'SI कैलकुलेटर भारत',
    'फ्लैट रेट लोन कैलकुलेटर',
    'फ्लैट बनाम रिड्यूसिंग बैलेंस',
    'कार लोन ब्याज कैलकुलेटर',
    'साधारण ब्याज फॉर्मूला',
    'SI बनाम CI कैलकुलेटर',
    'गोल्ड लोन ब्याज',
    'पर्सनल लोन फ्लैट रेट'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/simple-interest-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/simple-interest-calculator/',
    },
  },
  openGraph: {
    title: 'साधारण ब्याज कैलकुलेटर 2026 – फ्लैट रेट जाल से बचें',
    description:
      'लोन और निवेश पर साधारण ब्याज की गणना करें। फ्लैट रेट को रिड्यूसिंग बैलेंस में बदलें। कार लोन की वास्तविक लागत समझें।',
    url: 'https://fincado.com/hi/simple-interest-calculator/',
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'faq-1',
    question: 'साधारण ब्याज क्या है और इसकी गणना कैसे की जाती है?',
    answer:
      'साधारण ब्याज (SI) केवल मूलधन राशि पर गणना किया गया ब्याज है, संचित ब्याज पर नहीं। फॉर्मूला: SI = (P × R × T) / 100, जहां P मूलधन है, R वार्षिक ब्याज दर है, T वर्षों में समय है। उदाहरण: 5 वर्षों के लिए 8% पर ₹1,00,000 = ₹40,000 ब्याज। चक्रवृद्धि ब्याज के विपरीत, SI रैखिक रूप से बढ़ता है (हर साल समान राशि)।',
  },
  {
    id: 'faq-2',
    question: 'फ्लैट रेट और रिड्यूसिंग बैलेंस ब्याज में क्या अंतर है?',
    answer:
      'फ्लैट रेट पूरी लोन अवधि के दौरान पूरे मूलधन पर ब्याज लेता है, भले ही आप चुकाते रहें। रिड्यूसिंग बैलेंस केवल बकाया मूलधन पर ब्याज लेता है जो कम होता रहता है। उदाहरण: 5 वर्षों के लिए 7% फ्लैट पर ₹5 लाख कार लोन की लागत ₹1.75L ब्याज है बनाम रिड्यूसिंग बैलेंस में ₹97,000। फ्लैट रेट प्रभावी रूप से लगभग दोगुनी लागत (7% फ्लैट ≈ 13-14% रिड्यूसिंग)।',
  },
  {
    id: 'faq-3',
    question: 'क्या भारतीय बैंक साधारण ब्याज का उपयोग करते हैं?',
    answer:
      'अधिकांश बैंक बचत, FD और EMI-आधारित लोन (होम, पर्सनल) के लिए चक्रवृद्धि ब्याज का उपयोग करते हैं। साधारण ब्याज (फ्लैट रेट) का उपयोग इसमें किया जाता है: (1) डीलर/NBFC से कार लोन, (2) कुछ उधारदाताओं से गोल्ड लोन, (3) अल्पकालिक पर्सनल लोन, (4) व्यक्तियों के बीच अनौपचारिक उधार। लोन लेने से पहले हमेशा ब्याज के प्रकार को स्पष्ट करें।',
  },
  {
    id: 'faq-4',
    question: 'फ्लैट रेट को रिड्यूसिंग बैलेंस रेट में कैसे बदलें?',
    answer:
      'अनुमानित फॉर्मूला: रिड्यूसिंग रेट ≈ फ्लैट रेट × 1.85 से 2.0। उदाहरण: 7% फ्लैट ≈ 13% रिड्यूसिंग, 8% फ्लैट ≈ 15% रिड्यूसिंग, 10% फ्लैट ≈ 19% रिड्यूसिंग। सटीक रूपांतरण लोन अवधि और EMI आवृत्ति पर निर्भर करता है। सटीक समतुल्य दर प्राप्त करने के लिए रिड्यूसिंग बैलेंस के साथ EMI कैलकुलेटर का उपयोग करें। सटीक तुलना के लिए हमेशा उधारदाता से IRR (आंतरिक रिटर्न दर) पूछें।',
  },
  {
    id: 'faq-5',
    question: 'क्या साधारण ब्याज उधारकर्ताओं के लिए बेहतर है?',
    answer:
      'हमेशा नहीं। बिना पूर्व भुगतान के अल्पकालिक लोन (1-2 वर्ष) के लिए फ्लैट रेट "शायद" सरल हो सकता है। लेकिन लंबी अवधि (3+ वर्ष) के लिए या यदि आप पूर्व भुगतान करने की योजना बनाते हैं, तो रिड्यूसिंग बैलेंस हमेशा सस्ता होता है। कार डीलर ब्याज को कम दिखाने के लिए फ्लैट रेट का विज्ञापन करते हैं (7-9%) जब वास्तविक लागत 13-18% रिड्यूसिंग समतुल्य है। हमेशा कुल देय ब्याज की तुलना करें।',
  },
  {
    id: 'faq-6',
    question: 'महीनों या दिनों के लिए साधारण ब्याज की गणना कैसे करें?',
    answer:
      'समय अवधि को वर्षों में बदलें: महीनों के लिए: समय = महीने / 12 (जैसे, 18 महीने = 1.5 वर्ष)। दिनों के लिए: समय = दिन / 365 (जैसे, 90 दिन = 0.247 वर्ष)। फिर मानक फॉर्मूला का उपयोग करें: SI = (P × R × T) / 100। उदाहरण: 6 महीनों के लिए 12% पर ₹50,000 = (50,000 × 12 × 0.5) / 100 = ₹3,000 ब्याज।',
  },
  {
    id: 'faq-7',
    question: 'भारत में कौन से लोन फ्लैट रेट ब्याज का उपयोग करते हैं?',
    answer:
      'सामान्य फ्लैट रेट लोन: (1) डीलर/NBFC से कार लोन (7-10% फ्लैट), (2) टू-व्हीलर लोन (8-12% फ्लैट), (3) गैर-बैंकिंग उधारदाताओं से गोल्ड लोन (7-9% फ्लैट), (4) फाइनेंस कंपनियों से पर्सनल लोन (12-18% फ्लैट), (5) दोस्तों/परिवार के बीच अनौपचारिक उधार। बैंक होम लोन, बैंकों से पर्सनल लोन, और क्रेडिट कार्ड कभी भी फ्लैट रेट का उपयोग नहीं करते।',
  },
  {
    id: 'faq-8',
    question: 'कार लोन फ्लैट रेट जाल क्या है?',
    answer:
      'कार डीलर "7% ब्याज" का विज्ञापन करते हैं जो बैंक के "8.5%" बनाम प्रतिस्पर्धी लगता है। लेकिन डीलर का 7% फ्लैट रेट है (5 वर्षों के लिए पूरे ₹5L पर ब्याज) जबकि बैंक का 8.5% रिड्यूसिंग है (घटते शेष पर ब्याज)। वास्तविक लागत: डीलर 7% फ्लैट = ₹1.75L ब्याज (13% रिड्यूसिंग समतुल्य)। बैंक 8.5% रिड्यूसिंग = ₹1.17L ब्याज। कम विज्ञापित दर के बावजूद डीलर लोन की लागत ₹58,000 अधिक है।',
  },
  {
    id: 'faq-9',
    question:
      'क्या मैं ब्याज बचाने के लिए फ्लैट रेट लोन का पूर्व भुगतान कर सकता हूं?',
    answer:
      'रिड्यूसिंग बैलेंस लोन के विपरीत जहां पूर्व भुगतान महत्वपूर्ण ब्याज बचाता है, फ्लैट रेट लोन पूर्व भुगतान से शून्य लाभ प्रदान करते हैं क्योंकि ब्याज पूरी अवधि के लिए पूरे मूलधन पर अग्रिम गणना की जाती है। कुछ उधारदाता पूर्व भुगतान की अनुमति दे सकते हैं लेकिन ब्याज कम नहीं करेंगे। हमेशा जांचें: (1) क्या पूर्व भुगतान की अनुमति है? (2) क्या पूर्व भुगतान जुर्माना है? (3) क्या ब्याज की पुनर्गणना होगी? आमतौर पर जवाब है कोई लाभ नहीं।',
  },
  {
    id: 'faq-10',
    question: 'साधारण ब्याज बनाम चक्रवृद्धि ब्याज - कौन तेजी से बढ़ता है?',
    answer:
      'चक्रवृद्धि ब्याज साधारण ब्याज की तुलना में तेजी से बढ़ता है। उदाहरण: 10 वर्षों के लिए 10% पर ₹1 लाख: साधारण ब्याज = ₹1 लाख ब्याज (कुल ₹2L, रैखिक वृद्धि)। चक्रवृद्धि ब्याज = ₹1.59 लाख ब्याज (कुल ₹2.59L, घातीय वृद्धि)। अंतर समय के साथ बढ़ता है। निवेश के लिए, हमेशा चक्रवृद्धि चुनें। लोन के लिए, साधारण (फ्लैट) सस्ता लग सकता है लेकिन आमतौर पर सही ढंग से तुलना करने पर नहीं होता।',
  }
];

/* ---------------- PAGE ---------------- */
export default function SimpleInterestPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>साधारण ब्याज (SI)</strong> ब्याज की गणना करने की एक विधि है जहां ब्याज केवल मूल 
      मूलधन राशि पर लिया जाता है, संचित ब्याज पर नहीं। यह इसे ब्याज गणना का एक रैखिक, 
      गैर-चक्रवृद्धि रूप बनाता है।
    </p>
    <p class="mt-4">
      साधारण ब्याज आमतौर पर <strong>फ्लैट रेट कार लोन</strong>, कुछ उधारदाताओं से गोल्ड 
      लोन, अल्पकालिक पर्सनल लोन, और अनौपचारिक उधार में उपयोग किया जाता है। "फ्लैट रेट जाल" 
      से बचने के लिए SI को समझना महत्वपूर्ण है जहां विज्ञापित दरें कम दिखती हैं लेकिन 
      वास्तविक लागत काफी अधिक है।
    </p>
  `);

  const formulaExplanation = autoLinkContent(`
    <p>
      साधारण ब्याज फॉर्मूला सरल है:
    </p>
    <p class="mt-3 font-mono text-sm bg-slate-100 p-2 rounded">
      SI = (P × R × T) / 100
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-3">
      <li><strong>SI</strong> = साधारण ब्याज (अर्जित या भुगतान की गई ब्याज राशि)</li>
      <li><strong>P</strong> = मूलधन (मूल लोन या निवेश राशि)</li>
      <li><strong>R</strong> = ब्याज दर (% प्रति वर्ष)</li>
      <li><strong>T</strong> = समय अवधि (वर्षों में)</li>
    </ul>
    <p class="mt-3">
      <strong>कुल राशि</strong> = मूलधन + साधारण ब्याज
    </p>
  `);

  const flatRateTrap = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">उदाहरण: कार लोन तुलना</h4>
    <p class="mt-2">
      आप ₹3 लाख डाउन पेमेंट के साथ ₹8 लाख की कार खरीदना चाहते हैं। लोन आवश्यक: 5 वर्षों के लिए ₹5 लाख।
    </p>
    
    <div class="mt-4 space-y-3">
      <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="font-semibold text-red-900">डीलर ऑफर: 7% फ्लैट रेट</p>
        <ul class="text-sm text-slate-700 mt-2 space-y-1">
          <li>• ब्याज = (5,00,000 × 7 × 5) / 100 = <strong>₹1,75,000</strong></li>
          <li>• कुल देय = ₹5,00,000 + ₹1,75,000 = <strong>₹6,75,000</strong></li>
          <li>• मासिक EMI = ₹6,75,000 / 60 महीने = <strong>₹11,250</strong></li>
          <li>• प्रभावी रिड्यूसिंग रेट = <strong>≈13% प्रति वर्ष</strong></li>
        </ul>
      </div>

      <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p class="font-semibold text-emerald-900">बैंक ऑफर: 8.5% रिड्यूसिंग बैलेंस</p>
        <ul class="text-sm text-slate-700 mt-2 space-y-1">
          <li>• कुल ब्याज = <strong>₹1,17,539</strong> (आपके भुगतान के रूप में कम होता है)</li>
          <li>• कुल देय = <strong>₹6,17,539</strong></li>
          <li>• मासिक EMI = <strong>₹10,292</strong></li>
          <li>• आप बचाते हैं = <strong>₹57,461</strong> डीलर के फ्लैट रेट बनाम</li>
        </ul>
      </div>
    </div>

    <p class="mt-4 text-sm font-semibold text-orange-700">
      ⚠️ कम विज्ञापित दर (7% बनाम 8.5%) के बावजूद, डीलर का फ्लैट रेट लोन ₹57,000 अधिक 
      खर्च करता है क्योंकि ब्याज पूरे 5 वर्षों के लिए पूरे ₹5L पर गणना की जाती है, घटते 
      शेष पर नहीं।
    </p>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'साधारण ब्याज कैलकुलेटर',
            url: 'https://fincado.com/hi/simple-interest-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="साधारण ब्याज कैलकुलेटर - फ्लैट रेट लोन कैलकुलेटर"
        description="लोन और निवेश पर साधारण ब्याज की गणना करें। फ्लैट रेट को रिड्यूसिंग बैलेंस में बदलें। कार लोन ब्याज जाल को समझें।"
        url="https://fincado.com/hi/simple-interest-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <SimpleInterestSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="साधारण ब्याज कैलकुलेटर 2026" />
            <LanguageToggle path="/simple-interest-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700">
              <Percent className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                साधारण ब्याज कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                फ्लैट रेट लोन और निवेश ब्याज कैलकुलेटर
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  लोन और निवेश पर साधारण ब्याज की गणना करें। फ्लैट रेट बनाम रिड्यूसिंग बैलेंस 
                  अंतर को समझें। कार लोन फ्लैट रेट को वास्तविक लागत में बदलें और सामान्य जाल से बचें।
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                बजट 2026: ब्याज गणना नियम अपरिवर्तित
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                केंद्रीय बजट 2026 ने मानक ब्याज गणना विधियों को संशोधित नहीं
                किया। मौजूदा RBI दिशानिर्देशों के अनुसार फ्लैट-रेट लोन के लिए
                साधारण ब्याज फॉर्मूले लागू रहते हैं।
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-si-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      कार लोन फ्लैट रेट
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सामान्य डीलर ऑफर
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7-10%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        फ्लैट
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      ≈ 13-19% रिड्यूसिंग रेट
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-orange-700 mb-1">
                      गोल्ड लोन रेट
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      NBFC और स्थानीय उधारदाता
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7-12%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      अक्सर साधारण ब्याज
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-red-700 mb-1">
                      फ्लैट रेट जाल
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      वास्तविक लागत गुणक
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      1.8-2x
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        अधिक
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      विज्ञापित दर से
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <SICalculatorClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-si-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-amber-50/50 border-amber-200 text-slate-600">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  कार लोन चेतावनी
                </strong>
                हमेशा पूछें कि ब्याज दर &quot;फ्लैट&quot; है या &quot;रिड्यूसिंग
                बैलेंस&quot;। 7% फ्लैट रेट लगभग 13% रिड्यूसिंग रेट के समान खर्च
                करता है। बैंक रिड्यूसिंग दरें प्रदान करते हैं; डीलर अक्सर दरों
                को आकर्षक दिखाने के लिए फ्लैट रेट का उपयोग करते हैं।
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    कार खरीदने की योजना बना रहे हैं? सही EMI लागत जांचें
                  </strong>
                  <p className="text-sm text-slate-700">
                    डीलर के फ्लैट रेट ऑफर के साथ तुलना करने के लिए रिड्यूसिंग
                    बैलेंस के साथ हमारे EMI कैलकुलेटर का उपयोग करें
                  </p>
                  <Link
                    href="/hi/emi-calculator/"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    EMI गणना करें →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  साधारण ब्याज क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  साधारण ब्याज फॉर्मूला समझाया गया
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={formulaExplanation} />
                </div>

                <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">
                    गणितीय फॉर्मूला
                  </h4>
                  <div className="overflow-x-auto">
                    <BlockMath math="SI = \frac{P \times R \times T}{100}" />
                  </div>
                  <div className="mt-4">
                    <BlockMath math="Total\ Amount = P + SI" />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">
                    उदाहरण गणना
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    मूलधन = ₹1,00,000 | दर = 8% प्रति वर्ष | समय = 5 वर्ष
                  </p>
                  <div className="text-sm space-y-2">
                    <p>
                      SI ={' '}
                      <InlineMath math="\frac{100000 \times 8 \times 5}{100}" />{' '}
                      =<strong className="text-emerald-900"> ₹40,000</strong>
                    </p>
                    <p>
                      कुल राशि = ₹1,00,000 + ₹40,000 =
                      <strong className="text-emerald-900"> ₹1,40,000</strong>
                    </p>
                  </div>
                </div>
              </section>

              {/* SI vs CI Comparison */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  साधारण ब्याज बनाम चक्रवृद्धि ब्याज
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>विशेषता</TableHead>
                        <TableHead>साधारण ब्याज (SI)</TableHead>
                        <TableHead>चक्रवृद्धि ब्याज (CI)</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">गणना विधि</TableCell>
                        <TableCell>केवल मूलधन पर ब्याज</TableCell>
                        <TableCell>मूलधन + संचित ब्याज पर ब्याज</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          वृद्धि पैटर्न
                        </TableCell>
                        <TableCell>रैखिक (हर साल समान राशि)</TableCell>
                        <TableCell>घातीय (हर साल बढ़ता है)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          फॉर्मूला जटिलता
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          सरल: (P×R×T)/100
                        </TableCell>
                        <TableCell className="text-orange-600">
                          जटिल: P(1+r)^n - P
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          रिटर्न (10 वर्ष)
                        </TableCell>
                        <TableCell>100% रिटर्न (₹1L → ₹2L)</TableCell>
                        <TableCell className="text-emerald-600 font-semibold">
                          159% रिटर्न (₹1L → ₹2.59L)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          सर्वोत्तम के लिए
                        </TableCell>
                        <TableCell>अल्पकालिक लोन (1-2 वर्ष)</TableCell>
                        <TableCell className="text-emerald-600">
                          दीर्घकालिक निवेश (5+ वर्ष)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          में उपयोग किया गया
                        </TableCell>
                        <TableCell>
                          कार लोन (फ्लैट), गोल्ड लोन, अनौपचारिक उधार
                        </TableCell>
                        <TableCell>
                          FD, म्यूचुअल फंड, होम लोन (EMI), बचत खाते
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          उधारकर्ता लाभ
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          सरल दिखता है, लेकिन अक्सर अधिक खर्च करता है
                        </TableCell>
                        <TableCell>
                          पारदर्शी, पूर्व भुगतान के साथ कम होता है
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          निवेशक लाभ
                        </TableCell>
                        <TableCell className="text-red-600">
                          कम रिटर्न
                        </TableCell>
                        <TableCell className="text-emerald-600 font-semibold">
                          उच्च रिटर्न (चक्रवृद्धि की शक्ति)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">
                    तुलना उदाहरण: 10 वर्षों के लिए 10% पर ₹1,00,000
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 mt-3">
                    <div className="p-3 bg-white rounded border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">
                        साधारण ब्याज
                      </div>
                      <div className="text-lg font-bold text-slate-900">
                        ₹2,00,000
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        ₹1L मूलधन + ₹1L ब्याज
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                      <div className="text-xs text-emerald-700 mb-1">
                        चक्रवृद्धि ब्याज
                      </div>
                      <div className="text-lg font-bold text-emerald-900">
                        ₹2,59,374
                      </div>
                      <div className="text-xs text-emerald-700 mt-1">
                        चक्रवृद्धि के कारण ₹59,374 अधिक
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot id="hi-si-mid-content" type="square" label="विज्ञापन" />
              </div>

              {/* The Flat Rate Trap */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  फ्लैट रेट लोन जाल: कार लोन का खुलासा
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={flatRateTrap} />
                </div>
              </section>

              {/* Flat vs Reducing Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  फ्लैट रेट बनाम रिड्यूसिंग बैलेंस: वास्तविक लागत तुलना
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>फ्लैट रेट</TableHead>
                        <TableHead>समतुल्य रिड्यूसिंग रेट</TableHead>
                        <TableHead>लागत अंतर</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">
                          5% फ्लैट
                        </TableCell>
                        <TableCell>≈ 9.5% रिड्यूसिंग</TableCell>
                        <TableCell className="text-red-600">90% अधिक</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          7% फ्लैट
                        </TableCell>
                        <TableCell>≈ 13.3% रिड्यूसिंग</TableCell>
                        <TableCell className="text-red-600">90% अधिक</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          8% फ्लैट
                        </TableCell>
                        <TableCell>≈ 15.2% रिड्यूसिंग</TableCell>
                        <TableCell className="text-red-600">90% अधिक</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          10% फ्लैट
                        </TableCell>
                        <TableCell>≈ 19% रिड्यूसिंग</TableCell>
                        <TableCell className="text-red-600">90% अधिक</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          12% फ्लैट
                        </TableCell>
                        <TableCell>≈ 22.8% रिड्यूसिंग</TableCell>
                        <TableCell className="text-red-600">90% अधिक</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-slate-700">
                    <strong className="text-red-900">मुख्य निष्कर्ष:</strong> एक
                    फ्लैट रेट लगभग{' '}
                    <strong>रिड्यूसिंग बैलेंस समतुल्य का 1.9 गुना</strong> है।
                    लोन ऑफर की तुलना करने से पहले हमेशा फ्लैट रेट को रिड्यूसिंग
                    रेट में बदलें। जो &quot;7% लोन&quot; जैसा दिखता है वह वास्तव
                    में &quot;13% लोन&quot; के करीब है।
                  </p>
                </div>
              </section>

              {/* Common Use Cases */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  भारत में साधारण ब्याज का उपयोग कब किया जाता है?
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🚗</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            कार और टू-व्हीलर लोन
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            डीलर और NBFC ऑफर को आकर्षक दिखाने के लिए 7-10% फ्लैट
                            रेट का उपयोग करते हैं।
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>युक्ति:</strong> बैंक के रिड्यूसिंग रेट EMI
                            के साथ तुलना करें। उच्च विज्ञापित दर के बावजूद बैंक
                            आमतौर पर 30-40% सस्ते होते हैं।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">💰</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            गोल्ड लोन
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            स्थानीय उधारदाता और कुछ NBFC 7-12% साधारण ब्याज लेते
                            हैं।
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>युक्ति:</strong> SBI, HDFC जैसे बैंक
                            रिड्यूसिंग दरों (8-10%) पर गोल्ड लोन प्रदान करते
                            हैं। हमेशा दोनों विकल्पों की तुलना करें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🎓</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            स्टूडेंट लोन
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            कुछ शिक्षा लोन योजनाएं अध्ययन अवधि के दौरान साधारण
                            ब्याज का उपयोग करती हैं।
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>युक्ति:</strong> केंद्र सरकार की योजनाओं में
                            अक्सर कम साधारण ब्याज (4-6%) होता है। पात्रता
                            जांचें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🤝</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            व्यक्तिगत उधार
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            दोस्तों, परिवार, या स्थानीय उधारदाताओं के बीच लोन
                            आमतौर पर साधारण ब्याज का उपयोग करते हैं।
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>युक्ति:</strong> हमेशा शर्तों को स्पष्ट रूप
                            से दस्तावेज करें। कुल देय राशि पर अग्रिम सहमत होने
                            के लिए SI कैलकुलेटर का उपयोग करें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to Avoid Traps */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  साधारण ब्याज लोन जाल से बचने के 5 टिप्स
                </h3>

                <div className="space-y-4">
                  <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-emerald-600 text-white shrink-0">
                          1
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            हमेशा पूछें: फ्लैट या रिड्यूसिंग?
                          </h4>
                          <p className="text-sm text-slate-700">
                            किसी भी ब्याज दर के उद्धरण पर पहला सवाल: &quot;क्या
                            यह फ्लैट रेट है या रिड्यूसिंग बैलेंस?&quot; यदि
                            फ्लैट है, तो तुलना करने से पहले समतुल्य रिड्यूसिंग
                            रेट में बदलें (~1.9 से गुणा करें)।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-emerald-600 text-white shrink-0">
                          2
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            कुल देय ब्याज की तुलना करें
                          </h4>
                          <p className="text-sm text-slate-700">
                            केवल दरों की तुलना न करें। पूरी अवधि में कुल देय
                            ब्याज की गणना करें। यदि यह फ्लैट रेट है तो कम दर का
                            मतलब कम लागत नहीं है। वास्तविक रुपये अंतर देखने के
                            लिए कैलकुलेटर का उपयोग करें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          3
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            पहले बैंक ऑफर जांचें
                          </h4>
                          <p className="text-sm text-slate-700">
                            कार/बाइक लोन के लिए, डीलर फाइनेंस से पहले हमेशा बैंक
                            या को-लेंडिंग फिनटेक (Tata Capital, HDFC, Axis) की
                            जांच करें। रिड्यूसिंग दरों के साथ बैंक लगभग हमेशा
                            सस्ते होते हैं। पूर्व-अनुमोदित लोन 5-7% बचाते हैं।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          4
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            पूर्व भुगतान नीति को समझें
                          </h4>
                          <p className="text-sm text-slate-700">
                            फ्लैट रेट लोन पूर्व भुगतान से शून्य लाभ प्रदान करते
                            हैं (ब्याज पहले से तय है)। यदि आप 2-3 वर्षों के भीतर
                            पूर्व भुगतान करने की योजना बनाते हैं, तो रिड्यूसिंग
                            बैलेंस काफी बेहतर है। पूर्व भुगतान जुर्माना खंड
                            जांचें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          5
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            IRR पर लिखित स्पष्टता प्राप्त करें
                          </h4>
                          <p className="text-sm text-slate-700">
                            उधारदाता से लिखित में IRR (आंतरिक रिटर्न दर) या APR
                            (वार्षिक प्रतिशत दर) के लिए पूछें। यह सभी शुल्कों
                            सहित सच्ची ब्याज दर है। विज्ञापित दर नहीं, इस संख्या
                            की तुलना करें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित वित्तीय कैलकुलेटर
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/hi/compound-interest-calculator/"
                    className="group"
                  >
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🔄
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              चक्रवृद्धि ब्याज कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              चक्रवृद्धि के साथ घातीय वृद्धि की गणना करें।
                              दीर्घकालिक संपत्ति के लिए ब्याज-पर-ब्याज की शक्ति
                              देखें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>CI गणना करें</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/hi/emi-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            📊
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              EMI कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              होम, कार, पर्सनल लोन के लिए रिड्यूसिंग बैलेंस EMI
                              की गणना करें। फ्लैट रेट ऑफर के साथ तुलना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>EMI गणना करें</span>
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
              <AdSlot id="hi-si-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="hi-si-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-si-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-si-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
