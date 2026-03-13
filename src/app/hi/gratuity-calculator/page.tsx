import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GratuityClient from '@/app/gratuity-calculator/GratuityClient';
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
import { GratuitySchemas } from '@/components/schemas/GratuitySchemas';
import { Info, ArrowRight, Shield, Award } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'ग्रेच्युटी कैलकुलेटर 2026 – ग्रेच्युटी राशि ऑनलाइन गणना करें',
  description:
    'ग्रेच्युटी अधिनियम 1972 के अनुसार ग्रेच्युटी राशि की गणना करें। कवर्ड और नॉन-कवर्ड कर्मचारियों के लिए ₹20 लाख टैक्स छूट के साथ मुफ्त कैलकुलेटर।',
  keywords: [
    'Gratuity Calculator Hindi',
    'ग्रेच्युटी कैलकुलेटर',
    'Gratuity Calculation Formula Hindi',
    'Payment of Gratuity Act Hindi',
    'Gratuity Amount Calculator Hindi',
    'Gratuity Eligibility Calculator Hindi',
    'Gratuity Tax Calculator Hindi',
    'ग्रेच्युटी गणना फॉर्मूला',
    'Gratuity Rules 2026 Hindi',
    'Employee Gratuity Calculator Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/gratuity-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/gratuity-calculator/',
    },
  },
  openGraph: {
    title: 'ग्रेच्युटी कैलकुलेटर 2026 – अपनी ग्रेच्युटी राशि की गणना करें',
    description:
      'ग्रेच्युटी अधिनियम 1972 के अनुसार मुफ्त ग्रेच्युटी कैलकुलेटर। ₹20 लाख टैक्स छूट के साथ 5+ वर्ष सेवा के लिए ग्रेच्युटी की गणना करें।',
    url: 'https://fincado.com/hi/gratuity-calculator/',
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

export default function GratuityCalculatorPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>ग्रेच्युटी</strong> नियोक्ता द्वारा कर्मचारियों को उनकी सेवाओं के लिए प्रशंसा के रूप में दी जाने वाली एकमुश्त राशि है। <strong>ग्रेच्युटी भुगतान अधिनियम, 1972</strong> द्वारा शासित, यह तब देय होती है जब कोई कर्मचारी 5 वर्ष की निरंतर सेवा पूरी करता है या सेवानिवृत्ति, इस्तीफा, मृत्यु या विकलांगता पर देय होती है।
    </p>
    <p class="mt-4">
      यह अधिनियम 10 या अधिक कर्मचारियों वाले प्रतिष्ठानों को कवर करता है। ग्रेच्युटी राशि की गणना <strong>अंतिम आहरित वेतन (मूल + DA)</strong> और सेवा के वर्षों के आधार पर की जाती है। आयकर अधिनियम की धारा 10(10) के तहत पहले ₹20 लाख की ग्रेच्युटी <strong>पूरी तरह से कर-मुक्त</strong> है, जो इसे एक मूल्यवान सेवानिवृत्ति लाभ बनाती है।
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <p>
      सभी कर्मचारी ग्रेच्युटी के पात्र नहीं हैं। यहां मुख्य पात्रता मानदंड हैं:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>न्यूनतम सेवा:</strong> 5 वर्ष की निरंतर सेवा पूरी की हो (240 कार्य दिवस/वर्ष 1 वर्ष के रूप में गिना जाता है)</li>
      <li><strong>अपवाद:</strong> मृत्यु या विकलांगता 5 वर्ष की आवश्यकता को हटा देती है - ग्रेच्युटी तुरंत देय होती है</li>
      <li><strong>कवरेज:</strong> प्रतिष्ठान में पिछले 12 महीनों में किसी भी समय 10+ कर्मचारी होने चाहिए</li>
      <li><strong>रोजगार का प्रकार:</strong> कारखानों, खानों, तेल क्षेत्रों, बागानों, बंदरगाहों, रेलवे, दुकानों, शैक्षिक संस्थानों पर लागू</li>
      <li><strong>इस्तीफा:</strong> 5 वर्ष के बाद स्वैच्छिक इस्तीफे पर भी ग्रेच्युटी देय होती है</li>
      <li><strong>दुराचार के लिए समाप्ति:</strong> नियोक्ता ग्रेच्युटी रोक सकता है यदि कर्मचारी को जानबूझकर क्षति, हिंसा, नैतिक पतन के लिए समाप्त किया गया है</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>महत्वपूर्ण:</strong> एक वर्ष में 240 कार्य दिवस 1 पूर्ण वर्ष के रूप में योग्य हैं। मौसमी श्रमिकों के लिए, 190 दिन 1 वर्ष के रूप में गिने जाते हैं। मातृत्व अवकाश कार्य दिवसों के रूप में गिना जाता है।
      </p>
    </div>
  `);

  const formulaExplanationContent = autoLinkContent(`
    <p>
      ग्रेच्युटी गणना इस बात पर निर्भर करती है कि नियोक्ता ग्रेच्युटी अधिनियम के तहत कवर है या नहीं:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">कवर्ड प्रतिष्ठानों के लिए (ग्रेच्युटी अधिनियम लागू):</h4>
    <div class="p-3 bg-slate-50 rounded border border-slate-200 mt-2 font-mono text-sm">
      ग्रेच्युटी = (अंतिम आहरित वेतन × 15 × सेवा के वर्ष) / 26
    </div>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>अंतिम आहरित वेतन:</strong> मूल वेतन + महंगाई भत्ता (DA)</li>
      <li><strong>15:</strong> ग्रेच्युटी अधिनियम के अनुसार निश्चित गुणक</li>
      <li><strong>26:</strong> कार्य दिवसों की संख्या (26 कार्य दिवस/माह मानते हुए)</li>
      <li><strong>सेवा के वर्ष:</strong> पूर्ण वर्ष (6+ महीने 1 वर्ष तक राउंड अप होते हैं)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">नॉन-कवर्ड प्रतिष्ठानों के लिए (अधिनियम लागू नहीं):</h4>
    <div class="p-3 bg-slate-50 rounded border border-slate-200 mt-2 font-mono text-sm">
      ग्रेच्युटी = (अंतिम आहरित वेतन × 15 × सेवा के वर्ष) / 30
    </div>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>26 के बजाय 30 दिन/माह का उपयोग करता है (कम ग्रेच्युटी में परिणाम)</li>
      <li>अधिनियम द्वारा कवर नहीं किए गए प्रतिष्ठानों पर लागू (10 से कम कर्मचारी)</li>
      <li>सूत्र कंपनी नीति के आधार पर भिन्न हो सकता है</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">अधिकतम ग्रेच्युटी सीमा:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>कोई ऊपरी सीमा नहीं:</strong> ग्रेच्युटी भुगतान अधिनियम में ग्रेच्युटी राशि पर कोई सीमा नहीं है</li>
      <li><strong>कर छूट सीमा:</strong> पहले ₹20 लाख कर-मुक्त हैं, अधिक कर योग्य है</li>
      <li><strong>सरकारी कर्मचारी:</strong> कर छूट सीमा ₹25 लाख है (निजी से अधिक)</li>
    </ul>
  `);

  const taxationContent = autoLinkContent(`
    <p>
      आयकर अधिनियम की धारा 10(10) के तहत ग्रेच्युटी कराधान कर्मचारी प्रकार के अनुसार भिन्न होता है:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. सरकारी कर्मचारी:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>प्राप्त 100% ग्रेच्युटी कर-मुक्त है (कोई सीमा नहीं)</li>
      <li>केंद्र, राज्य, स्थानीय सरकारी कर्मचारियों पर लागू</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. निजी क्षेत्र के कर्मचारी (अधिनियम द्वारा कवर):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>कर छूट = <strong>निम्नलिखित में से सबसे कम:</strong></li>
      <li className="ml-6">a) प्राप्त वास्तविक ग्रेच्युटी</li>
      <li className="ml-6">b) ₹20 लाख (अधिकतम छूट सीमा)</li>
      <li className="ml-6">c) (15 × अंतिम वेतन × वर्ष) / 26</li>
      <li>₹20 लाख से अधिक राशि आय में जोड़ी जाती है और स्लैब के अनुसार कर लगाया जाता है</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. निजी क्षेत्र के कर्मचारी (अधिनियम द्वारा कवर नहीं):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>कर छूट = <strong>निम्नलिखित में से सबसे कम:</strong></li>
      <li className="ml-6">a) प्राप्त वास्तविक ग्रेच्युटी</li>
      <li className="ml-6">b) ₹20 लाख (अधिकतम छूट सीमा)</li>
      <li className="ml-6">c) (15 × अंतिम वेतन × वर्ष) / 30</li>
      <li className="ml-6">d) ½ महीने वेतन × सेवा के वर्ष</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>उदाहरण:</strong> प्राप्त ग्रेच्युटी = ₹25 लाख। कर-मुक्त = ₹20 लाख। कर योग्य = ₹5 लाख (आपके आयकर स्लैब के अनुसार कर - 30% ब्रैकेट = ₹1.5L कर)।
      </p>
    </div>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      निम्नलिखित स्थितियों में ग्रेच्युटी देय हो जाती है:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>सेवानिवृत्ति:</strong> सेवानिवृत्ति आयु (आमतौर पर 58-60 वर्ष) तक पहुंचने पर</li>
      <li><strong>इस्तीफा:</strong> 5 वर्ष की सेवा पूरी करने के बाद स्वैच्छिक इस्तीफा</li>
      <li><strong>छंटनी:</strong> 5 वर्ष के बाद नियोक्ता द्वारा समाप्ति (दुराचार के कारण नहीं)</li>
      <li><strong>मृत्यु:</strong> नामांकित/कानूनी उत्तराधिकारी को देय यदि सेवा < 5 वर्ष भी</li>
      <li><strong>विकलांगता:</strong> दुर्घटना या बीमारी कर्मचारी को अयोग्य बनाती है - 5 वर्ष का नियम माफ</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">भुगतान समयरेखा:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>ग्रेच्युटी देय होने की तारीख से <strong>30 दिनों</strong> के भीतर भुगतान किया जाना चाहिए</li>
      <li>30 दिनों से अधिक की देरी नियोक्ता से साधारण ब्याज आकर्षित करती है</li>
      <li>ब्याज दर: सरकार द्वारा अधिसूचित (वर्तमान में लगभग 10% प्रति वर्ष)</li>
      <li>कर्मचारी फॉर्म I आवेदन के साथ ग्रेच्युटी का दावा कर सकता है</li>
      <li>नियोक्ता को 15 दिनों के भीतर आवेदन की प्राप्ति स्वीकार करनी होगी</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">जब्ती (ग्रेच्युटी का नुकसान):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>पूर्ण जब्ती:</strong> यदि कर्मचारी को नैतिक पतन, हिंसा, या नियोक्ता की संपत्ति को नुकसान पहुंचाने वाले कार्य के लिए समाप्त किया गया है</li>
      <li><strong>आंशिक जब्ती:</strong> कर्मचारी की जानबूझकर चूक/लापरवाही के कारण हुई क्षति/हानि के लिए नियोक्ता के विवेक पर</li>
      <li><strong>जब्त नहीं किया जा सकता:</strong> इस्तीफा, खराब प्रदर्शन, सामान्य दुराचार</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'gratuity-faq-1',
      question: 'ग्रेच्युटी क्या है और यह कब देय होती है?',
      answer:
        'ग्रेच्युटी कर्मचारी सेवा की सराहना के रूप में नियोक्ता द्वारा एकमुश्त भुगतान है। 5 वर्ष की निरंतर सेवा (240 कार्य दिवस/वर्ष) के बाद सेवानिवृत्ति, इस्तीफा, मृत्यु या विकलांगता पर देय। 10+ कर्मचारियों वाले प्रतिष्ठानों के लिए ग्रेच्युटी भुगतान अधिनियम, 1972 द्वारा शासित।',
    },
    {
      id: 'gratuity-faq-2',
      question: 'ग्रेच्युटी की गणना कैसे की जाती है?',
      answer:
        'कवर्ड प्रतिष्ठानों के लिए: (मूल + DA) × 15/26 × वर्ष। नॉन-कवर्ड के लिए: (मूल + DA) × 15/30 × वर्ष। 6+ महीने की सेवा 1 वर्ष तक राउंड अप होती है। अंतिम आहरित वेतन में केवल मूल + महंगाई भत्ता शामिल है, HRA, बोनस या अन्य भत्ते नहीं।',
    },
    {
      id: 'gratuity-faq-3',
      question: 'क्या ग्रेच्युटी कर योग्य है?',
      answer:
        'निजी कर्मचारियों के लिए पहले ₹20 लाख की ग्रेच्युटी धारा 10(10) के तहत कर-मुक्त है (सरकारी के लिए ₹25L)। सीमा से अधिक राशि आयकर स्लैब के अनुसार कर योग्य है। सरकारी कर्मचारी बिना सीमा के 100% कर-मुक्त ग्रेच्युटी प्राप्त करते हैं।',
    },
    {
      id: 'gratuity-faq-4',
      question: 'ग्रेच्युटी के लिए आवश्यक न्यूनतम सेवा क्या है?',
      answer:
        '5 वर्ष की निरंतर सेवा (240 कार्य दिवस प्रति वर्ष 1 वर्ष के रूप में योग्य)। अपवाद: मृत्यु या विकलांगता 5 वर्ष के नियम को माफ करती है - ग्रेच्युटी तुरंत देय। इस्तीफा, सेवानिवृत्ति, छंटनी सभी को न्यूनतम 5 वर्ष की आवश्यकता है।',
    },
    {
      id: 'gratuity-faq-5',
      question:
        'क्या मुझे 5 वर्ष से पहले इस्तीफा देने पर ग्रेच्युटी मिल सकती है?',
      answer:
        'नहीं, ग्रेच्युटी के लिए न्यूनतम 5 वर्ष की निरंतर सेवा आवश्यक है। यदि आप 5 वर्ष पूरे करने से पहले इस्तीफा देते हैं, तो आप पात्र नहीं हैं। हालांकि, यदि मृत्यु या विकलांगता के कारण रोजगार समाप्त होता है, तो 5 वर्ष से कम सेवा के साथ भी ग्रेच्युटी देय है।',
    },
    {
      id: 'gratuity-faq-6',
      question: 'अधिकतम ग्रेच्युटी राशि क्या है?',
      answer:
        'ग्रेच्युटी भुगतान अधिनियम के अनुसार ग्रेच्युटी राशि पर कोई ऊपरी सीमा नहीं है। हालांकि, केवल पहले ₹20 लाख कर-मुक्त हैं। उदाहरण: यदि ग्रेच्युटी = ₹35L, कर-मुक्त = ₹20L, कर योग्य = ₹15L। सरकारी कर्मचारियों की कर छूट सीमा ₹25L है।',
    },
    {
      id: 'gratuity-faq-7',
      question: 'ग्रेच्युटी गणना के लिए मूल वेतन या CTC का उपयोग किया जाता है?',
      answer:
        'ग्रेच्युटी गणना के लिए केवल मूल वेतन + महंगाई भत्ता (DA) का उपयोग किया जाता है, CTC नहीं। HRA, विशेष भत्ते, बोनस, प्रोत्साहन, चिकित्सा, वाहन शामिल नहीं हैं। यह ग्रेच्युटी भुगतान अधिनियम, 1972 के अनुसार है।',
    },
    {
      id: 'gratuity-faq-8',
      question: 'नियोक्ता को ग्रेच्युटी कब भुगतान करना चाहिए?',
      answer:
        'ग्रेच्युटी देय होने की तारीख (सेवानिवृत्ति तारीख, इस्तीफा स्वीकृति, या निर्वहन तारीख) से 30 दिनों के भीतर। यदि 30 दिनों से अधिक की देरी होती है, तो नियोक्ता को साधारण ब्याज (~10% प्रति वर्ष) भुगतान करना होगा। कर्मचारी को फॉर्म I का उपयोग करके आवेदन करना होगा।',
    },
    {
      id: 'gratuity-faq-9',
      question: 'क्या नियोक्ता ग्रेच्युटी भुगतान से इनकार कर सकता है?',
      answer:
        'हां, विशिष्ट मामलों में: नैतिक पतन, नियोक्ता/संपत्ति के खिलाफ हिंसा, या जानबूझकर क्षति से जुड़े दुराचार के लिए समाप्ति। सामान्य दुराचार, खराब प्रदर्शन, या इस्तीफे के लिए, नियोक्ता 5 वर्ष की सेवा के बाद ग्रेच्युटी से इनकार नहीं कर सकता।',
    },
    {
      id: 'gratuity-faq-10',
      question:
        'यदि कर्मचारी की मृत्यु हो जाती है तो ग्रेच्युटी का क्या होता है?',
      answer:
        'ग्रेच्युटी तुरंत नामांकित या कानूनी उत्तराधिकारी (पति/पत्नी, बच्चे, माता-पिता) को देय है। मृत्यु के लिए 5 वर्ष की सेवा नियम माफ। पूर्ण राशि कर-मुक्त है। नामांकित को मृत्यु प्रमाण पत्र, फॉर्म I दावा, और KYC जमा करना होगा। दावे से 30 दिनों के भीतर भुगतान।',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'ग्रेच्युटी कैलकुलेटर',
            url: 'https://fincado.com/hi/gratuity-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="ग्रेच्युटी कैलकुलेटर"
        description="ग्रेच्युटी अधिनियम 1972 के अनुसार 5+ वर्ष सेवा के लिए ₹20 लाख तक कर छूट के साथ ग्रेच्युटी राशि की गणना करें।"
        url="https://fincado.com/hi/gratuity-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <GratuitySchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="ग्रेच्युटी कैलकुलेटर" />
            <LanguageToggle path="/gratuity-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                ग्रेच्युटी कैलकुलेटर (ग्रेच्युटी भुगतान अधिनियम 1972)
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                ₹20 लाख कर छूट के साथ ग्रेच्युटी राशि की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-gratuity-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      न्यूनतम सेवा
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      पात्रता के लिए आवश्यक
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5 वर्ष
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        सेवा
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      कर छूट
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      कर-मुक्त ग्रेच्युटी सीमा
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹20L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        अधिकतम
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      भुगतान समयरेखा
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      नियोक्ता को भीतर भुगतान करना होगा
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      30 दिन
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
            <GratuityClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-gratuity-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  पात्रता आवश्यकता
                </strong>
                ग्रेच्युटी केवल 5 वर्ष की निरंतर सेवा (240 कार्य दिवस प्रति
                वर्ष) पूरी करने के बाद देय होती है। अपवाद: मृत्यु या विकलांगता
                इस आवश्यकता को हटा देती है।
              </AlertDescription>
            </Alert>

            {/* GRATUITY FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    ग्रेच्युटी गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      ग्रेच्युटी गणना इस बात पर निर्भर करती है कि नियोक्ता
                      ग्रेच्युटी भुगतान अधिनियम, 1972 के तहत कवर है या नहीं:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          कवर्ड प्रतिष्ठानों के लिए (अधिनियम लागू)
                        </div>
                        <div className="text-lg font-serif">
                          ग्रेच्युटी = (अंतिम वेतन × 15 × वर्ष) / 26
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          नॉन-कवर्ड प्रतिष्ठानों के लिए (अधिनियम लागू नहीं)
                        </div>
                        <div className="text-lg font-serif">
                          ग्रेच्युटी = (अंतिम वेतन × 15 × वर्ष) / 30
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-28">जहाँ:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          अंतिम वेतन
                        </span>
                        <span>= केवल मूल वेतन + महंगाई भत्ता (DA)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          15
                        </span>
                        <span>
                          = ग्रेच्युटी भुगतान अधिनियम के अनुसार निश्चित गुणक
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          26
                        </span>
                        <span>
                          = कार्य दिवस प्रति माह (कवर्ड प्रतिष्ठानों के लिए)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          30
                        </span>
                        <span>
                          = दिन प्रति माह (नॉन-कवर्ड प्रतिष्ठानों के लिए)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-24 font-mono font-semibold">
                          वर्ष
                        </span>
                        <span>
                          = पूर्ण सेवा के वर्ष (6+ महीने 1 वर्ष तक राउंड)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> HRA, विशेष भत्ते, बोनस, और अन्य
                        घटक ग्रेच्युटी गणना में शामिल नहीं हैं - केवल मूल + DA।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: 10 वर्षों के लिए ₹50,000 मूल वेतन (कवर्ड
                      प्रतिष्ठान)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मूल वेतन + DA:</strong>
                        </div>
                        <div>₹50,000/माह</div>

                        <div>
                          <strong>सेवा के वर्ष:</strong>
                        </div>
                        <div>10 वर्ष</div>

                        <div>
                          <strong>प्रतिष्ठान प्रकार:</strong>
                        </div>
                        <div>कवर्ड (26 कार्य दिवस)</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">गणना चरण:</strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>ग्रेच्युटी = (50,000 × 15 × 10) / 26</div>
                          <div>ग्रेच्युटी = 75,00,000 / 26</div>
                          <div>ग्रेच्युटी ≈ ₹2,88,462</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">कर उपचार:</strong>
                        <div className="ml-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>प्राप्त ग्रेच्युटी:</span>
                            <strong>₹2,88,462</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कर मुक्त (अधिकतम ₹20L):</span>
                            <strong className="text-emerald-700">
                              ₹2,88,462
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कर योग्य राशि:</span>
                            <strong>₹0</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-emerald-900">
                          परिणाम: 100% कर-मुक्त ग्रेच्युटी
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          चूंकि ग्रेच्युटी राशि (₹2.88L) कर छूट सीमा (₹20L) से
                          कम है, पूरी राशि धारा 10(10) के तहत कर-मुक्त है।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High Amount Example */}
                  <div className="p-5 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      उदाहरण: 25 वर्षों के लिए ₹2 लाख मूल वेतन
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="ml-4 space-y-2 font-mono text-sm">
                        <div>ग्रेच्युटी = (2,00,000 × 15 × 25) / 26</div>
                        <div>ग्रेच्युटी = 7,50,00,000 / 26</div>
                        <div>ग्रेच्युटी ≈ ₹28,84,615</div>
                      </div>

                      <div className="pt-3 border-t border-amber-300">
                        <strong className="block mb-2">कर उपचार:</strong>
                        <div className="ml-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>प्राप्त ग्रेच्युटी:</span>
                            <strong>₹28,84,615</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कर मुक्त (अधिकतम ₹20L):</span>
                            <strong className="text-emerald-700">
                              ₹20,00,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कर योग्य राशि:</span>
                            <strong className="text-amber-700">
                              ₹8,84,615
                            </strong>
                          </div>
                          <div className="flex justify-between text-xs text-slate-600 mt-2">
                            <span>कर @ 30% ब्रैकेट:</span>
                            <strong>₹2,65,385</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-amber-500">
                        <div className="text-base font-semibold text-amber-900">
                          परिणाम: आंशिक रूप से कर योग्य ग्रेच्युटी
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          ₹20 लाख से अधिक राशि को वेतन आय के रूप में आपके कर
                          स्लैब के अनुसार कर लगाया जाता है।
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    ग्रेच्युटी गणना ग्रेच्युटी भुगतान अधिनियम, 1972 द्वारा शासित
                    है। नियोक्ता गणना की गई राशि को कम नहीं कर सकता। धारा 10(10)
                    के तहत कर छूट निजी कर्मचारियों के लिए ₹20L, सरकारी
                    कर्मचारियों के लिए ₹25L है।
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
                    अपने EPF कॉर्पस की गणना करना चाहते हैं?
                  </strong>
                  <Link
                    href="/hi/epf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      रिटायरमेंट बचत योजना के लिए EPF कैलकुलेटर का उपयोग करें
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
                  ग्रेच्युटी क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  ग्रेच्युटी पात्रता मानदंड
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={eligibilityContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-gratuity-mid-content"
                  type="square"
                  label="विज्ञापन"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  ग्रेच्युटी गणना फॉर्मूला समझाया गया
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={formulaExplanationContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  ग्रेच्युटी: कवर्ड बनाम नॉन-कवर्ड प्रतिष्ठान
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">पहलू</TableHead>
                        <TableHead className="text-left">
                          कवर्ड (अधिनियम लागू)
                        </TableHead>
                        <TableHead className="text-left">
                          नॉन-कवर्ड (अधिनियम लागू नहीं)
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          लागू होना
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          10+ कर्मचारी
                        </TableCell>
                        <TableCell className="text-slate-700">
                          10 से कम कर्मचारी
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          फॉर्मूला
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          (वेतन × 15/26 × वर्ष)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          (वेतन × 15/30 × वर्ष)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          कार्य दिवस/माह
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          26 दिन
                        </TableCell>
                        <TableCell className="text-slate-700">30 दिन</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          ग्रेच्युटी राशि
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          अधिक (26 दिन आधार)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कम (30 दिन आधार)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          न्यूनतम सेवा
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5 वर्ष (240 दिन/वर्ष)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कंपनी नीति के अनुसार
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          अधिकतम सीमा
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          कोई सीमा नहीं
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कंपनी नीति
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          कर छूट
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹20L (धारा 10(10))
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹20L (धारा 10(10))
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          भुगतान समयरेखा
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          30 दिनों के भीतर (अनिवार्य)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कंपनी नीति के अनुसार
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          मृत्यु/विकलांगता
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          5 वर्ष का नियम माफ
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कंपनी नीति
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>मुख्य अंतर:</strong> कवर्ड प्रतिष्ठान 26 कार्य
                    दिवसों का उपयोग करते हैं जिसके परिणामस्वरूप नॉन-कवर्ड (30
                    दिन) की तुलना में ~15% अधिक ग्रेच्युटी होती है।
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  ग्रेच्युटी कराधान नियम
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxationContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  ग्रेच्युटी कब और कैसे भुगतान की जाती है
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalContent} />
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस ग्रेच्युटी कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    अपना मासिक मूल वेतन + महंगाई भत्ता (DA) राशि दर्ज करें।
                  </li>
                  <li>
                    पूर्ण सेवा के कुल वर्ष इनपुट करें (न्यूनतम 5 वर्ष आवश्यक)।
                  </li>
                  <li>
                    चुनें कि आपका नियोक्ता ग्रेच्युटी भुगतान अधिनियम के तहत कवर
                    है या नहीं (10+ कर्मचारियों वाली अधिकांश कंपनियां कवर हैं)।
                  </li>
                  <li>
                    उपयुक्त फॉर्मूला (कवर्ड के लिए 26 दिन, नॉन-कवर्ड के लिए 30
                    दिन) का उपयोग करके गणना की गई कुल ग्रेच्युटी राशि देखें।
                  </li>
                  <li>
                    कर-मुक्त हिस्से (₹20 लाख तक) और कर योग्य राशि (यदि कोई हो)
                    की जांच करें।
                  </li>
                  <li>
                    भविष्य के संदर्भ के लिए अपनी ग्रेच्युटी गणना सहेजें या
                    WhatsApp के माध्यम से साझा करें।
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित रिटायरमेंट लाभ कैलकुलेटर
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/epf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💼
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              EPF कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              8.25% ब्याज के साथ कर्मचारी भविष्य निधि की गणना
                              करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>EPF की गणना करें</span>
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
                              पूर्ण रिटायरमेंट कॉर्पस और मासिक SIP की योजना
                              बनाएं।
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
              <AdSlot id="hi-gratuity-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="hi-gratuity-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-gratuity-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-gratuity-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
