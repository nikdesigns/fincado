import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HRAClient from '@/app/hra-calculator/HRAClient';
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
import FAQSchema from '@/components/FAQSchema';
import { HRASchemas } from '@/components/schemas/HRASchemas';
import {
  Building2,
  AlertTriangle,
  Info,
  ArrowRight,
  Calculator,
  Home,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'HRA कैलकुलेटर 2026 – मकान किराया भत्ता छूट | धारा 10(13A)',
  description:
    'FY 2026-27 के लिए पुरानी कर व्यवस्था के तहत HRA छूट गणना करें। मेट्रो (50%) vs गैर-मेट्रो (40%) शहरों के लिए टैक्स-फ्री किराया सीमा जांचें। तुरंत परिणाम के साथ मुफ्त HRA कैलकुलेटर।',
  keywords: [
    'HRA कैलकुलेटर भारत',
    'मकान किराया भत्ता छूट',
    'धारा 10(13A) HRA',
    'मेट्रो vs गैर-मेट्रो HRA',
    'HRA गणना फॉर्मूला',
    'किराया रसीद टैक्स लाभ',
    'पुरानी कर व्यवस्था HRA',
    'HRA टैक्स बचत कैलकुलेटर'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/hra-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/hra-calculator/',
    },
  },
  openGraph: {
    title: 'HRA कैलकुलेटर 2026 – टैक्स-फ्री किराया भत्ता गणना करें',
    description:
      'धारा 10(13A) के तहत मकान किराया भत्ता छूट गणना करने के लिए मुफ्त HRA कैलकुलेटर। मेट्रो vs गैर-मेट्रो दरें जांचें और टैक्स बचाएं।',
    url: 'https://fincado.com/hi/hra-calculator/',
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
    id: 'hra-faq-1',
    question: 'क्या नई कर व्यवस्था में HRA छूट उपलब्ध है?',
    answer:
      'नहीं। धारा 10(13A) के तहत HRA छूट नई कर व्यवस्था (FY 2026-27 के लिए डिफ़ॉल्ट) में उपलब्ध नहीं है। HRA लाभों का दावा करने के लिए आपको पुरानी कर व्यवस्था का विकल्प चुनना होगा। नई व्यवस्था HRA, 80C, 80D, या अधिकांश अन्य कटौतियों की अनुमति नहीं देती है।',
  },
  {
    id: 'hra-faq-2',
    question: '50% HRA गणना के लिए कौन से शहर मेट्रो माने जाते हैं?',
    answer:
      'केवल चार शहर मेट्रो के रूप में योग्य हैं: दिल्ली, मुंबई, कोलकाता और चेन्नई। बैंगलोर, हैदराबाद, पुणे, गुड़गांव, नोएडा सहित अन्य सभी शहर गैर-मेट्रो (40% HRA गणना) हैं। यह वर्गीकरण आयकर नियमों द्वारा निर्धारित है।',
  },
  {
    id: 'hra-faq-3',
    question: 'क्या HRA छूट के लिए मकान मालिक पैन कार्ड आवश्यक है?',
    answer:
      'हां, यदि वार्षिक किराया ₹1,00,000 (₹8,334/माह) से अधिक है तो मकान मालिक पैन अनिवार्य है। इस सीमा से नीचे, पैन की आवश्यकता नहीं है। ₹1 लाख से अधिक किराए के लिए, HRA छूट का दावा करते समय आपको नियोक्ता को मकान मालिक पैन जमा करना होगा।',
  },
  {
    id: 'hra-faq-4',
    question: 'क्या मैं अपने माता-पिता को किराया देकर HRA दावा कर सकता हूं?',
    answer:
      'हां, आप माता-पिता को किराया देकर HRA दावा कर सकते हैं। आपको वैध किराया रसीदें/समझौता चाहिए। हालांकि, आपके माता-पिता को अपने ITR में इस किराए को "मकान संपत्ति से आय" के रूप में घोषित करना होगा। यदि माता-पिता कोई किराया आय नहीं दिखाते हैं लेकिन आप HRA दावा करते हैं तो कर विभाग जांच कर सकता है।',
  },
  {
    id: 'hra-faq-5',
    question: 'HRA छूट फॉर्मूला क्या है?',
    answer:
      'HRA छूट = न्यूनतम: (1) वास्तविक HRA प्राप्त, (2) चुकाया गया किराया माइनस वेतन का 10%, (3) वेतन का 50% (मेट्रो) या वेतन का 40% (गैर-मेट्रो)। वेतन = मूल + DA। सबसे कम मूल्य आपका छूट HRA बनता है।',
  },
  {
    id: 'hra-faq-6',
    question: 'क्या मैं उसी शहर में घर होने पर भी HRA दावा कर सकता हूं?',
    answer:
      'हां, यदि आप किसी अलग किराए के घर में रहते हैं तो आप उसी शहर में घर होने पर भी HRA दावा कर सकते हैं। स्वामित्व वाला घर किराए के आवास से अलग स्थान पर होना चाहिए। आपको वैध किराया रसीदें और उचित स्पष्टीकरण चाहिए।',
  },
  {
    id: 'hra-faq-7',
    question: 'HRA छूट दावा करने के लिए कौन से दस्तावेज़ आवश्यक हैं?',
    answer:
      'आवश्यक दस्तावेज़: (1) किराया रसीदें (राजस्व टिकट के साथ मासिक या त्रैमासिक यदि नकद > ₹5,000), (2) किराया समझौता, (3) मकान मालिक पैन (यदि किराया > ₹1L/वर्ष), (4) मकान मालिक घोषणा यदि पैन उपलब्ध नहीं है, (5) किराया भुगतान प्रमाण (बैंक स्टेटमेंट/चेक)।',
  },
  {
    id: 'hra-faq-8',
    question: 'क्या महंगाई भत्ता (DA) HRA गणना में शामिल है?',
    answer:
      'हां, यदि महंगाई भत्ता सेवानिवृत्ति लाभों का हिस्सा बनता है तो इसे HRA गणना के लिए वेतन में शामिल किया जाता है। फॉर्मूला (मूल + DA) का उपयोग करता है। हालांकि, विशेष भत्ता, वाहन, चिकित्सा जैसे अन्य भत्ते HRA गणना वेतन में शामिल नहीं हैं।',
  },
  {
    id: 'hra-faq-9',
    question: 'क्या मैं HRA और होम लोन कटौती दोनों एक साथ दावा कर सकता हूं?',
    answer:
      'हां, यदि आप एक घर के मालिक हैं और किसी अलग शहर में किराए के घर में रहते हैं तो आप दोनों एक साथ दावा कर सकते हैं। किराए के आवास के लिए HRA + स्वामित्व वाली संपत्ति के लिए होम लोन ब्याज (धारा 24) (किराए पर दी गई या मानी गई किराए पर दी गई)। दोनों पुरानी व्यवस्था में अनुमति हैं।',
  },
  {
    id: 'hra-faq-10',
    question: 'यदि मेरा प्राप्त HRA वास्तविक चुकाए गए किराए से कम है तो क्या?',
    answer:
      'HRA छूट वास्तविक प्राप्त HRA पर कैप्ड है। भले ही आप अधिक किराया चुकाते हों, छूट वेतन में HRA घटक से अधिक नहीं हो सकती। उदाहरण: प्राप्त HRA = ₹1.5L, चुकाया गया किराया = ₹3L। अधिकतम छूट HRA = ₹1.5L (शर्त 1 लागू होती है)।',
  }
];

