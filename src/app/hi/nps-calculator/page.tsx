import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import NPSClient from '@/app/nps-calculator/NPSClient';
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
import { NPSSchemas } from '@/components/schemas/NPSSchemas';
import {
  Info,
  TrendingUp,
  ArrowRight,
  Shield,
  Percent,
  BadgeCheck,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'NPS कैलकुलेटर 2026 – राष्ट्रीय पेंशन प्रणाली रिटर्न कैलकुलेट करें',
  description:
    'NPS रिटायरमेंट कॉर्पस, टैक्स-फ्री एकमुश्त (60%), और मासिक पेंशन (40%) की गणना करें। धारा 80C और 80CCD(1B) के तहत टैक्स लाभ के साथ योजना बनाएं।',
  keywords: [
    'NPS Calculator Hindi',
    'National Pension System Calculator Hindi',
    'NPS Return Calculator Hindi',
    'NPS Pension Calculator Hindi',
    'NPS Withdrawal Calculator Hindi',
    'NPS Tax Benefit Calculator Hindi',
    'NPS Maturity Calculator Hindi',
    'Tier 1 NPS Calculator Hindi',
    'NPS Investment Calculator Hindi',
    'NPS Annuity Calculator Hindi',
    'राष्ट्रीय पेंशन प्रणाली कैलकुलेटर',
    'एनपीएस कैलकुलेटर'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/nps-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/nps-calculator/',
    },
  },
  openGraph: {
    title: 'NPS कैलकुलेटर 2026 – टैक्स लाभ के साथ अपनी पेंशन की योजना बनाएं',
    description:
      'मुफ्त NPS कैलकुलेटर: रिटायरमेंट कॉर्पस, टैक्स-फ्री एकमुश्त (60%), और मासिक पेंशन (40%) की गणना करें। 80C + 80CCD(1B) लाभ के साथ योजना बनाएं।',
    url: 'https://fincado.com/hi/nps-calculator/',
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

export default function NPSCalculatorPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>राष्ट्रीय पेंशन प्रणाली (NPS)</strong> सरकार द्वारा प्रायोजित स्वैच्छिक रिटायरमेंट बचत योजना है जो रिटायरमेंट के बाद पेंशन आय प्रदान करने के लिए डिज़ाइन की गई है। 2004 में शुरू की गई, NPS भारत में सभी निवेश उत्पादों में <strong>सबसे कम खर्च अनुपात</strong> (0.01%) के साथ बाजार-लिंक्ड रिटर्न प्रदान करती है।
    </p>
    <p class="mt-4">
      NPS रिटायरमेंट आयु 60 पर <strong>60:40 निकासी नियम</strong> का पालन करती है: 60% तक टैक्स-फ्री एकमुश्त निकालें, और जीवन भर मासिक पेंशन के लिए शेष 40% वार्षिकी में निवेश करें। यह धारा 80C के तहत ₹1.5 लाख सीमा से अधिक धारा 80CCD(1B) के तहत <strong>₹50,000 का अतिरिक्त टैक्स लाभ</strong> प्रदान करती है।
    </p>
  `);

  const keyFeaturesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>कम लागत:</strong> 0.01% का खर्च अनुपात - सभी निवेश उत्पादों में सबसे कम</li>
      <li><strong>टैक्स लाभ:</strong> 80C के तहत ₹1.5L + 80CCD(1B) के तहत ₹50k = कुल ₹2L कटौती</li>
      <li><strong>बाजार-लिंक्ड रिटर्न:</strong> इक्विटी (E), कॉर्पोरेट बॉन्ड (C), सरकारी प्रतिभूतियाँ (G) में से चुनें</li>
      <li><strong>लचीला आवंटन:</strong> ऑटो चॉइस या रीबैलेंसिंग विकल्पों के साथ एक्टिव चॉइस</li>
      <li><strong>पोर्टेबल:</strong> नौकरियों और स्थानों में निर्बाध रूप से NPS खाता स्थानांतरित करें</li>
      <li><strong>60:40 नियम:</strong> 60% एकमुश्त (टैक्स-फ्री) + 40% वार्षिकी (मासिक पेंशन)</li>
      <li><strong>सरकारी गारंटी:</strong> PFRDA द्वारा विनियमित - सुरक्षित और पारदर्शी</li>
      <li><strong>दो स्तर:</strong> टियर 1 (लॉक-इन के साथ रिटायरमेंट) + टियर 2 (लचीली बचत)</li>
    </ul>
  `);

  const npsTypesContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">टियर 1 खाता (रिटायरमेंट खाता):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>60 वर्ष की आयु तक लॉक-इन के साथ अनिवार्य रिटायरमेंट खाता</li>
      <li>पूर्ण टैक्स लाभ (80C + 80CCD(1B)) के लिए पात्र</li>
      <li>खाता सक्रिय रखने के लिए न्यूनतम ₹500/वर्ष</li>
      <li>केवल रिटायरमेंट पर या विशिष्ट परिस्थितियों (चिकित्सा आपातकाल, विकलांगता) में निकासी</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">टियर 2 खाता (स्वैच्छिक बचत):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>बिना लॉक-इन के वैकल्पिक स्वैच्छिक बचत खाता</li>
      <li>कोई टैक्स लाभ नहीं (शर्तों के साथ सरकारी कर्मचारियों को छोड़कर)</li>
      <li>केवल टियर 1 खाता मौजूद होने पर खोला जा सकता है</li>
      <li>बिना प्रतिबंधों के किसी भी समय निकासी - तरल फंड की तरह काम करता है</li>
    </ul>
    <p class="mt-4 font-semibold text-emerald-700">
      टैक्स लाभ और अनुशासित बचत के कारण अधिकांश निवेशक रिटायरमेंट योजना के लिए टियर 1 पर ध्यान केंद्रित करते हैं।
    </p>
  `);

  const investmentChoicesContent = autoLinkContent(`
    <p>
      NPS तीन परिसंपत्ति वर्गों के साथ दो निवेश रणनीतियाँ प्रदान करती है:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">परिसंपत्ति वर्ग:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>परिसंपत्ति E (इक्विटी):</strong> स्टॉक और इक्विटी म्यूचुअल फंड - उच्चतम रिटर्न, उच्चतम जोखिम</li>
      <li><strong>परिसंपत्ति C (कॉर्पोरेट बॉन्ड):</strong> कॉर्पोरेट ऋण प्रतिभूतियाँ - मध्यम रिटर्न, मध्यम जोखिम</li>
      <li><strong>परिसंपत्ति G (सरकारी प्रतिभूतियाँ):</strong> G-Secs, T-Bills - निम्नतम रिटर्न, निम्नतम जोखिम</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">1. ऑटो चॉइस (जीवनचक्र आधारित):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>आक्रामक:</strong> युवा निवेशकों (आयु 18-35) के लिए 75% तक इक्विटी आवंटन</li>
      <li><strong>मध्यम:</strong> मध्यम आयु (आयु 35-50) के लिए 50% तक इक्विटी आवंटन</li>
      <li><strong>रूढ़िवादी:</strong> रिटायरमेंट के करीब (आयु 50-60) के लिए 25% तक इक्विटी आवंटन</li>
      <li>जैसे-जैसे आपकी उम्र बढ़ती है स्वचालित रीबैलेंसिंग - इक्विटी कम होती है, ऋण बढ़ता है</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. एक्टिव चॉइस (स्व-प्रबंधित):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>E, C, G परिसंपत्तियों में अपना स्वयं का आवंटन चुनें</li>
      <li>इक्विटी (परिसंपत्ति E) में अधिकतम 75% की अनुमति</li>
      <li>वित्तीय वर्ष में एक बार मैन्युअल रूप से रीबैलेंस करें</li>
      <li>अनुभवी निवेशकों के लिए सर्वश्रेष्ठ जो बाजार जोखिमों को समझते हैं</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      NPS भारत में सभी रिटायरमेंट उत्पादों में <strong>सर्वोच्च टैक्स कटौती सीमा</strong> प्रदान करती है:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. धारा 80C कटौती (₹1.5 लाख):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>₹1.5 लाख तक NPS टियर 1 योगदान पात्र</li>
      <li>PPF, ELSS, जीवन बीमा, होम लोन मूलधन आदि के साथ साझा</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. धारा 80CCD(1B) कटौती (₹50,000):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>विशेष रूप से NPS के लिए <strong>अतिरिक्त</strong> ₹50,000 कटौती</li>
      <li>धारा 80C के तहत ₹1.5 लाख सीमा से अधिक</li>
      <li>कुल कटौती संभव: ₹2 लाख (₹1.5L + ₹50k)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. नियोक्ता योगदान (80CCD(2)):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>मूल वेतन का 14% (केंद्र सरकार) या 10% (निजी क्षेत्र) - कोई सीमा नहीं</li>
      <li>₹1.5L सीमा के तहत नहीं गिना जाता - पूरी तरह से अलग लाभ</li>
      <li>कुल टैक्स बचत क्षमता: ₹2L + नियोक्ता योगदान</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">4. निकासी टैक्स उपचार:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>60% एकमुश्त:</strong> रिटायरमेंट पर पूरी तरह से टैक्स-फ्री</li>
      <li><strong>40% वार्षिकी:</strong> मासिक पेंशन आय स्लैब के अनुसार कर योग्य</li>
      <li>यदि आपातकाल के कारण 60 से पहले निकालते हैं: केवल 20% टैक्स-फ्री, 80% वार्षिकी अनिवार्य</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>टैक्स बचत उदाहरण:</strong> 30% टैक्स ब्रैकेट पर ₹2 लाख/वर्ष निवेश करने से सालाना ₹60,000 टैक्स की बचत होती है। 30 वर्षों में, यह ₹18 लाख टैक्स बचत है!
      </p>
    </div>
  `);

  const faqItems = [
    {
      id: 'nps-faq-1',
      question: 'राष्ट्रीय पेंशन प्रणाली (NPS) क्या है?',
      answer:
        'NPS PFRDA द्वारा विनियमित सरकार द्वारा प्रायोजित स्वैच्छिक रिटायरमेंट बचत योजना है। यह सबसे कम खर्च अनुपात (0.01%), ₹2 लाख तक टैक्स लाभ (80C + 80CCD(1B)), और रिटायरमेंट आयु 60 पर 60:40 निकासी नियम के साथ बाजार-लिंक्ड रिटर्न प्रदान करती है।',
    },
    {
      id: 'nps-faq-2',
      question: 'NPS के टैक्स लाभ क्या हैं?',
      answer:
        'NPS ट्रिपल टैक्स लाभ प्रदान करती है: (1) 80C के तहत ₹1.5L कटौती, (2) 80CCD(1B) के तहत अतिरिक्त ₹50k, (3) 80CCD(2) के तहत नियोक्ता योगदान (कोई सीमा नहीं)। कुल संभावित कटौती: ₹2L + नियोक्ता। रिटायरमेंट पर 60% एकमुश्त निकासी टैक्स-फ्री है।',
    },
    {
      id: 'nps-faq-3',
      question: 'NPS में 60:40 निकासी नियम क्या है?',
      answer:
        'रिटायरमेंट (आयु 60) पर, आपको न्यूनतम 60% एकमुश्त (टैक्स-फ्री) के रूप में निकालना होगा और शेष 40% को मासिक पेंशन (कर योग्य) के लिए वार्षिकी में निवेश करना होगा। आप उच्च पेंशन के लिए 40% से अधिक वार्षिकी में निवेश करना चुन सकते हैं, लेकिन अधिकतम 60% एकमुश्त की अनुमति है।',
    },
    {
      id: 'nps-faq-4',
      question: 'क्या मैं 60 से पहले NPS निकाल सकता हूँ?',
      answer:
        'समय से पहले निकासी केवल विशिष्ट मामलों में अनुमत है: (1) गंभीर बीमारी/विकलांगता - 25% तक निकालें, (2) 10 साल के बाद - सीमित उद्देश्यों (बच्चों की शिक्षा, घर खरीद, चिकित्सा) के लिए 25% निकालें। 60 से पहले निकासी पर, केवल 20% टैक्स-फ्री है, 80% वार्षिकी में जाना चाहिए।',
    },
    {
      id: 'nps-faq-5',
      question: 'NPS बनाम PPF - कौन बेहतर है?',
      answer:
        'NPS उच्च रिटर्न (10-12% इक्विटी-आधारित) बनाम PPF (7.1% निश्चित) प्रदान करती है। NPS में अतिरिक्त ₹50k टैक्स लाभ (80CCD(1B)) है जो PPF में उपलब्ध नहीं है। हालांकि, PPF मैच्योरिटी पर 100% टैक्स-फ्री है जबकि NPS पेंशन कर योग्य है। सर्वोत्तम रणनीति: दोनों का उपयोग करें - सुरक्षा के लिए PPF, वृद्धि + अतिरिक्त टैक्स लाभ के लिए NPS।',
    },
    {
      id: 'nps-faq-6',
      question: 'NPS में न्यूनतम निवेश क्या है?',
      answer:
        'टियर 1 खाता सक्रिय रखने के लिए न्यूनतम ₹500 प्रति वर्ष (या ₹42/माह)। कोई अधिकतम सीमा नहीं। हालांकि, ₹2 लाख (80C + 80CCD(1B)) का पूर्ण टैक्स लाभ क्लेम करने के लिए, सालाना ₹2 लाख निवेश करें। टियर 2 खाते को खोलने के लिए न्यूनतम ₹1,000 और प्रति लेनदेन ₹250 की आवश्यकता है।',
    },
    {
      id: 'nps-faq-7',
      question: 'कौन सा NPS फंड मैनेजर सबसे अच्छा है?',
      answer:
        '2026 तक, रिटर्न के आधार पर शीर्ष NPS फंड मैनेजर: SBI पेंशन (इक्विटी में 12-13%), HDFC पेंशन (11-12%), LIC पेंशन (10-11%), UTI रिटायरमेंट (10-11%)। हालांकि, अल्पकालिक रिटर्न के बजाय दीर्घकालिक स्थिरता के आधार पर चुनें। आप मुफ्त में साल में एक बार फंड मैनेजर बदल सकते हैं।',
    },
    {
      id: 'nps-faq-8',
      question: 'क्या मेरे पास NPS और EPF दोनों हो सकते हैं?',
      answer:
        'हाँ, बिल्कुल! EPF वेतनभोगी कर्मचारियों के लिए अनिवार्य है, जबकि NPS स्वैच्छिक है। दोनों होना स्मार्ट है: EPF 8.25% सुरक्षित रिटर्न देती है, NPS 10-12% बाजार-लिंक्ड रिटर्न + अतिरिक्त ₹50k टैक्स लाभ (80CCD(1B)) देती है। साथ में वे एक संतुलित रिटायरमेंट पोर्टफोलियो बनाते हैं।',
    },
    {
      id: 'nps-faq-9',
      question: 'मृत्यु के बाद NPS का क्या होता है?',
      answer:
        'यदि ग्राहक रिटायरमेंट से पहले मर जाता है, तो 100% कॉर्पस नॉमिनी को जाता है (40% वार्षिकी की आवश्यकता नहीं)। नॉमिनी चुन सकता है: (1) पूरी राशि निकालें (टैक्स-फ्री), या (2) मूल रिटायरमेंट आयु तक NPS खाता जारी रखें। रिटायरमेंट के बाद मृत्यु पर, वार्षिकी शर्तों के अनुसार पति/पत्नी या परिवार को वार्षिकी जारी रहती है।',
    },
    {
      id: 'nps-faq-10',
      question: 'क्या NPS स्व-नियोजित/फ्रीलांसरों के लिए उपयुक्त है?',
      answer:
        'हाँ! स्व-नियोजित पूर्ण ₹2L कटौती (80C + 80CCD(1B)) + सकल आय का 10% व्यवसाय खर्च के रूप में क्लेम कर सकते हैं। NPS उन लोगों के लिए रिटायरमेंट योजना अंतर को भरती है जिनके पास EPF नहीं है। अधिकतम वृद्धि के लिए युवा होने पर आक्रामक आवंटन (75% इक्विटी) चुनें। कम 0.01% शुल्क इसे सबसे लागत प्रभावी रिटायरमेंट उत्पाद बनाता है।',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'NPS कैलकुलेटर',
            url: 'https://fincado.com/hi/nps-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="NPS (राष्ट्रीय पेंशन प्रणाली) कैलकुलेटर"
        description="बाजार-लिंक्ड रिटर्न और टैक्स लाभ के साथ NPS रिटायरमेंट कॉर्पस, टैक्स-फ्री एकमुश्त निकासी (60%), और मासिक पेंशन (40%) की गणना करें।"
        url="https://fincado.com/hi/nps-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <NPSSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="NPS कैलकुलेटर" />
            <LanguageToggle path="/nps-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                NPS कैलकुलेटर (राष्ट्रीय पेंशन प्रणाली)
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                ₹2 लाख टैक्स लाभ के साथ पेंशन कॉर्पस की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-emerald-900">
                बजट 2026: टैक्स लाभ जारी
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                वित्त वर्ष 2026-27 के लिए धारा 80CCD(1B) के तहत{' '}
                <strong>₹50,000</strong> की अतिरिक्त कटौती जारी रहेगी। 60%
                टैक्स-फ्री निकासी के नियम भी अपरिवर्तित हैं।
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-nps-top" type="leaderboard" />
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
                      टैक्स लाभ
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      80C + 80CCD(1B) कटौती
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹2L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      खर्च अनुपात
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सबसे कम फंड प्रबंधन लागत
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      0.01%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        केवल
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      निकासी नियम
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      एकमुश्त + वार्षिकी विभाजन
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      60:40
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        अनुपात
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <NPSClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-nps-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  टैक्स बचत टिप
                </strong>
                NPS धारा 80C की ₹1.5 लाख सीमा से अधिक धारा 80CCD(1B) के तहत
                अतिरिक्त ₹50,000 टैक्स कटौती प्रदान करती है। इसका मतलब कुल ₹2
                लाख कटौती संभव है - सभी रिटायरमेंट उत्पादों में सर्वोच्च।
              </AlertDescription>
            </Alert>

            {/* ✅ NPS FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    NPS गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      NPS कॉर्पस गणना रिटायरमेंट पर लागू 60:40 निकासी नियम के
                      साथ मानक SIP भविष्य मूल्य फॉर्मूला का उपयोग करती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          रिटायरमेंट पर कुल कॉर्पस
                        </div>
                        <div className="text-lg font-serif">
                          FV = P × [(1 + r)<sup>n</sup> - 1] / r × (1 + r)
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          निकासी वितरण
                        </div>
                        <div className="text-lg font-serif space-y-1">
                          <div>एकमुश्त = FV × 0.60 (टैक्स-फ्री)</div>
                          <div>वार्षिकी कॉर्पस = FV × 0.40 (पेंशन के लिए)</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहाँ:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          FV
                        </span>
                        <span>
                          = रिटायरमेंट आयु 60 पर NPS कॉर्पस का भविष्य मूल्य
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          P
                        </span>
                        <span>= ₹ में मासिक योगदान/निवेश राशि</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          r
                        </span>
                        <span>= मासिक रिटर्न दर (वार्षिक दर ÷ 12 ÷ 100)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = निवेश के कुल महीने [(60 - वर्तमान आयु) × 12]
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>60:40 नियम:</strong> रिटायरमेंट पर, न्यूनतम 60%
                        को टैक्स-फ्री एकमुश्त के रूप में निकाला जा सकता है। शेष
                        40% को जीवन भर मासिक पेंशन (कर योग्य) के लिए बीमा कंपनी
                        के साथ वार्षिकी में निवेश करना होगा।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: 30 वर्षीय ₹10,000/माह निवेश कर रहा है
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>वर्तमान आयु:</strong>
                        </div>
                        <div>30 वर्ष</div>

                        <div>
                          <strong>रिटायरमेंट आयु:</strong>
                        </div>
                        <div>60 वर्ष</div>

                        <div>
                          <strong>निवेश अवधि:</strong>
                        </div>
                        <div>30 वर्ष (360 महीने)</div>

                        <div>
                          <strong>मासिक निवेश (P):</strong>
                        </div>
                        <div>₹10,000</div>

                        <div>
                          <strong>अपेक्षित रिटर्न:</strong>
                        </div>
                        <div>10% प्रति वर्ष</div>

                        <div>
                          <strong>वार्षिकी दर:</strong>
                        </div>
                        <div>6% प्रति वर्ष</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक रिटर्न दर की गणना करें
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          r = 10% ÷ 12 ÷ 100 = 0.00833
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: आयु 60 पर कुल कॉर्पस की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 10,000 × [(1.00833)<sup>360</sup> - 1] /
                            0.00833 × 1.00833
                          </div>
                          <div>
                            FV = 10,000 × [19.837 - 1] / 0.00833 × 1.00833
                          </div>
                          <div>FV = 10,000 × 2262.04 × 1.00833</div>
                          <div>FV ≈ ₹2,28,08,400</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: 60:40 निकासी नियम लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            एकमुश्त (60%) = 2,28,08,400 × 0.60 = ₹1,36,85,040
                          </div>
                          <div>
                            वार्षिकी कॉर्पस (40%) = 2,28,08,400 × 0.40 =
                            ₹91,23,360
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 4: वार्षिकी से मासिक पेंशन की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>मासिक पेंशन = 91,23,360 × (6% ÷ 12)</div>
                          <div>मासिक पेंशन = 91,23,360 × 0.005</div>
                          <div>मासिक पेंशन ≈ ₹45,617</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            रिटायरमेंट लाभ सारांश:
                          </div>
                          <div className="flex justify-between">
                            <span>कुल निवेश (30 वर्ष):</span>
                            <strong className="text-slate-900">
                              ₹36,00,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>60 पर कुल कॉर्पस:</span>
                            <strong className="text-emerald-700">
                              ₹2,28,08,400
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कुल रिटर्न:</span>
                            <strong className="text-emerald-700">
                              ₹1,92,08,400
                            </strong>
                          </div>
                          <div className="border-t pt-2 mt-2 space-y-1">
                            <div className="flex justify-between text-base">
                              <span className="font-semibold">
                                एकमुश्त (टैक्स-फ्री):
                              </span>
                              <strong className="text-emerald-700">
                                ₹1,36,85,040
                              </strong>
                            </div>
                            <div className="flex justify-between text-base">
                              <span className="font-semibold">
                                मासिक पेंशन (जीवन भर):
                              </span>
                              <strong className="text-emerald-700">₹45,617</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300">
                        <p className="text-xs text-slate-600">
                          <strong>टैक्स बचत:</strong> सालाना ₹1.2L निवेश करने से
                          टैक्स में ₹36,000/वर्ष की बचत होती है (30% ब्रैकेट
                          पर)। 30 वर्षों में, कुल टैक्स बचत = ₹10.8 लाख!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Investment vs Returns */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      कुल निवेश बनाम कुल रिटर्न
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="p-3 bg-white rounded border border-lime-200">
                        <div className="font-mono text-sm space-y-1">
                          <div>कुल निवेश = मासिक SIP × कुल महीने</div>
                          <div>कुल निवेश = ₹10,000 × 360 = ₹36,00,000</div>
                          <div className="mt-2">
                            कुल रिटर्न = कुल कॉर्पस - कुल निवेश
                          </div>
                          <div>
                            कुल रिटर्न = ₹2,28,08,400 - ₹36,00,000 =
                            ₹1,92,08,400
                          </div>
                          <div className="mt-2 font-semibold text-emerald-700">
                            रिटर्न = निवेश का 533% (5.3x वृद्धि!)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    NPS रिटर्न बाजार-लिंक्ड हैं और परिसंपत्ति आवंटन
                    (इक्विटी/कॉर्पोरेट/सरकारी) पर निर्भर करते हैं। अपेक्षित
                    रिटर्न: आक्रामक (10-12%), मध्यम (8-10%), रूढ़िवादी (7-9%)।
                    वास्तविक रिटर्न भिन्न हो सकते हैं।
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
                    संपूर्ण रिटायरमेंट की योजना बनाना चाहते हैं?
                  </strong>
                  <Link
                    href="/hi/retirement-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      व्यापक योजना के लिए रिटायरमेंट कैलकुलेटर का उपयोग करें
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
                  राष्ट्रीय पेंशन प्रणाली (NPS) क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS की मुख्य विशेषताएं
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={keyFeaturesContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-nps-mid-content"
                  type="square"
                  label="विज्ञापन"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS खाता प्रकार: टियर 1 बनाम टियर 2
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={npsTypesContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS निवेश विकल्प और परिसंपत्ति आवंटन
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={investmentChoicesContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS बनाम अन्य रिटायरमेंट उत्पाद
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">विशेषता</TableHead>
                        <TableHead className="text-left">NPS</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">EPF</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          अपेक्षित रिटर्न
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          10-12% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8.25% प्रति वर्ष
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          टैक्स कटौती
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹2L (80C + 80CCD(1B))
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L (80C)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L (80C)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          मैच्योरिटी कराधान
                        </TableCell>
                        <TableCell className="text-slate-700">
                          60% टैक्स-फ्री, 40% कर योग्य
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          100% टैक्स-फ्री (EEE)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          100% टैक्स-फ्री (EEE)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          लॉक-इन अवधि
                        </TableCell>
                        <TableCell className="text-slate-700">
                          आयु 60 तक
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          रिटायरमेंट तक
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          खर्च अनुपात
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          0.01%
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          0% (कोई शुल्क नहीं)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          0% (कोई शुल्क नहीं)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पात्रता
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          सभी नागरिक 18-70
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          सभी भारतीय नागरिक
                        </TableCell>
                        <TableCell className="text-slate-700">
                          केवल वेतनभोगी
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          निवेश प्रकार
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          बाजार-लिंक्ड (E/C/G)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          निश्चित (सरकारी बॉन्ड)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          निश्चित (EPF + ऋण)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पेंशन सुविधा
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हाँ (40% वार्षिकी)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          नहीं (केवल एकमुश्त)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          वैकल्पिक (EPS)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          सबसे अच्छा है
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          टैक्स बचत + वृद्धि
                        </TableCell>
                        <TableCell className="text-slate-700">
                          सुरक्षा + टैक्स-फ्री
                        </TableCell>
                        <TableCell className="text-slate-700">
                          वेतनभोगी के लिए अनिवार्य
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>विशेषज्ञ मत:</strong> NPS अतिरिक्त टैक्स बचत
                    (80CCD(1B) के तहत ₹50k अतिरिक्त) और उच्च बाजार-लिंक्ड रिटर्न
                    के लिए सर्वश्रेष्ठ है। संतुलित रिटायरमेंट पोर्टफोलियो के लिए
                    PPF/EPF के साथ संयोजन करें - सुरक्षा के लिए PPF, वृद्धि के
                    लिए NPS का उपयोग करें।
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS के संपूर्ण टैक्स लाभ
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxBenefitsContent} />
                </div>
              </section>

              {/* How to Open */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS खाता कैसे खोलें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>eNPS पोर्टल के माध्यम से ऑनलाइन:</strong>{' '}
                    enps.nsdl.com पर जाएं, &quot;Open Your NPS Account&quot; पर
                    क्लिक करें, तत्काल खाता खोलने के लिए आधार, पैन और बैंक विवरण
                    प्रदान करें।
                  </li>
                  <li>
                    <strong>बैंक के माध्यम से:</strong> किसी भी बैंक शाखा (SBI,
                    HDFC, ICICI, Axis, आदि) पर जाएं, KYC दस्तावेजों के साथ NPS
                    फॉर्म भरें, सक्रिय करने के लिए न्यूनतम ₹500 का भुगतान करें।
                  </li>
                  <li>
                    <strong>POP-SP (Point of Presence) के माध्यम से:</strong>{' '}
                    सहायता प्राप्त खाता खोलने के लिए Karvy, CAMS, NSDL जैसे
                    अधिकृत मध्यस्थों से संपर्क करें।
                  </li>
                  <li>
                    <strong>निवेश रणनीति चुनें:</strong> ऑटो चॉइस (आयु-आधारित)
                    या एक्टिव चॉइस (मैनुअल आवंटन) और फंड मैनेजर चुनें।
                  </li>
                  <li>
                    <strong>PRAN प्राप्त करें:</strong> ईमेल/SMS के माध्यम से
                    स्थायी रिटायरमेंट खाता संख्या (PRAN) प्राप्त करें - सभी
                    भविष्य के योगदान के लिए इसका उपयोग करें।
                  </li>
                  <li>
                    <strong>ऑटो-डेबिट सेट करें:</strong> योगदान को स्वचालित करने
                    के लिए मासिक/त्रैमासिक SIP के लिए बैंक खाता लिंक करें।
                  </li>
                </ol>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस NPS कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    मासिक निवेश राशि दर्ज करें (न्यूनतम ₹500, अनुशंसित
                    ₹5,000-₹15,000)।
                  </li>
                  <li>
                    वर्तमान आयु इनपुट करें (18-59 वर्ष) - रिटायरमेंट आयु 60 पर
                    निश्चित है।
                  </li>
                  <li>
                    परिसंपत्ति आवंटन के आधार पर अपेक्षित रिटर्न दर (5-15%) सेट
                    करें: आक्रामक (10-12%), मध्यम (8-10%), रूढ़िवादी (7-9%)।
                  </li>
                  <li>
                    पेंशन गणना के लिए वार्षिकी दर (4-10%, आमतौर पर 6%) समायोजित
                    करने के लिए <strong>&quot;उन्नत विकल्प दिखाएं&quot;</strong>{' '}
                    पर क्लिक करें।
                  </li>
                  <li>
                    रिटायरमेंट आयु 60 पर कुल कॉर्पस, कुल निवेश और रिटर्न देखें।
                  </li>
                  <li>
                    60:40 निकासी विभाजन जांचें: टैक्स-फ्री एकमुश्त और मासिक
                    पेंशन राशि।
                  </li>
                  <li>
                    वार्षिकी कॉर्पस (40%) की समीक्षा करें जो जीवन भर मासिक पेंशन
                    उत्पन्न करेगा।
                  </li>
                  <li>
                    भविष्य के संदर्भ और पारिवारिक चर्चा के लिए योजना सहेजें या
                    WhatsApp पर साझा करें।
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित रिटायरमेंट योजना उपकरण
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
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
                              आरामदायक जीवन के लिए आवश्यक संपूर्ण रिटायरमेंट
                              कॉर्पस की गणना करें।
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

                  <Link href="/hi/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              PPF कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              100% टैक्स-फ्री रिटर्न के साथ पब्लिक प्रॉविडेंट
                              फंड की गणना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>PPF की गणना करें</span>
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
              <AdSlot id="hi-nps-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="hi-nps-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-nps-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-nps-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
