import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EPFClient from '@/app/epf-calculator/EPFClient';
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
import { EPFSchemas } from '@/components/schemas/EPFSchemas';
import { Info, Briefcase, ArrowRight, Shield, TrendingUp } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'EPF कैलकुलेटर 2026 – कर्मचारी भविष्य निधि रिटर्न कैलकुलेट करें',
  description:
    '8.25% ब्याज दर के साथ EPF मैच्योरिटी राशि की गणना करें। कर्मचारी और नियोक्ता योगदान के साथ मुफ्त EPF कैलकुलेटर। EEE स्टेटस के तहत 100% टैक्स-फ्री निकासी।',
  keywords: [
    'EPF Calculator Hindi',
    'Employee Provident Fund Calculator Hindi',
    'PF Calculator Hindi',
    'EPF Interest Calculator Hindi',
    'EPF Maturity Calculator Hindi',
    'EPF Withdrawal Calculator Hindi',
    'EPFO Calculator Hindi',
    'Provident Fund Calculator Hindi',
    'EPF Balance Calculator Hindi',
    'EPF Tax Calculator Hindi',
    'भविष्य निधि कैलकुलेटर',
    'कर्मचारी भविष्य निधि कैलकुलेटर'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/epf-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/epf-calculator/',
    },
  },
  openGraph: {
    title: 'EPF कैलकुलेटर 2026 – अपनी भविष्य निधि कॉर्पस की गणना करें',
    description:
      '8.25% ब्याज दर के साथ मुफ्त EPF कैलकुलेटर। कर्मचारी और नियोक्ता योगदान, मैच्योरिटी राशि और टैक्स-फ्री निकासी लाभों की गणना करें।',
    url: 'https://fincado.com/hi/epf-calculator/',
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

export default function EPFCalculatorPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>कर्मचारी भविष्य निधि (EPF)</strong> भारत में वेतनभोगी कर्मचारियों के लिए एक अनिवार्य रिटायरमेंट बचत योजना है, जिसे कर्मचारी भविष्य निधि संगठन (EPFO) द्वारा प्रबंधित किया जाता है। कर्मचारी और नियोक्ता दोनों मासिक रूप से मूल वेतन + DA का 12% योगदान करते हैं, जिससे <strong>टैक्स-फ्री कंपाउंडिंग</strong> के साथ एक महत्वपूर्ण रिटायरमेंट कॉर्पस बनता है।
    </p>
    <p class="mt-4">
      EPF <strong>8.25% वार्षिक ब्याज</strong> (वित्त वर्ष 2025-26) प्रदान करती है, जो अधिकांश निश्चित आय उत्पादों से अधिक है और EEE (Exempt-Exempt-Exempt) स्टेटस के तहत पूरी तरह से टैक्स-फ्री है। यह योजना भारत भर में 7+ करोड़ कर्मचारियों को कवर करती है, जो इसे देश का सबसे बड़ा रिटायरमेंट बचत कार्यक्रम बनाती है।
    </p>
  `);

  const keyFeaturesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>अनिवार्य योजना:</strong> 20+ कर्मचारियों वाले प्रतिष्ठानों पर लागू (मूल + DA ≤ ₹15,000)</li>
      <li><strong>दोहरा योगदान:</strong> कर्मचारी 12% + नियोक्ता 12% (3.67% EPF + 8.33% EPS)</li>
      <li><strong>उच्च ब्याज:</strong> 8.25% प्रति वर्ष (वित्त वर्ष 2025-26) मासिक चक्रवृद्धि के साथ</li>
      <li><strong>EEE स्टेटस:</strong> योगदान कटौती योग्य, ब्याज टैक्स-फ्री, निकासी टैक्स-फ्री</li>
      <li><strong>तरलता विकल्प:</strong> शर्तों के बाद आवास, चिकित्सा, शिक्षा के लिए आंशिक निकासी</li>
      <li><strong>पोर्टेबिलिटी:</strong> UAN (यूनिवर्सल अकाउंट नंबर) के माध्यम से नौकरियों में EPF स्थानांतरित करें</li>
      <li><strong>बीमा कवर:</strong> EDLI (एम्प्लॉयी डिपॉजिट लिंक्ड इंश्योरेंस) ₹7 लाख तक</li>
      <li><strong>पेंशन लाभ:</strong> EPS (एम्प्लॉयी पेंशन स्कीम) नियोक्ता के 8.33% से मासिक पेंशन प्रदान करती है</li>
    </ul>
  `);

  const contributionBreakdownContent = autoLinkContent(`
    <p>
      कर्मचारी और नियोक्ता के बीच EPF योगदान विभाजन को समझें:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">कर्मचारी योगदान (मूल + DA का 12%):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>100% रिटायरमेंट कॉर्पस के लिए EPF खाते में जाता है</li>
      <li>धारा 80C के तहत ₹1.5 लाख तक कटौती योग्य</li>
      <li>स्वैच्छिक VPF (वॉलंटरी प्रॉविडेंट फंड) 12% से अधिक योगदान बढ़ा सकता है</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">नियोक्ता योगदान (मूल + DA का 12%):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>3.67% EPF में जाता है:</strong> रिटायरमेंट कॉर्पस के लिए कर्मचारी के EPF खाते में जोड़ा जाता है</li>
      <li><strong>8.33% EPS में जाता है:</strong> रिटायरमेंट के बाद मासिक पेंशन के लिए एम्प्लॉयी पेंशन स्कीम (EPF कॉर्पस में शामिल नहीं)</li>
      <li><strong>0.5% EDLI में जाता है:</strong> जीवन बीमा के लिए एम्प्लॉयी डिपॉजिट लिंक्ड इंश्योरेंस</li>
      <li><strong>0.01% प्रशासनिक शुल्क:</strong> EPFO प्रशासनिक खर्च</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>उदाहरण:</strong> यदि मूल वेतन = ₹40,000, कर्मचारी ₹4,800 (12%) योगदान करता है, नियोक्ता EPF में ₹1,468 (3.67%) जोड़ता है। कुल ₹6,268/माह EPF कॉर्पस बनाता है। नियोक्ता का ₹3,332 (8.33%) पेंशन के लिए EPS में जाता है।
      </p>
    </div>
  `);

  const withdrawalRulesContent = autoLinkContent(`
    <p>
      EPF रोजगार अवधि और उद्देश्य के आधार पर लचीले निकासी विकल्प प्रदान करती है:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. पूर्ण निकासी (100% टैक्स-फ्री):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>रिटायरमेंट (आयु 58) या 2 महीने बेरोजगारी के साथ इस्तीफे के बाद</li>
      <li>ब्याज सहित 100% कॉर्पस EEE स्टेटस के तहत टैक्स-फ्री है</li>
      <li>यदि निरंतर रोजगार ≥5 वर्ष है तो कोई TDS नहीं</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. आंशिक निकासी (अग्रिम):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>चिकित्सा आपातकाल:</strong> अस्पताल में भर्ती (स्वयं/परिवार) के लिए 6 महीने के वेतन तक निकालें</li>
      <li><strong>घर खरीद/निर्माण:</strong> घर खरीदने/बनाने के लिए 5 वर्ष के बाद 90% कॉर्पस तक</li>
      <li><strong>होम लोन चुकौती:</strong> आवास ऋण चुकाने के लिए 90% कॉर्पस तक</li>
      <li><strong>शादी/शिक्षा:</strong> स्वयं/बच्चों के लिए 7 वर्ष के बाद 50% कॉर्पस तक</li>
      <li><strong>रिटायरमेंट से पहले (1 वर्ष पहले):</strong> 90% कॉर्पस तक निकाला जा सकता है</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. नौकरी बदलने पर स्थानांतरण:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>UAN के माध्यम से पुराने नियोक्ता से नए नियोक्ता को EPF स्थानांतरित करें</li>
      <li>EPFO पोर्टल के माध्यम से ऑनलाइन स्थानांतरण - कोई कागजी कार्रवाई की आवश्यकता नहीं</li>
      <li>5 वर्ष के टैक्स छूट नियम के लिए निरंतरता बनाए रखता है</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">4. समय से पहले निकासी पर टैक्स:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>5 वर्ष की निरंतर सेवा से पहले निकासी पर TDS आकर्षित करता है (पैन उपलब्ध होने पर 10%, पैन नहीं होने पर 34.6%)</li>
      <li>यदि निकासी का कारण: अस्वस्थता, व्यवसाय बंद, रोजगार समाप्ति हो तो TDS लागू नहीं</li>
      <li>5 वर्ष से पहले निकाले जाने पर अर्जित ब्याज भी कर योग्य हो जाता है</li>
    </ul>
  `);

  const vpfContent = autoLinkContent(`
    <p>
      <strong>स्वैच्छिक भविष्य निधि (VPF)</strong> कर्मचारियों को उच्च रिटायरमेंट कॉर्पस के लिए EPF में अनिवार्य 12% से अधिक योगदान करने की अनुमति देती है:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>उच्च योगदान:</strong> मूल वेतन का 100% तक योगदान करें (अनिवार्य 12% से अधिक)</li>
      <li><strong>समान ब्याज दर:</strong> VPF मासिक चक्रवृद्धि के साथ नियमित EPF के समान 8.25% अर्जित करता है</li>
      <li><strong>टैक्स कटौती:</strong> VPF योगदान 80C के तहत कटौती योग्य (₹1.5L सीमा के भीतर)</li>
      <li><strong>कोई नियोक्ता मिलान नहीं:</strong> नियोक्ता VPF पर अतिरिक्त राशि का योगदान नहीं करता है</li>
      <li><strong>समान निकासी नियम:</strong> VPF EPF के समान नियमों का पालन करती है - 5 वर्ष के बाद टैक्स-फ्री</li>
      <li><strong>FD से अधिक रिटर्न:</strong> VPF @8.25% टैक्स-फ्री ब्याज के साथ बैंक FD (6-7%) को मात देती है</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>VPF किसे उपयोग करनी चाहिए:</strong> रूढ़िवादी निवेशक जो FD से अधिक सुरक्षित, टैक्स-फ्री रिटर्न चाहते हैं। उच्च टैक्स ब्रैकेट (30%) में उन लोगों के लिए आदर्श जिन्होंने अन्य 80C उपकरणों को समाप्त कर दिया है और गारंटीड रिटर्न चाहते हैं।
      </p>
    </div>
  `);

  const faqItems = [
    {
      id: 'epf-faq-1',
      question: 'कर्मचारी भविष्य निधि (EPF) क्या है?',
      answer:
        'EPF वेतनभोगी कर्मचारियों के लिए एक अनिवार्य रिटायरमेंट बचत योजना है। कर्मचारी और नियोक्ता दोनों मासिक रूप से मूल वेतन का 12% योगदान करते हैं। EPF मासिक चक्रवृद्धि के साथ 8.25% ब्याज (वित्त वर्ष 2025-26) अर्जित करती है। 5 वर्ष के बाद निकासी EEE स्टेटस के तहत 100% टैक्स-फ्री है।',
    },
    {
      id: 'epf-faq-2',
      question: 'EPF योगदान की गणना कैसे की जाती है?',
      answer:
        'EPF योगदान = (मूल वेतन + महंगाई भत्ता) का 12%। कर्मचारी 12% योगदान करता है जो EPF खाते में जाता है। नियोक्ता 12% योगदान करता है: 3.67% EPF में, 8.33% EPS (पेंशन) में, 0.5% EDLI (बीमा) में, 0.01% प्रशासनिक शुल्क। कुल EPF कॉर्पस में कर्मचारी 12% + नियोक्ता 3.67% = 15.67% मासिक मिलता है।',
    },
    {
      id: 'epf-faq-3',
      question: 'वर्तमान EPF ब्याज दर क्या है?',
      answer:
        'वर्तमान EPF ब्याज दर वित्त वर्ष 2025-26 के लिए 8.25% प्रति वर्ष है। ब्याज की गणना मासिक की जाती है लेकिन EPF खाते में वार्षिक रूप से जमा की जाती है। EPFO हर वित्तीय वर्ष EPF दर की समीक्षा और घोषणा करता है। ऐतिहासिक दरें: वित्त वर्ष 2024-25 (8.25%), वित्त वर्ष 2023-24 (8.15%), वित्त वर्ष 2022-23 (8.10%)।',
    },
    {
      id: 'epf-faq-4',
      question: 'क्या EPF निकासी टैक्स-फ्री है?',
      answer:
        'EPF EEE (Exempt-Exempt-Exempt) स्टेटस का पालन करती है: (1) योगदान 80C के तहत कटौती योग्य, (2) अर्जित ब्याज टैक्स-फ्री है, (3) 5 वर्ष की निरंतर सेवा के बाद निकासी 100% टैक्स-फ्री है। 5 वर्ष से पहले समय से पहले निकासी TDS आकर्षित करती है (पैन के साथ 10%, पैन के बिना 34.6%) और ब्याज कर योग्य हो जाता है।',
    },
    {
      id: 'epf-faq-5',
      question: 'क्या मैं 5 वर्ष से पहले EPF निकाल सकता हूँ?',
      answer:
        'हाँ, लेकिन यह टैक्स आकर्षित करता है। 5 वर्ष की सेवा से पहले निकासी कॉर्पस को कर योग्य बनाती है (पैन होने पर 10% TDS, पैन नहीं होने पर 34.6%)। बिना टैक्स के अपवाद: अस्वस्थता, व्यवसाय बंद, नियोक्ता बंद होने के कारण नौकरी समाप्ति। विशिष्ट कार्यकाल के बाद आवास, चिकित्सा, शिक्षा के लिए आंशिक निकासी की अनुमति है।',
    },
    {
      id: 'epf-faq-6',
      question: 'EPF और EPS में क्या अंतर है?',
      answer:
        'EPF (एम्प्लॉयी प्रॉविडेंट फंड) कर्मचारी 12% + नियोक्ता 3.67% से रिटायरमेंट कॉर्पस है। रिटायरमेंट पर एकमुश्त निकासी। EPS (एम्प्लॉयी पेंशन स्कीम) नियोक्ता के 8.33% से मासिक पेंशन है। पेंशन पात्रता के लिए न्यूनतम 10 वर्ष की सेवा। EPF कॉर्पस है, EPS आजीवन मासिक आय है।',
    },
    {
      id: 'epf-faq-7',
      question: 'नए नियोक्ता को EPF कैसे स्थानांतरित करें?',
      answer:
        'UAN का उपयोग करके EPFO पोर्टल में लॉगिन करें → सेवाएं → एक सदस्य एक EPF खाता → पुराने और नए नियोक्ता का चयन करें → दावा सबमिट करें। स्थानांतरण ऑनलाइन, स्वचालित और तत्काल है। कोई कागजी कार्रवाई की आवश्यकता नहीं। 5 वर्ष के टैक्स छूट के लिए सेवा निरंतरता बनाए रखता है। UAN का उपयोग करके ऑनलाइन स्थिति जांच सकते हैं।',
    },
    {
      id: 'epf-faq-8',
      question: 'VPF (स्वैच्छिक भविष्य निधि) क्या है?',
      answer:
        'VPF EPF में अनिवार्य 12% से अधिक योगदान करने की अनुमति देती है (मूल वेतन का 100% तक)। टैक्स-फ्री रिटर्न के साथ EPF के समान 8.25% ब्याज अर्जित करती है। 80C कटौती के लिए पात्र (₹1.5L सीमा के भीतर)। VPF पर कोई नियोक्ता मिलान नहीं। FD से अधिक सुरक्षित, टैक्स-फ्री रिटर्न चाहने वाले रूढ़िवादी निवेशकों के लिए सर्वश्रेष्ठ।',
    },
    {
      id: 'epf-faq-9',
      question: 'क्या मैं EPF बैलेंस ऑनलाइन चेक कर सकता हूँ?',
      answer:
        'हाँ, कई तरीके: (1) EPFO पोर्टल - unifiedportal-mem.epfindia.gov.in पर UAN से लॉगिन करें, (2) Umang ऐप - UAN के माध्यम से डाउनलोड और जांचें, (3) SMS - EPFOHO UAN ENG को 7738299899 पर भेजें, (4) मिस्ड कॉल - पंजीकृत मोबाइल से 9966044425 पर मिस्ड कॉल दें। 24/7 तत्काल बैलेंस जांच।',
    },
    {
      id: 'epf-faq-10',
      question: 'मृत्यु के बाद EPF का क्या होता है?',
      answer:
        'EPF कॉर्पस तुरंत नॉमिनी (पति/पत्नी, बच्चे, या पंजीकृत नॉमिनी) को जाता है। नॉमिनी को मृत्यु प्रमाण पत्र, दावा फॉर्म (फॉर्म 20), और KYC जमा करना होगा। ब्याज सहित पूर्ण कॉर्पस टैक्स-फ्री भुगतान किया जाता है। EDLI (बीमा) भी नॉमिनी को ₹7 लाख (अधिकतम) का भुगतान करती है। मृत्यु दावा निकासी पर कोई TDS नहीं।',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'EPF कैलकुलेटर',
            url: 'https://fincado.com/hi/epf-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="EPF (कर्मचारी भविष्य निधि) कैलकुलेटर"
        description="8.25% ब्याज दर के साथ EPF मैच्योरिटी राशि की गणना करें। 100% टैक्स-फ्री निकासी के साथ कर्मचारी और नियोक्ता योगदान।"
        url="https://fincado.com/hi/epf-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <EPFSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EPF कैलकुलेटर" />
            <LanguageToggle path="/epf-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                EPF कैलकुलेटर (कर्मचारी भविष्य निधि)
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                8.25% टैक्स-फ्री रिटर्न के साथ अपनी रिटायरमेंट कॉर्पस की गणना
                करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-epf-top" type="leaderboard" />
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
                      ब्याज दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      वित्त वर्ष 2025-26 (मासिक चक्रवृद्धि)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.25%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      टैक्स स्टेटस
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      योगदान, ब्याज, निकासी
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      EEE
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        छूट
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      योगदान
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      कर्मचारी + नियोक्ता EPF में
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      15.67%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        कुल
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <EPFClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-epf-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  टैक्स-फ्री लाभ
                </strong>
                EPF EEE स्टेटस का पालन करती है - योगदान टैक्स-कटौती योग्य (80C),
                अर्जित ब्याज टैक्स-फ्री है, और 5 वर्ष के बाद निकासी 100%
                टैक्स-मुक्त है। भारत में सबसे अच्छे रिटायरमेंट बचत उपकरणों में
                से एक!
              </AlertDescription>
            </Alert>

            {/* EPF FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    EPF गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      EPF कॉर्पस की गणना कर्मचारी और नियोक्ता दोनों से मासिक
                      योगदान के साथ चक्रवृद्धि ब्याज फॉर्मूला का उपयोग करके की
                      जाती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          मासिक योगदान
                        </div>
                        <div className="text-lg font-serif space-y-1">
                          <div>कर्मचारी योगदान = (मूल + DA) × 12%</div>
                          <div>नियोक्ता योगदान (EPF) = (मूल + DA) × 3.67%</div>
                          <div>कुल मासिक = कर्मचारी + नियोक्ता</div>
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          EPF मैच्योरिटी मूल्य
                        </div>
                        <div className="text-lg font-serif">
                          FV = M × [(1 + r)<sup>n</sup> - 1] / r × (1 + r)
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
                          = भविष्य मूल्य (₹ में EPF मैच्योरिटी कॉर्पस)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          M
                        </span>
                        <span>
                          = कुल मासिक योगदान (₹ में कर्मचारी + नियोक्ता)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          r
                        </span>
                        <span>= मासिक ब्याज दर (वार्षिक दर ÷ 12 ÷ 100)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          n
                        </span>
                        <span>= रोजगार के कुल महीने (वर्ष × 12)</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> नियोक्ता का 8.33% योगदान मासिक
                        पेंशन के लिए EPS (एम्प्लॉयी पेंशन स्कीम) में जाता है,
                        EPF कॉर्पस गणना में शामिल नहीं है।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: 20 वर्षों के लिए ₹40,000 मूल वेतन
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मूल वेतन + DA:</strong>
                        </div>
                        <div>₹40,000/माह</div>

                        <div>
                          <strong>रोजगार अवधि:</strong>
                        </div>
                        <div>20 वर्ष (240 महीने)</div>

                        <div>
                          <strong>EPF ब्याज दर:</strong>
                        </div>
                        <div>8.25% प्रति वर्ष</div>

                        <div>
                          <strong>कर्मचारी योगदान:</strong>
                        </div>
                        <div>12%</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक योगदान की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>कर्मचारी = 40,000 × 12% = ₹4,800/माह</div>
                          <div>
                            नियोक्ता (EPF) = 40,000 × 3.67% = ₹1,468/माह
                          </div>
                          <div>कुल मासिक (M) = 4,800 + 1,468 = ₹6,268</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: मासिक ब्याज दर की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>r = 8.25% ÷ 12 ÷ 100 = 0.006875</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: कुल महीनों की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>n = 20 वर्ष × 12 = 240 महीने</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 4: भविष्य मूल्य फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 6,268 × [(1.006875)<sup>240</sup> - 1] /
                            0.006875 × 1.006875
                          </div>
                          <div>
                            FV = 6,268 × [5.109 - 1] / 0.006875 × 1.006875
                          </div>
                          <div>FV = 6,268 × 597.61 × 1.006875</div>
                          <div>FV ≈ ₹37,68,900</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            EPF कॉर्पस विवरण:
                          </div>
                          <div className="flex justify-between">
                            <span>कुल निवेश (20 वर्ष):</span>
                            <strong className="text-slate-900">
                              ₹15,04,320
                            </strong>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600">
                            <span className="ml-4">कर्मचारी हिस्सा (12%):</span>
                            <span>₹11,52,000</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600">
                            <span className="ml-4">
                              नियोक्ता हिस्सा (3.67%):
                            </span>
                            <span>₹3,52,320</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>कुल EPF कॉर्पस:</span>
                            <strong className="text-emerald-700">
                              ₹37,68,900
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कुल ब्याज अर्जित:</span>
                            <strong className="text-emerald-700">
                              ₹22,64,580
                            </strong>
                          </div>
                          <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
                            <span className="text-emerald-900">रिटर्न:</span>
                            <strong className="text-emerald-700">150%</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300">
                        <p className="text-xs text-slate-600">
                          <strong>टैक्स लाभ:</strong> 5 वर्ष के बाद निकासी पर
                          सभी ₹37.69 लाख 100% टैक्स-फ्री हैं। इसके अतिरिक्त,
                          ₹57,600 का वार्षिक योगदान धारा 80C के तहत कटौती योग्य
                          है, जिससे टैक्स में ₹17,280/वर्ष की बचत होती है (30%
                          ब्रैकेट)।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contribution Split */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      12% नियोक्ता योगदान विभाजन को समझना
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        नियोक्ता का 12% योगदान कई योजनाओं में वितरित किया जाता
                        है:
                      </p>
                      <div className="p-3 bg-white rounded border border-lime-200 mt-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>EPF (भविष्य निधि):</span>
                            <strong>3.67%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>EPS (पेंशन योजना):</span>
                            <strong>8.33%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>EDLI (जीवन बीमा):</span>
                            <strong>0.50%</strong>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600">
                            <span>प्रशासनिक शुल्क:</span>
                            <strong>0.01%</strong>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-semibold">
                            <span>कुल:</span>
                            <strong>12.51%</strong>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        नियोक्ता से केवल 3.67% EPF कॉर्पस में जाता है। EPS 8.33%
                        अलग से मासिक पेंशन प्रदान करती है।
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    EPF ब्याज दर की EPFO द्वारा वार्षिक समीक्षा की जाती है।
                    ऐतिहासिक दरें और वास्तविक कॉर्पस सरकारी अधिसूचनाओं के आधार
                    पर भिन्न हो सकते हैं। गणना बिना निकासी के निरंतर रोजगार
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
                    उच्च रिटायरमेंट कॉर्पस चाहते हैं?
                  </strong>
                  <Link
                    href="/hi/retirement-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      पूर्ण रिटायरमेंट रणनीति की योजना बनाने के लिए रिटायरमेंट
                      कैलकुलेटर का उपयोग करें
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* FULL SEO ARTICLE */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  कर्मचारी भविष्य निधि (EPF) क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF की मुख्य विशेषताएं
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={keyFeaturesContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-epf-mid-content"
                  type="square"
                  label="विज्ञापन"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF योगदान विवरण: कर्मचारी बनाम नियोक्ता
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={contributionBreakdownContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF बनाम PPF बनाम NPS तुलना
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">विशेषता</TableHead>
                        <TableHead className="text-left">EPF</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">NPS</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          ब्याज दर
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          8.25% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          10-12% प्रति वर्ष
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          टैक्स स्टेटस
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% टैक्स-फ्री)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% टैक्स-फ्री)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          EET (60% टैक्स-फ्री)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          लॉक-इन अवधि
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5 वर्ष (टैक्स छूट के लिए)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          आयु 60 तक
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          योगदान सीमा
                        </TableCell>
                        <TableCell className="text-slate-700">
                          मूल का 12% (अनिवार्य)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹500 - ₹1.5L/वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कोई सीमा नहीं
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          नियोक्ता योगदान
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हाँ (EPF में 3.67%)
                        </TableCell>
                        <TableCell className="text-slate-700">नहीं</TableCell>
                        <TableCell className="text-slate-700">
                          हाँ (सरकारी/कॉर्पोरेट के लिए)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          आंशिक निकासी
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हाँ (आवास, चिकित्सा)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          सीमित (5 वर्ष के बाद)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          सीमित (अधिकतम 25%)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पात्रता
                        </TableCell>
                        <TableCell className="text-slate-700">
                          केवल वेतनभोगी कर्मचारी
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          सभी भारतीय नागरिक
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          सभी नागरिक 18-70
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          निवेश प्रकार
                        </TableCell>
                        <TableCell className="text-slate-700">
                          निश्चित (सरकार समर्थित)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          निश्चित (सरकारी बॉन्ड)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          बाजार-लिंक्ड (E/C/G)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          सबसे अच्छा है
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          नियोक्ता के साथ वेतनभोगी
                        </TableCell>
                        <TableCell className="text-slate-700">
                          सुरक्षित टैक्स-फ्री बचत
                        </TableCell>
                        <TableCell className="text-slate-700">
                          अतिरिक्त ₹50k टैक्स लाभ
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>विशेषज्ञ निर्णय:</strong> नियोक्ता मिलान (3.67%),
                    उच्च ब्याज (8.25%), और 100% टैक्स-फ्री स्टेटस के कारण EPF
                    वेतनभोगी कर्मचारियों के लिए सर्वश्रेष्ठ है। अतिरिक्त ₹50k
                    टैक्स लाभ के लिए NPS और विविधीकरण के लिए PPF के साथ संयोजन
                    करें।
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF निकासी नियम और टैक्स प्रभाव
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalRulesContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  VPF (स्वैच्छिक भविष्य निधि) - अपनी बचत बढ़ाएं
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={vpfContent} />
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस EPF कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    अपना मासिक मूल वेतन + महंगाई भत्ता (DA) राशि दर्ज करें।
                  </li>
                  <li>
                    अपना योगदान प्रतिशत सेट करें (डिफ़ॉल्ट 12%, VPF के लिए बढ़ा
                    सकते हैं)।
                  </li>
                  <li>
                    अपेक्षित रोजगार अवधि वर्षों में इनपुट करें (5-40 वर्ष)।
                  </li>
                  <li>
                    EPF ब्याज दर समायोजित करने के लिए{' '}
                    <strong>&quot;उन्नत विकल्प दिखाएं&quot;</strong> पर क्लिक
                    करें (वर्तमान: वित्त वर्ष 2025-26 के लिए 8.25%)।
                  </li>
                  <li>
                    कर्मचारी और नियोक्ता हिस्से के विवरण के साथ रिटायरमेंट पर
                    अनुमानित EPF कॉर्पस देखें।
                  </li>
                  <li>अपनी ओर से और नियोक्ता की ओर से मासिक योगदान जांचें।</li>
                  <li>रोजगार अवधि में अर्जित कुल ब्याज की समीक्षा करें।</li>
                  <li>
                    भविष्य के संदर्भ के लिए अपनी EPF योजना सहेजें या WhatsApp पर
                    साझा करें।
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित रिटायरमेंट योजना उपकरण
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
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
                              7.1% टैक्स-फ्री रिटर्न के साथ पब्लिक प्रॉविडेंट
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
                              अतिरिक्त ₹50k टैक्स लाभ के साथ राष्ट्रीय पेंशन
                              प्रणाली।
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
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="hi-epf-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="hi-epf-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-epf-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-epf-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