/* ---------------- PAGE ---------------- */
export default function HRAPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>मकान किराया भत्ता (HRA)</strong> नियोक्ताओं द्वारा कर्मचारियों को किराये के 
      आवास खर्चों की भरपाई के लिए भुगतान किया जाने वाला वेतन घटक है। आयकर अधिनियम की 
      <strong>धारा 10(13A)</strong> के तहत, यदि आप किराए के घर में रहते हैं और पुरानी 
      कर व्यवस्था का विकल्प चुनते हैं तो HRA के एक हिस्से को <strong>कर-मुक्त</strong> 
      के रूप में दावा किया जा सकता है।
    </p>
    <p class="mt-4">
      छूट की गणना तीन-शर्त फॉर्मूले का उपयोग करके की जाती है जहां <strong>सबसे कम 
      मूल्य</strong> आपका कर-मुक्त HRA बनता है। यह कैलकुलेटर आपके वेतन, चुकाए गए किराए, 
      और शहर वर्गीकरण के आधार पर सटीक छूट और कर योग्य HRA राशि निर्धारित करने में मदद करता है।
    </p>
  `);

  const howCalculatedContent = autoLinkContent(`
    <p>
      HRA छूट की गणना इन तीन मूल्यों में से <strong>न्यूनतम (सबसे कम)</strong> के रूप में की जाती है:
    </p>
    <ol class="list-decimal pl-6 space-y-3 mt-3">
      <li>
        <strong>वास्तविक प्राप्त HRA:</strong> आपकी सैलरी स्लिप में दिखाया गया HRA घटक 
        (वार्षिक गणना के लिए मासिक HRA × 12)
      </li>
      <li>
        <strong>चुकाया गया किराया माइनस वेतन का 10%:</strong> कुल वार्षिक चुकाया गया किराया 
        माइनस (मूल वेतन + महंगाई भत्ता) का 10%। यह सुनिश्चित करता है कि केवल बुनियादी 
        जीवन यापन लागत से परे "अतिरिक्त किराया" को छूट मिले
      </li>
      <li>
        <strong>वेतन का 50% या 40%:</strong>
        <ul class="list-disc pl-6 mt-2 space-y-1">
          <li><strong>मेट्रो शहर (50%):</strong> केवल दिल्ली, मुंबई, कोलकाता, चेन्नई</li>
          <li><strong>गैर-मेट्रो शहर (40%):</strong> अन्य सभी शहर (बैंगलोर, हैदराबाद, पुणे, आदि)</li>
        </ul>
      </li>
    </ol>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>मुख्य फॉर्मूला:</strong> HRA के लिए वेतन = मूल वेतन + महंगाई भत्ता (DA)। 
        विशेष भत्ता, वाहन, चिकित्सा जैसे अन्य भत्ते शामिल नहीं हैं।
      </p>
    </div>
  `);

  const documentsContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">अनिवार्य दस्तावेज़:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>किराया रसीदें:</strong> मकान मालिक के हस्ताक्षर, संपत्ति पते, और राजस्व टिकट (₹5,000 से अधिक नकद भुगतान के लिए ₹1) के साथ मासिक या त्रैमासिक रसीदें</li>
      <li><strong>किराया समझौता:</strong> किराया राशि, अवधि, और मकान मालिक विवरण दिखाने वाला पंजीकृत या नोटरीकृत किराया समझौता</li>
      <li><strong>मकान मालिक पैन:</strong> यदि वार्षिक किराया ₹1,00,000 से अधिक है तो अनिवार्य। TDS अनुपालन के लिए नियोक्ता को जमा करें</li>
      <li><strong>किराया भुगतान प्रमाण:</strong> बैंक स्टेटमेंट, चेक प्रतियां, या UPI लेनदेन रिकॉर्ड जो किराया भुगतान दिखाते हों</li>
      <li><strong>नो-पैन घोषणा:</strong> यदि मकान मालिक पैन देने से मना करते हैं, तो मकान मालिक के नाम और पते के साथ घोषणा जमा करें</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">किराया रसीद प्रारूप:</h4>
    <div class="mt-3 p-4 bg-slate-50 rounded border border-slate-200 text-sm font-mono">
      <div class="space-y-1">
        <div>प्राप्तकर्ता: [आपका नाम]</div>
        <div>राशि: ₹[किराया राशि] (रुपये [शब्दों में])</div>
        <div>के लिए: [पते] पर संपत्ति का किराया</div>
        <div>अवधि: [माह/वर्ष]</div>
        <div>मकान मालिक का नाम: [नाम]</div>
        <div>मकान मालिक पैन: [यदि किराया > ₹1L/वर्ष]</div>
        <div>तारीख: [तारीख]</div>
        <div>हस्ताक्षर: [मकान मालिक हस्ताक्षर]</div>
      </div>
    </div>
  `);

  const commonMistakesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>नई कर व्यवस्था में HRA दावा करना:</strong> नई व्यवस्था में HRA की अनुमति नहीं है। पुरानी व्यवस्था चुननी होगी।</li>
      <li><strong>गलत शहर वर्गीकरण:</strong> केवल दिल्ली/मुंबई/कोलकाता/चेन्नई मेट्रो (50%) हैं। बैंगलोर गैर-मेट्रो (40%) है।</li>
      <li><strong>पूर्ण CTC को वेतन के रूप में शामिल करना:</strong> HRA गणना के लिए केवल मूल + DA गिना जाता है, कुल CTC या सकल वेतन नहीं।</li>
      <li><strong>किराया रसीदें नहीं:</strong> उचित दस्तावेज़ीकरण के बिना HRA दावा करना। IT सत्यापन के लिए रसीदें अनिवार्य हैं।</li>
      <li><strong>मकान मालिक पैन गायब:</strong> यदि किराया > ₹1L/वर्ष तो पैन आवश्यक है। पैन गायब होने से दावा अस्वीकृत हो सकता है।</li>
      <li><strong>नकद में किराया भुगतान:</strong> रसीदों/टिकट के बिना बड़े नकद भुगतान अस्वीकार कर दिए जाते हैं। ऑडिट ट्रेल के लिए बैंक ट्रांसफर का उपयोग करें।</li>
      <li><strong>स्वामित्व वाले घर के समान पता:</strong> यदि आप अपने घर में रहते हैं तो HRA दावा नहीं कर सकते। अलग स्थान होना चाहिए।</li>
      <li><strong>माता-पिता किराया आय नहीं दिखाते:</strong> यदि आप माता-पिता को किराया देते हैं, तो उन्हें ITR में इसे घोषित करना होगा। बेमेल समस्याएं पैदा करता है।</li>
    </ul>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'HRA कैलकुलेटर',
            url: 'https://fincado.com/hi/hra-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="HRA कैलकुलेटर - मकान किराया भत्ता छूट"
        description="धारा 10(13A) के तहत HRA कर छूट गणना करें। मेट्रो vs गैर-मेट्रो दरें जांचें और कर-मुक्त किराया भत्ता निर्धारित करें।"
        url="https://fincado.com/hi/hra-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <HRASchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="HRA कैलकुलेटर 2026" />
            <LanguageToggle path="/hra-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                HRA कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                मकान किराया भत्ता छूट
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  धारा 10(13A) के तहत <strong>कर-मुक्त HRA</strong> गणना करें। 
                  मेट्रो vs गैर-मेट्रो छूट दरें जांचें और अपने वेतन और चुकाए गए 
                  किराए के आधार पर सटीक कर योग्य HRA निर्धारित करें।
                </p>
              `}
            />
          </div>

          {/* Old Tax Regime Alert */}
          <div className="mt-6 flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg items-start shadow-sm max-w-2xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-900">
                महत्वपूर्ण: केवल पुरानी कर व्यवस्था
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                HRA छूट नई कर व्यवस्था (FY 2026-27 के लिए डिफ़ॉल्ट) के तहत
                उपलब्ध नहीं है। इस लाभ का दावा करने के लिए आपको पुरानी कर
                व्यवस्था का विकल्प चुनना होगा। नई व्यवस्था HRA, 80C, 80D, या
                अधिकांश अन्य कटौतियों की अनुमति नहीं देती है।
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-hra-top" type="leaderboard" />
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
                      मेट्रो दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      दिल्ली, मुंबई, कोलकाता, चेन्नई
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      50%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        वेतन का
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      गैर-मेट्रो दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      अन्य सभी शहर
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      40%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        वेतन का
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      पैन सीमा
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      मकान मालिक पैन अनिवार्य
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹1L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <HRAClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-hra-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  गणना नोट
                </strong>
                HRA छूट तीन शर्तों की न्यूनतम (सबसे कम) है। भले ही आप उच्च
                किराया चुकाते हों, छूट नियोक्ता से प्राप्त वास्तविक HRA से अधिक
                नहीं हो सकती। ऑडिट के लिए हमेशा किराया रसीदें और मकान मालिक पैन
                रखें।
              </AlertDescription>
            </Alert>

            {/* Formula Breakdown Section */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    HRA छूट फॉर्मूला और गणना
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      HRA छूट की गणना इन तीन मूल्यों में से{' '}
                      <strong>न्यूनतम</strong> के रूप में की जाती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 space-y-3">
                      <div className="text-base font-semibold text-slate-700 mb-3">
                        तीन-शर्त फॉर्मूला
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                          <div className="font-semibold text-emerald-900 mb-1">
                            शर्त 1: वास्तविक प्राप्त HRA
                          </div>
                          <div className="font-mono text-xs text-slate-700">
                            सैलरी स्लिप से HRA घटक (वार्षिक)
                          </div>
                        </div>

                        <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                          <div className="font-semibold text-emerald-900 mb-1">
                            शर्त 2: चुकाया गया किराया - वेतन का 10%
                          </div>
                          <div className="font-mono text-xs text-slate-700">
                            चुकाया गया किराया - (0.10 × (मूल + DA))
                          </div>
                        </div>

                        <div className="p-3 bg-lime-50 rounded border border-lime-200">
                          <div className="font-semibold text-lime-900 mb-1">
                            शर्त 3: वेतन का 50% या 40%
                          </div>
                          <div className="font-mono text-xs text-slate-700">
                            मेट्रो: 0.50 × (मूल + DA)
                            <br />
                            गैर-मेट्रो: 0.40 × (मूल + DA)
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                        <div className="font-semibold text-emerald-900 mb-1">
                          अंतिम छूट HRA
                        </div>
                        <div className="font-mono text-sm text-slate-700">
                          छूट HRA = न्यूनतम (शर्त 1, शर्त 2, शर्त 3)
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">वेतन:</strong>
                        <span>
                          केवल मूल वेतन + महंगाई भत्ता (DA)। अन्य भत्ते शामिल
                          नहीं।
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">मेट्रो शहर:</strong>
                        <span>
                          केवल दिल्ली, मुंबई, कोलकाता, चेन्नई (50% छूट दर)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">गैर-मेट्रो:</strong>
                        <span>
                          बैंगलोर, हैदराबाद, पुणे सहित अन्य सभी शहर (40% छूट दर)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">कर योग्य HRA:</strong>
                        <span>
                          प्राप्त HRA - छूट HRA (कर योग्य आय में जोड़ा गया)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: मेट्रो शहर HRA गणना
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मूल वेतन:</strong>
                        </div>
                        <div>₹6,00,000/वर्ष</div>

                        <div>
                          <strong>DA:</strong>
                        </div>
                        <div>₹0</div>

                        <div>
                          <strong>प्राप्त HRA:</strong>
                        </div>
                        <div>₹2,40,000/वर्ष (₹20k/माह)</div>

                        <div>
                          <strong>चुकाया गया किराया:</strong>
                        </div>
                        <div>₹1,80,000/वर्ष (₹15k/माह)</div>

                        <div>
                          <strong>शहर:</strong>
                        </div>
                        <div>मुंबई (मेट्रो - 50%)</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: तीन शर्तें गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 text-xs">
                          <div className="p-2 bg-white rounded">
                            <strong>शर्त 1:</strong> वास्तविक HRA = ₹2,40,000
                          </div>
                          <div className="p-2 bg-white rounded">
                            <strong>शर्त 2:</strong> किराया - 10% वेतन =
                            ₹1,80,000 - (0.10 × ₹6,00,000) = ₹1,80,000 - ₹60,000
                            = <strong>₹1,20,000</strong>
                          </div>
                          <div className="p-2 bg-white rounded">
                            <strong>शर्त 3:</strong> वेतन का 50% (मेट्रो) = 0.50
                            × ₹6,00,000 = <strong>₹3,00,000</strong>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 2: न्यूनतम मूल्य चुनें
                        </strong>
                        <div className="ml-4 text-xs">
                          <div className="p-2 bg-white rounded">
                            न्यूनतम (₹2,40,000, ₹1,20,000, ₹3,00,000) ={' '}
                            <strong className="text-emerald-700">
                              ₹1,20,000
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            HRA सारांश:
                          </div>
                          <div className="flex justify-between">
                            <span>छूट HRA (कर मुक्त):</span>
                            <strong className="text-emerald-700">
                              ₹1,20,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कर योग्य HRA:</span>
                            <strong className="text-slate-900">
                              ₹1,20,000 (₹2,40,000 - ₹1,20,000)
                            </strong>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-xs text-slate-600">
                              <span>कर बचत (30% स्लैब पर):</span>
                              <strong className="text-emerald-700">
                                ~₹36,000/वर्ष
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300">
                        <p className="text-xs text-slate-600">
                          <strong>नोट:</strong> शर्त 2 (₹1,20,000) सबसे कम है,
                          इसलिए वह छूट HRA बनता है। शेष ₹1,20,000 HRA कर योग्य
                          आय में जोड़ा जाता है।
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    HRA प्रभाव के साथ पुरानी vs नई कर व्यवस्था की तुलना करें
                  </strong>
                  <Link
                    href="/hi/income-tax-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      देखने के लिए आयकर कैलकुलेटर का उपयोग करें कि क्या HRA के
                      साथ पुरानी व्यवस्था अधिक बचाती है
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Metro vs Non-Metro Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    मेट्रो vs गैर-मेट्रो: HRA छूट दरें
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>शहर प्रकार</TableHead>
                          <TableHead>कवर किए गए शहर</TableHead>
                          <TableHead>HRA छूट दर</TableHead>
                          <TableHead>उदाहरण (₹6L वेतन)</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold text-emerald-700">
                            मेट्रो
                          </TableCell>
                          <TableCell>
                            केवल दिल्ली, मुंबई, कोलकाता, चेन्नई
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-700">
                            वेतन का 50%
                          </TableCell>
                          <TableCell>अधिकतम ₹3,00,000</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-emerald-700">
                            गैर-मेट्रो
                          </TableCell>
                          <TableCell>
                            बैंगलोर, हैदराबाद, पुणे, गुड़गांव, नोएडा, और अन्य
                            सभी शहर
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-700">
                            वेतन का 40%
                          </TableCell>
                          <TableCell>अधिकतम ₹2,40,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                    <p className="text-sm text-slate-700">
                      <strong>महत्वपूर्ण:</strong> आयकर नियमों के अनुसार केवल
                      दिल्ली, मुंबई, कोलकाता और चेन्नई को मेट्रो शहरों के रूप
                      में वर्गीकृत किया गया है। टियर-1 शहर होने के बावजूद,
                      बैंगलोर, हैदराबाद और पुणे को HRA गणना के लिए गैर-मेट्रो
                      माना जाता है (40% सीमा)।
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AD #3: MID-CONTENT */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-hra-mid-content" type="square" label="विज्ञापन" />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  मकान किराया भत्ता (HRA) क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  HRA छूट की गणना कैसे की जाती है?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={howCalculatedContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  HRA दावा करने के लिए आवश्यक दस्तावेज़
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={documentsContent} />
                </div>
              </section>

              {/* HRA vs Home Loan Comparison */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  क्या मैं HRA और होम लोन कटौती दोनों दावा कर सकता हूं?
                </h3>

                <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <Home className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div className="text-slate-700">
                      <p className="font-semibold text-green-900 mb-2">
                        हां! आप दोनों एक साथ दावा कर सकते हैं
                      </p>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        <li>
                          <strong>HRA छूट:</strong> किराए के आवास के लिए जहां आप
                          वर्तमान में रहते हैं (धारा 10(13A))
                        </li>
                        <li>
                          <strong>होम लोन ब्याज:</strong> स्वामित्व वाली संपत्ति
                          के लिए (अलग शहर में हो सकती है या किराए पर दी गई) -
                          धारा 24(b) के तहत ₹2 लाख तक की कटौती
                        </li>
                        <li>
                          <strong>होम लोन मूलधन:</strong> धारा 80C के तहत (अन्य
                          80C निवेशों के साथ मिलाकर ₹1.5 लाख तक)
                        </li>
                        <li>
                          <strong>शर्त:</strong> दोनों संपत्तियां अलग-अलग
                          स्थानों पर होनी चाहिए। आप शहर A में किराए के घर में
                          रहते हैं, शहर B में संपत्ति के मालिक हैं।
                        </li>
                      </ul>
                      <div className="mt-3 p-3 bg-white rounded text-xs">
                        <strong>उदाहरण:</strong> मुंबई में काम करना (किराए पर),
                        गृहनगर में संपत्ति के मालिक। मुंबई किराए के लिए HRA +
                        गृहनगर संपत्ति के लिए होम लोन कटौती (मानी गई किराए पर दी
                        गई) दावा कर सकते हैं। कुल लाभ = HRA छूट + ₹2L ब्याज +
                        80C के तहत ₹1.5L मूलधन।
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  HRA दावा करते समय बचने योग्य सामान्य गलतियां
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={commonMistakesContent} />
                </div>
              </section>

              {/* Special Scenarios */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  विशेष HRA परिदृश्य समझाए गए
                </h3>

                <div className="space-y-4">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        1. माता-पिता को किराया देना
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>अनुमति:</strong> हां, आप माता-पिता को किराया दे
                        सकते हैं और HRA दावा कर सकते हैं।{' '}
                        <strong>आवश्यकताएं:</strong> वैध किराया समझौता, किराया
                        रसीदें, बैंक ट्रांसफर प्रमाण। माता-पिता को ITR में
                        &quot;मकान संपत्ति से आय&quot; के तहत किराया आय घोषित
                        करनी होगी। यदि माता-पिता यह आय नहीं दिखाते हैं तो कर
                        विभाग जांच कर सकता है।
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        2. जीवनसाथी को किराया देना
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>अनुमति:</strong> हां, लेकिन जटिल। जीवनसाथी को
                        संपत्ति का मालिक होना चाहिए और किराया आय घोषित करनी
                        चाहिए। आयकर अधिनियम के तहत क्लबिंग प्रावधानों के अधीन।
                        उचित दस्तावेज़ीकरण के लिए CA से परामर्श करें। स्वामित्व
                        वाली संयुक्त संपत्ति के लिए आमतौर पर अनुशंसित नहीं।
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        3. स्वामित्व वाले घर में रहकर HRA दावा करना
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>अनुमति नहीं:</strong> यदि आप अपने घर में रहते
                        हैं (या उसी शहर में जीवनसाथी के स्वामित्व वाले घर में)
                        तो HRA दावा नहीं कर सकते। भले ही आपको नियोक्ता से HRA
                        मिले, पूरी राशि कर योग्य हो जाती है। अपवाद: अलग शहर में
                        स्वामित्व वाला घर, कार्य शहर में किराए के आवास में रहना।
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        4. किराया रसीदों के बिना HRA
                      </h4>
                      <p className="text-sm text-slate-700">
                        <strong>अनुमति नहीं:</strong> HRA छूट दावा करने के लिए
                        किराया रसीदें अनिवार्य हैं। उचित दस्तावेज़ीकरण के बिना,
                        पूरा HRA कर योग्य हो जाता है। राजस्व टिकट, मकान मालिक
                        हस्ताक्षर, और संपत्ति पते के साथ मासिक/त्रैमासिक रसीदें
                        रखें। ₹1L/वर्ष से अधिक किराए के लिए, मकान मालिक पैन
                        आवश्यक है।
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित कर और वेतन कैलकुलेटर
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/income-tax-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              आयकर कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              पुरानी vs नई कर व्यवस्था की तुलना करें और देखें कि
                              क्या HRA लाभ पुरानी व्यवस्था को आपके लिए बेहतर
                              बनाते हैं।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>कर देयता गणना करें</span>
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
              <AdSlot id="hi-hra-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="hi-hra-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-hra-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-hra-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
